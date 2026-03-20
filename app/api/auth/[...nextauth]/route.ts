import NextAuth, { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import User from "@/models/user"
import bcrypt from "bcryptjs"
import { connectMongoDB } from "@/lib/mongodb"

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                username: { label: "Username", type: "username" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                if (!credentials) return null;
                const {email, username, password} = credentials
                try {
                    await connectMongoDB()

                    if (!email && !username) {
                        return null
                    }

                    if (!password) {
                        return null
                    }

                    let user;
                    if (email) {
                        user = await User.findOne({ email: email });
                    } else if (username) {
                        user = await User.findOne({ username: username });
                    }

                    if (user && await bcrypt.compare(password, user.password)) {
                        return user
                    }
                    return null
                } catch (error) {
                    console.log(error)
                }
            }
        })
    ],
    callbacks: {
        async signIn({ user }) {
            // user here is the Mongoose document returned from authorize()
            const dbUser = user as { isVerified?: boolean }

            // Block login if isVerified is explicitly false (new users who haven't verified yet).
            // Legacy users without the field (isVerified === undefined) are allowed through.
            if (dbUser.isVerified === false) {
                return false
            }

            return true
        }
    }
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }