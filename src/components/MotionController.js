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
    const activeSections = new Set();
    let frame = 0;

    const update = () => {
      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight;
      root.style.setProperty("--hero-scroll", `${Math.min(scrollY * 0.055, 48)}px`);
      root.style.setProperty("--doodle-scroll", `${Math.min(scrollY * -0.03, 0)}px`);
      root.style.setProperty("--thread-shift", `${scrollY % 96}px`);
      const ambientX = Math.sin(scrollY * 0.0028) * 18;
      root.style.setProperty("--ambient-x", `${ambientX}px`);
      root.style.setProperty("--ambient-x-reverse", `${ambientX * -0.65}px`);

      const measurements = Array.from(activeSections, (section) => {
        const bounds = section.getBoundingClientRect();
        const sectionCenter = bounds.top + bounds.height / 2;
        const distance = sectionCenter - viewportHeight / 2;
        const flow = Math.max(
          -24,
          Math.min(24, (distance / (viewportHeight + bounds.height)) * -48)
        );
        return { section, flow };
      });

      measurements.forEach(({ section, flow }) => {
        section.style.setProperty("--section-flow", `${flow}px`);
        section.style.setProperty("--section-flow-reverse", `${flow * -0.6}px`);
        section.style.setProperty("--content-flow", `${flow * 0.18}px`);
        section.style.setProperty(
          "--content-scale",
          `${1 - Math.min(Math.abs(flow) / 5200, 0.006)}`
        );
      });
      frame = 0;
    };

    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle("is-flow-active", entry.isIntersecting);
          if (entry.isIntersecting) activeSections.add(entry.target);
          else activeSections.delete(entry.target);
        });
        requestUpdate();
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
      [
        "--hero-scroll",
        "--doodle-scroll",
        "--thread-shift",
        "--ambient-x",
        "--ambient-x-reverse"
      ].forEach((property) => root.style.removeProperty(property));
      root.classList.remove("motion-ready", "reduced-motion");
    };
  }, [pathname]);

  return null;
}
