# React + shadcn Integration Setup

This repository has now been migrated to a React + TypeScript + Tailwind + shadcn-compatible setup using Vite.

## Current Status

- React project structure: Present (`src/main.tsx`, `src/App.tsx`)
- TypeScript config: Present (`tsconfig.json`)
- Tailwind CSS config: Present (`tailwind.config.ts`, `postcss.config.cjs`, `src/index.css`)
- shadcn config: Present (`components.json`)

## Default Paths (shadcn)

- UI components: `/components/ui`
- Section/components: `/components/sections`
- Global styles:
  - Next.js App Router: `app/globals.css`
  - Vite React: `src/index.css`

## Why `/components/ui` matters

shadcn CLI expects a stable UI registry path for generated components and imports. Keeping `/components/ui`:

- keeps generated and custom UI in one predictable place,
- prevents path churn across imports,
- makes it easier to share/reuse UI primitives and run shadcn add/update commands.

## Run Commands

```bash
npm install
npm run dev
npm run build
npm run preview
```

## Integrated Component Files

- `components/ui/testimonials-columns-1.tsx`
- `components/ui/testimonial.tsx`
- `components/ui/design-testimonial.tsx`
- `components/ui/demo.tsx`
- `components/sections/portfolio-testimonials.tsx`
- `components/sections/demo.tsx`
- `lib/utils.ts`

## Portfolio Section Wiring

`components/sections/portfolio-testimonials.tsx` now renders the design testimonial component directly for the case studies section.
