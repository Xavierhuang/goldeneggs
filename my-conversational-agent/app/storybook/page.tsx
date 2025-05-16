'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import './storybook.css';
import { NarrationProvider, useNarration } from './narration-context';

// VoiceControls component to handle interaction with the voice agent
function VoiceControls() {
  const { 
    isAgentConnected, 
    startConversation, 
    stopConversation, 
    promptSuggestion,
    error, 
    isLoading 
  } = useNarration();

  return (
    <div className="mt-4 bg-white rounded-lg shadow p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-blue-600">Interactive Voice Narration</h3>
        
        <div className="flex gap-2">
          {!isAgentConnected ? (
            <button
              onClick={startConversation}
              disabled={isLoading}
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50 transition-colors"
            >
              {isLoading ? 'Connecting...' : 'Start Narrator'}
            </button>
          ) : (
            <button
              onClick={stopConversation}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            >
              Stop Narrator
            </button>
          )}
        </div>
      </div>

      {error && (
        <div className="text-red-500 mb-4 p-3 bg-red-50 rounded-lg text-sm border border-red-200">
          {error}
        </div>
      )}

      {isAgentConnected && (
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-sm font-medium text-green-600">Narrator is active. Speak to interact!</span>
        </div>
      )}

      <div className="mt-4">
        <h4 className="text-sm font-medium text-gray-700 mb-2">Voice Prompts:</h4>
        <div className="bg-blue-50 p-3 rounded text-sm text-blue-800">
          {promptSuggestion}
        </div>
      </div>
    </div>
  );
}

// Main storybook component that wraps everything with the NarrationProvider
export default function Storybook() {
  const [currentPage, setCurrentPage] = useState(1);
  const [isZoomed, setIsZoomed] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [animationClass, setAnimationClass] = useState('');
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const autoPlayTimerRef = useRef<NodeJS.Timeout | null>(null);
  const totalPages = 36; // Total number of pages in the book
  const autoPlayDelay = 7000; // 7 seconds per page
  
  const goToNextPage = () => {
    if (currentPage < totalPages && !isAnimating) {
      setIsAnimating(true);
      setAnimationClass('page-flip-enter');
      setTimeout(() => {
        setCurrentPage(currentPage + 1);
        setIsAnimating(false);
      }, 300);
    } else if (currentPage >= totalPages && isAutoPlaying) {
      // If we reached the end during auto-play, stop it
      stopAutoPlay();
    }
  };
  
  const goToPrevPage = () => {
    if (currentPage > 1 && !isAnimating) {
      setIsAnimating(true);
      setAnimationClass('page-flip-enter');
      setTimeout(() => {
        setCurrentPage(currentPage - 1);
        setIsAnimating(false);
      }, 300);
    }
  };
  
  const toggleZoom = () => {
    setIsZoomed(!isZoomed);
    if (isAutoPlaying) {
      stopAutoPlay();
    }
  };
  
  const startAutoPlay = () => {
    setIsAutoPlaying(true);
    if (autoPlayTimerRef.current) {
      clearTimeout(autoPlayTimerRef.current);
    }
    
    autoPlayTimerRef.current = setTimeout(() => {
      goToNextPage();
    }, autoPlayDelay);
  };
  
  const stopAutoPlay = () => {
    setIsAutoPlaying(false);
    if (autoPlayTimerRef.current) {
      clearTimeout(autoPlayTimerRef.current);
      autoPlayTimerRef.current = null;
    }
  };
  
  const toggleAutoPlay = () => {
    if (isAutoPlaying) {
      stopAutoPlay();
    } else {
      startAutoPlay();
    }
  };
  
  // Set up auto-play timer
  useEffect(() => {
    if (isAutoPlaying && !isAnimating && currentPage < totalPages) {
      autoPlayTimerRef.current = setTimeout(() => {
        goToNextPage();
      }, autoPlayDelay);
    }
    
    return () => {
      if (autoPlayTimerRef.current) {
        clearTimeout(autoPlayTimerRef.current);
      }
    };
  }, [isAutoPlaying, currentPage, isAnimating]);
  
  // Allow keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight') {
        goToNextPage();
        if (isAutoPlaying) stopAutoPlay();
      } else if (event.key === 'ArrowLeft') {
        goToPrevPage();
        if (isAutoPlaying) stopAutoPlay();
      } else if (event.key === 'Escape' && isZoomed) {
        setIsZoomed(false);
      } else if (event.key === ' ') { // Spacebar
        toggleAutoPlay();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentPage, isZoomed, isAnimating, isAutoPlaying]);
  
  // Wrap the content with the NarrationProvider
  return (
    <NarrationProvider currentPage={currentPage}>
      <div className="flex flex-col items-center min-h-screen bg-sky-50 py-8">
        <header className="mb-8 flex items-center justify-between w-full max-w-3xl">
          <Link 
            href="/"
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all"
          >
            ← Back to Home
          </Link>
          <h1 className="text-3xl font-bold text-blue-600 story-title">The Cat in the Hat</h1>
        </header>
        
        <div 
          className={`relative bg-white p-4 rounded-lg shadow-lg max-w-3xl mx-auto storybook-container
                     ${isAnimating ? 'opacity-0 transition-opacity duration-300' : 'opacity-100 transition-opacity duration-300'}`}
        >
          {isAutoPlaying && (
            <div className="absolute top-2 right-2 z-10 bg-green-500 text-white px-3 py-1 rounded-full text-sm animate-pulse">
              Auto-Reading
            </div>
          )}
          
          <div 
            className={`relative ${isZoomed ? 'zoom-overlay active' : 'aspect-[3/4] w-full'}`}
            onClick={isZoomed ? toggleZoom : undefined}
          >
            <div className={`relative ${isZoomed ? 'w-full h-full max-w-4xl max-h-[90vh]' : 'w-full h-full'} ${animationClass}`}>
              <Image
                src={`/images/pdf_images/page_${currentPage}.jpg`}
                alt={`Page ${currentPage}`}
                fill
                className={`object-contain rounded page-shadow ${!isZoomed ? 'cursor-zoom-in' : 'cursor-zoom-out'}`}
                onClick={!isZoomed ? toggleZoom : undefined}
                priority
                onAnimationEnd={() => setAnimationClass('')}
              />
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row sm:justify-between items-center mt-6 gap-4">
            <span className="text-gray-700">Page {currentPage} of {totalPages}</span>
            
            <div className="flex flex-wrap justify-center gap-2">
              <button
                onClick={goToPrevPage}
                disabled={currentPage === 1 || isAnimating}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:bg-blue-600"
                aria-label="Previous Page"
              >
                Previous Page
              </button>
              <button
                onClick={toggleAutoPlay}
                className={`px-4 py-2 rounded-lg text-white transition-all ${isAutoPlaying ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'}`}
                aria-label={isAutoPlaying ? 'Stop Auto-Reading' : 'Start Auto-Reading'}
              >
                {isAutoPlaying ? 'Stop Auto-Reading' : 'Start Auto-Reading'}
              </button>
              <button
                onClick={goToNextPage}
                disabled={currentPage === totalPages || isAnimating}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:bg-blue-600"
                aria-label="Next Page"
              >
                Next Page
              </button>
            </div>
          </div>
          
          <VoiceControls />
        </div>
        
        <div className="mt-12 max-w-3xl mx-auto">
          <h2 className="text-2xl font-semibold mb-4 text-blue-600 story-title">Interactive Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-6 rounded-lg shadow page-shadow">
              <h3 className="text-xl font-medium mb-2">How to Use</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>Click <strong>Start Narrator</strong> to enable voice interaction</li>
                <li>Ask questions or give commands about the current page</li>
                <li>Click <strong>Start Auto-Reading</strong> for a hands-free experience</li>
                <li>Click on the image to <strong>zoom in</strong> for a closer look</li>
                <li>Use the <strong>arrow keys</strong> on your keyboard to navigate pages</li>
                <li>Press <strong>Spacebar</strong> to start/stop auto-reading</li>
                <li>Press <strong>Escape</strong> to exit zoom mode</li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-lg shadow page-shadow">
              <h3 className="text-xl font-medium mb-2">Voice Interaction Tips</h3>
              <p>Speak naturally to the narrator as you read the story with your child.</p>
              <ul className="list-disc pl-5 mt-3 space-y-1">
                <li>Ask about characters: "Who is the Cat in the Hat?"</li>
                <li>Ask about events: "What's happening on this page?"</li>
                <li>Ask for explanations: "Why is the fish worried?"</li>
                <li>Request narration: "Read this page to us"</li>
              </ul>
              <p className="mt-3 text-sm text-gray-600">The narrator understands the context of each page and can provide age-appropriate explanations.</p>
            </div>
          </div>
        </div>
      </div>
    </NarrationProvider>
  );
} 