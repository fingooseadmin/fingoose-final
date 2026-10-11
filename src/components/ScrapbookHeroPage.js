import Image from "next/image";

// Static scrapbook page for the homepage hero: Finn as a taped-down polaroid
// on a sheet of grid paper held by a binder clip, with a pinned sticky note
// carrying the tagline.
function BinderClip({ className }) {
  return (
    <svg className={className} viewBox="0 0 100 92" aria-hidden="true">
      <path
        d="M31 50 23 9q-1-6 5-6h44q6 0 5 6l-8 41"
        fill="none"
        stroke="#b9bfd3"
        strokeWidth="4.5"
        strokeLinejoin="round"
      />
      <path
        d="M31 50 23 9q-1-6 5-6h44q6 0 5 6l-8 41"
        fill="none"
        stroke="#fff"
        strokeOpacity=".55"
        strokeWidth="1.5"
        transform="translate(-1 -1)"
      />
      <path d="M12 44h76l-6 38q-1 6-7 6H25q-6 0-7-6Z" fill="#1d2147" />
      <path d="M12 44h76l-1.5 9H13.5Z" fill="#363c6e" />
      <ellipse cx="50" cy="44" rx="39" ry="4" fill="#4a5190" />
    </svg>
  );
}

function PushPin({ className, color = "#e8492f" }) {
  return (
    <svg className={className} viewBox="0 0 40 44" aria-hidden="true">
      <ellipse cx="23" cy="36" rx="11" ry="4" fill="rgba(16,22,63,.22)" />
      <path d="M20 22v16" stroke="#9aa0b8" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="20" cy="17" r="13" fill={color} />
      <circle cx="20" cy="17" r="13" fill="url(#pin-shade)" />
      <circle cx="15.5" cy="12" r="4" fill="#fff" fillOpacity=".55" />
      <defs>
        <radialGradient id="pin-shade" cx=".35" cy=".3" r=".8">
          <stop offset=".55" stopColor="#000" stopOpacity="0" />
          <stop offset="1" stopColor="#000" stopOpacity=".28" />
        </radialGradient>
      </defs>
    </svg>
  );
}

export default function ScrapbookHeroPage() {
  return (
    <figure className="scrap-hero-page">
      <div className="scrap-hero-sheet" aria-hidden="true">
        <BinderClip className="scrap-binder-clip" />
        <svg className="scrap-clip" viewBox="0 0 40 96" aria-hidden="true">
          <path
            d="M14 70V18a8 8 0 0 1 16 0v58a12 12 0 0 1-24 0V26"
            fill="none"
            stroke="currentColor"
            strokeWidth="4"
            strokeLinecap="round"
          />
        </svg>
        <PushPin className="scrap-pin scrap-pin-sheet" color="#3c4cba" />
      </div>

      <div className="scrap-polaroid">
        <span className="scrap-tape scrap-tape-left" aria-hidden="true" />
        <span className="scrap-tape scrap-tape-right" aria-hidden="true" />
        <div className="scrap-polaroid-photo">
          <Image
            alt="Finn, the FinGoose mascot, walking in a suit and tie"
            src="/assets/finn-walking.webp"
            width={2048}
            height={2048}
            sizes="(max-width: 980px) 64vw, 400px"
            priority
          />
        </div>
        <figcaption className="scrap-handwriting">Meet Finn!</figcaption>
      </div>

      <div className="scrap-note">
        <PushPin className="scrap-pin scrap-pin-note" />
        <div className="scrap-handwriting scrap-note-text">
          Silly goose,
          <br />
          <u>serious money.</u>
        </div>
      </div>
    </figure>
  );
}
