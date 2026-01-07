import { SignUpButton } from "@clerk/nextjs";

export default function PricingPage() {
  return (
    <main className="min-h-screen">
      {/* Pricing Header */}
      <section className="container mx-auto px-6 py-16 max-w-6xl text-center">
        <h1 className="text-5xl font-bold mb-6 max-sm:text-4xl">
          Simple, Transparent Pricing
        </h1>
        <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
          Choose the plan that fits your learning goals. All plans include
          access to our limitless library of reading passages.
        </p>
      </section>

      {/* Pricing Cards */}
      <section className="container mx-auto px-6 pb-16 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Basic */}
          <div className="border-2 border-gray-200 rounded-lg p-8 bg-white">
            <h3 className="font-bold text-2xl mb-2">Basic</h3>
            <p className="text-4xl font-bold mb-6">
              $20
              <span className="text-lg font-normal text-gray-600">/month</span>
            </p>
            <ul className="space-y-4 mb-8">
              <li className="flex items-start">
                <span className="text-primary mr-2 text-xl">✓</span>
                <span>12 sessions per month</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2 text-xl">✓</span>
                <span>5-minute AI coaching per session</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2 text-xl">✓</span>
                <span>All grade levels (Pre-K to 12)</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2 text-xl">✓</span>
                <span>Progress tracking</span>
              </li>
            </ul>
            <SignUpButton mode="modal">
              <button className="w-full border-2 border-primary text-primary py-3 rounded-lg font-semibold hover:bg-primary hover:text-white transition-colors">
                Get Started
              </button>
            </SignUpButton>
          </div>

          {/* Core - Popular */}
          <div className="border-2 border-primary rounded-lg p-8 bg-white relative">
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary text-white px-4 py-1 rounded-full text-sm font-semibold">
              POPULAR
            </div>
            <h3 className="font-bold text-2xl mb-2">Core</h3>
            <p className="text-4xl font-bold mb-6">
              $30
              <span className="text-lg font-normal text-gray-600">/month</span>
            </p>
            <ul className="space-y-4 mb-8">
              <li className="flex items-start">
                <span className="text-primary mr-2 text-xl">✓</span>
                <span>20 sessions per month</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2 text-xl">✓</span>
                <span>5-minute AI coaching per session</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2 text-xl">✓</span>
                <span>All grade levels (Pre-K to 12)</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2 text-xl">✓</span>
                <span>Progress tracking</span>
              </li>
            </ul>
            <SignUpButton mode="modal">
              <button className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-colors">
                Get Started
              </button>
            </SignUpButton>
          </div>

          {/* Pro */}
          <div className="border-2 border-gray-200 rounded-lg p-8 bg-white">
            <h3 className="font-bold text-2xl mb-2">Pro</h3>
            <p className="text-4xl font-bold mb-6">
              $50
              <span className="text-lg font-normal text-gray-600">/month</span>
            </p>
            <ul className="space-y-4 mb-8">
              <li className="flex items-start">
                <span className="text-primary mr-2 text-xl">✓</span>
                <span>30 sessions per month</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2 text-xl">✓</span>
                <span>5-minute AI coaching per session</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2 text-xl">✓</span>
                <span>All grade levels (Pre-K to 12)</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2 text-xl">✓</span>
                <span>Progress tracking</span>
              </li>
            </ul>
            <SignUpButton mode="modal">
              <button className="w-full border-2 border-primary text-primary py-3 rounded-lg font-semibold hover:bg-primary hover:text-white transition-colors">
                Get Started
              </button>
            </SignUpButton>
          </div>
        </div>
      </section>

      {/* FAQ or Additional Info Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="flex flex-col items-center text-center">
            <h2 className="text-3xl font-bold mb-6">Questions?</h2>
            <p className="text-lg text-gray-700 mb-8">
              All plans give you access to our limitless library of reading
              passages across all grade levels. The difference is in how many AI
              coaching sessions you get each month.
            </p>
            <SignUpButton mode="modal">
              <button className="btn-primary px-8 py-3">
                Get Started Today
              </button>
            </SignUpButton>
          </div>
        </div>
      </section>
    </main>
  );
}
