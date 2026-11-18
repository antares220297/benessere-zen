# Fix round 1 for D/concept-intenzione.html (edit only this file)
Screens: shots/concept/intenzione-1440.png, intenzione-coraggio-1440.png, intenzione-390.png, intenzione-coraggio-390.png (Read them).
1. Copy: the panel line must be EXACTLY `item.copy` from BZ_CONCEPT (today it is rewritten as «Nella tradizione, l'ametista…»). Do not prefix or rephrase.
2. Desktop: dial a bit bigger (~560px at 1440) and the stone cluster ~44% of the dial; the glow in the stone colour is invisible today: make it perceptible but muted (radial-gradient of color at ~.42 alpha → transparent at 62%, radius ~70% of dial, blur), never neon.
3. Mobile/tablet (<1024): the arc labels at the ends are clipped («ntrazione», «Corag») and collide with the ‹ › buttons. On <1024 show ONLY the selected name on the arc (top centre); fade the others out (opacity 0, aria-hidden) and keep the row of names under the half dial as the visible tablist. The stone must sit fully inside the inner ring with ≥12px margin (today it overlaps the rings). The ‹ › buttons must not overlap any text or the stone.
4. Recheck 390/768/1024/1440: no overflow, `?state=coraggio` works.
