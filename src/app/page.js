import JsonLd from "@/components/JsonLd";
import Link from "next/link";
import BudgetLab from "@/components/BudgetLab";
import FlowWords from "@/components/FlowWords";
import Icon from "@/components/Icon";
import Reveal from "@/components/Reveal";
import ScrapbookHeroPage from "@/components/ScrapbookHeroPage";
import MilestonesSection, { PartnerStrip } from "@/components/Milestones";
import TestimonialSlider from "@/components/TestimonialSlider";
import UpcomingEvent from "@/components/UpcomingEvent";
import WhatWeDo from "@/components/WhatWeDo";
import CameraRoll from "@/components/CameraRoll";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Financial Literacy for Kids & Teens",
  description: "FinGoose makes money skills practical for K–12 students through free financial literacy lessons, school workshops, children's books, and student-led chapters.",
  path: "/"
});

const homeStructuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://fingoose.com/#website",
      url: "https://fingoose.com/",
      name: "FinGoose",
      alternateName: "Fin Goose",
      inLanguage: "en-US",
      publisher: { "@id": "https://fingoose.com/#organization" },
      about: { "@id": "https://fingoose.com/#organization" },
      description:
        "FinGoose offers K–12 financial literacy curriculum, children’s books, classroom workshops, crisis labs, and free online learning."
    },
    {
      "@type": "EducationalOrganization",
      "@id": "https://fingoose.com/#organization",
      name: "FinGoose",
      url: "https://fingoose.com/",
      logo: "https://fingoose.com/assets/finn-badge.png",
      image: "https://fingoose.com/og.png",
      slogan: "Silly goose, serious money",
      description:
        "FinGoose makes financial literacy fun, accessible, and relevant for K–12 students through curriculum, stories, workshops, and online learning.",
      email: "fin.goose.co@gmail.com",
      areaServed: {
        "@type": "Country",
        name: "United States"
      },
      audience: {
        "@type": "EducationalAudience",
        educationalRole: ["student", "teacher", "parent"]
      },
      knowsAbout: [
        "K–12 financial literacy",
        "budgeting",
        "saving",
        "credit",
        "investing",
        "financial decision-making"
      ],
      sameAs: ["https://www.instagram.com/fin.goose/"]
    }
  ]
};
const stats = [
  { value: "1K+", label: "students reached at events" },
  { value: "$10K+", label: "raised for financial literacy" },
  { value: "15M+", label: "social media views" },
  { value: "35K+", label: "followers" }
];

export default function HomePage() {
  return (
    <main id="main-content" tabIndex={-1} className="scrapbook-site home-scrapbook-site">
      <JsonLd data={homeStructuredData} />
      <section className="scrapbook-home-hero">
        <div className="paper-noise" aria-hidden="true" />
        <div className="container scrapbook-hero-grid">
          <div className="scrapbook-hero-copy">
            <h1 className="hero-wordmark">
              <span>FinGoose</span>
            </h1>
            <div className="hero-mission-note">
              <span className="scrap-tape scrap-tape-mission" aria-hidden="true" />
              <p className="hero-mission">
                FinGoose’s mission is to make financial literacy fun, accessible,
                and real-world–relevant for K-12 students. Through interactive
                course lessons, storytelling in our E-Workbook, and hands-on
                crisis labs in our workshops, we turn money skills into engaging,
                practical learning. By blending creative teaching with DECA’s
                applied business focus, FinGoose prepares the next generation to
                think critically, solve problems, and make confident financial
                decisions in daily life.
              </p>
            </div>
            <div className="button-row">
              <a className="button button-gold tape-button" href="#milestones">
                See what we’ve built <Icon name="arrow" />
              </a>
              <Link className="button scrapbook-outline-button" href="/resources">
                Explore resources <Icon name="book" />
              </Link>
            </div>
            <div className="hero-mini-proof">
              <span>Student-led</span>
              <i />
              <span>Classroom-tested</span>
              <i />
              <span>Built for real life</span>
            </div>
          </div>
          <ScrapbookHeroPage />
        </div>
        <div className="hero-grand-ribbon" aria-hidden="true">
          <div>
            <span>Learn it <i>•</i> Test it <i>•</i> Use it <i>•</i> Money skills for real life <i>•</i></span>
            <span>Learn it <i>•</i> Test it <i>•</i> Use it <i>•</i> Money skills for real life <i>•</i></span>
            <span>Learn it <i>•</i> Test it <i>•</i> Use it <i>•</i> Money skills for real life <i>•</i></span>
            <span>Learn it <i>•</i> Test it <i>•</i> Use it <i>•</i> Money skills for real life <i>•</i></span>
          </div>
        </div>
      </section>

      <section className="scrapbook-stats" aria-label="FinGoose key figures">
        <div className="container">
          <div className="stats-paper">
            <div className="paper-clip" aria-hidden="true" />
            <div className="stats-intro scrapbook-stat-intro">
              <span className="sticker-label sticker-orange">Field notes</span>
              <p>Small team. Real classrooms. Growing reach.</p>
            </div>
            {stats.map((stat) => (
              <article className="scrap-stat" key={stat.label}>
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      <WhatWeDo />

      <MilestonesSection
        heading="The big wins so far."
        intro="Founded by Grace Zhou as a high school student, FinGoose has grown from one DECA project into a nonprofit with partners, published books, and student chapters in three countries."
        moreHref="/impact/#timeline"
        moreLabel="See the full timeline"
      />

      <section className="section fgx-roll-section" id="camera-roll">
        <div className="container">
          <Reveal className="fgx-roll-heading">
            <span className="sticker-label">Camera roll</span>
            <h2><FlowWords>Moments from FinGoose.</FlowWords></h2>
            <p>Workshops, read-alouds, bake sales, and everything in between. Tap a photo to see it bigger.</p>
          </Reveal>
        </div>
        <CameraRoll />
      </section>

      <UpcomingEvent />

      <PartnerStrip />

      <section className="scrapbook-testimonial">
        <div className="container">
          <TestimonialSlider />
        </div>
      </section>

      <section className="section scrapbook-lab-section">
        <div className="container scrapbook-lab-grid">
          <Reveal className="scrapbook-lab-copy">
            <span className="sticker-label sticker-orange">Try a crisis lab</span>
            <h2><FlowWords>The plan changed. What would you do?</FlowWords></h2>
            <p>
              FinGoose workshops make the unexpected part of the lesson.
              Students rebalance a plan, explain the trade-off, and see how
              strong decisions are built.
            </p>
            <ul className="marker-list">
              <li><span>01</span> Build the budget</li>
              <li><span>02</span> Face the surprise</li>
              <li><span>03</span> Defend the decision</li>
            </ul>
          </Reveal>
          <Reveal className="lab-demo scrapbook-lab-demo" delay={90}>
            <div className="masking-tape" aria-hidden="true" />
            <BudgetLab />
            <div className="lab-link-row">
              <Link className="button button-gold" href="/course">
                Open the online course <Icon name="play" />
              </Link>
              <Link className="button lab-outline-button" href="/contact?interest=workshop#contact-form">
                Book an in-person workshop <Icon name="arrow" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>


    </main>
  );
}
