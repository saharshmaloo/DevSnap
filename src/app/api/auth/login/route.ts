import { NextRequest, NextResponse } from 'next/server';
import { createSessionCookie, setAuthCookie } from '@/lib/jwt';

export async function POST(req: NextRequest) {
  try {
    const { idToken } = await req.json();

    if (!idToken) {
      return NextResponse.json(
        { error: 'Missing ID token' },
        { status: 400 }
      );
    }

    // Create session cookie from Firebase ID token
    const sessionCookie = await createSessionCookie(idToken);

    // Create response
    const response = NextResponse.json({ status: true });

    // Set the session cookie
    setAuthCookie(response, sessionCookie);

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}