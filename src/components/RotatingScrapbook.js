import Image from "next/image";
import Link from "@/components/StaticLink";
import FlowWords from "./FlowWords";

const scrapbookFrames = [
  {
    image: "/assets/finn-presenting.webp",
    eyebrow: "Schools & groups",
    title: "In-person workshops",
    color: "blue",
    href: "/resources/workshops"
  },
  {
    image: "/assets/crisis-lab-one.webp",
    eyebrow: "In development",
    title: "Autism learning kit",
    color: "orange",
    href: "/resources/autism-kit"
  },
  {
    image: "/assets/finn-thinking.webp",
    eyebrow: "Pause + think",
    title: "Online course",
    color: "gold",
    href: "/course"
  },
  {
    image: "/assets/apron-goose-one.webp",
    eyebrow: "Story mode",
    title: "Children’s books",
    color: "violet",
    href: "/resources/books"
  },
  {
    image: "/assets/finn-teacher.webp",
    eyebrow: "Classroom ready",
    title: "Curriculum",
    color: "blue",
    href: "/resources/curriculum"
  }
];

export default function RotatingScrapbook() {
  return (
    <section
      className="rotating-scrapbook"
      aria-label="A rotating scrapbook of FinGoose learning moments"
    >
      <div className="rotating-scrapbook-copy">
        <span className="sticker-label sticker-orange">The learning loop</span>
        <h2><FlowWords>See it. Try it. Talk it through.</FlowWords></h2>
        <p>
          A living scrapbook of the moments that turn money vocabulary into
          practical confidence.
        </p>
        <span className="rotation-hint">
          <i aria-hidden="true" />
          Hover a card to pause · click to open
        </span>
      </div>

      <div
        className="scrapbook-wheel"
        role="group"
        aria-label="Rotating scrapbook. Hover a card to pause and select it to open its page."
      >
        <div className="scrapbook-wheel-halo" aria-hidden="true" />
        <div className="scrapbook-wheel-track">
          {scrapbookFrames.map((frame, index) => (
            <Link
              className={`wheel-polaroid wheel-${frame.color}`}
              href={frame.href}
              key={frame.title}
              style={{ "--slot": index }}
              aria-label={`${frame.title}. Open ${frame.eyebrow}.`}
            >
              <span className="wheel-tape" aria-hidden="true" />
              <div className="wheel-polaroid-art">
                <Image
                  alt=""
                  src={frame.image}
                  width={2048}
                  height={2048}
                  sizes="(max-width: 620px) 44vw, 210px"
                />
              </div>
              <span>{frame.eyebrow}</span>
              <strong>{frame.title}</strong>
              <small className="wheel-open">Open page →</small>
            </Link>
          ))}
        </div>
        <Link className="wheel-center-note" href="/course">
          <strong>FinGoose</strong>
          <span>learning in motion</span>
          <small>Open course →</small>
        </Link>
      </div>
    </section>
  );
}
