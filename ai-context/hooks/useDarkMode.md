# useDarkMode Hook
Last updated: 2026-03-21

## Source File
`app/hooks/useDarkMode.ts`

## Purpose
A standalone hook for detecting and responding to system color scheme preferences.

## Exports
- `useDarkMode` — React hook.

## Logic Summary
1. Initializes `isDarkMode` state.
2. Uses `window.matchMedia('(prefers-color-scheme: dark)')` to set initial value and listen for changes.
3. Does **not** handle `localStorage` or `document.documentElement` updates (that is now handled by `ThemeProvider` for most of the app).

## Dependencies
- React `useState`, `useEffect`.

## Known Limitations / TODOs
- Superseded by `ThemeProvider` in most of the application for global state sync.
