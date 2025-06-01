'use client';
import { useState, useEffect, useRef } from 'react';
import { LoginModal } from './login-modal';
import { EmailSignupModal } from './email-signup-modal';

export function AuthBar() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof document !== 'undefined') {
      const raw = document.cookie.split('; ').find(row => row.startsWith('user_email='))?.split('=')[1];
      setUserEmail(raw ? decodeURIComponent(raw) : null);
    }
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMobileMenu(false);
      }
    }
    if (showMobileMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showMobileMenu]);

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
    <div className="flex items-center p-4 sm:p-4 px-2 sm:px-4 relative">
      {/* Desktop Auth Buttons */}
      <div className="hidden sm:flex items-center">
        {userEmail ? (
          <>
            <span className="mr-4 text-gray-700 text-sm sm:text-base truncate max-w-[100px] sm:max-w-none">{userEmail}</span>
            <button
              onClick={handleLogout}
              className="px-3 py-1 sm:px-4 sm:py-2 bg-black text-white rounded-full mr-2 text-sm sm:text-base"
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
              className="px-3 py-1 sm:px-4 sm:py-2 bg-[#217a5b] text-white rounded-full mr-2 text-sm sm:text-base"
            >
              Log in
            </button>
            <button
              onClick={() => {
                if (!userEmail) setShowSignupModal(true);
              }}
              className="px-3 py-1 sm:px-4 sm:py-2 text-black rounded-full bg-white text-sm sm:text-base"
            >
              Sign up
            </button>
          </>
        )}
      </div>
      {/* Mobile Hamburger */}
      <div className="sm:hidden flex items-center ml-2">
        <button
          aria-label="Open menu"
          className="focus:outline-none p-2 rounded"
          onClick={() => setShowMobileMenu((v) => !v)}
        >
          {/* Hamburger icon */}
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#217a5b" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="4" y1="6" x2="20" y2="6" /><line x1="4" y1="12" x2="20" y2="12" /><line x1="4" y1="18" x2="20" y2="18" /></svg>
        </button>
        {/* Dropdown menu */}
        {showMobileMenu && (
          <div ref={menuRef} className="absolute right-2 top-14 z-50 bg-white rounded-lg shadow-lg flex flex-col w-40 border border-gray-100 animate-fade-in">
            {userEmail ? (
              <>
                <span className="px-4 py-2 text-gray-700 text-sm border-b border-gray-100">{userEmail}</span>
                <button
                  onClick={() => { handleLogout(); setShowMobileMenu(false); }}
                  className="px-4 py-2 text-left text-black hover:bg-gray-100 w-full"
                >
                  Log out
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => { setShowLoginModal(true); setShowMobileMenu(false); }}
                  className="px-4 py-2 text-left text-black hover:bg-gray-100 w-full"
                >
                  Log in
                </button>
                <button
                  onClick={() => { setShowSignupModal(true); setShowMobileMenu(false); }}
                  className="px-4 py-2 text-left text-black hover:bg-gray-100 w-full"
                >
                  Sign up
                </button>
              </>
            )}
          </div>
        )}
      </div>
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
