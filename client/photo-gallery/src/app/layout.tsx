// src/app/layout.tsx
import { Inter } from 'next/font/google';
import { AuthProvider } from '@/contexts/auth-context';
import { Navbar } from '@/components/layout/navbar';
import { Toaster } from '@/components/ui/toaster';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <Navbar />
          <main className="p-8 md:ml-[16rem]">
            {children}
          </main>
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}