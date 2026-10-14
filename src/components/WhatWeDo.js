import Image from "next/image";
import Link from "next/link";
import Icon from "./Icon";
import Reveal from "./Reveal";

// Homepage "What we do": three scrapbook collages, each with a few taped
// photos, a short title, and sticker links.
const pillars = [
  {
    kicker: "Educational resources",
    title: "We teach.",
    photos: [
      { src: "/assets/curriculum-cover.webp", alt: "FinGoose curriculum cover", top: true },
      { src: "/assets/workshop-money-decisions.webp", alt: "Students in a FinGoose workshop" },
      { src: "/assets/book-two-mornings-cover.webp", alt: "FinGoose and the Two Mornings book cover" }
    ],
    links: [
      { label: "Curriculum", href: "/resources/curriculum" },
      { label: "Workshops", href: "/resources/workshops" },
      { label: "Online course", href: "/course" },
      { label: "Books", href: "/resources/books" },
      { label: "Card game", href: "https://fingoose-cardgame.base44.app/" }
    ]
  },
  {
    kicker: "Community events",
    title: "We show up.",
    photos: [
      { src: "/assets/events/library-flyer.webp", alt: "FinGoose library read-aloud flyer", top: true },
      { src: "/assets/events/bake-02.webp", alt: "FinGoose students at a bake sale" },
      { src: "/assets/events/donation-08.webp", alt: "FinGoose team with boxes of donated books" }
    ],
    links: [
      { label: "Read-alouds", href: "/impact/#timeline" },
      { label: "Bake sales", href: "/impact/#timeline" },
      { label: "Book donations", href: "/impact/#timeline" }
    ]
  },
  {
    kicker: "Reach & leadership",
    title: "We spread it.",
    photos: [
      { src: "/reels/field-note-05-cover.webp", alt: "FinGoose video explaining a Roth IRA" },
      { src: "/assets/events/deca-01.webp", alt: "FinGoose at DECA", top: true },
      { src: "/reels/field-note-04-cover.webp", alt: "FinGoose workshop post on Instagram", top: true }
    ],
    links: [
      { label: "15M+ views", href: "https://www.instagram.com/fin.goose/" },
      { label: "Chapters", href: "/join-us" },
      { label: "Partners", href: "#partners" }
    ]
  }
];

function Chip({ link }) {
  const external = link.href.startsWith("http");
  const content = (
    <>
      {link.label}
      <Icon name={external ? "external" : "arrow"} size={13} />
    </>
  );
  if (external || link.href.startsWith("#")) {
    return (
      <a className="wwd-chip" href={link.href} {...(external ? { target: "_blank", rel: "noreferrer" } : {})}>
        {content}
      </a>
    );
  }
  return (
    <Link className="wwd-chip" href={link.href}>
      {content}
    </Link>
  );
}

export default function WhatWeDo() {
  return (
    <section className="section wwd-section" id="what-we-do">
      <div className="container">
        <Reveal className="wwd-heading">
          <span className="sticker-label sticker-orange">What we do</span>
          <h2>Teach it. Live it. Share it.</h2>
        </Reveal>
        <div className="wwd-grid">
          {pillars.map((pillar, index) => (
            <Reveal delay={index * 80} key={pillar.title}>
              <article className={`wwd-page wwd-page-${index + 1}`}>
                <div className="wwd-collage">
                  {pillar.photos.map((photo, photoIndex) => (
                    <figure className={`wwd-snap wwd-snap-${photoIndex + 1}`} key={photo.src}>
                      <span className="wwd-snap-tape" aria-hidden="true" />
                      <span className="wwd-snap-frame">
                        <Image
                          src={photo.src}
                          alt={photo.alt}
                          fill
                          sizes="(max-width: 900px) 40vw, 200px"
                          style={photo.top ? { objectPosition: "50% 0" } : undefined}
                        />
                      </span>
                    </figure>
                  ))}
                </div>
                <span className="wwd-kicker">{pillar.kicker}</span>
                <h3>{pillar.title}</h3>
                <div className="wwd-chips">
                  {pillar.links.map((link) => (
                    <Chip link={link} key={link.label} />
                  ))}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
