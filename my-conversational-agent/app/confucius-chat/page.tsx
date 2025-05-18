'use client';

import React from 'react';
import { ConfuciusConversation } from '../components/confucius-conversation';
import Image from 'next/image';
import Link from 'next/link';

export default function ConfuciusChat() {
  return (
    <main className="flex min-h-screen flex-col items-center p-4 sm:p-6 bg-gradient-to-b from-red-50 to-white">
      <div className="z-10 w-full max-w-3xl mx-auto">
        <div className="w-full">
          <header className="mb-8 text-center flex flex-col items-center">
            <Link 
              href="/"
              className="mb-4 px-4 py-2 bg-red-600 text-white rounded-lg text-sm hover:bg-red-700 transition-all self-start"
            >
              ← Back to Home
            </Link>
            
            <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden mb-4 sm:mb-6 border-4 border-red-600 shadow-lg">
              <Image 
                src="/images/confucious.jpg" 
                alt="Confucius" 
                fill
                className="object-cover" 
                priority
              />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-red-700 mb-2 sm:mb-3">Wisdom of Confucius</h1>
            <p className="text-gray-600 max-w-xl text-center text-sm mb-4">
              Explore the ancient teachings of Confucius, the influential Chinese philosopher whose ideas on ethics, morality, and social philosophy have shaped Eastern civilization for over 2,500 years.
            </p>
          </header>
          
          <div className="w-full bg-white rounded-xl shadow-md overflow-hidden">
            <ConfuciusConversation />
          </div>
          
          <footer className="mt-8 sm:mt-12 text-center text-gray-500 text-xs sm:text-sm">
            <p className="mb-1">Click "Start Conversation" and allow microphone access to begin.</p>
            <p>Ask questions about Confucian philosophy, virtue, wisdom, government, or social relationships.</p>
          </footer>
        </div>
      </div>
    </main>
  );
} 