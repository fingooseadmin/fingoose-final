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
import { PartnerStrip } from "@/components/Milestones";
import EventTimeline from "@/components/EventTimeline";
import "@/styles/timeline.css";

const metrics = [
  {
    value: "1,000+",
    label: "Students reached",
    note: "In person, through workshops, classroom visits, and events.",
    icon: "school",
    tone: "blue"
  },
  {
    value: "15M+",
    label: "Social media views",
    note: "Financial literacy videos reaching learners online.",
    icon: "spark",
    tone: "gold"
  },
  {
    value: "35K+",
    label: "Followers",
    note: "A growing community learning with FinGoose.",
    icon: "instagram",
    tone: "mint"
  },
  {
    value: "$10K+",
    label: "Raised",
    note: "To support FinGoose books, workshops, and programs.",
    icon: "chart",
    tone: "orange"
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
    <main id="main-content" tabIndex={-1} className="scrapbook-site impact-page">
      <PageSeo
        title="Financial Literacy Impact & Workshops"
        description="See how FinGoose financial literacy workshops, classroom visits, books, and interactive crisis labs help K–12 students build money confidence."
        path="/impact"
        type="CollectionPage"
      />
      <PageHero
        title="Our Impact"
        description="What FinGoose has done so far, and the results behind it."
        image="/assets/finn-striding.webp"
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
                From our first classroom workshop to more than 1,000 students
                reached in person, every number represents a learner who
                practiced making money choices in the real world.
              </p>
            </div>
            <div className="impact-stats-art impact-icon-cluster" aria-hidden="true">
              <span>FIELD NOTES · 2025–26</span>
              <i className="impact-orbit impact-orbit-one"><Icon name="school" /></i>
              <i className="impact-orbit impact-orbit-two"><Icon name="chart" /></i>
              <i className="impact-orbit impact-orbit-three"><Icon name="spark" /></i>
              <div className="impact-orbit-core">1K+</div>
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
              src="/assets/finn-waving.webp"
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

      <section className="section retention-section" aria-labelledby="retention-title">
        <div className="container retention-card">
          <Reveal className="retention-copy">
            <span className="sticker-label sticker-orange">The result</span>
            <h2 id="retention-title">Scores more than doubled.</h2>
            <p>
              Across our three Crisis Lab workshops (90+ middle school students
              at Charles DeWolf and Benjamin Franklin), the average score went
              from 43% on the pre-test to 93% on the post-test.
            </p>
          </Reveal>
          <Reveal className="retention-chart" delay={80}>
            <div className="retention-bars" role="img" aria-label="Average score: 43% before the workshops, 93% after">
              <div className="retention-bar is-before" style={{ "--h": "43%" }}>
                <strong>43%</strong>
                <span />
                <small>Pre-test</small>
              </div>
              <div className="retention-bar is-after" style={{ "--h": "93%" }}>
                <strong>93%</strong>
                <span />
                <small>Post-test</small>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section event-timeline-section has-timeline" id="timeline">
        <div className="container">
          <Reveal className="scrapbook-section-heading">
            <span className="sticker-label sticker-orange">Timeline</span>
            <div>
              <h2>Our timeline</h2>
              <p>From becoming a nonprofit in October 2025 to today. Tap a photo to see more.</p>
            </div>
          </Reveal>
          <EventTimeline />
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
              <h2>Putting FinGoose books into more hands.</h2>
              <p>
                We are preparing the next phase of paperback distribution,
                placing more accessible financial-literacy stories into
                classrooms and libraries.
              </p>
            </div>
            <div className="book-donation-photo">
              <Image
                alt="FinGoose financial-literacy book artwork"
                src="/assets/money-toast-stack.webp"
                width={2048}
                height={2048}
                sizes="(max-width: 760px) 70vw, 440px"
              />
            </div>
          </Reveal>

          <Reveal className="book-donation-panel book-donation-progress-panel" delay={70}>
            <div className="book-donation-progress">
              <ShipmentCountdown targetDate="2026-11-02T00:00:00-05:00" />
              <div className="button-row">
                <Link className="button button-gold" href="/contact">
                  Request books for your classroom <Icon name="arrow" />
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

      <PartnerStrip />

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
