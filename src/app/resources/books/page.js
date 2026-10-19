import JsonLd from "@/components/JsonLd";
import { createPageMetadata } from "@/lib/seo";
import PageSeo from "@/components/PageSeo";
import PageHero from "@/components/PageHero";
import BookCollectionExperience from "@/components/BookCollectionExperience";
import Reveal from "@/components/Reveal";
import BookPreview from "@/components/BookPreview";

const booksStructuredData = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "@id": "https://fingoose.com/resources/books/#books",
  name: "FinGoose Children’s Financial Literacy Books",
  url: "https://fingoose.com/resources/books/",
  numberOfItems: 2,
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      item: {
        "@type": "Book",
        "@id": "https://fingoose.com/resources/books/#book-01",
        name: "FinGoose and the Two Mornings",
        url: "https://fingoose.com/resources/books/#book-01",
        inLanguage: "en",
        publisher: { "@id": "https://fingoose.com/#organization" },
        sameAs: [
          "https://www.amazon.com/dp/B0GDFQ682L",
          "https://www.kobo.com/us/en/ebook/fingoose-and-the-two-mornings"
        ]
      }
    },
    {
      "@type": "ListItem",
      position: 2,
      item: {
        "@type": "Book",
        "@id": "https://fingoose.com/resources/books/#book-02",
        name: "FinGoose and the Dino Dream",
        url: "https://fingoose.com/resources/books/#book-02",
        inLanguage: "en",
        author: { "@type": "Person", name: "Kevin Wu" },
        publisher: { "@id": "https://fingoose.com/#organization" },
        sameAs: "https://www.amazon.com/dp/B0HCZ9H9J1"
      }
    }
  ]
};
export const metadata = createPageMetadata({
  title: "Children’s Financial Literacy Books",
  description:
    "Discover FinGoose children’s financial literacy books, verified Amazon and Kobo reading options, classroom copies, and library read-aloud visits.",
  path: "/resources/books"
});

export default function BooksPage() {
  return (
    <main id="main-content" tabIndex={-1} className="scrapbook-site books-page">
      <PageSeo
        title="Children’s Financial Literacy Books"
        description="Discover FinGoose children’s financial literacy books, verified Amazon and Kobo reading options, classroom copies, and library read-aloud visits."
        path="/resources/books"
        type="CollectionPage"
        parents={[{name:"Resources",path:"/resources"}]}
      />
      <JsonLd data={booksStructuredData} />
      <PageHero
        title="Children’s Books"
        description="Two FinGoose picture books about money and fairness."
        image="/assets/money-toast-stack.webp"
        primary="Flip through the books"
        primaryHref="#peek-inside"
        secondary="All resources"
        secondaryHref="/resources"
        tone="orange"
      />

      <section className="section fgx-bookpeek-section" id="peek-inside">
        <div className="container-wide">
          <Reveal className="scrapbook-section-heading">
            <span className="sticker-label sticker-orange">The FinGoose bookshelf</span>
            <div>
              <h2>Choose your next story.</h2>
              <p>Pick a book, then click a page (or swipe) to flip through the first pages.</p>
            </div>
          </Reveal>
          <BookPreview />
        </div>
      </section>

      <section className="section resource-books-section" id="book-library">
        <div className="container-wide resource-book-library">
          <Reveal className="scrapbook-section-heading book-library-heading">
            <span className="sticker-label sticker-orange">For classrooms & families</span>
            <div>
              <h2>Bring the story to life.</h2>
              <p>Where to read each book, plus conversation prompts and read-aloud ideas to go with it.</p>
            </div>
          </Reveal>
          <BookCollectionExperience />
        </div>
      </section>
    </main>
  );
}
