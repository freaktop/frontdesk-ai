import Link from "next/link";

const features = [
  { title: "Answer the questions you approve", text: "Give customers consistent answers about your services, hours, policies, and pricing—based on information you provide." },
  { title: "Keep conversations moving", text: "Help website visitors get the information they need without waiting for someone to be free." },
  { title: "Capture the next step", text: "When a question needs a person, guide visitors toward a follow-up instead of leaving them stuck." },
];

const steps = [
  { n: "01", title: "Add your business information", text: "Set up the services, FAQs, hours, policies, and details your assistant is allowed to share." },
  { n: "02", title: "Put it on your website", text: "Add the chat experience to your site so customers have a clear place to ask questions." },
  { n: "03", title: "Respond and follow up", text: "Let the assistant handle approved questions and direct requests that need a human." },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#070b14] text-white">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#070b14]/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
          <Link href="/" className="flex items-center gap-2 font-semibold tracking-tight">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-500 text-sm font-bold">F</span>
            <span>FrontDesk<span className="text-blue-400"> AI</span></span>
          </Link>
          <nav className="hidden items-center gap-7 text-sm text-slate-300 md:flex">
            <a href="#how" className="hover:text-white">How it works</a>
            <a href="#features" className="hover:text-white">Features</a>
            <a href="#pricing" className="hover:text-white">Pricing</a>
            <a href="#faq" className="hover:text-white">FAQ</a>
          </nav>
          <div className="flex items-center gap-3">
            <Link href="/login" className="hidden text-sm text-slate-300 hover:text-white sm:inline">Log in</Link>
            <Link href="/demo" className="rounded-full bg-blue-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-400">Try the demo</Link>
          </div>
        </div>
      </header>

      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute left-1/2 top-0 h-[540px] w-[900px] -translate-x-1/2 rounded-full bg-blue-600/10 blur-[130px]" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 py-20 md:grid-cols-2 md:py-28">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-400/10 px-3 py-1.5 text-xs text-blue-200">
              <span className="h-2 w-2 rounded-full bg-blue-400" /> A smarter first response for your website
            </div>
            <h1 className="max-w-3xl text-5xl font-semibold leading-[1.05] tracking-tight md:text-6xl">Every customer deserves an answer. <span className="text-blue-400">Even when you’re busy.</span></h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-300">FrontDesk AI helps businesses answer common customer questions, share approved information, and capture requests for follow-up—right from their website.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/demo" className="rounded-full bg-blue-500 px-6 py-3 font-semibold hover:bg-blue-400">Try the sample receptionist <span aria-hidden="true">→</span></Link>
              <a href="#pricing" className="rounded-full border border-white/15 px-6 py-3 font-medium text-slate-200 hover:bg-white/5">View pricing</a>
            </div>
            <p className="mt-4 text-sm text-slate-500">Answers based on the business information you provide. No guesswork.</p>
          </div>
          <div className="rounded-3xl border border-white/10 bg-[#0d1423] p-5 shadow-2xl shadow-blue-950/30">
            <div className="flex items-center gap-3 border-b border-white/10 pb-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-500/15 text-blue-300">✦</div>
              <div><p className="font-medium">Sample Business Assistant</p><p className="text-xs text-slate-400">Example conversation · not connected to a live business</p></div>
            </div>
            <div className="space-y-4 py-5 text-sm">
              <div className="ml-auto max-w-[85%] rounded-2xl rounded-br-md bg-blue-600 px-4 py-3">Do you offer emergency HVAC service?</div>
              <div className="max-w-[90%] rounded-2xl rounded-bl-md border border-white/10 bg-white/[.04] px-4 py-3 leading-6 text-slate-300">I can help you find the right service. For urgent HVAC issues, please contact the business directly to confirm availability and response time.</div>
              <div className="ml-auto max-w-[85%] rounded-2xl rounded-br-md bg-blue-600 px-4 py-3">Can someone call me?</div>
              <div className="max-w-[90%] rounded-2xl rounded-bl-md border border-white/10 bg-white/[.04] px-4 py-3 leading-6 text-slate-300">Absolutely. You can request a follow-up so the team can get back to you.</div>
            </div>
            <Link href="/demo" className="block rounded-xl border border-blue-400/20 bg-blue-400/10 p-3 text-center text-sm font-medium text-blue-200 hover:bg-blue-400/15">Explore the interactive sample →</Link>
          </div>
        </div>
      </section>

      <section id="how" className="border-y border-white/5 bg-white/[.02]">
        <div className="mx-auto max-w-7xl px-5 py-20">
          <div className="max-w-2xl"><p className="text-sm font-semibold uppercase tracking-[.2em] text-blue-400">Simple setup</p><h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">From questions to answers in three steps.</h2><p className="mt-4 text-slate-400">Give customers another way to get useful information while your team focuses on the work.</p></div>
          <div className="mt-12 grid gap-5 md:grid-cols-3">{steps.map(s => <div key={s.n} className="rounded-2xl border border-white/10 bg-[#0b111d] p-6"><p className="text-sm font-medium text-blue-400">{s.n}</p><h3 className="mt-4 text-xl font-semibold">{s.title}</h3><p className="mt-3 leading-7 text-slate-400">{s.text}</p></div>)}</div>
        </div>
      </section>

      <section id="features" className="mx-auto max-w-7xl px-5 py-20">
        <div className="max-w-2xl"><p className="text-sm font-semibold uppercase tracking-[.2em] text-blue-400">Useful by design</p><h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">A better first touch. Not another complicated tool.</h2></div>
        <div className="mt-10 grid gap-5 md:grid-cols-3">{features.map(f => <article key={f.title} className="rounded-2xl border border-white/10 p-6"><div className="mb-5 h-10 w-10 rounded-xl bg-blue-500/10 ring-1 ring-blue-400/20" /><h3 className="text-lg font-semibold">{f.title}</h3><p className="mt-3 leading-7 text-slate-400">{f.text}</p></article>)}</div>
      </section>

      <section className="border-y border-white/5 bg-white/[.02]">
        <div className="mx-auto max-w-7xl px-5 py-20">
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">Built for service businesses.</h2><p className="mt-4 max-w-2xl text-slate-400">Help customers understand what you offer and how to reach you—before, during, or after business hours.</p>
          <div className="mt-8 flex flex-wrap gap-3">{["HVAC & home services", "Plumbing", "Beauty & personal care", "Local service providers"].map(x => <span key={x} className="rounded-full border border-white/10 bg-white/[.04] px-4 py-2 text-sm text-slate-300">{x}</span>)}</div>
        </div>
      </section>

      <section id="pricing" className="mx-auto max-w-7xl px-5 py-20">
        <div className="mx-auto max-w-xl rounded-3xl border border-blue-400/25 bg-gradient-to-b from-blue-500/10 to-transparent p-8 md:p-10">
          <p className="text-sm font-semibold uppercase tracking-[.2em] text-blue-300">Straightforward pricing</p><h2 className="mt-3 text-3xl font-semibold">Get your website assistant set up.</h2>
          <div className="mt-8 flex flex-wrap items-end gap-2"><span className="text-5xl font-semibold">$399</span><span className="pb-1 text-slate-400">one-time setup</span></div>
          <p className="mt-2 text-slate-300">Then <span className="font-semibold text-white">$149/month</span></p>
          <ul className="mt-7 space-y-3 text-sm text-slate-300"><li>✓ Business-specific configuration</li><li>✓ Website chat assistant</li><li>✓ Approved information and FAQs</li><li>✓ Human follow-up pathway</li></ul>
          <Link href="/demo" className="mt-8 block rounded-full bg-blue-500 px-6 py-3 text-center font-semibold hover:bg-blue-400">Try it before you talk to us</Link>
          <p className="mt-3 text-center text-xs text-slate-500">Service details and fit confirmed before onboarding.</p>
        </div>
      </section>

      <section id="faq" className="border-t border-white/5 bg-white/[.02]">
        <div className="mx-auto max-w-4xl px-5 py-20">
          <h2 className="text-3xl font-semibold tracking-tight">Frequently asked questions</h2>
          <div className="mt-8 space-y-6">
            <div><h3 className="font-semibold">Does it replace my staff?</h3><p className="mt-2 text-slate-400">No. It helps with routine questions and directs customers toward your team when personal assistance is needed.</p></div>
            <div><h3 className="font-semibold">What can it answer?</h3><p className="mt-2 text-slate-400">Questions about information you configure, such as services, hours, policies, and FAQs. It should not invent answers when information is missing.</p></div>
            <div><h3 className="font-semibold">Can I see it first?</h3><p className="mt-2 text-slate-400">Yes. Try the sample experience before requesting a setup conversation.</p></div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 text-center">
        <h2 className="text-3xl font-semibold tracking-tight">Don't leave your customers waiting for the basics.</h2><p className="mx-auto mt-4 max-w-xl text-slate-400">See how a website assistant can help your business respond more consistently.</p><Link href="/demo" className="mt-7 inline-flex rounded-full bg-blue-500 px-7 py-3 font-semibold hover:bg-blue-400">Try the demo</Link>
      </section>
      <footer className="border-t border-white/10 px-5 py-7 text-center text-sm text-slate-500"><div className="mx-auto flex max-w-7xl flex-col justify-between gap-3 sm:flex-row"><span>© {new Date().getFullYear()} FrontDesk AI</span><span>Customer assistance, with a human handoff when needed.</span></div></footer>
    </main>
  );
}
