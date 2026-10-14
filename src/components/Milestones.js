import Image from "next/image";
import Icon from "./Icon";
import Reveal from "./Reveal";
import { milestones, partners } from "./milestoneData";

// Photo grid of milestones, newest first. Each tile shows its date and
// title on a banner; hovering (or tapping/focusing) shows the details.
export function MilestoneGrid() {
  return (
    <ol className="milestone-grid">
      {milestones.map((item, index) => (
        <li className={`milestone-tile milestone-${item.color}`} key={item.title} style={{ "--tilt": `${[-1.6, 1.2, -0.8, 1.6][index % 4]}deg` }}>
          <div className="milestone-tile-inner" tabIndex={0} data-cursor-plain>
            <span className="milestone-tile-tape" aria-hidden="true" />
            <div className={`milestone-tile-photo${item.fit ? ` fit-${item.fit}` : ""}`}>
              {item.image ? (
                <Image src={item.image} alt={item.alt || item.title} fill sizes="(max-width: 620px) 46vw, (max-width: 1000px) 31vw, 280px" priority={index < 4} />
              ) : (
                <Icon name={item.icon} size={40} />
              )}
              <div className="milestone-tile-overlay">
                <span className="milestone-tile-tag">{item.tag}</span>
                <p>{item.note}</p>
                {item.href ? (
                  <a className="milestone-tile-link" href={item.href} target="_blank" rel="noreferrer">
                    {item.linkLabel || "Learn more"} <Icon name="external" size={13} />
                  </a>
                ) : null}
              </div>
            </div>
            <div className="milestone-tile-caption">
              <span>{item.date}</span>
              <h3>{item.title}</h3>
            </div>
          </div>
        </li>
      ))}
    </ol>
  );
}

const initials = (name) =>
  /\s/.test(name)
    ? name
        .split(/\s+/)
        .filter((word) => /^[A-Z]/.test(word))
        .slice(0, 3)
        .map((word) => word[0])
        .join("")
    : name.slice(0, 4);

function PartnerCard({ partner }) {
  const content = (
    <>
      <span className="partner-logo" aria-hidden="true">
        {partner.logo ? (
          <Image src={partner.logo} alt="" width={320} height={96} sizes="220px" />
        ) : (
          initials(partner.name)
        )}
      </span>
      <span className="partner-name">
        {partner.name}
        {partner.url ? <Icon name="external" size={13} /> : null}
      </span>
    </>
  );
  return partner.url ? (
    <a
      className="partner-card"
      href={partner.url}
      target="_blank"
      rel="noreferrer"
      aria-label={`${partner.name} (opens in a new tab)`}
      data-cursor-plain
    >
      {content}
    </a>
  ) : (
    <span className="partner-card" aria-label={partner.name}>{content}</span>
  );
}

// Gallery of partner logos; each tile links to the partner's site.
export function PartnerStrip({ title = "Partners, schools & programs" }) {
  return (
    <section className="partner-strip" id="partners" aria-label={title}>
      <div className="container">
        <h2 className="partner-strip-title"><span>{title}</span></h2>
        <ul className="partner-gallery">
          {partners.map((partner) => (
            <li key={partner.name}>
              <PartnerCard partner={partner} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default function MilestonesSection({ id = "milestones", heading = "The big wins so far.", intro, moreHref, moreLabel = "See the full timeline" }) {
  return (
    <section className="section milestone-section" id={id}>
      <div className="container">
        <Reveal className="milestone-heading">
          <span className="sticker-label sticker-orange">Milestones</span>
          <h2>{heading}</h2>
          {intro ? <p>{intro}</p> : null}
        </Reveal>
        <MilestoneGrid />
        {moreHref ? (
          <div className="milestone-more">
            <a className="button button-dark" href={moreHref}>
              {moreLabel} <Icon name="arrow" />
            </a>
          </div>
        ) : null}
      </div>
    </section>
  );
}
