# Roofing Testimonial Cards - Full Copy/Paste Setup

This guide gives you everything needed to recreate the exact stacked roofing testimonial cards component in another project.

## 1) Install Dependencies

```bash
npm install react react-dom gsap lucide-react clsx tailwind-merge class-variance-authority
npm install -D typescript vite @vitejs/plugin-react tailwindcss postcss autoprefixer @types/react @types/react-dom @types/node
```

## 2) Project Structure

Create these files:

- package.json
- vite.config.ts
- tsconfig.json
- tsconfig.app.json
- tsconfig.node.json
- tailwind.config.js
- postcss.config.js
- components.json
- index.html
- src/index.css
- src/main.tsx
- src/App.tsx
- src/demo.tsx
- src/lib/utils.ts
- src/components/ui/glass-cards.tsx

## 3) File Contents

### package.json

```json
{
  "name": "components-test",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "lint": "eslint .",
    "preview": "vite preview"
  },
  "dependencies": {
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "gsap": "^3.15.0",
    "lucide-react": "^1.16.0",
    "react": "^19.2.6",
    "react-dom": "^19.2.6",
    "tailwind-merge": "^3.6.0"
  },
  "devDependencies": {
    "@eslint/js": "^10.0.1",
    "@types/node": "^24.12.3",
    "@types/react": "^19.2.14",
    "@types/react-dom": "^19.2.3",
    "@vitejs/plugin-react": "^6.0.1",
    "autoprefixer": "^10.5.0",
    "eslint": "^10.3.0",
    "eslint-plugin-react-hooks": "^7.1.1",
    "eslint-plugin-react-refresh": "^0.5.2",
    "globals": "^17.6.0",
    "postcss": "^8.5.15",
    "tailwindcss": "^3.4.17",
    "typescript": "~6.0.2",
    "typescript-eslint": "^8.59.2",
    "vite": "^8.0.12"
  }
}
```

### vite.config.ts

```ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
```

### tsconfig.json

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "files": [],
  "references": [
    { "path": "./tsconfig.app.json" },
    { "path": "./tsconfig.node.json" }
  ]
}
```

### tsconfig.app.json

```json
{
  "compilerOptions": {
    "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.app.tsbuildinfo",
    "target": "es2023",
    "lib": ["ES2023", "DOM"],
    "module": "esnext",
    "types": ["vite/client"],
    "skipLibCheck": true,
    "paths": {
      "@/*": ["./src/*"]
    },
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "verbatimModuleSyntax": true,
    "moduleDetection": "force",
    "noEmit": true,
    "jsx": "react-jsx",
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "erasableSyntaxOnly": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src"]
}
```

### tsconfig.node.json

```json
{
  "compilerOptions": {
    "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.node.tsbuildinfo",
    "target": "es2023",
    "lib": ["ES2023"],
    "module": "esnext",
    "types": ["node"],
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "verbatimModuleSyntax": true,
    "moduleDetection": "force",
    "noEmit": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "erasableSyntaxOnly": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["vite.config.ts"]
}
```

### tailwind.config.js

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

### postcss.config.js

```js
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

### components.json

```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "new-york",
  "rsc": false,
  "tsx": true,
  "tailwind": {
    "config": "tailwind.config.js",
    "css": "src/index.css",
    "baseColor": "zinc",
    "cssVariables": true,
    "prefix": ""
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui",
    "lib": "@/lib",
    "hooks": "@/hooks"
  }
}
```

### index.html

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>components-test</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

### src/index.css

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

html,
body,
#root {
  min-height: 100%;
}

body {
  margin: 0;
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    Segoe UI,
    Roboto,
    Helvetica,
    Arial,
    sans-serif;
  background: #0a0a0a;
}
```

### src/main.tsx

```tsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
```

### src/App.tsx

```tsx
import DefaultDemo from "./demo";

function App() {
  return <DefaultDemo />;
}

export default App;
```

### src/demo.tsx

```tsx
import React from "react";
import { StackedCards } from "@/components/ui/glass-cards";

export const DefaultDemo: React.FC = () => {
  return (
    <div style={{ minHeight: "100vh", background: "#0a0a0a" }}>
      <StackedCards />
    </div>
  );
};

export default DefaultDemo;
```

### src/lib/utils.ts

```ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface GlassCardItem {
  id: number;
  title: string;
  description: string;
  author: string;
  role: string;
  imageUrl: string;
}

export const cardData: GlassCardItem[] = [
  {
    id: 1,
    title: "Summit Peak Roofing - Hero Redesign",
    description:
      "I built a bold hero with full-width roof installation imagery, trust badges, and a high-contrast emergency call CTA. The company reported a clear lift in quote form submissions.",
    author: "Owner Testimony",
    role: "Summit Peak Roofing, Denver CO",
    imageUrl:
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1600&q=80",
  },
  {
    id: 2,
    title: "Ironclad Exteriors - Commercial Focus Hero",
    description:
      "This hero page was designed around flat-roof commercial projects with before-and-after visuals, service area highlights, and a streamlined lead capture section above the fold.",
    author: "Client Feedback",
    role: "Ironclad Exteriors, Dallas TX",
    imageUrl:
      "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1600&q=80",
  },
  {
    id: 3,
    title: "Blue Ridge Roofing Co. - Storm Repair Hero",
    description:
      "I created a storm-damage-focused hero featuring urgent messaging, financing highlights, and strong social proof. The layout was optimized for mobile-first emergency visitors.",
    author: "Marketing Manager Testimony",
    role: "Blue Ridge Roofing Co., Charlotte NC",
    imageUrl:
      "https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=1600&q=80",
  },
  {
    id: 4,
    title: "Coastal Shield Roofing - Premium Residential Hero",
    description:
      "For this project I delivered a clean premium hero with crew-at-work photography, neighborhood credibility messaging, and a modern CTA cluster for inspections and estimates.",
    author: "Founder Testimony",
    role: "Coastal Shield Roofing, Tampa FL",
    imageUrl:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80",
  },
];
```

### src/components/ui/glass-cards.tsx

```tsx
import React, { useEffect, useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { cardData } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

interface CardProps {
  id: number;
  title: string;
  description: string;
  author: string;
  role: string;
  imageUrl: string;
  index: number;
  totalCards: number;
}

const Card: React.FC<CardProps> = ({
  title,
  description,
  author,
  role,
  imageUrl,
  index,
  totalCards,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    const container = containerRef.current;
    if (!card || !container) return;

    const targetScale = 1 - (totalCards - index) * 0.05;

    gsap.set(card, {
      scale: 1,
      transformOrigin: "center top",
    });

    const trigger = ScrollTrigger.create({
      trigger: container,
      start: "top center",
      end: "bottom center",
      scrub: 1,
      onUpdate: (self) => {
        const progress = self.progress;
        const scale = gsap.utils.interpolate(1, targetScale, progress);

        gsap.set(card, {
          scale: Math.max(scale, targetScale),
          transformOrigin: "center top",
        });
      },
    });

    return () => {
      trigger.kill();
    };
  }, [index, totalCards]);

  return (
    <div
      ref={containerRef}
      style={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "sticky",
        top: 0,
      }}
    >
      <article
        ref={cardRef}
        style={{
          position: "relative",
          width: "min(95%, 1280px)",
          height: "min(74vh, 620px)",
          borderRadius: "34px",
          isolation: "isolate",
          top: `calc(-6vh + ${index * 26}px)`,
          transformOrigin: "top",
          overflow: "hidden",
          border: "1px solid rgba(255, 255, 255, 0.24)",
          boxShadow:
            "0 38px 70px rgba(0, 0, 0, 0.42), 0 0 0 1px rgba(255, 255, 255, 0.12) inset",
        }}
      >
        <img
          src={imageUrl}
          alt={title}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />

        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(90deg, rgba(10, 10, 10, 0.86) 0%, rgba(10, 10, 10, 0.76) 38%, rgba(10, 10, 10, 0.18) 72%, rgba(10, 10, 10, 0.05) 100%)",
          }}
        />

        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(circle at 18% 20%, rgba(255, 255, 255, 0.15) 0%, transparent 52%)",
          }}
        />

        <div
          style={{
            position: "relative",
            zIndex: 2,
            width: "min(92%, 560px)",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "clamp(1.25rem, 3vw, 2.4rem)",
            color: "#f4f4f5",
            gap: "1rem",
          }}
        >
          <p
            style={{
              margin: 0,
              fontSize: "0.83rem",
              textTransform: "uppercase",
              letterSpacing: "0.18em",
              color: "rgba(228, 228, 231, 0.95)",
              fontWeight: 700,
            }}
          >
            Roofing Website Testimony
          </p>

          <h2
            style={{
              margin: 0,
              fontSize: "clamp(2rem, 4.3vw, 3.25rem)",
              lineHeight: 1.06,
            }}
          >
            {title}
          </h2>

          <div
            style={{
              width: "100%",
              maxWidth: "300px",
              height: "1px",
              background: "rgba(255,255,255,0.24)",
            }}
          />

          <p
            style={{
              margin: 0,
              maxWidth: "40ch",
              color: "rgba(244, 244, 245, 0.92)",
              fontSize: "clamp(1rem, 2vw, 1.15rem)",
              lineHeight: 1.45,
            }}
          >
            {description}
          </p>

          <div style={{ marginTop: "0.3rem", display: "grid", gap: "0.15rem" }}>
            <strong style={{ fontSize: "1rem" }}>{author}</strong>
            <span
              style={{ color: "rgba(244,244,245,0.72)", fontSize: "0.92rem" }}
            >
              {role}
            </span>
          </div>

          <button
            type="button"
            style={{
              marginTop: "0.5rem",
              width: "fit-content",
              display: "inline-flex",
              alignItems: "center",
              gap: "0.85rem",
              border: "2px solid rgba(255, 255, 255, 0.85)",
              borderRadius: "9999px",
              background: "#f4f4f5",
              color: "#111827",
              padding: "0.36rem 0.36rem 0.36rem 1.3rem",
              fontWeight: 700,
              fontSize: "clamp(0.95rem, 2vw, 1.15rem)",
              cursor: "pointer",
            }}
          >
            View Details
            <span
              style={{
                width: "3rem",
                height: "3rem",
                borderRadius: "9999px",
                background: "#f97316",
                color: "#fff",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <ArrowUpRight size={24} />
            </span>
          </button>
        </div>
      </article>
    </div>
  );
};

export const StackedCards: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    gsap.fromTo(
      container,
      { opacity: 0 },
      {
        opacity: 1,
        duration: 1.2,
        ease: "power2.out",
      },
    );
  }, []);

  return (
    <main ref={containerRef} style={{ background: "#0a0a0a" }}>
      <section
        style={{
          height: "70vh",
          width: "100%",
          display: "grid",
          placeContent: "center",
          position: "relative",
          color: "#ffffff",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage:
              "linear-gradient(to right, rgba(79, 79, 79, 0.18) 1px, transparent 1px), linear-gradient(to bottom, rgba(79, 79, 79, 0.18) 1px, transparent 1px)",
            backgroundSize: "54px 54px",
            maskImage:
              "radial-gradient(ellipse 60% 50% at 50% 0%, #000 70%, transparent 100%)",
          }}
        />
        <h1
          style={{
            fontSize: "clamp(2rem, 5vw, 4rem)",
            fontWeight: "500",
            textAlign: "center",
            lineHeight: "1.2",
            padding: "0 2rem",
            position: "relative",
            zIndex: 1,
          }}
        >
          Roofing Website Projects and Hero Pages <br /> Scroll down!
        </h1>
      </section>

      <section
        style={{
          color: "#ffffff",
          width: "100%",
        }}
      >
        {cardData.map((card, index) => (
          <Card
            key={card.id}
            id={card.id}
            title={card.title}
            description={card.description}
            author={card.author}
            role={card.role}
            imageUrl={card.imageUrl}
            index={index}
            totalCards={cardData.length}
          />
        ))}
      </section>
    </main>
  );
};
```

## 4) Run It

```bash
npm run dev
```

## 5) Verify

- All 4 cards show images.
- Cards stack and scale while scrolling.
- Styling is neutral (no bright purple/pink highlights).
- Build succeeds:

```bash
npm run build
```
