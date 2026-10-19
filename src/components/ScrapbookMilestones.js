import Image from "next/image";
import FlipBook from "./FlipBook";
import Icon from "./Icon";
import { Sticker } from "./Stickers";
import { milestones } from "./milestoneData";

const STICKERS = ["star", "coin", "heart", "smile"];

// The milestones as a page-turning scrapbook, read from the very first win
// (becoming a nonprofit) to the newest. Each spread is one milestone: notes
// on the left page, the photo on the right.
export default function ScrapbookMilestones() {
  const inOrder = [...milestones].reverse();
  const first = inOrder[0]?.date;
  const last = inOrder[inOrder.length - 1]?.date;

  const pages = [
    <div className="fgx-nb-cover" key="cover">
      <span className="fgx-nb-elastic" aria-hidden="true" />
      <p className="fgx-nb-cover-top">FinGoose · field notes</p>
      <h3>The FinGoose<br />Scrapbook</h3>
      <p className="fgx-nb-cover-sub">every big win, {first}–{last}</p>
      <p className="fgx-nb-cover-hint">click to open →</p>
      <Image className="fgx-nb-cover-finn" src="/assets/finn-waving.webp" alt="" width={2048} height={2048} sizes="200px" />
      <Sticker kind="star" style={{ right: "12%", top: "18%", width: "13%", "--r": "14deg" }} />
      <Sticker kind="coin" style={{ left: "10%", bottom: "16%", width: "15%", "--r": "-12deg" }} />
      <Sticker kind="heart" style={{ left: "46%", top: "7%", width: "9%", "--r": "-14deg" }} />
    </div>
  ];

  inOrder.forEach((item, index) => {
    pages.push(
      <div className="fgx-nb-page fgx-nb-notes" key={`notes-${index}`}>
        <p className="fgx-nb-kicker">
          win no. {String(index + 1).padStart(2, "0")} · {item.tag}
        </p>
        <p className="fgx-nb-date">{item.date}</p>
        <h3 className="fgx-nb-title">{item.title}</h3>
        <p className="fgx-nb-text">{item.note}</p>
        {item.href ? (
          <a className="fgx-nb-link" href={item.href} target="_blank" rel="noreferrer">
            {item.linkLabel || "Learn more"} <Icon name="external" size={13} />
          </a>
        ) : null}
        <p className="fgx-nb-check" aria-hidden="true">checked off ✓</p>
        <Sticker kind={STICKERS[index % STICKERS.length]} style={{ right: "8%", bottom: "8%", width: "14%", "--r": `${index % 2 ? 12 : -10}deg` }} />
        <span className="fgx-nb-folio" aria-hidden="true">{index * 2 + 1}</span>
      </div>
    );
    pages.push(
      <div className={`fgx-nb-page fgx-nb-photo-page tone-${item.color}`} key={`photo-${index}`}>
        <figure className={`fgx-nb-polaroid ${item.fit ? `fit-${item.fit}` : ""}`} style={{ "--r": `${[-3, 2.5, -1.5, 3][index % 4]}deg` }}>
          <span className="fgx-nb-tape" aria-hidden="true" />
          <div className="fgx-nb-polaroid-img">
            {item.image ? (
              <Image src={item.image} alt={item.alt || item.title} fill sizes="(max-width: 760px) 70vw, 380px" />
            ) : (
              <Icon name={item.icon} size={56} />
            )}
          </div>
          <figcaption>{item.tag}</figcaption>
        </figure>
        <span className="fgx-nb-folio is-right" aria-hidden="true">{index * 2 + 2}</span>
      </div>
    );
  });

  pages.push(
    <div className="fgx-nb-back" key="back">
      <p className="fgx-nb-scribble">to be continued…</p>
      <p className="fgx-nb-small">new pages get added every time we hit a milestone</p>
      <a className="fgx-nb-back-link" href="/impact/#timeline">See the full timeline →</a>
      <Sticker kind="smile" style={{ left: "50%", top: "64%", width: "18%", marginLeft: "-9%" }} />
    </div>
  );

  return (
    <FlipBook label="The FinGoose scrapbook of milestones" ratio={1.3} maxPage={460} hint="Click a page, swipe, or use the arrow keys">
      {pages}
    </FlipBook>
  );
}
