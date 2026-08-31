"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Icon from "./Icon";
import Reveal from "./Reveal";

const dinoAmazonUrl = "https://www.amazon.com/Fingoose-Dino-Dream-Kevin-Wu/dp/B0HCZ9H9J1";

const books = [
  {
    number: "01",
    title: "FinGoose and the Two Mornings",
    description: "An illustrated story about opportunity, fairness, and empathy, designed to help young readers begin a practical conversation about money.",
    image: "/assets/money-toast-stack.png",
    alt: "Money toast illustration representing FinGoose and the Two Mornings",
    tone: "gold",
    actions: [
      { label: "Amazon Kindle", href: "https://www.amazon.com/dp/B0GDFQ682L" },
      { label: "Read free on Kobo", href: "https://www.kobo.com/hk/en/ebook/fingoose-and-the-two-mornings" }
    ],
    pages: [
      { label: "Story preview", title: "Two mornings. Two very different starts.", copy: "This visual preview introduces the book’s central idea: the same day can feel very different when people begin with different resources." },
      { label: "Conversation prompt", title: "What makes a choice fair?", copy: "Pause, compare the situations, and invite young readers to explain what each character might need." },
      { label: "Classroom connection", title: "Turn the story into a money conversation.", copy: "Use the read-aloud to discuss opportunity, empathy, and how thoughtful choices can help a community." }
    ]
  },
  {
    number: "02",
    title: "FinGoose and the Dino Dream",
    description: "The second FinGoose picture book is available through Amazon. The finished cover and reading-preview pages will be added when those source files are supplied.",
    image: "/assets/goose-curious.png",
    alt: "FinGoose and the Dino Dream preview artwork",
    tone: "blue",
    actions: [{ label: "View on Amazon", href: dinoAmazonUrl }],
    pages: [
      { label: "Preview status", title: "The reading preview is being prepared.", copy: "The reading preview is in production. Verified pages will appear here as soon as the final source file is released." },
      { label: "Available now", title: "Open the verified Amazon edition.", copy: "Use the Amazon link in the book card to view the current product listing and availability." }
    ]
  }
];

export default function BookCollectionExperience() {
  const [openIndex, setOpenIndex] = useState(null);
  const [pageIndex, setPageIndex] = useState(0);
  const dialogRef = useRef(null);
  const activeBook = openIndex === null ? null : books[openIndex];

  useEffect(() => {
    if (!activeBook) return undefined;
    document.body.classList.add("book-preview-open");
    dialogRef.current?.focus();
    const close = (event) => event.key === "Escape" && setOpenIndex(null);
    document.addEventListener("keydown", close);
    return () => {
      document.body.classList.remove("book-preview-open");
      document.removeEventListener("keydown", close);
    };
  }, [activeBook]);

  const openBook = (index) => {
    setPageIndex(0);
    setOpenIndex(index);
  };

  return (
    <>
      <div className="book-library-stack">
        {books.map((book, index) => (
          <Reveal delay={index * 80} key={book.title}>
            <article className={`book-library-row book-library-${book.tone}`} id={`book-${book.number}`}>
              <div className="book-landscape-cover">
                <span className="book-cover-tape" aria-hidden="true" />
                <div className="book-cover-art">
                  <Image alt={book.alt} src={book.image} fill sizes="(max-width: 760px) 90vw, 510px" />
                  <div className="book-cover-title">
                    <small>FinGoose picture book</small>
                    <strong>{book.title}</strong>
                  </div>
                </div>
              </div>
              <div className="book-library-copy">
                <span className={`sticker-label ${index ? "sticker-orange" : ""}`}>Book {book.number} · Books & publications</span>
                <h2>{book.title}</h2>
                <p>{book.description}</p>
                <div className="book-library-actions">
                  <button className="button button-gold" type="button" onClick={() => openBook(index)}>
                    Preview the book <Icon name="book" />
                  </button>
                  {book.actions.map((action) => (
                    <a className="button button-dark" href={action.href} target="_blank" rel="noreferrer" key={action.label}>
                      {action.label} <Icon name="external" />
                    </a>
                  ))}
                </div>
                <div className="book-availability-strip">
                  <span><Icon name="check" /> Verified reading link</span>
                  <span><Icon name="school" /> Classroom-friendly format</span>
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </div>

      <Reveal className="library-signup-panel">
        <div>
          <span className="sticker-label sticker-orange">Libraries & read-alouds</span>
          <h2>Invite the story into your library.</h2>
          <p>Tell FinGoose about your readers, group size, and preferred timing. The short questionnaire helps the team plan a book visit and age-friendly activity.</p>
        </div>
        <Link className="button button-gold" href="/contact?interest=library-visit#contact-form">
          Start the library questionnaire <Icon name="arrow" />
        </Link>
      </Reveal>

      {activeBook ? (
        <div className="book-preview-backdrop" onMouseDown={(event) => event.target === event.currentTarget && setOpenIndex(null)}>
          <section className="book-preview-dialog" role="dialog" aria-modal="true" aria-label={`${activeBook.title} preview`} ref={dialogRef} tabIndex={-1}>
            <button className="book-preview-close" type="button" onClick={() => setOpenIndex(null)} aria-label="Close book preview">×</button>
            <header>
              <span>Book {activeBook.number} · visual preview</span>
              <h2>{activeBook.title}</h2>
            </header>
            <div className="book-preview-stage">
              <article key={`${activeBook.number}-${pageIndex}`}>
                <span>{activeBook.pages[pageIndex].label}</span>
                <h3>{activeBook.pages[pageIndex].title}</h3>
                <p>{activeBook.pages[pageIndex].copy}</p>
                <small>Page {pageIndex + 1} of {activeBook.pages.length}</small>
              </article>
              <aside>
                <div className="book-preview-mini-cover">
                  <Image alt="" src={activeBook.image} fill sizes="240px" />
                </div>
                <p>{openIndex === 1 ? "Verified pages will replace this preview once supplied." : "A short, non-downloadable site preview."}</p>
                <a className="button button-dark" href={activeBook.actions[0].href} target="_blank" rel="noreferrer">
                  Open book listing <Icon name="external" />
                </a>
              </aside>
            </div>
            <footer>
              <button type="button" onClick={() => setPageIndex((pageIndex - 1 + activeBook.pages.length) % activeBook.pages.length)} aria-label="Previous preview page">←</button>
              <div>{activeBook.pages.map((page, index) => <button type="button" className={index === pageIndex ? "is-active" : ""} onClick={() => setPageIndex(index)} aria-label={`Show preview page ${index + 1}`} key={page.title} />)}</div>
              <button type="button" onClick={() => setPageIndex((pageIndex + 1) % activeBook.pages.length)} aria-label="Next preview page">→</button>
            </footer>
          </section>
        </div>
      ) : null}
    </>
  );
}
