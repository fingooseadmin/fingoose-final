// Lessons for the FinGoose Autism Learning Kit.
//
// Lesson fields: scene ("grocery" | "cafeteria" | "sandwich" | "bank"),
// and optional backdrop: "/assets/kit/..." to use custom cartoon art
// instead of the drawn background.
//
// Each lesson is a short, teacher-paced walkthrough. The teacher moves
// through it one step at a time (Next / Back, arrow keys, or a clicker) and
// can pause on any step. Students never tap the screen: anything marked
// `doIt` is done with the physical items in their kit.
//
// Step fields
//   shot     – camera shot: "wide" (whole store), "price" (close on the
//              item), "register" (close on the register screen), "tray"
//              (close on the coin dish), "wallet" (student's-eye view)
//   say      – what Finn says (large, read-aloud friendly)
//   items    – things on the counter: { name, emoji, price } (price in cents)
//   tray     – money shown on the counter: "penny" | "nickel" | "dime" |
//              "quarter" | "$1" | "$5"
//   math     – a simple equation line, e.g. "$1.00 − 75¢ = 25¢"
//   doIt     – the hands-on task for students (shows a "Your turn" card)
//   tip      – a note just for the teacher (hidden until "Teacher tip")
//   reveal   – revealed only when the teacher presses "Show answer":
//              { tray, math, text }

export const kitContents = [
  { name: "Play wallet", emoji: "👛", note: "Velcro wallet that holds bills and a coin pouch." },
  { name: "Practice coins", emoji: "🪙", note: "Real-size pennies, nickels, dimes, and quarters." },
  { name: "Practice bills", emoji: "💵", note: "$1 and $5 bills with clear, large numbers." },
  { name: "Price tags", emoji: "🏷️", note: "Matching tags for every item in the lessons." },
  { name: "Coin mat", emoji: "🟩", note: "A counting mat with one spot for each coin." },
  { name: "Receipt pad", emoji: "🧾", note: "Simple receipts students fill in after paying." }
];

export const lessons = [
  {
    id: "meet-the-coins",
    number: 1,
    title: "Meet the coins",
    scene: "bank",
    place: "Coin counter",
    color: "blue",
    goal: "Name each coin and how much it is worth.",
    kit: ["Practice coins", "Coin mat"],
    steps: [
      {
        shot: "wallet",
        say: "Hi, I’m FinGoose! Today we will meet four coins. Open your coin pouch.",
        doIt: "Pour your coins onto your coin mat.",
        tip: "Give students time to explore the coins by touch before naming them."
      },
      {
        shot: "tray",
        say: "This is a penny. A penny is worth 1 cent.",
        tray: ["penny"],
        doIt: "Find a penny. Put it on the penny spot.",
        tip: "Pennies are the only copper-colored coin. Point out the color."
      },
      {
        shot: "tray",
        say: "This is a nickel. A nickel is worth 5 cents.",
        tray: ["nickel"],
        doIt: "Find a nickel. Put it on the nickel spot.",
        tip: "A nickel is bigger than a penny and has a smooth edge."
      },
      {
        shot: "tray",
        say: "This is a dime. A dime is worth 10 cents.",
        tray: ["dime"],
        doIt: "Find a dime. Put it on the dime spot.",
        tip: "The dime is the smallest coin but worth more than a penny or nickel. Students often expect bigger = more."
      },
      {
        shot: "tray",
        say: "This is a quarter. A quarter is worth 25 cents.",
        tray: ["quarter"],
        doIt: "Find a quarter. Put it on the quarter spot.",
        tip: "The quarter is the biggest coin and has ridges on the edge."
      },
      {
        shot: "register",
        say: "Great job! Can you put the coins in order, from smallest value to biggest?",
        doIt: "Line up your coins: penny, nickel, dime, quarter.",
        reveal: { tray: ["penny", "nickel", "dime", "quarter"], text: "1¢ → 5¢ → 10¢ → 25¢" },
        tip: "Ask students to say each value out loud as they place it."
      }
    ]
  },
  {
    id: "buy-an-apple",
    number: 2,
    title: "Buy an apple",
    scene: "grocery",
    place: "Grocery store",
    color: "mint",
    goal: "Read a price tag and pay with one coin.",
    kit: ["Practice coins", "Price tags", "Play wallet"],
    steps: [
      {
        shot: "wide",
        say: "Welcome to the FinGoose Grocery! I’m the cashier today.",
        items: [{ name: "Apple", emoji: "🍎", price: 25 }],
        tip: "Set out the apple price tag so students can match it."
      },
      {
        shot: "price",
        say: "Look at the price tag. The apple costs 25 cents.",
        items: [{ name: "Apple", emoji: "🍎", price: 25 }],
        doIt: "Find the 25¢ price tag in your kit.",
        tip: "Read the tag together: “twenty-five cents.”"
      },
      {
        shot: "wallet",
        say: "Which coin is worth 25 cents?",
        items: [{ name: "Apple", emoji: "🍎", price: 25 }],
        doIt: "Find that coin in your wallet. Hold it up.",
        reveal: { tray: ["quarter"], text: "A quarter is worth 25¢." },
        tip: "Pause here until every student is holding a coin."
      },
      {
        shot: "tray",
        say: "Give me the quarter, please.",
        items: [{ name: "Apple", emoji: "🍎", price: 25 }],
        tray: ["quarter"],
        doIt: "Hand your quarter to a partner or the teacher.",
        tip: "Model the exchange: hold out your hand like a cashier."
      },
      {
        shot: "register",
        say: "Thank you! 25 cents is exactly right. Here is your apple!",
        items: [{ name: "Apple", emoji: "🍎", price: 25, bought: true }],
        math: "Paid 25¢ · Cost 25¢ · Change 0¢",
        doIt: "Write “Apple 25¢” on your receipt.",
        tip: "Celebrate! Exact change means no money comes back."
      }
    ]
  },
  {
    id: "buy-a-banana",
    number: 3,
    title: "Buy a banana",
    scene: "grocery",
    place: "Grocery store",
    color: "gold",
    goal: "Put two coins together to make a price.",
    kit: ["Practice coins", "Coin mat", "Price tags"],
    steps: [
      {
        shot: "wide",
        say: "Back at the FinGoose Grocery! Today we are buying a banana.",
        items: [{ name: "Banana", emoji: "🍌", price: 30 }]
      },
      {
        shot: "price",
        say: "The banana costs 30 cents. We don’t have a 30-cent coin.",
        items: [{ name: "Banana", emoji: "🍌", price: 30 }],
        tip: "Ask: “Is there one coin that makes 30¢?” Let students check their coins."
      },
      {
        shot: "tray",
        say: "Let’s start with the biggest coin. Put a quarter on your mat. That’s 25.",
        items: [{ name: "Banana", emoji: "🍌", price: 30 }],
        tray: ["quarter"],
        doIt: "Put one quarter on your mat. Say “twenty-five.”"
      },
      {
        shot: "tray",
        say: "We need 30. Which coin takes us from 25 to 30?",
        items: [{ name: "Banana", emoji: "🍌", price: 30 }],
        tray: ["quarter"],
        doIt: "Add one more coin to your mat.",
        reveal: { tray: ["quarter", "nickel"], math: "25¢ + 5¢ = 30¢", text: "A nickel! 25 … 30." },
        tip: "Count up out loud together: “twenty-five … thirty.”"
      },
      {
        shot: "register",
        say: "Give me your quarter and nickel. Thank you! Here’s your banana.",
        items: [{ name: "Banana", emoji: "🍌", price: 30, bought: true }],
        tray: ["quarter", "nickel"],
        math: "25¢ + 5¢ = 30¢",
        doIt: "Hand over both coins. Write “Banana 30¢” on your receipt."
      }
    ]
  },
  {
    id: "juice-and-change",
    number: 4,
    title: "Juice and change",
    scene: "grocery",
    place: "Grocery store",
    color: "orange",
    goal: "Pay with a dollar and count the change back.",
    kit: ["Practice bills", "Practice coins", "Play wallet"],
    steps: [
      {
        shot: "wide",
        say: "Today you want a juice box. The juice costs 75 cents.",
        items: [{ name: "Juice", emoji: "🧃", price: 75 }]
      },
      {
        shot: "wallet",
        say: "You only have a 1-dollar bill. A dollar is 100 cents.",
        items: [{ name: "Juice", emoji: "🧃", price: 75 }],
        tray: ["$1"],
        doIt: "Take the $1 bill out of your wallet.",
        tip: "Connect $1 to 100¢. You can show four quarters = $1."
      },
      {
        shot: "register",
        say: "Is 1 dollar more or less than 75 cents?",
        items: [{ name: "Juice", emoji: "🧃", price: 75 }],
        tray: ["$1"],
        doIt: "Show thumbs up for MORE, thumbs down for LESS.",
        reveal: { text: "More! 100¢ is more than 75¢, so you get money back." }
      },
      {
        shot: "register",
        say: "You give me the dollar. Now I owe you change. Let’s count up from 75.",
        items: [{ name: "Juice", emoji: "🧃", price: 75 }],
        tray: ["$1"],
        doIt: "Put three quarters on your mat to show 75¢. How many more to make $1?",
        reveal: { tray: ["quarter"], math: "$1.00 − 75¢ = 25¢", text: "75 … 100. One more quarter!" },
        tip: "Counting up from the price is how real cashiers make change."
      },
      {
        shot: "tray",
        say: "Here is your juice and your change: one quarter. Thank you!",
        items: [{ name: "Juice", emoji: "🧃", price: 75, bought: true }],
        tray: ["quarter"],
        math: "Paid $1.00 · Cost 75¢ · Change 25¢",
        doIt: "Take your quarter and put it back in your wallet."
      }
    ]
  },
  {
    id: "snack-and-milk",
    number: 5,
    title: "Snack and milk",
    scene: "cafeteria",
    place: "School cafeteria",
    color: "violet",
    goal: "Add two prices, then get change from a dollar.",
    kit: ["Practice bills", "Practice coins", "Receipt pad"],
    steps: [
      {
        shot: "wide",
        say: "Welcome to the cafeteria! You want crackers and milk.",
        items: [
          { name: "Crackers", emoji: "🍪", price: 50 },
          { name: "Milk", emoji: "🥛", price: 35 }
        ]
      },
      {
        shot: "register",
        say: "Crackers are 50 cents. Milk is 35 cents. Let’s add them.",
        items: [
          { name: "Crackers", emoji: "🍪", price: 50 },
          { name: "Milk", emoji: "🥛", price: 35 }
        ],
        doIt: "Show 50¢ with two quarters. Then show 35¢ with a quarter and a dime.",
        reveal: { math: "50¢ + 35¢ = 85¢", text: "Together they cost 85¢." }
      },
      {
        shot: "register",
        say: "You pay with a 1-dollar bill. How much change do you get?",
        items: [
          { name: "Crackers", emoji: "🍪", price: 50 },
          { name: "Milk", emoji: "🥛", price: 35 }
        ],
        tray: ["$1"],
        doIt: "Count up from 85 to 100 with your coins.",
        reveal: { tray: ["dime", "nickel"], math: "$1.00 − 85¢ = 15¢", text: "85 … 95 … 100. A dime and a nickel." },
        tip: "Start with the dime (85 → 95), then the nickel (95 → 100)."
      },
      {
        shot: "tray",
        say: "Here’s your snack and 15 cents change. Enjoy your lunch!",
        items: [
          { name: "Crackers", emoji: "🍪", price: 50, bought: true },
          { name: "Milk", emoji: "🥛", price: 35, bought: true }
        ],
        tray: ["dime", "nickel"],
        doIt: "Fill in your receipt: Crackers 50¢, Milk 35¢, Total 85¢."
      }
    ]
  },
  {
    id: "lunch-with-bills",
    number: 6,
    title: "Lunch with bills",
    scene: "sandwich",
    place: "Sandwich shop",
    color: "blue",
    goal: "Pay with a $5 bill and get dollar bills back.",
    kit: ["Practice bills", "Play wallet", "Receipt pad"],
    steps: [
      {
        shot: "wide",
        say: "Welcome to the FinGoose Sandwich Shop! A sandwich costs 3 dollars.",
        items: [{ name: "Sandwich", emoji: "🥪", price: 300 }]
      },
      {
        shot: "wallet",
        say: "You have a 5-dollar bill. Is that enough?",
        items: [{ name: "Sandwich", emoji: "🥪", price: 300 }],
        tray: ["$5"],
        doIt: "Take out your $5 bill.",
        reveal: { text: "Yes! $5 is more than $3." }
      },
      {
        shot: "register",
        say: "You give me 5 dollars. Let’s count up from 3 to 5.",
        items: [{ name: "Sandwich", emoji: "🥪", price: 300 }],
        tray: ["$5"],
        doIt: "Use your $1 bills: count 4 … 5. How many bills is that?",
        reveal: { tray: ["$1", "$1"], math: "$5 − $3 = $2", text: "Two $1 bills!" }
      },
      {
        shot: "tray",
        say: "Here is your sandwich and 2 dollars change. Have a great day!",
        items: [{ name: "Sandwich", emoji: "🥪", price: 300, bought: true }],
        tray: ["$1", "$1"],
        math: "Paid $5 · Cost $3 · Change $2",
        doIt: "Put your $2 back in your wallet. Write the sandwich on your receipt."
      }
    ]
  }
];

export function formatPrice(cents) {
  if (cents >= 100) {
    const dollars = cents / 100;
    return Number.isInteger(dollars) ? `$${dollars}` : `$${dollars.toFixed(2)}`;
  }
  return `${cents}¢`;
}
