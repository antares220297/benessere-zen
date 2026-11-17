# Fix round 1 for D/concept-intenzione-carte.html (edit only this file)
Screens: shots/concept/carte-1440.png, carte-rivelata-1440.png, carte-390.png, carte-rivelata-390.png (Read them).
1. Copy: the panel line must be EXACTLY `item.copy` from BZ_CONCEPT (today «Nella tradizione: in molte pratiche…» is prefixed). Do not prefix or rephrase.
2. Card backs are too faint and plain, they read as empty boxes: make the CSS-only pattern clearly visible yet elegant: concentric fine gold rings (1px, alpha .16-.22) centred, plus very fine radial lines (repeating-conic-gradient, alpha ~.08) and a slightly warmer card base (#1d1a16 → #171512 radial); the inner frame at alpha .45; the wordmark «Benessere Zen» 16px ivory with gold italic «Zen», with contrast ≥4.5:1 against the card. Keep it quiet: no glow animation.
3. Revealed card front: the stone-colour glow is barely visible: radial of color at ~.40 alpha behind the stone, muted.
4. Dimmed cards: opacity .45 (not lower) so the pattern still reads.
5. Recheck 390/768/1024/1440: no overflow; `?state=serenita` works.
