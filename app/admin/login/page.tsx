import LoginForm from "@/components/login-form"

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Admin Login</h1>
          <p className="text-gray-600">Sign in to manage The Newars content</p>
        </div>
        <LoginForm />
      </div>
    </div>
  )
}
