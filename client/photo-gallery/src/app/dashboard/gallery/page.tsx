// src/app/dashboard/gallery/page.tsx
'use client'

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useAuth } from '@/contexts/auth-context';
import { useRouter } from 'next/navigation';

interface Photo {
  id: string;
  title: string;
  thumbnailUrl: string;
}

export default function GalleryPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [photos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      router.push('/login');
      return;
    }
    setLoading(false);
  }, [user, router]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {photos.map((photo) => (
        <div key={photo.id}>
          <Image
            src={photo.thumbnailUrl}
            alt={photo.title}
            width={400}
            height={300}
            className="w-full h-48 object-cover"
          />
        </div>
      ))}
    </div>
  );
}