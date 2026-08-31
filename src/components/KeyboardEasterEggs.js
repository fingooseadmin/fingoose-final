"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const triggerMap = [
  { phrase: "Grace Zhou", name: "grace" },
  { phrase: "Thanos", name: "thanos" },
  { phrase: "VPan", name: "victor" },
  { phrase: "Nutrinity", name: "nutrinity" },
  { phrase: "Moonknight", name: "moonknight" },
  { phrase: "Iron Man", name: "ironman" },
  { phrase: "Doctor Strange", name: "strange" },
  { phrase: "Wakanda Forever", name: "wakanda" }
];

const stones = ["space", "mind", "reality", "power", "time", "soul"];
const moonWraps = Array.from({ length: 8 }, (_, index) => index);
const portalSparks = Array.from({ length: 18 }, (_, index) => index);
const vibraniumNodes = Array.from({ length: 12 }, (_, index) => index);

const eggDurations = {
  nutrinity: 6200,
  ironman: 6000,
  moonknight: 6800,
  strange: 6800,
  thanos: 7200,
  wakanda: 6400
};

export default function KeyboardEasterEggs() {
  const bufferRef = useRef("");
  const timerRef = useRef(null);
  const [active, setActive] = useState(null);
  const [runId, setRunId] = useState(0);

  useEffect(() => {
    const closeEgg = () => {
      window.clearTimeout(timerRef.current);
      setActive(null);
    };

    const showEgg = (name) => {
      window.clearTimeout(timerRef.current);
      setRunId(Date.now());
      setActive(name);
      timerRef.current = window.setTimeout(
        closeEgg,
        eggDurations[name] ?? 5200
      );
    };

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        closeEgg();
        return;
      }

      const target = event.target;
      const editing =
        target instanceof HTMLElement &&
        (target.matches("input, textarea, select") || target.isContentEditable);

      if (
        editing ||
        event.ctrlKey ||
        event.metaKey ||
        event.altKey ||
        event.key.length !== 1
      ) {
        return;
      }

      bufferRef.current = (bufferRef.current + event.key).slice(-24);
      const match = triggerMap.find(({ phrase }) =>
        bufferRef.current.endsWith(phrase)
      );

      if (match) {
        bufferRef.current = "";
        showEgg(match.name);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.clearTimeout(timerRef.current);
    };
  }, []);

  if (!active) return null;

  const close = () => {
    window.clearTimeout(timerRef.current);
    setActive(null);
  };

  return (
    <div
      className={"keyboard-easter-egg easter-" + active}
      aria-live="polite"
      key={runId}
    >
      {active === "victor" ? (
        <section className="victor-egg-card" role="status">
          <button type="button" onClick={close} aria-label="Close Easter egg">
            Close
          </button>
          <span>Builder mark unlocked</span>
          <strong>This site was made by Victor Pan.</strong>
          <i aria-hidden="true">VP</i>
        </section>
      ) : null}

      {active === "nutrinity" ? (
        <section className="nutrinity-egg-stage" role="status">
          <button type="button" onClick={close} aria-label="Close Easter egg">
            Close
          </button>
          <div className="nutrinity-egg-orbit" aria-hidden="true" />
          <div className="nutrinity-egg-copy">
            <span>Creative inspiration unlocked</span>
            <strong>Shoutout to Nutrinity.app.</strong>
            <p>
              A crisp example of turning complex ideas into a clear, modern,
              and beautifully interactive experience. Thanks for raising the bar.
            </p>
            <a href="https://nutrinity.app/" target="_blank" rel="noreferrer">
              Visit Nutrinity.app ↗
            </a>
          </div>
        </section>
      ) : null}

      {active === "grace" ? (
        <section className="grace-egg-stage" role="status">
          <button type="button" onClick={close} aria-label="Close Easter egg">
            Close
          </button>
          <div className="grace-speech-bubble">
            My name is Grace and I am a poopy head
          </div>
          <Image
            alt="A curious FinGoose duck"
            src="/assets/goose-curious.png"
            width={2048}
            height={2048}
            sizes="280px"
            priority
          />
        </section>
      ) : null}

      {active === "thanos" ? (
        <section className="infinity-egg-stage" role="status">
          <button type="button" onClick={close} aria-label="Close Easter egg">
            Close
          </button>
          <div className="infinity-flare" aria-hidden="true" />
          <div className="infinity-orbit" aria-hidden="true">
            {stones.map((stone, index) => (
              <span
                className={"infinity-stone stone-" + stone}
                style={{ "--stone-index": index }}
                key={stone}
              />
            ))}
          </div>
          <div className="infinity-copy">
            <span>Six stones aligned</span>
            <strong>The balance has shifted.</strong>
            <p>Infinity sequence unlocked.</p>
          </div>
          <div className="snap-dust" aria-hidden="true">
            {Array.from({ length: 24 }, (_, index) => (
              <i style={{ "--dust-index": index }} key={index} />
            ))}
          </div>
        </section>
      ) : null}

      {active === "moonknight" ? (
        <section className="moonknight-egg-stage" role="status">
          <button type="button" onClick={close} aria-label="Close Easter egg">
            Close
          </button>
          <div className="moonknight-sky" aria-hidden="true">
            <span className="moonknight-moon" />
            <span className="moonknight-horizon" />
          </div>
          <div className="moonknight-figure" aria-hidden="true">
            <span className="moonknight-cape" />
            <span className="moonknight-body">
              <i className="moonknight-hood" />
              <i className="moonknight-mask"><b /><b /></i>
              <i className="moonknight-chest"><b /></i>
              <i className="moonknight-arm moonknight-arm-left" />
              <i className="moonknight-arm moonknight-arm-right" />
            </span>
            {moonWraps.map((wrap) => (
              <i
                className="moonknight-wrap"
                style={{ "--wrap-index": wrap }}
                key={wrap}
              />
            ))}
          </div>
          <div className="moonknight-copy">
            <span>Crescent protocol unlocked</span>
            <strong>The suit answers the call.</strong>
          </div>
        </section>
      ) : null}

      {active === "ironman" ? (
        <section className="ironman-egg-stage" role="status">
          <button type="button" onClick={close} aria-label="Close Easter egg">
            Close
          </button>
          <div className="ironman-sky" aria-hidden="true">
            <span className="ironman-cloud cloud-one" />
            <span className="ironman-cloud cloud-two" />
            <span className="ironman-cloud cloud-three" />
            <div className="ironman-flight-path" aria-hidden="true">
              <i className="ironman-trail trail-left" />
              <i className="ironman-trail trail-right" />
              <div className="ironman-figure">
                <span className="ironman-head"><i /><i /></span>
                <span className="ironman-torso"><i /></span>
                <span className="ironman-arm ironman-arm-left" />
                <span className="ironman-arm ironman-arm-right" />
                <span className="ironman-leg ironman-leg-left" />
                <span className="ironman-leg ironman-leg-right" />
              </div>
            </div>
          </div>
          <div className="ironman-copy">
            <span>Flight system online</span>
            <strong>Armor up. Thrusters on.</strong>
          </div>

        </section>
      ) : null}

      {active === "strange" ? (
        <section className="strange-egg-stage" role="status">
          <button type="button" onClick={close} aria-label="Close Easter egg">
            Close
          </button>
          <div className="strange-portal" aria-hidden="true">
            {portalSparks.map((spark) => (
              <i style={{ "--spark-index": spark }} key={spark} />
            ))}
            <span />
          </div>
          <div className="strange-copy">
            <span>Sanctum shortcut unlocked</span>
            <strong>A doorway appears where none existed.</strong>
          </div>

        </section>
      ) : null}

      {active === "wakanda" ? (
        <section className="wakanda-egg-stage" role="status">
          <button type="button" onClick={close} aria-label="Close Easter egg">
            Close
          </button>
          <div className="vibranium-field" aria-hidden="true">
            {vibraniumNodes.map((node) => (
              <i style={{ "--node-index": node }} key={node} />
            ))}
            <span className="panther-mark"><b /><b /><b /></span>
          </div>
          <div className="wakanda-copy">
            <span>Vibranium signal detected</span>
            <strong>Wakanda Forever.</strong>
          </div>

        </section>
      ) : null}
    </div>
  );
}
