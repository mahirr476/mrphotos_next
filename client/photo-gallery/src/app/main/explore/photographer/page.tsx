// src/app/explore/photographer/page.tsx
'use client'

import Image from 'next/image'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { PhotoGrid } from '@/components/photos/PhotoGrid'
import { CollectionGrid } from '@/components/photos/CollectionGrid'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'

export default function PhotographerPage() {
  return (
    <div className="container py-6">
      {/* Photographer Header */}
      <section className="mb-12">
        <div className="flex items-center gap-6">
          <Image
            src="/moshiur-rahman.jpg"
            alt="Moshiur Rahman"
            width={120}
            height={120}
            className="rounded-full"
          />
          <div>
            <h1 className="text-3xl font-bold mb-2">Moshiur Rahman</h1>
            <p className="text-muted-foreground max-w-2xl">
              Professional photographer capturing moments around the world. 
              Specializing in landscape and street photography.
            </p>
            <div className="flex gap-4 mt-4">
              <Button>Follow</Button>
              <Button variant="outline">Share Profile</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <Tabs defaultValue="gallery" className="space-y-6">
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="gallery">Gallery</TabsTrigger>
            <TabsTrigger value="collections">Collections</TabsTrigger>
            <TabsTrigger value="about">About</TabsTrigger>
          </TabsList>

          <div className="relative w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search photos..."
              className="pl-9"
            />
          </div>
        </div>

        <TabsContent value="gallery" className="space-y-6">
          {/* Top Rated Photos */}
          <section>
            <h2 className="text-2xl font-semibold mb-6">Top Rated Photos</h2>
            <PhotoGrid />
          </section>
        </TabsContent>

        <TabsContent value="collections" className="space-y-6">
          {/* Location-based Collections */}
          <CollectionGrid />
        </TabsContent>

        <TabsContent value="about" className="max-w-3xl">
          {/* About Section */}
          <div className="prose dark:prose-invert">
            <h2>About Moshiur Rahman</h2>
            <p>
              [Detailed biography and story goes here]
            </p>
            
            <h3>Equipment</h3>
            <ul>
              <li>Camera Body: [Details]</li>
              <li>Favorite Lenses: [Details]</li>
              <li>Other Equipment: [Details]</li>
            </ul>

            <h3>Photography Philosophy</h3>
            <p>
              [Photography philosophy and approach]
            </p>

            <h3>Contact</h3>
            <p>
              For business inquiries: [contact information]
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}