import Image from "next/image";
import Link from "@/components/StaticLink";
import Icon from "./Icon";
import FlowWords from "./FlowWords";

export default function PageHero({
  eyebrow,
  title,
  description,
  image = "/assets/finn-presenting.png",
  primary,
  primaryHref,
  secondary,
  secondaryHref,
  tone = "blue"
}) {
  return (
    <section className={`page-hero page-hero-${tone}`}>
      <div className="hero-grid-lines" aria-hidden="true" />
      <div className="container page-hero-grid">
        <div className="page-hero-copy">
          <span className="eyebrow light">{eyebrow}</span>
          <h1><FlowWords>{title}</FlowWords></h1>
          <p>{description}</p>
          {(primary || secondary) && (
            <div className="button-row">
              {primary && (
                <Link className="button button-gold" href={primaryHref}>
                  {primary} <Icon name="arrow" />
                </Link>
              )}
              {secondary && (
                <Link className="text-link light-link" href={secondaryHref}>
                  {secondary} <Icon name="arrow" size={18} />
                </Link>
              )}
            </div>
          )}
        </div>
        <div className="page-hero-art">
          <span className="orbit orbit-one" aria-hidden="true" />
          <span className="orbit orbit-two" aria-hidden="true" />
          <Image
            alt=""
            src={image}
            width={2048}
            height={2048}
            sizes="(max-width: 980px) 72vw, 500px"
            priority
          />
          <span className="status-chip">
            <span />
            Mission active
          </span>
        </div>
      </div>
    </section>
  );
}
