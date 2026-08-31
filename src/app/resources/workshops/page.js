import { createPageMetadata } from "@/lib/seo";
import PageSeo from "@/components/PageSeo";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import Icon from "@/components/Icon";
import Reveal from "@/components/Reveal";
import WorkshopPolaroids from "@/components/WorkshopPolaroids";
import { workshopEvents } from "@/components/workshopData";

const workshopStats = [
  { value: "90+", label: "students reached", icon: "school" },
  { value: "03", label: "workshop labs", icon: "book" },
  { value: "50+", label: "learners in the largest visit", icon: "spark" }
];

export const metadata = createPageMetadata({
  title: "Financial Literacy Workshops for Schools",
  description:
    "Bring interactive financial literacy workshops and crisis labs to your school, where students practice budgeting, trade-offs, and real-world decisions.",
  path: "/resources/workshops"
});

export default function WorkshopsPage() {
  return (
    <main className="scrapbook-site">
      <PageSeo
        title="Financial Literacy Workshops for Schools"
        description="Bring interactive financial literacy workshops and crisis labs to your school, where students practice budgeting, trade-offs, and real-world decisions."
        path="/resources/workshops"
        type="CollectionPage"
        parents={[{name:"Resources",path:"/resources"}]}
      />
      <PageHero
        eyebrow="In-person workshops"
        title="A live money lab built around decisions."
        description="Students work through realistic scenarios, make trade-offs together, explain their reasoning, and leave with a stronger financial instinct."
        image="/assets/finn-crisis.png"
        primary="Request a workshop"
        primaryHref="/contact?interest=workshop#contact-form"
        secondary="See the field notes"
        secondaryHref="#workshop-gallery"
        tone="orange"
      />

      <section className="section workshop-detail-section" id="workshop-gallery">
        <div className="container">
          <Reveal className="scrapbook-section-heading">
            <span className="sticker-label sticker-orange">Workshop gallery</span>
            <div>
              <h2>Three visits. Three stories to open.</h2>
              <p>Browse the slideshow, then select a polaroid for the complete field note.</p>
            </div>
          </Reveal>
          <WorkshopPolaroids events={workshopEvents} compact />
        </div>
      </section>

      <section className="section workshop-detail-stats">
        <div className="container workshop-stat-grid">
          {workshopStats.map((stat, index) => (
            <Reveal delay={index * 70} key={stat.label}>
              <article>
                <Icon name={stat.icon} />
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section workshop-fit-section">
        <div className="container workshop-fit-grid">
          <Reveal>
            <span className="sticker-label">What a workshop does</span>
            <h2>Turns vocabulary into judgment.</h2>
            <p>Each visit combines a realistic prompt, a changing condition, team decisions, and a guided reflection. The goal is not simply recalling a definition—it is explaining why a choice works.</p>
          </Reveal>
          <Reveal className="workshop-question-card" delay={90}>
            <span>Quick workshop fit check</span>
            <h3>Tell us three things.</h3>
            <ol>
              <li>Who are the learners?</li>
              <li>Which money decision should they practice?</li>
              <li>When would you like the visit?</li>
            </ol>
            <Link className="button button-dark" href="/contact?interest=workshop#contact-form">
              Start the questionnaire <Icon name="arrow" />
            </Link>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
