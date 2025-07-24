import { LyndsayConversation } from '../components/lyndsay-conversation';

export default function LyndsayChatPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-[var(--background)]">
      <div className="w-full max-w-2xl p-4">
        <LyndsayConversation />
      </div>
    </main>
  );
} 