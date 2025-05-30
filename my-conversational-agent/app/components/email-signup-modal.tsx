'use client';

import { useState } from 'react';

interface EmailSignupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (email: string, password: string) => void;
}

export function EmailSignupModal({ isOpen, onClose, onSubmit }: EmailSignupModalProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

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
        <h2 className="text-xl font-semibold mb-4">Stay Connected!</h2>
        <p className="text-gray-600 mb-4">
          Subscribe to receive updates about new features and improvements.
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
          {error && <div style={{ color: 'red', marginBottom: 8 }}>{error}</div>}
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
              disabled={isSubmitting || !email}
              className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Submitting...' : 'Subscribe'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 