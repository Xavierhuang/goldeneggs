import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { AuthBar } from './components/AuthBar';
import NewsletterSignupForm from './components/NewsletterSignupForm';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen" style={{ background: 'var(--background)', color: 'var(--foreground)' }}>
      <header className="w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-row items-center justify-between mb-4 px-2 w-full">
            <div className="flex items-center gap-2">
             <a href="/" className="flex items-center gap-2">
                <Image src="/logo.png" alt="XL AI logo" width={50} height={50} className="h-10 sm:h-12 w-auto" />
                <span className="font-bold text-2xl sm:text-3xl tracking-tight" style={{ color: 'var(--primary-color-light)', letterSpacing: '-0.03em' }}>XL AI</span>
             </a>
            </div>
            <AuthBar />
          </div>
        </div>
      </header>
      <main className="flex-grow">
        <div className="w-full max-w-7xl mx-auto">
          {/* Hero Section */}
          <section className="mt-2 mb-0 relative px-4 md:px-12">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-16">
              {/* Left: Text Content */}
              <div className="flex-1 text-center md:text-left flex flex-col items-center md:items-start">
                <div className="mb-4">
                  <span className="inline-block px-4 py-2 rounded-full border border-blue-400 text-blue-200 text-sm mb-4" style={{ background: 'rgba(44, 62, 80, 0.4)' }}>Mentorship on Demand</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold mb-2" style={{ color: 'var(--primary-color-light)' }}>
                  <span className="inline-block">A <span style={{ color: 'var(--primary-color)' }}>Fair-trade</span><br/>AI Platform</span>
                </h1>
                <p className="text-base md:text-lg max-w-xl mb-6" style={{ color: 'var(--primary-color-light)', fontFamily: 'Public Sans, sans-serif' }}>
                  Sky rocket your business and life goals with real time mentorship from the world's best experts with a simple hello.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center md:justify-start">
                  <Link href="/entrepreneur-chat" className="inline-block font-semibold rounded-md px-8 py-3 shadow transition" style={{ background: 'var(--primary-gradient)', color: 'var(--button-text)' }}>
                    Try it for Free
                  </Link>
                  <Link href="/experts" className="inline-block font-semibold rounded-md px-8 py-3 border border-blue-400 text-blue-200 bg-transparent transition" style={{ color: 'var(--primary-color-light)' }}>
                    Learn More
                  </Link>
                </div>
              </div>
              {/* Right: Video */}
              <div className="flex-1 flex justify-center items-center w-full md:w-auto">
                <video
                  src="/demovideo.mp4"
                  controls
                  autoPlay
                  muted
                  className="rounded-2xl shadow-lg w-full max-w-md md:max-w-lg"
                  style={{ background: '#223047' }}
                />
              </div>
            </div>
          </section>

          {/* Prof. Kagan Section */}
          <section className="w-full flex flex-col items-center justify-center mt-2 mb-12 px-2">
            <div className="w-full max-w-7xl mx-auto relative flex flex-col md:flex-row items-center md:items-stretch justify-center gap-8" style={{ minHeight: 520 }}>
              {/* Left bio */}
              <div className="hidden md:flex flex-col justify-center w-1/3 pr-4" style={{ color: 'var(--primary-color-light)', fontFamily: 'Public Sans, sans-serif', fontSize: '12px' }}>
                Jeremy Kagan is a Professor at NYU Stern School of Business and a seasoned entrepreneur. He specializes in helping founders launch ventures with clarity and confidence
              </div>
              {/* Centered Prof. Kagan image */}
              <div className="flex flex-col items-center justify-center w-full md:w-1/3">
                <Image src="/images/PRof stern.png" alt="Prof. Kagan" width={750} height={750} />
              </div>
              {/* Right experience/resources */}
              <div className="hidden md:flex flex-col justify-center w-1/3 pl-4" style={{ color: 'var(--primary-color-light)', fontFamily: 'Public Sans, sans-serif', fontSize: '12px' }}>
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
              <h2 className="text-4xl md:text-5xl font-bold mb-2" style={{ color: 'var(--primary-color-light)' }}>Achieve more, faster</h2>
              <p className="text-base md:text-lg max-w-2xl mx-auto mb-6" style={{ color: 'var(--primary-color)' }}>
                Great decisions come from great advice. Skip the guesswork and get instant access to professionals who've been where you are; and succeeded. Affordable sessions, no long-term commitments, just clarity and progress.
              </p>
              <Link href="/entrepreneur-chat" className="inline-block font-semibold rounded-full px-8 py-2 shadow transition" style={{ background: 'var(--primary-gradient)', color: 'var(--button-text)' }}>
                Try it for Free
              </Link>
            </div>
          </section>

          {/* About XL AI Section */}
          <section className="flex flex-col md:flex-row items-center justify-center gap-8 mb-16 px-2">
            <div className="rounded-xl p-8 md:p-10 max-w-xl w-full text-left shadow-lg" style={{ background: 'var(--accent)', color: 'var(--primary-color-light)' }}>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 flex items-center gap-2">About XL AI <Image src="/Logo without background .png" alt="XL AI logo" width={50} height={50} /></h2>
              <p className="text-base md:text-lg font-normal">
                At XL AI, we believe in the transformative power of collective intelligence; where every individual's data, insights, and expertise hold inherent value. Inspired by the timeless fable of the golden egg, we've created a platform that embodies the principles of fairness, innovation, and reciprocity, XL AI is redefining the relationship between data and value. We ensure individuals are rightfully rewarded for their contributions while democratizing access to knowledge, creating a sustainable ecosystem that benefits everyone.
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
                <h2 className="text-4xl font-bold text-center flex-1" style={{ color: 'var(--primary-color-light)' }}>Join Us</h2>
                <div className="hidden sm:block">
                  <Image src="/egg-dot.png" alt="Golden Egg" width={48} height={48} className="ml-2" />
                </div>
              </div>
              <div className="block sm:hidden mt-2">
                <Image src="/egg-dot.png" alt="Golden Egg" width={48} height={48} />
              </div>
            </div>
            <p className="text-lg mb-6 text-center max-w-2xl" style={{ color: 'var(--primary-color)' }}>Stay up to date with our journey and get notified when we add new experts</p>
            <NewsletterSignupForm />
          </section>
        </div>
        <footer className="w-full text-center py-12 text-xl flex flex-col items-center" style={{ background: 'var(--accent)', color: 'var(--primary-color-light)' }}>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 items-center justify-center">
            <a href="/terms" className="underline text-base" style={{ color: 'var(--primary-color-light)' }}>Terms</a>
            <a href="/privacy" className="underline text-base" style={{ color: 'var(--primary-color-light)' }}>Privacy</a>
          </div>
          <div className="mt-4 text-sm">
            Copyright XL AI 2025
          </div>
        </footer>
      </main>
    </div>
  );
}
