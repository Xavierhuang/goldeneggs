'use client';

import { useState } from 'react';
import Image from 'next/image';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: () => void;
}

export function LoginModal({ isOpen, onClose, onLogin }: LoginModalProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Login failed');
      }
      onLogin();
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[#28776e] rounded-2xl p-10 pt-24 max-w-lg w-full mx-4 flex flex-col items-center relative" style={{ minWidth: 370 }}>
        {/* Close button - must be first child for top right positioning */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white text-2xl font-bold hover:text-yellow-300 focus:outline-none z-10"
          aria-label="Close"
        >
          &times;
        </button>
        {/* Logo */}
        <div className="flex flex-col items-center mb-4 w-full">
          <Image src="/logo.png" alt="goldeneggs logo" width={70} height={70} className="mb-2" />
          <h2 className="text-4xl font-bold mb-6 text-[#ffe14d] text-center">Login</h2>
        </div>
        <form onSubmit={handleSubmit} className="w-full flex flex-col items-center gap-4">
          <div className="w-full relative flex items-center">
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-yellow-300 text-lg"
              required
            />
            {/* Goose image */}
            <div className="absolute right-[-60px] top-[-30px] hidden md:block">
              <Image src="/egg-chicken.png" alt="Goose" width={70} height={70} />
            </div>
          </div>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-yellow-300 text-lg"
            required
          />
          {error && <div className="text-red-500 mb-2 w-full text-center">{error}</div>}
          <button
            type="submit"
            disabled={isSubmitting || !email || !password}
            className="w-1/2 mx-auto bg-[#ffe14d] text-[#217a5b] font-semibold rounded-full px-8 py-2 shadow hover:bg-yellow-300 transition text-xl mt-4 disabled:opacity-60"
          >
            {isSubmitting ? 'Logging in...' : 'Log in'}
          </button>
        </form>
      </div>
    </div>
  );
} 