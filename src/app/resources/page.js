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
    title: "Curriculum & classroom tools",
    copy: "Standards-minded lesson plans, worksheets, guidebooks, and workbooks organized for practical classroom use.",
    image: "/assets/finn-teacher.webp",
    status: "Guide previews available",
    action: "Explore the curriculum",
    href: "/resources/curriculum",
    color: "blue"
  },
  {
    id: "books",
    eyebrow: "For elementary learners",
    title: "Children’s books",
    copy: "Illustrated stories make opportunity, fairness, saving, and money choices easier to see and discuss.",
    image: "/assets/book-two-mornings-cover.webp",
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
    image: "/assets/finn-thinking.webp",
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
    image: "/assets/workshop-financial-resilience.webp",
    status: "Booking inquiries open",
    action: "Request a workshop",
    href: "/resources/workshops",
    color: "orange"
  }
];


export const metadata = createPageMetadata({
  title: "K–12 Financial Literacy Resources",
  description:
    "Explore K–12 financial literacy curriculum, worksheets, children’s books, workshops, and a free online course.",
  path: "/resources"
});

export default function ResourcesPage() {
  return (
    <main id="main-content" tabIndex={-1} className="scrapbook-site resources-page">
      <PageSeo
        title="K–12 Financial Literacy Resources"
        description="Explore K–12 financial literacy curriculum, worksheets, children’s books, workshops, and a free online course."
        path="/resources"
        type="CollectionPage"
      />
      <PageHero
        eyebrow="Resources"
        title="A whole learning library, not one worksheet."
        description="Choose the format that fits: educator curricula, children’s books, a self-paced online course, or live workshops."
        image="/assets/finn-teacher.webp"
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
              <h2>Find your starting point.</h2>
              <p>
                Lesson plans, stories, and hands-on experiences for every stage of learning.
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
                    <div className={`resource-scrap-art resource-image-${resource.id}`}>
                      <Image
                        alt=""
                        src={resource.image}
                        width={2048}
                        height={2048}
                        sizes="(max-width: 760px) 42vw, 190px"
                      />
                    </div>
                    <div className="resource-scrap-copy">
                      <h2>{resource.title}</h2>
                      <p>{resource.copy}</p>
                      <div className="resource-status">
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

    </main>
  );
}
