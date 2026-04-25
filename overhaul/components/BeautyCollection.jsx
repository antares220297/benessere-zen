/* Beauty Collection Page — cosmesi viso ayurvedica style
   Dark editorial, filtri per categoria, badge "Green" / "Bio", cards skincare */

function BeautyCollection() {
  const [filter, setFilter] = React.useState('Tutto');
  const [sort, setSort] = React.useState('Novità');

  const c = CHAKRAS[1]; // Svadhisthana — sacrale (skincare fluida, rituale d'acqua)

  const products = [
    { name: 'Siero Viso Vitamina C', sub: 'Antiossidante · Illuminante', price: '32,50', oldPrice: '39', size: '30 ml', tag: 'Star', cat: 'Sieri',
      actives: ['Vitamina C','Melograno','Zenzero bio'], pao: '6M', chakra: c, rating: 4.9 },
    { name: 'Crema Viso Lenitiva', sub: 'Decongestionante · Rinfrescante', price: '35,90', size: '50 ml', tag: 'Bestseller', cat: 'Creme',
      actives: ['Aloe vera','Camomilla','Bisabololo'], pao: '6M', chakra: CHAKRAS[3], rating: 4.8 },
    { name: 'Maschera Viso Curcuma', sub: 'Illuminante · Anti-age', price: '32,90', size: '100 ml', cat: 'Maschere',
      actives: ['Curcuma','Zafferano','Argilla gialla'], pao: '6M', chakra: CHAKRAS[2], rating: 4.9 },
    { name: 'Contorno Occhi Zafferano', sub: 'Rivitalizzante · Peptidi', price: '32,90', size: '30 ml', tag: 'Nuovo', cat: 'Occhi',
      actives: ['Zafferano','Peptidi','Caffeina'], pao: '4M', chakra: CHAKRAS[5], rating: 4.7 },
    { name: 'Tonico Rosa Damascena', sub: 'Riequilibrante · Tonificante', price: '22,50', size: '200 ml', cat: 'Tonici',
      actives: ['Rosa damascena','Acido ialuronico','Aloe'], pao: '6M', chakra: CHAKRAS[3], rating: 4.8 },
    { name: 'Detergente Ubtan', sub: 'Ayurvedico · Delicato', price: '26,00', size: '150 ml', cat: 'Detergenti',
      actives: ['Ubtan','Neem','Curcuma'], pao: '6M', chakra: CHAKRAS[2], rating: 4.9 },
    { name: 'Siero Acido Ialuronico', sub: 'Idratante profondo', price: '38,00', size: '30 ml', tag: 'Bio', cat: 'Sieri',
      actives: ['Ialuronico tri-peso','Niacinamide','Aloe'], pao: '6M', chakra: CHAKRAS[4], rating: 4.8 },
    { name: 'Crema Notte Rigenerante', sub: 'Anti-age · Retinolo bio', price: '44,50', size: '50 ml', cat: 'Creme',
      actives: ['Retinolo','Bakuchiol','Squalano'], pao: '6M', chakra: CHAKRAS[6], rating: 4.9 },
    { name: 'Maschera Argilla Rosa', sub: 'Purificante · Delicata', price: '24,00', size: '100 ml', cat: 'Maschere',
      actives: ['Argilla rosa','Ialuronico','Aloe'], pao: '6M', chakra: CHAKRAS[3], rating: 4.7 },
  ];

  const cats = ['Tutto','Detergenti','Tonici','Sieri','Occhi','Creme','Maschere'];
  const filtered = filter === 'Tutto' ? products : products.filter(p => p.cat === filter);

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
          <span>Ayurveda</span><span style={{ color: 'var(--ink-whisper)' }}>/</span>
          <span style={{ color: 'var(--gold)' }}>Cosmesi Viso Ayurvedica</span>
        </div>
      </div>

      {/* Hero — quieter than chakra pages, but same language */}
      <section style={{ position: 'relative', padding: '80px 48px 60px', overflow: 'hidden', borderBottom: '1px solid var(--hairline-soft)' }}>
        {/* Soft wash */}
        <div style={{ position: 'absolute', right: -200, top: -100, width: 900, height: 900, background: `radial-gradient(circle, ${c.hex}18, transparent 60%)`, filter: 'blur(60px)', pointerEvents: 'none' }}/>
        <div style={{ position: 'relative', display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 80, alignItems: 'flex-end' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
              <div style={{ color: c.hex, fontFamily: 'var(--f-label)', fontSize: 11, letterSpacing: '0.3em' }}>AYURVEDA · COSMESI VISO</div>
              <div style={{ flex: 1, maxWidth: 200, height: 1, background: `linear-gradient(90deg, ${c.hex}, transparent)` }}/>
            </div>
            <h1 style={{ fontSize: 132, lineHeight: 0.88, marginTop: 24, letterSpacing: '-0.03em' }}>
              <span style={{ fontStyle: 'italic' }}>Cinquemila anni</span><br/>
              sul tuo <span className="foil">viso</span>.
            </h1>
            <p style={{ color: 'var(--ink-mute)', fontSize: 16, lineHeight: 1.7, marginTop: 28, maxWidth: 620 }}>
              Curcuma, neem, ubtan, triphala. L'Ayurveda non è una moda wellness:
              è la medicina più antica del mondo. La nostra linea viso nasce da formulazioni tradizionali
              indiane, ricalibrate in atelier italiano con INCI pulito e packaging ricaricabile.
            </p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div style={{ display: 'flex', gap: 14 }}>
              {[
                ['◦ INCI', 'Pubblico'],
                ['◦ Test', '0 animali'],
                ['◦ Ricarica', 'Sì, tutto'],
                ['◦ Origine', 'Italia'],
              ].map(([k, v]) => (
                <div key={k} style={{ flex: 1, padding: 14, border: '1px solid var(--hairline-soft)' }}>
                  <div className="label" style={{ color: c.hex, fontSize: 8 }}>{k}</div>
                  <div style={{ fontFamily: 'var(--f-display)', fontStyle: 'italic', fontSize: 16, marginTop: 6 }}>{v}</div>
                </div>
              ))}
            </div>
            <div style={{ padding: 18, border: `1px solid ${c.hex}55`, background: 'rgba(255,107,53,0.04)' }}>
              <div className="label" style={{ color: c.hex, fontSize: 9 }}>◦ Assistenza cosmetica · gratuita</div>
              <p style={{ color: 'var(--ink-mute)', fontSize: 12, lineHeight: 1.6, marginTop: 6 }}>
                Non sai da dove iniziare? Rispondi a sette domande, una cosmetologa ti scrive
                una routine personalizzata entro 48h.
              </p>
              <button style={{ marginTop: 10, padding: '8px 14px', background: 'transparent', border: `1px solid ${c.hex}`, color: c.hex, fontFamily: 'var(--f-label)', fontSize: 9, letterSpacing: '0.28em', textTransform: 'uppercase', cursor: 'pointer' }}>
                Inizia la consulenza →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Filter + sort */}
      <div style={{ padding: '28px 48px', borderBottom: '1px solid var(--hairline-soft)', position: 'sticky', top: 0, zIndex: 10, background: 'rgba(15,15,15,0.92)', backdropFilter: 'blur(8px)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {cats.map(t => (
            <button key={t} onClick={() => setFilter(t)} style={{
              padding: '10px 18px',
              background: filter === t ? 'var(--gold)' : 'transparent',
              color: filter === t ? 'var(--bg-void)' : 'var(--ink-mute)',
              border: filter === t ? '1px solid var(--gold)' : '1px solid var(--hairline-soft)',
              cursor: 'pointer',
              fontFamily: 'var(--f-label)', fontSize: 10, letterSpacing: '0.24em', textTransform: 'uppercase',
              transition: 'all 0.3s var(--ease-silk)',
            }}>{t}</button>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
          <span className="label-ink">{filtered.length} prodotti</span>
          <div style={{ display: 'flex', gap: 8 }}>
            {['Novità','Prezzo ↑','Prezzo ↓','Recensioni'].map(s => (
              <button key={s} onClick={() => setSort(s)} style={{
                padding: '6px 10px',
                background: 'transparent',
                color: sort === s ? 'var(--gold)' : 'var(--ink-whisper)',
                border: 0,
                cursor: 'pointer',
                fontFamily: 'var(--f-display)', fontStyle: 'italic', fontSize: 14,
                borderBottom: sort === s ? '1px solid var(--gold)' : '1px solid transparent',
              }}>{s}</button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid */}
      <section style={{ padding: '48px 48px 100px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
          {filtered.map((p, i) => <BeautyCard key={i} {...p} />)}
        </div>
      </section>

      {/* Routine builder strip */}
      <section style={{ padding: '80px 48px', background: 'var(--bg-deep)', borderTop: '1px solid var(--hairline-soft)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 40 }}>
          <h2 style={{ fontSize: 56, lineHeight: 0.95 }}>La routine in <span className="foil">5 tempi</span></h2>
          <p className="label-ink" style={{ maxWidth: 320, color: 'var(--ink-mute)' }}>
            Un rituale skincare ha una grammatica. Dal detergente al siero, ogni gesto prepara il successivo.
          </p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 16 }}>
          {[
            ['I', 'Detergere', 'Ubtan · 60 sec'],
            ['II', 'Tonificare', 'Rosa · 2 pressioni'],
            ['III', 'Trattare', 'Siero · 3 gocce'],
            ['IV', 'Idratare', 'Crema · 2 punti'],
            ['V', 'Proteggere', 'Balsamo · picchiettare'],
          ].map(([r, t, sub], i) => (
            <div key={r} style={{ padding: 24, border: '1px solid var(--hairline-soft)', background: 'var(--bg-void)', position: 'relative' }}>
              <div style={{ fontFamily: 'var(--f-display)', fontStyle: 'italic', fontSize: 56, color: c.hex, lineHeight: 1 }}>{r}</div>
              <div style={{ fontFamily: 'var(--f-display)', fontStyle: 'italic', fontSize: 22, marginTop: 14 }}>{t}</div>
              <div className="label-ink" style={{ marginTop: 6 }}>{sub}</div>
              {i < 4 && <div style={{ position: 'absolute', right: -10, top: '50%', color: c.hex, fontFamily: 'var(--f-label)', fontSize: 14 }}>→</div>}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

// Redesigned card for beauty products (different from BZ crystal card — here we need INCI hints, PAO, size etc)
function BeautyCard({ name, sub, price, oldPrice, size, tag, actives, pao, chakra, rating }) {
  const c = chakra;
  return (
    <div style={{
      background: 'var(--bg-deep)',
      border: '1px solid var(--hairline-soft)',
      position: 'relative',
      cursor: 'pointer',
      transition: 'all 0.4s var(--ease-silk)',
      display: 'flex', flexDirection: 'column',
    }}
    onMouseEnter={e => { e.currentTarget.style.borderColor = c.hex; e.currentTarget.style.transform = 'translateY(-2px)'; }}
    onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--hairline-soft)'; e.currentTarget.style.transform = 'translateY(0)'; }}>

      {/* Top bar: chakra + badges */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 18px', borderBottom: '1px solid var(--hairline-soft)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: c.hex, boxShadow: `0 0 8px ${c.hex}` }}/>
          <span className="label" style={{ color: c.hex, fontSize: 8 }}>0{c.n} · {c.it}</span>
        </div>
        <div style={{ display: 'flex', gap: 6 }}>
          <span style={{ padding: '2px 8px', border: '1px solid var(--hairline)', color: 'var(--ink-mute)', fontFamily: 'var(--f-label)', fontSize: 8, letterSpacing: '0.2em' }}>BIO</span>
          <span style={{ padding: '2px 8px', border: '1px solid var(--hairline)', color: 'var(--ink-mute)', fontFamily: 'var(--f-label)', fontSize: 8, letterSpacing: '0.2em' }}>GREEN</span>
        </div>
      </div>

      {/* Image */}
      <div className="ph" style={{ aspectRatio: '1/1', position: 'relative' }} data-tag={`[ bottle.jpg ]`}>
        <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(circle at 50% 60%, ${c.hex}1f, transparent 60%)` }}/>
        {/* Minimal bottle silhouette */}
        <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', opacity: 0.18 }}>
          <svg width="100" height="160" viewBox="0 0 100 160">
            <rect x="35" y="5" width="30" height="20" fill="none" stroke={c.hex} strokeWidth="0.8"/>
            <path d="M 30 25 L 30 150 Q 30 158 38 158 L 62 158 Q 70 158 70 150 L 70 25 Z" fill="none" stroke={c.hex} strokeWidth="0.8"/>
            <line x1="35" y1="95" x2="65" y2="95" stroke={c.hex} strokeWidth="0.4" strokeDasharray="1 2"/>
          </svg>
        </div>
        {tag && (
          <div style={{ position: 'absolute', top: 14, right: 14, padding: '4px 10px', background: c.hex, color: 'var(--bg-void)', fontFamily: 'var(--f-label)', fontSize: 9, letterSpacing: '0.28em' }}>{tag}</div>
        )}
        <div style={{ position: 'absolute', bottom: 12, left: 14, right: 14, display: 'flex', justifyContent: 'space-between' }}>
          <span className="label-ink" style={{ color: 'var(--ink-whisper)' }}>{size}</span>
          <span className="label-ink" style={{ color: 'var(--ink-whisper)' }}>PAO {pao}</span>
        </div>
      </div>

      {/* Body */}
      <div style={{ padding: '22px 22px 24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          {[1,2,3,4,5].map(i => (
            <svg key={i} width="10" height="10" viewBox="0 0 14 14"><polygon points="7,1 9,5 13,5.5 10,9 11,13 7,11 3,13 4,9 1,5.5 5,5" fill={i <= Math.floor(rating) ? c.hex : 'var(--hairline-soft)'} /></svg>
          ))}
          <span className="label-ink" style={{ marginLeft: 6 }}>{rating.toFixed(1)}</span>
        </div>
        <h3 style={{ fontSize: 24, marginTop: 10, lineHeight: 1.1 }}>
          <span style={{ fontStyle: 'italic' }}>{name}</span>
        </h3>
        <div className="label-ink" style={{ marginTop: 6, color: 'var(--ink-mute)' }}>{sub}</div>

        {/* Actives pill row */}
        <div style={{ marginTop: 16, display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {actives.slice(0, 3).map(a => (
            <span key={a} style={{ fontFamily: 'var(--f-body)', fontSize: 10, padding: '4px 8px', border: '1px solid var(--hairline-soft)', color: 'var(--ink-mute)' }}>◦ {a}</span>
          ))}
        </div>

        <div style={{ flex: 1 }}/>

        {/* Price + CTA */}
        <div style={{ marginTop: 22, paddingTop: 16, borderTop: '1px solid var(--hairline-soft)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div>
            {oldPrice && <div className="label-ink" style={{ textDecoration: 'line-through', fontSize: 11, color: 'var(--ink-whisper)' }}>€{oldPrice}</div>}
            <div style={{ fontFamily: 'var(--f-display)', fontStyle: 'italic', fontSize: 30, color: 'var(--gold)', lineHeight: 1 }}>€{price}</div>
          </div>
          <button style={{
            padding: '10px 14px', background: 'transparent', border: `1px solid ${c.hex}`, color: c.hex,
            fontFamily: 'var(--f-label)', fontSize: 9, letterSpacing: '0.28em', textTransform: 'uppercase',
            cursor: 'pointer', transition: 'all 0.3s',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = c.hex; e.currentTarget.style.color = 'var(--bg-void)'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = c.hex; }}>
            + Aggiungi
          </button>
        </div>
      </div>
    </div>
  );
}

window.BeautyCollection = BeautyCollection;
window.BeautyCard = BeautyCard;
