// src/components/photos/PhotoFeedCard.tsx
'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { formatDistanceToNow } from 'date-fns'
import { Heart, MessageCircle, Share2, Bookmark, MoreHorizontal } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'
import { Photo } from '@/types'

// Update PhotoFeedCardProps to extend Photo type
interface PhotoFeedCardProps {
  photo: Photo
}

export function PhotoFeedCard({ photo }: PhotoFeedCardProps) {
  const [isLiked, setIsLiked] = useState(false)
  const [isSaved, setIsSaved] = useState(false)
  const [showComments, setShowComments] = useState(false)
  const [newComment, setNewComment] = useState('')

  return (
    <Card className="border-none shadow-none">
      <CardHeader className="p-4 pb-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="h-8 w-8">
              <AvatarImage src={photo.user.avatar} />
              <AvatarFallback>{photo.user.name[0]}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <Link 
                href={`/profile/${photo.user.id}`}
                className="text-sm font-medium hover:underline"
              >
                {photo.user.name}
              </Link>
              <span className="text-xs text-muted-foreground">
                {formatDistanceToNow(new Date(photo.createdAt), { addSuffix: true })}
              </span>
            </div>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Share2 className="mr-2 h-4 w-4" />
                Share
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-600">
                Report
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>

      <CardContent className="p-0 mt-4">
        <div className="relative aspect-[4/3]">
          <Image
            src={photo.imageUrl}
            alt={photo.caption}
            fill
            className="object-cover"
          />
        </div>
      </CardContent>

      <CardFooter className="p-4 flex flex-col gap-3">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsLiked(!isLiked)}
              className={cn(
                "hover:text-red-600 transition-colors",
                isLiked && "text-red-600"
              )}
            >
              <Heart className={cn("h-6 w-6", isLiked && "fill-current")} />
            </Button>
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => setShowComments(!showComments)}
            >
              <MessageCircle className="h-6 w-6" />
            </Button>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsSaved(!isSaved)}
            className={cn(
              "hover:text-primary transition-colors",
              isSaved && "text-primary"
            )}
          >
            <Bookmark className={cn("h-6 w-6", isSaved && "fill-current")} />
          </Button>
        </div>

        <div className="space-y-1">
          <p className="text-sm font-medium">{photo.likes} likes</p>
          <p className="text-sm">
            <Link 
              href={`/profile/${photo.user.id}`}
              className="font-medium hover:underline mr-2"
            >
              {photo.user.name}
            </Link>
            {photo.caption}
          </p>
          {photo.comments.length > 0 && (
            <button
              onClick={() => setShowComments(!showComments)}
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              View all {photo.comments.length} comments
            </button>
          )}
        </div>

        {showComments && (
          <div className="mt-2 space-y-3">
            {photo.comments.map((comment) => (
              <div key={comment.id} className="flex items-start gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage src={comment.user.avatar} />
                  <AvatarFallback>{comment.user.name[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="text-sm">
                    <Link 
                      href={`/profile/${comment.user.id}`}
                      className="font-medium hover:underline mr-2"
                    >
                      {comment.user.name}
                    </Link>
                    {comment.content}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        <form onSubmit={(e) => {
          e.preventDefault()
          // Handle comment submission
          setNewComment('')
        }} className="relative mt-2">
          <Input
            placeholder="Add a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="pr-20"
          />
          <Button 
            type="submit" 
            variant="ghost" 
            size="sm"
            className="absolute right-2 top-1/2 -translate-y-1/2"
            disabled={!newComment.trim()}
          >
            Post
          </Button>
        </form>
      </CardFooter>
    </Card>
  )
}