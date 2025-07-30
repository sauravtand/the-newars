"use client"

import { useState, useEffect } from "react"
import { signOut } from "next-auth/react"
import { Plus, Edit, Trash2, LogOut, Eye, Calendar, ImageIcon, FileText, Award, Video } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import PostForm from "@/components/post-form"
import WorkForm from "@/components/work-form"
import { useToast } from "@/hooks/use-toast"

interface Post {
  _id: string
  title: string
  description: string
  media?: Array<{ url: string; type: string; originalName: string }>
  imageUrl?: string
  createdAt: string
  updatedAt: string
}

interface Work {
  _id: string
  title: string
  description: string
  category: string
  media?: Array<{ url: string; type: string; originalName: string }>
  imageUrl?: string
  completedDate: string
  status: "completed" | "ongoing" | "planned"
  createdAt: string
}

export default function AdminDashboard() {
  const [posts, setPosts] = useState<Post[]>([])
  const [works, setWorks] = useState<Work[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showPostForm, setShowPostForm] = useState(false)
  const [showWorkForm, setShowWorkForm] = useState(false)
  const [editingPost, setEditingPost] = useState<Post | null>(null)
  const [editingWork, setEditingWork] = useState<Work | null>(null)
  const [activeTab, setActiveTab] = useState("posts")
  const { toast } = useToast()

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const [postsResponse, worksResponse] = await Promise.all([fetch("/api/posts"), fetch("/api/works")])

      const postsData = await postsResponse.json()
      const worksData = await worksResponse.json()

      setPosts(postsData)
      setWorks(worksData)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch data",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleDeletePost = async (id: string) => {
    if (!confirm("Are you sure you want to delete this post?")) return

    try {
      const response = await fetch(`/api/posts/${id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        setPosts(posts.filter((post) => post._id !== id))
        toast({
          title: "Success",
          description: "Post deleted successfully",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete post",
        variant: "destructive",
      })
    }
  }

  const handleDeleteWork = async (id: string) => {
    if (!confirm("Are you sure you want to delete this work?")) return

    try {
      const response = await fetch(`/api/works/${id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        setWorks(works.filter((work) => work._id !== id))
        toast({
          title: "Success",
          description: "Work deleted successfully",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete work",
        variant: "destructive",
      })
    }
  }

  const handleFormSuccess = () => {
    setShowPostForm(false)
    setShowWorkForm(false)
    setEditingPost(null)
    setEditingWork(null)
    fetchData()
  }

  const truncateText = (text: string, maxLength: number) => {
    return text.length > maxLength ? text.substring(0, maxLength) + "..." : text
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

  const getMediaInfo = (item: Post | Work) => {
    const mediaCount = item.media?.length || 0
    const hasLegacyImage = item.imageUrl && !mediaCount
    const totalMedia = mediaCount + (hasLegacyImage ? 1 : 0)

    if (totalMedia === 0) {
      return (
        <div className="flex items-center">
          <ImageIcon className="h-4 w-4 text-gray-400 mr-1" />
          <span className="text-sm text-gray-400">No media</span>
        </div>
      )
    }

    const videoCount = item.media?.filter((m) => m.type.startsWith("video/")).length || 0
    const imageCount = totalMedia - videoCount

    return (
      <div className="flex items-center space-x-2">
        {imageCount > 0 && (
          <div className="flex items-center">
            <ImageIcon className="h-4 w-4 text-green-600 mr-1" />
            <span className="text-sm text-green-600">{imageCount}</span>
          </div>
        )}
        {videoCount > 0 && (
          <div className="flex items-center">
            <Video className="h-4 w-4 text-blue-600 mr-1" />
            <span className="text-sm text-blue-600">{videoCount}</span>
          </div>
        )}
      </div>
    )
  }

  if (showPostForm || editingPost) {
    return (
      <PostForm
        post={editingPost}
        onSuccess={handleFormSuccess}
        onCancel={() => {
          setShowPostForm(false)
          setEditingPost(null)
        }}
      />
    )
  }

  if (showWorkForm || editingWork) {
    return (
      <WorkForm
        work={editingWork}
        onSuccess={handleFormSuccess}
        onCancel={() => {
          setShowWorkForm(false)
          setEditingWork(null)
        }}
      />
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
            <p className="text-gray-600 mt-1">Manage cultural posts and showcase works</p>
          </div>
          <Button onClick={() => signOut()} variant="outline" className="border-red-200 text-red-600 hover:bg-red-50">
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border-red-200">
            <CardContent className="p-6">
              <div className="flex items-center">
                <FileText className="h-8 w-8 text-red-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Posts</p>
                  <p className="text-2xl font-bold text-gray-900">{posts.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-orange-200">
            <CardContent className="p-6">
              <div className="flex items-center">
                <Award className="h-8 w-8 text-orange-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Works</p>
                  <p className="text-2xl font-bold text-gray-900">{works.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-green-200">
            <CardContent className="p-6">
              <div className="flex items-center">
                <Eye className="h-8 w-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Completed Works</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {works.filter((work) => work.status === "completed").length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-blue-200">
            <CardContent className="p-6">
              <div className="flex items-center">
                <Calendar className="h-8 w-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">This Month</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {posts.filter((post) => new Date(post.createdAt).getMonth() === new Date().getMonth()).length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="posts">Cultural Posts</TabsTrigger>
            <TabsTrigger value="works">Works Done</TabsTrigger>
          </TabsList>

          {/* Posts Tab */}
          <TabsContent value="posts" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold text-gray-800">Cultural Posts Management</h2>
              <Button onClick={() => setShowPostForm(true)} className="bg-red-600 hover:bg-red-700">
                <Plus className="mr-2 h-4 w-4" />
                Add New Post
              </Button>
            </div>

            {isLoading ? (
              <div className="text-center py-12">
                <p className="text-gray-600">Loading posts...</p>
              </div>
            ) : (
              <Card className="border-red-200">
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[50px]">#</TableHead>
                        <TableHead>Post Heading</TableHead>
                        <TableHead>Post Details</TableHead>
                        <TableHead>Media</TableHead>
                        <TableHead>Created Date</TableHead>
                        <TableHead>Updated Date</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {posts.map((post, index) => (
                        <TableRow key={post._id}>
                          <TableCell className="font-medium">{index + 1}</TableCell>
                          <TableCell className="font-medium max-w-[200px]">{truncateText(post.title, 50)}</TableCell>
                          <TableCell className="max-w-[300px]">{truncateText(post.description, 100)}</TableCell>
                          <TableCell>{getMediaInfo(post)}</TableCell>
                          <TableCell>{new Date(post.createdAt).toLocaleDateString()}</TableCell>
                          <TableCell>{new Date(post.updatedAt).toLocaleDateString()}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end space-x-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => setEditingPost(post)}
                                className="border-orange-200 text-orange-600 hover:bg-orange-50"
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleDeletePost(post._id)}
                                className="border-red-200 text-red-600 hover:bg-red-50"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  {posts.length === 0 && (
                    <div className="text-center py-12">
                      <p className="text-gray-600">No posts found. Create your first post!</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Works Tab */}
          <TabsContent value="works" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold text-gray-800">Works Done by The Newars</h2>
              <Button onClick={() => setShowWorkForm(true)} className="bg-orange-600 hover:bg-orange-700">
                <Plus className="mr-2 h-4 w-4" />
                Add New Work
              </Button>
            </div>

            {isLoading ? (
              <div className="text-center py-12">
                <p className="text-gray-600">Loading works...</p>
              </div>
            ) : (
              <Card className="border-orange-200">
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[50px]">#</TableHead>
                        <TableHead>Work Title</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Completed Date</TableHead>
                        <TableHead>Media</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {works.map((work, index) => (
                        <TableRow key={work._id}>
                          <TableCell className="font-medium">{index + 1}</TableCell>
                          <TableCell className="font-medium max-w-[200px]">{truncateText(work.title, 50)}</TableCell>
                          <TableCell className="max-w-[300px]">{truncateText(work.description, 100)}</TableCell>
                          <TableCell>
                            <Badge variant="outline" className="capitalize">
                              {work.category}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge className={getStatusColor(work.status)}>{work.status}</Badge>
                          </TableCell>
                          <TableCell>{new Date(work.completedDate).toLocaleDateString()}</TableCell>
                          <TableCell>{getMediaInfo(work)}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end space-x-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => setEditingWork(work)}
                                className="border-orange-200 text-orange-600 hover:bg-orange-50"
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleDeleteWork(work._id)}
                                className="border-red-200 text-red-600 hover:bg-red-50"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  {works.length === 0 && (
                    <div className="text-center py-12">
                      <p className="text-gray-600">No works found. Add your first work!</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
