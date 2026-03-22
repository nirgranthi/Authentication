import { NextRequest, NextResponse } from "next/server";
import { isUsernameExists } from "@/lib/userChecks";

export async function POST(req: NextRequest) {
    try {
        const { username } = await req.json();
        if (!username) {
            return NextResponse.json({ error: "Username is required" }, { status: 400 });
        }
        const exists = await isUsernameExists(username);
        return NextResponse.json({ exists });
    } catch (error) {
        console.error("Check Username API Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
