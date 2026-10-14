import Image from "next/image";
import Link from "@/components/StaticLink";
import Icon from "./Icon";
import FlowWords from "./FlowWords";

// Scrapbook page header used across the site: graph paper, a sticker label,
// the intro on a taped note, and the artwork in a tilted polaroid.
export default function PageHero({
  eyebrow,
  title,
  description,
  image = "/assets/finn-presenting.webp",
  imageAlt = "",
  primary,
  primaryHref,
  secondary,
  secondaryHref,
  tone = "blue",
  caption,
  status,
  breadcrumb,
  children
}) {
  const note = caption || status;
  return (
    <section className={`scrap-page-hero scrap-tone-${tone}`}>
      <div className="container scrap-page-hero-grid">
        <div className="scrap-page-hero-copy">
          {breadcrumb ? <nav className="scrap-breadcrumb" aria-label="Breadcrumb">{breadcrumb}</nav> : null}
          {eyebrow ? <span className="sticker-label sticker-orange">{eyebrow}</span> : null}
          <h1><FlowWords>{title}</FlowWords></h1>
          {description ? (
            <p className="scrap-page-hero-lede">{description}</p>
          ) : null}
          {children}
          {(primary || secondary) && (
            <div className="button-row">
              {primary && (
                <Link className="button button-gold tape-button" href={primaryHref} {...(primaryHref?.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : {})}>
                  {primary} <Icon name="arrow" />
                </Link>
              )}
              {secondary && (
                <Link className="button scrapbook-outline-button light" href={secondaryHref}>
                  {secondary} <Icon name="arrow" size={18} />
                </Link>
              )}
            </div>
          )}
        </div>
        <figure className="scrap-page-hero-polaroid">
          <span className="scrap-tape scrap-page-hero-tape-l" aria-hidden="true" />
          <span className="scrap-tape scrap-page-hero-tape-r" aria-hidden="true" />
          <span className="scrap-page-hero-photo">
            <Image alt={imageAlt} src={image} width={1200} height={1200} sizes="(max-width: 900px) 70vw, 420px" priority />
          </span>
          {note ? <figcaption>{note}</figcaption> : null}
        </figure>
      </div>
    </section>
  );
}
