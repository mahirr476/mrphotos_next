// src/hooks/use-infinite-scroll.ts
import { useInfiniteQuery } from '@tanstack/react-query'
import { useInView } from 'react-intersection-observer'
import { useEffect } from 'react'
import { PaginatedResponse } from '@/types'

interface UseInfiniteScrollOptions {
  pageSize?: number
  initialData?: any
}

export function useInfiniteScroll<T>(
  endpoint: string, 
  options: UseInfiniteScrollOptions = {}
) {
  const { pageSize = 10 } = options
  const { ref, inView } = useInView()

  const fetchPage = async ({ pageParam = 1 }) => {
    const response = await fetch(
      `${endpoint}?page=${pageParam}&limit=${pageSize}`
    )
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }
    return response.json() as Promise<PaginatedResponse<T>>
  }

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    isPending,
  } = useInfiniteQuery({
    queryKey: ['infinite', endpoint],
    queryFn: fetchPage,
    getNextPageParam: (lastPage) => lastPage.nextPage ?? undefined,
    initialPageParam: 1,
  })

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage()
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage])

  return {
    data,
    error,
    isLoading: isPending,
    isFetching,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    ref,
  }
}