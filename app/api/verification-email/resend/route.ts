import { NextRequest, NextResponse } from 'next/server'
import { connectMongoDB } from '@/lib/mongodb'
import User from '@/models/user'
import { triggerVerificationEmail } from '@/features/verification-email/triggerVerificationEmail'

export async function POST(req: NextRequest) {
    try {
        const { email, username } = await req.json()
        if (!email && !username) {
            return NextResponse.json({ message: "Email or username is required" }, { status: 400 })
        }

        await connectMongoDB()

        let user
        if (email) {
            user = await User.findOne({ email: email.toLowerCase() })
        } else {
            user = await User.findOne({ username: username.toLowerCase() })
        }

        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 })
        }

        if (user.isVerified) {
            return NextResponse.json({ message: "User is already verified" }, { status: 400 })
        }

        // Trigger the modular feature
        await triggerVerificationEmail(user.email, user.username)

        return NextResponse.json({ message: "Verification email sent successfully" }, { status: 200 })
    } catch (error: any) {
        console.error("Resend verification email error:", error)
        return NextResponse.json({ message: "Failed to resend verification email" }, { status: 500 })
    }
}
