import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Calendar, Award } from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import MediaGallery from "@/components/media-gallery"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { getWork } from "@/lib/actions"

interface WorkPageProps {
  params: {
    id: string
  }
}

export default async function WorkPage({ params }: WorkPageProps) {
  const work = await getWork(params.id)

  if (!work) {
    notFound()
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <Award className="h-5 w-5 text-green-600" />
      case "ongoing":
        return <Award className="h-5 w-5 text-blue-600" />
      case "planned":
        return <Award className="h-5 w-5 text-yellow-600" />
      default:
        return <Award className="h-5 w-5 text-gray-600" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "ongoing":
        return "bg-blue-100 text-blue-800"
      case "planned":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50">
      <Header />

      <article className="max-w-4xl mx-auto px-4 py-8">
        <Link href="/works">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Works
          </Button>
        </Link>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-8">
            {/* Header with badges */}
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <Badge variant="outline" className="capitalize text-orange-700 border-orange-200">
                {work.category}
              </Badge>
              <div className="flex items-center">
                {getStatusIcon(work.status)}
                <Badge className={`ml-1 ${getStatusColor(work.status)}`}>{work.status}</Badge>
              </div>
            </div>

            <h1 className="text-4xl font-bold text-gray-800 mb-4">{work.title}</h1>

            <div className="flex items-center text-gray-600 mb-6">
              <Calendar className="mr-2 h-4 w-4" />
              <span className="mr-4">Completed:</span>
              <time dateTime={work.completedDate.toISOString()}>
                {work.completedDate.toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
            </div>

            {/* Media Gallery */}
            {work.media && work.media.length > 0 && (
              <div className="mb-8">
                <MediaGallery media={work.media} />
              </div>
            )}

            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{work.description}</p>
            </div>

            {/* Additional metadata */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                <div>
                  <span className="font-medium">Category:</span> {work.category}
                </div>
                <div>
                  <span className="font-medium">Status:</span> {work.status}
                </div>
                <div>
                  <span className="font-medium">Created:</span>{" "}
                  {work.createdAt.toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </div>
                {work.updatedAt && work.updatedAt.getTime() !== work.createdAt.getTime() && (
                  <div>
                    <span className="font-medium">Updated:</span>{" "}
                    {work.updatedAt.toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </article>

      <Footer />
    </div>
  )
}
