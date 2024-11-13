// src/components/layout/navbar.tsx
'use client'

import { useAuth } from '@/contexts/auth-context';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Camera, Users, LogOut, Home, LogIn } from 'lucide-react';

export function Navbar() {
  const { user, logout } = useAuth();
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <SidebarProvider defaultOpen>
      <Sidebar>
        <SidebarHeader>
          <h2 className="text-lg font-semibold">Photo Gallery</h2>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={isActive('/')}
                tooltip="Public Gallery"
              >
                <Link href="/">
                  <Home className="w-4 h-4" />
                  <span>Public Gallery</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            
            {user && (
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={isActive('/gallery')}
                  tooltip="My Gallery"
                >
                  <Link href="/gallery">
                    <Camera className="w-4 h-4" />
                    <span>My Gallery</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            )}
            
            {user?.role === 'ADMIN' && (
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={isActive('/admin')}
                  tooltip="Admin"
                >
                  <Link href="/admin">
                    <Users className="w-4 h-4" />
                    <span>Admin</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            )}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter className="p-4">
          {user ? (
            <Button
              variant="ghost"
              className="w-full flex items-center gap-2"
              onClick={logout}
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </Button>
          ) : (
            <Link href="/login" className="w-full">
              <Button variant="default" className="w-full flex items-center gap-2">
                <LogIn className="w-4 h-4" />
                <span>Login</span>
              </Button>
            </Link>
          )}
        </SidebarFooter>
      </Sidebar>
    </SidebarProvider>
  );
}