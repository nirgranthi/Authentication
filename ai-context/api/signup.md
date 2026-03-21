# Signup Route
Last updated: 2026-03-21

## Source File
`app/api/signup/route.ts`

## Purpose
Handles user registration, including multi-phase validation, password hashing, and triggering the verification flow.

## Exports
- `POST` — Processes new user registration.

## Logic Summary
1. Parses `email`, `username`, and `password` from the request.
2. Performs server-side validation using `validateUsername` and `validatePassword`.
3. Normalizes inputs (lowercase).
4. Connects to MongoDB and performs a uniqueness check for both email and username.
5. If unique, creates a new `User` document.
6. Triggers the modular verification email flow via `triggerVerificationEmail`.
7. Returns a success message instructing the user to check their email.

## Inputs & Outputs
| Direction | Name | Type | Description |
|-----------|------|------|-------------|
| Input     | `email` | `string` | User email address. |
| Input     | `username` | `string` | User username. |
| Input     | `password` | `string` | Plain-text password. |
| Output    | `message` | `string` | Confirmation or error message. |

## Dependencies
- `User` from `@/models/user` — DB Model.
- `encrypt` from `@/app/scripts/encrypt` — Hashing utility.
- `triggerVerificationEmail` — Verification flow.
- `validateUsername`, `validatePassword` — Validation helpers.

## Known Limitations / TODOs
- Success response code is 201.
- Error handling uses 409 for duplicates and 400 for validation errors.
