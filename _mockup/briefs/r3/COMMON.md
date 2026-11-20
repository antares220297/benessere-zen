# r3 — STRICT redo (read all of it)

Folder D = /home/box/shared/benessere-zen/mockup-v411c/. Static HTML mockups. Files have VERY long lines: use python to patch exact snippets (str.replace / small regex). Never rewrite, reformat, re-indent or re-serialize a whole file (no BeautifulSoup round-trips): the result is diffed against the backup and every changed byte must belong to one approved point.

The previous round was REJECTED by the owner because it added changes he never approved and executed the approved ones badly. The files have been restored to the approved backup (D/logs/*.pre-r2.*). You now do ONLY the points in your brief. Anything not listed stays byte-identical: hero, header, footer, mazzo/world sections, ritual tones, stone texts and photos, copy, colours, radii, section order, section spacing, other blocks' layout. If you think something else should change, DON'T change it: write it in your summary as a suggestion.

FORBIDDEN: editing files other than those named in your brief; D/assets/bz-mock.css (already prepared, read it); D/collezione.html and assets/collezione*; git; network installs; new images other than those named; rewriting or reformatting ANY product title (titles in the data are the correct ones, with cm; leave them exactly); dark FAQ; full-bleed bands; gold-filled «+» buttons.

Design rules that apply: D/../regole-design.md (read it). Tokens: bg #141312, --card #201e1b, ivory #eee7db, ivory2 #cdc4b4, gold #c9a96e. Titles Baskervville with gold italic <em>, text Figtree. Motion transform/opacity only, ≤400ms, prefers-reduced-motion honoured. Must work at 390/768/1024/1440 with no horizontal page overflow; touch targets ≥44px.

## Shared components already in D/assets/bz-mock.css (use, don't redefine)
- Section header: `<div class="bz-sh"><h2>…</h2><a class="bz-sh-more" href="…">Vedi tutto <span aria-hidden="true">→</span></a><p class="bz-sh-sub">…</p><div class="bz-pills" role="group" aria-label="…">…</div></div>` — title left, «Vedi tutto →» right on the title row (ONLY if the section already had a «Vedi tutto/tutti» link; wording «Vedi tutto»), optional subtitle and pills full width UNDER the title. Pills: outline, active ivory (aria-pressed="true" or aria-selected="true"), 44px, gap 9px, one line, horizontal scroll, never wrap.
- Overflow fade script: add ONCE at the end of body of every page you convert:
  `<script id="bz-pills-js">(()=>{const all=[...document.querySelectorAll('.bz-pills')];const upd=el=>{const o=el.scrollWidth>el.clientWidth+2;el.classList.toggle('is-overflowing',o);el.classList.toggle('is-end',o&&el.scrollLeft+el.clientWidth>=el.scrollWidth-2)};all.forEach(el=>{upd(el);el.addEventListener('scroll',()=>upd(el),{passive:true})});addEventListener('resize',()=>all.forEach(upd));addEventListener('load',()=>all.forEach(upd));})();</script>`
- When converting, delete or neutralise the old page-local pill styles that would fight `.bz-pills` (e.g. `.pills button{…}`, `.set-pills`, `.month-pills`, `.compare-pills`, `.tabs`, flex-wrap, justify-content:center, grid of months, fixed heights) — only for the converted rows. Keep every existing JS hook (ids, data-attributes, aria-pressed/aria-selected, roles); update JS selectors only if you rename a class.
- Visually hidden helper: `.bz-vh`.

## Finish
JS null-guarded, no console errors. Self-check with python string checks (no browser needed; I run Playwright myself). Then stop and write a summary (max 15 lines): what you changed per point, and any suggestion you did NOT apply. No git, no publish.
