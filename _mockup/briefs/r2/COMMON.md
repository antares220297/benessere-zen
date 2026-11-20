# r2 — regole comuni (leggi tutto)

Folder D = /home/box/shared/benessere-zen/mockup-v411c/. Static HTML mockups (not a theme). Files have VERY long lines: use python to read/patch pieces (str.replace / regex on exact snippets), never rewrite whole files by hand. Backups already exist in D/logs/*.pre-r2.* (don't touch them).

FORBIDDEN: editing any file outside the ones your brief names; D/collezione.html (another worker); D/assets/bz-mock.css, bz-mock.js, bz-ideas.*, concept-data.*; git; network installs; inventing images (no AI images, no stock). Photos allowed: real shop photos in D/img/negozio/ and D/img/ already used, or the real Shopify CDN product URLs already present in the page/data.

Design tokens: bg #141312, --card #201e1b, --bg2 #1b1917, ivory #eee7db, ivory2 #cdc4b4, gold #c9a96e, goldl #e3cb95. Titles Baskervville with ONE gold italic keyword in <em>; text Figtree. Motion: transform/opacity only, ≤400ms, honour prefers-reduced-motion. Contrast ≥4.5:1. Must work at 390/768/1024/1440 with no horizontal page overflow. Small text on ≤767px at least 12px, CTAs/buttons/pills at least 13px. Touch targets ≥44px.

## Shared components (ALREADY in D/assets/bz-mock.css — use them, do not redefine them; you may add page-local tweaks only if strictly needed)
- Section header: 
  `<div class="bz-sh"><h2>Titolo <em>chiave</em></h2><a class="bz-sh-more" href="…">Vedi tutto <span aria-hidden="true">→</span></a><p class="bz-sh-sub">optional subtitle</p><div class="bz-pills" role="group" aria-label="…">…buttons…</div></div>`
  Title left, «Vedi tutto →» right on the title row (wording exactly «Vedi tutto», singular; omit the link if the section has none), subtitle and pills full width UNDER the title. Never pills beside the title.
- Pills: `.bz-pills > button` (or `a`). Active state = `aria-pressed="true"` (or aria-selected="true" for role=tab). ONE line, never wrap, horizontal scroll when too long. Remove every old page-local pill/tabs style that would fight these (e.g. `.pills button{…}`, `.set-pills`, `.month-pills`, `.tabs`, compare tabs, grid/fixed heights, flex-wrap, justify-content:center, ivory-panel variants). Keep the existing JS behaviour (update selectors in JS if you rename classes).
- Edge fade hint: add this tiny script ONCE at the end of the page body (after the other scripts) so overflowing pill rows get the CSS fade:
  `<script id="bz-pills-js">(()=>{const all=[...document.querySelectorAll('.bz-pills')];const upd=el=>{const o=el.scrollWidth>el.clientWidth+2;el.classList.toggle('is-overflowing',o);el.classList.toggle('is-end',o&&el.scrollLeft+el.clientWidth>=el.scrollWidth-2)};all.forEach(el=>{upd(el);el.addEventListener('scroll',()=>upd(el),{passive:true});el.addEventListener('click',e=>{const b=e.target.closest('button,a');if(b&&el.contains(b))b.scrollIntoView({block:'nearest',inline:'nearest',behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'})})});addEventListener('resize',()=>all.forEach(upd));addEventListener('load',()=>all.forEach(upd));})();</script>`
- Add-to-cart «+»: `<button class="bz-add" aria-label="Aggiungi …">+</button>` gold filled, 44px round. Every product «+» on the page uses this same style (replace outline «+» styles; keep existing data attributes/JS hooks).
- Visually hidden: `.bz-vh`.

## Alignment rule
Every section title (h2 of each content section) must start at the same x as the page container edge (= var(--side): 24px at 1440, ~17px at 1024, 14px at 768/390). Titles that live INSIDE a card (hero cards, the shop/FAQ cards, newsletter card, gift big card, product/intention cards) are card titles and are exempt, but every panel/card uses ONE inner padding: `--pad: clamp(20px,3vw,44px)`.

## Copy
Italian, human, no AI tics, no clichés, no em-dash chains, no exclamation marks. Keep facts: in-store pickup IS free. Leave «Domenica chiuso» as is.

## Finish
JS: null-guard anything whose section may be missing (`?.`, `if(el)`). No console errors. When done, stop and write a short summary (max 10 lines) of what you changed and anything you could not do. Do not run git, do not publish.
