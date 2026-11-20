# Fatti verificati per le FAQ della home (r4)

Dati raccolti in **sola lettura** il **17 novembre 2026** (Europe/Rome), sullo store **benesserezen.shop** (myshopify: `tfwcim-aj.myshopify.com`). Nessuna modifica allo store.

Per ogni punto: dato + fonte. Se manca una conferma, è scritto **non trovato**. Non inventare tempi, corrieri, metodi di pagamento o istruzioni di cura non presenti nelle fonti. Evitare claim medici; le formule «pietra naturale» e i testi energetici delle schede sono riportati solo come wording già pubblicato.

Tema live consultato in sola lettura: **Eurus**, id `174615658834` (`gid://shopify/OnlineStoreTheme/174615658834`).

---

## Contraddizioni e scostamenti tra fonti

Segnalarle in copy e non “mediare” in silenzio:

1. **Soglia spedizione gratuita: «da 50 €» vs «superiori a 50 €».**
   - Pagina [Spedizioni](https://benesserezen.shop/pages/spedizioni): «gratuita per ordini **da 50 €**».
   - FAQ home e barra annunci del tema: «**superiori a €50**» / «SPEDIZIONE GRATUITA PER ORDINI SUPERIORI A €50».
   - Impostazione Admin (profilo di consegna «Profilo generale», zona Italia): tariffa Express a 0 € con condizione `TOTAL_PRICE GREATER_THAN_OR_EQUAL_TO 50.0 EUR` (quindi **da 50 € inclusi**). È questa la regola che applica il checkout.

2. **Tempi di elaborazione e consegna (24 ore / 1-3 giorni lavorativi): solo nelle FAQ home.**
   - Presenti nella sezione FAQ del tema live (`templates/index.json`, sezione `faq_FgMKeg`) e sulla home pubblica.
   - **Assenti** dalla pagina Spedizioni, dalle informative `shop.shopPolicies` e da un’eventuale shipping policy (la pagina `/policies/shipping-policy` risponde 404; in Admin non esiste `SHOPPING`/`SHIPPING_POLICY`).

3. **FAQ home sui resi vs informativa ufficiale.**
   - FAQ: «Accettiamo resi entro 14 giorni dalla ricezione dell’ordine, purché il prodotto sia integro e non utilizzato. Contattaci…»
   - [Informativa sui rimborsi](https://benesserezen.shop/policies/refund-policy) e pagina Spedizioni sono più precise: cartellini e imballo originale, ricevuta o prova d’acquisto, richiesta preventiva a info@benesserezen.shop, etichetta inviata solo se il reso è accettato, spedizione del reso a Via Marcello Provenzali 1, 44042 Cento FE, rimborso entro 10 giorni lavorativi dall’approvazione.
   - Su molte schede prodotto (es. [piatto di ricarica in selenite](https://benesserezen.shop/products/piatto-di-ricarica-in-selenite-10-cm-fase-lunare)) c’è anche un blocco tema «Resi e Rimborsi» che aggiunge il rifiuto dei resi di prodotti «aperti, usati o privi di imballo originale per motivi igienici e di sicurezza» e chiede numero d’ordine o ricevuta. Non è nell’informativa ufficiale.

4. **Ritiro in negozio: c’è in Admin, ma le pagine lo descrivono in modo diverso.**
   - Admin: location «Benessere Zen», Via Marcello Provenzali 1, Cento; `pickup_in_store: enabled`; `localPickupSettingsV2.pickupTime = FOUR_HOURS`; istruzioni vuote.
   - Pagina Spedizioni: «paghi sul sito e ritiri in negozio».
   - Pagina [Il negozio](https://benesserezen.shop/pages/il-negozio): «Se hai ordinato online e preferisci ritirare in negozio, **scrivici o telefonaci dopo l’ordine** e ci mettiamo d’accordo.» Non menziona il ritiro come opzione al checkout né le «4 ore».

5. **FAQ «I vostri prodotti sono davvero naturali?»**
   - Il testo parla di ingredienti naturali, assenza di parabeni/siliconi e cosmetici/ayurveda. Applicarlo a tutto il catalogo (pietre, gioielli, oggettistica) sarebbe una generalizzazione non supportata. Sulle schede pietre compare spesso «pietra naturale» / «pietre naturali», ma non c’è una policy di store su trattamenti o ricostruzioni.

6. **Nota tecnica sulle tariffe (non è una contraddizione di copy, ma un caveat).**
   - L’unico profilo merchant-owned è «Profilo generale»: `coversAllItems = false`, `productVariantsCount = 500` con precisione `AT_LEAST`. Non risulta un secondo profilo merchant. Non è detto in pagina; non usarlo in FAQ se non dopo un controllo di Finanza/Admin.

---

## SPEDIZIONE

### 1. Tempi (FAQ home: elaborazione entro 24 ore, consegna in 1-3 giorni lavorativi). È confermato altrove?

**Parzialmente: il testo è confermato solo nella FAQ della home, non altrove.**

- FAQ home, risposta a «Quanto tempo impiega la spedizione?»: «Gli ordini vengono elaborati entro 24 ore e spediti in 1-3 giorni lavorativi. Per gli ordini superiori a €50, la spedizione è gratuita.»
  - Fonte pubblica: [https://benesserezen.shop/](https://benesserezen.shop/), sezione FAQ (`id="shopify-section-template--23945350676818__faq_FgMKeg"`).
  - Fonte Admin/tema: file `templates/index.json` del tema live Eurus 174615658834, sezione `faq_FgMKeg`, blocco della domanda sui tempi.
- Pagina [Spedizioni](https://benesserezen.shop/pages/spedizioni) (Admin `pages`, handle `spedizioni`, aggiornata il 16 novembre 2026 alle 18:32 Europe/Rome): parla di costi (5,90 € sotto i 50 €, gratuita da 50 €), ritiro in negozio e resi. **Non indica tempi di elaborazione né di consegna.**
- Informative `shop.shopPolicies`: **nessuna shipping policy**; niente sui tempi.
- `/policies/shipping-policy`: **404**.

Per le FAQ nuove: i tempi 24 ore / 1-3 giorni lavorativi oggi stanno solo nella FAQ home. Non risultano confermati da pagina Spedizioni o da un’impostazione di spedizione.

### 2. Quale corriere usate (BRT, GLS, Poste, SDA…)?

**non trovato.**

- Le tariffe Admin si chiamano solo «Express» e sono `DeliveryRateDefinition` a prezzo fisso (0 € o 5,90 €), non un corriere collegato (`DeliveryParticipant` assente). Query: `deliveryProfiles(first: 20, merchantOwnedOnly: true)`.
- `shop.fulfillmentServices`: un solo servizio, «Manuale» (`handle: manual`, `type: MANUAL`, `trackingSupport: false`).
- Pagine Spedizioni, informative e FAQ home: nessun nome di corriere.

### 3. Supplementi o tempi diversi per isole, Sicilia, Sardegna o zone disagiate?

**Nella configurazione trovata, no: un’unica zona «Italia» con le stesse due tariffe Express, e le province siciliane e sarde sono incluse in quella zona. Nessun testo pubblico parla di supplementi o tempi diversi.**

- Stesso profilo e unica zona «Italia». Province presenti, tra le altre: Palermo, Catania, Messina, Agrigento, Cagliari, Sassari, Nuoro, Oristano (e le vecchie province sarde ancora in elenco). Query: `deliveryProfiles` → `countriesInAnyZone` / `zone.provinces`.
- Nessuna tariffa aggiuntiva, soglia diversa o zona separata per isole o “zone disagiate”.
- Pagine pubbliche: **non trovato** alcun accenno a supplementi o tempi extra.

### 4. Arriva il numero di tracking via email?

**non trovato.**

- Nessuna menzione in Spedizioni, informative, FAQ home o termini.
- Il servizio di evasione Admin è «Manuale» con `trackingSupport: false`.
- Non risultano query Admin sulle notifiche email (template di conferma spedizione non interrogabili con gli scope disponibili).

Non affermare che il tracking parte in automatico.

### 5. Si spedisce all’estero o solo in Italia?

**Solo Italia, dalle impostazioni di consegna.**

- `shop.shipsToCountries`: `["IT"]`.
- `shop.countriesInShippingZones`: `countryCodes: ["IT"]`, `includeRestOfWorld: false`.
- Unica zona del profilo: «Italia».
- Pagina Spedizioni: «Spediamo da Cento (Ferrara). **In Italia** la spedizione è…». Titolo SEO della pagina: «Spedizioni in Italia da 50 €».
- Nessuna informativa di spedizione internazionale.

Costi, per completezza (non chiesti al punto 5 ma utili e coerenti):

- Express 0,00 EUR se totale ordine ≥ 50,00 EUR.
- Express 5,90 EUR senza soglia (si applica sotto i 50 €).
- Fonte Admin: stesso `deliveryProfiles`. Allineato alla pagina Spedizioni e, come ordine di grandezza, alle note già in `bundle-v411/analisi.md` e `finanza/raw/shipping_rates.json` (lettura del 17 novembre 2026).
- Ritiro in negozio: vedi contraddizione n. 4. In Admin il ritiro è attivo, tempo dichiarato `FOUR_HOURS`, istruzioni vuote; location Via Marcello Provenzali 1, 44042 Cento FE.

---

## ORDINI E PAGAMENTI

### 6. Metodi di pagamento attivi

**Elenco Admin completo dei gateway (carte, PayPal, Satispay, Klarna, contrassegno, bonifico) non disponibile: `shopifyPaymentsAccount` è inaccessibile (manca lo scope). Quello che si può verificare:**

- Admin `shop.paymentSettings.supportedDigitalWallets`: **SHOPIFY_PAY, APPLE_PAY, GOOGLE_PAY**.
- Icone nel footer del sito pubblico (stesse su home, Spedizioni, Pietre e rituali, ecc.): **American Express, Apple Pay, Google Pay, Maestro, Mastercard, PayPal, Shop Pay, Visa**.
- **non trovato** in footer, informative o query disponibili: Satispay, Klarna, Scalapay, contrassegno, bonifico.

Le icone del footer, in un tema Shopify, di solito riflettono i metodi abilitati in cassa, ma non sostituiscono un elenco Admin. Per una formula in FAQ conviene citare i wallet confermati in Admin più carte/PayPal come «indicati in fondo al sito», e non dare per certi metodi assenti dalle fonti.

Valuta: solo EUR (`enabledPresentmentCurrencies: ["EUR"]`).

### 7. Serve un account per ordinare, o c’è il checkout ospite?

**Checkout ospite disponibile: l’account non è obbligatorio.**

- `shop.customerAccounts`: `OPTIONAL`.
- `shop.customerAccountsV2`: versione `NEW_CUSTOMER_ACCOUNTS`; `loginRequiredAtCheckout: false`; `loginLinksVisibleOnStorefrontAndCheckout: true`; URL account `https://account.benesserezen.shop`.

### 8. Si può modificare o annullare un ordine dopo averlo fatto? Con quali modalità?

**non trovato** un procedimento per il cliente (tempi, canale, cosa si può cambiare).

- [Termini e condizioni](https://benesserezen.shop/policies/terms-of-service) (SEZIONE 6): è il negozio che può limitare, modificare o annullare un ordine e tentare di avvisare il cliente. Non è una guida per il cliente che vuole annullare.
- Reso dopo la ricezione: sì, secondo l’informativa rimborsi / pagina Spedizioni (14 giorni, condizioni, email info@benesserezen.shop).
- FAQ home: invita solo a «contattarci» per i resi, senza parlare di modifica o annullamento pre-spedizione.

### 9. Viene emessa fattura o ricevuta, e si può chiedere la fattura con P. IVA?

**non trovato** un testo su emissione fattura al cliente o fattura con partita IVA del destinatario.

- L’informativa rimborsi e la pagina Spedizioni chiedono «la ricevuta o una prova d’acquisto» per il reso. Non dicono se viene emessa fattura in automatico.
- È pubblicata la **P. IVA del venditore**, non una procedura per la P. IVA del cliente: «Benessere Zen di Balboni Simona, P. IVA 02091600383» su [Spedizioni](https://benesserezen.shop/pages/spedizioni), [Il negozio](https://benesserezen.shop/pages/il-negozio) e policy Contatti (`shop.shopPolicies`, tipo `CONTACT_INFORMATION`).

### 10. Codici sconto o newsletter con sconto di benvenuto attivi?

**Due sconti attivi confermati in Admin. Lo sconto del 10% per i nuovi clienti è automatico (non è un codice newsletter). RITUALE15 è un codice, non è in evidenza in home.**

Query: `discountNodes(first: 50, query: "status:active")`. Solo questi due nodi attivi.

**RITUALE15** (`DiscountCodeBasic`, id `gid://shopify/DiscountCodeNode/1779125125458`)

- Stato: ACTIVE. Codice: `RITUALE15`.
- 15% sull’intero ordine (`percentage: 0.15`). Nessun minimo. Nessuna scadenza (`endsAt: null`). Nessun limite di utilizzi totali. `appliesOncePerCustomer: false`.
- Inizio: 9 agosto 2025, 10:45 (Europe/Rome) (`startsAt: 2025-08-09T08:45:51Z`).
- Si combina con sconti ordine e spedizione; **non** con sconti prodotto.
- Destinatari: tutti (`DiscountBuyerSelectionAll`).
- `asyncUsageCount`: 0 al momento della lettura.
- Non compare in home (nessuna occorrenza di «RITUALE» nella home pubblica del 17 novembre 2026).

**WELCOME10** (`DiscountAutomaticBasic`, id `gid://shopify/DiscountAutomaticNode/1787820573010`)

- Stato: ACTIVE. Automatico, senza codice da inserire.
- 10% sull’intero ordine (`percentage: 0.1`). Nessun minimo. Nessuna scadenza.
- Inizio: 27 settembre 2025, 17:51 (Europe/Rome) (`startsAt: 2025-09-27T15:51:22Z`).
- Valido per il segmento **«Clienti che non hanno effettuato acquisti»** (`number_of_orders = 0`).
- `recurringCycleLimit: 1`. Si combina solo con sconti spedizione; **non** con sconti ordine o prodotto.
- `asyncUsageCount`: 140 al momento della lettura.
- In home, sezione ticker `d557b959-57cb-476f-adb6-18808587f120` in `templates/index.json`: testo «10% DI SCONTO PER I NUOVI CLIENTI». È un messaggio promozionale allineato a WELCOME10, **non** un form newsletter e **non** un codice da copiare.

**Newsletter con sconto di iscrizione:** **non trovato** sulla home live. In `templates/index.json` non c’è una sezione newsletter tra quelle in `order`. Esiste il file di tema `sections/newsletter.liquid`, ma non risulta usato in home. Nessun testo del tipo «iscriviti e ricevi un codice».

---

## REGALI

### 11. Confezione regalo o opzione regalo al checkout (biglietto, messaggio, prezzo nascosto)? Costa qualcosa?

**Opzione visibile e attiva al checkout/carrello: non trovata sulla pagina pubblica del carrello (vuota) e non documentata nelle policy.**

Dettaglio tecnico, da non trasformare in promessa in FAQ senza un controllo in un carrello con prodotti:

- Nel tema Eurus esiste `snippets/gift-wrapping.liquid`: la spunta compare solo se è impostato e disponibile `settings.gift_wrapping_product`.
- `templates/cart.json` del tema live non ha un blocco «regalo»; footer carrello = subtotale + pulsanti.
- [https://benesserezen.shop/cart](https://benesserezen.shop/cart) (carrello vuoto, 17 novembre 2026): nessun testo su confezione, biglietto, messaggio o prezzo nascosto.
- Esiste anche `snippets/gift-card-recipient.liquid` (form destinatario **della gift card prodotto**, inutile se non si vendono gift card: vedi punto 12).
- Un’opzione nativa di checkout Shopify («invia come regalo», nascondi prezzi) **non risulta** dalle query e pagine consultate.
- «Confezione Regalo» compare come parte del titolo di qualche prodotto (es. set candele votive), non come servizio di checkout.

### 12. Gift card attive?

**In vendita sul catalogo: no. Prodotti gift card: nessuno.**

- Query `products(first: 20, query: "gift_card:true")`: 0 nodi.
- `shop.features.giftCards`: `true` (il piano *può* supportare le gift card; non significa che se ne vendano).
- `giftCardConfiguration` / `giftCards` / `giftCardsCount`: accesso negato (`read_gift_cards`). Non è stato possibile verificare gift card emesse a mano.
- In tema esiste `templates/gift_card.liquid` e `templates/page.gift-card.whiff.json` (template di tema, non un prodotto in vendita).

### 13. Il reso vale anche per chi riceve un regalo?

**non trovato** un testo specifico per chi riceve un regalo.

- L’[informativa sui rimborsi](https://benesserezen.shop/policies/refund-policy) e la pagina Spedizioni valgono in generale: 14 giorni dalla ricezione, prodotto nelle condizioni di arrivo, non indossato né usato, cartellini e imballo originale, **ricevuta o prova d’acquisto**, richiesta a info@benesserezen.shop.
- Non nominano il destinatario di un regalo, né un’eccezione, né una procedura alternativa (manca anche un’opzione «nascondi prezzi»).
- Non affermare che il reso «vale comunque» per chi riceve un dono: la prova d’acquisto è richiesta e non è detto come ottenerla in quel caso.

---

## PIETRE E GIOIELLI

### 14. Misure dei bracciali elastici: circonferenza standard (es. 17-18 cm)? Si possono chiedere su misura?

**Non risulta una circonferenza standard 17-18 cm, né un servizio «su misura» per i bracciali elastici.** Le schede usano formulazioni diverse:

Query live: `products` con `product_type:Bracciali` (due pagine, 17 novembre 2026), incrociata con schede pubbliche (es. [braccialetto occhio di tigre](https://benesserezen.shop/products/mala-braccialetto-elastico-con-pietra-occhio-di-tigre-coraggio-iniziativa)).

Formule ricorrenti sulle schede:

- «**Misura bracciale circa 6 cm (elastico)**» — la più frequente su molti modelli.
- «**Misura bracciale circa 7 cm (elastico)**» (a volte «± 7 cm», «Circa 7 cm», «**Misura Ø 7 cm (elastico)**», «**Circa 7 cm di diametro**»).
- Altri: «Taglia Unica, elastico adattabile»; «Taglia Unica – elastico resistente»; «Misura bracciale Elastico (taglia unica)»; diametro delle **pietre/perle** spesso «circa 8 mm» / «0,8 cm» (non è la misura del bracciale).

«6 cm» / «7 cm» in almeno un caso è esplicitamente un **diametro** (Ø), non una circonferenza da 17-18 cm. Non convertire in circonferenza in FAQ se le schede non lo fanno.

**Su misura:** **non trovato** come servizio su richiesta. L’unica occorrenza vicina è copy di un bracciale in rame magnetico regolabile («Comfort e vestibilità su misura: struttura in rame flessibile e regolabile…»), cioè vestibilità regolabile del pezzo, non un ordine su misura. I bracciali elastici sono in pratica taglia unica / elastici.

### 15. Le pietre sono naturali? C’è scritto se alcune sono trattate o ricostruite (es. turchese, howlite tinta)?

**Molte schede di pietre e gioielli dicono «pietra naturale» / «pietre naturali». Non risulta alcuna menzione di howlite tinta, turchese ricostruito o pietre trattate/ricostruite.**

- Esempio live: [Howlite](https://benesserezen.shop/products/howlite) — title/SEO «Howlite, pietra naturale…»; nel body visibile non compaiono «tinta», «trattata», «ricostruita».
- Ricerca sui body del catalogo (snapshot pubblico in `store-v47/products-public.json`, confermata a campione sulle schede live): nessun hit utile su howlite/turchese + tinta/ricostruita/trattata. I rari «tinta» / «trattate» / «pressed» appartengono a **cosmetici**, non alle pietre. «Stabilizzatore energetico» su un’agata è wording simbolico, non una dichiarazione di trattamento.
- La FAQ home «I vostri prodotti sono davvero naturali?» parla di **ingredienti** e cosmetici (parabeni, siliconi, ayurveda): vedi contraddizione n. 5. Non usarla come garanzia su tutto il catalogo.

### 16. Nelle schede o sul sito c’è un’istruzione su come purificare o ricaricare le pietre (luna, selenite, acqua)?

**Non c’è una guida generale di sito (pagina, FAQ o policy) su come purificare o ricaricare le pietre.**

Pagine controllate:

- FAQ home: nessuna domanda su purificazione/ricarica.
- [Pietre e rituali](https://benesserezen.shop/pages/pietre-e-rituali): body Admin vuoto; in vetrina restano soprattutto elementi di tema («Media heading»), senza istruzioni.
- [Cura di sé](https://benesserezen.shop/pages/cura-di-se): body Admin vuoto.
- Nessuna pagina dedicata a «cura delle pietre».

Quello che esiste è **copy di singoli prodotti**, in particolare i piatti/ciotole di ricarica in selenite. Esempio live, [Piatto di ricarica in selenite - 10 cm | Fasi lunari](https://benesserezen.shop/products/piatto-di-ricarica-in-selenite-10-cm-fase-lunare): si usa per «ricaricare e rigenerare» pietre e gioielli; modalità d’uso: posare la piastra su una superficie stabile, metterci sopra cristalli o bracciali, lasciarli «alcune ore, preferibilmente durante la notte»; «Non richiede pulizia energetica: la Selenite è una pietra autopulente»; avvertenza: evitare acqua e sole, pulire con panno asciutto. Testi simili su altri piatti/ciotole in selenite.

Non risulta una istruzione generalizzata del tipo «metti le pietre sotto la luna piena» o «usa acqua corrente» come regola di store. Non trasformare le schede selenite in un metodo ufficiale per tutte le pietre.

### 17. I mala: quanti grani (108?) e c’è un’istruzione di cura specifica?

**I mala attivi in catalogo sono tutti da 108 grani. Istruzione di cura specifica: non trovata.**

Query live: `products(first: 50, query: "title:mala OR product_type:Mala")`. Sette prodotti attivi, tipo «Mala», titolo e descrizione «Mala tradizionale da 108 grani» (Onice Nero, Ametista, Ametista/Avventurina/Cristallo di Rocca + Om, Diaspro Rosso, Cristallo di Rocca, Diaspro Giallo/Occhio di Tigre/Quarzo Fumé, Palo Santo). Esempi di handle: `mala-108-perle-onice-nero-qualita-aa`, `mala-ametista-108-perle`, ecc.

Nelle descrizioni: diametro perla spesso «circa 0,8 cm», peso a volte 67 g, nota su variazioni di lavorazione. **Nessuna** istruzione di cura, pulizia, conservazione o uso rituale specifica dei mala (oltre al wording generico su meditazione/presenza). Ricerca «cura del mala» / «come si pulisce» nei body: 0 risultati.

---

## Fonti consultate (riepilogo)

- Admin GraphQL (sola lettura, dopo `graphql_schema`): `shop` (policy, account cliente, wallet, paesi, fulfillment, `features.giftCards`), `deliveryProfiles`, `locations` / `localPickupSettingsV2`, `discountNodes`, `pages`, `products`, `themes` / `theme.files` del tema MAIN Eurus 174615658834.
- Pagine pubbliche: [home](https://benesserezen.shop/), [Spedizioni](https://benesserezen.shop/pages/spedizioni), [Il negozio](https://benesserezen.shop/pages/il-negozio), [informativa rimborsi](https://benesserezen.shop/policies/refund-policy), [privacy](https://benesserezen.shop/policies/privacy-policy), [termini](https://benesserezen.shop/policies/terms-of-service), [Pietre e rituali](https://benesserezen.shop/pages/pietre-e-rituali), carrello, schede campione (howlite, bracciale occhio di tigre, piatto selenite). `/policies/shipping-policy` = 404.
- Pagine CMS in sitemap: contact, le-nostre-collezioni, chi-siamo, cose-layurveda, il-negozio, spedizioni, pietre-e-rituali, cura-di-se. Non esiste una pagina FAQ a parte la sezione in home.
- Note interne già presenti (solo di controllo, non usate come fonte primaria): `bundle-v411/analisi.md`, `finanza/raw/shipping_rates.json`.

Query o campi **non accessibili** (quindi non usati come prova): `shopifyPaymentsAccount`, `giftCardConfiguration`, `giftCards` / `giftCardsCount`, template delle email transazionali.
