import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const admin = await prisma.businessAdmin.findUnique({ where: { id: session.user.id as string } });
  if (!admin) return NextResponse.json({ error: "admin_not_found" }, { status: 404 });
  const businessId = admin.businessId;
  const [faqs, conversations, handedOff, unanswered] = await Promise.all([
    prisma.faq.count({ where: { businessId } }),
    prisma.conversation.count({ where: { businessId } }),
    prisma.conversation.count({ where: { businessId, handoffRequested: true } }),
    prisma.conversation.count({ where: { businessId, status: "handed_off" } }),
  ]);
  const widgetEnabled = true;
  const business = await prisma.business.findUnique({ where: { id: businessId } });
  return NextResponse.json({ businessId, metrics: { faqs, conversations, handedOff, unanswered }, widgetEnabled, business });
}
