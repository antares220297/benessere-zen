/* Journal — editorial blog, dark, magazine-style */

function Journal() {
  const articles = [
    { tag: 'Cristalli', chakra: CHAKRAS[6], title: 'Perché l\'ametista uruguaiana cresce solo a Artigas',
      excerpt: 'Trecento milioni di anni di geologia che il Brasile ha imparato a leggere prima di tutti. Una giornata in cava con la cooperativa che fornisce il nostro atelier.',
      author: 'Sara Lavagna', read: '8 min', date: 'IV · 2026', img: 1, big: true },
    { tag: 'Pratica', chakra: CHAKRAS[3], title: 'Il rituale serale dei 7 minuti', excerpt: 'Un protocollo minimo per chi non riesce a meditare.', author: 'Tommaso V.', read: '4 min', date: 'IV · 2026', img: 2 },
    { tag: 'Tè', chakra: CHAKRAS[2], title: 'Lo zenzero non è un superfood, è un linguaggio', excerpt: 'Storia di una radice che parla quattro idiomi.', author: 'Elena C.', read: '6 min', date: 'III · 2026', img: 3 },
    { tag: 'Incenso', chakra: CHAKRAS[5], title: 'Palo Santo: come sapere se è davvero etico', excerpt: 'Cinque domande da fare al venditore prima di comprare.', author: 'Marco P.', read: '5 min', date: 'III · 2026', img: 4 },
    { tag: 'Pratica', chakra: CHAKRAS[0], title: 'Camminare scalzi, una scienza italiana', excerpt: 'Da Pavia a Bali e ritorno.', author: 'Sara Lavagna', read: '7 min', date: 'II · 2026', img: 5 },
    { tag: 'Cristalli', chakra: CHAKRAS[1], title: 'Corniola e creatività: cosa dice la fisica', excerpt: 'Quello che le pietre fanno davvero al campo bioelettrico.', author: 'Tommaso V.', read: '9 min', date: 'II · 2026', img: 6 },
    { tag: 'Manifesto', chakra: CHAKRAS[4], title: 'Contro lo wellness urlato', excerpt: 'Perché abbiamo aperto un negozio che non parla di benessere.', author: 'Redazione', read: '3 min', date: 'I · 2026', img: 7 },
  ];

  const [filter, setFilter] = React.useState('Tutti');
  const filtered = filter === 'Tutti' ? articles : articles.filter(a => a.tag === filter);

  return (
    <div className="bz-root" style={{ minHeight: '100%' }}>
      {/* Header */}
      <div style={{ padding: '20px 48px', borderBottom: '1px solid var(--hairline-soft)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <svg width="24" height="24" viewBox="0 0 32 32">
            <circle cx="16" cy="16" r="14" fill="none" stroke="var(--gold)" strokeWidth="0.5"/>
            <circle cx="16" cy="16" r="2" fill="var(--gold)"/>
          </svg>
          <span style={{ fontFamily: 'var(--f-display)', fontStyle: 'italic', fontSize: 18 }}>Benessere Zen</span>
          <span style={{ color: 'var(--ink-whisper)', margin: '0 14px' }}>/</span>
          <span className="label" style={{ color: 'var(--gold)' }}>Journal</span>
        </div>
        <span className="label-ink">Numero 014 · Aprile MMXXVI</span>
      </div>

      {/* Masthead */}
      <section style={{ padding: '80px 48px 40px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', right: -100, top: -50, width: 600, height: 600, opacity: 0.06, pointerEvents: 'none' }}>
          <svg width="600" height="600" viewBox="0 0 600 600">
            {[280, 220, 160, 100, 40].map(r => (
              <circle key={r} cx="300" cy="300" r={r} fill="none" stroke="var(--gold)" strokeWidth="0.5"/>
            ))}
          </svg>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 40, alignItems: 'flex-end' }}>
          <div>
            <div className="label">Letture lente · niente click-bait</div>
            <h1 style={{ fontSize: 200, lineHeight: 0.85, marginTop: 24, letterSpacing: '-0.04em' }}>
              <span style={{ fontStyle: 'italic' }}>Journal</span>
            </h1>
          </div>
          <div style={{ textAlign: 'right' }}>
            <p style={{ color: 'var(--ink-mute)', fontSize: 14, lineHeight: 1.7, maxWidth: 360 }}>
              Storie di pietre, mani, monasteri. Saggi brevi che scrivono i nostri editor e
              alcuni amici. Letture lente, in italiano, senza pop-up.
            </p>
          </div>
        </div>
      </section>

      {/* Filters */}
      <div style={{ padding: '0 48px 32px', display: 'flex', gap: 24, borderBottom: '1px solid var(--hairline-soft)' }}>
        {['Tutti','Cristalli','Pratica','Tè','Incenso','Manifesto'].map(f => (
          <button key={f} onClick={() => setFilter(f)} style={{
            background: 'transparent', border: 0, padding: '12px 0', cursor: 'pointer',
            color: filter === f ? 'var(--gold)' : 'var(--ink-mute)',
            borderBottom: filter === f ? '1px solid var(--gold)' : '1px solid transparent',
            fontFamily: 'var(--f-label)', fontSize: 11, letterSpacing: '0.28em', textTransform: 'uppercase',
          }}>{f}</button>
        ))}
      </div>

      {/* Big featured article */}
      {filtered[0] && (
        <section style={{ padding: '60px 48px', borderBottom: '1px solid var(--hairline-soft)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 60, alignItems: 'center' }}>
            <div className="ph" style={{ aspectRatio: '4/3', position: 'relative' }} data-tag={`[ feature-${filtered[0].img}.jpg ]`}>
              <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(circle at 30% 50%, ${filtered[0].chakra.hex}33, transparent 65%)` }}/>
              <div style={{ position: 'absolute', top: 24, left: 24, padding: '6px 12px', background: 'var(--bg-void)', border: `1px solid ${filtered[0].chakra.hex}`, color: filtered[0].chakra.hex, fontFamily: 'var(--f-label)', fontSize: 9, letterSpacing: '0.28em' }}>
                ◦ COVER · {filtered[0].tag.toUpperCase()}
              </div>
            </div>
            <div>
              <div className="label">In copertina · {filtered[0].date}</div>
              <h2 style={{ fontSize: 64, lineHeight: 1, marginTop: 18 }}>
                <span style={{ fontStyle: 'italic' }}>{filtered[0].title}</span>
              </h2>
              <p style={{ fontFamily: 'var(--f-display)', fontStyle: 'italic', fontSize: 22, lineHeight: 1.5, color: 'var(--ink-mute)', marginTop: 24 }}>
                {filtered[0].excerpt}
              </p>
              <div style={{ marginTop: 32, display: 'flex', gap: 24, alignItems: 'center' }}>
                <span className="label">{filtered[0].author}</span>
                <span style={{ width: 4, height: 4, background: 'var(--gold)', borderRadius: '50%' }}/>
                <span className="label-ink">{filtered[0].read} di lettura</span>
                <span style={{ flex: 1 }}/>
                <button className="btn-gold">Leggi tutto →</button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Article grid */}
      <section style={{ padding: '80px 48px 120px' }}>
        <div className="label" style={{ marginBottom: 32 }}>Tutti gli articoli — {filtered.length}</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32 }}>
          {filtered.slice(1).map((a, i) => (
            <article key={i} style={{ cursor: 'pointer' }}>
              <div className="ph" style={{ aspectRatio: '4/5', position: 'relative' }} data-tag={`[ ${a.img}.jpg ]`}>
                <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(circle at 50% 40%, ${a.chakra.hex}33, transparent 65%)` }}/>
                <div style={{ position: 'absolute', top: 16, left: 16, display: 'flex', gap: 8, alignItems: 'center' }}>
                  <div style={{ width: 6, height: 6, borderRadius: '50%', background: a.chakra.hex }}/>
                  <span className="label" style={{ color: a.chakra.hex, fontSize: 8 }}>{a.tag}</span>
                </div>
                <div style={{ position: 'absolute', bottom: 16, left: 16, right: 16, display: 'flex', justifyContent: 'space-between' }}>
                  <span className="label-ink">{a.date}</span>
                  <span className="label-ink">{a.read}</span>
                </div>
              </div>
              <h3 style={{ fontSize: 28, lineHeight: 1.1, marginTop: 18, fontStyle: 'italic' }}>
                {a.title}
              </h3>
              <p style={{ color: 'var(--ink-mute)', fontSize: 13, lineHeight: 1.6, marginTop: 10 }}>{a.excerpt}</p>
              <div style={{ marginTop: 16, paddingTop: 16, borderTop: '1px solid var(--hairline-soft)', display: 'flex', justifyContent: 'space-between' }}>
                <span className="label-ink">{a.author}</span>
                <span style={{ color: 'var(--gold)', fontFamily: 'var(--f-label)', fontSize: 10, letterSpacing: '0.28em', textTransform: 'uppercase' }}>Leggi →</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Newsletter footer */}
      <section style={{ padding: '80px 48px', background: 'var(--bg-deep)', borderTop: '1px solid var(--hairline-soft)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'center' }}>
          <h3 style={{ fontSize: 56, lineHeight: 1 }}>
            Una <span className="foil">lettera</span><br/>al mese, scritta a mano.
          </h3>
          <form style={{ display: 'flex', borderBottom: '1px solid var(--gold)', paddingBottom: 14 }}>
            <input placeholder="la-tua-anima@dominio.it" style={{ flex: 1, background: 'transparent', border: 0, color: 'var(--ink)', fontFamily: 'var(--f-display)', fontStyle: 'italic', fontSize: 24, outline: 'none' }}/>
            <button type="button" style={{ background: 'transparent', border: 0, color: 'var(--gold)', cursor: 'pointer', fontFamily: 'var(--f-label)', letterSpacing: '0.28em', textTransform: 'uppercase', fontSize: 11 }}>Iscrivimi →</button>
          </form>
        </div>
      </section>
    </div>
  );
}

window.Journal = Journal;
