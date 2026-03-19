import NextAuth, { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import User from "@/models/user"
import bcrypt from "bcryptjs"

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    return null
                }
                const user = await User.findOne({ email: credentials.email })
                if (user && await bcrypt.compare(credentials.password, user.password)) {
                    return user
                }
                return null
            }
        })
    ]
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }