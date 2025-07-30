import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { connectDB } from "@/lib/mongodb"
import Work from "@/lib/models/work"

export async function GET() {
  try {
    await connectDB()
    const works = await Work.find()
      .sort({ createdAt: -1 })
      .select("-media.data") // Exclude base64 data for list view
      .lean()

    return NextResponse.json(works)
  } catch (error) {
    console.error("Error fetching works:", error)
    return NextResponse.json({ error: "Failed to fetch works" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { title, description, category, status, completedDate, media } = body

    if (!title?.trim() || !description?.trim() || !category || !completedDate) {
      return NextResponse.json({ error: "All required fields must be provided" }, { status: 400 })
    }

    // Validate media if provided
    if (media && Array.isArray(media)) {
      for (const mediaItem of media) {
        if (!mediaItem.data || !mediaItem.filename || !mediaItem.mimeType) {
          return NextResponse.json({ error: "Invalid media format" }, { status: 400 })
        }
      }
    }

    await connectDB()

    const work = new Work({
      title: title.trim(),
      description: description.trim(),
      category,
      status: status || "completed",
      completedDate: new Date(completedDate),
      media: media || [],
    })

    const savedWork = await work.save()
    console.log("✅ Work saved successfully:", savedWork._id)

    // Return work without base64 data
    const responseWork = await Work.findById(savedWork._id).select("-media.data").lean()

    return NextResponse.json(responseWork, { status: 201 })
  } catch (error) {
    console.error("❌ Error creating work:", error)
    return NextResponse.json({ error: "Failed to create work" }, { status: 500 })
  }
}
