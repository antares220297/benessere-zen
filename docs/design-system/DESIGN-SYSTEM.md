# Design system di Benessere Zen (tema Shopify)

Versione 1, 18/11/2026. È la regola di base di ogni sezione, icona, bottone, CTA e prezzo del tema. Vale insieme a `regole-design.md` e `checklist-consegna.md`. Se due fonti non sono d'accordo, decide quest'ordine: **decisione esplicita di Michael > WCAG 2.2 AA > questo documento > regole-design.md > BZ-playbook**. Le voci segnate **[DA APPROVARE]** cambiano qualcosa che oggi si vede e aspettano l'OK di Michael (elenco al §13).

- Token pronti: `bz-tokens.css` (stessa cartella). Ogni valore qui sotto è scritto come `--nome: valore`. Nel tema i token stanno in un solo file, caricato una volta prima di tutto il resto. Nessun valore numerico scritto a mano nelle sezioni.
- Valori misurati sull'anteprima `212741062994` («BZ v4.11c r8c fix1 (f21dda3)») il 18/11 alle 19:00 (ora di Roma), con Chromium a 390, 768, 1024, 1280, 1440 e 1920 px, più gli screenshot di `qa-r8c-fix1/`.
- **Breakpoint**: mobile `< 768px`, tablet `768–1023px`, desktop `≥ 1024px`. Si verifica a **390, 768, 1024, 1440**.
- Specimen visivo: `specimen.html` con gli screenshot `specimen-390.png` e `specimen-1440.png`.

---

## 1. Colori e contrasto

### 1.1 Token
| Token | Valore | Uso |
|---|---|---|
| `--bz-bg` | `#141312` | antracite, fondo pagina |
| `--bz-bg-2` | `#1b1917` | fascia alternata, footer |
| `--bz-surface` | `#201e1b` | card, pannelli scuri |
| `--bz-surface-2` | `#29261f` | pill selezionata del menu, card in rilievo |
| `--bz-surface-light` | `#ece4d6` | pannello chiaro (FAQ mobile, «Mattina e sera»); **al massimo 1 per pagina** |
| `--bz-gold` | `#c9a96e` | CTA primaria, «+», corsivo dei titoli su scuro, icone decorative, link di testo |
| `--bz-gold-hover` | `#e3cb95` | hover di CTA primaria e «+» |
| `--bz-gold-on-light` | `#7a5726` | oro su `--bz-surface-light` (corsivo dei titoli, link, icone) |
| `--bz-text` | `#eee7db` | avorio caldo: titoli, testo, **prezzi**, titoli prodotto |
| `--bz-text-2` | `#cdc4b4` | testo secondario, kicker, conteggi |
| `--bz-text-3` | `#958d7f` | muted: categoria nella card, note legali; mai sotto 12px |
| `--bz-ink` | `#24201b` | testo principale su chiaro, prezzi su chiaro |
| `--bz-ink-2` | `#4d463c` | testo secondario su chiaro |
| `--bz-ink-3` | `#6b6255` | muted su chiaro |
| `--bz-on-gold` | `#17140f` | testo e icone dentro oro pieno |
| `--bz-status-open` | `#7bae7c` | pallino «Aperto ora» |
| `--bz-error` / `--bz-error-on-light` | `#e8a593` / `#9e3b28` | messaggi di errore dei campi |
| `--bz-line` | `rgba(238,231,219,.11)` | divisori, bordo card (decorativo) |
| `--bz-line-2` | `rgba(238,231,219,.24)` | bordo di chip e CTA secondaria |
| `--bz-line-field` | `rgba(238,231,219,.40)` | bordo dei campi di input |
| `--bz-line-light` / `-2` / `-field` | `rgba(36,32,27,.14)` / `.28` / `.55` | gli stessi tre ruoli su chiaro |
| `--bz-veil-bottom` | `linear-gradient(180deg, rgba(20,19,18,0) 0%, rgba(20,19,18,.65) 45%, rgba(20,19,18,.88) 100%)` | testo in basso su foto |
| `--bz-veil-side` | `linear-gradient(90deg, rgba(20,19,18,.88) 0%, rgba(20,19,18,.65) 40%, rgba(20,19,18,0) 75%)` | testo laterale su foto (fascia «Anche a Cento») |
| `--bz-veil-badge` | `rgba(20,19,18,.80)` | badge di stato sopra una foto |

**Vietati** (oggi presenti nel tema): `#ffffff` per i titoli prodotto, `#c3c3c3` per i prezzi, qualsiasi grigio freddo, `opacity` per scurire un testo. Si usa solo un token di testo.

### 1.2 Contrasto misurato (WCAG 2.x, rapporto)
| Testo ↓ / Fondo → | bg | bg-2 | surface | surface-2 | surface-light | gold |
|---|---|---|---|---|---|---|
| `--bz-text` | **15,10** | 14,26 | 13,53 | 12,28 | – | – |
| `--bz-text-2` | **10,74** | 10,14 | 9,62 | 8,73 | – | – |
| `--bz-text-3` | **5,65** | 5,34 | 5,06 | 4,60 | – | – |
| `--bz-gold` | **8,29** | 7,83 | 7,43 | 6,74 | ✗ 1,77 | – |
| `--bz-gold-hover` | 11,70 | 11,05 | 10,49 | 9,52 | – | – |
| `--bz-ink` | – | – | – | – | **12,82** | 7,23 |
| `--bz-ink-2` | – | – | – | – | 7,37 | – |
| `--bz-ink-3` | – | – | – | – | 4,75 | – |
| `--bz-gold-on-light` | – | – | – | – | 5,17 | – |
| `--bz-on-gold` | – | – | – | – | – | **8,21** (11,58 su gold-hover) |
| `--bz-status-open` (non testo) | 7,24 | – | 6,48 | – | – | – |
| `--bz-error` | 9,04 | – | 8,10 | – | – | – |

Tutte le coppie ammesse superano AA (4,5:1 per testo normale). Le celle «–» sono coppie **non ammesse**.

**Bordi dei controlli (WCAG 1.4.11, 3:1):** `--bz-line-field` = 3,34:1 su `--bz-bg`, `--bz-line-light-field` = 3,46:1 su chiaro. `--bz-line-2` = 1,97:1 va bene **solo** su chip e CTA secondaria, perché lì l'etichetta identifica già il controllo.

**Testo su foto:** sotto ogni riga di testo il velo deve coprire almeno `rgba(20,19,18,.65)`. Con un pixel bianco sotto, l'avorio resta a 4,68:1; con `.80` a 8,16:1.

**Token che oggi falliscono:**
- Prezzo `#c3c3c3` su pannello chiaro («Mattina e sera», Cura di sé): **1,40:1 ✗**.
- Corsivo oro `#86612c` su chiaro: **4,42:1 ✗** sotto i 24px (passa solo come testo grande). Si sostituisce con `--bz-gold-on-light`.
- Oro `#c9a96e` usato come anello di focus su chiaro: 1,77:1 ✗. Su chiaro il focus usa `--bz-ink`.
- Testi a 10–11px (categoria, kicker, badge «Novità»): il contrasto c'è, la dimensione no. Il minimo è 12px.

### 1.3 Regole d'uso
1. **Un solo oro di peso per schermata.** Il corsivo del titolo, la CTA primaria e i «+» possono convivere; un badge oro, un fondo oro e un prezzo oro nella stessa vista no.
2. Il prezzo non è mai oro (vedi §5).
3. Il pannello chiaro cambia tutti i token: testo `--bz-ink*`, oro `--bz-gold-on-light`, linee `--bz-line-light*`, focus `--bz-ink`.
4. Viola e prugna restano solo per le tinte di sezione dell'Ayurveda (BZ-playbook §2), mai su testo o CTA.

---

## 2. Spaziatura

### 2.1 Scala (base 4)
`--bz-sp-4: 4px` · `--bz-sp-8: 8px` · `--bz-sp-12: 12px` · `--bz-sp-16: 16px` · `--bz-sp-20: 20px` · `--bz-sp-24: 24px` · `--bz-sp-28: 28px` · `--bz-sp-32: 32px` · `--bz-sp-40: 40px` · `--bz-sp-48: 48px` · `--bz-sp-56: 56px` · `--bz-sp-64: 64px` · `--bz-sp-72: 72px` · `--bz-sp-88: 88px`.
Nessun altro valore. Oggi il CSS del tema ha 66 valori di `gap` diversi e 162 di `padding`.

### 2.2 Token semantici (mobile / tablet / desktop)
| Token | < 768 | 768–1023 | ≥ 1024 | Dove |
|---|---|---|---|---|
| `--bz-margin` | 20px | 20px | 28px | margine laterale della pagina (20 su mobile è fisso) |
| `--bz-section-gap` | 56px | 72px | 88px | spazio verticale tra due sezioni qualsiasi, da bordo visibile a bordo visibile |
| `--bz-panel-pad` | 20px | 32px | 48px | padding interno dei pannelli, uguale sui 4 lati |
| `--bz-grid-gap` | 12px | 16px | 20px | spazio tra card in griglia o in fila |
| `--bz-gap-title-lead` | 8px | 8px | 12px | titolo → frase d'apertura |
| `--bz-gap-head-chips` | 16px | 16px | 16px | blocco titolo → riga di chip |
| `--bz-gap-head-content` | 24px | 24px | 32px | titolo o chip → contenuto (card, griglia, accordion) |
| `--bz-gap-content-cta` | 32px | 32px | 40px | fine contenuto → CTA centrata («Vedi tutto») |
| `--bz-card-pad` | 8px | 8px | 8px | padding interno della card prodotto |
| `--bz-control-h` | 44px | 44px | 44px | altezza di ogni controllo: CTA, chip, campi, «+» |

Oggi la distanza tra sezioni è `clamp(54px, 6vw, 92px)`: 54px a 390 e 86,4px a 1440. I nuovi valori la portano su scala e la tengono quasi uguale.

### 2.3 Struttura verticale di una sezione
```
[kicker opzionale]         ↓ 8
H2 con corsivo             ↓ --bz-gap-title-lead
frase d'apertura (lead)    ↓ --bz-gap-head-chips   (solo se ci sono chip)
riga di chip               ↓ --bz-gap-head-content
contenuto                  ↓ --bz-gap-content-cta  (solo se c'è la CTA)
CTA centrata
```
Il titolo di sezione sta sempre sopra, allineato a sinistra. Su desktop la frase d'apertura può stare a destra del titolo, sulla stessa linea di base, ma mai insieme a un link.

---

## 3. Griglia, contenitori, ritmo, raggi

### 3.1 Contenitore unico
- `--bz-container-max: 1440px`. Il contenuto è largo `min(100%, 1440px) − 2 × --bz-margin`, quindi **1384px** al massimo (350px a 390, 728 a 768, 968 a 1024).
- Oltre i 1440px il contenitore si centra; oggi a 1920 il contenuto arriva a 1864px perché non c'è un massimo.
- Le colonne di testo continuo restano entro `--bz-measure: 62ch`.
- Griglia di layout: 4 colonne su mobile, 8 su tablet, 12 su desktop, con gap `--bz-grid-gap`.
- **Layout immagine + testo** (Regali, Anche a Cento, Che cos'è): su desktop l'immagine occupa 7 colonne su 12 (circa 58%, come il Regali r8 approvato con la foto al 59%) e il testo 5, centrato in verticale. Il testo deve reggere l'altezza dell'immagine (regole-design §3); se non ci riesce, l'immagine si accorcia con `aspect-ratio`. Su mobile la foto va sopra e il testo sotto, mai due colonne.

### 3.2 Tre tipi di sezione
| Tipo | Larghezza | Fondo | Raggio | Padding interno | Quando |
|---|---|---|---|---|---|
| **A. Aperta** (default) | contenitore | nessuno (`--bz-bg`) | – | 0 | file di prodotti, categorie, testo |
| **B. Pannello** | contenitore | `--bz-surface`, una tinta di sezione o `--bz-surface-light` | `--bz-r-panel` | `--bz-panel-pad` | moduli autonomi: Completa il rituale, FAQ (mobile), newsletter, Mattina e sera |
| **C. Fascia** | 100% del viewport | foto o `--bz-bg-2` | 0 | contenuto allineato al contenitore | barra annunci, header, footer, **una sola** fascia fotografica nel main per pagina («Anche a Cento», «Le pietre, dal vivo») |

**Regole di ritmo**
1. Tra due sezioni qualsiasi c'è sempre `--bz-section-gap`, misurato tra i bordi visibili, anche tra fascia e pannello. Oggi tra «Anche a Cento» e la FAQ ci sono **18px**: è questo che rompe il ritmo.
2. Mai due fasce di seguito; mai due pannelli di seguito con lo stesso fondo.
3. **Su desktop (≥ 1024) dopo una fascia viene una sezione aperta.** Per questo la FAQ della home su desktop diventa una sezione aperta: titolo, chip e accordion in 2 colonne, senza riquadro chiaro e senza badge. Su mobile resta il pannello chiaro con i trust badge già approvato: a 390 fascia e pannello differiscono solo per i 20px di margine, quindi lo stacco non si nota. **[DA APPROVARE: la FAQ desktop senza riquadro chiaro]**
4. Il testo dentro fasce e pannelli parte dal bordo del contenitore. Nella fascia «Anche a Cento» la colonna di testo finisce a `--bz-margin` dal bordo destro.
5. Una pagina alterna i tipi (aperta → pannello → aperta → fascia → aperta…): mai tre pannelli di fila.

### 3.3 Raggi per tipo di elemento
| Token | Valore | Elemento |
|---|---|---|
| `--bz-r-panel` | 28px | pannelli (tipo B), media dell'hero, tile grandi dell'hero, bottom sheet su mobile (solo angoli in alto) |
| `--bz-r-card` | 18px | card prodotto, card pietra, tile categoria, menu a tendina, riquadro dei trust badge |
| `--bz-r-img` | 10px | immagine dentro una card (= 18 − 8 di padding: raggio interno = esterno − padding) |
| `--bz-r-pill` | 999px | CTA, chip, badge, campi, pill del menu |
| `--bz-r-round` | 50% | «+», bottoni solo icona, sfere categoria, pallini degli step |
| – | 0 | fasce (tipo C), immagini a tutta larghezza |

Oggi i raggi sono 36 valori diversi (card a 16 e 18, immagini a 11, pill sia a 100px sia a 999px).

---

## 4. Tipografia

Due famiglie e cinque stili in tutto, niente terzo font:
- `--bz-font-serif: Baskervville, Georgia, serif`, solo peso 400, normale e corsivo.
- `--bz-font-sans: Figtree, Arial, sans-serif`, pesi 400, 500 e 600. **700 e 900 vietati**: oggi sono nel CSS.

| Ruolo | Token | Famiglia | 390 → 1440 | Interlinea | Spaziatura lettere | Peso | Colore |
|---|---|---|---|---|---|---|---|
| H1 di pagina e hero | `--bz-fs-h1: clamp(40px, 31.09px + 2.286vw, 64px)` | serif | 40 → 64 | 1.05 | −0.01em | 400 | `--bz-text` |
| H1 compatto (scheda prodotto, ricerca, carrello, account) | `--bz-fs-h1-compact: clamp(28px, 23.54px + 1.143vw, 40px)` | serif | 28 → 40 | 1.1 | 0 | 400 | `--bz-text` |
| H2 di sezione | `--bz-fs-h2: clamp(30px, 23.31px + 1.714vw, 48px)` | serif | 30 → 48 | 1.1 | −0.005em | 400 | `--bz-text` |
| H3 di blocco o pannello | `--bz-fs-h3: clamp(24px, 21.03px + .762vw, 32px)` | serif | 24 → 32 | 1.15 | 0 | 400 | `--bz-text` |
| H4: nome pietra, nome set, domanda FAQ | `--bz-fs-h4: clamp(18px, 17.26px + .19vw, 20px)` | serif | 18 → 20 | 1.25 | 0 | 400 | `--bz-text` |
| Lead (frase d'apertura) | `--bz-fs-lead: clamp(16px, 15.26px + .19vw, 18px)` | sans | 16 → 18 | 1.6 | 0 | 400 | `--bz-text-2` |
| Corpo | `--bz-fs-body: 16px` | sans | 16 | 1.6 | 0 | 400 | `--bz-text` |
| Piccolo (testo nelle card, note) | `--bz-fs-sm: 14px` | sans | 14 | 1.5 | 0 | 400 | `--bz-text-2` |
| Minimo (categoria, legale, badge) | `--bz-fs-xs: 12px` | sans | 12 | 1.4 | 0 | 500 | `--bz-text-3` |
| Kicker o eyebrow | `--bz-fs-xs` + maiuscolo | sans | 12 | 1.4 | 0.12em | 600 | `--bz-text-2` |
| Titolo prodotto | `--bz-fs-product`: 14px (< 1024), 15px (≥ 1024) | sans | 14 / 15 | 1.4 | 0 | 400 | `--bz-text` |
| Prezzo | §5 | serif | 20 | 1.2 | 0 | 400 | `--bz-text` |
| Testo dei bottoni | `--bz-fs-btn: 14px` | sans | 14 | 1 (altezza dal controllo), `white-space: nowrap` | 0 | 600 primaria, 500 secondaria | – |

**Corsivo d'accento**
- Dentro H1–H4 si usa `<em>` in Baskervville corsivo 400, stessa dimensione del titolo, colore `--bz-gold` (su chiaro `--bz-gold-on-light`).
- Una sola parola o frase breve (1–3 parole) per titolo, **sempre alla fine**: «Cura di *sé*», «Anche *a Cento*», «I più *scelti*».
- Mai tutto il titolo in corsivo, mai la prima parola. I titoli di una parola sola («Capelli», «Vata») non hanno accento.
- Oggi «*Oil pulling* e cura della bocca» e «*Capelli*» violano la regola: il Copywriter deve riformularli. **[DA APPROVARE]**

**Andare a capo**
- H1–H4: `text-wrap: balance`.
- Paragrafi e titoli prodotto: `text-wrap: pretty`.
- Per tutti: `hyphens: manual` (niente sillabazione automatica) e `overflow-wrap: break-word` per le parole lunghe con «/».
- Il testo continuo resta entro `max-width: var(--bz-measure)`.

Oggi ci sono 99 dimensioni di carattere diverse. Gli H1 vanno da 36 a 46px su mobile e da 46 a 76px a 1440; gli H2 da 37 a 63px a 1440.

**Corpo a 16px.** Oggi molte frasi d'apertura sono a 13–14px. Con la scala passano a 16px su mobile: il testo si allunga di circa una riga per sezione. **[DA APPROVARE]**

---

## 5. Prezzo: uno stile ovunque

```css
.bz-price{font-family:var(--bz-font-serif);font-size:var(--bz-fs-price);line-height:var(--bz-lh-price);
  font-weight:400;color:var(--bz-text);white-space:nowrap;font-variant-numeric:lining-nums tabular-nums}
.bz-on-light .bz-price{color:var(--bz-ink)}
.bz-price--lg{font-size:var(--bz-fs-price-lg)}   /* scheda prodotto, prodotto in evidenza, totale del set */
```
- **Dimensioni:** `--bz-fs-price: 20px` in card, righe, carrello e liste; `--bz-fs-price-lg: clamp(28px, 25.03px + .762vw, 36px)` solo per il prezzo protagonista (scheda prodotto, «Mattina e sera», totale di «Completa il rituale»). Nessun'altra dimensione.
- **Colore:** `--bz-text` su scuro (15,10:1 su bg, 13,53:1 su surface) e `--bz-ink` su chiaro (12,82:1). Mai oro, mai grigio, mai `opacity`.
- **Cifre:** Baskervville ha di default le cifre «vecchio stile», con 3, 4, 5, 7 e 9 che scendono sotto la riga; `lining-nums` le allinea (il font ha la funzione `lnum`).
- **Formato:** `6,00 €` con uno spazio indivisibile `U+00A0` (`&nbsp;`) prima del simbolo €, sempre (anche «da 6,00 €», «sotto 30 €», «gratis da 50 €»). Lo spazio indivisibile stretto `U+202F` non c'è nei due font: non va usato.
- **Prefisso «da»:** `--bz-fs-xs`, sans, `--bz-text-2`, sulla stessa riga del prezzo.
- **Prezzo barrato** (se mai servirà): `--bz-fs-sm`, sans, `--bz-text-3`, `text-decoration: line-through`, prima del prezzo nuovo.
- **Mai tagliato:** `white-space: nowrap` e una colonna che non si stringe (§6). Va provato con il prezzo più lungo del catalogo accanto al «+».

Oggi gli stili di prezzo sono 6:
- 22px serif `#c3c3c3`: card in home, Ayurveda, Pietre;
- 17px serif `#c3c3c3`: Regali;
- 15–16px serif 500 `#e3cb95` dorato: collezioni;
- 24/34px `#c3c3c3` su chiaro: Mattina e sera, **1,40:1**;
- 12,5px sans `#cdc4b4`: righe di Completa il rituale;
- 26–28px avorio: card pietra e totale.

---

## 6. CTA: due varianti più il link di testo

| | **Primaria** `.bz-btn--primary` | **Secondaria** `.bz-btn--secondary` (il «Vedi tutto →» approvato) | **Link di testo** `.bz-link` |
|---|---|---|---|
| Altezza | `min-height: var(--bz-control-h)` = 44px | 44px | testo; area cliccabile ≥ 44px con `padding-block: 12px` se sta da solo |
| Padding orizzontale | 24px | 16px (misura approvata) | 0 |
| Raggio | `--bz-r-pill` | `--bz-r-pill` | – |
| Font | sans 14px, 600 | sans 14px, 500 | sans 14px, 500 |
| Fondo / bordo / testo su scuro | `--bz-gold` / nessuno / `--bz-on-gold` | trasparente / 1px `--bz-line-2` / `--bz-text` | – / – / `--bz-gold` |
| Su chiaro | uguale | trasparente / 1px `--bz-line-light-2` / `--bz-ink` | `--bz-gold-on-light` |
| Hover (solo `@media (hover:hover)`) | fondo `--bz-gold-hover` | bordo `--bz-gold` | sottolineatura 1px, `text-underline-offset: 4px` |
| Active (premuto) | `transform: scale(.98)` | `scale(.98)` | – |
| Focus-visible | `outline: 2px solid var(--bz-gold); outline-offset: 3px` (su chiaro `--bz-ink`) | uguale | uguale, `border-radius: 4px` |
| Disabled | `opacity: .38; pointer-events: none; aria-disabled="true"` | uguale | non esiste: un link disabilitato non si mostra |
| Transizione | `background-color var(--bz-dur-hover) var(--bz-ease-standard)` | `border-color` uguale | – |

**Icona e freccia: al massimo una.**
- **Navigazione** (porta a un'altra pagina): etichetta + freccia finale. La freccia è l'icona Material `arrow_forward` a 18px, `gap: 8px`, non il carattere «→». Né Figtree né Baskervville hanno il glifo U+2192: oggi la freccia viene disegnata da un font di riserva diverso su ogni sistema. **[DA APPROVARE: cambio quasi invisibile]**
- **Azione** (aggiunge, invia): icona iniziale a 20px + etichetta, senza freccia. Esempi: `shopping_bag` + «Aggiungi tutti», «Iscriviti» senza icona.
- Oggi «Aggiungi tutti →» e «Aggiungi al carrello →» hanno la freccia: va tolta.

**Posizione**
- Sotto una fila o griglia di prodotti, la CTA è la **secondaria centrata**, a `--bz-gap-content-cta` dalla fila. Questo vale per ogni «Vedi tutto» di sezione, su mobile e su desktop. Niente link «Vedi tutto →» nella riga del titolo: oggi è così in Pietre e rituali e in Cura di sé su desktop. **[DA APPROVARE]**
- Le etichette sono uniformi: «Vedi tutto» (tutti i prodotti di una collezione) o «Vedi tutte le pietre», «Vedi le idee regalo» se serve il nome. Oggi ci sono «Vedi tutti», «Vedile tutte», «Vedi tutte le pietre» e «Vedi tutto», da far decidere al Copywriter.
- In una colonna di testo la CTA è allineata a sinistra al testo.
- Due CTA affiancate (hero): primaria e poi secondaria, `gap: 12px`, vanno a capo se non c'è spazio.
- Su mobile una CTA è larga quanto il contenitore solo se è l'unica azione in fondo a un pannello («Aggiungi tutti» in Completa il rituale, «Iscriviti» sotto il campo).
- Una sola CTA primaria per schermata.
- I bottoni non si sollevano all'hover: oggi `.btn:hover` ha `translateY(-2px)`. Il sollevamento è riservato alle sfere categoria (§10).

**Altezza unica 44px.** Oggi la primaria e i campi sono a 48px, mentre la secondaria approvata, le chip e il «+» sono a 44. Si porta tutto a 44, la misura minima di WCAG 2.5.5, Apple e del `--minimum-touch-target` di Horizon. **[DA APPROVARE: primaria e campi da 48 a 44]**

---

## 7. Card prodotto: una sola, ovunque

Struttura (HTML indicativo):
```html
<article class="bz-card">                       <!-- tutta la card è un link al prodotto -->
  <div class="bz-card__media">[badge?] <img></div>
  <h3 class="bz-card__title">Titolo completo</h3>
  <div class="bz-card__foot">
    <p class="bz-card__cat">Pietre burattate</p>       <!-- pallino con ::before -->
    <p class="bz-price">6,00&nbsp;€</p>
    <button class="bz-plus" aria-label="Aggiungi Ametista burattata al carrello">[add]</button>
  </div>
</article>
```
| Parte | Regola |
|---|---|
| Contenitore | `background: var(--bz-surface)`, `border: 1px solid var(--bz-line)`, `border-radius: var(--bz-r-card)` (18), `padding: var(--bz-card-pad)` (8), `display: flex; flex-direction: column`. Nelle griglie la card riempie la cella (`height: 100%`); nelle file flex niente `height`, la card si allunga con `align-items: stretch` della fila |
| Immagine | `aspect-ratio: 1/1`, `object-fit: cover`, `border-radius: var(--bz-r-img)` (10). Una sola proporzione in tutto il sito. |
| Badge | al massimo 1, in alto a sinistra a 8px dal bordo dell'immagine (§8.2) |
| Testo | i blocchi di testo hanno `padding-inline: 4px`, quindi stanno a 12px dal bordo della card. Il padding è uguale a sinistra e a destra. |
| Titolo | `--bz-fs-product` (14 / 15px), sans 400, `--bz-text`, interlinea 1.4, `margin-top: 12px`, `text-wrap: pretty`, `hyphens: manual`. **Nessun limite di righe, nessun troncamento, nessun «…»**. `min-height: calc(2 × 1.4em)`, così una card con titolo di una riga non diventa più bassa delle altre. È l'`h3` della card (nelle card di una sezione mai `h2`). |
| Piede | `margin-top: auto; padding-top: 12px; display: grid; grid-template-columns: minmax(0,1fr) 44px; align-items: center; column-gap: 8px`. Prima riga: la categoria su tutta la larghezza (`grid-column: 1 / -1`), così non va mai a capo accanto al «+». Seconda riga: il prezzo a sinistra e il «+» a destra, centrati tra loro. Il piede va in fondo, quindi **in una fila i prezzi sono tutti sulla stessa linea** anche se i titoli hanno lunghezze diverse: le card di una riga si allungano alla più alta (`align-items: stretch`, sia nelle griglie sia nelle file a scorrimento). |
| Categoria | pallino 6×6px `--bz-gold` (`::before`) + etichetta `--bz-fs-xs` (12px) sans 500 `--bz-text-3`, `gap: 6px`, `margin-bottom: 4px`, su una riga. Oggi è a 10px. |
| Prezzo | `.bz-price` (§5), mai a capo; la colonna del prezzo è `minmax(0,1fr)` e il «+» resta fisso a 44px |
| «+» | 44×44px, `--bz-r-round`, fondo `--bz-gold`, icona `add` 24px `--bz-on-gold`. Hover `--bz-gold-hover`; active `scale(.94)`; focus come le CTA. **Sempre presente.** Se il prodotto ha varianti apre la scelta della variante; se è esaurito resta visibile disabilitato (`opacity: .38`) con «Esaurito» al posto della categoria. `aria-label="Aggiungi <titolo> al carrello"`. |
| Link extra | nessuno. Oggi le card Regali hanno «Vedi →», che va tolto perché la card intera è già il link. |
| Hover (desktop) | immagine `transform: scale(1.03)` in `--bz-dur-large` con `--bz-ease-enter` (contenitore con `overflow: hidden`), bordo della card a `--bz-line-2`. Nessun sollevamento. |

**Larghezza**
- **Fila di prodotti** (home e sezioni con «Vedi tutto»): **una riga sola**, con `grid-template-columns: repeat(var(--cols), minmax(0,1fr))` e `--cols` = 3 (768–1023), 4 (1024–1279), 5 (≥ 1280). Si mostrano esattamente `--cols` prodotti (gli altri hanno `display: none`); il resto si raggiunge con «Vedi tutto». Così su desktop non restano card orfane né buchi.
- **Griglia di collezione** (tablet e desktop): `grid-template-columns: repeat(auto-fill, minmax(220px, 1fr))` con `gap: var(--bz-grid-gap)`. Vengono 5 colonne a 1440, 4 a 1024 e 3 a 768; l'ultima riga può restare incompleta.
- **Mobile, griglia:** 2 colonne (169px a 390).
- **Mobile, fila a scorrimento:** card larghe `calc((100vw − var(--bz-margin) − 2 × var(--bz-grid-gap)) / 2.2)`, cioè 157px a 390: se ne vedono 2 e si intravede la terza. La fila sborda a destra fino al bordo dello schermo, con `scroll-padding-inline: var(--bz-margin)` e `scroll-snap-type: x mandatory`.
- Oggi le card mobile sono larghe 273px (I più scelti in home), 222px (pietra del mese) e 169px (Cura di sé). **[DA APPROVARE: I più scelti della home passa da 273 a 157px]**

**Titolo completo (regola di Simona)**
- Il titolo si mostra intero, con le misure («circa 3 cm», «100 ml») e senza «|».
- Oggi il tema mostra i titoli grezzi di Shopify, con «|» e frasi che sono claim («Riduce Ansia e Stress», «Effetto Filler», «Antiforfora»). Il mockup usa titoli già puliti.
- Il tema non deve tagliare il testo con Liquid, altrimenti perde misure e varianti. Serve un titolo pulito nel catalogo: un metafield `custom.titolo_card`, oppure titoli riscritti. È un lavoro sui dati e richiede scritture su Shopify. **[DA APPROVARE: Michael e Simona]**

**Correzioni sulle card di oggi**
- **Tre energie (Ayurveda):** i titoli sono in Figtree 34px a 390 e 1440 perché le card ereditano lo stile del titolo di sezione. Tornano al titolo prodotto da 14/15px e alla card standard.
- **«Stessa pietra, tre forme» (Pietre e rituali):** le righe orizzontali senza «+» diventano card standard in fila. Il kicker «Grezza / Burattata / Bracciale» resta e va al posto della categoria, con lo stesso stile.
- **Collezioni:** titolo in Baskervville 15,5–19,4px e prezzo dorato → titolo e prezzo standard.
- **Regali:** foto 4:3 senza padding con raggio 18, più «Vedi →» → card standard 1:1. **[DA APPROVARE: le card Regali su mobile, approvate, diventano quadrate]**
- **Righe di «Completa il rituale»:** restano righe con checkbox, perché sono una variante «riga» e non card. Hanno la miniatura 48×48 `--bz-r-img`, il titolo prodotto standard e il prezzo `.bz-price` a 20px (oggi 12,5px sans).

---

## 8. Chip, pill, badge e campi

### 8.1 Chip (filtri e tab nelle sezioni)
- `min-height: 44px; padding: 0 16px; border: 1px solid var(--bz-line-2); border-radius: var(--bz-r-pill); font: 500 14px/1 var(--bz-font-sans); color: var(--bz-text); background: transparent`. La fila ha `gap: 8px`.
- **Selezionata** (`aria-pressed="true"` o `aria-selected="true"`): fondo `--bz-text`, bordo `--bz-text`, testo `--bz-bg` (15,10:1).
- **Conteggio** («Tutto 23»): uno spazio e poi `--bz-fs-xs` `--bz-text-2`; nella chip selezionata `--bz-ink-2`.
- **Hover:** bordo `--bz-gold`. **Focus:** come le CTA. **Vuota** (0 risultati): bordo tratteggiato, testo `--bz-text-3`.
- **Su chiaro:** bordo `--bz-line-light-2`, testo `--bz-ink`; la selezionata ha fondo `--bz-ink` e testo `--bz-surface-light` (12,82:1).
- **Fila:** su mobile scorre in orizzontale fino al bordo dello schermo, senza barra, con `scroll-padding-inline: var(--bz-margin)`. All'apertura la chip attiva è visibile (mesi: precedente, corrente, successivo). Su desktop la fila va a capo se serve; niente frecce.
- Oggi le chip sono a 13px 500 con padding 16, a 13px con padding 18 (mesi) e a 14px 400 con padding 20 (collezioni).

### 8.2 Badge
| | Badge prodotto («Ultimo pezzo», «Novità») | Badge di stato («Aperto ora», «Chiude alle 19:30», «Chiuso») |
|---|---|---|
| Altezza visiva | 24px | 32px |
| Padding | `0 10px` | `0 14px 0 12px` |
| Font | sans 12px 600, `letter-spacing: .02em` | sans 13px 500 |
| Colori | fondo `--bz-gold`, testo `--bz-on-gold` (8,21:1) | trasparente con bordo 1px `--bz-line-2` e testo `--bz-text`; sopra una foto il fondo è `--bz-veil-badge` |
| Pallino | – | 8px: aperto `--bz-status-open`, chiude a breve `--bz-gold`, chiuso `--bz-text-3` |
| Dove | sull'immagine, in alto a sinistra a 8px; massimo 1, «Ultimo pezzo» vince su «Novità» | accanto all'indirizzo, uno per pagina |
| Se è cliccabile | – | l'area cliccabile arriva a 44px con un `::before` trasparente; l'aspetto resta da 32px |
| Movimento | nessuno | il pallino pulsa in opacità al massimo per 2 s, poi si ferma |

Oggi «Novità» è `#e3cb95` a 11px, «Ultimo pezzo» è `#c9a96e` a 12px e il badge di stato è alto 34px in home e 44px in Ayurveda.

### 8.3 Pill del menu (approvata, congelata)
La voce selezionata ha fondo `--bz-surface-2`, `--bz-r-pill` e sans 14px 500. È un componente di navigazione, non una chip: non si usa nelle sezioni.
Nota: nel pannello mobile le voci sono alte 32px, sotto i 44 (il QA segnala 15 aree di tocco piccole in home). Il menu è congelato: lo segnalo e non lo cambio.

### 8.4 Campi
- **Campo:** `height: 44px; padding: 0 20px; border: 1px solid var(--bz-line-field); border-radius: var(--bz-r-pill); background: var(--bz-bg)` (dentro un pannello `--bz-surface`) oppure `--bz-surface` (su `--bz-bg`).
- **Testo:** **16px** (sotto i 16px iOS ingrandisce la pagina) `--bz-text`; placeholder `--bz-text-3` (5,65:1).
- **Focus:** bordo `--bz-gold` + `outline: 2px solid var(--bz-gold); outline-offset: 2px`.
- **Errore:** bordo `--bz-error` + messaggio sotto a `--bz-fs-xs` `--bz-error`, collegato con `aria-describedby`.
- **Etichetta:** sempre un `<label>` (anche nascosto visivamente); il placeholder non sostituisce l'etichetta.
- **Placeholder:** deve stare intero nel campo a 390. Oggi «Cerca un mala, una pietra, un ciondolo» in un campo largo 243px a 390 si taglia: il Copywriter deve accorciarlo (circa 26 caratteri al massimo).
- **Campo + bottone** (newsletter, ricerca), un solo schema:
  - ≥ 480px: in riga, `display: flex; gap: 8px`, campo `flex: 1`, CTA primaria a 44px; campo e bottone sono allineati in alto e in basso.
  - < 480px: in colonna, `gap: 8px`, il bottone largo quanto il campo.
  - Mai il bottone dentro il campo.
- **Ricerca:** icona `search` 20px a 16px dal bordo sinistro, `padding-left: 44px`; il bottone è «Cerca» (primaria) oppure solo l'icona nell'header (44×44).
- **Newsletter:** un solo componente, il pannello `--bz-surface` della home: titolo H3 con corsivo, poi campo + bottone, poi la nota `--bz-fs-sm` `--bz-text-2`. Oggi in Ayurveda c'è un pannello a gradiente oro diverso; il titolo «Novità, via email» del tema non è quello approvato («I nuovi arrivi, *nella tua email*»).

---

## 9. Icone

- **Libreria:** solo Material Symbols Outlined, `FILL 0`, `wght 300`, `GRAD 0`, `opsz` uguale alla dimensione (20, 24, 40). Si usano come SVG inline con `fill="currentColor"` e `aria-hidden="true"`. Unica eccezione: Game-icons sulle carte del mazzo.
- **Dimensioni (solo queste):**
| Token | px | Dove |
|---|---|---|
| `--bz-icon-sm` | 18 | freccia `arrow_forward` nelle CTA, icona nel badge di stato |
| `--bz-icon-md` | 20 | icona d'azione nelle CTA, campi, chip, accordion (`add`/`remove`), trust badge |
| `--bz-icon-lg` | 24 | header (cerca, carrello, menu), «+» della card, chiudi |
| `--bz-icon-xl` | 40 | icone decorative nelle tile categoria (Pietre e rituali, Cura di sé) |
- **Colore** (`currentColor`): `--bz-text`, `--bz-text-2`, `--bz-gold` (icone decorative, accordion, trust badge), `--bz-on-gold` (nella CTA primaria e nel «+»), `--bz-ink` / `--bz-gold-on-light` su chiaro. Nessun altro colore.
- **Bottone solo icona:** 44×44, `aria-label` obbligatorio. Un'icona non è mai l'unica cosa che spiega un'azione, salvo carrello, cerca, menu e chiudi.

---

## 10. Movimento

**Token**
| Token | Valore | Per cosa |
|---|---|---|
| `--bz-dur-press` | 100ms | pressione (active) |
| `--bz-dur-hover` | 150ms | hover, colore, bordo, toggle |
| `--bz-dur-ui` | 250ms | accordion, cambio chip/tab, crossfade del contenuto |
| `--bz-dur-large` | 400ms | drawer, menu, flip della card pietra, comparsa della sezione, zoom dell'immagine |
| `--bz-dur-ambient` | 1200ms | solo dissolvenza dell'hero su desktop |
| `--bz-ease-standard` | `cubic-bezier(.2,0,0,1)` | ciò che inizia e finisce sullo schermo (M3 standard) |
| `--bz-ease-enter` | `cubic-bezier(.2,.7,.1,1)` | entrate (= l'attuale `--ease` del tema, vicina a M3 emphasized decelerate) |
| `--bz-ease-exit` | `cubic-bezier(.3,0,.8,.15)` | uscite (M3 emphasized accelerate); l'uscita dura circa il 60% dell'entrata |

Si animano solo `transform` e `opacity` (e `clip-path` per il velo dell'hero). Niente `linear` per un oggetto che si muove. Oggi il CSS ha 69 dichiarazioni `transition` diverse, 12 durate e 5 curve.

**Dove il movimento è ammesso (il «qua e là»)**
1. **Sfere categoria** (home e «Scegli da dove iniziare»), solo con `@media (hover:hover)`: all'hover `transform: translateY(-4px)` in `--bz-dur-hover` con `--bz-ease-standard`, più un alone su `::after` (`box-shadow: 0 0 0 1px var(--bz-gold), 0 8px 24px rgba(201,169,110,.28)`) che passa da `opacity: 0` a `1`. Si anima solo l'opacità dell'alone, non l'ombra. Premuta: `scale(.97)` in `--bz-dur-press`. Al tocco: solo `:active`.
2. **Comparsa della sezione:** solo il blocco titolo (kicker + H2 + lead) di ogni sezione sotto la piega: `opacity 0→1` e `translateY(12px→0)`, in `--bz-dur-large` con `--bz-ease-enter`, una sola volta, quando il 15% è visibile. Mai su card, prezzi, CTA o sul primo schermo. Senza JS si vede tutto: la classe si aggiunge da JS. Questo allenta la regola del playbook che vietava ogni comparsa allo scroll. **[DA APPROVARE]**
3. **Card:** zoom dell'immagine `1.03` su desktop (§7).
4. **Chip:** il contenuto sotto cambia con una dissolvenza in `--bz-dur-ui`; l'altezza non si anima (si salta) e il contenitore tiene un `min-height` per evitare salti (come la FAQ r8).
5. **Accordion:** l'altezza si apre senza animazione, il contenuto compare in opacità in `--bz-dur-ui`; l'icona passa da `add` a `remove` senza rotazioni.
6. **Hero:** dissolvenza `--bz-dur-ambient` ogni 5–7 s solo su desktop; si ferma al primo tocco, hover o focus; su mobile resta sulla slide 1 (decisione del 17/11).
7. **Una sola trovata per pagina:** la timeline dell'Ayurveda, il flip della card pietra. Ogni movimento automatico si ferma entro 5 s.

Tutto il resto è fermo: niente parallax, scroll-jacking, rimbalzi, rotazioni o sollevamento dei bottoni.

**prefers-reduced-motion: reduce**
```css
@media (prefers-reduced-motion:reduce){
  *,*::before,*::after{animation-duration:.01ms!important;animation-iteration-count:1!important;
    transition-duration:.01ms!important;scroll-behavior:auto!important}
  .bz-fade-ok{transition:opacity 150ms linear!important}  /* solo dissolvenze ≤150ms */
}
```
Con riduzione attiva: niente spostamenti, zoom, flip 3D (si passa con una dissolvenza ≤ 150ms), autoplay o pulsazioni. Le sezioni sono già visibili.

---

## 11. Checklist per componente (per l'agente che verifica)

Ogni sezione si verifica a 390, 768, 1024 e 1440, **in due sensi**:
- **mobile → desktop:** «va bene a 390; a 1440 usa la larghezza? niente metà vuote, niente card giganti, niente pile verticali»;
- **desktop → mobile:** «va bene a 1440; a 390 regge? niente colonne strette testo+foto, niente card orfane, la chip attiva visibile».

Si annota OK/KO con il valore misurato (`getComputedStyle` + `getBoundingClientRect`).

| Componente | Verifica |
|---|---|
| Sezione | Distanza dalla precedente = `--bz-section-gap` (56/72/88 ±1px) tra bordi visibili; margine laterale 20 (< 1024) o 28; contenuto ≤ 1384px e centrato a 1920; tipo A/B/C coerente con §3.2; dopo una fascia, su desktop, una sezione aperta. |
| Titoli | Dimensione = token (H1 40/64, H2 30/48, H3 24/32, H4 18/20 a 390/1440); un solo `<em>` alla fine, colore `--bz-gold` o `--bz-gold-on-light`; nessun testo < 12px nella sezione; corpo 16px. |
| Pannello | Raggio 28; padding uguale sui 4 lati (20/32/48); un solo pannello chiaro per pagina; token chiari dentro il pannello chiaro. |
| Card prodotto | Proporzione dell'immagine 1:1; padding 8; raggio 18/10; titolo intero (nessun `line-clamp`, `text-overflow` o «…»), 14/15px avorio; prezzi della fila sulla stessa `y` (±1px), anche nelle file a scorrimento; «+» 44×44 presente; nessun link «Vedi» dentro; categoria 12px su una riga; nelle file di sezione nessuna card orfana (3/4/5 a 768/1024/1280+). |
| Prezzo | Baskervville 20px (o 28→36 se protagonista), colore `#eee7db` o `#24201b`, `white-space: nowrap`, carattere prima di € = U+00A0, contrasto ≥ 4,5:1, mai oro o grigio. |
| CTA | Altezza 44; massimo una primaria per schermata; la secondaria sotto le file è centrata a 32/40px; una sola icona; freccia solo se porta a un'altra pagina; stato di focus visibile con la tastiera; nessun `translateY` all'hover. |
| Chip | 44 di altezza, padding 16, 14px 500; selezionata avorio con testo antracite; su mobile la chip attiva si vede all'apertura. |
| Badge | Prodotto 24px oro, uno per card; stato 32px con pallino, area cliccabile 44 se interattivo. |
| Campi | 44 di altezza, testo 16px, bordo ≥ 3:1, `<label>` presente; campo e bottone alla stessa altezza e allineati; impilati sotto 480px. |
| Icone | Solo SVG Material Symbols Outlined 300; dimensione in {18, 20, 24, 40}; colore = token; bottoni solo icona 44×44 con `aria-label`. |
| Movimento | Solo `transform`/`opacity`; durate in {100, 150, 250, 400, 1200}; con reduced-motion nulla si sposta; niente si muove da solo oltre 5 s. |
| Contrasto | Ogni testo ≥ 4,5:1 (≥ 3:1 se ≥ 24px); testo su foto con velo ≥ .65 sotto la riga. |

---

## 12. Incoerenze attuali → regola

Viste sull'anteprima `212741062994` e in `qa-r8c-fix1/`.

| # | Cosa si vede oggi | Regola che la risolve |
|---|---|---|
| 1 | Prezzo «Mattina e sera» (Cura di sé) `#c3c3c3` su pannello chiaro: **1,40:1** | §5: `--bz-ink` su chiaro (12,82:1) |
| 2 | 6 stili di prezzo (22, 17, 15–16, 24/34, 12,5, 26–28px; grigio `#c3c3c3`, dorato `#e3cb95`, avorio) | §5: uno stile, 20px o 28→36px, avorio/ink |
| 3 | Titoli prodotto bianchi `#ffffff` a 12, 13, 14px Figtree; 15,5–19,4px Baskervville nelle collezioni; **34px** nelle card Tre energie | §4 e §7: 14/15px sans `--bz-text` ovunque |
| 4 | Le righe di «Stessa pietra, tre forme» non hanno il «+» | §7: card standard con «+» |
| 5 | Card Regali: foto 4:3 senza padding, raggio 18, link «Vedi →» in più; I più scelti: padding 6, raggio 16/11, foto 1:1 | §7: una card, padding 8, raggio 18/10, 1:1, niente link interni |
| 6 | Card mobile larghe 273, 222 e 169px a seconda della pagina | §7: 2 colonne in griglia, 2,2 card visibili nelle file |
| 7 | Titoli grezzi di Shopify con «\|» e claim («Riduce Ansia e Stress», «Effetto Filler», «Antiforfora») | §7: titolo pulito dal catalogo (metafield o titoli riscritti) |
| 8 | Fascia «Anche a Cento» → FAQ a 18px invece di 54/86 | §3.2 regole 1 e 3 |
| 9 | Nessuna larghezza massima: a 1920 il contenuto è largo 1864px | §3.1: `--bz-container-max: 1440px` |
| 10 | Primaria 48px, secondaria 44, campi 48, chip 44; primaria a 12, 13 o 14px con padding 13/16 o 14/24 | §6 e §8: tutto a 44, primaria 14px 600 con padding 24 |
| 11 | Freccia «→» disegnata da un font di riserva (non c'è in Figtree né in Baskervville); frecce anche sulle CTA d'azione | §6: `arrow_forward` SVG solo per la navigazione; icona iniziale per le azioni |
| 12 | «Vedi tutto» in 3 forme (pill centrata, link oro nella riga del titolo, link sotto il titolo) e 4 etichette | §6: secondaria centrata sotto la fila |
| 13 | Chip a 13px 500 con padding 16, 13px con padding 18, 14px 400 con padding 20 | §8.1: 14px 500, padding 16 |
| 14 | Badge: «Novità» `#e3cb95` 11px, «Ultimo pezzo» `#c9a96e` 12px; badge di stato alto 34 o 44px | §8.2 |
| 15 | Newsletter: pannello scuro in home, gradiente oro in Ayurveda; titolo diverso da quello approvato | §8.4: un componente, titolo approvato |
| 16 | Testi a 10px (categoria), 11px (kicker, «Novità»); molte frasi d'apertura a 13–14px | §4: minimo 12px, corpo 16px |
| 17 | Corsivo oro su chiaro `#86612c`: 4,42:1 | §1: `--bz-gold-on-light #7a5726` (5,17:1) |
| 18 | Accenti in testa o su tutto il titolo («*Oil pulling* e…», «*Capelli*») | §4: accento solo alla fine, 1–3 parole |
| 19 | H1 a 1440 tra 46 e 76px (7 valori); H2 tra 37 e 63px | §4: H1 64, H2 48, H1 compatto 40 |
| 20 | 99 dimensioni di carattere, 36 raggi, 66 `gap`, 69 `transition`; pesi 700/900 | §2, §3.3, §4, §10: solo token |
| 21 | `.btn:hover { translateY(-2px) }` su tutti i bottoni | §6 e §10: il sollevamento solo sulle sfere |
| 22 | Bordo dei campi `rgba(238,231,219,.24)`: 1,97:1 (< 3:1) | §8.4: `--bz-line-field` 3,34:1 |
| 23 | Voci del menu mobile alte 32px (15 aree di tocco piccole in home) | §8.3: segnalato, menu congelato |
| 24 | La FAQ desktop della home ha ancora i trust badge | §3.2 regola 3: FAQ semplice, senza badge |
| 25 | Il placeholder della ricerca si taglia a 390 (campo largo 243px) | §8.4: placeholder intero a 390 |
| 26 | Le etichette delle CTA possono andare a capo | §4 e §6: `white-space: nowrap` |

---

## 13. Da approvare (Michael)

1. FAQ desktop della home come sezione aperta, senza riquadro chiaro e senza badge (§3.2). L'alternativa è tenere il riquadro chiaro e correggere solo la distanza a 88px.
2. Altezza unica 44px: la primaria e i campi passano da 48 a 44 (§6).
3. Corpo e frasi d'apertura a 16px su mobile, oggi 13–14 (§4).
4. Card mobile nelle file a scorrimento a 2,2 visibili (157px): I più scelti della home passa da 273px (§7).
5. Le card Regali (approvate su mobile) diventano card standard quadrate con padding 8 (§7).
6. «Vedi tutto» solo come pill centrata sotto la fila, anche dove oggi è un link nella riga del titolo su desktop (§6).
7. Freccia come icona `arrow_forward` al posto del carattere «→» (§6).
8. Comparsa del blocco titolo allo scroll: allenta il «niente comparse allo scroll» del playbook (§10).
9. Titoli prodotto puliti nel catalogo (metafield `custom.titolo_card` o titoli riscritti), da decidere con Simona. Richiede scritture su Shopify (§7).
10. Placeholder della ricerca più corto (§8.4), da far scrivere al Copywriter.
11. Accenti dei titoli: «*Oil pulling* e cura della bocca» e «*Capelli*» vanno riformulati dal Copywriter (§4).

---

## 14. Fonti
- Anteprima del tema `212741062994` (`bz-v411c.css` scaricato e misurato con Chromium, 18/11 19:00 ora di Roma).
- `qa-r8c-fix1/` (`compare/FINDINGS.md`, `qa-run/report.md`, screenshot) e `mockup-v411c/r8c/` con `assets/*.css`.
- `regole-design.md`, `checklist-consegna.md`, `design-library/BZ-playbook.md`, `principi/05-motion-material-hig.md`, `principi/07-shopify-dawn-horizon-polaris.md`, `patterns/03-card-prodotto-e-card-pietra.md`.
- Material 3, token di easing e durata: https://m3.material.io/styles/motion/easing-and-duration/tokens-specs
- Shopify Horizon, `--minimum-touch-target` e token dei bottoni (`design-library/repos/horizon`, commit c531fd5).
- WCAG 2.2: 1.4.3 contrasto, 1.4.11 contrasto non testuale, 2.5.5 dimensione del bersaglio (rapporti calcolati con la formula WCAG).
- Baymard, informazioni e coerenza nelle card di lista: https://baymard.com/research-articles/product-listing-information
- Officine Universelle Buly (riferimento lusso, `design-library/shots/buly-390-full.jpg`): un solo stile di prezzo ad alto contrasto e card con CTA a pill di contorno.
- Google Fonts: Baskervville (funzione `lnum` presente, U+2192 assente) e Figtree (U+2192 assente), controllati con fontTools.
