import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { connectDB } from "@/lib/mongodb"
import Work from "@/lib/models/work"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDB()
    const work = await Work.findById(params.id).lean()

    if (!work) {
      return NextResponse.json({ error: "Work not found" }, { status: 404 })
    }

    return NextResponse.json(work)
  } catch (error) {
    console.error("Error fetching work:", error)
    return NextResponse.json({ error: "Failed to fetch work" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { title, description, category, status, completedDate, media } = await request.json()

    if (!title?.trim() || !description?.trim() || !category || !completedDate) {
      return NextResponse.json({ error: "All required fields must be provided" }, { status: 400 })
    }

    await connectDB()

    const work = await Work.findByIdAndUpdate(
      params.id,
      {
        title: title.trim(),
        description: description.trim(),
        category,
        status,
        completedDate: new Date(completedDate),
        media: media || [],
        updatedAt: new Date(),
      },
      { new: true },
    )
      .select("-media.data")
      .lean()

    if (!work) {
      return NextResponse.json({ error: "Work not found" }, { status: 404 })
    }

    return NextResponse.json(work)
  } catch (error) {
    console.error("Error updating work:", error)
    return NextResponse.json({ error: "Failed to update work" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    await connectDB()
    const work = await Work.findByIdAndDelete(params.id)

    if (!work) {
      return NextResponse.json({ error: "Work not found" }, { status: 404 })
    }

    return NextResponse.json({ message: "Work deleted successfully" })
  } catch (error) {
    console.error("Error deleting work:", error)
    return NextResponse.json({ error: "Failed to delete work" }, { status: 500 })
  }
}
