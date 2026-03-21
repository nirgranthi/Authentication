# Button Components
Last updated: 2026-03-21

## Source File
`app/components/Buttons.jsx`

## Purpose
A collection of reusable, styled buttons including auth actions, theme toggles, and more.

## Exports
- `SignInButton` — Primary action button with loading state support.
- `DarkModeButton` — Toggle button for switching between dark/light themes.
- `ShowPasswordButton` — Icon button for toggling password visibility.

## Logic Summary
1. `SignInButton`:
   - Supports `isLoading` prop to show a spinner.
   - Uses Tailwind for consistent styling, hover, and active states.
   - Automatically adapts to dark mode.
2. `DarkModeButton`:
   - Switches icons based on `isDarkMode` state.
   - Triggers `setIsDarkMode` on click.
3. `ShowPasswordButton`:
   - Toggles visibility state for password inputs.

## Dependencies
- `EyeOffSvg`, `EyeSvg`, `MoonSvg`, `SunSvg` from `./SVGs`.

## Known Limitations / TODOs
- Button sizes are somewhat fixed via Tailwind classes.
