"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const INTRO_KEY = "fingoose-intro-played";
const FULL_DURATION = 850;
const REDUCED_DURATION = 300;

export default function SiteIntro() {
  const [visible, setVisible] = useState(true);
  const [phase, setPhase] = useState("loading");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const body = document.body;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let readyTimer = 0;
    let exitTimer = 0;


    let introPlayed = false;
    try {
      introPlayed = Boolean(window.sessionStorage.getItem(INTRO_KEY));
    } catch {
      introPlayed = false;
    }

    if (introPlayed) {
      setVisible(false);
      return undefined;
    }

    body.classList.add("intro-active");
    const duration = reducedMotion.matches ? REDUCED_DURATION : FULL_DURATION;
    const startedAt = window.performance.now();
    let lastProgress = -1;

    const tick = (now) => {
      const nextProgress = Math.min(
        100,
        Math.floor(((now - startedAt) / duration) * 100)
      );

      if (nextProgress !== lastProgress) {
        lastProgress = nextProgress;
        setProgress(nextProgress);
      }

      if (nextProgress < 100) {
        frame = window.requestAnimationFrame(tick);
        return;
      }

      try {
        window.sessionStorage.setItem(INTRO_KEY, "true");
      } catch {
      }


      setPhase("ready");
      readyTimer = window.setTimeout(() => setPhase("leaving"), 120);
      exitTimer = window.setTimeout(() => {
        body.classList.remove("intro-active");
        body.classList.add("intro-revealed");
        setVisible(false);
      }, reducedMotion.matches ? 420 : 520);
    };

    frame = window.requestAnimationFrame(tick);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.clearTimeout(readyTimer);
      window.clearTimeout(exitTimer);
      body.classList.remove("intro-active");
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      className={`site-intro is-${phase}`}
      style={{
        "--intro-progress": progress / 100,
        "--intro-percent": `${progress}%`,
        "--intro-flare-scale": 0.65 + (progress / 100) * 1.35,
        "--intro-flare-opacity": 0.18 + (progress / 100) * 0.2
      }}
      aria-label="FinGoose is loading"
      aria-live="polite"
    >
      <div className="intro-curtain intro-curtain-top" aria-hidden="true" />
      <div className="intro-curtain intro-curtain-bottom" aria-hidden="true" />
      <div className="intro-grid" aria-hidden="true" />
      <div className="intro-flare" aria-hidden="true" />

      <div className="intro-content">
        <div className="intro-wordmark">
          <span>Fin</span>Goose
        </div>
        <p>Silly goose, serious money.</p>

        <div className="intro-runway" aria-hidden="true">
          <div className="intro-runner">
            <Image
              alt=""
              src="/assets/finn-striding.png"
              width={2048}
              height={2048}
              sizes="(max-width: 620px) 150px, 230px"
              priority
            />
          </div>
          <span className="intro-finish-line" />
        </div>

        <div
          className="intro-progress"
          role="progressbar"
          aria-valuemin="0"
          aria-valuemax="100"
          aria-valuenow={progress}
        >
          <div className="intro-progress-copy">
            <span>{progress < 100 ? "Warming up the money lab" : "Ready to waddle"}</span>
            <strong>{progress}%</strong>
          </div>
          <div className="intro-progress-track">
            <span />
          </div>
        </div>
      </div>

      <div className="intro-burst" aria-hidden="true">
        <span />
        <span />
        <span />
        <span />
      </div>
    </div>
  );
}
