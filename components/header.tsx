"use client"

import Link from "next/link"
import { Menu, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useSession } from "next-auth/react"

export default function Header() {
  const { data: session } = useSession()

  return (
    <header className="bg-white shadow-sm border-b border-red-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-red-600 to-orange-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">न</span>
            </div>
            <span className="text-xl font-bold text-gray-800">The Newars</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-red-600 transition-colors">
              Home
            </Link>
            <Link href="/posts" className="text-gray-700 hover:text-red-600 transition-colors">
              Posts
            </Link>
            <Link href="/works" className="text-gray-700 hover:text-red-600 transition-colors">
              Our Works
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-red-600 transition-colors">
              Contact
            </Link>
            {session ? (
              <Link href="/admin" className="flex items-center text-green-700 hover:text-green-600 transition-colors">
                <Shield className="h-4 w-4 mr-1" />
                Admin Panel
              </Link>
            ) : (
              <Link
                href="/admin/login"
                className="flex items-center text-gray-700 hover:text-red-600 transition-colors"
              >
                <Shield className="h-4 w-4 mr-1" />
                Admin
              </Link>
            )}
          </nav>

          {/* Mobile Navigation */}
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <nav className="flex flex-col space-y-4 mt-8">
                <Link href="/" className="text-gray-700 hover:text-red-600 transition-colors">
                  Home
                </Link>
                <Link href="/posts" className="text-gray-700 hover:text-red-600 transition-colors">
                  Posts
                </Link>
                <Link href="/works" className="text-gray-700 hover:text-red-600 transition-colors">
                  Our Works
                </Link>
                <Link href="/contact" className="text-gray-700 hover:text-red-600 transition-colors">
                  Contact
                </Link>
                {session ? (
                  <Link
                    href="/admin"
                    className="flex items-center text-green-700 hover:text-green-600 transition-colors"
                  >
                    <Shield className="h-4 w-4 mr-1" />
                    Admin Panel
                  </Link>
                ) : (
                  <Link
                    href="/admin/login"
                    className="flex items-center text-gray-700 hover:text-red-600 transition-colors"
                  >
                    <Shield className="h-4 w-4 mr-1" />
                    Admin Login
                  </Link>
                )}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
