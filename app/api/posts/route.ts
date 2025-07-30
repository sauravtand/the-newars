import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { connectDB } from "@/lib/mongodb"
import Post from "@/lib/models/post"

export async function GET() {
  try {
    await connectDB()

    const posts = await Post.find({})
      .sort({ createdAt: -1 })
      .select("-media.data") // Exclude base64 data for list view to improve performance
      .lean()
      .exec()

    if (!posts) {
      return NextResponse.json([], { status: 200 })
    }

    const formattedPosts = posts.map((post) => ({
      ...post,
      _id: post._id.toString(),
      createdAt: post.createdAt?.toISOString() || new Date().toISOString(),
      updatedAt: post.updatedAt?.toISOString() || new Date().toISOString(),
    }))

    return NextResponse.json(formattedPosts, { status: 200 })
  } catch (error) {
    console.error("❌ Error fetching posts:", error)
    return NextResponse.json(
      {
        error: "Failed to fetch posts",
        message: "Database connection error",
        posts: [],
      },
      { status: 500 },
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: "Unauthorized access" }, { status: 401 })
    }

    const body = await request.json()
    const { title, description, media } = body

    // Validate required fields
    if (!title?.trim()) {
      return NextResponse.json({ error: "Title is required" }, { status: 400 })
    }

    if (!description?.trim()) {
      return NextResponse.json({ error: "Description is required" }, { status: 400 })
    }

    if (title.length > 200) {
      return NextResponse.json({ error: "Title cannot exceed 200 characters" }, { status: 400 })
    }

    if (description.length > 2000) {
      return NextResponse.json({ error: "Description cannot exceed 2000 characters" }, { status: 400 })
    }

    // Validate media if provided
    if (media && Array.isArray(media)) {
      if (media.length > 5) {
        return NextResponse.json({ error: "Cannot upload more than 5 media files" }, { status: 400 })
      }

      for (const mediaItem of media) {
        if (!mediaItem.data || !mediaItem.filename || !mediaItem.mimeType) {
          return NextResponse.json({ error: "Invalid media format" }, { status: 400 })
        }
      }
    }

    await connectDB()

    const post = new Post({
      title: title.trim(),
      description: description.trim(),
      media: media || [],
    })

    const savedPost = await post.save()
    console.log("✅ Post created successfully:", savedPost._id)

    // Return post without base64 data for performance
    const responsePost = await Post.findById(savedPost._id).select("-media.data").lean().exec()

    return NextResponse.json(
      {
        ...responsePost,
        _id: responsePost?._id.toString(),
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("❌ Error creating post:", error)

    if (error instanceof Error && error.message.includes("validation")) {
      return NextResponse.json({ error: "Validation error", details: error.message }, { status: 400 })
    }

    return NextResponse.json({ error: "Failed to create post" }, { status: 500 })
  }
}
