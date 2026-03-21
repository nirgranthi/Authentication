# Reset Password Page
Last updated: 2026-03-21

## Source File
`app/reset-password/page.tsx`

## Purpose
Provides an interface for users to enter and confirm their new password after clicking a reset link.

## Exports
- `ResetPassword` — The default exported React component.

## Logic Summary
1. Extracts the reset token from the URL search parameters (`?token=...`).
2. Provides fields for a new password and password confirmation.
3. Includes a "Show/Hide Password" toggle.
4. On submission:
   - Validates that the token exists.
   - Validates that both passwords match locally.
   - Sends a POST request to `/api/resetPassword` with the token and new password.
5. On success, displays a message and redirects to the login page after 2 seconds.
6. Wrapped in `Suspense`.

## Inputs & Outputs
| Direction | Name | Type | Description |
|-----------|------|------|-------------|
| Query     | `token` | `string` | The reset token from the URL. |
| UI Input  | `password` | `string` | The new password. |
| UI Input  | `confirmPassword` | `string` | Password confirmation. |

## Dependencies
- `useDarkMode` from `../hooks/useDarkMode` — Theme state.
- `PasswordSvg` from `../components/SVGs` — Icon.
- `StyledWrapper` from `../styles/LoginCSS` — Styled container.
- `DarkModeButton`, `SignInButton`, `ShowPasswordButton` from `../components/Buttons` — UI components.

## Known Limitations / TODOs
- Redirect time is hardcoded to 2 seconds.
