"use client";

import Image from "next/image";
import Link from "@/components/StaticLink";
import { useEffect, useId, useRef, useState } from "react";
import Icon from "./Icon";
import Reveal from "./Reveal";

const team = [
  {
    name: "Grace Zhou",
    role: "Founder and CEO",
    detail: "Bergen County Academies · Academy of Business & Finance",
    image: "/assets/grace-zhou.webp",
    photo: true,
    summary:
      "Hi! I’m Grace Zhou, a junior at the Bergen County Academies in the Academy of Business & Finance. I’m passionate about financial literacy, animation, and creative education and hope to apply these skills in FinGoose!",
    contribution:
      "She shapes the curriculum and creative direction so each lesson feels approachable, rigorous, and connected to decisions students actually face.",
    focus: ["Financial literacy", "Animation", "Creative education"]
  },
  {
    name: "Gevan Ha",
    role: "CMO",
    detail: "Community · Growth",
    image: "/assets/team-portrait-two.webp",
    photo: true,
    summary:
      "Gevan develops the way FinGoose communicates its mission and builds relationships with the communities it hopes to serve.",
    contribution:
      "He supports outreach, audience growth, and partner-facing storytelling so educators, students, and collaborators can understand where FinGoose fits.",
    focus: ["Community outreach", "Brand strategy", "Partnership growth"]
  },
  {
    name: "Victor Pan",
    role: "Chief Technology Officer",
    detail: "Digital learning · Product systems",
    image: "/assets/finn-talking.png",
    summary:
      "Victor leads the digital learning and product systems that carry FinGoose lessons beyond the physical classroom.",
    contribution:
      "He translates course and workshop ideas into reliable, accessible online experiences while guiding the technical direction of the platform.",
    focus: ["Product systems", "Digital learning", "Web experience"]
  },
  {
    name: "Alex Moell",
    role: "Instructor",
    detail: "Workshops · Facilitation",
    image: "/assets/team-portrait-one.webp",
    photo: true,
    summary:
      "Alex helps turn FinGoose material into active, discussion-led learning experiences for students.",
    contribution:
      "Through workshop facilitation, Alex guides learners through decisions, trade-offs, teamwork, and reflection in real time.",
    focus: ["Workshop delivery", "Student discussion", "Applied learning"]
  }
];

export default function TeamProfiles() {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const dialogRef = useRef(null);
  const openerRef = useRef(null);
  const titleId = useId();
  const selected = selectedIndex === null ? null : team[selectedIndex];

  const openProfile = (index, event) => {
    openerRef.current = event.currentTarget;
    setSelectedIndex(index);
  };

  const closeProfile = () => {
    setSelectedIndex(null);
    window.requestAnimationFrame(() => openerRef.current?.focus());
  };

  const moveProfile = (direction) => {
    setSelectedIndex((current) =>
      current === null ? 0 : (current + direction + team.length) % team.length
    );
  };

  useEffect(() => {
    if (selectedIndex === null) return undefined;

    const body = document.body;
    body.classList.add("team-profile-open");
    dialogRef.current?.focus();

    const handleKeyDown = (event) => {
      if (event.key === "Escape") closeProfile();
      if (event.key === "ArrowLeft") moveProfile(-1);
      if (event.key === "ArrowRight") moveProfile(1);

      if (event.key === "Tab" && dialogRef.current) {
        const focusable = Array.from(
          dialogRef.current.querySelectorAll(
            'button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])'
          )
        );
        if (!focusable.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (
          event.shiftKey &&
          (document.activeElement === first || document.activeElement === dialogRef.current)
        ) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      body.classList.remove("team-profile-open");
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedIndex]);

  return (
    <>
      <div className="team-scrap-grid">
        {team.map((person, index) => (
          <Reveal delay={index * 60} key={person.name}>
            <button
              className="team-scrap-card team-profile-trigger"
              type="button"
              onClick={(event) => openProfile(index, event)}
              aria-haspopup="dialog"
              aria-label={`Open profile for ${person.name}, ${person.role}`}
            >
              <div className="team-card-tape" aria-hidden="true" />
              <div className={`team-scrap-image ${person.photo ? "has-photo" : ""}`}>
                <span>0{index + 1}</span>
                <Image
                  alt=""
                  src={person.image}
                  width={2048}
                  height={2048}
                  sizes="(max-width: 760px) 72vw, 360px"
                />
                <span className="team-profile-cue">
                  View profile <Icon name="arrow" size={13} />
                </span>
              </div>
              <p>{person.role}</p>
              <h3>{person.name}</h3>
              <span>{person.detail}</span>
            </button>
          </Reveal>
        ))}
      </div>

      {selected ? (
        <div
          className="team-profile-backdrop"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) closeProfile();
          }}
        >
          <section
            className="team-profile-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            ref={dialogRef}
            tabIndex={-1}
          >
            <button
              className="team-profile-close"
              type="button"
              onClick={closeProfile}
              aria-label="Close team profile"
            >
              ×
            </button>

            <div className={`team-profile-portrait ${selected.photo ? "has-photo" : ""}`}>
              <div className="team-profile-tape" aria-hidden="true" />
              <span className="team-profile-index">0{selectedIndex + 1} / 0{team.length}</span>
              <Image
                alt=""
                src={selected.image}
                width={2048}
                height={2048}
                sizes="(max-width: 720px) 72vw, 430px"
                priority
              />
              <span className="team-profile-stamp">FinGoose team</span>
            </div>

            <div className="team-profile-copy">
              <span className="sticker-label sticker-orange">Person profile</span>
              <p className="team-profile-role">{selected.role}</p>
              <h2 id={titleId}>{selected.name}</h2>
              <p className="team-profile-summary">{selected.summary}</p>

              <div className="team-profile-notes">
                <div>
                  <span>Focus areas</span>
                  <ul>
                    {selected.focus.map((item) => <li key={item}>{item}</li>)}
                  </ul>
                </div>
                <div>
                  <span>At FinGoose</span>
                  <p>{selected.contribution}</p>
                </div>
              </div>

              <div className="team-profile-actions">
                <Link className="button button-dark" href="/contact" onClick={closeProfile}>
                  Work with the team <Icon name="arrow" />
                </Link>
                <div className="team-profile-nav" aria-label="Browse team profiles">
                  <button type="button" onClick={() => moveProfile(-1)} aria-label="Previous team member">←</button>
                  <button type="button" onClick={() => moveProfile(1)} aria-label="Next team member">→</button>
                </div>
              </div>
            </div>
          </section>
        </div>
      ) : null}
    </>
  );
}
