"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

const INTERACTIVE_SELECTOR = [
  "a",
  "button",
  ".offer-scrap-card",
  ".postit-path-card",
  ".impact-polaroid",
  ".wheel-polaroid",
  ".motion-reel",
  ".team-scrap-card",
  ".resource-scrap-card",
  ".workshop-scrap-card",
  ".scrapbook-orbit",
  ".course-study-scene",
  ".testimonial-slider",
  ".impact-social-flip",
  ".impact-reel-card"
].join(",");

export default function CursorAura() {
  const auraRef = useRef(null);
  const ringRef = useRef(null);
  const glowRef = useRef(null);
  const pathname = usePathname();

  useEffect(() => {
    const aura = auraRef.current;
    const ring = ringRef.current;
    const glow = glowRef.current;
    const finePointer = window.matchMedia("(pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (!aura || !ring || !glow || !finePointer.matches || reducedMotion.matches) {
      return undefined;
    }

    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let glowX = targetX;
    let glowY = targetY;
    let frame = 0;
    let currentTarget = null;

    const animate = () => {
      glowX += (targetX - glowX) * 0.09;
      glowY += (targetY - glowY) * 0.09;

      glow.style.transform = `translate3d(${glowX}px, ${glowY}px, 0)`;

      if (Math.abs(targetX - glowX) > 0.25 || Math.abs(targetY - glowY) > 0.25) {
        frame = window.requestAnimationFrame(animate);
      } else {
        glowX = targetX;
        glowY = targetY;
        glow.style.transform = `translate3d(${glowX}px, ${glowY}px, 0)`;
        frame = 0;
      }
    };

    const requestGlowFrame = () => {
      if (!frame) frame = window.requestAnimationFrame(animate);
    };

    const handlePointerMove = (event) => {
      targetX = event.clientX;
      targetY = event.clientY;
      ring.style.transform = `translate3d(${targetX}px, ${targetY}px, 0)`;
      requestGlowFrame();
      aura.classList.add("is-visible");

      const nextTarget = event.target.closest?.(INTERACTIVE_SELECTOR) || null;
      if (nextTarget !== currentTarget) {
        currentTarget?.classList.remove("cursor-is-over");
        currentTarget = nextTarget;
        currentTarget?.classList.add("cursor-is-over");
        aura.classList.toggle("is-interactive", Boolean(currentTarget));
      }
    };

    const handlePointerLeave = () => aura.classList.remove("is-visible");
    const handlePointerDown = () => aura.classList.add("is-pressed");
    const handlePointerUp = () => aura.classList.remove("is-pressed");

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    document.addEventListener("pointerleave", handlePointerLeave);
    window.addEventListener("pointerdown", handlePointerDown, { passive: true });
    window.addEventListener("pointerup", handlePointerUp, { passive: true });

    return () => {
      window.cancelAnimationFrame(frame);
      currentTarget?.classList.remove("cursor-is-over");
      window.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("pointerleave", handlePointerLeave);
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("pointerup", handlePointerUp);
    };
  }, [pathname]);

  return (
    <div className="cursor-aura" aria-hidden="true" ref={auraRef}>
      <span className="cursor-aura-glow" ref={glowRef} />
      <span className="cursor-aura-ring" ref={ringRef}>
        <i>VIEW</i>
      </span>
    </div>
  );
}
