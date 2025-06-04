import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-[#215c53] to-[#28776e] flex flex-col items-center py-10 px-2">
      <div className="w-full max-w-5xl bg-transparent rounded-3xl p-6 md:p-12 flex flex-col items-center relative">
        <div className="flex flex-row justify-between items-start w-full mb-8">
          <h1 className="text-4xl md:text-6xl font-bold text-[#ffe14d]">Goldeneggs Privacy Policy</h1>
          <div className="hidden md:block">
            <Image src="/logo.png" alt="Goldeneggs logo" width={90} height={90} />
          </div>
          <div className="block md:hidden">
            <Image src="/logo.png" alt="Goldeneggs logo" width={50} height={50} />
          </div>
        </div>
        <div className="text-[#f3eccb] text-base md:text-lg w-full max-w-3xl mx-auto space-y-6" style={{lineHeight: '1.7'}}>
          <p className="font-semibold">Effective Date: Jan 2025</p>
          <p>This Privacy Policy explains how Goldeneggs ("we", "us", "our") collects, uses, and protects your information when you use our platform.</p>
          <ol className="list-decimal list-inside space-y-4">
            <li>
              <span className="font-bold">Information We Collect</span>
              <ul className="list-disc list-inside ml-6 mt-2 space-y-1">
                <li>Information you provide directly (such as your email address, name, or other details you enter).</li>
                <li>Usage data and analytics collected automatically when you use the Platform.</li>
              </ul>
            </li>
            <li>
              <span className="font-bold">How We Use Your Information</span>
              <ul className="list-disc list-inside ml-6 mt-2 space-y-1">
                <li>To provide, maintain, and improve our services.</li>
                <li>To communicate with you about updates, features, and offers.</li>
                <li>To ensure the security and integrity of the Platform.</li>
              </ul>
            </li>
            <li>
              <span className="font-bold">How We Protect Your Information</span>
              <ul className="list-disc list-inside ml-6 mt-2 space-y-1">
                <li>We use industry-standard security measures to protect your data.</li>
                <li>We do not sell your personal information to third parties.</li>
              </ul>
            </li>
            <li>
              <span className="font-bold">Your Choices</span>
              <ul className="list-disc list-inside ml-6 mt-2 space-y-1">
                <li>You may opt out of marketing emails at any time by following the unsubscribe link in our emails.</li>
                <li>You may request deletion of your data by contacting us at <a href="mailto:support@goldeneggs.ai" className="underline text-[#ffe14d]">support@goldeneggs.ai</a>.</li>
              </ul>
            </li>
            <li>
              <span className="font-bold">Changes to This Policy</span>
              <p className="ml-6">We may update this Privacy Policy from time to time. Changes will be effective upon posting. Continued use of the Platform after changes are posted constitutes your acceptance of the revised Policy.</p>
            </li>
          </ol>
          <p className="mt-8">If you have any questions or concerns about this Privacy Policy, please contact us at <a href="mailto:support@goldeneggs.ai" className="underline text-[#ffe14d]">support@goldeneggs.ai</a>.</p>
          <div className="mt-8">
            <Link href="/" className="text-[#ffe14d] underline font-semibold">&larr; Back to Home</Link>
          </div>
        </div>
      </div>
    </div>
  );
} 