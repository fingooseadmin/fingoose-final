import Image from "next/image";

// Static scrapbook page for the homepage hero: Finn as a taped-down polaroid
// on a sheet of grid paper, with a paper clip and a handwritten scrap.
export default function ScrapbookHeroPage() {
  return (
    <figure className="scrap-hero-page">
      <div className="scrap-hero-sheet" aria-hidden="true">
        <span className="scrap-tape scrap-tape-sheet" />
        <svg className="scrap-clip" viewBox="0 0 40 96" aria-hidden="true">
          <path
            d="M14 70V18a8 8 0 0 1 16 0v58a12 12 0 0 1-24 0V26"
            fill="none"
            stroke="currentColor"
            strokeWidth="4"
            strokeLinecap="round"
          />
        </svg>
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

      <div className="scrap-note" aria-hidden="true">
        <span className="scrap-tape scrap-tape-note" />
        <div className="scrap-handwriting scrap-note-text">
          Learn it.
          <br />
          Test it.
          <br />
          <u>Use it.</u>
        </div>
      </div>
    </figure>
  );
}
