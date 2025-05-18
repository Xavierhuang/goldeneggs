'use client';

import React from 'react';
import { EntrepreneurConversation } from '../components/entrepreneur-conversation';
import Image from 'next/image';
import Link from 'next/link';

export default function EntrepreneurChat() {
  return (
    <main className="flex min-h-screen flex-col items-center p-4 sm:p-6 bg-gradient-to-b from-green-50 to-white">
      <div className="z-10 w-full max-w-3xl mx-auto">
        <div className="w-full">
          <header className="mb-8 text-center flex flex-col items-center">
            <Link 
              href="/"
              className="mb-4 px-4 py-2 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700 transition-all self-start"
            >
              ← Back to Home
            </Link>
            
            <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden mb-4 sm:mb-6 border-4 border-green-600 shadow-lg">
              <Image 
                src="/images/professorJeremy.jpeg" 
                alt="Professor Jeremy Kagan" 
                fill
                className="object-cover" 
                priority
              />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-green-700 mb-2 sm:mb-3">Startup Mentoring with Prof. Kagan</h1>
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
    </main>
  );
} 