# FAQ home, round 4 (Copywriter, 18/11/2026)

13 domande in 3 tab. Negozio fisico, ritiro e orari sono esclusi perché stanno nel blocco «Anche a Cento».
Tutti i fatti vengono da `copy/faq-r4-fatti.md` (Benessere Zen, lettura dello store il 17/11/2026). Il numero tra parentesi è il punto di quel file.
Le domande con un fatto non confermato sono fuori. L'elenco è in fondo.

---

## Tab 1 · Spedizione e resi

**Quanto costa la spedizione?**
La spedizione Express costa 5,90 €, ed è gratuita da 50 € di spesa.
*Fonte:* Admin `deliveryProfiles`: Express 5,90 € e Express 0 € con totale ≥ 50 € (punto 5). Anche la pagina Spedizioni dice «da 50 €». La barra in home e la vecchia FAQ dicono «superiori a 50 €»: vale il checkout, quindi «da 50 €».

**Spedite anche all'estero?**
No, spediamo solo in Italia.
*Fonte:* `shop.shipsToCountries` = IT, nessun resto del mondo; pagina Spedizioni (punto 5).

**In Sicilia e Sardegna costa di più?**
No, il prezzo è lo stesso in tutta Italia, isole comprese.
*Fonte:* zona unica «Italia» con le province siciliane e sarde, nessun supplemento (punto 3). Nota: confermato solo il prezzo, non i tempi.

**Posso restituire un acquisto?**
Sì, entro 14 giorni dalla ricezione, con il pezzo non usato e nel suo imballo originale. Scrivi a info@benesserezen.shop: se il reso è accettato ti mandiamo noi l'etichetta, e il rimborso arriva entro 10 giorni lavorativi.
*Fonte:* [informativa sui rimborsi](https://benesserezen.shop/policies/refund-policy) e pagina Spedizioni (punto 13, contraddizione 3). I «5 giorni» delle schede prodotto non vanno ripresi.

---

## Tab 2 · Ordini e regali

**Come posso pagare?**
Con carta (Visa, Mastercard, Maestro, American Express), PayPal, Apple Pay, Google Pay e Shop Pay.
*Fonte:* Admin `supportedDigitalWallets` = Shop Pay, Apple Pay, Google Pay; carte e PayPal dalle icone del footer del sito (punto 6). L'elenco completo dei gateway non è leggibile in Admin. Se Michael vuole la certezza al 100%, gli basta un'occhiata in Impostazioni > Pagamenti.

**Devo creare un account per ordinare?**
No, puoi ordinare anche senza registrarti.
*Fonte:* `customerAccounts` OPTIONAL, `loginRequiredAtCheckout: false` (punto 7).

**C'è uno sconto sul primo ordine?**
Sì, il 10% sul primo acquisto. Si applica da solo, non serve nessun codice.
*Fonte:* sconto automatico WELCOME10, clienti senza ordini, nessuna scadenza, combinabile solo con sconti di spedizione (punto 10). RITUALE15 non è in home e non lo cito: se Michael lo vuole pubblico, decide lui.

**In cosa posso regalare un gioiello?**
Nelle nostre scatole porta gioielli: in velluto a 18,50 €, in legno e pietra a 29,90 €.
*Fonte:* collezione [Scatole porta gioielli](https://benesserezen.shop/collections/scatole-porta-gioielli) (verifica-fatti v4.11b, punto 5). Se i prezzi cambiano, si può togliere la seconda parte e linkare la collezione.

---

## Tab 3 · Le pietre

**Ricevo la pietra della foto?**
Ricevi la stessa pietra, nella stessa misura. La natura però non fa copie: forma e venature cambiano da un pezzo all'altro.
*Fonte:* prodotti venduti in serie (testo già approvato in v4.11c).

**Le pietre hanno effetti sulla salute?**
No. I significati che leggi qui vengono dalla tradizione e non sostituiscono il parere di un medico.
*Fonte:* regola di conformità del sito; stessa frase della nota «tradition-note» già nel mockup.

**Che misura hanno i bracciali?**
Sono elastici, in taglia unica. Il diametro, circa 6 o 7 cm, lo trovi nella scheda del bracciale.
*Fonte:* schede `product_type:Bracciali` con «Misura bracciale circa 6 cm / 7 cm (elastico)», «Ø 7 cm», «Taglia unica» (punto 14). Non è una circonferenza: niente 17-18 cm.

**Quanti grani ha un mala?**
I nostri mala hanno tutti 108 grani, come vuole la tradizione.
*Fonte:* i 7 mala attivi sono «Mala tradizionale da 108 grani» (punto 17). Se entra un mala diverso, la frase va rivista.

**Come pulisco pietre e bracciali?**
Con un panno morbido e asciutto. Tienili lontani dall'acqua, dal calore e dai prodotti chimici.
*Fonte:* avvertenze delle schede dei bracciali in pietra e dei piatti in selenite (verifica-fatti v4.11b, punto 8). È un consiglio prudente, non un'istruzione pubblicata per ogni pietra. Sostituisce la vecchia risposta con «profumi e creme», che non stava nelle fonti.

---

## Lasciate fuori (fatto non confermato)

- **Quanto ci mette ad arrivare?** Le «24 ore + 1-3 giorni lavorativi» stanno solo nella FAQ della home live, non nella pagina Spedizioni né nelle impostazioni (punto 1). Se Michael li conferma, la risposta è pronta: «Prepariamo l'ordine entro 24 ore e di solito arriva in 1-3 giorni lavorativi.»
- **Con che corriere spedite? Ricevo il tracking?** Non trovato (punti 2 e 4).
- **Posso modificare o annullare un ordine?** Non trovato (punto 8).
- **Posso avere la fattura?** Non trovato (punto 9).
- **Fate la confezione regalo? Avete buoni regalo?** Non trovati, nessuna gift card in catalogo (punti 11 e 12).
- **Chi riceve un regalo può fare il reso?** Non trovato, e serve la prova d'acquisto (punto 13).
- **Le pietre sono naturali o trattate?** Molte schede dicono «pietra naturale», ma non c'è una dichiarazione per tutto il catalogo (punto 15).
- **Come purifico o ricarico le pietre?** Non c'è una guida del negozio, solo le schede selenite (punto 16).

## Per il Designer

Nel codice la costante `faqs` è un array di tab. Ordine dei tab: Spedizione e resi, Ordini e regali, Le pietre. Le etichette dei filtri vanno cambiate di conseguenza.
Una cosa da allineare fuori dalle FAQ: la barra in home dice «superiori a 50 €», il checkout applica «da 50 €».
