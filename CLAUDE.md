# Real Estate Agency — sotto-sito di Follow The Flow AI

Questo è un **nuovo sito** in fase di setup, ospitato su `casai.followtheflowai.com`. È pensato come **vetrina/showcase** di un'agenzia immobiliare premium fittizia, costruito dalla stessa LLC americana **Follow The Flow AI** che gestisce il sito principale [www.followtheflowai.com](https://www.followtheflowai.com).

> Obiettivo del sito: dimostrare le capacità AI dell'agenzia FTFAI applicate a un caso concreto verticale (real estate), e fornire una piattaforma di "agente vocale immobiliare" che risponde a domande sugli immobili e prenota visite.

## Repo & deploy

- **Directory locale**: `/Users/stefanorussello/Documents/Projects/FollowTheFlow/RealEstateAgency_web`
- **Repo GitHub**: `git@github.com:Spettacolo83/real_estate_agency_web.git` (origin/main)
- **Dominio target**: `casai.followtheflowai.com` (sottodominio del sito principale)
- **Hosting**: VPS Contabo `161.97.125.230` via **EasyPanel** (stesso server del sito FTFAI). Auto-deploy via webhook GitHub → EasyPanel (a volte serve un trigger manuale dal pannello).
- **DNS**: aggiungere su Hostinger un record `A` per `casa` → `161.97.125.230`.

## Stack (mirror del sito FTFAI principale)

Replichiamo lo stesso stack tecnologico per riusare i pattern già testati:

- **Next.js 15** (App Router, server components)
- **next-intl** per i18n (3 lingue: en default, it, es)
- **Tailwind CSS v4**
- **Framer Motion** per animazioni
- **TypeScript** con strict mode
- **Node 22 alpine** in Dockerfile
- Deploy: stesso pattern Dockerfile/EasyPanel del progetto principale (vedi `/Users/stefanorussello/Documents/Projects/FollowTheFlow/Web/site/Dockerfile`)

## Regole commit (TASSATIVE)

- Commit messages in **italiano**
- Descrizione in formato **bullet point**
- **MAI** co-author, **MAI** riferimenti a Claude/AI/strumenti AI nei commit
- **MAI** `--no-verify` o skip degli hooks

## Lingua di comunicazione

- Parlare **sempre in italiano** con l'utente (Stefano Russello).

## Pattern architetturali da riusare (presi dal sito FTFAI)

### 1. Multi-lingua con next-intl

Routing:
- `/` → EN (default, no prefisso URL)
- `/it/...` → IT
- `/es/...` → ES

Pattern usato (codice di riferimento in `/Users/stefanorussello/Documents/Projects/FollowTheFlow/Web/site/`):
- `src/i18n/routing.ts` configura le locales
- `src/middleware.ts` gestisce redirect auto-detect
- `src/app/[locale]/layout.tsx` wrappa con `NextIntlClientProvider`
- `src/messages/{en,it,es}.json` contengono le traduzioni
- Componenti client: `useTranslations("namespace")` per stringhe + `useLocale()` per locale corrente

Convenzione importante per i contenuti (regola applicata in FTFAI):
- Inglese: **Title Case** ammesso nei heading
- Italiano e Spagnolo: **Sentence case** (solo prima parola maiuscola + nomi propri); brand names (Follow The Flow AI, Cal.com, ecc.) e sigle (AI, IA, ROI, CRM) restano capitalizzati

### 2. CTA Cal.com localizzati

Helper `getCalUrl(locale)` in `src/lib/constants.ts` restituisce il link Cal.com corretto per lingua. Per il sito immobiliare, gli event Cal.com saranno DIVERSI (visite immobili, non strategy call). Crearne 3 nuovi su Cal.com e mappare gli eventTypeId.

### 3. Agente vocale AI (ElevenLabs Conversational AI) — CUORE DEL PROGETTO

Replichiamo esattamente il pattern del sito FTFAI:

#### Componente client `VoiceAgent.tsx`
File di riferimento: `/Users/stefanorussello/Documents/Projects/FollowTheFlow/Web/site/src/components/VoiceAgent.tsx`

```tsx
"use client";
import Script from "next/script";
import { useLocale } from "next-intl";

const AGENT_IDS: Record<string, string> = {
  it: "agent_xxx_IT",  // NUOVO agente da creare per real estate IT
  es: "agent_xxx_ES",  // NUOVO agente da creare per real estate ES
  en: "agent_xxx_EN",  // NUOVO agente da creare per real estate EN
};

export default function VoiceAgent() {
  const locale = useLocale();
  const agentId = AGENT_IDS[locale] ?? AGENT_IDS.en;
  return (
    <>
      <elevenlabs-convai agent-id={agentId} key={agentId} />
      <Script
        src="https://unpkg.com/@elevenlabs/convai-widget-embed"
        strategy="afterInteractive"
        async
      />
    </>
  );
}
```

#### Tipi del custom element
File: `src/types/elevenlabs.d.ts` — copiare 1:1 dal progetto FTFAI.

#### Montaggio nel layout
Nel `src/app/[locale]/layout.tsx`, montare `<VoiceAgent />` dentro `NextIntlClientProvider`, dopo il `Footer` (così il widget è floating).

#### Configurazione agenti (3 nuovi agenti da creare via API)
- Usare la API key ElevenLabs **esistente** dell'account utente (in `/Users/stefanorussello/Documents/Projects/FollowTheFlow/Web/.secrets/elevenlabs-api-key.txt`): `sk_753ff77fbcf4d8540c33c96c04bea4d77a05eb8f0cc2fffc`
- Endpoint: `POST https://api.elevenlabs.io/v1/convai/agents/create`
- **Per agenti non-inglese serve `tts.model_id = "eleven_flash_v2_5"` o `eleven_turbo_v2_5`** (constraint API)
- I prompt devono includere `{{system__time_utc}}` come variabile dinamica per evitare che il modello inventi date sbagliate (era successo con FTFAI)
- Localizzare le label widget (`text_contents.main_label`) — vedere `/Users/stefanorussello/.claude/projects/-Users-stefanorussello-Documents-Projects-FollowTheFlow-Web/memory/elevenlabs_agents.md` per la mappa completa di label IT/ES

#### Tool Cal.com per booking (visite immobili)
Stesso pattern dei tool Cal.com già creati per FTFAI:
- `calcom_get_available_slots` (webhook GET `https://api.cal.com/v2/slots`)
- `calcom_create_booking` (webhook POST `https://api.cal.com/v2/bookings`)

ATTENZIONE: i tool sono **globali al workspace ElevenLabs**, quindi i 2 tool già creati per FTFAI potrebbero essere RIUSATI dai nuovi agenti immobiliari — basta passare l'`eventTypeId` corretto nel prompt. **Soluzione consigliata**: creare 2 NUOVI tool dedicati al real estate per non confondere i prompt FTFAI, OPPURE riusare i tool esistenti e gestire la differenza solo nei prompt. Da decidere insieme all'utente.

Tool ID FTFAI (riusabili o da NON sovrascrivere):
- `tool_6301ktxm2b9df1eaq7sbm90610n6` → `calcom_get_available_slots`
- `tool_1301ktxm2bxwfgn8zgcqvqdcpybk` → `calcom_create_booking`

#### Variabili dinamiche nei prompt
Esiste `{{system__time_utc}}` (data corrente). Per il real estate sarebbe utile passare anche **info sulla pagina corrente** (immobile visualizzato) → questo richiede `dynamic_variables` configurabili sul widget. Da approfondire.

### 4. Tool API key Cal.com (riusabile)

API key Cal.com già attiva (live): `cal_live_0c27497ac054ba44e73fdab6d3937f8a`. Stessa va per i nuovi event di viewing immobili (basta crearli su Cal.com sotto `stefano-russello/...`).

File locale: `/Users/stefanorussello/Documents/Projects/FollowTheFlow/Web/.secrets/calcom-api-key.txt`

## Contenuti del sito immobiliare

### Immobili (10 per lingua = 30 totali, fittizi ma con foto/descrizione reali)

Da reperire descrizioni e foto da portali reali:
- **IT (Milano)**: scraping da immobiliare.it, casa.it, idealista.it — 10 immobili di fasce diverse
- **ES (Mallorca)**: scraping da idealista.com (ES) e immovario.com (Inmovario?) — 10 immobili
- **EN (UK)**: scraping da rightmove.co.uk e zoopla.co.uk — 10 immobili in UK (Londra? Manchester? il target esatto da decidere con l'utente)

Per ogni immobile:
- 5-8 foto (lazy load + blurhash placeholder)
- Titolo
- Descrizione (full markdown)
- Prezzo
- Location
- m²
- Bedrooms / bagni
- Features (parcheggio, piscina, balcone, ecc.)
- Coordinate per mappa
- ID univoco

Schema dati: JSON statico in `src/data/listings/{en,it,es}/*.json` oppure file singolo `listings.json` con campi i18n. **Da decidere in base alla struttura cercata.**

### Hero video

Video full-bleed leggero, ottimizzato per mobile:
- Formato consigliato: **WebM VP9 + fallback MP4 H.264** (o solo MP4 H.265/HEVC se accettabile su tutti i browser target)
- Durata: 6-12 secondi loop
- Risoluzione: 1920x1080 max, ma encoded per <3MB
- `<video>` con `playsinline`, `muted`, `autoplay`, `loop`, `preload="metadata"`
- Poster image per il primo paint
- Considerare `media-query` per servire video più piccolo su mobile

Da chiedere all'utente: vuole un video specifico o usiamo stock B-roll real estate (Pexels/Unsplash)?

## Mobile-first

- Layout default su mobile (no `lg:` o `md:` come "primario", invertire l'approccio)
- Tap targets ≥ 44×44 px
- Bottom nav floating? Drawer menu?
- Photo gallery: swipe nativo + lightbox
- CTA "Prenota visita" sempre visibile / sticky in basso

## Sicurezza & secrets

- `.gitignore` deve includere `.secrets/`, `.env*`, `.claude/`
- API keys (ElevenLabs, Cal.com) salvate in `.secrets/` (non commitate) + nelle memorie globali Claude
- Quando si modifica/aggiunge una key, aggiornare le memorie ad hoc

## Stato corrente

- ✅ Directory creata: `/Users/stefanorussello/Documents/Projects/FollowTheFlow/RealEstateAgency_web`
- ✅ Git inizializzato + remote `git@github.com:Spettacolo83/real_estate_agency_web.git`
- ⏳ Agent di ricerca su siti immobiliari europei (Idealista, Immobiliare, Rightmove, Zoopla, Engel & Völkers, Knight Frank, ecc.) in corso → output da revisionare con l'utente
- ⏳ Da decidere con utente: design system, hero video, target UK city, lista 30 immobili

## Design system raccomandato dal report di ricerca

Sintesi (vedi `docs/design-research.md` per dettaglio completo). Top 5 ispirazioni: **Engel & Völkers, John Taylor, Knight Frank, Compass, Sotheby's International Realty**.

### Palette "Maison Mediterranean" (raccomandata)
- `bg.canvas` `#F8F5EF` (off-white avorio)
- `bg.surface` `#FFFFFF` (card)
- `text.primary` `#1A1A1A` (titoli, body)
- `text.muted` `#6B6660` (label, meta)
- `border.subtle` `#E8E2D7`
- `primary.deep` `#2C2A26` (nero caldo, CTA piene)
- `accent.gold` `#B08D57` (hover, badge "Esclusiva")
- `accent.terracotta` `#A14E3A` (accent secondario)

### Tipografia
- **Heading**: Cormorant Garamond 400/500 (display editoriale)
- **Body / UI**: Inter variable 400/500/600
- **Eyebrow**: Inter 500 uppercase tracking-wide
- Border radius **sharp** (0-2px) — lusso editoriale, no consumer tech

### Pattern UX chiave
- **Hero**: video full-bleed 100vh, 15-20s loop, headline serif overlay, search bar **sotto la fold** (non above)
- **Listing card**: foto 3:2, eyebrow "MILANO · BRERA", titolo Cormorant, info Inter, prezzo discreto
- **Property detail**: hero gallery (1 foto grande + grid 2×2), two-column 8+4 con card agente sticky desktop, single column + bottom sheet mobile
- **Search**: filtro non-sticky top bar (30 listing non richiedono motore aggressivo)
- **Voice agent**: floating "concierge bell" (no chat bubble standard) → modal con waveform animato

### Idee wow originali
1. Cinemagraph hero (più leggero del video)
2. Mini video-loop sulle card top (pattern Sotheby's)
3. AI voice agent come "concierge bell" hotel-style
4. Editorial neighborhood essays (Brera, Palma Old Town, Cotswolds)
5. Saved properties = "Private Selection" con export PDF brochure

### Tecnica video hero
- WebM VP9 + fallback MP4 H.264 (`<source>` doppio)
- Target 2-4 MB per 15-20s, max 6 MB
- 1280×720 30fps, VP9 ~1.5-2 Mbps
- `prefers-reduced-motion` → solo poster

### Tecnica foto immobili
- 30 listing × ~20 foto = ~600 immagini
- Storage Cloudflare R2 / S3, CDN, AVIF + WebP via `next/image`
- 3-4 sizes (400/800/1600/2400w)
- BlurHash placeholder (LQIP via `plaiceholder`)

---

## Prossimi passi (per la nuova sessione)

1. Leggere il report dell'agent (sarà disponibile al lancio sessione, o me lo passerà l'utente)
2. **Decidere insieme il design system** con utente (palette, typography, hero style)
3. Bootstrap progetto Next.js 15 + next-intl + Tailwind v4 + Framer Motion + TypeScript
4. Replicare struttura `src/app/[locale]/` come FTFAI
5. Implementare componenti base: Navbar, Footer, Hero, ListingCard, SearchBar
6. Implementare pagina lista immobili + pagina dettaglio
7. Implementare integrazione mappa (Leaflet/Mapbox)
8. Scrape 30 immobili da portali reali (script Python o manuale curato)
9. Creare 3 nuovi agenti ElevenLabs per real estate (IT, ES, EN) con prompt dedicato + tool Cal.com per viewing
10. Setup DNS Hostinger (record A `casa` → 161.97.125.230)
11. Setup nuovo servizio EasyPanel collegato al repo
12. Deploy + test

## Riferimenti rapidi al progetto FTFAI

- Sito FTFAI: `/Users/stefanorussello/Documents/Projects/FollowTheFlow/Web/site/`
- Memorie globali: `/Users/stefanorussello/.claude/projects/-Users-stefanorussello-Documents-Projects-FollowTheFlow-Web/memory/`
  - `elevenlabs_agents.md` — dettaglio completo dei 3 agenti vocali, API key, tool, integrazione widget
  - `server_contabo.md` — accessi SSH, stack del server, certificati, port mapping
  - `project_mailserver_migration.md` — piano futuro
- Secrets locali: `/Users/stefanorussello/Documents/Projects/FollowTheFlow/Web/.secrets/`
  - `elevenlabs-api-key.txt`
  - `calcom-api-key.txt`
