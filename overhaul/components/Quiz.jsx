/* Quiz "Trova il tuo rituale" — identifies dominant chakra + suggests bundle */

const { useState: useStateQ } = React;

const QUESTIONS = [
  {
    q: 'Qual è la sensazione più ricorrente nel tuo corpo, in questo momento?',
    sub: 'Ascolta prima di rispondere.',
    options: [
      { t: 'Tensione tra le scapole, voglia di chiudermi.', c: 3 },
      { t: 'Pesantezza alle gambe, terra che manca.',       c: 0 },
      { t: 'Nodo in gola, parole trattenute.',               c: 4 },
      { t: 'Fatica agli occhi, mente iperattiva.',           c: 5 },
    ],
  },
  {
    q: 'La tua giornata ideale inizia con...',
    sub: 'Non quella che hai, quella che vorresti.',
    options: [
      { t: 'Silenzio, luce bassa, lunga meditazione.',       c: 6 },
      { t: 'Movimento intenso, cuore che pompa.',             c: 2 },
      { t: 'Acqua calda, cura lenta, musica.',                c: 1 },
      { t: 'Scrittura, conversazione importante.',            c: 4 },
    ],
  },
  {
    q: 'Quando ti senti bloccato/a, cosa manca davvero?',
    sub: '',
    options: [
      { t: 'Fiducia nel prossimo passo.',                     c: 2 },
      { t: 'Sicurezza economica, stabilità.',                 c: 0 },
      { t: 'Qualcuno che mi veda per davvero.',               c: 3 },
      { t: 'Una visione chiara del futuro.',                  c: 5 },
    ],
  },
  {
    q: 'Il tuo colore preferito, in questo momento della vita...',
    sub: 'Il primo che pensi, non il più bello.',
    options: [
      { t: 'Verde salvia, verde foresta.',                    c: 3 },
      { t: 'Rosso terra, ruggine.',                           c: 0 },
      { t: 'Viola profondo, quasi nero.',                     c: 6 },
      { t: 'Oro caldo, giallo ambra.',                        c: 2 },
    ],
  },
  {
    q: 'Preferisci...',
    sub: '',
    options: [
      { t: 'Un libro di poesie in silenzio.',                 c: 5 },
      { t: 'Ballare fino all\'alba.',                         c: 1 },
      { t: 'Una conversazione vera a mezzanotte.',            c: 4 },
      { t: 'Un\'escursione a piedi nudi.',                    c: 0 },
    ],
  },
  {
    q: 'Cosa eviti, anche se sai che ti farebbe bene?',
    sub: '',
    options: [
      { t: 'Esprimere quello che sento.',                     c: 4 },
      { t: 'Dire no, mettere confini.',                       c: 2 },
      { t: 'Lasciarmi amare.',                                 c: 3 },
      { t: 'Fermarmi a non fare nulla.',                       c: 6 },
    ],
  },
  {
    q: 'Il tuo rapporto con la creatività è...',
    sub: '',
    options: [
      { t: 'Fiume in piena, fatico a contenerlo.',             c: 1 },
      { t: 'Deserto, aspetto la pioggia.',                     c: 1 },
      { t: 'Regolare, pratica quotidiana.',                    c: 2 },
      { t: 'Non so più cosa mi piace davvero.',                c: 5 },
    ],
  },
  {
    q: 'Quando ti svegli di notte, a cosa pensi?',
    sub: '',
    options: [
      { t: 'Al conto in banca, alle bollette.',                c: 0 },
      { t: 'A una persona che non c\'è più.',                  c: 3 },
      { t: 'A sogni che non ricordo ma che mi agitano.',       c: 6 },
      { t: 'A una decisione che rimando.',                      c: 2 },
    ],
  },
  {
    q: 'Cosa chiedi al tuo rituale quotidiano?',
    sub: 'Ultima domanda. Rispondi dal ventre.',
    options: [
      { t: 'Di farmi tornare a casa, dentro me.',               c: 0 },
      { t: 'Di aprirmi, di farmi sentire di nuovo.',            c: 3 },
      { t: 'Di calmare la mente.',                              c: 6 },
      { t: 'Di ritrovare la mia voce.',                         c: 4 },
    ],
  },
];

function QuizPage() {
  const [step, setStep] = useStateQ(-1); // -1 = intro
  const [answers, setAnswers] = useStateQ([]);

  const progress = step < 0 ? 0 : Math.min(1, step / QUESTIONS.length);

  // Tally dominant chakra
  const tally = answers.reduce((acc, idx) => {
    acc[idx] = (acc[idx] || 0) + 1;
    return acc;
  }, {});
  const sorted = Object.entries(tally).sort((a,b) => b[1]-a[1]);
  const dominantIdx = sorted.length ? parseInt(sorted[0][0]) : 3;
  const secondaryIdx = sorted.length > 1 ? parseInt(sorted[1][0]) : 6;
  const dominant = CHAKRAS[dominantIdx];
  const secondary = CHAKRAS[secondaryIdx];

  const answer = (chakraIdx) => {
    const next = [...answers, chakraIdx];
    setAnswers(next);
    setStep(step + 1);
  };

  const restart = () => { setAnswers([]); setStep(-1); };

  return (
    <div className="bz-root grain" style={{ minHeight: '100%', position: 'relative' }}>
      {/* Ambient background */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
        <div style={{
          position: 'absolute', left: '50%', top: '50%',
          width: 1200, height: 1200, transform: 'translate(-50%,-50%)',
          background: `radial-gradient(circle, ${step >= QUESTIONS.length ? dominant.hex : '#9B59B6'}1a, transparent 60%)`,
          filter: 'blur(60px)',
          transition: 'background 1.2s',
        }}/>
      </div>

      {/* Minimal top bar */}
      <div style={{ position: 'relative', zIndex: 2, padding: '24px 48px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--hairline-soft)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <svg width="24" height="24" viewBox="0 0 32 32">
            <circle cx="16" cy="16" r="14" fill="none" stroke="var(--gold)" strokeWidth="0.5"/>
            <circle cx="16" cy="16" r="8" fill="none" stroke="var(--gold)" strokeWidth="0.5"/>
            <circle cx="16" cy="16" r="2" fill="var(--gold)"/>
          </svg>
          <span style={{ fontFamily: 'var(--f-display)', fontStyle: 'italic', fontSize: 16 }}>Benessere Zen</span>
          <span style={{ color: 'var(--ink-whisper)', margin: '0 14px' }}>/</span>
          <span className="label" style={{ color: 'var(--gold)' }}>Trova il tuo rituale</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
          {step >= 0 && step < QUESTIONS.length && (
            <>
              <div className="label-ink">{String(step+1).padStart(2,'0')} / {String(QUESTIONS.length).padStart(2,'0')}</div>
              <div style={{ width: 200, height: 1, background: 'var(--hairline-soft)', position: 'relative' }}>
                <div style={{ position: 'absolute', left: 0, top: 0, height: 1, width: `${progress*100}%`, background: 'var(--gold)' }}/>
              </div>
            </>
          )}
          <button onClick={restart} className="label-ink" style={{ background: 'transparent', border: 0, cursor: 'pointer', color: 'var(--ink-mute)' }}>
            Ricomincia
          </button>
        </div>
      </div>

      <div style={{ position: 'relative', zIndex: 2, padding: '80px 48px', minHeight: 'calc(100% - 73px)' }}>

        {/* INTRO */}
        {step === -1 && (
          <div style={{ maxWidth: 880, margin: '40px auto' }}>
            <div className="label">Protocollo diagnostico · 09 domande</div>
            <h1 style={{ fontSize: 140, lineHeight: 0.9, marginTop: 28, letterSpacing: '-0.03em' }}>
              Trova il tuo<br/><span className="foil">rituale.</span>
            </h1>
            <p style={{ color: 'var(--ink-mute)', fontSize: 18, lineHeight: 1.7, marginTop: 40, maxWidth: 620 }}>
              Nove domande, tre minuti. Non esistono risposte giuste o sbagliate. Rispondi dal corpo,
              non dalla testa. Al termine, tre oggetti scelti per te — un cristallo, un incenso, un tè.
            </p>
            <div style={{ marginTop: 48, display: 'flex', gap: 16 }}>
              <button onClick={() => setStep(0)} className="btn-gold">Inizia il rituale</button>
              <button className="btn-ghost">Come funziona</button>
            </div>

            {/* 7 chakras preview row */}
            <div style={{ marginTop: 80, paddingTop: 40, borderTop: '1px solid var(--hairline-soft)' }}>
              <div className="label-ink" style={{ marginBottom: 24 }}>I sette possibili esiti</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 12 }}>
                {CHAKRAS.map(c => (
                  <div key={c.id} style={{ textAlign: 'center', padding: '20px 8px', border: '1px solid var(--hairline-soft)' }}>
                    <ChakraGlyph chakra={c} size={40} />
                    <div className="sanskrit" style={{ fontSize: 13, color: c.hex, marginTop: 10 }}>{c.sk}</div>
                    <div className="label-ink" style={{ fontSize: 8, marginTop: 4 }}>{c.it}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* QUESTIONS */}
        {step >= 0 && step < QUESTIONS.length && (
          <div style={{ maxWidth: 980, margin: '20px auto' }}>
            <div className="label" style={{ color: 'var(--gold-soft)' }}>Domanda {String(step+1).padStart(2,'0')}</div>
            <h2 style={{ fontSize: 56, marginTop: 18, lineHeight: 1.1, letterSpacing: '-0.01em', maxWidth: 880 }}>
              {QUESTIONS[step].q}
            </h2>
            {QUESTIONS[step].sub && (
              <p style={{ color: 'var(--ink-whisper)', fontFamily: 'var(--f-display)', fontStyle: 'italic', fontSize: 20, marginTop: 12 }}>
                — {QUESTIONS[step].sub}
              </p>
            )}
            <div style={{ marginTop: 56, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18 }}>
              {QUESTIONS[step].options.map((o, i) => (
                <button key={i} onClick={() => answer(o.c)} style={{
                  textAlign: 'left', padding: '28px 32px',
                  background: 'var(--bg-deep)', border: '1px solid var(--hairline-soft)',
                  color: 'var(--ink)', cursor: 'pointer',
                  transition: 'all 0.4s var(--ease-silk)',
                  fontFamily: 'var(--f-display)', fontStyle: 'italic', fontSize: 24, lineHeight: 1.35,
                  display: 'flex', gap: 20, alignItems: 'flex-start',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = CHAKRAS[o.c].hex;
                  e.currentTarget.style.background = 'var(--bg-elev)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'var(--hairline-soft)';
                  e.currentTarget.style.background = 'var(--bg-deep)';
                }}>
                  <span style={{
                    fontFamily: 'var(--f-label)', fontSize: 10, letterSpacing: '0.28em',
                    color: CHAKRAS[o.c].hex, marginTop: 6, minWidth: 18,
                  }}>0{i+1}</span>
                  <span>{o.t}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* RESULT */}
        {step >= QUESTIONS.length && (
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <div className="label" style={{ color: 'var(--gold)' }}>Il tuo rituale · Risultato</div>
            <h1 style={{ fontSize: 72, lineHeight: 1, marginTop: 20 }}>
              Il chakra che chiede di essere ascoltato è
            </h1>

            <div style={{ marginTop: 48, display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: 80, alignItems: 'center' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
                  <div style={{ height: 1, width: 60, background: dominant.hex }}/>
                  <span style={{ color: dominant.hex, fontFamily: 'var(--f-label)', fontSize: 11, letterSpacing: '0.3em' }}>0{dominant.n} / 07</span>
                </div>
                <div className="sanskrit" style={{ fontSize: 32, color: dominant.hex, marginTop: 24 }}>{dominant.sk}</div>
                <h2 style={{ fontSize: 180, lineHeight: 0.85, marginTop: 4, letterSpacing: '-0.04em', color: 'var(--ink)' }}>
                  <span style={{ fontStyle: 'italic' }}>{dominant.it}</span>
                </h2>
                <p style={{ color: 'var(--ink-mute)', fontSize: 16, lineHeight: 1.7, marginTop: 28, maxWidth: 540 }}>
                  {dominant.intent}. Il tuo sistema chiede questo ora: {dominant.product.toLowerCase()}.
                  Ti proponiamo un rituale di 21 giorni composto su misura.
                </p>
                <div style={{ marginTop: 32, display: 'flex', gap: 48 }}>
                  <div>
                    <div className="label-ink">Elemento</div>
                    <div style={{ fontFamily: 'var(--f-display)', fontStyle: 'italic', fontSize: 22, marginTop: 6 }}>{dominant.element}</div>
                  </div>
                  <div>
                    <div className="label-ink">Mantra</div>
                    <div style={{ fontFamily: 'var(--f-display)', fontStyle: 'italic', fontSize: 22, marginTop: 6, color: dominant.hex, letterSpacing: '0.2em' }}>{dominant.mantra}</div>
                  </div>
                  <div>
                    <div className="label-ink">Supporto</div>
                    <div style={{ fontFamily: 'var(--f-display)', fontStyle: 'italic', fontSize: 22, marginTop: 6 }}>{secondary.it}</div>
                  </div>
                </div>
              </div>

              {/* Hero glyph */}
              <div style={{ display: 'flex', justifyContent: 'center', position: 'relative' }}>
                <div style={{
                  position: 'absolute', width: 500, height: 500,
                  borderRadius: '50%',
                  background: `radial-gradient(circle, ${dominant.hex}44, transparent 60%)`,
                  filter: 'blur(30px)',
                }}/>
                <div style={{ position: 'relative' }}>
                  <ChakraGlyph chakra={dominant} size={380} stroke={0.8}/>
                </div>
              </div>
            </div>

            {/* Bundle */}
            <div style={{ marginTop: 100, padding: 48, border: `1px solid ${dominant.hex}`, background: 'var(--bg-deep)', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(135deg, ${dominant.hex}0d, transparent 60%)`, pointerEvents: 'none' }}/>
              <div style={{ position: 'relative', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 36 }}>
                <div>
                  <div className="label" style={{ color: dominant.hex }}>Bundle personale · 21 giorni</div>
                  <h3 style={{ fontSize: 52, marginTop: 12 }}>Il Rituale di <span style={{ color: dominant.hex }}>{dominant.it}</span></h3>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div className="label-ink">Il tuo prezzo</div>
                  <div style={{ fontFamily: 'var(--f-display)', fontStyle: 'italic', fontSize: 72, color: 'var(--gold)', lineHeight: 1 }}>€142</div>
                  <div className="label-ink">invece di €184</div>
                </div>
              </div>

              <div style={{ position: 'relative', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
                {[
                  ['Cristallo', 'Ametista Drusa', 'Posiziona sul terzo occhio.', '148g'],
                  ['Incenso', 'Palo Santo Perù', 'Brucia al mattino, 3 minuti.', '6 bastoncini'],
                  ['Tè', 'Lavanda · Camomilla', 'Infusione serale, 7 minuti.', '50g'],
                ].map(([t,n,d,w], i) => (
                  <div key={i} style={{ border: '1px solid var(--hairline-soft)', padding: 24, background: 'rgba(15,15,15,0.5)' }}>
                    <div className="ph" style={{ aspectRatio: '4/3', marginBottom: 20 }} data-tag={`[ 0${i+1}.jpg ]`}>
                      <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(circle, ${dominant.hex}22, transparent 60%)` }}/>
                    </div>
                    <div className="label" style={{ color: dominant.hex }}>◦ {t}</div>
                    <h4 style={{ fontSize: 24, marginTop: 8 }}>{n}</h4>
                    <p style={{ color: 'var(--ink-mute)', fontSize: 12, marginTop: 8 }}>{d}</p>
                    <div className="label-ink" style={{ marginTop: 14, paddingTop: 14, borderTop: '1px solid var(--hairline-soft)' }}>{w}</div>
                  </div>
                ))}
              </div>

              <div style={{ position: 'relative', marginTop: 36, display: 'flex', gap: 16, justifyContent: 'space-between', alignItems: 'center' }}>
                <div className="label-ink">◦ Librettino rilegato a mano incluso · Spedizione gratuita · 30 giorni di reso</div>
                <div style={{ display: 'flex', gap: 14 }}>
                  <button className="btn-ghost">Salva per dopo</button>
                  <button className="btn-gold">Aggiungi al rituale · €142</button>
                </div>
              </div>
            </div>

            {/* Also recommended */}
            <div style={{ marginTop: 80 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 28 }}>
                <h3 style={{ fontSize: 40 }}>Ti consigliamo anche per <span style={{ color: secondary.hex, fontStyle: 'italic' }}>{secondary.it}</span></h3>
                <a className="label" style={{ color: 'var(--gold)' }}>Collezione {secondary.sk} →</a>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
                {[
                  { chakra: secondary, name: 'Quarzo Rosa', latinName: 'Quartz roseus', price: '62', weight: '180g',
                    properties: ['Amore','Apertura'], usage: 'Tieni sul petto durante tre respirazioni profonde.' },
                  { chakra: secondary, name: 'Rose Essiccate', latinName: 'Rosa damascena', price: '24', weight: '30g',
                    properties: ['Rituale','Bagno'], usage: 'Sciogli nel bagno serale, lascia agire 20 minuti.' },
                  { chakra: secondary, name: 'Tè Rosa Ibisco', latinName: 'Blend artigianale', price: '18', weight: '80g',
                    properties: ['Cuore','Calma'], usage: 'Infusione 5 minuti, a fine pomeriggio.' },
                ].map((p,i) => <ProductCard key={i} {...p} />)}
              </div>
            </div>

            <div style={{ marginTop: 60, textAlign: 'center' }}>
              <button onClick={restart} className="btn-ghost">Rifai il quiz →</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

window.QuizPage = QuizPage;
