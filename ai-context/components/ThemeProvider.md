# Theme Provider
Last updated: 2026-03-21

## Source File
`app/components/ThemeProvider.tsx`

## Purpose
Manages global theme (Dark/Light mode) state and persistence.

## Exports
- `ThemeProvider` — Context provider for theme state.
- `useTheme` — Custom hook for consuming theme context.

## Logic Summary
1. `ThemeProvider`:
   - Maintains `isDarkMode` state.
   - On mount (`useEffect`): Checks `localStorage` or `prefers-color-scheme`.
   - Listens for system theme changes via `mediaQuery.addEventListener`.
   - `toggleDarkMode`: Updates state, `localStorage`, and `document.documentElement.classList`.
2. `useTheme`:
   - Returns the current theme context or throws if used outside the provider.

## Dependencies
- React `createContext`, `useContext`, `useState`, `useEffect`.

## Known Limitations / TODOs
- Uses `.dark` class on the `html` element for Tailwind dark mode support.
