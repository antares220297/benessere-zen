# Fix il-negozio.html (UN solo giro, solo questi punti, modifichi SOLO `il-negozio.html`)
Leggi `briefs/COMMON.md` per i divieti. Non cambiare nient'altro.
1. **Badge che esce dalla card Orari (bloccante)**: nella card «Orari» il badge completo è più largo della card (a 1440 tocca il bordo, a 1024 esce). Nella card usa la variante compatta `data-open-badge="compact"` (la variante completa resta solo nella hero) e spostala SOTTO il titolo «Orari», prima del testo, con 12px di margine. Nessun testo deve uscire dalla card a 768, 1024, 1440.
2. **Card link in chiusura**: interlinea esagerata (le righe sono distanziate quasi il triplo). Porta `line-height` a 1.6 e i link sottolineati con `text-underline-offset:3px`, senza padding verticale sui link inline.
Fermati e scrivi 3 righe di riepilogo.
