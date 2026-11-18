# r3 — HOME (edit ONLY D/home.html)

Read D/briefs/r3/COMMON.md first. Look at the current state: D/shots/r3/baseline/home-1440-full.png and home-390-full.png (this is the approved backup; keep it identical except for the points below).

## 1. Selectors (only placement + pill style)
Convert to `.bz-sh` + `.bz-pills`:
- «I più scelti» (`section.bestsellers`): h2 left, the existing «Vedi tutti →» link becomes `<a class="bz-sh-more">Vedi tutto →</a>` on the title row right; the `#picked-filters` pills (labels unchanged: Più scelti, Novità, Ultimi pezzi) UNDER the title. Remove the `.section-tools` row.
- «Completa il rituale» (`#ritual`): title moves from centred to LEFT (same as the other sections), `.set-pills` row becomes a `.bz-pills` row under the title, one line, scroll on mobile (all 6 set names, unchanged). Nothing else in the ritual changes (tone gradient, grid, list, visual, button text).
- «Scegli la tua pietra» (`#stones`): h2 + `#stone-filters` pills under it as `.bz-pills`. No «Vedi tutto» (the section has none).
- FAQ card (`#faq-filters`): pills stay under «Domande frequenti» as `.bz-pills` (same geometry: 44px, outline, gap 9px, one line). The FAQ card STAYS IVORY: on the ivory card use the inverted colours already used there (outline #6c5a3b55, text #201b16, active background #27221a with ivory text) because an ivory active pill would be invisible on ivory. Scope this override to `.faq-card .bz-pills`.
Do not recentre, restyle or move anything else in these sections.

## 2. Gift band (replaces the «108 grani» band `section.mala-band`) — SAME bento structure and proportions
Keep the exact current bento grid of the band at every width (desktop: big card left spanning 2 rows ≈ `1.6fr`, then a 2×2 of small cards on the right; 768 and 390: as the current band does today: big card full width, small cards 2 columns × 2 rows). Same gaps, same radii (cards 18px), same min-heights as now.
- Remove the double frame: the band's outer panel (`.mala-band` background, border, padding, radius from the `html .mala-band` rule) goes away; the cards sit directly in the section like the Cento/FAQ cards below. Keep the section's position and vertical spacing. Change aria-label to «Regali piccoli» (use aria-labelledby on the h2).
- Big card (reuse the `.mala-lead` layout: copy column + photo column on desktop, photo on top on mobile as today): photo = the real shop photo `img/negozio/ventaglio-6-ciondoli.jpg` (pendants and stones in the shop's wooden cubbies), object-fit cover, filling the photo column edge to edge (no ivory letterbox), alt «Ciondoli e pietre nelle cassette di legno del negozio». Copy: `<h2 id="gift-title">Regali piccoli, <em>sotto 30 €</em></h2>`, ONE line `<p>Ciondoli, pietre e piccole luci da regalare, tutti sotto i 30 €.</p>`, CTA `<a class="btn gold" href="https://benesserezen.shop/collections/oggettistica-e-idee-regalo">Vedi le idee regalo →</a>`. NO mini product list / tiles inside the big card (that was the rejected part: tiny items next to big cards). Remove `.mala-links`.
- 4 small cards = 4 real gift products from the page's `gifts` data, ONE identical card style (class e.g. `.gift-card`, use the same structure as the existing `.product` article cards of «I più scelti»: link with photo + h3, then `.product-bottom` with small type label, price and the existing `.add` «+» button with `data-add` = product url and aria-label «Aggiungi al carrello: <title>», so the existing cart JS works). Photo flush to the card's top/side edges, same aspect ratio in all 4 (fill the available height so the 2 rows together match the big card height; object-fit cover), text top-aligned under the photo, equal card heights. Products (title exactly as in data, price formatted «19,50 €», image = data image + `&width=600`):
  1. Portacandela mano dorata, fiore di loto — 19.50 — https://benesserezen.shop/products/portacandela-mano-con-loto-color-oro — https://cdn.shopify.com/s/files/1/0917/9719/3042/files/IMG-7237.jpg?v=1789113032
  2. Ciondolo in corniola, goccia — 10.50 — https://benesserezen.shop/products/ciondolo-a-goccia-in-corniola — (image from the data)
  3. Candele profumate a stelo, 7 Chakra — 18.50 — https://benesserezen.shop/products/candele-da-tavola-profumate-chakra-set-da-7-3 — (image from the data)
  4. Portacandela in vetro, Albero della Vita mystical — 9.50 — https://benesserezen.shop/products/portacandela-in-vetro-smerigliato-interno-metallizzato-mystical-albero-della-vita — (image from the data)
  Type label in `<small>`: the data `type` (Candele / Ciondoli).
- Removed: palo-card, pendulum-card (and its lilac photo), shipping-card «50 €», store-small «Anche in negozio, a Cento». Remove their now-unused CSS rules (only those) and null-guard any JS that referenced them.
- Every card equally important: same border/background (`var(--card)`, 1px `var(--line)`), no off-palette colours.

## 3. Cento only in 3 places on home (announcement bar, «Anche a Cento» block, footer)
- Hero slide 1 paragraph: «Mala, bracciali e ciondoli in pietra naturale. Li trovi anche nel negozio di Cento.» → «Mala, bracciali e ciondoli in pietra naturale.» (nothing else in the hero changes).
- The band's Cento card is gone (point 2).
- FAQ data `faqs`: remove «Posso ritirare in negozio?» and «Dove vi trovo?». The «Ritiro e negozio» group becomes empty → drop that tab and its data group; «Spedizione» becomes the first, default-active tab (re-index data-faq so JS works). Keep all other questions as they are.
- Services strip `.trust-strip`: remove the «Ritiro in negozio» item → 4 items; at ≤767 the existing 2-column grid gives 2×2.
- Keep the «Anche a Cento» block exactly as it is (photo bz-store.jpg, text, design).

## 4. Bottom of home
- Services strip directly above the newsletter: remove the dashed border (use 1px solid var(--line)), remove the `.bz-news` border-top and anything that draws a second rule between them; gap strip→newsletter card 16–20px.
- Newsletter card the same width as the other sections (its outer edges align with the other sections' panels: remove the extra side padding of `.bz-news` at desktop so the card starts/ends at the container edge like `.store-faq`).
- Title «Nuovi arrivi <em>dal negozio</em>» → «Una lettera <em>al mese</em>».
- Email field: keep ONE visible label. Make the visible `.news-label` visually hidden (`class="news-label bz-vh"`) and keep the placeholder «La tua email». The small note under the form stays as is.

## 5. Alignment
- Section titles of the panel sections (I più scelti, Completa il rituale, Scegli la tua pietra) must start at the SAME x at each width: give these panels ONE identical inner padding (use the value I più scelti/Scegli la tua pietra already use; the ritual panel adopts it). Keep them rounded panels, NOT full-bleed. Don't change their vertical padding/spacing.
- FAQ stays ivory.
- «+» buttons: every product «+» on home uses the same existing `.add` style (outline circle as in «I più scelti»), same size at a given width (44px hit area; on 390 no 30px variant — remove `.palo-card .add{30px}`-type overrides if still present).
- At ≤767px raise every text under 12px to 12px (minimum): e.g. `.trust-strip span` 11px, `.faq-card .pills button` 11px, `.palo-card` leftovers, product small/meta, footer/legal/payment badges, hero mini captions — via page-local CSS overrides inside a `@media (max-width:767px)` block. Don't change desktop sizes.

## 6. Ritual price line
Keep the existing add-all button (`#add-ritual`, text unchanged). Under the total add `<p class="ritual-saving" aria-live="polite"></p>` (Figtree 13px, ivory2) computed from the set data: Y = sum of all item prices of the current set, X = round(Y×0.9, 2), Italian format «30,06 €». Text: «Il set costa X € invece di Y €: 10% in meno». Update in renderSet() / on checkbox change (same text; it's the set price).

Nothing else. Don't touch titles in the data, the hero (except the one sentence), mazzo, stones cards, ritual tones/photos, Cento block, footer.
