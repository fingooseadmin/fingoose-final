"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import Icon from "./Icon";
import Reveal from "./Reveal";
import { milestones, partners } from "./milestoneData";

// Horizontal timeline: a photo on top, a dot on the line, the story below.
// It only moves with the arrows or on its own (every few seconds), so page
// scrolling never gets caught on it. It loops back to the start at the end.
export function MilestoneTimeline() {
  const railRef = useRef(null);
  const wrapRef = useRef(null);
  const [paused, setPaused] = useState(false);
  const [inView, setInView] = useState(false);

  const move = useCallback((direction) => {
    const rail = railRef.current;
    const item = rail?.querySelector(".milestone-item");
    if (!rail || !item) return;
    const gap = parseFloat(getComputedStyle(rail).columnGap) || 0;
    const step = item.getBoundingClientRect().width + gap;
    const max = rail.scrollWidth - rail.clientWidth;
    let target = rail.scrollLeft + direction * step;
    if (direction > 0 && rail.scrollLeft >= max - 4) target = 0;
    else if (direction < 0 && rail.scrollLeft <= 4) target = max;
    rail.scrollTo({ left: Math.max(0, Math.min(max, target)), behavior: "smooth" });
  }, []);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return undefined;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.3 });
    observer.observe(wrap);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (paused || !inView || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;
    const timer = window.setInterval(() => move(1), 3800);
    return () => window.clearInterval(timer);
  }, [paused, inView, move]);

  return (
    <div
      className="milestone-timeline"
      ref={wrapRef}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div className="milestone-controls">
        <button type="button" onClick={() => move(-1)} aria-label="Previous milestone" data-cursor-plain>
          <Icon name="arrow" size={18} />
        </button>
        <button type="button" onClick={() => move(1)} aria-label="Next milestone" data-cursor-plain>
          <Icon name="arrow" size={18} />
        </button>
      </div>
      <ol className="milestone-rail" ref={railRef}>
        {milestones.map((item, index) => (
          <li className={`milestone-item milestone-${item.color}`} key={item.title} style={{ "--tilt": `${index % 2 ? 1.5 : -1.5}deg` }}>
            <figure className="milestone-photo">
              <span className="milestone-tape" aria-hidden="true" />
              {item.image ? (
                <span className={`milestone-photo-frame${item.fit ? ` fit-${item.fit}` : ""}`}>
                  <Image src={item.image} alt={item.alt || item.title} fill sizes="240px" />
                </span>
              ) : (
                <span className="milestone-photo-frame milestone-photo-blank" aria-hidden="true">
                  <Icon name={item.icon} size={32} />
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
              {item.href ? (
                <a className="milestone-link" href={item.href} target="_blank" rel="noreferrer" data-cursor-plain>
                  {item.linkLabel || "Learn more"} <Icon name="external" size={13} />
                </a>
              ) : null}
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

function PartnerCard({ partner }) {
  const content = (
    <>
      <span className="partner-logo" aria-hidden="true">
        {partner.logo ? (
          <Image src={partner.logo} alt="" width={320} height={96} sizes="220px" />
        ) : (
          initials(partner.name)
        )}
      </span>
      <span className="partner-name">
        {partner.name}
        {partner.url ? <Icon name="external" size={13} /> : null}
      </span>
    </>
  );
  return partner.url ? (
    <a
      className="partner-card"
      href={partner.url}
      target="_blank"
      rel="noreferrer"
      aria-label={`${partner.name} (opens in a new tab)`}
      data-cursor-plain
    >
      {content}
    </a>
  ) : (
    <span className="partner-card" aria-label={partner.name}>{content}</span>
  );
}

// Gallery of partner logos; each tile links to the partner's site.
export function PartnerStrip({ title = "Partners, schools & programs" }) {
  return (
    <section className="partner-strip" aria-label={title}>
      <div className="container">
        <h2 className="partner-strip-title"><span>{title}</span></h2>
        <ul className="partner-gallery">
          {partners.map((partner) => (
            <li key={partner.name}>
              <PartnerCard partner={partner} />
            </li>
          ))}
        </ul>
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
