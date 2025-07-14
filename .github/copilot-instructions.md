# Copilot Instructions for Social Seed

## Core Commands

- **Development:**
  - `npm run dev` — Main app/dev server (requires Node v20.18.2)
  - `npm run dev:signedIn`, `npm run dev:dataSource-prod`, `npm run dev:onlyApp`, `npm run dev:for-testing` — Variants for different data sources and auth
  - `npm run dev:nextjs` — Next.js dev server
- **Build & Serve:**
  - `npm run build` — Build app
  - `npm run serve` — Serve built app
  - `npm run build-and-serve` — Build then serve
- **Lint & Format:**
  - `npm run tests:lint` — Lint (ESLint)
  - `npm run prettify` — Prettier formatting
- **Type Checking:**
  - `npm run tests:ts-types` — TypeScript check
- **Testing:**
  - `npm run tests:vitest:dev` — Unit tests (Vitest, watch)
  - `npm run tests:vitest:ci` — Unit tests (CI)
  - `npm run tests:playwright:dev` — Playwright (E2E, watch)
  - `npm run tests:playwright:single:test` — Single Playwright test
  - `npm run tests:all` — All checks (type, lint, unit, build)
- **Storybook:**
  - `npm run storybook:dev` — Storybook dev
  - `npm run storybook:test:run` — Storybook tests
- **Supabase:**
  - `npm run supabase:start|stop|status` — Local Supabase
  - `npm run supabase:database:reset` — Reset DB
  - `npm run supabase:database:generateDevDatabase` — Seed dev DB
- **Firebase Functions:**
  - `npm run functions:dev|build|deploy` — Firebase functions
- **CMS/Prismic:**
  - `npm run prismic:slicemachine:dev` — Slice Machine
  - `npm run prismic:login|update` — Prismic CLI
- **Helpers:**
  - `npm run helpers:*` — Asset, icon, dependency, folder, and image utilities

## High-Level Architecture

- **Monorepo** with main app, Firebase functions, Roblox plugin, and devtools
- **Frontend:** Next.js, React, @useweb/ui, Storybook
- **Backend/Serverless:** Firebase Functions, Supabase (Postgres)
- **CMS:** Prismic (Slice Machine)
- **Testing:** Vitest (unit), Playwright (E2E), Storybook
- **External APIs:** Roblox, Stripe, Discord, Notion, Google, Posthog
- **Helpers/Devtools:** Scripts for build, prepare, asset generation, etc.
- **Roblox Plugin:** Separate package with TypeScript, Argon, roblox-ts

## Repo-Specific Style Rules

- **General:**
  - Use TypeScript everywhere
  - Use `type` imports for types
  - Prefer named exports for types, default for functions/components
  - Use `@useweb/assert` for runtime prop validation
  - Use `cross-fetch` for HTTP requests (not `fetch`)
  - Use `.eq('field' satisfies keyof Schema, value satisfies Schema['field'])` for Supabase queries
  - Always use objects as function arguments named `props`
  - Use maps/forEach, not for-loops
  - Only one variable in if statements
  - Return values in variable declarations, not directly in return
  - Throw errors with a `cause` object including `publicErrorMessage`
  - Place function files in folders named after the function
- **React Components:**
  - Style with `sx` prop, use CSS grid
  - Use `@useweb/ui` components for UI (Text, Box, Button, Image, Link)
  - Add `data-id` prop to root element (component name)
  - Use `src/lib/components/dataDisplay/charts/types/LineChart/LineChart.tsx` for line charts
- **Formatting:**
  - Prettier and ESLint enforced
  - Use `{}`[] for array types
  - Props type: `${FunctionName}Props` (PascalCase)
  - Export all props types

## Roblox Plugin

- Build: `npm run roblox:plugin:build`
- Dev: `npm run roblox:plugin:dev`
- Studio: `npm run roblox:plugin:studio:open`

## Node/Tooling

- Node v20.18.2 required (see README)
- Use `nvm alias default v20.18.2` if using nvm

## References

- See `.github/instructions/javascript.instructions.md` for detailed JS/TS and React rules
- See package.json scripts for more commands
- See README.md for quickstart

## Stubs

- use placehold.co for placeholder images
