import { Suspense } from "react"
import Image from "next/image"
import Link from "next/link"
import { Calendar, Eye } from "lucide-react"
import { getPosts, type PostData } from "@/lib/actions"
import { base64ToDataURL } from "@/lib/utils/media"
import EmptyState from "./empty-state"
import LoadingState from "./loading-state"

interface PostsGridProps {
  limit?: number
  showEmptyAction?: boolean
}

async function PostsGridContent({ limit, showEmptyAction = false }: PostsGridProps) {
  try {
    const allPosts = await getPosts()

    if (!allPosts || allPosts.length === 0) {
      return <EmptyState type="posts" showAction={showEmptyAction} />
    }

    const posts = limit ? allPosts.slice(0, limit) : allPosts

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post: PostData) => {
          const firstImage = post.media?.find((m) => m.mimeType?.startsWith("image/"))
          const thumbnailSrc = firstImage
            ? base64ToDataURL(firstImage.data, firstImage.mimeType)
            : "/placeholder.svg?height=200&width=300&text=Cultural+Post"

          return (
            <Link key={post._id} href={`/post/${post._id}`}>
              <article className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer group">
                <div className="relative h-48 w-full overflow-hidden">
                  <Image
                    src={thumbnailSrc || "/placeholder.svg"}
                    alt={post.title || "Cultural post"}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    unoptimized
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.src = "/placeholder.svg?height=200&width=300&text=Image+Error"
                    }}
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2 line-clamp-2 group-hover:text-red-600 transition-colors">
                    {post.title || "Untitled Post"}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">{post.description || "No description available"}</p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center">
                      <Calendar className="mr-1 h-4 w-4" />
                      <time dateTime={post.createdAt?.toISOString()}>
                        {new Date(post.createdAt || new Date()).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </time>
                    </div>
                    <div className="flex items-center text-red-600">
                      <Eye className="mr-1 h-4 w-4" />
                      <span>Read More</span>
                    </div>
                  </div>
                </div>
              </article>
            </Link>
          )
        })}
      </div>
    )
  } catch (error) {
    console.error("❌ Error in PostsGridContent:", error)
    return (
      <div className="text-center py-12 bg-white/50 rounded-lg shadow-sm border-2 border-red-200">
        <h3 className="text-xl font-medium text-red-700 mb-2">Unable to Load Posts</h3>
        <p className="text-gray-600 mb-4">There was an error connecting to the database.</p>
        <p className="text-sm text-gray-500">
          Please try refreshing the page or contact support if the issue persists.
        </p>
      </div>
    )
  }
}

export default function PostsGrid({ limit, showEmptyAction = false }: PostsGridProps) {
  return (
    <Suspense fallback={<LoadingState type="grid" count={limit || 6} />}>
      <PostsGridContent limit={limit} showEmptyAction={showEmptyAction} />
    </Suspense>
  )
}
