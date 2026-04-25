/* PDP Beauty — Siero Vitamina C */

function BeautyPDP() {
  const c = CHAKRAS[2]; // Manipura — fuoco / vitamina C / illuminante
  const [tab, setTab] = React.useState('storia');
  const [size, setSize] = React.useState('30 ml');
  const [refill, setRefill] = React.useState(false);

  const actives = [
    { it: 'Vitamina C stabilizzata', sk: 'Tetra-isopalmitate', pct: '15%', use: 'Antiossidante · illumina · uniforma' },
    { it: 'Melograno bio', sk: 'Punica granatum', pct: '8%', use: 'Polifenoli · protezione DNA' },
    { it: 'Zenzero bio', sk: 'Zingiber officinale', pct: '3%', use: 'Microcircolo · tono' },
    { it: 'Acido ialuronico', sk: 'Sodium hyaluronate', pct: '2%', use: 'Idratazione superficiale' },
  ];

  const inci = 'Aqua, Tetrahexyldecyl Ascorbate, Glycerin, Punica Granatum Fruit Extract*, Sodium Hyaluronate, Zingiber Officinale Root Extract*, Niacinamide, Ferulic Acid, Tocopherol, Panthenol, Aloe Barbadensis Leaf Juice*, Citric Acid, Sodium Phytate, Phenoxyethanol, Ethylhexylglycerin, Parfum (natural).';

  return (
    <div className="bz-root" style={{ minHeight: '100%' }}>
      {/* Header */}
      <div style={{ padding: '20px 48px', borderBottom: '1px solid var(--hairline-soft)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <svg width="24" height="24" viewBox="0 0 32 32"><circle cx="16" cy="16" r="14" fill="none" stroke="var(--gold)" strokeWidth="0.5"/><circle cx="16" cy="16" r="2" fill="var(--gold)"/></svg>
          <span style={{ fontFamily: 'var(--f-display)', fontStyle: 'italic', fontSize: 18 }}>Benessere Zen</span>
        </div>
        <div className="label-ink" style={{ display: 'flex', gap: 14 }}>
          <span>Cosmesi</span><span style={{ color: 'var(--ink-whisper)' }}>/</span>
          <span>Sieri</span><span style={{ color: 'var(--ink-whisper)' }}>/</span>
          <span style={{ color: 'var(--gold)' }}>Vitamina C</span>
        </div>
      </div>

      {/* Hero — gallery + info */}
      <section style={{ position: 'relative', padding: '60px 48px 80px', minHeight: 820 }}>
        <div style={{ position: 'absolute', right: -300, top: -100, width: 1000, height: 1000, background: `radial-gradient(circle, ${c.hex}1f, transparent 60%)`, filter: 'blur(60px)', pointerEvents: 'none' }}/>
        <div style={{ position: 'relative', display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: 60, alignItems: 'flex-start' }}>
          {/* Gallery */}
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: '88px 1fr', gap: 16 }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {[1,2,3,4].map(i => (
                  <div key={i} className="ph" style={{ aspectRatio: '1/1', cursor: 'pointer', border: i === 1 ? `1px solid ${c.hex}` : '1px solid var(--hairline-soft)' }} data-tag={`0${i}`}>
                    <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(circle, ${c.hex}22, transparent 60%)` }}/>
                  </div>
                ))}
              </div>
              <div className="ph" style={{ aspectRatio: '4/5', position: 'relative', overflow: 'hidden' }} data-tag="[ siero-vit-c-hero.jpg ]">
                <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(circle at 50% 60%, ${c.hex}33, transparent 65%)` }}/>
                <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', opacity: 0.22 }}>
                  <svg width="180" height="280" viewBox="0 0 100 160">
                    <rect x="38" y="6" width="24" height="22" fill="none" stroke={c.hex} strokeWidth="0.6"/>
                    <path d="M 32 28 L 32 150 Q 32 158 40 158 L 60 158 Q 68 158 68 150 L 68 28 Z" fill="none" stroke={c.hex} strokeWidth="0.6"/>
                    <line x1="36" y1="80" x2="64" y2="80" stroke={c.hex} strokeWidth="0.4" strokeDasharray="1 2"/>
                    <text x="50" y="100" textAnchor="middle" fill={c.hex} fontFamily="serif" fontStyle="italic" fontSize="6" opacity="0.5">vitamina · C</text>
                  </svg>
                </div>
                <div style={{ position: 'absolute', top: 16, left: 16, padding: '4px 10px', background: c.hex, color: 'var(--bg-void)', fontFamily: 'var(--f-label)', fontSize: 9, letterSpacing: '0.28em' }}>STAR</div>
                <div style={{ position: 'absolute', bottom: 16, right: 16, color: c.hex, fontFamily: 'var(--f-label)', fontSize: 10, letterSpacing: '0.28em' }}>15% VIT.C</div>
              </div>
            </div>
            {/* Lab proof strip */}
            <div style={{ marginTop: 18, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 0, border: '1px solid var(--hairline)' }}>
              {[
                ['+86%', 'luminosità', '4 sett.'],
                ['-43%', 'macchie', '8 sett.'],
                ['98%', 'origine naturale', 'INCI'],
                ['0', 'siliconi · solfati', 'sempre'],
              ].map(([n, l, sub], i) => (
                <div key={i} style={{ padding: '20px 16px', borderLeft: i ? '1px solid var(--hairline)' : 0, textAlign: 'center' }}>
                  <div style={{ fontFamily: 'var(--f-display)', fontStyle: 'italic', fontSize: 32, color: c.hex, lineHeight: 1 }}>{n}</div>
                  <div className="label-ink" style={{ marginTop: 6 }}>{l}</div>
                  <div className="label-ink" style={{ marginTop: 2, color: 'var(--ink-whisper)' }}>{sub}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Info column */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: c.hex, boxShadow: `0 0 8px ${c.hex}` }}/>
              <span className="label" style={{ color: c.hex }}>0{c.n}/07 · {c.it} · Plesso solare</span>
            </div>
            <h1 style={{ fontSize: 88, lineHeight: 0.92, marginTop: 16, letterSpacing: '-0.02em' }}>
              <span style={{ fontStyle: 'italic' }}>Siero Viso</span><br/>Vitamina C.
            </h1>
            <p style={{ fontFamily: 'var(--f-display)', fontStyle: 'italic', fontSize: 22, lineHeight: 1.5, color: 'var(--ink-mute)', marginTop: 20, maxWidth: 480 }}>
              Antiossidante. Illuminante. Anti-age. Tre gocce, viso pulito, mattina.
            </p>

            {/* Rating */}
            <div style={{ marginTop: 24, display: 'flex', alignItems: 'center', gap: 14 }}>
              <div style={{ display: 'flex', gap: 3 }}>
                {[1,2,3,4,5].map(i => (
                  <svg key={i} width="14" height="14" viewBox="0 0 14 14"><polygon points="7,1 9,5 13,5.5 10,9 11,13 7,11 3,13 4,9 1,5.5 5,5" fill={c.hex}/></svg>
                ))}
              </div>
              <span className="label-ink">4.9 · 312 recensioni verificate</span>
            </div>

            {/* Price */}
            <div style={{ marginTop: 36, display: 'flex', alignItems: 'flex-end', gap: 16 }}>
              <div style={{ fontFamily: 'var(--f-display)', fontStyle: 'italic', fontSize: 64, color: 'var(--gold)', lineHeight: 1 }}>€32,50</div>
              <div style={{ fontFamily: 'var(--f-body)', fontSize: 14, color: 'var(--ink-whisper)', textDecoration: 'line-through', paddingBottom: 10 }}>€39</div>
              <div className="label" style={{ color: c.hex, paddingBottom: 12 }}>− 17%</div>
            </div>
            <div className="label-ink" style={{ marginTop: 6 }}>oppure 3 rate da €10,83 · senza interessi</div>

            {/* Size selector */}
            <div style={{ marginTop: 36 }}>
              <div className="label-ink">◦ Formato</div>
              <div style={{ marginTop: 10, display: 'flex', gap: 8 }}>
                {['15 ml','30 ml','50 ml'].map(s => (
                  <button key={s} onClick={() => setSize(s)} style={{
                    padding: '14px 18px',
                    background: size === s ? `${c.hex}14` : 'transparent',
                    border: size === s ? `1px solid ${c.hex}` : '1px solid var(--hairline-soft)',
                    color: size === s ? c.hex : 'var(--ink-mute)',
                    cursor: 'pointer',
                    fontFamily: 'var(--f-display)', fontStyle: 'italic', fontSize: 18,
                  }}>{s}</button>
                ))}
              </div>
            </div>

            {/* Refill toggle */}
            <div style={{ marginTop: 24, padding: 18, border: '1px solid var(--hairline-soft)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }} onClick={() => setRefill(!refill)}>
              <div>
                <div className="label" style={{ color: c.hex }}>◦ Ricarica · risparmia €5 · risparmia 78% di vetro</div>
                <div className="label-ink" style={{ marginTop: 6 }}>Ti spediamo solo il refill in vetro leggero, riusi il dispenser.</div>
              </div>
              <div style={{
                width: 44, height: 24, borderRadius: 12,
                background: refill ? c.hex : 'var(--hairline-soft)',
                position: 'relative', transition: 'background 0.3s',
              }}>
                <div style={{
                  width: 20, height: 20, borderRadius: 10, background: 'var(--bg-void)',
                  position: 'absolute', top: 2, left: refill ? 22 : 2, transition: 'left 0.3s',
                }}/>
              </div>
            </div>

            {/* CTA */}
            <div style={{ marginTop: 28, display: 'flex', gap: 12 }}>
              <button style={{ flex: 1, padding: '20px 28px', background: c.hex, color: 'var(--bg-void)', border: 0, cursor: 'pointer', fontFamily: 'var(--f-label)', fontSize: 11, letterSpacing: '0.32em', textTransform: 'uppercase' }}>
                Aggiungi al rituale · €{refill ? '27,50' : '32,50'}
              </button>
              <button style={{ padding: '20px 22px', background: 'transparent', border: '1px solid var(--hairline)', color: 'var(--ink)', cursor: 'pointer' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
              </button>
            </div>

            {/* Reassurance */}
            <div style={{ marginTop: 24, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 0, borderTop: '1px solid var(--hairline-soft)', borderBottom: '1px solid var(--hairline-soft)' }}>
              {[
                ['Spedizione', 'Gratuita > €49'],
                ['Reso', '30 giorni'],
                ['INCI', 'Pubblico, sempre'],
              ].map(([k, v]) => (
                <div key={k} style={{ padding: '16px 12px', borderLeft: k === 'Reso' ? '1px solid var(--hairline-soft)' : 0, borderRight: k === 'Reso' ? '1px solid var(--hairline-soft)' : 0 }}>
                  <div className="label-ink">◦ {k}</div>
                  <div style={{ fontFamily: 'var(--f-display)', fontStyle: 'italic', fontSize: 14, marginTop: 4 }}>{v}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Tabs section */}
      <section style={{ padding: '0 48px', borderTop: '1px solid var(--hairline-soft)', background: 'var(--bg-deep)' }}>
        <div style={{ borderBottom: '1px solid var(--hairline-soft)', display: 'flex', gap: 0 }}>
          {[
            ['storia', 'La storia'],
            ['ingredienti', 'Ingredienti'],
            ['routine', 'Come si usa'],
            ['inci', 'INCI completo'],
            ['recensioni', 'Recensioni · 312'],
          ].map(([k, l]) => (
            <button key={k} onClick={() => setTab(k)} style={{
              padding: '24px 32px', background: 'transparent', border: 0, cursor: 'pointer',
              color: tab === k ? c.hex : 'var(--ink-mute)',
              borderBottom: tab === k ? `1px solid ${c.hex}` : '1px solid transparent',
              fontFamily: 'var(--f-display)', fontStyle: 'italic', fontSize: 20,
            }}>{l}</button>
          ))}
        </div>

        <div style={{ padding: '60px 0' }}>
          {tab === 'storia' && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}>
              <div>
                <div className="label" style={{ color: c.hex }}>◦ La storia</div>
                <h3 style={{ fontSize: 64, lineHeight: 0.95, marginTop: 16 }}>Il <span className="foil">fuoco</span> dell'amla.</h3>
                <p style={{ color: 'var(--ink-mute)', fontSize: 16, lineHeight: 1.85, marginTop: 24 }}>
                  In India la chiamano amla. Una bacca verde-gialla che contiene venti volte
                  la vitamina C di un'arancia. Negli Sri Yantra ayurvedici è uno dei <em style={{ color: 'var(--gold)' }}>rasayana</em> —
                  le piante della giovinezza.
                </p>
                <p style={{ color: 'var(--ink-mute)', fontSize: 16, lineHeight: 1.85, marginTop: 16 }}>
                  Noi non usiamo l'estratto crudo (instabile, ossida in 48h): usiamo
                  Tetrahexyldecyl Ascorbate al 15%, una forma stabilizzata e liposolubile
                  che penetra senza irritare. Il melograno e lo zenzero amplificano il gesto.
                </p>
                <div style={{ marginTop: 32, display: 'flex', gap: 30 }}>
                  <div><div className="label-ink">◦ Origine</div><div style={{ fontFamily: 'var(--f-display)', fontStyle: 'italic', fontSize: 22, marginTop: 6 }}>Tamil Nadu · IT</div></div>
                  <div><div className="label-ink">◦ Conservazione</div><div style={{ fontFamily: 'var(--f-display)', fontStyle: 'italic', fontSize: 22, marginTop: 6 }}>Vetro ambrato</div></div>
                  <div><div className="label-ink">◦ pH</div><div style={{ fontFamily: 'var(--f-display)', fontStyle: 'italic', fontSize: 22, marginTop: 6 }}>5,5 — 6,0</div></div>
                </div>
              </div>
              <div className="ph" style={{ aspectRatio: '4/5', position: 'relative' }} data-tag="[ amla.jpg ]">
                <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(circle, ${c.hex}22, transparent 70%)` }}/>
              </div>
            </div>
          )}

          {tab === 'ingredienti' && (
            <div>
              <div className="label" style={{ color: c.hex }}>◦ Quattro attivi · concentrati</div>
              <h3 style={{ fontSize: 56, lineHeight: 1, marginTop: 16 }}>Cosa lavora<br/>davvero.</h3>
              <div style={{ marginTop: 40, display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 20 }}>
                {actives.map(a => (
                  <div key={a.it} style={{ padding: 28, border: '1px solid var(--hairline-soft)', background: 'var(--bg-void)', display: 'grid', gridTemplateColumns: '80px 1fr', gap: 20 }}>
                    <div style={{
                      width: 80, height: 80, borderRadius: '50%',
                      background: `radial-gradient(circle, ${c.hex}33, ${c.hex}08 70%)`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      border: `1px solid ${c.hex}55`,
                    }}>
                      <div style={{ fontFamily: 'var(--f-display)', fontStyle: 'italic', fontSize: 22, color: c.hex }}>{a.pct}</div>
                    </div>
                    <div>
                      <div className="sanskrit" style={{ fontSize: 13, color: 'var(--gold)' }}>{a.sk}</div>
                      <div style={{ fontFamily: 'var(--f-display)', fontStyle: 'italic', fontSize: 26, marginTop: 4 }}>{a.it}</div>
                      <div className="label-ink" style={{ marginTop: 10, paddingTop: 10, borderTop: '1px solid var(--hairline-soft)' }}>{a.use}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {tab === 'routine' && (
            <div>
              <div className="label" style={{ color: c.hex }}>◦ Mattina · 90 secondi</div>
              <h3 style={{ fontSize: 56, lineHeight: 1, marginTop: 16 }}>Come si <span className="foil">usa</span>.</h3>
              <div style={{ marginTop: 40, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 0, border: '1px solid var(--hairline)' }}>
                {[
                  ['I', 'Pelle pulita', 'Detergi e tampona. Il siero ama la pelle leggermente umida.'],
                  ['II', '3 gocce', 'Sul polpastrello. Mai sul cotone, sprechi metà del prodotto.'],
                  ['III', 'Picchietta', 'Dal centro verso l\'esterno. Niente sfregamento.'],
                  ['IV', 'SPF', 'Sempre. La vitamina C senza protezione fa il danno opposto.'],
                ].map(([r, t, d], i) => (
                  <div key={r} style={{ padding: 32, borderLeft: i ? '1px solid var(--hairline)' : 0, background: 'var(--bg-void)' }}>
                    <div style={{ fontFamily: 'var(--f-display)', fontStyle: 'italic', fontSize: 64, color: c.hex, lineHeight: 1 }}>{r}</div>
                    <div style={{ fontFamily: 'var(--f-display)', fontStyle: 'italic', fontSize: 22, marginTop: 18 }}>{t}</div>
                    <p style={{ color: 'var(--ink-mute)', fontSize: 13, lineHeight: 1.6, marginTop: 12 }}>{d}</p>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 32, padding: 24, border: `1px solid ${c.hex}55`, background: 'rgba(255,107,53,0.04)', display: 'flex', gap: 20 }}>
                <div style={{ color: c.hex, fontFamily: 'var(--f-label)', fontSize: 11, letterSpacing: '0.3em', flexShrink: 0 }}>◦ ATTENZIONE</div>
                <p style={{ color: 'var(--ink-mute)', fontSize: 13, lineHeight: 1.7, margin: 0 }}>
                  Non sovrapporre con retinolo o niacinamide pura nello stesso momento. Alterna:
                  vitamina C al mattino, retinolo la sera. Pelli sensibili: parti a giorni alterni
                  per la prima settimana.
                </p>
              </div>
            </div>
          )}

          {tab === 'inci' && (
            <div style={{ maxWidth: 880 }}>
              <div className="label" style={{ color: c.hex }}>◦ Trasparenza totale</div>
              <h3 style={{ fontSize: 56, lineHeight: 1, marginTop: 16 }}>Tutto, in ordine.</h3>
              <p style={{ color: 'var(--ink-mute)', fontSize: 14, lineHeight: 1.7, marginTop: 24, marginBottom: 32 }}>
                INCI completo, in ordine decrescente. Asterisco (*) = origine biologica certificata.
              </p>
              <div style={{ padding: 32, border: '1px solid var(--hairline-soft)', background: 'var(--bg-void)', fontFamily: 'ui-monospace, monospace', fontSize: 13, lineHeight: 2, color: 'var(--ink)' }}>
                {inci}
              </div>
              <div style={{ marginTop: 24, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {['Vegan','Cruelty-free','No siliconi','No solfati','No PEG','No paraffine','No oli minerali','No coloranti','Bio-cert.'].map(b => (
                  <span key={b} style={{ padding: '6px 12px', border: `1px solid ${c.hex}`, color: c.hex, fontFamily: 'var(--f-label)', fontSize: 9, letterSpacing: '0.24em', textTransform: 'uppercase' }}>◦ {b}</span>
                ))}
              </div>
            </div>
          )}

          {tab === 'recensioni' && (
            <div>
              <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: 60 }}>
                <div>
                  <div className="label" style={{ color: c.hex }}>◦ 312 recensioni</div>
                  <div style={{ fontFamily: 'var(--f-display)', fontStyle: 'italic', fontSize: 120, color: 'var(--gold)', lineHeight: 1, marginTop: 20 }}>4,9</div>
                  <div style={{ display: 'flex', gap: 4, marginTop: 8 }}>
                    {[1,2,3,4,5].map(i => (
                      <svg key={i} width="20" height="20" viewBox="0 0 14 14"><polygon points="7,1 9,5 13,5.5 10,9 11,13 7,11 3,13 4,9 1,5.5 5,5" fill={c.hex}/></svg>
                    ))}
                  </div>
                  <div style={{ marginTop: 28, display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {[[5,278],[4,26],[3,6],[2,2],[1,0]].map(([s, n]) => (
                      <div key={s} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <span className="label-ink" style={{ width: 16 }}>{s}★</span>
                        <div style={{ flex: 1, height: 4, background: 'var(--hairline-soft)' }}>
                          <div style={{ height: 4, width: `${(n/312)*100}%`, background: c.hex }}/>
                        </div>
                        <span className="label-ink" style={{ width: 32, textAlign: 'right' }}>{n}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                  {[
                    ['Chiara M.', 'Verificata · 32 anni · pelle mista', 'L\'ho usato 6 settimane. Le macchie post-acne sul mento si sono davvero attenuate. Non pizzica come altre vit.C che ho provato.', 5, '14 marzo 2026'],
                    ['Eleonora P.', 'Verificata · 41 anni · pelle secca', 'Texture leggerissima, si assorbe in 30 secondi. Sotto la crema da giorno è perfetto. Il packaging in vetro ambrato è una piccola gioia quotidiana.', 5, '8 marzo 2026'],
                    ['Marta L.', 'Verificata · 28 anni · pelle sensibile', 'Avevo paura, vit.C su pelle sensibile è sempre un terno al lotto. Per la prima settimana ho fatto a giorni alterni come consigliato. Nessun rossore.', 5, '2 marzo 2026'],
                  ].map(([name, meta, body, rating, date], i) => (
                    <div key={i} style={{ padding: 28, border: '1px solid var(--hairline-soft)', background: 'var(--bg-void)' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <div>
                          <div style={{ fontFamily: 'var(--f-display)', fontStyle: 'italic', fontSize: 22 }}>{name}</div>
                          <div className="label-ink" style={{ marginTop: 4 }}>{meta}</div>
                        </div>
                        <div style={{ display: 'flex', gap: 3 }}>
                          {[1,2,3,4,5].map(s => (
                            <svg key={s} width="12" height="12" viewBox="0 0 14 14"><polygon points="7,1 9,5 13,5.5 10,9 11,13 7,11 3,13 4,9 1,5.5 5,5" fill={s <= rating ? c.hex : 'var(--hairline-soft)'}/></svg>
                          ))}
                        </div>
                      </div>
                      <p style={{ color: 'var(--ink)', fontSize: 15, lineHeight: 1.7, marginTop: 16, fontFamily: 'var(--f-display)', fontStyle: 'italic' }}>« {body} »</p>
                      <div className="label-ink" style={{ marginTop: 14 }}>{date}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Pairings */}
      <section style={{ padding: '100px 48px', borderTop: '1px solid var(--hairline-soft)' }}>
        <div className="label" style={{ color: 'var(--gold)' }}>◦ Completa il rituale</div>
        <h2 style={{ fontSize: 72, lineHeight: 0.95, marginTop: 16 }}>Va d'accordo<br/>con <span className="foil">questi</span>.</h2>
        <div style={{ marginTop: 48, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
          {[
            ['Tonico Rosa Damascena', '€22,50', 'Prima del siero · pelle umida'],
            ['Crema Notte Rigenerante', '€44,50', 'La sera · alterna a retinolo'],
            ['Maschera Curcuma', '€32,90', 'Una volta a settimana'],
          ].map(([n, p, w]) => (
            <div key={n} style={{ border: '1px solid var(--hairline-soft)', background: 'var(--bg-deep)', padding: 28, display: 'flex', gap: 20 }}>
              <div className="ph" style={{ width: 100, aspectRatio: '3/4', flexShrink: 0, position: 'relative' }} data-tag="">
                <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(circle, ${c.hex}22, transparent 60%)` }}/>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ fontFamily: 'var(--f-display)', fontStyle: 'italic', fontSize: 22, lineHeight: 1.2 }}>{n}</div>
                <div className="label-ink" style={{ marginTop: 8 }}>{w}</div>
                <div style={{ flex: 1 }}/>
                <div style={{ fontFamily: 'var(--f-display)', fontStyle: 'italic', fontSize: 22, color: 'var(--gold)' }}>{p}</div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

window.BeautyPDP = BeautyPDP;
