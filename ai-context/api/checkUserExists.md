# Check User Exists Route
Last updated: 2026-03-20

## Source File
`app/api/checkUserExists/route.ts`

## Purpose
Pre-signup endpoint that checks if an email or username is already taken in MongoDB. Used by the signup page before form submission to provide inline duplicate warnings.

## Exports
- `POST` — async handler for `POST /api/checkUserExists`

## Logic Summary
1. Connects to MongoDB via `connectMongoDB()`
2. Parses `{ email, username }` from JSON request body
3. Queries `User.findOne({ email }).select("_id")` — returns only `_id` or null
4. Queries `User.findOne({ username }).select("_id")` — returns only `_id` or null
5. Returns `{ email: <doc|null>, username: <doc|null> }`
6. Catches errors and returns `500 { message: "An error occured while registering the user" }`

**Caller logic:** `signup/page.tsx` checks `response.data.email` and `response.data.username` — if either is truthy, it displays the appropriate error and aborts form submission.

## Inputs & Outputs
| Direction | Name | Type | Description |
|-----------|------|------|-------------|
| Input | `email` | `string` | Email to check for existing use |
| Input | `username` | `string` | Username to check for existing use |
| Output (200) | `email` | `{ _id } \| null` | Existing user doc by email, or null |
| Output (200) | `username` | `{ _id } \| null` | Existing user doc by username, or null |
| Output (500) | `message` | `string` | Error message string |

## Dependencies
- `@/lib/mongodb` — `connectMongoDB()`
- `@/models/user` — Mongoose `User` model
- `next/server` — `NextResponse`, `NextRequest`

## Known Limitations / TODOs
- No rate limiting — vulnerable to email/username enumeration attacks
- No phone number field check (not in schema yet)
- Error message says "while registering" but this route is checking, not registering
