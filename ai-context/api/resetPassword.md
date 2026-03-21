# Reset Password
Last updated: 2026-03-21

## Source File
`app/api/resetPassword/route.ts`

## Purpose
Registers a new password for a user using a valid reset token.

## Exports
- `POST` — Processes password reset submissions.

## Logic Summary
1. Receives `token` and `newPassword` from the request body.
2. Performs server-side validation on the `newPassword` (length, complexity).
3. Searches for a user with a matching `forgotPasswordToken` that hasn't expired.
4. If the token is valid:
   - Hashes/encrypts the new password.
   - Updates the user's password field.
   - Clears `forgotPasswordToken` and `forgotPasswordTokenExpiry`.
   - Marks the user as `isVerified` (since they proved ownership via email).
   - Saves the user document.
5. Returns a success or error message.

## Inputs & Outputs
| Direction | Name | Type | Description |
|-----------|------|------|-------------|
| Input     | `token` | `string` | The password reset token. |
| Input     | `newPassword` | `string` | The new password to set. |
| Output    | `message`| `string` | Success or error message. |

## Dependencies
- `connectMongoDB` from `@/lib/mongodb` — DB connection.
- `User` from `@/models/user` — User model.
- `encrypt` from `@/app/scripts/encrypt` — Password hashing.
- `validatePassword` from `@/lib/validation` — Password validation.

## Known Limitations / TODOs
- Verification is automatically granted upon password reset.
