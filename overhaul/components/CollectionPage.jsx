/* Collection Page — chakra-themed hero banner + product grid */

function CollectionPage({ chakraIndex = 6 }) {
  const c = CHAKRAS[chakraIndex];
  const [sort, setSort] = React.useState('Raccomandati');

  const products = [
    { chakra: c, name: 'Ametista Drusa', latinName: 'Amethystus uruguaya', price: '148', oldPrice: '185',
      weight: '420 g', tag: 'Nuovo',
      properties: ['Meditazione','Sonno','Intuizione'],
      usage: 'Posiziona accanto al cuscino o sul terzo occhio per 11 minuti prima di dormire.' },
    { chakra: c, name: 'Selenite Bastone', latinName: 'Selenitum candidum', price: '32',
      weight: '110 g',
      properties: ['Purificazione','Chiarezza'],
      usage: 'Passa sull’aura da testa ai piedi. Purifica altri cristalli in 8 ore.' },
    { chakra: c, name: 'Palo Santo Sacro', latinName: 'Bursera graveolens · Perù', price: '18',
      weight: '6 bastoncini',
      properties: ['Ancestrale','Purificante'],
      usage: 'Accendi la punta, soffia, lascia fumare in stanza per 3 minuti.' },
    { chakra: c, name: 'Incenso Nag Champa', latinName: 'Tradizione · Bangalore', price: '14',
      weight: '15 bastoncini', tag: 'Classico',
      properties: ['Meditazione','Devozione'],
      usage: 'Accendere all’alba, lasciare bruciare durante la pratica.' },
    { chakra: c, name: 'Campana Tibetana', latinName: 'Bronzo · sette metalli', price: '220',
      weight: '1.2 kg',
      properties: ['Suono','Armonia','Rito'],
      usage: 'Suona tre volte prima di meditare. Tieni sulla mano aperta, non nella stretta.' },
    { chakra: c, name: 'Quarzo Ialino Punta', latinName: 'Quartz clarus brasilianus', price: '78',
      weight: '160 g',
      properties: ['Amplificazione','Chiarezza'],
      usage: 'Punta verso il cielo durante la meditazione. Amplifica ogni intenzione.' },
  ];

  return (
    <div className="bz-root" style={{ minHeight: '100%' }}>
      {/* Minimal header */}
      <div style={{
        padding: '24px 48px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        borderBottom: '1px solid var(--hairline-soft)',
        position: 'relative', zIndex: 10,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <svg width="28" height="28" viewBox="0 0 32 32">
            <circle cx="16" cy="16" r="14" fill="none" stroke="var(--gold)" strokeWidth="0.5"/>
            <circle cx="16" cy="16" r="8" fill="none" stroke="var(--gold)" strokeWidth="0.5"/>
            <circle cx="16" cy="16" r="2" fill="var(--gold)"/>
          </svg>
          <span style={{ fontFamily: 'var(--f-display)', fontStyle: 'italic', fontSize: 20 }}>Benessere Zen</span>
        </div>
        {/* Breadcrumb */}
        <div style={{ display: 'flex', gap: 16, alignItems: 'center' }} className="label-ink">
          <span>Casa</span>
          <span style={{ color: 'var(--ink-whisper)' }}>/</span>
          <span>Sette Chakra</span>
          <span style={{ color: 'var(--ink-whisper)' }}>/</span>
          <span style={{ color: c.hex }}>{c.sk} · {c.it}</span>
        </div>
      </div>

      {/* Hero banner — chakra-themed */}
      <section style={{ position: 'relative', height: 560, overflow: 'hidden', borderBottom: `1px solid ${c.hex}55` }}>
        {/* Background wash */}
        <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse at 70% 50%, ${c.hex}33 0%, transparent 55%), var(--bg-void)` }}/>
        {/* Concentric rings behind */}
        <div style={{ position: 'absolute', right: -150, top: -150, width: 900, height: 900, pointerEvents: 'none' }}>
          <svg width="900" height="900" viewBox="0 0 900 900">
            {[420, 360, 300, 240, 180, 120, 60].map((r, i) => (
              <circle key={r} cx="450" cy="450" r={r} fill="none"
                stroke={c.hex} strokeOpacity={0.05 + i*0.03}
                strokeWidth="0.5" strokeDasharray={i % 2 ? '2 6' : 'none'} />
            ))}
          </svg>
        </div>
        {/* Glow */}
        <div style={{
          position: 'absolute', right: 180, top: '50%', transform: 'translateY(-50%)',
          width: 380, height: 380, borderRadius: '50%',
          background: `radial-gradient(circle, ${c.hex}66, transparent 60%)`,
          filter: 'blur(40px)',
        }}/>

        <div style={{ position: 'relative', zIndex: 3, padding: '80px 48px', display: 'grid', gridTemplateColumns: '1.4fr 1fr', alignItems: 'center', height: '100%' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
              <div style={{ color: c.hex, fontFamily: 'var(--f-label)', fontSize: 11, letterSpacing: '0.3em' }}>COLLEZIONE 0{c.n} / 07</div>
              <div style={{ flex: 1, height: 1, background: `linear-gradient(90deg, ${c.hex}, transparent)` }}/>
            </div>
            <div className="sanskrit" style={{ fontSize: 22, color: c.hex, marginTop: 28, letterSpacing: '0.04em' }}>{c.sk}</div>
            <h1 style={{ fontSize: 144, lineHeight: 0.9, marginTop: 8, letterSpacing: '-0.03em' }}>
              <span style={{ fontStyle: 'italic' }}>{c.it}</span>
            </h1>
            <div style={{ display: 'flex', gap: 40, marginTop: 36 }}>
              <div>
                <div className="label-ink">Elemento</div>
                <div style={{ fontFamily: 'var(--f-display)', fontStyle: 'italic', fontSize: 22, marginTop: 6 }}>{c.element}</div>
              </div>
              <div>
                <div className="label-ink">Mantra</div>
                <div style={{ fontFamily: 'var(--f-display)', fontStyle: 'italic', fontSize: 22, marginTop: 6, color: c.hex, letterSpacing: '0.2em' }}>{c.mantra}</div>
              </div>
              <div>
                <div className="label-ink">Pezzi</div>
                <div style={{ fontFamily: 'var(--f-display)', fontStyle: 'italic', fontSize: 22, marginTop: 6 }}>{products.length * 7}</div>
              </div>
              <div>
                <div className="label-ink">Posizione</div>
                <div style={{ fontFamily: 'var(--f-display)', fontStyle: 'italic', fontSize: 22, marginTop: 6 }}>Corona del capo</div>
              </div>
            </div>
            <p style={{ color: 'var(--ink-mute)', fontSize: 16, lineHeight: 1.7, marginTop: 36, maxWidth: 600 }}>
              {c.intent}. La collezione {c.sk} raccoglie {c.product.toLowerCase()} — oggetti scelti per aprire
              il centro più alto, l'antenna con cui ascoltiamo ciò che non si vede.
            </p>
          </div>

          {/* Large glyph */}
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ position: 'relative' }}>
              <ChakraGlyph chakra={c} size={340} stroke={0.7}/>
              {/* Rotating outer label */}
              <svg width="380" height="380" style={{ position: 'absolute', inset: -20, animation: 'spin 60s linear infinite' }}>
                <defs>
                  <path id={`ring-${c.id}`} d="M 190 190 m -170 0 a 170 170 0 1 1 340 0 a 170 170 0 1 1 -340 0" />
                </defs>
                <text fontSize="10" fill={c.hex} letterSpacing="8" fontFamily="Josefin Sans" textTransform="uppercase">
                  <textPath href={`#ring-${c.id}`}>{`◦ ${c.sk} ◦ ${c.it} ◦ ${c.element} ◦ ${c.mantra} ◦ CORONA ◦ COSCIENZA ◦ TRASCENDENZA ◦ `}</textPath>
                </text>
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Filter / sort bar */}
      <div style={{ padding: '24px 48px', borderBottom: '1px solid var(--hairline-soft)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', gap: 20 }}>
          {['Tutto','Cristalli','Incensi','Tè & Tisane','Oggetti sacri'].map((t, i) => (
            <button key={t} style={{
              background: 'transparent', border: 0, padding: '8px 0', cursor: 'pointer',
              color: i === 0 ? c.hex : 'var(--ink-mute)',
              borderBottom: i === 0 ? `1px solid ${c.hex}` : '1px solid transparent',
              fontFamily: 'var(--f-label)', fontSize: 11, letterSpacing: '0.24em', textTransform: 'uppercase',
            }}>{t}</button>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
          <span className="label-ink">{products.length * 7} pezzi</span>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center', border: '1px solid var(--hairline)', padding: '8px 14px' }}>
            <span className="label-ink">Ordina</span>
            <span style={{ fontFamily: 'var(--f-display)', fontStyle: 'italic', fontSize: 14, color: c.hex }}>{sort}</span>
            <span style={{ color: c.hex }}>↓</span>
          </div>
        </div>
      </div>

      {/* Product grid */}
      <section style={{ padding: '48px 48px 120px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
          {products.map((p, i) => <ProductCard key={i} {...p} />)}
        </div>

        {/* Ritual reco */}
        <div style={{
          marginTop: 80, padding: 48,
          border: `1px solid ${c.hex}`,
          position: 'relative', overflow: 'hidden',
          background: `linear-gradient(135deg, ${c.hex}11, transparent 60%)`,
        }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 48, alignItems: 'center' }}>
            <div>
              <div className="label" style={{ color: c.hex }}>Rituale consigliato · {c.sk}</div>
              <h3 style={{ fontSize: 44, marginTop: 14, lineHeight: 1 }}>
                Il bundle <span style={{ color: c.hex }}>Corona</span>, tre oggetti<br/>per una pratica di 21 giorni.
              </h3>
              <p style={{ color: 'var(--ink-mute)', fontSize: 14, lineHeight: 1.7, marginTop: 16, maxWidth: 540 }}>
                Ametista + Palo Santo + Incenso Nag Champa. Accompagnati da un librettino rilegato a mano
                con istruzioni giorno per giorno.
              </p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div className="label-ink">Da</div>
              <div style={{ fontFamily: 'var(--f-display)', fontStyle: 'italic', fontSize: 72, color: c.hex, lineHeight: 1 }}>€168</div>
              <div className="label-ink" style={{ marginTop: 4 }}>invece di €218</div>
              <button className="btn-gold" style={{ marginTop: 20 }}>Componi il rituale</button>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}

window.CollectionPage = CollectionPage;
