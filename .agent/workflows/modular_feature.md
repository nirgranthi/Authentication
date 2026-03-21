---
description: Instruct agents to implement features in a modular, easily removable, and re-addable way.
---
# Modular Feature Implementation

To maintain long-term code health and project flexibility, all new features MUST be implemented following these modular design principles. A feature is considered modular if it can be "unplugged" (removed or disabled) and "plugged back in" (re-added) with minimal changes to the core application logic.

## 📋 Guidelines for Modular Features

### 1. Dedicated Directory Structure
- Place all feature-specific files within a dedicated subdirectory (e.g., `lib/features/[feature-name]/` or `components/[feature-name]/`).
- Group related hooks, utils, and types together with the feature.

### 2. Centralized Entry Points
- Use a single entry point (like an `index.ts` file) to export the feature's interface to the rest of the application.
- Core files (like `layout.tsx` or `page.tsx`) should only import from this entry point.

### 3. Separation of Concerns
- **UI Components**: Keep them stateless where possible. Use specific props for data instead of direct global state access if it makes the component less reusable.
- **Business Logic**: Encapsulate logic in custom hooks or utility functions within the feature's directory.
- **APIs**: Implement dedicated API route handlers that are independent of other features.

### 4. Minimal Core Integration
- Avoid tight coupling with the main authentication or layout logic.
- If a feature requires integration into a shared component (e.g., a Sidebar or Navbar), use a clean, easily-removable import or a plugin-style registration if the architecture supports it.

### 5. Seamless Removal/Addition
- The feature should be removable by deleting its folder and removing its single import/entry point in the core application.
- The build should not break if the feature folder is missing (ensure imports are handled or commented out during the removal process).

## ✅ Verification Step
Before finalizing a feature:
1. **Unplug test**: Comment out the feature's entry point/imports. Verify that the rest of the application still builds and runs correctly.
2. **Re-plug test**: Uncomment the entry point. Verify that the feature is fully restored and functional.
