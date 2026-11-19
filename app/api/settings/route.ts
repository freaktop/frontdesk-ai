import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const admin = await prisma.businessAdmin.findUnique({ where: { id: session.user.id as string } });
  if (!admin) return NextResponse.json({ error: "admin_not_found" }, { status: 404 });
  const business = await prisma.business.findUnique({ where: { id: admin.businessId } });
  return NextResponse.json({ business });
}

export async function PATCH(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const admin = await prisma.businessAdmin.findUnique({ where: { id: session.user.id as string } });
  if (!admin) return NextResponse.json({ error: "admin_not_found" }, { status: 404 });
  const body = await req.json();
  const business = await prisma.business.update({
    where: { id: admin.businessId },
    data: {
      name: body.name ?? undefined,
      description: body.description ?? undefined,
      operatingHours: body.operatingHours ?? undefined,
      location: body.location ?? undefined,
      contactEmail: body.contactEmail ?? undefined,
      contactPhone: body.contactPhone ?? undefined,
      websiteUrl: body.websiteUrl ?? undefined,
      services: body.services ?? undefined,
      pricing: body.pricing ?? undefined,
      widgetEnabled: body.widgetEnabled ?? undefined,
      handoffEmail: body.handoffEmail ?? undefined,
      handoffPhone: body.handoffPhone ?? undefined,
      primaryColor: body.primaryColor ?? undefined,
      greeting: body.greeting ?? undefined,
    },
  });
  return NextResponse.json({ business });
}
