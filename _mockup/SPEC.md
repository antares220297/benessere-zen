# Benessere Zen · Spec del giro mockup **v4.11c** (fonte unica per il build del tema)

> **Leggere prima il §0.** Il §0 «Stato finale approvato (18/11)» scavalca tutto ciò che c'è sotto. Dove una sezione più vecchia, un brief o un mockup lo contraddicono, vale il §0. Le sezioni superate hanno l'etichetta **SUPERATA** o **ANNULLATA**.

---

## §0 — Stato finale approvato (18/11)

È la fonte unica per il build del tema Shopify **v4.11c**. Il cloud agent costruisce 1:1 da questo §0, dai mockup HTML della tabella 0.B e dal resto della spec dove non è segnato come superato. Le regole vincolanti stanno in `regole-design.md`. Tutte le decisioni sotto sono di Michael.

### 0.A Decisioni finali

1. **Home = `home.html`** (variante B «Completa il rituale»; `home-variante-b-rituale.html` è identico, cambia solo il `<title>`). La **ruota delle intenzioni è tolta** (§18.3 ANNULLATA). Ordine delle sezioni: hero a slide → sfere categoria → mazzo «Pietre e *rituali*» → mazzo «Cura di *sé*» → «I più scelti» → «Completa *il rituale*» → «Scegli la tua *pietra*» → fascia regali → «Anche a *Cento*» + FAQ → striscia servizi → newsletter «Una lettera *al mese*». Nella sezione rituale il fondo scuro cambia con il set scelto, con una dissolvenza morbida (`.ritual-bg[data-tone]`, `opacity` 400 ms, `style#ritual-tones`). Il rituale sta sopra la fascia regali.
   - Codice morto da **non** portare nel tema: `style#ruota-affordance`, regole e JS di `#intenzioni`/`.dial-*`/`#intention-dial`, regole `.door*` (card-porta), `concept-*.html`, `home-calma.html`, `home-variante-a-ruota.html`. Nel tema attuale `index.json` ha ancora `bz-intentions` e `bz-doors`: vanno tolte.
2. **Fascia regali al posto dei «108 grani»** (`section.mala-band`, `aria-labelledby="gift-title"`). È un bento: card grande «Regali piccoli, *sotto 30 €*», con foto vera del negozio (`img/negozio/ventaglio-6-ciondoli.jpg`) e la CTA «Vedi le idee regalo →» verso `/collections/oggettistica-e-idee-regalo`, più **4 card prodotto** uguali (foto, titolo, tipo, prezzo, «+»). Desktop: card grande a sinistra su 2 righe e una griglia 2×2 a destra. 768 e 390: card grande a tutta larghezza, poi 2×2. Nel tema i 4 prodotti si scelgono da un setting (lista di prodotti o collezione); non vanno scritti a mano.
3. **Set «Completa il rituale»: sconto bundle del 10%** (per esempio «Il set costa 30,06 € invece di 33,40 €: 10% in meno»), tramite l'app **Shopify Bundles**. L'installazione dell'app richiede l'OK di Michael; il tema deve funzionare anche senza l'app:
   - **Senza l'app**, o con il bundle non configurato, si mostra solo la somma dei prezzi: nessuna riga di sconto e nessun prezzo barrato inventato.
   - I set sono legati agli **handle dei prodotti** (setting o metaobject) e usano i **prezzi live**.
   - Un pezzo esaurito è disattivato (riga attenuata e non spuntabile) o sostituito da un altro pezzo configurato.
   - Il pulsante aggiunge tutti i pezzi con **una sola chiamata `/cart/add.js` con `items[]`**.
   - **Nessuno sconto sui bundle mensili delle pietre** (Pietre e rituali, «La pietra del tuo mese»): solo il «+» per ogni prodotto e «Aggiungi tutti →», senza testo di sconto.
4. **Pulsanti «+» oro pieni ovunque**, home compresa: fondo `#c9a96e`, icona `#17140f`, 44 × 44 px, hover `#d4b67d` + `translateY(-1px)`, focus `outline 2px #eee7db` con offset 3 px (regola `.add` in `assets/bz-mock.css`). Un solo stile e una sola misura su tutte le pagine (anche a 390). Annulla il divieto «gold-filled + buttons» di `briefs/r3/COMMON.md`.
5. **Pietre e rituali.** La CTA della hero è «Vieni in negozio →». La CTA del blocco «In mano, a *Cento*» è «Orari e indicazioni →». La **pietra del mese** sta solo qui (`.birthstones`, 12 mesi in una riga di pill a scorrimento) e non in home.
6. **Cento citata solo in 3 punti** della home: barra annunci («Ogni pezzo è anche **in negozio**»), blocco «Anche a *Cento*» e footer. La frase su Cento nella slide 1 della hero è tolta; la FAQ non ha domande su ritiro e negozio; la striscia servizi non ha la voce ritiro.
7. **Fasce:**
   - pannelli arrotondati che si alternano (non a tutta larghezza), con il 30% di spazio in più tra le sezioni (spaziature esatte da `home.html`, a ogni larghezza);
   - «Un pezzo da regalare» è tolto;
   - a 390 «Scegli la tua *pietra*» mostra **4 pietre in griglia 2×2 + il pulsante «Vedile tutte»**, che apre le altre (niente carosello: §3, riga 390, SUPERATA).
8. **Un solo componente per intestazione e selettore**: `.bz-sh` (titolo a sinistra, «Vedi tutto →» a destra sulla riga del titolo, se previsto) + `.bz-pills` (sotto il titolo, a contorno, attiva avorio, 44 px, una riga, scorrimento con dissolvenza `bz-pills-js`, mai a capo). Vale per «I più scelti», il rituale, «Scegli la tua pietra», la FAQ, la pietra del mese, il confronto forme, Cura di sé e Ayurveda. Sulla card avorio della FAQ si usano i colori invertiti (`.faq-card .bz-pills`).
9. **Nuovo template di collezione** da `collezione.html` (+ `assets/collezione.css`, `assets/collezione.js`):
   - breadcrumb, titolo con corsivo oro, intro e numero dei pezzi;
   - chips di tipo; «Filtri» in un pannello dialog (Disponibilità, Prezzo con doppio cursore, Intenzione, Pietra) e «Ordina»;
   - filtri attivi rimovibili, stato vuoto, «Carica altri» con barra «24 di 60», badge «Esaurito»;
   - nel tema: filtri nativi Shopify (Search & Discovery), ordinamento e paginazione Liquid.
10. **Titoli prodotto esattamente come sono in Shopify** (gli originali di Simona: 658 su 719 contengono «|», per esempio «Tazza con Infusore | Mandala Bianco»). Sempre `product.title` con `escape`: **mai** `split`/`strip`/troncare sulla «|», mai ricavare i cm dal titolo. I titoli scritti nei dati dei mockup sono solo un esempio e non si copiano. Nel ramo base ci sono 3 punti da correggere: `sections/bz-promo.liquid:65`, `sections/bz-gestures.liquid:35`, `snippets/bz-ritual-row.liquid:6` (`| split: '|' | first`). **Una sola collezione di pietre: «Pietre Grezze e Burattate»** (`/collections/pietre-burattate`); nessun link a collezioni separate di grezze o burattate.
11. **Ritiro in negozio a Cento gratuito**: ritiro locale nativo di Shopify, 0 €, «di solito pronto in 4 ore» (confermato dal bot Benessere Zen il 17/11).
12. **Orari da un'unica tabella** (metaobject o setting di tema, letto da un solo snippet), usata da badge «Aperto ora», footer, Chi siamo, Il negozio, Contatti, carrello, menu e blocchi Cento. Gestisce una o due fasce al giorno ed eccezioni per data. **Dal 1/12 il negozio è aperto tutti i giorni**; finché mancano gli orari della domenica, il segnaposto visibile è «Domenica: dal 1° dicembre aperto, orari in arrivo». **Mai «Domenica chiuso».** Aggiungere la domenica deve voler dire solo inserire i dati.
13. **Icone solo da librerie libere**: Material Symbols Outlined 300 (default) e Game-icons per le carte del mazzo. Il credito «Icone: Lorc e Delapouite, game-icons.net (CC BY 3.0)» sta **nel footer comune, quindi su tutte le pagine**. **Solo foto vere**: del negozio, del CDN Shopify, o macro da Wikimedia con attribuzione (`img/pietra-macro-README.md`). Niente immagini IA nuove. Le 6 nature morte del rituale (§5, generate) restano segnaposto da sostituire con scatti in negozio.
14. **«da X €» sulle carte del mazzo** = prezzo minimo vero della collezione, calcolato in Liquid (`collection.price_min` o equivalente), mai scritto a mano. **«Reso entro 14 giorni»** (striscia servizi e FAQ) è conforme alla policy del negozio (verificato il 18/11 su `/policies/refund-policy`: 14 giorni dalla ricezione); va mostrato solo finché la policy dice così.
15. **Token e regole:**
   - Colori: `--bg #141312`, `--card #201e1b`, `--ivory #eee7db`, `--gold #c9a96e` (tabella §0.1 completa).
   - Font: titoli in Baskervville con la parola chiave in corsivo oro, testo in Figtree.
   - Movimento: solo `transform`/`opacity`, ≤ 400 ms per l'interfaccia (dissolvenza hero 1,2 s, §1), con `prefers-reduced-motion` rispettato.
   - Verifica a 390, 768, 1024 e 1440, senza overflow orizzontale; aree di tocco ≥ 44 px.
   - Su desktop si usa tutta la larghezza, con layout orizzontali (`regole-design.md` §3).

### 0.B Mappa pagine → template Shopify

| Mockup | Template nel tema (ramo base `bz-v410-cura-v2`) | Note |
|---|---|---|
| `home.html` | `templates/index.json` | sezioni come 0.A.1; togliere `bz-intentions` e `bz-doors` |
| `pietre-e-rituali.html` | `templates/page.pietre-e-rituali.json` | pagina `pietre-e-rituali` |
| `cura-di-se.html` | `templates/page.cura-di-se.json` | |
| `ayurveda.html` | `templates/page.cos-e-ayurveda.json` | pagina con handle `cose-layurveda` e suffisso template `cos-e-ayurveda`; tenere allineato anche `page.cose-layurveda.json` |
| `il-negozio.html` | `templates/page.il-negozio.json` | |
| `chi-siamo.html` | `templates/page.chi-siamo.json` | |
| `contatti.html` | `templates/page.contact.json` | verificare sul negozio quale pagina usa il suffisso `contact` |
| `collezione.html` | `templates/collection.json` (+ `collection.pietre-burattate.json`) | sezione di collezione unica (0.A.9) |
| `cart.html` | `templates/cart.json` + cassetto carrello | |
| `menu.html` | header e menu in `sections/` (gruppo header) | è una pagina di stati del menu (§12), non un template |
| — | `templates/product.json` | nessun mockup: resta com'è, salvo titoli (0.A.10) e «+» (0.A.4) |

Header, barra annunci, footer, badge e tabella orari sono comuni a tutte le pagine: si costruiscono una volta sola, come snippet o sezioni di gruppo.

### 0.C FAQ della home (segnaposto: il copy arriva a parte)

Il contenuto della FAQ **non** è in questa spec. Arriva in `copy/faq-r4.md` (Copywriter, fatti verificati dal bot Benessere Zen). Struttura:
- pannello **avorio** (`.faq-card`) accanto ad «Anche a *Cento*»;
- titolo «Domande *frequenti*»;
- tab `.bz-pills` invertite + **accordion** (`<details>`) che regge **10-14 domande** in 3-4 tab senza rompere il layout a nessuna larghezza;
- niente domande su ritiro e negozio.

Le domande e le tab si prendono da `copy/faq-r4.md` e dalla FAQ di `home.html` così com'è al momento del lancio (integrazione r4 in corso il 18/11, con backup in `logs/home.pre-faq-r4.html`).

### 0.D Da chiudere prima del lancio (il mockup non coincide con il §0)

Su questi punti il builder **non decide**: segue l'indicazione scritta qui quando c'è, altrimenti chiede.
1. **Collezioni pietre.** I mockup (menu, footer e «Vedi le pietre grezze →» in Pietre e rituali) puntano ancora a `/collections/pietre-grezze`, che sul negozio esiste ancora (24 prodotti). Il mazzo ha due carte separate, «Pietre grezze» e «Burattate». In base a 0.A.10 tutti i link vanno su `/collections/pietre-burattate`. Le due carte del mazzo sono **da decidere** (una carta sola o due carte sulla stessa collezione).
2. **Ayurveda «Tre energie».** Il mockup contiene **entrambe** le varianti dosha (sfere §8.1 e triangolo §8.2). Da decidere quale va nel tema.
3. **Riga di sconto del set.** Nel mockup la riga di sconto mostra sempre il prezzo del set intero, anche con pezzi non spuntati. Con Bundles lo sconto vale solo per il set completo: la riga si mostra solo se tutti i pezzi sono spuntati e il bundle è attivo.
4. **Titoli nei dati dei mockup.** In `assets/collezione-data.js` i titoli sono tagliati alla «|» (nota nel file). Solo esempio: nel tema vale 0.A.10.
5. **«Regali piccoli» due volte in home**: card piccola della hero e fascia regali. Si costruisce come da mockup e va segnalato a Michael.

**Decisioni del Designer (18/11, notte; Michael ha delegato agli agenti finché nulla va live). Valgono come §0.A:**
1. **Collezioni pietre:** il mazzo resta con le **due carte** approvate da Michael. «Pietre grezze» va su `/collections/pietre-grezze`, che esiste live, e «Burattate» va su `/collections/pietre-burattate`. Anche il link «Vedi le pietre grezze →» resta su `pietre-grezze`. Menu e footer li prende il tema dai menu Shopify live ripristinati (`linklists`), non da link scritti nel codice. In generale un link punta solo a collezioni che esistono live; il builder controlla gli handle e, se una collezione manca, ripiega su `pietre-burattate`. Questo sostituisce la frase «tutti i link vanno su pietre-burattate» del punto 0.A.10.
2. **Ayurveda «Tre energie»:** nel tema va la variante **a sfere/orbita (§8.1)**, approvata da Michael il 17/11 alle 15:49, con le etichette nei colori dei dosha. La variante a triangolo (§8.2) non si costruisce.
3. **Riga di sconto del set:** si mostra «10% in meno» solo se tutti i pezzi sono spuntati e lo sconto bundle è davvero attivo. Con pezzi non spuntati, o senza l'app, si mostra solo la somma dei prezzi selezionati: nessuno sconto finto.
4. **Titoli:** nel tema i titoli si mostrano come sono salvati. I dati dei mockup non contano.
5. **«Regali piccoli» doppio:** si costruisce come da mockup e lo segnalo io a Michael.

---

## Storico della spec (17/11), valido solo dove il §0 non dice altro


Scritta il 17/11/2026 dal lead UI/UX. Risponde, punto per punto, a `mockup-v411b/feedback-michael-2.md` (17/11, 13:27). **Le idee che Michael non cita sono approvate così come sono in v4.11b** e non si toccano.

Aggiornamento del 17/11 sera: la home definitiva (mazzo, ruota, contrasto della hero) è descritta nel §18; le sezioni precedenti restano, con le note di scavalcamento indicate lì.

Questa è una spec di design. Non contiene HTML né codice di produzione. Chi costruisce il mockup v4.11c (mockup statici in `mockup-v411c/`, stesse regole tecniche di `mockup-v411b/briefs/COMMON.md`) la segue 1:1. Ogni deviazione si **propone** prima, con il motivo (`regole-design.md` §1).

Fonti lette: feedback, `mockup-v411b/index.md`, `briefs/COMMON.md` e i brief di pagina, `assets/bz-mock.css`, `input/bz-tokens.css`, `regole-design.md` (vincolante), tutte le schermate in `shots/` e `shots/idee/`, `mockup-v411/chi-siamo.html` con la schermata, i principi di `design-skills/` (impeccable, frontend-design, taste-skill). Catalogo letto in sola lettura su Shopify (`benesserezen.shop`, 17/11).

---

## 0. Regole comuni a tutto il giro

### 0.1 Token (da `input/bz-tokens.css` e `assets/bz-mock.css`, non se ne inventano altri salvo quelli definiti qui sotto)
| Token | Valore | Uso |
|---|---|---|
| `--bg` | `#141312` | fondo pagina |
| `--bg2` | `#1b1917` | fasce secondarie |
| `--card` / `--card2` | `#201e1b` / `#29261f` | card |
| `--deep` | `#0d0c0b` | sfumature scure sulle foto |
| `--ivory` / `--ivory2` / `--mute` | `#eee7db` / `#cdc4b4` / `#958d7f` | testo |
| `--gold` / `--goldl` | `#c9a96e` / `#e3cb95` | accento, pill oro `linear-gradient(120deg,var(--goldl),var(--gold))` con testo `#211b11` |
| `--line` / `--line2` | `rgba(238,231,219,.11)` / `.24` | bordi |
| `--r` / `--rl` / `--rs` | `18px` / `28px` / `12px` | raggi |
| `--serif` / `--sans` | Baskervville / Figtree | titoli / testo |
| `--ease` | `cubic-bezier(.2,.7,.1,1)` | uscite e risposte all'utente |

**Token nuovi di questo giro** (dichiarati nello `<style>` della pagina che li usa, non in file condivisi):
- `--ease-io: cubic-bezier(.4,0,.2,1)` per dissolvenze incrociate.
- Durate: `--t-micro: 160ms` (hover, spunte), `--t-ui: 240ms` (cambio contenuti, pill), `--t-flip: 400ms`, `--t-fade: 1200ms` (hero).
- Tinte di sezione: vedi §9 (Ayurveda) e §10 (Chi siamo).
- Colori dosha: vedi §8.0.

### 0.2 Movimento
- Solo `transform` e `opacity` (più `clip-path` dove già usato). Mai `filter`, `width`, `height`, `top/left`, `box-shadow` animati: un'ombra che cambia si fa con uno pseudo-elemento pre-disegnato che va in `opacity`.
- Niente animazioni allo scroll (niente fade-in di sezioni o card). Il movimento risponde a un gesto, tranne la hero e il punto del badge «Aperto ora».
- **Animazioni continue (decisione di Michael, 17/11).** Tutto ciò che si muove da solo, tranne la hero (§1), fa un movimento breve e **si ferma da solo entro 5 s** dall'avvio (respiro delle sfere dosha §8.1, pulsazione del badge §11). Nessun tasto pausa. Non riparte da solo; con `prefers-reduced-motion` non parte.
- `@media (prefers-reduced-motion: reduce)`: niente autoplay, niente flip, niente pulsazioni, niente sollevamenti. Restano solo dissolvenze ≤ 200 ms o lo stato statico. Ogni punto qui sotto dice il suo fallback.

### 0.3 Icone
**Decisione di Michael (17/11): Google Material Symbols.** Una sola libreria: **Google Material Symbols, stile Outlined, peso 300, FILL 0, GRAD 0, dimensione ottica 24**. Gli SVG ufficiali (presi da `github.com/google/material-design-icons/symbols/web/<nome>/materialsymbolsoutlined/<nome>_wght300_24px.svg`) sono già copiati in `mockup-v411c/icons/`. Si usano inline (`fill: currentColor`), niente font da CDN, niente icone disegnate a mano. Colore di default `--gold`, 22 px nel menu, 18 px dentro le pill.

**Eccezione (17/11, home definitiva, §18).** Le carte de «Il mazzo» usano icone **Game-icons** (CC BY 3.0, Lorc e Delapouite), non Material Symbols. Il credito sta nel footer. Menu, pill, badge e il resto del sito restano su Material Symbols come sopra.

### 0.4 Larghezze utili per i calcoli
`main` ha `padding: 0 var(--side)` con `--side: clamp(14px,1.7vw,28px)`. Area utile: **390 → 362 px**, **768 → 740 px**, **1024 → 989 px**, **1440 → 1391 px**. Gap di griglia `--g: 14px`.

### 0.5 Etichette idea
Restano le etichette oro `idea-tag` con lo stesso numero di v4.11b. Le sezioni nuove prendono: **22 · Confronto forme** (Pietre e rituali) e **23 · Passa quando vuoi con orari** (Chi siamo).

---

## 1. Hero a slide (punto 1 del feedback): rotazione pulita

> **Aggiornata:** le card a destra sono «Pietre da *tasca*» e «Regali *piccoli*» (§18.4). Il testo della slide 1 non nomina più Cento (§0.A.6).

**Cosa cambia.** Via il filo-candela con la fiammella, via il tasto pausa, via qualsiasi indicatore (puntini, barre, numeri, frecce). Restano le tre slide di v4.11b (1 «Un rituale *da portare addosso*» con la mini card del mala; 2 «Nuovi arrivi *dal negozio*» con 3 prodotti veri; 3 Cura di sé), stessa foto e stesso copy. Via anche lo zoom lento: dissolvenza e basta.

**Layout.** Invariato rispetto a v4.11b: a 1440 e 1024 la card grande a sinistra (circa 2/3) e le due card «Pietre da tasca» e «25 €» a destra; a 768 la card grande a tutta larghezza con le due piccole affiancate sotto; a 390 tutto in colonna, card grande `min-height: 520px` (in `svh` se serve, mai `vh`). Le slide sono sovrapposte nello stesso riquadro (stessa altezza, quindi niente salti di layout).

**Comportamento.**
*Decisione di Michael (17/11), sostituisce il punto aperto sulla pausa.*
- **Mobile** (viewport ≤ 767 px, oppure dispositivo touch senza hover: `(max-width: 767px), (hover: none)`): **le slide restano ferme sulla slide 1**, nessuna rotazione.
- **Desktop:** ogni slide resta visibile **7 s** (dentro la forchetta 5-7 s decisa da Michael), poi dissolvenza incrociata di **1,2 s** (`--ease-io`): l'uscente `opacity 1→0`, l'entrante `0→1` nello stesso momento, l'entrante sopra (`z-index`).
- **Stop definitivo** (la rotazione non riparte più nella visita della pagina) al primo tocco, al primo hover del puntatore sulla hero o quando il focus entra nella hero (`:focus-within`): resta la slide in vista. Sospensione temporanea quando la scheda è nascosta (`visibilitychange`) o la hero è visibile per meno del 30 % (IntersectionObserver).
- **Nessun tasto pausa visibile** e nessun indicatore.
- Le slide non attive hanno `inert` e `aria-hidden="true"`: con Tab si raggiungono solo i pulsanti della slide visibile.
- Dopo **3 giri completi** la rotazione si ferma sulla slide 1 (rete di sicurezza per chi non interagisce).
- `?static=1` e `prefers-reduced-motion`: **solo la slide 1, ferma**, le altre non vengono mai mostrate.

**Aggiornamento 17/11 (contrasto, §18.4).** Michael ha trovato poco leggibili le scritte sulla foto del negozio. La foto è leggermente scurita (`brightness(.78) saturate(.85)`), il velo scuro dietro il testo è più deciso (sfumatura a sinistra e radiale), le scritte hanno un'ombra morbida, il corsivo oro è `#ddbf85` e il sottotitolo `#f3ede2`. Lo stesso trattamento vale per le due card a destra. Il comportamento delle slide non cambia. Il CSS sta in `<style id="hero-contrast">` in `home.html`.

**Criteri di accettazione (su schermata).**
- [ ] Nessun filo, fiammella, tasto pausa, puntino o numero nella card hero, a 1440 e 390.
- [ ] Le tre slide hanno la stessa altezza: confrontando tre schermate prese a 0 s, 8 s e 16 s la riga delle sfere sotto non si sposta.
- [ ] Con `?static=1` la schermata mostra la slide 1.
- [ ] A 390 (e su touch) la hero mostra la slide 1 anche dopo 20 s; a 1440, dopo un hover sulla hero, la slide non cambia più.
- [ ] L'etichetta `1 · Hero a slide` c'è ancora.

---

## 2. Via i 108 grani che scorrono e i pendoli che oscillano (idea 9)

> **SUPERATA in parte (§0.A.2):** in home la fascia «108 grani» non c'è più; al suo posto c'è la fascia regali. Resta valida la parte su Pietre e rituali.

**Cosa cambia.** Si eliminano **ovunque** la fila di grani SVG che scorre (home, fascia «108 grani, uno alla volta») e il pendolo che oscilla all'hover (home, card Pendoli; Pietre e rituali, interruttore «Mala | Pendoli» con l'iconcina del pendolo e la fila di grani sotto «I più scelti»). Le sezioni restano, ferme:
- Home: la fascia «108 grani, uno alla volta» resta com'era in v4.10 (mala, Pendoli, 50 €, Anche in negozio), senza la riga di grani in basso. La card Pendoli resta con la sua foto ferma; solo il sollevamento standard della card all'hover (`translateY(-2px)`, `--t-micro`).
- Pietre e rituali: «I più scelti» torna alla struttura standard del sito (titolo, sotto le pill «Mala» e «Pendoli» senza icone, «Vedi tutto →» sulla riga delle pill a destra). Stessa gerarchia della home (`regole-design.md` §4).
- Si toglie l'etichetta `9 · Micro-animazioni`.

**Criteri di accettazione.**
- [ ] Nella schermata home 1440 la fascia 108 grani non ha grani disegnati sotto le card.
- [ ] In Pietre e rituali sotto «I più scelti» non c'è la fila di pallini oro né l'icona del pendolo nella pill.
- [ ] Nessuna etichetta 9 nelle due pagine.

---

## 3. Card pietra (punto 3): foto vera, affordance chiara, retro con la stessa pietra

> **Aggiornata (§0.A.7):** a 390 non c'è il carosello: griglia 2×2 con 4 pietre più «Vedile tutte». Le pill vanno in `.bz-pills` (§0.A.8). Il resto vale.

**Cosa cambia.** Le sagome SVG spariscono. Ogni pietra diventa una **card rettangolare arrotondata 3:4** con una **foto vera della pietra a tutto campo**, dal catalogo. Al clic la card si gira e sul retro resta la stessa foto, attenuata, sotto il significato.

**Foto (rivisto 17/11, approvato da Michael).** Il fondo di ogni card è solo la pietra vera in macro, a tutta card, senza foto prodotto e senza tinte o colori di fondo: il colore della sezione lo danno le pietre. Nel mockup sono foto reali da Wikimedia Commons (`img/pietra-macro-<nome>.jpg`, 1200×1600, fonti e licenze in `img/pietra-macro-README.md`; 7 su 8 chiedono l'attribuzione, quindi in produzione vanno attribuite o, meglio, sostituite con macro scattate in negozio). Leggibilità: velo neutro graduato solo dal 46% dell'altezza in giù, dietro le scritte, più un'ombra morbida su nome e prezzo; taglio regolabile per pietra (`crops.json`) così il testo sta sulla parte più calma. Contrasto misurato per card a 1440 e 390: nome ≥5,15:1, prezzo ≥5,99:1, pill ≥11:1. L'ottava card resta l'**Occhio di tigre**. Nota: l'ossidiana del mockup è la varietà dorata (golden sheen), non quella nera lucida.

**Layout.**
| Larghezza | Disposizione | Misura card |
|---|---|---|
| 1440 | griglia 4 colonne × 2 righe, gap 14 | 337 × 449 px |
| 1024 | griglia 4 × 2, gap 14 | 237 × 316 px |
| 768 | carosello orizzontale con `scroll-snap-type: x mandatory`, card larga 40 % (≈ 296 px), se ne vedono 2,5 | 296 × 395 px |
| 390 | carosello, card larga 72 % (≈ 260 px), se ne vede 1,35, `scroll-padding-inline: 14px` | 260 × 347 px |
Sopra restano le pill filtro (Tutte, Protezione, Amore, Abbondanza, Meditazione), che filtrano davvero; sotto, una sola volta, il disclaimer della tradizione.

**Fronte (dall'alto in basso).**
1. Foto: `object-fit: cover`, `object-position: 50% 45%`, raggio `--r` (18 px), riempie tutta la card.
2. Sfumatura in basso: `linear-gradient(180deg, rgba(13,12,11,0) 38%, rgba(13,12,11,.55) 62%, rgba(13,12,11,.92) 100%)`, più un velo caldo uniforme `rgba(32,30,27,.12)` così i fondi tinta (rosa, lilla, blu) non stonano con il tema scuro.
3. Nome in Baskervville `clamp(24px,2.2vw,32px)`, `--ivory`, a 20 px dal bordo sinistro.
4. «da X €» in Figtree 14 px `--ivory2` (prezzo minimo vero della pietra: Quarzo rosa 6,00 · Ametista 6,00 · Ossidiana 4,00 · Tormalina nera 7,50 · Lapislazzuli 5,50 · Pirite 9,50 · Cristallo di rocca 4,50 · Occhio di tigre 4,50).
5. **Pill «Scopri il significato»** con l'icona `360` a sinistra (18 px): altezza 40 px, padding `0 16px 0 12px`, fondo `rgba(20,19,18,.55)`, bordo 1 px `rgba(238,231,219,.28)`, testo Figtree 13/600 `--ivory`. È l'affordance esplicita del clic.
6. Bordo card 1 px `--line`.

**Retro.**
- La stessa foto, `opacity: .2`, sotto un velo `rgba(20,19,18,.78)` e una sfumatura `radial-gradient(120% 90% at 50% 30%, rgba(201,169,110,.10), transparent 60%)`.
- «Nella tradizione» Figtree 12 px `--gold`; nome in Baskervville 28 px; significato (testi di COMMON) Figtree 15/1.5 `--ivory`; tre link-pill a contorno piccoli «Bracciali · Ciondoli · Pietre» verso prodotti veri della pietra.
- In basso la stessa pill del fronte, che ora dice «Torna alla foto» (icona `360`).

**Stati e interazione.**
- Hover (solo puntatore, `@media (hover:hover)`): card `translateY(-4px)` in 280 ms `--ease`; foto `scale(1.04)` in 600 ms `--ease`; ombra `0 18px 40px rgba(0,0,0,.45)` che compare in `opacity` da uno pseudo-elemento; la pill passa al fondo oro (strato oro sovrapposto in `opacity`, 160 ms) con testo `#211b11`.
- Clic o Invio/Spazio: **flip** `rotateY(180deg)` in **400 ms** `--ease`, `perspective: 1200px` sul contenitore, `backface-visibility: hidden` sulle facce. Il testo della pill cambia a metà rotazione (200 ms).
- Una sola card girata alla volta: aprirne un'altra chiude quella aperta.
- Esc su una card girata la rigira.
- Accessibilità: un solo `<button class="stone__toggle" aria-expanded="false|true" aria-controls="retro-…">` per card (pattern Disclosure; `aria-controls` punta all'`id` della faccia retro), posizionato fuori dall'elemento che ruota (resta fermo mentre la card gira). Il clic sulla foto del fronte inoltra al pulsante (nessuna seconda fermata di Tab). Le facce non visibili hanno `inert`. Focus visibile: outline 2 px `--gold`, offset 4 px, sulla pill. `alt` della foto: il nome della pietra («Quarzo rosa grezzo»).
- `?state=flip` = Quarzo rosa girata.

**Reduced motion.** Niente flip né sollevamento: le facce si scambiano in dissolvenza 200 ms; la foto non si ingrandisce.

**Criteri di accettazione.**
- [ ] A 1440 si vedono 8 card rettangolari 3:4 uguali, ognuna con una foto vera (niente sagome disegnate).
- [ ] Su ogni card si leggono nome, «da X €» e la pill «Scopri il significato» con l'icona di rotazione.
- [ ] Nello stato `flip` il retro della card Quarzo rosa mostra la foto rosa attenuata sotto il testo, il significato, tre link e la pill «Torna alla foto».
- [ ] A 390 il carosello mostra una card intera e l'inizio della seconda, senza scroll orizzontale della pagina.
- [ ] Nessuna foto sgranata: tutte le fonti sono ≥ 2× la misura mostrata (§15.1).

---

## 4. Trova un regalo (punto 5): stesso design, titolo dal Copywriter

> **ANNULLATA (§0.A.2):** la sezione non c'è più in home. Al suo posto c'è la fascia «Regali piccoli, *sotto 30 €*».

**Cosa cambia.** Solo il titolo. Struttura, pill (budget e intenzione), 4 prodotti veri e dissolvenza sfalsata restano come in v4.11b (`shots/idee/05-regalo.png`).

**Segnaposto.** Al posto di «Un *regalo* in due scelte» va un `<h2>` con il testo **«[Titolo in arrivo dal Copywriter]»**, in Baskervville alla misura degli altri `h2`, colore `--mute`, con contorno tratteggiato 1 px `--gold` e raggio 8 px, e l'attributo `data-copy="regalo-titolo"`. È l'unico segnaposto visibile ammesso nel giro, ed è voluto: Michael deve vedere che il titolo manca.

**Tre direzioni per il Copywriter** (sono indicazioni, non testi):
1. **Dal budget**: il titolo parte dalla cifra, cioè da quello che chi regala si chiede per primo.
2. **Dalla persona**: il titolo parla di chi riceve il regalo, non del prodotto.
3. **Dal banco**: il titolo suona come il consiglio che Simona darebbe in negozio a chi entra per un regalo.
Vincoli: corto (≤ 6 parole), una sola parola in corsivo oro, niente «perfetto», niente punti esclamativi, niente claim.

**Criteri di accettazione.**
- [ ] Il titolo mostra il segnaposto tratteggiato, tutto il resto è identico a v4.11b.

---

## 5. Completa il rituale (punto 4)

> **Aggiornata (§0.A.1, §0.A.3, §0.A.8):**
> - titolo a sinistra e pill `.bz-pills` su una riga a scorrimento (non più centrate e a capo);
> - fondo per set con dissolvenza;
> - riga di sconto del 10% solo con Bundles attivo;
> - set legati agli handle, prezzi live, aggiunta multipla con `/cart/add.js`.
>
> Righe, spunte, totale, barra spedizione e immagini valgono come sotto.

**Cosa cambia.**
1. Le pill dei 6 set (Serenità, Coraggio, Protezione, Affetti, Concentrazione, Sera) sono **centrate e vanno a capo**, **senza frecce**.
2. Via la scritta «ce l'ho già»: ogni riga ha **solo una spunta**. Spuntato vuol dire «nel set»; togliere la spunta toglie il pezzo dal totale.
3. A destra, al posto della foto prodotto sgranata con la banda crema sotto, una **natura morta simbolica dedicata a ogni set**, nello stile BZ.

**Layout.**
| Larghezza | Disposizione |
|---|---|
| 1440 | card di sezione a tutta larghezza; sopra, titolo e pill centrate su una riga; sotto, due colonne `minmax(0,.9fr) minmax(0,1.1fr)`: a sinistra lista + totale + barra spedizione + pulsante, a destra l'immagine **alta quanto la colonna sinistra** (`align-items: stretch`), raggio `--r` |
| 1024 | come 1440, colonne 1fr 1fr |
| 768 | colonna unica: pill (1 riga), immagine 16:10 (740 × 462), lista |
| 390 | colonna unica: pill **su 2 righe al massimo**, immagine 4:3 (362 × 272), lista, totale, pulsante a tutta larghezza |

**Pill.** `display:flex; flex-wrap:wrap; justify-content:center; gap:8px`. Altezza 40 px (area di tocco 44 px con margine trasparente), padding `0 16px`, Figtree 13/500. A 390 i sei nomi stanno su due righe (Serenità, Coraggio, Protezione / Affetti, Concentrazione, Sera). **Regola di sicurezza**: se le pill superassero 2 righe (per esempio con un set in più), il contenitore passa a una riga sola con scroll orizzontale (`overflow-x:auto`, `scroll-snap-type:x proximity`) e dissolvenza ai bordi `mask-image: linear-gradient(90deg, transparent 0, #000 24px, #000 calc(100% - 24px), transparent 100%)`. Mai frecce. Pill attiva: fondo `--ivory`, testo `#17140f`; inattive: contorno `--line2`.

**Righe prodotto.** `[spunta 24 px] [miniatura 56 px, raggio 10] [titolo esatto + prezzo]`. Tutta la riga è l'etichetta della casella (si tocca ovunque).
- Spunta: `<input type="checkbox">` vero, nascosto visivamente, con la casella disegnata 24 × 24 px, raggio 7 px.
- Spuntata (default): fondo oro (gradiente pill), icona `check` 18 px in `#211b11`.
- Non spuntata: bordo 1,5 px `rgba(238,231,219,.32)`, vuota; il contenuto della riga va a `opacity:.5`, il prezzo barrato.
- `aria-label` della casella: «Includi nel set: {titolo}». Focus: outline 2 px `--gold` sulla casella.
- Totale: «N pezzi scelti» + importo in Baskervville 40 px; quando cambia, l'importo esce in 120 ms (`opacity`, `translateY(-4px)`) ed entra in 180 ms. Barra spedizione: `scaleX` in 400 ms `--ease`, testo «Ti mancano X € per la spedizione gratuita» / «Spedizione gratuita». Con 0 pezzi il pulsante va a `opacity:.45` con `aria-disabled="true"`.
- Cambio set: righe e immagine in dissolvenza 240 ms; l'immagine entrante sopra l'uscente.

**Immagine a destra.** A tutto campo nella sua cella (`object-fit: cover`), niente banda crema. Titolo del set sopra la foto in basso a sinistra («Il set *Affetti*», Baskervville 40 px, corsivo oro) e una riga in Figtree 14 px, su sfumatura `linear-gradient(180deg, transparent 50%, rgba(13,12,11,.88) 100%)`.

**Soggetti proposti** (una natura morta per set; stile BZ: luce di candela calda, legno scuro, fondo scuro, niente testo né marchi; formato sorgente **2400 × 2000 px**, soggetto centrato con margine di sicurezza del 15 % per i ritagli 16:10 e 4:3):
| Set | Soggetto | Oggetto reale in catalogo? |
|---|---|---|
| Protezione | Buddha seduto in pietra scura, una tormalina nera grezza e un'ossidiana ai piedi, un lumino acceso | Sì: «Statua Buddha, grigio e nero» (19,90 €, foto 1600 px) + «Tormalina nera grezza, circa 3/5 cm» + «Ossidiana nera grezza, 5/8 cm» |
| Serenità | Loto in conchiglia Capiz acceso, ametiste burattate, fumo d'incenso | Sì: «Loto illuminazione d'atmosfera in conchiglia Capiz, giallo» (17,90 €) + «Ametista burattata, circa 3 cm» |
| Coraggio | Corniole burattate in primo piano, bracciale in occhio di tigre appoggiato sciolto, un occhio di tigre grezzo, una candela, filo d'incenso. **Niente leone né statuette** (leone bocciato da Michael il 17/11) | Sì, tutto in catalogo: «Corniola burattata, 2/4 cm» (4,00 €) + «Bracciale elastico in occhio di tigre, 8 mm» (13,90 €) + «Occhio di Tigre grezzo, circa 3 cm» (4,50 €) + «Incenso Stamford premium, sangue di drago» (3,00 €) |
| Affetti | Cherubino seduto con rose, quarzo rosa grezzo, petali | Sì: «Cherubino seduto con rose rosa, statuetta in resina» (6,90 €, foto 2048 px) + «Quarzo rosa grezzo, 3/5 cm» |
| Concentrazione | Piatto in selenite «Fiore della Vita» con lapislazzuli grezzo e una punta di cristallo di rocca, una sola candela | Sì: «Piatto di ricarica in selenite, 10 cm, Fiore della Vita» (17,90 €) + «Lapislazzuli grezzo, 3/4 cm» + «Ciondolo in Cristallo di Rocca grezzo» |
| Sera | Lampada di sale accesa, lumini, ametista, filo di fumo | Sì: «Lampada di sale, Om» (49,90 €) + «5 Lumini, fasi lunari» (6,90 €) |

**Esito della verifica sul catalogo.** Gli oggetti ci sono quasi tutti, ma **nessuna foto del catalogo è utilizzabile così com'è**: sono foto prodotto con fondi chiari, piante e luce diurna, non nature morte BZ; a 1440 la cella è circa 710 × 560 px, quindi a 2× servono 1420 × 1120 px. Come risoluzione basterebbero solo i tre Buddha da 1600 px e il cherubino da 2048 px, ma hanno lo stile sbagliato. Per questo le 6 nature morte sono state **generate il 17/11** partendo dalla foto vera del bancone del negozio (`foto-mamma/finali/ventaglio-3-selenite.jpg`: laminato nero venato, runner rosso e oro) e dalle foto dei prodotti veri (così l'oggetto ritratto è quello che si compra). File: `mockup-v411c/img/rituale-{protezione,serenita,coraggio,affetti,concentrazione,sera}.jpg`, 2400 × 1800 px (generate a 1152 × 864 e ingrandite con Real-ESRGAN; sopra i 1420 × 1120 che servono a 2×, sotto i 2400 × 2000 previsti). Riferimenti, prompt e difetti residui in `img/rituale-README.md`, foglio di confronto `img/rituale-foglio.jpg`. Vanno sostituite con foto scattate in negozio quando arrivano. Coraggio è stata rifatta il 17/11 senza il leone, con la corniola (la versione scartata è in `img/rituale-coraggio-leone-scartato.jpg`).

`?state=ritual` = set Affetti con una riga senza spunta.

**Criteri di accettazione.**
- [ ] Pill centrate, nessuna freccia, a 1440 e a 390 (a 390 al massimo 2 righe).
- [ ] Nessuna scritta «ce l'ho già»; ogni riga ha una casella; nello stato `ritual` una riga è attenuata con il prezzo barrato e il totale è la somma delle sole righe spuntate.
- [ ] L'immagine a destra riempie la cella fino al bordo, ha il titolo del set sopra e non ha bande crema.
- [ ] Ogni set mostra un'immagine diversa; nessuna è sgranata a 1440 (fonte ≥ 1420 px di larghezza).

---

## 6. FAQ (punto 7): titolo «Domande frequenti»

> **SUPERATA nella struttura (§0.C):** pannello avorio, tab + accordion per 10-14 domande, copy da `copy/faq-r4.md`. Le tab «Ritiro e negozio» non ci sono più. Il titolo resta questo.

**Cosa cambia.** Il titolo dell'idea 7 diventa «Domande *frequenti*» (corsivo oro su «frequenti», come in v4.10). Struttura (pill Ritiro e negozio / Spedizione / Le pietre, due colonne su desktop, `<details>` su mobile) e risposte invariate.

**Criteri di accettazione.**
- [ ] Il titolo dice esattamente «Domande frequenti», con «frequenti» in corsivo oro.

---

## 7. Newsletter (punto 8): si torna alla sezione v4.10, senza SVG

> **Aggiornata:** titolo «Una lettera *al mese*» (come in `home.html`). La card è larga come le altre sezioni ed è attaccata alla striscia servizi.

**Cosa cambia.** Via il biglietto avorio con i bordi dentellati, il timbro SVG della pietra e la fiammella. Si rimette la sezione newsletter della v4.10, che funzionava.

**File da riusare (esatti).**
- Markup: `/workspace/repos/bz-v410-vanilla/sections/bz-newsletter.liquid` (sezione `bz-news`, impostazioni nello schema). Versione già renderizzata, da copiare nel mockup statico: `/home/box/shared/benessere-zen/mockup-v411b/ref/home-v410.html`, righe **2182-2195**.
- CSS: `/workspace/repos/bz-v410-vanilla/assets/bz-bottom.css`, righe **227-298** (`.bz-news`, `.bz-news__card`, `h2`, `em`, `form`, `input`, `button`, `small`) e le regole dentro `@media (max-width:860px)` alle righe **423-452** (card a una colonna, padding 26/20). Repo al commit `866e9cf` (17/11/2026 07:43, ora di Roma).

**Aspetto (dal CSS v4.10).** Card raggio 28 px, `linear-gradient(140deg,#e3cb95,#b8955a)`, testo `#17130d`, due colonne `1fr 1fr` (titolo | form) a 1024 e 1440, una colonna sotto 860 px (quindi a 768 e 390). Form a pillola `#fffaf0` con email e pulsante scuro `#17130d` «Iscriviti», nota piccola sotto.

**Copy.** Il titolo v4.10 «Pietre nuove, *prima degli scaffali*» è vietato dalle regole di copy («Nuovi arrivi dal negozio»): in v4.11c si usa provvisoriamente «Nuovi arrivi *dal negozio*» (frase già approvata in COMMON) e il titolo definitivo lo dà il Copywriter (§16). Dopo l'invio: il form lascia il posto, in dissolvenza 240 ms, alla frase già approvata «Fatto. Ci sentiamo il mese prossimo.». Niente fiammella, niente SVG. `?state=news` = stato confermato.

**Criteri di accettazione.**
- [ ] Card oro a gradiente, a due colonne a 1440, a una colonna a 390, identica per misure a `ref/home-v410-1440.png`.
- [ ] Nessun SVG, timbro o bordo dentellato nella sezione (controllo nel DOM: zero `<svg>` dentro `.bz-news`).

---

## 8. Dosha (punti 16 e 17): sfere di luce e triangolo fatti bene

> **Da decidere prima del lancio (§0.D.2):** quale delle due varianti va nel tema.

Le due varianti restano una sotto l'altra con le etichette 16 e 17. Si rifà il disegno, non l'idea.

### 8.0 Palette dosha (una famiglia di colore per dosha)
| Dosha | Nucleo | Medio | Profondo | Accento etichetta |
|---|---|---|---|---|
| Vata (aria, spazio): viola-blu freddo | `#dfe4ff` | `#8c9cf0` | `#4a4fa8` | `#b8c2ff` |
| Pitta (fuoco, acqua): zafferano-brace | `#ffe2a8` | `#f08a3c` | `#9c3418` | `#ffc27a` |
| Kapha (terra, acqua): verde-teal profondo | `#c9f0dd` | `#3fa58c` | `#135e57` | `#8fd9c0` |
Fondo comune della sezione «Tre energie» (palco notturno, non marrone): `radial-gradient(120% 90% at 50% 40%, #1d1a26 0%, #121117 60%, #0d0c10 100%)`, raggio `--rl`, bordo 1 px `--line`.

**Grana.** Una texture di rumore PNG 160 × 160 px (`mockup-v411c/assets/grain-160.png`, generata con uno script, grigio neutro), sopra il palco con `opacity:.06; mix-blend-mode:overlay; pointer-events:none`. Niente SVG.

### 8.1 Idea 16 · Dosha a sfere
**Cosa cambia.** Via i cerchi SVG con il contorno. Ogni dosha diventa una **sfera di luce stratificata** fatta in CSS, e le sfere si fondono dove si sovrappongono.

**Costruzione di ogni sfera** (un `<button>` rotondo):
1. Corpo: `radial-gradient(circle at 38% 34%, NUCLEO 0%, MEDIO 34%, PROFONDO 58%, rgba(PROFONDO,0) 71%)`: il bordo sfuma, non c'è nessuna linea.
2. Riflesso (`::after`): `radial-gradient(circle at 30% 26%, rgba(255,250,240,.28), transparent 22%)`.
3. Alone (`::before`, `inset:-18%`): `radial-gradient(circle, rgba(MEDIO,.55), transparent 65%)`, `opacity:0` di base.
4. Sul palco `isolation:isolate`; le sfere `mix-blend-mode:screen`, così negli incroci il colore schiarisce come la luce (Pitta + Kapha danno un verde-oro caldo, dove sta la parola «acqua»).

**Geometria** (palco quadrato S): diametro sfera 0,58 S; centri Vata (50 %, 33 %), Pitta (33 %, 62 %), Kapha (67 %, 62 %). S = 520 px a 1440, 420 a 1024, 440 a 768 (centrato), 340 a 390.

**Etichette (rivisto 17/11, approvato da Michael: scritte in orbita).** Ogni dosha ha la sua scritta su un arco SVG (`<svg class="venn-orbit" aria-hidden="true">` con `<textPath>`) concentrico alla sua sfera, appena fuori dal bordo della sfera selezionata (scala 1,04) più 6–8 px. Raggio e distanza sono uguali per tutte e tre. Direzioni: Vata 270°, Pitta 125°, Kapha 55° (`const DIR`), con Pitta e Kapha speculari e il testo in basso leggibile da sinistra a destra. L'SVG viene ricostruito in px sulla misura del palco con `ResizeObserver`, e di nuovo dopo `document.fonts.ready`. Riga: nome in Baskervville corsivo (22 px a 1440, 17 px a 390), « · », elementi in Figtree 500 maiuscolo 11 px (10,5 sotto i 400 px), tracking .14em. «acqua» sta su un piccolo arco sotto l'incrocio Pitta-Kapha, sull'asse di simmetria. **Colore = dosha, luminoso ma non pacchiano** (niente glow né ombre): Vata `#aab4f6`, Pitta `#f4a46a`, Kapha `#6dd2b6`, acqua `#8ccbe6`. Le non selezionate sono all'82%, la selezionata al colore pieno con un filo d'arco del suo colore al 40% (0,75 px) tra sfera e testo. Al cambio di selezione la scritta ruota di 8° attorno alla sua sfera in 400 ms, una volta sola (con reduced-motion cambia solo il colore). «acqua» diventa piena con Pitta o Kapha. Contrasto minimo misurato: 5,68:1, a 390, 768, 1024 e 1440 in tutti gli stati. Sotto i 600 px il palco ha `margin-top:12px`.

**Stati.**
- Selezionata: `transform: scale(1.04)`, alone `opacity:.9`, colore della scritta come da «Etichette» sopra. Le altre a `opacity:.38`. Transizioni 240 ms `--ease`.
- Hover (puntatore) su una non selezionata: `opacity .38 → .7`.
- Respiro quando la sezione entra in vista per la prima volta: un solo ciclo `scale 1 → 1.015 → 1` di 2,4 s `ease-in-out` per sfera, sfasato di 0,8 s tra le sfere (Vata 0 s, Pitta 0,8 s, Kapha 1,6 s), quindi **tutto fermo entro 4 s**. Non riparte (decisione di Michael 17/11, §0.2).
- Clic nelle zone sovrapposte: vince la sfera con il centro più vicino al punto toccato (calcolo sul palco), così non ci sono clic ambigui.
- Accessibilità: tre `<button aria-pressed>` in ordine Vata, Pitta, Kapha; outline 2 px `--gold` che segue il cerchio (`border-radius:50%`). Il pannello a destra (nome, frase, 3 prodotti veri) cambia in dissolvenza 240 ms ed è `aria-live="polite"`.
- Reduced motion: niente respiro, niente scale; cambiano solo le opacità.

**Layout.** 1440: palco a sinistra (46 %), pannello a destra con 3 prodotti in fila. 1024: 44/56. 768: palco sopra, centrato, pannello sotto con 3 prodotti in fila. 390: palco 340 px, sotto il pannello, prodotti in carosello (2,2 visibili). «Non è una diagnosi» una sola volta nella sezione. `?state=dosha` = Pitta.

### 8.2 Idea 17 · Dosha a triangolo
**Cosa cambia.** Via il triangolo marrone a linee e il punto piccolo. Il triangolo diventa un **campo di colore** che va da un dosha all'altro, con una **maniglia vera** da trascinare.

**Costruzione.**
- Triangolo equilatero, vertici Vata in alto (50 %, 6 %), Pitta in basso a sinistra (6 %, 88 %), Kapha in basso a destra (94 %, 88 %). Larghezza 520 px a 1440, 420 a 1024, 440 a 768, 320 a 390.
- Riempimento (elemento con `clip-path: polygon(...)`): tre `radial-gradient` ai vertici con il colore MEDIO di ogni dosha a `.85` che sfuma a trasparente al 62 %, sopra `#15131a`, in `mix-blend-mode:screen`; grana come §8.0.
- Bordo: un secondo poligono 1 px più grande dietro, `rgba(238,231,219,.2)`. Al centro un punto «equilibrio» 6 px `rgba(238,231,219,.4)`.
- Ai vertici, fuori dal triangolo, le **etichette-pill** (Baskervville 18 px + elementi in Figtree 12 px), toccabili: portano la maniglia sul vertice.

**Maniglia.** `<button>` con **area di tocco 44 × 44 px** (trasparente) e disco visibile 22 px: `radial-gradient(circle at 35% 30%, #fff3d6, #e3cb95 45%, #b08a4a 100%)`, anello `0 0 0 2px rgba(20,19,18,.9), 0 0 0 3px rgba(238,231,219,.7)`, ombra `0 6px 18px rgba(0,0,0,.5)` statica. Alone dorato in `::before` a `opacity:.35`, che sale a `.6` con `scale(1.25)` mentre si trascina. Cursore `grab` / `grabbing`; `touch-action:none` sul triangolo.

**Interazione.**
- Trascinamento con pointer events e `setPointerCapture`; la maniglia resta dentro il triangolo (se esce, si proietta sul lato più vicino).
- Toccare un punto del triangolo sposta lì la maniglia (`transform` in 240 ms `--ease`).
- **Snap al rilascio**: se un dosha supera il 90 %, la maniglia scatta sul vertice; se i tre valori sono tutti entro ±5 % da 33 %, scatta al centro. Scatto in 200 ms `--ease`.
- **Legenda**: sotto il triangolo tre barre (alte 4 px, raggio 2, binario `rgba(238,231,219,.1)`, riempimento nel colore MEDIO con `transform: scaleX()`), con le percentuali in cifre tabellari. Nel pannello a destra «Oggi prevale *Kapha*», la frase e i 3 prodotti seguono il dosha prevalente (dissolvenza 240 ms).
- Tastiera: frecce = passi del 4 % del lato, Maiusc + freccia = 12 %, Home = centro, tasti 1, 2, 3 = vertici. La maniglia ha `aria-label="Oggi mi sento più…"` e `aria-describedby` verso una riga nascosta `aria-live="polite"`: «Vata 20 %, Pitta 30 %, Kapha 50 %».
- Reduced motion: niente transizioni di posizione e niente alone che cresce; la maniglia segue il dito senza ritardi.
- `?state=tri` = maniglia vicino a Kapha (Kapha ≈ 80 %).

**Criteri di accettazione (16 e 17).**
- [ ] Nessun cerchio o triangolo a solo contorno: si vedono sfere piene e sfumate, con l'incrocio più chiaro, su un fondo notturno (non marrone).
- [ ] Ogni dosha ha la sua famiglia di colore riconoscibile (viola-blu, zafferano, verde-teal), uguale nelle due varianti.
- [ ] Nello stato `dosha` la sfera Pitta è più grande e luminosa con l'alone, le altre attenuate.
- [ ] Nello stato `tri` la maniglia dorata con l'anello è vicino al vertice Kapha e le barre dicono circa 80 % Kapha.
- [ ] A 390 il triangolo è largo 320 px e la maniglia ha un'area di tocco di 44 px (si verifica nel DOM).

---

## 9. Ayurveda: basta marrone, tinte diverse per sezione

**Problema** (`shots/ayurveda-1440.png`): tutte le card sono marrone caldo, e nelle card testo + immagine il marrone del fondo urta il grigio-bianco dei fondi foto.

**Soluzione.** Ogni sezione ha la sua tinta, scelta sui colori dominanti delle sue immagini, e le immagini non hanno più cornici o colonne di un terzo colore.

| Sezione | Tinta (`--tint`, gradiente della card) | Colore di raccordo foto (`--tint-end`) |
|---|---|---|
| Hero «Cos'è l'Ayurveda» (curcuma e coccio) | zafferano-argilla `linear-gradient(110deg,#1a1410 0%,#2b1d12 55%,#3a2413 100%)` | `#2b1d12` |
| «Da dove arriva» | inchiostro-indaco `linear-gradient(135deg,#15171f 0%,#1b1f2c 55%,#232338 100%)` | `#1b1f2c` |
| «I più scelti» | nessuna tinta: `--bg`, card prodotto standard del sito | — |
| «Tre energie» (16/17) | palco notturno (§8.0) | — |
| «Simona consiglia» | rosa-sangue di bue `linear-gradient(120deg,#2a161b 0%,#22161a 50%,#1a1416 100%)` | `#22161a` |
Il viola resta accento (`regole-design.md` §4): le tinte «indaco» e «notturno» sono scure e poco sature, quasi neutre.

**Come si trattano le immagini.**
- **Foto d'atmosfera nelle card divise** (hero): foto a tutto campo nella sua metà; la sfumatura di raccordo sul lato del testo (`.split-photo:after`) usa **lo stesso `--tint-end` della card**, quindi non si vede la giunta.
- **Foto prodotto dentro le card** («Da dove arriva», «Simona consiglia»): la foto riempie tutta la parte alta della card prodotto, 1:1, fino ai bordi (niente cornice interna, niente fondo crema o grigio attorno); il corpo della card sotto è `rgba(13,12,11,.4)` sopra la tinta di sezione, bordo 1 px `--line`.
- **«Simona consiglia»**: si toglie la colonna destra grigia (`#2a2724`). La card prodotto sta direttamente sul gradiente della sezione, allineata a destra, alta quanto il blocco di testo.

**Criteri di accettazione.**
- [ ] Su `ayurveda-1440` almeno tre sezioni hanno tinte chiaramente diverse (zafferano, indaco, notturno, rosa-bue); nessuna sezione ha la tinta marrone `#30271d` di v4.11b.
- [ ] Nessuna card mostra una foto con un fondo grigio o crema dentro una cornice di colore diverso.
- [ ] In «Simona consiglia» non c'è più la colonna grigia a destra.

---

## 10. Chi siamo: stessa cura dei colori, «Passa quando vuoi» con gli orari

Base: `mockup-v411/chi-siamo.html` (la pagina non era nel giro v4.11b).

**Tinte di sezione** (stesso metodo del §9):
| Sezione | Tinta | Raccordo |
|---|---|---|
| Hero «Benessere Zen, a *Cento*» (portici al crepuscolo) | blu-crepuscolo `linear-gradient(110deg,#141519 0%,#1a1c24 55%,#22202a 100%)` | `#1a1c24` |
| «La *storia*» (chiave, loto con candela) | brace-bue `linear-gradient(120deg,#24161a 0%,#2b1a17 60%,#1d1513 100%)` | `#2b1a17` |
| «Le pietre e il *resto*» (ardesia, chakra, mala) | ardesia-grafite `linear-gradient(120deg,#1a1b1f 0%,#1f1e26 55%,#17161b 100%)` | `#1f1e26` |
| «Piante e *materie*» (erbe, calendula) | oliva profondo `linear-gradient(120deg,#161b15 0%,#1c2419 55%,#141712 100%)` | `#1c2419` |
| «In concreto» (3 card) | card standard `--card` con gradiente caldo | — |
| «Passa quando vuoi» | neutro `linear-gradient(135deg,#1b1917,#201e1b)` | — |

**«Passa quando vuoi» (idea 23, sostituisce la card attuale).** Via il pulsante «Vedi i gioielli» (non c'entra). Al suo posto il **grafico settimanale degli orari** della pagina Contatti (idea 19), riusato tale e quale: markup `.week-chart` / `.week-days` / `.chart-plot` / `.chart-gridline` / `.chart-clock` / `.chart-caption` e riga testuale `#hours-text` da `mockup-v411b/contatti.html`, orari da `window.bzHours` in `mockup-v411b/assets/bz-ideas.js`, stesso `?now=`.
- 1440 e 1024: due colonne 5/7. A sinistra titolo «Passa quando *vuoi*», una riga di testo (Copywriter), indirizzo, telefono, badge «Aperto ora» (§11, variante completa) e pill oro «Indicazioni» (icona `directions`, link a Google Maps). A destra il grafico, alto quanto la colonna sinistra.
- 768 e 390: colonna unica, testo poi grafico a tutta larghezza (come in Contatti a 390).
- Barre che salgono una volta all'ingresso (`scaleY` da 0, origine in basso, 500 ms `--ease`, sfalsate di 40 ms); reduced motion: ferme.

**Copy da correggere (al Copywriter, §16).** «Faccio l'estetista da oltre trent'anni» è falso: per oltre trent'anni Simona ha fatto massaggi e Reiki (al passato); oggi in negozio consiglia su dosha e chakra. Anche la card «Il pezzo in *foto*» («quello che vedi è quello che parte») viola le regole sulle foto. E «Siamo all'inizio di questo percorso» va rivista.

**Criteri di accettazione.**
- [ ] Le quattro card divise hanno quattro tinte diverse, ognuna intonata alla sua foto, senza giunta visibile tra foto e fondo.
- [ ] «Passa quando vuoi» non ha pulsanti verso i gioielli e mostra il grafico settimanale con oggi in oro e la linea dell'ora.
- [ ] Nessuna frase dice che Simona fa l'estetista.

---

## 11. Badge (punto 20) «Aperto ora»: una pill curata, senza SVG

> **Aggiornata (§0.A.12):** dal 1/12 il negozio è aperto tutti i giorni. La riga «Domenica» della tabella stati e la frase «Per ora la domenica è chiuso» sono SUPERATE: il badge calcola lo stato dalla tabella unica, e in nessun testo compare «Domenica chiuso».

**Cosa cambia.** Il badge diventa una pill di stato raffinata, uguale ovunque compaia (Contatti, Il negozio, Cura di sé, Home «Anche dal vivo», Menu C, Chi siamo). Niente SVG: il punto è uno `<span>` in CSS.

**Anatomia (variante completa, Contatti, Il negozio e Chi siamo, da 768 in su):** `[punto] Aperto ora │ Oggi 9:30–12:30 · 16:00–19:30`
- Pill alta 34 px, padding `0 14px 0 12px`, gap 10 px, raggio 999 px.
- Fondo `linear-gradient(180deg, rgba(238,231,219,.07), rgba(238,231,219,.03))`, bordo 1 px `rgba(238,231,219,.14)`, riflesso interno `inset 0 1px 0 rgba(255,255,255,.05)`.
- Stato in Figtree 13/600 `--ivory`; separatore 1 × 14 px `rgba(238,231,219,.18)`; orari di oggi in Figtree 13/500 `--ivory2`, cifre tabellari, la fascia in corso in `--ivory` 600.
- **Variante compatta** (Home, Menu C, tutte le pagine a 390): `[punto] Aperto ora · chiude alle 19:30`.

**Stati e testi** (ora di Roma con `Intl`, aggiornamento ogni 60 s):
| Stato | Punto | Testo compatto |
|---|---|---|
| Aperto, più di 30 min alla chiusura | `#8fc79a` con pulsazione | «Aperto ora · chiude alle 12:30» |
| Aperto, chiude entro 30 min | `--goldl` `#e3cb95` con pulsazione | «Chiude alle 19:30» |
| Chiuso | `#c98a7e`, fermo | «Chiuso · riapre oggi alle 16:00» / «domani alle 9:30» / «giovedì alle 9:00» |
| Domenica | `#c98a7e`, fermo | «Chiuso · riapre lunedì alle 9:30» |

**Movimento.** Punto 8 px; la pulsazione è un `::after` dello stesso colore che va da `scale(.6)`, `opacity .55` a `scale(2.6)`, `opacity 0` in 2,4 s `--ease`, **2 volte (4,8 s) poi si ferma** con l'anello a `opacity .25` (decisione di Michael 17/11, §0.2), solo negli stati aperti. Riparte una volta solo quando lo stato cambia (es. da «Aperto» a «Chiude alle…»). Reduced motion: nessuna pulsazione, anello fermo a `opacity .25`.

**Orari da un solo punto (decisione Michael 17/11, vincolante per il build).** Per ora la domenica è chiuso, senza badge [DA CONFERMARE]. Dal 1° dicembre il negozio sarà aperto tutti i giorni e gli orari della domenica arriveranno più avanti. Per questo tutto ciò che mostra orari (badge «Aperto ora» in ogni variante, grafico settimanale, righe di testo con gli orari in footer, cart, home, Chi siamo, Il negozio, Contatti, pannello menu) legge da **un'unica tabella di orari** (nel tema: un metaobject o un setting di tema con fasce per giorno ed eventuali eccezioni per data, letto da un solo snippet). Niente orari scritti a mano nel markup. Aggiungere la domenica a dicembre deve voler dire solo inserire i dati, senza toccare layout o CSS. La tabella deve anche gestire il giorno con una sola fascia o con due.

**Interazione.** Fuori dalla pagina Contatti il badge è un link a `contatti.html#orari`: all'hover il bordo passa a `rgba(201,169,110,.45)` e la pill sale di 1 px (`translateY(-1px)`, 160 ms). In Contatti è statico.

**Criteri di accettazione.**
- [ ] Con `?now=2026-11-19T14:00` (giovedì): punto rosa fermo e «Chiuso · riapre venerdì alle 9:30» (venerdì apre alle 9:30).
- [ ] Con `?now=2026-11-18T19:10`: punto oro e «Chiude alle 19:30».
- [ ] A 1440 in Contatti si leggono stato, separatore e orari di oggi; a 390 solo la variante compatta, su una riga, senza andare a capo.
- [ ] Zero `<svg>` dentro `.open-badge`.

---

## 12. Menu: idea 11 (vetrina con foto) scelta, idea 12 (mobile) con icone vere

### 12.1 Idea 11 · Vetrina (desktop, 1024 e 1440)
**Problema** (`shots/idee/11-menu-B.png`): la foto a destra è un quadrato piccolo con fondo menta dentro una cornice crema, e non riempie la colonna.

**Correzione.**
- Pannello a tre colonne `minmax(0,.9fr) minmax(0,1.1fr) minmax(0,1fr)`; colonna foto larga al massimo 380 px.
- Card foto con **proporzione fissa 4:5**, `object-fit:cover`, la foto **riempie la card fino al bordo** (via la cornice crema), raggio `--r`. Sfumatura in basso `linear-gradient(180deg, transparent 45%, rgba(13,12,11,.85) 100%)`; sopra, nome della madre in Baskervville 30 px `--ivory`, una riga Figtree 13 px `--ivory2` (pezzi e prezzo «da»), pill a contorno «Vedi tutto →».
- Tutte le foto con la stessa proporzione e nessuna deformazione (`aspect-ratio:4/5` sul contenitore, mai `height:auto` con larghezze diverse).
- Cambio madre (hover o focus): la nuova foto entra in dissolvenza 220 ms sopra la vecchia; figlie al centro in dissolvenza 160 ms.
- Il pannello si apre con `opacity` + `translateY(8px → 0)` in 200 ms.
- A 768 e 390 non si usa (lì c'è l'idea 12).

**Foto per ogni madre** (vere, dal catalogo; misura mostrata ≈ 340 × 425 px a 1440, quindi servono ≥ 680 × 850 px):
| Madre | Foto | px | Esito |
|---|---|---|---|
| Gioielli con pietre | collezione: `collections/43782749287.jpg?v=1794843652` (bracciale ametista sul legno) | 900 × 900 | ok (taglio 720 × 900) |
| Mala tibetani | collezione: `collections/Mala_Diaspro_Rosso_108_Grani_3.jpg?v=1794843655` | 1003 × 1002 | ok |
| Pietre e cristalli | collezione: `collections/IMG_9828.jpg?v=1794843653` (burattate) | 1024 × 1024 | ok |
| Pendoli | collezione: `collections/IMG-7231.jpg?v=1794843662` | 1026 × 1024 | ok |
| Candele | collezione: `collections/FullSizeRender_78f4f7b4-….jpg?v=1794843660` | 1024 × 1024 | ok |
| Incensi e smudge | nessuna foto di collezione; proposta: «Incenso Stamford premium, legno di sandalo» `files/FDF8F001-0D5B-4A81-ACCF-60CB428F8DE4.jpg` | 2400 × 2400 | ok, da confermare a vista (fondo marmo chiaro) |
| Statuette e casa | nessuna foto di collezione; proposta: «Statua Buddha thailandese seduto sul fiore di loto» `files/placeholder-2.jpg?v=1758469345` (luce calda) | 1024 × 1024 | ok |
| Ultimi pezzi | collezione: `collections/IMG-0242.jpg?v=1794843674` | 800 × 800 | **sotto 2×** (taglio 640 × 800 = 1,88×): scegliere un altro «ultimo pezzo» ≥ 1024 px |
| Viso (Cura) | nessuna foto di collezione; proposta: «Tonico viso con Aloe Vera e bacche di Goji» `files/IMG-1297.jpg` | 2048 × 2048 | ok |
| Corpo | foto usata in home `files/IMG-9806.jpg` | 512 × 512 | **troppo piccola** (0,6×) e con «sommeil paisible» sulla confezione: sostituire |
| Capelli | `files/IMG-9518.jpg` | 2048 × 2048 | ok |
| Igiene e bagno | proposta: «Sapone elementale con pietre, Terra» `files/IMG-9307.jpg` | 2048 × 2048 | ok |
| Ayurveda | foto usata in home `files/IMG-9817.jpg` | 512 × 512 | **troppo piccola**: proposta «Sapone di Ayurvenat con 18 erbe ayurvediche BIO» `files/IMG-9525.jpg` (2048) |
| Oli e profumi | proposta: «Set oli essenziali, citrus blast» `files/IMG-2102.jpg` | 2048 × 2048 | ok |
| Tè e tisane | `files/IMG_9819.jpg` | 1024 × 1024 | ok |
(Prefisso CDN: `https://cdn.shopify.com/s/files/1/0917/9719/3042/`.) Le foto prodotto hanno fondi diversi: la sfumatura in basso le unifica. Se a vista una stona troppo con le altre, si sceglie un altro prodotto della stessa madre, sempre ≥ 1024 px.

### 12.2 Idea 12 · Menu mobile «Due porte»: icone Material Symbols (decisione di Michael, 17/11)
Struttura approvata invariata (ricerca, due porte foto, link semplici, card «Aperto ora» fissa in fondo, pannello che scorre da destra). Le icone diventano **Material Symbols Outlined, peso 300**, 22 px, `--gold` (file in `mockup-v411c/icons/`):

| Voce | Icona |
|---|---|
| Gioielli con pietre | `diamond_shine` |
| Mala tibetani | `self_improvement` |
| Pietre e cristalli | `hexagon` |
| Pendoli | `jewelry` (pendente su catenella) |
| Candele | `candle` |
| Incensi e smudge | `mist` |
| Statuette e casa | `temple_buddhist` |
| Ultimi pezzi | `hourglass_bottom` |
| Viso | `face_retouching_natural` |
| Corpo | `spa` |
| Capelli | `face_3` |
| Igiene e bagno | `soap` |
| Ayurveda | `nest_eco_leaf` |
| Oli e profumi | `fragrance` |
| Tè e tisane | `emoji_food_beverage` |
| Il negozio · Chi siamo · Contatti | `storefront` · `groups` · `call` |
| Interfaccia | ricerca `search`, indietro `arrow_back`, madre con figlie `expand_more` (ruota di 180° da aperta, 200 ms), madre senza figlie (link diretto) `north_east`, riga `chevron_right`, indirizzo `location_on`, indicazioni `directions`, chiudi `close`, apri menu `menu` |

**Criteri di accettazione (menu).**
- [ ] Nello stato `b2` la foto a destra riempie la card 4:5 fino al bordo, senza cornice crema, con nome e «Vedi tutto» sopra la sfumatura.
- [ ] Passando su ogni madre la foto cambia e ha sempre la stessa proporzione.
- [ ] Nello stato `c` ogni riga madre ha un'icona a linea sottile e uniforme (nessuna icona disegnata a mano); le madri senza figlie hanno la freccia `north_east`.

---

## 13. Pietre e rituali

> **Aggiornata (§0.A.5, §0.A.8):** CTA della hero «Vieni in negozio →». Pill di mesi, confronto e «I più scelti» in `.bz-pills` su una riga a scorrimento (non centrate e a capo). Nella pietra del mese c'è il «+» per ogni prodotto e «Aggiungi tutti →», senza sconto.

### 13.1 Via l'animazione dei pendoli
Come al §2: «I più scelti» con pill semplici «Mala» / «Pendoli», senza grani e senza pendolo.

### 13.2 «In mano, a Cento»: copy da riscrivere
Layout invariato (foto `img/pietre-in-mano-v3.jpg` a sinistra, testo a destra). **CTA aggiornata (§0.A.5): «Orari e indicazioni →»**; «Vieni in negozio →» è nella hero della pagina. Il testo lo riscrive il Copywriter (§16): al massimo 3 blocchi brevi; fatti obbligatori: stesso catalogo del banco, ritiro al pagamento pronto di solito in 4 ore, indirizzo. La formula «La foto mostra il tipo di pietra…» è stata tolta dalla pagina il 17/11 (§18.5): il Copywriter non la riprende. Gli orari stanno nel badge (§11), non in una riga di testo lunga.

### 13.3 Al posto di «Grezze e burattate»: «Confronto forme» (idea 22)
**Perché.** La sezione attuale sono due card di sole parole. La sostituisce un confronto utile: **la stessa pietra in tre forme, con foto, misura e prezzo veri**, per aiutare a scegliere.

**Layout.**
- Intestazione: titolo e una riga (Copywriter), a destra le pill delle pietre: Ametista · Quarzo rosa · Lapislazzuli · Cristallo di rocca · Ossidiana · Pirite · Occhio di tigre (centrate e a capo, come §5; a 390 al massimo 2 righe, poi scroll con dissolvenza ai bordi).
- Sotto, **3 card affiancate**: *Grezza* · *Burattata* · *Da portare* (bracciale, oppure la punta a ciondolo per il cristallo di rocca).
  - 1440: 3 colonne, card ≈ 454 px, foto 1:1 a tutto campo in alto.
  - 1024: 3 colonne (320 px).
  - 768: 3 colonne (≈ 237 px), titolo prodotto su 2 righe al massimo.
  - 390: tre righe compatte una sotto l'altra, `[foto 96 × 96] [forma, titolo, prezzo, +]`, così il confronto resta leggibile senza scorrere di lato.
- Ogni card: forma (Figtree 12 px `--gold`: «Grezza», «Burattata», «Bracciale» o «Punta»), titolo esatto del prodotto (Figtree 15 px), misura che è già nel titolo, prezzo in Baskervville 26 px, pulsante tondo oro «+» (aggiunge al carrello, come le card prodotto del sito), tutta la card è un link al prodotto. Una riga breve per forma riprende il copy già approvato: «La grezza resta com'è uscita. La burattata è levigata, da tasca.»
- ~~Sotto le card, una volta: «La foto mostra il tipo di pietra: ogni pezzo è un po' diverso per forma e venature.»~~ **Tolta il 17/11** (cliché da IA; decisione di Michael, §18.5).
- Cambio pietra: le tre card escono ed entrano in dissolvenza (240 ms, sfalsate di 40 ms). Hover card: `translateY(-2px)`, foto `scale(1.03)`.
- `?state=compare` = Lapislazzuli.

**Dati (tutti veri, catalogo del 17/11).** Link e URL immagine completi in `mockup-v411c/image-audit.csv`.
| Pietra | Grezza | Burattata | Da portare |
|---|---|---|---|
| Ametista | Ametista grezza, 3/4 cm · 6,00 € | Ametista burattata, circa 3 cm · 6,00 € | Bracciale elastico in ametista, 8 mm · 13,90 € |
| Quarzo rosa | Quarzo rosa grezzo, 3/5 cm · 6,00 € | Quarzo rosa burattato, 3/5 cm · 6,00 € | Bracciale elastico in quarzo rosa, 8 mm · 13,90 € |
| Lapislazzuli | Lapislazzuli grezzo, 3/4 cm · 5,50 € | Lapislazzuli burattato, 2/3 cm · 8,00 € | Bracciale elastico in lapislazzuli, 8 mm · 17,90 € |
| Cristallo di rocca | Cristallo di Rocca grezzo, 3/5 cm · 6,00 € | Cristallo di Rocca burattato, circa 3 cm · 4,50 € | (punta) Ciondolo in Cristallo di Rocca grezzo · 10,50 € |
| Ossidiana | Ossidiana nera grezza, 5/8 cm · 8,00 € | Ossidiana nera burattata, 2/3cm · 4,00 € | Bracciale elastico in ossidiana nera, 8 mm · 13,90 € |
| Pirite | Pirite grezza, circa 4/5 cm · 11,50 € | Pirite burattata, circa 3 cm · 9,50 € | Bracciale elastico in pirite, 8 mm · 14,90 € |
| Occhio di tigre | Occhio di Tigre grezzo, circa 3 cm · 4,50 € | Occhio di Tigre burattato, 3/5 cm · 7,00 € | Bracciale elastico in occhio di tigre, 8 mm · 13,90 € |

**Criteri di accettazione (Pietre e rituali).**
- [ ] Nessuna sezione «Grezze e burattate» di solo testo; al suo posto le 3 card con foto, titolo esatto, prezzo e «+».
- [ ] Nello stato `compare` le tre card sono del lapislazzuli e i prezzi sono 5,50 / 8,00 / 17,90 €.
- [ ] A 390 le tre forme sono tre righe compatte, senza scroll orizzontale della pagina.
- [ ] «In mano, a Cento» mostra il copy nuovo del Copywriter (o il segnaposto `[Testo in arrivo dal Copywriter]` se non è ancora arrivato).

---

## 14. Punti aperti e decisioni da far prendere a Michael

> **Storico.** I punti ancora aperti per il build sono nel §0.D.

**Già decisi da Michael il 17/11** (non più aperti): hero (§1: ferma su mobile, rotazione 5-7 s su desktop con stop definitivo al primo tocco/hover/focus, nessun tasto pausa, ferma con reduced motion); animazioni continue (§0.2: si fermano da sole entro 5 s, nessun tasto pausa); icone (§0.3: Material Symbols Outlined 300).

2. ~~**Leone per «Coraggio».**~~ **Deciso da Michael il 17/11:** niente leone. Michael l'ha bocciato dopo averlo visto: al suo posto la **corniola burattata** (proposta dal bot Benessere Zen tra i prodotti del catalogo), con bracciale e grezzo di occhio di tigre (§5, `img/rituale-coraggio.jpg`).
3. ~~**Shungite.**~~ **Deciso da Michael il 17/11:** la card Shungite è sostituita dall'Occhio di tigre (grezzo 4,50 €, foto `IMG_9345.jpg` 1024 px; §3, §15.1).
4. **Foto delle card pietra.** Sono foto vere ma fatte per il catalogo (pezzi su fondo tinta pietra), non macro. Bastano per il mockup e sono a 2×; per la build, la resa migliore viene da 8 macro dedicate su ardesia o legno scuro, 3:4, 1800 × 2400 px (§15.2).
5. **Foto di menu sotto 2×.** Corpo e Ayurveda (512 px) e Ultimi pezzi (800 px): proposti dei sostituti, da confermare a vista.
6. **Proposta (da approvare, non applicata):** la «Pietra del mese» (idea 6, approvata) usa ancora la sagoma SVG della pietra, lo stile appena bocciato nelle card. Proposta: al suo posto la foto vera della pietra del mese in una sfera di 72 px, come le sfere categoria. Finché Michael non dice sì, resta com'è.
7. **«Serve un bot di design e un copywriter agent»**: è una richiesta organizzativa, fuori da questa spec. La spec è già pensata per quel passaggio: tutto il copy nuovo passa dal Copywriter (§16).

**Decisioni del 17/11 sera (home definitiva, §18), non più aperte:** si tengono le sfere categoria sotto la hero; «Il mazzo» sostituisce le card-porta; «La ruota delle intenzioni» sostituisce «Scegli per intenzione»; niente numeri romani sulle carte; tolta la formula «La foto mostra il tipo di pietra…» dalla ruota e da Pietre e rituali; approvata la correzione di contrasto della hero (r5).

8. **Aperto.** La stessa formula resta nella FAQ della home («Ricevo la pietra della foto?») e in Chi siamo («Il pezzo in foto»). Michael non si è ancora pronunciato su queste due occorrenze.

---

## 15. Immagini

### 15.1 Verifica delle immagini (Shopify, sola lettura, 17/11)
Misura mostrata: card pietra 337 × 449 px (3:4) a 1440, quindi a 2× servono 674 × 899 px; confronto forme 454 × 454 px a 1440, a 2× 908 × 908.

| Uso | Pietra | Prodotto e foto | px originali | Fattore | Esito |
|---|---|---|---|---|---|
| Card pietra | Quarzo rosa | Quarzo rosa grezzo, 3/5 cm · `files/IMG_9340.jpg?v=1793211615` | 1024² | 2,28× | trovata |
| Card pietra | Ametista | Ametista grezza, 3/4 cm · `files/IMG_9341.jpg?v=1793211573` | 1024² | 2,28× | trovata |
| Card pietra | Ossidiana | Ossidiana nera grezza, 5/8 cm · `files/IMG_9338.jpg?v=1793211668` | 1024² | 2,28× | trovata |
| Card pietra | Tormalina nera | Tormalina nera grezza, circa 3/5 cm · `files/IMG_9664.jpg?v=1794159560` | 1024² | 2,28× | trovata |
| Card pietra | Lapislazzuli | Lapislazzuli grezzo, 3/4 cm · `files/6FC758DC-EAD9-4C8A-A70F-19BA17C57C69.png?v=1793563723` | 1254² | 2,79× | trovata |
| Card pietra | Pirite | Pirite grezza, circa 4/5 cm · `files/IMG_9832.jpg?v=1794647427` | 1024² | 2,28× | trovata |
| Card pietra | Cristallo di rocca | Cristallo di Rocca grezzo, 3/5 cm · `files/IMG_9339.jpg?v=1793211641` | 1024² | 2,28× | trovata |
| Card pietra | Occhio di tigre | Occhio di Tigre grezzo, circa 3 cm · `files/IMG_9345.jpg?v=1793211556` | 1024² | 2,28× | trovata (sostituisce la Shungite, 17/11) |
| Confronto | Ametista | Bracciale elastico in ametista, 8 mm · `files/43782749287.jpg` | 900² | 1,98× | al limite, accettabile |
| Confronto | Quarzo rosa | Bracciale elastico in quarzo rosa, 8 mm · `files/473829782.jpg` | 900² | 1,98× | al limite, accettabile |
| Confronto | Pirite | Pirite burattata, circa 3 cm · `files/FullSizeRender_d1656bc9-….jpg` | 896² | 1,97× | al limite, accettabile |
| Confronto | tutte le altre 18 foto | vedi CSV | 1008-2048 | 2,22-4,51× | trovate |
| Rituale | 6 set | nessuna natura morta in catalogo; **generate il 17/11** dalla foto del bancone + foto prodotto: `mockup-v411c/img/rituale-*.jpg` | 2400 × 1800 | 3,38× (cella 710 × 560) | generate; da sostituire con scatti in negozio |
| Menu 11 | Corpo, Ayurveda | `IMG-9806.jpg`, `IMG-9817.jpg` | 512² | 0,6× | **troppo piccole** |
| Menu 11 | Ultimi pezzi | `collections/IMG-0242.jpg` | 800² | 1,88× | **sotto 2×** |
Prefisso: `https://cdn.shopify.com/s/files/1/0917/9719/3042/`. Tabella completa con link prodotto: `mockup-v411c/image-audit.csv`.

### 15.2 Immagini necessarie
| # | Immagine | Fonte | Formato |
|---|---|---|---|
| 1 | 8 foto card pietra | Shopify (§15.1); per la build, meglio 8 macro da scattare | sorgente ≥ 1024 px; macro future 1800 × 2400 |
| 2 | 21 foto confronto forme | Shopify (CSV) | come sono |
| 3 | 6 nature morte rituale (Protezione, Serenità, Coraggio, Affetti, Concentrazione, Sera) | **generate il 17/11** (`img/rituale-*.jpg`, vedi `img/rituale-README.md`) dalla foto vera del bancone e dei prodotti del §5; poi da scattare in negozio | 2400 × 1800 (previsto 2400 × 2000), stile BZ, niente testo |
| 4 | 15 foto menu vetrina | Shopify (§12.1); 3 da sostituire | ≥ 1024 px |
| 5 | Texture grana | da generare con uno script (rumore neutro) | PNG 160 × 160 |
| 6 | Icone di interfaccia | Material Symbols Outlined 300, già in `mockup-v411c/icons/` | SVG 24 |
| 7 | Icone de «Il mazzo» | Game-icons (Lorc e Delapouite, CC BY 3.0), `assets/icons/gi-*.svg`; crediti in `assets/icons/README.md` | SVG |
| 8 | Ritagli pietra della ruota | `img/cutout/st-*.webp` (interi, ricavati di nuovo; niente pezzi spezzati) | WebP |
| — | Hero, Chi siamo, Ayurveda, Pietre e rituali | nessuna immagine nuova: restano quelle approvate; sulla hero cambia solo il velo e il contrasto (§18.4) | — |

---

## 16. Copy da chiedere al Copywriter
Tutto il copy nuovo passa dal Copywriter (skill `copywriter-umano`). Nel mockup, finché non arriva, si mette il segnaposto `[Testo in arrivo dal Copywriter]` con `data-copy="…"`.
1. **Trova un regalo**: titolo (`regalo-titolo`), nelle tre direzioni del §4.
2. **Newsletter**: titolo definitivo (`news-titolo`) al posto di «Pietre nuove, prima degli scaffali»; verificare la nota «Una mail al mese con arrivi e pezzi che tornano disponibili.».
3. **Pietre e rituali, «In mano, a Cento»**: testo da riscrivere (`in-mano`), al massimo 3 blocchi brevi, fatti del §13.2.
4. **Pietre e rituali, Confronto forme**: titolo e una riga (`confronto-titolo`, `confronto-intro`).
5. **Chi siamo, «La storia»**: riscrivere il primo paragrafo (`storia`): Simona ha fatto massaggi e Reiki per oltre trent'anni (al passato); oggi consiglia su dosha e chakra; mai «estetista».
6. **Chi siamo, «Il pezzo in foto»**: riscrivere (`in-concreto-foto`). **Nota 17/11:** la formula «La foto mostra il tipo di pietra…» è stata tolta dalla ruota e da Pietre e rituali (§18.5). Prima di riscrivere, attendere la decisione di Michael sul punto 8 del §14.
7. **Chi siamo, «Passa quando vuoi»**: la riga introduttiva (`passa-intro`) al posto di «Siamo all'inizio di questo percorso…».
8. **Completa il rituale**: una riga per set (`set-…`), coerente con la nuova immagine (oggi esistono «Il quarzo rosa, in tre forme.» e simili).
9. **Da confermare**: «Scopri il significato» / «Torna alla foto» (card pietra) e i testi del badge «Aperto ora» del §11.

---

## 17. Consegna e schermate di controllo
Pagine da produrre in `mockup-v411c/`: `home.html`, `pietre-e-rituali.html`, `ayurveda.html`, `menu.html`, `chi-siamo.html`, più `contatti.html`, `il-negozio.html` e `cura-di-se.html` solo per il nuovo badge. Schermate a 1440, 1024, 768 e 390 di ogni pagina, più gli stati: `home ?state=flip|ritual|gift|faq|news`, `ayurveda ?state=dosha|tri`, `menu ?state=b2|c`, `pietre-e-rituali ?state=compare|month`, `contatti ?now=2026-11-19T14:00` e `?now=2026-11-18T19:10`, `chi-siamo ?now=2026-11-19T14:00`. Controllo automatico: niente overflow orizzontale, nessuna immagine rotta, nessuna scritta «solo mockup», zero `<svg>` dentro `.bz-news` e `.open-badge`. Home ufficiale: `home.html` (oggi variante B «Completa il rituale», §0.A.1; prima versione calma r5, §18; copia di sicurezza in `logs/home.pre-calma.html`). Foglio riassuntivo delle 9 pagine: `foglio-v411c.png`.

---

## 18. Home definitiva (17/11): mazzo, ruota, hero

> **Aggiornata dal §0.A.1:** valgono hero (18.4), sfere (18.1), mazzo (18.2: «da X €» in Liquid, §0.A.14; carte grezze/burattate §0.D.1), formula tolta (18.5) e barra/menu (18.6). **La ruota (18.3) è ANNULLATA.**

**Quando.** Dopo l'approvazione di v4.11c, Michael ha chiesto un originale al posto delle card-porta e di «Scegli per intenzione», pensato per far cliccare, esplorare e aggiungere al carrello, senza orientarsi sulle foto di negozio. Ha scelto e approvato **«Il mazzo»** (versione definitiva r5) e **«La ruota delle intenzioni»**. Il 17/11 sera ha approvato anche la correzione di contrasto della hero. La home ufficiale è `home.html`, promossa da `home-calma.html` r5; copia di sicurezza in `logs/home.pre-calma.html`.

Questa sezione **sostituisce** le card-porta e «Scegli per intenzione» della home v4.11b/c. Le altre sezioni della home (§1–§7, card pietra, rituale, FAQ, newsletter) restano.

### 18.1 Sfere categoria (orbs)

**Decisione di Michael (17/11): si tengono.** La riga di icone tonde sotto la hero resta com'è. Il contenitore ha `id="orbs"`; `?orbs=0` le nasconde, solo per il confronto.

### 18.2 «Il mazzo» al posto delle card-porta

Due mazzi a tutta larghezza, uno sotto l'altro, in `.bz-mazzo`. Non è un titolo in pagina: i titoli visibili sono quelli dei due mondi.

| Mondo | Carte (titoli corti, nell'ordine) |
|---|---|
| Pietre e *rituali* | Gioielli, Mala, Pietre grezze, Burattate, Pendoli, Candele |
| Cura di *sé* | Corpo, Capelli, Ayurveda, Tè e tisane, Tazze, Oli e profumi |

**Intestazione di ogni mazzo.** A sinistra il titolo (Baskervville; la parola in corsivo oro). A destra, su una colonna, il sottotitolo (max 46ch) e il link «Vedi tutto →».

**Carte.** Sei carte a tarocchi, a tutta la larghezza utile: **200 px a 1440**, **150 px a 1024**, rapporto **1:1,68**, ventaglio ±2°. A 390 se ne vedono circa 2,4, con scorrimento orizzontale (niente overflow della pagina). In cima, ornamento luna·rombo·luna. Icona Game-icons al 46 % della larghezza della carta, con alone oro (Pietre e rituali) o alone salvia (Cura di sé). Cartiglio con il solo nome, Baskervville maiuscolo, tracking `.08em`, 15 px. Sotto, «da X € →» a 13 px. **Niente numeri romani.**

**Separatore.** Tra i due mazzi, una linea diagonale oro a 1,1°, con un passaggio di tono caldo/freddo (`.deck-divider`).

**Icone.** Solo libreria libera Game-icons (CC BY 3.0, Lorc e Delapouite), file in `assets/icons/gi-*.svg`, crediti in `assets/icons/README.md`. In pagina, nel footer: «Icone: Lorc e Delapouite, game-icons.net (CC BY 3.0)». È l'eccezione a §0.3: Material Symbols resta la libreria di default per menu, pill e badge.

| File | Autore | Carta |
|---|---|---|
| `gi-gem-pendant.svg` | Lorc | Gioielli |
| `gi-prayer-beads.svg` | Delapouite | Mala |
| `gi-crystal-growth.svg` | Lorc | Pietre grezze |
| `gi-stone-stack.svg` | Delapouite | Burattate |
| `gi-gem-chain.svg` | Lorc | Pendoli |
| `gi-candle-light.svg` | Lorc | Candele |
| `gi-liquid-soap.svg` | Delapouite | Corpo |
| `gi-comb.svg` | Lorc | Capelli |
| `gi-lotus.svg` | Lorc | Ayurveda |
| `gi-teapot.svg` | Lorc | Tè e tisane |
| `gi-coffee-cup.svg` | Delapouite | Tazze |
| `gi-delicate-perfume.svg` | Delapouite | Oli e profumi |
| `gi-moon.svg` | Lorc | Lune dell'ornamento |

### 18.3 «La ruota delle intenzioni» al posto di «Scegli per intenzione» — **ANNULLATA (18/11)**

> **ANNULLATA:** Michael ha scelto la variante B. Non si costruisce la ruota né niente di `#intenzioni`. Testo sotto conservato solo come storico.

Riferimento di partenza: `concept-intenzione.html`, poi unita in `home.html` (`#intenzioni`).

Un solo SVG, centro in (260, 260), anelli a r 244 e r 200. Etichette a 24 px, spaziate di 72°, diritte sugli archi (in alto in senso orario, in basso in senso antiorario). Un punto oro segna l'intenzione scelta. **Niente linea indicatrice.** Al centro, il ritaglio intero della pietra (`img/cutout/st-*.webp`, ricavati di nuovo interi, senza pezzi spezzati). **Niente** la formula «La foto mostra il tipo di pietra…».

A fianco, un set di 3 prodotti con «Aggiungi il set»: Coraggio 33,80 €, Affetti 32,40 €, Serenità 35,80 € (e gli altri set della ruota, stesso schema).

### 18.4 Hero: contrasto r5

Le scritte sulla foto del negozio non si leggevano bene. Correzione in `<style id="hero-contrast">` in `home.html`:

- foto: `filter: brightness(.78) saturate(.85)`
- velo scuro più deciso a sinistra e radiale dietro il testo
- ombra morbida sulle scritte (`text-shadow`)
- corsivo oro `#ddbf85`
- sottotitolo `#f3ede2`

Lo stesso trattamento vale per le due card a destra («Pietre da tasca» e «Regali piccoli»), soprattutto dove il fondo è chiaro. Il comportamento delle slide resta quello del §1.

### 18.5 Formula «La foto mostra il tipo di pietra…»

Tolta dalla ruota e da Pietre e rituali (era sotto «Confronto forme», §13.3), perché è un cliché da IA: **decisione di Michael (17/11)**. Resta, in attesa di una sua decisione (§14.8), nella FAQ della home («Ricevo la pietra della foto?») e nella card «Il pezzo in foto» di Chi siamo.

**Criteri di accettazione.**
- [ ] Sotto la hero ci sono le sfere categoria.
- [ ] Due mazzi da 6 carte, con intestazione (titolo a sinistra, sottotitolo 46ch e «Vedi tutto →» a destra); niente numeri romani; a 390 si vedono circa 2,4 carte, senza overflow della pagina.
- [ ] ~~La ruota ha le etichette diritte sugli archi…~~ (ANNULLATO, §18.3)
- [ ] Le scritte della hero e delle due card a destra restano leggibili sulla foto, a 1440 e a 390.
- [ ] Nel footer compare il credito «Icone: Lorc e Delapouite, game-icons.net (CC BY 3.0)».

### 18.6 Barra annunci e menu

**Decisione di Michael (17/11):** la barra annunci è di nuovo **dorata** e simmetrica; il menu è allineato sullo stesso asse.

- Barra: sfondo in sfumatura `#b8955a → #d3b57b` (più chiara al centro), testo scuro `#17140f`. Il rombo sta esattamente al centro; i due messaggi («Spedizione gratuita da 50 €» e «Ogni pezzo è anche **in negozio**») stanno a 25 px per lato dall'asse centrale. Stesso testo su tutte le pagine del mockup.
- Header, da 901 px in su: griglia `1fr auto 1fr`, così il menu sta sullo stesso asse del rombo (logo a sinistra, azioni a destra).
- A 390 i due messaggi si alternano con una dissolvenza di opacità; con `prefers-reduced-motion` l'animazione non parte.

CSS in `assets/bz-mock.css` (blocco r3).

