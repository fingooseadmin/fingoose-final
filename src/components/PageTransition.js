"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

// Loading animation between pages, FinGoose style: a gold coin bursts out
// from wherever you clicked and fills the screen, Finn's badge does a coin
// flip while a little receipt prints the page you're headed to, then the
// coin drops away through a piggy-bank slot at the bottom.
// Skipped for same-page #links, new tabs, downloads, outside sites, and
// for anyone with "reduce motion" turned on.
const COVER_MS = 520;
const MIN_SHOW_MS = 650;
const LINES = ["Counting coins…", "Waddling over…", "Balancing the budget…", "Honk honk…", "Saving you a seat…"];
const PAGE_NAMES = {
  "/": "Home",
  "/about": "About FinGoose",
  "/impact": "Our Impact",
  "/resources": "Resources",
  "/resources/curriculum": "Curriculum",
  "/resources/books": "Children’s Books",
  "/resources/workshops": "Workshops",
  "/resources/autism-kit": "Autism Learning Kit",
  "/course": "Online Course",
  "/join-us": "Start a Chapter",
  "/contact": "Contact",
  "/donate": "Donate"
};

export default function PageTransition() {
  const router = useRouter();
  const pathname = usePathname();
  const [phase, setPhase] = useState("idle"); // idle | cover | wait | reveal
  const [line, setLine] = useState(LINES[0]);
  const [dest, setDest] = useState("");
  const [origin, setOrigin] = useState({ x: "50%", y: "50%" });
  const pending = useRef(null);
  const startedAt = useRef(0);
  const lastPath = useRef(pathname);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");

    const onClick = (event) => {
      if (reduce.matches || event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const link = event.target.closest?.("a[href]");
      if (!link || link.target === "_blank" || link.hasAttribute("download") || link.dataset.noTransition !== undefined) return;
      if (link.closest('[role="dialog"]') && !link.getAttribute("href").startsWith("/")) return;
      const url = new URL(link.href, window.location.href);
      if (url.origin !== window.location.origin) return;
      const norm = (p) => p.replace(/\/+$/, "") || "/";
      if (norm(url.pathname) === norm(window.location.pathname)) return; // same page or #anchor
      if (/\.(pdf|png|jpe?g|webp|mp4|zip|ico|xml|txt)$/i.test(url.pathname)) return;

      // Next's <Link> sees defaultPrevented and leaves the navigation to us;
      // the link's own onClick handlers (closing menus etc.) still run.
      event.preventDefault();
      pending.current = url.pathname + url.search + url.hash;
      startedAt.current = window.performance.now();
      setLine(LINES[Math.floor(Math.random() * LINES.length)]);
      const key = url.pathname.replace(/\/+$/, "") || "/";
      setDest(PAGE_NAMES[key] || link.textContent.trim().slice(0, 28) || "Next page");
      setOrigin({ x: `${event.clientX || window.innerWidth / 2}px`, y: `${event.clientY || window.innerHeight / 2}px` });
      setPhase("cover");
      window.setTimeout(() => {
        setPhase("wait");
        router.push(pending.current);
      }, COVER_MS);
    };

    // Capture phase so this runs before Next's own link handler.
    window.addEventListener("click", onClick, true);
    return () => window.removeEventListener("click", onClick, true);
  }, [router]);

  // The new page has rendered: lift the panels off.
  useEffect(() => {
    if (pathname === lastPath.current) return undefined;
    lastPath.current = pathname;
    if (phase === "idle") return undefined;
    const elapsed = window.performance.now() - startedAt.current;
    const t1 = window.setTimeout(() => {
      if (!window.location.hash) window.scrollTo({ top: 0, behavior: "instant" });
      setPhase("reveal");
    }, Math.max(80, MIN_SHOW_MS + COVER_MS - elapsed));
    const t2 = window.setTimeout(() => setPhase("idle"), Math.max(80, MIN_SHOW_MS + COVER_MS - elapsed) + 700);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, [pathname, phase]);

  // Safety net: never leave the cover up if navigation stalls.
  useEffect(() => {
    if (phase !== "wait") return undefined;
    const t = window.setTimeout(() => setPhase("reveal"), 6000);
    return () => window.clearTimeout(t);
  }, [phase]);

  useEffect(() => {
    document.documentElement.classList.toggle("fgx-navigating", phase === "cover" || phase === "wait");
  }, [phase]);

  if (phase === "idle") return null;

  return (
    <div
      className={`fgx-coin is-${phase}`}
      style={{ "--cx": origin.x, "--cy": origin.y }}
      aria-hidden={phase === "reveal"}
      role="status"
      aria-label={`Loading ${dest}`}
    >
      <div className="fgx-coin-fill">
        <span className="fgx-coin-ridge" />
        <div className="fgx-coin-center">
          <div className="fgx-coin-flip">
            <span className="fgx-coin-face is-front">
              <Image src="/assets/finn-badge.png" alt="" width={512} height={512} sizes="140px" priority />
            </span>
            <span className="fgx-coin-face is-back">$</span>
          </div>
          <div className="fgx-receipt">
            <p className="fgx-receipt-head">FinGoose Bank · receipt</p>
            <p className="fgx-receipt-row"><span>Next stop</span><strong>{dest}</strong></p>
            <p className="fgx-receipt-row"><span>Cost</span><strong>$0.00</strong></p>
            <p className="fgx-receipt-row"><span>Knowledge</span><strong>+100</strong></p>
            <p className="fgx-receipt-note">{line}</p>
          </div>
        </div>
      </div>
      <span className="fgx-coin-slot" aria-hidden="true" />
    </div>
  );
}
