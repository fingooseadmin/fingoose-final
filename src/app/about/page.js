import { createPageMetadata } from "@/lib/seo";
import PageSeo from "@/components/PageSeo";
import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import Icon from "@/components/Icon";
import Reveal from "@/components/Reveal";
import TeamProfiles from "@/components/TeamProfiles";

export const metadata = createPageMetadata({
  title: "About FinGoose’s Financial Literacy Mission",
  description:
    "Meet the student-led FinGoose team and learn how its mission, story, and values make practical financial literacy more accessible to K–12 students.",
  path: "/about"
});

export default function AboutPage() {
  return (
    <main id="main-content" tabIndex={-1} className="scrapbook-site about-page">
      <PageSeo
        title="About FinGoose’s Financial Literacy Mission"
        description="Meet the student-led FinGoose team and learn how its mission, story, and values make practical financial literacy more accessible to K–12 students."
        path="/about"
        type="AboutPage"
      />
      <PageHero
        title="About"
        description="The story, mission, and team behind FinGoose."
        image="/assets/finn-presenting.webp"
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
            <p className="mission-statement">
              FinGoose’s mission is to combat wealth inequality by providing
              students with a rigorous, creative, and accessible financial
              literacy curriculum grounded in real-world learning.
            </p>
            <Image
              alt=""
              src="/assets/finn-thinking.webp"
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
                Hi! I’m Grace Zhou, a senior at Bergen County Academies in the
                Academy of Business &amp; Finance, and the founder of FinGoose.
                What started as my DECA project is now a 501(c)(3) nonprofit
                teaching students how money really works.
              </p>
            </Reveal>
            <Reveal delay={110}>
              <p>
                FinGoose grew from my interests in economic justice, creative
                education, and the way financial systems shape a student’s
                opportunities. I pair research and teaching with animation,
                video, and graphic design to turn difficult money ideas into
                visual, practical experiences.
              </p>
            </Reveal>
            <Reveal className="founder-built" delay={140}>
              <h3>What I’ve built</h3>
              <ul>
                <li>Founded FinGoose and grew it from a DECA project into a 501(c)(3) nonprofit</li>
                <li>Won 1st place at NJ DECA States in Project Management: Financial Literacy and qualified for ICDC</li>
                <li>Wrote the 5-module middle school curriculum, reviewed by BCA’s Business Department</li>
                <li>Led workshops that raised student retention from 43% to 93%</li>
                <li>Set up a 5-district curriculum pilot with the Colorado Department of Education for 2026–27</li>
                <li>Published FinGoose and the Two Mornings: 230 copies sold, 17 five-star reviews, 150 books donated to Africa</li>
                <li>Design and edit all FinGoose videos and graphics, reaching 15M+ views and 35K+ followers</li>
                <li>Built partnerships with Go For Glass, Youth Policymakers for Tomorrow, and Solace Launch</li>
                <li>Launched a student chapter program in the US, Canada, and China</li>
              </ul>
            </Reveal>
            <Reveal className="scrapbook-quote-note" delay={180}>
              <blockquote>
                “What started as a passion for global issues transformed into a
                hands-on mission to empower the next generation with the
                financial confidence they deserve.”
              </blockquote>
            </Reveal>
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
