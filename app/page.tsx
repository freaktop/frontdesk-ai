import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-gray-900">
      {/* NAV */}
      <header className="border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-6 py-5 flex items-center justify-between">
          <div className="text-xl font-bold">FrontDesk AI</div>
          <nav className="hidden md:flex gap-8 text-sm font-medium text-gray-600">
            <Link href="#how" className="hover:text-gray-900">How it works</Link>
            <Link href="#features" className="hover:text-gray-900">Features</Link>
            <Link href="#pricing" className="hover:text-gray-900">Pricing</Link>
            <Link href="#faq" className="hover:text-gray-900">FAQ</Link>
          </nav>
          <Link href="/login" className="bg-gray-900 text-white text-sm px-4 py-2 rounded-lg font-semibold">Business Login</Link>
        </div>
      </header>

      {/* HERO */}
      <section className="max-w-5xl mx-auto px-6 py-20 text-center">
        <div className="inline-block bg-blue-50 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full mb-6">AI front desk</div>
        <h1 className="text-5xl font-bold mb-6 tracking-tight">Your AI front desk for instant answers</h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          FrontDesk AI is an embeddable website chat widget that answers approved business FAQs instantly and hands off to a human when unsure.
        </p>
        <div className="flex gap-4 justify-center">
          <Link href="/login" className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold">Start setup</Link>
          <Link href="#how" className="bg-white text-gray-900 border border-gray-300 px-6 py-3 rounded-lg font-semibold">See how it works</Link>
        </div>
        <p className="mt-6 text-sm text-gray-500">Setup: $399 &nbsp;•&nbsp; Subscription: $149/month</p>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" className="max-w-5xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold mb-10 text-center">How it works</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-gray-50 rounded-xl p-6">
            <div className="text-sm font-bold text-blue-600 mb-2">STEP 1</div>
            <h3 className="text-lg font-semibold mb-2">Knowledge base</h3>
            <p className="text-gray-600 text-sm">Approved FAQs are configured per business.</p>
          </div>
          <div className="bg-gray-50 rounded-xl p-6">
            <div className="text-sm font-bold text-blue-600 mb-2">STEP 2</div>
            <h3 className="text-lg font-semibold mb-2">Widget goes live</h3>
            <p className="text-gray-600 text-sm">One embeddable widget answers visitors instantly.</p>
          </div>
          <div className="bg-gray-50 rounded-xl p-6">
            <div className="text-sm font-bold text-blue-600 mb-2">STEP 3</div>
            <h3 className="text-lg font-semibold mb-2">Human handoff</h3>
            <p className="text-gray-600 text-sm">Unknown questions route to a human with context.</p>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="bg-gray-50 py-16">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-10 text-center">Built for support teams</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-xl border">
              <h3 className="text-lg font-semibold mb-2">Approved knowledge only</h3>
              <p className="text-gray-600 text-sm">Grounded answers from approved FAQs.</p>
            </div>
            <div className="bg-white p-6 rounded-xl border">
              <h3 className="text-lg font-semibold mb-2">Safe handoff</h3>
              <p className="text-gray-600 text-sm">Human handoff with full context when needed.</p>
            </div>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="max-w-5xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold mb-10 text-center">Pricing</h2>
        <div className="bg-white p-8 rounded-2xl shadow-sm border text-center">
          <p className="text-4xl font-bold">$399 <span className="text-base font-normal text-gray-500">setup</span></p>
          <p className="text-4xl font-bold mt-2">$149 <span className="text-base font-normal text-gray-500">/ month</span></p>
          <p className="mt-4 text-gray-600 text-sm">Flat setup plus chatbot subscription.</p>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="max-w-5xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold mb-8 text-center">FAQ</h2>
        <div className="space-y-4">
          <div className="bg-gray-50 p-6 rounded-xl">
            <h3 className="font-semibold mb-2">What if the AI doesn't know?</h3>
            <p className="text-gray-600 text-sm">It hands off to a human with full context.</p>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="bg-gray-900 text-white py-16">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Answer every visitor question instantly</h2>
          <p className="text-gray-300 mb-8">Launch FrontDesk AI today.</p>
          <Link href="/login" className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold">Start setup</Link>
        </div>
      </section>

      <footer className="border-t border-gray-100 py-8 text-center text-sm text-gray-500">
        <div className="max-w-5xl mx-auto px-6">FrontDesk AI — embeddable AI FAQ assistant for modern businesses.</div>
      </footer>
    </main>
  );
}
