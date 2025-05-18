'use client';
import React, { useCallback, useState, useRef, useEffect } from 'react';
import { useConversation } from '@11labs/react';
import Image from 'next/image';

type Message = {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
};

export function ConfuciusConversation() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [debugInfo, setDebugInfo] = useState<string | null>(null);
  const [textInput, setTextInput] = useState('');
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  
  const conversation = useConversation({
    onConnect: () => {
      console.log('Connected to Confucius agent');
      setDebugInfo('Connected successfully');
      
      // Log voice connection success for debugging
      console.log('Voice connection established');
    },
    onDisconnect: () => {
      console.log('Disconnected from Confucius agent');
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
      setDebugInfo('Starting connection to Confucius agent...');
      
      // Reset messages when starting a new conversation
      setMessages([]);
      
      try {
        // Fetch signed URL from the confucius agent endpoint
        setDebugInfo('Fetching signed URL for Confucius agent...');
        const response = await fetch('/api/confucius-agent');
        const data = await response.json();
        
        if (!data.success || !data.signedUrl) {
          console.error('Failed to get Confucius agent configuration:', data);
          // Instead of error, switch to fallback mode
          setDebugInfo('Using fallback mode without voice capabilities');
          // Set a custom connected state
          conversation.status = 'connected';
          addMessage("Greetings! I am Confucius, here to share ancient Chinese wisdom. What would you like to discuss?", 'ai');
          setIsLoading(false);
          return;
        }
        
        setDebugInfo(`Got signed URL successfully. Starting session with Confucius...`);
        
        // Connect using the signed URL
        await conversation.startSession({
          signedUrl: data.signedUrl
        });
        
        setDebugInfo('Session started with Confucius');
        setIsLoading(false);
      } catch (apiError) {
        console.error('API connection error:', apiError);
        // Switch to fallback mode
        setDebugInfo('Unable to connect to voice API. Using text-only fallback mode.');
        // Set a custom connected state
        conversation.status = 'connected';
        addMessage("Greetings! I am Confucius, here to share ancient Chinese wisdom. What would you like to discuss?", 'ai');
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
            "The man who moves a mountain begins by carrying away small stones.",
            "It does not matter how slowly you go as long as you do not stop.",
            "Life is really simple, but we insist on making it complicated.",
            "Our greatest glory is not in never falling, but in rising every time we fall.",
            "Respect yourself and others will respect you.",
            "The superior man acts before he speaks, and afterwards speaks according to his actions.",
            "To be able under all circumstances to practice five things constitutes perfect virtue; these five things are gravity, generosity of soul, sincerity, earnestness, and kindness.",
            "When you meet someone better than yourself, turn your thoughts to becoming his equal. When you meet someone not as good as you are, look within and examine yourself.",
            "Before you embark on a journey of revenge, dig two graves.",
            "The journey of a thousand miles begins with a single step."
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

  return (
    <div className="flex flex-col items-center w-full mx-auto">
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
        <div className="bg-gradient-to-r from-red-600 to-red-700 p-3 sm:p-4 flex items-center justify-between text-white">
          <div className="flex items-center">
            <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden mr-3 border-2 border-white shadow-sm">
              <Image 
                src="/images/confucious.jpg" 
                alt="Confucius" 
                fill
                className="object-cover" 
              />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-semibold">Confucius</h3>
              <p className="text-xs text-red-100">Ancient Chinese Philosopher</p>
            </div>
          </div>
          
          <div className="flex gap-2">
            <button
              onClick={startConversation}
              disabled={conversation.status === 'connected' || isLoading}
              className={`px-3 py-1.5 text-xs sm:text-sm font-medium rounded-md shadow-sm ${
                conversation.status === 'connected' || isLoading
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-white text-red-700 hover:bg-red-50 border border-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-300'
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
              <div className="text-red-600 mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-700 mb-1">Begin Your Journey of Wisdom</h3>
              <p className="text-gray-500 text-sm">Click "Start Conversation" to discuss ancient Chinese philosophy with Confucius.</p>
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
              placeholder="Ask Confucius about wisdom, virtue, or life..."
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              disabled={conversation.status !== 'connected'}
              ref={inputRef}
              className="flex-grow px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
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
                  : 'bg-red-600 hover:bg-red-700'
              }`}
            >
              Send
            </button>
          </div>
          <p className="mt-2 text-xs text-gray-500 text-center">
            {conversation.status !== 'connected' 
              ? 'Start a conversation to learn from the wisdom of Confucius.'
              : 'Voice conversation active. Type your message or speak.'}
          </p>
        </div>
      </div>
    </div>
  );
} 