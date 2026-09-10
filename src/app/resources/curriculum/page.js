import { createPageMetadata } from "@/lib/seo";
import PageSeo from "@/components/PageSeo";
import Link from "next/link";
import TeacherResourceStudio from "@/components/TeacherResourceStudio";

export const metadata = createPageMetadata({
  title: "Financial Literacy Curriculum & Classroom Tools",
  description: "Explore FinGoose's five-unit middle school financial literacy curriculum: money management, credit, saving, investing, careers, and classroom decision labs.",
  path: "/resources/curriculum"
});

export default function CurriculumPage() {
  return (
    <main className="scrapbook-site curriculum-page" id="main-content" tabIndex={-1}>
      <PageSeo title="Financial Literacy Curriculum & Classroom Tools" description={metadata.description} path="/resources/curriculum" type="CollectionPage" parents={[{name:"Resources",path:"/resources"}]} />
      <section className="curriculum-heading">
        <div className="container">
          <nav className="curriculum-breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link><span aria-hidden="true">/</span><Link href="/resources">Resources</Link><span aria-hidden="true">/</span><span>Curriculum</span>
          </nav>
          <span className="sticker-label sticker-orange">For educators</span>
          <h1>Curriculum &amp;<br />classroom tools.</h1>
          <p>Practical financial literacy, ready to explore one unit at a time.</p>
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
