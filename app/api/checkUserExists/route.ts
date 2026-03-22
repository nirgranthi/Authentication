import { connectMongoDB } from "@/lib/mongodb"
import { isEmailExists, isUsernameExists } from "@/lib/userChecks"
import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest) {
    try {
        await connectMongoDB();

        const { email, username } = await req.json();
        const emailExists = email ? await isEmailExists(email) : false;
        const usernameExists = username ? await isUsernameExists(username) : false;
        return NextResponse.json({email: emailExists, username: usernameExists})
    } catch (error) {
        console.log('Error while checking if user exists: ', error)
        return NextResponse.json({ message: "An error occured while registering the user" }, { status: 500 })
    }
}