# Signup Route
Last updated: 2026-03-20

## Source File
`app/api/signup/route.ts`

## Purpose
Handles new user registration — hashes the password and writes a new User document to MongoDB.

## Exports
- `POST` — async handler for `POST /api/signup`

## Logic Summary
1. Parses `{ email, username, password }` from JSON request body
2. Calls `encrypt(password)` → `bcrypt.hash(password, 10)` to produce `hashedPassword`
3. Connects to MongoDB via `connectMongoDB()`
4. Creates a new document: `User.create({ email, username, password: hashedPassword })`
5. Logs `username` to console on success
6. Returns `201 { message: "User Registered" }` on success
7. Catches any error and returns `500 { message: "An error occured while registering the user" }`

**Note:** Duplicate checking is done client-side via `/api/checkUserExists` before this route is called. This route does NOT validate uniqueness itself.

## Inputs & Outputs
| Direction | Name | Type | Description |
|-----------|------|------|-------------|
| Input | `email` | `string` | New user's email |
| Input | `username` | `string` | New user's username |
| Input | `password` | `string` | Plain-text password — hashed before storage |
| Output | `201` | JSON | `{ message: "User Registered" }` |
| Output | `500` | JSON | `{ message: "An error occured while registering the user" }` |

## Dependencies
- `@/lib/mongodb` — `connectMongoDB()` 
- `@/models/user` — Mongoose `User` model
- `next/server` — `NextResponse`, `NextRequest`
- `@/app/scripts/encrypt` — `encrypt()` bcrypt wrapper

## Known Limitations / TODOs
- No server-side input validation (no Zod/Yup)
- No uniqueness check — relies on client calling `/api/checkUserExists` first
- No welcome email or verification email sent after creation
- No role assignment on creation
