# Nature morte «Completa il rituale» (v4.11c, generate il 17/11/2026)

Sei immagini, una per set, per la colonna destra di §5 della SPEC. Le ho generate con il generatore di immagini interno a partire da:
- **la foto vera del negozio** `foto-mamma/finali/ventaglio-3-selenite.jpg` (1200 × 1500): bancone in laminato nero venato e runner rosso e oro ricamato. È in tutti i set e dà luce, superficie e tessuto;
- **le foto prodotto vere del catalogo Shopify** (sola lettura), scaricate in `img/ref/` (1024 px, `&width=1024`).

**Pipeline.** Il generatore produce 1152 × 864 (4:3). Ho ingrandito ogni immagine a **2400 × 1800** con Real-ESRGAN x4plus (ONNX, CPU, tile 128 con 16 px di sovrapposizione), riportata con Lanczos e fusa 60 % ESRGAN / 40 % Lanczos per evitare l'effetto «plastica». Poi grana di luminanza leggera (sigma 3,2) e JPEG q92.
- 2400 × 1800 supera i 1420 × 1120 che servono a 2× nella cella a 1440 (circa 710 × 560), ma **non arriva ai 2400 × 2000 previsti**. Il dettaglio vero resta quello di 1152 px: a 2× regge, ma a ingrandimento 100 % si vede che è un upscale.
- Il soggetto sta nel 70 % centrale, così i ritagli 16:10 (2400 × 1500) e 4:3 lo tengono. Fa eccezione **Sera**, dove la lampada arriva a circa l'86 % della larghezza: col ritaglio 16:10 va bene, ma conviene `object-position: 60% 50%`.

**Brief fotografico comune** (la stessa base per ogni set; cambiano soggetto e riferimenti):
> Documentary still-life photograph taken inside a small crystal and incense shop in Cento, Italy, in the evening after closing, main lights off. On the shop's real black wood-grain laminate counter top (matte black, fine wood grain, light scuffs, dust), [edge of the red and gold embroidered runner] … [products at true scale, "exactly like the product reference"] … one lit tealight/candle is the only warm light, 2700K, deep shadows, shop wall out of focus fading to dark. Full-frame camera, 50mm f/2.8, ISO 1600, focus on […], soft bokeh, natural film grain, true colours, slight vignetting, small imperfections. No text, no labels, no logos, no price tags, no hands, no glowing aura, no CGI gloss, no perfect symmetry. Landscape composition with generous margin.

Qui sotto, per ogni set, la parte del soggetto: testo esatto per i tentativi rifatti oggi (Serenità v3, Sera v2), sintesi fedele per gli altri.

---

## 1. Protezione: `rituale-protezione.jpg` (2400 × 1800)
- **Riferimenti:** ventaglio-3-selenite.jpg, `ref/buddha-grigio-nero.jpg` (Statua Buddha grigio e nero, 19,90 €), `ref/tormalina-grezza.jpg`, `ref/ossidiana-grezza.jpg`.
- **Soggetto:** Buddha seduto in pietra scura grigio e nera come nel riferimento, ai piedi una tormalina nera grezza e un'ossidiana grezza, un lumino acceso come unica luce.
- **Tentativi:** 1 (tenuto).
- **Giudizio:** credibile, il migliore della serie insieme a Concentrazione. Luce di candela, bancone e grana sembrano uno scatto vero.
- **Difetti residui:** il Buddha somiglia al prodotto ma non è identico (manca il porta-lumino alla base del modello vero); l'ossidiana è poco vetrosa, sembra più roccia scura.

## 2. Serenità: `rituale-serenita.jpg` (2400 × 1800)
- **Riferimenti:** ventaglio-3-selenite.jpg, `ref/loto-capiz-giallo.jpg` (Loto in conchiglia Capiz giallo, 17,90 €), `ref/ametista-burattata.jpg`.
- **Prompt (v3, testo esatto del soggetto):** «a lotus-flower tealight holder about 12 cm wide made of thin translucent yellow capiz shell petals with thin gold edges, exactly the model in the product reference, a lit tealight inside. In front of it, five tumbled amethysts that look exactly like the product reference photo: small (2 to 3 cm), each a different irregular shape (one almost triangular, one long, one flat), with a satin rather than glassy polish, mixed colour: violet zones, nearly clear quartz zones, white cloudy patches and small surface pits, not uniform eggs. Loose, uneven grouping. At back left, out of focus, a flat wooden incense holder lying on the counter with one burning stick and a faint wisp of smoke. […] behind, the shop's white wall softly out of focus with the dark blue flower-of-life wall hanging only as a blur.»
- **Tentativi:** 3. v1 scartata (ametiste gelatinose, tutte uguali); v2 scartata (ametiste a uovo, uniformi); v3 tenuta.
- **Giudizio:** accettabile, ma **è la più «da IA» della serie**. Il loto è fedele al prodotto e sul muro c'è l'arazzo blu del fiore della vita, come in negozio.
- **Difetti residui:** le 5 ametiste sono disposte a griglia troppo regolare e un po' grandi (circa 4 cm contro i 3 veri); la stanza è più chiara e uniforme degli altri set. È la prima da rifare con una foto vera.

## 3. Coraggio: `rituale-coraggio.jpg` (2400 × 1800), rifatta il 17/11 senza leone
- **Perché:** Michael ha bocciato il leone. La versione col leone è conservata in `rituale-coraggio-leone-scartato.jpg`. Il bot Benessere Zen ha proposto la corniola, che nella tradizione è la pietra del coraggio.
- **Riferimenti:** ventaglio-3-selenite.jpg, `ref/corniola-burattata.jpg` (Corniola burattata 2/4 cm, 4,00 €, `files/2E89BBA4-….jpg` 1024²), `ref/bracciale-occhio-tigre.jpg` (Bracciale elastico occhio di tigre 8 mm, 13,90 €, `files/IMG-1077.jpg` 1200²), `ref/occhio-tigre-grezzo.jpg` (4,50 €). Ho scaricato anche `ref/incenso-sangue-drago.jpg` (Stamford sangue di drago, 3,00 €), ma non l'ho passato al generatore perché la confezione ha una scritta: l'incenso è descritto solo a parole.
- **Prompt (v2, testo esatto del soggetto):** «Nothing else on the counter except the following, natural asymmetric arrangement inside the central 70% of the frame, no statue or figurine. Hero, front centre-left: a loose uneven scatter of six small tumbled carnelians exactly like the product reference, only 2 to 3 cm each, irregular flattened pebble shapes, colours from translucent orange to deep red-brown, satin polish, tiny pits, two of them touching. Right of them, loosely dropped, a stretch bracelet of 8 mm round tiger's eye beads exactly like the product reference, about 6 cm across, lying in a slack, slightly twisted, irregular loop, not a perfect circle, beads golden-brown and dark brown with chatoyant bands, no spacers, no charm. One raw tiger's eye piece about 3 cm, exactly like the product reference: a broken stone chunk with layered dark blue-grey and golden fibrous mineral bands, a dull rough rock side, clearly stone not wood. Behind at left, one short ivory pillar candle about 6 cm tall, lit, the only light, warm 2700K, strong falloff, deep shadows. Far back right, out of focus, a thin incense stick in a simple dark wooden holder with a faint thin trail of smoke. Background: the shop wall dark and almost black» + brief comune (50mm f/2.8, ISO 1600, grana, niente testo, aure o lucido CGI, nessuna pietra cerosa).
- **Tentativi:** 3.
  - v1 scartata: muro beige illuminato, fuori tono con la serie; grezzi «di legno»; bracciale a cerchio perfetto; un sasso estraneo in alto a sinistra.
  - v2 tenuta.
  - v3 scartata: bella composizione, ma il grezzo è un blocchetto che sembra legno.
- **Giudizio:** buono e coerente con gli altri set (buio, una candela, runner, bancone). Corniole credibili e varie, dall'arancio traslucido al rosso bruno, una con la banda chiara come nel riferimento. Il bracciale ha perle tonde da 8 mm tutte uguali, senza distanziatori, come il prodotto.
- **Difetti residui:**
  - le corniole sono un po' più lucide («bagnate») del vero;
  - il bracciale è un ovale troppo ordinato e le perle sono più scure e meno dorate del riferimento;
  - il bastoncino d'incenso è lunghissimo ed esce dall'inquadratura in alto a destra;
  - il gruppo arriva a circa il 90 % della larghezza: per i ritagli 16:10 e 4:3 va bene (tagliano sopra e sotto), per ritagli più stretti no.

## 4. Affetti: `rituale-affetti.jpg` (2400 × 1800)
- **Riferimenti:** ventaglio-3-selenite.jpg, `ref/cherubino-rose.jpg` (Cherubino seduto con rose rosa, 6,90 €), `ref/quarzo-rosa-grezzo.jpg`.
- **Soggetto:** cherubino in resina seduto con rose rosa come il prodotto, quarzo rosa grezzo, qualche petalo sul bancone, lumino.
- **Tentativi:** 1 (tenuto).
- **Giudizio:** buono, credibile.
- **Difetti residui:** il quarzo rosa è un po' «zuccherato» (troppo lucido e omogeneo); la luce è più uniforme di quella di una sola candela.

## 5. Concentrazione: `rituale-concentrazione.jpg` (2400 × 1800)
- **Riferimenti:** ventaglio-3-selenite.jpg, `ref/selenite-fiore-vita.jpg` (Piatto selenite 10 cm Fiore della Vita, 17,90 €), `ref/lapislazzuli-grezzo.jpg`, `ref/cristallo-rocca-grezzo.jpg`.
- **Soggetto:** piatto in selenite con il Fiore della Vita inciso, sopra un lapislazzuli grezzo e una punta di cristallo di rocca, una sola candela.
- **Tentativi:** 1 (tenuto).
- **Giudizio:** molto credibile, il più «fotografico».
- **Difetti residui:** al posto della punta di cristallo di rocca ci sono due pezzi grezzi chiari; composizione un po' vuota (tanto bancone nero), ma con il titolo sovrapposto in basso a sinistra funziona.

## 6. Sera: `rituale-sera.jpg` (2400 × 1800)
- **Riferimenti:** ventaglio-3-selenite.jpg, `ref/lampada-sale-om.jpg` (Lampada di sale Om, 49,90 €), `ref/lumini-fasi-lunari.jpg` (5 Lumini fasi lunari, 6,90 €), `ref/ametista-burattata.jpg`.
- **Prompt (v2, testo esatto del soggetto):** «a round Himalayan salt lamp about 18 cm tall on a small dark wooden base, with the Om symbol cut into a dark wooden front disc, exactly the model in the product reference, switched on and glowing orange from inside, rough crystalline salt edge. In front of it at true scale, slightly out of line: three tealights with black wax in thin aluminium cups, unlit, from the moon-phase tealight set in the product reference; two small tumbled amethysts (2.5 cm, irregular pebble shapes, purple with milky white zones and pits). At back left, out of focus, a simple flat wooden incense holder lying on the counter with one burning stick inserted at an angle and a thin wisp of smoke. The salt lamp is the only light […] no floating objects.»
- **Tentativi:** 2. v1 scartata (bastoncino d'incenso sospeso nel vuoto); v2 tenuta.
- **Giudizio:** buono. La lampada è proprio il modello Om del catalogo, l'incenso ora sta nel suo portaincenso e le ametiste sono irregolari.
- **Difetti residui:** i lumini sono neri lisci, senza la decorazione delle fasi lunari del prodotto vero; la lampada è molto a destra (vedi la nota sul ritaglio); l'immagine è un po' pulita e «da catalogo».

---

**Riepilogo onesto.** Nessuna delle sei è perfetta, ma nessuna ha aure, testo o lucido CGI.
- **Più credibili:** Concentrazione, Protezione.
- **Buone:** Coraggio (corniola), Affetti, Sera.
- **Si vede ancora un po' l'IA:** Serenità (ametiste regolari, luce piatta).

Sono immagini per il mockup: per la build vanno sostituite con scatti veri in negozio, con stesso bancone, stessi oggetti e stessa luce di candela.

Contact sheet: `img/rituale-foglio.jpg`. Originali a 1152 px e scarti: cartella assets dell'agente (nomi nel report).
