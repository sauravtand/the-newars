import { Skeleton } from "@/components/ui/skeleton"

interface LoadingStateProps {
  type: "grid" | "single" | "list"
  count?: number
}

export default function LoadingState({ type, count = 6 }: LoadingStateProps) {
  if (type === "single") {
    return (
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <Skeleton className="h-64 w-full" />
        <div className="p-8">
          <Skeleton className="h-8 w-3/4 mb-4" />
          <Skeleton className="h-4 w-1/2 mb-6" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        </div>
      </div>
    )
  }

  if (type === "list") {
    return (
      <div className="space-y-4">
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between mb-4">
              <Skeleton className="h-6 w-1/4" />
              <Skeleton className="h-6 w-20" />
            </div>
            <Skeleton className="h-5 w-3/4 mb-2" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden">
          <Skeleton className="h-48 w-full" />
          <div className="p-6">
            <Skeleton className="h-6 w-3/4 mb-2" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-2/3 mb-4" />
            <div className="flex justify-between">
              <Skeleton className="h-4 w-1/3" />
              <Skeleton className="h-4 w-1/4" />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
