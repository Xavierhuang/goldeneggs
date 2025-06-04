'use client';
import React, { useState } from 'react';

export default function NewsletterSignupForm() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setStatus('idle');
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (res.ok && !data.error) {
        setStatus('success');
        setMessage('Thank you for subscribing!');
        setEmail('');
      } else {
        setStatus('error');
        setMessage(data.error || 'Something went wrong.');
      }
    } catch {
      setStatus('error');
      setMessage('Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center w-full max-w-xl">
      <input
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="Enter your email address"
        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-300 mb-4 text-lg bg-white"
        required
        disabled={loading}
      />
      <button
        type="submit"
        className="bg-[#ffe14d] text-[#217a5b] font-semibold rounded-full px-8 py-2 shadow hover:bg-yellow-300 transition mb-2 text-lg"
        disabled={loading || !email}
      >
        {loading ? 'Submitting...' : 'Submit'}
      </button>
      {status === 'success' && <div className="text-green-600 mt-2">{message}</div>}
      {status === 'error' && <div className="text-red-600 mt-2">{message}</div>}
    </form>
  );
}
