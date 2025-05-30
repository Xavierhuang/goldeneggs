import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getSubscribers } from '@/app/lib/db';

export async function GET() {
  const cookieStore = cookies();
  const isLoggedIn = cookieStore.get('admin_session')?.value === 'true';

  if (!isLoggedIn) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }

  try {
    const subscribers = getSubscribers();
    return NextResponse.json(subscribers);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch subscribers' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  const cookieStore = cookies();
  const isLoggedIn = cookieStore.get('admin_session')?.value === 'true';

  if (!isLoggedIn) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }

  try {
    const { email, paid } = await request.json();
    if (!email || typeof paid !== 'number') {
      return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
    }
    setSubscriberPaid(email, paid);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update paid status' },
      { status: 500 }
    );
  }
} 