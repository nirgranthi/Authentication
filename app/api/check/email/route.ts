import { NextRequest, NextResponse } from "next/server";
import { isEmailExists } from "@/lib/userChecks";

export async function POST(req: NextRequest) {
    try {
        const { email } = await req.json();
        if (!email) {
            return NextResponse.json({ error: "Email is required" }, { status: 400 });
        }
        const exists = await isEmailExists(email);
        return NextResponse.json({ exists });
    } catch (error) {
        console.error("Check Email API Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
