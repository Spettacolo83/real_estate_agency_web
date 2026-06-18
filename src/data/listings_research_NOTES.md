# listings_research.json — Note di compilazione (v3 — Miakasa integration)

Generato per la demo `casai.followtheflowai.com`. 30 immobili (10 per Milano / Mallorca / London), distribuiti su fasce di prezzo eterogenee.

> **v3 (Miakasa integration)**: l'array `milano` è stato sostituito con **10 immobili reali di Miakasa** (agenzia di Uboldo, VA — https://miakasa.it/), per il pitch verticale alla loro agenzia. Gli array `mallorca` e `london` restano invariati dalla v2.

## Miakasa integration

### Codici scelti (10/47)

| Codice | Comune | Prezzo | Tipo | mq | Camere | Note |
| ------ | ------ | ------ | ---- | -- | ------ | ---- |
| 28042025 | Uboldo | €79.000 | Bilocale | 67 | 1 | Da ristrutturare, posto auto |
| 05062026 | Origgio | €123.000 | Bilocale duplex | 50 | 1 | Doppi servizi, 2 balconi |
| 07012026 | Rescaldina | €129.000 | Bilocale | 65 | 1 | Giardino 170 m², classe B |
| 02052026 | Uboldo | €179.000 | Appartamento in villa | 124 | 1 | Giardino condiviso |
| 26062025 | Uboldo | €227.000 | Trilocale | 95 | 2 | Box doppio, doppi servizi |
| 13042026 | Saronno | €259.000 | Quadrilocale | 140 | 3 | Palazzina quadrifamiliare |
| 29032026 | Caronno Pertusella | €305.000 | Duplex | 125 | 3 | Tripla esposizione, box doppio |
| 17062026-1 | Origgio | €445.000 | Villa unifamiliare nuova | 142 | 3 | Classe A4, giardino 102 m² |
| 29052026 | Uboldo | €435.000 | Villa singola nuova | 206 | 3 | Classe A4, taverna, giardino 150 m² |
| 26032024 | Arzachena (Porto Cervo) | €3.250.000 | Attico | 165 | 3 | Residence Sa Cascada, vista baia |

### Distribuzione effettiva

- **Per fascia di prezzo**: 4 entry (≤200K) + 5 mid (200-500K) + 1 ultra-luxury (3.25M) — il mercato Miakasa è prevalentemente mid-tier con un unico trophy (Porto Cervo). Mancano deliberatamente listing 500K-1M perché Miakasa non ne ha nell'inventario corrente.
- **Per tipologia**: 5 appartamenti (incl. 1 attico premium) + 2 villette nuove (classe A4) + 2 case indipendenti/duplex + 1 villa
- **Per comune**: Uboldo ×4 (core market dell'agenzia), Origgio ×2, Saronno ×1, Caronno Pertusella ×1, Rescaldina ×1, Porto Cervo ×1 (trophy/satellite). Tutte le località principali della provincia di Milano nord-ovest sono rappresentate.

### Foto e note legali

- **Photos**: tutte hotlinked dalla CDN Miakasa (`static3.agimonline.com`). 8 foto per listing (cover + 7 interni/esterni). **Tutte le 10 cover HEAD-verificate 200 OK** prima del salvataggio.
- **Note legale demo**: hotlinking dalla CDN Miakasa è accettabile per dimostrare il sito DIRETTAMENTE all'agenzia (i loro stessi immobili → loro stesso brand → loro stessa CDN). Per qualsiasi uso pubblico/produzione si dovrà ottenere consenso esplicito Miakasa o scaricare le foto e ospitarle su CDN propria (R2/Cloudflare) con accordo scritto.
- **Descrizioni**: completamente riscritte in stile boutique editorial CasAI (i descrittivi originali Miakasa contenevano firma agenzia, numeri WhatsApp e CTA che sono stati rimossi). I dati base (m², camere, prezzo, classe energetica, indirizzo approssimativo) sono accurati e tratti dalla scheda originale.
- **Coordinate**: centro del comune o quartiere, non geocoding preciso del civico (sufficiente per mappa demo).

---

## v2 baseline (Mallorca + London invariate)

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

---

## Proofreading 2026-06-18

Revisione integrale dei 90 campi descrittivi (30 listings × 3 lingue × `description_short`/`description_long`), con focus su anglicismi, calchi e terminologia immobiliare nativa per IT/EN/ES.

### Sintesi correzioni

- **Listing con almeno una correzione**: ~27/30 (3 listings — alcuni Mallorca high-end EN — non hanno richiesto modifiche sostanziali)
- **Modifiche per lingua**: IT ~30 campi toccati, EN ~10, ES ~25
- **Modifiche per campo**: `description_long` ~50, `description_short` ~15

### Top 5 tipi di errore corretti

1. **Terminologia camere/locali IT**: uso errato di "monocamera" (Bermondsey), incongruenze "Bilocale" vs "Trilocale" tra title e desc_short (Portixol, Santa Catalina), e "Trilocale" usato per 3-bed quando doveva essere "Quadrilocale" (Portals Nous). Norma applicata: 1 bed = bilocale, 2 bed = trilocale, 3 bed = quadrilocale.
2. **Calchi sintattici "piece of inventory / honest piece / piece for the buyer"**: tradotti meccanicamente in IT come "Un pezzo onesto", "Un pezzo identitario", "Un pezzo per l'acquirente che..." → riscritti in italiano naturale ("Una proposta sincera e ricca di carattere", "Una proposta identitaria per l'acquirente che...").
3. **Calchi "casa di famiglia" e "casa di città"**: traduzione meccanica di "family house" e "townhouse" (Fulham, Hampstead, Palma Old Town). In italiano "casa di famiglia" significa altro (casa dei genitori). Corretto in "casa vittoriana", "palazzo cittadino", ecc.
4. **Anglicismi ES non castigliani**: "renovar" → `reformar`; mantenuto `ático` solo dove non in titolo; "abujardado" (bush-hammered) usato erroneamente per "honed" (Son Vida) → `pulido`; "lavado de cara estético" lasciato perché idiomatico in ES.
5. **Tono "trophy/confident" anglo**: "proposta trofeo", "Una villa sicura", "address principale" → "proposta di prestigio assoluto", "Una villa decisa e luminosa", "indirizzo di assoluta rappresentanza".

### Esempi prima/dopo

1. **london-bermondsey-warehouse / IT desc_short**
   - Prima: "Monocamera ricavato da un warehouse di Shad Thames, con finestra affacciata sul Tamigi…"
   - Dopo: "Bilocale ricavato da un ex-warehouse di Shad Thames, con finestra affacciata sul Tamigi…"

2. **mallorca-portixol-seaview / IT desc_short**
   - Prima: "Bilocale fronte mare nel cuore della strip dei ristoranti di Portixol…" (incongruente: il titolo IT dice "trilocale", il listing è 2-bed)
   - Dopo: "Trilocale fronte mare nel cuore della strip dei ristoranti di Portixol…"

3. **mallorca-portals-nous / IT desc_short**
   - Prima: "Trilocale con terrazza di 40 m² affacciata su Puerto Portals…" (errato: 3-bed = quadrilocale)
   - Dopo: "Quadrilocale con terrazza di 40 m² affacciata su Puerto Portals…"

4. **london-fulham / IT desc_short**
   - Prima: "Casa a schiera vittoriana di tre camere con giardino di 28 m² sul retro, vicino a Bishop's Park e in un bacino scolastico primario riconosciuto." (calco "recognised primary school catchment")
   - Dopo: "Casa a schiera vittoriana di tre camere con giardino di 28 m² sul retro, vicino a Bishop's Park e in un bacino scolastico primario di prestigio."

5. **mallorca-port-andratx / IT desc_long (chiusura)**
   - Prima: "Una proposta trofeo per l'acquirente internazionale in cerca di una residenza principale o estiva nel cuore della baia più prestigiosa di Mallorca."
   - Dopo: "Una proposta di prestigio assoluto per l'acquirente internazionale in cerca di una residenza principale o estiva nel cuore della baia più rinomata di Mallorca."

### Anomalie non sanabili senza decisione Stefano

Per vincolo del task non sono stati modificati i titoli, ma due titoli ES presentano errori di terminologia che dovrebbero essere corretti:

- `mallorca-palma-old-town-1bed-5571` — title ES: **"estudio pied-à-terre con acceso a azotea"**. Il listing ha 1 dormitorio → in ES standard "estudio" = monolocale (zero camere separate). Suggerimento: "apartamento de un dormitorio pied-à-terre con acceso a azotea".
- `london-bermondsey-warehouse-1bed-2200` — title ES: **"estudio en warehouse con vistas al Támesis"**. Stesso problema (1 bedroom, non monolocale). Suggerimento: "apartamento de un dormitorio en warehouse…".

Inoltre, in `london-mayfair-trophy-penthouse-1167` il titolo ES contiene "penthouse" (anglicismo); per coerenza castigliana sarebbe "ático", ma il titolo è stato mantenuto perché fuori scope.

### Tempo impiegato

~55 minuti (lettura completa dei 90 campi + 3 batch di correzioni Python + verifica con regex residui + aggiornamento NOTES).

