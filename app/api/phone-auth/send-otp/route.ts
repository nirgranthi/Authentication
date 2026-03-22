import { NextResponse } from 'next/server';
import { generateOTP, storeOTP } from '@/features/phone-auth/lib/otp';
import { sendSMS } from '@/features/phone-auth/lib/sms';

export async function POST(req: Request) {
    try {
        const { phone } = await req.json();

        // Validate basic +91 format
        if (!phone || !/^\+91\d{10}$/.test(phone)) {
            return NextResponse.json({ error: 'Invalid Indian phone number format. Must be +91 followed by 10 digits.' }, { status: 400 });
        }

        const otp = generateOTP();
        storeOTP(phone, otp);

        const message = `Your confirmation code is ${otp}. It is valid for 5 minutes.`;
        const result = await sendSMS(phone, message);

        if (!result.success) {
            return NextResponse.json({ error: 'Failed to send OTP SMS' }, { status: 500 });
        }

        return NextResponse.json({ message: 'OTP sent successfully' }, { status: 200 });

    } catch (error) {
        console.error('Send OTP Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
