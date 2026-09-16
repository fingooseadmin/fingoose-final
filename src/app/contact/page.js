import Image from "next/image";
import ContactForm from "@/components/ContactForm";
import Icon from "@/components/Icon";
import { createPageMetadata } from "@/lib/seo";
import PageSeo from "@/components/PageSeo";

export const metadata = createPageMetadata({
  title: "Contact FinGoose for Workshops & Partnerships",
  description:
    "Contact FinGoose to plan a school workshop, library read-aloud, curriculum inquiry, or financial literacy partnership for your community.",
  path: "/contact"
});

export default function ContactPage() {
  return (
    <main id="main-content" tabIndex={-1} className="scrapbook-site">
      <PageSeo title="Contact FinGoose for Workshops & Partnerships" description={metadata.description} path="/contact" type="ContactPage" />
      <section className="contact-hero">
        <div className="hero-grid-lines" aria-hidden="true" />
        <div className="container contact-grid">
          <div className="contact-intro">
            <span className="eyebrow light">Contact FinGoose</span>
            <h1>Let’s make money make sense.</h1>
            <p>
              Tell us about your classroom, community, or idea. We’ll start with
              what your learners need and work forward from there.
            </p>
            <div className="contact-methods">
              <a href="mailto:fin.goose.co@gmail.com">
                <span><Icon name="mail" /></span>
                <div>
                  <small>Email</small>
                  <strong>fin.goose.co@gmail.com</strong>
                </div>
              </a>
              <a
                href="https://www.instagram.com/fin.goose/"
                target="_blank"
                rel="noreferrer"
              >
                <span><Icon name="instagram" /></span>
                <div>
                  <small>Instagram</small>
                  <strong>@fin.goose</strong>
                </div>
              </a>
            </div>
            <div className="contact-art" aria-hidden="true">
              <Image
                alt=""
                src="/assets/finn-talking.webp"
                width={2048}
                height={2048}
                sizes="(max-width: 760px) 62vw, 420px"
              />
            </div>
          </div>
          <ContactForm />
        </div>
      </section>


    </main>
  );
}
