'use client';

import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { RootState } from '@/store';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  
  useEffect(() => {
    if (!isLoggedIn) {
      router.replace('/login'); // Redirect to log in if not authenticated
    }
  }, [isLoggedIn, router]);

  // Optionally render a loading indicator while redirecting
  if (!isLoggedIn) {
    return <div>Redirecting...</div>;
  }

  return <>{children}</>;
}
