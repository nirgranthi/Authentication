import nodemailer from "nodemailer";

interface SendVerificationEmailParams {
    email: string;
    verificationUrl: string;
    username: string;
}

export async function sendVerificationEmail({
    email,
    verificationUrl,
    username,
}: SendVerificationEmailParams): Promise<void> {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    const mailOptions = {
        from: `"Authentication App" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: "Verify your email address",
        html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
          <title>Verify Your Email</title>
        </head>
        <body style="margin:0;padding:0;background-color:#f4f4f7;font-family:Arial,sans-serif;">
          <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f4f7;padding:40px 0;">
            <tr>
              <td align="center">
                <table width="520" cellpadding="0" cellspacing="0"
                  style="background:#ffffff;border-radius:12px;overflow:hidden;
                         box-shadow:0 4px 24px rgba(0,0,0,0.08);">

                  <!-- Header -->
                  <tr>
                    <td style="background:linear-gradient(135deg,#6366f1,#8b5cf6);
                               padding:36px 40px;text-align:center;">
                      <h1 style="margin:0;color:#ffffff;font-size:24px;font-weight:700;
                                 letter-spacing:-0.5px;">
                        ✉️ Verify Your Email
                      </h1>
                    </td>
                  </tr>

                  <!-- Body -->
                  <tr>
                    <td style="padding:40px 40px 32px;">
                      <p style="margin:0 0 16px;font-size:16px;color:#374151;">
                        Hi <strong>${username}</strong>,
                      </p>
                      <p style="margin:0 0 24px;font-size:15px;color:#6b7280;line-height:1.6;">
                        Thanks for signing up! Please verify your email address to
                        activate your account. This link will expire in
                        <strong>10 minutes</strong>.
                      </p>

                      <!-- CTA Button -->
                      <table width="100%" cellpadding="0" cellspacing="0">
                        <tr>
                          <td align="center" style="padding:8px 0 32px;">
                            <a href="${verificationUrl}"
                               style="display:inline-block;background:linear-gradient(135deg,#6366f1,#8b5cf6);
                                      color:#ffffff;text-decoration:none;font-size:15px;
                                      font-weight:600;padding:14px 36px;border-radius:8px;
                                      letter-spacing:0.3px;">
                              Verify My Email →
                            </a>
                          </td>
                        </tr>
                      </table>

                      <p style="margin:0 0 8px;font-size:13px;color:#9ca3af;">
                        Or copy and paste this link into your browser:
                      </p>
                      <p style="margin:0;font-size:12px;color:#6366f1;word-break:break-all;">
                        ${verificationUrl}
                      </p>
                    </td>
                  </tr>

                  <!-- Footer -->
                  <tr>
                    <td style="background:#f9fafb;padding:20px 40px;border-top:1px solid #e5e7eb;">
                      <p style="margin:0;font-size:12px;color:#9ca3af;text-align:center;">
                        If you didn't create an account, you can safely ignore this email.
                      </p>
                    </td>
                  </tr>

                </table>
              </td>
            </tr>
          </table>
        </body>
        </html>
        `,
    };

    await transporter.sendMail(mailOptions);
}
