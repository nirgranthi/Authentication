import { connectMongoDB } from "@/lib/mongodb"
import User from "@/models/user"
import { NextResponse, NextRequest } from "next/server"
import { encrypt } from "@/app/scripts/encrypt"
import { sendVerificationEmail } from "@/lib/sendVerificationEmail"
import crypto from "crypto"

export async function POST(req: NextRequest) {
    try {
        const { email, username, password } = await req.json()

        const hashedPassword = await encrypt(password)

        await connectMongoDB()

        // Generate a verification token that expires in 10 minutes
        const verificationToken = crypto.randomUUID()
        const verificationTokenExpiry = new Date(Date.now() + 10 * 60 * 1000)

        await User.create({
            email,
            username,
            password: hashedPassword,
            verificationToken,
            verificationTokenExpiry,
        })
        console.log('user added to DB: ', username)

        // Send the verification email
        const baseUrl = process.env.NEXTAUTH_URL
        const verificationUrl = `${baseUrl}/verify-email?token=${verificationToken}`

        await sendVerificationEmail({ email, verificationUrl, username })

        return NextResponse.json(
            { message: "User Registered. Please check your email to verify your account." },
            { status: 201 }
        )
    } catch (error) {
        console.log("error", error)
        return NextResponse.json({ message: "An error occured while registering the user" }, { status: 500 })
    }
}
