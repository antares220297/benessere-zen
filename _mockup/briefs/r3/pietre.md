# r3 — PIETRE E RITUALI + CURA DI SÉ + AYURVEDA (edit ONLY D/pietre-e-rituali.html, D/cura-di-se.html, D/ayurveda.html)

Read D/briefs/r3/COMMON.md first. Current approved state: D/shots/r3/baseline/pietre-e-rituali-1440-full.png and -390-full.png.

## A. pietre-e-rituali.html
1. Selectors (`.bz-sh` + `.bz-pills`, placement/style only):
   - «La pietra del tuo mese» (`.birthstones`, `.month-heading`, `.month-pills`): title, then the 12 month pills UNDER it in ONE row (scroll when it doesn't fit; never a grid, never wrap). Active month = shared ivory active style. Keep month JS working (update selectors if you rename). Don't change the month panel content otherwise (except point 6).
   - «Stessa pietra, tre forme» (`#compare`): title, intro line as `.bz-sh-sub`, then all stone pills under it in one scrolling row. Keep compare JS.
   - «I più scelti» (`.picked`): title left + existing «Vedi tutto →» right on the title row (`.bz-sh-more`), tabs under the title: swap class `tabs`→`bz-pills` keeping role=tablist/tab and aria-selected. Remove `.picked-toolbar` row.
   - Don't touch «Parti da un’intenzione» and «Intorno al rito».
2. Cento: keep only ONE «Vieni in negozio» button: keep the one in «In mano, a Cento»; remove the hero button (`.split.hero .btn.gold`). Nothing else in the hero or in the Cento block changes (text, hours, photo stay).
3. Alignment: section h2 of all sections start at the same x per width (if some sections are panels with a different inner padding, give them one identical inner padding; don't make anything full-bleed, don't change vertical spacing). «+» buttons: every product «+» on the page uses the same existing `.add` style already used by the page's product cards, same size. At ≤767 raise any text under 12px to 12px (page-local media query).
4. Add to cart on «La pietra del tuo mese»: in each month panel every product gets a «+» (`<button class="add" data-add="<url>" aria-label="Aggiungi al carrello: <title>">+</button>`, same style as the other «+» on the page) next to its price. Don't nest the button inside the product `<a>`. Under the products of months with 2+ products, one button `Aggiungi tutti →` (`btn outline`, existing page button style) that adds all the month's products; no discount and no discount text. Use the page's existing cart/«+» logic (find the handler for `.add`/`data-add` and the existing `.month-toast`): toast «Aggiunto al carrello: <title>» / «Aggiunti N pezzi al carrello», and update the header cart count if the page has one. Months without products keep their current content unchanged. Product titles exactly as in the data.

## B. cura-di-se.html and ayurveda.html — ONLY point 1
- Where a section has pills/tabs/«Vedi tutto» («I più scelti», cura-di-se «Mattina e sera» switch): title left, «Vedi tutto →» right on the title row (if the section already has it), pills/tabs/switch under the title as `.bz-pills` (class swap, roles/aria unchanged; the cura switch may keep its own styling but sits under the title, left aligned). Nothing else.
- Add the `bz-pills-js` script once at the end of body of each page you convert.
