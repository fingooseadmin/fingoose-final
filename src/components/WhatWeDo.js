import Image from "next/image";
import Link from "next/link";
import Icon from "./Icon";
import Reveal from "./Reveal";

// Homepage "What we do": the three kinds of work FinGoose does, each with
// links to where you can see or use it.
const pillars = [
  {
    key: "learn",
    label: "Educational resources",
    title: "We teach money skills.",
    text: "Free, standards-aligned tools for students, teachers, and families.",
    image: "/assets/workshop-financial-resilience.webp",
    imageAlt: "Students presenting during a FinGoose workshop",
    color: "blue",
    items: [
      { label: "Middle school curriculum", href: "/resources/curriculum", icon: "school" },
      { label: "In-person workshops", href: "/resources/workshops", icon: "chart" },
      { label: "Online course", href: "/course", icon: "play" },
      { label: "Children’s books", href: "/resources/books", icon: "book" },
      { label: "FinGoose card game", href: "https://fingoose-cardgame.base44.app/", icon: "spark", external: true }
    ]
  },
  {
    key: "community",
    label: "Community events",
    title: "We show up in person.",
    text: "Events that raise money, share books, and bring families in.",
    image: "/assets/events/donation-08.webp",
    imageAlt: "FinGoose team with boxes of books for Books for Africa",
    color: "orange",
    items: [
      { label: "Library read-alouds", href: "/impact/#timeline", icon: "book" },
      { label: "Bake sales", href: "/impact/#timeline", icon: "heart" },
      { label: "Book donations", href: "/impact/#timeline", icon: "globe" },
      { label: "School visits", href: "/resources/workshops", icon: "school" }
    ]
  },
  {
    key: "reach",
    label: "Reach & leadership",
    title: "We grow the flock.",
    text: "Getting financial literacy to students far beyond our town.",
    image: "/assets/finn-presenting.webp",
    imageAlt: "FinGoose mascot Finn presenting",
    contain: true,
    color: "gold",
    items: [
      { label: "Student chapters", href: "/join-us", icon: "globe" },
      { label: "Videos with 15M+ views", href: "https://www.instagram.com/fin.goose/", icon: "instagram", external: true },
      { label: "Partners & sponsors", href: "#partners", icon: "shield" },
      { label: "Colorado state pilot", href: "/impact/#timeline", icon: "chart" }
    ]
  }
];

function ItemLink({ item }) {
  const inner = (
    <>
      <Icon name={item.icon} size={17} />
      <span>{item.label}</span>
      <Icon name={item.external ? "external" : "arrow"} size={15} />
    </>
  );
  return item.external || item.href.startsWith("#") ? (
    <a className="wwd-link" href={item.href} {...(item.external ? { target: "_blank", rel: "noreferrer" } : {})}>
      {inner}
    </a>
  ) : (
    <Link className="wwd-link" href={item.href}>
      {inner}
    </Link>
  );
}

export default function WhatWeDo() {
  return (
    <section className="section wwd-section" id="what-we-do">
      <div className="container">
        <Reveal className="wwd-heading">
          <span className="sticker-label">What we do</span>
          <h2>Three ways FinGoose makes money make sense.</h2>
        </Reveal>
        <div className="wwd-grid">
          {pillars.map((pillar, index) => (
            <Reveal delay={index * 70} key={pillar.key}>
              <article className={`wwd-card wwd-${pillar.color}`}>
                <span className="wwd-tape" aria-hidden="true" />
                <div className={`wwd-photo ${pillar.contain ? "is-contain" : ""}`}>
                  <Image src={pillar.image} alt={pillar.imageAlt} fill sizes="(max-width: 860px) 90vw, 360px" />
                  <span className="wwd-number" aria-hidden="true">0{index + 1}</span>
                </div>
                <div className="wwd-body">
                  <span className="wwd-label">{pillar.label}</span>
                  <h3>{pillar.title}</h3>
                  <p>{pillar.text}</p>
                  <ul>
                    {pillar.items.map((item) => (
                      <li key={item.label}>
                        <ItemLink item={item} />
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
