import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-0 bg-[#f3eccb]">
      <div className="w-full max-w-4xl mx-auto">
        {/* Header */}
        <header className="flex justify-between items-center py-4 px-4 md:px-0">
          <div className="flex items-center gap-2">
            <Image src="/logo.png" alt="goldeneggs.ai logo" width={48} height={48} />
            <span className="text-xl font-bold text-[#217a5b]">goldeneggs.ai</span>
            <span className="ml-2 px-2 py-0.5 text-xs bg-gray-200 rounded text-gray-700 font-semibold">BETA</span>
          </div>
        </header>

        {/* Hero Section */}
        <section className="text-center mt-2 mb-10 relative">
          <div className="flex flex-col items-center">
            <Image src="/egg-chicken.png" alt="Egg Chicken" width={64} height={64} className="mb-2" />
            <h1 className="text-4xl md:text-5xl font-bold text-[#217a5b] mb-2">
              <span className="inline-block">Mentorship on Demand</span>
            </h1>
            <h2 className="text-2xl md:text-3xl font-semibold text-[#217a5b] mb-2">A Fair-trade AI Platform</h2>
            <p className="text-base md:text-lg text-gray-700 max-w-xl mx-auto mb-6">
              Sky rocket your business and life goals with real time mentorship from the world's best experts with a simple hello.
            </p>
            <Link href="/entrepreneur-chat" className="inline-block bg-[#ffe14d] text-[#217a5b] font-semibold rounded-full px-8 py-2 shadow hover:bg-yellow-300 transition mb-2">
              Try it for Free
            </Link>
          </div>
        </section>

        {/* Prof. Kagan Section */}
        <section className="flex flex-col md:flex-row items-center justify-center gap-8 bg-white rounded-xl shadow-lg p-6 md:p-10 mb-12 mx-2">
          <div className="flex-shrink-0">
            <div className="relative w-56 h-56 rounded-lg overflow-hidden border-4 border-[#ffe14d]">
              <Image src="/images/professorJeremy.jpeg" alt="Prof. Kagan" fill className="object-cover" />
              <div className="absolute top-2 left-2 bg-[#4b2aad] text-white text-xs font-bold px-2 py-1 rounded">NYU STERN</div>
            </div>
          </div>
          <div className="flex-1 text-left">
            <div className="mb-2">
              <span className="block text-lg font-bold text-[#ffe14d]">Prof. Kagan</span>
              <span className="block text-xl font-bold text-[#217a5b]">Entrepreneurship & Business</span>
            </div>
            <p className="text-gray-700 mb-2">
              Jeremy Kagan is a Professor at NYU Stern School of Business and a seasoned entrepreneur. He specializes in helping founders launch ventures with clarity and confidence.
            </p>
            <p className="text-gray-700 mb-2">
              We've extracted years of experience from Prof Kagan and we're sharing his decades of entrepreneurship with you.
            </p>
            <div className="text-sm text-gray-800 font-semibold">
              <span className="block">Textbooks</span>
              <span className="block">Lecture Slides</span>
              <span className="block">Recorded Lectures</span>
            </div>
          </div>
        </section>

        {/* Achieve more, faster Section */}
        <section className="text-center mb-10">
          <div className="flex flex-col items-center">
            <Image src="/egg-dot.png" alt="Egg Dot" width={24} height={24} className="mb-2" />
            <h2 className="text-4xl md:text-5xl font-bold text-[#217a5b] mb-2">Achieve more, faster</h2>
            <p className="text-base md:text-lg text-gray-700 max-w-2xl mx-auto mb-6">
              Great decisions come from great advice. Skip the guesswork and get instant access to professionals who've been where you are; and succeeded. Affordable sessions, no long-term commitments, just clarity and progress.
            </p>
            <Link href="/entrepreneur-chat" className="inline-block bg-[#ffe14d] text-[#217a5b] font-semibold rounded-full px-8 py-2 shadow hover:bg-yellow-300 transition">
              Try it for Free
            </Link>
          </div>
        </section>

        {/* About Goldeneggs Section */}
        <section className="flex flex-col md:flex-row items-center justify-center gap-8 mb-16 px-2">
          <div className="bg-[#217a5b] rounded-xl p-8 md:p-10 max-w-xl w-full text-left text-[#ffe14d] shadow-lg">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 flex items-center gap-2">About Goldeneggs <span className='text-2xl'></span></h2>
            <p className="text-[#ffe14d] text-base md:text-lg font-normal">
              At Goldeneggs, we believe in the transformative power of collective intelligence; where every individual's data, insights, and expertise hold inherent value. Inspired by the timeless fable of the golden goose, we recognize that true progress comes not from extraction, but from nurturing and rewarding the source. Today's digital economy thrives on personal data yet rarely compensates or empowers its contributors; while access to mentorship, a proven catalyst for growth, remains unequal. Founded on the principles of fairness, innovation, and reciprocity, Goldeneggs is redefining the relationship between data and value. We ensure individuals are rightfully rewarded for their contributions while democratizing access to knowledge, creating a sustainable ecosystem where intelligence flourishes and benefits all. This is more than a mission, it's a new standard for how the world harnesses human potential.
            </p>
          </div>
          <div className="flex flex-col items-center justify-center relative mt-8 md:mt-0">
            <Image src="/egg-chicken.png" alt="Goose with Sunglasses" width={220} height={220} className="mb-2" />
            <div className="flex gap-4 mt-2">
              <Image src="/egg-dot.png" alt="Golden Egg" width={32} height={32} />
              <Image src="/egg-dot.png" alt="Golden Egg" width={32} height={32} />
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-8 text-center text-gray-500 text-sm pb-4">
          <p>© 2024 goldeneggs.ai</p>
        </footer>
      </div>
    </main>
  );
}
