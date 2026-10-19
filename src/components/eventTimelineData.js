// Events shown on the Our Impact timeline (/impact/#timeline), in the order
// they happened: the very first event is at the top, the newest at the bottom.
// Add new events at the BOTTOM of the list.
// To add an event, copy one block and change the text.
//   date        – shown before the name, e.g. "Nov 11, 2025" or "Spring 2026"
//   icon        – shown on the blank polaroid when there are no photos yet
//                 (school, spark, chart, shield, book, globe, heart, clock)
//   photos      – optional; put the image files in public/assets/events/.
//                 The first photo is the cover. Leave [] for "photos coming soon".
//   instagram   – optional link for the "See it on Instagram" button
//   link / linkLabel – optional extra button (e.g. the card game)
//   spotlight   – optional link to the event's full write-up (see spotlightData.js)

const INSTAGRAM_PROFILE = "https://www.instagram.com/fin.goose/";

export const timelineEvents = [
  {
    id: "nonprofit",
    date: "Oct 2025",
    name: "FinGoose becomes a 501(c)(3)",
    description:
      "We incorporated FinGoose as a registered nonprofit, turning a DECA project into an organization that schools could trust and partner with.",
    icon: "heart",
    photos: []
  },
  {
    id: "curriculum",
    date: "Oct–Nov 2025",
    name: "Building the curriculum",
    description:
      "We wrote a 44-page, five-module middle school curriculum aligned with the JumpStart National Standards. Each module is a “Crisis Lab”: students fix a money problem, then pitch their solution like a DECA role-play. Bergen County Academies’ Business Department reviewed it, and Charles DeWolf Middle School signed on to pilot it.",
    icon: "school",
    photos: []
  },
  {
    id: "workshop-series",
    date: "Nov 10 – Dec 17, 2025",
    name: "Crisis Lab workshop series",
    description:
      "Three workshops at Charles DeWolf and Benjamin Franklin Middle Schools for 90+ students. Average scores jumped from 43% on the pre-test to 93% on the post-test.",
    icon: "school",
    spotlight: "/resources/workshops/#workshop-story",
    photos: [
      { src: "/assets/events/bfms-crowd.webp", width: 1600, height: 1200, alt: "50+ students at the FinGoose workshop at Benjamin Franklin Middle School" },
      { src: "/assets/workshop-financial-resilience.webp", width: 1500, height: 2000, alt: "FinGoose financial resilience workshop at Charles DeWolf Middle School" },
      { src: "/assets/events/cdw-presenters.webp", width: 1600, height: 1200, alt: "Students presenting their Crisis Lab plan at Charles DeWolf" },
      { src: "/assets/events/cdw-classroom.webp", width: 1600, height: 1200, alt: "Charles DeWolf students working in teams" },
      { src: "/assets/events/cdw-teams.webp", width: 1600, height: 1200, alt: "Students discussing a money decision" },
      { src: "/assets/workshop-money-decisions.webp", width: 1500, height: 2000, alt: "FinGoose money decisions workshop at Charles DeWolf Middle School" },
      { src: "/assets/workshop-money-management.webp", width: 1500, height: 2000, alt: "FinGoose workshop at Benjamin Franklin Middle School" },
      { src: "/assets/events/bfms-team.webp", width: 1200, height: 1600, alt: "FinGoose team with Benjamin Franklin Middle School teachers" },
      { src: "/assets/events/cdw-team.webp", width: 1200, height: 1600, alt: "A student team presenting at Charles DeWolf" }
    ]
  },
  {
    id: "online-course",
    date: "Winter 2025–26",
    name: "The online course launches",
    description:
      "Students told us they wanted to see the best answers to each Crisis Lab, so we built a one-hour online course that walks through every scenario. 131 students have enrolled.",
    icon: "clock",
    photos: []
  },
  {
    id: "book",
    date: "Winter 2025–26",
    name: "Publishing FinGoose and the Two Mornings",
    description:
      "Our children’s book about wealth inequality went live on 9+ platforms, including Amazon, Barnes & Noble, and Apple Books, with Spanish and Chinese PDF editions. It has sold 230 copies and earned 17 five-star reviews.",
    icon: "book",
    photos: []
  },
  {
    id: "solace",
    date: "Jan 2026",
    name: "First paid sponsorship: Solace Launch",
    description:
      "Solace Launch, a startup from UC Berkeley students, sponsored our content to promote their AI companion for student well-being.",
    icon: "spark",
    photos: []
  },
  {
    id: "social",
    date: "Winter 2026",
    name: "Our videos take off",
    description:
      "Our Gen Z–style money videos grew our Instagram past 20,000 followers. Our top video has passed 6 million views, and we’ve reached 15M+ views and 35K+ followers across platforms.",
    icon: "chart",
    instagram: INSTAGRAM_PROFILE,
    photos: []
  },
  {
    id: "go-for-glass",
    date: "Early 2026",
    name: "Partnering with Go For Glass",
    description:
      "Go For Glass, a student-run DECA prep organization, shared our personal finance resources with its 3,000+ students and advisors.",
    icon: "shield",
    photos: []
  },
  {
    id: "colorado",
    date: "Early 2026",
    name: "Meeting the Colorado Department of Education",
    description:
      "We met with the Colorado Department of Education and set up a pilot of the FinGoose curriculum in 5 school districts for the 2026–27 school year, with pre- and post-tests over six weeks.",
    icon: "globe",
    photos: [
      { src: "/assets/events/cde-meeting.webp", width: 1600, height: 1055, alt: "Grace Zhou meeting with Stephanie Hartman of the Colorado Department of Education" }
    ]
  },
  {
    id: "ypt",
    date: "Early 2026",
    name: "Partnering with Youth Policymakers for Tomorrow",
    description:
      "We teamed up with Youth Policymakers for Tomorrow, a youth civic organization with members in 12+ countries.",
    icon: "globe",
    photos: [
      { src: "/assets/events/ypt-collab.webp", width: 1600, height: 1200, alt: "FinGoose and the Youth Policymakers for Tomorrow mascot celebrating together" }
    ]
  },
  {
    id: "card-game",
    date: "Feb 2026",
    name: "The FinGoose card game",
    description:
      "A quick-fire quiz game for elementary and middle schoolers: race to 100 points, and every wrong answer earns a silly goose dare.",
    icon: "spark",
    link: "https://fingoose-cardgame.base44.app/",
    linkLabel: "Play the card game",
    photos: [
      { src: "/assets/events/cardgame-01.webp", width: 1600, height: 887, alt: "The FinGoose card game deck on the game table" },
      { src: "/assets/events/cardgame-02.webp", width: 1600, height: 890, alt: "A FinGoose card game question about paying off debt" },
      { src: "/assets/events/cardgame-03.webp", width: 1600, height: 883, alt: "A correct answer card in the FinGoose card game" }
    ]
  },
  {
    id: "bake-sales",
    date: "Mar 2026",
    name: "Keychain & cupcake bake sales",
    description:
      "Over a month of bake sales we sold 120 keychains and 200 cupcakes, raising $2,200 for Golden Egg Challenge microgrants.",
    icon: "heart",
    spotlight: "/impact/#spotlight-bake-sales",
    photos: [
      { src: "/assets/events/bake-04.webp", width: 1600, height: 1200, alt: "FinGoose team at the bake sale table" },
      { src: "/assets/events/bake-02.webp", width: 1600, height: 1200, alt: "FinGoose students at a bake sale" },
      { src: "/assets/events/bake-05.webp", width: 1600, height: 1200, alt: "FinGoose plush and treats at the bake sale" },
      { src: "/assets/events/bake-01.webp", width: 1600, height: 1200, alt: "Students supporting a FinGoose bake sale" },
      { src: "/assets/events/bake-03.webp", width: 1600, height: 1200, alt: "FinGoose bake sale table" }
    ]
  },
  {
    id: "books-for-africa",
    date: "Mar 2026",
    name: "150 books for Books for Africa",
    description:
      "We packed and shipped 150 FinGoose children’s books to Books for Africa’s headquarters, bringing our story about fairness and opportunity to young readers abroad.",
    icon: "book",
    instagram: INSTAGRAM_PROFILE,
    photos: [
      { src: "/assets/events/donation-08.webp", width: 1600, height: 1200, alt: "FinGoose team with boxes of books for Books for Africa" },
      { src: "/assets/events/donation-01.webp", width: 1200, height: 1600, alt: "Two students reading FinGoose books" },
      { src: "/assets/events/donation-04.webp", width: 1200, height: 1600, alt: "Kids reading FinGoose books" },
      { src: "/assets/events/donation-05.webp", width: 1200, height: 1600, alt: "Two kids reading FinGoose books together" },
      { src: "/assets/events/donation-02.webp", width: 1200, height: 1600, alt: "Students with donated FinGoose books" },
      { src: "/assets/events/donation-03.webp", width: 1200, height: 1600, alt: "Students reading donated FinGoose books" }
    ]
  },
  {
    id: "deca",
    date: "Spring 2026",
    name: "1st place at NJ DECA States",
    description:
      "FinGoose won first place in Project Management: Financial Literacy at the New Jersey DECA State Conference and qualified for DECA’s International Career Development Conference.",
    icon: "spark",
    instagram: INSTAGRAM_PROFILE,
    photos: [
      { src: "/assets/events/deca-trophy.webp", width: 1200, height: 1600, alt: "Grace Zhou with the first-place trophy at NJ DECA States" },
      { src: "/assets/events/deca-03.webp", width: 1170, height: 1560, alt: "FinGoose represented at a DECA event" }
    ]
  },
  {
    id: "curriculum-v2",
    date: "Summer 2026",
    name: "Curriculum 2.0",
    description:
      "Over the summer we rebuilt the curriculum from the ground up, expanding it to 50+ pages with revised Crisis Labs, clearer teacher guidance, and FinGoose-original scenarios ready for the Colorado pilot.",
    icon: "school",
    link: "https://docs.google.com/document/d/1vcHQcdXgS4BkEyfIJNDwEalHfziE24Zw7n16ErMk3Ig/edit?usp=sharing",
    linkLabel: "View the curriculum",
    photos: [
      { src: "/assets/curriculum-cover.webp", width: 935, height: 1210, alt: "Cover of the revised FinGoose middle school curriculum" }
    ]
  },
  {
    id: "leonia-read-aloud",
    date: "Oct 3, 2026",
    name: "Dino read-aloud at Leonia Public Library",
    description:
      "We read FinGoose and the Dino Dream aloud, then followed it with a hands-on “elephant toothpaste” science activity.",
    icon: "book",
    spotlight: "/impact/#spotlight-library",
    photos: [
      { src: "/assets/events/library-01.webp", width: 1600, height: 1200, alt: "FinGoose team reading aloud to kids at Leonia Public Library" },
      { src: "/assets/events/library-02.webp", width: 1600, height: 1200, alt: "Families listening to the FinGoose read-aloud" },
      { src: "/assets/events/library-04.webp", width: 1200, height: 1600, alt: "Elephant toothpaste science activity at the library" },
      { src: "/assets/events/library-flyer.webp", width: 1237, height: 1600, alt: "Flyer for the FinGoose dino read-aloud and volcano activity at Leonia Public Library" }
    ]
  }
];
