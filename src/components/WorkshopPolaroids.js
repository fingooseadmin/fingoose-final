"use client";

import Image from "next/image";
import Link from "@/components/StaticLink";
import { useEffect, useId, useRef, useState } from "react";
import Icon from "./Icon";

export default function WorkshopPolaroids({ events, compact = false }) {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [paused, setPaused] = useState(false);
  const railRef = useRef(null);
  const dialogRef = useRef(null);
  const openerRef = useRef(null);
  const titleId = useId();
  const selected = selectedIndex === null ? null : events[selectedIndex];

  const openStory = (index, event) => {
    openerRef.current = event.currentTarget;
    setSelectedIndex(index);
  };

  const closeStory = () => {
    setSelectedIndex(null);
    window.requestAnimationFrame(() => openerRef.current?.focus());
  };

  const moveStory = (direction) => {
    setSelectedIndex((current) =>
      current === null ? 0 : (current + direction + events.length) % events.length
    );
  };

  const moveRail = (direction) => {
    railRef.current?.scrollBy({
      left: direction * Math.min(560, window.innerWidth * 0.82),
      behavior: "smooth"
    });
  };

  useEffect(() => {
    if (paused || selectedIndex !== null || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;
    const timer = window.setInterval(() => {
      const rail = railRef.current;
      if (!rail) return;
      const atEnd = rail.scrollLeft + rail.clientWidth >= rail.scrollWidth - 8;
      rail.scrollTo({ left: atEnd ? 0 : rail.scrollLeft + Math.min(560, window.innerWidth * 0.82), behavior: "smooth" });
    }, 5600);
    return () => window.clearInterval(timer);
  }, [paused, selectedIndex]);

  useEffect(() => {
    if (selectedIndex === null) return undefined;
    document.body.classList.add("workshop-story-open");
    dialogRef.current?.focus();

    const handleKeyDown = (event) => {
      if (event.key === "Escape") closeStory();
      if (event.key === "ArrowLeft") moveStory(-1);
      if (event.key === "ArrowRight") moveStory(1);
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.classList.remove("workshop-story-open");
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedIndex]);

  return (
    <>
      <div className={`workshop-polaroid-module ${compact ? "is-compact" : ""}`} onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onFocusCapture={() => setPaused(true)} onBlurCapture={() => setPaused(false)}>
        <div className="workshop-polaroid-toolbar">
          <p>Select a field note to open the full workshop story.</p>
          <div aria-label="Browse workshop field notes">
            <button type="button" onClick={() => moveRail(-1)} aria-label="Previous workshop">←</button>
            <button type="button" onClick={() => moveRail(1)} aria-label="Next workshop">→</button>
          </div>
        </div>

        <div className="workshop-polaroid-rail" ref={railRef}>
          {events.map((event, index) => (
            <button
              className={`workshop-polaroid-card polaroid-${event.color}`}
              type="button"
              key={event.shortDate}
              onClick={(clickEvent) => openStory(index, clickEvent)}
              aria-haspopup="dialog"
              aria-label={`Open workshop story: ${event.title}`}
            >
              <span className="workshop-polaroid-tape" aria-hidden="true" />
              <span className="workshop-polaroid-photo">
                <Image
                  alt={`${event.place}: ${event.title}`}
                  src={event.image}
                  fill
                  sizes="(max-width: 700px) 86vw, 570px"
                />
                <span>Open field note <Icon name="arrow" size={15} /></span>
              </span>
              <span className="workshop-polaroid-meta">
                <small>{event.shortDate}</small>
                <strong>{event.place}</strong>
              </span>
              <span className="workshop-polaroid-title">{event.title}</span>
            </button>
          ))}
        </div>
      </div>

      {selected ? (
        <div
          className="workshop-story-backdrop"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) closeStory();
          }}
        >
          <section
            className="workshop-story-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            ref={dialogRef}
            tabIndex={-1}
          >
            <button
              className="workshop-story-close"
              type="button"
              onClick={closeStory}
              aria-label="Close workshop story"
            >
              ×
            </button>

            <div className="workshop-story-photo">
              <Image
                alt={`${selected.place}: ${selected.title}`}
                src={selected.image}
                fill
                sizes="(max-width: 760px) 100vw, 520px"
                priority
              />
              <span>{selected.shortDate}</span>
            </div>

            <div className="workshop-story-copy">
              <span className="sticker-label sticker-orange">{selected.lesson}</span>
              <p className="workshop-story-place">{selected.date} · {selected.place}</p>
              <h2 id={titleId}>{selected.title}</h2>
              <p>{selected.copy}</p>
              <div className="tag-row">
                {selected.tags.map((tag) => <span key={tag}>{tag}</span>)}
              </div>
              <div className="workshop-story-actions">
                <Link className="button button-dark" href="/resources/workshops" onClick={closeStory}>
                  Explore workshops <Icon name="arrow" />
                </Link>
                <div>
                  <button type="button" onClick={() => moveStory(-1)} aria-label="Previous workshop">←</button>
                  <button type="button" onClick={() => moveStory(1)} aria-label="Next workshop">→</button>
                </div>
              </div>
            </div>
          </section>
        </div>
      ) : null}
    </>
  );
}
