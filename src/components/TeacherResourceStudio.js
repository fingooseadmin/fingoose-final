import Image from "next/image";
import Link from "next/link";
import Icon from "./Icon";
import { PlaySlidesButton } from "./LessonSlideshows";

const CURRICULUM_DOC_URL = "https://docs.google.com/document/d/1vcHQcdXgS4BkEyfIJNDwEalHfziE24Zw7n16ErMk3Ig/edit?usp=sharing";

const curriculumModules = [
  { number: "01", title: "Money Management", copy: "Income, budgeting, and unemployment: students plan through a sudden job loss with no safety net, then revise the plan to reduce risk.", slides: ["Crisis Lab: The Diner Closes", "Solutions & plan revision"] },
  { number: "02", title: "Money Decisions", copy: "Consumer decisions and incentives: students see how advertising, influencers, and FOMO shape spending, and how to research and stay safe from scams.", slides: ["Crisis Lab: The Walk-and-Earn App", "Solutions & plan revision"] },
  { number: "03", title: "Money Growth", copy: "Saving, investing, and managing risk: students compare accounts, interest, and diversification to grow money without betting it all on one thing.", slides: ["Crisis Lab: The Pond Float", "Solutions & plan revision"] },
  { number: "04", title: "Money Around the World", copy: "Wealth, opportunity, and inequality: students investigate how access, starting conditions, and economic systems lead to unequal outcomes.", slides: ["Crisis Lab: Unequal Starting Conditions", "Solutions & policy analysis"] },
  { number: "05", title: "Money and You", copy: "Agency, careers, and ethical decisions: students connect everything to their own goals and future careers, then apply it in a final capstone.", slides: ["Reflection & careers", "Capstone: design-and-solve task"] }
];

export default function TeacherResourceStudio() {
  return (
    <div className="teacher-resource-studio">
      <section className="curriculum-resource curriculum-resource-blue">
        <aside className="curriculum-facts">
          <span className="sticker-label sticker-orange">Teacher resources</span>
          <a className="curriculum-doc-cover" href={CURRICULUM_DOC_URL} target="_blank" rel="noreferrer" data-cursor-plain aria-label="View the curriculum (opens in a new tab)">
            <Image
              src="/assets/curriculum-cover.webp"
              alt="Cover of the FinGoose Middle School Financial Literacy Curriculum"
              width={935}
              height={1210}
              sizes="(max-width: 820px) 82vw, 400px"
            />
            <span className="curriculum-doc-cover-label" aria-hidden="true">View the curriculum <Icon name="external" /></span>
          </a>
          <dl>
            <div><dt>Resource type</dt><dd>Curriculum &amp; classroom tools</dd></div>
            <div><dt>Grade level</dt><dd>Middle school · Grades 6–8</dd></div>
            <div><dt>Subject</dt><dd>Personal finance</dd></div>
            <div><dt>Modules</dt><dd>{curriculumModules.length} modules · 9 lessons</dd></div>
            <div><dt>Availability</dt><dd>Full curriculum available · free to use</dd></div>
          </dl>
          <Link className="text-link" href="/contact?interest=curriculum#contact-form">Request classroom materials <Icon name="arrow" /></Link>
        </aside>
        <div className="curriculum-units">
          <header className="curriculum-overview">
            <span className="eyebrow">Overview</span>
            <h2>Middle school financial literacy</h2>
            <p>Help students make practical money decisions through five modules covering budgeting, consumer choices, saving and investing, economic inequality, and careers. Each module opens with a Crisis Lab scenario, then teaches the tools to solve it.</p>
          </header>
          <div className="curriculum-unit-list">
            {curriculumModules.map((module) => (
              <article key={module.number} className="curriculum-unit">
                <span className="curriculum-unit-number" aria-hidden="true">{module.number}</span>
                <div>
                  <h3>Module {Number(module.number)}: {module.title}</h3>
                  <p>{module.copy}</p>
                  <ul className="curriculum-topics">{module.slides.map((slide) => <li key={slide}>{slide}</li>)}</ul>
                  <div className="fgx-unit-actions">
                  {module.number !== "04" ? <PlaySlidesButton deckId={"module-" + Number(module.number)} /> : null}
                  <a className="curriculum-lesson-link" href={CURRICULUM_DOC_URL} target="_blank" rel="noreferrer" aria-label={"Preview module " + module.number + ": " + module.title + " in the curriculum (opens in a new tab)"}>Read this module <Icon name="external" size={16} /></a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
