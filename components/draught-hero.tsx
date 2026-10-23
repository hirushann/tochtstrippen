/** Animated cross-section: cold air streaks stop dead at the seal, warm room on the other side. */
export function DraughtHero() {
  const streaks = Array.from({ length: 11 }, (_, i) => ({ y: 40 + i * 30 + (i % 3) * 6, d: (i * 0.37) % 2.4, w: 60 + (i % 4) * 22 }));
  return (
    <figure className="relative mx-auto aspect-[5/6] w-full max-w-md overflow-hidden rounded-[2.5rem] shadow-[0_40px_80px_-30px_rgba(11,5,71,0.5)] ring-1 ring-black/5">
      <svg viewBox="0 0 400 480" className="h-full w-full" role="img" aria-label="Koude lucht buiten wordt tegengehouden door de Q-lon afdichting, binnen blijft het warm">
        <defs>
          <linearGradient id="cold" x1="0" x2="1"><stop offset="0" stopColor="#1e3a8a" /><stop offset="1" stopColor="#3b6fe0" /></linearGradient>
          <radialGradient id="warm" cx=".3" cy=".6" r=".9"><stop offset="0" stopColor="#ffe3a0" /><stop offset="1" stopColor="#f3c565" /></radialGradient>
        </defs>
        <rect width="400" height="480" fill="url(#warm)" />
        <rect width="196" height="480" fill="url(#cold)" />
        {streaks.map((s, i) => (
          <line key={i} x1={20} x2={20 + s.w + 110} y1={s.y} y2={s.y} stroke="#fff" strokeOpacity=".75" strokeWidth="2.5" strokeLinecap="round" className="streak" style={{ animationDelay: `-${s.d}s`, animationDuration: `${2.2 + (i % 4) * 0.4}s` }} />
        ))}
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <circle key={i} cx={240 + (i * 37) % 140} cy={90 + i * 60} r={3 + (i % 3)} fill="#fff" fillOpacity=".7" className="drift" style={{ animationDelay: `${i * 0.7}s` }} />
        ))}
        {/* frame + seal */}
        <rect x="196" y="0" width="22" height="480" fill="#0b0547" />
        <rect x="186" y="0" width="14" height="480" rx="7" fill="#f7f3ea" />
        <circle cx="193" cy="240" r="0" />
        <rect x="188" y="40" width="10" height="400" rx="5" fill="#e7b84a" />
        <text x="24" y="448" fill="#fff" fontSize="13" fontWeight="700" letterSpacing="2.5">BUITEN · 2°</text>
        <text x="376" y="448" fill="#0b0547" fontSize="13" fontWeight="700" letterSpacing="2.5" textAnchor="end">BINNEN · 21°</text>
      </svg>
      <figcaption className="absolute left-1/2 top-5 -translate-x-1/2 whitespace-nowrap rounded-full bg-navy px-4 py-1.5 text-xs font-semibold text-white shadow-lg">
        <span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-gold" />Q-lon sluit af
      </figcaption>
    </figure>
  );
}
