"use client";

import { Children, useCallback, useEffect, useRef, useState } from "react";

// A page-turning book. Pass an even number of children: the first is the
// front cover, the last is the back cover, and everything in between is
// read as left/right spreads. On phones it becomes a swipeable row of pages.
//   ratio – page height ÷ page width (1.3 for a notebook, ~1 for picture books)
//   maxPage – largest page width in px on desktop
export default function FlipBook({ children, ratio = 1.3, maxPage = 470, label = "Book", className = "", hint }) {
  const pages = Children.toArray(children);
  if (pages.length % 2) pages.push(<div className="fgx-page-blank" key="pad" />);
  const leaves = [];
  for (let i = 0; i < pages.length; i += 2) leaves.push([pages[i], pages[i + 1]]);
  const n = leaves.length;

  const rootRef = useRef(null);
  const railRef = useRef(null);
  const [cur, setCur] = useState(0);
  const [turning, setTurning] = useState(-1);
  const [mobile, setMobile] = useState(false);
  const [railIndex, setRailIndex] = useState(0);
  const [full, setFull] = useState(false);

  // Size the pages so the whole open book fits on screen.
  const size = useCallback(() => {
    const root = rootRef.current;
    if (!root) return;
    const isMobile = window.matchMedia("(max-width: 760px)").matches;
    setMobile(isMobile);
    const w = root.clientWidth;
    let pw;
    if (isMobile) {
      pw = Math.min(w * 0.84, full ? 460 : 380);
    } else {
      const byWidth = Math.floor((w - 2 * 72) / 2);
      const byHeight = Math.floor((window.innerHeight - (full ? 150 : 230)) / ratio);
      pw = Math.max(220, Math.min(full ? 760 : maxPage, byWidth, byHeight));
    }
    root.style.setProperty("--pw", `${pw}px`);
    root.style.setProperty("--ph", `${Math.round(pw * ratio)}px`);
  }, [ratio, maxPage, full]);

  useEffect(() => {
    size();
    let lastW = window.innerWidth;
    const onResize = () => {
      if (Math.abs(window.innerWidth - lastW) > 4 || full) {
        lastW = window.innerWidth;
        size();
      }
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [size, full]);

  const go = useCallback(
    (dir) => {
      if (mobile) {
        const rail = railRef.current;
        const step = rail?.firstElementChild ? rail.firstElementChild.offsetWidth + 16 : 300;
        rail?.scrollBy({ left: dir * step, behavior: "smooth" });
        return;
      }
      setCur((c) => {
        const to = Math.max(0, Math.min(n, c + dir));
        if (to !== c) {
          setTurning(dir > 0 ? c : c - 1);
          window.setTimeout(() => setTurning(-1), 950);
        }
        return to;
      });
    },
    [mobile, n]
  );

  useEffect(() => {
    if (!full) return undefined;
    document.documentElement.classList.add("fgx-book-full-open");
    const onKey = (e) => {
      if (e.key === "Escape") setFull(false);
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.classList.remove("fgx-book-full-open");
      document.removeEventListener("keydown", onKey);
    };
  }, [full]);

  // swipe on the 3D book
  const startX = useRef(null);
  const onPointerDown = (e) => { startX.current = e.clientX; };
  const onPointerUp = (e) => {
    if (startX.current === null) return;
    const dx = e.clientX - startX.current;
    startX.current = null;
    if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
  };

  const onRailScroll = () => {
    const rail = railRef.current;
    if (!rail?.firstElementChild) return;
    setRailIndex(Math.round(rail.scrollLeft / (rail.firstElementChild.offsetWidth + 16)));
  };

  const spreadLabel = (i) => {
    if (i === 0) return "Cover";
    if (i === n) return "Back cover";
    return `Pages ${i * 2 - 1}–${i * 2} of ${(n - 1) * 2}`;
  };
  const label2 = mobile
    ? railIndex === 0 ? "Cover" : railIndex === pages.length - 1 ? "Back cover" : `Page ${railIndex} of ${pages.length - 2}`
    : spreadLabel(cur);
  const atStart = mobile ? railIndex <= 0 : cur === 0;
  const atEnd = mobile ? railIndex >= pages.length - 1 : cur === n;

  return (
    <div
      ref={rootRef}
      className={`fgx-flipbook ${full ? "is-full" : ""} ${className}`}
      role="region"
      aria-roledescription="book"
      aria-label={label}
      tabIndex={0}
      data-lenis-prevent={full ? "" : undefined}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") { e.preventDefault(); go(1); }
        if (e.key === "ArrowLeft") { e.preventDefault(); go(-1); }
      }}
    >
      <button className="fgx-book-btn is-prev" type="button" onClick={() => go(-1)} disabled={atStart} aria-label="Previous page">
        <span aria-hidden="true">←</span>
      </button>

      <div className="fgx-book-stage">
        <div
          className={`fgx-book ${cur > 0 && cur < n ? "is-open" : ""} ${cur === n ? "is-end" : ""}`}
          onPointerDown={onPointerDown}
          onPointerUp={onPointerUp}
        >
          {leaves.map(([front, back], i) => {
            const flipped = i < cur;
            const z = i === turning ? 100 : flipped ? i + 1 : n - i + 1;
            return (
              <div
                key={i}
                className={`fgx-leaf ${flipped ? "is-flipped" : ""} ${i === turning ? "is-turning" : ""}`}
                style={{ zIndex: z }}
                onClick={(e) => {
                  if (e.target.closest("a, button")) return;
                  go(flipped ? -1 : 1);
                }}
                aria-hidden={!(i === cur || i === cur - 1)}
              >
                <div className={`fgx-face is-front ${i === 0 ? "is-cover" : ""}`}>{front}</div>
                <div className={`fgx-face is-back ${i === n - 1 ? "is-cover" : ""}`}>{back}</div>
              </div>
            );
          })}
        </div>

        <div className="fgx-book-rail" ref={railRef} onScroll={onRailScroll} data-lenis-prevent>
          {pages.map((page, i) => (
            <div key={i} className={`fgx-rail-page ${i === 0 || i === pages.length - 1 ? "is-cover" : ""}`}>
              {page}
            </div>
          ))}
        </div>

        <div className="fgx-book-ui">
          <span className="fgx-book-count" aria-live="polite">{label2}</span>
          {hint && atStart ? <span className="fgx-book-hint">{hint}</span> : null}
          <button className="fgx-book-full" type="button" onClick={() => { setFull((f) => !f); window.setTimeout(size, 30); }} aria-pressed={full}>
            {full ? "Exit full screen" : "Full screen"}
          </button>
        </div>
      </div>

      <button className="fgx-book-btn is-next" type="button" onClick={() => go(1)} disabled={atEnd} aria-label="Next page">
        <span aria-hidden="true">→</span>
      </button>
    </div>
  );
}
