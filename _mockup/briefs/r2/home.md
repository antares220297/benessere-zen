# r2 — HOME (edit ONLY D/home.html)

Read D/briefs/r2/COMMON.md first (rules, shared components, alignment). Screens of the problems: D/shots/audit/r2-TOP2-108-bento-1440.png, r2-TOP3-cento-faq-1440.png, r2-TOP4-servizi-newsletter-1440.png, r2-TOP6-selettori-card-390.png (look at them).
Do NOT touch: the hero (`.home-hero` design), the mazzo/world sections internals (`.world`, calma-mazzo-js), the ritual tone colours (`#ritual-tones` style and the JS that sets tones), header, footer content. Keep the section order: hero, world pietre, world cura, I più scelti, Completa il rituale, Scegli la tua pietra, [gift band — was 108 grani], Anche a Cento + FAQ, services+newsletter, footer.

## 1. One section header + pills everywhere
Convert to `.bz-sh` + `.bz-pills` (see COMMON):
- «I più scelti» (`section.bestsellers`, pills `#picked-filters`): title left, «Vedi tutto →» right (https://benesserezen.shop/collections/all; text exactly «Vedi tutto»). The first pill «Più scelti» repeats the title: rename it «Tutti» (same behaviour/data). Pills under title.
- «Completa il rituale» (`#ritual`): left-aligned like the others (no centring of title or pills), pills `.set-pills` under the title, one line, scroll on mobile.
- «Scegli la tua pietra» (`#stones`, `#stone-filters`): same header; add «Vedi tutto →» to pietre-e-rituali.html.
- FAQ (`#faq-filters`): pills under the «Domande frequenti» title using `.bz-pills`.
Keep all existing JS hooks working (ids, data-attributes, aria-pressed). Delete the old competing `.pills`/`.set-pills` rules in the page `<style>` blocks (there are several, including ivory-panel variants), or scope them so they no longer apply.

## 2. Bands and alignment
- Section titles at the container edge (COMMON). Today banded sections are rounded panels with their own inset (titles at 68/52/78px at 1440). Make the alternating bands FULL-BLEED backgrounds (edge to edge of the viewport, no rounded panel) while the CONTENT stays in the normal container, so titles start at var(--side). Safe technique for solid tints: `background:var(--bg2);box-shadow:0 0 0 100vmax var(--bg2);clip-path:inset(0 -100vmax)`. For `#ritual` (gradient tone set by JS/CSS) use a `::before` layer with `inset:0 -100vmax` inside a `clip-path:inset(0 -100vmax)` section, carrying the same background (keep tone values/transitions exactly). No horizontal overflow allowed (check html/body overflow). Rhythm: I più scelti = tint, Completa il rituale = its tone, Scegli la tua pietra = plain, gift band = tint, Cento/FAQ = plain, services+newsletter = plain.
- Keep the vertical spacing approved last round (do not shrink section padding).
- Cards/panels inside sections: one inner padding `--pad: clamp(20px,3vw,44px)`.

## 3. Gift band (replaces `section.mala-band` «108 grani»)
Rebuild the section as `<section class="gift-band" aria-labelledby="gift-title">` (keep it in the same position). Remove the outer frame (no double frame, no .mala-band inner padding). Layout at ≥1024: grid, big card left (≈50%, spans 2 rows), right a 2×2 of small cards. 768: big card full width, small cards 2×2 below. 390: big card full width, small cards 2 columns × 2 rows (no orphan).
- Big card: `<h2 id="gift-title">Regali piccoli, <em>sotto 30 €</em></h2>`, one short line (e.g. «Pietre, ciondoli e piccoli oggetti da regalare, scelti in negozio.» — write a better one if you can, no clichés), then 3 real pieces taken from the page JSON `gifts` array (price < 30, real `image` URL; prefer photos that don't have loud pastel backgrounds): each a tile with photo flush to the tile edge (square, object-fit cover), name, price «7,50 €» format, and `.bz-add` «+» that adds it to the cart via the existing cart logic (same as other product «+», toast/cart count). Render them from the data in JS (null-guarded) or statically, your choice. CTA `<a class="btn gold" href="https://benesserezen.shop/collections/oggettistica-e-idee-regalo">Vedi le idee regalo →</a>`.
- 4 small cards, ONE shared style: photo flush to the card's top edge (same aspect, e.g. 4/3), same card height, text top-aligned under the photo, same type scale (title Baskervville 20–22px, meta 13px). Cards: (a) the Mala in Palo Santo product (existing, with price and `.bz-add`); (b) «Pendoli *e divinazione*» link card (keep link) — replace the lilac/off-palette image with a pendulum product photo on a dark/neutral background (use a real Shopify CDN pendulum URL already present in D/pietre-e-rituali.html or this page's data); (c) another gift piece from `gifts` (not one of the 3 above) with price + `.bz-add`; (d) the 50 € shipping card: same frame; in place of the photo a dark tile (var(--card2)) with «50 €» in Baskervville gold large, then text «Da 50 € la spedizione è gratuita, in tutta Italia.» The «Anche in negozio, a Cento» card is REMOVED.
- The old 108 mala list/photo is removed from home (mala stay reachable via mazzo and hero). Remove now-unused CSS/JS for it (null-guard anything left).

## 4. «Cento» only 3 times on home (visible text): announcement bar, the «Anche a Cento» block, footer.
- Hero subtitle «Mala, bracciali e ciondoli in pietra naturale. Li trovi anche nel negozio di Cento.» → «Mala, bracciali e ciondoli in pietra naturale, da tenere in tasca, al polso o al collo.» (same tone).
- Remove FAQ items «Posso ritirare in negozio?» and «Dove vi trovo?»; if their tab («Ritiro e negozio») becomes empty, drop the tab and make the next tab the default. Keep «Ricevo la pietra della foto?» and the others.
- Services strip: remove «Ritiro in negozio» (4 items left).
- Search the whole visible text for other «Cento»/«negozio» repeats you created and avoid adding new ones. Keep «gratuito» about pickup inside the Cento block (it's true).

## 5. Cento + FAQ block (`section.store-faq`)
- «Anche a Cento» photo: replace bz-store.jpg (velvet box, looks like the Regali piccoli hero card) with the local real shop photo `img/negozio/contatti-copertina.jpg` (shop counter with logo), object-fit cover, alt «Il bancone del negozio Benessere Zen».
- FAQ card becomes DARK like the rest (var(--card) background, ivory text, gold em, hairline separators), not ivory. Pills = shared `.bz-pills`. Same card radius and `--pad` as the Cento card, equal heights side by side at ≥1024.

## 6. Bottom of home
- The services strip sits directly above the newsletter as ONE group inside `#newsletter` (or a shared wrapper): strip with a solid hairline border (1px solid var(--line)), not dashed; remove `.bz-news` border-top / any double rule above; small gap (16–20px) between strip and newsletter card.
- Newsletter card width = the other sections (aligned to the container edge, 24px at 1440). Title «Una lettera <em>al mese</em>», subtitle one honest line: «Nuovi arrivi e pezzi tornati disponibili. Ti cancelli con un clic.» Remove the duplicated visible «La tua email» label (keep `<label class="bz-vh">La tua email</label>` for a11y, placeholder stays).
- Services strip on 390: 2×2 grid, no orphan; ≥768 one row of 4.

## 7. Product cards, type sizes
- Every product «+» on the page (I più scelti, gift band, anything else) = `.bz-add` gold filled.
- «I più scelti» photos: keep the real photos but make the card consistent: photo flush to the card's top edge (no inner inset frame), square, object-fit cover, sitting on a dark card; a very soft toning is OK (`filter:brightness(.94) saturate(.9)`) so pastel backgrounds don't read as stickers. No invented images.
- At ≤767px: no text under 12px, CTAs/pills/buttons ≥13px. Check: footer links and legal lines, payment badges, «Novità» badge, hero card CTAs, FAQ pills, services strip, product meta. (Use page-local CSS overrides.)

## 8. «Completa il rituale» discount line
Keep the add-all button, label it «Aggiungi il set →». Under the total add a small honest line computed from the set data (sum Y of the set's item prices; X = Y × 0.9 rounded to cents; Italian format «29,99 €»): when all items of the set are selected «Il set costa X € invece di Y €: 10% in meno»; when some are unchecked «Con tutti i pezzi il set costa X € invece di Y €». Update on set change / checkbox change. 12–13px, ivory2, aria-live polite.

## 9. Copy fixes
- Lapislazzuli text anywhere on this page: replace «verità» with «chiarezza e concentrazione» (as in assets/concept-data.js); occhio di tigre: remove the doubled «nella tradizione» (keep one).

## 10. JS
Null-guard every JS block that referenced removed elements (mala-band, removed FAQ items, removed pill). Keep `#add-ritual`, ritual tones, mazzo, stones «Vedile tutte», FAQ filter logic working. Add the COMMON `bz-pills-js` script once at the end of body.
