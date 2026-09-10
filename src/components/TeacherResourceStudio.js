"use client";
import DialogLayer from "./DialogLayer";

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
  return (
    <section className={"curriculum-resource curriculum-resource-" + tone}>
      <aside className="curriculum-facts">
        <span className="sticker-label sticker-orange">{eyebrow}</span>
        <div className="curriculum-cover">
          <Icon name="book" size={32} />
          <strong>{developing ? "Autism learning kit" : "FinGoose"}</strong>
          <span>{developing ? "Visual learning sequence" : "Middle school financial literacy"}</span>
        </div>
        <dl>
          <div><dt>Resource type</dt><dd>{developing ? "Learning kit concept" : "Curriculum & classroom tools"}</dd></div>
          {!developing && <div><dt>Grade level</dt><dd>Middle school · Grades 6–8</dd></div>}
          <div><dt>Subject</dt><dd>Personal finance</dd></div>
          <div><dt>Modules</dt><dd>{modules.length} learning units</dd></div>
          <div><dt>Availability</dt><dd>{developing ? "In development" : "Preview available · downloads forthcoming"}</dd></div>
        </dl>
        <button className="button button-dark" type="button" onClick={() => onPreview(0)}>Preview the guide <Icon name="book" /></button>
        <Link className="text-link" href="/contact?interest=curriculum#contact-form">Request classroom materials <Icon name="arrow" /></Link>
        <p className="curriculum-availability">Downloadable files will be added when the final publications are available.</p>
      </aside>
      <div className="curriculum-units">
        <header className="curriculum-overview">
          <span className="eyebrow">Overview</span>
          <h2>{title}</h2>
          <p>{description}</p>
        </header>
        <div className="curriculum-unit-list">
          {modules.map((module,index) => (
            <article key={module.number} className="curriculum-unit">
              <span className="curriculum-unit-number" aria-hidden="true">{module.number}</span>
              <div>
                <h3>Unit {Number(module.number)}: {module.title}</h3>
                <p>{module.copy}</p>
                <ul className="curriculum-topics">{module.slides.map(slide=><li key={slide}>{slide}</li>)}</ul>
                <button className="curriculum-lesson-link" type="button" onClick={() => onPreview(index)} aria-label={"Preview unit " + module.number + ": " + module.title}>Preview this unit <Icon name="arrow" size={16} /></button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
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

  const openPreview = (kind, index = 0) => {
    setPage(index);
    setPreview(kind);
  };

  return (
    <>
      <div className="teacher-resource-studio">
        <ResourceCollection
          eyebrow="Teacher resources"
          title="Middle school financial literacy"
          description="Help students make practical money decisions through five units covering budgeting, credit, saving, investing, careers, and a financial decision lab. Explore each unit below and preview its learning sequence."
          modules={curriculumModules}
          tone="blue"
          onPreview={(index) => openPreview("curriculum", index)}
        />
        <ResourceCollection
          eyebrow="In development"
          title="A more predictable path into money confidence."
          description="The Autism learning kit uses visual sequencing, focused choices, and repeatable practice. Its final documents are not yet public."
          modules={autismModules}
          tone="gold"
          developing
          onPreview={(index) => openPreview("autism", index)}
        />
      </div>

      {preview ? (
        <DialogLayer>
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
        </DialogLayer>
      ) : null}
    </>
  );
}
