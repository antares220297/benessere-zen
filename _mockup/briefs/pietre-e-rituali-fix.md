# Fix v4.11c · Pietre e rituali (`pietre-e-rituali.html`) — UN SOLO giro di correzione, modifichi SOLO questo file

Leggi `briefs/COMMON.md`. NON toccare header, footer, cassetto carrello né altre sezioni oltre a quelle qui sotto. Correggi solo questi no bloccanti emersi dalla review delle schermate:

1. **«Stessa pietra, due forme» troppo grande e foto deformate.** Le foto delle 3 card devono essere **quadrate 1:1** (`aspect-ratio:1/1; width:100%; object-fit:cover; display:block`) — oggi sono verticali (~465×720 a 1440). A 1440 la card è ≈454 px di larghezza, foto 454×454.
2. **Intestazione della sezione**: a ≥1024 titolo + intro a sinistra e le pill delle pietre a destra sulla stessa riga (flex, pill allineate a destra e a capo se servono, align-items:end); a 768 e 390 pill sotto l'intro (a 390 resta lo scroll interno attuale).
3. **Doppioni di etichetta**: togli i titoli esterni «Grezza», «Burattata», «Da portare» sopra le card (h3 Baskervville). Resta solo l'etichetta forma dentro la card (Figtree 12px `--gold`: «Pietra grezza», «Pietra burattata», «Bracciale» / «Punta»).
4. **Righe descrittive dentro la card**: le due frasi di copy-v2 (grezza, burattata) vanno nel corpo della card sotto il titolo prodotto (Figtree 13px `--ivory2`, max ~3 righe), non fuori sotto la card; prezzo e «+» restano in fondo alla card, allineati tra le tre card (corpo card flex-column, prezzo con margin-top:auto). A 390 le righe compatte restano come ora (descrizione omessa).
5. **Pietra predefinita del confronto: Pirite** (senza `?state`), per non ripetere le foto dell'ametista usate in «Parti da un'intenzione». `?state=compare` resta Lapislazzuli.
6. **«Parti da un'intenzione»: foto sbagliate** (mostrano pietra di luna, quarzo ematoide, giada, calcite gialla, pirite). Sostituisci con foto vere della pietra citata, da `input/products.json` (`&width=600`), e alt col nome:
   - Serenità → `https://cdn.shopify.com/s/files/1/0917/9719/3042/files/IMG_9341.jpg?v=1793211573&width=600` (Ametista grezza)
   - Protezione → `https://cdn.shopify.com/s/files/1/0917/9719/3042/files/IMG_9664.jpg?v=1794159560&width=600` (Tormalina nera grezza)
   - Affetti → `https://cdn.shopify.com/s/files/1/0917/9719/3042/files/IMG_9340.jpg?v=1793211615&width=600` (Quarzo rosa grezzo)
   - Coraggio → `https://cdn.shopify.com/s/files/1/0917/9719/3042/files/IMG_9344.jpg?v=1793211431&width=600` (Diaspro rosso grezzo)
   - Concentrazione → `https://cdn.shopify.com/s/files/1/0917/9719/3042/files/6FC758DC-EAD9-4C8A-A70F-19BA17C57C69.png?v=1793563723&width=600` (Lapislazzuli grezzo)
   Testi e CTA invariati.

Movimento invariato (dissolvenza 240ms sfalsata, reduced-motion istantaneo). Nessun overflow a 390/768/1024/1440. Quando hai finito fermati e scrivi 5 righe.
