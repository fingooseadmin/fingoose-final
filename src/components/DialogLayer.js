"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { usePathname } from "next/navigation";

export default function DialogLayer({ children }) {
  const [mounted, setMounted] = useState(false);
  const layerRef = useRef(null);
  const pathname = usePathname();
  useEffect(() => setMounted(true), []);
  useEffect(() => {
    if (!mounted) return;
    const layer = layerRef.current;
    const dialog = layer.querySelector('[role="dialog"]');
    const opener = document.activeElement;
    const overflow = document.body.style.overflow;
    const siblings = [...document.body.children].filter(node => node !== layer && node.tagName !== "SCRIPT");
    const previous = siblings.map(node => [node, node.inert]);
    previous.forEach(([node]) => { node.inert = true; });
    document.body.style.overflow = "hidden";
    if (dialog) {
      dialog.tabIndex = -1;
      dialog.focus({ preventScroll: true });
    }
    const trap = event => {
      if (event.key !== "Tab" || !dialog) return;
      const nodes = [...dialog.querySelectorAll('button:not([disabled]),a[href],input:not([disabled]),select,textarea,[tabindex="0"]')]
        .filter(node => node.getClientRects().length && getComputedStyle(node).visibility !== "hidden");
      const first = nodes[0], last = nodes[nodes.length - 1];
      if (!first) { event.preventDefault(); return; }
      if (event.shiftKey && (document.activeElement === first || document.activeElement === dialog)) {
        event.preventDefault(); last.focus();
      } else if (!event.shiftKey && (document.activeElement === last || document.activeElement === dialog)) {
        event.preventDefault(); first.focus();
      }
    };
    document.addEventListener("keydown", trap, true);
    return () => {
      document.removeEventListener("keydown", trap, true);
      previous.forEach(([node, inert]) => { node.inert = inert; });
      document.body.style.overflow = overflow;
      if (opener?.isConnected) opener.focus({ preventScroll: true });
    };
  }, [mounted]);
  if (!mounted) return null;
  const pageClass = pathname.startsWith("/about") ? "about-page" : pathname.startsWith("/impact") ? "impact-page" : "";
  return createPortal(<div ref={layerRef} className={"scrapbook-site modal-root " + pageClass}>{children}</div>, document.body);
}

