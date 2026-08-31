import Image from "next/image";
import Link from "next/link";
import Icon from "./Icon";

const pages = [
  ["Home", "/"],
  ["About", "/about"],
  ["Our Impact", "/impact"],
  ["Resources", "/resources"],
  ["Online Course", "/course"],
  ["Contact", "/contact"],
  ["Donate", "/donate"]
];

export default function SiteFooter() {
  return (
    <footer className="site-footer scrapbook-footer">
      <div className="footer-doodle" aria-hidden="true">SILLY GOOSE / SERIOUS MONEY</div>
      <div className="container scrapbook-footer-grid">
        <div className="footer-lead">
          <span className="sticker-label sticker-orange">One waddle at a time</span>
          <h2>Money confidence starts early.</h2>
          <p>
            Practical, playful financial education for the students who will
            shape what comes next.
          </p>
          <Link className="button button-gold" href="/contact">
            Bring FinGoose to your school <Icon name="arrow" />
          </Link>
        </div>

        <nav className="footer-page-grid" aria-label="Footer navigation">
          {pages.map(([label, href], index) => (
            <Link href={href} key={href}>
              <span>0{index + 1}</span>
              {label}
            </Link>
          ))}
        </nav>
      </div>

      <div className="container scrapbook-footer-bottom">
        <Link className="footer-brand" href="/" aria-label="FinGoose home">
          <Image alt="" src="/assets/finn-badge.png" width={500} height={500} sizes="64px" />
          <span><i>Fin</i>Goose</span>
        </Link>
        <p>© 2026 FinGoose · Silly goose, serious money.<span>Site engineering · Victor Pan</span></p>
        <div>
          <a href="mailto:fin.goose.co@gmail.com">Email</a>
          <a href="https://www.instagram.com/fin.goose/" target="_blank" rel="noreferrer">
            Instagram <Icon name="external" size={13} />
          </a>
        </div>
      </div>
    </footer>
  );
}
