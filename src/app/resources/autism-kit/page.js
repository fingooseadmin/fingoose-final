import Link from "next/link";
import { createPageMetadata } from "@/lib/seo";
import PageSeo from "@/components/PageSeo";
import PageHero from "@/components/PageHero";
import Icon from "@/components/Icon";
import Reveal from "@/components/Reveal";
import KitLessonPlayer from "@/components/KitLessonPlayer";
import { kitContents } from "@/components/autismKitLessons";
import "./autism-kit.css";

const description =
  "A hands-on money kit for elementary and middle school students with IEPs: a physical box of play money paired with teacher-paced, step-by-step lessons.";

export const metadata = createPageMetadata({
  title: "Autism Learning Kit",
  description,
  path: "/resources/autism-kit"
});

const howItWorks = [
  {
    title: "Open the box",
    text: "Every student gets a wallet, coins, bills, and price tags they can hold and move.",
    icon: "book"
  },
  {
    title: "Play the lesson",
    text: "The teacher puts a lesson on the board. FinGoose is the cashier and walks through one small step at a time.",
    icon: "play"
  },
  {
    title: "Pause and do it",
    text: "At every “Your turn,” the teacher pauses while students use their real kit items. No tapping on screens.",
    icon: "school"
  }
];

const designedFor = [
  { title: "Hands-on first", text: "Students work with physical coins and bills, not a touchscreen." },
  { title: "Teacher-paced", text: "Nothing moves on its own. Pause on any step for as long as the class needs." },
  { title: "Small steps", text: "Each lesson breaks one real-life exchange into short, predictable steps." },
  { title: "Read aloud", text: "Any step can be read out loud for students who are still building reading skills." },
  { title: "Big and calm", text: "Large text, clear pictures, and no flashing or timers. Works full screen on a projector." },
  { title: "Real places", text: "Grocery stores, cafeterias, and shops students actually visit." }
];

export default function AutismKitPage() {
  return (
    <main id="main-content" tabIndex={-1} className="scrapbook-site autism-kit-page">
      <PageSeo
        title="Autism Learning Kit"
        description={description}
        path="/resources/autism-kit"
        type="WebPage"
        parents={[{ name: "Resources", path: "/resources" }]}
      />
      <PageHero
        title="Autism Learning Kit"
        description="A box of play money plus step-by-step lessons, built for elementary and middle schoolers with IEPs."
        image="/assets/finn-talking.webp"
        caption="In development · prototype"
        tone="mint"
        primary="Try a lesson"
        primaryHref="#lessons"
        secondary="Ask about a kit"
        secondaryHref="/contact?interest=autism-kit#contact-form"
      />

      <section className="section kit-how-section">
        <div className="container">
          <Reveal className="scrapbook-section-heading">
            <span className="sticker-label sticker-orange">How it works</span>
            <div>
              <h2>Real money skills, one step at a time.</h2>
              <p>The kit pairs things students can touch with a lesson the whole class follows together.</p>
            </div>
          </Reveal>
          <ol className="kit-how">
            {howItWorks.map((item, index) => (
              <Reveal delay={index * 70} key={item.title}>
                <li className="kit-how-card">
                  <span className="kit-how-num">{index + 1}</span>
                  <span className="kit-how-icon"><Icon name={item.icon} size={26} /></span>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="section kit-box-section">
        <div className="container kit-box-grid">
          <Reveal className="kit-box-copy">
            <span className="sticker-label sticker-orange">What’s in the box</span>
            <h2>Everything students need to practice paying.</h2>
            <p>Each kit is made for one student, so everyone can follow along at their own desk.</p>
          </Reveal>
          <Reveal className="kit-box" delay={80}>
            <span className="scrap-tape kit-box-tape" aria-hidden="true" />
            <ul>
              {kitContents.map((item) => (
                <li key={item.name}>
                  <span className="kit-box-emoji" aria-hidden="true">{item.emoji}</span>
                  <div>
                    <strong>{item.name}</strong>
                    <p>{item.note}</p>
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <section className="section kit-lessons-section" id="lessons">
        <div className="container">
          <Reveal className="scrapbook-section-heading">
            <span className="sticker-label sticker-orange">Lessons</span>
            <div>
              <h2>Pick a lesson and press Next.</h2>
              <p>
                Put this on the classroom screen. FinGoose plays the cashier, and every “Your turn” is a
                moment for students to use their kit.
              </p>
            </div>
          </Reveal>
          <KitLessonPlayer />
        </div>
      </section>

      <section className="section kit-designed-section">
        <div className="container">
          <Reveal className="scrapbook-section-heading">
            <span className="sticker-label sticker-orange">Built for IEP classrooms</span>
            <div>
              <h2>Designed around how students learn best.</h2>
            </div>
          </Reveal>
          <div className="kit-designed">
            {designedFor.map((item, index) => (
              <Reveal delay={index * 50} key={item.title}>
                <article className="kit-designed-card">
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              </Reveal>
            ))}
          </div>
          <div className="kit-cta">
            <p>Want to pilot the kit in your classroom?</p>
            <Link className="button button-gold tape-button" href="/contact?interest=autism-kit#contact-form">
              Contact FinGoose <Icon name="arrow" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
