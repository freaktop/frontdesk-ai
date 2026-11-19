# FrontDesk AI

Automated business FAQ assistant with a single embeddable website chat widget.

## Status

- Production: https://frontdesk-ai-one-umber.vercel.app (build passing, tests passing, DB provisioning pending — see `docs/STATUS.md`)
- Stack: Next.js (App Router) + TypeScript + Prisma/PostgreSQL + NextAuth (credentials) + Tailwind + SWR + OpenAI SDK (optional) + Resend (optional)
- Pricing (proposed, not validated): $399 setup + $149/month.

## Quick start (local)

1. Copy `.env.example` to `.env.local`.
2. Set `DATABASE_URL`, `NEXTAUTH_SECRET`, `NEXTAUTH_URL`, `NEXT_PUBLIC_APP_URL`, optional `OPENAI_API_KEY`.
3. `npx prisma migrate dev` (or `npx prisma db push`).
4. `npx prisma db seed`.
5. `npm run dev`.

## Demo credentials (local seed)

- Email: `admin@frontdesk.ai`
- Password: `demo1234`
- Widget: `/widget/demo-frontdesk`

## API overview

- `POST /api/auth/[...nextauth]` — credentials auth
- `GET /api/health` — DB health
- `GET/POST/PATCH/DELETE /api/knowledge` — FAQ CRUD (admin auth)
- `GET /api/dashboard` — metrics (admin auth)
- `GET/PATCH /api/settings` — widget + business settings (admin auth)
- `GET /api/conversations` + `DELETE /api/conversations?id=` — conversations (admin auth)
- `POST /api/widget/chat` — public widget chat (rate limited, sanitized, injection guard, grounded)
- `POST /api/widget/handoff` — public human handoff

## Security / safety

- Answers restricted to approved FAQ context; unknown → human handoff; LLM grounded with instruction not to invent facts.
- Prompt-injection patterns blocked; input sanitized + length-capped.
- Rate limit: 20 widget messages/min per IP.
- AI disclosure shown in widget.
- Tenant isolation via `businessId` scoping.

## Product limitations

- Initial package: one website chat widget, one business knowledge base, approved FAQ answers, basic human handoff.
- No phone answering, voice, CRM, booking, marketing, or omnichannel in this pass.
- Assistant does not claim to complete bookings without a real integration.
