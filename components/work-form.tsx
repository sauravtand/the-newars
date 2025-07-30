"use client"

import type React from "react"
import { useState } from "react"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import MediaUpload from "@/components/media-upload"
import { useToast } from "@/hooks/use-toast"
import type { MediaFile } from "@/lib/utils/media"

interface Work {
  _id: string
  title: string
  description: string
  category: string
  media?: MediaFile[]
  completedDate: string
  status: "completed" | "ongoing" | "planned"
}

interface WorkFormProps {
  work?: Work | null
  onSuccess: () => void
  onCancel: () => void
}

export default function WorkForm({ work, onSuccess, onCancel }: WorkFormProps) {
  const [title, setTitle] = useState(work?.title || "")
  const [description, setDescription] = useState(work?.description || "")
  const [category, setCategory] = useState(work?.category || "")
  const [status, setStatus] = useState(work?.status || "completed")
  const [completedDate, setCompletedDate] = useState(
    work?.completedDate ? new Date(work.completedDate).toISOString().split("T")[0] : "",
  )
  const [media, setMedia] = useState<MediaFile[]>(work?.media || [])
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const categories = [
    "Cultural Events",
    "Community Service",
    "Educational Programs",
    "Heritage Preservation",
    "Festival Organization",
    "Youth Programs",
    "Social Initiatives",
    "Documentation",
    "Other",
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!title.trim() || !description.trim() || !category || !completedDate) {
      toast({
        title: "Error",
        description: "All fields are required",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      const url = work ? `/api/works/${work._id}` : "/api/works"
      const method = work ? "PUT" : "POST"

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title.trim(),
          description: description.trim(),
          category,
          status,
          completedDate,
          media,
        }),
      })

      const responseData = await response.json()

      if (response.ok) {
        toast({
          title: "Success",
          description: `Work ${work ? "updated" : "created"} successfully`,
        })
        onSuccess()
      } else {
        throw new Error(responseData.error || "Failed to save work")
      }
    } catch (error) {
      console.error("Error saving work:", error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : `Failed to ${work ? "update" : "create"} work`,
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

        <Card className="border-orange-200">
          <CardHeader>
            <CardTitle className="text-orange-700">{work ? "Edit Work" : "Add New Work"}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="title">Work Title</Label>
                  <Input
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    className="border-orange-200 focus:border-orange-500"
                    placeholder="e.g., Indra Jatra Festival Organization"
                    maxLength={200}
                  />
                  <p className="text-sm text-gray-500 mt-1">{title.length}/200 characters</p>
                </div>

                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger className="border-orange-200 focus:border-orange-500">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat} value={cat}>
                          {cat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  rows={6}
                  className="border-orange-200 focus:border-orange-500"
                  placeholder="Describe the work done, its impact, and significance..."
                  maxLength={2000}
                />
                <p className="text-sm text-gray-500 mt-1">{description.length}/2000 characters</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="status">Status</Label>
                  <Select
                    value={status}
                    onValueChange={(value: "completed" | "ongoing" | "planned") => setStatus(value)}
                  >
                    <SelectTrigger className="border-orange-200 focus:border-orange-500">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="ongoing">Ongoing</SelectItem>
                      <SelectItem value="planned">Planned</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="completedDate">Completed Date</Label>
                  <Input
                    id="completedDate"
                    type="date"
                    value={completedDate}
                    onChange={(e) => setCompletedDate(e.target.value)}
                    required
                    className="border-orange-200 focus:border-orange-500"
                  />
                </div>
              </div>

              <MediaUpload media={media} onMediaChange={setMedia} maxFiles={5} maxSizeMB={10} />

              <div className="flex space-x-4">
                <Button
                  type="submit"
                  disabled={isLoading || !title.trim() || !description.trim() || !category || !completedDate}
                  className="bg-orange-600 hover:bg-orange-700"
                >
                  {isLoading ? "Saving..." : work ? "Update Work" : "Add Work"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={onCancel}
                  className="border-orange-200 text-orange-600 hover:bg-orange-50 bg-transparent"
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
