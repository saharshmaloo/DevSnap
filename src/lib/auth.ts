import { getCurrentUser } from './jwt';
import { NextRequest } from 'next/server';
import { redirect } from 'next/navigation';

export async function requireAuth(request: NextRequest) {
    const user = await getCurrentUser(request);

    if (!user) {
        redirect('/auth/login');
    }

    return user;
}

export async function getAuthUser(request: NextRequest) {
    return await getCurrentUser(request);
}