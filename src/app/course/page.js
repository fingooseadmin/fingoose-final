import JsonLd from "@/components/JsonLd";
import { createPageMetadata } from "@/lib/seo";
import PageSeo from "@/components/PageSeo";
import Image from "next/image";
import CourseExperience from "@/components/CourseExperience";
import FlowWords from "@/components/FlowWords";
import Icon from "@/components/Icon";
import Reveal from "@/components/Reveal";

const courseStructuredData = {
  "@context": "https://schema.org",
  "@type": "Course",
  "@id": "https://fingoose.org/course/#course",
  name: "FinGoose Financial Literacy Course",
  description:
    "A free 16-step financial literacy course for middle and high school students covering budgeting, credit, investing, careers, and financial decisions.",
  url: "https://fingoose.org/course/",
  inLanguage: "en-US",
  isAccessibleForFree: true,
  educationalLevel: "Middle school and high school",
  teaches: [
    "Budgeting",
    "Credit",
    "Investing",
    "Career decisions",
    "Financial decision-making"
  ],
  provider: {
    "@type": "EducationalOrganization",
    "@id": "https://fingoose.org/#organization",
    name: "FinGoose",
    url: "https://fingoose.org/"
  }
};
export const metadata = createPageMetadata({
  title: "Free Financial Literacy Course",
  description:
    "Explore a free 16-step financial literacy course for middle and high school students covering budgeting, credit, investing, and financial decisions.",
  path: "/course"
});

export default function CoursePage() {
  return (
    <main className="scrapbook-site">
      <PageSeo
        title="Free Financial Literacy Course"
        description="Explore a free 16-step financial literacy course for middle and high school students covering budgeting, credit, investing, and financial decisions."
        path="/course"
        type="WebPage"
      />
      <JsonLd data={courseStructuredData} />
      <section className="course-hero">
        <div className="hero-grid-lines" aria-hidden="true" />
        <div className="container course-hero-grid">
          <div>
            <span className="eyebrow light">Free course · 16 learning steps</span>
            <h1>
              <FlowWords>Financial literacy,</FlowWords>
              {" "}
              <em><FlowWords>built like a skill.</FlowWords></em>
            </h1>
            <p>
              Learn the idea, make the decision, and test the reasoning. Preview
              the complete roadmap below, then continue into FinGoose’s original
              course experience.
            </p>
            <div className="course-hero-meta">
              <span><strong>04</strong> focused modules</span>
              <span><strong>16</strong> guided steps</span>
              <span><strong>01</strong> final confidence check</span>
            </div>
          </div>
          <div className="course-hero-art">
            <div className="course-screen">
              <div className="screen-top">
                <span><i /> Lesson system online</span>
                <strong>04 / 16</strong>
              </div>
              <div className="screen-bars">
                <span style={{ width: "78%" }} />
                <span style={{ width: "55%" }} />
                <span style={{ width: "88%" }} />
              </div>
              <div className="course-study-scene">
                <span className="course-study-chip study-chip-money" aria-hidden="true">
                  $
                </span>
                <span className="course-study-chip study-chip-book" aria-hidden="true">
                  <Icon name="book" size={20} />
                </span>
                <span className="course-study-chip study-chip-chart" aria-hidden="true">
                  <Icon name="chart" size={20} />
                </span>
                <Image
                  alt="FinGoose mascot thinking through a financial lesson"
                  src="/assets/finn-thinking.png"
                  width={2048}
                  height={2048}
                  sizes="(max-width: 760px) 70vw, 480px"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section course-preview-section">
        <div className="container">
          <Reveal className="section-heading split-heading">
            <div>
              <span className="eyebrow">Interactive roadmap</span>
              <h2><FlowWords>Explore what students learn.</FlowWords></h2>
            </div>
            <p>
              Try a sample decision, move through all four modules, and save your
              preview progress on this device.
            </p>
          </Reveal>
          <Reveal delay={90}>
            <CourseExperience />
          </Reveal>
        </div>
      </section>

      <section className="section course-handoff">
        <div className="container handoff-card">
          <div className="handoff-copy">
            <span className="eyebrow light">Ready for the full experience?</span>
            <h2>
              <FlowWords>Continue in the original FinGoose classroom.</FlowWords>
            </h2>
            <p>
              Create or use your FinGoose learning account to access the complete
              course, practice prompts, and final quiz.
            </p>
            <a
              className="button button-gold"
              href="https://www.fingoose.com/challenge-page/4475b043-ab66-4c15-9929-e1e6148175ba"
              target="_blank"
              rel="noreferrer"
            >
              Open the full course <Icon name="external" />
            </a>
          </div>
          <div className="handoff-art" aria-hidden="true">
            <Image
              alt=""
              src="/assets/finn-waving.png"
              width={2048}
              height={2048}
              sizes="(max-width: 760px) 46vw, 300px"
            />
          </div>
        </div>
      </section>
    </main>
  );
}
