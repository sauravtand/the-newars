import mongoose from "mongoose"

// Your MongoDB Atlas connection URL - hardcoded for direct deployment
const MONGODB_URI =
  process.env.MONGODB_URI ||
  "mongodb://atlas-sql-68889a08cbbe5522fb1ad66a-fzafj.a.query.mongodb.net/test?ssl=true&authSource=admin"

if (!MONGODB_URI) {
  throw new Error("MongoDB URI is required")
}

interface MongooseCache {
  conn: typeof mongoose | null
  promise: Promise<typeof mongoose> | null
}

declare global {
  var mongooseCache: MongooseCache | undefined
}

let cached = global.mongooseCache

if (!cached) {
  cached = global.mongooseCache = { conn: null, promise: null }
}

export async function connectDB(): Promise<typeof mongoose> {
  if (cached!.conn) {
    return cached!.conn
  }

  if (!cached!.promise) {
    const opts = {
      bufferCommands: false,
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      family: 4,
      retryWrites: true,
      w: "majority" as const,
    }

    cached!.promise = mongoose
      .connect(MONGODB_URI, opts)
      .then((mongoose) => {
        console.log("✅ Connected to MongoDB Atlas successfully")
        return mongoose
      })
      .catch((error) => {
        console.error("❌ MongoDB connection error:", error)
        cached!.promise = null
        throw error
      })
  }

  try {
    cached!.conn = await cached!.promise
  } catch (e) {
    cached!.promise = null
    throw e
  }

  return cached!.conn
}
