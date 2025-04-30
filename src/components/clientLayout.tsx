// components/ClientLayout.tsx
"use client";

import { useAuth } from "@/context/AuthContext";
import NavBarHome from "./navBarHome";
import NavBarUser from "./navBarUser";
import FooterSection from "./footer";


export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const { isLoggedIn } = useAuth();

  return (
    <>
      {isLoggedIn ? <NavBarUser /> : <NavBarHome />}
      {children}
      
      {isLoggedIn ? "" : <FooterSection />}

    </>
  );
}
