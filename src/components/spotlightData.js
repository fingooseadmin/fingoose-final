// Full write-ups of FinGoose's biggest events. Every number and detail here
// comes from the FinGoose DECA project report, the event flyers, and the
// books themselves — keep it that way when you edit.
//
// The workshop series lives on /resources/workshops (#workshop-story).
// The bake sales and library read-aloud live on /impact (#spotlights).

const IG = "https://www.instagram.com/fin.goose/";

export const workshopStory = {
  id: "workshop-story",
  kicker: "field notes · fall 2025",
  title: "Crisis Lab workshops",
  when: "Nov 10 – Dec 17, 2025",
  where: "Charles DeWolf Middle School, Old Tappan · Benjamin Franklin Middle School, Teaneck",
  hero: { src: "/assets/events/bfms-crowd.webp", width: 1600, height: 1200, alt: "50+ students at the FinGoose workshop at Benjamin Franklin Middle School", caption: "50+ students at Benjamin Franklin" },
  hook:
    "We asked 92 middle schoolers if they remembered what they learned about money in class. Only 31 said yes. Sooo we made money something you do, not memorize: every lesson is a crisis you have to fix.",
  stats: [
    { value: "90+", label: "students" },
    { value: "3", label: "workshops" },
    { value: "2", label: "middle schools" },
    { value: "93%", label: "average post-test score" }
  ],
  steps: [
    { title: "Pre-test", copy: "a quick quiz to see where everyone starts" },
    { title: "Uh oh, a crisis", copy: "FinGoose loses his job and has no savings 😬" },
    { title: "Pick a door", copy: "job, save, or loan? every option has a catch" },
    { title: "Team fix", copy: "build a plan before the timer runs out" },
    { title: "Pitch it", copy: "present it like a DECA role-play" },
    { title: "Reflect", copy: "what clicked? what didn’t? we read every answer" }
  ],
  sessions: [
    {
      tag: "Workshop 01 · Financial resilience",
      date: "Nov 10, 2025",
      place: "Charles DeWolf Middle School",
      title: "When income changes, the plan has to change.",
      copy:
        "Our very first one!! We polished the lesson with the school’s gifted & talented teacher and principal first. Then teams rebuilt a budget after an income shock and defended their choices.",
      image: "/assets/workshop-financial-resilience.webp",
      width: 1500,
      height: 2000,
      instagram: "https://www.instagram.com/p/DSlRkWiEl_m/"
    },
    {
      tag: "Workshop 02 · Consumer decisions",
      date: "Dec 15, 2025",
      place: "Charles DeWolf Middle School",
      title: "Scams, sneaky ads & Munchkins.",
      copy:
        "Round two with the same class! It was kinda quiet last time, so we brought Munchkins 🍩 and they remembered way more than the first visit. About 40 students across both DeWolf days.",
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
        "So many kids we split into two rooms with three leaders. This one pushed us past 90 students total!",
      image: "/assets/workshop-money-management.webp",
      width: 1500,
      height: 2000,
      instagram: "https://www.instagram.com/p/DSqfPA4koVy/"
    }
  ],
  changes: [
    { title: "more prep time", copy: "the surveys said teams wanted longer to plan their pitch, so they got it" },
    { title: "clearer directions", copy: "less “wait what do we do?”, more solving" },
    { title: "the answers!", copy: "everyone wanted the best solutions, so we made a 1-hour online course. 131 students and counting", href: "/course", linkLabel: "peek at the course" }
  ],
  quote: {
    text: "Your work reflected real understanding, intentional design, and a genuine desire to ensure our learners walked away informed and empowered.",
    name: "Mr. Williams",
    role: "Principal, Benjamin Franklin Middle School"
  },
  photos: [
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
    kicker: "fundraiser · march 2026",
    title: "The great bake sale",
    when: "Throughout March 2026",
    where: "Multiple keychain & cupcake sales",
    tone: "orange",
    hero: { src: "/assets/events/bake-04.webp", width: 1600, height: 1200, alt: "Two FinGoose students at the bake sale table", caption: "Open for business" },
    hook:
      "We needed prize money for the Golden Egg Challenge, the high school pitch competition we started with Youth Policymakers for Tomorrow. So we did what any money-minded goose would do: keychains + cupcakes.",
    stats: [
      { value: "120", label: "keychains sold" },
      { value: "200", label: "cupcakes sold" },
      { value: "$2,200", label: "raised" },
      { value: "100+", label: "Golden Egg submissions" }
    ],
    breakdown: {
      title: "the math 🧮",
      rows: [
        { label: "Keychains", detail: "120 × $10", amount: 1200, color: "#3c4cba" },
        { label: "Cupcakes", detail: "200 × $5", amount: 1000, color: "#ff8209" }
      ],
      photo: { src: "/assets/events/bake-05.webp", width: 1600, height: 1200, alt: "A FinGoose plush next to treats and the sale sign", caption: "Finn on duty" },
      note: "every dollar → microgrants for the winning Golden Egg teams!"
    },
    sections: [
      {
        title: "why it mattered",
        copy:
          "Golden Egg is a six-week pitch competition for tri-state high schoolers, mixing money + policy. 100+ teams submitted in the first few weeks, and the microgrants help winners actually build their idea."
      }
    ],
    links: [{ label: "See it on Instagram", href: IG, external: true }],
    photos: [
      { src: "/assets/events/bake-03.webp", width: 1600, height: 1200, alt: "Students buying treats at the FinGoose table", caption: "The rush" },
      { src: "/assets/events/bake-02.webp", width: 1600, height: 1200, alt: "Two students showing what they bought", caption: "Happy customers" },
      { src: "/assets/events/bake-01.webp", width: 1600, height: 1200, alt: "Students supporting the FinGoose bake sale", caption: "Thanks for stopping by!" }
    ]
  },
  {
    id: "spotlight-library",
    tab: "Library read-aloud",
    kicker: "story time · oct 3, 2026",
    title: "Dino read-aloud & volcano",
    when: "Saturday, Oct 3, 2026 · 10:30 AM",
    where: "Leonia Public Library, 227 Fort Lee Road, Leonia, NJ",
    tone: "blue",
    hero: { src: "/assets/events/library-flyer.webp", width: 1237, height: 1600, alt: "Flyer for the Dino Read Aloud and Volcano Activity", caption: "The flyer we designed" },
    hook:
      "Saturday morning story time! We read FinGoose and the Dino Dream out loud, then made a volcano foam everywhere 🌋",
    stats: [
      { value: "10:30", label: "Saturday story time" },
      { value: "7", label: "money words in the story" },
      { value: "20", label: "coins FinGoose saved" },
      { value: "1", label: "foam eruption" }
    ],
    story: {
      title: "the story",
      copy:
        "Little FinGoose falls for Mr. Dino in the toy store window, but he’s too expensive. So FinGoose does chores, saves coin by coin, skips a shiny kite, and finally brings Mr. Dino home with 20 coins. Next goal? The kite.",
      photo: { src: "/assets/book-dino-dream-cover.webp", width: 828, height: 840, alt: "Cover of FinGoose and the Dino Dream", caption: "FinGoose and the Dino Dream" },
      href: "/resources/books/#peek-inside",
      linkLabel: "flip through the book →"
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
        title: "then… elephant toothpaste!",
        photo: { src: "/assets/events/library-04.webp", width: 1200, height: 1600, alt: "Elephant toothpaste activity set up at the library", caption: "Volcano setup" },
        copy:
          "After the story came the science: a foamy “elephant toothpaste” volcano. Money stories, meet chemistry."
      }
    ],
    links: [
      { label: "Bring a read-aloud to your library", href: "/contact?interest=library-visit#contact-form" },
      { label: "See it on Instagram", href: IG, external: true }
    ],
    photos: [
      { src: "/assets/events/library-01.webp", width: 1600, height: 1200, alt: "FinGoose team reading aloud to kids at Leonia Public Library", caption: "Story time" },
      { src: "/assets/events/library-02.webp", width: 1600, height: 1200, alt: "Families listening to the FinGoose read-aloud", caption: "Families listening in" }
    ]
  }
];
