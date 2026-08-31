"use client";

import Image from "next/image";
import Link from "@/components/StaticLink";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Icon from "./Icon";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/join-us", label: "Join Us" },
  { href: "/impact", label: "Our Impact" },
  { href: "/contact", label: "Contact" },
  { href: "/donate", label: "Donate", icon: true }
];

const resourceLinks = [
  { href: "/resources/curriculum", label: "Curriculum & classroom tools", icon: "school" },
  { href: "/resources/books", label: "Children’s books", icon: "book" },
  { href: "/resources/workshops", label: "In-person workshops", icon: "chart" },
  { href: "/course", label: "Online course", icon: "play" },
  { href: "/resources/autism-kit", label: "Autism learning kit", icon: "heart" }
];

export default function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const navigationRef = useRef(null);

  useEffect(() => {
    let frame = 0;
    let lastScrolled = null;
    const update = () => {
      const nextScrolled = window.scrollY > 18;
      if (nextScrolled !== lastScrolled) {
        lastScrolled = nextScrolled;
        setScrolled(nextScrolled);
      }
      frame = 0;
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    const navigation = navigationRef.current;
    if (!navigation) return undefined;

    const centerActiveItem = () => {
      if (!window.matchMedia("(max-width: 860px)").matches) {
        navigation.scrollLeft = 0;
        return;
      }

      const active = navigation.querySelector('[aria-current="page"]');
      if (!active) return;

      const item = active.closest(".nav-resource-menu") || active;
      const target = item.offsetLeft - (navigation.clientWidth - item.offsetWidth) / 2;
      navigation.scrollTo({ left: Math.max(0, target), behavior: "auto" });
    };

    const frame = window.requestAnimationFrame(centerActiveItem);
    window.addEventListener("resize", centerActiveItem, { passive: true });

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("resize", centerActiveItem);
    };
  }, [pathname]);

  return (
    <header
      className={
        "site-header scrapbook-header" +
        (pathname === "/" ? " is-home-header" : "") +
        (scrolled ? " is-scrolled" : "")
      }
    >
      <div className="nav-shell">
        <Link className="brand" href="/" aria-label="FinGoose home">
          <span className="brand-badge">
            <Image
              alt=""
              src="/assets/finn-badge.png"
              width={500}
              height={500}
              sizes="56px"
              priority
            />
          </span>
          <span className="brand-word">
            <span>Fin</span>Goose
          </span>
        </Link>

        <span className="header-brand-divider" aria-hidden="true" />

        <nav className="page-selector" aria-label="Primary navigation" ref={navigationRef}>
          {links.slice(0, 4).map((link) => {
            const active =
              link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                className={`${active ? "is-active" : ""} ${link.icon ? "selector-donate" : ""}`}
                href={link.href}
                aria-current={active ? "page" : undefined}
              >
                {link.label}
                {link.icon ? <Icon name="heart" size={14} /> : null}
              </Link>
            );
          })}

          <div className={`nav-resource-menu ${pathname.startsWith("/resources") ? "is-active" : ""}`}>
            <Link
              className="nav-resource-trigger"
              href="/resources"
              aria-current={pathname.startsWith("/resources") ? "page" : undefined}
            >
              Resources
              <span className="resource-modular-symbol" aria-hidden="true">
                <i />
                <i />
                <i />
                <i />
              </span>
            </Link>
            <div className="resource-dropdown">
              <span className="resource-dropdown-label">Choose a resource</span>
              {resourceLinks.map((resource) => (
                <Link href={resource.href} key={resource.href}>
                  <span><Icon name={resource.icon} size={16} /></span>
                  {resource.label}
                  <Icon name="arrow" size={14} />
                </Link>
              ))}
            </div>
          </div>

          {links.slice(4).map((link) => {
            const active = pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                className={`${active ? "is-active" : ""} ${link.icon ? "selector-donate" : ""}`}
                href={link.href}
                aria-current={active ? "page" : undefined}
              >
                {link.label}
                {link.icon ? <Icon name="heart" size={14} /> : null}
              </Link>
            );
          })}
        </nav>
      </div>
      <div className="header-thread" aria-hidden="true">
        <span />
        <span />
        <span />
        <span />
      </div>
    </header>
  );
}
