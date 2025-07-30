import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Calendar } from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import MediaGallery from "@/components/media-gallery"
import { Button } from "@/components/ui/button"
import { getPost } from "@/lib/actions"

interface PostPageProps {
  params: {
    id: string
  }
}

export default async function PostPage({ params }: PostPageProps) {
  const post = await getPost(params.id)

  if (!post) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50">
      <Header />

      <article className="max-w-4xl mx-auto px-4 py-8">
        <Link href="/">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Posts
          </Button>
        </Link>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">{post.title}</h1>

            <div className="flex items-center text-gray-600 mb-6">
              <Calendar className="mr-2 h-4 w-4" />
              <time dateTime={post.createdAt.toISOString()}>
                {post.createdAt.toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
            </div>

            {/* Media Gallery */}
            {post.media && post.media.length > 0 && (
              <div className="mb-8">
                <MediaGallery media={post.media} />
              </div>
            )}

            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{post.description}</p>
            </div>
          </div>
        </div>
      </article>

      <Footer />
    </div>
  )
}
