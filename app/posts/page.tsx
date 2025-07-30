import { Suspense } from "react"
import Image from "next/image"
import Link from "next/link"
import { Calendar, Eye } from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { getPosts } from "@/lib/actions"

export default function PostsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50">
      <Header />

      {/* Hero Section */}
      <section className="relative py-20 px-4 text-center bg-gradient-to-r from-red-600 to-orange-600 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-shadow">Cultural Posts</h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90">Discover Newari Heritage</p>
          <p className="text-lg opacity-80 max-w-2xl mx-auto">
            Explore our collection of posts about Newari festivals, traditions, food, rituals, and cultural practices.
          </p>
        </div>
      </section>

      {/* Posts Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <Suspense fallback={<PostsGridSkeleton />}>
            <AllPostsGrid />
          </Suspense>
        </div>
      </section>

      <Footer />
    </div>
  )
}

async function AllPostsGrid() {
  const posts = await getPosts()

  if (posts.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 text-lg">No posts available yet.</p>
        <p className="text-gray-500 mt-2">Check back soon for cultural content!</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {posts.map((post) => (
        <Link key={post._id} href={`/post/${post._id}`}>
          <Card className="bg-white shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer group">
            {post.imageUrl && (
              <div className="relative h-48 w-full overflow-hidden">
                <Image
                  src={post.imageUrl || "/placeholder.svg"}
                  alt={post.title}
                  fill
                  className="object-cover rounded-t-lg group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            )}
            <CardHeader>
              <CardTitle className="text-xl text-gray-800 group-hover:text-red-600 transition-colors line-clamp-2">
                {post.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4 line-clamp-3">{post.description}</p>
              <div className="flex items-center justify-between text-sm text-gray-500">
                <div className="flex items-center">
                  <Calendar className="mr-1 h-4 w-4" />
                  <time dateTime={post.createdAt.toISOString()}>
                    {post.createdAt.toLocaleDateString("en-US", {
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
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  )
}

function PostsGridSkeleton() {
  return (
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
  )
}
