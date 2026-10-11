"use client";

import { geoGraticule10, geoOrthographic, geoPath } from "d3-geo";
import { feature, mesh } from "topojson-client";
import { useEffect, useRef, useState } from "react";
import { chapters } from "./chapterData";

const HOME_VIEW = [96, -32]; // rotation that centers the continental US
const COLORS = {
  ocean: "#dfe5ff",
  oceanEdge: "#10163f",
  grid: "rgba(60, 76, 186, 0.12)",
  land: "#fffdf6",
  landEdge: "rgba(16, 22, 63, 0.55)",
  stateEdge: "rgba(16, 22, 63, 0.18)",
  highlight: "#ff8209",
  highlightEdge: "#10163f",
  pin: "#10163f",
  pinRing: "#ffb200"
};

// Draws an interactive globe: drag to spin, eases back to slow rotation.
// Map data loads only when the globe scrolls into view.
export default function ChapterGlobe() {
  const wrapRef = useRef(null);
  const canvasRef = useRef(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return undefined;

    let cancelled = false;
    let frame = 0;
    let geo = null;
    let rotation = [...HOME_VIEW];
    let dragging = null;
    let hovering = false;
    let visible = false;
    let lastTime = 0;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const highlighted = new Set(chapters.map((chapter) => chapter.state));
    const projection = geoOrthographic().clipAngle(90).precision(0.4);
    const context = canvas.getContext("2d");
    const path = geoPath(projection, context);
    const graticule = geoGraticule10();

    const size = () => {
      const width = wrap.clientWidth;
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * ratio;
      canvas.height = width * ratio;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${width}px`;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      projection.translate([width / 2, width / 2]).scale(width / 2 - 4);
    };

    const draw = () => {
      if (!geo) return;
      const width = canvas.clientWidth;
      projection.rotate(rotation);
      context.clearRect(0, 0, width, width);

      context.beginPath();
      path({ type: "Sphere" });
      context.fillStyle = COLORS.ocean;
      context.fill();

      context.beginPath();
      path(graticule);
      context.strokeStyle = COLORS.grid;
      context.lineWidth = 1;
      context.stroke();

      context.beginPath();
      path(geo.land);
      context.fillStyle = COLORS.land;
      context.fill();

      context.beginPath();
      geo.highlighted.forEach((state) => path(state));
      context.fillStyle = COLORS.highlight;
      context.fill();

      context.beginPath();
      path(geo.stateBorders);
      context.strokeStyle = COLORS.stateEdge;
      context.lineWidth = 0.6;
      context.stroke();

      context.beginPath();
      geo.highlighted.forEach((state) => path(state));
      context.strokeStyle = COLORS.highlightEdge;
      context.lineWidth = 1.2;
      context.stroke();

      context.beginPath();
      path(geo.land);
      context.strokeStyle = COLORS.landEdge;
      context.lineWidth = 0.8;
      context.stroke();

      // Pins on the visible side of the globe only.
      const center = [-rotation[0], -rotation[1]];
      chapters.forEach((chapter) => {
        const [lon, lat] = chapter.coords;
        const toRad = Math.PI / 180;
        const cosDistance =
          Math.sin(lat * toRad) * Math.sin(center[1] * toRad) +
          Math.cos(lat * toRad) * Math.cos(center[1] * toRad) * Math.cos((lon - center[0]) * toRad);
        if (cosDistance < 0.05) return;
        const [x, y] = projection(chapter.coords);
        context.beginPath();
        context.arc(x, y, 9, 0, Math.PI * 2);
        context.fillStyle = "rgba(255, 178, 0, 0.35)";
        context.fill();
        context.beginPath();
        context.arc(x, y, 4.5, 0, Math.PI * 2);
        context.fillStyle = COLORS.pin;
        context.fill();
        context.lineWidth = 2;
        context.strokeStyle = COLORS.pinRing;
        context.stroke();
      });

      context.beginPath();
      path({ type: "Sphere" });
      context.strokeStyle = COLORS.oceanEdge;
      context.lineWidth = 2;
      context.stroke();
    };

    const tick = (time) => {
      frame = 0;
      const elapsed = lastTime ? Math.min(time - lastTime, 64) : 16;
      lastTime = time;
      if (!dragging && !hovering && !reduceMotion) {
        rotation[0] += elapsed * 0.006;
        // Drift the tilt back toward the US-friendly default.
        rotation[1] += (HOME_VIEW[1] - rotation[1]) * 0.02;
      }
      draw();
      if (visible && !reduceMotion) frame = window.requestAnimationFrame(tick);
    };

    const start = () => {
      if (!frame && !reduceMotion) {
        lastTime = 0;
        frame = window.requestAnimationFrame(tick);
      }
    };

    const load = async () => {
      const [land, us] = await Promise.all([
        fetch("/data/land-110m.json").then((response) => response.json()),
        fetch("/data/us-states-10m.json").then((response) => response.json())
      ]);
      if (cancelled) return;
      const states = feature(us, us.objects.states).features;
      geo = {
        land: feature(land, land.objects.land),
        stateBorders: mesh(us, us.objects.states, (a, b) => a !== b),
        highlighted: states.filter((state) => highlighted.has(state.properties.name))
      };
      size();
      draw();
      setReady(true);
      if (visible) start();
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible && !geo) load();
        if (visible) start();
      },
      { rootMargin: "200px" }
    );
    observer.observe(wrap);

    const onDown = (event) => {
      dragging = { x: event.clientX, y: event.clientY, rotation: [...rotation] };
      canvas.setPointerCapture(event.pointerId);
    };
    const onMove = (event) => {
      if (!dragging) return;
      const sensitivity = 0.25;
      rotation = [
        dragging.rotation[0] + (event.clientX - dragging.x) * sensitivity,
        Math.max(-70, Math.min(70, dragging.rotation[1] - (event.clientY - dragging.y) * sensitivity))
      ];
      if (reduceMotion) draw();
    };
    const onUp = () => {
      dragging = null;
    };
    const onEnter = () => {
      hovering = true;
    };
    const onLeave = () => {
      hovering = false;
    };
    const onResize = () => {
      size();
      draw();
    };

    canvas.addEventListener("pointerdown", onDown);
    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerup", onUp);
    canvas.addEventListener("pointercancel", onUp);
    canvas.addEventListener("pointerenter", onEnter);
    canvas.addEventListener("pointerleave", onLeave);
    window.addEventListener("resize", onResize);

    return () => {
      cancelled = true;
      observer.disconnect();
      if (frame) window.cancelAnimationFrame(frame);
      canvas.removeEventListener("pointerdown", onDown);
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerup", onUp);
      canvas.removeEventListener("pointercancel", onUp);
      canvas.removeEventListener("pointerenter", onEnter);
      canvas.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <div className={`chapter-globe ${ready ? "is-ready" : ""}`} ref={wrapRef}>
      <canvas
        ref={canvasRef}
        role="img"
        aria-label={`Globe highlighting FinGoose chapter locations: ${chapters.map((chapter) => chapter.city).join(", ")}`}
      />
      <span className="chapter-globe-hint" aria-hidden="true">Drag to spin</span>
    </div>
  );
}
