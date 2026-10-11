import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import { createPageMetadata } from "@/lib/seo";

const profileUrl = "https://fingoose.org/team/victor-pan/";
const description =
  "Victor Pan is a Syosset High School student and FinGoose’s Chief Technology Officer and systems engineer, working on its website and digital learning systems.";

export const metadata = {
  ...createPageMetadata({
    title: "Victor Pan — Systems Engineer & CTO",
    description,
    path: "/team/victor-pan"
  }),
  title: {
    absolute: "Victor Pan — FinGoose Systems Engineer | Syosset High School"
  }
};

const profileStructuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfilePage",
      "@id": `${profileUrl}#webpage`,
      url: profileUrl,
      name: "Victor Pan — FinGoose Systems Engineer",
      description,
      inLanguage: "en-US",
      isPartOf: { "@id": "https://fingoose.org/#website" },
      mainEntity: { "@id": `${profileUrl}#person` },
      breadcrumb: { "@id": `${profileUrl}#breadcrumb` }
    },
    {
      "@type": "Person",
      "@id": `${profileUrl}#person`,
      name: "Victor Pan",
      url: profileUrl,
      jobTitle: "Chief Technology Officer and systems engineer",
      description,
      worksFor: { "@id": "https://fingoose.org/#organization" },
      affiliation: {
        "@type": "EducationalOrganization",
        name: "Syosset High School"
      }
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${profileUrl}#breadcrumb`,
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://fingoose.org/"
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "About",
          item: "https://fingoose.org/about/"
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "Victor Pan",
          item: profileUrl
        }
      ]
    }
  ]
};

export default function VictorPanPage() {
  return (
    <main id="main-content" tabIndex={-1} className="scrapbook-site victor-profile-page">
      <JsonLd data={profileStructuredData} />
      <section className="victor-profile-section">
        <div className="container victor-profile-layout">
          <div className="victor-profile-copy">
            <Link className="victor-profile-back" href="/about/#team">
              ← Meet the FinGoose team
            </Link>
            <span className="sticker-label sticker-orange">FinGoose team</span>
            <h1>Victor Pan</h1>
            <p className="victor-profile-lead">
              Systems engineer and Chief Technology Officer at FinGoose.
            </p>
            <p>
              Victor Pan is a student at Syosset High School. At FinGoose, he
              works on the website and digital systems that support the team’s
              financial-literacy resources.
            </p>
          </div>
          <div className="victor-profile-facts" aria-label="Victor Pan profile details">
            <span className="victor-profile-index">Team profile / 03</span>
            <div>
              <span>Role</span>
              <strong>Chief Technology Officer<br />&amp; systems engineer</strong>
            </div>
            <div>
              <span>School</span>
              <strong>Syosset High School</strong>
            </div>
            <div>
              <span>Organization</span>
              <strong>FinGoose</strong>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
