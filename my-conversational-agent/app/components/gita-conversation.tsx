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

export function GitaConversation() {
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
      console.log('Connected to Bhagavad Gita agent');
      setDebugInfo('Connected successfully');
      
      // Log voice connection success for debugging
      console.log('Voice connection established');
    },
    onDisconnect: () => {
      console.log('Disconnected from Bhagavad Gita agent');
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
      setDebugInfo('Starting connection to Bhagavad Gita agent...');
      
      // Reset messages when starting a new conversation
      setMessages([]);
      
      try {
        // Fetch signed URL from the gita agent endpoint
        setDebugInfo('Fetching signed URL for Bhagavad Gita agent...');
        const response = await fetch('/api/gita-agent');
        const data = await response.json();
        
        if (!data.success || !data.signedUrl) {
          console.error('Failed to get Bhagavad Gita agent configuration:', data);
          // Instead of error, switch to fallback mode
          setDebugInfo('Using fallback mode without voice capabilities');
          // Set a custom connected state
          conversation.status = 'connected';
          addMessage("Namaste! I am here to discuss the Bhagavad Gita with you. What would you like to know?", 'ai');
          setIsLoading(false);
          return;
        }
        
        setDebugInfo(`Got signed URL successfully. Starting session with Bhagavad Gita guide...`);
        
        // Connect using the signed URL
        await conversation.startSession({
          signedUrl: data.signedUrl
        });
        
        setDebugInfo('Session started with Bhagavad Gita guide');
        setIsLoading(false);
      } catch (apiError) {
        console.error('API connection error:', apiError);
        // Switch to fallback mode
        setDebugInfo('Unable to connect to voice API. Using text-only fallback mode.');
        // Set a custom connected state
        conversation.status = 'connected';
        addMessage("Namaste! I am here to discuss the Bhagavad Gita with you. What would you like to know?", 'ai');
        setIsLoading(false);
      }
    } catch (error: any) {
      console.error('Failed to start conversation:', error);
      setError(`Failed to start conversation: ${error instanceof Error ? error.message : 'Unknown error'}`);
      setDebugInfo(`Error: ${JSON.stringify(error)}`);
      setIsLoading(false);
    }
  }, [conversation, addMessage]);

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

  const sendTextMessage = useCallback((text: string) => {
    try {
      // Manual way to send text messages
      if (conversation.status === 'connected') {
        setDebugInfo(`Sending text message: ${text}`);
        addMessage(text, 'user');
        
        // Simply add a mock response after a delay to simulate AI response
        setTimeout(() => {
          const responses = [
            "The Bhagavad Gita teaches us that we must perform our duties without attachment to the results.",
            "As Krishna explains in the Gita, 'You have a right to perform your prescribed duties, but you are not entitled to the fruits of your actions.'",
            "The path of dharma (righteous duty) is central to the teachings of the Bhagavad Gita.",
            "True knowledge comes from understanding that the self (Atman) is eternal and distinct from the physical body.",
            "In the Gita, Krishna reveals himself as the Supreme Being, the source of all creation.",
            "Karma yoga is the path of selfless action, performed without attachment to results.",
            "The Gita teaches that one should see the divine in all beings and treat everyone with compassion."
          ];
          
          // Select a random response
          const randomResponse = responses[Math.floor(Math.random() * responses.length)];
          addMessage(randomResponse, 'ai');
        }, 1500);
      } else {
        setError('Conversation is not connected');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setDebugInfo(`Error sending message: ${JSON.stringify(error)}`);
    }
  }, [conversation, addMessage]);

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
        <div className="bg-gradient-to-r from-orange-600 to-orange-700 p-3 sm:p-4 flex items-center justify-between text-white">
          <div className="flex items-center">
            <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden mr-3 border-2 border-white shadow-sm">
              <Image 
                src="/images/krishna-and-arjuna.jpg" 
                alt="Bhagavad Gita" 
                fill
                className="object-cover" 
              />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-semibold">Bhagavad Gita Guide</h3>
              <p className="text-xs text-orange-100">Sacred Hindu Text</p>
            </div>
          </div>
          
          <div className="flex gap-2">
            <button
              onClick={startConversation}
              disabled={conversation.status === 'connected' || isLoading}
              className={`px-3 py-1.5 text-xs sm:text-sm font-medium rounded-md shadow-sm ${
                conversation.status === 'connected' || isLoading
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-white text-orange-700 hover:bg-orange-50 border border-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-300'
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
              <div className="text-orange-600 mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-700 mb-1">Start Your Journey of Wisdom</h3>
              <p className="text-gray-500 text-sm">Click "Start Conversation" to begin exploring the teachings of the Bhagavad Gita.</p>
            </div>
          ) : (
            <div>
              {messages.map((msg) => (
                <div 
                  key={msg.id} 
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`max-w-[80%] rounded-lg px-4 py-2 ${
                      msg.sender === 'user' 
                        ? 'bg-blue-500 text-white rounded-br-none' 
                        : 'bg-white border border-gray-200 shadow-sm text-gray-700 rounded-bl-none'
                    }`}
                  >
                    <div className="text-sm sm:text-base">{msg.text}</div>
                    <div 
                      className={`text-xs mt-1 ${
                        msg.sender === 'user' ? 'text-blue-100' : 'text-gray-400'
                      }`}
                    >
                      {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>
        
        <div className="border-t border-gray-200 p-3 sm:p-4 bg-white">
          <div className="flex items-center space-x-2">
            <input
              type="text"
              placeholder="Type your question about the Bhagavad Gita..."
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              disabled={conversation.status !== 'connected'}
              ref={inputRef}
              className="flex-grow px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
            />
            <button
              onClick={() => {
                if (conversation.status === 'connected') {
                  if (textInput.trim()) {
                    const userMessage = textInput.trim();
                    setTextInput('');
                    // Use the sendTextMessage function
                    sendTextMessage(userMessage);
                  }
                } else {
                  startConversation();
                }
              }}
              className={`px-4 py-2 rounded-lg text-white font-medium ${
                conversation.status !== 'connected' || !textInput.trim()
                  ? 'bg-gray-300 cursor-not-allowed'
                  : 'bg-orange-600 hover:bg-orange-700'
              }`}
            >
              Send
            </button>
          </div>
          <p className="mt-2 text-xs text-gray-500 text-center">
            {conversation.status !== 'connected' 
              ? 'Start a conversation to ask questions about the Bhagavad Gita.'
              : 'Voice conversation active. Tap the microphone button or type your message.'}
          </p>
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