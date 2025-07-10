import { requireAuth } from '@/lib/auth';
import { NextRequest } from 'next/server';

export async function ServerProtectedRoute(
  request: NextRequest,
  children: React.ReactNode
) {
  await requireAuth(request);
  return <>{children}</>;
} 