// src/app/page.tsx
'use client'

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import { useAuth } from '@/contexts/auth-context';

export default function HomePage() {
  const router = useRouter();
  const { user } = useAuth();

  // If user is logged in, redirect to their specific gallery
  useEffect(() => {
    if (user) {
      router.push('/gallery');
    }
  }, [user, router]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Public Gallery</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Placeholder cards for demonstration */}
        {Array.from({ length: 6 }).map((_, index) => (
          <Card key={index} className="overflow-hidden">
            <CardContent className="p-0">
              {/* Using placeholder images - replace with your actual image service */}
              <div className="aspect-square bg-muted relative">
                <img
                  src={`/api/placeholder/400/400`}
                  alt={`Gallery item ${index + 1}`}
                  className="object-cover"
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Optional welcome message for non-logged in users */}
      {!user && (
        <div className="fixed bottom-6 right-6">
          <Card className="bg-primary text-primary-foreground p-4">
            <p className="text-sm">
              Log in to upload and manage your own photos
            </p>
          </Card>
        </div>
      )}
    </div>
  );
}