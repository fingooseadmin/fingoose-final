"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Icon from "./Icon";
import Reveal from "./Reveal";

const curriculumModules = [
  { number: "01", title: "Money Management", copy: "Build a flexible plan for earning, saving, spending, and handling surprises.", slides: ["Money map", "Needs, wants & goals", "Working budget"] },
  { number: "02", title: "Credit & Borrowing", copy: "Explore the real cost of borrowing and the habits behind healthy credit decisions.", slides: ["Why people borrow", "Interest in plain language", "Debt decisions"] },
  { number: "03", title: "Saving & Investing", copy: "Connect time, risk, diversification, and the value of starting early.", slides: ["Saving with purpose", "Compound growth", "Risk & reward"] },
  { number: "04", title: "Career Decisions", copy: "Connect skills, income, paychecks, and postsecondary choices to a future plan.", slides: ["Income & opportunity", "Read a paycheck", "Choices after high school"] },
  { number: "05", title: "Financial Decision Lab", copy: "Apply the course ideas to a changing scenario and explain the final trade-off.", slides: ["Face the surprise", "Rebalance the plan", "Defend the decision"] }
];

const autismModules = [
  { number: "01", title: "See the routine", copy: "A clear visual sequence makes each activity easier to anticipate.", slides: ["First", "Next", "Finished"] },
  { number: "02", title: "Make one choice", copy: "Focused prompts keep attention on one practical money decision at a time.", slides: ["See it", "Choose", "Check"] },
  { number: "03", title: "Practice safely", copy: "Repeatable scenarios create room to build confidence at a comfortable pace.", slides: ["Model", "Practice", "Reflect"] }
];

function ResourceCollection({ title, eyebrow, description, modules, tone, developing = false, onPreview }) {
  const [expanded, setExpanded] = useState(0);
  return (
    <Reveal className={`teacher-resource-collection teacher-resource-${tone}`}>
      <div className="teacher-resource-intro">
        <span className="sticker-label sticker-orange">{eyebrow}</span>
        <h2>{title}</h2>
        <p>{description}</p>
        <div className="teacher-module-list">
          {modules.map((module, index) => {
            const isOpen = expanded === index;
            return (
              <article className={isOpen ? "is-open" : ""} key={module.number}>
                <button type="button" onClick={() => setExpanded(isOpen ? null : index)} aria-expanded={isOpen}>
                  <span>{module.number}</span>
                  <strong>{module.title}</strong>
                  <i aria-hidden="true">{isOpen ? "−" : "+"}</i>
                </button>
                <div className="teacher-module-detail">
                  <p>{module.copy}</p>
                  <div>{module.slides.map((slide) => <span key={slide}>{slide}</span>)}</div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
      <aside className="teacher-resource-side">
        <div className="teacher-benefit-note">
          <Icon name="check" />
          <strong>{developing ? "A predictable, sensory-aware learning sequence" : "Budget sheet, pre- and post-checks, and standards-minded structure"}</strong>
          <p>{developing ? "The kit is still in development; these previews show the intended learning flow." : "Verified classroom files will replace these visual previews as each publication is released."}</p>
        </div>
        <button className="curriculum-cover-button" type="button" onClick={onPreview}>
          <span>{developing ? "Resource concept" : "General middle school curriculum"}</span>
          <strong>{developing ? "Autism learning kit" : "FinGoose"}</strong>
          <small>{developing ? "Preview the learning sequence" : "Grades 6–8 · five modules"}</small>
          <i>Open preview <Icon name="arrow" size={16} /></i>
        </button>
      </aside>
    </Reveal>
  );
}

export default function TeacherResourceStudio() {
  const [preview, setPreview] = useState(null);
  const [page, setPage] = useState(0);
  const dialogRef = useRef(null);
  const activeModules = preview === "autism" ? autismModules : curriculumModules;
  const activeModule = activeModules[page];

  useEffect(() => {
    if (!preview) return undefined;
    document.body.classList.add("curriculum-preview-open");
    dialogRef.current?.focus();
    const handleKey = (event) => event.key === "Escape" && setPreview(null);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.body.classList.remove("curriculum-preview-open");
      document.removeEventListener("keydown", handleKey);
    };
  }, [preview]);

  const openPreview = (kind) => {
    setPage(0);
    setPreview(kind);
  };

  return (
    <>
      <div className="teacher-resource-studio">
        <ResourceCollection
          eyebrow="Teacher resources"
          title="A module-by-module classroom toolkit."
          description="Open each module to see its focus, then launch the full-screen preview for a polished look at the guide and lesson sequence."
          modules={curriculumModules}
          tone="blue"
          onPreview={() => openPreview("curriculum")}
        />
        <ResourceCollection
          eyebrow="In development"
          title="A more predictable path into money confidence."
          description="The Autism learning kit uses visual sequencing, focused choices, and repeatable practice. Its final documents are not yet public."
          modules={autismModules}
          tone="gold"
          developing
          onPreview={() => openPreview("autism")}
        />
      </div>

      {preview ? (
        <div className="resource-preview-backdrop" onMouseDown={(event) => event.target === event.currentTarget && setPreview(null)}>
          <section className="resource-preview-dialog" role="dialog" aria-modal="true" aria-label="Curriculum preview" ref={dialogRef} tabIndex={-1}>
            <button className="resource-preview-close" type="button" onClick={() => setPreview(null)} aria-label="Close preview">×</button>
            <header>
              <span>{preview === "autism" ? "Autism learning kit · concept preview" : "FinGoose · middle school curriculum"}</span>
              <h2>{preview === "autism" ? "Predictable learning sequence" : "Teacher resource preview"}</h2>
            </header>
            <div className="resource-preview-layout">
              <article className="resource-guide-page" key={`${preview}-${page}`}>
                <div><span>Module {activeModule.number}</span><strong>{String(page + 1).padStart(2, "0")} / {String(activeModules.length).padStart(2, "0")}</strong></div>
                <h3>{activeModule.title}</h3>
                <p>{activeModule.copy}</p>
                <ul>{activeModule.slides.map((slide) => <li key={slide}><Icon name="check" size={15} /> {slide}</li>)}</ul>
                <small>Resource preview · final publication files will appear here when released.</small>
              </article>
              <aside className="resource-slide-previews">
                <span>Lesson sequence</span>
                <div>
                  {activeModule.slides.map((slide, index) => (
                    <article style={{ "--slide-tilt": `${index % 2 ? 2 : -2}deg` }} key={slide}>
                      <small>Lesson {index + 1}</small>
                      <strong>{slide}</strong>
                      <i aria-hidden="true" />
                    </article>
                  ))}
                </div>
                <button type="button" disabled title="Verified source file not yet available">Download coming soon</button>
                <Link href="/contact?interest=curriculum#contact-form" onClick={() => setPreview(null)}>Request publication updates <Icon name="arrow" size={14} /></Link>
              </aside>
            </div>
            <footer>
              <button type="button" onClick={() => setPage((page - 1 + activeModules.length) % activeModules.length)} aria-label="Previous module">←</button>
              <div>{activeModules.map((module, index) => <button className={index === page ? "is-active" : ""} type="button" onClick={() => setPage(index)} aria-label={`Preview ${module.title}`} key={module.number} />)}</div>
              <button type="button" onClick={() => setPage((page + 1) % activeModules.length)} aria-label="Next module">→</button>
            </footer>
          </section>
        </div>
      ) : null}
    </>
  );
}
