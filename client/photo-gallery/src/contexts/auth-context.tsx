// src/contexts/auth-context.tsx
'use client'

import React, { createContext, useContext, useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { User } from '@/types';
import { authService } from '@/api/services/auth';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (credentials: { email: string; password: string }) => Promise<void>;
  register: (data: { 
    email: string; 
    password: string; 
    firstName?: string; 
    lastName?: string; 
  }) => Promise<void>;
  logout: () => void;
  checkAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Protected routes - redirect to login if not authenticated
  useEffect(() => {
    const protectedRoutes = ['/profile', '/settings', '/upload'];
    const authRoutes = ['/login', '/register'];
    
    if (isLoading) return;

    if (!user && protectedRoutes.some(route => pathname?.startsWith(route))) {
      router.push('/login');
    } else if (user && authRoutes.includes(pathname || '')) {
      router.push('/');
    }
  }, [user, isLoading, pathname, router]);

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setIsLoading(false);
        return;
      }

      const { user } = await authService.validateToken();
      setUser(user);
    } catch (error) {
      localStorage.removeItem('token');
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  // Check authentication status on mount
  useEffect(() => {
    void checkAuth();
  }, []);

  const login = async (credentials: { email: string; password: string }) => {
    try {
      const response = await authService.login(credentials);
      localStorage.setItem('token', response.token);
      setUser(response.user);
      router.push('/');
    } catch (error) {
      throw error;
    }
  };

  const register = async (data: { 
    email: string; 
    password: string; 
    firstName?: string; 
    lastName?: string; 
  }) => {
    try {
      const response = await authService.register(data);
      localStorage.setItem('token', response.token);
      setUser(response.user);
      router.push('/');
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    router.push('/login');
  };

  if (isLoading) {
    // You might want to show a loading spinner here
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
      </div>
    );
  }

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        isLoading, 
        login, 
        register, 
        logout, 
        checkAuth 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};