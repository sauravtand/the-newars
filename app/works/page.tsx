import { Suspense } from "react"
import Image from "next/image"
import Link from "next/link"
import { Calendar, Award, Clock, CheckCircle, Eye } from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { getWorks } from "@/lib/actions"

export default function WorksPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50">
      <Header />

      {/* Hero Section */}
      <section className="relative py-20 px-4 text-center bg-gradient-to-r from-orange-600 to-red-600 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-shadow">Our Works</h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90">Achievements & Contributions</p>
          <p className="text-lg opacity-80 max-w-2xl mx-auto">
            Discover the impactful works and initiatives undertaken by The Newars community to preserve and promote our
            rich cultural heritage.
          </p>
        </div>
      </section>

      {/* Works Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <Suspense fallback={<WorksGridSkeleton />}>
            <AllWorksGrid />
          </Suspense>
        </div>
      </section>

      <Footer />
    </div>
  )
}

async function AllWorksGrid() {
  const works = await getWorks()

  if (works.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 text-lg">No works available yet.</p>
        <p className="text-gray-500 mt-2">Check back soon for our achievements!</p>
      </div>
    )
  }

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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {works.map((work) => (
        <Link key={work._id} href={`/work/${work._id}`}>
          <Card className="bg-white shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer group">
            {/* Display first media item or fallback to imageUrl */}
            {((work.media && work.media.length > 0) || work.imageUrl) && (
              <div className="relative h-48 w-full overflow-hidden">
                <Image
                  src={(work.media && work.media.length > 0 ? work.media[0].url : work.imageUrl) || "/placeholder.svg"}
                  alt={work.title}
                  fill
                  className="object-cover rounded-t-lg group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            )}
            <CardHeader>
              <div className="flex justify-between items-start mb-2">
                <Badge variant="outline" className="capitalize text-orange-700 border-orange-200">
                  {work.category}
                </Badge>
                <div className="flex items-center">
                  {getStatusIcon(work.status)}
                  <Badge className={`ml-1 ${getStatusColor(work.status)}`}>{work.status}</Badge>
                </div>
              </div>
              <CardTitle className="text-xl text-gray-800 group-hover:text-orange-600 transition-colors line-clamp-2">
                {work.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4 line-clamp-3">{work.description}</p>
              <div className="flex items-center justify-between text-sm text-gray-500">
                <div className="flex items-center">
                  <Calendar className="mr-1 h-4 w-4" />
                  <time dateTime={work.completedDate.toISOString()}>
                    {work.completedDate.toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
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
      ))}
    </div>
  )
}

function WorksGridSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden">
          <Skeleton className="h-48 w-full" />
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <Skeleton className="h-6 w-20" />
              <Skeleton className="h-6 w-16" />
            </div>
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
