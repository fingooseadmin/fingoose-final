import { createPageMetadata } from "@/lib/seo";
import PageSeo from "@/components/PageSeo";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import Icon from "@/components/Icon";
import Reveal from "@/components/Reveal";
import { WorkshopStory } from "@/components/EventStory";


export const metadata = createPageMetadata({
  title: "Financial Literacy Workshops for Schools",
  description:
    "Bring interactive financial literacy workshops and crisis labs to your school, where students practice budgeting, trade-offs, and real-world decisions.",
  path: "/resources/workshops"
});

export default function WorkshopsPage() {
  return (
    <main id="main-content" tabIndex={-1} className="scrapbook-site workshops-page">
      <PageSeo
        title="Financial Literacy Workshops for Schools"
        description="Bring interactive financial literacy workshops and crisis labs to your school, where students practice budgeting, trade-offs, and real-world decisions."
        path="/resources/workshops"
        type="CollectionPage"
        parents={[{name:"Resources",path:"/resources"}]}
      />
      <PageHero
        title="Workshops"
        description="Hands-on Crisis Lab workshops for middle schoolers."
        image="/assets/finn-crisis.webp"
        primary="Request a workshop"
        primaryHref="/contact?interest=workshop#contact-form"
        secondary="Read the story"
        secondaryHref="#workshop-story"
        tone="orange"
      />

      <section className="section fgx-es-section">
        <div className="container">
          <Reveal className="scrapbook-section-heading">
            <span className="sticker-label sticker-orange">The workshop story</span>
            <div>
              <h2>What happens when FinGoose visits.</h2>
              <p>Our 2025 Crisis Lab series, from the first pilot to our biggest room yet.</p>
            </div>
          </Reveal>
          <WorkshopStory />
        </div>
      </section>

      <section className="section workshop-fit-section">
        <div className="container workshop-fit-grid">
          <Reveal>
            <span className="sticker-label">Your school next?</span>
            <h2>Bring a Crisis Lab to your classroom.</h2>
            <p>We plan every visit around your students: their grade, the money decision they should practice, and a time that works for you.</p>
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
