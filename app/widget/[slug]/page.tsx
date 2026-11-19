import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { WidgetChat } from "@/components/widget-chat";

export default async function WidgetPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const business = await prisma.business.findUnique({
    where: { slug },
    select: {
      id: true,
      name: true,
      description: true,
      websiteUrl: true,
      contactEmail: true,
      contactPhone: true,
      primaryColor: true,
      greeting: true,
      widgetEnabled: true,
      handoffEmail: true,
      handoffPhone: true,
    },
  });
  if (!business || !business.widgetEnabled) notFound();
  return <WidgetChat business={business} />;
}
