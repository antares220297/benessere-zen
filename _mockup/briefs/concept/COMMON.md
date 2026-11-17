# Concept prototypes for the BZ home (common rules, read all of it)

Folder D = /home/box/shared/benessere-zen/mockup-v411c/. You create ONE new file, named in your brief. FORBIDDEN: editing any other file (home.html, home-calma.html, assets/*, img/*), git, Shopify, servers, installs, deleting files, network writes. When the file is complete, stop and write a 5-line summary.

## Page frame
- Static concept page in Italian. `<html lang="it">`. In `<head>`: `assets/bz-mock.css`, `assets/bz-ideas.css`, `<script defer src="assets/bz-mock.js">`, `<script defer src="assets/bz-ideas.js">`, `<script src="assets/concept-data.js">` (defines `window.BZ_CONCEPT`, read it, it is the ONLY product data source: real products, real prices, variant ids, cutouts).
- Copy the announcement bar, `<header>` (with mega menus and mobile nav), `<footer>` and the cart overlay/drawer (`.cart-overlay` … `.drawer`) markup VERBATIM from D/home-calma.html, so the page looks like the real site. Read the `<style>` of home-calma.html for tokens, section spacing, h2 sizes, `.btn`, `.text-link`, `.add`, `.home-toast`, `.sr-only`, and reuse the same classes/values.
- Context: above your section, show the bottom ~220px of the section that precedes it on the home (copy its markup from home-calma.html), and below it the top ~220px of the next section, each clipped (`max-height` + `overflow:hidden` + a mask/gradient fade to --bg), `aria-hidden="true"` and `inert`. They only show the section in context. Your section is the star, full width.
- No title tags or labels like «Concept», «Idea», «mockup», «demo». The page must look like the final site.

## Design tokens (fixed)
--bg #141312 (page), --card #201e1b, ivory #eee7db (text), #cdc4b4 (secondary text), gold #c9a96e (keyword in titles, one strong element per screen). Titles Baskervville (woff2 in assets/fonts, already declared in bz-mock.css; check) with the keyword in `<em>` gold italic. Body Figtree. Prices formatted «17,90 €» (Italian comma). Desktop uses the full width horizontally (container like the other sections of home-calma: same max-width and side padding). Test widths 390, 768, 1024, 1440: no horizontal overflow (horizontal scroll rows only inside an `overflow-x:auto` container).

## Michael's hard rules
- NO custom-drawn SVG icons or illustrations, NO icon libraries in these sections, nothing that looks AI-made. Allowed: CSS geometry (borders, gradients, radial glows), plain SVG geometry (circle, line, path for a textPath arc), real typography, the real product cutouts in img/cutout/*.webp (transparent PNG/WebP, already cleaned: use them as given, never with a box/background behind, never filters that alter colour).
- Real products and prices ONLY from BZ_CONCEPT. Never invent products, prices or claims. Meanings always «nella tradizione». No health claims.
- Elegant, calm, not gimmicky: one strong idea per section, muted glows (opacity ≤ .45, never neon), thin lines (1px, gold at 35-60% alpha), lots of dark space.
- Motion: transform and opacity only. UI transitions ≤ 400 ms, ease `cubic-bezier(.2,.7,.2,1)`. Nothing loops; any entrance runs once. `@media (prefers-reduced-motion:reduce)`: no parallax, no flips, no lifts, only ≤200 ms opacity fades or instant states. `?static=1` = no entrance animation (final state immediately), used for screenshots.
- Contact shadow under floating objects: a separate element, `radial-gradient(ellipse, rgba(0,0,0,.55), transparent 70%)`, flattened ellipse, slightly blurred, placed under the object's base, never a box-shadow on the image.

## Cart
- '+' buttons are `<button class="add" aria-label="Aggiungi al carrello: <title>">+</button>` (≥44×44 px). Clicking adds to the real drawer: copy from home-calma.html the logic of `refreshCart()` / `addProducts()` (it renders `.cart-row` items in `.drawer`, total and the free shipping bar at 50 €) adapted to BZ_CONCEPT products (fields: title, price, url, image, variant), then show a `.home-toast` «Aggiunto al carrello» for 2 s (do NOT auto-open the drawer, so the user stays on the section; the header cart button opens it). Set buttons add all products of the set at once with toast «Set aggiunto al carrello».
- Product images in rows: `image + '&width=200'` (or `?width=200` if no query), object-fit cover, rounded 10px.

## Accessibility
Real `<a>` links with proper `alt`; `<button>` for actions; visible focus 2px gold outline offset 3px; keyboard works for everything; targets ≥44 px; text contrast ≥ 4.5:1 for small text (#cdc4b4 on #141312 is fine; never use gold under 14px for body text on dark cards unless ≥4.5:1). One h2 per section.

## Screenshots
Your brief names a `?state=` param to force states for screenshots; support it.
