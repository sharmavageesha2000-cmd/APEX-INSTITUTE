import { NextResponse } from 'next/server';
import { getAuthTokenCookieName } from '@/lib/auth';

export async function POST() {
  const response = NextResponse.json({ success: true });
  response.cookies.set(getAuthTokenCookieName(), '', {
    httpOnly: true,
    expires: new Date(0),
    path: '/',
  });
  return response;
}
