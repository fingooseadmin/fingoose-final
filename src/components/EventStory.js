"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import Icon from "./Icon";
import { Lightbox } from "./CameraRoll";
import { Sticker } from "./Stickers";
import { spotlights, workshopStory } from "./spotlightData";

// Taped polaroid strip; tap a photo to open it big.
function PhotoStrip({ photos }) {
  const [open, setOpen] = useState(-1);
  const step = useCallback((d) => setOpen((i) => (i + d + photos.length) % photos.length), [photos.length]);
  const close = useCallback(() => setOpen(-1), []);
  return (
    <>
      <ul className={`fgx-es-photos count-${photos.length}`}>
        {photos.map((photo, i) => (
          <li key={photo.src} style={{ "--r": `${[-3, 2, -1.5, 2.6, -2.2, 1.4][i % 6]}deg` }}>
            <button type="button" className="fgx-es-photo" onClick={() => setOpen(i)} data-cursor-plain>
              <span className="fgx-es-photo-img">
                <Image src={photo.src} alt={photo.alt} width={photo.width} height={photo.height} sizes="(max-width: 700px) 45vw, 280px" />
              </span>
              <span className="fgx-es-photo-cap">{photo.caption}</span>
            </button>
          </li>
        ))}
      </ul>
      {open >= 0 ? <Lightbox photos={photos} index={open} onClose={close} onStep={step} /> : null}
    </>
  );
}

export function TapedPhoto({ photo, tilt = 2, sticker, className = "", sizes = "(max-width: 900px) 80vw, 420px" }) {
  return (
    <figure className={`fgx-es-taped ${className}`} style={{ "--r": `${tilt}deg` }}>
      <span className="fgx-es-taped-tape" aria-hidden="true" />
      <span className="fgx-es-taped-img">
        <Image src={photo.src} alt={photo.alt} width={photo.width} height={photo.height} sizes={sizes} />
      </span>
      {photo.caption ? <figcaption>{photo.caption}</figcaption> : null}
      {sticker ? <Sticker kind={sticker} style={{ right: "-18px", top: "-20px", width: "54px", "--r": "14deg" }} /> : null}
    </figure>
  );
}

function StoryHeader({ story, sticker = "star" }) {
  return (
    <header className="fgx-es-head">
      <div className="fgx-es-head-copy">
        <span className="fgx-es-kicker">{story.kicker}</span>
        <h3><span className="fgx-es-hl">{story.title}</span></h3>
        <p className="fgx-es-meta">
          <span><Icon name="clock" size={16} /> {story.when}</span>
          <span><Icon name="school" size={16} /> {story.where}</span>
        </p>
        <p className="fgx-es-hook">{story.hook}</p>
        <ul className="fgx-es-stats">
          {story.stats.map((stat) => (
            <li key={stat.label}>
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
            </li>
          ))}
        </ul>
      </div>
      {story.hero ? <TapedPhoto photo={story.hero} tilt={2.5} sticker={sticker} className="fgx-es-hero" /> : null}
    </header>
  );
}

// The full Crisis Lab workshop series (used on the Workshops page).
export function WorkshopStory() {
  const s = workshopStory;
  return (
    <article className="fgx-es tone-gold" id={s.id}>
      <StoryHeader story={s} />

      <h4 className="fgx-es-h">how a workshop goes</h4>
      <ol className="fgx-es-line">
        {s.steps.map((step, i) => (
          <li key={step.title}>
            <span className="fgx-es-line-dot" aria-hidden="true" />
            <span className="fgx-es-line-num">Step {i + 1}</span>
            <strong>{step.title}</strong>
            <p>{step.copy}</p>
          </li>
        ))}
      </ol>

      <h4 className="fgx-es-h">the actual slides we used</h4>
      <div className="fgx-es-slides">
        {s.slides.map((slide, i) => (
          <figure key={slide.src} style={{ "--r": `${[-2, 1.5, -1][i]}deg` }}>
            <Image src={slide.src} alt={slide.alt} width={1280} height={720} sizes="(max-width: 700px) 80vw, 360px" />
          </figure>
        ))}
        <Link className="fgx-es-slides-link" href="/resources/curriculum/#lesson-slides">
          see every lesson’s slides →
        </Link>
      </div>

      <h4 className="fgx-es-h">visit by visit</h4>
      <div className="fgx-es-sessions">
        {s.sessions.map((session) => (
          <section className="fgx-es-session" key={session.date}>
            <div className="fgx-es-session-img">
              <Image src={session.image} alt={session.title} width={session.width} height={session.height} sizes="(max-width: 700px) 80vw, 260px" />
            </div>
            <div className="fgx-es-session-copy">
              <span className="fgx-es-session-tag">{session.tag}</span>
              <p className="fgx-es-session-when">{session.date} · {session.place}</p>
              <h5>{session.title}</h5>
              <p>{session.copy}</p>
              <a className="fgx-es-ig" href={session.instagram} target="_blank" rel="noreferrer">
                recap post on insta →
              </a>
            </div>
          </section>
        ))}
      </div>

      <div className="fgx-es-results">
        <div className="fgx-es-results-copy">
          <h4 className="fgx-es-h">the result!!</h4>
          <p className="fgx-es-big">scores more than doubled</p>
          <p>average score across all three: 43% before → 93% after</p>
        </div>
        <div className="fgx-es-bars" role="img" aria-label="Average score: 43% before, 93% after">
          <div className="fgx-es-bar is-before" style={{ "--h": "43%" }}><strong>43%</strong><span /><small>Pre-test</small></div>
          <div className="fgx-es-bar is-after" style={{ "--h": "93%" }}><strong>93%</strong><span /><small>Post-test</small></div>
        </div>
        <blockquote className="fgx-es-quote">
          <p>“{s.quote.text}”</p>
          <footer>{s.quote.name} · {s.quote.role}</footer>
          <Sticker kind="star" style={{ right: "-14px", top: "-18px", width: "46px", "--r": "12deg" }} />
        </blockquote>
      </div>

      <h4 className="fgx-es-h">what we fixed after</h4>
      <div className="fgx-es-cards">
        {s.changes.map((c) => (
          <div className="fgx-es-card" key={c.title}>
            <strong>{c.title}</strong>
            <p>{c.copy}</p>
            {c.href ? <Link href={c.href}>{c.linkLabel} <Icon name="arrow" size={14} /></Link> : null}
          </div>
        ))}
      </div>

      <h4 className="fgx-es-h">snapshots</h4>
      <PhotoStrip photos={s.photos} />
    </article>
  );
}

function Spotlight({ story }) {
  const total = story.breakdown ? story.breakdown.rows.reduce((sum, r) => sum + r.amount, 0) : 0;
  return (
    <article className={`fgx-es tone-${story.tone}`}>
      <StoryHeader story={story} sticker={story.tone === "orange" ? "coin" : "smile"} />

      {story.breakdown ? (
        <div className={`fgx-es-money ${story.breakdown.photo ? "has-photo" : ""}`}>
          <div className="fgx-es-money-main">
          <h4 className="fgx-es-h">{story.breakdown.title}</h4>
          <div className="fgx-es-money-bar" aria-hidden="true">
            {story.breakdown.rows.map((r) => (
              <span key={r.label} style={{ "--w": `${(r.amount / total) * 100}%`, "--c": r.color }}>
                ${r.amount.toLocaleString("en-US")}
              </span>
            ))}
          </div>
          <ul className="fgx-es-money-rows">
            {story.breakdown.rows.map((r) => (
              <li key={r.label}>
                <i style={{ background: r.color }} aria-hidden="true" />
                <strong>{r.label}</strong>
                <span>{r.detail}</span>
                <b>${r.amount.toLocaleString("en-US")}</b>
              </li>
            ))}
            <li className="is-total">
              <strong>Total raised</strong>
              <b>${total.toLocaleString("en-US")}</b>
            </li>
          </ul>
          <p className="fgx-es-money-note">{story.breakdown.note}</p>
          </div>
          {story.breakdown.photo ? <TapedPhoto photo={story.breakdown.photo} tilt={-3} sticker="star" /> : null}
        </div>
      ) : null}

      {story.story ? (
        <div className={`fgx-es-book ${story.story.photo ? "has-photo" : ""}`}>
          {story.story.photo ? <TapedPhoto photo={story.story.photo} tilt={-3} sizes="260px" /> : null}
          <div>
            <h4 className="fgx-es-h">{story.story.title}</h4>
            <p>{story.story.copy}</p>
            <Link className="fgx-es-book-link" href={story.story.href}>
              {story.story.linkLabel} <Icon name="book" size={16} />
            </Link>
          </div>
        </div>
      ) : null}

      {story.words ? (
        <>
          <h4 className="fgx-es-h">money words from the book</h4>
          <ul className="fgx-es-words">
            {story.words.map((w, i) => (
              <li key={w.word} style={{ "--r": `${[-2, 1.5, -1, 2, -1.5, 1, -2.5][i % 7]}deg` }}>
                <strong>{w.word}</strong>
                <span>{w.meaning}</span>
              </li>
            ))}
          </ul>
        </>
      ) : null}

      {story.sections?.length
        ? story.sections.map((sec, i) => (
            <div className={`fgx-es-row ${sec.photo ? "has-photo" : ""} ${i % 2 ? "is-flip" : ""}`} key={sec.title}>
              <div className="fgx-es-row-copy">
                <h4 className="fgx-es-h">{sec.title}</h4>
                <p>{sec.copy}</p>
              </div>
              {sec.photo ? <TapedPhoto photo={sec.photo} tilt={i % 2 ? -2.5 : 2.5} sizes="300px" /> : null}
            </div>
          ))
        : null}

      <h4 className="fgx-es-h">snapshots</h4>
      <PhotoStrip photos={story.photos} />

      <div className="fgx-es-links">
        {story.links.map((link) =>
          link.external ? (
            <a key={link.href} className="button button-gold" href={link.href} target="_blank" rel="noreferrer">
              <Icon name="instagram" size={17} /> {link.label}
            </a>
          ) : (
            <Link key={link.href} className="button button-dark" href={link.href}>
              {link.label} <Icon name="arrow" />
            </Link>
          )
        )}
      </div>
    </article>
  );
}

// Impact page: tabs for the big events. The workshop series has its own
// page, so its tab is a summary that links there.
export default function EventSpotlights() {
  const tabs = [
    { id: "workshops", tab: "Crisis Lab workshops" },
    ...spotlights.map((s) => ({ id: s.id, tab: s.tab }))
  ];
  const [active, setActive] = useState(0);
  const w = workshopStory;

  // "Read the full story" links (and arriving with #spotlight-…) open the
  // right tab. The anchors below stay in the page so the scroll can land.
  useEffect(() => {
    const pick = (hash) => {
      const index = tabs.findIndex((t) => `#${t.id}` === hash);
      if (index > 0) setActive(index);
    };
    pick(window.location.hash);
    const onClick = (event) => {
      const link = event.target.closest?.('a[href*="#spotlight-"]');
      if (link) pick(new URL(link.href).hash);
    };
    const onHash = () => pick(window.location.hash);
    document.addEventListener("click", onClick);
    window.addEventListener("hashchange", onHash);
    return () => {
      document.removeEventListener("click", onClick);
      window.removeEventListener("hashchange", onHash);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="fgx-spotlights">
      {spotlights.map((sp) => <span key={sp.id} id={sp.id} className="fgx-spot-anchor" aria-hidden="true" />)}
      <div className="fgx-spot-tabs" role="tablist" aria-label="Choose an event">
        {tabs.map((t, i) => (
          <button
            key={t.id}
            type="button"
            role="tab"
            aria-selected={i === active}
            className={i === active ? "is-active" : ""}
            onClick={() => setActive(i)}
          >
            {t.tab}
          </button>
        ))}
      </div>

      <div className="fgx-spot-panel" key={active} role="tabpanel">
        {active === 0 ? (
          <article className="fgx-es tone-gold fgx-es-summary">
            <StoryHeader story={w} />
            <div className="fgx-es-results is-compact">
              <div className="fgx-es-bars" role="img" aria-label="Average score: 43% before, 93% after">
                <div className="fgx-es-bar is-before" style={{ "--h": "43%" }}><strong>43%</strong><span /><small>Pre-test</small></div>
                <div className="fgx-es-bar is-after" style={{ "--h": "93%" }}><strong>93%</strong><span /><small>Post-test</small></div>
              </div>
              <ul className="fgx-es-mini-sessions">
                {w.sessions.map((s) => (
                  <li key={s.date}>
                    <span>{s.date}</span>
                    <strong>{s.place}</strong>
                    <em>{s.tag.split(" · ")[1]}</em>
                  </li>
                ))}
              </ul>
            </div>
            <PhotoStrip photos={w.photos.slice(0, 4)} />
            <div className="fgx-es-links">
              <Link className="button button-dark" href="/resources/workshops/#workshop-story">
                Read the full workshop story <Icon name="arrow" />
              </Link>
            </div>
          </article>
        ) : (
          <Spotlight story={spotlights[active - 1]} />
        )}
      </div>
    </div>
  );
}
