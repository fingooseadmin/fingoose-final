import JsonLd from "@/components/JsonLd";

const SITE_URL = "https://fingoose.org";

function pageUrl(path) {
  const normalizedPath = path === "/" ? "/" : `${path.replace(/\/$/, "")}/`;
  return `${SITE_URL}${normalizedPath}`;
}

export default function PageSeo({
  title,
  description,
  path,
  type = "WebPage",
  parents = []
}) {
  const url = pageUrl(path);
  const breadcrumbItems = [
    { name: "Home", path: "/" },
    ...parents,
    { name: title, path }
  ].map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    item: pageUrl(item.path)
  }));

  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": type,
        "@id": `${url}#webpage`,
        url,
        name: `${title} | FinGoose`,
        description,
        inLanguage: "en-US",
        isPartOf: { "@id": `${SITE_URL}/#website` },
        about: { "@id": `${SITE_URL}/#organization` },
        breadcrumb: { "@id": `${url}#breadcrumb` }
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: breadcrumbItems
      }
    ]
  };

  return <JsonLd data={data} />;
}
