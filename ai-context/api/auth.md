# NextAuth Handler
Last updated: 2026-03-20

## Source File
`app/api/auth/[...nextauth]/route.ts`

## Purpose
Configures and exports the NextAuth.js handler that manages credential-based authentication (login) via GET and POST.

## Exports
- `authOptions` — `NextAuthOptions` object, importable by other server-side code for session access
- `handler as GET` — handles GET requests to `/api/auth/*`
- `handler as POST` — handles POST requests to `/api/auth/*`

## Logic Summary
- Defines a single `CredentialsProvider` that accepts `email`, `username`, and `password`
- In `authorize()`:
  1. Returns `null` immediately if `credentials` is missing
  2. Destructures `{ email, username, password }` from credentials
  3. Returns `null` if neither `email` nor `username` is provided
  4. Returns `null` if `password` is not provided
  5. Connects to MongoDB via `connectMongoDB()`
  6. Queries `User.findOne({ email })` if email is provided, else `User.findOne({ username })`
  7. If user found and `bcrypt.compare(password, user.password)` is truthy → returns the user object
  8. Otherwise returns `null`
- `NextAuth(authOptions)` is bound to both GET and POST exports

## Inputs & Outputs
| Direction | Name | Type | Description |
|-----------|------|------|-------------|
| Input | `email` | `string` | User's email (optional if username provided) |
| Input | `username` | `string` | User's username (optional if email provided) |
| Input | `password` | `string` | Plain-text password to verify against bcrypt hash |
| Output | `user` | `User doc \| null` | Mongoose User document on success, null on failure |

## Dependencies
- `next-auth` — provides `NextAuth`, `NextAuthOptions`
- `next-auth/providers/credentials` — `CredentialsProvider`
- `@/models/user` — Mongoose `User` model for DB lookups
- `bcryptjs` — `bcrypt.compare()` for password verification
- `@/lib/mongodb` — `connectMongoDB()` connection utility

## Known Limitations / TODOs
- No OAuth providers configured yet (Google, GitHub stubs exist in login UI)
- No JWT/session callbacks — session carries raw user doc
- No rate limiting on the `authorize()` function
- `isVerified` field not checked — email verification not yet implemented
