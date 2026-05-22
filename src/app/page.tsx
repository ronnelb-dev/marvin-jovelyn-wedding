"use client";

import { useRouter } from "next/navigation";
import CountdownStrip from "@/components/home/CountdownStrip";

export default function LandingPage() {
  const router = useRouter();

  const handleOpen = () => {
    router.push("/home");
  };

  return (
    <main
      id="landing-page"
      className="landing-page"
      onClick={handleOpen}
      role="button"
      tabIndex={0}
      aria-label="Tap to open wedding invitation"
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") handleOpen();
      }}
    >
      {/* Background images — portrait (mobile) and landscape (desktop) */}
      <div className="landing-bg" aria-hidden="true" />

      <div className="landing-content" aria-hidden="false">
        {/* Names heading */}
        <h1 className="landing-names" aria-label="Marvin and Jovelyn">
          Marvin &amp; Jovelyn
        </h1>

        {/* Envelope + countdown strip wrapper */}
        <div className="landing-envelope-wrapper">
          {/* CountdownStrip anchored to top of envelope */}
          <div className="landing-countdown-anchor">
            <CountdownStrip />
          </div>

          {/* Envelope image — plain img to allow mix-blend-mode across elements */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <div className="landing-envelope-image" aria-hidden="true">
            <img
              src="/images/envelope.png"
              alt="Wedding invitation envelope for Marvin and Jovelyn"
              width={600}
              height={600}
            />
          </div>
        </div>

        {/* Tap to open CTA */}
        <p className="landing-cta" aria-live="polite">
          ✦&ensp;Tap to Open&ensp;✦
        </p>
      </div>
    </main>
  );
}
