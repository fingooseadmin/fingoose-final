// Events shown on the /events timeline, newest first.
// To add an event: copy one block, change the text, and list its photos
// (put the image files in public/assets/events/).
// `date`, `description` and `instagram` are placeholders for now.

const INSTAGRAM_PROFILE = "https://www.instagram.com/fin.goose/";

export const timelineEvents = [
  {
    id: "middle-school-visits",
    date: "Date TBA",
    name: "Middle School Visits",
    description:
      "Placeholder description: add a short summary of this event here, such as where it took place, who joined, and what students learned.",
    instagram: INSTAGRAM_PROFILE,
    photos: [
      { src: "/assets/events/middle-01.webp", width: 1200, height: 1600, alt: "FinGoose volunteers during a middle school visit" },
      { src: "/assets/events/middle-02.webp", width: 1600, height: 1200, alt: "Students participating in a FinGoose classroom activity" },
      { src: "/assets/events/middle-03.webp", width: 1200, height: 1600, alt: "FinGoose volunteers leading a classroom visit" }
    ]
  },
  {
    id: "bake-sale",
    date: "Date TBA",
    name: "Bake Sale",
    description:
      "Placeholder description: add a short summary of this event here, such as what was sold, how much was raised, and where the money went.",
    instagram: INSTAGRAM_PROFILE,
    photos: [
      { src: "/assets/events/bake-02.webp", width: 1600, height: 1200, alt: "FinGoose students at a bake sale" },
      { src: "/assets/events/bake-01.webp", width: 1600, height: 1200, alt: "Students supporting a FinGoose bake sale" },
      { src: "/assets/events/bake-03.webp", width: 1600, height: 1200, alt: "FinGoose bake sale table" },
      { src: "/assets/events/bake-04.webp", width: 1200, height: 1600, alt: "Treats at the FinGoose bake sale" }
    ]
  },
  {
    id: "book-donations",
    date: "Date TBA",
    name: "Book Donations",
    description:
      "Placeholder description: add a short summary of this event here, such as which school received books and how many were donated.",
    instagram: INSTAGRAM_PROFILE,
    photos: [
      { src: "/assets/events/donation-08.webp", width: 1600, height: 1200, alt: "FinGoose book donation group outside the school" },
      { src: "/assets/events/donation-01.webp", width: 1200, height: 1600, alt: "Two students reading FinGoose books" },
      { src: "/assets/events/donation-02.webp", width: 1200, height: 1600, alt: "Students with donated FinGoose books" },
      { src: "/assets/events/donation-03.webp", width: 1200, height: 1600, alt: "Students reading donated FinGoose books" }
    ]
  },
  {
    id: "deca",
    date: "Date TBA",
    name: "DECA",
    description:
      "Placeholder description: add a short summary of this event here, such as the competition, the event FinGoose entered, and the results.",
    instagram: INSTAGRAM_PROFILE,
    photos: [
      { src: "/assets/events/deca-03.webp", width: 1170, height: 1560, alt: "FinGoose represented at a DECA event" },
      { src: "/assets/events/deca-01.webp", width: 1200, height: 1600, alt: "FinGoose student representative at DECA" },
      { src: "/assets/events/deca-02.webp", width: 1200, height: 1600, alt: "FinGoose team at DECA" }
    ]
  }
];
