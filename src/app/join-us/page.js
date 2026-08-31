import { createPageMetadata } from "@/lib/seo";
import PageSeo from "@/components/PageSeo";
import Image from "next/image";
import Icon from "@/components/Icon";
import Reveal from "@/components/Reveal";

const chapterForm = "https://forms.gle/HpVoVa2WnFLinAyj9";

const stats = [
  "35K+ followers",
  "100K+ students impacted",
  "Nation-wide curriculum",
  "#chapters"
];

const leadership = [
  {
    level: "Start",
    title: "Chapter Head",
    copy: "Any high school student can lead a local chapter."
  },
  {
    level: "Advance",
    title: "State Head",
    copy: "Selected annually from chapter leaders with exceptional effort and results."
  },
  {
    level: "Lead",
    title: "Exec Team",
    copy: "Standout chapter and state heads may advance to the executive team."
  }
];

const faqs = [
  {
    question: "What do Fingoose Chapters do?",
    answer: "Chapters recruit volunteers and partner with local elementary, middle, and high schools as well as libraries to run read-alouds and lessons from the FinGoose curriculum. The curriculum teaches kids about money in an engaging manner that truly sticks. Each chapter also runs its own Instagram to promote events and grow a following. Every volunteer even gets posted there with photos and a short description naming everyone who helped (this is how you get your volunteer hours counted, so don’t skip this!)"
  },
  {
    question: "How many people do I need to start a chapter?",
    answer: "Just 1-2 people. You can grab a friend or go solo with whatever roles you wish. There’s no minimum limit on chapter-leading members :)"
  },
  {
    question: "Can I start as a freshman?",
    answer: "Yes! Chapter leaders start at the high school level, so any high schooler can lead."
  },
  {
    question: "What if I don’t know how to reach out to nearby schools?",
    answer: "We’ve got you. Every chapter starts with a Google Drive folder containing an in-depth document on how to run the chapter, plus supplementary materials on outreach and social media promotion. You can also contact Fingoose members directly as a helpline if needed."
  },
  {
    question: "How much time does it take to run a chapter?",
    answer: "Fingoose Chapters are very flexible with time commitment. Essentially, it functions on a \"whatever you put in is what you get\" system. Never feel pressured or on a deadline to put on an event. However, we do ask that chapters aim to conduct one event per month for consistency."
  },
  {
    question: "Does it cost anything to run a chapter?",
    answer: "Nop! Starting and running a Fingoose Chapter is completely free."
  }
];

export const metadata = createPageMetadata({
  title: "Join Us",
  description: "Interested in taking the next waddle? Check out our Chapter Guide!",
  path: "/join-us"
});

export default function JoinUsPage() {
  return (
    <main className="scrapbook-site join-page">
      <PageSeo
        title="Join Us"
        description="Interested in taking the next waddle? Check out our Chapter Guide!"
        path="/join-us"
        type="WebPage"
      />

      <section className="join-hero">
        <div className="paper-noise" aria-hidden="true" />
        <div className="container join-hero-grid">
          <Reveal className="join-hero-copy">
            <span className="sticker-label sticker-orange">Join Us</span>
            <h1>Start a Fingoose Chapter</h1>
            <p>Interested in taking the next waddle? Check out our Chapter Guide!</p>
            <a className="button button-gold tape-button" href={chapterForm} target="_blank" rel="noreferrer">
              Apply to Start a Chapter <Icon name="arrow" />
            </a>
          </Reveal>
          <Reveal className="join-hero-art" delay={80}>
            <div className="join-hero-tape" aria-hidden="true" />
            <div className="join-hero-ring" aria-hidden="true" />
            <Image
              alt=""
              src="/assets/finn-waving.png"
              width={2048}
              height={2048}
              sizes="(max-width: 820px) 78vw, 520px"
              priority
            />
          </Reveal>
        </div>
      </section>

      <section className="join-stats-section">
        <div className="container join-stats-grid">
          {stats.map((stat, index) => (
            <Reveal delay={index * 55} key={stat}>
              <article>{stat}</article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section join-benefits-section">
        <div className="container">
          <Reveal className="join-section-heading">
            <h2>Why Start a Chapter?</h2>
          </Reveal>

          <div className="join-benefit-grid">
            <Reveal className="join-benefit-card join-leadership-card">
              <span className="join-benefit-icon"><Icon name="school" /></span>
              <h3>Leadership:</h3>
              <p>Lead your own chapter with guidance from an established national organization.</p>
              <div className="join-leadership-ladder">
                {leadership.map((item) => (
                  <article key={item.title}>
                    <span>{item.level}</span>
                    <h4>{item.title}</h4>
                    <p>{item.copy}</p>
                  </article>
                ))}
              </div>
            </Reveal>

            <Reveal className="join-benefit-card" delay={60}>
              <span className="join-benefit-icon"><Icon name="clock" /></span>
              <h3>Volunteer Hours:</h3>
              <p>Earn verified volunteer hours that may support service awards and National Honor Society eligibility.</p>
            </Reveal>

            <Reveal className="join-benefit-card" delay={110}>
              <span className="join-benefit-icon"><Icon name="spark" /></span>
              <h3>Develop skills:</h3>
              <p>Build practical skills in teaching, outreach, event planning, social media, and design.</p>
            </Reveal>

            <Reveal className="join-benefit-card" delay={160}>
              <span className="join-benefit-icon"><Icon name="globe" /></span>
              <h3>Nationwide Impact:</h3>
              <p>Help expand financial-literacy education across the country and beyond.</p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section join-steps-section">
        <div className="container">
          <Reveal className="join-section-heading">
            <h2>Steps to Start a Chapter</h2>
          </Reveal>
          <div className="join-steps-grid">
            <Reveal>
              <article>
                <h3>Apply</h3>
                <p>
                  Fill out our quick <a href={chapterForm} target="_blank" rel="noreferrer">Chapter Interest Form</a>
                </p>
              </article>
            </Reveal>
            <Reveal delay={70}>
              <article>
                <h3>Orientation Call</h3>
                <p>If your application is accepted, we will contact you via phone number. Accepted chapter leads will hop on a quick 10-minute orientation call with us. You will also be given a chapter guide and contact for assistance.</p>
              </article>
            </Reveal>
            <Reveal delay={140}>
              <article>
                <h3>Launch</h3>
                <p>Start running your chapter!</p>
              </article>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section join-faq-section">
        <div className="container join-faq-layout">
          <Reveal className="join-section-heading">
            <h2>FAQs</h2>
          </Reveal>
          <div className="join-faq-list">
            {faqs.map((faq, index) => (
              <Reveal delay={index * 35} key={faq.question}>
                <details>
                  <summary>
                    <span>{faq.question}</span>
                    <i aria-hidden="true">+</i>
                  </summary>
                  <p>{faq.answer}</p>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
