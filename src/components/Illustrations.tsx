// Zarif, minimal çizgi illüstrasyonları (Balancia tarzı figüratif anlatım).
// Yumuşak organik bir zemin + erik tonunda tek-çizgi figür.
type IlloKey =
  | "unstuck"
  | "connect"
  | "confidence"
  | "peace"
  | "individual"
  | "couples"
  | "child"
  | "online"
  | "reach"
  | "match"
  | "session"
  | "journey";

const stroke = "#4c3d63";
const blobFill = "#efe3d2";

function Frame({ children, blob }: { children: React.ReactNode; blob: string }) {
  return (
    <svg viewBox="0 0 200 180" className="h-full w-full" role="img" aria-hidden="true">
      <path d={blob} fill={blobFill} opacity="0.7" />
      <g fill="none" stroke={stroke} strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round">
        {children}
      </g>
    </svg>
  );
}

const illustrations: Record<IlloKey, React.ReactNode> = {
  // Yükten kurtulmak — çömelmiş figür + çözülen düğüm
  unstuck: (
    <Frame blob="M64 40 C112 22 168 34 170 86 C172 138 120 158 86 150 C44 140 18 96 38 64 C46 51 54 44 64 40 Z">
      <circle cx="104" cy="58" r="13" />
      <path d="M104 71 c-20 2 -31 19 -28 41 q28 11 56 0 c3 -22 -8 -39 -28 -41 z" />
      <path d="M84 104 q20 12 40 0" />
      <path d="M150 118 c16 -3 21 15 8 23 c-11 7 -25 -4 -19 -17 c4 -8 14 -9 20 -3" />
    </Frame>
  ),
  // Derin bağ — birbirine yaslanan iki figür
  connect: (
    <Frame blob="M58 44 C104 26 156 34 166 80 C176 128 132 156 96 150 C50 142 22 104 36 70 C42 56 49 48 58 44 Z">
      <circle cx="83" cy="60" r="13" />
      <circle cx="117" cy="60" r="13" />
      <path d="M70 100 q30 -26 60 0" />
      <path d="M86 88 q14 10 28 0" />
      <path d="M74 100 c-3 16 -2 28 0 40" />
      <path d="M126 100 c3 16 2 28 0 40" />
    </Frame>
  ),
  // Özgüven — dik duran figür, eller belde, hafif gölge
  confidence: (
    <Frame blob="M66 38 C114 24 164 36 168 86 C172 136 122 156 88 148 C46 138 22 98 40 64 C48 50 56 42 66 38 Z">
      <ellipse cx="100" cy="150" rx="34" ry="5" fill={blobFill} opacity="0.9" stroke="none" />
      <circle cx="100" cy="46" r="13" />
      <path d="M100 59 v40" />
      <path d="M100 66 l-21 13 l8 9" />
      <path d="M100 66 l21 13 l-8 9" />
      <path d="M100 99 l-13 38" />
      <path d="M100 99 l13 38" />
    </Frame>
  ),
  // İç huzur — meditasyon + yaprak kemeri
  peace: (
    <Frame blob="M62 46 C108 28 158 38 166 84 C174 130 130 156 94 150 C50 142 24 102 38 70 C44 58 53 50 62 46 Z">
      <path d="M58 96 C44 70 56 42 100 32 C144 42 156 70 142 96" />
      <path d="M72 58 q-7 -8 -16 -7" />
      <path d="M128 58 q7 -8 16 -7" />
      <path d="M86 44 q-5 -9 -14 -10" />
      <path d="M114 44 q5 -9 14 -10" />
      <circle cx="100" cy="84" r="13" />
      <path d="M100 97 c-18 2 -30 15 -34 31 h68 c-4 -16 -16 -29 -34 -31 z" />
      <path d="M72 122 q28 -15 56 0" />
    </Frame>
  ),

  // Bireysel terapi — danışan ve terapist iki koltukta, küçük bitki
  individual: (
    <Frame blob="M60 40 C110 22 162 34 168 84 C174 134 128 158 92 152 C48 144 22 104 38 70 C45 55 52 45 60 40 Z">
      <rect x="26" y="84" width="50" height="58" rx="16" fill="#cfeee2" stroke="none" />
      <rect x="124" y="84" width="50" height="58" rx="16" fill="#ffd9b5" stroke="none" />
      <circle cx="51" cy="80" r="9" />
      <path d="M51 89 c-10 1 -15 9 -15 20 v9" />
      <path d="M42 124 q9 6 18 0" />
      <circle cx="149" cy="80" r="9" />
      <path d="M149 89 c10 1 15 9 15 20 v9" />
      <path d="M140 124 q9 6 18 0" />
      <rect x="92" y="129" width="16" height="11" rx="2" fill="#bcd3c4" stroke="none" />
      <path d="M100 129 v-13" />
      <path d="M100 121 q-8 -2 -9 -12 q9 0 9 12" />
      <path d="M100 121 q8 -2 9 -12 q-9 0 -9 12" />
    </Frame>
  ),

  // Çift & aile terapisi — kanepede iki kişi, yanda terapist
  couples: (
    <Frame blob="M60 40 C110 22 162 34 168 84 C174 134 128 158 92 152 C48 144 22 104 38 70 C45 55 52 45 60 40 Z">
      <rect x="30" y="92" width="92" height="40" rx="14" fill="#bcd3c4" stroke="none" />
      <rect x="58" y="132" width="46" height="6" rx="3" fill="#e6d4ba" stroke="none" />
      <circle cx="58" cy="84" r="9" />
      <path d="M58 93 c-8 1 -12 8 -12 18" />
      <circle cx="94" cy="84" r="9" />
      <path d="M94 93 c8 1 12 8 12 18" />
      <path d="M66 96 q16 -7 28 4" />
      <rect x="136" y="92" width="36" height="42" rx="12" fill="#ffd9b5" stroke="none" />
      <circle cx="154" cy="88" r="8" />
      <path d="M154 96 c-7 1 -10 7 -10 16" />
    </Frame>
  ),

  // Çocuk & ergen — iki yetişkin ve aralarında çocuk
  child: (
    <Frame blob="M60 40 C110 22 162 34 168 84 C174 134 128 158 92 152 C48 144 22 104 38 70 C45 55 52 45 60 40 Z">
      <ellipse cx="100" cy="130" rx="52" ry="10" fill="#e6d4ba" stroke="none" />
      <circle cx="70" cy="74" r="11" />
      <path d="M70 85 c-12 1 -17 11 -17 24" />
      <path d="M60 104 q10 6 20 0" stroke="#7fb59a" />
      <circle cx="100" cy="94" r="7.5" />
      <path d="M100 101 c-7 1 -11 7 -11 16" />
      <circle cx="130" cy="74" r="11" />
      <path d="M130 85 c12 1 17 11 17 24" />
      <path d="M120 104 q10 6 20 0" stroke="#e89a5c" />
    </Frame>
  ),

  // Online terapi — ekranda yüz + bağlantı işareti
  online: (
    <Frame blob="M60 40 C110 22 162 34 168 84 C174 134 128 158 92 152 C48 144 22 104 38 70 C45 55 52 45 60 40 Z">
      <rect x="56" y="84" width="84" height="52" rx="7" fill="#cfeee2" stroke="none" />
      <rect x="64" y="90" width="68" height="40" rx="3" fill="#ffffff" stroke="none" />
      <path d="M46 142 h104 l-8 -10 h-88 z" fill="#bcd3c4" stroke="none" />
      <circle cx="98" cy="104" r="8" />
      <path d="M98 112 c-9 1 -13 7 -13 16" />
      <path d="M148 80 q11 -10 0 -22" stroke="#e89a5c" />
      <path d="M148 74 q6 -6 0 -12" stroke="#e89a5c" />
      <circle cx="149" cy="62" r="1.8" fill="#e89a5c" stroke="none" />
    </Frame>
  ),

  // İlk temas — konuşma balonları
  reach: (
    <Frame blob="M60 40 C110 22 162 34 168 84 C174 134 128 158 92 152 C48 144 22 104 38 70 C45 55 52 45 60 40 Z">
      <path d="M44 58 h78 a14 14 0 0 1 14 14 v26 a14 14 0 0 1 -14 14 h-44 l-16 15 v-15 h-18 a14 14 0 0 1 -14 -14 v-26 a14 14 0 0 1 14 -14 z" fill="#cfeee2" />
      <circle cx="66" cy="85" r="4" fill="#4c3d63" stroke="none" />
      <circle cx="86" cy="85" r="4" fill="#4c3d63" stroke="none" />
      <circle cx="106" cy="85" r="4" fill="#4c3d63" stroke="none" />
      <path d="M118 108 h34 a10 10 0 0 1 10 10 v12 a10 10 0 0 1 -10 10 h-10 l-11 11 v-11 h-13 a10 10 0 0 1 -10 -10 v-12 a10 10 0 0 1 10 -10 z" fill="#ffd9b5" />
    </Frame>
  ),

  // Eşleştirme — iki büst + kalp
  match: (
    <Frame blob="M60 40 C110 22 162 34 168 84 C174 134 128 158 92 152 C48 144 22 104 38 70 C45 55 52 45 60 40 Z">
      <circle cx="66" cy="72" r="13" />
      <path d="M66 85 c-15 1 -23 12 -23 28 h46 c0 -16 -8 -27 -23 -28 z" fill="#cfeee2" />
      <circle cx="134" cy="72" r="13" />
      <path d="M134 85 c15 1 23 12 23 28 h-46 c0 -16 8 -27 23 -28 z" fill="#ffd9b5" />
      <path d="M100 110 c-6 -7 -15 -2 -15 5 c0 7 9 12 15 17 c6 -5 15 -10 15 -17 c0 -7 -9 -12 -15 -5 z" fill="#e89a5c" stroke="none" />
    </Frame>
  ),

  // İlk seans — koltukta oturan figür + balon
  session: (
    <Frame blob="M60 40 C110 22 162 34 168 84 C174 134 128 158 92 152 C48 144 22 104 38 70 C45 55 52 45 60 40 Z">
      <path d="M56 130 v-30 a18 18 0 0 1 18 -18 h52 a18 18 0 0 1 18 18 v30 z" fill="#cfeee2" />
      <circle cx="100" cy="74" r="11" />
      <path d="M100 85 c-12 1 -18 10 -18 23 v4" />
      <path d="M82 119 q18 9 36 0" />
      <path d="M118 50 h28 a9 9 0 0 1 9 9 v11 a9 9 0 0 1 -9 9 h-9 l-9 9 v-9 h-10 a9 9 0 0 1 -9 -9 v-11 a9 9 0 0 1 9 -9 z" fill="#ffd9b5" />
    </Frame>
  ),

  // Birlikte yol almak — kıvrımlı yol + hedef
  journey: (
    <Frame blob="M60 40 C110 22 162 34 168 84 C174 134 128 158 92 152 C48 144 22 104 38 70 C45 55 52 45 60 40 Z">
      <path d="M48 130 C70 118 58 96 84 92 C110 88 100 66 126 60 C140 57 146 50 150 44" strokeDasharray="1.5 9" strokeWidth="3" />
      <circle cx="48" cy="130" r="6" fill="#cfeee2" />
      <circle cx="84" cy="92" r="3" fill="#4c3d63" stroke="none" />
      <circle cx="126" cy="60" r="3" fill="#4c3d63" stroke="none" />
      <circle cx="150" cy="40" r="12" fill="#ffd9b5" />
      <path d="M150 21 v-5 M171 40 h5 M150 59 v5 M129 40 h-5 M165 26 l3 -3 M135 26 l-3 -3" stroke="#e89a5c" />
    </Frame>
  ),
};

export function Illustration({ name, className = "h-32 w-32" }: { name: IlloKey; className?: string }) {
  return <div className={className}>{illustrations[name]}</div>;
}
