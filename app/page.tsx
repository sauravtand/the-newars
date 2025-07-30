import Link from "next/link"
import Header from "@/components/header"
import PostsGrid from "@/components/posts-grid"
import WorksPreview from "@/components/works-preview"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50">
      <Header />

      {/* Hero Section */}
      <section className="relative py-20 px-4 text-center bg-gradient-to-r from-red-600 to-orange-600 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-shadow">The Newars</h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90">Preserving and Celebrating Newari Culture</p>
          <p className="text-lg opacity-80 max-w-2xl mx-auto">
            Discover the rich heritage of Newari festivals, traditional cuisine, sacred rituals, and timeless music and
            dance traditions of Nepal.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Link href="/posts">
              <Button size="lg" className="bg-white text-red-600 hover:bg-gray-100">
                Explore Posts
              </Button>
            </Link>
            <Link href="/works">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-red-600 bg-transparent"
              >
                Our Works
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Latest Posts Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800">Latest Cultural Posts</h2>
            <Link href="/posts">
              <Button variant="outline" className="border-red-200 text-red-600 hover:bg-red-50 bg-transparent">
                View All Posts
              </Button>
            </Link>
          </div>
          <PostsGrid limit={6} showEmptyAction={true} />
        </div>
      </section>

      {/* Works Preview Section */}
      <section className="py-16 px-4 bg-white/50">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800">Our Recent Works</h2>
            <Link href="/works">
              <Button variant="outline" className="border-orange-200 text-orange-600 hover:bg-orange-50 bg-transparent">
                View All Works
              </Button>
            </Link>
          </div>
          <WorksPreview limit={3} showEmptyAction={true} />
        </div>
      </section>

      <Footer />
    </div>
  )
}
