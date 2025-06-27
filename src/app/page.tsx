'use client';

import { useAuth } from '@/components/auth/AuthProvider';
import Link from 'next/link';

export default function Home() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 text-center">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Welcome to DevSnap</h1>
          <p className="text-gray-600">Your authentication is ready to go!</p>
        </div>

        {user ? (
          <div className="space-y-4">
            <p className="text-green-600">You are signed in as: {user.email}</p>
            <div className="space-x-4">
              <Link
                href="/dashboard"
                className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-md font-medium"
              >
                Go to Dashboard
              </Link>
              <Link
                href="/auth/logout"
                className="inline-block bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-md font-medium"
              >
                Logout
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-gray-600">Please sign in to continue</p>
            <div className="space-x-4">
              <Link
                href="/auth/login"
                className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-md font-medium"
              >
                Sign In
              </Link>
              <Link
                href="/auth/signup"
                className="inline-block bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-md font-medium"
              >
                Sign Up
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}