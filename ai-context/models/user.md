# User Model
Last updated: 2026-03-20

## Source File
`models/user.ts`

## Purpose
Defines the Mongoose schema and model for the `User` collection in MongoDB. Uses a singleton pattern to prevent model re-registration in Next.js hot-reload environments.

## Exports
- `User` (default) — Mongoose model instance

## Logic Summary
- Defines `userSchema` with three required string fields: `username`, `email`, `password`
- Enables `timestamps: true` → MongoDB auto-adds `createdAt` and `updatedAt` to every document
- Uses `models.User || mongoose.model("User", userSchema)` singleton pattern to prevent "Cannot overwrite model" errors in development

## Schema Fields
| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `username` | `String` | ✅ | Unique identifier for display/login |
| `email` | `String` | ✅ | Used for credential login |
| `password` | `String` | ✅ | Stored as bcrypt hash |
| `createdAt` | `Date` | auto | Added by `timestamps: true` |
| `updatedAt` | `Date` | auto | Added by `timestamps: true` |

## Dependencies
- `mongoose` — `Schema`, `models`, `mongoose.model()`

## Known Limitations / TODOs
- No `unique: true` constraint on `email` or `username` in schema (duplicate prevention is done in application logic via `checkUserExists`)
- No `isVerified` boolean field yet (needed for email verification)
- No `role` field yet (needed for RBAC)
- No `phone` field (needed for phone auth)
- No `refreshToken` field (needed for token rotation)
