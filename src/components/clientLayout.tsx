// components/ClientLayout.tsx
'use client';

import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import NavBarHome from './navBarHome';
import NavBarUser from './navBarUser';
import FooterSection from './footer';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  return (
      <>
        {isLoggedIn ? <NavBarUser /> : <NavBarHome />}
        {children}
        {!isLoggedIn && <FooterSection />}
      </>
  );
}
