"use client";

import { useRef } from "react";
import ChapterGlobe from "./ChapterGlobe";
import { chapters } from "./chapterData";


// Chapter cards plus the globe; clicking a card flies the globe to it.
export default function ChapterMap({ children }) {
  const globeRef = useRef(null);

  return (
    <>
      <div className="chapter-map-copy">
        {children}
        <ul className="chapter-map-list">
          {chapters.map((chapter) => (
            <li key={chapter.school + chapter.city}>
              <button type="button" onClick={() => globeRef.current?.flyTo(chapter.coords)}>
                <span className="chapter-map-dot" aria-hidden="true" />
                <span className="chapter-map-name">
                  <strong>{chapter.school}</strong>
                  <small>{chapter.city}</small>
                </span>
                {chapter.label ? <em>{chapter.label}</em> : null}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="chapter-map-globe-card">
        <span className="chapter-map-tape" aria-hidden="true" />
        <ChapterGlobe ref={globeRef} />
      </div>
    </>
  );
}
