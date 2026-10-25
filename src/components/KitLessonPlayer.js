"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import Icon from "./Icon";
import KitScene from "./KitScene";
import { lessons } from "./autismKitLessons";

// Teacher-paced lesson player. The class watches; the teacher drives it with
// big buttons, the arrow keys, or a presentation clicker.
export default function KitLessonPlayer({ app = false }) {
  const [lessonIndex, setLessonIndex] = useState(0);
  const [step, setStep] = useState(0);
  const [showTip, setShowTip] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [full, setFull] = useState(false);
  const playerRef = useRef(null);
  const videoRef = useRef(null);
  const [videoDone, setVideoDone] = useState(true);
  const [videoPaused, setVideoPaused] = useState(true);
  const [needsTap, setNeedsTap] = useState(false);

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
    if (app) {
      const url = new URL(window.location.href);
      url.searchParams.set("lesson", lessons[index].id);
      window.history.replaceState(null, "", url);
      playerRef.current?.focus({ preventScroll: true });
    } else {
      playerRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // App mode: open the lesson named in ?lesson=, lock page scroll, focus for the clicker
  useEffect(() => {
    if (!app) return undefined;
    const id = new URLSearchParams(window.location.search).get("lesson");
    const found = lessons.findIndex((l) => l.id === id);
    if (found > 0) setLessonIndex(found);
    document.documentElement.classList.add("kit-app-open");
    playerRef.current?.focus({ preventScroll: true });
    return () => document.documentElement.classList.remove("kit-app-open");
  }, [app]);

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

  // Real footage: play the step's clip once, then hold on the last frame.
  const playClip = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    setNeedsTap(false);
    setVideoDone(false);
    v.currentTime = 0;
    const attempt = v.play();
    if (attempt?.catch) attempt.catch(() => setNeedsTap(true));
  }, []);

  useEffect(() => {
    setVideoDone(!current.video);
    setNeedsTap(false);
    if (current.video) playClip();
  }, [current, playClip]);

  const toggleClip = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.ended) return playClip();
    if (v.paused) v.play().catch(() => setNeedsTap(true));
    else v.pause();
  };

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
    if (event.key.toLowerCase() === "r" && current.video) playClip();
    if (event.key === "Escape" && full && !document.fullscreenElement) setFull(false);
  };


  return (
    <div className={app ? "kit-app" : "kit-lessons"}>
      {app ? (
        <nav className="kit-app-bar" aria-label="Lessons">
          <Link className="kit-app-exit" href="/resources/autism-kit/" data-cursor-plain>
            <Icon name="arrow" size={18} /> Kit info
          </Link>
          <div className="kit-app-tabs" role="tablist">
            {lessons.map((item, index) => (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={index === lessonIndex}
                className={`kit-app-tab tone-${item.color} ${index === lessonIndex ? "is-active" : ""}`}
                onClick={() => pickLesson(index)}
                data-cursor-plain
              >
                <b>{item.number}</b>
                <span>{item.title}</span>
              </button>
            ))}
          </div>
        </nav>
      ) : null}
      {app ? null : (
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
      )}

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
          {current.video ? (
            <div className="ks-scene kit-video-scene">
              <video
                ref={videoRef}
                src={current.video}
                poster={current.poster}
                playsInline
                preload="auto"
                onPlay={() => setVideoPaused(false)}
                onPause={() => setVideoPaused(true)}
                onEnded={() => {
                  setVideoDone(true);
                  setVideoPaused(true);
                }}
              >
                {current.captions ? <track kind="captions" src={current.captions} srcLang="en" label="English" default /> : null}
              </video>
              {needsTap ? (
                <button type="button" className="kit-video-start" onClick={playClip} data-cursor-plain>
                  <Icon name="play" size={34} />
                  <span>Play clip</span>
                </button>
              ) : null}
              {lesson.filmedAt ? <span className="kit-filmed">Filmed at {lesson.filmedAt}</span> : null}
            </div>
          ) : (
            <KitScene lesson={lesson} step={current} revealed={revealed} />
          )}

          <div className="kit-bubble">
            <span className="kit-bubble-avatar">
              <Image src="/assets/finn-talking.webp" alt="" width={1200} height={1200} sizes="64px" />
            </span>
            <p>{current.say}</p>
          </div>

          {revealed && current.reveal?.text ? <p className="kit-answer">{current.reveal.text}</p> : null}

          {current.doIt && videoDone ? (
            <div className="kit-your-turn">
              <span className="kit-hand" aria-hidden="true">✋</span>
              <div>
                <strong>Your turn</strong>
                <p>{current.doIt}</p>
              </div>
            </div>
          ) : null}
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
            {current.video ? (
              <>
                <button type="button" className="kit-tool" onClick={playClip} data-cursor-plain>
                  Replay clip
                </button>
                <button type="button" className="kit-tool" onClick={toggleClip} data-cursor-plain>
                  {videoPaused ? "Play" : "Pause"}
                </button>
              </>
            ) : null}
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
          Step {step + 1} of {lesson.steps.length} · use ← → or a clicker to move, A to show the answer{current.video ? ", R to replay the clip" : ""}
        </p>
      </section>
    </div>
  );
}
