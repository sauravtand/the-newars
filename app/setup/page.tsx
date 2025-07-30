"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { CheckCircle, AlertCircle, Loader2 } from "lucide-react"

export default function SetupPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const [hasAdmin, setHasAdmin] = useState(false)
  const [checkingStatus, setCheckingStatus] = useState(true)
  const [credentials, setCredentials] = useState<{ username: string; password: string } | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    checkAdminStatus()
  }, [])

  const checkAdminStatus = async () => {
    try {
      const response = await fetch("/api/setup")
      const data = await response.json()
      setHasAdmin(data.hasAdmin)
    } catch (error) {
      console.error("Error checking admin status:", error)
    } finally {
      setCheckingStatus(false)
    }
  }

  const createAdmin = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/setup", {
        method: "POST",
      })

      const data = await response.json()

      if (response.ok && data.success) {
        setIsComplete(true)
        setCredentials({
          username: data.username,
          password: data.password,
        })
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

  if (checkingStatus) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center px-4">
        <Card className="max-w-md w-full border-red-200">
          <CardContent className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-red-600" />
            <span className="ml-2 text-gray-600">Checking setup status...</span>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center px-4">
      <Card className="max-w-md w-full border-red-200">
        <CardHeader>
          <CardTitle className="text-center text-red-700">
            {hasAdmin ? "Admin Already Exists" : "Setup Admin User"}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {hasAdmin ? (
            <div className="text-center space-y-4">
              <CheckCircle className="h-16 w-16 text-green-600 mx-auto" />
              <p className="text-gray-600">Admin user is already configured.</p>
              <Button asChild className="w-full bg-red-600 hover:bg-red-700">
                <a href="/admin/login">Go to Admin Login</a>
              </Button>
            </div>
          ) : !isComplete ? (
            <>
              <div className="text-center">
                <AlertCircle className="h-16 w-16 text-orange-600 mx-auto mb-4" />
                <p className="text-gray-600 mb-4">
                  No admin user found. Click the button below to create the default admin user.
                </p>
              </div>
              <Button onClick={createAdmin} disabled={isLoading} className="w-full bg-red-600 hover:bg-red-700">
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating Admin...
                  </>
                ) : (
                  "Create Admin User"
                )}
              </Button>
            </>
          ) : (
            <div className="text-center space-y-4">
              <CheckCircle className="h-16 w-16 text-green-600 mx-auto" />
              <div className="text-green-600 font-semibold">✅ Admin user created successfully!</div>
              {credentials && (
                <div className="bg-gray-100 p-4 rounded-lg">
                  <p className="font-medium mb-2">Default Credentials:</p>
                  <div className="space-y-1">
                    <p>
                      Username: <code className="bg-white px-2 py-1 rounded font-mono">{credentials.username}</code>
                    </p>
                    <p>
                      Password: <code className="bg-white px-2 py-1 rounded font-mono">{credentials.password}</code>
                    </p>
                  </div>
                </div>
              )}
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
