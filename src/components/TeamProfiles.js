import Image from "next/image";
import Reveal from "./Reveal";

const team = [
  {
    name: "Grace Zhou",
    role: "Founder and CEO",
    detail: "Bergen County Academies · Academy of Business & Finance",
    image: "/assets/grace-zhou.webp",
    photo: true
  },
  {
    name: "Gevan Ha",
    role: "Chief Marketing Officer",
    detail: "Community · Growth",
    image: "/assets/team-portrait-two.webp",
    photo: true
  },
  {
    name: "Victor Pan",
    role: "Chief Technology Officer",
    detail: "Digital learning · Product systems",
    image: "/assets/finn-talking.webp",
    photo: false
  },
  {
    name: "Alex Moell",
    role: "Instructor",
    detail: "Workshops · Facilitation",
    image: "/assets/team-portrait-one.webp",
    photo: true
  }
];

export default function TeamProfiles() {
  return (
    <div className="team-scrap-grid">
      {team.map((person, index) => (
        <Reveal delay={index * 60} key={person.name}>
          <article className="team-scrap-card">
            <div className="team-card-tape" aria-hidden="true" />
            <div className={`team-scrap-image ${person.photo ? "has-photo" : ""}`}>
              <span>0{index + 1}</span>
              <Image
                alt={person.photo ? `${person.name}, ${person.role}` : ""}
                src={person.image}
                width={2048}
                height={2048}
                sizes="(max-width: 760px) 72vw, 360px"
              />
            </div>
            <p>{person.role}</p>
            <h3>{person.name}</h3>
            <span>{person.detail}</span>
          </article>
        </Reveal>
      ))}
    </div>
  );
}
