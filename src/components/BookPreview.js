"use client";

import Image from "next/image";
import { useState } from "react";
import FlipBook from "./FlipBook";
import Icon from "./Icon";
import { Sticker } from "./Stickers";

// "Peek inside" flip-books for the picture books. Pages live in
// public/assets/books/<slug>/NN.webp (exported from the FinGoose Canva).
// Only the first part of each book is shown, then a "keep reading" page.
const range = (from, to) => Array.from({ length: to - from + 1 }, (_, i) => from + i);

const BOOKS = [
  {
    slug: "two-mornings",
    title: "FinGoose and the Two Mornings",
    short: "Two Mornings",
    by: "by Grace Zhou",
    cover: "/assets/books/two-mornings/01.webp",
    pages: range(2, 14),
    tone: "gold",
    links: [
      { label: "Read free on Kobo", href: "https://www.kobo.com/us/en/ebook/fingoose-and-the-two-mornings" },
      { label: "Amazon Kindle", href: "https://www.amazon.com/dp/B0GDFQ682L" }
    ],
    teaser: "What happens when FinGoose wakes up in someone else’s morning?"
  },
  {
    slug: "dino-dream",
    title: "FinGoose and the Dino Dream",
    short: "Dino Dream",
    by: "by Kevin Wu",
    cover: "/assets/book-dino-dream-cover.webp",
    pages: range(2, 16),
    tone: "blue",
    links: [{ label: "Get it on Amazon", href: "https://www.amazon.com/dp/B0HCZ9H9J1" }],
    teaser: "Will FinGoose save enough coins for Mr. Dino?"
  }
];

function pageSrc(book, n) {
  return `/assets/books/${book.slug}/${String(n).padStart(2, "0")}.webp`;
}

export default function BookPreview() {
  const [active, setActive] = useState(0);
  const book = BOOKS[active];

  const pages = [
    <div className="fgx-bk-img fgx-bk-cover" key="cover">
      <Image src={book.cover} alt={`Cover of ${book.title}`} fill sizes="(max-width: 760px) 84vw, 460px" priority={active === 0} />
    </div>,
    ...book.pages.map((n, i) => (
      <div className="fgx-bk-img" key={n}>
        <Image src={pageSrc(book, n)} alt={`${book.title}, page ${i + 1}`} fill sizes="(max-width: 760px) 84vw, 460px" loading="lazy" />
      </div>
    )),
    <div className={`fgx-bk-more tone-${book.tone}`} key="more">
      <p className="fgx-bk-more-kicker">end of the preview</p>
      <h3>Want to know what happens next?</h3>
      <p className="fgx-bk-teaser">{book.teaser}</p>
      <div className="fgx-bk-more-links">
        {book.links.map((link) => (
          <a key={link.href} className="button button-dark" href={link.href} target="_blank" rel="noreferrer">
            {link.label} <Icon name="external" size={15} />
          </a>
        ))}
      </div>
      <Sticker kind="star" style={{ right: "9%", top: "8%", width: "14%", "--r": "12deg" }} />
      <Sticker kind="coin" style={{ left: "8%", bottom: "8%", width: "13%", "--r": "-10deg" }} />
    </div>,
    <div className="fgx-bk-back" key="back">
      <Image src="/assets/finn-badge.png" alt="" width={512} height={512} sizes="120px" />
      <p>FinGoose</p>
      <small>Silly goose, serious money.</small>
    </div>
  ];

  return (
    <div className="fgx-bookpeek">
      <div className="fgx-bookpeek-tabs" role="tablist" aria-label="Choose a book to preview">
        {BOOKS.map((b, i) => (
          <button
            key={b.slug}
            type="button"
            role="tab"
            aria-selected={i === active}
            className={`fgx-bookpeek-tab tone-${b.tone} ${i === active ? "is-active" : ""}`}
            onClick={() => setActive(i)}
          >
            <span className="fgx-bookpeek-thumb">
              <Image src={b.cover} alt="" width={120} height={122} sizes="56px" />
            </span>
            <span>
              <strong>{b.short}</strong>
              <small>{b.by}</small>
            </span>
          </button>
        ))}
      </div>
      <FlipBook key={book.slug} label={`Preview of ${book.title}`} ratio={1.015} maxPage={440} className="fgx-picture-book" hint="Click the cover to open the book">
        {pages}
      </FlipBook>
    </div>
  );
}
