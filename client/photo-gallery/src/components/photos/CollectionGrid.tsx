// src/components/photos/CollectionGrid.tsx
'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useQuery } from '@tanstack/react-query'
import { 
  Card, 
  CardContent, 
  CardFooter, 
  CardHeader 
} from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { MapPin } from 'lucide-react'

interface Collection {
  id: string
  title: string
  location: string
  coverImage: string
  photoCount: number
  featured: boolean
}

export function CollectionGrid() {
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null)

  const { data: collections, isLoading } = useQuery<Collection[]>({
    queryKey: ['collections', selectedLocation],
    queryFn: async () => {
      const response = await fetch(
        `/api/collections${selectedLocation ? `?location=${selectedLocation}` : ''}`
      )
      if (!response.ok) {
        throw new Error('Failed to fetch collections')
      }
      return response.json()
    }
  })

  const locations = collections ? [...new Set(collections.map(c => c.location))] : []

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton 
            key={i} 
            className="aspect-[3/4] rounded-lg" 
          />
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Location Filter */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setSelectedLocation(null)}
          className={`px-4 py-2 rounded-full text-sm transition-colors ${
            !selectedLocation 
              ? 'bg-primary text-primary-foreground' 
              : 'bg-muted hover:bg-muted/80'
          }`}
        >
          All Locations
        </button>
        {locations.map(location => (
          <button
            key={location}
            onClick={() => setSelectedLocation(location)}
            className={`px-4 py-2 rounded-full text-sm transition-colors ${
              selectedLocation === location 
                ? 'bg-primary text-primary-foreground' 
                : 'bg-muted hover:bg-muted/80'
            }`}
          >
            {location}
          </button>
        ))}
      </div>

      {/* Collections Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {collections?.map((collection) => (
          <Link 
            key={collection.id} 
            href={`/collections/${collection.id}`}
          >
            <Card className="overflow-hidden h-full hover:shadow-lg transition-shadow">
              <CardHeader className="p-0">
                <div className="relative aspect-[3/4]">
                  <Image
                    src={collection.coverImage}
                    alt={collection.title}
                    fill
                    className="object-cover"
                  />
                  {collection.featured && (
                    <div className="absolute top-4 right-4">
                      <span className="px-3 py-1 bg-primary text-primary-foreground text-xs font-medium rounded-full">
                        Featured
                      </span>
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <h3 className="text-lg font-semibold mb-2">
                  {collection.title}
                </h3>
                <div className="flex items-center text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4 mr-1" />
                  {collection.location}
                </div>
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <span className="text-sm text-muted-foreground">
                  {collection.photoCount} photos
                </span>
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>

      {collections?.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            No collections found for this location.
          </p>
        </div>
      )}
    </div>
  )
}