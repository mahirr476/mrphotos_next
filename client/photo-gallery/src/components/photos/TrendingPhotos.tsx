// src/components/photos/TrendingPhotos.tsx
'use client'

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Flame } from 'lucide-react';

interface TrendingPhoto {
  id: string;
  url: string;
  category: string;
  views: number;
  photographer: {
    name: string;
    avatar: string;
  };
}

export function TrendingPhotos() {
  const [photos, setPhotos] = useState<TrendingPhoto[]>([]);

  // Mock data - replace with API call
  useEffect(() => {
    const mockPhotos = Array.from({ length: 10 }, (_, i) => ({
      id: `trending-${i}`,
      url: `/api/placeholder/400/300`,
      category: ['Landscape', 'Portrait', 'Street', 'Nature', 'Architecture'][
        i % 5
      ],
      views: Math.floor(Math.random() * 10000),
      photographer: {
        name: `Trending Photographer ${i}`,
        avatar: `/api/placeholder/40/40`,
      },
    }));

    setPhotos(mockPhotos);
  }, []);

  return (
    <ScrollArea className="w-full whitespace-nowrap rounded-md border">
      <div className="flex w-max space-x-4 p-4">
        {photos.map((photo) => (
          <Card
            key={photo.id}
            className="w-[300px] shrink-0 overflow-hidden"
          >
            <CardContent className="p-0">
              <div className="relative aspect-[4/3]">
                <Image
                  src={photo.url}
                  alt={`Trending photo by ${photo.photographer.name}`}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-2 left-2">
                  <Badge variant="secondary" className="flex items-center gap-1">
                    <Flame className="w-3 h-3 text-orange-500" />
                    {(photo.views / 1000).toFixed(1)}k views
                  </Badge>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Image
                      src={photo.photographer.avatar}
                      alt={photo.photographer.name}
                      width={32}
                      height={32}
                      className="rounded-full border-2 border-white"
                    />
                    <div className="text-white text-sm font-medium">
                      {photo.photographer.name}
                    </div>
                  </div>
                  <Badge>{photo.category}</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}