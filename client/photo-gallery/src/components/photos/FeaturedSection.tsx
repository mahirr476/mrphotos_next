// src/components/photos/FeaturedSection.tsx
'use client'

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface FeaturedPhoto {
  id: string;
  url: string;
  title: string;
  photographer: string;
  description: string;
}

export function FeaturedSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [photos, setPhotos] = useState<FeaturedPhoto[]>([]);

  // Mock data - replace with API call
  useEffect(() => {
    const mockPhotos = Array.from({ length: 5 }, (_, i) => ({
      id: `featured-${i}`,
      url: `/api/placeholder/1200/600`,
      title: `Featured Photo ${i}`,
      photographer: `Featured Photographer ${i}`,
      description: 'A beautiful landscape captured during golden hour...',
    }));

    setPhotos(mockPhotos);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % photos.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length);
  };

  if (!photos.length) return null;

  return (
    <Card className="relative overflow-hidden rounded-xl">
      <CardContent className="p-0 aspect-[21/9] relative">
        {/* Main Image */}
        <Image
          src={photos[currentIndex].url}
          alt={photos[currentIndex].title}
          fill
          className="object-cover"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <h3 className="text-2xl font-bold mb-2">
            {photos[currentIndex].title}
          </h3>
          <p className="text-sm mb-4">{photos[currentIndex].description}</p>
          <p className="text-sm opacity-75">
            By {photos[currentIndex].photographer}
          </p>
        </div>

        {/* Navigation Buttons */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:bg-black/20"
          onClick={prevSlide}
        >
          <ChevronLeft className="h-8 w-8" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:bg-black/20"
          onClick={nextSlide}
        >
          <ChevronRight className="h-8 w-8" />
        </Button>

        {/* Dots */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
          {photos.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentIndex
                  ? 'bg-white scale-125'
                  : 'bg-white/50 hover:bg-white/75'
              }`}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}