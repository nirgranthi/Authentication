# Email Validator Script
Last updated: 2026-03-20

## Source File
`app/scripts/isEmail.ts`

## Purpose
Checks whether a given string matches a basic email format using a regex. Used client-side to decide whether to treat a login identifier as an email or username before sending it to the server.

## Exports
- `isEmail(data: string): boolean`

## Logic Summary
1. Tests `data` against the regex `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`
2. Returns `true` if the string looks like an email, `false` otherwise
3. Pure function — no side effects

## Regex Breakdown
| Part | Meaning |
|------|---------|
| `^[^\s@]+` | One or more non-whitespace, non-@ chars at the start (local part) |
| `@` | Literal @ symbol |
| `[^\s@]+` | One or more non-whitespace, non-@ chars (domain name) |
| `\.` | Literal dot |
| `[^\s@]+$` | One or more non-whitespace, non-@ chars (TLD) |

## Inputs & Outputs
| Direction | Name | Type | Description |
|-----------|------|------|-------------|
| Input | `data` | `string` | The identifier string to test |
| Output | — | `boolean` | `true` if email-shaped, `false` otherwise |

## Dependencies
None

## Usage Sites
- `app/login/page.tsx` — `handleIdentifierChange()` uses this to route the value to `email` or `username` state

## Known Limitations / TODOs
- Regex is deliberately loose — passes some technically invalid emails
- Not used server-side — the API routes accept either field without validation
