# Regole di design, UI e UX: Benessere Zen

Valgono per ogni mockup, build e QA del tema (Codex, Cursor, qualsiasi bot). Adattate da `CLAUDE.md` di Don't Mind the Gap (sezioni «Design fidelity & no-compromise», «Styling & design tokens», «Known mobile / iOS bugs») più le regole proprie di Benessere Zen. Vincolanti.

## 1. Il mockup approvato è la Bibbia
- Il codice riproduce il mockup approvato **1:1**: niente invenzioni, riordini, etichette cambiate, semplificazioni, aggiunte o tagli.
- Se una deviazione sembra migliore, la si **propone** con il motivo concreto e si aspetta l'OK. Mai deviare in silenzio.
- Prima di fare una domanda, si guarda il mockup: di solito la risposta c'è già.

## 2. Zero riempitivi da IA
- Sullo schermo va solo ciò che serve: contenuti, dati, controlli. Niente etichette o badge decorativi che il mockup non prevede, niente elementi messi per «riempire un buco».
- Niente didascalie che spiegano come funziona la pagina o la sezione. Un messaggio di errore o di stato vuoto onesto resta, una frase che insegna l'interfaccia no.

## 3. Il desktop si usa tutto
- Su desktop si sfrutta tutta la larghezza con layout orizzontali; vietate le pile verticali alte di blocchi uno sotto l'altro.
- **Card affiancate** su desktop (Orari e Dati dell'attività, valori, tile): in riga o in griglia, mai impilate se c'è spazio.
- **Mai un'immagine grande accanto a un grande vuoto**: la colonna di testo deve reggere l'altezza dell'immagine, altrimenti si riduce l'immagine o si cambia layout.
- Contenuti collegati stanno vicini: per esempio il blocco «Il negozio» accanto al form contatti, non sotto.
- Il traffico è soprattutto mobile, ma il desktop va curato quanto il telefono.

## 4. Stile: la homepage è il riferimento
- Palette scura del tema (`bz-tokens.css`: `--bg #141312`, `--card #201e1b`, `--ivory #eee7db`, `--gold #c9a96e`), Baskervville per i titoli, Figtree per il testo.
- Nei titoli la parola chiave in **corsivo oro** («Cura di *sé*»), card **arrotondate** con **gradienti caldi**, bottoni **a pillola**, categorie a **sfere**.
- Aperture a tutta foto con testo sopra una sfumatura scura. Viola e prugna solo come accento, mai dominanti (vedi Ayurveda).
- Componenti uguali tra pagine uguali: una sezione come «I più scelti» ha la stessa struttura ovunque, con gerarchia chiara (titolo, poi filtri, poi link secondario), senza elementi in conflitto sulla stessa riga.

## 5. Immagini
- Ogni immagine grande è **unica** sul sito: nessun doppione tra pagine o sezioni.
- Le **copertine sono d'atmosfera** (luce di candela, legno, toni caldi), non primi piani di prodotti o latte, salvo dove serve il prodotto.
- Il soggetto dell'immagine corrisponde al titolo della sezione.
- **Niente immagini sgranate o ingrandite**: larghezza naturale almeno 1,5× quella mostrata (ideale 2× per gli schermi retina). Se il file non basta, si riduce lo spazio dell'immagine.
- Foto realistiche, nessun testo, logo o marca dentro l'immagine (tranne le foto prodotto vere).

## 6. Menu
- Gerarchia leggibile a colpo d'occhio: la collezione madre si distingue per peso, dimensione o colore dalle sottocategorie.
- Una voce senza sottocategorie (per esempio Pendoli) è un link semplice e si vede che lo è.

## 7. Testi
- Copy umano secondo la skill `copywriter-umano` (`/home/box/shared/benessere-zen/copywriter-umano/SKILL.md`): niente tic da IA, niente ripetizioni, lessico evocativo dosato.
- **Nessun claim sulla salute** (cura, guarisce, ansia, insonnia, dolori…). Spirituale sì, se inquadrato nella tradizione.
- Nessun testo, prezzo o dato inventato.

## 8. Regole tecniche
- **Animazioni** solo con `transform` e `opacity`, 60 fps su un telefono medio, e rispetto di `prefers-reduced-motion` (animazioni spente o ridotte).
- **Breakpoint** di verifica: **390, 768, 1024** (più 1440 per il desktop largo). Nessun overflow orizzontale.
- **Tipografia fluida** con `clamp()`.
- **Mai `vh` su mobile** (la barra di Safari iOS lo fa saltare): usare `dvh`/`svh`.
- Ogni nuovo bug mobile o iOS risolto si annota qui, con sintomo e soluzione.
