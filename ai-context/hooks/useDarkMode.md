# useDarkMode Hook
Last updated: 2026-03-20

## Source File
`app/hooks/useDarkMode.ts`

## Purpose
Custom React hook that syncs a `isDarkMode` boolean to the OS/browser `prefers-color-scheme` media query. Initializes to the system preference and updates reactively when the system theme changes.

## Exports
- `useDarkMode(initialValue?: boolean): [boolean, Dispatch<SetStateAction<boolean>>]`

## Logic Summary
1. Initializes `isDarkMode` state with `initialValue` (default `false`)
2. `useEffect` runs once on mount:
   - Guards against SSR with `typeof window !== 'undefined' && window.matchMedia`
   - Gets the `(prefers-color-scheme: dark)` media query
   - If `mediaQuery.matches` → immediately sets `isDarkMode = true`
   - Registers a `change` event listener → updates `isDarkMode` whenever system theme changes
   - Cleanup: removes the listener on unmount
3. Returns `[isDarkMode, setIsDarkMode] as const` — caller can also toggle manually

## Inputs & Outputs
| Direction | Name | Type | Description |
|-----------|------|------|-------------|
| Input | `initialValue` | `boolean` | Optional fallback default (default `false`) |
| Output | `isDarkMode` | `boolean` | Current dark mode state |
| Output | `setIsDarkMode` | `Dispatch` | Manual override setter |

## Dependencies
- `react` — `useState`, `useEffect`

## Usage Sites
- `app/login/page.tsx` — `const [isDarkMode, setIsDarkMode] = useDarkMode(false)`
- `app/signup/page.tsx` — `const [isDarkMode, setIsDarkMode] = useDarkMode(false)`

## Known Limitations / TODOs
- `initialValue` passed as `false` by both callers — it's overridden immediately by the media query anyway
- Does not persist the user's manual toggle to `localStorage`
