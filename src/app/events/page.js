import Image from "next/image";
import Link from "next/link";
import Icon from "@/components/Icon";
import PageSeo from "@/components/PageSeo";
import Reveal from "@/components/Reveal";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Upcoming Financial Literacy Events",
  description: "See upcoming FinGoose financial literacy read-alouds, activities, and community events.",
  path: "/events"
});

export default function EventsPage() {
  return (
    <main id="main-content" tabIndex={-1} className="scrapbook-site events-page">
      <PageSeo
        title="Upcoming Financial Literacy Events"
        description="See upcoming FinGoose financial literacy read-alouds, activities, and community events."
        path="/events"
        type="CollectionPage"
      />

      <section className="events-hero">
        <div className="paper-noise" aria-hidden="true" />
        <div className="container events-hero-grid">
          <Reveal className="events-hero-copy">
            <span className="sticker-label sticker-orange">Events</span>
            <h1>Upcoming events.</h1>
            <p>Read-alouds and hands-on activities from FinGoose.</p>
            <Link className="button button-dark" href="#upcoming-event">
              See the next event <Icon name="arrow" />
            </Link>
          </Reveal>
          <Reveal className="events-hero-art" delay={70}>
            <Image alt="" src="/assets/finn-waving.webp" width={2048} height={2048} sizes="(max-width: 820px) 76vw, 430px" priority />
          </Reveal>
        </div>
      </section>

      <section className="section events-list" id="upcoming-event">
        <div className="container">
          <Reveal className="events-section-heading">
            <span className="sticker-label">Next on the calendar</span>
            <h2>FinGoose Read-Aloud + Volcano Activity</h2>
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
              <span className="eyebrow">Read-aloud + activity</span>
              <h2>FinGoose Read-Aloud + Volcano Activity</h2>
              <p>Event details are available through the signup form.</p>
              <div className="event-detail-notes">
                <span><Icon name="book" /> Read-aloud</span>
                <span><Icon name="spark" /> Volcano activity</span>
              </div>
              <a className="button button-gold" href="https://forms.gle/FiEEo85u9H4Qn9zh6" target="_blank" rel="noreferrer">
                Sign up for the event <Icon name="arrow" />
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
