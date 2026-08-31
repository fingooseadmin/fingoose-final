import { createPageMetadata } from "@/lib/seo";
import PageSeo from "@/components/PageSeo";
import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import Icon from "@/components/Icon";
import ImpactReels from "@/components/ImpactReels";
import Reveal from "@/components/Reveal";
import WorkshopPolaroids from "@/components/WorkshopPolaroids";
import { workshopEvents } from "@/components/workshopData";
import BookShowcase from "@/components/BookShowcase";
import ShipmentCountdown from "@/components/ShipmentCountdown";

const metrics = [
  {
    value: "90+",
    label: "Students reached",
    note: "Across hands-on financial literacy workshops.",
    icon: "school",
    tone: "blue"
  },
  {
    value: "50+",
    label: "Largest visit",
    note: "Learners working together across two classrooms.",
    icon: "spark",
    tone: "gold"
  },
  {
    value: "03",
    label: "Workshop labs",
    note: "Delivered during FinGoose’s launch season.",
    icon: "book",
    tone: "mint"
  },
  {
    value: "200",
    label: "Next reach goal",
    note: "Our student target through Project S.O.A.R.",
    icon: "chart",
    tone: "orange",
    progress: 45
  }
];

export const metadata = createPageMetadata({
  title: "Financial Literacy Impact & Workshops",
  description:
    "See how FinGoose financial literacy workshops, classroom visits, books, and interactive crisis labs help K–12 students build money confidence.",
  path: "/impact"
});

export default function ImpactPage() {
  return (
    <main className="scrapbook-site impact-page">
      <PageSeo
        title="Financial Literacy Impact & Workshops"
        description="See how FinGoose financial literacy workshops, classroom visits, books, and interactive crisis labs help K–12 students build money confidence."
        path="/impact"
        type="CollectionPage"
      />
      <PageHero
        eyebrow="Our impact"
        title="Field notes from the money lab."
        description="Every workshop gives students a real choice to test, a trade-off to explain, and a stronger financial instinct to take with them."
        image="/assets/finn-striding.png"
        primary="Bring us to your school"
        primaryHref="/contact"
        secondary="Explore resources"
        secondaryHref="/resources"
        tone="impact"
      />

      <section className="section impact-scrap-stats">
        <div className="container impact-stat-board">
          <Reveal className="impact-stats-story">
            <div className="impact-stats-copy">
              <span className="sticker-label sticker-orange">Impact at a glance</span>
              <h2>Growing one confident decision at a time.</h2>
              <p>
                From the first workshop to the next 200 students, every number
                represents a learner who practiced making money choices in the
                real world.
              </p>
            </div>
            <div className="impact-stats-art impact-icon-cluster" aria-hidden="true">
              <span>FIELD NOTES · 2025–26</span>
              <i className="impact-orbit impact-orbit-one"><Icon name="school" /></i>
              <i className="impact-orbit impact-orbit-two"><Icon name="chart" /></i>
              <i className="impact-orbit impact-orbit-three"><Icon name="spark" /></i>
              <div className="impact-orbit-core">90+</div>
            </div>
          </Reveal>

          <div className="impact-metric-grid">
            {metrics.map((metric, index) => (
              <Reveal delay={index * 60} key={metric.label}>
                <article className={`impact-metric-card metric-${metric.tone}`}>
                  <div className="impact-metric-top">
                    <span className="impact-metric-icon">
                      <Icon name={metric.icon} size={22} />
                    </span>
                    <span className="impact-metric-index">0{index + 1}</span>
                  </div>
                  <strong>{metric.value}</strong>
                  <h3>{metric.label}</h3>
                  <p>{metric.note}</p>
                  {metric.progress ? (
                    <div className="impact-goal-meter">
                      <div aria-hidden="true">
                        <span style={{ width: `${metric.progress}%` }} />
                      </div>
                      <small>{metric.progress}% of the next goal reached</small>
                    </div>
                  ) : null}
                </article>
              </Reveal>
            ))}
          </div>
          <Reveal className="impact-after-four" delay={120}>
            <Image
              alt=""
              src="/assets/finn-waving.png"
              width={2048}
              height={2048}
              sizes="(max-width: 620px) 170px, 230px"
            />
            <div>
              <span>Four numbers. One direction.</span>
              <strong>More confident decisions, one classroom at a time.</strong>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section impact-gallery-section" id="workshop-field-notes">
        <div className="container">
          <Reveal className="scrapbook-section-heading">
            <span className="sticker-label sticker-orange">Workshop scrapbook</span>
            <div>
              <h2>Open the field notes.</h2>
              <p>
                These larger workshop polaroids hold the story behind each
                visit. Select one to read what students practiced and learned.
              </p>
            </div>
          </Reveal>
          <WorkshopPolaroids events={workshopEvents} />
        </div>
      </section>

      <section className="section book-impact-section">
        <div className="container-wide impact-book-library">
          <BookShowcase context="impact" />
        </div>
      </section>

      <section className="section book-donation-section">
        <div className="container book-donation-stack">
          <Reveal className="book-donation-panel book-donation-intro-panel">
            <div className="book-donation-copy">
              <span className="sticker-label sticker-orange">Next print run</span>
              <h2>Help put a FinGoose book into more hands.</h2>
              <p>
                We are preparing the next phase of paperback distribution. Your
                support can help fund future print runs and place more accessible
                financial-literacy stories into classrooms.
              </p>
            </div>
            <div className="book-donation-photo">
              <Image
                alt="FinGoose financial-literacy book artwork"
                src="/assets/money-toast-stack.png"
                width={2048}
                height={2048}
                sizes="(max-width: 760px) 70vw, 440px"
              />
            </div>
          </Reveal>

          <Reveal className="book-donation-panel book-donation-progress-panel" delay={70}>
            <div className="book-donation-progress">
              <ShipmentCountdown />
              <div className="button-row">
                <Link className="button button-gold" href="/donate">
                  Support FinGoose books <Icon name="heart" />
                </Link>
              </div>
            </div>
            <div className="book-donation-visual">
              <div className="donation-book donation-book-one">
                <Icon name="book" />
                <span>Read</span>
              </div>
              <div className="donation-book donation-book-two">
                <Icon name="heart" />
                <span>Share</span>
              </div>
              <div className="donation-route" aria-hidden="true" />
              <strong>Books → classrooms</strong>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section impact-social-section" id="field-notes-in-motion">
        <div className="container-wide">
          <ImpactReels />
        </div>
      </section>

      <section className="section impact-next-step">
        <div className="container team-scrap-cta">
          <p>Want your school in the next field note?</p>
          <Link className="button button-dark" href="/contact">
            Request a workshop <Icon name="arrow" />
          </Link>
        </div>
      </section>
    </main>
  );
}
