'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useConversation } from '@11labs/react';

// Content descriptions for each page to help the agent understand what's on the page
const PAGE_DESCRIPTIONS = {
  1: "Title page of 'The Cat in the Hat'",
  2: "Introduction showing a rainy day with two bored children looking out the window",
  3: "The children sitting sadly at home while rain pours outside",
  4: "The Cat in the Hat enters the house and introduces himself",
  5: "The Cat starts performing tricks with various items",
  6: "The Cat balancing on a ball while holding items",
  7: "The Fish warns the children about the Cat's behavior",
  8: "The Cat showing more elaborate tricks",
  9: "More of the Cat's wild antics inside the house",
  10: "Things getting more chaotic with the Cat's games",
  11: "Introduction of Thing 1 and Thing 2",
  12: "Thing 1 and Thing 2 causing havoc around the house",
  13: "The Things flying kites inside the house",
  14: "More chaos with furniture and items flying around",
  15: "The mother is coming home soon, shown outside",
  16: "The house is a complete mess",
  17: "The Fish warning about the mother returning",
  18: "Attempting to catch Thing 1 and Thing 2",
  19: "The Cat helping to clean up the mess",
  20: "Using a special machine to clean everything",
  21: "The Cat and Things leaving the house",
  22: "The house is now clean and orderly again",
  23: "The mother returns home",
  24: "The children deciding whether to tell their mother what happened",
  // Add descriptions for the remaining pages...
  36: "Final page of the story"
};

// Create a context for the narration
type NarrationContextType = {
  currentPage: number;
  isAgentConnected: boolean;
  startConversation: () => Promise<void>;
  stopConversation: () => Promise<void>;
  promptSuggestion: string;
  error: string | null;
  isLoading: boolean;
};

const NarrationContext = createContext<NarrationContextType | undefined>(undefined);

export function useNarration() {
  const context = useContext(NarrationContext);
  if (context === undefined) {
    throw new Error('useNarration must be used within a NarrationProvider');
  }
  return context;
}

export function NarrationProvider({ 
  children, 
  currentPage 
}: { 
  children: React.ReactNode; 
  currentPage: number 
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [signedUrl, setSignedUrl] = useState<string | null>(null);
  const [promptSuggestion, setPromptSuggestion] = useState<string>('');

  // Initialize conversation using ElevenLabs' useConversation hook
  const conversation = useConversation({
    onConnect: () => {
      console.log('Connected to story narrator agent');
      // When connected, update the prompt suggestion
      updatePromptSuggestion();
    },
    onDisconnect: () => {
      console.log('Disconnected from story narrator agent');
    },
    onMessage: (message) => {
      console.log('Message received from narrator:', message);
    },
    onError: (error) => {
      console.error('Narrator error:', error);
      setError(`Narrator connection error: ${typeof error === 'string' ? error : 'Unknown error'}`);
    },
  });
  
  // Update the prompt suggestion whenever the page changes
  useEffect(() => {
    updatePromptSuggestion();
  }, [currentPage]);
  
  // Fetch signed URL for the storybook agent
  const fetchSignedUrl = async () => {
    try {
      // Use the dedicated storybook agent endpoint
      const response = await fetch('/api/storybook-agent');
      const data = await response.json();
      
      if (!data.success || !data.signedUrl) {
        throw new Error(data.error || 'Failed to get storybook agent configuration');
      }
      
      setSignedUrl(data.signedUrl);
      return data.signedUrl;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      setError(`Failed to get storybook agent URL: ${errorMessage}`);
      throw error;
    }
  };

  // Start the conversation with the narrator
  const startConversation = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Request microphone permission
      try {
        await navigator.mediaDevices.getUserMedia({ audio: true });
      } catch (micError) {
        setError('Microphone access is required. Please allow microphone permission.');
        setIsLoading(false);
        return;
      }
      
      // Get the agent URL if we don't have it yet
      const url = signedUrl || await fetchSignedUrl();
      
      // Connect to the agent
      await conversation.startSession({
        signedUrl: url
      });
      
      setIsLoading(false);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      setError(`Failed to start narrator: ${errorMessage}`);
      setIsLoading(false);
    }
  };

  // Stop the conversation
  const stopConversation = async () => {
    try {
      await conversation.endSession();
    } catch (error) {
      console.error('Failed to end narrator session:', error);
    }
  };

  // Update the prompt suggestion based on the current page
  const updatePromptSuggestion = () => {
    const pageDescription = PAGE_DESCRIPTIONS[currentPage as keyof typeof PAGE_DESCRIPTIONS] || 
      `Page ${currentPage} of The Cat in the Hat`;
    
    // Generate voice prompt suggestions based on page content
    let suggestion = '';
    
    if (currentPage === 1) {
      suggestion = 'Try saying: "Please tell me about The Cat in the Hat" or "Start reading the story"';
    } else if (currentPage >= 2 && currentPage <= 10) {
      suggestion = 'Try saying: "What\'s happening on this page?" or "Tell me about the Cat\'s tricks"';
    } else if (currentPage >= 11 && currentPage <= 18) {
      suggestion = 'Try saying: "Who are Thing 1 and Thing 2?" or "Why is the Fish worried?"';
    } else if (currentPage >= 19 && currentPage <= 24) {
      suggestion = 'Try saying: "How are they cleaning up?" or "Is the mother coming home?"';
    } else {
      suggestion = 'Try saying: "What happens next?" or "Tell me about this page"';
    }
    
    setPromptSuggestion(suggestion);
  };

  // Provide the narration context to children
  return (
    <NarrationContext.Provider
      value={{
        currentPage,
        isAgentConnected: conversation.status === 'connected',
        startConversation,
        stopConversation,
        promptSuggestion,
        error,
        isLoading
      }}
    >
      {children}
    </NarrationContext.Provider>
  );
} 