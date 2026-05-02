"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const menuLinks = [
  { label: "Our Story", href: "/#story" },
  { label: "Logistics", href: "/#logistics" },
  { label: "Details", href: "/#details" },
  { label: "FAQ", href: "/#faq" },
] as const;

export default function NavBar() {
  const pathname = usePathname() ?? "/";
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 12);

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <nav className={`cordially-nav ${isScrolled ? "is-scrolled" : ""}`}>
      <div className="cordially-nav-shell">
        <Link href="/" className="cordially-nav-brand" aria-label="Marvin and Jovelyn home">
          M&amp;J
        </Link>

        <div className="cordially-nav-actions">
          <Link href="/rsvp" className="cordially-nav-rsvp">
            Submit RSVP
          </Link>
          <button
            type="button"
            className="cordially-menu-button"
            aria-label="Toggle menu"
            aria-expanded={isOpen}
            aria-controls="primary-menu"
            onClick={() => setIsOpen((value) => !value)}
          >
            <span />
            <span />
          </button>
        </div>

        <div
          id="primary-menu"
          className={`cordially-nav-menu ${isOpen ? "is-open" : ""}`}
        >
          <ul>
            {menuLinks.map((item) => (
              <li key={item.href}>
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}
