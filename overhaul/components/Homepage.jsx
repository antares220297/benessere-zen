/* Homepage — dark, editorial. Scroll-driven hero with incense smoke. */

const { useState, useEffect, useRef } = React;

function Header({ onMenuToggle, menuOpen }) {
  return (
    <header style={{
      position: 'absolute', top: 0, left: 0, right: 0, zIndex: 20,
      padding: '24px 48px',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      borderBottom: '1px solid var(--hairline-soft)',
      background: 'rgba(15,15,15,0.4)', backdropFilter: 'blur(8px)'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 40 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <svg width="28" height="28" viewBox="0 0 32 32">
            <circle cx="16" cy="16" r="14" fill="none" stroke="var(--gold)" strokeWidth="0.5"/>
            <circle cx="16" cy="16" r="8" fill="none" stroke="var(--gold)" strokeWidth="0.5"/>
            <circle cx="16" cy="16" r="2" fill="var(--gold)"/>
          </svg>
          <div style={{ lineHeight: 1 }}>
            <div style={{ fontFamily: 'var(--f-display)', fontStyle: 'italic', fontSize: 20, letterSpacing: '0.02em' }}>Benessere Zen</div>
            <div className="label-ink" style={{ fontSize: 8, marginTop: 2, color: 'var(--gold-soft)' }}>Tempio digitale · Est. MMXXVI</div>
          </div>
        </div>
        <nav style={{ display: 'flex', gap: 28 }}>
          <button onClick={onMenuToggle} className="label-ink" style={{ background: 'transparent', border: 0, color: menuOpen ? 'var(--gold)' : 'var(--ink)', cursor: 'pointer', padding: 0 }}>
            ◦ I sette chakra
          </button>
          <a className="label-ink" style={{ color: 'var(--ink)' }}>Rituali</a>
          <a className="label-ink" style={{ color: 'var(--ink)' }}>Journal</a>
          <a className="label-ink" style={{ color: 'var(--ink)' }}>Dicono di noi</a>
        </nav>
      </div>
      <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
        <span className="label-ink">Cerca</span>
        <span className="label-ink">Account</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, border: '1px solid var(--hairline)', padding: '8px 14px', borderRadius: 99 }}>
          <span className="label" style={{ fontSize: 9, color: 'var(--gold)' }}>Carta</span>
          <span style={{ fontFamily: 'var(--f-display)', fontStyle: 'italic', color: 'var(--gold)' }}>0</span>
        </div>
      </div>
    </header>
  );
}

function MegaMenu({ open, onClose }) {
  return (
    <div style={{
      position: 'absolute', top: 73, left: 0, right: 0, zIndex: 19,
      background: 'var(--bg-deep)',
      borderBottom: '1px solid var(--hairline)',
      maxHeight: open ? 520 : 0,
      overflow: 'hidden',
      transition: 'max-height 0.6s var(--ease-silk)',
    }}>
      <div style={{ padding: '56px 48px', display: 'grid', gridTemplateColumns: '220px 1fr', gap: 64 }}>
        <div>
          <div className="label">Esplora per</div>
          <h3 style={{ fontSize: 40, marginTop: 16, lineHeight: 1 }}>I sette<br/>centri<br/><span className="foil">energetici.</span></h3>
          <p style={{ color: 'var(--ink-mute)', fontSize: 13, marginTop: 20, maxWidth: 200 }}>
            Ogni collezione corrisponde a un chakra. Scegli da cosa hai bisogno di ripartire.
          </p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 0 }}>
          {CHAKRAS.map((c, i) => (
            <div key={c.id} style={{
              borderLeft: i === 0 ? '1px solid var(--hairline-soft)' : 'none',
              borderRight: '1px solid var(--hairline-soft)',
              padding: '0 16px',
              cursor: 'pointer',
              transition: 'background 0.4s',
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.02)'}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
              <div style={{ color: c.hex, fontSize: 10, fontFamily: 'var(--f-label)', letterSpacing: '0.28em' }}>0{c.n}</div>
              <div style={{ marginTop: 18, marginBottom: 18 }}>
                <ChakraGlyph chakra={c} size={56} />
              </div>
              <div className="sanskrit" style={{ fontSize: 18, color: c.hex }}>{c.sk}</div>
              <div style={{ fontFamily: 'var(--f-label)', fontSize: 10, letterSpacing: '0.24em', textTransform: 'uppercase', color: 'var(--ink)', marginTop: 4 }}>{c.it}</div>
              <div style={{ color: 'var(--ink-whisper)', fontSize: 11, lineHeight: 1.5, marginTop: 14, minHeight: 48 }}>{c.product}</div>
              <div style={{ marginTop: 18, color: c.hex, fontFamily: 'var(--f-label)', fontSize: 10, letterSpacing: '0.28em', textTransform: 'uppercase' }}>Entra →</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Hero() {
  const [scroll, setScroll] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const total = el.offsetHeight - window.innerHeight;
      const done = Math.max(0, Math.min(1, -rect.top / total));
      setScroll(done);
    };
    // listen on the artboard's parent scrolling container too
    let node = el;
    const listeners = [];
    while (node) {
      const cs = getComputedStyle(node);
      if (['auto','scroll'].includes(cs.overflowY) || node === document.scrollingElement) {
        node.addEventListener('scroll', onScroll, { passive: true });
        listeners.push(node);
      }
      node = node.parentElement;
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => {
      listeners.forEach(n => n.removeEventListener('scroll', onScroll));
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  // Phrases emerge in sequence
  const phrases = [
    { t: 'Respira.',                at: 0.12 },
    { t: 'Lascia andare.',          at: 0.35 },
    { t: 'Trova il tuo equilibrio.', at: 0.58 },
  ];

  const smokeOpacity = Math.min(1, scroll * 2.2);
  const smokeScale = 1 + scroll * 1.6;
  const revealOpacity = scroll > 0.75 ? Math.min(1, (scroll - 0.75) * 4) : 0;
  const heroOpacity = 1 - revealOpacity;

  return (
    <section ref={ref} style={{ height: 2400, position: 'relative' }}>
      {/* Sticky stage */}
      <div style={{
        position: 'sticky', top: 0, height: '100vh', minHeight: 820,
        overflow: 'hidden', opacity: heroOpacity, transition: 'opacity 0.2s linear',
      }}>
        {/* Deep background */}
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 70%, #1A1A2E 0%, #0F0F0F 60%, #000 100%)' }}/>

        {/* Incense stick — vertical */}
        <div style={{
          position: 'absolute', left: '50%', bottom: 0,
          transform: `translateX(-50%) translateY(${scroll * 80}px)`,
          width: 3, height: '55%',
          background: 'linear-gradient(180deg, rgba(232,232,232,0.02), #3a2f1c 40%, #1a1208 100%)',
          opacity: 1 - smokeOpacity * 0.6,
        }}/>

        {/* Ember */}
        <div style={{
          position: 'absolute', left: '50%', top: '45%',
          width: 6, height: 6, borderRadius: '50%',
          transform: `translateX(-50%) translateY(${scroll * 80}px)`,
          background: '#FF6B35',
          boxShadow: '0 0 12px #FF6B35, 0 0 28px #CC0000',
          opacity: 1 - Math.max(0, (scroll - 0.3)) * 2,
        }}/>

        {/* Smoke plume — layered SVG */}
        <div style={{
          position: 'absolute', left: '50%', top: '10%',
          width: '80%', height: '60%',
          transform: `translateX(-50%) scale(${smokeScale})`,
          opacity: smokeOpacity,
          transformOrigin: 'bottom center',
          filter: `blur(${8 + scroll * 14}px)`,
        }}>
          <svg viewBox="0 0 400 400" width="100%" height="100%" preserveAspectRatio="xMidYMax meet">
            <defs>
              <radialGradient id="smoke1" cx="50%" cy="85%">
                <stop offset="0%" stopColor="#E8E8E8" stopOpacity="0.55"/>
                <stop offset="60%" stopColor="#9B59B6" stopOpacity="0.18"/>
                <stop offset="100%" stopColor="#4B0082" stopOpacity="0"/>
              </radialGradient>
              <radialGradient id="smoke2" cx="50%" cy="75%">
                <stop offset="0%" stopColor="#E8E8E8" stopOpacity="0.4"/>
                <stop offset="100%" stopColor="#E8E8E8" stopOpacity="0"/>
              </radialGradient>
            </defs>
            <ellipse cx="200" cy="340" rx="180" ry="80" fill="url(#smoke1)"/>
            <ellipse cx="210" cy="300" rx="140" ry="70" fill="url(#smoke2)"/>
            <ellipse cx="190" cy="260" rx="120" ry="60" fill="url(#smoke1)" opacity="0.7"/>
            <ellipse cx="200" cy="200" rx="100" ry="50" fill="url(#smoke2)" opacity="0.6"/>
          </svg>
        </div>

        {/* Secondary wisps */}
        <div style={{
          position: 'absolute', left: '30%', top: '20%',
          width: 400, height: 400,
          transform: `translateY(${-scroll * 80}px)`,
          opacity: smokeOpacity * 0.7,
          filter: 'blur(40px)',
          background: 'radial-gradient(circle, rgba(201,168,76,0.15), transparent 60%)',
        }}/>
        <div style={{
          position: 'absolute', right: '25%', top: '30%',
          width: 500, height: 500,
          transform: `translateY(${-scroll * 110}px)`,
          opacity: smokeOpacity * 0.5,
          filter: 'blur(50px)',
          background: 'radial-gradient(circle, rgba(155,89,182,0.25), transparent 60%)',
        }}/>

        {/* Phrases */}
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 5 }}>
          {phrases.map((p, i) => {
            const start = p.at;
            const end = p.at + 0.2;
            const fadeOut = p.at + 0.28;
            let o = 0;
            if (scroll > start && scroll < end) o = (scroll - start) / (end - start);
            else if (scroll >= end && scroll < fadeOut) o = 1 - (scroll - end) / (fadeOut - end);
            else if (scroll >= fadeOut) o = 0;
            const y = (1 - o) * 20;
            return (
              <h1 key={i} style={{
                position: 'absolute',
                fontSize: 'clamp(48px, 8vw, 108px)',
                fontWeight: 300,
                letterSpacing: '-0.02em',
                opacity: o,
                transform: `translateY(${y}px)`,
                color: 'var(--ink)',
                textAlign: 'center',
              }}>
                {p.t}
              </h1>
            );
          })}
        </div>

        {/* Edge chrome */}
        <div style={{ position: 'absolute', top: 100, left: 48, opacity: 1 - smokeOpacity * 1.2 }}>
          <div className="label" style={{ color: 'var(--gold-soft)' }}>Capitolo 01</div>
          <div className="sanskrit" style={{ fontSize: 16, color: 'var(--ink-mute)', marginTop: 8 }}>Il rituale inizia</div>
        </div>
        <div style={{ position: 'absolute', top: 100, right: 48, textAlign: 'right', opacity: 1 - smokeOpacity * 1.2 }}>
          <div className="label" style={{ color: 'var(--gold-soft)' }}>Scroll · Respira</div>
          <div style={{ marginTop: 12, display: 'inline-flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4 }}>
            {[0,1,2,3,4].map(i => <div key={i} style={{ width: 30 + i*6, height: 1, background: 'var(--gold-soft)', opacity: 0.3 + i*0.15 }}/>)}
          </div>
        </div>

        {/* Progress ring bottom-right */}
        <div style={{ position: 'absolute', bottom: 40, right: 48, display: 'flex', alignItems: 'center', gap: 14 }}>
          <svg width="44" height="44" viewBox="0 0 44 44">
            <circle cx="22" cy="22" r="20" fill="none" stroke="var(--hairline-soft)" strokeWidth="1"/>
            <circle cx="22" cy="22" r="20" fill="none" stroke="var(--gold)" strokeWidth="1"
              strokeDasharray={`${scroll * 125.6} 125.6`} transform="rotate(-90 22 22)"/>
          </svg>
          <div className="label-ink" style={{ color: 'var(--gold-soft)' }}>{String(Math.round(scroll*100)).padStart(2,'0')}%</div>
        </div>
      </div>

      {/* Reveal curtain */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '100vh',
        background: 'var(--bg-void)',
        opacity: revealOpacity,
        pointerEvents: 'none',
      }}/>
    </section>
  );
}

function ChakraPortal() {
  const [active, setActive] = useState(3); // 0-indexed → Anahata by default
  const c = CHAKRAS[active];
  return (
    <section style={{ padding: '140px 48px 160px', position: 'relative', borderTop: '1px solid var(--hairline-soft)' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}>
        <div>
          <div className="label">Capitolo 02 · La Navigazione</div>
          <h2 style={{ fontSize: 96, marginTop: 20, lineHeight: 0.95 }}>
            Sette porte,<br/>un solo <span className="foil">cammino.</span>
          </h2>
          <p style={{ color: 'var(--ink-mute)', fontSize: 16, lineHeight: 1.7, marginTop: 28, maxWidth: 460 }}>
            Qui non ci sono categorie. Ci sono centri energetici. Ogni collezione nasce da un chakra,
            dal suo colore, dal suo elemento. Scegli da dove ripartire — il corpo sa.
          </p>
          <div style={{ marginTop: 44, display: 'flex', gap: 12 }}>
            <button className="btn-gold">Inizia dal Quiz</button>
            <button className="btn-ghost">Tutte le Collezioni</button>
          </div>
        </div>

        {/* Dial */}
        <div style={{ position: 'relative', height: 560 }}>
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ position: 'relative', width: 500, height: 500 }}>
              {/* Concentric rings */}
              <svg width="500" height="500" style={{ position: 'absolute', inset: 0 }}>
                <circle cx="250" cy="250" r="240" fill="none" stroke="var(--hairline-soft)" strokeWidth="1"/>
                <circle cx="250" cy="250" r="180" fill="none" stroke="var(--hairline)" strokeWidth="0.5" strokeDasharray="2 6"/>
                <circle cx="250" cy="250" r="120" fill="none" stroke="var(--hairline-soft)" strokeWidth="0.5"/>
              </svg>
              {/* Chakra nodes arranged in a circle */}
              {CHAKRAS.map((ch, i) => {
                const angle = (i / 7) * Math.PI * 2 - Math.PI / 2;
                const x = 250 + Math.cos(angle) * 220;
                const y = 250 + Math.sin(angle) * 220;
                const isActive = i === active;
                return (
                  <button key={ch.id}
                    onMouseEnter={() => setActive(i)}
                    style={{
                      position: 'absolute',
                      left: x - 40, top: y - 40,
                      width: 80, height: 80,
                      background: 'var(--bg-void)',
                      border: `1px solid ${isActive ? ch.hex : 'var(--hairline-soft)'}`,
                      borderRadius: '50%',
                      cursor: 'pointer',
                      transition: 'all 0.5s var(--ease-silk)',
                      transform: isActive ? 'scale(1.15)' : 'scale(1)',
                      boxShadow: isActive ? `0 0 40px ${ch.hex}55` : 'none',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                    <ChakraGlyph chakra={ch} size={48} />
                  </button>
                );
              })}
              {/* Center panel */}
              <div style={{
                position: 'absolute', left: 250-110, top: 250-110, width: 220, height: 220,
                borderRadius: '50%',
                border: `1px solid ${c.hex}`,
                background: 'var(--bg-deep)',
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                textAlign: 'center', padding: 20,
                transition: 'border-color 0.5s',
              }}>
                <div className="label" style={{ color: c.hex, fontSize: 9 }}>0{c.n} · {c.element}</div>
                <div className="sanskrit" style={{ fontSize: 30, color: c.hex, marginTop: 10 }}>{c.sk}</div>
                <div style={{ fontFamily: 'var(--f-label)', fontSize: 10, letterSpacing: '0.28em', textTransform: 'uppercase', marginTop: 6 }}>{c.it}</div>
                <div style={{ color: 'var(--ink-mute)', fontSize: 11, marginTop: 16, lineHeight: 1.5 }}>{c.intent}</div>
                <div className="sanskrit" style={{ fontSize: 14, marginTop: 14, letterSpacing: '0.4em', color: 'var(--gold)' }}>{c.mantra}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FeaturedCollections() {
  const featured = [CHAKRAS[6], CHAKRAS[3], CHAKRAS[0]]; // Sahasrara, Anahata, Muladhara
  return (
    <section style={{ padding: '140px 48px', borderTop: '1px solid var(--hairline-soft)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 64 }}>
        <div>
          <div className="label">Capitolo 03 · Le Collezioni</div>
          <h2 style={{ fontSize: 84, marginTop: 20, maxWidth: 900, lineHeight: 0.95 }}>
            Oggetti che <span className="foil">ricordano</span> a chi li tocca<br/>di esistere pienamente.
          </h2>
        </div>
        <a className="label" style={{ color: 'var(--gold)', whiteSpace: 'nowrap' }}>Tutte e sette →</a>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32 }}>
        {featured.map((c, i) => (
          <div key={c.id} style={{
            position: 'relative',
            aspectRatio: '3/4',
            background: 'var(--bg-deep)',
            border: '1px solid var(--hairline-soft)',
            overflow: 'hidden',
            cursor: 'pointer',
          }}>
            <div className="ph" style={{ position: 'absolute', inset: 0 }} data-tag={`[ product-lay-${c.id}.jpg ]`}>
              {/* Tinted wash */}
              <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(circle at 50% 30%, ${c.hex}22, transparent 70%)` }}/>
            </div>
            {/* Chakra badge */}
            <div style={{ position: 'absolute', top: 28, left: 28, display: 'flex', alignItems: 'center', gap: 12 }}>
              <ChakraGlyph chakra={c} size={44} />
              <div>
                <div style={{ color: c.hex, fontSize: 10, fontFamily: 'var(--f-label)', letterSpacing: '0.28em' }}>0{c.n} / 07</div>
                <div className="sanskrit" style={{ fontSize: 18, color: c.hex }}>{c.sk}</div>
              </div>
            </div>
            {/* Bottom content */}
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: 28, background: 'linear-gradient(180deg, transparent, rgba(15,15,15,0.95) 60%)' }}>
              <div className="label-ink">Collezione {String(i+1).padStart(2,'0')}</div>
              <h3 style={{ fontSize: 38, marginTop: 10, color: c.hex }}>{c.it}</h3>
              <p style={{ color: 'var(--ink-mute)', fontSize: 13, marginTop: 10, lineHeight: 1.6 }}>{c.intent}</p>
              <div style={{ marginTop: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span className="label-ink">{c.product.split(',')[0]} · +{Math.floor(Math.random()*40)+20} pezzi</span>
                <span style={{ color: c.hex, fontFamily: 'var(--f-label)', fontSize: 11, letterSpacing: '0.28em', textTransform: 'uppercase' }}>Entra →</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function BrandStory() {
  return (
    <section style={{ padding: '140px 48px', borderTop: '1px solid var(--hairline-soft)', background: 'var(--bg-indigo)', position: 'relative' }} className="grain">
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: 120, alignItems: 'center', position: 'relative', zIndex: 3 }}>
        <div style={{ position: 'relative', aspectRatio: '4/5' }}>
          <div className="ph" style={{ position: 'absolute', inset: 0 }} data-tag="[ atelier-milano.jpg ]"/>
          <div style={{ position: 'absolute', bottom: 20, left: 20, right: 20, display: 'flex', justifyContent: 'space-between' }}>
            <span className="label" style={{ color: 'var(--gold)' }}>Atelier · Milano</span>
            <span className="label-ink">A. 2026</span>
          </div>
          {/* corner ticks */}
          {[[0,0],[0,1],[1,0],[1,1]].map(([x,y],i) => (
            <div key={i} style={{
              position: 'absolute',
              left: x ? 'auto' : 0, right: x ? 0 : 'auto',
              top: y ? 'auto' : 0, bottom: y ? 0 : 'auto',
              width: 18, height: 18,
              borderTop: y ? 'none' : '1px solid var(--gold)',
              borderBottom: y ? '1px solid var(--gold)' : 'none',
              borderLeft: x ? 'none' : '1px solid var(--gold)',
              borderRight: x ? '1px solid var(--gold)' : 'none',
            }}/>
          ))}
        </div>
        <div>
          <div className="label">Capitolo 04 · Il nostro credo</div>
          <h2 style={{ fontSize: 72, marginTop: 24, lineHeight: 1.02 }}>
            Non vendiamo<br/>
            <span style={{ fontStyle: 'italic', textDecoration: 'line-through', textDecorationThickness: 2, color: 'var(--ink-whisper)' }}>benessere.</span>
            <br/>
            Vendiamo <span className="foil">coerenza</span>.
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32, marginTop: 44 }}>
            <p style={{ color: 'var(--ink-mute)', fontSize: 14, lineHeight: 1.7 }}>
              Ogni pietra è scelta in cava, pulita a mano, programmata con un'intenzione. Ogni incenso
              arriva da un monastero che conosciamo per nome. Niente fornitori di massa.
              Niente confezioni fluorescenti.
            </p>
            <p style={{ color: 'var(--ink-mute)', fontSize: 14, lineHeight: 1.7 }}>
              Siamo una casa italiana con radici ovunque. Tenebroso ma luminoso. Spirituale
              senza essere ingenuo. La quiete più esigente che conosciamo — e te la spediamo in 48 ore.
            </p>
          </div>
          {/* Stats */}
          <div style={{ marginTop: 56, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 0, borderTop: '1px solid var(--hairline)', borderBottom: '1px solid var(--hairline)' }}>
            {[
              ['VIII', 'Anni di ricerca'],
              ['014', 'Fornitori diretti'],
              ['847', 'Rituali spediti / mese'],
              ['IV.9', 'Valutazione media'],
            ].map(([n, l]) => (
              <div key={l} style={{ padding: '32px 0', borderLeft: '1px solid var(--hairline)', paddingLeft: 24 }}>
                <div className="foil" style={{ fontFamily: 'var(--f-display)', fontStyle: 'italic', fontSize: 48, lineHeight: 1 }}>{n}</div>
                <div className="label-ink" style={{ marginTop: 10 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function QuizCTA() {
  return (
    <section style={{ padding: '160px 48px', borderTop: '1px solid var(--hairline-soft)', position: 'relative', overflow: 'hidden' }}>
      {/* Radial chakra aura background */}
      <div style={{ position: 'absolute', inset: 0, opacity: 0.6, pointerEvents: 'none' }}>
        {CHAKRAS.map((c, i) => (
          <div key={c.id} style={{
            position: 'absolute',
            left: `${10 + i * 13}%`, top: '50%',
            width: 400, height: 400,
            transform: 'translate(-50%, -50%)',
            borderRadius: '50%',
            background: `radial-gradient(circle, ${c.hex}12, transparent 60%)`,
            filter: 'blur(30px)',
          }}/>
        ))}
      </div>

      <div style={{ position: 'relative', zIndex: 2, maxWidth: 1000, margin: '0 auto', textAlign: 'center' }}>
        <div className="label">Capitolo 05 · Diagnostica</div>
        <h2 style={{ fontSize: 120, marginTop: 28, lineHeight: 0.95, letterSpacing: '-0.02em' }}>
          Quale dei tuoi<br/>
          <span className="foil">chakra</span> chiede<br/>
          di essere <span style={{ fontStyle: 'italic' }}>ascoltato?</span>
        </h2>
        <p style={{ color: 'var(--ink-mute)', fontSize: 17, lineHeight: 1.7, marginTop: 36, maxWidth: 560, margin: '36px auto 0' }}>
          Nove domande, tre minuti. Il quiz identifica il centro da riequilibrare e compone per te
          un rituale su misura — cristalli, incenso, tè, ordine di utilizzo.
        </p>
        <div style={{ marginTop: 48, display: 'flex', gap: 20, justifyContent: 'center' }}>
          <button className="btn-gold">Trova il tuo rituale</button>
          <button className="btn-ghost">Come funziona</button>
        </div>
        <div style={{ marginTop: 44, display: 'flex', gap: 36, justifyContent: 'center', color: 'var(--ink-whisper)' }}>
          <span className="label-ink">◦ 09 domande</span>
          <span className="label-ink">◦ 03 minuti</span>
          <span className="label-ink">◦ Rituale personale</span>
        </div>
      </div>
    </section>
  );
}

function Newsletter() {
  return (
    <section style={{ padding: '120px 48px', borderTop: '1px solid var(--hairline-soft)', background: 'var(--bg-deep)' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}>
        <div>
          <div className="label">Capitolo 06 · La Corrispondenza</div>
          <h2 style={{ fontSize: 68, marginTop: 20, lineHeight: 1 }}>
            Una lettera<br/>alla <span className="foil">luna piena</span>.
          </h2>
          <p style={{ color: 'var(--ink-mute)', fontSize: 14, lineHeight: 1.7, marginTop: 24, maxWidth: 440 }}>
            Niente sconti urlati. Una sola email al mese, scritta a mano, con rituali stagionali,
            cristalli appena arrivati e poesie che tengono compagnia. Si disiscrive in un click.
          </p>
        </div>
        <div>
          <form style={{ display: 'flex', borderBottom: '1px solid var(--gold)', paddingBottom: 18 }}>
            <input placeholder="la-tua-anima@dominio.it" style={{
              flex: 1, background: 'transparent', border: 0, color: 'var(--ink)',
              fontFamily: 'var(--f-display)', fontStyle: 'italic', fontSize: 28, outline: 'none',
            }}/>
            <button type="button" style={{
              background: 'transparent', border: 0, color: 'var(--gold)', cursor: 'pointer',
              fontFamily: 'var(--f-label)', letterSpacing: '0.28em', textTransform: 'uppercase', fontSize: 11,
            }}>Iscrivimi →</button>
          </form>
          <div style={{ marginTop: 20, display: 'flex', gap: 24 }}>
            <label style={{ display: 'flex', gap: 10, alignItems: 'center', color: 'var(--ink-whisper)', fontSize: 11 }}>
              <div style={{ width: 12, height: 12, border: '1px solid var(--gold)', position: 'relative' }}>
                <div style={{ position: 'absolute', inset: 2, background: 'var(--gold)' }}/>
              </div>
              <span className="label-ink">Accetto il trattamento dei dati</span>
            </label>
            <span className="label-ink">Iscritti · 4.218</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer style={{ padding: '80px 48px 40px', borderTop: '1px solid var(--hairline)', background: 'var(--bg-void)' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr', gap: 48 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <svg width="28" height="28" viewBox="0 0 32 32">
              <circle cx="16" cy="16" r="14" fill="none" stroke="var(--gold)" strokeWidth="0.5"/>
              <circle cx="16" cy="16" r="8" fill="none" stroke="var(--gold)" strokeWidth="0.5"/>
              <circle cx="16" cy="16" r="2" fill="var(--gold)"/>
            </svg>
            <span style={{ fontFamily: 'var(--f-display)', fontStyle: 'italic', fontSize: 24 }}>Benessere Zen</span>
          </div>
          <p style={{ color: 'var(--ink-whisper)', fontSize: 12, marginTop: 20, maxWidth: 280, lineHeight: 1.7 }}>
            Spedizioni in 48h · Pagamenti sicuri · Reso entro 30 giorni. Fatto con intenzione a Milano.
          </p>
        </div>
        {[
          ['I sette chakra', ['Mūlādhāra','Svādhiṣṭhāna','Maṇipūra','Anāhata','Viśuddha','Ājñā','Sahasrāra']],
          ['Rituali', ['Quiz','Bundle','Journal','Guide']],
          ['Casa', ['Il nostro credo','Atelier','Fornitori','Contatti']],
          ['Legale', ['Privacy','Termini','Cookie','Resi']],
        ].map(([h, items]) => (
          <div key={h}>
            <div className="label" style={{ color: 'var(--gold)' }}>{h}</div>
            <ul style={{ listStyle: 'none', padding: 0, margin: '18px 0 0', display: 'flex', flexDirection: 'column', gap: 10 }}>
              {items.map(i => <li key={i} style={{ color: 'var(--ink-mute)', fontSize: 13 }}>{i}</li>)}
            </ul>
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 60, paddingTop: 24, borderTop: '1px solid var(--hairline-soft)', color: 'var(--ink-whisper)', fontSize: 11 }}>
        <span className="label-ink">© MMXXVI · Benessere Zen · Milano</span>
        <span className="label-ink">Anima italiana · Respiro universale</span>
      </div>
    </footer>
  );
}

function Homepage() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <div className="bz-root" style={{ minHeight: '100%', width: '100%' }}>
      <Header onMenuToggle={() => setMenuOpen(m => !m)} menuOpen={menuOpen} />
      <MegaMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
      {/* Shipping bar */}
      <div style={{
        position: 'absolute', top: 73, left: 0, right: 0, zIndex: menuOpen ? 5 : 18,
        padding: '10px 48px', textAlign: 'center',
        borderBottom: '1px solid var(--hairline-soft)',
        color: 'var(--gold-soft)',
        fontFamily: 'var(--f-label)', fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase',
        background: 'rgba(15,15,15,0.85)', backdropFilter: 'blur(4px)',
      }}>
        ◦ Spedizione rituale in 48h · Ordini superiori a €49 ◦
      </div>
      <Hero />
      <ChakraPortal />
      <FeaturedCollections />
      <BrandStory />
      <QuizCTA />
      <Newsletter />
      <Footer />
    </div>
  );
}

window.Homepage = Homepage;
window.Header = Header;
window.MegaMenu = MegaMenu;
