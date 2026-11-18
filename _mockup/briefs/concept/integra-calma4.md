# Integrazione calma r4 — mazzo + ruota dentro home-calma.html

Modifichi SOLO `home-calma.html` (backup già fatto in logs/home-calma.r3.html). Non toccare home.html, i concept, assets/ condivisi, né altre pagine.

## 1. Sostituzioni
- **Porte → «Il mazzo».** In home-calma la `<section aria-label="Le collezioni" class="doors">` (le due door card «Pietre e rituali» / «Cura di sé») va sostituita con i due `<section class="world" data-world="pietre|cura">` di `concept-porte-mazzo.html` (versione r5 definitiva, inclusi la linea dorata obliqua, il cambio di tono, il bagliore oro/salvia, le carte, il comportamento mobile a 2,5 carte con scroll). Le icone tonde (orb di categoria sotto la hero) di home-calma RESTANO visibili e invariate, sopra il mazzo.
- **«Scegli per intenzione» → «La ruota delle intenzioni».** La `<section>` senza id/classe che contiene `.intentions` / `.intention` va sostituita con `<section id="intenzioni">` di `concept-intenzione.html` (ruota, pietre scontornate `img/cutout/st-*.webp|png`, set con «+» e «Aggiungi il set»). Niente frase «La foto mostra il tipo di pietra…», niente contatore.
- Porta CSS, JS, dati e asset necessari. **Scope**: prefissa o annida le regole così che nulla colpisca il resto della pagina (es. annida sotto `.bz-mazzo` / `#intenzioni`, o rinomina classi generiche come `.card`, `.title`, `.label`, `.set`, `.toast`). Nessuna regola globale (body, h2, section, :root) nuova che cambi le altre sezioni. JS in IIFE, niente variabili globali in conflitto, niente doppi listener.
- **Un solo carrello/toast**: usa il drawer `.cart-overlay` già presente in home-calma e il suo meccanismo di aggiunta (guarda come i «+» delle altre sezioni / bz-mock.js aggiungono righe, aggiornano totale e barra spedizione, e aprono il drawer o mostrano il toast). Se i concept avevano un loro toast/drawer, NON duplicarlo: collega i loro pulsanti a quello della pagina.
- Resta tutto il resto esattamente com'è: FAQ avorio, gradiente del rituale, pietra del mese, hero, orbs, bestsellers, mala-band, stones, gift, newsletter, footer.

## 2. Ritocchi del mazzo (design lead)
- Icona Gioielli: abbassala di circa il 2% dell'altezza carta (es. `translateY` o margin pari a ~2% → usa una var/calc relativa all'altezza carta) per stare otticamente in linea con le altre.
- Freccia in hover: scorre di 4px invece di 3px.
- Motion solo transform/opacity, ≤400ms, `prefers-reduced-motion: reduce` → niente animazioni/rotazioni (la ruota cambia stato senza girare).

## 3. Credito icone
Nella riga legale del footer aggiungi, discreta e coerente con gli altri elementi della riga: «Icone: Lorc e Delapouite, game-icons.net (CC BY 3.0)» (link a https://game-icons.net, stesso stile dei link della riga).

## 4. Ritmo della pagina
Le due sezioni nuove devono stare calme nel ritmo: stesso padding verticale delle sezioni vicine (guarda i valori usati da home-calma), nessun doppio divisore/bordo (se la sezione precedente o successiva ha già una linea, non aggiungerne un'altra), sfondi che non stridono con le sezioni adiacenti. Il titolo della pagina `<title>` diventa «[prova calma r4] …».

## 5. Vincoli
- Nessun SVG disegnato a mano nuovo (le icone Game-icons già presenti nel concept vanno bene, così come gli SVG geometrici della ruota già nel concept).
- Supporta `?static=1` come le altre sezioni (stato iniziale stabile per screenshot).
- Chromium non è disponibile nel tuo sandbox: lavora su codice; i test Playwright li faccio io dopo.
- Quando hai finito, scrivi un riepilogo di 8 righe: cosa hai sostituito, come hai scoped CSS/JS, come hai collegato il carrello, i selettori di: carte del mazzo, pulsanti delle intenzioni della ruota, «+» del set, «Aggiungi il set», etichette della ruota.
