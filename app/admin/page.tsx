import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import AdminDashboard from "@/components/admin-dashboard"

export default async function AdminPage() {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      redirect("/admin/login")
    }

    return <AdminDashboard />
  } catch (error) {
    console.error("❌ Admin page error:", error)
    redirect("/admin/login")
  }
}
