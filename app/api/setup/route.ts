import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { connectDB } from "@/lib/mongodb"
import Admin from "@/lib/models/admin"

export async function POST() {
  try {
    console.log("🔧 Setting up admin user...")

    await connectDB()
    console.log("✅ Connected to database")

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ username: "admin" }).lean()
    if (existingAdmin) {
      console.log("⚠️ Admin user already exists")
      return NextResponse.json(
        {
          message: "Admin user already exists",
          success: false,
        },
        { status: 400 },
      )
    }

    // Create admin user
    const username = "admin"
    const password = "admin123"
    const passwordHash = await bcrypt.hash(password, 12)

    const admin = new Admin({
      username,
      passwordHash,
    })

    const savedAdmin = await admin.save()
    console.log("✅ Admin user created:", savedAdmin._id)

    return NextResponse.json({
      message: "Admin user created successfully",
      username,
      password,
      note: "Please change the default password after first login",
      success: true,
    })
  } catch (error) {
    console.error("❌ Setup error:", error)
    return NextResponse.json(
      {
        error: "Failed to create admin user",
        details: error instanceof Error ? error.message : "Unknown error",
        success: false,
      },
      { status: 500 },
    )
  }
}

export async function GET() {
  try {
    await connectDB()
    const adminCount = await Admin.countDocuments()

    return NextResponse.json({
      hasAdmin: adminCount > 0,
      adminCount,
    })
  } catch (error) {
    console.error("❌ Setup check error:", error)
    return NextResponse.json(
      {
        error: "Failed to check admin status",
        hasAdmin: false,
        adminCount: 0,
      },
      { status: 500 },
    )
  }
}
