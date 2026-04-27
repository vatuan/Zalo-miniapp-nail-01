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

## 4) Pages and Modules Rules

- Each routable page in `src/pages` must render a module component from `src/modules`.
- No API calls, business logic, or complex UI assembly directly in `src/pages`.
- Module public API should be exposed via module `index.ts`.

## 5) Component Rules

- Keep components small and single-purpose.
- Shared components must be business-agnostic.
- Do not call APIs directly from shared components.
- Prefer explicit props over hidden globals.

## 6) State Management Rules

- Use zustand for client/global state and lightweight module state.
- Use react-query for server state and async caching.
- Keep store shape minimal and explicit.
- Do not place feature-specific workflow logic in global store unless required by multiple modules.

## 7) Routing Rules

- Declare route paths in `src/routing/paths.ts`.
- Register routes in `src/routing/app-routes.tsx`.
- Route elements should point to `src/pages/*` wrappers.
- Wrap private routes with guards in `src/guards`.

## 8) Mock-First Development

- Start all new flows with mock data in `src/mocks`.
- Define expected API shape in mocks before backend integration.
- Connect module UI/state to mocks first, then replace adapter with real API.

## 9) Shared Layer Restriction

- No feature-specific business logic in `src/shared`.
- No module-specific constants in shared UI.

## 10) UI-First Before Backend

- Build route flow and module UI states first.
- Validate UX with placeholders/mocks.
- Integrate backend only after UI flow is stable.
