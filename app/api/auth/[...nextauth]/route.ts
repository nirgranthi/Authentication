import NextAuth, { NextAuthOptions, Session } from "next-auth"
import { JWT } from "next-auth/jwt"
import CredentialsProvider from "next-auth/providers/credentials"
import User from "@/models/user"
import bcrypt from "bcryptjs"
import { connectMongoDB } from "@/lib/mongodb"
import { validateEmail, validateUsername } from "@/lib/validation"

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

                // Validate the identifier before connecting to DB
                const isValidEmail = validateEmail(email).valid;
                const isValidUsername = validateUsername(username).valid;
                if (!isValidEmail && !isValidUsername) return null;

                if (!password) return null;

                try {
                    await connectMongoDB()

                    let user;
                    if (email) {
                        user = await User.findOne({ email: email.toLowerCase() });
                    } else if (username) {
                        user = await User.findOne({ username: username.toLowerCase() });
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

            // Block login if isVerified is explicitly false
            if (dbUser.isVerified === false) {
                return false
            }

            return true
        },
        async jwt({ token, user }) {
            if (user) {
                const dbUser = user as { username?: string; email?: string; name?: string; dob?: Date; isVerified?: boolean; createdAt?: Date }
                token.username = dbUser.username
                token.email = dbUser.email
                token.name = dbUser.name
                token.dob = dbUser.dob
                token.isVerified = dbUser.isVerified
                token.createdAt = dbUser.createdAt
            }
            return token
        },
        async session({ session, token }: { session: Session; token: JWT }) {
            if (session.user) {
                (session.user as Record<string, unknown>).username = token.username
                ;(session.user as Record<string, unknown>).isVerified = token.isVerified
                ;(session.user as Record<string, unknown>).createdAt = token.createdAt
            }
            return session
        }
    },
    session: { strategy: "jwt" }
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
