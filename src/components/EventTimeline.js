"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
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

export default function EventTimeline() {
  const [openEvent, setOpenEvent] = useState(null);
  const close = useCallback(() => setOpenEvent(null), []);

  return (
    <>
      <ol className="event-timeline">
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
                {event.link || event.instagram ? (
                  <div className="event-timeline-actions">
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

      {openEvent ? <GalleryDialog event={openEvent} onClose={close} /> : null}
    </>
  );
}
