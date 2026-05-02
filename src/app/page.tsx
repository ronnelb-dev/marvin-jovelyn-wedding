"use client";

import { type CSSProperties, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Check, ChevronDown, Plus, X, Menu } from "lucide-react";

import Footer from "@/components/Footer";
import { AnimatedStory } from "@/components/ui/animated-story";

const scrollHeroNavLinks = [
  { label: "Our Story", href: "#story-intro" },
  { label: "Logistics", href: "#logistics" },
  { label: "Details", href: "#details" },
  { label: "FAQ", href: "#faq" },
] as const;

const scrollHeroSatellites = [
  {
    className: "scroll-hero-satellite-a",
    src: "/images/slider1.webp",
    alt: "Marvin and Jovelyn sitting together on rocky white cliffs",
  },
  {
    className: "scroll-hero-satellite-b",
    src: "/images/slider6.webp",
    alt: "Marvin and Jovelyn standing together on a forest trail",
  },
  {
    className: "scroll-hero-satellite-c",
    src: "/images/slider4.webp",
    alt: "Marvin and Jovelyn swimming inside a rocky ocean cave",
  },
  {
    className: "scroll-hero-satellite-d",
    src: "/images/slider7.webp",
    alt: "Marvin and Jovelyn at golden hour above the clouds",
  },
] as const;

const scrollHeroStyles = `
@import url("https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@1,500;1,600&family=Inter:wght@400;500;600;700&display=swap");

:root {
  --scroll-hero-color-bg: #f5f0eb;
  --scroll-hero-color-overlay: rgba(0, 0, 0, 0.08);
  --scroll-hero-color-overlay-strong: rgba(0, 0, 0, 0.18);
  --scroll-hero-color-nav-text: #1a1a1a;
  --scroll-hero-color-nav-inverse: #ffffff;
  --scroll-hero-color-cta-bg: #1a1a1a;
  --scroll-hero-color-cta-text: #ffffff;
  --scroll-hero-color-nav-bg: rgba(255, 255, 255, 0.88);
  --scroll-hero-color-nav-border: rgba(26, 26, 26, 0.08);
  --scroll-hero-color-card-bg: #ffffff;
  --scroll-hero-color-focus: rgba(26, 26, 26, 0.24);
  --scroll-hero-color-transparent: transparent;
  --scroll-hero-shadow-card: 0 8px 32px rgba(0, 0, 0, 0.12);
  --scroll-hero-shadow-nav: 0 18px 48px rgba(0, 0, 0, 0.12);
  --scroll-hero-shadow-title: 0 18px 42px rgba(0, 0, 0, 0.18);
  --scroll-hero-radius-card: 20px;
  --scroll-hero-radius-none: 0;
  --scroll-hero-radius-pill: 999px;
  --scroll-hero-radius-focus: 12px;
  --scroll-hero-font-display: "Cormorant Garamond", serif;
  --scroll-hero-font-body: "Inter", sans-serif;
  --scroll-hero-fs-body: 16px;
  --scroll-hero-fs-nav: 13px;
  --scroll-hero-fs-logo: 18px;
  --scroll-hero-fs-title: clamp(4.6rem, 9.5vw, 11rem);
  --scroll-hero-fs-cue: 11px;
  --scroll-hero-ease-out: cubic-bezier(0.16, 1, 0.3, 1);
  --scroll-hero-nav-height: 64px;
  --scroll-hero-nav-floating-height: 56px;
  --scroll-hero-phase-duration: 600ms;
  --scroll-hero-nav-duration: 400ms;
  --scroll-hero-frame-inset: 17px;
}

.scroll-hero-root {
  position: relative;
  min-height: 100vh;
  overflow-x: clip;
  background: var(--scroll-hero-color-bg);
  color: var(--scroll-hero-color-nav-text);
  font-family: var(--scroll-hero-font-body);
  font-size: var(--scroll-hero-fs-body);
}

.scroll-hero-root :where(a[href], button:not(:disabled)) {
  cursor: pointer;
}

.scroll-hero-root a:focus-visible,
.scroll-hero-root button:focus-visible {
  border-radius: var(--scroll-hero-radius-focus);
  outline: 2px solid var(--scroll-hero-color-focus);
  outline-offset: 4px;
}

.scroll-hero-nav {
  position: fixed;
  inset: 0 0 auto;
  z-index: 80;
  display: flex;
  justify-content: center;
  padding: 0;
  color: var(--scroll-hero-color-nav-inverse);
  pointer-events: none;
  transition: all var(--scroll-hero-nav-duration) ease;
}

.scroll-hero-nav-shell {
  display: grid;
  grid-template-columns: minmax(88px, 1fr) auto;
  align-items: center;
  gap: 28px;
  width: calc(100vw - (var(--scroll-hero-frame-inset) * 2));
  height: var(--scroll-hero-nav-height);
  margin: var(--scroll-hero-frame-inset) auto 0;
  padding: 0 14px;
  border: 1px solid var(--scroll-hero-color-transparent);
  border-radius: var(--scroll-hero-radius-none);
  background: var(--scroll-hero-color-transparent);
  box-shadow: none;
  color: inherit;
  pointer-events: auto;
  transition: all var(--scroll-hero-nav-duration) ease;
}

.scroll-hero-nav.is-scrolled .scroll-hero-nav-shell {
  width: min(calc(100vw - 32px), 1060px);
  height: var(--scroll-hero-nav-floating-height);
  margin-top: 18px;
  padding: 0 18px;
  border-color: var(--scroll-hero-color-nav-border);
  border-radius: var(--scroll-hero-radius-pill);
  background: var(--scroll-hero-color-nav-bg);
  box-shadow: var(--scroll-hero-shadow-nav);
  color: var(--scroll-hero-color-nav-text);
  backdrop-filter: blur(18px);
}

.scroll-hero-brand {
  color: currentColor;
  font-family: var(--scroll-hero-font-display);
  font-size: var(--scroll-hero-fs-logo);
  font-style: italic;
  font-weight: 600;
  line-height: 1;
  text-decoration: none;
  white-space: nowrap;
}

.scroll-hero-nav-cta {
  font-size: var(--scroll-hero-fs-nav);
  font-weight: 700;
  letter-spacing: 0.02em;
  line-height: 1;
  text-decoration: none;
  white-space: nowrap;
}

.scroll-hero-actions {
  display: flex;
  align-items: center;
  gap: 8px;
}

.scroll-hero-menu-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  border-radius: var(--scroll-hero-radius-pill);
  background: var(--scroll-hero-color-transparent);
  color: currentColor;
  border: none;
  transition: background 200ms ease;
}

.scroll-hero-menu-btn:hover {
  background: rgba(255, 255, 255, 0.1);
}

.scroll-hero-nav.is-scrolled .scroll-hero-menu-btn:hover {
  background: rgba(0, 0, 0, 0.05);
}

.scroll-hero-mobile-menu {
  position: fixed;
  inset: 0;
  z-index: 100;
  display: flex;
  justify-content: flex-end;
  pointer-events: none;
}

.scroll-hero-mobile-menu.is-open {
  pointer-events: auto;
}

.scroll-hero-mobile-menu-backdrop {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  opacity: 0;
  transition: opacity 300ms ease;
}

.scroll-hero-mobile-menu.is-open .scroll-hero-mobile-menu-backdrop {
  opacity: 1;
  backdrop-filter: blur(4px);
}

.scroll-hero-mobile-menu-panel {
  position: relative;
  width: min(100vw - 32px, 360px);
  height: 100%;
  background: var(--scroll-hero-color-bg);
  padding: 32px 24px;
  display: flex;
  flex-direction: column;
  transform: translateX(100%);
  transition: transform 400ms cubic-bezier(0.16, 1, 0.3, 1);
  color: var(--scroll-hero-color-nav-text);
  box-shadow: -8px 0 32px rgba(0, 0, 0, 0.1);
}

.scroll-hero-mobile-menu.is-open .scroll-hero-mobile-menu-panel {
  transform: translateX(0);
}

.scroll-hero-mobile-menu-close {
  align-self: flex-end;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: var(--scroll-hero-radius-pill);
  background: rgba(0, 0, 0, 0.05);
  border: none;
  color: currentColor;
  margin-bottom: 48px;
  transition: background 200ms ease;
}

.scroll-hero-mobile-menu-close:hover {
  background: rgba(0, 0, 0, 0.1);
}

.scroll-hero-mobile-menu-links {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.scroll-hero-mobile-menu-links a {
  font-family: var(--scroll-hero-font-display);
  font-size: 36px;
  font-style: italic;
  font-weight: 600;
  color: currentColor;
  text-decoration: none;
  opacity: 0;
  transition: opacity 300ms ease, transform 300ms ease;
  transform: translateX(20px);
}

.scroll-hero-mobile-menu.is-open .scroll-hero-mobile-menu-links a {
  opacity: 1;
  transform: translateX(0);
}

.scroll-hero-mobile-menu-links a:nth-child(1) { transition-delay: 100ms; }
.scroll-hero-mobile-menu-links a:nth-child(2) { transition-delay: 150ms; }
.scroll-hero-mobile-menu-links a:nth-child(3) { transition-delay: 200ms; }
.scroll-hero-mobile-menu-links a:nth-child(4) { transition-delay: 250ms; }

.scroll-hero-mobile-menu-links a:hover {
  opacity: 0.6;
}

.scroll-hero-nav-cta {
  display: inline-flex;
  min-height: 38px;
  align-items: center;
  justify-content: center;
  border-radius: var(--scroll-hero-radius-pill);
  background: var(--scroll-hero-color-cta-bg);
  color: var(--scroll-hero-color-cta-text);
  padding: 0 18px;
  transition: transform 200ms ease;
}

.scroll-hero-nav-cta:hover {
  transform: translateY(-1px);
}

.scroll-hero-scene {
  position: relative;
  height: 350svh;
  background: var(--scroll-hero-color-bg);
}

.scroll-hero-stage {
  position: sticky;
  top: 0;
  height: 100svh;
  overflow: hidden;
  background: var(--scroll-hero-color-bg);
  isolation: isolate;
}

.scroll-hero-gallery {
  position: absolute;
  inset: 0;
  transform: scale(var(--gallery-scale, 1));
  transform-origin: center;
  opacity: var(--gallery-opacity, 1);
  transition: opacity 360ms ease, transform 360ms ease;
}

.scroll-hero-main-card,
.scroll-hero-satellite {
  position: absolute;
  overflow: hidden;
  background: var(--scroll-hero-color-card-bg);
  will-change: transform, width, height, inset, opacity, border-radius;
}

.scroll-hero-main-card {
  z-index: 5;
  top: var(--scroll-hero-frame-inset);
  left: var(--scroll-hero-frame-inset);
  width: calc(100vw - (var(--scroll-hero-frame-inset) * 2));
  height: calc(100svh - (var(--scroll-hero-frame-inset) * 2));
  border-radius: var(--scroll-hero-radius-card);
  box-shadow: none;
  transform: translateX(0) scale(1);
  transition:
    top var(--scroll-hero-phase-duration) var(--scroll-hero-ease-out),
    left var(--scroll-hero-phase-duration) var(--scroll-hero-ease-out),
    width var(--scroll-hero-phase-duration) var(--scroll-hero-ease-out),
    height var(--scroll-hero-phase-duration) var(--scroll-hero-ease-out),
    border-radius var(--scroll-hero-phase-duration) var(--scroll-hero-ease-out),
    box-shadow var(--scroll-hero-phase-duration) var(--scroll-hero-ease-out),
    transform var(--scroll-hero-phase-duration) var(--scroll-hero-ease-out);
}

.scroll-hero-phase-two .scroll-hero-main-card,
.scroll-hero-phase-three .scroll-hero-main-card {
  top: clamp(86px, 11svh, 112px);
  left: 50%;
  width: min(55vw, 720px);
  height: min(76svh, 760px);
  border-radius: var(--scroll-hero-radius-card);
  box-shadow: var(--scroll-hero-shadow-card);
  transform: translateX(-50%) scale(1);
}

.scroll-hero-main-card::after {
  content: "";
  position: absolute;
  inset: 0;
  z-index: 2;
  background: var(--scroll-hero-color-overlay);
  transition: background var(--scroll-hero-phase-duration) ease;
}

.scroll-hero-phase-two .scroll-hero-main-card::after,
.scroll-hero-phase-three .scroll-hero-main-card::after {
  background: var(--scroll-hero-color-overlay-strong);
}

.scroll-hero-image {
  object-fit: cover;
  user-select: none;
  -webkit-user-drag: none;
}

.scroll-hero-main-image {
  object-position: 52% 50%;
}

.scroll-hero-title {
  position: absolute;
  left: 50%;
  bottom: clamp(132px, 16vh, 176px);
  z-index: 8;
  width: min(96vw, 1320px);
  margin: 0;
  transform: translateX(-50%) scale(1);
  transform-origin: center;
  color: var(--scroll-hero-color-nav-inverse);
  font-family: var(--scroll-hero-font-display);
  font-size: var(--scroll-hero-fs-title);
  font-style: italic;
  font-weight: 600;
  letter-spacing: 0;
  line-height: 0.82;
  text-align: center;
  text-shadow: var(--scroll-hero-shadow-title);
  white-space: nowrap;
  transition:
    opacity var(--scroll-hero-phase-duration) var(--scroll-hero-ease-out),
    transform var(--scroll-hero-phase-duration) var(--scroll-hero-ease-out);
}

.scroll-hero-phase-two .scroll-hero-title {
  opacity: 0.2;
  transform: translateX(-50%) scale(0.92);
}

.scroll-hero-phase-three .scroll-hero-title {
  opacity: 0;
  transform: translateX(-50%) scale(0.9);
}

.scroll-hero-cue {
  position: absolute;
  right: calc(var(--scroll-hero-frame-inset) + 48px);
  bottom: calc(var(--scroll-hero-frame-inset) + 50px);
  left: calc(var(--scroll-hero-frame-inset) + 48px);
  z-index: 9;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: var(--scroll-hero-color-nav-inverse);
  transition: opacity 360ms ease, transform 360ms ease;
}

.scroll-hero-cue::before {
  content: "";
  position: absolute;
  right: 0;
  bottom: 38px;
  left: 0;
  height: 1px;
  background: currentColor;
  opacity: 0.52;
}

.scroll-hero-phase-two .scroll-hero-cue,
.scroll-hero-phase-three .scroll-hero-cue {
  opacity: 0;
  transform: translateY(12px);
}

.scroll-hero-arrow {
  display: inline-flex;
  width: 34px;
  height: 34px;
  align-items: center;
  justify-content: center;
}

.scroll-hero-cue-label {
  font-size: var(--scroll-hero-fs-cue);
  font-weight: 700;
  letter-spacing: 0.24em;
  text-transform: uppercase;
}

.scroll-hero-satellite {
  z-index: 10;
  border-radius: var(--scroll-hero-radius-card);
  box-shadow: var(--scroll-hero-shadow-card);
  opacity: 0;
  transition:
    opacity var(--scroll-hero-phase-duration) var(--scroll-hero-ease-out),
    transform var(--scroll-hero-phase-duration) var(--scroll-hero-ease-out);
}

.scroll-hero-satellite-a {
  top: 15svh;
  left: max(22px, calc(50% - 43vw));
  width: clamp(220px, 30vw, 450px);
  height: clamp(136px, 19vw, 260px);
  transform: translateX(-120%) rotate(-1deg);
  transition-delay: 0ms;
}

.scroll-hero-satellite-b {
  top: 54svh;
  left: max(28px, calc(50% - 36vw));
  width: clamp(164px, 21vw, 300px);
  height: clamp(164px, 21vw, 300px);
  transform: translateX(-120%) translateY(40px) rotate(0deg);
  transition-delay: 0ms;
}

.scroll-hero-satellite-c {
  top: 15svh;
  right: max(24px, calc(50% - 43vw));
  width: clamp(176px, 20vw, 310px);
  height: clamp(300px, 53svh, 520px);
  transform: translateX(120%) rotate(0.8deg);
  transition-delay: 0ms;
}

.scroll-hero-satellite-d {
  top: 61svh;
  right: max(34px, calc(50% - 35vw));
  width: clamp(146px, 17vw, 250px);
  height: clamp(210px, 28svh, 310px);
  transform: translateY(120%) rotate(1deg);
  transition-delay: 0ms;
}

.scroll-hero-satellite-a .scroll-hero-image {
  object-position: 42% 55%;
}

.scroll-hero-satellite-b .scroll-hero-image {
  filter: grayscale(1) contrast(1.08);
  object-position: 50% 74%;
}

.scroll-hero-satellite-c .scroll-hero-image {
  object-position: 52% 50%;
}

.scroll-hero-satellite-d .scroll-hero-image {
  object-position: 54% 52%;
}

.scroll-hero-reveal-1 .scroll-hero-satellite-a,
.scroll-hero-reveal-2 .scroll-hero-satellite-a,
.scroll-hero-reveal-3 .scroll-hero-satellite-a,
.scroll-hero-reveal-4 .scroll-hero-satellite-a {
  opacity: 1;
  transform: translateX(0) rotate(-1deg);
}

.scroll-hero-reveal-2 .scroll-hero-satellite-b,
.scroll-hero-reveal-3 .scroll-hero-satellite-b,
.scroll-hero-reveal-4 .scroll-hero-satellite-b {
  opacity: 1;
  transform: translateX(0) translateY(0) rotate(0deg);
}

.scroll-hero-reveal-3 .scroll-hero-satellite-c,
.scroll-hero-reveal-4 .scroll-hero-satellite-c {
  opacity: 1;
  transform: translateX(0) rotate(0.8deg);
}

.scroll-hero-reveal-4 .scroll-hero-satellite-d {
  opacity: 1;
  transform: translateY(0) rotate(1deg);
}

@media (max-width: 880px) {
  :root {
    --scroll-hero-fs-nav: 12px;
    --scroll-hero-fs-logo: 17px;
    --scroll-hero-fs-title: clamp(3.2rem, 10.8vw, 7rem);
    --scroll-hero-fs-cue: 10px;
  }

  .scroll-hero-nav-shell {
    grid-template-columns: 1fr auto;
    gap: 14px;
    height: 58px;
    padding: 0 18px;
  }

  .scroll-hero-nav.is-scrolled .scroll-hero-nav-shell {
    height: 52px;
    margin-top: 12px;
  }

  .scroll-hero-phase-two .scroll-hero-main-card,
  .scroll-hero-phase-three .scroll-hero-main-card {
    top: 13svh;
    width: min(66vw, 420px);
    height: 69svh;
  }

  .scroll-hero-satellite-a {
    top: 14svh;
    left: 4vw;
    width: 38vw;
    height: 22svh;
  }

  .scroll-hero-satellite-b {
    top: 58svh;
    left: 6vw;
    width: 29vw;
    height: 29vw;
  }

  .scroll-hero-satellite-c {
    top: 20svh;
    right: 4vw;
    width: 28vw;
    height: 44svh;
  }

  .scroll-hero-satellite-d {
    top: 64svh;
    right: 7vw;
    width: 24vw;
    height: 25svh;
  }
}

@media (max-width: 560px) {
  :root {
    --scroll-hero-radius-card: 16px;
    --scroll-hero-fs-title: clamp(3rem, 13vw, 4.8rem);
    --scroll-hero-frame-inset: 10px;
  }

  .scroll-hero-nav-shell {
    padding: 0 14px;
  }

  .scroll-hero-nav-cta {
    min-height: 34px;
    padding: 0 14px;
  }

  .scroll-hero-phase-two .scroll-hero-main-card,
  .scroll-hero-phase-three .scroll-hero-main-card {
    top: 16svh;
    width: min(72vw, 310px);
    height: 62svh;
  }

  .scroll-hero-title {
    bottom: 112px;
  }

  .scroll-hero-cue {
    right: calc(var(--scroll-hero-frame-inset) + 18px);
    bottom: calc(var(--scroll-hero-frame-inset) + 30px);
    left: calc(var(--scroll-hero-frame-inset) + 18px);
  }

  .scroll-hero-satellite-a {
    top: 13svh;
    left: 3vw;
    width: 46vw;
    height: 18svh;
  }

  .scroll-hero-satellite-b {
    top: 62svh;
    left: 4vw;
    width: 34vw;
    height: 34vw;
  }

  .scroll-hero-satellite-c {
    top: 21svh;
    right: 3vw;
    width: 32vw;
    height: 36svh;
  }

  .scroll-hero-satellite-d {
    top: 66svh;
    right: 5vw;
    width: 30vw;
    height: 23svh;
  }
}

@media (prefers-reduced-motion: reduce) {
  .scroll-hero-root *,
  .scroll-hero-root *::before,
  .scroll-hero-root *::after {
    scroll-behavior: auto !important;
    transition-duration: 0.01ms !important;
    transition-delay: 0ms !important;
  }
}
`;

const WEDDING_TARGET = "2026-09-11T16:00:00+08:00";

const storyChapters = [
  {
    title: "chapter one: across the distance",
    body: "Four years of distance, countless conversations, and endless anticipation led us to the moment we finally met face to face.",
    photos: [
      { src: "/images/slider1.webp", alt: "Marvin and Jovelyn by the sea", caption: "A love worth the wait" },
      { src: "/images/slider3.webp", alt: "Together across the distance", caption: "Counting the days" },
      { src: "/images/slider5.webp", alt: "Video calls and messages", caption: "Always connected" },
    ],
  },
  {
    title: "chapter two: the first yes",
    body: "In that magical first meeting, surrounded by the people who supported our journey, the question was finally asked and answered with the sweetest yes.",
    photos: [
      { src: "/images/proposal.webp", alt: "Marvin proposing to Jovelyn", caption: "March 14, 2023" },
      { src: "/images/slider2.webp", alt: "The celebration", caption: "She said yes" },
      { src: "/images/slider4.webp", alt: "With loved ones", caption: "Surrounded by love" },
    ],
  },
  {
    title: "chapter three: what comes next",
    body: "Now we are gathering the people we cherish most to celebrate our wedding day and the new adventure that begins after it.",
    photos: [
      { src: "/images/slider6.webp", alt: "Marvin and Jovelyn outdoor portrait", caption: "Toward forever" },
      { src: "/images/slider7.webp", alt: "Planning the journey", caption: "A new chapter" },
      { src: "/images/table-img.webp", alt: "The venue awaits", caption: "September 2026" },
    ],
  },
];

const schedule = [
  {
    title: "Ceremony",
    time: "4:00 PM - 6:00 PM",
    body: "Join us as we exchange our vows in an intimate ceremony.",
  },
  {
    title: "Photoshoot",
    time: "6:00 PM - 7:00 PM",
    body: "Capture precious moments with us in the garden.",
  },
  {
    title: "Reception",
    time: "7:00 PM - 9:00 PM",
    body: "Celebrate and dance the night away with dinner and drinks.",
  },
] as const;

const menuItems = [
  "Spicy Thai Chicken with Cashew Nuts",
  "Beef with Mushroom & Gravy",
  "Fish Fillet with Mango Tomato Salsa",
  "Alfredo Fettucine",
  "Buttered Corn & Carrots",
  "Vegetable Chowder Soup",
  "Bottomless Iced Tea and Water",
] as const;

const detailCards = [
  {
    id: "timeline",
    title: "Wedding Timeline",
    subtitle: "Every moment of the evening.",
    image: "/images/slider4.webp",
  },
  {
    id: "dress",
    title: "Dress Code",
    subtitle: "Semi-formal neutral and earth tones.",
    image: "/images/ladies-attire-sample.webp",
  },
  {
    id: "menu",
    title: "Dinner Menu",
    subtitle: "A look at what we are serving.",
    image: "/images/table-img.webp",
  },
  {
    id: "palette",
    title: "Color Palette",
    subtitle: "Taupe, sage, cream, and ivory.",
    image: "/images/gentlemen-attire-sample.webp",
  },
  {
    id: "gifts",
    title: "Gifts",
    subtitle: "A note for our Japan move.",
    image: "/images/slider7.webp",
  },
  {
    id: "venue",
    title: "Venue Details",
    subtitle: "Sky Garden Cafe, Santa Rosa.",
    image: "/images/slider2.webp",
  },
] as const;

const faqs = [
  {
    question: "When should I RSVP by?",
    answer: "Please respond by September 1st, 2026 so we can finalize the celebration details.",
  },
  {
    question: "Where is the wedding?",
    answer: "The ceremony and reception will be held at Sky Garden Cafe, Lazuri Hotel Tagaytay, Santa Rosa.",
  },
  {
    question: "What time should I arrive?",
    answer: "The ceremony begins at 4:00 PM. Please arrive around 15 minutes early so everyone has time to settle in.",
  },
  {
    question: "Is there a dress code?",
    answer: "Yes. We would love semi-formal attire in neutral and earth tones such as taupe, sage green, cream, and ivory.",
  },
  {
    question: "Can I bring a guest?",
    answer: "We are delighted to welcome your plus one. Please include their name when you submit your RSVP.",
  },
  {
    question: "What gifts would be most helpful?",
    answer: "As we prepare to move to Japan, monetary gifts would mean a lot and will help us with moving expenses and settling into our new home.",
  },
  {
    question: "Can dietary restrictions be accommodated?",
    answer: "Please include allergies or dietary needs in your RSVP message and we will do our best to accommodate them.",
  },
] as const;

type ScrollHeroPhase =
  | "scroll-hero-phase-one"
  | "scroll-hero-phase-two"
  | "scroll-hero-phase-three";

type DetailId = (typeof detailCards)[number]["id"];

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

function CordiallyScrollHero() {
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
          <Link href="/" className="scroll-hero-brand" aria-label="Marvin and Jovelyn home">
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
        <div className="scroll-hero-mobile-menu-backdrop" onClick={() => setIsMenuOpen(false)} />
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
          <figure className="scroll-hero-main-card" aria-label="Mountain proposal photo">
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

function getTimeLeft(): TimeLeft {
  const difference = Math.max(0, +new Date(WEDDING_TARGET) - +new Date());

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / 1000 / 60) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  };
}

function CountdownStrip() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);

  useEffect(() => {
    const update = () => setTimeLeft(getTimeLeft());
    update();

    const timer = window.setInterval(update, 1000);
    return () => window.clearInterval(timer);
  }, []);

  const units = useMemo(
    () => [
      { label: "Days", value: timeLeft?.days ?? 0 },
      { label: "Hours", value: timeLeft?.hours ?? 0 },
      { label: "Minutes", value: timeLeft?.minutes ?? 0 },
      { label: "Seconds", value: timeLeft?.seconds ?? 0 },
    ],
    [timeLeft],
  );

  return (
    <div className="cordially-countdown" aria-label="Countdown to the wedding">
      {units.map((unit, index) => (
        <div className="cordially-countdown-unit" key={unit.label}>
          <span className="cordially-countdown-number">
            {String(unit.value).padStart(index === 0 ? 1 : 2, "0")}
          </span>
          <span className="cordially-countdown-label">{unit.label}</span>
        </div>
      ))}
    </div>
  );
}

function DetailModal({
  activeDetail,
  onClose,
}: {
  activeDetail: DetailId | null;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!activeDetail) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [activeDetail, onClose]);

  if (!activeDetail) return null;

  const current = detailCards.find((card) => card.id === activeDetail);

  return (
    <div className="cordially-modal" role="dialog" aria-modal="true">
      <button
        type="button"
        className="cordially-modal-backdrop"
        aria-label="Close details"
        onClick={onClose}
      />
      <div className="cordially-modal-panel">
        <button
          type="button"
          className="cordially-modal-close"
          aria-label="Close details"
          onClick={onClose}
        >
          <X size={20} />
        </button>
        <p className="cordially-kicker">details</p>
        <h3 className="cordially-modal-title">{current?.title}</h3>
        <div className="cordially-modal-divider" />
        {activeDetail === "timeline" && (
          <div className="cordially-modal-list">
            {schedule.map((item) => (
              <article className="cordially-modal-row" key={item.title}>
                <span>{item.time}</span>
                <div>
                  <h4>{item.title}</h4>
                  <p>{item.body}</p>
                </div>
              </article>
            ))}
          </div>
        )}
        {activeDetail === "dress" && (
          <div className="cordially-modal-copy">
            <p>
              We appreciate semi-formal attire in neutral tones that harmonize
              with our elegant palette. Avoid very bright neon colors or bold
              patterns that might compete with the refined aesthetic we have
              envisioned.
            </p>
            <div className="cordially-two-col">
              <div>
                <h4>For Ladies</h4>
                <p>
                  Cocktail dresses, dressy blouses with dress pants, or elegant
                  midi/maxi dresses in taupe, cream, or earth tones.
                </p>
              </div>
              <div>
                <h4>For Gentlemen</h4>
                <p>
                  Dress shirts with slacks, blazers optional, or polo shirts
                  with dress pants in neutral or earth tones.
                </p>
              </div>
            </div>
          </div>
        )}
        {activeDetail === "menu" && (
          <ul className="cordially-menu-list">
            {menuItems.map((item) => (
              <li key={item}>
                <Check size={18} />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        )}
        {activeDetail === "palette" && (
          <div className="cordially-palette-grid">
            {[
              ["Taupe", "#8B7355"],
              ["Sage Green", "#B2AC88"],
              ["Cream", "#E8E4DF"],
              ["Ivory", "#F5F3F0"],
            ].map(([label, value]) => (
              <div key={label} className="cordially-swatch">
                <span style={{ backgroundColor: value }} />
                <div>
                  <h4>{label}</h4>
                  <p>{value}</p>
                </div>
              </div>
            ))}
          </div>
        )}
        {activeDetail === "gifts" && (
          <div className="cordially-modal-copy">
            <p>
              As we prepare for our exciting journey to Japan, we are in the
              process of downsizing and carefully selecting what to bring with
              us. International shipping is quite expensive, and we want to
              start fresh in our new home.
            </p>
            <p>
              If you would like to celebrate with us, we would be incredibly
              grateful for monetary gifts instead of physical items. This will
              help us with moving expenses and getting settled in Japan.
            </p>
          </div>
        )}
        {activeDetail === "venue" && (
          <div className="cordially-modal-copy">
            <p>
              Join us at Sky Garden Cafe, Lazuri Hotel Tagaytay in Santa Rosa
              for our ceremony, photoshoot, and reception.
            </p>
            <a
              href="https://www.google.com/maps/dir//Brgy,+Tagaytay+-+Nasugbu+Hwy,+Tagaytay+City,+4120+Cavite/@14.0873567,120.8964515,16z/data=!4m9!4m8!1m0!1m5!1m1!1s0x33bd772fa2bb7ca1:0xd9fe20a6632bdd4b!2m2!1d120.8981882!2d14.0882557!3e0!5m2!1e1!1e4?entry=ttu&g_ep=EgoyMDI1MDUyNy4wIKXMDSoASAFQAw%3D%3D"
              target="_blank"
              rel="noopener noreferrer"
              className="cordially-text-link"
            >
              Open directions
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

export default function Home() {
  const [activeDetail, setActiveDetail] = useState<DetailId | null>(null);
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <>
      <style>{scrollHeroStyles}</style>
      <main className="cordially-template">
        <CordiallyScrollHero />

        <section id="story-intro" className="cordially-story-intro">
          <p aria-label="Two souls, one love. You are cordially invited to celebrate our story.">
            {"two souls, one love, you are cordially invited to celebrate our story.".split(
              " ",
            ).map((word, index) => (
              <span key={`${word}-${index}`} style={{ "--word-index": index } as CSSProperties}>
                {word}
              </span>
            ))}
          </p>
        </section>

        <AnimatedStory
          kicker="our beginning"
          heading="our story"
          chapters={storyChapters}
        />

        <section id="logistics" className="cordially-logistics">
          <div className="cordially-logistics-sticky">
            <p className="cordially-display-small">so please join us...</p>
            <h2>september 11, 2026</h2>
            <CountdownStrip />
          </div>
          <div className="cordially-venue">
            <div className="cordially-venue-image">
              <Image
                src="/images/table-img.webp"
                alt="Wedding reception table setup at Sky Garden Cafe"
                width={1400}
                height={900}
              />
            </div>
            <p className="cordially-display-small">Sky Garden Cafe</p>
            <a
              href="https://www.google.com/maps/dir//Brgy,+Tagaytay+-+Nasugbu+Hwy,+Tagaytay+City,+4120+Cavite/@14.0873567,120.8964515,16z/data=!4m9!4m8!1m0!1m5!1m1!1s0x33bd772fa2bb7ca1:0xd9fe20a6632bdd4b!2m2!1d120.8981882!2d14.0882557!3e0!5m2!1e1!1e4?entry=ttu&g_ep=EgoyMDI1MDUyNy4wIKXMDSoASAFQAw%3D%3D"
              target="_blank"
              rel="noopener noreferrer"
            >
              Lazuri Hotel Tagaytay, Santa Rosa
            </a>
            <div className="cordially-venue-actions">
              <Link href="/rsvp">Submit RSVP</Link>
              <p>RSVP by September 1st, 2026</p>
            </div>
          </div>
        </section>

        <section id="details" className="cordially-details">
          <div className="cordially-section-heading">
            <p className="cordially-kicker">wedding guide</p>
            <h2>and now some additional details...</h2>
            <p>
              The people, places, and practical details that will make the
              evening feel effortless.
            </p>
          </div>
          <div className="cordially-card-grid">
            {detailCards.map((card) => (
              <button
                type="button"
                className="cordially-detail-card"
                key={card.id}
                onClick={() => setActiveDetail(card.id)}
              >
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  sizes="(max-width: 768px) 92vw, (max-width: 1280px) 45vw, 30vw"
                  className="cordially-cover"
                />
                <span className="cordially-card-overlay" />
                <span className="cordially-card-copy">
                  <strong>{card.title}</strong>
                  <em>{card.subtitle}</em>
                </span>
                <span className="cordially-plus">
                  <Plus size={24} />
                </span>
              </button>
            ))}
          </div>
        </section>

        <section className="cordially-vision">
          <p>
            We are thrilled to celebrate this beautiful moment with you. Your
            presence is the greatest gift of all.
          </p>
        </section>

        <section id="faq" className="cordially-faq">
          <div className="cordially-faq-inner">
            <div className="cordially-faq-aside">
              <div>
                <h2>Questions and answers</h2>
                <p>Can&apos;t find the answer here?</p>
                <a href="mailto:rsvp@marvinnjovelyn.com">
                  Reach out to Marvin or Jovelyn
                </a>
              </div>
            </div>
            <div className="cordially-faq-list">
              {faqs.map((item, index) => {
                const isOpen = openFaq === index;

                return (
                  <div className="cordially-faq-item" key={item.question}>
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      onClick={() => setOpenFaq(isOpen ? -1 : index)}
                    >
                      <span>{item.question}</span>
                      <ChevronDown
                        size={18}
                        className={isOpen ? "is-open" : undefined}
                      />
                    </button>
                    <div className={isOpen ? "is-open" : undefined}>
                      <p>{item.answer}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <DetailModal
          activeDetail={activeDetail}
          onClose={() => setActiveDetail(null)}
        />

        <Footer />
      </main>
    </>
  );
}
