// Big wins shown on the homepage and Impact page, in chronological order:
// oldest on the left, newest on the right (add new wins at the BOTTOM).
// Keep every line provable: only list things that have actually happened.
//   tag   – short category label
//   title – the achievement, in a few words
//   note  – one sentence of detail
//   icon  – one of: school, spark, chart, shield, book, globe, heart, clock
//   color – blue, gold, orange, violet, mint
//   date  – optional, e.g. "Spring 2025" (shown above the title)
//   fit   – optional: "contain" (whole drawing), "logo", or "top" (crop from top)
//   image – optional photo, e.g. "/assets/milestones/deca.webp"; until one is
//           added, the card shows its icon on colored paper instead
//   href / linkLabel – optional link shown at the bottom of the card

export const milestones = [
  {
    date: "Oct 2025",
    tag: "Nonprofit",
    image: "/assets/finn-presenting.webp",
    alt: "FinGoose mascot Finn presenting",
    fit: "contain",
    title: "Founded a 501(c)(3)",
    note: "Grew FinGoose from a DECA project into a registered nonprofit based in Bergen County, NJ.",
    icon: "heart",
    color: "violet"
  },
  {
    date: "Oct–Nov 2025",
    tag: "Curriculum",
    image: "/assets/curriculum-cover.webp",
    alt: "Cover of the FinGoose middle school curriculum",
    fit: "top",
    title: "5-module middle school curriculum",
    note: "Written for grades 6–8 and reviewed by Bergen County Academies’ Business Department.",
    icon: "school",
    color: "mint"
  },
  {
    date: "Nov–Dec 2025",
    tag: "Workshops",
    image: "/assets/workshop-financial-resilience.webp",
    alt: "FinGoose workshop at Charles DeWolf Middle School",
    title: "3 workshops, 90+ students",
    note: "Crisis Lab workshops at Charles DeWolf and Benjamin Franklin Middle Schools.",
    icon: "school",
    color: "blue"
  },
  {
    date: "Dec 2025",
    tag: "Results",
    image: "/assets/workshop-money-management.webp",
    alt: "Students at the FinGoose workshop at Benjamin Franklin Middle School",
    title: "Retention rose from 43% to 93%",
    note: "Average pre-test vs. post-test scores across 90+ middle school workshop students.",
    icon: "chart",
    color: "mint"
  },
  {
    date: "Winter 2025–26",
    tag: "Online course",
    image: "/assets/crisis-lab-one.webp",
    alt: "Illustration from the FinGoose online course",
    fit: "contain",
    title: "131 students enrolled",
    note: "A one-hour course that walks through each Crisis Lab and its best solutions.",
    icon: "clock",
    color: "gold"
  },
  {
    date: "Winter 2025–26",
    tag: "Publishing",
    image: "/assets/book-two-mornings-cover.webp",
    alt: "Cover of FinGoose and the Two Mornings",
    title: "230 copies sold, 17 five-star reviews",
    note: "FinGoose and the Two Mornings is on 9+ platforms, with Spanish and Chinese PDF editions. A second book, FinGoose and the Dino Dream, followed.",
    icon: "book",
    color: "orange"
  },
  {
    date: "Winter 2026",
    tag: "Media",
    image: "/assets/money-toast-stack.webp",
    alt: "Money toast graphic from a FinGoose video",
    fit: "contain",
    title: "15M+ views · 35K+ followers",
    note: "Our top video passed 6 million views. All videos and graphics are designed and edited in-house.",
    icon: "chart",
    color: "violet"
  },
  {
    date: "Early 2026",
    tag: "Partnerships",
    image: "/assets/partners/go-for-glass.png",
    alt: "Go For Glass logo",
    fit: "logo",
    title: "3,000+ students via Go For Glass",
    note: "Partnered with Go For Glass and Youth Policymakers for Tomorrow, and landed a paid sponsorship with Solace Launch.",
    icon: "shield",
    color: "gold"
  },
  {
    date: "Early 2026",
    tag: "State pilot",
    image: "/assets/partners/cde.png",
    alt: "Colorado Department of Education logo",
    fit: "logo",
    title: "Colorado Department of Education",
    note: "The FinGoose curriculum is set to be piloted in 5 Colorado school districts, with pre- and post-tests over 6 weeks.",
    icon: "globe",
    color: "orange"
  },
  {
    date: "Feb 2026",
    tag: "Game",
    image: "/assets/finn-thinking.webp",
    alt: "FinGoose mascot Finn thinking",
    fit: "contain",
    title: "The FinGoose card game",
    note: "A quick-fire quiz game: race to 100 points, and every wrong answer earns a silly goose dare.",
    icon: "spark",
    color: "mint",
    href: "https://fingoose-cardgame.base44.app/",
    linkLabel: "Play the card game"
  },
  {
    date: "Mar 2026",
    tag: "Global reach",
    image: "/assets/events/donation-08.webp",
    alt: "FinGoose team with boxes of books for Books for Africa",
    title: "150 books donated to Africa",
    note: "Shipped FinGoose children’s books through Books for Africa.",
    icon: "heart",
    color: "blue"
  },
  {
    date: "Spring 2026",
    tag: "Award",
    image: "/assets/events/deca-03.webp",
    alt: "Grace Zhou with the FinGoose display board at NJ DECA States",
    fit: "top",
    title: "1st place, NJ DECA States",
    note: "Won Project Management: Financial Literacy with FinGoose and qualified for DECA’s International Career Development Conference (ICDC).",
    icon: "spark",
    color: "gold"
  },
  {
    date: "2026",
    tag: "Chapters",
    image: "/assets/finn-waving.webp",
    alt: "FinGoose mascot Finn waving",
    fit: "contain",
    title: "US, Canada & China",
    note: "A student chapter program bringing FinGoose to new communities.",
    icon: "globe",
    color: "orange"
  }
];

// Organizations in the looping partners strip. Each card links to its site.
//   logo     – file in public/assets/partners/; leave "" to show initials
//   wordmark – true when the logo already spells the name, so the name text
//              is hidden (screen readers still hear it)
//   url      – leave "" to show the card without a link
export const partners = [
  { name: "Visions Federal Credit Union", url: "https://www.visionsfcu.org", logo: "/assets/partners/visions.png", wordmark: true },
  { name: "Colorado Department of Education", url: "https://www.cde.state.co.us", logo: "/assets/partners/cde.png" },
  { name: "DECA", url: "https://www.deca.org", logo: "/assets/partners/deca.png", wordmark: true },
  { name: "Go For Glass", url: "https://goforglass.org/", logo: "/assets/partners/go-for-glass.png" },
  { name: "Youth Policymakers for Tomorrow", url: "https://youthpolicymakers.org/", logo: "/assets/partners/ypt.png" },
  { name: "Solace Launch", url: "https://www.solacelaunch.com/", logo: "/assets/partners/solace-launch.png" },
  { name: "Books for Africa", url: "https://www.booksforafrica.org", logo: "/assets/partners/books-for-africa.png", wordmark: true },
  { name: "Bergen County Academies", url: "https://www.bergen.org", logo: "/assets/partners/bca.png" },
  { name: "Charles DeWolf Middle School", url: "https://cdw.oldtappanschools.org", logo: "/assets/partners/charles-dewolf.png" },
  { name: "Benjamin Franklin Middle School", url: "https://www.teaneckschools.org/benjaminfranklinmiddleschool_home.aspx", logo: "/assets/partners/teaneck.png" },
  { name: "Leonia Public Library", url: "https://leonialibrary.org", logo: "/assets/partners/leonia-library.png", wordmark: true }
];
