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
    ]
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }