import type { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"
import { connectDB } from "./mongodb"
import Admin from "./models/admin"

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          if (!credentials?.username || !credentials?.password) {
            console.log("❌ Missing credentials")
            return null
          }

          await connectDB()
          console.log("✅ Connected to DB for auth")

          const admin = await Admin.findOne({ username: credentials.username }).lean()
          console.log("🔍 Admin search result:", admin ? "Found" : "Not found")

          if (!admin) {
            console.log("❌ Admin not found")
            return null
          }

          const isPasswordValid = await bcrypt.compare(credentials.password, admin.passwordHash)
          console.log("🔐 Password valid:", isPasswordValid)

          if (!isPasswordValid) {
            console.log("❌ Invalid password")
            return null
          }

          console.log("✅ Authentication successful")
          return {
            id: admin._id.toString(),
            username: admin.username,
          }
        } catch (error) {
          console.error("❌ Auth error:", error)
          return null
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // 24 hours
  },
  jwt: {
    maxAge: 24 * 60 * 60, // 24 hours
  },
  pages: {
    signIn: "/admin/login",
    error: "/admin/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.username = user.username
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user = {
          id: token.sub || "",
          username: token.username as string,
        }
      }
      return session
    },
  },
  debug: process.env.NODE_ENV === "development",
}
