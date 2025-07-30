"use client"

import { useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg text-center">
        <h2 className="text-3xl font-bold text-red-600 mb-4">Something went wrong!</h2>
        <p className="text-gray-600 mb-6">We apologize for the inconvenience. An unexpected error has occurred.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button onClick={reset} className="bg-red-600 hover:bg-red-700">
            Try again
          </Button>
          <Button variant="outline" asChild className="border-red-200 text-red-600 hover:bg-red-50 bg-transparent">
            <Link href="/">Go back home</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
