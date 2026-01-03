"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { apiFetch } from "@/lib/apiClient";

interface AuthContextType {
  isAuthenticated: boolean;
  isHydrated: boolean;
  loginSuccess: () => void;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);

  // Check auth state on mount
  useEffect(() => {
    async function checkAuth() {
      try {
        // Lightweight endpoint to check auth status from cookies
        await apiFetch("/api/auth/me");
        setIsAuthenticated(true);
      } catch (error) {
        setIsAuthenticated(false);
      } finally {
        setIsHydrated(true);
      }
    }

    checkAuth();
  }, []);

  const loginSuccess = () => {
    setIsAuthenticated(true);
  };

  const logout = async () => {
    try {
      // Call logout endpoint to clear HttpOnly cookie
      await apiFetch("/api/logout", { method: "POST" });
      setIsAuthenticated(false);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isHydrated,
        loginSuccess,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}