'use client';

import { useState } from 'react';

interface EmailSignupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (email: string, password: string) => void;
  onLoginLink?: () => void;
}

export function EmailSignupModal({ isOpen, onClose, onSubmit, onLoginLink }: EmailSignupModalProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [agreed, setAgreed] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setError('');
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (data.alreadyRegistered) {
        setError('Email already registered. Logging you in...');
        setTimeout(() => {
          setError('');
          onClose();
        }, 1200);
        return;
      }
      if (!response.ok) {
        throw new Error(data.error || 'Failed to subscribe');
      }
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to subscribe');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <h2 className="text-xl font-semibold mb-4">Sign Up</h2>
        <p className="text-gray-600 mb-4">
          Sign up to receive updates about new features and improvements.
        </p>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 mb-4"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Create a password (optional)"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 mb-4"
          />
          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              id="terms"
              checked={agreed}
              onChange={e => setAgreed(e.target.checked)}
              className="mr-2"
              required
            />
            <label htmlFor="terms" className="text-sm text-gray-700">
              I agree to the
              <a href="/terms" className="underline text-[#217a5b] mx-1" target="_blank">Terms of Service</a>
              and
              <a href="/privacy" className="underline text-[#217a5b] mx-1" target="_blank">Privacy Policy</a>
            </label>
          </div>
          {error && <div style={{ color: 'red', marginBottom: 8 }}>{error.replace('subscribe', 'sign up').replace('subscribed', 'signed up')}</div>}
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Skip
            </button>
            <button
              type="submit"
              disabled={isSubmitting || !email || !agreed}
              className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Signing up...' : 'Sign Up'}
            </button>
          </div>
        </form>
        <div className="mt-4 text-center">
          <span className="text-gray-600 text-sm">Already have an account? </span>
          <button
            type="button"
            onClick={() => {
              onClose();
              if (onLoginLink) onLoginLink();
            }}
            className="text-purple-700 hover:underline text-sm font-semibold ml-1"
          >
            Log In
          </button>
        </div>
      </div>
    </div>
  );
} 