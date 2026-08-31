import "@fontsource/poppins/400.css";
import "@fontsource/poppins/500.css";
import "@fontsource/poppins/600.css";
import "@fontsource/poppins/700.css";
import "@fontsource/poppins/800.css";
import "@fontsource/poppins/900.css";
import "@/styles/base.css";
import "@/styles/responsive.css";
import "@/styles/easter-eggs.css";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import MotionController from "@/components/MotionController";
import SiteIntro from "@/components/SiteIntro";
import CursorAura from "@/components/CursorAura";
import KeyboardEasterEggs from "@/components/KeyboardEasterEggs";

export const metadata = {
  title: {
    default: "K–12 Financial Literacy Resources | FinGoose",
    template: "%s | FinGoose"
  },
  applicationName: "FinGoose",
  authors: [{ name: "FinGoose", url: "https://fingoose.org/" }],
  creator: "FinGoose",
  publisher: "FinGoose",
  category: "education",
  description:
    "Explore K–12 financial literacy curriculum, children’s books, school workshops, crisis labs, and a free online course from FinGoose.",
  metadataBase: new URL("https://fingoose.org"),
  alternates: {
    canonical: "https://fingoose.org/"
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1
    }
  },
  icons: {
    icon: [
      {
        url: "/favicon.ico?v=2",
        type: "image/x-icon",
        sizes: "256x256"
      },
      {
        url: "/assets/finn-badge.png",
        type: "image/png",
        sizes: "512x512"
      }
    ],
    shortcut: "/favicon.ico?v=2",
    apple: "/assets/finn-badge.png"
  },
  openGraph: {
    title: "K–12 Financial Literacy Resources | FinGoose",
    description:
      "Practical K–12 financial literacy through curriculum, children’s books, interactive workshops, crisis labs, and a free online course.",
    url: "https://fingoose.org/",
    siteName: "FinGoose",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og.png",
        width: 1680,
        height: 945,
        alt: "FinGoose — silly goose, serious money."
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "K–12 Financial Literacy Resources | FinGoose",
    description:
      "Practical financial literacy curriculum, books, workshops, and online learning for K–12 students.",
    images: ["/og.png"]
  }
};
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <SiteIntro />
        <CursorAura />
        <KeyboardEasterEggs />
        <MotionController />
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
