"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import Icon from "./Icon";
import { upcomingEvent as event } from "./upcomingEventData";

// Homepage card for the next FinGoose event. Hidden when there is none or
// once it has ended.
export default function UpcomingEvent() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!event) return;
    const end = new Date(event.endsAt).getTime();
    setShow(!Number.isFinite(end) || Date.now() < end);
  }, []);

  if (!event || !show) return null;

  return (
    <section className="section upcoming-event-section" aria-label="Next FinGoose event">
      <div className="container upcoming-event-card">
        {event.image ? (
          <div className="upcoming-event-flyer">
            <Image src={event.image} alt={`${event.name} flyer`} width={event.width} height={event.height} sizes="(max-width: 760px) 70vw, 280px" />
          </div>
        ) : null}
        <div className="upcoming-event-copy">
          <span className="sticker-label sticker-orange">Next event</span>
          <h2>{event.name}</h2>
          <p className="upcoming-event-when"><Icon name="clock" size={18} /> {event.when}</p>
          {event.description ? <p>{event.description}</p> : null}
          {event.href ? (
            <a className="button button-gold" href={event.href} target="_blank" rel="noreferrer">
              {event.linkLabel || "Event details"} <Icon name="external" size={16} />
            </a>
          ) : null}
        </div>
      </div>
    </section>
  );
}
