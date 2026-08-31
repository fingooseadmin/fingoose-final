"use client";

import { useEffect, useRef, useState } from "react";
import FlowWords from "./FlowWords";

function MotionStudy({ alt, loop, still }) {
  const ref = useRef(null);
  const [source, setSource] = useState(still);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let visible = false;

    const syncSource = () => setSource(visible && !reducedMotion.matches ? loop : still);
    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        syncSource();
      },
      { rootMargin: "180px 0px", threshold: 0 }
    );

    observer.observe(node);
    reducedMotion.addEventListener("change", syncSource);

    return () => {
      observer.disconnect();
      reducedMotion.removeEventListener("change", syncSource);
    };
  }, [loop, still]);

  return (
    <img
      alt={alt}
      decoding="async"
      loading="lazy"
      ref={ref}
      src={source}
    />
  );
}

export default function MotionReels() {
  return (
    <section className="motion-reels" aria-labelledby="motion-reels-title">
      <div className="motion-reels-heading">
        <div>
          <span className="sticker-label">Money, but moving</span>
          <h2 id="motion-reels-title">
            <FlowWords>A lesson should feel alive.</FlowWords>
          </h2>
        </div>
        <p>
          Two looping motion studies inspired by FinGoose crisis labs:
          build a plan, meet a surprise, and keep moving.
        </p>
      </div>

      <div className="motion-reel-grid">
        <article className="motion-reel motion-reel-blue">
          <span className="film-perf film-perf-top" aria-hidden="true" />
          <span className="film-perf film-perf-bottom" aria-hidden="true" />
          <div className="motion-reel-screen">
            <MotionStudy
              alt="Animated FinGoose motion graphic about planning and pivoting"
              loop="/motion/plan-pivot-loop.webp"
              still="/motion/plan-pivot-still.webp"
            />
            <span className="reel-scanline" aria-hidden="true" />
          </div>
          <div className="motion-reel-caption">
            <span>Loop 01 · Crisis lab</span>
            <strong>Plan → surprise → pivot</strong>
          </div>
        </article>

        <article className="motion-reel motion-reel-orange">
          <span className="film-perf film-perf-top" aria-hidden="true" />
          <span className="film-perf film-perf-bottom" aria-hidden="true" />
          <div className="motion-reel-screen">
            <MotionStudy
              alt="Animated FinGoose motion graphic about building money confidence"
              loop="/motion/confidence-loop.webp"
              still="/motion/confidence-still.webp"
            />
            <span className="reel-scanline" aria-hidden="true" />
          </div>
          <div className="motion-reel-caption">
            <span>Loop 02 · Skill builder</span>
            <strong>Small choices compound</strong>
          </div>
        </article>
      </div>
    </section>
  );
}
