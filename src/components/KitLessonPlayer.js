"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import Icon from "./Icon";
import { formatPrice, lessons } from "./autismKitLessons";

const COINS = {
  penny: { label: "1¢", name: "penny", size: 58, tone: "copper" },
  nickel: { label: "5¢", name: "nickel", size: 66, tone: "silver" },
  dime: { label: "10¢", name: "dime", size: 54, tone: "silver" },
  quarter: { label: "25¢", name: "quarter", size: 76, tone: "silver" }
};

function Money({ kind }) {
  if (kind === "$1" || kind === "$5") {
    return (
      <span className={`kit-bill ${kind === "$5" ? "is-five" : ""}`} aria-label={`${kind} bill`}>
        <span className="kit-bill-corner">{kind.slice(1)}</span>
        <strong>{kind}</strong>
        <span className="kit-bill-corner is-end">{kind.slice(1)}</span>
      </span>
    );
  }
  const coin = COINS[kind];
  if (!coin) return null;
  return (
    <span className="kit-coin-wrap">
      <span className={`kit-coin is-${coin.tone}`} style={{ "--size": `${coin.size}px` }} aria-label={coin.name}>
        {coin.label}
      </span>
      <small>{coin.name}</small>
    </span>
  );
}

function Tray({ money, label }) {
  if (!money?.length) return null;
  return (
    <div className="kit-tray">
      {label ? <span className="kit-tray-label">{label}</span> : null}
      <div className="kit-tray-money">
        {money.map((kind, index) => (
          <Money kind={kind} key={`${kind}-${index}`} />
        ))}
      </div>
    </div>
  );
}

// Teacher-paced lesson player. The class watches; the teacher drives it with
// big buttons, the arrow keys, or a presentation clicker.
export default function KitLessonPlayer() {
  const [lessonIndex, setLessonIndex] = useState(0);
  const [step, setStep] = useState(0);
  const [showTip, setShowTip] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [full, setFull] = useState(false);
  const playerRef = useRef(null);

  const lesson = lessons[lessonIndex];
  const current = lesson.steps[step];
  const last = step === lesson.steps.length - 1;

  const stopSpeaking = () => {
    if (typeof window !== "undefined" && window.speechSynthesis) window.speechSynthesis.cancel();
    setSpeaking(false);
  };

  const go = useCallback(
    (dir) => {
      stopSpeaking();
      setRevealed(false);
      setShowTip(false);
      setStep((s) => Math.max(0, Math.min(lesson.steps.length - 1, s + dir)));
    },
    [lesson.steps.length]
  );

  const pickLesson = (index) => {
    stopSpeaking();
    setLessonIndex(index);
    setStep(0);
    setRevealed(false);
    setShowTip(false);
    playerRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const readAloud = () => {
    if (!window.speechSynthesis) return;
    if (speaking) return stopSpeaking();
    const parts = [current.say];
    if (current.doIt) parts.push(`Your turn. ${current.doIt}`);
    const utterance = new SpeechSynthesisUtterance(parts.join(" "));
    utterance.rate = 0.85;
    utterance.onend = () => setSpeaking(false);
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
    setSpeaking(true);
  };

  const toggleFull = async () => {
    const el = playerRef.current;
    if (!el) return;
    if (document.fullscreenElement) {
      await document.exitFullscreen();
    } else if (el.requestFullscreen) {
      await el.requestFullscreen().catch(() => setFull((f) => !f));
    } else {
      setFull((f) => !f);
    }
  };

  useEffect(() => {
    const onChange = () => setFull(Boolean(document.fullscreenElement));
    document.addEventListener("fullscreenchange", onChange);
    return () => document.removeEventListener("fullscreenchange", onChange);
  }, []);

  useEffect(() => () => stopSpeaking(), []);

  const onKeyDown = (event) => {
    if (["ArrowRight", "PageDown", " "].includes(event.key)) {
      event.preventDefault();
      go(1);
    }
    if (["ArrowLeft", "PageUp"].includes(event.key)) {
      event.preventDefault();
      go(-1);
    }
    if (event.key.toLowerCase() === "a" && current.reveal) setRevealed((r) => !r);
    if (event.key === "Escape" && full && !document.fullscreenElement) setFull(false);
  };

  const trayMoney = revealed && current.reveal?.tray ? current.reveal.tray : current.tray;
  const mathLine = revealed && current.reveal?.math ? current.reveal.math : current.math;

  return (
    <div className="kit-lessons">
      <div className="kit-lesson-picker" role="list" aria-label="Choose a lesson">
        {lessons.map((item, index) => (
          <button
            key={item.id}
            type="button"
            role="listitem"
            className={`kit-lesson-card tone-${item.color} ${index === lessonIndex ? "is-active" : ""}`}
            onClick={() => pickLesson(index)}
            aria-current={index === lessonIndex ? "true" : undefined}
            data-cursor-plain
          >
            <span className="kit-lesson-num">Lesson {item.number}</span>
            <strong>{item.title}</strong>
            <span className="kit-lesson-place">{item.place}</span>
            <span className="kit-lesson-goal">{item.goal}</span>
          </button>
        ))}
      </div>

      <section
        ref={playerRef}
        className={`kit-player tone-${lesson.color} ${full ? "is-full" : ""}`}
        tabIndex={0}
        onKeyDown={onKeyDown}
        aria-label={`Lesson ${lesson.number}: ${lesson.title}`}
        data-lenis-prevent
      >
        <header className="kit-player-top">
          <div>
            <span className="kit-player-kicker">Lesson {lesson.number} · {lesson.place}</span>
            <h3>{lesson.title}</h3>
          </div>
          <div className="kit-player-kit">
            <span>From your kit:</span>
            {lesson.kit.map((item) => (
              <em key={item}>{item}</em>
            ))}
          </div>
        </header>

        <ol className="kit-steps" aria-label="Steps">
          {lesson.steps.map((s, index) => (
            <li key={index} className={index === step ? "is-current" : index < step ? "is-done" : ""}>
              <button type="button" onClick={() => { stopSpeaking(); setRevealed(false); setShowTip(false); setStep(index); }} aria-label={`Go to step ${index + 1}`} data-cursor-plain>
                {index + 1}
              </button>
            </li>
          ))}
        </ol>

        <div className="kit-stage" key={`${lesson.id}-${step}`}>
          <div className="kit-cashier">
            <div className="kit-bubble">
              <p>{current.say}</p>
            </div>
            <Image src="/assets/finn-talking.webp" alt="FinGoose the cashier" width={1200} height={1200} sizes="220px" />
            <span className="kit-name-tag">FinGoose · Cashier</span>
          </div>

          <div className="kit-counter">
            {current.items?.length ? (
              <div className="kit-items">
                {current.items.map((item) => (
                  <div className={`kit-item ${item.bought ? "is-bought" : ""}`} key={item.name}>
                    <span className="kit-item-emoji" aria-hidden="true">{item.emoji}</span>
                    <span className="kit-item-name">{item.name}</span>
                    <span className="kit-price-tag">{formatPrice(item.price)}</span>
                    {item.bought ? <span className="kit-bought">✓ Paid</span> : null}
                  </div>
                ))}
              </div>
            ) : null}

            <Tray money={trayMoney} label={revealed && current.reveal?.tray ? "Answer" : current.items ? "On the counter" : null} />

            {mathLine ? <p className="kit-math">{mathLine}</p> : null}
            {revealed && current.reveal?.text ? <p className="kit-answer">{current.reveal.text}</p> : null}

            {current.doIt ? (
              <div className="kit-your-turn">
                <span className="kit-hand" aria-hidden="true">✋</span>
                <div>
                  <strong>Your turn</strong>
                  <p>{current.doIt}</p>
                </div>
              </div>
            ) : null}
          </div>
        </div>

        {showTip && current.tip ? (
          <div className="kit-tip" role="note">
            <strong>Teacher tip</strong>
            <p>{current.tip}</p>
          </div>
        ) : null}

        <footer className="kit-controls">
          <button type="button" className="kit-btn is-back" onClick={() => go(-1)} disabled={step === 0} data-cursor-plain>
            <Icon name="arrow" size={20} /> Back
          </button>

          <div className="kit-tools">
            <button type="button" className={`kit-tool ${speaking ? "is-on" : ""}`} onClick={readAloud} data-cursor-plain>
              {speaking ? "Stop reading" : "Read aloud"}
            </button>
            {current.reveal ? (
              <button type="button" className={`kit-tool ${revealed ? "is-on" : ""}`} onClick={() => setRevealed((r) => !r)} data-cursor-plain>
                {revealed ? "Hide answer" : "Show answer"}
              </button>
            ) : null}
            {current.tip ? (
              <button type="button" className={`kit-tool ${showTip ? "is-on" : ""}`} onClick={() => setShowTip((t) => !t)} data-cursor-plain>
                Teacher tip
              </button>
            ) : null}
            <button type="button" className="kit-tool" onClick={toggleFull} data-cursor-plain>
              {full ? "Exit full screen" : "Full screen"}
            </button>
          </div>

          {last ? (
            lessonIndex < lessons.length - 1 ? (
              <button type="button" className="kit-btn is-next" onClick={() => pickLesson(lessonIndex + 1)} data-cursor-plain>
                Next lesson <Icon name="arrow" size={20} />
              </button>
            ) : (
              <button type="button" className="kit-btn is-next" onClick={() => pickLesson(0)} data-cursor-plain>
                Start over <Icon name="arrow" size={20} />
              </button>
            )
          ) : (
            <button type="button" className="kit-btn is-next" onClick={() => go(1)} data-cursor-plain>
              Next <Icon name="arrow" size={20} />
            </button>
          )}
        </footer>
        <p className="kit-step-count">
          Step {step + 1} of {lesson.steps.length} · use ← → or a clicker to move, A to show the answer
        </p>
      </section>
    </div>
  );
}
