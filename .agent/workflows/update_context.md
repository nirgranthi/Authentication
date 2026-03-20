---
description: How to maintain the AI context folder and API_OVERVIEW.md
---

# Context Maintenance Workflow

> This workflow is **mandatory** for every agent working on the authentication project.
> The `ai-context/` folder at the project root is the single source of truth agents should read
> before scraping any raw source file. It must be kept in sync with the actual codebase.

---

## Rule A — On File Read (Scraping)

Whenever you read any source file for the first time in a session:

1. Check `ai-context/INDEX.md` to see if a context doc already exists for that file.
2. **If it exists** → read the context doc instead of re-reading the raw file (unless you need the exact current source for an edit).
3. **If it does NOT exist** → read the raw file, then immediately create the matching context doc under `ai-context/`:
   - API routes → `ai-context/api/<routeName>.md`
   - Models → `ai-context/models/<modelName>.md`
   - Lib utilities → `ai-context/lib/<fileName>.md`
   - Scripts → `ai-context/scripts/<fileName>.md`
   - Pages → `ai-context/pages/<pageName>.md`
   - Hooks → `ai-context/hooks/<hookName>.md`
   - Components → `ai-context/components/<componentName>.md`
4. Add the new entry to `ai-context/INDEX.md` (module name, file path, context doc path, date).

**Context doc format** — use this shape for every new doc:

```
# <Module Name>
Last updated: YYYY-MM-DD

## Source File
`<relative path to source file>`

## Purpose
One-sentence summary of what this file does.

## Exports
- `<export name>` — <what it is / does>

## Logic Summary
Bullet-by-bullet walkthrough of the main logic flow.

## Inputs & Outputs
| Direction | Name | Type | Description |
|-----------|------|------|-------------|
| Input  | ...  | ...  | ...         |
| Output | ...  | ...  | ...         |

## Dependencies
- `<import>` from `<path>` — why it is used

## Known Limitations / TODOs
- ...
```

---

## Rule B — On Logic Change

Whenever you add, remove, or change **any logic** in a source file:

1. Update the matching `ai-context/` context doc to reflect the new state.
2. If the changed file is **an API route**, also update `app/api/API_OVERVIEW.md`:
   - Update the route's bullet tree to reflect new inputs, outputs, or flow.
   - Add/remove future insertion points if relevant.
3. Update the `Last updated:` date in the context doc.

---

## Rule C — New Script in `app/scripts/`

Whenever a new utility script is added to `app/scripts/`:

1. Create `ai-context/scripts/<fileName>.md` using the standard format above.
2. Register it in `ai-context/INDEX.md`.
3. Note which routes or pages import it under "Dependencies" in their own context docs.

---

## Rule D — New API Route

Whenever a new file is created under `app/api/`:

1. Create `ai-context/api/<routeName>.md` using the standard format.
2. Register it in `ai-context/INDEX.md`.
3. Add a new entry block (with inputs, outputs, and future insertion points) to `app/api/API_OVERVIEW.md`.

---

## Quick Reference — File → Context Doc Mapping

| Source File | Context Doc |
|---|---|
| `app/api/auth/[...nextauth]/route.ts` | `ai-context/api/auth.md` |
| `app/api/signup/route.ts` | `ai-context/api/signup.md` |
| `app/api/checkUserExists/route.ts` | `ai-context/api/checkUserExists.md` |
| `models/user.ts` | `ai-context/models/user.md` |
| `lib/mongodb.ts` | `ai-context/lib/mongodb.md` |
| `app/scripts/encrypt.ts` | `ai-context/scripts/encrypt.md` |
| `app/scripts/isEmail.ts` | `ai-context/scripts/isEmail.md` |
| `app/login/page.tsx` | `ai-context/pages/login.md` |
| `app/signup/page.tsx` | `ai-context/pages/signup.md` |
| `app/hooks/useDarkMode.ts` | `ai-context/hooks/useDarkMode.md` |
