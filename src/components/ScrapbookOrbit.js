"use client";

import Image from "next/image";
import { useRef } from "react";

export default function ScrapbookOrbit() {
  const stageRef = useRef(null);

  const handlePointerMove = (event) => {
    const stage = stageRef.current;
    if (!stage) return;
    const bounds = stage.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    stage.style.setProperty("--orbit-x", `${x * 12}deg`);
    stage.style.setProperty("--orbit-y", `${y * -10}deg`);
    stage.style.setProperty("--shift-x", `${x * 18}px`);
    stage.style.setProperty("--shift-y", `${y * 18}px`);
  };

  const reset = () => {
    const stage = stageRef.current;
    if (!stage) return;
    stage.style.setProperty("--orbit-x", "0deg");
    stage.style.setProperty("--orbit-y", "0deg");
    stage.style.setProperty("--shift-x", "0px");
    stage.style.setProperty("--shift-y", "0px");
  };

  return (
    <div
      className="scrapbook-orbit"
      onPointerMove={handlePointerMove}
      onPointerLeave={reset}
      ref={stageRef}
      role="img"
      aria-label="Interactive 3D FinGoose money-learning scrapbook"
    >
      <div className="orbit-grid" aria-hidden="true" />
      <div className="orbit-ring orbit-ring-one" aria-hidden="true" />
      <div className="orbit-ring orbit-ring-two" aria-hidden="true" />

      <div className="orbit-paper orbit-paper-back">
        <span>FIELD NOTE 01</span>
        <strong>Real life changes the budget.</strong>
      </div>

      <div className="orbit-paper orbit-paper-side">
        <span>SKILL UNLOCKED</span>
        <strong>Decision confidence +1</strong>
      </div>

      <div className="orbit-chip orbit-chip-one">SAVE</div>
      <div className="orbit-chip orbit-chip-two">PLAN</div>
      <div className="orbit-chip orbit-chip-three">THINK</div>

      <div className="orbit-goose">
        <div className="orbit-goose-float">
          <div className="orbit-glow" aria-hidden="true" />
          <Image
            alt=""
            src="/assets/finn-walking.png"
            width={2048}
            height={2048}
            sizes="(max-width: 980px) 72vw, 520px"
            priority
          />
        </div>
      </div>

      <div className="orbit-caption">
        <span className="live-dot" />
        See Finn
      </div>
    </div>
  );
}
