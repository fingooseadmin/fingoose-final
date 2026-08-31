import { createPageMetadata } from "@/lib/seo";
import PageSeo from "@/components/PageSeo";
import Image from "next/image";
import DonationWidget from "@/components/DonationWidget";
import Icon from "@/components/Icon";
import Reveal from "@/components/Reveal";

const outcomes = [
  {
    icon: "book",
    title: "Accessible materials",
    copy: "Keep visual, age-appropriate learning resources available to more students."
  },
  {
    icon: "school",
    title: "Classroom reach",
    copy: "Support workshop materials and the logistics behind hands-on learning."
  },
  {
    icon: "globe",
    title: "Wider access",
    copy: "Help publications and digital learning travel beyond a single classroom."
  }
];

export const metadata = createPageMetadata({
  title: "Support Financial Literacy Education",
  description:
    "Support FinGoose as it creates accessible K–12 financial literacy resources, classroom workshops, children’s books, and free-book donations.",
  path: "/donate"
});

export default function DonatePage() {
  return (
    <main className="scrapbook-site">
      <PageSeo
        title="Support Financial Literacy Education"
        description="Support FinGoose as it creates accessible K–12 financial literacy resources, classroom workshops, children’s books, and free-book donations."
        path="/donate"
        type="WebPage"
      />
      <section className="donate-hero">
        <div className="hero-grid-lines" aria-hidden="true" />
        <div className="container donate-hero-grid">
          <div className="donate-intro">
            <span className="eyebrow light">Support the mission</span>
            <h1>Change starts with one informed decision.</h1>
            <p>
              Your support helps FinGoose make financial education creative,
              practical, and accessible—one student, story, and classroom at a
              time.
            </p>
            <div className="donate-trust">
              <span><Icon name="shield" /> Secure giving handoff</span>
              <span><Icon name="heart" /> Student-centered impact</span>
            </div>
            <Image
              alt="FinGoose mascot walking forward"
              src="/assets/finn-striding.png"
              width={2048}
              height={2048}
              sizes="(max-width: 760px) 68vw, 480px"
            />
          </div>
          <DonationWidget />
        </div>
      </section>

      <section className="section giving-outcomes">
        <div className="container">
          <Reveal className="section-heading centered-heading">
            <span className="eyebrow">What support moves forward</span>
            <h2>Every gift expands the learning system.</h2>
            <p>
              FinGoose is building toward broader partnerships, more learners,
              and more memorable financial education.
            </p>
          </Reveal>
          <div className="outcome-grid">
            {outcomes.map((item, index) => (
              <Reveal delay={index * 90} key={item.title}>
                <article>
                  <div><Icon name={item.icon} /></div>
                  <h3>{item.title}</h3>
                  <p>{item.copy}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
