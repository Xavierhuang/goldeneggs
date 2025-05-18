import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-4 sm:p-6 bg-gradient-to-b from-blue-50 to-white">
      <div className="w-full max-w-5xl mx-auto">
        <header className="mb-12 sm:mb-16 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-blue-700 mb-4">AI Masterclass</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Talk to our AI-powered conversational agents to begin your journey
          </p>
        </header>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto mb-12">
          {/* Bible Guide Agent Card */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-xl border border-gray-100">
            <div className="relative h-64 w-full">
              <Image 
                src="/images/jesus.jpg" 
                alt="Bible Guide" 
                fill
                className="object-cover" 
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
            </div>
            <div className="p-6">
              <h2 className="text-2xl font-bold text-blue-700 mb-2">Bible Guide</h2>
              <p className="text-gray-600 mb-6">
                Have a conversation with an AI Bible Guide. Ask questions about biblical stories, 
                meanings, and receive guidance based on biblical wisdom.
              </p>
              
              <Link 
                href="/bible-chat" 
                className="block w-full text-center py-3 px-4 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
              >
                Chat with Bible Guide
              </Link>
            </div>
          </div>
          
          {/* Cat in the Hat Storybook Card */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-xl border border-gray-100">
            <div className="relative h-64 w-full">
              <Image 
                src="/images/pdf_images/page_1.jpg" 
                alt="The Cat in the Hat" 
                fill
                className="object-contain" 
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
            </div>
            <div className="p-6">
              <h2 className="text-2xl font-bold text-red-600 mb-2">The Cat in the Hat</h2>
              <p className="text-gray-600 mb-6">
                Explore an interactive storybook with voice narration. Flip through pages of 
                "The Cat in the Hat" while our AI narrator brings the story to life.
              </p>
              
              <Link 
                href="/storybook" 
                className="block w-full text-center py-3 px-4 bg-red-500 text-white font-medium rounded-lg hover:bg-red-600 transition-colors"
              >
                Open Storybook
              </Link>
            </div>
          </div>
          
          {/* Professor Brusseau Card */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-xl border border-gray-100">
            <div className="relative h-64 w-full">
              <Image 
                src="/images/professorJames.jpg" 
                alt="Professor James Brusseau" 
                fill
                className="object-cover" 
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
            </div>
            <div className="p-6">
              <h2 className="text-2xl font-bold text-purple-700 mb-2">Professor Brusseau</h2>
              <p className="text-gray-600 mb-6">
                Discuss philosophy of AI with Prof. James Brusseau (PhD). Explore questions about 
                personal identity, authenticity, and human freedom in the age of artificial intelligence.
              </p>
              
              <Link 
                href="/philosophy-chat" 
                className="block w-full text-center py-3 px-4 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 transition-colors"
              >
                Discuss Philosophy
              </Link>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto mb-12">
          {/* Professor Jeremy Kagan Card */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-xl border border-gray-100">
            <div className="relative h-64 w-full">
              <Image 
                src="/images/professorJeremy.jpeg" 
                alt="Professor Jeremy Kagan" 
                fill
                className="object-cover" 
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
            </div>
            <div className="p-6">
              <h2 className="text-2xl font-bold text-green-700 mb-2">Professor Kagan</h2>
              <p className="text-gray-600 mb-6">
                Learn entrepreneurship from NYU Stern's Prof. Jeremy Kagan. Discuss startup strategies, 
                business models, and gain insights on launching your venture with clarity and confidence.
              </p>
              
              <Link 
                href="/entrepreneur-chat" 
                className="block w-full text-center py-3 px-4 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors"
              >
                Talk Entrepreneurship
              </Link>
            </div>
          </div>
          
          {/* Bhagavad Gita Card */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-xl border border-gray-100">
            <div className="relative h-64 w-full">
              <Image 
                src="/images/krishna-and-arjuna.jpg" 
                alt="Bhagavad Gita" 
                fill
                className="object-cover" 
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
            </div>
            <div className="p-6">
              <h2 className="text-2xl font-bold text-orange-700 mb-2">Bhagavad Gita</h2>
              <p className="text-gray-600 mb-6">
                Explore the ancient wisdom of the Bhagavad Gita, a 700-verse Hindu scripture. Discover 
                timeless teachings on dharma, karma, and the path to spiritual enlightenment.
              </p>
              
              <Link 
                href="/gita-chat" 
                className="block w-full text-center py-3 px-4 bg-orange-600 text-white font-medium rounded-lg hover:bg-orange-700 transition-colors"
              >
                Explore Hindu Wisdom
              </Link>
            </div>
          </div>
          
          {/* Confucius Card */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-xl border border-gray-100">
            <div className="relative h-64 w-full">
              <Image 
                src="/images/confucious.jpg" 
                alt="Confucius" 
                fill
                className="object-cover" 
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
            </div>
            <div className="p-6">
              <h2 className="text-2xl font-bold text-red-700 mb-2">Confucius</h2>
              <p className="text-gray-600 mb-6">
                Discover the wisdom of Confucius, the influential Chinese philosopher. Explore his 
                ideas on social harmony, personal ethics, and government based on moral principles.
              </p>
              
              <Link 
                href="/confucius-chat" 
                className="block w-full text-center py-3 px-4 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors"
              >
                Learn Chinese Philosophy
              </Link>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-8 max-w-5xl mx-auto">
          {/* Macy Card */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-xl border border-gray-100">
            <div className="relative h-64 w-full">
              <Image 
                src="/images/macy.jpg" 
                alt="Macy" 
                fill
                className="object-contain" 
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
            </div>
            <div className="p-6">
              <h2 className="text-2xl font-bold text-pink-600 mb-2">Macy - Your Dating BFF</h2>
              <p className="text-gray-600 mb-6">
                Get modern dating advice from your AI BFF Macy. Whether you need help with your profile, 
                messaging tips, or relationship guidance, Macy has practical advice for finding love in the digital age.
              </p>
              
              <Link 
                href="/macy-chat" 
                className="block w-full text-center py-3 px-4 bg-pink-500 text-white font-medium rounded-lg hover:bg-pink-600 transition-colors"
              >
                Get Dating Advice
              </Link>
            </div>
          </div>
        </div>
        
        <footer className="mt-16 text-center text-gray-500 text-sm">
          <p className="mb-1">© 2024 Interactive AI Experiences</p>
          <p className="text-xs text-gray-400">Select an experience above to begin your conversation with our AI experts.</p>
        </footer>
      </div>
    </main>
  );
}
