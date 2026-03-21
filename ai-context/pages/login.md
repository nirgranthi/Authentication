# Login Page
Last updated: 2026-03-21

## Source File
`app/login/page.tsx`

## Purpose
A comprehensive login interface supporting credentials, social providers (Google/Apple), theme persistence, and "Remember me" functionality.

## Exports
- `Login` (default) — Page component.

## Logic Summary
1. **Theme**: Uses `useTheme` for centralized dark mode management.
2. **Remember Me**: Uses `useRememberMe` to persist the last used identifier in `localStorage`.
3. **Validation**: Auto-detects if the input is an email or username using `validateEmail`.
4. **Login Flow**:
   - Calls `signIn("credentials", ...)` with `redirect: false`.
   - On `AccessDenied`, prompts for email verification and shows the `ResendVerificationButton`.
   - On success, redirects to `/profile/[username]` (fetching username from session).
5. **OAuth**: Direct calls to `signIn("google")` or `signIn("apple")`.
6. **Error Handling**: Uses `useOAuthError` to capture errors passed via URL params.

## Dependencies
- `useTheme` from `../components/ThemeProvider`.
- `useRememberMe`, `useAuthRedirect`, `useOAuthError` — Custom hooks.
- `ResendVerificationButton` — Modular feature component.
- `validateEmail` — Library utility.

## Known Limitations / TODOs
- Login redirects to home (`/`) if username is missing from session for some reason.
