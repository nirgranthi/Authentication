# Forgot Password
Last updated: 2026-03-21

## Source File
`app/api/forgotPassword/route.ts`

## Purpose
Initiates the password reset flow by generating a unique token and sending an email to the user.

## Exports
- `POST` — Processes forgot password requests.

## Logic Summary
1. Receives and validates the email from the request body.
2. Normalizes the email and connects to MongoDB.
3. Searches for a user with the matching email.
4. If found:
   - Generates a UUID `forgotPasswordToken`.
   - Sets `forgotPasswordTokenExpiry` to 10 minutes from now.
   - Saves the token and expiry to the user document.
   - Sends a reset email using `sendForgotPasswordEmail`.
5. Returns a success message even if the user is not found (to prevent email enumeration).

## Inputs & Outputs
| Direction | Name | Type | Description |
|-----------|------|------|-------------|
| Input     | `email` | `string` | The user's email address. |
| Output    | `message`| `string` | Feedback message indicating if an email was sent. |

## Dependencies
- `connectMongoDB` from `@/lib/mongodb` — DB connection.
- `User` from `@/models/user` — User model.
- `sendForgotPasswordEmail` from `@/lib/sendForgotPasswordEmail` — Email utility.

## Known Limitations / TODOs
- Token expiry is fixed at 10 minutes.
- No rate limiting implemented for this route yet.
