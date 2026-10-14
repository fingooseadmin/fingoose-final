import { createPageMetadata } from "@/lib/seo";
import PageSeo from "@/components/PageSeo";
import PageHero from "@/components/PageHero";
import Link from "next/link";
import TeacherResourceStudio from "@/components/TeacherResourceStudio";

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
        eyebrow="For educators"
        title="Curriculum & classroom tools."
        description="A free, five-module middle school curriculum built around Crisis Labs. Explore one unit at a time."
        image="/assets/curriculum-cover.webp"
        caption="Grades 6–8 · 5 modules"
        tone="blue"
      />
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
