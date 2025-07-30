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
        if (!credentials?.username || !credentials?.password) {
          return null
        }

        try {
          await connectDB()
          const admin = await Admin.findOne({ username: credentials.username })

          if (!admin) {
            return null
          }

          const isPasswordValid = await bcrypt.compare(credentials.password, admin.passwordHash)

          if (!isPasswordValid) {
            return null
          }

          return {
            id: admin._id.toString(),
            username: admin.username,
          }
        } catch (error) {
          return null
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/admin/login",
  },
}
