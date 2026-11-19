import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const admin = await prisma.businessAdmin.findUnique({ where: { id: session.user.id as string } });
  if (!admin) return NextResponse.json({ error: "admin_not_found" }, { status: 404 });
  const conversations = await prisma.conversation.findMany({
    where: { businessId: admin.businessId },
    orderBy: { createdAt: "desc" },
    take: 100,
  });
  return NextResponse.json({ conversations });
}

export async function DELETE(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const admin = await prisma.businessAdmin.findUnique({ where: { id: session.user.id as string } });
  if (!admin) return NextResponse.json({ error: "admin_not_found" }, { status: 404 });
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) return NextResponse.json({ error: "id_required" }, { status: 400 });
  const convo = await prisma.conversation.findFirst({ where: { id, businessId: admin.businessId } });
  if (!convo) return NextResponse.json({ error: "not_found" }, { status: 404 });
  await prisma.conversation.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
