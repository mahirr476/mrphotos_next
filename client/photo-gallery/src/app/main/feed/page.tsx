// src/app/(main)/feed/page.tsx
'use client'

import { PhotoGrid } from '@/components/photos/PhotoGrid';
import { FeaturedSection } from '@/components/photos/FeaturedSection';
import { TrendingPhotos } from '@/components/photos/TrendingPhotos';

export default function FeedPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <section className="py-12">
        <h1 className="text-4xl font-bold tracking-tight">
          Discover Amazing Photography
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Explore the world through our community's lens
        </p>
      </section>

      {/* Featured Photos */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Featured</h2>
        <FeaturedSection />
      </section>

      {/* Trending Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Trending Now</h2>
        <TrendingPhotos />
      </section>

      {/* Latest Photos Grid */}
      <section>
        <h2 className="text-2xl font-semibold mb-6">Latest Photos</h2>
        <PhotoGrid />
      </section>
    </div>
  );
}