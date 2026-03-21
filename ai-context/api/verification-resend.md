# Resend Verification Email
Last updated: 2026-03-21

## Source File
`app/api/verification-email/resend/route.ts`

## Purpose
Allows users to request a new verification email if they haven't verified their account yet.

## Exports
- `POST` — Processes resend requests.

## Logic Summary
1. Receives `email` or `username` from the request body.
2. Searches for the user in the database.
3. If the user is already verified, returns an error.
4. Triggers the verification process using `triggerVerificationEmail`.
5. Returns a success or error message.

## Inputs & Outputs
| Direction | Name | Type | Description |
|-----------|------|------|-------------|
| Input     | `email` | `string` | (Optional) User's email address. |
| Input     | `username` | `string` | (Optional) User's username. |
| Output    | `message`| `string` | Feedback on resend status. |

## Dependencies
- `connectMongoDB` from `@/lib/mongodb` — DB connection.
- `User` from `@/models/user` — User model.
- `triggerVerificationEmail` from `@/features/verification-email/triggerVerificationEmail` — Core verification logic.

## Known Limitations / TODOs
- No rate limiting implemented yet.
