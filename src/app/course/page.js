import JsonLd from "@/components/JsonLd";
import { createPageMetadata } from "@/lib/seo";
import PageSeo from "@/components/PageSeo";
import Image from "next/image";
import PageHero from "@/components/PageHero";
import CourseExperience from "@/components/CourseExperience";
import FlowWords from "@/components/FlowWords";
import Icon from "@/components/Icon";
import Reveal from "@/components/Reveal";

const courseStructuredData = {
  "@context": "https://schema.org",
  "@type": "Course",
  "@id": "https://fingoose.com/course/#course",
  name: "FinGoose Financial Literacy Course",
  description:
    "A free 16-step financial literacy course for middle and high school students covering budgeting, credit, investing, careers, and financial decisions.",
  url: "https://fingoose.com/course/",
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
    "@id": "https://fingoose.com/#organization",
    name: "FinGoose",
    url: "https://fingoose.com/"
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
    <main id="main-content" tabIndex={-1} className="scrapbook-site course-page">
      <PageSeo
        title="Free Financial Literacy Course"
        description="Explore a free 16-step financial literacy course for middle and high school students covering budgeting, credit, investing, and financial decisions."
        path="/course"
        type="WebPage"
      />
      <JsonLd data={courseStructuredData} />
      <PageHero
        title="Online Course"
        description="A free one-hour course that walks through every Crisis Lab."
        image="/assets/finn-thinking.webp"
        caption="131 students enrolled"
        tone="violet"
      >
      </PageHero>

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
              href="https://learn.fingoose.com/challenge-page/4475b043-ab66-4c15-9929-e1e6148175ba"
              target="_blank"
              rel="noreferrer"
            >
              Open the full course <Icon name="external" />
            </a>
          </div>
          <div className="handoff-art" aria-hidden="true">
            <Image
              alt=""
              src="/assets/finn-waving.webp"
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
