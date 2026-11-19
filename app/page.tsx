export default function Home() {
  return (
    <main className="min-h-screen">
      <section className="max-w-5xl mx-auto px-6 py-20 text-center">
        <h1 className="text-5xl font-bold mb-6">FrontDesk AI</h1>
        <p className="text-xl text-gray-600 mb-8">Automated business FAQ assistant that answers approved questions and hands off to humans.</p>
        <a href="/login" className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold">Business Login</a>
      </section>
      <section className="max-w-5xl mx-auto px-6 pb-20">
        <h2 className="text-2xl font-bold mb-4">Pricing</h2>
        <div className="bg-white p-6 rounded-xl shadow-sm border inline-block">
          <p className="text-3xl font-bold">$399 <span className="text-base font-normal text-gray-500">setup</span></p>
          <p className="text-3xl font-bold mt-2">$149 <span className="text-base font-normal text-gray-500">/ month</span></p>
        </div>
      </section>
    </main>
  );
}
