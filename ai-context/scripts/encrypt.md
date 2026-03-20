# Password Encrypt Script
Last updated: 2026-03-20

## Source File
`app/scripts/encrypt.ts`

## Purpose
Thin wrapper around `bcryptjs.hash()` that produces a bcrypt hash of any string. Keeps hashing logic centralized so the salt rounds can be changed in one place.

## Exports
- `encrypt(data: string): Promise<string>` — returns the bcrypt hash

## Logic Summary
1. Takes a plain-text `data` string
2. Calls `bcrypt.hash(data, 10)` with salt rounds = **10**
3. Returns the resulting hash string

## Inputs & Outputs
| Direction | Name | Type | Description |
|-----------|------|------|-------------|
| Input | `data` | `string` | Plain-text value to hash (typically a password) |
| Output | — | `Promise<string>` | Bcrypt hash string |

## Dependencies
- `bcryptjs` — `hash()` function

## Usage Sites
- `app/api/signup/route.ts` — hashes the user's password before `User.create()`

## Known Limitations / TODOs
- Salt rounds hardcoded to `10` — consider making it an env-configurable constant
- Generic name `encrypt` is slightly misleading (bcrypt is hashing, not encryption)
