// src/app/page.tsx
'use client'

import { PhotoGrid } from '@/components/photos/PhotoGrid';
import { FeaturedSection } from '@/components/photos/FeaturedSection';
import { TrendingPhotos } from '@/components/photos/TrendingPhotos';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/auth-context';
import { Camera, Users, Image as ImageIcon } from 'lucide-react';

export default function HomePage() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen mt-10">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            Share Your World Through
            <span className="text-primary"> Photography</span>
          </h1>
          <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Join our community of photographers, share your stories, and discover amazing moments captured around the world.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            {user ? (
              <Button size="lg" className="gap-2">
                <Camera className="w-4 h-4" />
                Upload Your Photos
              </Button>
            ) : (
              <>
                <Button size="lg" className="gap-2" asChild>
                  <a href="/register">Get Started</a>
                </Button>
                <Button size="lg" variant="outline" className="gap-2" asChild>
                  <a href="/login">Sign In</a>
                </Button>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 border-y bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="flex justify-center mb-4">
                <ImageIcon className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold">1M+</h3>
              <p className="text-muted-foreground">Photos Shared</p>
            </div>
            <div>
              <div className="flex justify-center mb-4">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold">500K+</h3>
              <p className="text-muted-foreground">Active Creators</p>
            </div>
            <div>
              <div className="flex justify-center mb-4">
                <Camera className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold">50K+</h3>
              <p className="text-muted-foreground">Daily Uploads</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Featured Photos</h2>
          <FeaturedSection />
        </div>
      </section>

      {/* Trending Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Trending Now</h2>
          <TrendingPhotos />
        </div>
      </section>

      {/* Latest Photos Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Latest Photos</h2>
            <Button variant="outline">View All</Button>
          </div>
          <PhotoGrid />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary">
        <div className="container mx-auto px-4 text-center text-primary-foreground">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Start Sharing?
          </h2>
          <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            Join our community today and start sharing your photographic journey with creators from around the world.
          </p>
          {!user && (
            <Button size="lg" variant="secondary" asChild>
              <a href="/register">Create Your Account</a>
            </Button>
          )}
        </div>
      </section>
    </div>
  );
}