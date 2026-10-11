"use client";

import { geoGraticule10, geoOrthographic, geoPath } from "d3-geo";
import { feature, mesh } from "topojson-client";
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import { chapters } from "./chapterData";

// Opening view: zoomed in on the US East Coast and Toronto.
const HOME_VIEW = [76.5, -41.8];
const HOME_ZOOM = 3.6;
const MIN_ZOOM = 1;
const MAX_ZOOM = 8;
const COLORS = {
  ocean: "#dfe5ff",
  oceanEdge: "#10163f",
  grid: "rgba(60, 76, 186, 0.12)",
  land: "#fffdf6",
  landEdge: "rgba(16, 22, 63, 0.55)",
  border: "rgba(16, 22, 63, 0.22)",
  country: "#ffd8b0",
  state: "#ff8209",
  stateEdge: "#10163f",
  pin: "#10163f",
  pinRing: "#ffb200",
  label: "#10163f"
};

const clamp = (value, min, max) => Math.max(min, Math.min(max, value));
const ease = (t) => 1 - Math.pow(1 - t, 3);

// Interactive globe: drag to spin, scroll or pinch to zoom, and fly to a
// chapter via the ref's flyTo(coords). Map data loads when it scrolls near.
const ChapterGlobe = forwardRef(function ChapterGlobe(_props, ref) {
  const wrapRef = useRef(null);
  const canvasRef = useRef(null);
  const apiRef = useRef({});
  const [ready, setReady] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(HOME_ZOOM);

  useImperativeHandle(ref, () => ({
    flyTo: (coords) => apiRef.current.flyTo?.(coords),
    zoomBy: (factor) => apiRef.current.zoomBy?.(factor),
    reset: () => apiRef.current.reset?.()
  }));

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return undefined;

    let cancelled = false;
    let frame = 0;
    let geo = null;
    let rotation = [...HOME_VIEW];
    let zoom = HOME_ZOOM;
    let baseScale = 1;
    let visible = false;
    let hovering = false;
    let lastTime = 0;
    let idleUntil = 0;
    let flight = null;
    const pointers = new Map();
    let gesture = null;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const states = new Set(chapters.map((chapter) => chapter.state).filter(Boolean));
    const countries = new Set(chapters.filter((chapter) => !chapter.state).map((chapter) => chapter.country).filter(Boolean));
    const projection = geoOrthographic().clipAngle(90).precision(0.3);
    const context = canvas.getContext("2d");
    const path = geoPath(projection, context);
    const graticule = geoGraticule10();

    const pauseAutoSpin = (ms = 5000) => {
      idleUntil = performance.now() + ms;
    };

    const setZoom = (value) => {
      zoom = clamp(value, MIN_ZOOM, MAX_ZOOM);
      setZoomLevel(zoom);
    };

    const size = () => {
      const width = wrap.clientWidth;
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * ratio;
      canvas.height = width * ratio;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${width}px`;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      baseScale = width / 2 - 4;
      projection.translate([width / 2, width / 2]);
    };

    const isVisible = ([lon, lat]) => {
      const toRad = Math.PI / 180;
      const centerLon = -rotation[0];
      const centerLat = -rotation[1];
      return (
        Math.sin(lat * toRad) * Math.sin(centerLat * toRad) +
          Math.cos(lat * toRad) * Math.cos(centerLat * toRad) * Math.cos((lon - centerLon) * toRad) >
        0.05
      );
    };

    const draw = () => {
      if (!geo) return;
      const width = canvas.clientWidth;
      projection.rotate(rotation).scale(baseScale * zoom);
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
      geo.countries.forEach((country) => path(country));
      context.fillStyle = COLORS.country;
      context.fill();

      context.beginPath();
      geo.states.forEach((state) => path(state));
      context.fillStyle = COLORS.state;
      context.fill();

      context.beginPath();
      path(geo.countryBorders);
      path(geo.stateBorders);
      context.strokeStyle = COLORS.border;
      context.lineWidth = 0.6;
      context.stroke();

      context.beginPath();
      geo.states.forEach((state) => path(state));
      context.strokeStyle = COLORS.stateEdge;
      context.lineWidth = 1.1;
      context.stroke();

      context.beginPath();
      path(geo.coastline);
      context.strokeStyle = COLORS.landEdge;
      context.lineWidth = 0.8;
      context.stroke();

      const showLabels = zoom >= 2.2;
      context.font = "700 12px Poppins, sans-serif";
      context.textBaseline = "middle";
      const placed = [];
      const overlaps = (box) =>
        placed.some((other) => box.x < other.x + other.w && box.x + box.w > other.x && box.y < other.y + other.h && box.y + box.h > other.y);
      // Reserve every pin first so labels never cover a pin.
      chapters.forEach((chapter) => {
        if (!isVisible(chapter.coords)) return;
        const [px, py] = projection(chapter.coords);
        placed.push({ x: px - 7, y: py - 7, w: 14, h: 14 });
      });
      chapters.forEach((chapter) => {
        if (!isVisible(chapter.coords)) return;
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
        if (showLabels) {
          const text = chapter.city.split(",")[0];
          const w = context.measureText(text).width + 12;
          const options = [
            { x: x + 10, y: y - 10 },
            { x: x - 10 - w, y: y - 10 },
            { x: x - w / 2, y: y + 10 },
            { x: x - w / 2, y: y - 30 }
          ];
          const spot = options.map((o) => ({ ...o, w, h: 20 })).find((box) => !overlaps(box));
          if (!spot) return;
          placed.push(spot);
          context.fillStyle = "rgba(255, 253, 246, 0.94)";
          context.beginPath();
          context.roundRect(spot.x, spot.y, spot.w, spot.h, 6);
          context.fill();
          context.fillStyle = COLORS.label;
          context.fillText(text, spot.x + 6, spot.y + 10);
        }
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
      let animating = false;

      if (flight) {
        const t = clamp((time - flight.start) / flight.duration, 0, 1);
        const k = ease(t);
        rotation = [
          flight.from[0] + (flight.to[0] - flight.from[0]) * k,
          flight.from[1] + (flight.to[1] - flight.from[1]) * k
        ];
        setZoom(flight.fromZoom + (flight.toZoom - flight.fromZoom) * k);
        if (t >= 1) flight = null;
        animating = true;
      } else if (!reduceMotion && !gesture && !hovering && time > idleUntil && zoom < 1.05) {
        rotation[0] += elapsed * 0.006;
        rotation[1] += (HOME_VIEW[1] - rotation[1]) * 0.02;
        animating = true;
      }

      draw();
      if (visible && animating) frame = window.requestAnimationFrame(tick);
    };

    const requestFrame = () => {
      if (!frame && visible) {
        lastTime = 0;
        frame = window.requestAnimationFrame(tick);
      }
    };

    const shortestLon = (from, to) => {
      let delta = ((to - from + 540) % 360) - 180;
      return from + delta;
    };

    apiRef.current = {
      flyTo: ([lon, lat]) => {
        const target = [shortestLon(rotation[0], -lon), clamp(-lat, -70, 70)];
        const targetZoom = Math.max(zoom, 3);
        pauseAutoSpin(60000);
        if (reduceMotion) {
          rotation = target;
          setZoom(targetZoom);
          draw();
          return;
        }
        flight = {
          start: performance.now(),
          duration: 1100,
          from: [...rotation],
          to: target,
          fromZoom: zoom,
          toZoom: targetZoom
        };
        requestFrame();
      },
      zoomBy: (factor) => {
        pauseAutoSpin();
        setZoom(zoom * factor);
        draw();
        requestFrame();
      },
      reset: () => {
        flight = null;
        idleUntil = 0;
        rotation = [...HOME_VIEW];
        setZoom(HOME_ZOOM);
        draw();
        requestFrame();
      }
    };

    const load = async () => {
      const [world, us] = await Promise.all([
        fetch("/data/countries-110m.json").then((response) => response.json()),
        fetch("/data/us-states-10m.json").then((response) => response.json())
      ]);
      if (cancelled) return;
      const allCountries = feature(world, world.objects.countries).features;
      geo = {
        land: { type: "FeatureCollection", features: allCountries },
        coastline: mesh(world, world.objects.countries, (a, b) => a === b),
        countryBorders: mesh(world, world.objects.countries, (a, b) => a !== b),
        stateBorders: mesh(us, us.objects.states, (a, b) => a !== b),
        countries: allCountries.filter((country) => countries.has(country.properties.name)),
        states: feature(us, us.objects.states).features.filter((state) => states.has(state.properties.name))
      };
      size();
      draw();
      setReady(true);
      requestFrame();
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible && !geo) load();
        if (visible) requestFrame();
      },
      { rootMargin: "200px" }
    );
    observer.observe(wrap);

    const onDown = (event) => {
      canvas.setPointerCapture(event.pointerId);
      pointers.set(event.pointerId, { x: event.clientX, y: event.clientY });
      flight = null;
      pauseAutoSpin();
      if (pointers.size === 1) {
        gesture = { type: "drag", x: event.clientX, y: event.clientY, rotation: [...rotation] };
      } else if (pointers.size === 2) {
        const [a, b] = [...pointers.values()];
        gesture = { type: "pinch", distance: Math.hypot(a.x - b.x, a.y - b.y), zoom };
      }
    };

    const onMove = (event) => {
      if (!pointers.has(event.pointerId)) return;
      pointers.set(event.pointerId, { x: event.clientX, y: event.clientY });
      if (gesture?.type === "drag") {
        const sensitivity = 0.25 / zoom;
        rotation = [
          gesture.rotation[0] + (event.clientX - gesture.x) * sensitivity,
          clamp(gesture.rotation[1] - (event.clientY - gesture.y) * sensitivity, -70, 70)
        ];
        draw();
      } else if (gesture?.type === "pinch" && pointers.size >= 2) {
        const [a, b] = [...pointers.values()];
        const distance = Math.hypot(a.x - b.x, a.y - b.y);
        setZoom(gesture.zoom * (distance / gesture.distance));
        draw();
      }
    };

    const onUp = (event) => {
      pointers.delete(event.pointerId);
      if (pointers.size === 1) {
        const [remaining] = [...pointers.values()];
        gesture = { type: "drag", x: remaining.x, y: remaining.y, rotation: [...rotation] };
      } else if (pointers.size === 0) {
        gesture = null;
        pauseAutoSpin(3000);
        requestFrame();
      }
    };

    const onWheel = (event) => {
      event.preventDefault();
      flight = null;
      pauseAutoSpin();
      setZoom(zoom * Math.exp(-event.deltaY * 0.0018));
      draw();
    };

    const onEnter = () => {
      hovering = true;
    };
    const onLeave = () => {
      hovering = false;
      requestFrame();
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
    canvas.addEventListener("wheel", onWheel, { passive: false });
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
      canvas.removeEventListener("wheel", onWheel);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <div className={`chapter-globe ${ready ? "is-ready" : ""}`} ref={wrapRef} data-lenis-prevent>
      <canvas
        ref={canvasRef}
        role="img"
        aria-label={`Globe of FinGoose chapters: ${chapters.map((chapter) => chapter.city).join("; ")}`}
      />
      <div className="chapter-globe-controls" data-cursor-plain>
        <button type="button" onClick={() => apiRef.current.zoomBy?.(1.5)} disabled={zoomLevel >= MAX_ZOOM - 0.01} aria-label="Zoom in">+</button>
        <button type="button" onClick={() => apiRef.current.zoomBy?.(1 / 1.5)} disabled={zoomLevel <= MIN_ZOOM + 0.01} aria-label="Zoom out">−</button>
        <button type="button" onClick={() => apiRef.current.reset?.()} aria-label="Reset view">⟲</button>
      </div>
      <span className="chapter-globe-hint" aria-hidden="true"><span className="hint-mouse">Drag to spin · scroll to zoom</span><span className="hint-touch">Drag to spin · pinch to zoom</span></span>
    </div>
  );
});

export default ChapterGlobe;
