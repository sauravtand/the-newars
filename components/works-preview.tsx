import { Suspense } from "react"
import Image from "next/image"
import Link from "next/link"
import { Calendar, CheckCircle, Clock, Award, Eye } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getWorks, type WorkData } from "@/lib/actions"
import { base64ToDataURL } from "@/lib/utils/media"
import EmptyState from "./empty-state"
import LoadingState from "./loading-state"

interface WorksPreviewProps {
  limit?: number
  showEmptyAction?: boolean
}

async function WorksPreviewContent({ limit, showEmptyAction = false }: WorksPreviewProps) {
  try {
    const allWorks = await getWorks()

    if (!allWorks || allWorks.length === 0) {
      return <EmptyState type="works" showAction={showEmptyAction} />
    }

    const works = limit ? allWorks.slice(0, limit) : allWorks

    const getStatusIcon = (status: string) => {
      switch (status) {
        case "completed":
          return <CheckCircle className="h-4 w-4 text-green-600" />
        case "ongoing":
          return <Clock className="h-4 w-4 text-blue-600" />
        case "planned":
          return <Calendar className="h-4 w-4 text-yellow-600" />
        default:
          return <Award className="h-4 w-4 text-gray-600" />
      }
    }

    const getStatusColor = (status: string) => {
      switch (status) {
        case "completed":
          return "bg-green-100 text-green-800 border-green-200"
        case "ongoing":
          return "bg-blue-100 text-blue-800 border-blue-200"
        case "planned":
          return "bg-yellow-100 text-yellow-800 border-yellow-200"
        default:
          return "bg-gray-100 text-gray-800 border-gray-200"
      }
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {works.map((work: WorkData) => {
          const firstImage = work.media?.find((m) => m.mimeType?.startsWith("image/"))
          const thumbnailSrc = firstImage
            ? base64ToDataURL(firstImage.data, firstImage.mimeType)
            : "/placeholder.svg?height=200&width=300&text=Community+Work"

          return (
            <Link key={work._id} href={`/work/${work._id}`}>
              <Card className="bg-white shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer group">
                <div className="relative h-48 w-full overflow-hidden">
                  <Image
                    src={thumbnailSrc || "/placeholder.svg"}
                    alt={work.title || "Community work"}
                    fill
                    className="object-cover rounded-t-lg group-hover:scale-105 transition-transform duration-300"
                    unoptimized
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.src = "/placeholder.svg?height=200&width=300&text=Image+Error"
                    }}
                  />
                </div>
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <Badge variant="outline" className="capitalize text-orange-700 border-orange-200">
                      {work.category || "Other"}
                    </Badge>
                    <div className="flex items-center">
                      {getStatusIcon(work.status)}
                      <Badge className={`ml-1 ${getStatusColor(work.status)}`}>{work.status || "completed"}</Badge>
                    </div>
                  </div>
                  <CardTitle className="text-xl text-gray-800 group-hover:text-orange-600 transition-colors line-clamp-2">
                    {work.title || "Untitled Work"}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4 line-clamp-3">{work.description || "No description available"}</p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center">
                      <Calendar className="mr-1 h-4 w-4" />
                      <time dateTime={work.completedDate?.toISOString()}>
                        {new Date(work.completedDate || new Date()).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </time>
                    </div>
                    <div className="flex items-center text-orange-600">
                      <Eye className="mr-1 h-4 w-4" />
                      <span>View Details</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          )
        })}
      </div>
    )
  } catch (error) {
    console.error("❌ Error in WorksPreviewContent:", error)
    return (
      <div className="text-center py-12 bg-white/50 rounded-lg shadow-sm border-2 border-orange-200">
        <h3 className="text-xl font-medium text-orange-700 mb-2">Unable to Load Works</h3>
        <p className="text-gray-600 mb-4">There was an error connecting to the database.</p>
        <p className="text-sm text-gray-500">
          Please try refreshing the page or contact support if the issue persists.
        </p>
      </div>
    )
  }
}

export default function WorksPreview({ limit, showEmptyAction = false }: WorksPreviewProps) {
  return (
    <Suspense fallback={<LoadingState type="grid" count={limit || 3} />}>
      <WorksPreviewContent limit={limit} showEmptyAction={showEmptyAction} />
    </Suspense>
  )
}
