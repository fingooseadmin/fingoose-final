import Image from "next/image";
import Link from "@/components/StaticLink";
import Icon from "./Icon";
import Reveal from "./Reveal";

const dinoAmazonUrl = "https://www.amazon.com/Fingoose-Dino-Dream-Kevin-Wu/dp/B0HCZ9H9J1/ref=sr_1_1?crid=T1VXEGUTY7M2&dib=eyJ2IjoiMSJ9.agjHIrWhDkkR5p-Pbm5fJA.fnDxMTj7AftcafWS2EgxX4koydDlMeUUqhLZFGNzZ7w&dib_tag=se&keywords=fingoose+and+the+dino+dream&qid=1786322449&sprefix=fingoose+and+the+dino+dream%2Caps%2C162&sr=8-1";

const books = [
  {
    number: "01",
    title: "FinGoose and the Two Mornings",
    description: "The illustrated story introduces opportunity, fairness, and empathy in a way young readers can understand. Digital access is available free through Kobo.",
    image: "/assets/money-toast-stack.png",
    imageAlt: "Money toast illustration from FinGoose and the Two Mornings",
    coverLabel: "Children’s book · free eBook",
    tone: "gold",
    placeholder: false,
    actions: [
      { label: "Amazon Kindle", href: "https://www.amazon.com/dp/B0GDFQ682L", style: "button-dark" },
      { label: "Free Kobo eBook", href: "https://www.kobo.com/hk/en/ebook/fingoose-and-the-two-mornings", style: "scrapbook-outline-button" }
    ],
    details: [
      { label: "Digital access", value: "Free Kobo eBook", copy: "Read the verified English digital edition." },
      { label: "Classroom copies", value: "Ask FinGoose", copy: "Contact the team about classroom availability." }
    ]
  },
  {
    number: "02",
    title: "FinGoose and the Dino Dream",
    description: "The second FinGoose children's book is available through Amazon, with additional reading materials planned as the collection grows.",
    image: "/assets/goose-curious.png",
    imageAlt: "FinGoose and the Dino Dream cover artwork in production",
    coverLabel: "Children's book · cover art in production",
    tone: "blue",
    placeholder: true,
    actions: [
      { label: "View on Amazon", href: dinoAmazonUrl, style: "button-dark" }
    ],
    details: [
      { label: "Available now", value: "Amazon edition", copy: "Open the verified product listing." },
      { label: "Book preview", value: "Forthcoming", copy: "A verified preview will appear when the source file is available." }
    ]
  }
];

export default function BookShowcase({ context = "impact" }) {
  const resourcePage = context === "resources";

  return (
    <div className={`book-pair-grid book-pair-${context}`}>
      {books.map((book, index) => (
        <Reveal delay={index * 90} key={book.title}>
          <article className={`book-pair-card book-pair-${book.tone}`} id={`book-${book.number}`}>
            <div className={`book-pair-cover ${book.placeholder ? "is-placeholder" : ""}`}>
              <span className="book-cover-tape" aria-hidden="true" />
              <Image alt={book.imageAlt} src={book.image} width={2048} height={2048} sizes={resourcePage ? "(max-width: 760px) 82vw, 360px" : "(max-width: 760px) 82vw, 300px"} />
              {book.placeholder ? <strong className="book-cover-placeholder">Cover art in production</strong> : null}
              <small>{book.coverLabel}</small>
            </div>
            <div className="book-pair-copy">
              <span className={`sticker-label ${index === 1 ? "sticker-orange" : ""}`}>Book {book.number} · Books & publications</span>
              <h2>{book.title}</h2>
              <p>{book.description}</p>
              <div className="book-pair-actions">
                {book.actions.map((action) => (
                  <a className={`button ${action.style}`} href={action.href} target="_blank" rel="noreferrer" key={action.label}>
                    {action.label} <Icon name="external" />
                  </a>
                ))}
                {resourcePage && index === 0 ? (
                  <Link className="button button-gold" href="/contact?interest=books#contact-form">Ask about classroom copies <Icon name="arrow" /></Link>
                ) : null}
              </div>
              <div className="book-pair-details">
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
