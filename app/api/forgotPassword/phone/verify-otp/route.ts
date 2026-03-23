import { NextRequest, NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import { verifyOTP } from "@/features/phone-auth/lib/otp";
import crypto from "crypto";

export async function POST(req: NextRequest) {
    try {
        const { phone, otp } = await req.json();

        if (!phone || !otp) {
            return NextResponse.json({ message: "Phone and OTP are required" }, { status: 400 });
        }

        const formattedPhone = phone.startsWith('+91') ? phone : `+91${phone}`;

        // Verify the OTP
        const isValid = verifyOTP(formattedPhone, otp);

        if (!isValid) {
            return NextResponse.json({ message: "Invalid or expired OTP" }, { status: 400 });
        }

        await connectMongoDB();

        // Find user by phone number
        const user = await User.findOne({ phoneNumber: formattedPhone });

        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        // Generate a reset token that expires in 10 minutes
        const forgotPasswordToken = crypto.randomUUID();
        const forgotPasswordTokenExpiry = new Date(Date.now() + 10 * 60 * 1000);

        user.forgotPasswordToken = forgotPasswordToken;
        user.forgotPasswordTokenExpiry = forgotPasswordTokenExpiry;
        await user.save();

        return NextResponse.json(
            { 
                message: "OTP verified successfully.",
                token: forgotPasswordToken 
            },
            { status: 200 }
        );

    } catch (error) {
        console.error("verify-otp error:", error);
        return NextResponse.json({ message: "An error occurred while verifying OTP." }, { status: 500 });
    }
}
