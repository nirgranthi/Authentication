import { connectMongoDB } from "@/lib/mongodb"
import User from "@/models/user"
import crypto from "crypto"
import { sendVerificationEmail } from "./sendVerificationEmail"

/**
 * Triggers the entire verification email process:
 * 1. Generates a new token
 * 2. Saves it to DB
 * 3. Sends the email
 */
export async function triggerVerificationEmail(email: string, username: string) {
    if (!email) throw new Error("Email is required to send verification.");

    await connectMongoDB()

    const verificationToken = crypto.randomUUID()
    // Token valid for 10 minutes
    const verificationTokenExpiry = new Date(Date.now() + 10 * 60 * 1000)

    const normalizedEmail = email.toLowerCase()

    await User.findOneAndUpdate(
        { email: normalizedEmail },
        { verificationToken, verificationTokenExpiry }
    )

    const baseUrl = process.env.NEXTAUTH_URL || "http://localhost:3000"
    const verificationUrl = `${baseUrl}/verify-email?token=${verificationToken}`

    await sendVerificationEmail({ email: normalizedEmail, verificationUrl, username })
}
