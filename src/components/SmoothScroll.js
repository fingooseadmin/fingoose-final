"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

// Momentum ("buttery") scrolling for mouse wheels and trackpads.
// Phones keep their own native scrolling, and anyone with "reduce motion"
// turned on gets normal scrolling.
export default function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;

    const lenis = new Lenis({
      lerp: 0.1,
      wheelMultiplier: 1,
      anchors: true,
      autoRaf: true,
      // Inner scroll areas (popups, side-scrolling rails, long lists) keep
      // scrolling on their own instead of moving the page.
      allowNestedScroll: true,
      prevent: (node) => Boolean(node.closest?.('[role="dialog"], [data-lenis-prevent]'))
    });

    // Popups lock the page by setting body overflow to hidden; pause the
    // smooth scroller while that lock is on.
    const syncWithPopups = () => {
      if (document.body.style.overflow === "hidden") lenis.stop();
      else lenis.start();
    };
    const observer = new MutationObserver(syncWithPopups);
    observer.observe(document.body, { attributes: true, attributeFilter: ["style"] });

    return () => {
      observer.disconnect();
      lenis.destroy();
    };
  }, []);

  return null;
}
