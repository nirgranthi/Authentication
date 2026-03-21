# Check User Exists Route
Last updated: 2026-03-21

## Source File
`app/api/checkUserExists/route.ts`

## Purpose
Endpoint used by the frontend to provide real-time feedback on email/username availability during signup.

## Exports
- `POST` — Checks availability.

## Logic Summary
1. Connects to MongoDB.
2. Parses `email` and `username` from the body.
3. Queries for users with matching email (normalized) or username (normalized).
4. Returns an object showing which identifiers are already taken.

## Inputs & Outputs
| Direction | Name | Type | Description |
|-----------|------|------|-------------|
| Input     | `email` | `string` | Email to check. |
| Input     | `username` | `string` | Username to check. |
| Output    | `email` | `doc | null` | User document (id only) if email found. |
| Output    | `username`| `doc | null` | User document (id only) if username found. |

## Dependencies
- `connectMongoDB` from `@/lib/mongodb`.
- `User` from `@/models/user`.

## Known Limitations / TODOs
- Error message correctly identifies it as a check (fixed from previous version).
