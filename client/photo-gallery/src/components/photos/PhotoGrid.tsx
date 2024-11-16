// src/components/photos/PhotoGrid.tsx
'use client'

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useInView } from 'react-intersection-observer';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Heart, MessageCircle, BookmarkPlus } from 'lucide-react';

interface Photo {
  id: string;
  url: string;
  title: string;
  photographer: {
    name: string;
    avatar: string;
  };
  likes: number;
  comments: number;
}

export function PhotoGrid() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);
  const { ref, inView } = useInView();

  // Mock data - replace with API call
  useEffect(() => {
    const mockPhotos = Array.from({ length: 12 }, (_, i) => ({
      id: `photo-${i}`,
      url: `/api/placeholder/600/400`, // Replace with real API
      title: `Photo ${i}`,
      photographer: {
        name: `Photographer ${i}`,
        avatar: `/api/placeholder/40/40`,
      },
      likes: Math.floor(Math.random() * 1000),
      comments: Math.floor(Math.random() * 100),
    }));

    setPhotos(mockPhotos);
    setLoading(false);
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {loading ? (
        // Loading skeletons
        Array.from({ length: 6 }).map((_, i) => (
          <Card key={i} className="overflow-hidden">
            <Skeleton className="h-[400px]" />
          </Card>
        ))
      ) : (
        // Photo grid
        photos.map((photo) => (
          <Card key={photo.id} className="group overflow-hidden">
            <CardContent className="p-0 relative">
              <Image
                src={photo.url}
                alt={photo.title}
                width={600}
                height={400}
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              {/* Overlay with actions */}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4">
                <div className="flex items-center space-x-2">
                  <Image
                    src={photo.photographer.avatar}
                    alt={photo.photographer.name}
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                  <span className="text-white font-medium">
                    {photo.photographer.name}
                  </span>
                </div>
                <div className="flex justify-between items-center text-white">
                  <div className="flex space-x-4">
                    <button className="flex items-center space-x-1 hover:text-primary">
                      <Heart className="w-5 h-5" />
                      <span>{photo.likes}</span>
                    </button>
                    <button className="flex items-center space-x-1 hover:text-primary">
                      <MessageCircle className="w-5 h-5" />
                      <span>{photo.comments}</span>
                    </button>
                  </div>
                  <button className="hover:text-primary">
                    <BookmarkPlus className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))
      )}
      {/* Infinite scroll trigger */}
      <div ref={ref} />
    </div>
  );
}