"use client";

import { type CSSProperties, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";

import {
  scrollHeroNavLinks,
  scrollHeroSatellites,
} from "@/data/homepage";

type ScrollHeroPhase =
  | "scroll-hero-phase-one"
  | "scroll-hero-phase-two"
  | "scroll-hero-phase-three";

export default function CordiallyScrollHero() {
  const sceneRef = useRef<HTMLElement | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [frame, setFrame] = useState<{
    phase: ScrollHeroPhase;
    revealStep: number;
    navScrolled: boolean;
    galleryScale: number;
    galleryOpacity: number;
  }>({
    phase: "scroll-hero-phase-one",
    revealStep: 0,
    navScrolled: false,
    galleryScale: 1,
    galleryOpacity: 1,
  });

  useEffect(() => {
    let ticking = false;

    const clamp = (value: number, min = 0, max = 1) =>
      Math.min(max, Math.max(min, value));

    const updateScrollState = () => {
      const scene = sceneRef.current;

      if (!scene) {
        ticking = false;
        return;
      }

      const rect = scene.getBoundingClientRect();
      const sceneTop = window.scrollY + rect.top;
      const dwellDistance = Math.max(1, scene.offsetHeight - window.innerHeight);
      const localY = window.scrollY - sceneTop;
      const progress = clamp(localY / dwellDistance);
      const exitProgress = clamp((progress - 0.78) / 0.2);
      const revealStep =
        progress > 0.7
          ? 4
          : progress > 0.52
            ? 3
            : progress > 0.34
              ? 2
              : localY > 180
                ? 1
                : 0;
      const nextPhase: ScrollHeroPhase =
        revealStep === 4
          ? "scroll-hero-phase-three"
          : localY > 100
            ? "scroll-hero-phase-two"
            : "scroll-hero-phase-one";
      const nextFrame = {
        phase: nextPhase,
        revealStep,
        navScrolled: localY > 100,
        galleryScale: Number((1 - exitProgress * 0.04).toFixed(3)),
        galleryOpacity: Number((1 - exitProgress * 0.2).toFixed(3)),
      };

      setFrame((current) => {
        if (
          current.phase === nextFrame.phase &&
          current.revealStep === nextFrame.revealStep &&
          current.navScrolled === nextFrame.navScrolled &&
          current.galleryScale === nextFrame.galleryScale &&
          current.galleryOpacity === nextFrame.galleryOpacity
        ) {
          return current;
        }

        return nextFrame;
      });

      ticking = false;
    };

    const requestTick = () => {
      if (ticking) return;

      ticking = true;
      window.requestAnimationFrame(updateScrollState);
    };

    updateScrollState();
    window.addEventListener("scroll", requestTick, { passive: true });
    window.addEventListener("resize", requestTick);

    return () => {
      window.removeEventListener("scroll", requestTick);
      window.removeEventListener("resize", requestTick);
    };
  }, []);

  return (
    <section
      ref={sceneRef}
      id="hero-section"
      className={`scroll-hero-root scroll-hero-scene ${frame.phase} scroll-hero-reveal-${frame.revealStep}`}
      aria-label="Marvin and Jovelyn hero gallery"
    >
      <nav
        className={`scroll-hero-nav ${frame.navScrolled ? "is-scrolled" : ""}`}
        aria-label="Primary navigation"
      >
        <div className="scroll-hero-nav-shell">
          <Link
            href="/"
            className="scroll-hero-brand"
            aria-label="Marvin and Jovelyn home"
          >
            M&amp;J
          </Link>

          <div className="scroll-hero-actions">
            <Link href="/rsvp" className="scroll-hero-nav-cta">
              Submit RSVP
            </Link>
            <button
              type="button"
              className="scroll-hero-menu-btn"
              onClick={() => setIsMenuOpen(true)}
              aria-label="Open menu"
            >
              <Menu size={22} />
            </button>
          </div>
        </div>
      </nav>

      <div className={`scroll-hero-mobile-menu ${isMenuOpen ? "is-open" : ""}`}>
        <div
          className="scroll-hero-mobile-menu-backdrop"
          onClick={() => setIsMenuOpen(false)}
        />
        <div className="scroll-hero-mobile-menu-panel">
          <button
            type="button"
            className="scroll-hero-mobile-menu-close"
            onClick={() => setIsMenuOpen(false)}
            aria-label="Close menu"
          >
            <X size={24} />
          </button>
          <div className="scroll-hero-mobile-menu-links">
            {scrollHeroNavLinks.map((item) => (
              <Link
                href={item.href}
                key={item.href}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="scroll-hero-stage">
        <div
          className="scroll-hero-gallery"
          style={
            {
              "--gallery-scale": frame.galleryScale,
              "--gallery-opacity": frame.galleryOpacity,
            } as CSSProperties
          }
        >
          <figure
            className="scroll-hero-main-card"
            aria-label="Mountain proposal photo"
          >
            <Image
              src="/images/proposal.webp"
              alt="Marvin proposing to Jovelyn on a mountain at sunrise"
              fill
              priority
              sizes="100vw"
              className="scroll-hero-image scroll-hero-main-image"
            />
            <figcaption className="sr-only">Marvin and Jovelyn</figcaption>
          </figure>

          <h1 className="scroll-hero-title">Marvin &amp; Jovelyn</h1>

          <div className="scroll-hero-cue" aria-hidden="true">
            <span className="scroll-hero-arrow">
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  d="M12 4v15m0 0 6-6m-6 6-6-6"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.7"
                />
              </svg>
            </span>
            <span className="scroll-hero-cue-label">Scroll to explore</span>
          </div>

          {scrollHeroSatellites.map((image) => (
            <figure
              className={`scroll-hero-satellite ${image.className}`}
              key={image.src}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(max-width: 560px) 46vw, (max-width: 880px) 38vw, 30vw"
                className="scroll-hero-image"
              />
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
