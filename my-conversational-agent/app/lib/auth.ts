import { cookies } from 'next/headers';

const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = 'admin123'; // In production, use environment variables

export async function isLoggedIn() {
  const cookieStore = await cookies();
  return cookieStore.get('admin_session')?.value === 'true';
}

export function login(username: string, password: string) {
  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    return true;
  }
  return false;
}

export function logout() {
  cookies().delete('admin_session');
} 