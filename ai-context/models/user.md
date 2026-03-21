# User Model
Last updated: 2026-03-21

## Source File
`models/user.ts`

## Purpose
Defines the Mongoose schema for the `User` collection, supporting credentials, social providers, and verification/reset tokens.

## Exports
- `User` (default) — Mongoose model.

## Schema Fields
| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `username` | `String` | No | Unique, sparse, lowercase. |
| `email` | `String` | Yes | Unique, lowercase. |
| `password` | `String` | No | Hash (for credentials users). |
| `name`, `image`| `String` | No | From social providers. |
| `provider` | `String` | No | Default: "credentials". |
| `providerId` | `String` | No | ID from social provider. |
| `isVerified`| `Boolean`| Yes | Default: `false`. |
| `verificationToken*`| Misc | No | Token and expiry for email verify. |
| `forgotPasswordToken*`| Misc| No | Token and expiry for reset. |

## Logic Summary
- Uses timestamps (`createdAt`, `updatedAt`).
- Singleton pattern: `models.User || mongoose.model("User", userSchema)`.
- `username` and `email` have `unique: true` at the database level.

## Dependencies
- `mongoose`.

## Known Limitations / TODOs
- `sparse: true` on `username` allows multiple social users to have no username without collision.
