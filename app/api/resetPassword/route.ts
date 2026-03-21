import { connectMongoDB } from "@/lib/mongodb"
import User from "@/models/user"
import { NextRequest, NextResponse } from "next/server"
import { encrypt } from "@/app/scripts/encrypt"
import { validatePassword } from "@/lib/validation"

export async function POST(req: NextRequest) {
    try {
        const { token, newPassword } = await req.json()

        if (!token || !newPassword) {
            return NextResponse.json({ message: "Token and new password are required." }, { status: 400 })
        }

        // Server-side validation for the new password
        const passwordValidation = validatePassword(newPassword)
        if (!passwordValidation.valid) {
            return NextResponse.json({ message: passwordValidation.error }, { status: 400 })
        }

        await connectMongoDB()

        // Find user with a matching, non-expired forgot password token
        const user = await User.findOne({
            forgotPasswordToken: token,
            forgotPasswordTokenExpiry: { $gt: new Date() },
        })

        if (!user) {
            return NextResponse.json(
                { message: "Invalid or expired password reset token." },
                { status: 400 }
            )
        }

        // Hash the new password
        const hashedPassword = await encrypt(newPassword)

        // Update the user's password, clear the token fields, and verify email
        user.password = hashedPassword
        user.forgotPasswordToken = undefined
        user.forgotPasswordTokenExpiry = undefined
        user.isVerified = true // Since they clicked an email link, they own the email.
        await user.save()

        return NextResponse.json(
            { message: "Your password has been successfully reset." },
            { status: 200 }
        )
    } catch (error) {
        console.log("resetPassword error:", error)
        return NextResponse.json({ message: "An error occurred while resetting the password." }, { status: 500 })
    }
}
