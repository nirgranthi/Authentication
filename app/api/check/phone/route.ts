import { NextRequest, NextResponse } from "next/server";
import { isPhoneNumberExists } from "@/lib/userChecks";

export async function POST(req: NextRequest) {
    try {
        const { phone } = await req.json();
        if (!phone) {
            return NextResponse.json({ error: "Phone number is required" }, { status: 400 });
        }
        const exists = await isPhoneNumberExists(phone);
        return NextResponse.json({ exists });
    } catch (error) {
        console.error("Check Phone API Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
