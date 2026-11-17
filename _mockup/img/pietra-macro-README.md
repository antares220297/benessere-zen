# Macro delle pietre per «Scegli la tua pietra» (#stones, home v4.11c, 17/11/2026)

**Fonte: fotografie vere di Wikimedia Commons, nessuna immagine generata.** Le macro generate non potevano essere copiate sul box, e per questo il Designer ha scelto foto reali. In foto-mamma non c'era nessuna macro utilizzabile: le card-pietra sono ritagli di 190-300 px e l'originale #04 ha i cartellini dei prezzi. Le foto del catalogo hanno un fondo pastello, che Michael ha escluso.

**Pipeline:** ho scaricato l'originale da upload.wikimedia.org con curl e uno User-Agent descrittivo, in `/workspace/macro/in/orig-<nome>.jpg`. Poi ho ritagliato a 3:4 (le coordinate sono in `crops.json`, in pixel della sorgente: x, y, altezza) e portato tutto a 1200 × 1600 con Lanczos, JPEG q90. Non ho aggiunto grana né upscale AI, e nessuna foto è stata ingrandita oltre 1,3×.

**Licenze:** solo l'ametista è CC0. **Le altre 7 sono CC BY o CC BY-SA: attribuzione richiesta in produzione, o sostituire con foto scattate in negozio.** Per le CC BY-SA, se si pubblica l'immagine modificata (il ritaglio), il derivato va rilasciato con la stessa licenza.

| Pietra | File | Titolo su Commons | Autore | Licenza | Ritaglio / scala | Giudizio |
|---|---|---|---|---|---|---|
| Quarzo rosa | pietra-macro-quarzo-rosa.jpg | [IMGP2025492 (51586040384).jpg](https://commons.wikimedia.org/wiki/File:IMGP2025492_(51586040384).jpg) | Jan Helebrant | CC BY-SA 2.0. **Attribuzione richiesta in produzione, o sostituire con foto scattate in negozio** | 2250×3000 da 4000×3000, 0,53× | vero e naturale: superficie grezza con fratture e piccole inclusioni nere. È chiaro, quindi serve il velo |
| Ametista | pietra-macro-ametista.jpg | [Amethyst crystals close.jpg](https://commons.wikimedia.org/wiki/File:Amethyst_crystals_close.jpg) | Lisa Ann Yount | CC0 | 1365×1820 da 2730×1820, 0,88× | ottimo: drusa a tutto campo, punte vere, nessun fondo |
| Ossidiana | pietra-macro-ossidiana.jpg | [Golden-sheen obsidian (Mexico) 25.jpg](https://commons.wikimedia.org/wiki/File:Golden-sheen_obsidian_(Mexico)_25.jpg) | James St. John | CC BY 2.0. **Attribuzione richiesta in produzione, o sostituire con foto scattate in negozio** | 2250×3000 da 4000×3000, 0,53× | vero; è ossidiana dorata (golden sheen), grigio-oro più che nero lucido. Frattura concoide credibile |
| Tormalina nera | pietra-macro-tormalina-nera.jpg | [Schorl tourmaline 5.jpg](https://commons.wikimedia.org/wiki/File:Schorl_tourmaline_5.jpg) | James St. John | CC BY 2.0. **Attribuzione richiesta in produzione, o sostituire con foto scattate in negozio** | 1200×1600 dentro il cristallo, 1,00× | ottimo: dentro il cristallo di sciorlo, striature e spigolo veri |
| Lapislazzuli | pietra-macro-lapislazzuli.jpg | [Lapis lazuli (lazuritic metamorphite) (Sar-e-Sang…) 4 (33761908008).jpg](https://commons.wikimedia.org/wiki/File:Lapis_lazuli_(lazuritic_metamorphite)_(Sar-e-Sang_Deposit,_Sakhi_Formation,_Precambrian,_2.4-2.7_Ga_(%3F);_Sar-e-Sang_Mining_District,_Hindu-Kush_Mountains,_Afghanistan)_4_(33761908008).jpg) | James St. John | CC BY 2.0. **Attribuzione richiesta in produzione, o sostituire con foto scattate in negozio** | 938×1250 da 2002×1394, **1,28×** (al limite) | vero, blu pieno con calcite e pirite. È il più morbido dei file perché ingrandito di 1,28× |
| Pirite | pietra-macro-pirite.jpg | [Pyrite (Huanzala Mine, Peru) 1 (18952108619).jpg](https://commons.wikimedia.org/wiki/File:Pyrite_(Huanzala_Mine,_Peru)_1_(18952108619).jpg) | James St. John | CC BY 2.0. **Attribuzione richiesta in produzione, o sostituire con foto scattate in negozio** | 1141×1521 da 2198×1821, 1,05× | ottimo: cubi striati veri; in alto si intravede il fondo scuro verde-petrolio dello studio |
| Cristallo di rocca | pietra-macro-cristallo-di-rocca.jpg | [Agregada de cuarzo.jpg](https://commons.wikimedia.org/wiki/File:Agregada_de_cuarzo.jpg) | Erisule | CC BY-SA 4.0. **Attribuzione richiesta in produzione, o sostituire con foto scattate in negozio** | intera 1200×1600, 1,00× | vero e trasparente; la sorgente è un JPEG molto compresso (130 kB), quindi il dettaglio è morbido |
| Occhio di tigre | pietra-macro-occhio-di-tigre.jpg | [Tiger's eye quartz 12.jpg](https://commons.wikimedia.org/wiki/File:Tiger%27s_eye_quartz_12.jpg) | James St. John | CC BY 2.0. **Attribuzione richiesta in produzione, o sostituire con foto scattate in negozio** | 1364×1819 da 3601×1819, 0,89× | ottimo: fibre ondulate e cangianza vere, a tutto campo |

**Candidati scartati (≥ 1200 px sul lato corto), in breve:**
- Quarzo rosa: IMGP2020003 (fondo bianco in alto), Rose quartz 10 (fondo grigio).
- Ametista: Amethyst (Uruguay) 1 e 7 (fondo e piedistallo), Alpenrose Lermoos (data stampata).
- Ossidiana: Golden-sheen 24 e 28 (più fondo).
- Tormalina: Tourmaline 8 (CC0, ma con feldspato arancio e fondo grigio), Schorl 10.
- Lapislazzuli: n. 37 e gneiss lazuritico (bordo bianco), Italian Mountain (lastra con fondo).
- Pirite: GeoDIL 936 (fondo blu), Pyrite 18858891699, Iron pyrite (la grana grigia sembra metallo).
- Cristallo di rocca: Fort Drum crystal (CC0, ma soprattutto matrice verde e sfocata), горный хрусталь (pezzo su nero).
- Occhio di tigre: Tiger's eye 7, 8, 10 (pezzi su fondo bianco).
