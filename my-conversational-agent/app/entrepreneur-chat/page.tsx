'use client';

import React from 'react';
import { EntrepreneurConversation } from '../components/entrepreneur-conversation';
import Image from 'next/image';
import Link from 'next/link';
import { AuthBar } from '../components/AuthBar';

export default function EntrepreneurChat() {
  return (
    <main className="flex min-h-screen flex-col items-center p-4 sm:p-6 bg-[#f3eccb]">
      <div className="w-full max-w-4xl mx-auto">
        <div className="flex items-center justify-between w-full mb-4">
          <div className="flex items-center gap-2">
            <Image src="/logo.png" alt="goldeneggs.ai logo" width={48} height={48} />
            <span className="text-2xl font-bold text-[#217a5b]" style={{ fontFamily: 'Avenir Next Arabic, sans-serif', fontWeight: 'bold' }}>goldeneggs.ai</span>
            <span className="ml-2 px-2 py-0.5 text-xs bg-gray-200 rounded text-gray-700 font-semibold">BETA</span>
          </div>
          <AuthBar />
        </div>
        <div className="z-10 w-full max-w-3xl mx-auto">
          <div className="w-full">
            <header className="mb-8 text-center flex flex-col items-center">
              <Link 
                href="/"
                className="mb-4 px-4 py-2 bg-[#217a5b] text-white rounded-lg text-sm hover:bg-[#175c44] transition-all self-start"
              >
                ← Back to Home
              </Link>
              
              <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden mb-4 sm:mb-6 border-4" style={{ borderColor: '#217a5b' }}>
                <Image 
                  src="/images/professorJeremy.jpeg" 
                  alt="Professor Jeremy Kagan" 
                  fill
                  className="object-cover" 
                  priority
                />
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold mb-2 sm:mb-3" style={{ color: '#217a5b' }}>Startup Mentoring with Prof. Kagan</h1>
              <p className="text-gray-600 max-w-xl text-center text-sm mb-4">
                Jeremy Kagan is a Professor at NYU Stern School of Business and a seasoned entrepreneur. 
                He specializes in helping founders launch ventures with clarity and confidence.
              </p>
            </header>
            
            <div className="w-full bg-white rounded-xl shadow-md overflow-hidden">
              <EntrepreneurConversation />
            </div>
            
            <footer className="mt-8 sm:mt-12 text-center text-gray-500 text-xs sm:text-sm">
              <p className="mb-1">Click "Start Conversation" and allow microphone access to begin.</p>
              <p>Ask questions about startup strategies, business models, fundraising, or product-market fit.</p>
            </footer>
          </div>
        </div>
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