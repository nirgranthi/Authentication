import { connectMongoDB } from "@/lib/mongodb"
import User from "@/models/user"
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        await connectMongoDB();

        const { email, username } = await req.json();
        const userEmail = await User.findOne({email}).select("_id");
        const userUsername = await User.findOne({username}).select("_id");
        return NextResponse.json({email: userEmail, username: userUsername})
    } catch (error) {
        console.log('Error while checking if user exists: ', error)
        return NextResponse.json({ message: "An error occured while registering the user" }, { status: 500 })
    }
}