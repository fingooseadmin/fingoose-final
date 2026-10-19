// Full write-ups of FinGoose's biggest events. Every number and detail here
// comes from the FinGoose DECA project report, the event flyers, and the
// books themselves — keep it that way when you edit.
//
// The workshop series lives on /resources/workshops (#workshop-story).
// The bake sales and library read-aloud live on /impact (#spotlights).

const IG = "https://www.instagram.com/fin.goose/";

export const workshopStory = {
  id: "workshop-story",
  kicker: "Crisis Lab workshop series",
  title: "Three workshops, two schools, one big jump in scores.",
  when: "Nov 10 – Dec 17, 2025",
  where: "Charles DeWolf Middle School, Old Tappan · Benjamin Franklin Middle School, Teaneck",
  hook:
    "Before we taught anything, we surveyed 92 local middle schoolers. Only 31 felt confident they remembered what they had learned about money in class. So we built workshops around doing, not memorizing: every lesson is a money crisis students have to fix themselves.",
  stats: [
    { value: "90+", label: "students" },
    { value: "3", label: "workshops" },
    { value: "2", label: "middle schools" },
    { value: "93%", label: "average post-test score" }
  ],
  steps: [
    { title: "Pre-test", copy: "Everyone starts with a short quiz so we can measure what actually sticks." },
    { title: "The crisis", copy: "FinGoose hits a real money problem, like losing his job when the diner closes, with no savings." },
    { title: "Three imperfect choices", copy: "Get a job, save, or take a loan? Every option has a catch, and we pick apart the flaws together." },
    { title: "Team fix", copy: "Teams build their own plan against the clock." },
    { title: "Pitch it", copy: "Each team presents its solution, just like a DECA role-play." },
    { title: "Reflect", copy: "A quick survey on what made sense and what didn’t. We read every response and adjusted the next visit." }
  ],
  sessions: [
    {
      tag: "Workshop 01 · Financial resilience",
      date: "Nov 10, 2025",
      place: "Charles DeWolf Middle School",
      title: "When income changes, the plan has to change.",
      copy:
        "Our very first pilot. Before the visit we revised the lesson with the school’s gifted and talented teacher and principal. In class, teams rebuilt a budget after an income shock, then defended the trade-offs behind their plan.",
      image: "/assets/workshop-financial-resilience.webp",
      width: 1500,
      height: 2000,
      instagram: "https://www.instagram.com/p/DSlRkWiEl_m/"
    },
    {
      tag: "Workshop 02 · Consumer decisions",
      date: "Dec 15, 2025",
      place: "Charles DeWolf Middle School",
      title: "Back to the same class: scams and sneaky ads.",
      copy:
        "We came back to the same students to see what they remembered. Participation had been quiet the first time, so we brought Munchkins as an incentive. Compared with the first visit, students recalled more and reasoned through the crisis better. About 40 students joined across both DeWolf visits.",
      image: "/assets/workshop-money-decisions.webp",
      width: 1500,
      height: 2000,
      instagram: "https://www.instagram.com/p/DSn53sOkkil/"
    },
    {
      tag: "Workshop 03 · Our largest yet",
      date: "Dec 17, 2025",
      place: "Benjamin Franklin Middle School",
      title: "Two classrooms. 50+ students. Three leaders.",
      copy:
        "With a group that big, we split into two rooms with three leaders, which kept every discussion small and focused. This visit pushed the series past 90 students.",
      image: "/assets/workshop-money-management.webp",
      width: 1500,
      height: 2000,
      instagram: "https://www.instagram.com/p/DSqfPA4koVy/"
    }
  ],
  changes: [
    { title: "More prep time", copy: "Based on the post-workshop surveys, we gave teams more time to prepare their presentations." },
    { title: "Clearer instructions", copy: "We clarified the activity directions so teams could jump straight into the crisis." },
    { title: "The answers, explained", copy: "Students kept asking for the best solutions, so we built a one-hour online course that walks through every Crisis Lab. 131 students have enrolled.", href: "/course", linkLabel: "See the course" }
  ],
  quote: {
    text: "Your work reflected real understanding, intentional design, and a genuine desire to ensure our learners walked away informed and empowered.",
    name: "Mr. Williams",
    role: "Principal, Benjamin Franklin Middle School"
  },
  photos: [
    { src: "/assets/events/bfms-crowd.webp", width: 1600, height: 1200, alt: "50+ students at the Benjamin Franklin workshop", caption: "A full room at Benjamin Franklin" },
    { src: "/assets/events/cdw-presenters.webp", width: 1600, height: 1200, alt: "A team presenting its Crisis Lab plan at Charles DeWolf", caption: "Presentation time" },
    { src: "/assets/events/cdw-teams.webp", width: 1600, height: 1200, alt: "Students discussing a money decision", caption: "Teams working the crisis" },
    { src: "/assets/events/cdw-classroom.webp", width: 1600, height: 1200, alt: "Charles DeWolf students working in teams", caption: "Charles DeWolf, workshop 01" },
    { src: "/assets/events/bfms-team.webp", width: 1200, height: 1600, alt: "FinGoose team with Benjamin Franklin teachers", caption: "With the Benjamin Franklin team" },
    { src: "/assets/events/cdw-team.webp", width: 1200, height: 1600, alt: "A student team presenting at Charles DeWolf", caption: "Pitching the fix" }
  ],
  slides: [
    { src: "/assets/lessons/module-1/03.webp", alt: "Lesson slide: FinGoose is laid off at the Goose Office" },
    { src: "/assets/lessons/module-1/07.webp", alt: "Lesson slide: FinGoose’s income, rent and savings" },
    { src: "/assets/lessons/module-1/08.webp", alt: "Lesson slide: choose one — get a job, save money, or take a loan" }
  ]
};

export const spotlights = [
  {
    id: "spotlight-bake-sales",
    tab: "Bake sales",
    kicker: "Fundraiser · March 2026",
    title: "Keychains, cupcakes, and $2,200 for student ideas.",
    when: "Throughout March 2026",
    where: "Multiple keychain & cupcake sales",
    tone: "orange",
    hook:
      "We needed prize money for the Golden Egg Challenge, a high school pitch competition we launched with Youth Policymakers for Tomorrow where teams pitch projects at the intersection of money and policy. So we did what any money-minded goose would do: we opened a bake sale.",
    stats: [
      { value: "120", label: "keychains sold" },
      { value: "200", label: "cupcakes sold" },
      { value: "$2,200", label: "raised" },
      { value: "100+", label: "Golden Egg submissions" }
    ],
    breakdown: {
      title: "Where the $2,200 came from",
      rows: [
        { label: "Keychains", detail: "120 × $10", amount: 1200, color: "#3c4cba" },
        { label: "Cupcakes", detail: "200 × $5", amount: 1000, color: "#ff8209" }
      ],
      note: "Every dollar goes toward microgrants for the winning Golden Egg teams, so their ideas can actually happen."
    },
    sections: [
      {
        title: "Why it mattered",
        copy:
          "The Golden Egg Challenge is a six-week competition for high schoolers across the tri-state area. Top teams pitch their projects to judges, and the microgrants help winners turn a pitch into something real. It pulled in 100+ submissions in its first weeks."
      }
    ],
    links: [{ label: "See it on Instagram", href: IG, external: true }],
    photos: [
      { src: "/assets/events/bake-04.webp", width: 1600, height: 1200, alt: "Two FinGoose students at the bake sale table", caption: "Open for business" },
      { src: "/assets/events/bake-05.webp", width: 1600, height: 1200, alt: "A FinGoose plush next to treats and the sale sign", caption: "Finn on duty" },
      { src: "/assets/events/bake-03.webp", width: 1600, height: 1200, alt: "Students buying treats at the FinGoose table", caption: "The rush" },
      { src: "/assets/events/bake-02.webp", width: 1600, height: 1200, alt: "Two students showing what they bought", caption: "Happy customers" },
      { src: "/assets/events/bake-01.webp", width: 1600, height: 1200, alt: "Students supporting the FinGoose bake sale", caption: "Thanks for stopping by!" }
    ]
  },
  {
    id: "spotlight-library",
    tab: "Library read-aloud",
    kicker: "Community event · Oct 3, 2026",
    title: "Dino read-aloud & volcano: money stories meet science.",
    when: "Saturday, Oct 3, 2026 · 10:30 AM",
    where: "Leonia Public Library, 227 Fort Lee Road, Leonia, NJ",
    tone: "blue",
    hook:
      "A Saturday morning for younger readers. We read FinGoose and the Dino Dream out loud, then turned the room into a lab for a foaming “elephant toothpaste” volcano.",
    stats: [
      { value: "10:30", label: "Saturday story time" },
      { value: "7", label: "money words in the story" },
      { value: "20", label: "coins FinGoose saved" },
      { value: "1", label: "foam eruption" }
    ],
    story: {
      title: "The story we read",
      copy:
        "Little FinGoose falls in love with Mr. Dino, a toy in the shop window, but Papa Goose says it costs too much. So FinGoose learns to earn coins doing chores, saves them in a jar, skips a shiny kite he doesn’t need, and finally counts out 20 coins to bring Mr. Dino home. And next time? He’s saving for the kite.",
      href: "/resources/books/#peek-inside",
      linkLabel: "Flip through the book"
    },
    words: [
      { word: "Earn", meaning: "Get money by doing something, like a job or a chore." },
      { word: "Income", meaning: "Money that comes to you, usually from working or doing chores." },
      { word: "Saving", meaning: "Setting aside part of your income for later." },
      { word: "Budget", meaning: "A plan for how you’ll spend and save before you spend." },
      { word: "Allowance", meaning: "Money your parents give you regularly, sometimes for helping out." },
      { word: "Impulse", meaning: "The sudden urge to buy something without stopping to think." },
      { word: "Habit", meaning: "Something you do so often it becomes automatic, like saving a coin." }
    ],
    sections: [
      {
        title: "Then: elephant toothpaste",
        copy:
          "After the story came the science: a hands-on “elephant toothpaste” experiment that foams up and over like a volcano. Financial storytelling, meet chemistry."
      }
    ],
    links: [
      { label: "Bring a read-aloud to your library", href: "/contact?interest=library-visit#contact-form" },
      { label: "See it on Instagram", href: IG, external: true }
    ],
    photos: [
      { src: "/assets/events/library-01.webp", width: 1600, height: 1200, alt: "FinGoose team reading aloud to kids at Leonia Public Library", caption: "Story time" },
      { src: "/assets/events/library-02.webp", width: 1600, height: 1200, alt: "Families listening to the FinGoose read-aloud", caption: "Families listening in" },
      { src: "/assets/events/library-04.webp", width: 1200, height: 1600, alt: "Elephant toothpaste activity at the library", caption: "Volcano setup" },
      { src: "/assets/events/library-flyer.webp", width: 1237, height: 1600, alt: "Flyer for the Dino Read Aloud and Volcano Activity", caption: "The flyer" }
    ]
  }
];
