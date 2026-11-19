import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const business = await prisma.business.upsert({
    where: { slug: "demo-frontdesk" },
    update: {},
    create: {
      name: "Demo Business",
      slug: "demo-frontdesk",
      description: "Friendly neighborhood services.",
      operatingHours: { days: ["Mon-Fri"], hours: "9:00-17:00" },
      contactEmail: "hello@example.com",
      contactPhone: "+1 555 0100",
      websiteUrl: "https://example.com",
      services: ["Haircut", "Coloring"],
      pricing: { haircut: 50 },
      handoffEmail: "handoff@example.com",
      handoffPhone: "+1 555 0100",
      greeting: "Hi! Ask us anything about our services.",
    },
  });

  const passwordHash = await bcrypt.hash("demo1234", 10);
  await prisma.businessAdmin.upsert({
    where: { email: "admin@frontdesk.ai" },
    update: {},
    create: { businessId: business.id, email: "admin@frontdesk.ai", passwordHash, name: "Demo Admin" },
  });

  const faqs = [
    { question: "What services do you offer?", answer: "We offer haircuts and coloring services.", category: "services" },
    { question: "How much does a haircut cost?", answer: "Our services start at $50.", category: "pricing" },
    { question: "Do you offer same-day appointments?", answer: "We offer same-day appointments when slots are available.", category: "booking" },
  ];
  for (const f of faqs) {
    const existing = await prisma.faq.findFirst({ where: { businessId: business.id, question: f.question } });
    if (existing) {
      await prisma.faq.update({ where: { id: existing.id }, data: { answer: f.answer, category: f.category, active: true } });
    } else {
      await prisma.faq.create({ data: { businessId: business.id, question: f.question, answer: f.answer, category: f.category, active: true } });
    }
  }

  console.log("Seed complete. Login: admin@frontdesk.ai / demo1234. Widget: /widget/demo-frontdesk");
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
