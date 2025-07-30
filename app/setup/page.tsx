"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"

export default function SetupPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const { toast } = useToast()

  const createAdmin = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/setup", {
        method: "POST",
      })

      const data = await response.json()

      if (response.ok) {
        setIsComplete(true)
        toast({
          title: "Success",
          description: "Admin user created successfully",
        })
      } else {
        toast({
          title: "Error",
          description: data.message || "Failed to create admin user",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center px-4">
      <Card className="max-w-md w-full border-red-200">
        <CardHeader>
          <CardTitle className="text-center text-red-700">Setup Admin User</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {!isComplete ? (
            <>
              <p className="text-gray-600 text-center">
                Click the button below to create the default admin user for The Newars platform.
              </p>
              <Button onClick={createAdmin} disabled={isLoading} className="w-full bg-red-600 hover:bg-red-700">
                {isLoading ? "Creating Admin..." : "Create Admin User"}
              </Button>
            </>
          ) : (
            <div className="text-center space-y-4">
              <div className="text-green-600 font-semibold">✅ Admin user created successfully!</div>
              <div className="bg-gray-100 p-4 rounded-lg">
                <p className="font-medium">Default Credentials:</p>
                <p>
                  Username: <code className="bg-white px-2 py-1 rounded">admin</code>
                </p>
                <p>
                  Password: <code className="bg-white px-2 py-1 rounded">admin123</code>
                </p>
              </div>
              <p className="text-sm text-orange-600">⚠️ Please change the default password after first login!</p>
              <Button asChild className="w-full bg-red-600 hover:bg-red-700">
                <a href="/admin/login">Go to Admin Login</a>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
