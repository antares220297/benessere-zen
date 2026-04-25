/* Product Detail Page — storytelling esteso, dark editorial */

function PDP({ chakraIndex = 6 }) {
  const c = CHAKRAS[chakraIndex];
  const [variant, setVariant] = React.useState(1);
  const [tab, setTab] = React.useState('rituale');

  return (
    <div className="bz-root" style={{ minHeight: '100%' }}>
      {/* Header (semplificato) */}
      <div style={{ padding: '20px 48px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--hairline-soft)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <svg width="24" height="24" viewBox="0 0 32 32">
            <circle cx="16" cy="16" r="14" fill="none" stroke="var(--gold)" strokeWidth="0.5"/>
            <circle cx="16" cy="16" r="2" fill="var(--gold)"/>
          </svg>
          <span style={{ fontFamily: 'var(--f-display)', fontStyle: 'italic', fontSize: 18 }}>Benessere Zen</span>
        </div>
        <div style={{ display: 'flex', gap: 14, alignItems: 'center' }} className="label-ink">
          <span>Casa</span><span style={{ color: 'var(--ink-whisper)' }}>/</span>
          <span>Sahasrara</span><span style={{ color: 'var(--ink-whisper)' }}>/</span>
          <span style={{ color: c.hex }}>Ametista Drusa</span>
        </div>
      </div>

      {/* Hero gallery + buy column */}
      <section style={{ padding: '48px 48px 80px', display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 64 }}>
        {/* Gallery */}
        <div>
          <div style={{ position: 'relative', aspectRatio: '4/5', background: 'var(--bg-deep)', overflow: 'hidden', border: '1px solid var(--hairline-soft)' }}>
            <div className="ph" style={{ position: 'absolute', inset: 0 }} data-tag={`[ ametista-${variant}.jpg · 2400×3000 ]`}>
              <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(circle at 50% 45%, ${c.hex}33, transparent 65%)` }}/>
              <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%,-50%)', opacity: 0.12 }}>
                <div style={{ width: 280, height: 280, border: `1px solid ${c.hex}`, borderRadius: '50%' }}/>
              </div>
            </div>
            {/* Top-left chakra badge */}
            <div style={{ position: 'absolute', top: 24, left: 24, display: 'flex', alignItems: 'center', gap: 12, padding: '10px 16px', background: 'rgba(15,15,15,0.8)', backdropFilter: 'blur(6px)', border: `1px solid ${c.hex}55` }}>
              <ChakraGlyph chakra={c} size={28}/>
              <div>
                <div style={{ color: c.hex, fontFamily: 'var(--f-label)', fontSize: 8, letterSpacing: '0.3em' }}>0{c.n} / 07 · {c.element.toUpperCase()}</div>
                <div className="sanskrit" style={{ fontSize: 14, color: c.hex }}>{c.sk}</div>
              </div>
            </div>
            {/* Bottom corner spec */}
            <div style={{ position: 'absolute', bottom: 24, right: 24, textAlign: 'right' }}>
              <div className="label-ink">Provenienza</div>
              <div style={{ fontFamily: 'var(--f-display)', fontStyle: 'italic', fontSize: 18, marginTop: 4 }}>Artigas · Uruguay</div>
            </div>
          </div>
          {/* Thumbs */}
          <div style={{ marginTop: 16, display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 12 }}>
            {[1,2,3,4,5].map(i => (
              <button key={i} onClick={() => setVariant(i)} className="ph" style={{
                aspectRatio: '1/1', position: 'relative',
                border: variant === i ? `1px solid ${c.hex}` : '1px solid var(--hairline-soft)',
                cursor: 'pointer', background: 'var(--bg-deep)',
              }} data-tag={`0${i}`}>
                <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(circle, ${c.hex}22, transparent 70%)` }}/>
              </button>
            ))}
          </div>
        </div>

        {/* Buy column */}
        <div>
          <div className="sanskrit" style={{ fontSize: 16, color: c.hex }}>Amethystus uruguaya</div>
          <h1 style={{ fontSize: 80, lineHeight: 0.95, marginTop: 8, letterSpacing: '-0.02em' }}>
            <span style={{ fontStyle: 'italic' }}>Ametista</span><br/>Drusa
          </h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 18 }}>
            <div style={{ display: 'flex', gap: 4 }}>
              {[1,2,3,4,5].map(i => (
                <svg key={i} width="14" height="14" viewBox="0 0 14 14"><polygon points="7,1 9,5 13,5.5 10,9 11,13 7,11 3,13 4,9 1,5.5 5,5" fill="var(--gold)" /></svg>
              ))}
            </div>
            <span className="label-ink">4.9 · 218 rituali condivisi</span>
          </div>

          {/* Price */}
          <div style={{ marginTop: 36, display: 'flex', alignItems: 'baseline', gap: 18 }}>
            <div style={{ fontFamily: 'var(--f-display)', fontStyle: 'italic', fontSize: 64, color: 'var(--gold)', lineHeight: 1 }}>€148</div>
            <div className="label-ink" style={{ textDecoration: 'line-through' }}>€185</div>
            <div style={{ padding: '4px 10px', background: c.hex, color: 'var(--bg-void)', fontFamily: 'var(--f-label)', fontSize: 9, letterSpacing: '0.28em' }}>−20%</div>
          </div>

          {/* Variants — taglie */}
          <div style={{ marginTop: 36 }}>
            <div className="label-ink">Peso · scegli la tua presenza</div>
            <div style={{ marginTop: 14, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
              {[
                ['S','280g','€98'],
                ['M','420g','€148'],
                ['L','680g','€220'],
              ].map(([s, w, p], i) => (
                <button key={s} style={{
                  padding: '16px 12px', textAlign: 'left',
                  border: i === 1 ? `1px solid ${c.hex}` : '1px solid var(--hairline-soft)',
                  background: i === 1 ? 'rgba(155,89,182,0.06)' : 'var(--bg-deep)',
                  color: 'var(--ink)', cursor: 'pointer',
                }}>
                  <div style={{ fontFamily: 'var(--f-display)', fontStyle: 'italic', fontSize: 22, color: i === 1 ? c.hex : 'var(--ink)' }}>{s}</div>
                  <div className="label-ink" style={{ marginTop: 4 }}>{w}</div>
                  <div style={{ fontFamily: 'var(--f-display)', fontStyle: 'italic', fontSize: 18, marginTop: 8, color: 'var(--gold)' }}>{p}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Programmazione (intenzione) — feature unica */}
          <div style={{ marginTop: 28 }}>
            <div className="label-ink">◦ Programma il tuo cristallo (gratuito)</div>
            <div style={{ marginTop: 12, padding: 18, border: `1px dashed ${c.hex}55`, background: 'rgba(155,89,182,0.04)' }}>
              <input placeholder="Scrivi un'intenzione, anche una sola parola." style={{
                width: '100%', background: 'transparent', border: 0, color: 'var(--ink)',
                fontFamily: 'var(--f-display)', fontStyle: 'italic', fontSize: 18, outline: 'none',
              }}/>
              <div className="label-ink" style={{ marginTop: 10, color: 'var(--ink-whisper)' }}>
                Verrà incisa a mano su un cartoncino, accompagnata al rituale.
              </div>
            </div>
          </div>

          {/* CTA */}
          <div style={{ marginTop: 36, display: 'flex', gap: 12 }}>
            <button style={{
              flex: 1, padding: '18px 28px', background: c.hex, border: 'none', color: 'var(--bg-void)',
              fontFamily: 'var(--f-label)', fontSize: 11, letterSpacing: '0.3em', textTransform: 'uppercase', cursor: 'pointer',
            }}>Aggiungi al rituale · €148</button>
            <button style={{
              padding: '18px 24px', background: 'transparent', border: '1px solid var(--hairline)', color: 'var(--ink)',
              fontFamily: 'var(--f-label)', fontSize: 11, letterSpacing: '0.3em', textTransform: 'uppercase', cursor: 'pointer',
            }}>♡</button>
          </div>

          {/* Reassurance */}
          <div style={{ marginTop: 28, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {[
              ['Spedizione', 'Gratuita oltre €49 · 48h'],
              ['Reso', '30 giorni · senza domande'],
              ['Pulitura', 'Salvia bianca, luna piena'],
              ['Origine', 'Cava etica · pulizia a mano'],
            ].map(([t, d]) => (
              <div key={t} style={{ padding: 14, border: '1px solid var(--hairline-soft)' }}>
                <div className="label" style={{ color: c.hex, fontSize: 8 }}>◦ {t}</div>
                <div style={{ fontFamily: 'var(--f-display)', fontStyle: 'italic', fontSize: 14, color: 'var(--ink-mute)', marginTop: 6 }}>{d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Storytelling — capitolo */}
      <section style={{ padding: '120px 48px', borderTop: '1px solid var(--hairline-soft)', background: 'var(--bg-deep)', position: 'relative' }} className="grain">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.3fr', gap: 80, position: 'relative', zIndex: 3, alignItems: 'center' }}>
          <div>
            <div className="label">Capitolo · La pietra</div>
            <h2 style={{ fontSize: 80, lineHeight: 0.95, marginTop: 20 }}>
              Trecento milioni<br/>di <span className="foil">anni</span><br/>che ti guardano.
            </h2>
          </div>
          <div>
            <p style={{ fontFamily: 'var(--f-display)', fontStyle: 'italic', fontSize: 26, lineHeight: 1.5, color: 'var(--ink)' }}>
              L'ametista uruguaiana cresce in geodi che la terra protegge per ere geologiche.
              Quando si apre, la cava resta in silenzio — un istinto sacrale che nessuno ha mai
              codificato in un manuale di estrazione.
            </p>
            <p style={{ color: 'var(--ink-mute)', fontSize: 14, lineHeight: 1.7, marginTop: 24, columnCount: 2, columnGap: 32 }}>
              Lavoriamo solo con la cooperativa di Artigas, dove ogni geode è estratto a mano,
              senza esplosivo. Le punte arrivano in atelier ancora coperte di terra. Le puliamo
              con acqua di sorgente, le passiamo nel fumo di salvia bianca e le programmiamo nella
              notte di luna piena. Niente di tutto questo è teatro: è il modo in cui da otto anni
              prepariamo ogni pietra che spediamo. Quando arriva da te, l'ametista non è un oggetto
              estratto — è un'entità presentata.
            </p>
          </div>
        </div>
      </section>

      {/* Tabs — proprietà / rituale / cura */}
      <section style={{ padding: '100px 48px', borderTop: '1px solid var(--hairline-soft)' }}>
        <div style={{ display: 'flex', gap: 32, borderBottom: '1px solid var(--hairline)', marginBottom: 56 }}>
          {[
            ['rituale', 'Il rituale di 21 giorni'],
            ['proprieta', 'Proprietà energetiche'],
            ['cura', 'Cura del cristallo'],
            ['recensioni', 'Recensioni · 218'],
          ].map(([k, t]) => (
            <button key={k} onClick={() => setTab(k)} style={{
              background: 'transparent', border: 0, padding: '20px 0', cursor: 'pointer',
              color: tab === k ? c.hex : 'var(--ink-mute)',
              borderBottom: tab === k ? `1px solid ${c.hex}` : '1px solid transparent',
              marginBottom: -1,
              fontFamily: 'var(--f-display)', fontStyle: 'italic', fontSize: 22,
            }}>{t}</button>
          ))}
        </div>

        {tab === 'rituale' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32 }}>
            {[
              ['I · II · III', 'Riconoscere', 'Tieni la drusa nelle mani al risveglio. Tre respiri profondi. Ascolta dove il corpo è teso. Non giudicare. Solo nominare.'],
              ['IV · ... · XIV', 'Ascoltare', 'Posiziona la pietra sul comodino, lato sinistro del letto. Per dieci giorni dormi accanto. Annotala al mattino: cosa sogni? cosa ricordi?'],
              ['XV · ... · XXI', 'Integrare', 'Porta un piccolo frammento (incluso) in tasca. Sette giorni. Quando lo tocchi, torna al respiro. La pratica è finita quando la dimentichi.'],
            ].map(([d, t, body], i) => (
              <div key={t} style={{ padding: 0, borderTop: `1px solid ${c.hex}`, paddingTop: 24 }}>
                <div className="label" style={{ color: c.hex }}>{d}</div>
                <h4 style={{ fontFamily: 'var(--f-display)', fontStyle: 'italic', fontSize: 36, marginTop: 14 }}>{t}</h4>
                <p style={{ color: 'var(--ink-mute)', fontSize: 14, lineHeight: 1.7, marginTop: 14 }}>{body}</p>
              </div>
            ))}
          </div>
        )}

        {tab === 'proprieta' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40 }}>
            {[
              ['Meditazione profonda', 'Apre il chakra corona, calma l\'attività mentale incessante.'],
              ['Sonno + sogni lucidi', 'Tradizionalmente posizionata sul comodino per favorire sogni vividi.'],
              ['Intuizione', 'Connette al sé superiore, al senso più ampio della direzione.'],
              ['Trasmutazione', 'Trasforma energie pesanti in lucide. Da vibrazione bassa ad alta.'],
            ].map(([t, d]) => (
              <div key={t} style={{ display: 'flex', gap: 20, padding: '20px 0', borderBottom: '1px solid var(--hairline-soft)' }}>
                <div style={{ width: 48, height: 48, borderRadius: '50%', border: `1px solid ${c.hex}`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: c.hex, fontFamily: 'var(--f-display)', fontStyle: 'italic', flexShrink: 0 }}>◦</div>
                <div>
                  <h5 style={{ fontFamily: 'var(--f-display)', fontStyle: 'italic', fontSize: 22 }}>{t}</h5>
                  <p style={{ color: 'var(--ink-mute)', fontSize: 13, lineHeight: 1.7, marginTop: 6 }}>{d}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === 'cura' && (
          <div style={{ maxWidth: 720 }}>
            <p style={{ fontFamily: 'var(--f-display)', fontStyle: 'italic', fontSize: 22, lineHeight: 1.5, color: 'var(--ink)' }}>
              I cristalli, come noi, hanno bisogno di pulirsi.
            </p>
            <ul style={{ listStyle: 'none', padding: 0, margin: '32px 0 0' }}>
              {[
                'Salvia bianca · una volta al mese, fumigazione di 30 secondi.',
                'Acqua di sorgente · risciacquo breve, mai sale (corrode).',
                'Luna piena · esposizione notturna sul davanzale, non in pieno sole (sbiadisce).',
                'Suono · una campana tibetana per 3 minuti riallinea la struttura.',
              ].map((s, i) => (
                <li key={i} style={{ display: 'flex', gap: 16, padding: '16px 0', borderBottom: '1px solid var(--hairline-soft)' }}>
                  <span style={{ color: c.hex, fontFamily: 'var(--f-label)', fontSize: 11, minWidth: 30 }}>0{i+1}</span>
                  <span style={{ color: 'var(--ink-mute)', fontSize: 15, lineHeight: 1.7 }}>{s}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {tab === 'recensioni' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 24 }}>
            {[
              ['Giulia M.', 'Milano', 'L\'ho ricevuta con il cartoncino dell\'intenzione e ho pianto. Era esattamente quella la parola che cercavo. Da due settimane dorme con me.'],
              ['Tommaso V.', 'Roma', 'Comprata per regalare, tenuta per me. Il packaging è una poesia. La pietra ha una presenza che si sente entrando in stanza.'],
              ['Elena C.', 'Torino', 'Ne avevo già una, ma di tutt\'altra qualità. Questa è viva. Si vedono le sfaccettature anche in penombra. Vale ogni euro.'],
              ['Marco P.', 'Bologna', 'Sono scettico per natura. Non credo a niente. Ma il rituale di 21 giorni nel librettino mi ha cambiato il sonno. Davvero.'],
            ].map(([n, l, t]) => (
              <div key={n} style={{ padding: 28, border: '1px solid var(--hairline-soft)', background: 'var(--bg-deep)' }}>
                <div style={{ display: 'flex', gap: 4, marginBottom: 14 }}>
                  {[1,2,3,4,5].map(i => (
                    <svg key={i} width="12" height="12" viewBox="0 0 14 14"><polygon points="7,1 9,5 13,5.5 10,9 11,13 7,11 3,13 4,9 1,5.5 5,5" fill={c.hex} /></svg>
                  ))}
                </div>
                <p style={{ fontFamily: 'var(--f-display)', fontStyle: 'italic', fontSize: 17, lineHeight: 1.6 }}>« {t} »</p>
                <div style={{ marginTop: 18, display: 'flex', justifyContent: 'space-between' }}>
                  <span className="label">{n}</span>
                  <span className="label-ink">{l} · cliente verificata</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Pairs well with */}
      <section style={{ padding: '100px 48px', borderTop: '1px solid var(--hairline-soft)', background: 'var(--bg-deep)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 36 }}>
          <h3 style={{ fontSize: 48 }}>Si <span style={{ fontStyle: 'italic' }}>accompagna</span> bene a</h3>
          <a className="label" style={{ color: 'var(--gold)' }}>Tutta la collezione →</a>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
          {[
            { chakra: c, name: 'Selenite Bastone', latinName: 'Selenitum candidum', price: '32', weight: '110g',
              properties: ['Purificazione','Chiarezza'], usage: 'Passa sull\'aura da testa ai piedi.' },
            { chakra: c, name: 'Palo Santo', latinName: 'Bursera graveolens', price: '18', weight: '6 bastoncini',
              properties: ['Purificante','Ancestrale'], usage: 'Accendi 3 secondi, soffia, lascia fumare.' },
            { chakra: c, name: 'Tè Lavanda · Camomilla', latinName: 'Blend artigianale · Liguria', price: '16', weight: '60g',
              properties: ['Sonno','Calma'], usage: 'Infusione 7 minuti, prima di dormire.' },
          ].map((p, i) => <ProductCard key={i} {...p} />)}
        </div>
      </section>
    </div>
  );
}

window.PDP = PDP;
