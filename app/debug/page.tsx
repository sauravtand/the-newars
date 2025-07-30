import { connectDB } from "@/lib/mongodb"
import Post from "@/lib/models/post"
import Work from "@/lib/models/work"
import Admin from "@/lib/models/admin"

export default async function DebugPage() {
  let connectionStatus = "❌ Not connected"
  let postsCount = 0
  let worksCount = 0
  let adminCount = 0
  let error = null
  let dbName = ""

  try {
    const mongoose = await connectDB()
    connectionStatus = "✅ Connected successfully"
    dbName = mongoose.connection.db?.databaseName || "Unknown"

    postsCount = await Post.countDocuments()
    worksCount = await Work.countDocuments()
    adminCount = await Admin.countDocuments()

    console.log("Debug info:", { postsCount, worksCount, adminCount, dbName })
  } catch (e) {
    error = e instanceof Error ? e.message : "Unknown error"
    console.error("Debug error:", e)
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Database Debug Information</h1>

        <div className="grid gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Connection Status</h2>
            <p className={`text-lg font-mono ${error ? "text-red-600" : "text-green-600"}`}>{connectionStatus}</p>
            <p className="text-gray-600 mt-2">Database: {dbName}</p>
            {error && (
              <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded">
                <p className="text-red-600 font-semibold">Error Details:</p>
                <p className="text-red-600 font-mono text-sm">{error}</p>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">Posts Collection</h2>
              <p className="text-3xl font-bold text-blue-600">{postsCount}</p>
              <p className="text-gray-600">Total posts</p>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">Works Collection</h2>
              <p className="text-3xl font-bold text-orange-600">{worksCount}</p>
              <p className="text-gray-600">Total works</p>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">Admin Users</h2>
              <p className="text-3xl font-bold text-green-600">{adminCount}</p>
              <p className="text-gray-600">Admin accounts</p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Environment Check</h2>
            <div className="space-y-2 font-mono text-sm">
              <p>MONGODB_URI: {process.env.MONGODB_URI ? "✅ Set" : "❌ Not set"}</p>
              <p>NEXTAUTH_SECRET: {process.env.NEXTAUTH_SECRET ? "✅ Set" : "❌ Not set"}</p>
              <p>NEXTAUTH_URL: {process.env.NEXTAUTH_URL || "Not set"}</p>
              <p>NODE_ENV: {process.env.NODE_ENV}</p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
            <div className="space-y-2">
              <a href="/setup" className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                Setup Admin User
              </a>
              <br />
              <a
                href="/admin/login"
                className="inline-block bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                Admin Login
              </a>
              <br />
              <a href="/" className="inline-block bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700">
                Back to Home
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
