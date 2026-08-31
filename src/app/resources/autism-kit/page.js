import { createPageMetadata } from "@/lib/seo";
import PageSeo from "@/components/PageSeo";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import Icon from "@/components/Icon";
import Reveal from "@/components/Reveal";

const sequence = [
  { number: "01", title: "See the routine", copy: "A consistent visual sequence makes the activity easier to anticipate." },
  { number: "02", title: "Make one choice", copy: "Flexible prompts reduce noise and keep attention on the practical decision." },
  { number: "03", title: "Practice safely", copy: "Repeatable scenarios create room to build confidence at a comfortable pace." }
];

export const metadata = createPageMetadata({
  title: "Autism Financial Literacy Learning Kit",
  description:
    "Join updates for FinGoose’s sensory-aware Autism financial literacy kit, designed around visual sequencing, predictable routines, and practical money skills.",
  path: "/resources/autism-kit"
});

export default function AutismKitPage() {
  return (
    <main className="scrapbook-site">
      <PageSeo
        title="Autism Financial Literacy Learning Kit"
        description="Join updates for FinGoose’s sensory-aware Autism financial literacy kit, designed around visual sequencing, predictable routines, and practical money skills."
        path="/resources/autism-kit"
        type="WebPage"
        parents={[{name:"Resources",path:"/resources"}]}
      />
      <PageHero
        eyebrow="Autism learning kit · in development"
        title="A more predictable path into money confidence."
        description="FinGoose is shaping a sensory-aware resource concept around visual sequencing, repeatable routines, and flexible practical activities."
        image="/assets/goose-curious.png"
        primary="Join the interest list"
        primaryHref="/contact?interest=autism-kit#contact-form"
        secondary="All resources"
        secondaryHref="/resources"
      />

      <section className="section autism-sequence-section">
        <div className="container">
          <Reveal className="scrapbook-section-heading">
            <span className="sticker-label sticker-orange">The working concept</span>
            <div>
              <h2>Clear steps. Flexible pacing.</h2>
              <p>The full kit is still in development. These are the design principles guiding the work.</p>
            </div>
          </Reveal>
          <div className="autism-sequence-grid">
            {sequence.map((item, index) => (
              <Reveal delay={index * 70} key={item.number}>
                <article>
                  <span>{item.number}</span>
                  <h2>{item.title}</h2>
                  <p>{item.copy}</p>
                </article>
              </Reveal>
            ))}
          </div>
          <Reveal className="resource-detail-cta" delay={130}>
            <p>Want launch updates or have educator feedback to share?</p>
            <Link className="button button-dark" href="/contact?interest=autism-kit#contact-form">
              Join the interest list <Icon name="arrow" />
            </Link>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
