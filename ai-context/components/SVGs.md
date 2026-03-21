# SVG Icon Collection
Last updated: 2026-03-21

## Source File
`app/components/SVGs.jsx`

## Purpose
Central repository for all SVG icons used throughout the project.

## Exports
- `EmailSvg`, `PasswordSvg`, `UsernameSvg` — Form field icons.
- `GoogleSvg`, `AppleSvg` — Social login icons.
- `MoonSvg`, `SunSvg` — Theme toggle icons.
- `EyeSvg`, `EyeOffSvg` — Password visibility icons.
- `LogoutSvg` — Sign out icon.

## Logic Summary
1. Returns vanilla SVG elements styled with `currentColor` to match text color.
2. Uses Tailwind classes for dynamic color application (e.g., `MoonSvg`'s stroke).

## Dependencies
- None.

## Known Limitations / TODOs
- Some SVGs have hardcoded IDs (e.g., `Layer_1`).
