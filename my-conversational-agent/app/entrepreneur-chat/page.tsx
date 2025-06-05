'use client';

import React, { useState } from 'react';
import { EntrepreneurConversation } from '../components/entrepreneur-conversation';
import Image from 'next/image';
import Link from 'next/link';
import { AuthBar } from '../components/AuthBar';

export default function EntrepreneurChat() {
  const [showCallout, setShowCallout] = useState(true);
  return (
    <main className="flex min-h-screen flex-col items-center p-4 sm:p-6 bg-[#f3eccb]">
      {/* Callout Overlay */}
      {/* Removed the overlay modal */}
      {/* Main Content */}
      <div className={'w-full max-w-4xl mx-auto'}>
        <div className="flex items-center justify-between w-full mb-4">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition">
            <Image src="/logo.png" alt="goldeneggs.ai logo" width={48} height={48} />
            <span className="text-2xl font-bold text-[#217a5b]" style={{ fontFamily: 'Avenir Next Arabic, sans-serif', fontWeight: 'bold' }}>goldeneggs.ai</span>
          </Link>
          <AuthBar />
        </div>
        <div className="flex flex-col items-center w-full mt-4 mb-8">
          <div className="relative flex flex-col items-center w-full">
            <Image src="/egg-chicken.png" alt="Goose" width={60} height={60} className="absolute -top-10 left-1/2 -translate-x-1/2" />
            <h1 className="text-3xl sm:text-4xl font-bold text-[#217a5b] text-center mt-8">Pave your way to Entrepreneurship</h1>
            <p className="text-lg text-[#217a5b] text-center mt-2 mb-6">413 people like yourself have talked with our experts' digital twins.</p>
            <div className="w-full max-w-2xl mb-8">
              <EntrepreneurConversation />
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-8 w-full items-center justify-center mb-8">
            <div className="flex flex-col items-center w-full max-w-xs">
              <Image src="/images/PRof stern.png" alt="Prof. Kagan" width={350} height={350} className="object-cover w-full h-auto rounded-lg" />
            </div>
            <div className="flex flex-col items-start w-full max-w-md">
              <p className="text-[#217a5b] font-semibold mb-2">This digital twin is brought to you through AI training on Professor's past</p>
              <ul className="list-disc list-inside text-[#217a5b] mb-4 ml-4">
                <li>Audio chats</li>
                <li>Textbooks</li>
                <li>Lecture Slides</li>
                <li>Recorded Lectures</li>
              </ul>
              <button className="bg-[#ffe14d] text-[#217a5b] font-bold rounded-md px-6 py-2 shadow hover:bg-yellow-300 transition mb-2">Make your own Digital Twin here</button>
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
      </div>
    </main>
  );
} 