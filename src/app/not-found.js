"use client";

import { useEffect } from "react";

export default function NotFound() {
  useEffect(() => {
    window.location.replace("/");
  }, []);

  return (
    <main className="scrapbook-site">
      <section className="page-hero">
        <div className="container">
          <div className="page-hero-copy">
            <span className="eyebrow">Page not found</span>
            <h1>Waddling back home.</h1>
            <p>This address does not match a FinGoose page.</p>
            <a className="button button-gold" href="/">Return home</a>
          </div>
        </div>
      </section>
    </main>
  );
}