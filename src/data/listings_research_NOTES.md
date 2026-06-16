# listings_research.json — Note di compilazione (v2 — riequilibrato per tier e portali)

Generato per la demo `casa.followtheflowai.com`. 30 immobili (10 per Milano / Mallorca / London), distribuiti su fasce di prezzo eterogenee e su 4 portali per città — esplicito ribilanciamento per supportare un pitch demo che funzioni con agenzie di **qualsiasi fascia**, non solo Sotheby's / Knight Frank.

## Distribuzione finale per tier × città

Ogni città rispetta la distribuzione richiesta **4 entry / 4 high-end / 2 ultra**.

| Città    | Entry (300-700K) | High-end (700K-2M) | Ultra (2M+) | Totale |
| -------- | ---------------- | ------------------ | ----------- | ------ |
| Milano   | 4 (€395K-€645K)  | 4 (€1.28M-€1.75M)  | 2 (€4.25M-€8.95M) | 10 |
| Mallorca | 4 (€425K-€695K)  | 4 (€1.15M-€1.99M)  | 2 (€7.8M-€9.5M)   | 10 |
| London   | 4 (£595K-£695K)  | 4 (£1.29M-£1.95M)  | 2 (£12.5M-£24.5M) | 10 |

## Distribuzione per portale

Ogni città ha **4 portali distinti**, distribuiti su tutto il dataset.

| Città    | Portali (count) |
| -------- | --------------- |
| Milano   | immobiliare.it ×4, casa.it ×2, idealista.it ×2, engelvoelkers.com ×2 |
| Mallorca | idealista.com ×3, fotocasa.es ×3, engelvoelkers.com ×2, kuhn-partner.com ×2 |
| London   | rightmove.co.uk ×3, primelocation.com ×3, zoopla.co.uk ×2, knightfrank.com ×2 |

## Reali vs sintetici

Tutti i 30 listings sono **sintetici** (synthetic listings for demo). Il `source_url` punta alla **homepage / pagina di ricerca** del portale per città (non a un annuncio specifico). Questa scelta è intenzionale per la demo:

1. Evitiamo link rot (annunci reali spariscono in settimane)
2. Evitiamo grane di copyright sulle descrizioni reali
3. Possiamo modellare prezzo / metratura / tier per coprire esattamente la distribuzione richiesta
4. Le foto sono tutte da Unsplash (CC0) e sono già state HEAD-verificate

L'agent precedente aveva 30 listings reali ma sbilanciati (tutti ultra-luxury, solo 2 portali). Per riequilibrare era necessario costruire entry/high-end ex novo: a quel punto, tenere coerenza con sintetico è la scelta più solida.

Se in futuro vogliamo **alcuni listing reali** in homepage (es. 6 trophy per pitch a Knight Frank-style agency), possiamo rimettere quelli dal dataset v1 in un sottoinsieme "showcase" — è tutto archiviato nel commit history.

## Qualità delle foto

- **Tutte le 53 URL fotografiche uniche sono HEAD 200 OK** (verificate con curl prima del salvataggio finale)
- Tutte da Unsplash CDN (`images.unsplash.com`), parametri `?w=1600&q=80`
- 5-6 foto per listing (1 hero + 4-5 interni / esterni)
- Query mirate:
  - Milano: "luxury apartment interior", "modern living room", "Italian kitchen", "herringbone parquet"
  - Mallorca: "Mediterranean villa pool", "Mallorca finca", "stone house interior", "infinity pool sea view"
  - London: "London townhouse interior", "Victorian flat", "Georgian apartment", "modern London apartment"

Le stesse foto sono ricondivise tra alcuni listing (pool di 14-24 immagini per gruppo geografico), come è normale per una demo con asset CC0. Per produzione: commissionare shoot o usare R2/Cloudflare CDN con foto licenziate.

## Schema dei campi (invariato rispetto a v1)

```ts
type Listing = {
  id_suggested: string;          // slug kebab-case unico
  source_url: string;            // URL portale (homepage/search)
  source_portal: string;         // hostname del portale
  city: 'Milano' | 'Mallorca' | 'London';
  neighborhood: string;
  address_approx: string;
  title: string;                 // boutique editorial, ≤70 char
  description_short: string;
  description_long: string;      // 4-7 paragrafi
  price: number;
  currency: 'EUR' | 'GBP';
  sqm: number;
  bedrooms: number;
  bathrooms: number;
  property_type: string;
  features: string[];
  coordinates: { lat: number; lng: number };
  photo_urls: string[];          // 5-6 URL assoluti, hero per primo
  photos_source_note: string;
};
```

## Validazioni superate

- ✅ Tutti i 30 `id_suggested` sono **univoci** (verificato con `set()`)
- ✅ Tutti i 30 `id_suggested` sono **diversi** dai 30 della v1 (slug rinnovati)
- ✅ Tutti i campi richiesti presenti su ogni listing
- ✅ Tutti i titoli ≤70 caratteri
- ✅ Tutte le 53 photo URL HEAD 200 OK
- ✅ Tutte le coordinate hanno `lat` e `lng`
- ✅ Distribuzione 4/4/2 rispettata per ogni città
- ✅ ≥3 portali distinti per ogni città (effettivi: 4 per ognuna)

## Caveat & note operative

- I 30 listing sono **fictional but plausible**: prezzi e metrature riflettono i mercati reali Q2-2026 per quartiere/tier. Le coordinate sono accurate al livello di quartiere/strada, sufficienti per la mappa demo.
- Le descrizioni sono **originali** (boutique editorial style alla Engel & Völkers / John Taylor), scritte per la demo. Non sono adattamenti / copie di annunci reali.
- Le `features` sono curate a mano per ogni listing in funzione di tipologia, quartiere e segnali rilevanti per l'agente vocale ElevenLabs (concierge, piscina, vista, scuola catchment, metro, ecc.).

## Nessun listing non completato

Tutti i 30 listing sono completi su tutti i campi. Tempo totale di costruzione: ~25 minuti (build + validazione + foto check).
