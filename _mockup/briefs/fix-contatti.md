# Fix contatti.html (UN solo giro, solo questi punti, modifichi SOLO `contatti.html`)
Leggi `briefs/COMMON.md` per i divieti. Non cambiare nient'altro.
1. **Overflow orizzontale a 768 e 1024 (bloccante)**: `.contact-details` ha una colonna fissa di 522px e `.contact-tiles` esce dallo schermo (scrollWidth 927 a 768, 1055 a 1024). Correggi: `.contact-details` con `grid-template-columns:minmax(0,1fr)` (e `min-width:0` sui figli della griglia); valori lunghi delle tessere (email) con `overflow-wrap:anywhere` NO: invece riduci la dimensione del valore email con `font-size:clamp(14px,1.25vw,17px)` e consenti l'a capo solo dopo «@» con `<wbr>` dopo la chiocciola. Tra 768 e 1099 px usa il layout a colonna unica (come a 390: tessere 2×2, orari, poi form, tutto a piena larghezza); da 1100 in su resta a due colonne.
2. **390 (bloccante)**: «info@benesserezen.shop» non deve spezzarsi a metà parola («benesserezen. shop»): con il `<wbr>` dopo «@» va a capo solo lì.
3. Il segnaposto `mark.tbc` dentro la card orari non deve spezzarsi su due righe: `.contatti mark.tbc{white-space:nowrap;display:inline-block}`.
Fermati e scrivi 3 righe di riepilogo.
