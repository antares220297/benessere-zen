/* Checkout Rituale — un solo passo, verticale, contemplativo */

function Checkout() {
  const [step, setStep] = React.useState(0);
  const c = CHAKRAS[6]; // Sahasrara theme

  const items = [
    { chakra: CHAKRAS[6], name: 'Ametista Drusa', size: 'M · 420g', price: 148, intent: 'fiducia' },
    { chakra: CHAKRAS[6], name: 'Palo Santo Sacro', size: '6 bastoncini', price: 18 },
    { chakra: CHAKRAS[3], name: 'Tè Lavanda · Camomilla', size: '60g', price: 16 },
  ];
  const sub = items.reduce((s, it) => s + it.price, 0);
  const ship = sub > 49 ? 0 : 6;
  const total = sub + ship;

  return (
    <div className="bz-root grain" style={{ minHeight: '100%', position: 'relative' }}>
      {/* Ambient background */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
        <div style={{
          position: 'absolute', left: '70%', top: '10%',
          width: 800, height: 800, transform: 'translate(-50%,-50%)',
          background: `radial-gradient(circle, ${c.hex}1c, transparent 60%)`,
          filter: 'blur(60px)',
        }}/>
      </div>

      {/* Top bar */}
      <div style={{ position: 'relative', zIndex: 2, padding: '20px 48px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--hairline-soft)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <svg width="24" height="24" viewBox="0 0 32 32">
            <circle cx="16" cy="16" r="14" fill="none" stroke="var(--gold)" strokeWidth="0.5"/>
            <circle cx="16" cy="16" r="2" fill="var(--gold)"/>
          </svg>
          <span style={{ fontFamily: 'var(--f-display)', fontStyle: 'italic', fontSize: 18 }}>Benessere Zen</span>
          <span style={{ color: 'var(--ink-whisper)', margin: '0 14px' }}>/</span>
          <span className="label" style={{ color: 'var(--gold)' }}>Composizione del rituale</span>
        </div>
        <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
          {['Carrello','Indirizzo','Pagamento','Conferma'].map((t, i) => (
            <div key={t} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{
                width: 24, height: 24, borderRadius: '50%',
                border: i <= step ? `1px solid ${c.hex}` : '1px solid var(--hairline-soft)',
                background: i < step ? c.hex : 'transparent',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: i < step ? 'var(--bg-void)' : i === step ? c.hex : 'var(--ink-whisper)',
                fontFamily: 'var(--f-label)', fontSize: 9, letterSpacing: '0.1em',
              }}>{i < step ? '✓' : `0${i+1}`}</div>
              <span className="label-ink" style={{ color: i === step ? c.hex : (i < step ? 'var(--ink-mute)' : 'var(--ink-whisper)') }}>{t}</span>
              {i < 3 && <div style={{ width: 28, height: 1, background: i < step ? c.hex : 'var(--hairline-soft)' }}/>}
            </div>
          ))}
        </div>
      </div>

      <div style={{ position: 'relative', zIndex: 2, display: 'grid', gridTemplateColumns: '1.3fr 0.9fr', minHeight: 'calc(100% - 73px)' }}>
        {/* Left — form */}
        <div style={{ padding: '60px 48px 60px 80px', borderRight: '1px solid var(--hairline-soft)' }}>
          <div className="label">Capitolo {String(step+1).padStart(2,'0')} · {['Carrello','Indirizzo','Pagamento','Conferma'][step]}</div>
          <h1 style={{ fontSize: 72, lineHeight: 0.95, marginTop: 20, letterSpacing: '-0.02em' }}>
            {step === 0 && <>Tre oggetti, un<br/><span className="foil">rituale</span>.</>}
            {step === 1 && <>Dove ti<br/>raggiungerà?</>}
            {step === 2 && <>L'ultimo<br/><span className="foil">respiro</span>.</>}
            {step === 3 && <>È <span className="foil">partito</span>.</>}
          </h1>

          {step === 0 && (
            <div style={{ marginTop: 56 }}>
              {items.map((it, i) => (
                <div key={i} style={{ display: 'grid', gridTemplateColumns: '120px 1fr 100px 100px', gap: 24, alignItems: 'center', padding: '24px 0', borderTop: '1px solid var(--hairline-soft)' }}>
                  <div className="ph" style={{ aspectRatio: '1/1', position: 'relative' }} data-tag={`${i+1}`}>
                    <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(circle, ${it.chakra.hex}33, transparent 65%)` }}/>
                  </div>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div style={{ width: 6, height: 6, borderRadius: '50%', background: it.chakra.hex }}/>
                      <span className="label" style={{ color: it.chakra.hex, fontSize: 8 }}>0{it.chakra.n} · {it.chakra.it}</span>
                    </div>
                    <div style={{ fontFamily: 'var(--f-display)', fontStyle: 'italic', fontSize: 28, marginTop: 6 }}>{it.name}</div>
                    <div className="label-ink" style={{ marginTop: 4 }}>{it.size}</div>
                    {it.intent && (
                      <div style={{ marginTop: 10, padding: '6px 10px', display: 'inline-block', border: `1px dashed ${it.chakra.hex}55` }}>
                        <span className="label-ink" style={{ color: it.chakra.hex, fontSize: 8 }}>Intenzione incisa</span>
                        <span style={{ fontFamily: 'var(--f-display)', fontStyle: 'italic', fontSize: 14, marginLeft: 8 }}>« {it.intent} »</span>
                      </div>
                    )}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, justifyContent: 'center', border: '1px solid var(--hairline)', padding: '8px 0' }}>
                    <button style={{ background: 'transparent', border: 0, color: 'var(--ink-mute)', cursor: 'pointer' }}>−</button>
                    <span style={{ fontFamily: 'var(--f-display)', fontStyle: 'italic', fontSize: 18 }}>1</span>
                    <button style={{ background: 'transparent', border: 0, color: 'var(--ink-mute)', cursor: 'pointer' }}>+</button>
                  </div>
                  <div style={{ fontFamily: 'var(--f-display)', fontStyle: 'italic', fontSize: 26, color: 'var(--gold)', textAlign: 'right' }}>€{it.price}</div>
                </div>
              ))}

              {/* Add a small companion */}
              <div style={{ marginTop: 32, padding: 20, border: `1px solid ${c.hex}55`, background: 'rgba(155,89,182,0.04)' }}>
                <div className="label" style={{ color: c.hex }}>◦ Aggiunta consigliata</div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 12 }}>
                  <div>
                    <div style={{ fontFamily: 'var(--f-display)', fontStyle: 'italic', fontSize: 22 }}>Librettino del rituale 21 giorni</div>
                    <div className="label-ink" style={{ marginTop: 4 }}>Stampa rilegata a mano · 32 pagine</div>
                  </div>
                  <button style={{
                    padding: '12px 18px', background: 'transparent', border: `1px solid ${c.hex}`, color: c.hex,
                    fontFamily: 'var(--f-label)', fontSize: 10, letterSpacing: '0.28em', textTransform: 'uppercase', cursor: 'pointer',
                  }}>+ Aggiungi · €14</button>
                </div>
              </div>
            </div>
          )}

          {step === 1 && (
            <div style={{ marginTop: 48, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18 }}>
              {[
                ['email','Email','la-tua-anima@dominio.it', 2],
                ['nome','Nome','Giulia', 1],
                ['cognome','Cognome','Marini', 1],
                ['via','Indirizzo','Via Tortona 31', 2],
                ['cap','CAP','20144', 1],
                ['citta','Città','Milano', 1],
                ['note','Una nota per chi prepara il pacco','(opzionale) — un dettaglio, un\'occasione, una dedica…', 2],
              ].map(([k, l, ph, span]) => (
                <label key={k} style={{ display: 'block', gridColumn: `span ${span}` }}>
                  <span className="label-ink">{l}</span>
                  <input placeholder={ph} style={{
                    display: 'block', width: '100%', marginTop: 8, padding: '14px 0',
                    background: 'transparent', border: 0, borderBottom: '1px solid var(--hairline)',
                    color: 'var(--ink)', fontFamily: 'var(--f-display)', fontStyle: 'italic', fontSize: 22, outline: 'none',
                  }}/>
                </label>
              ))}
            </div>
          )}

          {step === 2 && (
            <div style={{ marginTop: 48 }}>
              <div className="label-ink">Metodo di pagamento</div>
              <div style={{ marginTop: 14, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10 }}>
                {['Carta','Apple Pay','PayPal','Bonifico'].map((m, i) => (
                  <div key={m} style={{
                    padding: 18, border: i === 0 ? `1px solid ${c.hex}` : '1px solid var(--hairline-soft)',
                    background: i === 0 ? 'rgba(155,89,182,0.04)' : 'var(--bg-deep)',
                    fontFamily: 'var(--f-display)', fontStyle: 'italic', fontSize: 18, textAlign: 'center',
                    color: i === 0 ? c.hex : 'var(--ink)',
                  }}>{m}</div>
                ))}
              </div>
              <div style={{ marginTop: 32, display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 18 }}>
                <label style={{ gridColumn: 'span 3' }}>
                  <span className="label-ink">Numero della carta</span>
                  <input placeholder="•••• •••• •••• ••••" style={{
                    display: 'block', width: '100%', marginTop: 8, padding: '14px 0',
                    background: 'transparent', border: 0, borderBottom: '1px solid var(--hairline)',
                    color: 'var(--ink)', fontFamily: 'var(--f-display)', fontStyle: 'italic', fontSize: 22, outline: 'none',
                  }}/>
                </label>
                <label>
                  <span className="label-ink">Scadenza</span>
                  <input placeholder="MM / AA" style={{
                    display: 'block', width: '100%', marginTop: 8, padding: '14px 0',
                    background: 'transparent', border: 0, borderBottom: '1px solid var(--hairline)',
                    color: 'var(--ink)', fontFamily: 'var(--f-display)', fontStyle: 'italic', fontSize: 22, outline: 'none',
                  }}/>
                </label>
                <label>
                  <span className="label-ink">CVC</span>
                  <input placeholder="•••" style={{
                    display: 'block', width: '100%', marginTop: 8, padding: '14px 0',
                    background: 'transparent', border: 0, borderBottom: '1px solid var(--hairline)',
                    color: 'var(--ink)', fontFamily: 'var(--f-display)', fontStyle: 'italic', fontSize: 22, outline: 'none',
                  }}/>
                </label>
                <label>
                  <span className="label-ink">Intestatario</span>
                  <input placeholder="Giulia Marini" style={{
                    display: 'block', width: '100%', marginTop: 8, padding: '14px 0',
                    background: 'transparent', border: 0, borderBottom: '1px solid var(--hairline)',
                    color: 'var(--ink)', fontFamily: 'var(--f-display)', fontStyle: 'italic', fontSize: 22, outline: 'none',
                  }}/>
                </label>
              </div>
            </div>
          )}

          {step === 3 && (
            <div style={{ marginTop: 48 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
                <div style={{ width: 80, height: 80, borderRadius: '50%', border: `1px solid ${c.hex}`, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                  <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: `${c.hex}22`, filter: 'blur(20px)' }}/>
                  <ChakraGlyph chakra={c} size={48}/>
                </div>
                <div>
                  <div className="label" style={{ color: c.hex }}>Ordine BZ-2026-04812</div>
                  <div style={{ fontFamily: 'var(--f-display)', fontStyle: 'italic', fontSize: 28, marginTop: 6 }}>Grazie, Giulia.</div>
                </div>
              </div>
              <p style={{ fontFamily: 'var(--f-display)', fontStyle: 'italic', fontSize: 22, lineHeight: 1.5, marginTop: 36, maxWidth: 620 }}>
                Il tuo rituale viene preparato a mano nelle prossime ore. L'ametista verrà programmata
                durante la prossima notte di luna piena (mercoledì) prima della spedizione.
                Riceverai una mail con il librettino digitale entro un'ora.
              </p>
              <div style={{ marginTop: 36, display: 'flex', gap: 14 }}>
                <button className="btn-gold">Scarica il librettino</button>
                <button className="btn-ghost">Continua a esplorare</button>
              </div>
            </div>
          )}

          {/* Nav */}
          {step < 3 && (
            <div style={{ marginTop: 64, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <button onClick={() => setStep(Math.max(0, step-1))} className="label-ink" style={{ background: 'transparent', border: 0, cursor: 'pointer', color: step === 0 ? 'var(--ink-whisper)' : 'var(--ink-mute)' }}>
                ← Indietro
              </button>
              <button onClick={() => setStep(step+1)} style={{
                padding: '18px 36px', background: c.hex, border: 0, color: 'var(--bg-void)',
                fontFamily: 'var(--f-label)', fontSize: 11, letterSpacing: '0.3em', textTransform: 'uppercase', cursor: 'pointer',
              }}>
                {step === 0 && 'Procedi · €' + total}
                {step === 1 && 'Vai al pagamento'}
                {step === 2 && 'Conferma e completa · €' + total}
              </button>
            </div>
          )}
        </div>

        {/* Right — sticky summary */}
        <div style={{ padding: '60px 80px 60px 48px', background: 'var(--bg-deep)', position: 'relative' }}>
          <div className="label">Sommario · Rituale</div>
          <div style={{ marginTop: 24, padding: '24px 0', borderTop: '1px solid var(--hairline-soft)' }}>
            {items.map((it, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0' }}>
                <div>
                  <div style={{ fontFamily: 'var(--f-display)', fontStyle: 'italic', fontSize: 16 }}>{it.name}</div>
                  <div className="label-ink" style={{ marginTop: 2 }}>{it.size}</div>
                </div>
                <div style={{ fontFamily: 'var(--f-display)', fontStyle: 'italic', fontSize: 18, color: 'var(--gold)' }}>€{it.price}</div>
              </div>
            ))}
          </div>
          <div style={{ borderTop: '1px solid var(--hairline-soft)', paddingTop: 20 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0' }}>
              <span className="label-ink">Subtotale</span>
              <span style={{ fontFamily: 'var(--f-display)', fontStyle: 'italic', fontSize: 16 }}>€{sub}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0' }}>
              <span className="label-ink">Spedizione rituale (48h)</span>
              <span style={{ fontFamily: 'var(--f-display)', fontStyle: 'italic', fontSize: 16, color: ship === 0 ? c.hex : 'var(--ink)' }}>{ship === 0 ? 'Gratuita' : '€' + ship}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0' }}>
              <span className="label-ink">Programmazione cristallo</span>
              <span style={{ fontFamily: 'var(--f-display)', fontStyle: 'italic', fontSize: 16, color: c.hex }}>Inclusa</span>
            </div>
          </div>
          <div style={{ marginTop: 16, paddingTop: 20, borderTop: `1px solid ${c.hex}`, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
            <span className="label" style={{ color: c.hex }}>Totale</span>
            <span style={{ fontFamily: 'var(--f-display)', fontStyle: 'italic', fontSize: 56, color: 'var(--gold)', lineHeight: 1 }}>€{total}</span>
          </div>

          {/* Promise */}
          <div style={{ marginTop: 48, padding: 20, border: '1px solid var(--hairline-soft)' }}>
            <div className="label" style={{ color: 'var(--gold)' }}>◦ La promessa</div>
            <p style={{ color: 'var(--ink-mute)', fontSize: 12, lineHeight: 1.7, marginTop: 8 }}>
              Ogni pacco viene preparato a mano nel nostro atelier di Milano. La pietra arriva pulita,
              programmata, accompagnata dal librettino del rituale e dal cartoncino con la tua intenzione.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

window.Checkout = Checkout;
