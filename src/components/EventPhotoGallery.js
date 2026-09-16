import Image from "next/image";

const homePhotos = [
  {
    src: "/assets/events/middle-01.webp",
    label: "Middle school visits",
    alt: "FinGoose volunteers during a middle school visit"
  },
  {
    src: "/assets/events/bake-02.webp",
    label: "Bake sale",
    alt: "FinGoose students at a bake sale"
  },
  {
    src: "/assets/events/donation-03.webp",
    label: "Book donations",
    alt: "Students reading donated FinGoose books"
  },
  {
    src: "/assets/events/deca-03.webp",
    label: "DECA",
    alt: "FinGoose represented at a DECA event"
  }
];

const impactPhotos = [
  {
    src: "/assets/events/middle-02.webp",
    label: "Middle school visits",
    alt: "Students participating in a FinGoose classroom activity"
  },
  {
    src: "/assets/events/bake-03.webp",
    label: "Bake sale",
    alt: "FinGoose bake sale table"
  },
  {
    src: "/assets/events/donation-01.webp",
    label: "Book donations",
    alt: "Two students reading FinGoose books"
  },
  {
    src: "/assets/events/deca-01.webp",
    label: "DECA",
    alt: "FinGoose student representative at DECA"
  },
  {
    src: "/assets/events/middle-03.webp",
    label: "Middle school visits",
    alt: "FinGoose volunteers leading a classroom visit"
  },
  {
    src: "/assets/events/bake-01.webp",
    label: "Bake sale",
    alt: "Students supporting a FinGoose bake sale"
  },
  {
    src: "/assets/events/donation-08.webp",
    label: "Book donations",
    alt: "FinGoose book donation group outside the school"
  },
  {
    src: "/assets/events/bake-04.webp",
    label: "Bake sale",
    alt: "FinGoose mascot at the bake sale table"
  }
];

function PhotoCard({ photo, duplicate = false, index = 0 }) {
  return (
    <figure className={`event-photo-card event-photo-card-${(index % 4) + 1}`} aria-hidden={duplicate || undefined}>
      <span className="event-photo-tape" aria-hidden="true" />
      <span className="event-photo-frame">
        <Image
          alt={duplicate ? "" : photo.alt}
          fill
          sizes="(max-width: 680px) 74vw, (max-width: 1100px) 38vw, 340px"
          src={photo.src}
        />
      </span>
      <figcaption>{photo.label}</figcaption>
    </figure>
  );
}

export default function EventPhotoGallery({ variant = "home" }) {
  if (variant === "impact") {
    return (
      <section className="section event-gallery event-gallery-impact" aria-labelledby="impact-event-gallery-title">
        <div className="container">
          <header className="event-gallery-heading">
            <span className="sticker-label sticker-orange">Events gallery</span>
            <h2 id="impact-event-gallery-title">FinGoose in the field.</h2>
          </header>
          <div className="event-gallery-grid">
            {impactPhotos.map((photo, index) => (
              <PhotoCard key={photo.src} photo={photo} index={index} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="event-gallery event-gallery-home" aria-labelledby="home-event-gallery-title">
      <div className="container event-gallery-heading">
        <span className="sticker-label sticker-orange">Events</span>
        <h2 id="home-event-gallery-title">FinGoose in the field.</h2>
      </div>
      <div className="event-gallery-marquee">
        <div className="event-gallery-track">
          {[false, true].map((duplicate) => (
            <div className="event-gallery-set" aria-hidden={duplicate || undefined} key={String(duplicate)}>
              {homePhotos.map((photo, index) => (
                <PhotoCard key={`${photo.src}-${duplicate}`} photo={photo} duplicate={duplicate} index={index} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
