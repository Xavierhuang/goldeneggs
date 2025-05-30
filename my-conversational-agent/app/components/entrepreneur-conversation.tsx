'use client';
import React, { useCallback, useState, useRef, useEffect } from 'react';
import { useConversation } from '@11labs/react';
import Image from 'next/image';
import { EmailSignupModal } from './email-signup-modal';

type Message = {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
};

export function EntrepreneurConversation() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [debugInfo, setDebugInfo] = useState<string | null>(null);
  const [textInput, setTextInput] = useState('');
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [showEmailSignup, setShowEmailSignup] = useState(false);
  
  const conversation = useConversation({
    onConnect: () => {
      console.log('Connected to Professor Kagan agent');
      setDebugInfo('Connected successfully');
      
      // Log voice connection success for debugging
      console.log('Voice connection established');
    },
    onDisconnect: () => {
      console.log('Disconnected from Professor Kagan agent');
      setDebugInfo('Disconnected from agent');
    },
    onMessage: (message) => {
      console.log('Message received:', message);
      
      // Handle the message format from the @11labs/react library
      if (message.source === 'user' && typeof message.message === 'string') {
        // This is a user message (transcript)
        addMessage(message.message, 'user');
      } else if (typeof message.message === 'string') {
        // Any non-user message is considered an AI response
        addMessage(message.message, 'ai');
      }
    },
    onError: (error) => {
      console.error('Error in conversation:', error);
      const errorMsg = typeof error === 'string' ? error : 'Unknown error';
      setError(`Connection error: ${errorMsg}`);
      setDebugInfo(`Error details: ${JSON.stringify(error)}`);
      
      // If we detect a voice-related error, attempt to reconnect
      if (errorMsg.toLowerCase().includes('voice') || errorMsg.toLowerCase().includes('audio')) {
        setDebugInfo('Detected voice issues. Attempting to reconnect...');
        setTimeout(() => {
          stopConversation().then(() => {
            setTimeout(() => {
              startConversation();
            }, 1000);
          });
        }, 2000);
      }
    },
  });

  const addMessage = (text: string, sender: 'user' | 'ai') => {
    setMessages(prev => [
      ...prev, 
      { 
        id: Date.now().toString(),
        text,
        sender,
        timestamp: new Date()
      }
    ]);
  };

  // Auto-scroll to the bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const startConversation = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      setDebugInfo('Starting connection to Professor Kagan...');
      
      // Reset messages when starting a new conversation
      setMessages([]);
      
      // Request microphone permission
      try {
        setDebugInfo('Requesting microphone permission...');
        await navigator.mediaDevices.getUserMedia({ audio: true });
        setDebugInfo('Microphone permission granted');
      } catch (micError) {
        console.error('Microphone permission denied:', micError);
        setError('Microphone access is required. Please allow microphone permission and try again.');
        setDebugInfo(`Microphone error: ${JSON.stringify(micError)}`);
        setIsLoading(false);
        return;
      }
      
      // Fetch signed URL from the entrepreneur agent endpoint
      setDebugInfo('Fetching signed URL for entrepreneur agent...');
      const response = await fetch('/api/entrepreneur-agent');
      const data = await response.json();
      
      if (!data.success || !data.signedUrl) {
        console.error('Failed to get entrepreneur agent configuration:', data);
        setError(data.error || 'Failed to get entrepreneur agent configuration');
        setDebugInfo(`API response: ${JSON.stringify(data)}`);
        setIsLoading(false);
        return;
      }
      
      setDebugInfo(`Got signed URL successfully. Starting session with Prof. Kagan...`);
      
      // Connect using the signed URL
      await conversation.startSession({
        signedUrl: data.signedUrl
      });
      
      setDebugInfo('Session started with Professor Kagan');
      setIsLoading(false);
    } catch (error: any) {
      console.error('Failed to start conversation:', error);
      setError(`Failed to start conversation: ${error instanceof Error ? error.message : 'Unknown error'}`);
      setDebugInfo(`Error: ${JSON.stringify(error)}`);
      setIsLoading(false);
    }
  }, [conversation]);

  const stopConversation = useCallback(async () => {
    try {
      setDebugInfo('Ending conversation...');
      await conversation.endSession();
      console.log('Conversation ended');
      setShowEmailSignup(true);
    } catch (error) {
      console.error('Failed to end conversation:', error);
      setDebugInfo(`Error ending conversation: ${JSON.stringify(error)}`);
    }
  }, [conversation]);

  const sendTextMessage = useCallback(async () => {
    if (!textInput.trim() || conversation.status !== 'connected' || isSending) return;
    try {
      setIsSending(true);
      const messageText = textInput.trim();
      addMessage(messageText, 'user');
      setTextInput('');

      // Prepare conversation history for OpenAI
      const chatHistory = messages.map((msg) => ({
        role: msg.sender === 'user' ? 'user' : 'assistant',
        content: msg.text,
      }));
      chatHistory.push({ role: 'user', content: messageText });

      // Send to OpenAI chat API
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: chatHistory }),
      });
      const data = await response.json();
      if (!response.ok || !data.text) {
        throw new Error(data.error || 'Failed to get response from AI');
      }
      addMessage(data.text, 'ai');
      setIsSending(false);
    } catch (error) {
      console.error('Failed to send text message:', error);
      setError(`Failed to send message: ${error instanceof Error ? error.message : 'Unknown error'}`);
      setIsSending(false);
    }
  }, [textInput, conversation, isSending, messages]);

  // Handle Enter key press in the text input
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendTextMessage();
    }
  };

  const handleEmailSubmit = async (email: string) => {
    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to subscribe');
      }
    } catch (error) {
      console.error('Failed to submit email:', error);
      throw error;
    }
  };

  return (
    <div className="flex flex-col h-full">
      {error && (
        <div className="text-red-500 mb-2 w-full p-3 bg-red-50 rounded-lg text-center font-medium border border-red-200">
          {error}
        </div>
      )}
      
      {/* Debug info - Only displayed during development */}
      {debugInfo && (
        <div className="text-xs text-gray-500 mb-2 w-full p-2 bg-gray-50 rounded-lg text-left overflow-auto max-h-20 border border-gray-200">
          <strong>Debug:</strong> {debugInfo}
        </div>
      )}
      
      {/* Chat Interface */}
      <div className="w-full mb-4 overflow-hidden rounded-xl border border-gray-200">
        <div className="bg-gradient-to-r from-green-600 to-green-700 p-3 sm:p-4 flex items-center justify-between text-white">
          <div className="flex items-center">
            <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden mr-3 border-2 border-white shadow-sm">
              <Image 
                src="/images/professorJeremy.jpeg" 
                alt="Professor Jeremy Kagan" 
                fill
                className="object-cover" 
              />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-semibold">Prof. Jeremy Kagan</h3>
              <p className="text-xs text-green-100">NYU Stern, Entrepreneurship</p>
            </div>
          </div>
          
          <div className="flex gap-2">
            <button
              onClick={startConversation}
              disabled={conversation.status === 'connected' || isLoading}
              className={`px-3 py-1.5 text-xs sm:text-sm font-medium rounded-md shadow-sm ${
                conversation.status === 'connected' || isLoading
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-white text-green-700 hover:bg-green-50 border border-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-300'
              }`}
            >
              {isLoading ? 'Connecting...' : 'Start Conversation'}
            </button>
            {conversation.status === 'connected' && (
              <button
                onClick={stopConversation}
                className="px-3 py-1.5 text-xs sm:text-sm font-medium rounded-md shadow-sm bg-red-500 text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                End Conversation
              </button>
            )}
          </div>
        </div>
        
        <div className="h-96 overflow-y-auto p-3 sm:p-4 space-y-3 sm:space-y-4 bg-gray-50" style={{ scrollBehavior: 'smooth' }}>
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center p-4">
              <div className="text-green-600 mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-700 mb-1">Start Your Entrepreneur Journey</h3>
              <p className="text-gray-500 max-w-md">
                Ask Prof. Kagan about startup strategies, business models, 
                product-market fit, or how to launch your venture with confidence.
              </p>
            </div>
          ) : (
            messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${
                  msg.sender === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`max-w-[85%] rounded-lg p-3 ${
                    msg.sender === 'user'
                      ? 'bg-green-600 text-white'
                      : 'bg-white border border-gray-200 text-gray-800'
                  }`}
                >
                  <p className="whitespace-pre-wrap break-words">{msg.text}</p>
                  <p
                    className={`text-xs mt-1 ${
                      msg.sender === 'user' ? 'text-green-200' : 'text-gray-400'
                    }`}
                  >
                    {msg.timestamp.toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </div>
              </div>
            ))
          )}
          <div ref={messagesEndRef} />
        </div>
        
        <div className="p-3 sm:p-4 border-t border-gray-200 bg-white">
          <div className="flex items-center">
            <input
              type="text"
              ref={inputRef}
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type a message..."
              disabled={conversation.status !== 'connected' || isSending}
              className="flex-grow px-4 py-2 bg-gray-100 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-green-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
            />
            <button
              onClick={sendTextMessage}
              disabled={!textInput.trim() || conversation.status !== 'connected' || isSending}
              className="bg-green-600 text-white px-4 py-2 rounded-r-lg hover:bg-green-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              {isSending ? (
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              )}
            </button>
          </div>
          
          {conversation.status !== 'connected' && (
            <p className="text-center text-gray-500 text-xs mt-2">
              Please start a conversation to begin chatting with Prof. Kagan
            </p>
          )}
        </div>
      </div>
      
      <EmailSignupModal
        isOpen={showEmailSignup}
        onClose={() => setShowEmailSignup(false)}
        onSubmit={handleEmailSubmit}
      />
    </div>
  );
} 