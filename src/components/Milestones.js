import Icon from "./Icon";
import Reveal from "./Reveal";
import { milestones, partners } from "./milestoneData";

// A board of index cards, one per big win.
export function MilestoneBoard({ limit }) {
  const items = limit ? milestones.slice(0, limit) : milestones;
  return (
    <ol className="milestone-board">
      {items.map((item, index) => (
        <li key={item.title}>
          <Reveal delay={(index % 4) * 60} className={`milestone-card milestone-${item.color}`}>
            <span className="milestone-tape" aria-hidden="true" />
            <div className="milestone-top">
              <span className="milestone-icon" aria-hidden="true">
                <Icon name={item.icon} size={20} />
              </span>
              <span className="milestone-tag">{item.tag}</span>
            </div>
            <h3>{item.title}</h3>
            <p>{item.note}</p>
          </Reveal>
        </li>
      ))}
    </ol>
  );
}

// Endless scrolling strip of partner names, styled like stamped labels.
export function PartnerStrip({ title = "Partners, schools & programs" }) {
  const row = (hidden) => (
    <ul className="partner-strip-row" aria-hidden={hidden || undefined}>
      {partners.map((name) => (
        <li key={name}>
          <span className="partner-strip-star" aria-hidden="true">✦</span>
          {name}
        </li>
      ))}
    </ul>
  );

  return (
    <section className="partner-strip" aria-label={title}>
      <p className="partner-strip-title">{title}</p>
      <div className="partner-strip-track">
        {row(false)}
        {row(true)}
      </div>
    </section>
  );
}

export default function MilestonesSection({ id = "milestones", heading = "The big wins so far.", intro }) {
  return (
    <section className="section milestone-section" id={id}>
      <div className="container">
        <Reveal className="milestone-heading">
          <span className="sticker-label sticker-orange">Milestones</span>
          <h2>{heading}</h2>
          {intro ? <p>{intro}</p> : null}
        </Reveal>
        <MilestoneBoard />
      </div>
    </section>
  );
}
