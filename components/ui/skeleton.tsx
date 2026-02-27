import { cn } from '@/lib/utils'

interface SkeletonProps {
  className?: string
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        'animate-pulse rounded-xl bg-gray-200',
        className
      )}
    />
  )
}

export function ProductCardSkeleton() {
  return (
    <div className="rounded-2xl overflow-hidden bg-white">
      <Skeleton className="aspect-[3/4] rounded-none" />
      <div className="p-4 space-y-3">
        <div className="flex gap-1">
          <Skeleton className="w-4 h-4 rounded-full" />
          <Skeleton className="w-4 h-4 rounded-full" />
          <Skeleton className="w-4 h-4 rounded-full" />
        </div>
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
        <div className="flex gap-2">
          <Skeleton className="h-5 w-16" />
          <Skeleton className="h-5 w-20" />
        </div>
      </div>
    </div>
  )
}

export function ProductDetailSkeleton() {
  return (
    <div className="container-main py-24">
      <div className="flex flex-col lg:flex-row gap-12">
        <div className="lg:w-[55%]">
          <Skeleton className="aspect-[3/4] rounded-2xl" />
        </div>
        <div className="lg:w-[45%] space-y-6">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-8 w-3/4" />
          <Skeleton className="h-6 w-1/2" />
          <Skeleton className="h-px w-full" />
          <Skeleton className="h-12 w-full rounded-xl" />
        </div>
      </div>
    </div>
  )
}
