# Trigger Verification Email
Last updated: 2026-03-21

## Source File
`features/verification-email/triggerVerificationEmail.ts`

## Purpose
Encapsulates the logic for initiating the email verification flow.

## Exports
- `triggerVerificationEmail` — Orchestration function.

## Logic Summary
1. Generates a fresh `verificationToken` and a 10-minute expiry.
2. Connects to MongoDB and updates the user record with the new token.
3. Constructs the `verificationUrl` using `NEXTAUTH_URL`.
4. Calls `sendVerificationEmail` to deliver the message.

## Inputs & Outputs
| Direction | Name | Type | Description |
|-----------|------|------|-------------|
| Input     | `email` | `string` | Target email. |
| Input     | `username` | `string` | User display name. |

## Dependencies
- `connectMongoDB` — DB.
- `User` — Model.
- `sendVerificationEmail` — Sibling utility for transport.

## Known Limitations / TODOs
- Part of a modular feature; designed to be easy to call from routes.
