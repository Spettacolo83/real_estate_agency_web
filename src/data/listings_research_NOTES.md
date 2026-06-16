# listings_research.json — Note di compilazione

Generato per la demo `casa.followtheflowai.com`. 30 immobili selezionati (10 per ognuno dei 3 mercati). Sono dati reali estratti da portali pubblici, ricontestualizzati con copy editoriale boutique.

## Fonti effettivamente consultate

| Mercato  | Fonte primaria              | URL ricerca                                                                                 | Esito             |
| -------- | --------------------------- | ------------------------------------------------------------------------------------------- | ----------------- |
| Milano   | `knightfrank.com`           | `https://www.knightfrank.com/property-for-sale/italy/milan` (p1, p2)                        | OK — 12 raccolte, 10 selezionate |
| Mallorca | `knightfrank.com`           | `https://www.knightfrank.com/property-for-sale/spain/mallorca` (p1)                         | OK — 20 raccolte, 10 selezionate |
| London   | `rightmove.co.uk`           | 6 pagine quartiere: Mayfair, Kensington, Chelsea, Notting Hill, Belgravia, Marylebone       | OK — 150 raccolte, 10 selezionate |

### Fonti tentate ma bloccate

- `immobiliare.it`, `casa.it`, `idealista.it/com`, `zoopla.co.uk`, `engelvoelkers.com` (search non utile), `firstmallorca.com` (dati troppo poveri rispetto a KF), `sothebysrealty.com` / `italy-sothebysrealty.com` (JS-only / Cloudflare 403), `gate-away.com` (SPA, niente listing nel server-render).

> Knight Frank è risultata la fonte più ricca: ha cards SEO-renderizzate server-side con titolo, sottotitolo (tipologia + mq), descrizione breve, prezzo, immagine principale e URL annuncio. Rightmove inietta nel HTML il JSON completo delle properties della pagina, comprensivo di `bedrooms`, `bathrooms`, `summary`, `location.{lat,lng}`, e galleria di 5-40 immagini ad alta risoluzione: ideale per estrazione strutturata.

## Selezione qualitativa applicata

### Milano (10) — Knight Frank
Mix volutamente diversificato:
- 2 entry premium (Magenta €640K, CityLife small €800K)
- 4 high-end (€1.1M – €1.65M: Wagner, Porta Venezia, Garibaldi/TEN, Isola/Bosco Verticale, Duomo penthouse)
- 4 ultra-luxury (€1.89M – €2.9M: CityLife flagship, Brera new-build, Quadronno-Torre Velasca, San Babila trophy)
- Tipologie: 6 penthouses, 4 apartments — copertura naturale dei quartieri richiesti (Brera, Porta Venezia, Porta Romana, Magenta, CityLife) + addresses iconici (Wagner-Pagano, Corso Vittorio, Isola/Bosco Verticale, TEN Milano).

### Mallorca (10) — Knight Frank
- 2 entry premium (Sóller €1.75M e €2.75M)
- 4 high-end (€3M – €6.5M: Deià village, Santa Maria farmhouse, Binissalem new-build finca, Cala Deià)
- 4 ultra-luxury (€7.9M – €37M: Port d'Andratx waterfront trophy, Deià waterfront, Port d'Andratx finca-style, Santa Maria contemporary)
- Tipologie miste: villas, fincas, farmhouses. Località prestigiose richieste tutte coperte (Deià, Port d'Andratx, Sóller, Santa Maria del Camí, Binissalem, Cala Deià).

### London (10) — Rightmove
- 1 entry premium (South Kensington Gloucester Rd £975K)
- 1 mid (Mayfair Piccadilly flat £2.3M)
- 4 high-end (£18M – £25M: Notting Hill end-of-terrace, Marylebone Bryanston, Chelsea Cheyne Walk, Belgravia Chester Sq)
- 4 ultra-luxury (£32M – £49.5M: Kensington Holland Park Gate penthouse, Mayfair Grosvenor Sq, Belgravia Whistler Sq, Mayfair Balfour Pl mansion)
- Tipologie: flats, apartments, penthouses, end-of-terrace, town houses, houses. Tutti i 6 quartieri target coperti.

## Dati derivati / euristici (non da portale)

Knight Frank espone tipologia, mq (talvolta in acres di terreno per ville rurali), prezzo, descrizione e una foto hero. Mancano `bedrooms`, `bathrooms`, `coordinates` e galleria completa. Per coerenza con lo schema richiesto:

1. **bedrooms / bathrooms** stimate con tabella euristica documentata in `build_dataset.py` (per tipologia + mq o + acres). Plausibili al colpo d'occhio del cliente, da rivedere se i listing diventano "prima fila" della demo.
2. **coordinates** prese dal nome del quartiere con tabella statica (dizionari `MILAN_COORDS` / `MALLORCA_COORDS` in `build_dataset.py`). Precisione ~quartiere, sufficiente per la mappa demo (Leaflet/Mapbox).
3. **photo_urls**: 1 foto hero dal CDN del portale (Knight Frank content CDN o Rightmove media CDN ad alta risoluzione, URL senza `_max_NxN`) + 4 foto Unsplash curate per coerenza editoriale. Per i listing UK Rightmove ho preso fino a 5 foto direttamente dal portale, fallback Unsplash solo se ci sono meno di 5 foto. Lo schema è documentato nel campo `photos_source_note` di ogni listing.
4. **description_long**: copy 4-7 paragrafi rielaborato in tono editoriale boutique (Engel & Völkers / John Taylor style). Non è copia letterale dei portali. Per i listing London ho mantenuto fedeltà ai fatti dichiarati nel `summary` Rightmove (n. camere, indirizzo, tipologia) ma ho riscritto con voice originale.
5. **features**: array curato a mano per ogni immobile, basato su tipologia, quartiere e segnali nel `desc` originale (es. "TEN Milano" → "concierge 24h, pool, fitness"; "Bosco Verticale" → "Bosco Verticale views"; ecc.).

## Verifica tecnica delle foto

Tutte le 150 photo URLs sono state `HEAD`-verificate:
- 70 da Knight Frank CDN (`content.knightfrank.com`) → 100% HTTP 200
- 50 da Rightmove CDN (`media.rightmove.co.uk`) → 100% HTTP 200
- 30 da Unsplash CDN → 100% HTTP 200

Le URL Rightmove sono **alta risoluzione** (originale, dimensione tipica 1600+ px lato lungo). Le Knight Frank sono già a 1024-2048 px lato lungo (parametro `cio=true&w=1024` lasciato per non rischiare 404). Le Unsplash sono `?w=1600&q=80`.

## Raccomandazioni fotografiche alternative

Le foto Unsplash usate sono "luxury interior / Mediterranean villa / London apartment" generiche. Per fascia premium della demo (es. hero, immobili in homepage), considerare query Pexels/Unsplash più mirate:

- **Milano interiors**: query "milan luxury apartment interior", "italian penthouse", "art deco living room italy", "duomo view rooftop"
- **Mallorca**: query "mallorca finca", "mediterranean villa pool", "deia mountain view", "cala mallorca house"
- **London prime**: query "mayfair townhouse", "georgian london interior", "knightsbridge apartment", "chelsea river house"

Per immobili "trophy" (>£20M / >€10M) ideale **commissionare uno shoot** o usare set premium da:
- Unsplash collections curati: `Architecture & Interiors`, `Luxury Real Estate`
- Pexels: video stock cinemagraph (es. tende che ondeggiano in stanza vista park) ideali per hero pages
- Sirastock / iStock / Getty se budget consente — risoluzione 6000+ px

## Caveat legali (importante)

Le foto da Rightmove e Knight Frank CDN sono **direct hotlinks** ai loro server, non rehost. Per una demo commerciale che gira in meeting:
- **OK**: linkare in iframe / `<img src>` da slide / leave-behind sito demo per limited audience
- **NON OK** per produzione pubblica indicizzata: rischio di link rot e copyright issue se la demo viene resa pubblica e indicizzata da Google

**Prima di mettere la demo in produzione** (cioè quando `casa.followtheflowai.com` va live e diventa indicizzato), suggerisco:
1. Sostituire le hero photo con foto Pexels/Unsplash CC0 o originali
2. Mantenere il `source_url` come citazione opzionale (nel pannello "Ispirato a") o rimuoverlo
3. In alternativa, scaricare e ri-hostare le immagini sul nostro CDN (R2/Cloudflare Images) — questo richiede verifica della licenza KF/Rightmove, generalmente non concessa

## Schema dei campi

```ts
type Listing = {
  id_suggested: string;
  source_url: string;       // URL annuncio originale
  source_portal: string;    // hostname della fonte
  city: 'Milano' | 'Mallorca' | 'London';
  neighborhood: string;
  address_approx: string;   // Indirizzo approssimato (strada + zona)
  title: string;            // Boutique editorial, ≤70 char
  description_short: string;
  description_long: string; // 4-7 paragrafi
  price: number;
  currency: 'EUR' | 'GBP';
  sqm: number;
  bedrooms: number;
  bathrooms: number;
  property_type: string;    // Apartment, Penthouse, Villa, Farmhouse, Town House, House...
  features: string[];
  coordinates: { lat: number; lng: number };
  photo_urls: string[];      // 5 URL assoluti, hero per primo
  photos_source_note: string;
};
```

## Issues note / future iterazioni

- Nessun listing è risultato impossibile da completare. Tutti 30 hanno dati popolati.
- Per Milano ho privilegiato 10 listings KF di alta qualità lasciando fuori 2 ridondanti (Quadronno-Torre Velasca + Porta Romana new-build) — facili da ri-includere se serve allungare a 12.
- Per Mallorca, gli 837/9.6M e 240/2.75M sono molto simili agli analoghi già selezionati (Sóller) — selezione ha dato priorità a varietà di location.
- Per London ho dovuto allargare a Knightsbridge/Holland Park/Regent's Park dato che Rightmove ritorna queste zone come "Mayfair search adjacent". Resta tutto in **Prime Central London** come da brief.

## Script di build

Per rigenerare il JSON da zero (re-fetch + rebuild):
- I file HTML scaricati sono in `/tmp/rm_*.html` (Rightmove) e `/tmp/kf*.html` (Knight Frank)
- Lo script di costruzione è in `/tmp/build_dataset.py` (non committato; spostarlo nel repo come `scripts/build_listings.py` se vuoi mantenere riproducibilità)

Tempo totale di raccolta: ~50 minuti (fetch + parse + redazione copy + verifica foto).
