import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const experts = [
  {
    name: 'Prof. Jeremy Kagan',
    specialty: 'Entrepreneurship & Business',
    image: '/images/PRof stern.png',
    chatLink: '/entrepreneur-chat',
    description: 'Startup strategies, business models, product-market fit, and more.'
  },
  {
    name: 'Prof. James Brusseau',
    specialty: 'Philosophy & AI Ethics',
    image: '/images/professorJames.jpg',
    chatLink: '/philosophy-chat',
    description: 'AI, personal identity, authenticity, and freedom.'
  },
  {
    name: 'Confucius',
    specialty: 'Wisdom & Life Guidance',
    image: '/images/confucious.jpg',
    chatLink: '/confucius-chat',
    description: 'Ancient wisdom for modern life.'
  },
  {
    name: 'Bhagavad Gita Guide',
    specialty: 'Spirituality & Dharma',
    image: '/images/krishna-and-arjuna.jpg',
    chatLink: '/gita-chat',
    description: 'Dharma, karma, and spiritual enlightenment.'
  },
  {
    name: 'Macy',
    specialty: 'Modern Dating & Relationships',
    image: '/images/macy.jpg',
    chatLink: '/macy-chat',
    description: 'Dating, relationships, and practical advice.'
  },
  {
    name: 'Bible Guide',
    specialty: 'Christian Wisdom & Inspiration',
    image: '/images/jesus.jpg',
    chatLink: '/bible-chat',
    description: 'Chat about the Bible, faith, and spiritual growth.'
  },
  {
    name: 'Storybook Guide',
    specialty: "Children's Stories & Learning",
    image: '/images/storybook.png',
    chatLink: '/storybook',
    description: 'Interactive story time and learning for kids.'
  },
  {
    name: 'Spanish Teacher',
    specialty: 'Spanish Teacher · Personal Growth & Language Learning',
    image: '/images/Lyndsayphoto.jpg',
    chatLink: '/lyndsay-chat',
    description: 'Practice speaking, grammar, and vocabulary with a friendly Spanish teacher—perfect for beginners to advanced learners.'
  },
];

export default function ExpertsPage() {
  return (
    <main className="min-h-screen flex flex-col items-center px-4 py-12" style={{ background: 'var(--background)', color: 'var(--foreground)' }}>
      <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center" style={{ color: 'var(--primary-color-light)' }}>
        Meet Our Experts
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 w-full max-w-6xl">
        {experts.map((expert, idx) => (
          <div key={idx} className="bg-[var(--accent)] rounded-2xl shadow-lg p-6 flex flex-col items-center text-center">
            <div className="w-28 h-28 relative mb-4 rounded-full overflow-hidden border-4 border-[var(--primary-color)]">
              <Image src={expert.image} alt={expert.name} fill className="object-cover" />
            </div>
            <h2 className="text-2xl font-bold mb-1" style={{ color: 'var(--primary-color-light)' }}>{expert.name}</h2>
            <div className="text-base font-semibold mb-2" style={{ color: 'var(--primary-color)' }}>{expert.specialty}</div>
            <p className="text-sm mb-4" style={{ color: 'var(--primary-color-light)' }}>{expert.description}</p>
            <Link href={expert.chatLink} className="inline-block font-semibold rounded-md px-6 py-2 mt-auto shadow transition" style={{ background: 'var(--primary-gradient)', color: 'var(--button-text)' }}>
              Start Conversation
            </Link>
          </div>
        ))}
      </div>
    </main>
  );
} 