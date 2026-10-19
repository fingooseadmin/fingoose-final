"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

// Small site-wide motion touches:
//  • a thin progress bar along the top that fills as you scroll
//  • stat numbers ("1K+", "$10K+", "15M+") count up when they scroll in
//  • [data-parallax] elements drift at their own speed while scrolling
//  • "alive" elements pop, rise, slide or drop in with a stagger as they
//    scroll into view (only ones that start below the fold, so nothing on
//    screen ever disappears)
const ALIVE = [
  [".partner-gallery > li", "drop"],
  [".wwd-page", "rise"],
  [".wwd-chip", "pop"],
  [".scrap-stat", "rise"],
  [".marker-list li", "slide"],
  [".retention-bar > span", "grow"],
  [".join-benefit-card", "rise"],
  [".join-steps-grid > *", "rise"],
  [".join-faq-list > *", "slide"],
  [".resource-scrap-grid > *", "rise"],
  [".workshop-question-card", "rise"],
  [".workshop-stat-grid > *", "pop"],
  [".workshop-fit-grid > *", "rise"],
  [".curriculum-unit", "slide"],
  [".fgx-lessons-tab", "slide"],
  [".fgx-bookpeek-tab", "pop"],
  [".founder-polaroid", "drop"],
  [".mission-note", "rise"],
  [".scrapbook-quote-note", "rise"],
  [".fg-footer-links > *", "rise"],
  [".sticker-label", "stamp"],
  [".fgx-es-stats li", "pop"],
  [".fgx-es-steps li", "rise"],
  [".fgx-es-session", "slide"],
  [".fgx-es-card", "rise"],
  [".fgx-es-words li", "drop"],
  [".fgx-es-slides figure", "rise"],
  [".fgx-es-photos li", "drop"],
  [".fgx-es-bar > span", "grow"],
  [".fgx-es-money-bar > span", "growx"]
];
const COUNT_SELECTOR = ".scrap-stat strong, .impact-metric-card strong, [data-count]";

export default function MotionExtras() {
  const pathname = usePathname();
  const barRef = useRef(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frame = 0;
    const parallax = Array.from(document.querySelectorAll("[data-parallax]"));

    const update = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, window.scrollY / max) : 0;
      if (barRef.current) barRef.current.style.transform = `scaleX(${p})`;
      if (!reduce) {
        parallax.forEach((el) => {
          const r = el.getBoundingClientRect();
          const speed = parseFloat(el.dataset.parallax) || 0.15;
          const offset = (r.top + r.height / 2 - window.innerHeight / 2) * -speed;
          el.style.translate = `0 ${offset.toFixed(1)}px`;
        });
      }
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    // Count-up numbers
    const originals = new Map();
    let io = null;
    if (!reduce && "IntersectionObserver" in window) {
      const nodes = Array.from(document.querySelectorAll(COUNT_SELECTOR));
      const run = (el) => {
        const text = originals.get(el);
        const match = text.match(/^([^\d]*)([\d][\d,]*(?:\.\d+)?)(.*)$/);
        if (!match) return;
        const [, pre, num, post] = match;
        const target = parseFloat(num.replace(/,/g, ""));
        const decimals = (num.split(".")[1] || "").length;
        const commas = num.includes(",");
        const pad = num.length > 1 && num.startsWith("0") ? num.length : 0;
        const start = window.performance.now();
        const dur = 1500;
        const tick = (now) => {
          const t = Math.min(1, (now - start) / dur);
          const eased = 1 - Math.pow(1 - t, 4);
          let value = (target * eased).toFixed(decimals);
          if (commas) value = Number(value).toLocaleString("en-US");
          if (pad) value = value.padStart(pad, "0");
          el.textContent = pre + value + post;
          if (t < 1) window.requestAnimationFrame(tick);
          else {
            el.textContent = text;
          }
        };
        window.requestAnimationFrame(tick);
      };
      io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            io.unobserve(entry.target);
            run(entry.target);
          });
        },
        { threshold: 0.6 }
      );
      nodes.forEach((el) => {
        if (el.children.length) return; // only plain-text numbers
        originals.set(el, el.textContent);
        io.observe(el);
      });
    }

    // Scroll-in "alive" animations
    let aliveIO = null;
    const aliveTimers = [];
    const alive = [];
    if (!reduce && "IntersectionObserver" in window) {
      const seen = new Set();
      ALIVE.forEach(([selector, variant]) => {
        const groups = new Map();
        document.querySelectorAll(selector).forEach((el) => {
          if (seen.has(el) || el.closest(".fgx-sr, [role='dialog']")) return;
          if (el.getBoundingClientRect().top < window.innerHeight * 0.95) return;
          seen.add(el);
          const parent = el.parentElement;
          const i = groups.get(parent) || 0;
          groups.set(parent, i + 1);
          el.style.setProperty("--sr-d", `${Math.min(i, 9) * 75}ms`);
          el.style.setProperty("--sr-r", `${i % 2 ? -9 : 8}deg`);
          el.classList.add("fgx-sr", `fgx-v-${variant}`);
          alive.push(el);
        });
      });
      aliveIO = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            const el = entry.target;
            aliveIO.unobserve(el);
            el.classList.add("fgx-sr-in");
            const delay = parseFloat(el.style.getPropertyValue("--sr-d")) || 0;
            aliveTimers.push(window.setTimeout(() => {
              el.classList.remove("fgx-sr", "fgx-sr-in", ...[...el.classList].filter((c) => c.startsWith("fgx-v-")));
              el.style.removeProperty("--sr-d");
              el.style.removeProperty("--sr-r");
            }, delay + 1100));
          });
        },
        { rootMargin: "0px 0px -10% 0px" }
      );
      alive.forEach((el) => aliveIO.observe(el));
    }

    return () => {
      aliveIO?.disconnect();
      aliveTimers.forEach((t) => window.clearTimeout(t));
      alive.forEach((el) => {
        el.classList.remove("fgx-sr", "fgx-sr-in", ...[...el.classList].filter((c) => c.startsWith("fgx-v-")));
      });
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      io?.disconnect();
      originals.forEach((text, el) => { el.textContent = text; });
      parallax.forEach((el) => el.style.removeProperty("translate"));
    };
  }, [pathname]);

  return (
    <div className="fgx-scrollbar" aria-hidden="true">
      <span ref={barRef} />
    </div>
  );
}
