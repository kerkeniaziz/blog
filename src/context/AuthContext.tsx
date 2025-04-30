// app/context/AuthContext.tsx
"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { usePathname } from "next/navigation";

type AuthContextType = {
  isLoggedIn: boolean;
  setIsLoggedIn: (val: boolean) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    // Optional: Check for token in cookies (basic session persistence)
    const isTokenAvailable = document.cookie.includes("accessToken=");
    setIsLoggedIn(isTokenAvailable);
  }, [pathname]);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
