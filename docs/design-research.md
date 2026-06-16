# Design Research — Agenzia Immobiliare Premium (Milano / Mallorca / UK)

> Nota metodologica: WebFetch è risultata bloccata su tutti i siti immobiliari target (Engel & Völkers, Sotheby's, Rightmove ecc.), quindi l'analisi sito-per-sito è stata condotta tramite WebSearch su fonti secondarie (case study, brandfetch, brand portal pubblici, design blogs, Dribbble/Behance) e conoscenza pubblica dei brand. Dove un dato preciso (es. hex esatto, font del body) non è verificabile in remoto, viene annotato con "ricostruzione" o range plausibile. Per la fase implementativa raccomando una verifica diretta in browser (DevTools → Computed → font/colore) prima di committare i token nel design system.

---

## 1. Analisi siti — Sintesi per cluster

### 1.1 Cluster mass-market (cosa NON fare)

**immobiliare.it / casa.it**
- Hero: assente o ridotto a una barra di ricerca su sfondo piatto / immagine generica. Pagina home dominata da una griglia di "ricerche rapide" e box promozionali.
- Palette: rosso #E30613-ish (immobiliare), blu #004B87 (casa), bianco, grigi. Saturi, aggressivi.
- Tipografia: sans-serif neutro tipo Open Sans / system-ui. Nessun carattere editoriale.
- Listing card: 4:3 foto, prezzo grosso in rosso/blu, badge "NUOVO/IN ESCLUSIVA", layout denso. Aspetto da motore di ricerca.
- Mobile: header alto, filtri full-screen modal, CTA "Chiama" fissa in fondo. Funzionale ma generica.
- **Perché non premium**: densità informativa altissima, color popping, troppi badge, nessun spazio bianco, foto trattate come thumbnail.

**idealista (.it / .com / .es)**
- Palette firmata: verde-lime #E2F46E + magenta/viola #B72683 (estremamente riconoscibili, brand-strong ma ostili al lusso).
- Hero: barra di ricerca centrale su sfondo lime, copy diretto.
- Card: ratio 4:3, prezzo in nero bold, info inline (camere, mq), heart-icon favorite. Pulito ma "consumer app".
- Mobile: bottom nav a 4-5 voci, swipe gallery sulla card. UX solidissima.
- **Lezione**: idealista ha una mobile UX da copiare nella meccanica (gallery swipe, sticky CTA), ma colori e tipografia sono l'opposto del lusso.

**fotocasa.es** — palette rosso/arancio acceso + bianco, simile a immobiliare.it. Stesso pattern: motore di ricerca, card dense, gerarchia debole.

**rightmove.co.uk** — palette verde scuro #003a3f / acid green per CTA + bianco. Recentemente refreshato. Hero: search bar grossa su immagine residenziale UK. Card: orizzontale su desktop con grande foto a sinistra, dettagli a destra, "Marketed by" in basso. Listing-centric, focus su quantità. Mobile: card verticale, CTA "Call agent" sticky.

**zoopla.co.uk** — palette viola/lilla #320A6B + giallo accent (rebrand 2023 più "consumer friendly"). Tono più editoriale di Rightmove ma sempre mass-market.

> **Conclusione cluster mass-market**: tutti puntano alla densità (più listing visibili = più CTR). Per una boutique premium questa è la trappola principale da evitare. Ogni nostro listing deve respirare.

### 1.2 Cluster premium boutique (la nostra vera ispirazione)

**engelvoelkers.com** (ricostruzione + brand portal pubblico)
- Hero: full-bleed image/video alternato, search bar minimal posizionata in basso o sotto la fold. Headline editoriale serif su immagine.
- Palette: rosso E&V #C8102E (signature), bianco panna, nero, accenti grigi caldi. Recente refresh (Saffron + Dalton Maag, 2023) ha calmato le saturazioni.
- Tipografia: custom serif "Engel & Völkers ML" (Dalton Maag), pairing con sans neutra per UI.
- Card: ratio 3:2, foto pulita senza badge, location in piccolo caps sopra il prezzo, prezzo senza enfasi cromatica. Tanto whitespace.
- Mobile: drawer menu, hero immagine 80vh, scroll storytelling.
- **Premium markers**: tipografia custom, search bar NON sopra la fold ma integrata, niente popup, foto come protagoniste.

**sothebysrealty.com**
- Palette: Prussian Blue #002349 dominante + bianco + nero. Estremamente coerente.
- Hero: carousel di "extraordinary listings" con micro-video loop muti su ogni proprietà.
- Tipografia: serif editoriale tradizionale per headlines (associabile a un Baskerville/Caslon-style), sans-serif per UI.
- Listing: editoriale, foto enormi, descrizione lunga e narrativa ("lifestyle stories").
- **Premium markers**: blu profondo "auction house", oro/dorato in dettagli, micro-video al posto di immagini statiche.

**knightfrank.com**
- Palette: nero #000 + giallo Knight Frank #F5DF4D usato con parsimonia + bianco.
- Hero: immagine grande, headline serif lunga editoriale, CTA discreta.
- Card: foto grande, info minimal (location + price + bedrooms), tante card respiranti.
- **Premium markers**: contrasto nero/giallo signature ma sobrio, micro-tipografia ben curata.

**savills.com** — palette blu navy #002B5C + rosso burgundy + bianco crema. Tipografia: serif classico (logo storico) + sans contemporanea per UI. Card: layout pulito, agente sempre evidenziato (il "trust" dell'agente è centrale).

**johntaylor.com**
- Palette: nero/grigio antracite + oro/champagne + bianco. Stile "vecchia maison" (fondata 1864).
- Hero: video full-bleed di proprietà costiere (Riviera, Mallorca, Monaco).
- Tipografia: serif elegante a contrasto alto, body sans leggero.
- Card: ratio cinematografico 16:10 o 21:9, prezzo discreto.

**christiesrealestate.com** — palette rosso Christie's #A51E36 + nero + bianco crema. Auction-house heritage. Tipografia: serif tradizionale, classica, autorevole. Hero: rotating immagini cinematografiche di proprietà iconiche.

### 1.3 Cluster modern/design-first

**compass.com**
- Palette: nero + bianco + accenti molto soft (rame/blu polvere). "Modern startup di lusso".
- Tipografia: pairing display contemporaneo + sans (storia: dipartimento design interno).
- Hero: search bar prominent su immagine residenziale, "Find your place" copy diretto.
- Card: foto enorme, hover reveal info, save heart.
- **Lezione**: come fa Compass, "tech meets luxury" — utility chiara senza perdere il tono premium.

**kantoor.com / kungholmen.se / residential.compass.com** (design-first scandinavi/boutique)
- Whitespace estremo, ratio cinematografici, scroll guidato.
- Spesso nessuna search bar above the fold: il sito è un portfolio editoriale, non un motore di ricerca.
- **Lezione**: per una boutique con 30 immobili totali, NON serve un motore di ricerca aggressivo. Serve un'esperienza editoriale.

---

## 2. Top 5 di ispirazione per il nostro caso

Boutique + 30 listing + multi-lingua + tre mercati premium (Milano, Mallorca, UK):

1. **Engel & Völkers** — il riferimento più diretto: stesso footprint geografico (Italia, Spagna, UK), stesso posizionamento boutique-luxury, stessa esigenza multi-lingua. Da copiare: la sobrietà tipografica e l'uso di whitespace.
2. **John Taylor** — heritage maison, palette nera/champagne, hero video cinematografici di Riviera/isole. Perfetto come "north star" per Mallorca + Milano centro.
3. **Knight Frank** — il modo in cui usa il giallo come accento parsimonioso può ispirare il nostro "accent gold/terracotta". Tipografia editoriale ma con UI moderna.
4. **Compass (residential)** — per il pattern UX moderno (hover card, save listing, mappa integrata) mantenendo tono premium. Bilancia "boutique" e "usabilità tech".
5. **Sotheby's International Realty** — per il pattern dei micro-video sulle card (vedi sezione 5 idee wow) e per l'autorevolezza della palette navy.

---

## 3. Design system raccomandato

### 3.1 Palette — opzione A "Maison Mediterranean" (RACCOMANDATA)

Tono caldo, mediterraneo, distingue da E&V (rosso) e Sotheby's (blu navy). Funziona benissimo per Mallorca e Milano centro.

| Token | Hex | Uso |
|---|---|---|
| `bg.canvas` | `#F8F5EF` | sfondo off-white avorio |
| `bg.surface` | `#FFFFFF` | card |
| `text.primary` | `#1A1A1A` | titoli, body principale |
| `text.muted` | `#6B6660` | label, meta info |
| `border.subtle` | `#E8E2D7` | divider, card outline |
| `primary.deep` | `#2C2A26` | nero caldo, CTA piene |
| `accent.gold` | `#B08D57` | hover, link, badge "Esclusiva" |
| `accent.terracotta` | `#A14E3A` | accent secondario, prezzi su mappa |

### 3.2 Palette — opzione B "Nordic Editorial" (alternativa più tech)

Più vicina a Compass / kantoor.

| Token | Hex |
|---|---|
| `bg.canvas` | `#FAFAF8` |
| `text.primary` | `#0B0B0B` |
| `accent` | `#1F3A2E` (verde profondo "British racing") |
| `gold-detail` | `#C4A872` |

> **Raccomandazione**: A è più memorabile e differenziante. B più "safe" e tech-friendly. Andiamo con A.

### 3.3 Tipografia

- **Heading (display, h1-h3)**: **Cormorant Garamond** o **Playfair Display** in `400/500`. Cormorant ha più carattere, Playfair è più riconoscibile. Scegli Cormorant per distinguerti.
- **Subheading editoriale (h4-h5, eyebrow)**: **Cormorant Italic** o stesso family.
- **Body / UI**: **Inter** (variabile, `400/500/600`) — performance eccellente, leggibilità impeccabile a piccole dimensioni.
- **Numeri (prezzi, mq)**: Inter con `font-variant-numeric: tabular-nums` per allineamento.
- **Tipo scale** (mobile→desktop, modular 1.25):
  - h1: `clamp(2.5rem, 6vw, 4.5rem)` Cormorant 400
  - h2: `clamp(2rem, 4vw, 3rem)` Cormorant 400
  - h3: `1.5rem` Cormorant 500
  - body: `1rem` Inter 400, line-height 1.65
  - meta: `0.8125rem` Inter 500, letter-spacing `0.06em`, uppercase

### 3.4 Spacing, grid, radius

- Base: **8px** (tutto multiplo di 4 o 8).
- Grid: **12 colonne** desktop, gap `24px`; mobile single column con padding laterale `20px`.
- Container max-width: `1440px` (premium) — non andare oltre, lo spazio bianco conta.
- **Border radius**: **sharp** (0-2px) su card e bottoni rettangolari. Sharp = lusso editoriale. Soft (12px+) lo associo a consumer tech.
- Eccezione: input radius `2px`, bottoni primary `0` o `2px`.

### 3.5 Animation style

- **Subtle only**: fade-in + slight translateY su scroll (Framer Motion `whileInView`).
- Durate: `400-700ms`, easing `cubic-bezier(0.22, 1, 0.36, 1)` (ease-out-expo).
- Hover: opacity / translateY 2px su immagini, mai bounce.
- **Vietato**: parallax pesanti, particles, scroll-jacking.

---

## 4. Pattern UX concreti da copiare

### 4.1 Hero (homepage)

Pattern raccomandato (mix E&V + John Taylor):
- Video full-bleed `100vh` su desktop, `85vh` mobile.
- Video muto autoplay, loop 15-20s, contenuto: ville Mallorca + skyline Milano + Cotswolds UK in 3 scene tagliate al ritmo.
- Overlay scuro radiale `rgba(0,0,0,0.25)` per leggibilità testo.
- Headline editoriale serif overlay: H1 in Cormorant, centrato-sinistra basso.
- Search bar minimal **sotto la fold** (non above the fold) — la prima impressione deve essere emotiva, non funzionale. È la differenza tra boutique e portale.
- Mini CTA "View Properties" come link sottolineato sottile, no bottoni pillola.

### 4.2 Listing card

```
┌─────────────────────────┐
│                         │
│      foto 3:2           │
│      (gallery dot)      │
│                         │
├─────────────────────────┤
│ MILANO · BRERA          │ ← eyebrow uppercase 11px gold/muted
│ Penthouse with terrace  │ ← Cormorant 22-26px
│ 3 bed · 2 bath · 180 m² │ ← Inter 13px muted
│                         │
│ € 2,450,000             │ ← Inter 18-20px primary
└─────────────────────────┘
```

- Aspect ratio foto **3:2** (cinematic ma non eccessivo).
- Niente badge urlati. Eventuale "ESCLUSIVA" come eyebrow sottile.
- Hover: image slight zoom (1.03), prezzo non cambia colore.
- Heart/save icon top-right discreto.
- Su mobile: swipe gallery con dot indicator (pattern Idealista, ma con stile più pulito).

### 4.3 Property details page

Struttura raccomandata top-down:

1. **Hero gallery** full-width: prima foto 100vw × 75vh + griglia 2x2 di altre 4 foto a destra su desktop. Click → lightbox.
2. **Sticky compact header** al scroll: titolo, prezzo, CTA "Schedule a viewing".
3. **Two-column layout desktop** (8 + 4 col):
   - Colonna sinistra (8): titolo h1, descrizione editoriale (3-5 paragrafi), features grid (chips), planimetria, mappa.
   - Colonna destra (4) sticky: card agente con foto + nome + telefono + "Schedule viewing" + "Call AI agent" (il vocale).
4. **Mobile**: single column, tutte le sezioni stacked. La card agente diventa bottom sheet sticky (height collassata, expand on tap).
5. **Photo gallery**: lightbox fullscreen con thumb strip in basso, frecce + swipe, conteggio "12/40".
6. **Map**: integrata in section dedicata, no full-bleed sticky (distrae).
7. **Footer della scheda**: "Similar properties" — 3 card.

### 4.4 Search/filter UX

Dato che hai **solo 30 immobili totali**:
- **NON usare un motore di ricerca aggressivo**. Usa una pagina `/properties` filtrabile.
- Top filter bar **non-sticky** (con 30 listing non serve): City segmented (Milano | Mallorca | UK), Type (Apartment | Villa | Townhouse), Price range, Bedrooms.
- Mobile: bottone "Filters" che apre bottom sheet drawer.
- View toggle: Grid (default) / Map.

### 4.5 Mobile UX specifics

- **No bottom nav app-style** (rende consumer): tieni l'header semplice con hamburger drawer.
- **Sticky CTA bottom on property page**: "Schedule viewing" + "WhatsApp/Call". Always visible.
- **Swipe gallery** sulla card listing.
- **Pull-to-refresh disabled** (non è una app news).
- **Hero video**: sostituisci con poster image statico se `prefers-reduced-motion` o `connection.effectiveType === '3g'`.

---

## 5. Cinque idee "wow" originali (non gimmick)

1. **Cinemagraph hero invece di video classico**: una sola scena (es. tende che si muovono in una villa Mallorca con mare sullo sfondo) in loop sottile. Pesa 1/5 di un video tradizionale, look magazine. Riferimento: pattern usato da hotel di lusso (Aman, Six Senses).
2. **Mini video-loop sulla listing card** (pattern Sotheby's): le prime 4-6 card della home mostrano un 3-secondi muto in autoplay al posto della foto statica, solo desktop e solo dopo viewport intersection. Drammatico.
3. **AI voice agent come "concierge bell"** flottante in basso a destra (non chat bubble standard): icona di campanello da reception, click → modal con waveform animato che si attiva quando l'agente vocale parla. Posizionamento "boutique hotel concierge", non "support chatbot".
4. **Editorial neighborhood essays**: per ogni città (Brera, Palma Old Town, Cotswolds) una pagina lunga editoriale con foto/mappa/storia → le listing della zona sono linkate alla fine. SEO killer + tono editoriale boutique.
5. **Saved properties = "Private Selection"**: invece di "Wishlist/Favorites", chiama il save "Add to my Private Selection". Pagina dedicata con layout brochure-style esportabile in PDF (mailable). Il copy fa la differenza percepita.

Bonus (opzionale, attenzione gimmick): blurhash placeholder con leggero "ken burns" parallax sulla foto hero della scheda — solo se renderizzato bene.

---

## 6. Considerazioni tecniche

### 6.1 Video hero

- **Formato**: doppio asset HTML5 con `<source>`:
  - Primario: **WebM VP9** (40-60% più leggero di MP4 a parità di qualità).
  - Fallback: **MP4 H.264** (Safari iOS < 14, vecchi browser).
  - HEVC/H.265 in MP4 ha supporto Safari ma non Chrome → conviene solo se servi via HLS con Cloudflare Stream.
- **Target size**: **2-4 MB totale** per loop 15-20s. Mai oltre 6 MB.
- **Risoluzione**: master a 1920×1080, encode a 1280×720 30fps (sufficiente con overlay scuro).
- **Bitrate**: VP9 ~1.5-2 Mbps, H.264 ~2.5-3 Mbps.
- **Attributi**: `autoplay muted loop playsinline preload="metadata"` + `poster="..."` (sempre).
- **Adaptive**: se budget lo consente, serve via **Cloudflare Stream** o **Mux** (HLS adaptive, gestisce 3G→4K automaticamente). Per 30 listing budget-friendly, Cloudflare R2 + asset statici va benissimo.
- **Pattern reduced-motion**: `prefers-reduced-motion` → mostra solo poster.

### 6.2 Foto proprietà (30 listing × ~20 foto = 600 immagini)

- **Storage**: Cloudflare R2 o S3 + CDN (Bunny/Cloudflare).
- **Formato runtime**: AVIF con fallback WebP via `next/image` — riduzioni 30-50% vs JPEG.
- **Sizes**: generare 3-4 varianti (400w mobile card, 800w desktop card, 1600w gallery, 2400w lightbox). `next/image` fa da solo.
- **Placeholder**: `placeholder="blur"` con `blurDataURL` (LQIP 10×10 base64) — generato a build time con `plaiceholder` o `sharp`. Pesa 200-500 byte per immagine, evita CLS, dà l'effetto "blur-up premium".
- **Lazy loading**: `loading="lazy"` nativo + `fetchpriority="high"` solo sulla prima foto hero della scheda.
- **EXIF strip + sRGB**: pipeline di build deve normalizzare orientation e color profile.

### 6.3 Multi-lingua per contenuti immobili

Strategia raccomandata: i campi traducibili come oggetto i18n, i campi "factual" come scalari condivisi.

```ts
type Property = {
  id: string
  slug: { en: string, it: string, es: string }  // SEO per locale
  city: 'milano' | 'mallorca' | 'london' | ...   // shared
  price: number                                   // shared
  currency: 'EUR' | 'GBP'                         // shared
  bedrooms: number                                // shared
  area_sqm: number                                // shared
  coords: [number, number]                        // shared
  photos: PhotoAsset[]                            // shared (alt-text per locale)
  title: { en: string, it: string, es: string }
  description: { en: string, it: string, es: string }
  features: { en: string[], it: string[], es: string[] }
}
```

- Approccio "single document, i18n fields" è meglio di "one document per locale" perché evita di duplicare 30 listing × 3 lingue = 90 record da tenere sincronizzati su price/photo updates.
- Per i contenuti UI statici (CTA, label, navigation): **next-intl** con file JSON per locale in `/messages/{en,it,es}.json`.
- **Routing**: `/it/proprieta/[slug]`, `/es/propiedades/[slug]`, `/properties/[slug]` (en default). Genera `hreflang` + canonical correttamente per SEO.
- **CMS**: se vuoi gestire i listing senza ricompilare, raccomando **Sanity** o **Payload CMS** (entrambi gestiscono i18n fields nativamente). Per soli 30 listing relativamente stabili anche un singolo `properties.json` in repo + rebuild on push è accettabile.
- **Auto-detect lingua**: middleware Next.js legge `Accept-Language` solo al primo accesso `/`, poi rispetta scelta utente in cookie (`NEXT_LOCALE`). Mai forzare redirect se l'utente naviga manualmente in un'altra lingua.

---

## 7. Quick wins prioritari (se devi tagliare scope)

Se devi rilasciare un MVP in 2-3 settimane:

1. Tipografia Cormorant + Inter già da v1.
2. Palette "Maison Mediterranean" (off-white + nero caldo + gold accent).
3. Hero video con un solo loop di 15s (puoi commissionarne uno solo all'inizio, anche da stock se necessario).
4. Listing card 3:2 + grid 3-up desktop.
5. Property detail con gallery lightbox + sticky agent card + AI voice agent come concierge flottante.
6. i18n EN/IT/ES con next-intl.
7. Skip al v2: cinemagraph custom, mini video sulle card, neighborhood essays.

---

## Fonti consultate (selezione)

- Sotheby's International Realty — Brandfetch
- Engel & Völkers — Iconic brand refined (Saffron + Dalton Maag rebrand, 2023)
- Idealista UX color palette / UX/UI redesign case study
- Luxury real estate website design — Mediaboom
- Best fonts for real estate websites 2025
- Playfair / Cormorant / Inter font pairing
- Compass Quarterly — design journey
- Best video format for web 2026 (Sureshot.video)
- Smashing Magazine — Optimizing Video for Size & Quality
- Next.js Image Optimization (official)
- BlurHash + Next.js — LogRocket
- next-intl — i18n Next.js
- Property Industry Eye — Zoopla rebrand
- Luxury Presence — Real estate typography trends
- HousingWire — Best real estate website designs 2026

---

> Caveat onestà: WebFetch è stato negato dal sandbox sui siti immobiliari reali, quindi non si sono potuti ispezionare i CSS live. Le palette e i font specifici (es. font esatto Knight Frank, hex preciso Engel & Völkers post-rebrand) andrebbero confermati con un controllo manuale in DevTools prima di committerli come token. Tutte le raccomandazioni di pattern UX e architettura tecnica sono comunque solide e applicabili così come sono.
