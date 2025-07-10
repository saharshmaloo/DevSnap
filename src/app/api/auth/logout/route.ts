import { NextRequest, NextResponse } from 'next/server';
import { clearAuthCookie } from '@/lib/jwt';

export async function POST(req: NextRequest) {
    try {
        const response = NextResponse.json({ status: true });
        clearAuthCookie(response);
        return response;
    } catch (error) {
        console.error('Logout error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}