# CLAUDE.md

## Project Overview

Zalo Mini App — UI-only, no real backend. All data is mocked.
Stack: React 18,Reat Router Dom, TypeScript, Vite, TailwindCSS, Zustand, react-icons, zmp-sdk (Zalo SDK).

---

## Folder Structure

```
src/
  app/shell/        # App shell wrapper (app-shell.tsx)
  config/theme/     # colors.css, colors.ts — global design tokens
  css/              # app.scss — global CSS variables/classes only
  guards/           # private-route.tsx — wraps auth-required routes
  layouts/          # main-layout.tsx, page-layout-context.tsx
  mocks/            # ALL mock data lives here (branch, home, navigation, service)
  modules/          # Feature modules imported into pages
                    # (appointment-detail, auth, booking-branch,
                    #  booking-services, booking-technician, gallery,
                    #  home, login, notifications, offers, profile,
                    #  promotions, services)
  pages/            # Route-level components only — thin wrappers for modules
  routing/          # app-routes.tsx, paths.ts
  shared/components/# Reusable UI: bottom-navigation, page-header,
                    # skeleton-loader, booking-progress-bar, etc.
  stores/           # Zustand stores: auth-store.ts, booking-store.ts
  utils/            # clsx.ts, format.ts, storage.ts, sleep.ts
```

---

## Architecture Rules

**Pages vs Modules**

- `pages/` = route entry points only. No logic, no JSX beyond importing a module.
- `modules/` = all feature logic and UI. Each module owns one feature end-to-end.

**Components**

- Split into a new file when component exceeds ~100 lines.
- Shared/reusable → `src/shared/components/`.
- Feature-specific → inside its module folder.

**State**

- Zustand stores in `src/stores/`. Do NOT create new store files unless asked.
- Local UI state → `useState` inside component.

**Mock Data**

- All mock data in `src/mocks/`. Never hardcode data inside components.
- Import mocks directly; do not simulate fetch/async unless UI explicitly needs loading state.

---

## Styling Rules

- **Tailwind only** — no inline styles, no new CSS files unless adding a global variable.
- Conditional classnames → use `clsx` imported from `@/utils/clsx`.
- Dark mode → detect via `getSystemInfo` from `zmp-sdk`, not media query.
- Mobile-first, max viewport width ~430px (Zalo Mini App constraint).
- Color tokens defined in `src/config/theme/colors.ts` — use them, don't hardcode hex.

---

## Navigation

- Use `react-router-dom` (`useNavigate`, `Link`) for all routing.
- Route paths defined in `src/routing/paths.ts` — always import from there.
- Never use `window.location` or `history` API directly.
- Zalo back button → handled in layouts, do not re-implement.

---

## Naming Conventions

| Type       | Convention             | Example                      |
| ---------- | ---------------------- | ---------------------------- |
| Component  | PascalCase             | `BookingCard.tsx`            |
| Page       | PascalCase + Page      | `ServicesPage.tsx`           |
| Hook       | camelCase + use prefix | `useAuthStore.ts`            |
| Util/Store | camelCase              | `format.ts`, `auth-store.ts` |
| Mock file  | kebab-case + -data     | `service-data.ts`            |

---

## Hard Constraints (Never Do)

- No real API calls, no fetch, no axios, no HTTP requests.
- No new npm packages without explicit instruction.
- No files outside `src/` except config files that already exist.
- No changes to `vite.config.mts`, `tailwind.config.js`, `tsconfig.json` unless asked.
- No `window.location`, `history.push`, or direct DOM manipulation.
- UI text labels in **Vietnamese**. Code (variables, functions, types) in **English**.

---

## File Creation Checklist

Before creating any file, confirm:

1. Does a similar component already exist in `shared/components/`?
2. Does mock data belong in `src/mocks/` (not inside the component)?
3. Is the new module wired into the correct page in `pages/`?
4. Are new routes registered in `src/routing/app-routes.tsx` and `paths.ts`?

---

## Response Format for Code Tasks

- Provide only the files that change. Skip unchanged files.
- For edits: show the full updated file, not diffs.
- No explanations unless asked. Code only.
