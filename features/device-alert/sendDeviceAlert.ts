import nodemailer from "nodemailer";
// import twilio from "twilio"; // Uncomment when twilio is ready or configured

export const sendDeviceAlert = async (email: string | null | undefined, phoneNumber: string | null | undefined, deviceName: string) => {
    try {
        if (email && !email.toLowerCase().endsWith("@authentication.com")) {
            // Send email
            const transporter = nodemailer.createTransport({
                host: process.env.EMAIL_SERVER_HOST,
                port: parseInt(process.env.EMAIL_SERVER_PORT || "587"),
                auth: {
                    user: process.env.EMAIL_SERVER_USER,
                    pass: process.env.EMAIL_SERVER_PASSWORD,
                },
            });

            await transporter.sendMail({
                from: process.env.EMAIL_FROM,
                to: email,
                subject: "Security Alert: New Login Detected",
                html: `
                    <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
                        <h2 style="color: #d9534f;">New Login Detected</h2>
                        <p>We detected a login to your account from a new device.</p>
                        <p><strong>Device:</strong> ${deviceName}</p>
                        <p>If this was you, you can safely ignore this email.</p>
                        <p>If you don't recognize this activity, please reset your password immediately.</p>
                    </div>
                `,
            });
            console.log("Device alert email sent successfully to", email);
        } else if (phoneNumber) {
            // Send SMS
            // const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
            // await client.messages.create({
            //     body: `Security Alert: We detected a new login to your account from a new device (${deviceName}). If this wasn't you, secure your account.`,
            //     from: process.env.TWILIO_PHONE_NUMBER,
            //     to: phoneNumber
            // });
            console.log("Device alert SMS triggered for", phoneNumber, "(Mocked/Not fully configured)");
        }
    } catch (error) {
        console.error("Failed to send device alert:", error);
    }
};
