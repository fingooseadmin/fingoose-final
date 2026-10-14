import Image from "next/image";
import Link from "@/components/StaticLink";
import Icon from "./Icon";
import Reveal from "./Reveal";
import styles from "./BookShowcase.module.css";

const dinoAmazonUrl = "https://www.amazon.com/dp/B0HCZ9H9J1";

const books = [
  {
    number: "01",
    title: "FinGoose and the Two Mornings",
    description: "The illustrated story introduces opportunity, fairness, and empathy in a way young readers can understand. Digital access is available free through Kobo.",
    image: "/assets/book-two-mornings-cover.webp",
    imageAlt: "Cover of FinGoose and the Two Mornings",
    coverLabel: "Children’s book · free eBook",
    tone: "gold",
    placeholder: false,
    actions: [
      { label: "Amazon Kindle", href: "https://www.amazon.com/dp/B0GDFQ682L", style: "button-dark" },
      { label: "Free Kobo eBook", href: "https://www.kobo.com/us/en/ebook/fingoose-and-the-two-mornings", style: "scrapbook-outline-button" }
    ],
    details: [
      { label: "Digital access", value: "Free Kobo eBook", copy: "Read the verified English digital edition." },
      { label: "Classroom copies", value: "Ask FinGoose", copy: "Contact the team about classroom availability." }
    ]
  },
  {
    number: "02",
    title: "FinGoose and the Dino Dream",
    description: "The second FinGoose picture book, a dinosaur story we use in library read-alouds. Available now on Amazon.",
    image: "/assets/book-dino-dream-cover.webp",
    imageAlt: "Cover of FinGoose and the Dino Dream",
    coverLabel: "Children's book · available now",
    tone: "blue",
    placeholder: false,
    actions: [
      { label: "View on Amazon", href: dinoAmazonUrl, style: "button-dark" }
    ],
    details: [
      { label: "Available now", value: "Amazon edition", copy: "Open the verified product listing." },
      { label: "Read-alouds", value: "Library visits", copy: "Contact FinGoose to bring the story to your library." }
    ]
  }
];

export default function BookShowcase({ context = "impact" }) {
  const resourcePage = context === "resources";

  return (
    <div className={styles.stack}>
      {books.map((book, index) => (
        <Reveal delay={index * 90} key={book.title}>
          <article className={styles.publication} id={`book-${book.number}`}>
            <div className={`${styles.cover} ${styles[book.tone]}`}>
              <span className="book-cover-tape" aria-hidden="true" />
              <Image alt={book.imageAlt} src={book.image} width={828} height={840} sizes="(max-width: 760px) 80vw, 310px" />
              {book.placeholder ? <strong className="book-cover-placeholder">Cover art in production</strong> : null}
              <small>{book.coverLabel}</small>
            </div>
            <div className={styles.copy}>
              <span className={`sticker-label ${index === 1 ? "sticker-orange" : ""}`}>Book {book.number} · Books & publications</span>
              <h2>{book.title}</h2>
              <p>{book.description}</p>
              <div className={styles.actions}>
                {book.actions.map((action) => (
                  <a className={`button ${action.style}`} href={action.href} target="_blank" rel="noreferrer" key={action.label}>
                    {action.label} <Icon name="external" />
                  </a>
                ))}
                {resourcePage && index === 0 ? (
                  <Link className="button button-gold" href="/contact?interest=books#contact-form">Ask about classroom copies <Icon name="arrow" /></Link>
                ) : null}
              </div>
              <div className={styles.details}>
                {book.details.map((detail) => (
                  <div key={detail.label}>
                    <span>{detail.label}</span>
                    <strong>{detail.value}</strong>
                    <p>{detail.copy}</p>
                  </div>
                ))}
              </div>
            </div>
          </article>
        </Reveal>
      ))}
    </div>
  );
}
