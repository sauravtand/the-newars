"use client"

import { useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function AdminError({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        console.error("Admin error:", error)
    }, [error])

    return (
        <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center p-4">
            <Card className="max-w-md w-full border-red-200">
                <CardHeader>
                    <CardTitle className="text-center text-red-700">Admin Access Error</CardTitle>
                </CardHeader>
                <CardContent className="text-center space-y-4">
                    <p className="text-gray-600">There was an issue accessing the admin panel.</p>
                    <p className="text-sm text-gray-500">This might be due to authentication or database connectivity.</p>
                    <div className="flex flex-col gap-3">
                        <Button onClick={reset} className="bg-red-600 hover:bg-red-700">
                            Try Again
                        </Button>
                        <Button variant="outline" asChild className="border-red-200 text-red-600 hover:bg-red-50 bg-transparent">
                            <Link href="/admin/login">Go to Login</Link>
                        </Button>
                        <Button variant="outline" asChild className="border-gray-200 bg-transparent">
                            <Link href="/">Back to Home</Link>
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
