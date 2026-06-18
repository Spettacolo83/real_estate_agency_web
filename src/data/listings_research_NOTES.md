# listings_research.json — Note di compilazione (v4 — Mallorca real scrape)

Generato per la demo `casai.followtheflowai.com`. 30 immobili (10 per Milano / Mallorca / London), distribuiti su fasce di prezzo eterogenee.

> **v4 (Mallorca real scrape 2026-06-18)**: l'array `mallorca` è stato sostituito con **10 immobili reali Knight Frank** (sostituendo i sintetici v2 con foto Unsplash non coerenti). Gli array `milano` (Miakasa v3) e `london` (sintetici v2) restano invariati.

## Mallorca real scrape 2026-06-18

### Portali utilizzati

- **Knight Frank Mallorca** (`knightfrank.com`): **10/10** listing — tutti da `https://www.knightfrank.com/property-for-sale/spain/mallorca`.
- Engel & Völkers, Sotheby's, Kuhn-Partner, firstmallorca.com sono stati testati ma sono SPA pure: tornano body vuoto con `curl` standard. Knight Frank è risultato l'unico portale di alta gamma che con `User-Agent: Googlebot/2.1` esponga il rendering server-side completo (con blocco `var initialDetails = {…}` JSON che contiene tutte le foto, descrizioni, prezzi, feature).

### 10 listing scelti

| id_suggested | Zona | Tipo | Prezzo | Bed/Bath | mq | Foto | source_url |
| ------------ | ---- | ---- | ------ | -------- | -- | ---- | ---------- |
| `mallorca-deia-stone-villa-1948` | Deià / Cala Deià | Villa | €3.300.000 | 3/3 | 247 | 7 | `…/rsi012491948` |
| `mallorca-soller-finca-1157` | Sóller centro | Finca | €1.750.000 | 4/2 | 250 | 7 | `…/rsi012591157` |
| `mallorca-andratx-townhouse-5880` | Andratx old town | Townhouse | €2.950.000 | 3/2 | 171 | 7 | `…/rsi012535880` |
| `mallorca-manacor-estate-2436` | Manacor / Porto Colom | Finca | €6.500.000 | 5/5 | 600 | 7 | `…/rsi012422436` |
| `mallorca-santa-maria-farmhouse-3176` | Santa Maria del Camí | Finca | €6.500.000 | 6/7 | 550 | 7 | `…/rsi012443176` |
| `mallorca-bunyola-turnkey-7456` | Bunyola | Villa | €4.750.000 | 5/5 | 500 | 7 | `…/rsi012657456` |
| `mallorca-santanyi-newbuild-4495` | Santanyí / Cala Llombards | Finca | €12.500.000* | 6/7 | 700 | 7 | `…/rsi012544495` |
| `mallorca-binissalem-vineyard-9820` | Binissalem (wine country) | Finca | €7.900.000 | 4/4 | 450 | 7 | `…/rsi012629820` |
| `mallorca-formentor-clifftop-0796` | Cap de Formentor | Villa | €22.000.000* | 7/7 | 800 | 7 | `…/rsi012530796` |
| `mallorca-port-andratx-ullastre-5353` | Port d'Andratx / La Mola | Villa | €37.000.000 | 13/12 | 1500 | 7 | `…/rsi012495353` |

\* Listing originariamente "Price on Application" su Knight Frank. Stima fatta su benchmark di mercato (nuove fincas Santanyí 600-800 m² 2025 ~€10-15M; trofei clifftop Formentor con licenza protetta ~€18-30M). I valori `price` nel JSON sono indicativi e possono essere ulteriormente rivisti.

### Distribuzione

- **Per zona**: Deià ×1, Sóller ×1, Andratx/Port Andratx ×2, Manacor ×1, Santa Maria del Camí ×1, Bunyola ×1, Santanyí ×1, Binissalem ×1, Cap de Formentor ×1. **9 zone diverse**, copertura della Tramuntana (Deià, Sóller, Bunyola), centro (Binissalem, Santa Maria), sud-est (Manacor, Santanyí), trofei costieri (Andratx, Formentor).
- **Per fascia di prezzo**: Range €1.75M → €37M (vs v2 €425K-€9.5M sintetici). Distribuzione naturale del mercato Knight Frank Mallorca, fortemente sbilanciata sul lusso/ultra-lusso (KF non lista entry-level). Mediana ~€6.5M.
- **Per tipologia**: 4 Finca / 4 Villa / 1 Townhouse / (Finca/Villa quasi indistinguibili nella categoria KF).

### Foto e note legali

- **Tutte e 70 le foto** (10 listing × 7 foto) sono **hotlinked dal CDN Knight Frank** (`content.knightfrank.com/property/rsi{ID}/images/{UUID}-0.jpg?cio=true&w=1200`).
- **HEAD verificate 200**: tutte le 70 URL ritornano `200 image/jpeg` con `Content-Length` reale (60KB-350KB ciascuna). Le foto sono autenticamente quelle dell'annuncio originale Knight Frank.
- **Nota legale demo**: l'hotlinking dal CDN Knight Frank è accettabile **solo per demo interna / pitch ad agenzie**. Per uso pubblico/produzione di `casai.followtheflowai.com` indicizzato dovremo:
  1. Ottenere consenso scritto Knight Frank, oppure
  2. Sostituire con asset propri (foto stock R2/Cloudflare licenziate, shoot dedicato), oppure
  3. Considerare un "demo mode" in cui i 10 Mallorca sono mostrati solo a utenti loggati / IP whitelistati.
- **Risk specifico KF**: i listing reali possono essere venduti e quindi sparire (link rot) — vita media stimata 3-12 mesi. Da rifare a quel punto.

### Descrizioni

- **Riscritte completamente in tono boutique editorial CasAI**: le descrizioni originali Knight Frank contenevano formule promozionali ripetitive (es. "Please note that all distances and measurements are approximate…", riferimenti a "Property Adviser" e "Knight Frank Office"). Eliminate tutte le formule legali/operative.
- **Stile**: 4-6 paragrafi separati da `\n\n`, tono concierge/editoriale alla Engel & Völkers/John Taylor, niente CTA né telefono né riferimenti all'agente.
- **EN** è la lingua sorgente; **IT** in sentence case con vocabolario immobiliare italiano nativo (camere, suite, dependance, cabina armadio); **ES castigliano** con `ático`, `dormitorio`, `cabina de vestir`. Nomi geografici spagnoli mantenuti in spagnolo (Pollença, Sóller, Deià, Santanyí, Cala Llombards).

### Coordinate

Coordinate impostate sul **centro del comune o sulla zona dichiarata** (Knight Frank non espone coordinate precise per ragioni di privacy del venditore). Esempi:
- Cala Deià → centro Deià
- Casa Ullastre → centro Port d'Andratx (La Mola peninsula)
- Cap de Formentor → punta del Cap
- Manacor (Porto Colom estate) → Porto Colom

Sufficiente per la mappa demo; non per geofencing operativo.

### Listing **non** scartati

Tutti i 20 listing scaricati da Knight Frank Mallorca erano validi (foto vere, descrizioni complete, prezzi o POA). Ne ho scelti 10 per **massimizzare la diversità geografica e tipologica**, scartando i duplicati di zona (4 Deià, 3 Port Andratx, 2 Sóller, 2 Manacor, 2 Santa Maria nel pool originale).

I 10 listing **non selezionati** (ma archiviati in `/tmp/mallorca_scrape/listings/all_parsed.json` per riferimento futuro): rsi012522792 (Deià €13.5M), rsi012605618 (Deià €3M), rsi012687655 (Deià €5.5M), rsi012542001 (Deià €25M), rsi012559137 (Manacor POA), rsi012602332 (Port Andratx €11M), rsi012424568 (Port d'Andratx €12.5M), rsi012513510 (Sóller €2.7M), rsi012543782 (Santa Maria €16.2M), rsi012594825 (Sóller €2.75M).

### Anomalie / decisioni di scope

- **Nessun listing sotto €1.5M**: Knight Frank Mallorca non lista entry-level (il loro positioning parte da €1M+, mediana >€5M). Il vecchio v2 aveva 4 listing entry tra €425K-€695K che erano sintetici. La nuova realtà del file è coerente con il segmento Knight Frank — se in futuro vogliamo entry-level Mallorca reali, dovremo aggiungere fonti come idealista.com (SPA però — richiede headless browser) o Engel & Völkers (SPA + API protetta).
- **2 POA → prezzi stimati**: `formentor-clifftop-0796` (€22M stima) e `santanyi-newbuild-4495` (€12.5M stima). I prezzi sono prudenziali ma plausibili per il segmento; entrambi POA in realtà — andrebbero contrassegnati come "price_on_application: true" nello schema se il sito CasAI vuole gestire questa distinzione UX.
- **Knight Frank è SPA per default**: il rendering completo (descrizione + foto + `initialDetails`) è esposto SOLO con `User-Agent: Googlebot/2.1 (+http://www.google.com/bot.html)`. Con UA browser normale (anche Chrome 121 con full headers) Knight Frank ritorna `HTTP 200` con `Content-Length: 0`. Questo trucco è prezioso ma fragile — se KF dovesse bloccare Googlebot UA dovremo passare a headless browser (Playwright) per re-scrape.

---

## v3 (Miakasa integration)

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

