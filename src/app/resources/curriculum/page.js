import { createPageMetadata } from "@/lib/seo";
import PageSeo from "@/components/PageSeo";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import TeacherResourceStudio from "@/components/TeacherResourceStudio";

export const metadata = createPageMetadata({
  title: "Financial Literacy Curriculum for Schools",
  description:
    "Explore FinGoose financial literacy lesson plans, student worksheets, guidebooks, and standards-minded classroom resources for K–12 educators.",
  path: "/resources/curriculum"
});

export default function CurriculumPage() {
  return (
    <main className="scrapbook-site">
      <PageSeo
        title="Financial Literacy Curriculum for Schools"
        description="Explore FinGoose financial literacy lesson plans, student worksheets, guidebooks, and standards-minded classroom resources for K–12 educators."
        path="/resources/curriculum"
        type="CollectionPage"
        parents={[{name:"Resources",path:"/resources"}]}
      />
      <PageHero
        eyebrow="Curriculum & classroom tools"
        title="Paper tools built for active classrooms."
        description="Every resource is designed to help learners see the situation, make the choice, explain the trade-off, and connect it to real life."
        image="/assets/finn-teacher.png"
        primary="Request curriculum updates"
        primaryHref="/contact?interest=curriculum#contact-form"
        secondary="All resources"
        secondaryHref="/resources"
      />

      <section className="section curriculum-paper-section">
        <div className="container">
          <Reveal className="scrapbook-section-heading">
            <span className="sticker-label sticker-orange">On the educator desk</span>
            <div>
              <h2>Teacher resources, organized by module.</h2>
              <p>Open each module, explore the lesson sequence, and launch a centered preview. Unpublished files remain clearly labeled until verified source documents are available.</p>
            </div>
          </Reveal>
          <TeacherResourceStudio />
          <Reveal className="resource-detail-cta" delay={120}>
            <p>Need a specific grade band or classroom format?</p>
            <Link className="button button-dark" href="/contact?interest=curriculum#contact-form">
              Tell us what you need <span aria-hidden="true">→</span>
            </Link>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
