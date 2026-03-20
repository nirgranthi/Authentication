# Login Page
Last updated: 2026-03-20

## Source File
`app/login/page.tsx`

## Purpose
Client-side login form. Accepts email or username + password, calls NextAuth `signIn("credentials")`, and displays an error message on failure.

## Exports
- `Login` (default) — React page component

## State
| State | Type | Initial | Description |
|-------|------|---------|-------------|
| `isDarkMode` | `boolean` | system pref | Dark mode toggle via `useDarkMode` hook |
| `showPassword` | `boolean` | `false` | Toggles password input visibility |
| `error` | `string` | `''` | Inline error message on login failure |
| `isLoading` | `boolean` | `false` | Disables submit button during fetch |
| `userdata` | `{ username, email, password }` | all `''` | Controlled form state |

## Key Logic

### `handleIdentifierChange(e)`
- Clears `error` state
- Calls `isEmail(value)` to decide whether to set `email` or `username` in `userdata`
- The other field is always cleared to `''` — only one is sent at a time

### `handleSubmit(e)`
1. Calls `e.preventDefault()`, sets `isLoading = true`
2. Calls `signIn("credentials", { email, username, password, redirect: false })`
3. If `res?.error` → sets `error` to `"Invalid username/email or password"`
4. On success → logs result (no redirect yet)
5. `finally` → resets `isLoading = false`

## UI Components Used
| Component | Source | Role |
|-----------|--------|------|
| `DarkModeButton` | `components/Buttons` | Toggle dark mode |
| `ShowPasswordButton` | `components/Buttons` | Toggle password visibility |
| `SignInButton` | `components/Buttons` | Submit; accepts `isLoading` prop |
| `EmailSvg`, `PasswordSvg` | `components/Svgs` | Input icons |
| `GoogleSvg`, `AppleSvg` | `components/Svgs` | Social login button icons (not wired) |
| `StyledWrapper` | `styles/LoginCSS` | Styled-components wrapper |

## Dependencies
- `next-auth/react` — `signIn`
- `../hooks/useDarkMode` — dark mode sync to system preference
- `../scripts/isEmail` — email vs username detection
- `next/link` — `<Link href="/signup">` navigation

## Known Limitations / TODOs
- No redirect after successful login
- Google and Apple buttons have no `onClick` handler (OAuth not wired)
- "Forgot password?" span has no link/handler
- `console.log` calls should be removed before production
