"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Icon from "./Icon";

const modules = [
  {
    id: "money",
    number: "01",
    title: "Money management",
    summary: "Build a flexible plan for earning, saving, spending, and surprises.",
    accent: "#ffb200",
    lessons: [
      "Your money map",
      "Needs, wants, and goals",
      "Build a working budget",
      "Emergency fund crisis lab"
    ]
  },
  {
    id: "credit",
    number: "02",
    title: "Credit & borrowing",
    summary: "See the real cost of borrowing and learn what healthy credit behavior looks like.",
    accent: "#ff8209",
    lessons: [
      "Why people borrow",
      "Interest in plain language",
      "Credit signals",
      "Debt decision challenge"
    ]
  },
  {
    id: "growth",
    number: "03",
    title: "Saving & investing",
    summary: "Understand time, risk, diversification, and the power of starting early.",
    accent: "#bdc9ff",
    lessons: [
      "Saving with a purpose",
      "Compound growth",
      "Risk and reward",
      "Build a starter portfolio"
    ]
  },
  {
    id: "career",
    number: "04",
    title: "Career decisions",
    summary: "Connect income, skills, goals, and financial choices to a future you can shape.",
    accent: "#3c4cba",
    lessons: [
      "Income and opportunity",
      "Read a paycheck",
      "Choices after high school",
      "Final confidence check"
    ]
  }
];

const quizOptions = [
  {
    id: "a",
    text: "Put it on a credit card and keep the original plan",
    feedback: "That shifts the problem forward and may add interest."
  },
  {
    id: "b",
    text: "Pause a want, cover the pass, then rebuild savings",
    feedback: "Exactly. Protect the need, avoid new debt, and keep the plan flexible."
  },
  {
    id: "c",
    text: "Stop saving permanently",
    feedback: "A temporary adjustment can help, but abandoning the goal removes your safety net."
  }
];

const lessonVideos = {
  "money-0": null,
  "money-1": null,
  "money-2": null,
  "money-3": null,
  "credit-0": null,
  "credit-1": null,
  "credit-2": null,
  "credit-3": null,
  "growth-0": null,
  "growth-1": null,
  "growth-2": null,
  "growth-3": null,
  "career-0": null,
  "career-1": null,
  "career-2": null,
  "career-3": null
};

export default function CourseExperience() {
  const [activeId, setActiveId] = useState("money");
  const [completed, setCompleted] = useState([]);
  const [answer, setAnswer] = useState(null);
  const [hydrated, setHydrated] = useState(false);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const closeButtonRef = useRef(null);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("fingoose-course-progress") || "[]");
      if (Array.isArray(saved)) setCompleted(saved);
    } catch {
      setCompleted([]);
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) {
      localStorage.setItem("fingoose-course-progress", JSON.stringify(completed));
    }
  }, [completed, hydrated]);

  useEffect(() => {
    if (!selectedLesson) return undefined;

    const previousFocus = document.activeElement;
    document.body.classList.add("lesson-modal-open");
    closeButtonRef.current?.focus();

    const handleKeyDown = (event) => {
      if (event.key === "Escape") setSelectedLesson(null);
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.classList.remove("lesson-modal-open");
      document.removeEventListener("keydown", handleKeyDown);
      previousFocus?.focus?.();
    };
  }, [selectedLesson]);

  const active = modules.find((module) => module.id === activeId);
  const progress = Math.round((completed.length / 16) * 100);

  const nextLesson = useMemo(() => {
    for (const module of modules) {
      for (let index = 0; index < module.lessons.length; index += 1) {
        const key = `${module.id}-${index}`;
        if (!completed.includes(key)) {
          return { module, index, label: module.lessons[index], key };
        }
      }
    }
    return null;
  }, [completed]);

  function openLesson(module, index) {
    const moduleId = module.id;
    const key = `${moduleId}-${index}`;
    setCompleted((current) =>
      current.includes(key) ? current : [...current, key]
    );
    setSelectedLesson({
      key,
      label: module.lessons[index],
      moduleNumber: module.number,
      moduleTitle: module.title,
      type: index === 3 ? "Interactive challenge" : "Core lesson",
      duration: index === 3 ? "8 min" : "5 min",
      videoSrc: lessonVideos[key]
    });
  }

  return (
    <>
      <div className="course-experience">
      <div className="course-sidebar">
        <div className="course-progress">
          <div>
            <span>Your preview progress</span>
            <strong>{progress}%</strong>
          </div>
          <div className="progress-track">
            <span style={{ width: `${progress}%` }} />
          </div>
          <p>{completed.length} of 16 learning steps explored</p>
        </div>

        <div className="module-tabs" role="tablist" aria-label="Course modules">
          {modules.map((module) => (
            <button
              aria-selected={activeId === module.id}
              className={activeId === module.id ? "is-active" : ""}
              key={module.id}
              onClick={() => setActiveId(module.id)}
              role="tab"
              type="button"
            >
              <span>{module.number}</span>
              <div>
                <strong>{module.title}</strong>
                <small>
                  {
                    module.lessons.filter((_, index) =>
                      completed.includes(`${module.id}-${index}`)
                    ).length
                  }
                  /4 explored
                </small>
              </div>
              <i style={{ "--module-accent": module.accent }} />
            </button>
          ))}
        </div>
      </div>

      <div className="course-main">
        <div className="module-header">
          <div>
            <span className="micro-label">Module {active.number} · 4 steps</span>
            <h2>{active.title}</h2>
            <p>{active.summary}</p>
          </div>
          <div className="module-signal" style={{ "--module-accent": active.accent }}>
            <Icon name="chart" />
          </div>
        </div>

        <div className="lesson-list">
          {active.lessons.map((lesson, index) => {
            const done = completed.includes(`${active.id}-${index}`);
            return (
              <button
                aria-expanded={selectedLesson?.key === `${active.id}-${index}`}
                aria-haspopup="dialog"
                className={done ? "is-complete" : ""}
                key={lesson}
                onClick={() => openLesson(active, index)}
                type="button"
              >
                <span className="lesson-status">
                  {done ? <Icon name="check" size={16} /> : index + 1}
                </span>
                <div>
                  <span>{index === 3 ? "Interactive challenge" : "Core lesson"}</span>
                  <strong>{lesson}</strong>
                </div>
                <span className="lesson-time">
                  <Icon name="clock" size={16} />
                  {index === 3 ? "8 min" : "5 min"}
                </span>
              </button>
            );
          })}
        </div>

        <div className="course-quiz">
          <div className="quiz-topline">
            <span className="micro-label">Quick decision · sample</span>
            <span>01 / 01</span>
          </div>
          <h3>
            Your bus pass costs $20 more this month. Your budget was already
            fully assigned. What is the strongest first move?
          </h3>
          <div className="quiz-options">
            {quizOptions.map((option) => (
              <button
                className={answer === option.id ? "is-selected" : ""}
                key={option.id}
                onClick={() => setAnswer(option.id)}
                type="button"
              >
                <span>{option.id.toUpperCase()}</span>
                {option.text}
              </button>
            ))}
          </div>
          {answer && (
            <div className={`quiz-feedback ${answer === "b" ? "correct" : ""}`}>
              <Icon name={answer === "b" ? "check" : "spark"} />
              <p>{quizOptions.find((option) => option.id === answer).feedback}</p>
            </div>
          )}
        </div>

        <div className="next-step">
          <div>
            <span>Up next</span>
            <strong>
              {nextLesson ? nextLesson.label : "Preview complete—nice work."}
            </strong>
          </div>
          {nextLesson && (
            <button
              aria-haspopup="dialog"
              onClick={() => {
                setActiveId(nextLesson.module.id);
                openLesson(nextLesson.module, nextLesson.index);
              }}
              type="button"
            >
              Open next lesson <Icon name="arrow" />
            </button>
          )}
        </div>
      </div>
      </div>

      {selectedLesson && (
        <div
          className="lesson-modal-backdrop"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setSelectedLesson(null);
          }}
          role="presentation"
        >
          <section
            aria-labelledby="lesson-modal-title"
            aria-modal="true"
            className="lesson-video-modal"
            role="dialog"
          >
            <div className="lesson-modal-topline">
              <div>
                <span>
                  Module {selectedLesson.moduleNumber} · {selectedLesson.type}
                </span>
                <strong>{selectedLesson.moduleTitle}</strong>
              </div>
              <button
                aria-label="Close lesson"
                className="lesson-modal-close"
                onClick={() => setSelectedLesson(null)}
                ref={closeButtonRef}
                type="button"
              >
                ×
              </button>
            </div>

            <div className="lesson-video-frame">
              {selectedLesson.videoSrc ? (
                <video
                  controls
                  playsInline
                  preload="metadata"
                  src={selectedLesson.videoSrc}
                >
                  Your browser does not support this lesson video.
                </video>
              ) : (
                <div className="lesson-video-placeholder">
                  <div className="lesson-placeholder-grid" aria-hidden="true" />
                  <span className="lesson-placeholder-play" aria-hidden="true">
                    <Icon name="play" size={38} />
                  </span>
                  <span>Lesson video</span>
                  <strong>Lesson video coming soon</strong>
                  <p>
                    Video content is being prepared for this lesson.
                  </p>
                </div>
              )}
            </div>

            <div className="lesson-modal-details">
              <div>
                <span>Now exploring · {selectedLesson.duration}</span>
                <h2 id="lesson-modal-title">{selectedLesson.label}</h2>
              </div>
              <div className="lesson-modal-status">
                <Icon name="check" size={18} />
                Added to preview progress
              </div>
            </div>
          </section>
        </div>
      )}
    </>
  );
}
