"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import Icon from "./Icon";

// Slide previews of the FinGoose course lessons, exported from Canva into
// public/assets/lessons/<folder>/01.webp, 02.webp, …
//   parts – which slides belong to the Crisis Lab vs. the Solutions lesson
//           ([label, firstSlide, lastSlide]), shown as a chip on each slide
export const LESSON_DECKS = [
  {
    id: "module-1",
    number: "01",
    title: "Money Management",
    lab: "The Diner Closes",
    blurb: "FinGoose loses his job with no savings. Should he get a new job, save, or take a loan?",
    folder: "module-1",
    count: 19,
    parts: [["Crisis Lab", 1, 12], ["Solutions", 13, 19]]
  },
  {
    id: "module-2",
    number: "02",
    title: "Money Decisions",
    lab: "The Walk-and-Earn App",
    blurb: "An influencer promises easy money for walking. Students sort hype from facts and spot the scam.",
    folder: "module-2",
    count: 22,
    parts: [["Crisis Lab", 1, 13], ["Solutions", 14, 22]]
  },
  {
    id: "module-3",
    number: "03",
    title: "Money Growth",
    lab: "The Pond Float",
    blurb: "FinGoose dreams of growing his money. Should he keep saving it, or invest it?",
    folder: "module-3",
    count: 20,
    parts: [["Crisis Lab", 1, 11], ["Solutions", 12, 20]]
  },
  {
    id: "module-4",
    number: "04",
    title: "Money Around the World",
    lab: "Unequal Starting Conditions",
    blurb: "Slides for this module are on their way.",
    folder: null,
    count: 0,
    parts: []
  },
  {
    id: "module-5",
    number: "05",
    title: "Money and You",
    lab: "Reflection & careers",
    blurb: "Students look back on every Crisis Lab and connect it to their own lives, careers, and DECA.",
    folder: "reflection",
    count: 9,
    parts: [["Reflection", 1, 9]]
  }
];

const AUTOPLAY_MS = 4200;
const src = (deck, i) => `/assets/lessons/${deck.folder}/${String(i + 1).padStart(2, "0")}.webp`;

export default function LessonSlideshows() {
  const [deckIndex, setDeckIndex] = useState(0);
  const [slide, setSlide] = useState(0);
  const [dir, setDir] = useState(1);
  const [playing, setPlaying] = useState(false);
  const [full, setFull] = useState(false);
  const rootRef = useRef(null);
  const thumbsRef = useRef(null);
  const deck = LESSON_DECKS[deckIndex];
  const hasSlides = deck.count > 0;

  const go = useCallback(
    (d) => {
      if (!hasSlides) return;
      setDir(d);
      setSlide((s) => (s + d + deck.count) % deck.count);
    },
    [deck.count, hasSlides]
  );

  const pickDeck = useCallback((index) => {
    setDeckIndex(index);
    setSlide(0);
    setDir(1);
  }, []);

  // Autoplay
  useEffect(() => {
    if (!playing || !hasSlides) return undefined;
    const t = window.setTimeout(() => go(1), AUTOPLAY_MS);
    return () => window.clearTimeout(t);
  }, [playing, slide, go, hasSlides]);

  // Start autoplay the first time the slideshow scrolls into view.
  useEffect(() => {
    const node = rootRef.current;
    if (!node || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setPlaying(true);
        io.disconnect();
      }
    }, { threshold: 0.5 });
    io.observe(node);
    return () => io.disconnect();
  }, []);

  // "Play the slides" buttons elsewhere on the page.
  useEffect(() => {
    const onPick = (event) => {
      const index = LESSON_DECKS.findIndex((d) => d.id === event.detail);
      if (index >= 0) pickDeck(index);
    };
    window.addEventListener("fg:play-slides", onPick);
    return () => window.removeEventListener("fg:play-slides", onPick);
  }, [pickDeck]);

  // Keep the active thumbnail in view.
  useEffect(() => {
    const rail = thumbsRef.current;
    const active = rail?.querySelector(".is-active");
    if (rail && active) {
      rail.scrollTo({ left: active.offsetLeft - rail.clientWidth / 2 + active.clientWidth / 2, behavior: "smooth" });
    }
  }, [slide, deckIndex]);

  useEffect(() => {
    if (!full) return undefined;
    document.documentElement.classList.add("fgx-book-full-open");
    const onKey = (e) => e.key === "Escape" && setFull(false);
    document.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.classList.remove("fgx-book-full-open");
      document.removeEventListener("keydown", onKey);
    };
  }, [full]);

  const part = deck.parts.find(([, a, b]) => slide + 1 >= a && slide + 1 <= b);
  const startX = useRef(null);

  return (
    <div className={`fgx-lessons ${full ? "is-full" : ""}`} ref={rootRef} data-lenis-prevent={full ? "" : undefined}>
      <div className="fgx-lessons-tabs" role="tablist" aria-label="Choose a module">
        {LESSON_DECKS.map((d, i) => (
          <button
            key={d.id}
            type="button"
            role="tab"
            aria-selected={i === deckIndex}
            className={`fgx-lessons-tab ${i === deckIndex ? "is-active" : ""} ${d.count ? "" : "is-soon"}`}
            onClick={() => pickDeck(i)}
          >
            <span className="fgx-lessons-tab-num">{d.number}</span>
            <span>
              <strong>{d.title}</strong>
              <small>{d.count ? `${d.count} slides` : "Slides coming soon"}</small>
            </span>
          </button>
        ))}
      </div>

      <div className="fgx-lessons-main">
        <div
          className="fgx-lessons-stage"
          tabIndex={0}
          aria-roledescription="slideshow"
          aria-label={`Module ${Number(deck.number)}: ${deck.title} slides`}
          onKeyDown={(e) => {
            if (e.key === "ArrowRight") { e.preventDefault(); setPlaying(false); go(1); }
            if (e.key === "ArrowLeft") { e.preventDefault(); setPlaying(false); go(-1); }
          }}
          onPointerDown={(e) => { startX.current = e.clientX; }}
          onPointerUp={(e) => {
            if (startX.current === null) return;
            const dx = e.clientX - startX.current;
            startX.current = null;
            if (Math.abs(dx) > 40) { setPlaying(false); go(dx < 0 ? 1 : -1); }
          }}
        >
          <span className="fgx-lessons-tape" aria-hidden="true" />
          {hasSlides ? (
            <div className={`fgx-lessons-slide dir-${dir > 0 ? "next" : "prev"}`} key={`${deck.id}-${slide}`}>
              <Image
                src={src(deck, slide)}
                alt={`Module ${Number(deck.number)}, ${deck.title}: slide ${slide + 1} of ${deck.count}`}
                width={1280}
                height={720}
                sizes="(max-width: 900px) 92vw, 820px"
                priority={deckIndex === 0 && slide === 0}
              />
            </div>
          ) : (
            <div className="fgx-lessons-soon">
              <Image src="/assets/finn-thinking.webp" alt="" width={2048} height={2048} sizes="180px" />
              <p>Module {Number(deck.number)} slides are being finished.</p>
              <small>Check back soon, or read this module in the full curriculum below.</small>
            </div>
          )}
          {hasSlides && part ? <span className={`fgx-lessons-chip is-${part[0].toLowerCase().replace(/\s+/g, "-")}`}>{part[0]}</span> : null}
          {hasSlides ? (
            <>
              <button className="fgx-lessons-nav is-prev" type="button" onClick={() => { setPlaying(false); go(-1); }} aria-label="Previous slide">
                <Icon name="arrow" size={20} />
              </button>
              <button className="fgx-lessons-nav is-next" type="button" onClick={() => { setPlaying(false); go(1); }} aria-label="Next slide">
                <Icon name="arrow" size={20} />
              </button>
            </>
          ) : null}
        </div>

        <div className="fgx-lessons-bar">
          <div className="fgx-lessons-info">
            <span className="fgx-lessons-kicker">Module {Number(deck.number)} · Crisis Lab: {deck.lab}</span>
            <p>{deck.blurb}</p>
          </div>
          {hasSlides ? (
            <div className="fgx-lessons-controls">
              <button type="button" className="fgx-lessons-play" onClick={() => setPlaying((p) => !p)} aria-pressed={playing}>
                {playing ? "❚❚ Pause" : "▶ Play"}
              </button>
              <span className="fgx-lessons-count" aria-live="polite">
                {String(slide + 1).padStart(2, "0")} / {String(deck.count).padStart(2, "0")}
              </span>
              <button type="button" className="fgx-lessons-full" onClick={() => setFull((f) => !f)} aria-pressed={full}>
                {full ? "Exit full screen" : "Full screen"}
              </button>
            </div>
          ) : null}
        </div>

        {hasSlides ? (
          <div className="fgx-lessons-progress" aria-hidden="true">
            <span key={`${deck.id}-${slide}-${playing}`} className={playing ? "is-playing" : ""} style={{ "--dur": `${AUTOPLAY_MS}ms`, "--done": (slide / deck.count).toFixed(4), "--next": ((slide + 1) / deck.count).toFixed(4) }} />
          </div>
        ) : null}

        {hasSlides ? (
          <div className="fgx-lessons-thumbs" ref={thumbsRef} data-lenis-prevent>
            {Array.from({ length: deck.count }, (_, i) => (
              <button
                key={i}
                type="button"
                className={i === slide ? "is-active" : ""}
                onClick={() => { setPlaying(false); setDir(i > slide ? 1 : -1); setSlide(i); }}
                aria-label={`Show slide ${i + 1}`}
                aria-current={i === slide ? "true" : undefined}
              >
                <Image src={src(deck, i)} alt="" width={1280} height={720} sizes="120px" loading="lazy" />
              </button>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}

// Button for the module cards: picks that module's deck and scrolls up to it.
export function PlaySlidesButton({ deckId, children = "Play the slides" }) {
  return (
    <button
      type="button"
      className="fgx-play-slides"
      onClick={() => {
        window.dispatchEvent(new CustomEvent("fg:play-slides", { detail: deckId }));
        document.getElementById("lesson-slides")?.scrollIntoView({ behavior: "smooth", block: "start" });
      }}
    >
      <Icon name="play" size={16} /> {children}
    </button>
  );
}
