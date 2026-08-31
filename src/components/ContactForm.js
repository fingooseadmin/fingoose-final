"use client";

import { useEffect, useState } from "react";
import Icon from "./Icon";

const inquiryTypes = [
  "School workshop",
  "Autism kit launch",
  "Library read-aloud",
  "Curriculum PDFs",
  "Partnership",
  "Learning resources",
  "Media or speaking",
  "Something else"
];

export default function ContactForm() {
  const [type, setType] = useState(inquiryTypes[0]);
  const [name, setName] = useState("");
  const [organization, setOrganization] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const interest = new URLSearchParams(window.location.search).get("interest");
    if (interest === "autism-kit") setType("Autism kit launch");
    if (interest === "curriculum") setType("Curriculum PDFs");
    if (interest === "library-visit") setType("Library read-aloud");
  }, []);

  const subject = encodeURIComponent(`FinGoose inquiry: ${type}`);
  const body = encodeURIComponent(
    `Hi FinGoose,\n\nMy name is ${name || "[your name]"}${organization ? ` from ${organization}` : ""}.\n\nI'm reaching out about: ${type}\n\n${message || "[Tell us a little about what you have in mind.]"}\n\nBest,\n${name || "[your name]"}`
  );

  return (
    <form
      className="contact-form"
      id="contact-form"
      onSubmit={(event) => {
        event.preventDefault();
        window.location.href = `mailto:fin.goose.co@gmail.com?subject=${subject}&body=${body}`;
      }}
    >
      <div className="form-heading">
        <span className="micro-label">Start the conversation</span>
        <h2>What can we build together?</h2>
      </div>

      <label>
        <span>Your name</span>
        <input
          autoComplete="name"
          onChange={(event) => setName(event.target.value)}
          placeholder="Name"
          required
          type="text"
          value={name}
        />
      </label>

      <label>
        <span>School or organization <small>optional</small></span>
        <input
          autoComplete="organization"
          onChange={(event) => setOrganization(event.target.value)}
          placeholder="Organization"
          type="text"
          value={organization}
        />
      </label>

      <fieldset>
        <legend>I’m interested in</legend>
        <div className="inquiry-options">
          {inquiryTypes.map((option) => (
            <label className={type === option ? "is-active" : ""} key={option}>
              <input
                checked={type === option}
                name="inquiry"
                onChange={() => setType(option)}
                type="radio"
                value={option}
              />
              {option}
            </label>
          ))}
        </div>
      </fieldset>

      <label>
        <span>Tell us more</span>
        <textarea
          onChange={(event) => setMessage(event.target.value)}
          placeholder="A few details about your students, goals, or idea..."
          required
          rows="5"
          value={message}
        />
      </label>

      <button className="button button-dark form-submit" type="submit">
        Draft email to FinGoose <Icon name="arrow" />
      </button>
      <p className="form-note">
        This opens your email app with the message ready to review. Nothing is
        sent automatically.
      </p>
    </form>
  );
}
