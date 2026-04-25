/* Editorial long-form — "Cos'è l'Ayurveda" */

function AyurvedaArticle() {
  return (
    <div className="bz-root" style={{ minHeight: '100%' }}>
      {/* Top meta bar */}
      <div style={{ padding: '20px 48px', borderBottom: '1px solid var(--hairline-soft)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <svg width="24" height="24" viewBox="0 0 32 32"><circle cx="16" cy="16" r="14" fill="none" stroke="var(--gold)" strokeWidth="0.5"/><circle cx="16" cy="16" r="2" fill="var(--gold)"/></svg>
          <span style={{ fontFamily: 'var(--f-display)', fontStyle: 'italic', fontSize: 18 }}>Benessere Zen</span>
        </div>
        <div className="label-ink" style={{ display: 'flex', gap: 14 }}>
          <span>Journal</span><span style={{ color: 'var(--ink-whisper)' }}>/</span>
          <span>Numero 014</span><span style={{ color: 'var(--ink-whisper)' }}>/</span>
          <span style={{ color: 'var(--gold)' }}>Cos'è l'Ayurveda</span>
        </div>
      </div>

      {/* Editorial cover */}
      <section style={{ position: 'relative', padding: '120px 48px 100px', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', left: '50%', top: '40%', transform: 'translate(-50%, -50%)', pointerEvents: 'none', opacity: 0.05 }}>
          <div style={{ fontFamily: 'var(--f-display)', fontStyle: 'italic', fontSize: 520, color: 'var(--gold)', lineHeight: 0.85, letterSpacing: '-0.04em' }}>आयुर्वेद</div>
        </div>
        <div style={{ position: 'relative', maxWidth: 1100, margin: '0 auto', textAlign: 'center' }}>
          <div className="label" style={{ color: 'var(--gold)' }}>◦ Saggio · Letture lente · 12 minuti</div>
          <h1 style={{ fontSize: 188, lineHeight: 0.85, marginTop: 36, letterSpacing: '-0.04em' }}>
            Cos'è<br/><span style={{ fontStyle: 'italic' }}>l'Ayurveda</span>.
          </h1>
          <p style={{ fontFamily: 'var(--f-display)', fontStyle: 'italic', fontSize: 26, lineHeight: 1.5, color: 'var(--ink-mute)', marginTop: 48, maxWidth: 740, margin: '48px auto 0' }}>
            Cinquemila anni prima della farmacia di quartiere, in India qualcuno scriveva
            che la salute non è l'assenza di malattia. È <span className="foil">equilibrio</span>.
          </p>
          <div style={{ marginTop: 56, display: 'flex', justifyContent: 'center', gap: 40, fontFamily: 'var(--f-label)', fontSize: 10, letterSpacing: '0.28em', color: 'var(--ink-mute)' }}>
            <span>◦ DI · Maria Lavinia Conti</span>
            <span>◦ FOTO · Studio Vajra</span>
            <span>◦ APRILE · MMXXVI</span>
          </div>
        </div>
      </section>

      {/* Pull quote opener */}
      <section style={{ padding: '0 48px 80px', borderBottom: '1px solid var(--hairline-soft)' }}>
        <div style={{ maxWidth: 880, margin: '0 auto', textAlign: 'center', padding: '60px 0' }}>
          <div style={{ fontFamily: 'var(--f-display)', fontStyle: 'italic', fontSize: 56, lineHeight: 1.25, color: 'var(--ink)' }}>
            « Āyus significa <span className="foil">vita</span>.<br/>
            Veda significa <span className="foil">conoscenza</span>.<br/>
            L'unione delle due è la più antica<br/>scienza della cura. »
          </div>
        </div>
      </section>

      {/* Body — chaptered editorial */}
      <article style={{ padding: '100px 48px', display: 'grid', gridTemplateColumns: '180px 1fr 200px', gap: 60, maxWidth: 1300, margin: '0 auto' }}>
        {/* TOC sticky */}
        <aside style={{ position: 'sticky', top: 40, alignSelf: 'flex-start', height: 'fit-content' }}>
          <div className="label-ink">Indice</div>
          <ol style={{ listStyle: 'none', padding: 0, margin: '20px 0', display: 'flex', flexDirection: 'column', gap: 14 }}>
            {[
              'I. Una grammatica',
              'II. I tre dosha',
              'III. Il giorno ayurvedico',
              'IV. La pelle come specchio',
              'V. Cosa portarsi a casa',
            ].map((t, i) => (
              <li key={t} style={{ display: 'flex', gap: 10, alignItems: 'baseline', color: i === 1 ? 'var(--gold)' : 'var(--ink-mute)' }}>
                <span style={{ fontFamily: 'var(--f-label)', fontSize: 9, letterSpacing: '0.28em' }}>0{i+1}</span>
                <span style={{ fontFamily: 'var(--f-display)', fontStyle: 'italic', fontSize: 14 }}>{t}</span>
              </li>
            ))}
          </ol>
        </aside>

        {/* Main column */}
        <div style={{ fontSize: 18, lineHeight: 1.85, color: 'var(--ink)', maxWidth: 680 }}>
          <div className="label" style={{ color: 'var(--gold)' }}>Capitolo I</div>
          <h2 style={{ fontSize: 64, lineHeight: 1, marginTop: 16, marginBottom: 32 }}>
            Una <span style={{ fontStyle: 'italic' }}>grammatica</span> del vivere.
          </h2>
          <p style={{ fontFamily: 'var(--f-display)', fontStyle: 'italic', fontSize: 26, lineHeight: 1.5, color: 'var(--ink)', marginBottom: 32 }}>
            Quando in Occidente abbiamo iniziato a chiamarla "medicina alternativa",
            l'Ayurveda aveva già cinquanta secoli di pratica clinica documentata.
          </p>
          <p style={{ marginBottom: 24 }}>
            Nei testi vedici — Caraka Saṃhitā, Suśruta Saṃhitā — non si parla di sintomi e farmaci.
            Si parla di <em style={{ color: 'var(--gold)', fontStyle: 'normal' }}>prakṛti</em>:
            la costituzione individuale. Ogni persona è un'orchestra di tre forze, i <em style={{ color: 'var(--gold)', fontStyle: 'normal' }}>dosha</em>,
            che si combinano in proporzioni uniche. Curare non è sopprimere — è riportare al timbro originale.
          </p>
          <p style={{ marginBottom: 60 }}>
            Per questo, prima di prescrivere un'erba, un medico ayurvedico osserva come dormi,
            cosa sogni, di che colore è la tua lingua al mattino. La cura inizia dall'ascolto.
          </p>

          {/* Drop image break */}
          <div className="ph" style={{ aspectRatio: '16/10', margin: '40px -120px', position: 'relative' }} data-tag="[ ayurveda-pestle.jpg ]">
            <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle, rgba(201,168,76,0.12), transparent 70%)' }}/>
          </div>
          <div style={{ marginTop: 12, marginBottom: 60, marginLeft: -120, marginRight: -120 }}>
            <div className="label-ink" style={{ textAlign: 'center' }}>◦ Mortaio in legno di mango, mercato di Kochi · Kerala 2024</div>
          </div>

          <div className="label" style={{ color: 'var(--gold)' }}>Capitolo II</div>
          <h2 style={{ fontSize: 64, lineHeight: 1, marginTop: 16, marginBottom: 32 }}>
            I tre <span style={{ fontStyle: 'italic' }}>dosha</span>.
          </h2>
          <p style={{ marginBottom: 32 }}>
            Vāta, Pitta, Kapha. Tre principi vitali costruiti dalla combinazione dei cinque elementi.
            Ognuno governa funzioni precise — e nessuno è migliore degli altri. La salute, in Ayurveda,
            si chiama <em style={{ color: 'var(--gold)', fontStyle: 'normal' }}>sama-doṣa</em>:
            dosha equilibrati.
          </p>

          {/* Inline dosha table */}
          <div style={{ margin: '40px -60px 60px', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 0, border: '1px solid var(--hairline)' }}>
            {[
              ['Vāta', '#9B59B6', 'Aria + Etere', 'Movimento'],
              ['Pitta', '#FF6B35', 'Fuoco + Acqua', 'Trasformazione'],
              ['Kapha', '#2ECC71', 'Terra + Acqua', 'Struttura'],
            ].map(([n, hex, el, fn], i) => (
              <div key={n} style={{ padding: 28, borderLeft: i ? '1px solid var(--hairline)' : 0, background: 'var(--bg-deep)' }}>
                <div className="sanskrit" style={{ fontSize: 26, color: hex }}>{n}</div>
                <div className="label-ink" style={{ marginTop: 8 }}>{el}</div>
                <div style={{ fontFamily: 'var(--f-display)', fontStyle: 'italic', fontSize: 28, marginTop: 16 }}>{fn}</div>
              </div>
            ))}
          </div>

          <p style={{ marginBottom: 24 }}>
            La maggior parte di noi ha un <em style={{ color: 'var(--gold)', fontStyle: 'normal' }}>dosha</em> dominante,
            uno secondario e uno latente. Non è un test della personalità: cambia con le stagioni,
            con l'età, con quello che mangi. Per questo l'Ayurveda non vende formule generiche.
            Vende <span className="foil">attenzione</span>.
          </p>

          {/* Big italic break */}
          <div style={{ margin: '80px -80px', padding: '60px 80px', borderTop: '1px solid var(--gold)', borderBottom: '1px solid var(--gold)', background: 'rgba(201,168,76,0.04)' }}>
            <div style={{ fontFamily: 'var(--f-display)', fontStyle: 'italic', fontSize: 40, lineHeight: 1.3, color: 'var(--ink)', textAlign: 'center' }}>
              « La pelle è dove il dosha<br/>scrive le sue lettere. »
            </div>
            <div className="label-ink" style={{ textAlign: 'center', marginTop: 20 }}>— Caraka Saṃhitā, Sūtrasthāna VIII</div>
          </div>

          <div className="label" style={{ color: 'var(--gold)' }}>Capitolo III</div>
          <h2 style={{ fontSize: 64, lineHeight: 1, marginTop: 16, marginBottom: 32 }}>
            Il giorno <span style={{ fontStyle: 'italic' }}>ayurvedico</span>.
          </h2>
          <p style={{ marginBottom: 24 }}>
            Si chiama <em style={{ color: 'var(--gold)', fontStyle: 'normal' }}>dinacaryā</em>: la routine quotidiana.
            Sveglia all'alba, lingua raschiata in rame, oil pulling con sesamo, abhyanga (massaggio con olio caldo),
            colazione tiepida e speziata. Non è disciplina punitiva — è coreografia.
          </p>
          <p style={{ marginBottom: 24 }}>
            L'idea: il corpo ha cicli che ricalcano quelli del giorno. Kapha dalle 6 alle 10
            (lentezza, struttura). Pitta dalle 10 alle 14 (digestione, fuoco). Vāta dalle 14 alle 18
            (movimento, pensiero). Mangiare il pasto principale a mezzogiorno non è una moda —
            è seguire il momento in cui Pitta è al culmine.
          </p>
        </div>

        {/* Right rail: companion box */}
        <aside style={{ position: 'sticky', top: 40, alignSelf: 'flex-start', height: 'fit-content', borderLeft: '1px solid var(--hairline-soft)', paddingLeft: 24 }}>
          <div className="label">◦ Lettura accompagnata</div>
          <div style={{ marginTop: 16 }}>
            <div className="ph" style={{ aspectRatio: '3/4', position: 'relative' }} data-tag="[ tea.jpg ]">
              <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle, rgba(255,107,53,0.15), transparent 70%)' }}/>
            </div>
            <div style={{ marginTop: 14, fontFamily: 'var(--f-display)', fontStyle: 'italic', fontSize: 18, lineHeight: 1.3 }}>
              Tisana del giorno: Tulsi · Cardamomo · Zenzero
            </div>
            <div className="label-ink" style={{ marginTop: 8 }}>Pitta-pacificante</div>
            <div style={{ fontFamily: 'var(--f-display)', fontStyle: 'italic', fontSize: 22, color: 'var(--gold)', marginTop: 12 }}>€18</div>
            <button className="btn-ghost" style={{ marginTop: 14, width: '100%' }}>Aggiungi</button>
          </div>

          <div style={{ marginTop: 48 }}>
            <div className="label">◦ Da rileggere</div>
            <div style={{ marginTop: 14, display: 'flex', flexDirection: 'column', gap: 14 }}>
              {['Il rituale del mattino', 'Tre erbe per dormire', 'Cos\'è l\'oil pulling'].map(t => (
                <div key={t} style={{ paddingBottom: 14, borderBottom: '1px solid var(--hairline-soft)' }}>
                  <div style={{ fontFamily: 'var(--f-display)', fontStyle: 'italic', fontSize: 15, lineHeight: 1.3 }}>{t}</div>
                  <div className="label-ink" style={{ marginTop: 4 }}>5 min</div>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </article>

      {/* Closing CTA */}
      <section style={{ padding: '120px 48px', borderTop: '1px solid var(--hairline-soft)', background: 'var(--bg-deep)', textAlign: 'center' }}>
        <div className="label" style={{ color: 'var(--gold)' }}>◦ E adesso</div>
        <h2 style={{ fontSize: 96, lineHeight: 0.95, marginTop: 24, maxWidth: 1000, margin: '24px auto 0' }}>
          Inizia con<br/>il tuo <span className="foil">dosha</span>.
        </h2>
        <p style={{ color: 'var(--ink-mute)', fontSize: 16, lineHeight: 1.7, marginTop: 28, maxWidth: 580, margin: '28px auto 0' }}>
          Sette domande, due minuti. Ti diciamo che dosha sei e cosa il tuo sistema sta chiedendo
          oggi. Niente email, niente registrazione.
        </p>
        <div style={{ marginTop: 40, display: 'flex', gap: 14, justifyContent: 'center' }}>
          <button className="btn-gold">Fai il quiz dosha →</button>
          <button className="btn-ghost">Continua a leggere</button>
        </div>
      </section>
    </div>
  );
}

window.AyurvedaArticle = AyurvedaArticle;
