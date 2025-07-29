'use client';

import React, { useState } from 'react';
import { EntrepreneurConversation } from '../components/entrepreneur-conversation';
import Image from 'next/image';
import Link from 'next/link';
import { AuthBar } from '../components/AuthBar';

export default function EntrepreneurChat() {
  const [showCallout, setShowCallout] = useState(true);
  return (
    <main className="flex min-h-screen flex-col items-center p-4 sm:p-6" style={{ background: 'var(--background)', color: 'var(--foreground)' }}>
      {/* Callout Overlay */}
      {/* Removed the overlay modal */}
      {/* Main Content */}
      <div className={'w-full max-w-4xl mx-auto'}>
        <header className="w-full bg-[var(--accent)] shadow-md">
          <div className="flex items-center justify-between w-full mb-4">
            <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition">
              <Image src="/logo.png" alt="XL AI logo" width={50} height={50} className="h-12 w-auto" />
              <span className="font-bold text-2xl sm:text-3xl tracking-tight" style={{ color: 'var(--primary-color-light)', letterSpacing: '-0.03em' }}>XL AI</span>
            </Link>
            <AuthBar />
          </div>
        </header>
        <div className="flex flex-col items-center w-full mt-4 mb-8">
          <div className="relative flex flex-col items-center w-full">
            <h1 className="text-3xl sm:text-4xl font-bold text-center mt-8" style={{ color: 'var(--primary-color-light)' }}>Pave your way to Entrepreneurship</h1>
            <p className="text-lg text-center mt-2 mb-6" style={{ color: 'var(--primary-color-light)' }}>413 people like yourself have talked with our experts' digital twins.</p>
            <div className="w-full max-w-2xl mb-8">
              <EntrepreneurConversation />
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-8 w-full items-center justify-center mb-8">
            <div className="flex flex-col items-center w-full max-w-xs">
              <Image src="/images/PRof stern.png" alt="Prof. Kagan" width={350} height={350} className="object-cover w-full h-auto rounded-lg" />
            </div>
            <div className="flex flex-col items-start w-full max-w-md">
              <p className="font-semibold mb-2" style={{ color: 'var(--primary-color-light)' }}>This digital twin is brought to you through AI training on Professor's past</p>
              <ul className="list-disc list-inside mb-4 ml-4" style={{ color: 'var(--primary-color-light)' }}>
                <li>Audio chats</li>
                <li>Textbooks</li>
                <li>Lecture Slides</li>
                <li>Recorded Lectures</li>
              </ul>
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLSf4ub0gWhBIYV7kyR4FAbvdEKa8X3E43pxd8ZacTsDZZ07dcQ/viewform?usp=header"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold rounded-md px-6 py-2 shadow transition mb-2 text-center"
                style={{ background: 'var(--primary-gradient)', color: 'var(--button-text)' }}
              >
                Make your own Digital Twin here
              </a>
            </div>
          </div>
        </div>
        <footer className="w-full text-center py-12 text-xl flex flex-col items-center" style={{ background: 'var(--accent)', color: 'var(--primary-color-light)' }}>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 items-center justify-center">
            <a href="/terms" className="underline text-base" style={{ color: 'var(--primary-color-light)' }}>Terms</a>
            <a href="/privacy" className="underline text-base" style={{ color: 'var(--primary-color-light)' }}>Privacy</a>
            <span className="text-base">Copyright XL AI 2025</span>
          </div>
        </footer>
      </div>
    </main>
  );
} 