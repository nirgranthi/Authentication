import { connectMongoDB } from "@/lib/mongodb"
import User from "@/models/user"
import { NextRequest, NextResponse } from "next/server"
import crypto from "crypto"
import { sendForgotPasswordEmail } from "@/lib/sendForgotPasswordEmail"

export async function POST(req: NextRequest) {
    try {
        const { email } = await req.json()
        
        if (!email) {
            return NextResponse.json({ message: "Email is required" }, { status: 400 })
        }

        const normalizedEmail = email.toLowerCase()

        await connectMongoDB()

        // Find user by email
        const user = await User.findOne({ email: normalizedEmail })
        
        if (!user) {
            // We return a success response even if the user is not found to prevent email enumeration attacks
            return NextResponse.json(
                { message: "If an account with that email exists, we sent you a password reset link." },
                { status: 200 }
            )
        }

        // Generate a reset token that expires in 10 minutes
        const forgotPasswordToken = crypto.randomUUID()
        const forgotPasswordTokenExpiry = new Date(Date.now() + 10 * 60 * 1000)

        user.forgotPasswordToken = forgotPasswordToken
        user.forgotPasswordTokenExpiry = forgotPasswordTokenExpiry
        await user.save()

        // Send the forgot password email
        const baseUrl = process.env.NEXTAUTH_URL ?? "http://localhost:3000"
        const resetUrl = `${baseUrl}/reset-password?token=${forgotPasswordToken}`

        await sendForgotPasswordEmail({ 
            email: normalizedEmail, 
            resetUrl, 
            username: user.username || "User" 
        })

        return NextResponse.json(
            { message: "If an account with that email exists, we sent you a password reset link." },
            { status: 200 }
        )
    } catch (error) {
        console.log("forgotPassword error:", error)
        return NextResponse.json({ message: "An error occurred while processing your request." }, { status: 500 })
    }
}
