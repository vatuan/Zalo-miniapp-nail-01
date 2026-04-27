# AI_SKILLS

## Skill 1: Add New Feature (Modules-First)
1. Create module at `src/modules/<feature>`.
2. Build feature UI/logic inside module files.
3. Export module API via `src/modules/<feature>/index.ts`.
4. Create route-entry page in `src/pages/<feature>-page.tsx` that imports module API only.
5. Register route in `src/routing/app-routes.tsx`.
6. Keep shared layer free of feature logic.

## Skill 2: Add New Page
1. Add path in `src/routing/paths.ts`.
2. Create or reuse module under `src/modules/<feature>`.
3. Create wrapper page in `src/pages/<feature>-page.tsx`.
4. Register wrapper page in `src/routing/app-routes.tsx`.
5. If tab route, update `src/mocks/navigation-tabs.ts`.

## Skill 3: Add New Store
1. If state is global/cross-module, create `src/stores/<name>-store.ts`.
2. If state is feature-only, keep it inside `src/modules/<feature>`.
3. Define explicit state/action types.
4. Use selectors in components to reduce rerenders.

## Skill 4: Create Mock Data
1. Add mock source in `src/mocks`.
2. Match expected backend contract shape.
3. Keep naming deterministic and versionable.
4. Connect module through mock adapter first.

## Skill 5: Implement Protected Routes
1. Define protected route path in `src/routing/paths.ts`.
2. Create/keep guard in `src/guards`.
3. Register protected route in `src/routing/app-routes.tsx`.
4. Keep auth gate UI in `src/modules/auth`, and page wrapper in `src/pages/auth-page.tsx`.

## Skill 6: Use Theme Colors With Tailwind (Mandatory)
1. Define color tokens in `src/config/theme/colors.css`.
2. Map tokens into `tailwind.config.js` under semantic names.
3. Use only mapped Tailwind classes in UI, e.g. `text-text-primary`, `bg-app-bg`, `border-card-border`.
4. Do not use raw color literals or arbitrary color classes (`text-[var(...)]`, `bg-[var(...)]`, `border-[var(...)]`).

## Skill 7: Compose Conditional Classes With clsx (Mandatory)
1. For conditional/multi-branch className, import `clsx` from `src/utils/clsx`.
2. Replace array `.join(' ')` and manual string concatenation with `clsx(...)`.
3. Keep static className as string literal; apply `clsx` only when needed.
4. During review/refactor, prioritize converting complex className logic to `clsx`.

## Skill 8: Follow Project Architecture
1. Respect boundaries in `AI_RULES.md`.
2. Keep `pages` as thin wrappers importing from `modules`.
3. Place feature behavior in module layer.
4. Keep root config/dependencies/tooling unchanged unless explicitly requested.
5. Validate with build/lint after refactor.
