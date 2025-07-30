const fs = require("fs")
const path = require("path")

// Check if .env.local exists, if not create it with defaults
const envPath = path.join(process.cwd(), ".env.local")
const envExamplePath = path.join(process.cwd(), ".env.example")

if (!fs.existsSync(envPath) && fs.existsSync(envExamplePath)) {
  console.log("📄 Creating .env.local file from .env.example")
  fs.copyFileSync(envExamplePath, envPath)
  console.log("✅ Created .env.local file")
}

// Check for required environment variables
const requiredEnvVars = ["MONGODB_URI", "NEXTAUTH_SECRET", "NEXTAUTH_URL"]

// In production, these should be set in Vercel
if (process.env.NODE_ENV !== "production") {
  try {
    const envContent = fs.readFileSync(envPath, "utf8")
    const missingVars = []

    requiredEnvVars.forEach((envVar) => {
      if (!envContent.includes(`${envVar}=`)) {
        missingVars.push(envVar)
      }
    })

    if (missingVars.length > 0) {
      console.warn(`⚠️  Missing environment variables: ${missingVars.join(", ")}`)
      console.warn("Please add them to your .env.local file")
    } else {
      console.log("✅ All required environment variables are set")
    }
  } catch (error) {
    console.error("❌ Error checking environment variables:", error.message)
  }
}

console.log("🚀 Setup complete!")
