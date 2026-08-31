"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import Icon from "./Icon";
import Reveal from "./Reveal";

const previews = [
  {
    number: "01",
    title: "Lesson plans",
    eyebrow: "Module 1 preview",
    previewTitle: "Money Management",
    copy: "Standards-minded lesson structures that move from a concrete scenario to a decision and reflection.",
    note: "Verified from the public 16-step FinGoose course overview.",
    icon: "school",
    accent: "blue",
    pages: [
      {
        label: "Course opening",
        title: "Start with a real money choice.",
        body: "A visual lesson shell for introducing the situation before students weigh options and explain their reasoning.",
        chips: ["See the situation", "Choose", "Reflect"]
      },
      {
        label: "Module 1",
        title: "Money Management",
        body: "The original FinGoose course publicly identifies Money Management as its first module. Final classroom pages will appear here when publication-ready.",
        chips: ["16-step course", "Practical decisions", "Final PDF coming soon"]
      }
    ]
  },
  {
    number: "02",
    title: "Student worksheets",
    eyebrow: "Worksheet preview",
    previewTitle: "Money choices",
    copy: "Visual prompts and practical exercises built for discussion, explanation, and classroom use.",
    note: "Layout placeholder—the final worksheet content is not yet public.",
    icon: "chart",
    accent: "yellow",
    pages: [
      {
        label: "Student worksheet",
        title: "What would you do?",
        body: "A clean worksheet format with room to identify the goal, compare choices, and explain the trade-off.",
        prompts: ["What is the goal?", "Which choice fits?", "What is the trade-off?"]
      },
      {
        label: "Reflection",
        title: "Defend your decision.",
        body: "A second page gives students space to connect the decision to a real-life money habit.",
        prompts: ["My decision", "My reasoning", "What I would change"]
      }
    ]
  },
  {
    number: "03",
    title: "Guidebooks",
    eyebrow: "Educator preview",
    previewTitle: "Facilitator notes",
    copy: "Facilitation notes that help educators frame trade-offs and keep financial ideas connected to real life.",
    note: "Layout placeholder—the final facilitator guide is not yet public.",
    icon: "book",
    accent: "lilac",
    pages: [
      {
        label: "Before the lesson",
        title: "Set up the conversation.",
        body: "A compact teaching guide for introducing the scenario, defining the objective, and inviting multiple points of view.",
        chips: ["Objective", "Materials", "Opening prompt"]
      },
      {
        label: "During the lesson",
        title: "Listen for the reasoning.",
        body: "Prompts help educators keep the discussion active while connecting student choices to the financial idea behind the activity.",
        chips: ["Ask why", "Surface trade-offs", "Close with reflection"]
      }
    ]
  }
];

function PreviewPage({ page, index }) {
  return (
    <article className="curriculum-preview-page">
      <div className="curriculum-preview-page-topline">
        <span>{page.label}</span>
        <strong>0{index + 1}</strong>
      </div>
      <h3>{page.title}</h3>
      <p>{page.body}</p>
      {page.prompts ? (
        <div className="curriculum-preview-prompts">
          {page.prompts.map((prompt) => (
            <div key={prompt}>
              <span aria-hidden="true" />
              <strong>{prompt}</strong>
              <i aria-hidden="true" />
            </div>
          ))}
        </div>
      ) : null}
      {page.chips ? (
        <div className="curriculum-preview-chips">
          {page.chips.map((chip) => <span key={chip}>{chip}</span>)}
        </div>
      ) : null}
      <small>FinGoose classroom resource · preview</small>
    </article>
  );
}

export default function CurriculumPreviews() {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const dialogRef = useRef(null);
  const openerRef = useRef(null);
  const titleId = useId();
  const selected = selectedIndex === null ? null : previews[selectedIndex];

  const openPreview = (index, event) => {
    openerRef.current = event.currentTarget;
    setSelectedIndex(index);
  };

  const closePreview = () => {
    setSelectedIndex(null);
    window.requestAnimationFrame(() => openerRef.current?.focus());
  };

  const movePreview = (direction) => {
    setSelectedIndex((current) =>
      current === null ? 0 : (current + direction + previews.length) % previews.length
    );
  };

  useEffect(() => {
    if (selectedIndex === null) return undefined;

    document.body.classList.add("curriculum-preview-open");
    dialogRef.current?.focus();

    const handleKeyDown = (event) => {
      if (event.key === "Escape") closePreview();
      if (event.key === "ArrowLeft") movePreview(-1);
      if (event.key === "ArrowRight") movePreview(1);
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.classList.remove("curriculum-preview-open");
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedIndex]);

  return (
    <>
      <div className="paper-stack-grid">
        {previews.map((paper, index) => (
          <Reveal delay={index * 70} key={paper.number}>
            <button
              className={"paper-stack-card paper-stack-card-" + paper.accent}
              type="button"
              onClick={(event) => openPreview(index, event)}
              aria-haspopup="dialog"
              aria-label={"Open preview for " + paper.title}
            >
              <span>{paper.number}</span>
              <Icon name={paper.icon} />
              <div className="paper-stack-mini-preview" aria-hidden="true">
                <span>{paper.eyebrow}</span>
                <strong>{paper.previewTitle}</strong>
                <i />
                <i />
                <i />
              </div>
              <div className="paper-stack-copy">
                <p className="paper-stack-kicker">Select to preview</p>
                <h2>{paper.title}</h2>
                <p>{paper.copy}</p>
              </div>
              <small>Open document preview <Icon name="arrow" size={12} /></small>
            </button>
          </Reveal>
        ))}
      </div>

      {selected ? (
        <div
          className="curriculum-preview-backdrop"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) closePreview();
          }}
        >
          <section
            className={"curriculum-preview-dialog curriculum-preview-" + selected.accent}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            ref={dialogRef}
            tabIndex={-1}
          >
            <button
              className="curriculum-preview-close"
              type="button"
              onClick={closePreview}
              aria-label="Close curriculum preview"
            >
              ×
            </button>

            <header className="curriculum-preview-header">
              <div>
                <span>{selected.number} / 03 · Classroom collection</span>
                <h2 id={titleId}>{selected.title}</h2>
              </div>
              <p>{selected.note}</p>
            </header>

            <div className="curriculum-preview-pages">
              {selected.pages.map((page, index) => (
                <PreviewPage key={page.title} page={page} index={index} />
              ))}
            </div>

            <footer className="curriculum-preview-footer">
              <Link
                className="button button-dark"
                href="/contact?interest=curriculum#contact-form"
                onClick={closePreview}
              >
                Request publication updates <Icon name="arrow" />
              </Link>
              <nav aria-label="Browse curriculum previews">
                <button type="button" onClick={() => movePreview(-1)} aria-label="Previous preview">←</button>
                <button type="button" onClick={() => movePreview(1)} aria-label="Next preview">→</button>
              </nav>
            </footer>
          </section>
        </div>
      ) : null}
    </>
  );
}
