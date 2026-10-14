"use client";

import { useEffect, useState } from "react";
import Icon from "./Icon";

const inquiryTypes = [
  "School workshop",
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
  const [sent, setSent] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const interest = new URLSearchParams(window.location.search).get("interest");
    if (interest === "curriculum") setType("Curriculum PDFs");
    if (interest === "library-visit") setType("Library read-aloud");
    if (interest === "workshop") setType("School workshop");
    if (interest === "partnership") setType("Partnership");
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
        setSent(true);
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

      <label>
        <span>I’m interested in</span>
        <select name="inquiry" onChange={(event) => setType(event.target.value)} value={type}>
          {inquiryTypes.map((option) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      </label>

      <label>
        <span>Tell us more</span>
        <textarea
          onChange={(event) => setMessage(event.target.value)}
          placeholder="A few details about your students, goals, or idea..."
          required
          rows="3"
          value={message}
        />
      </label>

      <button className="button button-dark form-submit" type="submit">
        Draft email to FinGoose <Icon name="arrow" />
      </button>
      {sent ? (
        <p className="form-note" role="status">
          Didn&rsquo;t see your email app open? Email us directly at{" "}
          <a href="mailto:fin.goose.co@gmail.com">fin.goose.co@gmail.com</a>{" "}
          <button
            type="button"
            className="form-copy"
            onClick={() => {
              navigator.clipboard?.writeText("fin.goose.co@gmail.com").then(() => setCopied(true)).catch(() => {});
            }}
          >
            {copied ? "Copied!" : "Copy email"}
          </button>
        </p>
      ) : (
        <p className="form-note">
          This opens your email app with the message ready to review. Nothing is
          sent automatically.
        </p>
      )}
    </form>
  );
}
