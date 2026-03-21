# Authentication Providers
Last updated: 2026-03-21

## Source File
`app/components/Providers.tsx`

## Purpose
Wraps the application in necessary context providers for authentication.

## Exports
- `Providers` — The default exported React breadcrumb component.

## Logic Summary
1. Imports `SessionProvider` from `next-auth/react`.
2. Wraps the `children` in the provider to enable `useSession` hooks.

## Dependencies
- `next-auth/react` — Client-side auth library.

## Known Limitations / TODOs
- Only contains `SessionProvider` for now.
