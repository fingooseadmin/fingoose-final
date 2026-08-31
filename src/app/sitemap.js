export const dynamic = "force-static";

const siteUrl = "https://fingoose.org";
const lastModified = new Date("2026-08-22T00:00:00.000Z");

const routes = [
  { path: "/", changeFrequency: "weekly", priority: 1 },
  { path: "/resources/", changeFrequency: "monthly", priority: 0.9 },
  { path: "/course/", changeFrequency: "monthly", priority: 0.9 },
  { path: "/resources/curriculum/", changeFrequency: "monthly", priority: 0.85 },
  { path: "/resources/books/", changeFrequency: "monthly", priority: 0.85 },
  { path: "/resources/workshops/", changeFrequency: "monthly", priority: 0.85 },
  { path: "/impact/", changeFrequency: "monthly", priority: 0.8 },
  { path: "/about/", changeFrequency: "monthly", priority: 0.75 },
  { path: "/join-us/", changeFrequency: "monthly", priority: 0.75 },
  { path: "/donate/", changeFrequency: "monthly", priority: 0.7 },
  { path: "/contact/", changeFrequency: "yearly", priority: 0.6 },
  { path: "/resources/autism-kit/", changeFrequency: "monthly", priority: 0.6 }
];

export default function sitemap() {
  return routes.map(({ path, changeFrequency, priority }) => ({
    url: `${siteUrl}${path}`,
    lastModified,
    changeFrequency,
    priority
  }));
}
