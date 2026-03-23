import User from "@/models/user";
import { sendDeviceAlert } from "@/features/device-alert/sendDeviceAlert";
import { connectMongoDB } from "@/lib/mongodb";

export async function checkAndAlertDevice(email: string, userAgent?: string, phoneNumber?: string | null) {
    if (!userAgent || userAgent === 'Unknown Device') return;
    try {
        await connectMongoDB();
        const user = await User.findOne({ email: email.toLowerCase() });
        if (user) {
            if (!user.devices.includes(userAgent)) {
                user.devices.push(userAgent);
                await user.save();
                await sendDeviceAlert(email, phoneNumber || undefined, userAgent);
            }
        }
    } catch (err) {
        console.error("Device check error:", err);
    }
}
