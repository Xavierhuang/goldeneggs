'use client';
import { useState, useEffect } from 'react';
import { LoginModal } from './login-modal';
import { EmailSignupModal } from './email-signup-modal';

export function AuthBar() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    if (typeof document !== 'undefined') {
      const raw = document.cookie.split('; ').find(row => row.startsWith('user_email='))?.split('=')[1];
      setUserEmail(raw ? decodeURIComponent(raw) : null);
    }
  }, []);

  const handleLogin = () => {
    if (typeof document !== 'undefined') {
      const email = document.cookie.split('; ').find(row => row.startsWith('user_email='))?.split('=')[1];
      setUserEmail(email || null);
    }
  };

  const handleLogout = () => {
    document.cookie = 'user_email=; Max-Age=0; path=/;';
    setUserEmail(null);
  };

  return (
    <div className="w-full flex justify-end items-center p-4">
      {userEmail ? (
        <>
          <span className="mr-4 text-gray-700">{userEmail}</span>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-black text-white rounded-full mr-2"
          >
            Log out
          </button>
        </>
      ) : (
        <>
          <button
            onClick={() => {
              if (!userEmail) setShowLoginModal(true);
            }}
            className="px-4 py-2 bg-black text-white rounded-full mr-2"
          >
            Log in
          </button>
          <button
            onClick={() => {
              if (!userEmail) setShowSignupModal(true);
            }}
            className="px-4 py-2 border border-black text-black rounded-full bg-white"
          >
            Sign up
          </button>
        </>
      )}
      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onLogin={handleLogin}
      />
      <EmailSignupModal
        isOpen={showSignupModal}
        onClose={() => setShowSignupModal(false)}
        onSubmit={handleLogin}
      />
    </div>
  );
}
