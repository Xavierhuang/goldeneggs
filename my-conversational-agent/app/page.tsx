import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { AuthBar } from './components/AuthBar';
import NewsletterSignupForm from './components/NewsletterSignupForm';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-0 bg-[#f3eccb]">
      <div className="w-full max-w-4xl mx-auto">
        {/* Logo/site name and AuthBar aligned in a row, logo left, hamburger right */}
        <div className="flex flex-row items-center justify-between mb-4 px-2 w-full">
          <div className="flex items-center gap-2">
            <Image src="/logo.png" alt="goldeneggs.ai logo" width={40} height={40} className="sm:w-12 sm:h-12 w-10 h-10" />
            <span className="text-xl sm:text-2xl font-bold text-[#217a5b]" style={{ fontFamily: 'Avenir Next Arabic, sans-serif', fontWeight: 'bold' }}>goldeneggs.ai</span>
          </div>
          <AuthBar />
        </div>
        {/* Hero Section */}
        <section className="text-center mt-2 mb-0 relative">
          <div className="flex flex-col items-center">
            <Image src="/egg-chicken.png" alt="Egg Chicken" width={75} height={75} className="mb-2" />
            <h1 className="text-4xl md:text-5xl font-bold text-[#217a5b] mb-2">
              <span className="inline-block">Mentorship on Demand</span>
            </h1>
            <h2 className="text-2xl md:text-3xl font-semibold text-[#217a5b] mb-2">A Fair-trade AI Platform</h2>
            <p className="text-base md:text-lg text-[#217a5b] max-w-xl mx-auto mb-6" style={{ fontFamily: 'Public Sans, sans-serif' }}>
              Sky rocket your business and life goals with real time mentorship from the world's best experts with a simple hello.
            </p>
            <Link href="/entrepreneur-chat" className="inline-block bg-[#ffe14d] text-[#217a5b] font-semibold rounded-full px-8 py-2 shadow hover:bg-yellow-300 transition mb-2">
              Try it for Free
            </Link>
          </div>
        </section>

        {/* Prof. Kagan Section */}
        <section className="w-full flex flex-col items-center justify-center mt-2 mb-12 px-2">
          <div className="w-full max-w-7xl mx-auto relative flex flex-col md:flex-row items-center md:items-stretch justify-center gap-8" style={{ minHeight: 520 }}>
            {/* Left bio */}
            <div className="hidden md:flex flex-col justify-center w-1/3 text-[#217a5b] pr-4" style={{ fontFamily: 'Public Sans, sans-serif', fontSize: '12px' }}>
              Jeremy Kagan is a Professor at NYU Stern School of Business and a seasoned entrepreneur. He specializes in helping founders launch ventures with clarity and confidence
            </div>
            {/* Centered Prof. Kagan image */}
            <div className="flex flex-col items-center justify-center w-full md:w-1/3">
              <Image src="/images/PRof stern.png" alt="Prof. Kagan" width={750} height={750} />
            </div>
            {/* Right experience/resources */}
            <div className="hidden md:flex flex-col justify-center w-1/3 text-[#217a5b] pl-4" style={{ fontFamily: 'Public Sans, sans-serif', fontSize: '12px' }}>
              We've extracted years of experience from Prof Kagan and we're sharing his decades of entrepreneurship with you.<br/><br/>
              <span className="font-bold block">Textbooks</span>
              <span className="font-bold block">Lecture Slides</span>
              <span className="font-bold block">Recorded Lectures</span>
            </div>
          </div>
        </section>

        {/* Achieve more, faster Section */}
        <section className="text-center mb-10 mt-[-3rem]">
          <div className="flex flex-col items-center">
            <Image src="/egg-dot.png" alt="Egg Dot" width={70} height={70} className="mb-2" />
            <h2 className="text-4xl md:text-5xl font-bold text-[#217a5b] mb-2">Achieve more, faster</h2>
            <p className="text-base md:text-lg max-w-2xl mx-auto mb-6" style={{ color: '#217a5b' }}>
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
            <h2 className="text-3xl md:text-4xl font-bold mb-4 flex items-center gap-2">About Goldeneggs <Image src="/Logo without background .png" alt="Goldeneggs logo" width={50} height={50} /></h2>
            <p className="text-[#ffe14d] text-base md:text-lg font-normal">
              At Goldeneggs, we believe in the transformative power of collective intelligence; where every individual's data, insights, and expertise hold inherent value. Inspired by the timeless fable of the golden goose, we recognize that true progress comes not from extraction, but from nurturing and rewarding the source. Today's digital economy thrives on personal data yet rarely compensates or empowers its contributors; while access to mentorship, a proven catalyst for growth, remains unequal. Founded on the principles of fairness, innovation, and reciprocity, Goldeneggs is redefining the relationship between data and value. We ensure individuals are rightfully rewarded for their contributions while democratizing access to knowledge, creating a sustainable ecosystem where intelligence flourishes and benefits all. This is more than a mission, it's a new standard for how the world harnesses human potential.
            </p>
          </div>
          <div className="flex flex-col items-center justify-center relative mt-8 md:mt-0">
            <Image src="/egg-chicken.png" alt="Goose with Sunglasses" width={220} height={220} className="mb-2" />
            <div className="flex gap-4 mt-2">
              <Image src="/egg-dot.png" alt="Golden Egg" width={70} height={70} />
              <Image src="/egg-dot.png" alt="Golden Egg" width={70} height={70} />
            </div>
          </div>
        </section>

        {/* Simple Newsletter Subscription Section */}
        <section className="flex flex-col items-center justify-center mb-16 px-2">
          <div className="flex flex-col items-center w-full max-w-2xl mb-2">
            <div className="flex flex-row items-center justify-center w-full gap-2">
              <h2 className="text-4xl font-bold text-[#217a5b] text-center flex-1">Join Us</h2>
              <div className="hidden sm:block">
                <Image src="/egg-dot.png" alt="Golden Egg" width={48} height={48} className="ml-2" />
              </div>
            </div>
            <div className="block sm:hidden mt-2">
              <Image src="/egg-dot.png" alt="Golden Egg" width={48} height={48} />
            </div>
          </div>
          <p className="text-lg text-[#217a5b] mb-6 text-center max-w-2xl">Stay up to date with our journey and get notified when we add new experts</p>
          <NewsletterSignupForm />
        </section>
      </div>
      <footer className="w-full bg-[#217a5b] text-[#f3eccb] text-center py-12 text-xl flex flex-col items-center">
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 items-center justify-center">
          <a href="/terms" className="underline text-[#ffe14d] hover:text-yellow-300 text-base">Terms</a>
          <a href="/privacy" className="underline text-[#ffe14d] hover:text-yellow-300 text-base">Privacy</a>
          <span className="text-[#f3eccb] text-base">Copyright Goldeneggs.ai 2025</span>
        </div>
      </footer>
    </main>
  );
}
