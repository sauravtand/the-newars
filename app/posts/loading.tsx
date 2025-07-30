import { Skeleton } from "@/components/ui/skeleton"

export default function PostsLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50">
      {/* Header Skeleton */}
      <div className="bg-white shadow-sm border-b border-red-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Skeleton className="w-8 h-8 rounded-full" />
              <Skeleton className="w-32 h-6" />
            </div>
            <div className="hidden md:flex space-x-8">
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} className="w-16 h-4" />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section Skeleton */}
      <section className="relative py-20 px-4 text-center bg-gradient-to-r from-red-600 to-orange-600">
        <div className="max-w-4xl mx-auto">
          <Skeleton className="h-12 w-3/4 mx-auto mb-6 bg-white/20" />
          <Skeleton className="h-6 w-1/2 mx-auto mb-8 bg-white/20" />
          <Skeleton className="h-16 w-5/6 mx-auto bg-white/20" />
        </div>
      </section>

      {/* Posts Grid Skeleton */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
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
        </div>
      </section>
    </div>
  )
}
