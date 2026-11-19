# FrontDesk AI — Status

Date: 2026-11-19
Product: FrontDesk AI (automated business FAQ assistant)
Owner: AI Cipher Agency (commercial) / Flex Perez (operator)
Environment: Vercel production (deployed via CLI; git remote not yet added)

## Honest status snapshot (2026-11-19)

- Repository: `C:\Projects\frontdesk-ai` (git initialized, commit `Initial FrontDesk AI SaaS implementation`, no remote yet).
- Production deployment: READY at `https://frontdesk-ai-one-umber.vercel.app` (deployment `frontdesk-ajgsv8f8y-theperezcode`, alias `frontdesk-ai-one-umber.vercel.app`).
- Local production build: exit 0 (15 routes: /, /login, /dashboard, /knowledge, /conversations, /settings, /widget/[slug], /api/{auth,conversations,dashboard,health,knowledge,settings,widget/chat,widget/handoff}).
- Tests executed: `npx jest` → **8/8 passed** (grounded FAQ matching + security/rate-limit helpers).
- Verified live: `GET /api/health` → **503**, error `Environment variable not found: DATABASE_URL` (expected until DB provisioned — deployment itself is live and serving).

## What was built (this pass)

- Independent SaaS scaffold: Next.js (App Router) + React + TypeScript + Prisma (PostgreSQL) + NextAuth credentials (JWT) + Tailwind + SWR + OpenAI SDK (optional) + Resend (optional).
- Database schema: `Business`, `BusinessAdmin`, `Faq`, `Conversation`, `AuditLog`.
- Business knowledge: FAQ CRUD (`/api/knowledge`) with active flag.
- Grounded assistant: deterministic FAQ retrieval (`lib/knowledge.ts`) + optional LLM grounding (`lib/llm.ts`) constrained to approved FAQ context; unknown → handoff; injection patterns blocked.
- Widget chat: `POST /api/widget/chat` (rate limited 20/min/IP, sanitized input, injection check, stores conversation, returns AI reply or handoff).
- Human handoff: `POST /api/widget/handoff` (captures contact/message, best-effort owner notification via Resend, records handoff).
- Dashboard: FAQs / conversations / handoffs / unanswered counts (`/api/dashboard`).
- Settings: business info + widget config (widgetEnabled, handoffEmail, handoffPhone, primaryColor, greeting) (`/api/settings`).
- Conversation deletion for admin data cleanup (`DELETE /api/conversations?id=`).
- Public widget page: `/widget/[slug]` (mobile-first chat UI with AI disclosure; embeddable via iframe pointing at this URL).
- Env set in Vercel production: `NEXTAUTH_SECRET`, `NEXT_PUBLIC_APP_URL`, `CRON_SECRET`, `RESEND_API_KEY`, `RESEND_FROM_EMAIL`.

## Honest gaps (current)

- Database not provisioned (shared Vercel marketplace/Neon terms blocker across all products) → all DB-backed features not runtime-verified.
- LLM (`OPENAI_API_KEY`) not set → deterministic FAQ grounding is the active answering path; LLM path ready when key is provided.
- Embeddable widget distribution instructions not yet published (README pending).
- Payment/subscription activation pending.

## Acceptance criteria mapping

- [x] Independent repo/DB/deployment/admin.
- [x] Auth + tenant isolation (code-level).
- [x] Approved FAQ knowledge management.
- [x] Grounded answers, unknown→handoff, injection guard, rate limit, sanitization, AI disclosure.
- [x] Widget chat + handoff + dashboard + settings.
- [x] Build + tests pass, deployed.
- [ ] DB provisioned → migrations → runtime verification.
- [ ] Live E2E (widget chat, handoff, FAQ answer, tenant isolation).
- [ ] Payment activation.
- [ ] Onboarding docs.

## Next steps

1. Shared blocker: Neon DB provisioning → migrations → health 200 → live E2E.
2. Set `OPENAI_API_KEY` (optional) for LLM grounding.
3. Publish widget install instructions/embed snippet.
4. Live E2E + payment activation.

## Pricing (proposed, not validated)

- Setup: $399.
- Monthly: $149.
- LLM usage costs and third-party fees must be accounted for (OpenAI) and disclosed.
