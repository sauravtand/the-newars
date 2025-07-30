import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { connectDB } from "@/lib/mongodb"
import Admin from "@/lib/models/admin"

export async function POST() {
  try {
    await connectDB()

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ username: "admin" })
    if (existingAdmin) {
      return NextResponse.json({ message: "Admin user already exists" }, { status: 400 })
    }

    // Create admin user
    const username = "admin"
    const password = "admin123" // Change this to a secure password
    const passwordHash = await bcrypt.hash(password, 12)

    const admin = new Admin({
      username,
      passwordHash,
    })

    await admin.save()

    return NextResponse.json({
      message: "Admin user created successfully",
      username,
      note: "Please change the default password after first login",
    })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create admin user" }, { status: 500 })
  }
}
