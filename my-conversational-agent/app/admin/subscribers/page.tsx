'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface Subscriber {
  id: number;
  email: string;
  created_at: string;
  paid: number;
}

export default function SubscribersPage() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchSubscribers = async () => {
      try {
        const response = await fetch('/api/admin/subscribers');
        if (response.status === 401) {
          router.push('/admin/login');
          return;
        }
        const data = await response.json();
        setSubscribers(data);
      } catch (err) {
        setError('Failed to fetch subscribers');
      } finally {
        setIsLoading(false);
      }
    };

    fetchSubscribers();
  }, [router]);

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/logout', { method: 'POST' });
      router.push('/admin/login');
    } catch (err) {
      setError('Failed to logout');
    }
  };

  const handleTogglePaid = async (email: string, currentPaid: number) => {
    try {
      const response = await fetch('/api/admin/subscribers', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, paid: currentPaid ? 0 : 1 }),
      });
      if (response.ok) {
        setSubscribers((subs) =>
          subs.map((s) =>
            s.email === email ? { ...s, paid: currentPaid ? 0 : 1 } : s
          )
        );
      }
    } catch (err) {
      setError('Failed to update paid status');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-xl text-red-600">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Email Subscribers</h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            Logout
          </button>
        </div>
        
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Subscribed At
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Paid
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {subscribers.map((subscriber) => (
                <tr key={subscriber.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {subscriber.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {subscriber.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(subscriber.created_at).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {subscriber.paid ? (
                      <button
                        className="px-2 py-1 bg-green-200 text-green-800 rounded"
                        onClick={() => handleTogglePaid(subscriber.email, subscriber.paid)}
                      >
                        Paid
                      </button>
                    ) : (
                      <button
                        className="px-2 py-1 bg-gray-200 text-gray-800 rounded"
                        onClick={() => handleTogglePaid(subscriber.email, subscriber.paid)}
                      >
                        Free
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
} 