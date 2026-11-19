import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sanitizeVisitorMessage, isInjectionAttempt } from "@/lib/security";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const businessSlug = String(body?.businessSlug ?? "");
    const reason = String(body?.reason ?? "unknown_question");
    const message = sanitizeVisitorMessage(body?.message ?? "", 2000);
    const contactEmail = body?.contactEmail ? String(body.contactEmail) : null;
    const contactName = body?.contactName ? String(body.contactName) : null;
    const visitorId = body?.visitorId ? String(body.visitorId) : null;

    if (!businessSlug) return NextResponse.json({ error: "missing_fields" }, { status: 400 });

    const business = await prisma.business.findUnique({ where: { slug: businessSlug } });
    if (!business) return NextResponse.json({ error: "business_not_found" }, { status: 404 });

    const conversation = await prisma.conversation.create({
      data: {
        businessId: business.id,
        visitorId,
        visitorEmail: contactEmail,
        visitorName: contactName,
        source: "widget",
        status: "handed_off",
        messages: [{ role: "user", content: message, createdAt: new Date().toISOString() }, { role: "assistant", content: `Handoff requested: ${reason}`, createdAt: new Date().toISOString() }] as any,
        handoffRequested: true,
        handoffReason: isInjectionAttempt(message) ? "injection_blocked" : reason,
        handoffContactEmail: contactEmail,
        handoffContactName: contactName,
        handoffMessage: message,
      },
    });

    // Notify business owner (best effort; provider key may be unset).
    const resendKey = process.env.RESEND_API_KEY;
    if (resendKey && business.handoffEmail) {
      try {
        const { Resend } = await import("resend");
        const resend = new Resend(resendKey);
        await resend.emails.send({
          from: process.env.RESEND_FROM_EMAIL || "FrontDesk AI <noreply@example.com>",
          to: business.handoffEmail,
          subject: `FrontDesk AI handoff: ${business.name}`,
          text: `Handoff requested for ${business.name}.\nReason: ${isInjectionAttempt(message) ? "injection_blocked" : reason}\nMessage: ${message}\nContact: ${contactName ?? ""} <${contactEmail ?? ""}>`,
        });
      } catch {
        // Notification is best-effort; the handoff record is authoritative.
      }
    }

    return NextResponse.json({ ok: true, conversationId: conversation.id });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "internal_error" }, { status: 500 });
  }
}
