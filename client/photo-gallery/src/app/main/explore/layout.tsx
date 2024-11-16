// src/app/explore/layout.tsx
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'

const exploreNavItems = [
  {
    title: "Photo Feed",
    href: "/explore/feed",
    description: "Discover photos from the community"
  },
  {
    title: "Moshiur Rahman",
    href: "/explore/photographer",
    description: "View the photographer's collection"
  }
]

export default function ExploreLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  return (
    <div className="flex flex-col min-h-screen">
      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex flex-col gap-4 py-4">
          <Tabs value={pathname} className="w-full">
            <TabsList>
              {exploreNavItems.map((item) => (
                <TabsTrigger
                  key={item.href}
                  value={item.href}
                  className="flex-1"
                  asChild
                >
                  <Link href={item.href}>
                    {item.title}
                  </Link>
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>
      </div>
      {children}
    </div>
  )
}