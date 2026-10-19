// Little hand-drawn stickers for scrapbook pages. Decorative only.
export function Sticker({ kind = "star", style, className = "" }) {
  const art = {
    star: (
      <svg viewBox="0 0 100 100">
        <path d="M50 6l12.6 27.8 30.4 3.3-22.7 20.6 6.4 29.9L50 72.3 23.3 87.6l6.4-29.9L7 37.1l30.4-3.3z" fill="#ffb200" />
        <circle cx="41" cy="48" r="3.5" fill="#10163f" />
        <circle cx="59" cy="48" r="3.5" fill="#10163f" />
        <path d="M43 57q7 6 14 0" stroke="#10163f" strokeWidth="3" fill="none" strokeLinecap="round" />
      </svg>
    ),
    coin: (
      <svg viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="42" fill="#ffb200" />
        <circle cx="50" cy="50" r="32" fill="none" stroke="#e8700a" strokeWidth="4" strokeDasharray="6 5" />
        <text x="50" y="64" textAnchor="middle" fontFamily="Poppins, sans-serif" fontWeight="900" fontSize="40" fill="#10163f">$</text>
        <path d="M24 34q6-12 18-15" stroke="#fff" strokeWidth="5" fill="none" strokeLinecap="round" opacity=".7" />
      </svg>
    ),
    heart: (
      <svg viewBox="0 0 100 100">
        <path d="M50 88S10 62 10 36a20 20 0 0 1 40-6 20 20 0 0 1 40 6c0 26-40 52-40 52z" fill="#ff8209" />
        <path d="M28 30q4-7 12-6" stroke="#fff" strokeWidth="5" fill="none" strokeLinecap="round" opacity=".7" />
      </svg>
    ),
    smile: (
      <svg viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="44" fill="#bdc9ff" />
        <circle cx="37" cy="42" r="5" fill="#10163f" />
        <circle cx="63" cy="42" r="5" fill="#10163f" />
        <path d="M33 60q17 16 34 0" stroke="#10163f" strokeWidth="5" fill="none" strokeLinecap="round" />
        <circle cx="27" cy="56" r="6" fill="#ff8209" opacity=".45" />
        <circle cx="73" cy="56" r="6" fill="#ff8209" opacity=".45" />
      </svg>
    ),
    arrow: (
      <svg viewBox="0 0 120 60">
        <path d="M6 40q40-34 96-14" stroke="#3c4cba" strokeWidth="5" fill="none" strokeLinecap="round" />
        <path d="M88 14l16 12-18 8" stroke="#3c4cba" strokeWidth="5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  };
  return (
    <span className={`fgx-sticker ${className}`} style={style} aria-hidden="true">
      {art[kind]}
    </span>
  );
}
