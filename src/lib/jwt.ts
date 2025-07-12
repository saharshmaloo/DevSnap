import { adminAuth } from './firebaseAdmin';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

const COOKIE_NAME = 'auth_token';
const COOKIE_MAX_AGE = 60 * 60 * 24 * 5; // 5 days

export async function createSessionCookie(idToken: string) {
    try {
        const sessionCookie = await adminAuth.createSessionCookie(idToken, {
            expiresIn: COOKIE_MAX_AGE * 1000,
        });
        return sessionCookie;
    } catch (error) {
        console.error('Error creating session cookie:', error);
        throw error;
    }
}

export async function verifySessionCookie(sessionCookie: string) {
    try {
        const decodedClaims = await adminAuth.verifySessionCookie(sessionCookie, true);
        return decodedClaims;
    } catch (error) {
        console.error('Error verifying session cookie:', error);
        return null;
    }
}

export function setAuthCookie(response: NextResponse, sessionCookie: string) {
    response.cookies.set(COOKIE_NAME, sessionCookie, {
        maxAge: COOKIE_MAX_AGE,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        path: '/',
    });
}

export function clearAuthCookie(response: NextResponse) {
    response.cookies.set(COOKIE_NAME, '', {
        maxAge: 0,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        path: '/',
    });
}

// For API routes (with NextRequest)
export function getAuthCookie(request: NextRequest): string | undefined {
    return request.cookies.get(COOKIE_NAME)?.value;
}

// For server components (using next/headers)
export async function getAuthCookieFromHeaders(): Promise<string | undefined> {
    const cookieStore = await cookies();
    return cookieStore.get(COOKIE_NAME)?.value;
}

// For API routes (with NextRequest)
export async function getCurrentUser(request: NextRequest) {
    const sessionCookie = getAuthCookie(request);
    if (!sessionCookie) return null;

    return await verifySessionCookie(sessionCookie);
}

// For server components (using next/headers)
export async function getCurrentUserFromHeaders() {
    const sessionCookie = await getAuthCookieFromHeaders();
    if (!sessionCookie) return null;

    return await verifySessionCookie(sessionCookie);
}