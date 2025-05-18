'use client';

import React from 'react';
import { MacyConversation } from '../components/macy-conversation';
import Image from 'next/image';
import Link from 'next/link';

export default function MacyChat() {
  return (
    <main className="flex min-h-screen flex-col items-center p-4 sm:p-6 bg-gradient-to-b from-pink-50 to-white">
      <div className="z-10 w-full max-w-3xl mx-auto">
        <div className="w-full">
          <header className="mb-8 text-center flex flex-col items-center">
            <Link 
              href="/"
              className="mb-4 px-4 py-2 bg-pink-500 text-white rounded-lg text-sm hover:bg-pink-600 transition-all self-start"
            >
              ← Back to Home
            </Link>
            
            <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden mb-4 sm:mb-6 border-4 border-pink-500 shadow-lg">
              <Image 
                src="/images/macy.jpg" 
                alt="Macy" 
                fill
                className="object-cover" 
                priority
              />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-pink-600 mb-2 sm:mb-3">Chat with Macy</h1>
            <p className="text-gray-600 max-w-xl text-center text-sm mb-4">
              Your modern dating BFF is here to help! Whether you need advice on your dating profile, messaging tips, or relationship guidance, Macy's got your back with practical, up-to-date advice.
            </p>
          </header>
          
          <div className="w-full bg-white rounded-xl shadow-md overflow-hidden">
            <MacyConversation />
          </div>
          
          <footer className="mt-8 sm:mt-12 text-center text-gray-500 text-xs sm:text-sm">
            <p className="mb-1">Click "Start Conversation" to begin chatting with Macy.</p>
            <p>Ask about dating app strategies, relationship advice, online messaging tips, or anything else about modern love!</p>
          </footer>
        </div>
      </div>
    </main>
  );
} 