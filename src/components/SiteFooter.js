import Image from "next/image";
import Link from "next/link";
import Icon from "./Icon";

const columns = [
  {
    title: "Explore",
    links: [
      ["Home", "/"],
      ["About", "/about"],
      ["Our Impact", "/impact"],
      ["Timeline", "/impact/#timeline"]
    ]
  },
  {
    title: "Resources",
    links: [
      ["Curriculum", "/resources/curriculum"],
      ["Workshops", "/resources/workshops"],
      ["Online Course", "/course"],
      ["Children’s Books", "/resources/books"]
    ]
  },
  {
    title: "Get involved",
    links: [
      ["Start a chapter", "/join-us"],
      ["Book a workshop", "/contact?interest=workshop#contact-form"],
      ["Partner with us", "/contact?interest=partnership#contact-form"],
      ["Contact", "/contact"]
    ]
  }
];

export default function SiteFooter() {
  return (
    <footer className="site-footer fg-footer">
      <div className="container fg-footer-top">
        <div className="fg-footer-card">
          <span className="scrap-tape fg-footer-tape" aria-hidden="true" />
          <Link className="fg-footer-brand" href="/" aria-label="FinGoose home">
            <Image alt="" src="/assets/finn-badge.png" width={500} height={500} sizes="56px" />
            <span><i>Fin</i>Goose</span>
          </Link>
          <p className="fg-footer-mission">
            Financial literacy that&rsquo;s fun, practical, and built for middle
            schoolers. Student-led, classroom-tested.
          </p>
          <p className="fg-footer-org">501(c)(3) nonprofit · Bergen County, NJ</p>
          <Link className="button button-gold tape-button" href="/contact">
            Bring FinGoose to your school <Icon name="arrow" />
          </Link>
        </div>

        <nav className="fg-footer-links" aria-label="Footer navigation">
          {columns.map((column) => (
            <div key={column.title}>
              <span className="fg-footer-heading">{column.title}</span>
              <ul>
                {column.links.map(([label, href]) => (
                  <li key={href}>
                    <Link href={href}>{label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div>
            <span className="fg-footer-heading">Say hi</span>
            <ul>
              <li>
                <a href="mailto:fin.goose.co@gmail.com"><Icon name="mail" size={15} /> Email us</a>
              </li>
              <li>
                <a href="https://www.instagram.com/fin.goose/" target="_blank" rel="noreferrer">
                  <Icon name="instagram" size={15} /> @fin.goose
                </a>
              </li>
              <li>
                <a href="https://learn.fingoose.com/challenge-page/4475b043-ab66-4c15-9929-e1e6148175ba" target="_blank" rel="noreferrer">
                  <Icon name="play" size={15} /> Course login
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </div>

      <div className="container fg-footer-bottom">
        <p>© 2026 FinGoose. Silly goose, serious money.</p>
        <p className="fg-footer-hand">made with love in New Jersey</p>
      </div>
    </footer>
  );
}
