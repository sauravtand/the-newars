import { connectDB } from "@/lib/mongodb"
import Post from "@/lib/models/post"
import Work from "@/lib/models/work"

export default async function DebugPage() {
  let connectionStatus = "Not connected"
  let postsCount = 0
  let worksCount = 0
  let error = null

  try {
    await connectDB()
    connectionStatus = "Connected successfully"

    postsCount = await Post.countDocuments()
    worksCount = await Work.countDocuments()
  } catch (e) {
    error = e.message
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Database Debug Information</h1>

        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Connection Status</h2>
          <p className={`text-lg ${error ? "text-red-600" : "text-green-600"}`}>{connectionStatus}</p>
          {error && <p className="text-red-600 mt-2">Error: {error}</p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Posts Collection</h2>
            <p className="text-2xl font-bold text-blue-600">{postsCount} posts</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Works Collection</h2>
            <p className="text-2xl font-bold text-orange-600">{worksCount} works</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 mt-6">
          <h2 className="text-xl font-semibold mb-4">Environment Variables</h2>
          <p>MONGODB_URI: {process.env.MONGODB_URI ? "Set" : "Not set"}</p>
          <p>NEXTAUTH_SECRET: {process.env.NEXTAUTH_SECRET ? "Set" : "Not set"}</p>
        </div>
      </div>
    </div>
  )
}
