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

export const milestones = [
  {
    tag: "Award",
    title: "1st place, DECA States",
    note: "Won the Financial Literacy event and qualified for DECA’s International Career Development Conference (ICDC).",
    icon: "spark",
    color: "gold"
  },
  {
    tag: "Partnership",
    title: "Visions Federal Credit Union",
    note: "Partnered with a federal credit union to support FinGoose’s financial literacy programs.",
    icon: "shield",
    color: "blue"
  },
  {
    tag: "State pilot",
    title: "Colorado Department of Education",
    note: "Ran a FinGoose pilot with Colorado’s state department of education.",
    icon: "globe",
    color: "orange"
  },
  {
    tag: "Nonprofit",
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
    tag: "Publishing",
    title: "Two children’s books",
    note: "FinGoose and the Two Mornings and FinGoose and the Dino Dream, both available on Amazon.",
    icon: "book",
    color: "gold"
  },
  {
    tag: "Media",
    title: "15M+ views · 35K+ followers",
    note: "Financial literacy videos and graphics designed and edited in-house.",
    icon: "chart",
    color: "blue"
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
  { name: "Bergen County Academies", url: "https://www.bergen.org", logo: "" },
  { name: "Charles DeWolf Middle School", url: "https://cdw.oldtappanschools.org", logo: "" },
  { name: "Benjamin Franklin Middle School", url: "", logo: "" },
  { name: "Leonia Public Library", url: "https://leonialibrary.org", logo: "" }
];
