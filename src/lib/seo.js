const SITE_URL = "https://fingoose.org";
const SITE_NAME = "FinGoose";
const SOCIAL_IMAGE = `${SITE_URL}/og.png`;

export function createPageMetadata({ title, description, path }) {
  const canonicalPath = path === "/" ? "/" : `${path.replace(/\/$/, "")}/`;
  const canonical = `${SITE_URL}${canonicalPath}`;
  const socialTitle = `${title} | ${SITE_NAME}`;

  return {
    title,
    description,
    alternates: {
      canonical
    },
    openGraph: {
      title: socialTitle,
      description,
      url: canonical,
      siteName: SITE_NAME,
      locale: "en_US",
      type: "website",
      images: [
        {
          url: SOCIAL_IMAGE,
          width: 1680,
          height: 945,
          alt: "FinGoose — silly goose, serious money."
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: [SOCIAL_IMAGE]
    }
  };
}