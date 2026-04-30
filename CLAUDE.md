## Project

Zalo Mini App — UI only, no backend. All data mocked.
Package manager: _npm_

## Stack

- React 18, TypeScript, Vite, TailwindCSS v3
- React Router Dom v6, Zustand, react-icons
- zmp-sdk (Zalo SDK), zmp-ui (Zalo UI components)
- dayjs, clsx, tailwind-merge, react-calendar

## Commands

- `npm dev` — dev server (port 3000)
- `npm build` — production build
- `npm lint` — ESLint
- `npm fix` — ESLint autofix

---

## Folder Structure

```
src/
  app/shell/          # App shell wrapper (app-shell.tsx)
  config/theme/       # colors.css, colors.ts — design tokens
  css/                # app.scss — global CSS only
  guards/             # private-route.tsx
  layouts/            # main-layout.tsx, page-layout-context.tsx
  mocks/              # ALL mock data (never inside components)
  modules/            # Feature modules — own one feature end-to-end
                      # (appointment-detail, auth, booking-branch,
                      #  booking-services, booking-technician, gallery,
                      #  home, login, notifications, offers, profile,
                      #  promotions, services)
  pages/              # Route entry points only, thin wrappers
  routing/            # app-routes.tsx, paths.ts
  shared/components/  # Reusable UI components
  stores/             # Zustand stores: auth-store.ts, booking-store.ts
  utils/              # clsx.ts, format.ts, storage.ts, sleep.ts
```

---

## Architecture

_Pages vs Modules_

- `pages/` = import module only. Zero logic, zero JSX beyond the import.
- `modules/` = all feature logic, UI, hooks. Organized into multiple files — never one big file.
- Module main file = composition layer only (imports + assembles children).
- Split UI, business logic, hooks, and utilities into separate files when applicable.

_Components_

- Split into a new file when component exceeds ~100 lines.
- Shared/reusable → `src/shared/components/`.
- Feature-specific → inside its module folder.

_State_

- Zustand stores in `src/stores/`. Do NOT create new store files unless asked.
- Local UI state → `useState` inside component.

_Mock Data_

- Always in `src/mocks/`. Never hardcode data in components.
- No async/fetch simulation unless UI explicitly needs a loading state.

---

## Styling

- _Tailwind only_ — no inline styles, no new CSS files (except adding global variables).
- Conditional classes → `clsx` imported from `@/utils/clsx`.
- Colors → `src/config/theme/colors.ts`. Never hardcode hex values.
- Dark mode → `getSystemInfo` from `zmp-sdk`. NOT CSS media query.
- Mobile-first. Max viewport ~430px (Zalo Mini App constraint).

---

## Navigation

- `useNavigate`, `Link` from `react-router-dom` only.
- Route paths → always import from `src/routing/paths.ts`.
- NEVER use `window.location`, `history` API, or direct DOM manipulation.
- Zalo back button → handled in layouts. Do not re-implement.

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

## HARD CONSTRAINTS

- NO real API calls, fetch, axios, or any HTTP requests.
- NO new npm packages without explicit instruction.
- NO files outside `src/` (except existing config files).
- NO changes to `vite.config.mts`, `tailwind.config.js`, `tsconfig.json` unless asked.
- NO `window.location`, `history.push`, or direct DOM manipulation.
- UI text labels → **Vietnamese**. Code (variables, functions, types) → **English**.

---

## Before Creating Any File

1. Does a similar component already exist in `shared/components/`?
2. Does mock data belong in `src/mocks/` (not inside the component)?
3. Is the new module wired into the correct page in `pages/`?
4. Are new routes registered in `src/routing/app-routes.tsx` and `paths.ts`?

---

## Response Format

- Provide ONLY the files that change. Skip unchanged files.
- For edits: show the full updated file, not diffs.
- Code only. No explanations unless asked.
