# Signup Page
Last updated: 2026-03-21

## Source File
`app/signup/page.tsx`

## Purpose
User registration interface with client-side and server-side validation, duplicate checking, and social login options.

## Exports
- `Signup` (default) — Page component.

## Logic Summary
1. **Validation**: Runs `validateUsername`, `validateEmail`, and `validatePassword` before submission.
2. **Duplicate Check**: Hits `/api/checkUserExists` before registration to provide specific feedback.
3. **Registration flow**: Posts to `/api/signup` and redirects to `/login` on success.
4. **Error Handling**: Displays specific inline errors for existing emails/usernames from both client-side checks and 409 API responses.
5. **UI**: Uses `useDarkMode` (local hook), and consistent component set (`DarkModeButton`, `SignInButton`, etc.).

## Dependencies
- `axios` — HTTP client.
- `validateUsername`, `validatePassword`, `validateEmail` from `@/lib/validation`.
- `useAuthRedirect`, `useOAuthError` — Auth hooks.

## Known Limitations / TODOs
- Uses local `useDarkMode` instead of `useTheme` (potential future refactor for consistency).
