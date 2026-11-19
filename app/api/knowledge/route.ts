import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

async function requireBusinessId() {
  const session = await auth();
  if (!session?.user?.id) return null;
  const admin = await prisma.businessAdmin.findUnique({ where: { id: session.user.id as string } });
  if (!admin) return null;
  return admin.businessId;
}

export async function GET() {
  const businessId = await requireBusinessId();
  if (!businessId) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const faqs = await prisma.faq.findMany({ where: { businessId }, orderBy: { createdAt: "desc" } });
  return NextResponse.json({ faqs });
}

export async function POST(req: NextRequest) {
  const businessId = await requireBusinessId();
  if (!businessId) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const body = await req.json();
  const { question, answer, category, active } = body;
  if (!question || !answer) return NextResponse.json({ error: "missing_fields" }, { status: 400 });
  const faq = await prisma.faq.create({ data: { businessId, question, answer, category, active: active ?? true } });
  return NextResponse.json({ faq }, { status: 201 });
}

export async function PATCH(req: NextRequest) {
  const businessId = await requireBusinessId();
  if (!businessId) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const body = await req.json();
  const { id, ...data } = body;
  if (!id) return NextResponse.json({ error: "id_required" }, { status: 400 });
  const faq = await prisma.faq.findFirst({ where: { id, businessId } });
  if (!faq) return NextResponse.json({ error: "not_found" }, { status: 404 });
  const updated = await prisma.faq.update({ where: { id }, data: { question: data.question, answer: data.answer, category: data.category, active: data.active } });
  return NextResponse.json({ faq: updated });
}

export async function DELETE(req: NextRequest) {
  const businessId = await requireBusinessId();
  if (!businessId) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) return NextResponse.json({ error: "id_required" }, { status: 400 });
  const faq = await prisma.faq.findFirst({ where: { id, businessId } });
  if (!faq) return NextResponse.json({ error: "not_found" }, { status: 404 });
  await prisma.faq.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
