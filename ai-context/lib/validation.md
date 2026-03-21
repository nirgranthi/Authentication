# Global Validation Utilities
Last updated: 2026-03-21

## Source File
`lib/validation.ts`

## Purpose
Centralized validation logic for usernames, emails, and passwords, used shared across the app.

## Exports
- `validateEmail` — Regex-based email checking.
- `validateUsername` — Check for letters, numbers, underscores, and periods.
- `validatePassword` — Enforces length and character complexity.

## Logic Summary
1. Each function returns a `ValidationResult` object (`{ valid: boolean, error: string }`).
2. `validateUsername`: Enforces 4-20 characters and `[a-zA-Z0-9_.]`.
3. `validatePassword`: Requires 8+ chars, uppercase, lowercase, digit, and special char.
4. `validateEmail`: Uses a standard email regex.

## Dependencies
- None.

## Known Limitations / TODOs
- Validation rules are strictly enforced server-side and client-side via these utilities.
