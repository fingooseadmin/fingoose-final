import { createPageMetadata } from "@/lib/seo";
import PageSeo from "@/components/PageSeo";
import KitLessonPlayer from "@/components/KitLessonPlayer";
import "../autism-kit.css";

const description =
  "Full-screen, teacher-paced money lessons for the FinGoose Autism Learning Kit. FinGoose plays the cashier while students use their kit.";

export const metadata = createPageMetadata({
  title: "Autism Kit Lessons",
  description,
  path: "/resources/autism-kit/lessons"
});

export default function AutismKitLessonsPage() {
  return (
    <main id="main-content" tabIndex={-1} className="autism-kit-page kit-app-page">
      <PageSeo
        title="Autism Kit Lessons"
        description={description}
        path="/resources/autism-kit/lessons"
        type="WebPage"
        parents={[{ name: "Resources", path: "/resources" }, { name: "Autism Learning Kit", path: "/resources/autism-kit" }]}
      />
      <h1 className="sr-only">Autism Learning Kit lessons</h1>
      <KitLessonPlayer app />
    </main>
  );
}
