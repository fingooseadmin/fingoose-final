"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

// Clean transition between pages: a navy sheet slides up over the page with
// the FinGoose badge and the name of the page you're going to, the next page
// loads underneath, then the sheet carries on up and off the screen.
// Skipped for same-page #links, new tabs, downloads, outside sites, and
// for anyone with "reduce motion" turned on.
const COVER_MS = 430;
const MIN_SHOW_MS = 280;
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
  const [dest, setDest] = useState("");
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
      const key = url.pathname.replace(/\/+$/, "") || "/";
      setDest(PAGE_NAMES[key] || link.textContent.trim().slice(0, 28) || "Next page");
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
    const t2 = window.setTimeout(() => setPhase("idle"), Math.max(80, MIN_SHOW_MS + COVER_MS - elapsed) + 620);
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
    <div className={`fgx-sheet is-${phase}`} role="status" aria-label={`Loading ${dest}`} aria-hidden={phase === "reveal"}>
      <div className="fgx-sheet-panel">
        <div className="fgx-sheet-center">
          <Image src="/assets/finn-badge.png" alt="" width={512} height={512} sizes="72px" priority />
          <span className="fgx-sheet-name">{dest}</span>
          <span className="fgx-sheet-line"><span /></span>
        </div>
      </div>
    </div>
  );
}
