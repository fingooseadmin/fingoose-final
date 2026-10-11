"use client";

import Image from "next/image";
import { useRef } from "react";
import Icon from "./Icon";
import Reveal from "./Reveal";
import { milestones, partners } from "./milestoneData";

// Horizontal timeline: a photo on top, a dot on the line, the story below.
export function MilestoneTimeline() {
  const railRef = useRef(null);

  const move = (direction) => {
    const rail = railRef.current;
    const item = rail?.querySelector(".milestone-item");
    if (!rail || !item) return;
    const gap = parseFloat(getComputedStyle(rail).columnGap) || 0;
    rail.scrollBy({ left: direction * (item.getBoundingClientRect().width + gap), behavior: "smooth" });
  };

  return (
    <div className="milestone-timeline">
      <div className="milestone-controls">
        <button type="button" onClick={() => move(-1)} aria-label="Previous milestone">
          <Icon name="arrow" size={18} />
        </button>
        <button type="button" onClick={() => move(1)} aria-label="Next milestone">
          <Icon name="arrow" size={18} />
        </button>
      </div>
      <ol className="milestone-rail" ref={railRef} data-lenis-prevent>
        {milestones.map((item, index) => (
          <li className={`milestone-item milestone-${item.color}`} key={item.title} style={{ "--tilt": `${index % 2 ? 1.5 : -1.5}deg` }}>
            <figure className="milestone-photo">
              <span className="milestone-tape" aria-hidden="true" />
              {item.image ? (
                <span className="milestone-photo-frame">
                  <Image src={item.image} alt={item.alt || item.title} fill sizes="300px" />
                </span>
              ) : (
                <span className="milestone-photo-frame milestone-photo-blank" aria-hidden="true">
                  <Icon name={item.icon} size={44} />
                </span>
              )}
            </figure>
            <span className="milestone-dot" aria-hidden="true" />
            <div className="milestone-text">
              <span className="milestone-tag">
                {item.date ? `${item.date} · ` : ""}
                {item.tag}
              </span>
              <h3>{item.title}</h3>
              <p>{item.note}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

const initials = (name) =>
  /\s/.test(name)
    ? name
        .split(/\s+/)
        .filter((word) => /^[A-Z]/.test(word))
        .slice(0, 3)
        .map((word) => word[0])
        .join("")
    : name.slice(0, 4);

function PartnerCard({ partner, hidden }) {
  const content = (
    <>
      <span className={`partner-logo ${partner.logo ? "has-logo" : ""}`} aria-hidden="true">
        {partner.logo ? (
          <Image src={partner.logo} alt="" width={160} height={160} sizes="72px" />
        ) : (
          initials(partner.name)
        )}
      </span>
      <span className="partner-name">{partner.name}</span>
      {partner.url ? <Icon name="external" size={14} /> : null}
    </>
  );
  return partner.url ? (
    <a
      className="partner-card"
      href={partner.url}
      target="_blank"
      rel="noreferrer"
      tabIndex={hidden ? -1 : undefined}
      aria-label={`${partner.name} (opens in a new tab)`}
      data-cursor-plain
    >
      {content}
    </a>
  ) : (
    <span className="partner-card">{content}</span>
  );
}

// Endless scrolling strip of partner cards; pauses on hover or focus.
export function PartnerStrip({ title = "Partners, schools & programs" }) {
  const row = (hidden) => (
    <ul className="partner-strip-row" aria-hidden={hidden || undefined}>
      {partners.map((partner) => (
        <li key={partner.name}>
          <PartnerCard partner={partner} hidden={hidden} />
        </li>
      ))}
    </ul>
  );

  return (
    <section className="partner-strip" aria-label={title}>
      <p className="partner-strip-title">{title}</p>
      <div className="partner-strip-track">
        {row(false)}
        {row(true)}
      </div>
    </section>
  );
}

export default function MilestonesSection({ id = "milestones", heading = "The big wins so far.", intro }) {
  return (
    <section className="section milestone-section" id={id}>
      <div className="container">
        <Reveal className="milestone-heading">
          <span className="sticker-label sticker-orange">Milestones</span>
          <h2>{heading}</h2>
          {intro ? <p>{intro}</p> : null}
        </Reveal>
        <MilestoneTimeline />
      </div>
    </section>
  );
}
