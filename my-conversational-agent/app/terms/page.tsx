import React from 'react';
import Image from 'next/image';

export default function TermsPage() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-[#215c53] to-[#28776e] flex flex-col items-center py-10 px-2">
      <div className="w-full max-w-5xl bg-transparent rounded-3xl p-6 md:p-12 flex flex-col items-center relative">
        {/* Header row */}
        <div className="flex flex-row justify-between items-start w-full mb-8">
          <h1 className="text-4xl md:text-6xl font-bold text-[#ffe14d]">Goldeneggs Terms of Service</h1>
          <div className="hidden md:block">
            <Image src="/logo.png" alt="Goldeneggs logo" width={90} height={90} />
          </div>
          <div className="block md:hidden">
            <Image src="/logo.png" alt="Goldeneggs logo" width={50} height={50} />
          </div>
        </div>
        <div className="text-[#f3eccb] text-base md:text-lg w-full max-w-3xl mx-auto space-y-6" style={{lineHeight: '1.7'}}>
          <p className="font-semibold">Effective Date: Jan 2025</p>
          <p>Welcome to Goldeneggs ("we", "us", "our"), an AI-powered coaching platform designed to support users ("you", "your") in personal and professional development. By accessing or using Goldeneggs services, websites, or applications (collectively, the "Platform"), you agree to be bound by these Terms of Service ("Terms").</p>
          <p>If you do not agree to these Terms, do not access or use the Platform.</p>
          <ol className="list-decimal list-inside space-y-4">
            <li>
              <span className="font-bold">Use of the Platform</span>
              <ul className="list-disc list-inside ml-6 mt-2 space-y-1">
                <li>The Platform is for informational, educational, and self-improvement purposes only.</li>
                <li>The AI-generated content does not constitute professional advice (e.g., legal, financial, psychological, or medical).</li>
                <li>You are solely responsible for decisions and actions taken based on the Platform's output.</li>
              </ul>
            </li>
            <li>
              <span className="font-bold">Eligibility</span>
              <p className="ml-6">You must be at least 18 years old (or the age of legal majority in your jurisdiction) to use the Platform. By using the Platform, you represent and warrant that you meet these requirements.</p>
            </li>
            <li>
              <span className="font-bold">No Guarantees or Warranties</span>
              <ul className="list-disc list-inside ml-6 mt-2 space-y-1">
                <li>The Platform is provided "AS IS" and "AS AVAILABLE" without warranties of any kind.</li>
                <li>No specific outcomes, improvements, or results are guaranteed.</li>
                <li>We do not guarantee the service will be error-free, uninterrupted, or secure.</li>
                <li>We do not guarantee all data or interactions will be accurate, current, or appropriate for your circumstances.</li>
              </ul>
            </li>
            <li>
              <span className="font-bold">Limitation of Liability</span>
              <ul className="list-disc list-inside ml-6 mt-2 space-y-1">
                <li>To the fullest extent permitted by law, Goldeneggs and its affiliates, officers, employees, agents, partners, and licensors shall not be liable for any indirect, incidental, special, consequential, or punitive damages.</li>
                <li>We are not liable for any loss of profits, data, or goodwill, or for any decision made or action taken by you or anyone else based on content from the Platform.</li>
                <li>Our total liability to you for all claims is limited to the greater of: (a) the amount you paid us (if any) in the 6 months before the claim, or (b) $50 USD.</li>
              </ul>
            </li>
            <li>
              <span className="font-bold">User Responsibilities</span>
              <ul className="list-disc list-inside ml-6 mt-2 space-y-1">
                <li>Use the Platform only for lawful purposes.</li>
                <li>Do not use it to harm yourself or others, or disrupt the Platform or its users.</li>
                <li>Do not attempt to reverse engineer, copy, or misuse any part of the AI technology or software.</li>
              </ul>
            </li>
            <li>
              <span className="font-bold">Intellectual Property</span>
              <p className="ml-6">All content, algorithms, software, and branding associated with Goldeneggs are owned or licensed by us and protected by intellectual property laws. You may not use our content or marks without prior written consent.</p>
            </li>
            <li>
              <span className="font-bold">Privacy</span>
              <p className="ml-6">Your use of the Platform is also governed by our <a href="/privacy" className="underline text-[#ffe14d]">Privacy Policy</a>, which explains how we collect, use, and protect your information.</p>
            </li>
            <li>
              <span className="font-bold">Termination</span>
              <p className="ml-6">We reserve the right to suspend or terminate your access to the Platform at any time, without notice or liability, for any reason, including violation of these Terms.</p>
            </li>
            <li>
              <span className="font-bold">Changes to Terms</span>
              <p className="ml-6">We may modify these Terms at any time. Changes will be effective upon posting. Continued use of the Platform after changes are posted constitutes your acceptance of the revised Terms.</p>
            </li>
            <li>
              <span className="font-bold">Governing Law</span>
              <p className="ml-6">These Terms are governed by and construed in accordance with the laws of [Your Jurisdiction], without regard to its conflict of law principles. You agree to submit to the exclusive jurisdiction of the courts located in [City, State/Country].</p>
            </li>
            <li>
              <span className="font-bold">Contact Us</span>
              <p className="ml-6">For any questions or concerns about these Terms, please contact us at: <a href="mailto:support@goldeneggs.ai" className="underline text-[#ffe14d]">support@goldeneggs.ai</a></p>
            </li>
          </ol>
          <p className="mt-8">By using Goldeneggs, you acknowledge that you have read, understood, and agree to be bound by these Terms.</p>
        </div>
      </div>
    </div>
  );
} 