import { connectMongoDB } from "@/lib/mongodb"
import User from "@/models/user"
import { NextResponse, NextRequest } from "next/server"
import { encrypt } from "@/app/scripts/encrypt"
import { triggerVerificationEmail } from "@/features/verification-email/triggerVerificationEmail"
import { validateUsername, validatePassword } from "@/lib/validation"
import { isEmailExists, isUsernameExists } from "@/lib/userChecks"

export async function POST(req: NextRequest) {
    try {
        const { email, username, password } = await req.json()

        // --- Server-side validation ---
        const usernameValidation = validateUsername(username)
        if (!usernameValidation.valid) {
            return NextResponse.json({ message: usernameValidation.error }, { status: 400 })
        }

        const passwordValidation = validatePassword(password)
        if (!passwordValidation.valid) {
            return NextResponse.json({ message: passwordValidation.error }, { status: 400 })
        }

        const hashedPassword = await encrypt(password)
        const normalizedEmail = email.toLowerCase()
        const normalizedUsername = username.toLowerCase()

        await connectMongoDB()

        // Check if user already exists (backend safety check)
        if (await isEmailExists(normalizedEmail)) {
            return NextResponse.json({ message: "Email is already in use" }, { status: 409 })
        }

        if (await isUsernameExists(normalizedUsername)) {
            return NextResponse.json({ message: "Username is already in use" }, { status: 409 })
        }


        const userAgent = req.headers.get('user-agent') || 'Unknown Device'

        await User.create({
            email: normalizedEmail,
            username: normalizedUsername,
            password: hashedPassword,
            devices: [userAgent]
        })
        console.log('user added to DB: ', username)

        // Trigger the modular verification email feature
        await triggerVerificationEmail(normalizedEmail, normalizedUsername)

        return NextResponse.json(
            { message: "User Registered. Please check your email to verify your account." },
            { status: 201 }
        )
    } catch (error) {
        console.log("error", error)
        return NextResponse.json({ message: "An error occured while registering the user" }, { status: 500 })
    }
}
