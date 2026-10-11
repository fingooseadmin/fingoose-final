"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function MotionController() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sections = Array.from(
      document.querySelectorAll(".scrapbook-site > section")
    );
    const wordGroups = Array.from(document.querySelectorAll(".flow-words"));
    let frame = 0;

    // Scroll-linked motion is written straight onto the few elements that
    // move. Setting CSS variables on <html> or whole sections made the
    // browser restyle the entire page every frame, which caused scroll lag.
    const orbits = Array.from(document.querySelectorAll(".scrapbook-orbit"));
    const doodles = Array.from(document.querySelectorAll(".doodle"));
    const threads = Array.from(document.querySelectorAll(".header-thread"));

    const update = () => {
      const scrollY = window.scrollY;
      const heroShift = Math.min(scrollY * 0.055, 48);
      const doodleShift = Math.min(scrollY * -0.03, 0);
      const threadShift = scrollY % 96;
      orbits.forEach((orbit) => {
        orbit.style.transform = `translate3d(0, ${heroShift}px, 0) rotate(1.5deg)`;
      });
      doodles.forEach((doodle) => {
        doodle.style.translate = `0 ${doodleShift}px`;
      });
      threads.forEach((thread) => {
        thread.style.backgroundPositionX = `${threadShift}px`;
      });
      frame = 0;
    };

    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle("is-flow-active", entry.isIntersecting);
        });
      },
      { rootMargin: "12% 0px 12% 0px", threshold: 0 }
    );

    const wordObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-flowing");
            wordObserver.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.18 }
    );

    wordGroups.forEach((group) => wordObserver.observe(group));
    sections.forEach((section) => sectionObserver.observe(section));

    const requestUpdate = () => {
      if (
        motionPreference.matches ||
        document.visibilityState === "hidden" ||
        frame
      ) return;
      frame = window.requestAnimationFrame(update);
    };

    const syncPreference = () => {
      root.classList.toggle("reduced-motion", motionPreference.matches);
      root.classList.toggle("motion-ready", !motionPreference.matches);

      if (!motionPreference.matches) requestUpdate();
    };

    syncPreference();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    document.addEventListener("visibilitychange", requestUpdate);
    motionPreference.addEventListener("change", syncPreference);

    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      document.removeEventListener("visibilitychange", requestUpdate);
      motionPreference.removeEventListener("change", syncPreference);
      wordObserver.disconnect();
      sectionObserver.disconnect();
      if (frame) window.cancelAnimationFrame(frame);
      orbits.forEach((orbit) => orbit.style.removeProperty("transform"));
      doodles.forEach((doodle) => doodle.style.removeProperty("translate"));
      threads.forEach((thread) => thread.style.removeProperty("background-position-x"));
      root.classList.remove("motion-ready", "reduced-motion");
    };
  }, [pathname]);

  return null;
}
