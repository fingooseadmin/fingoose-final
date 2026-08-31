import JsonLd from "@/components/JsonLd";
import Image from "next/image";
import Link from "next/link";
import BudgetLab from "@/components/BudgetLab";
import FlowWords from "@/components/FlowWords";
import Icon from "@/components/Icon";
import MotionReels from "@/components/MotionReels";
import Reveal from "@/components/Reveal";
import RotatingScrapbook from "@/components/RotatingScrapbook";
import ScrapbookOrbit from "@/components/ScrapbookOrbit";
import TestimonialSlider from "@/components/TestimonialSlider";

const homeStructuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://fingoose.org/#website",
      url: "https://fingoose.org/",
      name: "FinGoose",
      alternateName: "Fin Goose",
      inLanguage: "en-US",
      publisher: { "@id": "https://fingoose.org/#organization" },
      about: { "@id": "https://fingoose.org/#organization" },
      description:
        "FinGoose offers K–12 financial literacy curriculum, children’s books, classroom workshops, crisis labs, and free online learning."
    },
    {
      "@type": "EducationalOrganization",
      "@id": "https://fingoose.org/#organization",
      name: "FinGoose",
      url: "https://fingoose.org/",
      logo: "https://fingoose.org/assets/finn-badge.png",
      image: "https://fingoose.org/og.png",
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
      sameAs: [
        "https://www.fingoose.com/",
        "https://www.instagram.com/fin.goose/"
      ]
    }
  ]
};
const stats = [
  { value: "90+", label: "students reached" },
  { value: "50+", label: "learners in our largest visit" },
  { value: "03", label: "interactive workshops" },
  { value: "16", label: "online course steps" }
];

const offerings = [
  {
    label: "Educators",
    title: "Curricula & classroom tools",
    icon: "school",
    href: "/resources/curriculum",
    color: "blue",
    tilt: "left"
  },
  {
    label: "Schools & groups",
    title: "In-person workshops",
    icon: "chart",
    href: "/resources/workshops",
    color: "orange"
  },
  {
    label: "Middle & high school",
    title: "Online course",
    icon: "play",
    href: "/course",
    color: "violet",
    tilt: "right"
  },
  {
    label: "Elementary",
    title: "Children’s books",
    icon: "book",
    href: "/resources/books",
    color: "gold",
    tilt: "left"
  },
  {
    label: "Coming soon",
    title: "Autism learning kit",
    icon: "heart",
    href: "/resources/autism-kit",
    color: "mint",
    tilt: "right"
  }
];

const impactCards = [
  {
    kicker: "CDW · 11.10.25",
    title: "Financial resilience lab",
    image: "/assets/workshop-financial-resilience.webp",
    alt: "FinGoose educators leading a classroom presentation",
    icon: "shield",
    className: "collage-blue"
  },
  {
    kicker: "CDW · 12.15.25",
    title: "Smarter consumer decisions",
    image: "/assets/workshop-money-decisions.webp",
    alt: "Students practicing money decisions during a FinGoose workshop",
    icon: "spark",
    className: "collage-orange"
  },
  {
    kicker: "BFMS · 12.17.25",
    title: "Our largest visit yet",
    image: "/assets/workshop-money-management.webp",
    alt: "Students presenting a money management lesson",
    icon: "school",
    className: "collage-gold"
  }
];

export default function HomePage() {
  return (
    <main className="scrapbook-site home-scrapbook-site">
      <JsonLd data={homeStructuredData} />
      <section className="scrapbook-home-hero">
        <div className="paper-noise" aria-hidden="true" />
        <div className="doodle doodle-one" aria-hidden="true">+$</div>
        <div className="doodle doodle-two" aria-hidden="true">↗</div>
        <div className="container scrapbook-hero-grid">
          <div className="scrapbook-hero-copy">
            <span className="sticker-label">K–12 financial literacy, reimagined</span>
            <h1>
              <span>FinGoose.</span>
              Silly goose,
              <strong>serious money.</strong>
            </h1>
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
            <div className="button-row">
              <Link
                className="button button-gold tape-button"
                href="/contact?interest=autism-kit#contact-form"
              >
                Sign up for the Autism Kit <Icon name="arrow" />
              </Link>
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
          <ScrapbookOrbit />
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

      <section className="section kit-preview-section library-visit-preview">
        <div className="container">
          <Reveal className="kit-preview-card kit-preview-compact">
            <div className="kit-sticker" aria-hidden="true">NEW</div>
            <div className="kit-preview-copy">
              <span className="eyebrow">New book · library visits</span>
              <h2><FlowWords>Bring a FinGoose read-aloud to your library.</FlowWords></h2>
              <p>
                Invite FinGoose for a lively reading of the new book, a guided
                money conversation, and an age-friendly activity that turns the
                story into something young learners can use.
              </p>
              <Link className="button button-dark" href="/contact?interest=library-visit#contact-form">
                Plan a library visit <Icon name="arrow" />
              </Link>
            </div>
            <div className="kit-preview-art" aria-label="The three parts of a FinGoose library read-aloud">
              <span className="kit-art-label">A story that keeps moving</span>
              <div className="kit-sequence-card kit-sequence-one">
                <Icon name="book" />
                <span>Read</span>
              </div>
              <div className="kit-sequence-line" aria-hidden="true" />
              <div className="kit-sequence-card kit-sequence-two">
                <Icon name="spark" />
                <span>Talk</span>
              </div>
              <div className="kit-sequence-card kit-sequence-three">
                <Icon name="check" />
                <span>Try</span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section provide-section" id="what-we-provide">
        <div className="container">
          <Reveal className="scrapbook-section-heading provide-heading-compact">
            <span className="sticker-label">What we provide</span>
            <div>
              <h2><FlowWords>Pick the page that fits your learner.</FlowWords></h2>
              <p>
                Choose a post-it based on your needs—from educator tools and
                children’s books to workshops and the complete online course.
              </p>
            </div>
          </Reveal>
          <div className="postit-path-grid">
            {offerings.map((item, index) => (
              <Reveal delay={index * 55} key={item.title}>
                <Link
                  className={`postit-path-card postit-${item.color} postit-${item.tilt || "center"}`}
                  href={item.href}
                >
                  <span className="offer-index">0{index + 1}</span>
                  <div className="postit-icon"><Icon name={item.icon} /></div>
                  <span className="postit-label">{item.label}</span>
                  <h3>{item.title}</h3>
                  <strong aria-hidden="true"><Icon name="arrow" size={18} /></strong>
                </Link>
              </Reveal>
            ))}
          </div>
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

      <section className="section rotating-scrapbook-section">
        <div className="container">
          <Reveal>
            <RotatingScrapbook />
          </Reveal>
        </div>
      </section>

      <section className="section motion-reels-section">
        <div className="container">
          <Reveal>
            <MotionReels />
          </Reveal>
        </div>
      </section>

      <section className="section scrapbook-impact-preview">
        <div className="container">
          <Reveal className="scrapbook-section-heading impact-heading">
            <span className="sticker-label">Our impact</span>
            <div>
              <h2><FlowWords>Proof from the classroom.</FlowWords></h2>
              <Link className="text-link" href="/impact">
                Learn more <Icon name="arrow" />
              </Link>
            </div>
          </Reveal>
          <div className="impact-collage">
            {impactCards.map((card, index) => (
              <Reveal delay={index * 80} key={card.kicker}>
                <article className={`impact-polaroid ${card.className}`}>
                  <div className="polaroid-tape" aria-hidden="true" />
                  <div className="polaroid-image">
                    <Image
                      alt={card.alt}
                      src={card.image}
                      width={2048}
                      height={2048}
                      sizes="(max-width: 700px) calc(100vw - 64px), (max-width: 920px) 46vw, 470px"
                    />
                    <span className="impact-card-icon"><Icon name={card.icon} /></span>
                  </div>
                  <span>{card.kicker}</span>
                  <h3>{card.title}</h3>
                </article>
              </Reveal>
            ))}
          </div>
          <Reveal className="impact-preview-footer" delay={220}>
            <p>Each field note holds one real classroom decision.</p>
            <Link className="button button-dark" href="/impact">
              See the full impact scrapbook <Icon name="arrow" />
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="scrapbook-testimonial">
        <div className="container">
          <TestimonialSlider />
        </div>
      </section>

      <section className="section scrapbook-close">
        <div className="container">
          <div className="scrapbook-close-card">
            <span className="sticker-label sticker-orange">Next step</span>
            <h2><FlowWords>Make money skills feel possible.</FlowWords></h2>
            <p>
              Learn online, bring FinGoose to a classroom, or help keep
              accessible financial education growing.
            </p>
            <div className="button-row">
              <Link className="button button-gold" href="/course">
                Start the course <Icon name="arrow" />
              </Link>
              <Link className="button scrapbook-outline-button light" href="/donate">
                Support FinGoose <Icon name="heart" />
              </Link>
            </div>
            <Image
              alt=""
              src="/assets/finn-full.png"
              width={2048}
              height={2048}
              sizes="(max-width: 760px) 52vw, 320px"
            />
          </div>
        </div>
      </section>
    </main>
  );
}
