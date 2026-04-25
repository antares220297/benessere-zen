/* Product Card — dark mode with spiritual properties + usage guide */

function ProductCard({ chakra, name, latinName, price, oldPrice, weight, usage, properties, tag, size = 'default' }) {
  const c = chakra;
  return (
    <div style={{
      background: 'var(--bg-deep)',
      border: '1px solid var(--hairline-soft)',
      position: 'relative',
      display: 'flex', flexDirection: 'column',
      cursor: 'pointer',
      transition: 'border-color 0.4s var(--ease-silk)',
    }}
    onMouseEnter={e => e.currentTarget.style.borderColor = c.hex}
    onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--hairline-soft)'}>

      {/* Tag ribbon */}
      {tag && (
        <div style={{
          position: 'absolute', top: 16, right: 16, zIndex: 3,
          padding: '6px 12px', background: 'var(--bg-void)',
          border: `1px solid ${c.hex}`, color: c.hex,
          fontFamily: 'var(--f-label)', fontSize: 9, letterSpacing: '0.28em', textTransform: 'uppercase',
        }}>
          {tag}
        </div>
      )}

      {/* Chakra indicator */}
      <div style={{ position: 'absolute', top: 16, left: 16, zIndex: 3, display: 'flex', alignItems: 'center', gap: 8 }}>
        <div style={{ width: 6, height: 6, borderRadius: '50%', background: c.hex, boxShadow: `0 0 8px ${c.hex}` }}/>
        <span className="label" style={{ color: c.hex, fontSize: 8 }}>0{c.n} / {c.it}</span>
      </div>

      {/* Image */}
      <div className="ph" style={{ aspectRatio: '1/1', position: 'relative' }} data-tag={`[ product-shot.jpg ]`}>
        <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(circle at 50% 55%, ${c.hex}22, transparent 65%)` }}/>
        {/* Faux product silhouette — just a subtle shape, not an illustration */}
        <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%,-50%)', opacity: 0.08 }}>
          <div style={{ width: 120, height: 120, border: `1px solid ${c.hex}`, borderRadius: '50%' }}/>
        </div>
        {/* bottom gradient for labels */}
        <div style={{ position: 'absolute', bottom: 14, left: 14, right: 14, display: 'flex', justifyContent: 'space-between' }}>
          <span className="label-ink" style={{ color: 'var(--ink-whisper)' }}>{weight}</span>
          <span className="label-ink" style={{ color: 'var(--ink-whisper)' }}>Edizione limitata</span>
        </div>
      </div>

      {/* Body */}
      <div style={{ padding: '24px 24px 28px' }}>
        <div className="sanskrit" style={{ fontSize: 13, color: 'var(--ink-whisper)' }}>{latinName}</div>
        <h3 style={{ fontSize: 30, marginTop: 4, lineHeight: 1.05 }}>{name}</h3>

        {/* Properties */}
        <div style={{ marginTop: 18, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {properties.map(p => (
            <span key={p} style={{
              fontFamily: 'var(--f-label)', fontSize: 9, letterSpacing: '0.22em', textTransform: 'uppercase',
              padding: '5px 10px', border: '1px solid var(--hairline)', color: 'var(--ink-mute)',
            }}>{p}</span>
          ))}
        </div>

        {/* Usage */}
        <div style={{ marginTop: 22, padding: '14px 0', borderTop: '1px solid var(--hairline-soft)', borderBottom: '1px solid var(--hairline-soft)' }}>
          <div className="label-ink" style={{ color: c.hex, fontSize: 9 }}>◦ Guida uso</div>
          <p style={{ color: 'var(--ink-mute)', fontSize: 12, lineHeight: 1.6, marginTop: 8 }}>{usage}</p>
        </div>

        {/* Price + CTA */}
        <div style={{ marginTop: 22, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div>
            {oldPrice && <div style={{ color: 'var(--ink-whisper)', fontSize: 12, textDecoration: 'line-through' }}>€{oldPrice}</div>}
            <div style={{ fontFamily: 'var(--f-display)', fontStyle: 'italic', fontSize: 32, color: 'var(--gold)' }}>€{price}</div>
          </div>
          <button style={{
            padding: '12px 18px', background: 'transparent', border: `1px solid ${c.hex}`, color: c.hex,
            fontFamily: 'var(--f-label)', fontSize: 10, letterSpacing: '0.28em', textTransform: 'uppercase',
            cursor: 'pointer', transition: 'all 0.3s var(--ease-silk)',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = c.hex; e.currentTarget.style.color = 'var(--bg-void)'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = c.hex; }}>
            Aggiungi →
          </button>
        </div>
      </div>
    </div>
  );
}

// Sample grid for showcase
function ProductCardShowcase() {
  const items = [
    { chakra: CHAKRAS[6], name: 'Ametista Drusa', latinName: 'Amethystus uruguaya', price: '148', oldPrice: '185',
      weight: '420 g', tag: 'Nuovo',
      properties: ['Meditazione','Sonno','Intuizione'],
      usage: 'Posiziona accanto al cuscino o sul terzo occhio per 11 minuti prima di dormire. Purifica con fumo di salvia alla luna piena.' },
    { chakra: CHAKRAS[3], name: 'Quarzo Rosa Grezzo', latinName: 'Quartz roseus madagascariensis', price: '62',
      weight: '180 g', tag: 'Rituale',
      properties: ['Amore','Compassione','Guarigione'],
      usage: 'Tieni sul petto durante tre respirazioni profonde. Programmalo con un’intenzione al mattino, davanti alla finestra est.' },
    { chakra: CHAKRAS[0], name: 'Ossidiana Nera', latinName: 'Obsidianum niger', price: '38',
      weight: '90 g',
      properties: ['Radicamento','Protezione','Verità'],
      usage: 'Camminare scalzi tenendolo nella mano destra. Ripulisce l’aura in tre minuti. Da non portare oltre sette giorni consecutivi.' },
  ];
  return (
    <div style={{ padding: 60, background: 'var(--bg-void)' }} className="bz-root">
      <div style={{ marginBottom: 40 }}>
        <div className="label">Componente · Product Card</div>
        <h2 style={{ fontSize: 48, marginTop: 12 }}>Le schede prodotto</h2>
        <p style={{ color: 'var(--ink-mute)', fontSize: 14, marginTop: 12, maxWidth: 600 }}>
          Ogni prodotto appartiene a un chakra, porta le sue proprietà, la sua guida d'uso e il suo prezzo in oro.
        </p>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
        {items.map((it, i) => <ProductCard key={i} {...it} />)}
      </div>
    </div>
  );
}

window.ProductCard = ProductCard;
window.ProductCardShowcase = ProductCardShowcase;
