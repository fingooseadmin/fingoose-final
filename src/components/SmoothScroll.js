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
      // Our own click handler below scrolls to #links with room for the
      // fixed header, so Lenis's built-in anchor jump is turned off.
      anchors: false,
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

    const headerOffset = () => {
      const value = getComputedStyle(document.documentElement).getPropertyValue("--fg-fixed-header-height");
      return (parseFloat(value) || 82) + 16;
    };
    const handleAnchorClick = (event) => {
      const link = event.target.closest?.('a[href*="#"]');
      if (!link || event.defaultPrevented || event.metaKey || event.ctrlKey) return;
      const url = new URL(link.href, window.location.href);
      if (url.pathname !== window.location.pathname || !url.hash || url.hash === "#") return;
      const target = document.getElementById(decodeURIComponent(url.hash.slice(1)));
      if (!target) return;
      event.preventDefault();
      history.pushState(null, "", url.hash);
      lenis.scrollTo(target, { offset: -headerOffset() });
    };
    document.addEventListener("click", handleAnchorClick);

    return () => {
      document.removeEventListener("click", handleAnchorClick);
      observer.disconnect();
      lenis.destroy();
    };
  }, []);

  return null;
}
