# AI_RULES

## 1) Architecture Principles
- Follow modules-first architecture.
- Feature logic, UI flow, and local state must live in `src/modules/<feature>`.
- `src/pages` is route-entry layer only, and must import from modules.
- Build by composition: `app shell -> routing -> pages (entry) -> modules -> shared`.
- Keep existing tech stack and tooling unchanged: React, zmp-sdk, zmp-ui, react-router-dom, zustand, react-query.

## 2) Naming Conventions
- Files/folders: kebab-case (`home-page-module.tsx`, `private-route.tsx`).
- React components: PascalCase.
- Hooks: `useXxx`.
- Stores: `xxx-store.ts`.
- Route constants: `ROUTE_PATHS`.

## 3) Folder Boundaries
- `src/app`: app bootstrap and shell composition only.
- `src/routing`: route paths and route registration only.
- `src/pages`: route-entry wrappers only, no feature logic.
- `src/modules`: feature modules (UI, local hooks, module components, module state).
- `src/layouts`: layout frames shared by multiple pages.
- `src/shared/components`: reusable presentational components only.
- `src/stores`: truly global state (auth/app-wide), avoid feature workflow state here unless cross-module.
- `src/guards`: route access guards only.
- `src/mocks`: mock data/config for local-first development.
- `src/utils`: generic utility helpers only.
- `src/config/theme`: single source of truth for color system.

## 4) Pages and Modules Rules
- Each routable page in `src/pages` must render a module component from `src/modules`.
- No API calls, business logic, or complex UI assembly directly in `src/pages`.
- Module public API should be exposed via module `index.ts`.

## 5) Color System Rules (Mandatory)
- All colors must be defined in theme config files:
  - `src/config/theme/colors.css`
  - `tailwind.config.js`
- Never hardcode color values (`#hex`, `rgb`, `hsl`) in modules/pages/layouts/shared components.
- UI classes must use Tailwind color utilities from `tailwind.config.js`.
- Do not use arbitrary color classes like `text-[var(--...)]`, `bg-[var(--...)]`, `border-[var(--...)]`.
- When introducing a new color, define token in `colors.css`, map it in `tailwind.config.js`, then use mapped Tailwind class.

## 6) ClassName Composition Rules (Mandatory)
- If `className` is conditional or has multiple branches, use `clsx` from `src/utils/clsx`.
- Do not build complex class strings with manual concatenation, array `.join(' ')`, or nested ternary chains.
- Keep simple static className strings as plain string literals.

## 7) Component Rules
- Keep components small and single-purpose.
- Shared components must be business-agnostic.
- Do not call APIs directly from shared components.
- Prefer explicit props over hidden globals.

## 8) State Management Rules
- Use zustand for client/global state and lightweight module state.
- Use react-query for server state and async caching.
- Keep store shape minimal and explicit.
- Do not place feature-specific workflow logic in global store unless required by multiple modules.

## 9) Routing Rules
- Declare route paths in `src/routing/paths.ts`.
- Register routes in `src/routing/app-routes.tsx`.
- Route elements should point to `src/pages/*` wrappers.
- Wrap private routes with guards in `src/guards`.

## 10) Mock-First Development
- Start all new flows with mock data in `src/mocks`.
- Define expected API shape in mocks before backend integration.
- Connect module UI/state to mocks first, then replace adapter with real API.

## 11) Shared Layer Restriction
- No feature-specific business logic in `src/shared`.
- No module-specific constants in shared UI.

## 12) UI-First Before Backend
- Build route flow and module UI states first.
- Validate UX with placeholders/mocks.
- Integrate backend only after UI flow is stable.

## 13) Icon System Rules (Mandatory)
- All application icons must come from `react-icons`.
- Do not use emoji as UI icons in modules/pages/layouts/shared components.
- Do not use ZMP icon set (`<Icon icon="zi-...">`) for app feature UI icons.
- When adding icons, import only specific icon components from a chosen `react-icons` pack (no wildcard imports).
- If an icon is data-driven, store an `iconKey` in mocks/config and map `iconKey -> react-icons component` in UI layer.
