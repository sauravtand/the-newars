import { connectDB } from "./mongodb"
import Post, { type IPost } from "./models/post"
import Work, { type IWork } from "./models/work"

export interface PostData {
  _id: string
  title: string
  description: string
  media: Array<{
    data: string
    filename: string
    originalName: string
    mimeType: string
    size: number
    uploadedAt: Date
  }>
  createdAt: Date
  updatedAt: Date
}

export interface WorkData {
  _id: string
  title: string
  description: string
  category: string
  status: "completed" | "ongoing" | "planned"
  completedDate: Date
  media: Array<{
    data: string
    filename: string
    originalName: string
    mimeType: string
    size: number
    uploadedAt: Date
  }>
  createdAt: Date
  updatedAt: Date
}

export async function getPosts(): Promise<PostData[]> {
  try {
    await connectDB()

    const posts = await Post.find({}).sort({ createdAt: -1 }).lean<IPost[]>().exec()

    if (!posts || posts.length === 0) {
      console.log("📝 No posts found in database")
      return []
    }

    return posts.map((post) => ({
      _id: post._id.toString(),
      title: post.title || "",
      description: post.description || "",
      media: post.media || [],
      createdAt: post.createdAt || new Date(),
      updatedAt: post.updatedAt || new Date(),
    }))
  } catch (error) {
    console.error("❌ Failed to fetch posts:", error)
    return []
  }
}

export async function getPost(id: string): Promise<PostData | null> {
  try {
    if (!id || !id.match(/^[0-9a-fA-F]{24}$/)) {
      console.error("❌ Invalid post ID format:", id)
      return null
    }

    await connectDB()

    const post = await Post.findById(id).lean<IPost>().exec()

    if (!post) {
      console.log("📝 Post not found:", id)
      return null
    }

    return {
      _id: post._id.toString(),
      title: post.title || "",
      description: post.description || "",
      media: post.media || [],
      createdAt: post.createdAt || new Date(),
      updatedAt: post.updatedAt || new Date(),
    }
  } catch (error) {
    console.error("❌ Failed to fetch post:", error)
    return null
  }
}

export async function getWorks(): Promise<WorkData[]> {
  try {
    await connectDB()

    const works = await Work.find({}).sort({ createdAt: -1 }).lean<IWork[]>().exec()

    if (!works || works.length === 0) {
      console.log("🏆 No works found in database")
      return []
    }

    return works.map((work) => ({
      _id: work._id.toString(),
      title: work.title || "",
      description: work.description || "",
      category: work.category || "Other",
      status: work.status || "completed",
      completedDate: work.completedDate || new Date(),
      media: work.media || [],
      createdAt: work.createdAt || new Date(),
      updatedAt: work.updatedAt || new Date(),
    }))
  } catch (error) {
    console.error("❌ Failed to fetch works:", error)
    return []
  }
}

export async function getWork(id: string): Promise<WorkData | null> {
  try {
    if (!id || !id.match(/^[0-9a-fA-F]{24}$/)) {
      console.error("❌ Invalid work ID format:", id)
      return null
    }

    await connectDB()

    const work = await Work.findById(id).lean<IWork>().exec()

    if (!work) {
      console.log("🏆 Work not found:", id)
      return null
    }

    return {
      _id: work._id.toString(),
      title: work.title || "",
      description: work.description || "",
      category: work.category || "Other",
      status: work.status || "completed",
      completedDate: work.completedDate || new Date(),
      media: work.media || [],
      createdAt: work.createdAt || new Date(),
      updatedAt: work.updatedAt || new Date(),
    }
  } catch (error) {
    console.error("❌ Failed to fetch work:", error)
    return null
  }
}
