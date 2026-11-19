import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { sanitizeVisitorMessage, isInjectionAttempt, rateLimit, WIDGET_RATE_LIMIT } from "@/lib/security";
import { findFaqMatch, GROUNDING_SCORE_THRESHOLD } from "@/lib/knowledge";
import { generateGroundedReply } from "@/lib/llm";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const businessSlug = String(body?.businessSlug ?? "");
    const question = sanitizeVisitorMessage(body?.question ?? "");
    const visitorId = body?.visitorId ? String(body.visitorId) : null;
    const visitorEmail = body?.visitorEmail ? String(body.visitorEmail) : null;
    const visitorName = body?.visitorName ? String(body.visitorName) : null;

    if (!businessSlug || !question) return NextResponse.json({ error: "missing_fields" }, { status: 400 });
    if (isInjectionAttempt(question)) {
      // treat as unknown -> handoff, but do not echo attacker content into LLM
      return NextResponse.json({ reply: "I couldn't process that request. A team member will assist you.", status: "handed_off" }, { status: 200 });
    }

    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "unknown";
    const rl = rateLimit(`widget:${ip}`, WIDGET_RATE_LIMIT.max, WIDGET_RATE_LIMIT.windowMs);
    if (!rl.allowed) return NextResponse.json({ error: "rate_limited", retryAfterSec: rl.retryAfterSec }, { status: 429 });

    const business = await prisma.business.findUnique({ where: { slug: businessSlug } });
    if (!business) return NextResponse.json({ error: "business_not_found" }, { status: 404 });

    const faqs = await prisma.faq.findMany({ where: { businessId: business.id, active: true } });

    let reply: string;
    let status: string = "answered";
    let usedFaq: string | null = null;

    const match = findFaqMatch(
      faqs.map((f) => ({ question: f.question, answer: f.answer, category: f.category })),
      question
    );

    if (match && match.score >= GROUNDING_SCORE_THRESHOLD) {
      usedFaq = match.faq.question;
      let answer = match.faq.answer;
      const llmKey = process.env.OPENAI_API_KEY;
      if (llmKey) {
        const llmReply = await generateGroundedReply({
          openaiKey: llmKey,
          model: process.env.OPENAI_MODEL || "gpt-4o-mini",
          businessName: business.name,
          question,
          faqQuestion: match.faq.question,
          faqAnswer: match.faq.answer,
        });
        if (llmReply) answer = llmReply;
      }
      reply = answer;
    } else {
      status = "handed_off";
      reply = `I don't have that information available. ${business.handoffEmail ? `You can email ${business.handoffEmail} for help.` : "A team member will assist you."}`;
    }

    const messages = [
      { role: "user", content: question, createdAt: new Date().toISOString() },
      { role: "assistant", content: reply, createdAt: new Date().toISOString() },
    ];

    const conversation = await prisma.conversation.create({
      data: {
        businessId: business.id,
        visitorId,
        visitorEmail,
        visitorName,
        source: "widget",
        status: status === "answered" ? "open" : "handed_off",
        messages: messages as any,
        handoffRequested: status === "handed_off",
        handoffReason: status === "handed_off" ? "unknown_question" : null,
        handoffContactEmail: status === "handed_off" ? visitorEmail : null,
        handoffContactName: status === "handed_off" ? visitorName : null,
        handoffMessage: status === "handed_off" ? question : null,
      },
    });

    return NextResponse.json({
      reply,
      status,
      usedFaq,
      conversationId: conversation.id,
      businessSlug,
      aiDisclosure: true,
    });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "internal_error" }, { status: 500 });
  }
}
