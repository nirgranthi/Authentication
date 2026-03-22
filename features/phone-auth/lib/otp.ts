// In-memory store for OTPs. In production, use Redis or MongoDB with TTL.
const otpStore = new Map<string, { otp: string, expiresAt: number }>();

export const generateOTP = (): string => {
    // Generate a 6-digit OTP
    return Math.floor(100000 + Math.random() * 900000).toString();
};

export const storeOTP = (phone: string, otp: string) => {
    // 5 minutes expiry
    const expiresAt = Date.now() + 5 * 60 * 1000;
    otpStore.set(phone, { otp, expiresAt });
};

export const verifyOTP = (phone: string, otp: string): boolean => {
    const record = otpStore.get(phone);
    if (!record) return false;

    if (Date.now() > record.expiresAt) {
        otpStore.delete(phone);
        return false;
    }

    if (record.otp === otp) {
        otpStore.delete(phone);
        return true;
    }

    return false;
};
