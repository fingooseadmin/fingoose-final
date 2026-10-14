// Big wins shown on the homepage and Impact page, most impressive first.
// Keep every line provable: only list things that have actually happened.
//   tag   – short category label
//   title – the achievement, in a few words
//   note  – one sentence of detail
//   icon  – one of: school, spark, chart, shield, book, globe, heart, clock
//   color – blue, gold, orange, violet, mint
//   date  – optional, e.g. "Spring 2025" (shown above the title)
//   image – optional photo, e.g. "/assets/milestones/deca.webp"; until one is
//           added, the card shows its icon on colored paper instead
//   href / linkLabel – optional link shown at the bottom of the card

export const milestones = [
  {
    tag: "Award",
    title: "1st place, NJ DECA States",
    note: "Won Project Management: Financial Literacy with FinGoose and qualified for DECA’s International Career Development Conference (ICDC).",
    icon: "spark",
    color: "gold"
  },
  {
    tag: "Results",
    title: "Retention rose from 43% to 93%",
    note: "Average pre-test vs. post-test scores across 90+ middle school workshop students.",
    icon: "chart",
    color: "mint"
  },
  {
    tag: "State pilot · 2026–27",
    title: "Colorado Department of Education",
    note: "The FinGoose curriculum is set to be piloted in 5 Colorado school districts, with pre- and post-tests over 6 weeks.",
    icon: "globe",
    color: "orange"
  },
  {
    tag: "Workshops · Nov–Dec 2025",
    title: "3 workshops, 90+ students",
    note: "Crisis Lab workshops at Charles DeWolf and Benjamin Franklin Middle Schools.",
    icon: "school",
    color: "blue"
  },
  {
    tag: "Nonprofit · Oct 2025",
    title: "Founded a 501(c)(3)",
    note: "Grew FinGoose from a DECA project into a registered nonprofit based in Bergen County, NJ.",
    icon: "heart",
    color: "violet"
  },
  {
    tag: "Curriculum",
    title: "5-module middle school curriculum",
    note: "Written for grades 6–8 and reviewed by Bergen County Academies’ Business Department.",
    icon: "school",
    color: "mint"
  },
  {
    tag: "Online course",
    title: "131 students enrolled",
    note: "A one-hour course that walks through each Crisis Lab and its best solutions.",
    icon: "clock",
    color: "gold"
  },
  {
    tag: "Publishing",
    title: "230 copies sold, 17 five-star reviews",
    note: "FinGoose and the Two Mornings is on 9+ platforms, with Spanish and Chinese PDF editions. A second book, FinGoose and the Dino Dream, followed.",
    icon: "book",
    color: "orange"
  },
  {
    tag: "Global reach",
    title: "150 books donated to Africa",
    note: "Shipped FinGoose children’s books through Books for Africa.",
    icon: "heart",
    color: "blue"
  },
  {
    tag: "Media",
    title: "15M+ views · 35K+ followers",
    note: "Our top video passed 6 million views. All videos and graphics are designed and edited in-house.",
    icon: "chart",
    color: "violet"
  },
  {
    tag: "Partnerships",
    title: "3,000+ students via Go For Glass",
    note: "Partnered with Go For Glass and Youth Policymakers for Tomorrow, and landed a paid sponsorship with Solace Launch.",
    icon: "shield",
    color: "gold"
  },
  {
    tag: "Game",
    title: "The FinGoose card game",
    note: "A quick-fire quiz game: race to 100 points, and every wrong answer earns a silly goose dare.",
    icon: "spark",
    color: "mint",
    href: "https://fingoose-cardgame.base44.app/",
    linkLabel: "Play the card game"
  },
  {
    tag: "Chapters",
    title: "US, Canada & China",
    note: "A student chapter program bringing FinGoose to new communities.",
    icon: "globe",
    color: "orange"
  }
];

// Organizations in the looping partners strip. Each card links to its site.
//   logo – optional, e.g. "/assets/partners/visions.png" (put the file in
//          public/assets/partners/); until then the card shows initials
//   url  – leave "" to show the card without a link
export const partners = [
  { name: "Visions Federal Credit Union", url: "https://www.visionsfcu.org", logo: "" },
  { name: "Colorado Department of Education", url: "https://www.cde.state.co.us", logo: "" },
  { name: "DECA", url: "https://www.deca.org", logo: "" },
  { name: "Go For Glass", url: "", logo: "" },
  { name: "Youth Policymakers for Tomorrow", url: "", logo: "" },
  { name: "Solace Launch", url: "", logo: "" },
  { name: "Books for Africa", url: "https://www.booksforafrica.org", logo: "" },
  { name: "Bergen County Academies", url: "https://www.bergen.org", logo: "" },
  { name: "Charles DeWolf Middle School", url: "https://cdw.oldtappanschools.org", logo: "" },
  { name: "Benjamin Franklin Middle School", url: "", logo: "" },
  { name: "Leonia Public Library", url: "https://leonialibrary.org", logo: "" }
];
