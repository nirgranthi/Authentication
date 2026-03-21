# Send Forgot Password Email
Last updated: 2026-03-21

## Source File
`lib/sendForgotPasswordEmail.ts`

## Purpose
Sends a professional HTML email containing a password reset link.

## Exports
- `sendForgotPasswordEmail` — Async function to send the email.

## Logic Summary
1. Configures a `nodemailer` transporter using Gmail service.
2. Constructs an HTML template with branding and a "Reset My Password" button.
3. Injects the `resetUrl` and `username`.
4. Sends the email to the target user.

## Inputs & Outputs
| Direction | Name | Type | Description |
|-----------|------|------|-------------|
| Input     | `email` | `string` | Target email. |
| Input     | `resetUrl` | `string` | The magic link URL. |
| Input     | `username` | `string` | Display name for the email. |

## Dependencies
- `nodemailer` — Email transport.
- `.env` — `EMAIL_USER` and `EMAIL_PASS`.

## Known Limitations / TODOs
- Hardcoded to Gmail service.
- HTML template is inline.
