# Forgot Password Page
Last updated: 2026-03-21

## Source File
`app/forgot-password/page.tsx`

## Purpose
Provides a user interface for requesting a password reset link via email.

## Exports
- `ForgotPassword` — The default exported React component.

## Logic Summary
1. Uses `useDarkMode` to sync with global dark mode state.
2. Displays a form with an email input field.
3. On submission, sends a POST request to `/api/forgotPassword`.
4. Handles loading state and displays success/error feedback messages.
5. Provides a link back to the login page.
6. Wrapped in `Suspense` for modern Next.js compatibility.

## Inputs & Outputs
| Direction | Name | Type | Description |
|-----------|------|------|-------------|
| UI Input  | `email` | `string` | User email input. |
| UI Action | `onSubmit` | `function` | Triggers the API request. |

## Dependencies
- `useDarkMode` from `../hooks/useDarkMode` — Dark mode state.
- `EmailSvg` from `../components/SVGs` — Icon.
- `StyledWrapper` from `../styles/LoginCSS` — Styled container.
- `DarkModeButton`, `SignInButton` from `../components/Buttons` — UI components.

## Known Limitations / TODOs
- Success message styling is handled via inline styles for now.
