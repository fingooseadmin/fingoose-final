"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import DialogLayer from "./DialogLayer";
import Icon from "./Icon";
import { timelineEvents } from "./eventTimelineData";

function GalleryDialog({ event, onClose }) {
  const [index, setIndex] = useState(0);
  const count = event.photos.length;
  const photo = event.photos[index];

  const step = useCallback(
    (direction) => setIndex((current) => (current + direction + count) % count),
    [count]
  );

  useEffect(() => {
    const handleKey = (keyEvent) => {
      if (keyEvent.key === "Escape") onClose();
      if (keyEvent.key === "ArrowRight") step(1);
      if (keyEvent.key === "ArrowLeft") step(-1);
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose, step]);

  return (
    <DialogLayer>
      <div
        className="event-gallery-backdrop"
        onMouseDown={(mouseEvent) => mouseEvent.target === mouseEvent.currentTarget && onClose()}
      >
        <section className="event-gallery-dialog" role="dialog" aria-modal="true" aria-label={`${event.name} photo gallery`}>
          <header className="event-gallery-header">
            <div>
              <span className="event-gallery-date">{event.date}</span>
              <h2>{event.name}</h2>
            </div>
            <button className="event-gallery-close" type="button" onClick={onClose} aria-label="Close gallery">
              ×
            </button>
          </header>

          <div className="event-gallery-stage">
            <span className="event-gallery-backdrop-photo" aria-hidden="true" style={{ backgroundImage: `url(${photo.src})` }} key={`bg-${photo.src}`} />
            <Image
              key={photo.src}
              src={photo.src}
              alt={photo.alt}
              width={photo.width}
              height={photo.height}
              sizes="(max-width: 820px) 92vw, 900px"
            />
            {count > 1 ? (
              <>
                <button className="event-gallery-nav is-prev" type="button" onClick={() => step(-1)} aria-label="Previous photo">
                  <Icon name="arrow" size={22} />
                </button>
                <button className="event-gallery-nav is-next" type="button" onClick={() => step(1)} aria-label="Next photo">
                  <Icon name="arrow" size={22} />
                </button>
              </>
            ) : null}
          </div>

          <p className="event-gallery-count" aria-live="polite">
            Photo {index + 1} of {count}
          </p>

          <div className="event-gallery-thumbs">
            {event.photos.map((thumb, thumbIndex) => (
              <button
                key={thumb.src}
                type="button"
                className={thumbIndex === index ? "is-active" : ""}
                onClick={() => setIndex(thumbIndex)}
                aria-label={`Show photo ${thumbIndex + 1}`}
                aria-current={thumbIndex === index ? "true" : undefined}
              >
                <Image src={thumb.src} alt="" width={thumb.width} height={thumb.height} sizes="96px" />
              </button>
            ))}
          </div>
        </section>
      </div>
    </DialogLayer>
  );
}

// Background colors the timeline section moves through as you scroll it.
const SCROLL_COLORS = [
  [249, 243, 228], // cream
  [255, 238, 184], // butter
  [255, 220, 190], // peach
  [236, 226, 255], // lavender
  [221, 229, 255] // periwinkle
];

function colorAt(progress) {
  const scaled = progress * (SCROLL_COLORS.length - 1);
  const index = Math.min(SCROLL_COLORS.length - 2, Math.floor(scaled));
  const t = scaled - index;
  const [a, b] = [SCROLL_COLORS[index], SCROLL_COLORS[index + 1]];
  return `rgb(${a.map((value, i) => Math.round(value + (b[i] - value) * t)).join(", ")})`;
}

export default function EventTimeline() {
  const [openEvent, setOpenEvent] = useState(null);
  const close = useCallback(() => setOpenEvent(null), []);
  const listRef = useRef(null);

  // As the reader scrolls down the timeline, the section's background
  // slowly shifts color and the center line fills in orange.
  useEffect(() => {
    const list = listRef.current;
    const section = list?.closest("section");
    if (!list || !section) return undefined;
    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = list.getBoundingClientRect();
      const middle = window.innerHeight * 0.55;
      const progress = Math.min(1, Math.max(0, (middle - rect.top) / rect.height));
      section.style.setProperty("--tl-bg", colorAt(progress));
      section.style.setProperty("--tl-progress", progress.toFixed(4));
      // Light up each stop once the orange line reaches it.
      const lineY = rect.top + progress * rect.height;
      list.querySelectorAll(".event-timeline-item").forEach((item) => {
        const dot = item.querySelector(".event-timeline-dot");
        if (!dot) return;
        const d = dot.getBoundingClientRect();
        item.classList.toggle("is-reached", d.top + d.height / 2 <= lineY + 2);
      });
      section.classList.toggle("tl-finished", progress >= 0.999);
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <>
      <div className="tl-cap tl-cap-start" aria-hidden="true">
        <span className="tl-cap-flag">The start</span>
      </div>
      <ol className="event-timeline" ref={listRef}>
        <li className="tl-runner" aria-hidden="true">
          <Image src="/assets/finn-walking.webp" alt="" width={2048} height={2048} sizes="64px" />
        </li>
        {timelineEvents.map((event, eventIndex) => {
          const cover = event.photos[0];
          return (
            <li className="event-timeline-item" key={event.id} style={{ "--tilt": eventIndex % 2 ? "2deg" : "-2deg" }}>
              {cover ? (
                <button
                  className="event-timeline-polaroid"
                  type="button"
                  onClick={() => setOpenEvent(event)}
                  data-cursor-plain
                  aria-label={`View more photos from ${event.name}`}
                >
                  <span className="event-timeline-tape" aria-hidden="true" />
                  <span className="event-timeline-photo">
                    <Image src={cover.src} alt={cover.alt} width={cover.width} height={cover.height} sizes="(max-width: 820px) 70vw, 380px" />
                    <span className="event-timeline-hover" aria-hidden="true">
                      {event.photos.length > 1 ? "View more" : "View photo"} <Icon name="arrow" size={18} />
                    </span>
                  </span>
                  <span className="event-timeline-caption" aria-hidden="true">{event.name}</span>
                </button>
              ) : (
                <div className={`event-timeline-polaroid is-blank tone-${eventIndex % 5}`} aria-hidden="true">
                  <span className="event-timeline-tape" />
                  <span className="event-timeline-photo">
                    <Icon name={event.icon || "spark"} size={44} />
                  </span>
                  <span className="event-timeline-caption">{event.name}</span>
                </div>
              )}

              <span className="event-timeline-dot" aria-hidden="true" />

              <article className="event-timeline-card">
                <h3>
                  <span>{event.date}:</span> {event.name}
                </h3>
                <p>{event.description}</p>
                {event.link || event.instagram || event.spotlight ? (
                  <div className="event-timeline-actions">
                    {event.spotlight ? (
                      <a className="button button-dark event-timeline-insta" href={event.spotlight} data-spotlight={event.spotlight.split("#")[1]}>
                        Read the full story <Icon name="arrow" size={16} />
                      </a>
                    ) : null}
                    {event.link ? (
                      <a className="button button-gold event-timeline-insta" href={event.link} target="_blank" rel="noreferrer">
                        {event.linkLabel || "Learn more"} <Icon name="external" size={16} />
                      </a>
                    ) : null}
                    {event.instagram ? (
                      <a className="button button-gold event-timeline-insta" href={event.instagram} target="_blank" rel="noreferrer">
                        <Icon name="instagram" size={18} /> See it on Instagram
                      </a>
                    ) : null}
                  </div>
                ) : null}
              </article>
            </li>
          );
        })}
      </ol>
      <div className="tl-cap tl-cap-end">
        <span className="tl-cap-flag is-now">Today</span>
        <p>…and we’re just getting started. Follow along for the next chapter.</p>
        <a className="button button-gold" href="https://www.instagram.com/fin.goose/" target="_blank" rel="noreferrer">
          <Icon name="instagram" size={18} /> Follow @fin.goose
        </a>
      </div>

      {openEvent ? <GalleryDialog event={openEvent} onClose={close} /> : null}
    </>
  );
}
