import JsonLd from "@/components/JsonLd";
import { createPageMetadata } from "@/lib/seo";
import PageSeo from "@/components/PageSeo";
import PageHero from "@/components/PageHero";
import BookCollectionExperience from "@/components/BookCollectionExperience";
import Reveal from "@/components/Reveal";

const booksStructuredData = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "@id": "https://fingoose.org/resources/books/#books",
  name: "FinGoose Children’s Financial Literacy Books",
  url: "https://fingoose.org/resources/books/",
  numberOfItems: 2,
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      item: {
        "@type": "Book",
        "@id": "https://fingoose.org/resources/books/#book-01",
        name: "FinGoose and the Two Mornings",
        url: "https://fingoose.org/resources/books/#book-01",
        inLanguage: "en",
        publisher: { "@id": "https://fingoose.org/#organization" },
        sameAs: [
          "https://www.amazon.com/dp/B0GDFQ682L",
          "https://www.kobo.com/hk/en/ebook/fingoose-and-the-two-mornings"
        ]
      }
    },
    {
      "@type": "ListItem",
      position: 2,
      item: {
        "@type": "Book",
        "@id": "https://fingoose.org/resources/books/#book-02",
        name: "FinGoose and the Dino Dream",
        url: "https://fingoose.org/resources/books/#book-02",
        inLanguage: "en",
        author: { "@type": "Person", name: "Kevin Wu" },
        publisher: { "@id": "https://fingoose.org/#organization" },
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
    <main className="scrapbook-site">
      <PageSeo
        title="Children’s Financial Literacy Books"
        description="Discover FinGoose children’s financial literacy books, verified Amazon and Kobo reading options, classroom copies, and library read-aloud visits."
        path="/resources/books"
        type="CollectionPage"
        parents={[{name:"Resources",path:"/resources"}]}
      />
      <JsonLd data={booksStructuredData} />
      <PageHero
        eyebrow="Children’s books"
        title="Two stories. More ways into money confidence."
        description="The FinGoose library now includes two children’s books, with verified purchase and reading links collected in one place."
        image="/assets/money-toast-stack.png"
        primary="Browse both books"
        primaryHref="#book-library"
        secondary="All resources"
        secondaryHref="/resources"
        tone="orange"
      />

      <section className="section resource-books-section" id="book-library">
        <div className="container-wide resource-book-library">
          <Reveal className="scrapbook-section-heading book-library-heading">
            <span className="sticker-label sticker-orange">The FinGoose bookshelf</span>
            <div>
              <h2>Choose your next story.</h2>
              <p>The second publication is live on Amazon. Its cover preview will be added separately when that asset is ready.</p>
            </div>
          </Reveal>
          <BookCollectionExperience />
        </div>
      </section>
    </main>
  );
}
