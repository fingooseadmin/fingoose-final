import { createPageMetadata } from "@/lib/seo";
import PageSeo from "@/components/PageSeo";
import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import Icon from "@/components/Icon";
import Reveal from "@/components/Reveal";

const resourceCards = [
  {
    id: "curriculum",
    eyebrow: "For educators",
    title: "Curriculum & PDFs",
    copy: "Standards-minded lesson plans, worksheets, guidebooks, and workbooks organized for practical classroom use.",
    image: "/assets/finn-teacher.png",
    status: "Publishing pipeline",
    action: "Get PDF updates",
    href: "/resources/curriculum",
    color: "blue"
  },
  {
    id: "books",
    eyebrow: "For elementary learners",
    title: "Children’s books",
    copy: "Illustrated stories make opportunity, fairness, saving, and money choices easier to see and discuss.",
    image: "/assets/money-toast-stack.png",
    status: "Free eBook available",
    action: "View book options",
    href: "/resources/books",
    color: "gold"
  },
  {
    id: "course",
    eyebrow: "For middle & high school",
    title: "Online course",
    copy: "A 16-step path through budgeting, credit, investing, career decisions, practice prompts, and a final quiz.",
    image: "/assets/finn-thinking.png",
    status: "Live now",
    action: "Open course page",
    href: "/course",
    color: "violet"
  },
  {
    id: "workshops",
    eyebrow: "For schools & groups",
    title: "In-person workshops",
    copy: "Hands-on crisis labs turn real-world scenarios into teamwork, discussion, explanation, and confident decisions.",
    image: "/assets/finn-crisis.png",
    status: "Booking inquiries open",
    action: "Request a workshop",
    href: "/resources/workshops",
    color: "orange"
  },
  {
    id: "autism-kit",
    eyebrow: "Coming soon",
    title: "Autism learning kit",
    copy: "A sensory-aware resource concept using visual sequences, predictable routines, and flexible practical activities.",
    image: "/assets/goose-curious.png",
    status: "In development",
    action: "Join the interest list",
    href: "/resources/autism-kit",
    color: "blue"
  }
];

const method = [
  { number: "01", title: "See it", copy: "A visual, story, or familiar situation makes the concept concrete." },
  { number: "02", title: "Try it", copy: "A prompt or simulation asks the learner to make the choice." },
  { number: "03", title: "Explain it", copy: "Students name the trade-off and defend their reasoning." },
  { number: "04", title: "Use it", copy: "Reflection connects the lesson to everyday money behavior." }
];

export const metadata = createPageMetadata({
  title: "K–12 Financial Literacy Resources",
  description:
    "Explore K–12 financial literacy curriculum, worksheets, children’s books, workshops, a free online course, and an upcoming Autism learning kit.",
  path: "/resources"
});

export default function ResourcesPage() {
  return (
    <main className="scrapbook-site">
      <PageSeo
        title="K–12 Financial Literacy Resources"
        description="Explore K–12 financial literacy curriculum, worksheets, children’s books, workshops, a free online course, and an upcoming Autism learning kit."
        path="/resources"
        type="CollectionPage"
      />
      <PageHero
        eyebrow="Resources"
        title="A whole learning library, not one worksheet."
        description="Choose the format that fits: educator curricula, children’s books, a self-paced online course, live workshops, or the upcoming Autism learning kit."
        image="/assets/finn-teacher.png"
        primary="Browse the library"
        primaryHref="#library"
        secondary="Request a workshop"
        secondaryHref="/contact"
      />

      <section className="section resource-scrap-library" id="library">
        <div className="container">
          <Reveal className="scrapbook-section-heading">
            <span className="sticker-label">Resource library</span>
            <div>
              <h2>Every card opens the right page.</h2>
              <p>
                No mystery menus and no dead ends. Each resource clearly shows
                who it serves, its current status, and where to go next.
              </p>
            </div>
          </Reveal>
          <div className="resource-index-binder">
            <div className="index-binder-spine" aria-hidden="true">
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
            </div>
            <div className="resource-scrap-grid resource-index-deck" aria-label="Choose a FinGoose resource">
              {resourceCards.map((resource, index) => (
                <Reveal delay={index * 70} key={resource.id}>
                  <Link
                    className={`resource-scrap-card resource-index-card offer-${resource.color}`}
                    href={resource.href}
                    id={resource.id}
                    aria-label={`Select ${resource.title}: ${resource.action}`}
                  >
                    <span className="index-card-tab">{resource.eyebrow}</span>
                    <span className="index-card-hole" aria-hidden="true" />
                    <div className="resource-number">CARD 0{index + 1} / 05</div>
                    <div className="resource-scrap-art">
                      <Image
                        alt=""
                        src={resource.image}
                        width={2048}
                        height={2048}
                        sizes="(max-width: 760px) 42vw, 190px"
                      />
                    </div>
                    <div className="resource-scrap-copy">
                      <span className="micro-label">Select a resource</span>
                      <h2>{resource.title}</h2>
                      <p>{resource.copy}</p>
                      <div className="resource-status">
                        <span className="live-dot" />
                        {resource.status}
                      </div>
                      <span className="text-link">
                        {resource.action} <Icon name="arrow" />
                      </span>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
            <div className="index-deck-hint" aria-hidden="true">
              <span>Choose a card</span>
              <span>Scroll the ring-bound deck →</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section learner-paths-section">
        <div className="container learner-paths-grid">
          <Reveal className="learner-path-note" id="elementary">
            <span className="sticker-label sticker-orange">Elementary · K–5</span>
            <h2>A joyful first step into money.</h2>
            <p>
              Stories, illustrations, and age-appropriate activities introduce
              earning, saving, sharing, needs versus wants, and simple planning.
            </p>
            <Image
              alt=""
              src="/assets/apron-goose-cutout.png"
              width={1024}
              height={1024}
              sizes="(max-width: 760px) 46vw, 280px"
            />
          </Reveal>
          <Reveal className="learner-path-note path-middle" delay={80}>
            <span className="sticker-label">Middle & high school</span>
            <h2>Real decisions, safely practiced.</h2>
            <p>
              Budgeting, emergency funds, consumer persuasion, borrowing,
              credit, investing, future goals, and career decisions become
              active problems to solve.
            </p>
            <Image
              alt=""
              src="/assets/finn-thinking.png"
              width={2048}
              height={2048}
              sizes="(max-width: 760px) 46vw, 280px"
            />
          </Reveal>
        </div>
      </section>

      <section className="section method-scrap-section">
        <div className="container">
          <Reveal className="scrapbook-section-heading">
            <span className="sticker-label sticker-orange">The FinGoose method</span>
            <div>
              <h2>Understanding becomes action in four moves.</h2>
              <p>
                Every format—from a book to a workshop—uses the same practical
                learning loop.
              </p>
            </div>
          </Reveal>
          <div className="method-scrap-grid">
            {method.map((item, index) => (
              <Reveal delay={index * 55} key={item.number}>
                <article>
                  <span>{item.number}</span>
                  <h3>{item.title}</h3>
                  <p>{item.copy}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section ebook-desk-section" id="book-links">
        <div className="container ebook-desk-shell">
          <Reveal className="ebook-desk-heading">
            <span className="sticker-label">Books & free reading</span>
            <div>
              <h2>Two FinGoose stories. Pick your next read.</h2>
              <p>
                Open the complete book library, buy a published edition, or
                read the verified free eBook that is available now.
              </p>
            </div>
          </Reveal>

          <div className="ebook-resource-grid">
            <Reveal>
              <article className="ebook-resource-card ebook-resource-card-free">
                <span className="ebook-card-icon" aria-hidden="true">
                  <Icon name="book" size={25} />
                </span>
                <span className="micro-label">Book 01 · Free eBook available</span>
                <h3>FinGoose and the Two Mornings</h3>
                <p>
                  A picture book about opportunity, fairness, empathy, and the
                  money choices young readers see around them.
                </p>
                <div className="ebook-card-actions">
                  <a
                    className="button button-gold"
                    href="https://www.kobo.com/hk/en/ebook/fingoose-and-the-two-mornings"
                    rel="noreferrer"
                    target="_blank"
                  >
                    Read the free eBook <Icon name="external" />
                  </a>
                  <Link className="ebook-text-link" href="/resources/books">
                    Book details <Icon name="arrow" />
                  </Link>
                </div>
              </article>
            </Reveal>

            <Reveal delay={80}>
              <article className="ebook-resource-card ebook-resource-card-new">
                <span className="ebook-card-icon" aria-hidden="true">
                  <Icon name="book" size={25} />
                </span>
                <span className="micro-label">Book 02 · New release</span>
                <h3>FinGoose and the Dino Dream</h3>
                <p>
                  The newest FinGoose children’s story is available on Amazon.
                  Its free eBook link will appear here when an edition is ready.
                </p>
                <div className="ebook-card-actions">
                  <a
                    className="button button-dark"
                    href="https://www.amazon.com/Fingoose-Dino-Dream-Kevin-Wu/dp/B0HCZ9H9J1/ref=sr_1_1?crid=T1VXEGUTY7M2&dib=eyJ2IjoiMSJ9.agjHIrWhDkkR5p-Pbm5fJA.fnDxMTj7AftcafWS2EgxX4koydDlMeUUqhLZFGNzZ7w&dib_tag=se&keywords=fingoose+and+the+dino+dream&qid=1786322449&sprefix=fingoose+and+the+dino+dream%2Caps%2C162&sr=8-1"
                    rel="noreferrer"
                    target="_blank"
                  >
                    View on Amazon <Icon name="external" />
                  </a>
                  <Link className="ebook-text-link" href="/resources/books">
                    Book details <Icon name="arrow" />
                  </Link>
                </div>
              </article>
            </Reveal>
          </div>

          <Reveal className="ebook-library-route" delay={120}>
            <span>Need cover details, classroom copies, or future editions?</span>
            <Link className="button scrapbook-outline-button" href="/resources/books">
              Open the two-book library <Icon name="arrow" />
            </Link>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
