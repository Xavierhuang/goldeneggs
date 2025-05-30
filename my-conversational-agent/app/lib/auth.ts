import { NextResponse } from 'next/server';

const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = 'admin123'; // In production, use environment variables

export async function isLoggedIn() {
  const cookieStore = await import('next/headers').then(m => m.cookies());
  return cookieStore.get('admin_session')?.value === 'true';
}

export function login(username: string, password: string) {
  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    return true;
  }
  return false;
}

export function logoutResponse() {
  const response = NextResponse.json({ success: true });
  response.cookies.set('admin_session', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: 0 // This deletes the cookie
  });
  return response;
} 