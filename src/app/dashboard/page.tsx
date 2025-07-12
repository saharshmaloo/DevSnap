import { getAuthUserFromHeaders } from '@/lib/auth';
import DashboardClient from './DashboardClient';

export default async function DashboardPage() {
  const user = await getAuthUserFromHeaders();
  
  if (!user) {
    return null; // Will be redirected by middleware or client-side
  }

  return <DashboardClient user={user} />;
}