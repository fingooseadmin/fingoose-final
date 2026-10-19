"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import DialogLayer from "./DialogLayer";
import Icon from "./Icon";
import { timelineEvents } from "./eventTimelineData";

// Every event photo on the site, as two endlessly drifting rows of
// polaroids. Tap one to open it big. Photos come from the timeline data, so
// adding photos to an event there adds them here too.
const TILTS = [-2.5, 1.8, -1.2, 2.4, -1.8, 1.4, -2.2, 2];

function allPhotos() {
  const seen = new Set();
  const list = [];
  [...timelineEvents].reverse().forEach((event) => {
    event.photos.forEach((photo) => {
      if (seen.has(photo.src) || /flyer|cover/.test(photo.src)) return;
      seen.add(photo.src);
      list.push({ ...photo, event: event.name, date: event.date });
    });
  });
  return list;
}

function Lightbox({ photos, index, onClose, onStep }) {
  const photo = photos[index];
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onStep(1);
      if (e.key === "ArrowLeft") onStep(-1);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose, onStep]);

  return (
    <DialogLayer>
      <div className="fgx-lb-backdrop" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
        <section className="fgx-lb" role="dialog" aria-modal="true" aria-label="Photo viewer">
          <button className="fgx-lb-close" type="button" onClick={onClose} aria-label="Close">×</button>
          <button className="fgx-lb-nav is-prev" type="button" onClick={() => onStep(-1)} aria-label="Previous photo">
            <Icon name="arrow" size={22} />
          </button>
          <figure className="fgx-lb-figure" key={photo.src}>
            <Image src={photo.src} alt={photo.alt} width={photo.width} height={photo.height} sizes="(max-width: 820px) 92vw, 1000px" />
            <figcaption>
              <strong>{photo.event}</strong>
              <span>{photo.date} · {index + 1} / {photos.length}</span>
            </figcaption>
          </figure>
          <button className="fgx-lb-nav is-next" type="button" onClick={() => onStep(1)} aria-label="Next photo">
            <Icon name="arrow" size={22} />
          </button>
        </section>
      </div>
    </DialogLayer>
  );
}

export default function CameraRoll() {
  const photos = allPhotos();
  const [open, setOpen] = useState(-1);
  const half = Math.ceil(photos.length / 2);
  const rows = [photos.slice(0, half), photos.slice(half)];
  const step = useCallback((d) => setOpen((i) => (i + d + photos.length) % photos.length), [photos.length]);
  const close = useCallback(() => setOpen(-1), []);

  return (
    <>
      {rows.map((row, r) => (
        <div className={`fgx-roll ${r ? "is-reverse" : ""}`} key={r} style={{ "--count": row.length }}>
          <ul className="fgx-roll-track">
            {[0, 1].map((copy) =>
              row.map((photo, i) => {
                const index = r * half + i;
                const tilt = TILTS[(i + r * 3) % TILTS.length];
                const inner = (
                  <>
                    <span className="fgx-shot-img">
                      <Image src={photo.src} alt={copy ? "" : photo.alt} width={photo.width} height={photo.height} sizes="260px" loading="lazy" />
                    </span>
                    <span className="fgx-shot-cap">{photo.event}</span>
                  </>
                );
                return (
                  <li key={`${copy}-${photo.src}`} aria-hidden={copy ? "true" : undefined}>
                    {copy ? (
                      <span className="fgx-shot" style={{ "--r": `${tilt}deg` }}>{inner}</span>
                    ) : (
                      <button type="button" className="fgx-shot" style={{ "--r": `${tilt}deg` }} onClick={() => setOpen(index)} data-cursor-plain>
                        {inner}
                      </button>
                    )}
                  </li>
                );
              })
            )}
          </ul>
        </div>
      ))}
      {open >= 0 ? <Lightbox photos={photos} index={open} onClose={close} onStep={step} /> : null}
    </>
  );
}
