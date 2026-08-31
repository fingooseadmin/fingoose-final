import { createPageMetadata } from "@/lib/seo";
import PageSeo from "@/components/PageSeo";
import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import Icon from "@/components/Icon";
import Reveal from "@/components/Reveal";
import TeamProfiles from "@/components/TeamProfiles";

const values = [
  {
    number: "01",
    title: "Equity",
    copy: "We start with fairness and access, addressing the root of the problem: wealth inequality.",
    icon: "globe",
    color: "blue"
  },
  {
    number: "02",
    title: "Rigor",
    copy: "We build our courses, curricula, guidebooks, and workbooks on standards-aligned financial education.",
    icon: "chart",
    color: "gold"
  },
  {
    number: "03",
    title: "Creativity",
    copy: "We teach through visuals, storytelling, animation, problem-solving, and engaging experiences.",
    icon: "spark",
    color: "orange"
  },
  {
    number: "04",
    title: "Opportunity",
    copy: "We open pathways to business, finance, financial literacy, leadership, and programs like DECA.",
    icon: "school",
    color: "violet"
  }
];

export const metadata = createPageMetadata({
  title: "About FinGoose’s Financial Literacy Mission",
  description:
    "Meet the student-led FinGoose team and learn how its mission, story, and values make practical financial literacy more accessible to K–12 students.",
  path: "/about"
});

export default function AboutPage() {
  return (
    <main className="scrapbook-site about-page">
      <PageSeo
        title="About FinGoose’s Financial Literacy Mission"
        description="Meet the student-led FinGoose team and learn how its mission, story, and values make practical financial literacy more accessible to K–12 students."
        path="/about"
        type="AboutPage"
      />
      <PageHero
        eyebrow="About FinGoose"
        title="A serious mission with a silly goose."
        description="Every idea starts somewhere. Here’s the story behind FinGoose—and the people turning financial knowledge into a fairer starting point."
        image="/assets/finn-presenting.png"
        primary="Read our story"
        primaryHref="#story"
        secondary="Meet the team"
        secondaryHref="#team"
      />

      <section className="section scrapbook-mission-section">
        <div className="container">
          <Reveal className="mission-note">
            <div className="mission-note-tape" aria-hidden="true" />
            <span className="sticker-label sticker-orange">Our mission</span>
            <h2>
              FinGoose’s mission is to combat wealth inequality by providing
              students with a rigorous, creative, and accessible financial
              literacy curriculum grounded in real-world learning.
            </h2>
            <Image
              alt=""
              src="/assets/finn-thinking.png"
              width={2048}
              height={2048}
              sizes="(max-width: 760px) 50vw, 340px"
            />
          </Reveal>
        </div>
      </section>

      <section className="section scrapbook-story-section" id="story">
        <div className="container story-scrap-grid">
          <Reveal className="founder-polaroid">
            <div className="polaroid-tape" aria-hidden="true" />
            <div className="founder-polaroid-art">
              <Image
                alt="Grace Zhou, FinGoose founder and CEO"
                src="/assets/grace-zhou.webp"
                width={2048}
                height={2048}
                sizes="(max-width: 760px) 72vw, 460px"
              />
            </div>
            <span>Founder’s notebook</span>
            <h2>Grace Zhou</h2>
            <p>
              Bergen County Academies · Academy of Business & Finance
            </p>
          </Reveal>

          <div className="story-notebook">
            <Reveal>
              <span className="sticker-label">Our story</span>
              <h2>Where economics, education, and creativity meet.</h2>
            </Reveal>
            <Reveal delay={60}>
              <p>
                FinGoose grew from Grace Zhou’s interests in economic justice,
                creative education, and the way financial systems shape a
                student’s opportunities.
              </p>
            </Reveal>
            <Reveal delay={110}>
              <p>
                She paired research and teaching with animation, video, and
                graphic design. The result is a learning system that turns
                difficult money ideas into visual, practical experiences.
              </p>
            </Reveal>
            <Reveal className="scrapbook-quote-note" delay={160}>
              <blockquote>
                “What started as a passion for global issues transformed into a
                hands-on mission to empower the next generation with the
                financial confidence they deserve.”
              </blockquote>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section scrapbook-values-section">
        <div className="container">
          <Reveal className="scrapbook-section-heading">
            <span className="sticker-label sticker-orange">Our values</span>
            <div>
              <h2>The rules behind every resource.</h2>
              <p>
                Playful on the surface, purposeful underneath. These four
                principles keep the work grounded.
              </p>
            </div>
          </Reveal>
          <div className="value-scrap-grid">
            {values.map((value, index) => (
              <Reveal delay={index * 65} key={value.title}>
                <article className={`value-scrap-card offer-${value.color}`}>
                  <div>
                    <span>{value.number}</span>
                    <Icon name={value.icon} />
                  </div>
                  <h3>{value.title}</h3>
                  <p>{value.copy}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section scrapbook-team-section" id="team">
        <div className="container">
          <Reveal className="scrapbook-section-heading">
            <span className="sticker-label">Meet the team</span>
            <div>
              <h2>The people behind the waddle.</h2>
              <p>
                Student-led, classroom-tested, and built across curriculum,
                creative media, technology, and live facilitation.
              </p>
            </div>
          </Reveal>
          <TeamProfiles />
          <Reveal className="team-scrap-cta">
            <p>Want to collaborate, host a workshop, or support the mission?</p>
            <Link className="button button-dark" href="/contact">
              Start a conversation <Icon name="arrow" />
            </Link>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
