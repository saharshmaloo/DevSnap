import { getAuthUser } from '@/lib/auth';
import { NextRequest } from 'next/server';
import DashboardClient from './DashboardClient';

export default async function DashboardPage({
  request,
}: {
  request: NextRequest;
}) {
  const user = await getAuthUser(request);
  
  if (!user) {
    return null; // Will be redirected by middleware or client-side
  }

  return <DashboardClient user={user} />;
}