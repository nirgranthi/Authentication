import CredentialsProvider from "next-auth/providers/credentials";
import User from "@/models/user";
import { connectMongoDB } from "@/lib/mongodb";
import { verifyOTP } from "./lib/otp";

export const phoneAuthProvider = CredentialsProvider({
    id: "phone-otp",
    name: "Phone Number",
    credentials: {
        phone: { label: "Phone Number", type: "text" },
        otp: { label: "OTP", type: "text" }
    },
    async authorize(credentials) {
        if (!credentials?.phone || !credentials?.otp) {
            throw new Error("Phone number and OTP are required");
        }

        const { phone, otp } = credentials;

        // Verify OTP
        const isValid = verifyOTP(phone, otp);
        if (!isValid) {
            throw new Error("Invalid or expired OTP");
        }

        try {
            await connectMongoDB();

            // Check if user exists with this phone number
            let user = await User.findOne({ phoneNumber: phone });

            if (!user) {
                // Generate dummy email and username for new phone user
                const numericPhone = phone.replace('+', ''); // e.g. 919876543210
                const dummyEmail = `${numericPhone}@authentication.com`;
                const dummyUsername = `user_${numericPhone}`;

                user = new User({
                    phoneNumber: phone,
                    email: dummyEmail,
                    username: dummyUsername,
                    isVerified: true, // Phone is implicitly verified
                    provider: 'phone',
                });

                await user.save();
            }

            return user;
        } catch (error: any) {
            console.error("Phone auth authorize error:", error);
            throw new Error("Failed to authenticate with phone number");
        }
    }
});
