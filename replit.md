# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/api-server run dev` — run API server locally

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.

## Artifacts

- **glam-studio** (`artifacts/glam-studio`, `/`) — Soft-luxury beauty parlour landing page for "Glam Studio". React + Vite + Tailwind, with a Three.js 3D background of floating cosmetic objects (lipstick, nail polish, compact, brush, foundation bottle, eyeshadow palette, mascara, hair cream jar, hair dryer, pearls, gold dust). Mobile-first, hamburger nav, framer-motion reveals, WhatsApp booking CTA. The 3D background gracefully no-ops when WebGL isn't available.
