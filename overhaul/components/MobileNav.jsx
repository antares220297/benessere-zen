/* Mobile — Homepage hero + chakra drawer nav */

function MobileFrame({ children, label }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 30, height: '100%', justifyContent: 'center' }}>
      <div className="label-ink" style={{ marginBottom: 18, color: 'var(--ink-mute)' }}>{label}</div>
      <div style={{
        width: 380, height: 800,
        background: '#0F0F0F',
        borderRadius: 50,
        padding: 12,
        border: '6px solid #1a1a1a',
        boxShadow: '0 30px 60px rgba(0,0,0,0.6), inset 0 0 0 1px rgba(255,255,255,0.05)',
        position: 'relative',
        flexShrink: 0,
      }}>
        <div style={{
          width: '100%', height: '100%', borderRadius: 38, overflow: 'hidden',
          position: 'relative', background: '#0F0F0F',
        }}>
          {/* Notch */}
          <div style={{ position: 'absolute', top: 8, left: '50%', transform: 'translateX(-50%)', width: 110, height: 26, background: '#000', borderRadius: 16, zIndex: 100 }}/>
          {/* Status bar */}
          <div style={{ position: 'absolute', top: 14, left: 22, right: 22, display: 'flex', justifyContent: 'space-between', zIndex: 99, color: '#E8E8E8', fontSize: 12, fontFamily: '-apple-system, sans-serif', fontWeight: 600 }}>
            <span>9:41</span>
            <span>● ● ●</span>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}

function MobileHome() {
  return (
    <div className="bz-root" style={{ width: '100%', height: '100%', overflow: 'auto', position: 'relative' }}>
      {/* Hero */}
      <div style={{ position: 'relative', height: 600, overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 70%, #1A1A2E 0%, #0F0F0F 70%)' }}/>
        {/* Smoke */}
        <div style={{ position: 'absolute', left: '50%', top: '40%', width: 280, height: 360, transform: 'translateX(-50%)', filter: 'blur(20px)', opacity: 0.7 }}>
          <svg viewBox="0 0 200 300" width="100%" height="100%">
            <defs>
              <radialGradient id="ms" cx="50%" cy="80%">
                <stop offset="0%" stopColor="#E8E8E8" stopOpacity="0.5"/>
                <stop offset="60%" stopColor="#9B59B6" stopOpacity="0.2"/>
                <stop offset="100%" stopColor="#4B0082" stopOpacity="0"/>
              </radialGradient>
            </defs>
            <ellipse cx="100" cy="240" rx="90" ry="50" fill="url(#ms)"/>
            <ellipse cx="105" cy="180" rx="70" ry="40" fill="url(#ms)" opacity="0.7"/>
            <ellipse cx="95" cy="120" rx="55" ry="30" fill="url(#ms)" opacity="0.5"/>
          </svg>
        </div>
        {/* Top bar */}
        <div style={{ position: 'absolute', top: 50, left: 20, right: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span className="label" style={{ color: 'var(--gold)', fontSize: 8 }}>≡</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <svg width="18" height="18" viewBox="0 0 32 32">
              <circle cx="16" cy="16" r="14" fill="none" stroke="var(--gold)" strokeWidth="0.5"/>
              <circle cx="16" cy="16" r="2" fill="var(--gold)"/>
            </svg>
            <span style={{ fontFamily: 'var(--f-display)', fontStyle: 'italic', fontSize: 14 }}>Benessere Zen</span>
          </div>
          <span className="label" style={{ color: 'var(--gold)', fontSize: 8 }}>○</span>
        </div>

        {/* Hero text */}
        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: 28, textAlign: 'center' }}>
          <div className="label" style={{ color: 'var(--gold-soft)', fontSize: 8 }}>Capitolo 01 · Il rituale</div>
          <h1 style={{ fontSize: 56, lineHeight: 0.95, marginTop: 18, fontStyle: 'italic', fontWeight: 300 }}>
            Respira.
          </h1>
          <p style={{ fontFamily: 'var(--f-display)', fontStyle: 'italic', color: 'var(--ink-mute)', marginTop: 18, fontSize: 16 }}>
            Lascia andare. Trova il tuo<br/>equilibrio.
          </p>
        </div>

        <div style={{ position: 'absolute', bottom: 24, left: 0, right: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
          <span className="label-ink" style={{ fontSize: 8, color: 'var(--gold-soft)' }}>SCROLL · RESPIRA</span>
          <div style={{ width: 1, height: 24, background: 'linear-gradient(180deg, var(--gold), transparent)' }}/>
        </div>
      </div>

      {/* Chakra cards horizontal scroll */}
      <div style={{ padding: '40px 0 24px' }}>
        <div style={{ padding: '0 20px', marginBottom: 20 }}>
          <div className="label" style={{ fontSize: 8 }}>02 · Le sette porte</div>
          <h2 style={{ fontSize: 36, marginTop: 8, lineHeight: 1 }}>Esplora per <span className="foil">chakra</span></h2>
        </div>
        <div style={{ display: 'flex', gap: 12, overflowX: 'auto', padding: '0 20px 20px', scrollbarWidth: 'none' }}>
          {CHAKRAS.map(c => (
            <div key={c.id} style={{
              flexShrink: 0, width: 140, padding: 16,
              border: `1px solid ${c.hex}55`,
              background: 'var(--bg-deep)',
            }}>
              <div style={{ color: c.hex, fontFamily: 'var(--f-label)', fontSize: 8, letterSpacing: '0.28em' }}>0{c.n}/07</div>
              <ChakraGlyph chakra={c} size={48}/>
              <div className="sanskrit" style={{ fontSize: 16, color: c.hex, marginTop: 10 }}>{c.sk}</div>
              <div className="label-ink" style={{ fontSize: 8, marginTop: 4 }}>{c.it}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Quiz banner */}
      <div style={{ margin: '20px 20px 30px', padding: 24, border: '1px solid var(--gold)', background: 'var(--bg-deep)', textAlign: 'center' }}>
        <div className="label" style={{ color: 'var(--gold)', fontSize: 8 }}>09 domande · 03 minuti</div>
        <h3 style={{ fontSize: 28, marginTop: 10, lineHeight: 1 }}>
          Trova il tuo<br/><span className="foil">rituale</span>.
        </h3>
        <button className="btn-gold" style={{ marginTop: 18, padding: '12px 20px', fontSize: 9 }}>Inizia il quiz →</button>
      </div>
    </div>
  );
}

function MobileMenu() {
  return (
    <div className="bz-root" style={{ width: '100%', height: '100%', overflow: 'auto', position: 'relative', background: 'var(--bg-void)' }}>
      <div style={{ paddingTop: 50, padding: '50px 20px 24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ color: 'var(--gold)', fontFamily: 'var(--f-label)', fontSize: 9, letterSpacing: '0.28em' }}>CHIUDI ✕</span>
          <span style={{ fontFamily: 'var(--f-display)', fontStyle: 'italic', fontSize: 14 }}>Benessere Zen</span>
          <span style={{ fontFamily: 'var(--f-label)', fontSize: 9, color: 'var(--ink-mute)' }}>0</span>
        </div>
      </div>
      <div style={{ padding: '0 20px 20px' }}>
        <div className="label" style={{ fontSize: 8 }}>Esplora per</div>
        <h2 style={{ fontSize: 40, marginTop: 12, lineHeight: 0.95 }}>I sette<br/><span className="foil">chakra</span></h2>
      </div>
      <div>
        {CHAKRAS.map(c => (
          <div key={c.id} style={{ padding: '20px 20px', borderTop: '1px solid var(--hairline-soft)', display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ color: c.hex, fontFamily: 'var(--f-label)', fontSize: 9, letterSpacing: '0.28em', width: 30 }}>0{c.n}</div>
            <ChakraGlyph chakra={c} size={36}/>
            <div style={{ flex: 1 }}>
              <div className="sanskrit" style={{ fontSize: 18, color: c.hex }}>{c.sk}</div>
              <div className="label-ink" style={{ fontSize: 8, marginTop: 2 }}>{c.it} · {c.element}</div>
            </div>
            <span style={{ color: c.hex, fontFamily: 'var(--f-label)', fontSize: 11 }}>→</span>
          </div>
        ))}
      </div>
      <div style={{ padding: '40px 20px 30px' }}>
        <div className="label-ink" style={{ marginBottom: 16 }}>Altro</div>
        {['Rituali','Journal','Quiz','Account','Carta'].map(t => (
          <div key={t} style={{ padding: '14px 0', borderBottom: '1px solid var(--hairline-soft)', fontFamily: 'var(--f-display)', fontStyle: 'italic', fontSize: 22 }}>
            {t}
          </div>
        ))}
      </div>
    </div>
  );
}

function MobilePDP() {
  const c = CHAKRAS[6];
  return (
    <div className="bz-root" style={{ width: '100%', height: '100%', overflow: 'auto', position: 'relative' }}>
      <div style={{ paddingTop: 50, padding: '50px 20px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ color: 'var(--gold)', fontFamily: 'var(--f-label)', fontSize: 9 }}>← INDIETRO</span>
        <span style={{ fontFamily: 'var(--f-display)', fontStyle: 'italic', fontSize: 14 }}>Benessere Zen</span>
        <span style={{ color: 'var(--gold)', fontFamily: 'var(--f-label)', fontSize: 9 }}>♡</span>
      </div>
      <div className="ph" style={{ aspectRatio: '4/5', position: 'relative', margin: '0 16px' }} data-tag="[ ametista.jpg ]">
        <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(circle at 50% 50%, ${c.hex}33, transparent 65%)` }}/>
        <div style={{ position: 'absolute', top: 16, left: 16, padding: '6px 10px', background: 'rgba(15,15,15,0.8)', border: `1px solid ${c.hex}55`, display: 'flex', alignItems: 'center', gap: 6 }}>
          <div style={{ width: 5, height: 5, borderRadius: '50%', background: c.hex }}/>
          <span style={{ color: c.hex, fontFamily: 'var(--f-label)', fontSize: 7, letterSpacing: '0.3em' }}>0{c.n} · CORONA</span>
        </div>
      </div>
      <div style={{ padding: '24px 20px' }}>
        <div className="sanskrit" style={{ fontSize: 12, color: c.hex }}>Amethystus uruguaya</div>
        <h1 style={{ fontSize: 44, lineHeight: 0.95, marginTop: 6 }}>
          <span style={{ fontStyle: 'italic' }}>Ametista</span><br/>Drusa
        </h1>
        <div style={{ marginTop: 18, display: 'flex', alignItems: 'baseline', gap: 12 }}>
          <div style={{ fontFamily: 'var(--f-display)', fontStyle: 'italic', fontSize: 38, color: 'var(--gold)', lineHeight: 1 }}>€148</div>
          <div className="label-ink" style={{ textDecoration: 'line-through' }}>€185</div>
        </div>
        <div style={{ marginTop: 24 }}>
          <div className="label-ink" style={{ fontSize: 8 }}>Peso</div>
          <div style={{ marginTop: 8, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
            {['S 280g','M 420g','L 680g'].map((s, i) => (
              <div key={s} style={{
                padding: '10px 6px', textAlign: 'center', fontFamily: 'var(--f-display)', fontStyle: 'italic', fontSize: 14,
                border: i === 1 ? `1px solid ${c.hex}` : '1px solid var(--hairline-soft)',
                color: i === 1 ? c.hex : 'var(--ink)',
              }}>{s}</div>
            ))}
          </div>
        </div>
        <p style={{ fontFamily: 'var(--f-display)', fontStyle: 'italic', fontSize: 16, lineHeight: 1.5, color: 'var(--ink-mute)', marginTop: 24 }}>
          Trecento milioni di anni di geologia che ti guardano. Drusa intera, programmata in atelier alla luna piena.
        </p>
      </div>
      {/* Sticky CTA */}
      <div style={{ position: 'sticky', bottom: 0, padding: '14px 16px', background: 'rgba(15,15,15,0.95)', backdropFilter: 'blur(8px)', borderTop: '1px solid var(--hairline)', display: 'flex', gap: 10 }}>
        <button style={{ padding: '14px', background: 'transparent', border: '1px solid var(--hairline)', color: 'var(--ink)', minWidth: 50 }}>♡</button>
        <button style={{ flex: 1, padding: '14px', background: c.hex, border: 'none', color: 'var(--bg-void)', fontFamily: 'var(--f-label)', fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase' }}>
          Aggiungi · €148
        </button>
      </div>
    </div>
  );
}

function MobileShowcase() {
  return (
    <div style={{ display: 'flex', height: '100%', background: '#080812' }}>
      <MobileFrame label="Homepage"><MobileHome/></MobileFrame>
      <MobileFrame label="Menu chakra"><MobileMenu/></MobileFrame>
      <MobileFrame label="Product detail"><MobilePDP/></MobileFrame>
    </div>
  );
}

window.MobileShowcase = MobileShowcase;
