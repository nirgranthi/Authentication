# Signup Page
Last updated: 2026-03-20

## Source File
`app/signup/page.tsx`

## Purpose
Client-side registration form. Validates uniqueness via `/api/checkUserExists` before posting to `/api/signup`. Redirects to `/login` on success.

## Exports
- `Signup` (default) — React page component

## State
| State | Type | Initial | Description |
|-------|------|---------|-------------|
| `isDarkMode` | `boolean` | system pref | Dark mode toggle via `useDarkMode` hook |
| `showPassword` | `boolean` | `false` | Toggles password input visibility |
| `emailError` | `string` | `''` | Inline error for duplicate email |
| `usernameError` | `string` | `''` | Inline error for duplicate username |
| `isLoading` | `boolean` | `false` | Disables submit button during fetch |
| `userdata` | `{ email, username, password }` | all `''` | Controlled form state |

## Key Logic

### `handleChange(e)`
- Updates `userdata[name]` from input's `name` attribute
- Clears `emailError` or `usernameError` when the matching field changes

### `handleSubmit(e)` — two-phase submit
**Phase 1 — Duplicate check:**
1. `axios.post("/api/checkUserExists", { email, username })`
2. If `response.data.email` → sets `emailError`, returns early
3. If `response.data.username` → sets `usernameError`, returns early

**Phase 2 — Registration:**
4. `axios.post("/api/signup", userdata)`
5. If `res.status === 201` → resets form, `router.push("/login")`

## UI Components Used
| Component | Source | Role |
|-----------|--------|------|
| `DarkModeButton` | `components/Buttons` | Toggle dark mode |
| `ShowPasswordButton` | `components/Buttons` | Toggle password visibility |
| `SignInButton` | `components/Buttons` | Submit with `text="Sign Up"` and `isLoading` |
| `UsernameSvg`, `EmailSvg`, `PasswordSvg` | `components/Svgs` | Input icons |
| `GoogleSvg`, `AppleSvg` | `components/Svgs` | Social button icons (not wired) |
| `StyledWrapper` | `styles/LoginCSS` | Styled-components wrapper |

## Dependencies
- `axios` — HTTP client for API calls
- `next/navigation` — `useRouter` for redirect after signup
- `../hooks/useDarkMode` — dark mode sync
- `next/link` — `<Link href="/login">` navigation

## Known Limitations / TODOs
- Google and Apple buttons are `type="button"` with no handler (OAuth not wired)
- No password strength validation
- `console.log(error)` in catch block — should be replaced with user-facing error state
- No server-side validation fallback; relies entirely on client pre-check
