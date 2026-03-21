# Verify Email Status Page
Last updated: 2026-03-21

## Source File
`app/verify-email/page.tsx`

## Purpose
A landing page that automatically triggers the verification API call upon page load and displays the result.

## Exports
- `VerifyEmailPage` — The default exported React component.

## Logic Summary
1. Extracts the `token` from search parameters.
2. On mount (`useEffect`), calls `GET /api/verifyEmail?token=...`.
3. Displays a loading spinner during the request.
4. If successful, shows a success message and redirects to `/login?verified=true`.
5. If failed, shows an error message with a "Back to Sign Up" button.
6. Handles dark mode via `useDarkMode`.
7. Wrapped in `Suspense`.

## Inputs & Outputs
| Direction | Name | Type | Description |
|-----------|------|------|-------------|
| Query     | `token` | `string` | The verification token. |
| Logic     | `Status` | `string` | 'loading', 'success', or 'error'. |

## Dependencies
- `axios` — For the API call.
- `useDarkMode` from `../hooks/useDarkMode` — Theme state.
- `StyledWrapper` from `../styles/LoginCSS` — Styled container.

## Known Limitations / TODOs
- Inline styles are used for some elements like spinners and icons.
