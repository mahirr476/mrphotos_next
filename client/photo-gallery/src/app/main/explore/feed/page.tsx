// src/app/explore/feed/page.tsx
'use client'

import { PhotoFeedCard } from '@/components/photos/PhotoFeedCard'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { useInfiniteScroll } from '@/hooks/use-infinite-scroll'
import { Photo } from '@/types'

export default function FeedPage() {
  const { 
    data, 
    isLoading, 
    hasNextPage, 
    fetchNextPage 
  } = useInfiniteScroll<Photo>('/api/photos/feed')

  return (
    <div className="container py-6 max-w-3xl">
      <div className="flex flex-col gap-6">
        {isLoading ? (
          // Loading skeletons
          Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-[600px] w-full rounded-lg" />
          ))
        ) : (
          // Photo feed
          data?.pages.map((page, pageIndex) =>
            page.items.map((photo: Photo) => (
              <PhotoFeedCard 
                key={`${pageIndex}-${photo.id}`} 
                photo={photo}
              />
            ))
          )
        )}
        
        {hasNextPage && (
          <Button
            onClick={() => fetchNextPage()}
            variant="outline"
            className="w-full"
          >
            Load more
          </Button>
        )}
      </div>
    </div>
  )
}