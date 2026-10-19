"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

// Loading animation between pages: four colored panels sweep up, Finn
// waddles across, the next page loads underneath, then the panels lift off.
// Skipped for same-page #links, new tabs, downloads, outside sites, and
// for anyone with "reduce motion" turned on.
const COVER_MS = 520;
const MIN_SHOW_MS = 650;
const LINES = ["Waddling over…", "Counting coins…", "Flipping pages…", "Honk honk…", "Almost there…"];

export default function PageTransition() {
  const router = useRouter();
  const pathname = usePathname();
  const [phase, setPhase] = useState("idle"); // idle | cover | wait | reveal
  const [line, setLine] = useState(LINES[0]);
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
    <div className={`fgx-wipe is-${phase}`} aria-hidden={phase === "reveal"} role="status" aria-label="Loading the next page">
      <i />
      <i />
      <i />
      <i />
      <div className="fgx-wipe-center">
        <div className="fgx-wipe-runway">
          <Image className="fgx-wipe-finn" src="/assets/finn-striding.webp" alt="" width={2048} height={2048} sizes="120px" priority />
          <span className="fgx-wipe-coins" aria-hidden="true">
            <b>$</b><b>$</b><b>$</b>
          </span>
        </div>
        <p>{line}</p>
        <span className="fgx-wipe-bar"><span /></span>
      </div>
    </div>
  );
}
