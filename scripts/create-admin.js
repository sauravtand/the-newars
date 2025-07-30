const bcrypt = require("bcryptjs")
const mongoose = require("mongoose")

// Admin schema
const AdminSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  passwordHash: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

const Admin = mongoose.models.Admin || mongoose.model("Admin", AdminSchema)

async function createAdmin() {
  try {
    // Connect to MongoDB
    const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/newars"
    await mongoose.connect(MONGODB_URI)
    console.log("Connected to MongoDB")

    // Create admin user
    const username = "admin"
    const password = "admin123" // Change this to a secure password
    const passwordHash = await bcrypt.hash(password, 12)

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ username })
    if (existingAdmin) {
      console.log("Admin user already exists!")
      console.log(`Username: ${username}`)
      return
    }

    const admin = new Admin({
      username,
      passwordHash,
    })

    await admin.save()
    console.log("✅ Admin user created successfully!")
    console.log(`Username: ${username}`)
    console.log(`Password: ${password}`)
    console.log("⚠️  Please change the default password after first login!")
  } catch (error) {
    console.error("❌ Error creating admin:", error.message)
  } finally {
    await mongoose.disconnect()
    console.log("Disconnected from MongoDB")
  }
}

createAdmin()
