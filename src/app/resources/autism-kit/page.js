import { createPageMetadata } from "@/lib/seo";
import PageSeo from "@/components/PageSeo";
import PageHero from "@/components/PageHero";

export const metadata = createPageMetadata({
  title: "Autism Learning Kit",
  description: "The FinGoose Autism Learning Kit.",
  path: "/resources/autism-kit"
});

// Page shell only. Content will be added once the kit details are in.
export default function AutismKitPage() {
  return (
    <main id="main-content" tabIndex={-1} className="scrapbook-site autism-kit-page">
      <PageSeo
        title="Autism Learning Kit"
        description="The FinGoose Autism Learning Kit."
        path="/resources/autism-kit"
        type="WebPage"
        parents={[{ name: "Resources", path: "/resources" }]}
      />
      <PageHero title="Autism Learning Kit" image="/assets/finn-waving.webp" tone="mint" />
    </main>
  );
}
