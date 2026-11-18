# Brief v4.11c · Carrello (`cart.html`) — modifichi SOLO questo file

Leggi prima `briefs/COMMON.md` (vincolante), poi in `input/copy-v2.md` «# Carrello» e «# Header e footer», SPEC §0, §11. Parti da `cart.html` (approvato) e correggi, senza stravolgere.

## Da fare
1. `<title>Carrello · Benessere Zen</title>` (copy-v2). Togli eventuali `.idea-tag`/etichette.
2. Testi invariati nella voce: «Il tuo *carrello*», «Ti mancano 29,00 € per la spedizione gratuita», «Vai al pagamento →», stato sopra soglia «Spedizione gratuita». Prodotti e prezzi veri (già presenti, verifica su `input/products.json`).
3. La pagina carrello deve sembrare il sito finale e coerente col resto: layout desktop a due colonne (righe prodotto a sinistra con foto vera a tutto campo nella miniatura, nome esatto, prezzo, quantità −/+ come `<button>` 44px, rimuovi; riepilogo a destra con barra spedizione gratuita, totale, CTA oro ≥48px), a 390 colonna unica. Se c'è già, rifinisci; niente sezioni riempitive.
4. **Ritiro in negozio** nel riepilogo, una riga con icona `storefront` inline (da `icons/storefront.svg`, 18px): «Al pagamento scegli Ritiro in negozio: è gratuito e di solito è pronto in 4 ore.» (frase dei fatti verificati di copy-v2; mai «ti avvisiamo noi») + badge compatto `<a class="open-badge" data-open-badge="compact" href="contatti.html#orari"></a>`. Riga spedizione: «Spediamo solo in Italia. Il corriere Express è 5,90 €, gratuito da 50 €.» (copy-v2 FAQ).
5. Il segno ✓ o caratteri-icona: sostituisci con icona Material `check` inline. Icone solo da `icons/`.
6. Footer: «Testo nuovo» del footer di copy-v2 (con `<mark class="tbc">[DA CONFERMARE: domenica chiuso]</mark>`). Includi `assets/bz-ideas.css` e `assets/bz-ideas.js`.
7. `?state=free` mostra lo stato sopra soglia (63,00 €, «Spedizione gratuita»); default sotto soglia (21,00 €).
8. Movimento: barra che si riempie in transform scaleX ≤400ms una volta; reduced motion ferma.

## Accettazione
Titolo corretto; ritiro e spedizione con fatti veri; nessun overflow a 390/768/1024/1440; target ≥44px; niente idea-tag/«Solo mockup».
