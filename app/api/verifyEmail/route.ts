import { connectMongoDB } from "@/lib/mongodb"
import User from "@/models/user"
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url)
        const token = searchParams.get("token")

        if (!token) {
            return NextResponse.json({ message: "Missing verification token." }, { status: 400 })
        }

        await connectMongoDB()

        // Find user with a matching, non-expired token
        const user = await User.findOne({
            verificationToken: token,
            verificationTokenExpiry: { $gt: new Date() },
        })

        if (!user) {
            return NextResponse.json(
                { message: "Invalid or expired verification token." },
                { status: 400 }
            )
        }

        // Mark user as verified and clear the token fields
        user.isVerified = true
        user.verificationToken = undefined
        user.verificationTokenExpiry = undefined
        await user.save()

        // Redirect to login with a verified flag
        const baseUrl = process.env.NEXTAUTH_URL?.replace(/\/login$/, "") ?? "http://localhost:3000"
        return NextResponse.redirect(`${baseUrl}/login?verified=true`)
    } catch (error) {
        console.log("verifyEmail error", error)
        return NextResponse.json({ message: "An error occurred during verification." }, { status: 500 })
    }
}
