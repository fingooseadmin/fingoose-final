import { readFile, readdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";

const outputDirectory = path.join(process.cwd(), "out");

async function optimizeDirectory(directory) {
  const entries = await readdir(directory, { withFileTypes: true });

  await Promise.all(
    entries.map(async (entry) => {
      const absolutePath = path.join(directory, entry.name);

      if (entry.isDirectory()) {
        await optimizeDirectory(absolutePath);
        return;
      }

      if (entry.name.endsWith(".css")) {
        const css = await readFile(absolutePath, "utf8");
        const optimizedCss = css.replace(/@font-face\{[^}]+\}/g, (fontFace) => {
          if (!/poppins-latin-\d+-normal\.[^)]+\.woff2/.test(fontFace)) {
            return "";
          }

          return fontFace.replace(
            /,url\([^)]*\.woff\)format\("woff"\)/g,
            ""
          );
        });

        if (optimizedCss !== css) {
          await writeFile(absolutePath, optimizedCss);
        }
      }

      const isRoutePayload = entry.name.endsWith(".txt") && entry.name !== "robots.txt";
      const isFont = /\.woff2?$/.test(entry.name);
      const isRequiredFont = /^poppins-latin-\d+-normal\..+\.woff2$/.test(
        entry.name
      );

      if (isRoutePayload || (isFont && !isRequiredFont)) {
        await rm(absolutePath);
      }
    })
  );
}

await optimizeDirectory(outputDirectory);