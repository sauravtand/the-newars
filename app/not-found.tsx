import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">404</h2>
        <h3 className="text-2xl font-semibold text-red-600 mb-4">Page Not Found</h3>
        <p className="text-gray-600 mb-6">The page you are looking for doesn't exist or has been moved.</p>
        <Button asChild className="bg-red-600 hover:bg-red-700">
          <Link href="/">Return Home</Link>
        </Button>
      </div>
    </div>
  )
}
