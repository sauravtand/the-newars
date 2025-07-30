"use client"

import type React from "react"
import { useState } from "react"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import MediaUpload from "@/components/media-upload"
import { useToast } from "@/hooks/use-toast"
import type { MediaFile } from "@/lib/utils/media"

interface Post {
  _id: string
  title: string
  description: string
  media?: MediaFile[]
}

interface PostFormProps {
  post?: Post | null
  onSuccess: () => void
  onCancel: () => void
}

export default function PostForm({ post, onSuccess, onCancel }: PostFormProps) {
  const [title, setTitle] = useState(post?.title || "")
  const [description, setDescription] = useState(post?.description || "")
  const [media, setMedia] = useState<MediaFile[]>(post?.media || [])
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!title.trim() || !description.trim()) {
      toast({
        title: "Error",
        description: "Title and description are required",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      const url = post ? `/api/posts/${post._id}` : "/api/posts"
      const method = post ? "PUT" : "POST"

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title.trim(),
          description: description.trim(),
          media,
        }),
      })

      const responseData = await response.json()

      if (response.ok) {
        toast({
          title: "Success",
          description: `Post ${post ? "updated" : "created"} successfully`,
        })
        onSuccess()
      } else {
        throw new Error(responseData.error || "Failed to save post")
      }
    } catch (error) {
      console.error("Error saving post:", error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : `Failed to ${post ? "update" : "create"} post`,
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Button onClick={onCancel} variant="ghost" className="mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Button>

        <Card className="border-red-200">
          <CardHeader>
            <CardTitle className="text-red-700">{post ? "Edit Post" : "Create New Post"}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  className="border-red-200 focus:border-red-500"
                  placeholder="Enter post title..."
                  maxLength={200}
                />
                <p className="text-sm text-gray-500 mt-1">{title.length}/200 characters</p>
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  rows={8}
                  className="border-red-200 focus:border-red-500"
                  placeholder="Write your post content here..."
                  maxLength={2000}
                />
                <p className="text-sm text-gray-500 mt-1">{description.length}/2000 characters</p>
              </div>

              <MediaUpload media={media} onMediaChange={setMedia} maxFiles={5} maxSizeMB={10} />

              <div className="flex space-x-4">
                <Button
                  type="submit"
                  disabled={isLoading || !title.trim() || !description.trim()}
                  className="bg-red-600 hover:bg-red-700"
                >
                  {isLoading ? "Saving..." : post ? "Update Post" : "Create Post"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={onCancel}
                  className="border-red-200 text-red-600 hover:bg-red-50 bg-transparent"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
