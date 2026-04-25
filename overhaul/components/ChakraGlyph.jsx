/* Original chakra glyph — geometric, not a mandala.
   Each chakra = concentric line work + unique inner symbol (original invention). */

const CHAKRAS = [
  { id: 'muladhara',    n: 1, it: 'Radice',      sk: 'Mūlādhāra',   color: 'var(--c1-muladhara)',    hex: '#CC0000',
    intent: 'Radicamento · Stabilità · Fondamenta', element: 'Terra',
    mantra: 'LAM', product: 'Cristalli neri, ematite, ossidiana' },
  { id: 'svadhisthana', n: 2, it: 'Sacrale',     sk: 'Svādhiṣṭhāna', color: 'var(--c2-svadhisthana)', hex: '#FF6B35',
    intent: 'Creatività · Fluidità · Desiderio', element: 'Acqua',
    mantra: 'VAM', product: 'Corniola, incensi ambra, oli essenziali' },
  { id: 'manipura',     n: 3, it: 'Plesso',      sk: 'Maṇipūra',    color: 'var(--c3-manipura)',     hex: '#FFD700',
    intent: 'Volontà · Fuoco · Potere personale', element: 'Fuoco',
    mantra: 'RAM', product: 'Citrino, occhio di tigre, tè zenzero' },
  { id: 'anahata',      n: 4, it: 'Cuore',       sk: 'Anāhata',      color: 'var(--c4-anahata)',      hex: '#2ECC71',
    intent: 'Amore · Compassione · Apertura', element: 'Aria',
    mantra: 'YAM', product: 'Quarzo rosa, avventurina, rose essiccate' },
  { id: 'vishuddha',    n: 5, it: 'Gola',        sk: 'Viśuddha',     color: 'var(--c5-vishuddha)',    hex: '#00AAFF',
    intent: 'Verità · Espressione · Voce', element: 'Etere',
    mantra: 'HAM', product: 'Turchese, sodalite, campane tibetane' },
  { id: 'ajna',         n: 6, it: 'Terzo Occhio', sk: 'Ājñā',        color: 'var(--c6-ajna)',         hex: '#4B0082',
    intent: 'Intuizione · Visione · Chiarezza', element: 'Luce',
    mantra: 'OM', product: 'Lapislazzuli, fluorite, salvia bianca' },
  { id: 'sahasrara',    n: 7, it: 'Corona',      sk: 'Sahasrāra',   color: 'var(--c7-sahasrara)',    hex: '#9B59B6',
    intent: 'Coscienza · Trascendenza · Unione', element: 'Cosmo',
    mantra: 'AH', product: 'Ametista, selenite, incenso palo santo' },
];

// A minimal, original geometric glyph per chakra.
// NOT a mandala. Hairline strokes, single accent color.
// Composition: outer dashed circle + inner geometric mark (unique per chakra).
function ChakraGlyph({ chakra, size = 64, stroke = 1 }) {
  const c = chakra.color;
  const inner = {
    1: // Root: downward triangle with base line
      <g stroke={c} strokeWidth={stroke} fill="none">
        <path d="M 16 22 L 32 44 L 48 22 Z" />
        <line x1="12" y1="48" x2="52" y2="48" strokeDasharray="2 3" />
      </g>,
    2: // Sacral: crescent + drop
      <g stroke={c} strokeWidth={stroke} fill="none">
        <path d="M 20 20 Q 32 28 44 20" />
        <circle cx="32" cy="38" r="6" />
      </g>,
    3: // Solar plexus: upward triangle + ray lines
      <g stroke={c} strokeWidth={stroke} fill="none">
        <path d="M 32 16 L 48 42 L 16 42 Z" />
        <line x1="32" y1="46" x2="32" y2="52" />
      </g>,
    4: // Heart: two interlocking triangles (simplified hex)
      <g stroke={c} strokeWidth={stroke} fill="none">
        <path d="M 20 22 L 44 22 L 32 44 Z" />
        <path d="M 20 42 L 44 42 L 32 20 Z" />
      </g>,
    5: // Throat: circle with vertical axis
      <g stroke={c} strokeWidth={stroke} fill="none">
        <circle cx="32" cy="32" r="10" />
        <line x1="32" y1="16" x2="32" y2="22" />
        <line x1="32" y1="42" x2="32" y2="48" />
      </g>,
    6: // Third eye: eye almond + dot
      <g stroke={c} strokeWidth={stroke} fill="none">
        <path d="M 16 32 Q 32 18 48 32 Q 32 46 16 32 Z" />
        <circle cx="32" cy="32" r="2.5" fill={c} />
      </g>,
    7: // Crown: radiating lines from center
      <g stroke={c} strokeWidth={stroke} fill="none">
        <circle cx="32" cy="32" r="4" />
        {[0,45,90,135,180,225,270,315].map(a => {
          const rad = (a * Math.PI)/180;
          return <line key={a}
            x1={32 + Math.cos(rad)*8} y1={32 + Math.sin(rad)*8}
            x2={32 + Math.cos(rad)*18} y2={32 + Math.sin(rad)*18} />;
        })}
      </g>,
  }[chakra.n];

  return (
    <svg width={size} height={size} viewBox="0 0 64 64" className="bz-chakra-glyph">
      <circle cx="32" cy="32" r="30" fill="none" stroke={c} strokeWidth={stroke*0.5} strokeDasharray="1 3" opacity="0.7" />
      <circle cx="32" cy="32" r="24" fill="none" stroke={c} strokeWidth={stroke*0.5} opacity="0.3" />
      {inner}
    </svg>
  );
}

window.CHAKRAS = CHAKRAS;
window.ChakraGlyph = ChakraGlyph;
