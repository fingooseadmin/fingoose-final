"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const testimonials = [
  {
    quote:
      "I was especially impressed by the level of preparedness, the depth of your questioning, and the strong command of financial planning and literacy concepts.",
    name: "Mr. Williams",
    role: "Principal · Benjamin Franklin Middle School",
    initials: "MW"
  },
  {
    quote:
      "Your work reflected real understanding, intentional design, and a genuine desire to ensure our learners walked away informed and empowered.",
    name: "Mr. Williams",
    role: "Principal · Benjamin Franklin Middle School",
    initials: "MW"
  }
];

export default function TestimonialSlider() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [inView, setInView] = useState(false);
  const sliderRef = useRef(null);

  useEffect(() => {
    const node = sliderRef.current;
    if (!node) return undefined;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.12 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!inView || paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return undefined;
    }

    const timer = window.setInterval(() => {
      setActive((current) => (current + 1) % testimonials.length);
    }, 6500);

    return () => window.clearInterval(timer);
  }, [inView, paused]);

  const move = (direction) => {
    setActive((current) =>
      (current + direction + testimonials.length) % testimonials.length
    );
  };

  return (
    <div
      className="testimonial-slider"
      ref={sliderRef}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div className="testimonial-slider-top">
        <span className="quote-sticker">What educators say</span>
        <div className="testimonial-count" aria-hidden="true">
          0{active + 1} / 0{testimonials.length}
        </div>
      </div>

      <div className="testimonial-stage" aria-live="polite">
        {testimonials.map((testimonial, index) => (
          <article
            className={`testimonial-slide ${index === active ? "is-active" : ""}`}
            aria-hidden={index !== active}
            key={`${testimonial.name}-${index}`}
          >
            <blockquote>“{testimonial.quote}”</blockquote>
            <div className="testimonial-person">
              <div className="testimonial-avatar">
                <Image alt={`${testimonial.name} portrait`} src="/assets/mr-williams.webp" fill sizes="160px" />
              </div>
              <p>
                <strong>{testimonial.name}</strong>
                <span>{testimonial.role}</span>
              </p>
            </div>
          </article>
        ))}
      </div>

      <div className="testimonial-controls">
        <button type="button" onClick={() => move(-1)} aria-label="Previous testimonial">
          ←
        </button>
        <div className="testimonial-dots" aria-label="Choose testimonial">
          {testimonials.map((testimonial, index) => (
            <button
              type="button"
              className={index === active ? "is-active" : ""}
              onClick={() => setActive(index)}
              aria-label={`Show testimonial ${index + 1}`}
              aria-current={index === active ? "true" : undefined}
              key={`${testimonial.initials}-dot-${index}`}
            />
          ))}
        </div>
        <button type="button" onClick={() => move(1)} aria-label="Next testimonial">
          →
        </button>
      </div>
    </div>
  );
}
