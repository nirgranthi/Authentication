# NextAuth Handler
Last updated: 2026-03-21

## Source File
`app/api/auth/[...nextauth]/route.ts`

## Purpose
Configures and exports the NextAuth.js handler that manages both social (Google, Apple) and credential-based authentication.

## Exports
- `authOptions` — `NextAuthOptions` configuration object.
- `handler as GET` — Handles GET requests (session, signin, etc.).
- `handler as POST` — Handles POST requests (callback, signin, etc.).

## Logic Summary
- **Providers**:
  - `GoogleProvider` & `AppleProvider`: For social OAuth sign-ins.
  - `CredentialsProvider`: For email/username + password login.
- **`authorize()` (Credentials)**:
  1. Validates input using `validateEmail` and `validateUsername`.
  2. Connects to MongoDB and finds user by email OR username.
  3. Checks if user was registered via a social provider (blocks if no password).
  4. Verifies password via `bcrypt.compare`.
- **Callbacks**:
  - `signIn`: Blocks credential-based login if `isVerified` is explicitly `false`. Social logins are auto-verified.
  - `jwt`: Persists extra user info (`username`, `email`, `isVerified`, `createdAt`) into the JWT.
  - `session`: Passes `username`, `isVerified`, and `createdAt` from the token to the client session.

## Inputs & Outputs
| Direction | Name | Type | Description |
|-----------|------|------|-------------|
| Input     | `credentials` | `object` | Email/Username and Password. |
| Output    | `session` | `object` | Session containing user identity and metadata. |

## Dependencies
- `NextAuth` from `next-auth` — Auth core.
- `User` from `@/models/user` — User model.
- `bcryptjs` — Password verification.
- `validateEmail`, `validateUsername` from `@/lib/validation`.

## Known Limitations / TODOs
- No rate limiting or brute-force protection yet.
