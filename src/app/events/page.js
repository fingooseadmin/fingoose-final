import Image from "next/image";
import Link from "next/link";
import Icon from "@/components/Icon";
import PageSeo from "@/components/PageSeo";
import Reveal from "@/components/Reveal";
import { createPageMetadata } from "@/lib/seo";
import styles from "./events.module.css";

export const metadata = createPageMetadata({
  title: "Financial Literacy Events",
  description: "Explore FinGoose financial literacy read-alouds, hands-on activities, and community events.",
  path: "/events"
});

export default function EventsPage() {
  return (
    <main id="main-content" tabIndex={-1} className="scrapbook-site events-page">
      <PageSeo
        title="Financial Literacy Events"
        description="Explore FinGoose financial literacy read-alouds, hands-on activities, and community events."
        path="/events"
        type="CollectionPage"
      />

      <section className={styles.hero}>
        <div className="paper-noise" aria-hidden="true" />
        <div className={`container ${styles.grid}`}>
          <Reveal className={styles.copy}>
            <span className="sticker-label sticker-orange">Events</span>
            <h1>FinGoose<br /><em>events.</em></h1>
            <p>Read-alouds and hands-on activities from FinGoose.</p>
            <Link className="button button-gold" href="#featured-event">
              Explore the events
            </Link>
          </Reveal>
          <Reveal className={styles.art} delay={70}>
            <div className={styles.mascot}><Image alt="" src="/assets/finn-waving.webp" width={2048} height={2048} sizes="(max-width: 820px) 76vw, 380px" priority /></div>
            <div className={styles.ticket}><span>Read-aloud + activity</span><strong>Stories meet science.</strong><span>FinGoose · Community events</span></div>
          </Reveal>
        </div>
      </section>

      <section className="section events-list" id="featured-event">
        <div className="container">
          <Reveal className="events-section-heading">
            <span className="sticker-label">From the calendar</span>
            <h2>Read. Discover. Try.</h2>
          </Reveal>

          <Reveal className="event-detail-card" delay={70}>
            <div className="event-flyer-placeholder event-flyer-official">
              <Image
                alt="FinGoose Dino Read-Aloud and Volcano Activity flyer"
                src="/assets/events/library-flyer.webp"
                width={1237}
                height={1600}
                sizes="(max-width: 820px) 82vw, 430px"
              />
            </div>
            <div className="event-detail-copy">
              <span className={styles.date}>Past event · October 3, 2026 · 10:30 AM</span>
              <h2>Dinosaur read-aloud + elephant toothpaste</h2>
              <p>On Saturday, October 3rd, at 10:30 AM, join FinGoose for a dinosaur read-aloud followed by a hands-on &quot;elephant toothpaste&quot; activity where financial story-telling meets science.</p>
              <div className="event-detail-notes">
                <span><Icon name="book" /> Read-aloud</span>
                <span><Icon name="spark" /> Elephant toothpaste activity</span>
              </div>
              <a className="button button-gold" href="https://forms.gle/FiEEo85u9H4Qn9zh6" target="_blank" rel="noreferrer">
                View event information <Icon name="external" />
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
