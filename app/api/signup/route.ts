import { connectMongoDB } from "@/lib/mongodb"
import User from "@/models/user"
import { NextResponse } from "next/server"

export async function POST(req) {
    try {
        const { email, username, password } = await req.json()

        await connectMongoDB()
        await User.create({ email, username, password })
        console.log('user added to DB: ', username)
        return NextResponse.json({ message: "User Registered" }, { status: 201 })
    } catch (error) {
        console.log("error", error)
        return NextResponse.json({ message: "An error occured while registering the user" }, { status: 500 })
    }
}