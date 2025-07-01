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
      <div className="rounded-2xl p-8 max-w-md w-full mx-4" style={{ background: 'var(--accent)', color: 'var(--primary-color-light)' }}>
        <h2 className="text-2xl font-bold mb-4 text-center" style={{ color: 'var(--primary-color-light)' }}>Sign Up</h2>
        <p className="mb-4 text-center" style={{ color: 'var(--primary-color-light)', opacity: 0.85 }}>
          Sign up to receive updates about new features and improvements.
        </p>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full px-4 py-3 rounded-lg border mb-4 bg-[var(--background)] text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Create a password (optional)"
            className="w-full px-4 py-3 rounded-lg border mb-4 bg-[var(--background)] text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
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
            <label htmlFor="terms" className="text-sm" style={{ color: 'var(--primary-color-light)' }}>
              I agree to the
              <a href="/terms" className="underline mx-1" style={{ color: 'var(--primary-color-light)' }} target="_blank">Terms of Service</a>
              and
              <a href="/privacy" className="underline mx-1" style={{ color: 'var(--primary-color-light)' }} target="_blank">Privacy Policy</a>
            </label>
          </div>
          {error && <div style={{ color: 'red', marginBottom: 8 }}>{error.replace('subscribe', 'sign up').replace('subscribed', 'signed up')}</div>}
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-md"
              style={{ color: 'var(--primary-color-light)', background: 'transparent', border: '1px solid var(--primary-color-light)' }}
            >
              Skip
            </button>
            <button
              type="submit"
              disabled={isSubmitting || !email || !agreed}
              className="px-4 py-2 rounded-md font-semibold shadow transition"
              style={isSubmitting || !email || !agreed
                ? { background: 'var(--accent)', color: 'var(--primary-color-light)', opacity: 0.6, cursor: 'not-allowed' }
                : { background: 'var(--primary-gradient)', color: 'var(--button-text)', border: 'none' }}
            >
              {isSubmitting ? 'Signing up...' : 'Sign Up'}
            </button>
          </div>
        </form>
        <div className="mt-4 text-center">
          <span className="text-sm" style={{ color: 'var(--primary-color-light)', opacity: 0.8 }}>Already have an account? </span>
          <button
            type="button"
            onClick={() => {
              onClose();
              if (onLoginLink) onLoginLink();
            }}
            className="text-sm font-semibold ml-1 underline"
            style={{ color: 'var(--primary-color-light)' }}
          >
            Log In
          </button>
        </div>
      </div>
    </div>
  );
} 