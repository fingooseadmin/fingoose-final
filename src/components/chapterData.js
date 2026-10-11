// Chapters shown on the Join Us globe.
// To add a chapter, copy a block and fill it in:
//   school   – school or chapter name
//   city     – "Town, ST" or "City, Country"
//   country  – country name as it appears on a map (e.g. "Canada", "China",
//              "United States of America"); the country is lightly shaded
//   state    – US chapters only: full state name, which is highlighted
//   coords   – [longitude, latitude]; look the town up on Google Maps,
//              right-click it, and copy the two numbers (swap their order)
//   label    – short tag shown on the card

export const chapters = [
  {
    school: "FinGoose HQ",
    city: "Bergen County, NJ",
    country: "United States of America",
    state: "New Jersey",
    coords: [-74.03, 40.93],
    label: "Home base"
  },
  {
    school: "FinGoose New York",
    city: "New York, NY",
    country: "United States of America",
    state: "New York",
    coords: [-74.006, 40.713],
    label: "Chapter"
  },
  {
    school: "FinGoose Toronto",
    city: "Toronto, Canada",
    country: "Canada",
    coords: [-79.383, 43.653],
    label: "Chapter"
  },
  {
    school: "FinGoose Shanghai",
    city: "Shanghai, China",
    country: "China",
    coords: [121.474, 31.23],
    label: "Chapter"
  }
];
