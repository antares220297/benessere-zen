# Mockup v4.11c, Benessere Zen: regole comuni (leggile tutte)

Cartella: `/home/box/shared/benessere-zen/mockup-v411c/` (D). Lavori SOLO sul file della tua pagina indicato nel brief. Vietato: git, PR, Shopify, cloud agent, toccare altri HTML, modificare `assets/*` (condivisi, li gestisce il coordinatore: si possono solo usare), cancellare file. Non avviare server, non installare niente. Quando hai finito ti fermi e scrivi 5 righe di riepilogo.

## Cosa sono
Terzo giro (v4.11c). Michael **ha già scelto le idee**: le pagine devono sembrare il **sito finale**, curato e realistico. **NIENTE etichette idea** (`.idea-tag`, numeri, «Idea 3», «Menu A/B/C», «Variante»): toglile tutte, anche se la SPEC §0.5 dice di tenerle (superata). Mai «Solo mockup», «demo», didascalie che spiegano l'interfaccia.

## Fonti vincolanti (in quest'ordine)
1. `SPEC.md` (spec di design v4.11c, seguila 1:1 per la tua pagina; leggi §0, §11 e §15 sempre).
2. `input/feedback-michael-2.md` (le idee non citate sono approvate così come sono in v4.11b) e `input/feedback-michael-1.md`.
3. `input/copy-v2.md` del Copywriter: testi usati **ESATTAMENTE** come scritti («Testo nuovo»; dove dice «invariato» resta il testo attuale). Dove la SPEC prevede un segnaposto «[Testo in arrivo dal Copywriter]» ma copy-v2 ha il testo, usa copy-v2 (es. titolo regalo = «Un pezzo da *regalare*», proposta 1). Ogni **[DA CONFERMARE: …]** resta **visibile** come segnaposto nel testo: `<mark class="tbc">[DA CONFERMARE: domenica chiuso]</mark>` (stile: Figtree 12px, colore `--goldl`, contorno tratteggiato 1px oro, raggio 6px, padding 1px 6px, fondo trasparente). Casi: domenica chiuso, estetista, Roberto, pietre del mese di luglio e settembre.
4. `/home/box/shared/design-library/BZ-playbook.md` (§4 movimento, §5 immagini, §7 da non fare, §8 checklist) e `input/regole-design.md`.

## Stile
- Parti dal file v4.11b già presente in D (copiato) e correggi; non riscrivere da zero ciò che è approvato.
- Header, annuncio, footer, cassetto carrello identici alle pagine approvate (`assets/bz-mock.css`, `assets/bz-mock.js`); in `<head>` anche `assets/bz-ideas.css` e `<script defer src="assets/bz-ideas.js">`.
- Token SPEC §0.1. Titoli Baskervville con parola chiave in `<em>` corsivo oro; testo Figtree. Oro su un solo elemento forte per schermata. Viola/prugna solo accento.
- Desktop a tutta larghezza, card affiancate, **mai un'immagine grande accanto a un vuoto**, niente riempitivi, niente blocchi impilati su desktop, niente foto prodotto su fondo grigio/crema dentro card marroni (la foto riempie la card fino al bordo o si usa una tinta intonata).
- CSS e JS della pagina in `<style>`/`<script>` nella pagina.

## Icone
Solo **Material Symbols Outlined 300** dai file `icons/*.svg`: copia il markup SVG **inline** (non `<img>`, non fetch), aggiungi `fill="currentColor" aria-hidden="true" width/height` (22px menu, 18px nelle pill). Mai icone disegnate a mano, mai altre librerie.

## Movimento (decisioni di Michael 17/11)
- Solo `transform`, `opacity`, `clip-path`. Durate: feedback ≤160ms, transizioni 200-300ms, **massimo 400ms** (flip, pannelli). Unica eccezione: dissolvenza hero 1,2s.
- **Hero**: ferma sulla slide 1 con `(max-width:767px), (hover:none)`; su desktop dissolvenza incrociata ogni **7s**, **stop definitivo** al primo tocco/pointerdown, hover o focus nella hero; ferma con `prefers-reduced-motion` e con `?static=1`; **nessun tasto pausa, nessun indicatore** (puntini, barre, numeri, frecce). Slide non attive `inert` + `aria-hidden`.
- Tutto ciò che si muove da solo (respiro sfere, pulsazione badge) **si ferma entro 5s** e non riparte. Niente fade-in allo scroll, niente parallax, niente scroll-jacking.
- `@media (prefers-reduced-motion:reduce)`: niente autoplay, flip 3D, pulsazioni, sollevamenti; solo dissolvenze ≤200ms o stato statico.
- Flip card: un `<button aria-expanded aria-controls="id-del-retro">` con testo + icona `360`; facce nascoste `inert`.

## Componenti condivisi (già in `assets/bz-ideas.js/.css`, non reimplementarli)
- Badge orari (SPEC §11, zero SVG): `<a class="open-badge" data-open-badge="compact" href="contatti.html#orari"></a>`; variante completa `data-open-badge="full"` (Contatti, Il negozio, Chi siamo, ≥768px; sotto 768 diventa compatta da sola). In Contatti usa `<span>` invece di `<a>`. Testo e punto li scrive il JS; supporta `?now=2026-11-19T14:00`.
- Grafico settimanale orari: `<div class="bz-week" data-week-chart></div>` (Contatti e Chi siamo): lo disegna il JS (7 colonne, oggi in oro, linea dell'ora, riga testuale accessibile con il segnaposto domenica). Tu dai solo il contenitore e la larghezza.
- Grana: `assets/grain-160.png`.

## Tecnica
- JS vanilla, niente librerie/CDN JS. Regge 390, 768, 1024, 1440 senza overflow orizzontale (caroselli con `overflow-x:auto` dentro un contenitore). `clamp()` per la tipografia, mai `vh` (usa `svh`/`dvh`).
- Accessibilità: interattivi `<button>` con `aria-pressed/expanded/selected`, tastiera, focus visibile 2px oro. Target ≥44×44px, CTA mobile ≥48px. `alt` veri. Contrasto testo ≥4,5:1 (anche su foto: sfumatura scura sotto il testo).
- `?state=NOME` apre lo stato del brief (per le schermate); `?static=1` spegne l'autoplay.

## Immagini
- Prodotti: SOLO veri da `input/products.json` (titolo e prezzo esatti, `image` + `&width=600`/`?width=600`, url). Non inventare.
- Foto vere del negozio: `img/negozio/*.jpg` (da `foto-mamma/finali`, mappa in `/home/box/shared/benessere-zen/foto-mamma/mappa-foto.md`): usale negli slot indicati dalla mappa al posto delle vecchie `img/*-v3*.jpg`. Le `img/negozio/card-pietra-*.jpg` sono piccole ingrandite: solo come sfondo in opacità (es. retro card pietra), mai a piena opacità grandi.
- Nature morte dei set: `img/rituale-{protezione,serenita,coraggio,affetti,concentrazione,sera}.jpg`.
- Dove non c'è una foto vera: restano le immagini approvate v4.11b, tranne le VIETATE `img/cura-consiglio-v3.jpg` e `img/ayurveda-simona-v3b.jpg`. Meglio una foto prodotto vera a tutto campo o una card solo testo che un'immagine dall'aspetto IA. Ogni immagine grande compare una volta sola.

## Fatti veri (oltre a copy-v2)
Benessere Zen, Via Marcello Provenzali 1, 44042 Cento (FE). Tel +39 347 088 3168. info@benesserezen.shop. Orari lun, mar, mer, ven, sab 9:30-12:30 e 16:00-19:30; gio 9:00-13:00; domenica [DA CONFERMARE]. Spedizione solo Italia, Express 5,90 €, gratuita da 50 €. Ritiro in negozio gratuito, scelto al pagamento, di solito pronto in 4 ore (mai «ti avvisiamo noi»). «La foto mostra il tipo di pietra: ogni pezzo è un po' diverso.» Simona: massaggi e Reiki **al passato**, oggi consiglia su dosha e chakra; mai «estetista». Nessun claim sulla salute; significati «nella tradizione»; disclaimer una volta per pagina: «I significati appartengono alla tradizione e non sostituiscono il parere di un medico.» Pietre e colori: tabella in `/home/box/shared/benessere-zen/mockup-v411b/briefs/COMMON.md` (Occhio di tigre sostituisce Shungite).
