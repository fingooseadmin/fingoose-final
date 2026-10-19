import { createPageMetadata } from "@/lib/seo";
import PageSeo from "@/components/PageSeo";
import PageHero from "@/components/PageHero";
import Link from "next/link";
import TeacherResourceStudio from "@/components/TeacherResourceStudio";
import LessonSlideshows from "@/components/LessonSlideshows";
import Reveal from "@/components/Reveal";

export const metadata = createPageMetadata({
  title: "Financial Literacy Curriculum & Classroom Tools",
  description: "Explore FinGoose's five-module middle school financial literacy curriculum: money management, consumer decisions, saving and investing, inequality, and careers, taught through hands-on Crisis Labs.",
  path: "/resources/curriculum"
});

export default function CurriculumPage() {
  return (
    <main className="scrapbook-site curriculum-page" id="main-content" tabIndex={-1}>
      <PageSeo title="Financial Literacy Curriculum & Classroom Tools" description={metadata.description} path="/resources/curriculum" type="CollectionPage" parents={[{name:"Resources",path:"/resources"}]} />
      <PageHero
        breadcrumb={<><Link href="/">Home</Link><span aria-hidden="true">/</span><Link href="/resources">Resources</Link><span aria-hidden="true">/</span><span>Curriculum</span></>}
        title="Curriculum"
        description="A free five-module curriculum for grades 6–8, with the real lesson slides inside."
        image="/assets/curriculum-cover.webp"
        caption="Grades 6–8 · 5 modules"
        primary="Watch the lesson slides"
        primaryHref="#lesson-slides"
        tone="blue"
      />
      <section className="section fgx-lessons-section" id="lesson-slides">
        <div className="container">
          <Reveal className="fgx-lessons-heading">
            <span className="sticker-label sticker-orange">Step inside a lesson</span>
            <h2>Watch the Crisis Labs play out.</h2>
            <p>Every module opens with a story where FinGoose hits a money problem, then a Solutions lesson teaches the tools to fix it. Pick a module and flip through the real slides.</p>
          </Reveal>
          <LessonSlideshows />
        </div>
      </section>
      <section className="section curriculum-catalog">
        <div className="container"><TeacherResourceStudio /></div>
      </section>
      <section className="section curriculum-help">
        <div className="container">
          <div><span className="eyebrow">Need a different format?</span><h2>Let’s plan for your classroom.</h2><p>Tell us about your grade band, learning setting, or resource needs.</p></div>
          <Link className="button button-gold" href="/contact?interest=curriculum#contact-form">Contact FinGoose <span aria-hidden="true">→</span></Link>
        </div>
      </section>
    </main>
  );
}
