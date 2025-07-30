import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { connectDB } from "@/lib/mongodb"
import Post from "@/lib/models/post"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDB()
    const post = await Post.findById(params.id).lean()

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 })
    }

    return NextResponse.json(post)
  } catch (error) {
    console.error("Error fetching post:", error)
    return NextResponse.json({ error: "Failed to fetch post" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { title, description, media } = await request.json()

    if (!title?.trim() || !description?.trim()) {
      return NextResponse.json({ error: "Title and description are required" }, { status: 400 })
    }

    await connectDB()

    const post = await Post.findByIdAndUpdate(
      params.id,
      {
        title: title.trim(),
        description: description.trim(),
        media: media || [],
        updatedAt: new Date(),
      },
      { new: true },
    )
      .select("-media.data")
      .lean()

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 })
    }

    return NextResponse.json(post)
  } catch (error) {
    console.error("Error updating post:", error)
    return NextResponse.json({ error: "Failed to update post" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    await connectDB()
    const post = await Post.findByIdAndDelete(params.id)

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 })
    }

    return NextResponse.json({ message: "Post deleted successfully" })
  } catch (error) {
    console.error("Error deleting post:", error)
    return NextResponse.json({ error: "Failed to delete post" }, { status: 500 })
  }
}
