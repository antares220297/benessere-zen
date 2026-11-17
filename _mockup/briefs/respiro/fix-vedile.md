# Fix «Vedile tutte» mobile — edit ONLY home.html

Folder D = /home/box/shared/benessere-zen/mockup-v411c/. Edit ONLY D/home.html (long lines: use python). Same FORBIDDEN list and tokens as D/briefs/respiro/home-respiro.md (read it; its change 4 is what you're fixing). Don't touch anything outside `#stones` mobile CSS/JS.

Problem (verified in Chromium at 390px): at ≤767px `.gem-grid` is a horizontal scroll carousel (one ~260px card + a peek). So collapsing to 4 cards and «Vedile tutte» changes nothing visible: the user sees the same single card, the button looks broken.

Fix, ≤767px only (desktop ≥768 must stay pixel-identical):
- Turn `#stones .gem-grid` into a static 2-column grid (no horizontal scroll: overflow visible, no scroll-snap), gap 12px, inside the section's existing side padding. Cards become compact: aspect-ratio about 3/4 (≈ 165×220 at 390), image object-fit cover; title Baskervville ~20px, price 13px; the «Scopri il significato» button becomes compact but still ≥44px tall target (it can be icon+short label «Significato», or full label on two lines at 13px — must not overflow the card at 360px width). Readability: keep the existing bottom dark gradient so small text over photo has ≥4.5:1.
- Collapsed: first 4 cards (2 rows) visible, then the centered «Vedile tutte» button (keep #stones-toggle, aria-expanded/aria-controls logic, «Mostra meno», filter interplay, ?state=vedile, already implemented). Expanded: all 8 in 4 rows; newly shown cards fade in with opacity only ≤300ms (none under reduced motion). On «Mostra meno», if the button would end up off screen, scroll it smoothly (instant under reduced motion) so the button stays in view.
- The card flip/back face (gem-back, inert/aria-hidden toggling) must still work in the compact card: back text must fit (smaller type, ≤4 lines meaning, links wrap) without overflow; if it can't fit, it may scroll inside the card.
- With a filter active (non «Tutte»), the matching cards show in the same 2-column grid, button hidden.
- No horizontal overflow at 360/390/430/768.

Stop when done and write a 4-line summary.
