# Verify Email
Last updated: 2026-03-21

## Source File
`app/api/verifyEmail/route.ts`

## Purpose
Handles verification link clicks by validating tokens and marking users as verified.

## Exports
- `GET` — Processes verification token validation.

## Logic Summary
1. Extracts the `token` from the URL query parameters.
2. Searches for a user with a matching `verificationToken` that hasn't expired.
3. If valid:
   - Sets `isVerified` to `true`.
   - Clears `verificationToken` and `verificationTokenExpiry`.
   - Saves the user document.
   - Redirects the user to the login page with a `verified=true` query param.
4. If invalid, returns a 400 error.

## Inputs & Outputs
| Direction | Name | Type | Description |
|-----------|------|------|-------------|
| Input     | `token` | `string` | (Query) The verification token. |
| Output    | `Redirect`| `URL` | Redirects to `/login?verified=true`. |
| Output    | `message`| `string` | Error message (if invalid). |

## Dependencies
- `connectMongoDB` from `@/lib/mongodb` — DB connection.
- `User` from `@/models/user` — User model.

## Known Limitations / TODOs
- Token expiry is fixed at 10 minutes.
