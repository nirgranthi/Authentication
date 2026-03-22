import twilio from 'twilio';

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioNumber = process.env.TWILIO_PHONE_NUMBER;

export const sendSMS = async (to: string, message: string) => {
    if (!accountSid || !authToken || !twilioNumber) {
        console.warn('Twilio credentials not found. Mocking SMS sending for development.');
        console.log(`[MOCK SMS] To: ${to} | Message: ${message}`);
        return { success: true, message: 'Mock SMS sent' };
    }

    try {
        const client = twilio(accountSid, authToken);
        await client.messages.create({
            body: message,
            from: twilioNumber,
            to: to // Ensure it has +91
        });
        return { success: true };
    } catch (error) {
        console.error('Error sending SMS via Twilio:', error);
        return { success: false, error };
    }
};
