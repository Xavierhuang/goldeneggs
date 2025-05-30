import { logoutResponse } from '@/app/lib/auth';

export async function POST() {
  return logoutResponse();
} 