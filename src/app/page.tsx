"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import CountdownStrip from "@/components/home/CountdownStrip";
import WeddingHero from "@/components/home/WeddingHero";
import { useWeddingMusic } from "@/components/home/WeddingMusicProvider";

export default function LandingPage() {
  const router = useRouter();
  const { playFromGesture } = useWeddingMusic();
  const [isOpening, setIsOpening] = useState(false);

  useEffect(() => {
    router.prefetch("/home");
  }, [router]);

  const handleOpen = () => {
    if (isOpening) {
      return;
    }

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    playFromGesture();
    setIsOpening(true);
    window.setTimeout(() => {
      router.push("/home");
    }, prefersReducedMotion ? 0 : 1200);
  };

  return (
    <main
      id="landing-page"
      className={`landing-page ${isOpening ? "is-opening" : ""}`}
      onClick={handleOpen}
      role="button"
      tabIndex={0}
      aria-label="Tap to open wedding invitation"
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleOpen();
        }
      }}
    >
      <div className="landing-bg" aria-hidden="true" />
      <div className="landing-homepage-preview" aria-hidden="true">
        <WeddingHero priority />
      </div>

      <div className="landing-content" aria-hidden="false">
        <h1 className="landing-names" aria-label="Marvin and Jovelyn">
          Marvin &amp; Jovelyn
        </h1>

        <div className="landing-envelope-wrapper">
          <div className="landing-countdown-anchor">
            <CountdownStrip />
          </div>

          <div className="landing-envelope-flap" aria-hidden="true" />

          <div className="landing-envelope-image" aria-hidden="true">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/envelope.png"
              alt="Wedding invitation envelope for Marvin and Jovelyn"
              width={600}
              height={600}
            />
          </div>
        </div>

        <p className="landing-cta" aria-live="polite">
          {isOpening ? "Opening..." : "Tap to Open"}
        </p>
      </div>
    </main>
  );
}
