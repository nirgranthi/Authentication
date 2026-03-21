# User Profile Page
Last updated: 2026-03-21

## Source File
`app/profile/[username]/page.tsx`

## Purpose
Displays authenticated user information and provides a logout option.

## Exports
- `ProfilePage` — The default exported React component.

## Logic Summary
1. Uses NextAuth `useSession` to get the current user's data.
2. Uses `useTheme` for dark mode management.
3. Enforces authentication by redirecting to `/login` if unauthenticated.
4. Enforces correct profile routes by redirecting users to their own `/[username]` if they attempt to access another profile.
5. Displays user details (username, email, joined date) and a verification badge.
6. Provides a "Sign Out" button.

## Inputs & Outputs
| Direction | Name | Type | Description |
|-----------|------|------|-------------|
| Params    | `username` | `string` | The username from the URL segment. |
| Session   | `user` | `object` | Extracted user data from the NextAuth session. |

## Dependencies
- `useSession`, `signOut` from `next-auth/react` — Auth.
- `useTheme` from `../../components/ThemeProvider` — Theme context.
- `DarkModeButton`, `LogoutSvg` — Components.
- `PageWrapper`, `Card` from `../../styles/ProfileCSS` — Styled components.

## Known Limitations / TODOs
- Currently only allows users to see their own profile (redirects if `urlUsername !== user.username`).
