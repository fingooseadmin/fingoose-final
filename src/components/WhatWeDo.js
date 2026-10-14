import Link from "next/link";
import Icon from "./Icon";
import Reveal from "./Reveal";

// Homepage "What we do": one card per kind of work, each with a colored
// icon badge and a few bullet points (bullets with an href become links).
const pillars = [
  {
    title: "Educational resources",
    icon: "book",
    color: "blue",
    points: [
      { text: "A 5-module middle school curriculum, free for teachers", href: "/resources/curriculum" },
      { text: "A one-hour online course (131 students)", href: "/course" },
      { text: "Two children’s books, in English, Spanish, and Chinese", href: "/resources/books" },
      { text: "The FinGoose card game", href: "https://fingoose-cardgame.base44.app/" }
    ]
  },
  {
    title: "In-person workshops",
    icon: "school",
    color: "mint",
    points: [
      { text: "Crisis Lab workshops at local middle schools", href: "/resources/workshops" },
      { text: "90+ students; average scores went from 43% to 93%" }
    ]
  },
  {
    title: "Community events",
    icon: "heart",
    color: "orange",
    points: [
      { text: "Read-alouds and activities at public libraries" },
      { text: "Bake sales that raised $2,200 for our programs" },
      { text: "150 books donated through Books for Africa" }
    ],
    more: { text: "See every event", href: "/impact/#timeline" }
  },
  {
    title: "Social media",
    icon: "instagram",
    color: "gold",
    points: [
      { text: "Money lessons told through Gen Z trends" },
      { text: "15M+ views and 35K+ followers; top video passed 6M views", href: "https://www.instagram.com/fin.goose/" }
    ]
  },
  {
    title: "Chapters & partnerships",
    icon: "globe",
    color: "violet",
    points: [
      { text: "Student chapters in the US, Canada, and China", href: "/join-us" },
      { text: "Partners including Go For Glass and Youth Policymakers for Tomorrow", href: "#partners" },
      { text: "A Colorado Department of Education pilot in 5 districts (2026–27)" }
    ]
  }
];

function Point({ point }) {
  if (!point.href) return <span>{point.text}</span>;
  const external = point.href.startsWith("http");
  if (external || point.href.startsWith("#")) {
    return (
      <a href={point.href} {...(external ? { target: "_blank", rel: "noreferrer" } : {})}>
        {point.text}
        <Icon name={external ? "external" : "arrow"} size={13} />
      </a>
    );
  }
  return (
    <Link href={point.href}>
      {point.text}
      <Icon name="arrow" size={13} />
    </Link>
  );
}

export default function WhatWeDo() {
  return (
    <section className="section wwd-section" id="what-we-do">
      <div className="container">
        <Reveal className="wwd-heading">
          <h2>What we do</h2>
          <span className="wwd-rule" aria-hidden="true" />
        </Reveal>
        <div className="wwd-grid">
          {pillars.map((pillar, index) => (
            <Reveal delay={index * 60} key={pillar.title} className={`wwd-cell wwd-cell-${index + 1}`}>
              <article className={`wwd-card wwd-${pillar.color}`}>
                <span className="wwd-badge" aria-hidden="true">
                  <Icon name={pillar.icon} size={34} />
                </span>
                <h3>{pillar.title}</h3>
                <ul>
                  {pillar.points.map((point) => (
                    <li key={point.text}>
                      <Point point={point} />
                    </li>
                  ))}
                </ul>
                {pillar.more ? (
                  <Link className="wwd-more" href={pillar.more.href}>
                    {pillar.more.text} <Icon name="arrow" size={14} />
                  </Link>
                ) : null}
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
