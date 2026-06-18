# CasAI — Plan 1: Foundation + Homepage Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Bootstrap a Next.js 15 + Tailwind v4 + next-intl multilingual site for `casai.followtheflowai.com` (brand: **CasAI**) with the "Maison Mediterranean" design system, layout chrome (NavBar/Footer), and a deployable homepage. Ship a presentable demo skeleton ready for listings (Plan 2) and voice agent (Plan 3).

**Architecture:** App Router with locale segment `[locale]` (EN default no-prefix, IT, ES). `next-intl` provides routing + per-request message loading; middleware auto-detects locale. Tailwind v4 with CSS-first `@theme` config holds the design tokens; `next/font/google` loads Cormorant Garamond (display) + Inter (body). Pure-visual components verified via dev server in browser; lint + typecheck + production build gate every commit.

**Tech Stack:** Next.js 15, React 19, TypeScript 5 (strict), Tailwind CSS v4, next-intl 4.x, framer-motion 12, next/font, Node 22.

---

## File Structure (target after Plan 1 complete)

```
RealEstateAgency_web/
├── package.json
├── tsconfig.json
├── next.config.ts
├── postcss.config.mjs
├── eslint.config.mjs
├── .env.example
├── public/
│   ├── images/
│   │   └── hero-poster.jpg          (placeholder, replaced in Task 14)
│   └── og-image.jpg                 (placeholder, replaced in Task 19)
├── docs/
│   ├── design-research.md           (already exists)
│   └── superpowers/plans/2026-06-16-foundation-and-homepage.md  (this file)
└── src/
    ├── middleware.ts                (next-intl middleware)
    ├── i18n/
    │   ├── routing.ts               (locale + defaultLocale)
    │   └── request.ts               (getRequestConfig - message loader)
    ├── messages/
    │   ├── en.json
    │   ├── it.json
    │   └── es.json
    ├── app/
    │   ├── globals.css              (tailwind import + @theme tokens)
    │   ├── layout.tsx               (root html — minimal)
    │   └── [locale]/
    │       ├── layout.tsx           (NextIntlClientProvider, NavBar, Footer, metadata)
    │       ├── page.tsx             (homepage)
    │       └── not-found.tsx
    ├── components/
    │   ├── layout/
    │   │   ├── NavBar.tsx
    │   │   ├── Footer.tsx
    │   │   └── LocaleSwitcher.tsx
    │   ├── ui/
    │   │   ├── Container.tsx
    │   │   ├── Eyebrow.tsx
    │   │   └── Button.tsx
    │   └── home/
    │       ├── Hero.tsx
    │       ├── FeaturedListings.tsx
    │       ├── NeighborhoodEditorial.tsx
    │       └── ConciergeBanner.tsx
    └── lib/
        ├── brand.ts                 (CasAI constants, FTFAI link)
        └── nav.ts                   (nav items, social links)
```

**Files responsibility map:**
- `src/i18n/routing.ts` — single source of truth for locales and routing config; imported by middleware, request config, and link helpers
- `src/i18n/request.ts` — loads the right messages JSON per request
- `src/messages/*.json` — translation strings; namespaced by feature (`nav`, `home`, `footer`, `meta`)
- `src/app/[locale]/layout.tsx` — wraps every locale page with provider, fonts, NavBar/Footer
- `src/components/ui/*` — primitives only, no business logic
- `src/components/home/*` — homepage sections; each section consumes `useTranslations("home")` and renders one self-contained visual block
- `src/lib/brand.ts` — brand constants (name, tagline per locale, FTFAI link), used wherever the brand surfaces

---

## Verification Primitives (used throughout the plan)

This plan uses these commands repeatedly. Each task's verification steps reference them by name:

| Name | Command | Pass criteria |
|---|---|---|
| **TYPECHECK** | `npx tsc --noEmit` | exit 0, no errors |
| **LINT** | `npm run lint` | exit 0, no errors |
| **BUILD** | `npm run build` | exit 0, all routes compile |
| **DEV** | `npm run dev` (background) | starts on `http://localhost:3000` |
| **VISIT** *URL* | open browser at URL | manual visual check matches description |

For UI tasks the contract is: write code → DEV + VISIT to verify visual → TYPECHECK + LINT to verify static → commit.

---

## Tasks

### Task 1: Bootstrap Next.js 15 project

**Files:**
- Create: `package.json`, `tsconfig.json`, `next.config.ts`, `postcss.config.mjs`, `eslint.config.mjs`, `src/app/layout.tsx`, `src/app/page.tsx`, `src/app/globals.css`, `public/*` (default), `.gitignore` (merge with existing)

- [ ] **Step 1: Confirm repo is clean and main branch**

Run: `git status && git branch --show-current`
Expected: `working tree clean` and `main`

- [ ] **Step 2: Run create-next-app in current directory**

The project root already exists (with `CLAUDE.md`, `docs/`, `.git/`). Bootstrap into the **same directory** with explicit flags so we don't get a nested folder.

Run:
```bash
npx -y create-next-app@latest . \
  --typescript --eslint --tailwind --app --src-dir \
  --import-alias "@/*" --turbopack \
  --use-npm --yes
```

Expected: prompts answered automatically, files generated. `create-next-app` may complain that the dir is non-empty — pass `--yes` and it will keep existing files. If it still refuses, run:
```bash
npx -y create-next-app@latest ./_bootstrap_tmp \
  --typescript --eslint --tailwind --app --src-dir \
  --import-alias "@/*" --turbopack --use-npm --yes \
  && rsync -av --exclude=.git --exclude=CLAUDE.md --exclude=docs ./_bootstrap_tmp/ ./ \
  && rm -rf ./_bootstrap_tmp
```

- [ ] **Step 3: Verify Next.js scaffold runs**

Run: `npm run dev` (background) then VISIT `http://localhost:3000`
Expected: default Next.js welcome page renders. Stop the dev server.

- [ ] **Step 4: Merge .gitignore (preserve existing rules)**

Open `.gitignore` and ensure it contains BOTH the Next.js defaults AND the existing project rules. Final content must include these blocks:

```gitignore
# dependencies
/node_modules
/.pnp
.pnp.*
.yarn/*
!.yarn/patches
!.yarn/plugins
!.yarn/releases
!.yarn/versions

# testing
/coverage

# next.js
/.next/
/out/

# production
/build

# misc
.DS_Store
*.pem

# debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*
.pnpm-debug.log*

# env files (can opt-in for committing if needed)
.env*

# vercel
.vercel

# typescript
*.tsbuildinfo
next-env.d.ts

# project-specific
.secrets/
.claude/
```

- [ ] **Step 5: Verify build still works**

Run: BUILD
Expected: build succeeds.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "$(cat <<'EOF'
Bootstrap progetto Next.js 15

- create-next-app con TypeScript, ESLint, Tailwind v4, App Router, src/, Turbopack
- .gitignore esteso con regole progetto (.secrets, .claude)
- Build di base verificata
EOF
)"
```

---

### Task 2: Install i18n and animation dependencies

**Files:**
- Modify: `package.json` (deps added)

- [ ] **Step 1: Install next-intl and framer-motion**

Run:
```bash
npm install next-intl@^4 framer-motion@^12
```

Expected: both packages added, lockfile updated.

- [ ] **Step 2: Verify versions installed**

Run: `npm list next-intl framer-motion --depth=0`
Expected: `next-intl@4.x.x` and `framer-motion@12.x.x` listed.

- [ ] **Step 3: TYPECHECK + BUILD**

Expected: both pass.

- [ ] **Step 4: Commit**

```bash
git add package.json package-lock.json
git commit -m "$(cat <<'EOF'
Aggiunte dipendenze next-intl e framer-motion

- next-intl@4 per multi-lingua EN/IT/ES con App Router
- framer-motion@12 per micro-animazioni della homepage
EOF
)"
```

---

### Task 3: Enforce TypeScript strict mode and verify

**Files:**
- Modify: `tsconfig.json`

- [ ] **Step 1: Read current tsconfig**

Run: `cat tsconfig.json`
Expected output shows current compiler options.

- [ ] **Step 2: Ensure `"strict": true` and add safety flags**

Edit `tsconfig.json` so `compilerOptions` includes ALL of these (merge with existing keys, don't replace whole file):

```json
{
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "noImplicitOverride": true,
    "noFallthroughCasesInSwitch": true,
    "forceConsistentCasingInFileNames": true
  }
}
```

Keep `target`, `lib`, `paths`, `plugins`, and all other defaults written by `create-next-app`.

- [ ] **Step 3: TYPECHECK**

Expected: exit 0.

- [ ] **Step 4: Commit**

```bash
git add tsconfig.json
git commit -m "$(cat <<'EOF'
TypeScript strict mode con safety flags

- noUncheckedIndexedAccess, noImplicitOverride, noFallthroughCasesInSwitch
- forceConsistentCasingInFileNames per consistency cross-OS
EOF
)"
```

---

### Task 4: Define i18n routing config

**Files:**
- Create: `src/i18n/routing.ts`

- [ ] **Step 1: Create the routing config**

Create `src/i18n/routing.ts` with this exact content:

```ts
import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "it", "es"] as const,
  defaultLocale: "en",
  localePrefix: "as-needed",
});

export type Locale = (typeof routing.locales)[number];
```

`localePrefix: "as-needed"` means EN URLs have NO prefix (`/`, `/about`), IT/ES URLs do (`/it/...`, `/es/...`). This matches the spec in CLAUDE.md.

- [ ] **Step 2: TYPECHECK**

Expected: exit 0.

- [ ] **Step 3: Commit**

```bash
git add src/i18n/routing.ts
git commit -m "$(cat <<'EOF'
Config routing i18n con next-intl

- 3 locale: en (default, no prefix), it, es
- localePrefix as-needed: EN servito su / senza /en
- Type Locale esportato per uso nei componenti
EOF
)"
```

---

### Task 5: Create message files (en, it, es) with homepage and shared keys

**Files:**
- Create: `src/messages/en.json`, `src/messages/it.json`, `src/messages/es.json`

- [ ] **Step 1: Create `src/messages/en.json`**

```json
{
  "meta": {
    "title": "CasAI — Curated estates. AI concierge.",
    "description": "Boutique homes in Milan, Mallorca, and London — discovered, toured, and booked with an AI concierge that never sleeps."
  },
  "nav": {
    "listings": "Listings",
    "neighborhoods": "Neighborhoods",
    "story": "Our story",
    "contact": "Contact",
    "switchLocale": "Language"
  },
  "home": {
    "heroEyebrow": "Boutique real estate · Powered by AI",
    "heroTitle": "Curated estates. AI concierge.",
    "heroSubtitle": "From a Brera attic to a Mallorcan finca to a Mayfair townhouse — discover homes worth the journey, and book a viewing in seconds.",
    "heroPrimaryCta": "Browse the collection",
    "heroSecondaryCta": "Speak to the concierge",
    "featuredEyebrow": "This week's selection",
    "featuredTitle": "Three cities, one private selection",
    "featuredSubtitle": "Each property in our portfolio is personally previewed by our team and verified by our AI concierge.",
    "neighborhoodEyebrow": "Editorial",
    "neighborhoodTitle": "Where the world lives well",
    "neighborhoodBody": "Milan, Mallorca, and Prime Central London — three places we know street by street. Read what our concierge knows about your future address.",
    "neighborhoodMilanTag": "Milan",
    "neighborhoodMallorcaTag": "Mallorca",
    "neighborhoodLondonTag": "London",
    "conciergeEyebrow": "Always on",
    "conciergeTitle": "A concierge that answers at 3 a.m.",
    "conciergeBody": "Ask about square meters, sun exposure, or whether the lift reaches the cellar — our AI concierge knows every detail of every listing, in your language.",
    "conciergeCta": "Start a conversation"
  },
  "footer": {
    "tagline": "Boutique homes, AI concierge.",
    "navHeading": "Browse",
    "legalHeading": "Legal",
    "legalImprint": "Imprint",
    "legalPrivacy": "Privacy",
    "legalTerms": "Terms",
    "credit": "A Follow The Flow AI showcase.",
    "creditLinkLabel": "Discover the technology"
  }
}
```

- [ ] **Step 2: Create `src/messages/it.json`**

```json
{
  "meta": {
    "title": "CasAI — Dimore selezionate. Concierge AI.",
    "description": "Case boutique a Milano, Maiorca e Londra — scoperte, visitate e prenotate con un concierge AI che non dorme mai."
  },
  "nav": {
    "listings": "Immobili",
    "neighborhoods": "Quartieri",
    "story": "Chi siamo",
    "contact": "Contatti",
    "switchLocale": "Lingua"
  },
  "home": {
    "heroEyebrow": "Immobiliare boutique · Powered by AI",
    "heroTitle": "Dimore selezionate. Concierge AI.",
    "heroSubtitle": "Da un attico in Brera a una finca maiorchina a una townhouse di Mayfair — scopri case che valgono il viaggio e prenota una visita in pochi secondi.",
    "heroPrimaryCta": "Esplora la collezione",
    "heroSecondaryCta": "Parla con il concierge",
    "featuredEyebrow": "Selezione della settimana",
    "featuredTitle": "Tre città, una selezione privata",
    "featuredSubtitle": "Ogni immobile del nostro portfolio è visionato di persona dal nostro team e verificato dal concierge AI.",
    "neighborhoodEyebrow": "Editoriale",
    "neighborhoodTitle": "Dove si vive bene nel mondo",
    "neighborhoodBody": "Milano, Maiorca, Londra Prime Central — tre luoghi che conosciamo strada per strada. Leggi cosa sa il nostro concierge del tuo futuro indirizzo.",
    "neighborhoodMilanTag": "Milano",
    "neighborhoodMallorcaTag": "Maiorca",
    "neighborhoodLondonTag": "Londra",
    "conciergeEyebrow": "Sempre attivo",
    "conciergeTitle": "Un concierge che risponde alle 3 di notte",
    "conciergeBody": "Chiedi metri quadri, esposizione al sole, se l'ascensore arriva in cantina — il nostro concierge AI conosce ogni dettaglio di ogni immobile, nella tua lingua.",
    "conciergeCta": "Inizia una conversazione"
  },
  "footer": {
    "tagline": "Case boutique, concierge AI.",
    "navHeading": "Esplora",
    "legalHeading": "Legale",
    "legalImprint": "Note legali",
    "legalPrivacy": "Privacy",
    "legalTerms": "Termini",
    "credit": "Una vetrina di Follow The Flow AI.",
    "creditLinkLabel": "Scopri la tecnologia"
  }
}
```

- [ ] **Step 3: Create `src/messages/es.json`**

```json
{
  "meta": {
    "title": "CasAI — Propiedades selectas. Concierge AI.",
    "description": "Casas boutique en Milán, Mallorca y Londres — descubiertas, visitadas y reservadas con un concierge AI que nunca duerme."
  },
  "nav": {
    "listings": "Propiedades",
    "neighborhoods": "Barrios",
    "story": "Quiénes somos",
    "contact": "Contacto",
    "switchLocale": "Idioma"
  },
  "home": {
    "heroEyebrow": "Inmobiliaria boutique · Powered by AI",
    "heroTitle": "Propiedades selectas. Concierge AI.",
    "heroSubtitle": "Desde un ático en Brera hasta una finca mallorquina o una townhouse de Mayfair — descubre casas que merecen el viaje y reserva una visita en segundos.",
    "heroPrimaryCta": "Explora la colección",
    "heroSecondaryCta": "Habla con el concierge",
    "featuredEyebrow": "Selección de la semana",
    "featuredTitle": "Tres ciudades, una selección privada",
    "featuredSubtitle": "Cada propiedad de nuestro portfolio es visitada en persona por nuestro equipo y verificada por el concierge AI.",
    "neighborhoodEyebrow": "Editorial",
    "neighborhoodTitle": "Donde el mundo vive bien",
    "neighborhoodBody": "Milán, Mallorca y Londres Prime Central — tres lugares que conocemos calle por calle. Lee lo que nuestro concierge sabe de tu futura dirección.",
    "neighborhoodMilanTag": "Milán",
    "neighborhoodMallorcaTag": "Mallorca",
    "neighborhoodLondonTag": "Londres",
    "conciergeEyebrow": "Siempre activo",
    "conciergeTitle": "Un concierge que responde a las 3 de la madrugada",
    "conciergeBody": "Pregunta metros cuadrados, orientación al sol, si el ascensor llega al sótano — nuestro concierge AI conoce cada detalle de cada propiedad, en tu idioma.",
    "conciergeCta": "Inicia una conversación"
  },
  "footer": {
    "tagline": "Casas boutique, concierge AI.",
    "navHeading": "Explora",
    "legalHeading": "Legal",
    "legalImprint": "Aviso legal",
    "legalPrivacy": "Privacidad",
    "legalTerms": "Términos",
    "credit": "Un escaparate de Follow The Flow AI.",
    "creditLinkLabel": "Descubre la tecnología"
  }
}
```

- [ ] **Step 4: Verify all three JSON files parse**

Run: `node -e "['en','it','es'].forEach(l => JSON.parse(require('fs').readFileSync('src/messages/'+l+'.json')))"`
Expected: no output, exit 0.

- [ ] **Step 5: Commit**

```bash
git add src/messages/
git commit -m "$(cat <<'EOF'
Stringhe traduzioni per EN, IT, ES

- Namespace: meta, nav, home, footer
- IT/ES seguono sentence case (regola progetto), EN usa Title Case sui titoli
- Tagline brand CasAI declinata nelle 3 lingue
EOF
)"
```

---

### Task 6: Wire next-intl request config and middleware

**Files:**
- Create: `src/i18n/request.ts`, `src/middleware.ts`
- Modify: `next.config.ts`

- [ ] **Step 1: Create `src/i18n/request.ts`**

```ts
import { getRequestConfig } from "next-intl/server";
import { hasLocale } from "next-intl";
import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested) ? requested : routing.defaultLocale;

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
```

- [ ] **Step 2: Create `src/middleware.ts`**

```ts
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
```

- [ ] **Step 3: Wire next-intl plugin in `next.config.ts`**

Replace the contents of `next.config.ts` with:

```ts
import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default withNextIntl(nextConfig);
```

- [ ] **Step 4: TYPECHECK**

Expected: exit 0.

- [ ] **Step 5: Commit**

```bash
git add src/i18n/request.ts src/middleware.ts next.config.ts
git commit -m "$(cat <<'EOF'
Pipeline next-intl: middleware + request config + plugin

- Middleware: redirect auto-detect lingua, match tutto tranne assets/api
- request.ts: caricamento messages JSON per locale
- next.config: plugin next-intl, formati immagine AVIF/WebP, remote Unsplash
EOF
)"
```

---

### Task 7: Move app routes under `[locale]` and verify all three locales render

**Files:**
- Create: `src/app/[locale]/layout.tsx`, `src/app/[locale]/page.tsx`, `src/app/[locale]/not-found.tsx`
- Modify: `src/app/layout.tsx` (reduce to root shell), `src/app/globals.css` (no change yet — Task 8)
- Delete: `src/app/page.tsx`

- [ ] **Step 1: Reduce root `src/app/layout.tsx` to bare HTML shell**

Replace `src/app/layout.tsx` with:

```tsx
import type { ReactNode } from "react";
import "./globals.css";

export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
```

Root layout returns children directly — the real `<html>` and `<body>` live in `[locale]/layout.tsx` so we can set `lang` correctly per locale.

- [ ] **Step 2: Delete the default root page**

Run: `rm src/app/page.tsx`
Expected: file removed.

- [ ] **Step 3: Create `src/app/[locale]/layout.tsx`**

```tsx
import type { ReactNode } from "react";
import type { Metadata } from "next";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

type Props = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  const t = await getTranslations({ locale, namespace: "meta" });
  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider>{children}</NextIntlClientProvider>
      </body>
    </html>
  );
}
```

Note the `@/` import — this works because `create-next-app` configured `paths: { "@/*": ["./src/*"] }` in `tsconfig.json` (Task 1 explicitly passed `--import-alias "@/*"`). Verify by running `grep '"paths"' tsconfig.json`.

- [ ] **Step 4: Create a minimal `src/app/[locale]/page.tsx`**

```tsx
import { setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";

type Props = { params: Promise<{ locale: string }> };

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <HomeContent />;
}

function HomeContent() {
  const t = useTranslations("home");
  return (
    <main style={{ padding: "2rem", fontFamily: "system-ui" }}>
      <p style={{ fontSize: "0.875rem", letterSpacing: "0.1em", textTransform: "uppercase" }}>
        {t("heroEyebrow")}
      </p>
      <h1 style={{ fontSize: "3rem", margin: "1rem 0" }}>{t("heroTitle")}</h1>
      <p style={{ fontSize: "1.125rem", maxWidth: "40rem" }}>{t("heroSubtitle")}</p>
    </main>
  );
}
```

This is a smoke test for the i18n pipeline; the polished homepage arrives in Tasks 14-18.

- [ ] **Step 5: Create `src/app/[locale]/not-found.tsx`**

```tsx
import { useTranslations } from "next-intl";

export default function NotFound() {
  const t = useTranslations("nav");
  return (
    <main style={{ padding: "4rem 2rem", textAlign: "center", fontFamily: "system-ui" }}>
      <h1 style={{ fontSize: "3rem" }}>404</h1>
      <p>{t("listings")}</p>
    </main>
  );
}
```

- [ ] **Step 6: DEV + VISIT each locale**

Start DEV (background).

- VISIT `http://localhost:3000` → English text: "Boutique real estate · Powered by AI" + "Curated estates. AI concierge."
- VISIT `http://localhost:3000/it` → Italian: "Immobiliare boutique · Powered by AI" + "Dimore selezionate. Concierge AI."
- VISIT `http://localhost:3000/es` → Spanish: "Inmobiliaria boutique · Powered by AI" + "Propiedades selectas. Concierge AI."
- VISIT `http://localhost:3000/de` → 404 page (DE is not a configured locale).

Stop DEV.

- [ ] **Step 7: TYPECHECK + LINT + BUILD**

Expected: all pass; build output shows static pages generated for `en`, `it`, `es`.

- [ ] **Step 8: Commit**

```bash
git add src/app
git commit -m "$(cat <<'EOF'
Struttura route [locale] con next-intl

- Root layout ridotto a shell, html/body in [locale]/layout
- generateStaticParams per pre-rendering delle 3 locale
- generateMetadata localizzato (title + description per lingua)
- Homepage smoke test: hero eyebrow + titolo + subtitle dalle traduzioni
- not-found localizzata
EOF
)"
```

---

### Task 8: Tailwind v4 — install design tokens (Maison Mediterranean) in globals.css

**Files:**
- Modify: `src/app/globals.css`

- [ ] **Step 1: Replace `src/app/globals.css` with token definitions**

```css
@import "tailwindcss";

@theme {
  /* Palette — Maison Mediterranean */
  --color-canvas: #f8f5ef;
  --color-surface: #ffffff;
  --color-ink: #1a1a1a;
  --color-muted: #6b6660;
  --color-hairline: #e8e2d7;
  --color-deep: #2c2a26;
  --color-gold: #b08d57;
  --color-terracotta: #a14e3a;

  /* Typography — bound to next/font CSS variables (Task 9) */
  --font-display: var(--font-cormorant), "Cormorant Garamond", Georgia, serif;
  --font-body: var(--font-inter), Inter, ui-sans-serif, system-ui, sans-serif;

  /* Radius — sharp luxury editorial */
  --radius-xs: 2px;
  --radius-sm: 2px;
  --radius-md: 2px;

  /* Spacing scale extension (8pt grid + extra wide for editorial) */
  --spacing-section: 6rem;
  --spacing-section-lg: 8rem;
}

@layer base {
  html {
    background-color: var(--color-canvas);
    color: var(--color-ink);
    font-family: var(--font-body);
    -webkit-font-smoothing: antialiased;
    text-rendering: optimizeLegibility;
  }

  body {
    background-color: var(--color-canvas);
    color: var(--color-ink);
  }

  h1, h2, h3 {
    font-family: var(--font-display);
    font-weight: 400;
    letter-spacing: -0.01em;
  }

  ::selection {
    background-color: var(--color-gold);
    color: var(--color-canvas);
  }
}
```

- [ ] **Step 2: DEV + VISIT `http://localhost:3000`**

Expected: background is off-white avorio (#F8F5EF), text is near-black. Existing smoke-test homepage from Task 7 renders but with no font changes yet (fonts wired in Task 9).

- [ ] **Step 3: TYPECHECK + LINT + BUILD**

Expected: all pass.

- [ ] **Step 4: Commit**

```bash
git add src/app/globals.css
git commit -m "$(cat <<'EOF'
Design tokens Tailwind v4 — palette Maison Mediterranean

- Palette: canvas avorio, ink nero caldo, oro #B08D57, terracotta #A14E3A
- Radius sharp 2px (estetica editoriale luxury, no consumer-tech rounded)
- Spacing section 6/8 rem
- @layer base: bg canvas globale, family heading display, ::selection oro
EOF
)"
```

---

### Task 9: Wire fonts (Cormorant Garamond + Inter) via next/font

**Files:**
- Modify: `src/app/[locale]/layout.tsx`

- [ ] **Step 1: Add font imports and apply variables to `<html>`**

Replace `src/app/[locale]/layout.tsx` with:

```tsx
import type { ReactNode } from "react";
import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-cormorant",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

type Props = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  const t = await getTranslations({ locale, namespace: "meta" });
  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  return (
    <html lang={locale} className={`${cormorant.variable} ${inter.variable}`}>
      <body>
        <NextIntlClientProvider>{children}</NextIntlClientProvider>
      </body>
    </html>
  );
}
```

- [ ] **Step 2: DEV + VISIT `http://localhost:3000`**

Expected: h1 now renders in **Cormorant Garamond** (serif, editorial), body in **Inter** (modern sans). Compare visually — the difference between system serif and Cormorant is obvious.

- [ ] **Step 3: TYPECHECK + LINT + BUILD**

Expected: all pass.

- [ ] **Step 4: Commit**

```bash
git add src/app/[locale]/layout.tsx
git commit -m "$(cat <<'EOF'
Font Cormorant Garamond e Inter via next/font

- Cormorant Garamond 400/500 per heading (display editoriale)
- Inter 400/500/600 per body e UI
- CSS variable bound a @theme di Tailwind v4 (display swap)
EOF
)"
```

---

### Task 10: Build UI primitives — Container, Eyebrow, Button

**Files:**
- Create: `src/components/ui/Container.tsx`, `src/components/ui/Eyebrow.tsx`, `src/components/ui/Button.tsx`

- [ ] **Step 1: Create `src/components/ui/Container.tsx`**

```tsx
import type { ReactNode } from "react";
import clsx from "clsx";

type ContainerProps = {
  children: ReactNode;
  className?: string;
  width?: "default" | "wide" | "narrow";
};

const widthClass: Record<NonNullable<ContainerProps["width"]>, string> = {
  default: "max-w-6xl",
  wide: "max-w-7xl",
  narrow: "max-w-3xl",
};

export function Container({ children, className, width = "default" }: ContainerProps) {
  return (
    <div className={clsx("mx-auto w-full px-6 md:px-10", widthClass[width], className)}>
      {children}
    </div>
  );
}
```

`clsx` ships with Next.js installs via `tailwindcss`. If `npm list clsx` shows missing, install: `npm install clsx`.

- [ ] **Step 2: Verify clsx availability, install if missing**

Run: `npm list clsx --depth=0 2>&1 | grep -E 'clsx@|empty'`
If output contains `empty`, run: `npm install clsx`

- [ ] **Step 3: Create `src/components/ui/Eyebrow.tsx`**

```tsx
import type { ReactNode } from "react";
import clsx from "clsx";

type EyebrowProps = {
  children: ReactNode;
  className?: string;
  tone?: "muted" | "gold";
};

export function Eyebrow({ children, className, tone = "muted" }: EyebrowProps) {
  return (
    <span
      className={clsx(
        "inline-block font-[family-name:var(--font-inter)] text-xs font-medium uppercase tracking-[0.18em]",
        tone === "gold" ? "text-[color:var(--color-gold)]" : "text-[color:var(--color-muted)]",
        className,
      )}
    >
      {children}
    </span>
  );
}
```

- [ ] **Step 4: Create `src/components/ui/Button.tsx`**

```tsx
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import Link from "next/link";
import clsx from "clsx";

type Variant = "primary" | "secondary" | "ghost";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 font-[family-name:var(--font-inter)] font-medium tracking-wide transition-all duration-200 rounded-[var(--radius-sm)] border";

const variantClass: Record<Variant, string> = {
  primary:
    "bg-[color:var(--color-deep)] text-[color:var(--color-canvas)] border-[color:var(--color-deep)] hover:bg-[color:var(--color-ink)] hover:border-[color:var(--color-ink)]",
  secondary:
    "bg-transparent text-[color:var(--color-deep)] border-[color:var(--color-deep)] hover:bg-[color:var(--color-deep)] hover:text-[color:var(--color-canvas)]",
  ghost:
    "bg-transparent text-[color:var(--color-deep)] border-transparent hover:text-[color:var(--color-gold)]",
};

const sizeClass: Record<Size, string> = {
  md: "px-5 py-2.5 text-sm",
  lg: "px-7 py-3.5 text-base",
};

type CommonProps = {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
};

type ButtonAsLink = CommonProps & { href: string } & Omit<
  ComponentPropsWithoutRef<typeof Link>,
  "href" | "className" | "children"
>;
type ButtonAsButton = CommonProps & { href?: undefined } & Omit<
  ComponentPropsWithoutRef<"button">,
  "className" | "children"
>;

type ButtonProps = ButtonAsLink | ButtonAsButton;

export function Button(props: ButtonProps) {
  const { children, variant = "primary", size = "md", className } = props;
  const cls = clsx(base, variantClass[variant], sizeClass[size], className);

  if ("href" in props && props.href !== undefined) {
    const { href, ...rest } = props as ButtonAsLink;
    return (
      <Link href={href} className={cls} {...rest}>
        {children}
      </Link>
    );
  }

  const { href: _ignored, ...rest } = props as ButtonAsButton & { href?: undefined };
  return (
    <button className={cls} {...rest}>
      {children}
    </button>
  );
}
```

- [ ] **Step 5: TYPECHECK + LINT**

Expected: both pass. If TYPECHECK fails on `font-[family-name:...]` syntax — that's Tailwind v4 arbitrary value syntax for setting font-family from a CSS variable; it must work because Tailwind processes the class. If it does fail at runtime (font not applied), fall back to `style={{ fontFamily: "var(--font-inter)" }}`.

- [ ] **Step 6: Commit**

```bash
git add src/components/ui package.json package-lock.json
git commit -m "$(cat <<'EOF'
Primitive UI: Container, Eyebrow, Button

- Container con 3 width (default/wide/narrow) + padding responsive
- Eyebrow uppercase tracking-wide, varianti muted/gold
- Button polimorfico (link Next.js o button), 3 varianti + 2 size, radius sharp
EOF
)"
```

---

### Task 11: Brand constants and nav config

**Files:**
- Create: `src/lib/brand.ts`, `src/lib/nav.ts`

- [ ] **Step 1: Create `src/lib/brand.ts`**

```ts
import type { Locale } from "@/i18n/routing";

export const BRAND_NAME = "CasAI" as const;

export const FTFAI_URL = "https://www.followtheflowai.com" as const;

export const TAGLINE_BY_LOCALE: Record<Locale, string> = {
  en: "Curated estates. AI concierge.",
  it: "Dimore selezionate. Concierge AI.",
  es: "Propiedades selectas. Concierge AI.",
};

export function getFtfaiUrl(locale: Locale): string {
  return locale === "en" ? FTFAI_URL : `${FTFAI_URL}/${locale}`;
}
```

- [ ] **Step 2: Create `src/lib/nav.ts`**

```ts
export type NavItem = {
  key: "listings" | "neighborhoods" | "story" | "contact";
  href: string;
};

export const PRIMARY_NAV: ReadonlyArray<NavItem> = [
  { key: "listings", href: "/listings" },
  { key: "neighborhoods", href: "/neighborhoods" },
  { key: "story", href: "/story" },
  { key: "contact", href: "/contact" },
];
```

The destination pages (`/listings`, `/neighborhoods`, `/story`, `/contact`) will return 404 until Plan 2 builds them. That's intentional — the nav scaffolding is in place, the content arrives next.

- [ ] **Step 3: TYPECHECK**

Expected: exit 0.

- [ ] **Step 4: Commit**

```bash
git add src/lib
git commit -m "$(cat <<'EOF'
Costanti brand e config navigation

- BRAND_NAME, FTFAI_URL, tagline per locale
- getFtfaiUrl(locale) ritorna URL FTFAI con prefisso lingua corretto
- PRIMARY_NAV: 4 voci (listings, neighborhoods, story, contact)
EOF
)"
```

---

### Task 12: Build NavBar

**Files:**
- Create: `src/components/layout/NavBar.tsx`, `src/components/layout/LocaleSwitcher.tsx`

- [ ] **Step 1: Create `src/components/layout/LocaleSwitcher.tsx`**

```tsx
"use client";

import { usePathname, useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { routing, type Locale } from "@/i18n/routing";

const LABELS: Record<Locale, string> = {
  en: "EN",
  it: "IT",
  es: "ES",
};

export function LocaleSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = useLocale() as Locale;
  const t = useTranslations("nav");

  function pathWithoutLocale(): string {
    for (const loc of routing.locales) {
      if (loc === routing.defaultLocale) continue;
      const prefix = `/${loc}`;
      if (pathname === prefix) return "/";
      if (pathname.startsWith(`${prefix}/`)) return pathname.slice(prefix.length);
    }
    return pathname;
  }

  function hrefFor(target: Locale): string {
    const stripped = pathWithoutLocale();
    if (target === routing.defaultLocale) return stripped;
    return stripped === "/" ? `/${target}` : `/${target}${stripped}`;
  }

  return (
    <div
      className="flex items-center gap-3 text-xs uppercase tracking-[0.2em]"
      aria-label={t("switchLocale")}
    >
      {routing.locales.map((loc) => (
        <button
          key={loc}
          type="button"
          onClick={() => router.push(hrefFor(loc))}
          className={
            loc === currentLocale
              ? "text-[color:var(--color-deep)] font-medium"
              : "text-[color:var(--color-muted)] hover:text-[color:var(--color-deep)] transition-colors"
          }
          aria-current={loc === currentLocale ? "true" : undefined}
        >
          {LABELS[loc]}
        </button>
      ))}
    </div>
  );
}
```

- [ ] **Step 2: Create `src/components/layout/NavBar.tsx`**

```tsx
import Link from "next/link";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { LocaleSwitcher } from "./LocaleSwitcher";
import { PRIMARY_NAV } from "@/lib/nav";
import { BRAND_NAME } from "@/lib/brand";

export function NavBar() {
  const t = useTranslations("nav");

  return (
    <header className="sticky top-0 z-40 border-b border-[color:var(--color-hairline)] bg-[color:var(--color-canvas)]/85 backdrop-blur">
      <Container width="wide">
        <div className="flex h-16 items-center justify-between md:h-20">
          <Link
            href="/"
            className="font-[family-name:var(--font-cormorant)] text-2xl tracking-tight text-[color:var(--color-deep)] hover:text-[color:var(--color-gold)] transition-colors"
            aria-label={BRAND_NAME}
          >
            {BRAND_NAME}
          </Link>

          <nav className="hidden items-center gap-8 md:flex" aria-label="primary">
            {PRIMARY_NAV.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                className="text-sm text-[color:var(--color-deep)] hover:text-[color:var(--color-gold)] transition-colors"
              >
                {t(item.key)}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <LocaleSwitcher />
          </div>
        </div>
      </Container>
    </header>
  );
}
```

- [ ] **Step 3: Mount NavBar in `src/app/[locale]/layout.tsx`**

Edit `src/app/[locale]/layout.tsx`. Add import at top:

```tsx
import { NavBar } from "@/components/layout/NavBar";
```

Then change the body content to:

```tsx
<body className="min-h-screen flex flex-col">
  <NextIntlClientProvider>
    <NavBar />
    <div className="flex-1">{children}</div>
  </NextIntlClientProvider>
</body>
```

- [ ] **Step 4: DEV + VISIT each locale**

- `http://localhost:3000` → "CasAI" wordmark left, "Listings · Neighborhoods · Our story · Contact" center, "EN IT ES" right (EN bold).
- `http://localhost:3000/it` → nav reads "Immobili · Quartieri · Chi siamo · Contatti", IT bold in switcher.
- `http://localhost:3000/es` → "Propiedades · Barrios · Quiénes somos · Contacto", ES bold.
- Click "IT" in switcher from EN page → URL becomes `/it`, nav switches to Italian.
- Click "EN" from IT page → URL becomes `/` (no prefix), nav switches to English.

Stop DEV.

- [ ] **Step 5: TYPECHECK + LINT + BUILD**

Expected: all pass.

- [ ] **Step 6: Commit**

```bash
git add src/components/layout src/app/[locale]/layout.tsx
git commit -m "$(cat <<'EOF'
NavBar con wordmark, primary nav e locale switcher

- Sticky header bg semi-trasparente con backdrop-blur
- Wordmark CasAI in Cormorant Garamond, hover oro
- 4 voci nav nascoste su mobile (md:flex), responsive da fare in mobile menu
- LocaleSwitcher client component: strip+prepend prefix, default EN senza prefix
EOF
)"
```

---

### Task 13: Build Footer

**Files:**
- Create: `src/components/layout/Footer.tsx`
- Modify: `src/app/[locale]/layout.tsx`

- [ ] **Step 1: Create `src/components/layout/Footer.tsx`**

```tsx
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { Container } from "@/components/ui/Container";
import { PRIMARY_NAV } from "@/lib/nav";
import { BRAND_NAME, getFtfaiUrl } from "@/lib/brand";
import type { Locale } from "@/i18n/routing";

const LEGAL_LINKS = [
  { key: "legalImprint" as const, href: "/imprint" },
  { key: "legalPrivacy" as const, href: "/privacy" },
  { key: "legalTerms" as const, href: "/terms" },
];

export function Footer() {
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");
  const locale = useLocale() as Locale;

  return (
    <footer className="mt-24 border-t border-[color:var(--color-hairline)] bg-[color:var(--color-canvas)]">
      <Container width="wide">
        <div className="grid gap-12 py-16 md:grid-cols-3 md:gap-10 md:py-20">
          <div>
            <p className="font-[family-name:var(--font-cormorant)] text-3xl text-[color:var(--color-deep)]">
              {BRAND_NAME}
            </p>
            <p className="mt-3 max-w-xs text-sm text-[color:var(--color-muted)]">
              {t("tagline")}
            </p>
          </div>

          <div>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-[color:var(--color-muted)]">
              {t("navHeading")}
            </p>
            <ul className="mt-5 space-y-3">
              {PRIMARY_NAV.map((item) => (
                <li key={item.key}>
                  <Link
                    href={item.href}
                    className="text-sm text-[color:var(--color-deep)] hover:text-[color:var(--color-gold)] transition-colors"
                  >
                    {tNav(item.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-[color:var(--color-muted)]">
              {t("legalHeading")}
            </p>
            <ul className="mt-5 space-y-3">
              {LEGAL_LINKS.map((item) => (
                <li key={item.key}>
                  <Link
                    href={item.href}
                    className="text-sm text-[color:var(--color-deep)] hover:text-[color:var(--color-gold)] transition-colors"
                  >
                    {t(item.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-2 border-t border-[color:var(--color-hairline)] py-6 text-xs text-[color:var(--color-muted)] md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} {BRAND_NAME}. {t("credit")}
          </p>
          <a
            href={getFtfaiUrl(locale)}
            className="hover:text-[color:var(--color-gold)] transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            {t("creditLinkLabel")} →
          </a>
        </div>
      </Container>
    </footer>
  );
}
```

- [ ] **Step 2: Mount Footer in `src/app/[locale]/layout.tsx`**

Add import:

```tsx
import { Footer } from "@/components/layout/Footer";
```

Update body:

```tsx
<body className="min-h-screen flex flex-col">
  <NextIntlClientProvider>
    <NavBar />
    <div className="flex-1">{children}</div>
    <Footer />
  </NextIntlClientProvider>
</body>
```

- [ ] **Step 3: DEV + VISIT `http://localhost:3000`**

Scroll to bottom. Expected:
- Three columns: brand block, browse links, legal links
- Bottom strip: `© 2026 CasAI. A Follow The Flow AI showcase.` on left, "Discover the technology →" linked to https://www.followtheflowai.com on right
- VISIT `/it` → "Una vetrina di Follow The Flow AI." + link to `https://www.followtheflowai.com/it`
- VISIT `/es` → "Un escaparate de Follow The Flow AI." + link to `https://www.followtheflowai.com/es`

- [ ] **Step 4: TYPECHECK + LINT + BUILD**

Expected: all pass.

- [ ] **Step 5: Commit**

```bash
git add src/components/layout/Footer.tsx src/app/[locale]/layout.tsx
git commit -m "$(cat <<'EOF'
Footer con brand, nav, legal e credit a FTFAI

- 3 colonne responsive (1 colonna su mobile, 3 da md)
- Credit "A Follow The Flow AI showcase" con link locale-aware al sito madre
- Tagline brand declinata per lingua nel blocco brand
EOF
)"
```

---

### Task 14: Hero section with video background

**Files:**
- Create: `src/components/home/Hero.tsx`
- Add asset: `public/images/hero-poster.jpg` (Unsplash temp; real cinematic video sourced in Plan 3)

- [ ] **Step 1: Add placeholder hero assets**

For development we use temporary placeholder media. The final cinematic clip will be sourced from Pexels/Coverr during polishing.

Run:
```bash
mkdir -p public/video public/images
curl -fSL -o public/images/hero-poster.jpg "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=70&fm=jpg"
```

For the video placeholder, until a real cinematic file is added, we'll skip the video file entirely and rely on the poster image. The Hero component (below) handles "video missing" gracefully by falling back to the poster.

- [ ] **Step 2: Create `src/components/home/Hero.tsx`**

```tsx
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";

export function Hero() {
  const t = useTranslations("home");

  return (
    <section className="relative isolate overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url(/images/hero-poster.jpg)" }}
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 bg-gradient-to-b from-[color:var(--color-deep)]/40 via-[color:var(--color-deep)]/30 to-[color:var(--color-canvas)]"
          aria-hidden="true"
        />
      </div>

      <Container width="wide" className="relative">
        <div className="flex min-h-[88vh] flex-col justify-end pb-20 pt-32 md:min-h-[92vh] md:pb-28">
          <div className="max-w-3xl">
            <Eyebrow tone="gold" className="text-[color:var(--color-canvas)]">
              {t("heroEyebrow")}
            </Eyebrow>
            <h1 className="mt-5 font-[family-name:var(--font-cormorant)] text-5xl leading-[1.05] text-[color:var(--color-canvas)] md:text-7xl">
              {t("heroTitle")}
            </h1>
            <p className="mt-6 max-w-xl text-base text-[color:var(--color-canvas)]/85 md:text-lg">
              {t("heroSubtitle")}
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button href="/listings" size="lg">
                {t("heroPrimaryCta")}
              </Button>
              <Button href="#concierge" variant="ghost" size="lg" className="text-[color:var(--color-canvas)] hover:text-[color:var(--color-gold)]">
                {t("heroSecondaryCta")} ↓
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
```

- [ ] **Step 3: Use the new Hero on the homepage**

Replace `src/app/[locale]/page.tsx` with:

```tsx
import { setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/home/Hero";

type Props = { params: Promise<{ locale: string }> };

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <>
      <Hero />
    </>
  );
}
```

- [ ] **Step 4: DEV + VISIT each locale**

- VISIT `http://localhost:3000` → full-bleed hero with background image, gradient overlay toward canvas at bottom, large serif headline "Curated estates. AI concierge." in cream, two CTAs.
- VISIT `/it` → headline "Dimore selezionate. Concierge AI."
- VISIT `/es` → "Propiedades selectas. Concierge AI."
- Resize to mobile width (375px) → CTAs stack vertically, padding stays comfortable.

- [ ] **Step 5: TYPECHECK + LINT + BUILD**

Expected: all pass.

- [ ] **Step 6: Commit**

```bash
git add src/components/home/Hero.tsx src/app/[locale]/page.tsx public/images/hero-poster.jpg
git commit -m "$(cat <<'EOF'
Hero homepage con poster image + gradient overlay

- Background image fissato a 88vh (92vh da md) con gradiente verso canvas
- Eyebrow oro + headline Cormorant 5xl/7xl + subtitle + 2 CTA primaria/ghost
- Asset poster da Unsplash temporaneo (sostituiremo con video Pexels in polish)
EOF
)"
```

---

### Task 15: Featured listings placeholder section

**Files:**
- Create: `src/components/home/FeaturedListings.tsx`
- Modify: `src/app/[locale]/page.tsx`

- [ ] **Step 1: Create `src/components/home/FeaturedListings.tsx`**

```tsx
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";

type Placeholder = {
  city: "milanTag" | "mallorcaTag" | "londonTag";
  image: string;
  title: string;
  meta: string;
};

const PLACEHOLDERS: ReadonlyArray<Placeholder> = [
  {
    city: "milanTag",
    image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=1200&q=70",
    title: "Brera attic with frescoed ceiling",
    meta: "240 m² · 3 bed · 3 bath",
  },
  {
    city: "mallorcaTag",
    image: "https://images.unsplash.com/photo-1502672023488-70e25813eb80?w=1200&q=70",
    title: "Finca above the Tramuntana",
    meta: "420 m² · 5 bed · 4 bath",
  },
  {
    city: "londonTag",
    image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=1200&q=70",
    title: "Mayfair townhouse, Georgian façade",
    meta: "310 m² · 4 bed · 3 bath",
  },
];

export function FeaturedListings() {
  const t = useTranslations("home");

  function cityLabel(key: Placeholder["city"]): string {
    if (key === "milanTag") return t("neighborhoodMilanTag");
    if (key === "mallorcaTag") return t("neighborhoodMallorcaTag");
    return t("neighborhoodLondonTag");
  }

  return (
    <section className="py-24 md:py-32">
      <Container width="wide">
        <div className="mb-14 max-w-2xl md:mb-20">
          <Eyebrow>{t("featuredEyebrow")}</Eyebrow>
          <h2 className="mt-4 font-[family-name:var(--font-cormorant)] text-4xl leading-tight text-[color:var(--color-ink)] md:text-5xl">
            {t("featuredTitle")}
          </h2>
          <p className="mt-5 text-base text-[color:var(--color-muted)] md:text-lg">
            {t("featuredSubtitle")}
          </p>
        </div>

        <div className="grid gap-10 md:grid-cols-3 md:gap-8">
          {PLACEHOLDERS.map((p) => (
            <article key={p.title} className="group">
              <div className="relative aspect-[3/2] overflow-hidden bg-[color:var(--color-hairline)]">
                <Image
                  src={p.image}
                  alt={p.title}
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
              </div>
              <div className="mt-5">
                <Eyebrow tone="muted">{cityLabel(p.city)}</Eyebrow>
                <h3 className="mt-2 font-[family-name:var(--font-cormorant)] text-2xl leading-snug text-[color:var(--color-ink)]">
                  {p.title}
                </h3>
                <p className="mt-1 text-sm text-[color:var(--color-muted)]">{p.meta}</p>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
```

The placeholder titles and meta are intentionally English-only — they will be replaced by real localized listing data in Plan 2.

- [ ] **Step 2: Add FeaturedListings to homepage**

Edit `src/app/[locale]/page.tsx`:

```tsx
import { setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/home/Hero";
import { FeaturedListings } from "@/components/home/FeaturedListings";

type Props = { params: Promise<{ locale: string }> };

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <>
      <Hero />
      <FeaturedListings />
    </>
  );
}
```

- [ ] **Step 3: DEV + VISIT `http://localhost:3000`**

Expected: under Hero, a section with eyebrow "This week's selection", serif headline, and a 3-column grid of cards. Each card has a 3:2 photo, city eyebrow, serif title, and "240 m² · 3 bed · 3 bath" meta. On hover, the photo gently scales up. Mobile: cards stack to single column.

- [ ] **Step 4: TYPECHECK + LINT + BUILD**

Expected: all pass.

- [ ] **Step 5: Commit**

```bash
git add src/components/home/FeaturedListings.tsx src/app/[locale]/page.tsx
git commit -m "$(cat <<'EOF'
Sezione featured listings con 3 card placeholder

- Layout 3 colonne da md (responsive single column mobile)
- Card pattern: foto 3:2 con hover scale, eyebrow città, titolo Cormorant, meta sqm/bed/bath
- Placeholder verranno sostituiti con dati reali in Plan 2
EOF
)"
```

---

### Task 16: Neighborhood editorial section

**Files:**
- Create: `src/components/home/NeighborhoodEditorial.tsx`
- Modify: `src/app/[locale]/page.tsx`

- [ ] **Step 1: Create `src/components/home/NeighborhoodEditorial.tsx`**

```tsx
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";

const TILES = [
  {
    key: "milan" as const,
    image: "https://images.unsplash.com/photo-1520440229-6469a149ac59?w=1200&q=70",
  },
  {
    key: "mallorca" as const,
    image: "https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?w=1200&q=70",
  },
  {
    key: "london" as const,
    image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=1200&q=70",
  },
];

export function NeighborhoodEditorial() {
  const t = useTranslations("home");

  function tagFor(key: (typeof TILES)[number]["key"]): string {
    if (key === "milan") return t("neighborhoodMilanTag");
    if (key === "mallorca") return t("neighborhoodMallorcaTag");
    return t("neighborhoodLondonTag");
  }

  return (
    <section className="bg-[color:var(--color-surface)] py-24 md:py-32">
      <Container width="wide">
        <div className="grid gap-16 md:grid-cols-12 md:gap-12">
          <div className="md:col-span-5">
            <Eyebrow>{t("neighborhoodEyebrow")}</Eyebrow>
            <h2 className="mt-4 font-[family-name:var(--font-cormorant)] text-4xl leading-tight text-[color:var(--color-ink)] md:text-5xl">
              {t("neighborhoodTitle")}
            </h2>
            <p className="mt-5 text-base text-[color:var(--color-muted)] md:text-lg">
              {t("neighborhoodBody")}
            </p>
          </div>

          <div className="md:col-span-7">
            <div className="grid grid-cols-3 gap-4">
              {TILES.map((tile) => (
                <figure key={tile.key} className="relative">
                  <div className="relative aspect-[3/4] overflow-hidden bg-[color:var(--color-hairline)]">
                    <Image
                      src={tile.image}
                      alt={tagFor(tile.key)}
                      fill
                      sizes="(min-width: 768px) 20vw, 33vw"
                      className="object-cover"
                    />
                  </div>
                  <figcaption className="mt-3 text-xs font-medium uppercase tracking-[0.18em] text-[color:var(--color-muted)]">
                    {tagFor(tile.key)}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
```

- [ ] **Step 2: Add NeighborhoodEditorial to homepage**

Edit `src/app/[locale]/page.tsx`:

```tsx
import { setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/home/Hero";
import { FeaturedListings } from "@/components/home/FeaturedListings";
import { NeighborhoodEditorial } from "@/components/home/NeighborhoodEditorial";

type Props = { params: Promise<{ locale: string }> };

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <>
      <Hero />
      <FeaturedListings />
      <NeighborhoodEditorial />
    </>
  );
}
```

- [ ] **Step 3: DEV + VISIT each locale**

- `/` → section on white surface, left column has eyebrow "Editorial" + headline "Where the world lives well" + body, right column has 3 portrait tiles labeled "Milan / Mallorca / London".
- `/it` → "Editoriale" + "Dove si vive bene nel mondo" + tile labels "Milano / Maiorca / Londra".
- `/es` → "Editorial" + "Donde el mundo vive bien" + "Milán / Mallorca / Londres".

- [ ] **Step 4: TYPECHECK + LINT + BUILD**

Expected: all pass.

- [ ] **Step 5: Commit**

```bash
git add src/components/home/NeighborhoodEditorial.tsx src/app/[locale]/page.tsx
git commit -m "$(cat <<'EOF'
Sezione editoriale quartieri con grid 5+7 columns

- Left col: eyebrow + headline + body editoriale
- Right col: 3 tiles portrait (3:4) Milano/Maiorca/Londra con caption uppercase
- Background surface bianco per stacco visivo dal canvas avorio
EOF
)"
```

---

### Task 17: Concierge banner section (voice agent teaser)

**Files:**
- Create: `src/components/home/ConciergeBanner.tsx`
- Modify: `src/app/[locale]/page.tsx`

- [ ] **Step 1: Create `src/components/home/ConciergeBanner.tsx`**

```tsx
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";

export function ConciergeBanner() {
  const t = useTranslations("home");

  return (
    <section id="concierge" className="bg-[color:var(--color-deep)] py-24 text-[color:var(--color-canvas)] md:py-32">
      <Container width="default">
        <div className="grid items-center gap-12 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-7">
            <Eyebrow tone="gold">{t("conciergeEyebrow")}</Eyebrow>
            <h2 className="mt-4 font-[family-name:var(--font-cormorant)] text-4xl leading-tight md:text-5xl">
              {t("conciergeTitle")}
            </h2>
            <p className="mt-5 max-w-xl text-base text-[color:var(--color-canvas)]/80 md:text-lg">
              {t("conciergeBody")}
            </p>
            <div className="mt-10">
              <Button
                href="#"
                size="lg"
                variant="secondary"
                className="border-[color:var(--color-canvas)] text-[color:var(--color-canvas)] hover:bg-[color:var(--color-canvas)] hover:text-[color:var(--color-deep)]"
              >
                {t("conciergeCta")}
              </Button>
            </div>
          </div>

          <div className="md:col-span-5">
            <div
              className="relative mx-auto flex h-56 w-56 items-center justify-center rounded-full border border-[color:var(--color-gold)]/40 md:h-72 md:w-72"
              aria-hidden="true"
            >
              <div className="absolute inset-0 animate-ping rounded-full border border-[color:var(--color-gold)]/30" />
              <div className="absolute inset-4 rounded-full border border-[color:var(--color-gold)]/30" />
              <div className="absolute inset-8 rounded-full border border-[color:var(--color-gold)]/40" />
              <div className="h-3 w-3 rounded-full bg-[color:var(--color-gold)]" />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
```

The CTA `href="#"` is a placeholder for now — in Plan 3 it will trigger the ElevenLabs floating widget to open programmatically.

- [ ] **Step 2: Add ConciergeBanner to homepage**

Edit `src/app/[locale]/page.tsx`:

```tsx
import { setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/home/Hero";
import { FeaturedListings } from "@/components/home/FeaturedListings";
import { NeighborhoodEditorial } from "@/components/home/NeighborhoodEditorial";
import { ConciergeBanner } from "@/components/home/ConciergeBanner";

type Props = { params: Promise<{ locale: string }> };

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <>
      <Hero />
      <FeaturedListings />
      <NeighborhoodEditorial />
      <ConciergeBanner />
    </>
  );
}
```

- [ ] **Step 3: DEV + VISIT `http://localhost:3000`**

Expected: deep brown/black band, gold accent eyebrow, large serif "A concierge that answers at 3 a.m.", body text, CTA button outlined in cream. On the right, an animated pulsing ring with a gold dot in the center (the "concierge bell" teaser). Click hero's "Speak to the concierge ↓" → page scrolls to this section.

- [ ] **Step 4: TYPECHECK + LINT + BUILD**

Expected: all pass.

- [ ] **Step 5: Commit**

```bash
git add src/components/home/ConciergeBanner.tsx src/app/[locale]/page.tsx
git commit -m "$(cat <<'EOF'
Banner concierge AI con anteprima 'bell' animato

- Sezione full-width su sfondo deep brown con accent oro
- Layout 7+5 col: copy + CTA a sinistra, pulsing ring a destra (placeholder voice widget)
- Anchor #concierge raggiungibile da CTA secondaria hero
EOF
)"
```

---

### Task 18: 404 page polish

**Files:**
- Modify: `src/app/[locale]/not-found.tsx`

- [ ] **Step 1: Replace `src/app/[locale]/not-found.tsx`**

```tsx
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  const tNav = useTranslations("nav");
  const tFooter = useTranslations("footer");

  return (
    <main className="flex min-h-[70vh] items-center">
      <Container width="narrow" className="text-center">
        <Eyebrow tone="gold">404</Eyebrow>
        <h1 className="mt-5 font-[family-name:var(--font-cormorant)] text-5xl leading-tight text-[color:var(--color-ink)] md:text-6xl">
          {tFooter("tagline")}
        </h1>
        <p className="mt-5 text-base text-[color:var(--color-muted)] md:text-lg">
          —
        </p>
        <div className="mt-10 flex justify-center">
          <Button href="/" size="lg">
            {tNav("listings")} →
          </Button>
        </div>
      </Container>
    </main>
  );
}
```

The 404 page intentionally stays simple — it's the brand and a return CTA. We reuse the tagline as a graceful fallback message rather than introducing a separate "not found" string.

- [ ] **Step 2: DEV + VISIT `http://localhost:3000/this-does-not-exist`**

Expected: minimal centered 404 page with brand styling. Click CTA → goes home.

- [ ] **Step 3: TYPECHECK + LINT + BUILD**

Expected: all pass.

- [ ] **Step 4: Commit**

```bash
git add src/app/[locale]/not-found.tsx
git commit -m "$(cat <<'EOF'
404 page polish con design system

- Layout centrato, eyebrow oro 404, headline Cormorant
- CTA ritorno home con label localizzata
EOF
)"
```

---

### Task 19: Open Graph image and final metadata polish

**Files:**
- Create: `src/app/[locale]/opengraph-image.tsx`
- Modify: `src/app/[locale]/layout.tsx`

- [ ] **Step 1: Create `src/app/[locale]/opengraph-image.tsx`**

Next.js App Router auto-generates an OG image from any `opengraph-image.tsx` file colocated with a route segment.

```tsx
import { ImageResponse } from "next/og";
import { getTranslations } from "next-intl/server";
import { hasLocale } from "next-intl";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";

export const runtime = "edge";
export const alt = "CasAI — Curated estates. AI concierge.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

type Props = { params: Promise<{ locale: string }> };

export default async function OpengraphImage({ params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  const t = await getTranslations({ locale, namespace: "home" });

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#F8F5EF",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          fontFamily: "Georgia, serif",
        }}
      >
        <div
          style={{
            fontSize: 28,
            letterSpacing: 6,
            textTransform: "uppercase",
            color: "#B08D57",
          }}
        >
          CasAI
        </div>
        <div
          style={{
            fontSize: 84,
            lineHeight: 1.05,
            color: "#1A1A1A",
            maxWidth: "1000px",
          }}
        >
          {t("heroTitle")}
        </div>
        <div style={{ fontSize: 24, color: "#6B6660" }}>
          casai.followtheflowai.com
        </div>
      </div>
    ),
    size,
  );
}
```

- [ ] **Step 2: Enrich metadata in `src/app/[locale]/layout.tsx`**

In the `generateMetadata` function, replace the current body with:

```tsx
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  const t = await getTranslations({ locale, namespace: "meta" });
  return {
    title: { default: t("title"), template: "%s · CasAI" },
    description: t("description"),
    metadataBase: new URL("https://casai.followtheflowai.com"),
    openGraph: {
      type: "website",
      locale,
      siteName: "CasAI",
      title: t("title"),
      description: t("description"),
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
    },
    robots: { index: true, follow: true },
    alternates: {
      languages: {
        en: "/",
        it: "/it",
        es: "/es",
      },
    },
  };
}
```

- [ ] **Step 3: DEV + VISIT `http://localhost:3000/opengraph-image`**

Expected: a 1200×630 PNG showing the gold "CASAI" eyebrow, the headline in dark serif, and the URL footer. Repeat for `/it/opengraph-image` and `/es/opengraph-image` — headline changes per locale.

- [ ] **Step 4: Inspect `<head>` on the homepage**

VISIT `http://localhost:3000`, View Source. Expected `<head>` contains:
- `<title>CasAI — Curated estates. AI concierge.</title>`
- `<meta name="description" content="Boutique homes in Milan...">`
- `<meta property="og:title" content="CasAI — Curated estates. AI concierge.">`
- `<meta property="og:image" content="...opengraph-image..."` (auto-generated path)
- `<link rel="alternate" hrefLang="en" href="https://casai.followtheflowai.com/">`
- `<link rel="alternate" hrefLang="it" href="https://casai.followtheflowai.com/it">`
- `<link rel="alternate" hrefLang="es" href="https://casai.followtheflowai.com/es">`

- [ ] **Step 5: TYPECHECK + LINT + BUILD**

Expected: all pass. Build output should list `/opengraph-image` route.

- [ ] **Step 6: Commit**

```bash
git add src/app/[locale]/opengraph-image.tsx src/app/[locale]/layout.tsx
git commit -m "$(cat <<'EOF'
Open Graph image dinamica + metadata SEO completi

- opengraph-image.tsx genera PNG 1200x630 per locale con ImageResponse edge
- Headline localizzata, eyebrow oro, footer URL
- Metadata: og:* twitter:* alternates hreflang per EN/IT/ES
- Title template "%s · CasAI" per pagine future
EOF
)"
```

---

### Task 20: Mobile QA pass and responsive polish

**Files:**
- Modify: as needed in `src/components/layout/NavBar.tsx`, `src/components/home/*` (only if QA finds issues)

- [ ] **Step 1: Run DEV and test at three breakpoints**

Start DEV. In browser devtools, test the homepage at:
- **375 × 812 px** (mobile)
- **768 × 1024 px** (tablet)
- **1440 × 900 px** (desktop)

For each width walk through:
- Hero readable, CTAs reachable, headline doesn't overflow
- Featured listings: 1 column on mobile, 3 on desktop, gaps look right
- Editorial: stacks on mobile, side-by-side on desktop, neighborhood tiles legible
- Concierge banner: copy + bell stack on mobile, side-by-side on desktop
- Footer: 1 column on mobile, 3 on desktop, credit line wraps gracefully
- NavBar: primary nav links HIDDEN on mobile (we don't have a hamburger yet — that's OK for Plan 1; locale switcher remains visible)

- [ ] **Step 2: Document findings**

If you find any breakage (text overflow, tap targets <44 px, horizontal scrollbar, illegible contrast), list them and fix inline. If none, proceed to commit a note.

Common fixes you may need:
- Hero: if `text-7xl` overflows on 375 px, reduce mobile size to `text-5xl` (already is) — confirm.
- Concierge bell: ring should stay centered on mobile.
- Footer brand block: ensure max-w-xs allows tagline to wrap.

If nothing needs changing, skip to Step 3.

- [ ] **Step 3: Verify the production build under all three locales**

Run: BUILD
Expected: build completes, `Route (app)` summary shows `/`, `/it`, `/es` and their not-found variants.

- [ ] **Step 4: Commit QA notes (only if changes were made)**

If Step 2 required code edits:

```bash
git add -A
git commit -m "$(cat <<'EOF'
QA mobile/tablet/desktop + fix responsive

- [elenca fix specifici qui]
EOF
)"
```

If no changes were needed, skip the commit and add a checkbox below.

- [ ] **Step 5: Mark QA pass complete**

Add a one-line entry to `docs/superpowers/plans/2026-06-16-foundation-and-homepage.md` at the very bottom:

```markdown
---
## QA log
- 2026-06-16: Mobile/tablet/desktop QA pass completed at Task 20. No regressions found / fixes applied: [list].
```

---

### Task 21: Final integration build, lint, and push

**Files:** none modified

- [ ] **Step 1: Clean install and full verification**

```bash
rm -rf node_modules .next
npm install
npm run lint
npx tsc --noEmit
npm run build
```

Expected: all four commands succeed end-to-end on a clean tree.

- [ ] **Step 2: Smoke test production build locally**

```bash
npm run start &
sleep 3
curl -sS -o /dev/null -w "%{http_code}\n" http://localhost:3000
curl -sS -o /dev/null -w "%{http_code}\n" http://localhost:3000/it
curl -sS -o /dev/null -w "%{http_code}\n" http://localhost:3000/es
curl -sS -o /dev/null -w "%{http_code}\n" http://localhost:3000/does-not-exist
kill %1
```

Expected: `200`, `200`, `200`, `404`.

- [ ] **Step 3: Push to origin/main**

```bash
git push -u origin main
```

Expected: push succeeds. GitHub Actions / EasyPanel webhook (if already configured) may pick it up; deployment to `casai.followtheflowai.com` is **deferred to Plan 3** — Plan 1 only ships the codebase.

- [ ] **Step 4: Verify push**

Run: `git log --oneline -20 origin/main`
Expected: every commit from Tasks 1-20 appears.

---

## Spec Coverage (self-review against CLAUDE.md scope)

| CLAUDE.md requirement | Covered by |
|---|---|
| Next.js 15 + App Router + TypeScript strict | Task 1, 3 |
| next-intl with EN/IT/ES, EN no prefix | Tasks 4, 5, 6, 7 |
| Tailwind v4 | Task 1, 8 |
| Framer Motion | Task 2 (installed — used in Plan 2+) |
| Cormorant Garamond + Inter via next/font | Task 9 |
| Maison Mediterranean palette + sharp radius | Task 8 |
| NavBar + Footer + Locale switcher | Tasks 12, 13 |
| Brand name CasAI applied everywhere | Tasks 11, 12, 13, 14, 19 |
| Tagline per locale | Tasks 5, 11, 13 |
| Homepage with Hero + featured + editorial + concierge teaser | Tasks 14, 15, 16, 17 |
| Mobile-first verification | Task 20 |
| Footer credit linked to FTFAI (locale-aware) | Tasks 11, 13 |
| OG image per locale + metadata | Task 19 |
| Capitalization rules (Title Case EN, sentence case IT/ES) | Task 5 (encoded directly in JSON strings) |

**Out of scope (deferred):**
- Listings index, listing detail, map, gallery → **Plan 2**
- Real cinematic hero video (Pexels/Coverr sourcing) → **Plan 3 polish**
- Mobile hamburger menu (primary nav hidden on mobile in Plan 1) → **Plan 2** when nav becomes used
- ElevenLabs voice agent + Cal.com tools → **Plan 3**
- Dockerfile + EasyPanel + DNS → **Plan 3**

---

## QA log

- **2026-06-16, Task 20:** verifica visiva ai breakpoint 375/768/1440 NON eseguita in sessione (CLI senza browser). Build production verificata: tutte le route compilano, OG dinamica restituisce PNG 1200×630, metadata `og:*`/`twitter:*`/`alternates` corretti. Stefano deve aprire `http://localhost:3000` dopo `npm run dev` e validare visivamente i 3 breakpoint prima di considerare la homepage "demo-ready". Eventuali fix responsive identificati post-QA vanno aggiunti come Task 20.x.
- **2026-06-16, Task 20.1:** QA desktop completata via Chrome MCP a viewport 1453px su tutte e 3 le locale (EN/IT/ES). Issues trovate e fixate:
  - **Bug Button polimorfico**: `{...rest}` su `<Link>` riportava `className` originale sovrascrivendo `cls`, risultato `border-width: 0px` e nessun padding/colors. Fix: estrarre esplicitamente `className/variant/size/children/href` da `rest` prima dello spread.
  - **Hero eyebrow contrast**: oro accent washed-out su parti chiare del poster. Fix: gradient overlay da `from-deep/40 via-deep/30` a `from-deep/55 via-deep/70` (più profondo dove sta il testo) — eyebrow ora pienamente leggibile.
  - **Resize_window MCP non penetra il viewport interno** (resta a 1453px regardless). Test mobile/tablet (375/768px) demandato a Stefano via browser devtools.

## Execution Handoff

Plan complete and saved to `docs/superpowers/plans/2026-06-16-foundation-and-homepage.md`. Two execution options:

**1. Subagent-Driven (recommended)** — I dispatch a fresh subagent per task, review between tasks, fast iteration.

**2. Inline Execution** — Execute tasks in this session using executing-plans, batch execution with checkpoints.

**Which approach?**
