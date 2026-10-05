"use client";
import Image from "next/image";
import Link from "@/components/StaticLink";
import { useState } from "react";
import styles from "./LearningLoop.module.css";

const resources = [
  { title: "Curriculum", label: "Classroom ready", image: "/assets/finn-teacher.webp", href: "/resources/curriculum", tone: "blue" },
  { title: "Children’s books", label: "Story mode", image: "/assets/book-dino-dream-cover.webp", href: "/resources/books", tone: "gold" },
  { title: "In-person workshops", label: "Schools & groups", image: "/assets/workshop-money-management.webp", href: "/resources/workshops", tone: "orange", photo: true },
  { title: "Online course", label: "Pause + think", image: "/assets/finn-thinking.webp", href: "/course", tone: "violet" },
  { title: "Autism learning kit", label: "In development", image: "/assets/crisis-lab-one.webp", href: "/resources/autism-kit", tone: "gold" }
];

export default function LearningLoop() {
  const [selected, setSelected] = useState(0);
  const resource = resources[selected];
  const move = step => setSelected(index => (index + step + resources.length) % resources.length);
  return (
    <section className={styles.loop} aria-label="Explore FinGoose resources">
      <div className={styles.copy}>
        <span className="sticker-label sticker-orange">The learning loop</span>
        <h2>See it. Try it.<br />Talk it through.</h2>
        <p>A living scrapbook of the moments that turn money vocabulary into practical confidence.</p>
        <div className={styles.choices} aria-label="Choose a resource">
          {resources.map((item, index) => <button key={item.href} type="button" aria-pressed={selected === index} aria-controls="learning-loop-preview" onClick={() => setSelected(index)}><span aria-hidden="true">0{index + 1}</span>{item.title}</button>)}
        </div>
      </div>
      <div className={styles.stage}>
        <div className={styles.preview} id="learning-loop-preview" aria-live="polite" aria-atomic="true">
          <Link key={resource.href} href={resource.href} className={`${styles.card} ${styles[resource.tone]}`}>
            <div className={`${styles.art} ${resource.photo ? styles.photo : ""}`}><Image src={resource.image} alt="" width={1000} height={1000} sizes="(max-width: 760px) 80vw, 380px" /></div>
            <div className={styles.caption}><span>{resource.label}</span><h3>{resource.title}</h3><strong>Explore resource</strong></div>
          </Link>
        </div>
        <div className={styles.controls}><button type="button" onClick={() => move(-1)} aria-label="Previous resource">Previous</button><span aria-hidden="true">0{selected + 1} / 05</span><button type="button" onClick={() => move(1)} aria-label="Next resource">Next</button></div>
      </div>
    </section>
  );
}
