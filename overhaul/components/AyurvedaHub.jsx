/* Ayurveda macro hub — landing che esplora i 3 dosha + sotto-collezioni */

function AyurvedaHub() {
  const [dosha, setDosha] = React.useState('vata');

  const doshas = {
    vata: {
      name: 'Vāta', meaning: 'Aria + Etere', it: 'Movimento',
      hex: '#9B59B6', chakra: CHAKRAS[6],
      desc: 'Il principio del movimento. Governa respiro, pensiero, creatività. Quando sbilanciato: ansia, pelle secca, insonnia.',
      remedies: ['Oli caldi (sesamo)', 'Tisane speziate', 'Routine regolare', 'Meditazione guidata'],
    },
    pitta: {
      name: 'Pitta', meaning: 'Fuoco + Acqua', it: 'Trasformazione',
      hex: '#FF6B35', chakra: CHAKRAS[2],
      desc: 'Il principio della trasformazione. Governa digestione, metabolismo, intelletto. Quando sbilanciato: infiammazione, rossore, irritabilità.',
      remedies: ['Oli freschi (cocco)', 'Aloe vera', 'Tè rinfrescanti', 'Bagni di luna'],
    },
    kapha: {
      name: 'Kapha', meaning: 'Terra + Acqua', it: 'Struttura',
      hex: '#2ECC71', chakra: CHAKRAS[3],
      desc: 'Il principio della struttura. Governa stabilità, immunità, fluidi. Quando sbilanciato: stagnazione, pesantezza, oleosità.',
      remedies: ['Spezie (zenzero)', 'Movimento quotidiano', 'Scrub secchi', 'Tisane purificanti'],
    },
  };

  const d = doshas[dosha];

  const subcollections = [
    ['Cosmesi Viso Ayurvedica', '18 pezzi', CHAKRAS[1]],
    ['Cosmesi Corpo Ayurvedica', '24 pezzi', CHAKRAS[3]],
    ['Igiene Ayurvedica', '12 pezzi', CHAKRAS[4]],
    ['Gel Doccia Ayurvedici', '9 pezzi', CHAKRAS[1]],
    ['Saponi Ayurvedici', '14 pezzi', CHAKRAS[0]],
    ['Capelli Ayurvedici', '11 pezzi', CHAKRAS[6]],
    ['Roll-On Ayurvedici', '8 pezzi', CHAKRAS[5]],
    ['Tè e Tisane Ayurvediche', '22 pezzi', CHAKRAS[2]],
  ];

  return (
    <div className="bz-root" style={{ minHeight: '100%' }}>
      {/* Header */}
      <div style={{ padding: '20px 48px', borderBottom: '1px solid var(--hairline-soft)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <svg width="24" height="24" viewBox="0 0 32 32"><circle cx="16" cy="16" r="14" fill="none" stroke="var(--gold)" strokeWidth="0.5"/><circle cx="16" cy="16" r="2" fill="var(--gold)"/></svg>
          <span style={{ fontFamily: 'var(--f-display)', fontStyle: 'italic', fontSize: 18 }}>Benessere Zen</span>
        </div>
        <div className="label-ink" style={{ display: 'flex', gap: 14 }}>
          <span>Casa</span><span style={{ color: 'var(--ink-whisper)' }}>/</span>
          <span style={{ color: 'var(--gold)' }}>Ayurveda</span>
        </div>
      </div>

      {/* Full-bleed opening */}
      <section style={{ position: 'relative', minHeight: 760, padding: '100px 48px', overflow: 'hidden' }}>
        {/* Sanskrit watermark */}
        <div style={{ position: 'absolute', left: '50%', top: '15%', transform: 'translateX(-50%)', pointerEvents: 'none', opacity: 0.06 }}>
          <div style={{ fontFamily: 'var(--f-display)', fontStyle: 'italic', fontSize: 400, color: 'var(--gold)', lineHeight: 0.9, letterSpacing: '-0.02em' }}>आयुर्वेद</div>
        </div>
        <div style={{ position: 'absolute', left: '50%', top: 60, width: 800, height: 800, transform: 'translateX(-50%)', background: 'radial-gradient(circle, rgba(201,168,76,0.08), transparent 60%)', filter: 'blur(40px)', pointerEvents: 'none' }}/>

        <div style={{ position: 'relative', textAlign: 'center', maxWidth: 1100, margin: '0 auto' }}>
          <div className="label" style={{ color: 'var(--gold)' }}>◦ Scienza della vita · आयुर्वेद</div>
          <h1 style={{ fontSize: 200, lineHeight: 0.82, marginTop: 32, letterSpacing: '-0.04em' }}>
            <span style={{ fontStyle: 'italic' }}>Ayurveda</span>.
          </h1>
          <p style={{ fontFamily: 'var(--f-display)', fontStyle: 'italic', fontSize: 28, lineHeight: 1.5, color: 'var(--ink-mute)', marginTop: 40, maxWidth: 780, margin: '40px auto 0' }}>
            « La medicina più antica del mondo non è una <span style={{ color: 'var(--gold)', fontStyle: 'normal' }}>cura</span>.
            È una <span className="foil" style={{ fontStyle: 'italic' }}>grammatica</span> del vivere. »
          </p>

          {/* Stats strip */}
          <div style={{ marginTop: 72, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 0, borderTop: '1px solid var(--hairline)', borderBottom: '1px solid var(--hairline)' }}>
            {[
              ['V.000', 'anni di tradizione'],
              ['III', 'dosha costituzionali'],
              ['108', 'erbe officinali chiave'],
              ['001', 'linea completa italiana'],
            ].map(([n, l]) => (
              <div key={l} style={{ padding: '36px 20px', borderLeft: '1px solid var(--hairline)' }}>
                <div className="foil" style={{ fontFamily: 'var(--f-display)', fontStyle: 'italic', fontSize: 64, lineHeight: 1 }}>{n}</div>
                <div className="label-ink" style={{ marginTop: 10 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dosha finder — the heart of this page */}
      <section style={{ padding: '120px 48px', borderTop: '1px solid var(--hairline-soft)', background: 'var(--bg-deep)', position: 'relative' }} className="grain">
        <div style={{ position: 'relative', zIndex: 3 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 56 }}>
            <div>
              <div className="label">Capitolo 01 · I tre umori</div>
              <h2 style={{ fontSize: 88, marginTop: 20, lineHeight: 0.95, maxWidth: 800 }}>
                Non un solo<br/>corpo. <span className="foil">Tre costituzioni.</span>
              </h2>
            </div>
            <p style={{ color: 'var(--ink-mute)', fontSize: 14, lineHeight: 1.7, maxWidth: 360 }}>
              Ogni persona è un intreccio di Vāta, Pitta e Kapha. Conoscere il proprio dosha dominante
              significa sapere che pelle tratti, che tè bevi, come ti svegli.
            </p>
          </div>

          {/* Three dosha tabs + detail */}
          <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: 60 }}>
            {/* Tabs */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              {Object.entries(doshas).map(([k, dd]) => (
                <button key={k} onClick={() => setDosha(k)} style={{
                  padding: '24px 24px',
                  background: dosha === k ? `${dd.hex}14` : 'transparent',
                  border: dosha === k ? `1px solid ${dd.hex}` : '1px solid var(--hairline-soft)',
                  color: 'var(--ink)',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.4s var(--ease-silk)',
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                    <div className="sanskrit" style={{ fontSize: 32, color: dd.hex }}>{dd.name}</div>
                    <div style={{ color: dd.hex, fontFamily: 'var(--f-label)', fontSize: 9, letterSpacing: '0.28em' }}>{k === dosha ? '●' : '○'}</div>
                  </div>
                  <div className="label-ink" style={{ marginTop: 8 }}>{dd.meaning}</div>
                  <div style={{ fontFamily: 'var(--f-display)', fontStyle: 'italic', fontSize: 18, marginTop: 4 }}>{dd.it}</div>
                </button>
              ))}
              <button style={{
                marginTop: 14, padding: '16px 20px',
                background: 'var(--gold)', color: 'var(--bg-void)', border: 0, cursor: 'pointer',
                fontFamily: 'var(--f-label)', fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase',
              }}>◦ Scopri il tuo dosha →</button>
            </div>

            {/* Detail */}
            <div style={{ position: 'relative', padding: 48, border: `1px solid ${d.hex}55`, minHeight: 500, overflow: 'hidden' }}>
              <div style={{ position: 'absolute', right: -100, top: -100, width: 500, height: 500, background: `radial-gradient(circle, ${d.hex}22, transparent 60%)`, filter: 'blur(40px)', pointerEvents: 'none' }}/>
              <div style={{ position: 'relative' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 30 }}>
                  <div style={{ color: d.hex, fontFamily: 'var(--f-label)', fontSize: 11, letterSpacing: '0.3em' }}>DOSHA · {d.name.toUpperCase()}</div>
                  <div style={{ flex: 1, height: 1, background: `linear-gradient(90deg, ${d.hex}, transparent)` }}/>
                </div>
                <div className="sanskrit" style={{ fontSize: 40, color: d.hex, marginTop: 28 }}>{d.name}</div>
                <h3 style={{ fontSize: 120, lineHeight: 0.88, marginTop: 8 }}>
                  <span style={{ fontStyle: 'italic' }}>{d.it}</span>
                </h3>
                <p style={{ fontFamily: 'var(--f-display)', fontStyle: 'italic', fontSize: 22, lineHeight: 1.5, color: 'var(--ink)', marginTop: 28, maxWidth: 640 }}>
                  {d.desc}
                </p>
                <div style={{ marginTop: 44 }}>
                  <div className="label-ink">◦ Rimedi ayurvedici consigliati</div>
                  <div style={{ marginTop: 16, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
                    {d.remedies.map(r => (
                      <div key={r} style={{ padding: '14px 16px', border: '1px solid var(--hairline-soft)', fontFamily: 'var(--f-display)', fontStyle: 'italic', fontSize: 15 }}>
                        {r}
                      </div>
                    ))}
                  </div>
                </div>
                <div style={{ marginTop: 40, display: 'flex', gap: 14 }}>
                  <button style={{
                    padding: '14px 22px', background: d.hex, color: 'var(--bg-void)', border: 0, cursor: 'pointer',
                    fontFamily: 'var(--f-label)', fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase',
                  }}>Prodotti per {d.name}</button>
                  <button className="btn-ghost">Scopri i rituali →</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Subcollections grid */}
      <section style={{ padding: '120px 48px', borderTop: '1px solid var(--hairline-soft)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 56 }}>
          <div>
            <div className="label">Capitolo 02 · Le linee ayurvediche</div>
            <h2 style={{ fontSize: 80, marginTop: 20, lineHeight: 0.95 }}>Otto linee,<br/>un <span className="foil">sistema</span>.</h2>
          </div>
          <a className="label" style={{ color: 'var(--gold)' }}>Tutti i prodotti →</a>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
          {subcollections.map(([n, count, c], i) => (
            <div key={n} style={{
              position: 'relative', aspectRatio: '4/5',
              border: '1px solid var(--hairline-soft)',
              background: 'var(--bg-deep)',
              padding: 24,
              overflow: 'hidden',
              cursor: 'pointer',
              display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
              transition: 'all 0.4s var(--ease-silk)',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = c.hex; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--hairline-soft)'; }}>
              <div style={{ position: 'absolute', right: -30, bottom: -30, width: 200, height: 200, background: `radial-gradient(circle, ${c.hex}22, transparent 60%)`, filter: 'blur(30px)', pointerEvents: 'none' }}/>
              <div style={{ position: 'relative' }}>
                <div style={{ color: c.hex, fontFamily: 'var(--f-label)', fontSize: 9, letterSpacing: '0.28em' }}>LINEA {String(i+1).padStart(2,'0')}</div>
                <ChakraGlyph chakra={c} size={42}/>
              </div>
              <div style={{ position: 'relative' }}>
                <h3 style={{ fontSize: 26, lineHeight: 1.05, fontStyle: 'italic' }}>{n}</h3>
                <div style={{ marginTop: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span className="label-ink">{count}</span>
                  <span style={{ color: c.hex, fontFamily: 'var(--f-label)', fontSize: 10, letterSpacing: '0.28em' }}>Entra →</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Ingredient heroes */}
      <section style={{ padding: '120px 48px', borderTop: '1px solid var(--hairline-soft)', background: 'var(--bg-deep)' }}>
        <div className="label">Capitolo 03 · Piante madri</div>
        <h2 style={{ fontSize: 80, marginTop: 20, lineHeight: 0.95 }}>Le <span className="foil">dodici</span><br/>che cambiano tutto.</h2>
        <div style={{ marginTop: 56, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14 }}>
          {[
            ['Curcuma', 'Haridra', 'Infiammazione'],
            ['Neem', 'Nimba', 'Purificazione'],
            ['Ashwagandha', 'Aśvagandhā', 'Stress'],
            ['Triphala', 'Triphalā', 'Digestione'],
            ['Tulsi', 'Tulasī', 'Respiro'],
            ['Brahmi', 'Brāhmī', 'Memoria'],
            ['Amla', 'Āmalakī', 'Vit. C naturale'],
            ['Sandalo', 'Candana', 'Pelle'],
          ].map(([it, sk, use], i) => (
            <div key={it} style={{ padding: 24, border: '1px solid var(--hairline-soft)', background: 'var(--bg-void)' }}>
              <div className="sanskrit" style={{ fontSize: 14, color: 'var(--gold)' }}>{sk}</div>
              <div style={{ fontFamily: 'var(--f-display)', fontStyle: 'italic', fontSize: 32, marginTop: 6 }}>{it}</div>
              <div className="label-ink" style={{ marginTop: 14, paddingTop: 14, borderTop: '1px solid var(--hairline-soft)' }}>◦ {use}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

window.AyurvedaHub = AyurvedaHub;
