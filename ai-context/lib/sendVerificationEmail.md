# Send Verification Email
Last updated: 2026-03-21

## Source File
`features/verification-email/sendVerificationEmail.ts`

## Purpose
Sends a professional HTML email for user account verification.

## Exports
- `sendVerificationEmail` — Async function to send the email.

## Logic Summary
1. Configures `nodemailer` transporter.
2. Injects `verificationUrl` into a themed HTML email template.
3. Sends the email.

## Inputs & Outputs
| Direction | Name | Type | Description |
|-----------|------|------|-------------|
| Input     | `email` | `string` | Target email. |
| Input     | `verificationUrl` | `string` | Verification link. |
| Input     | `username` | `string` | User display name. |

## Dependencies
- `nodemailer` — Email transport.

## Known Limitations / TODOs
- Inline HTML template, similar to forgot password utility.
