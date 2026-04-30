import type { Metadata } from "next";
import { ParticleTextEffect } from "@/components/ui/particle-text-effect";

export const metadata: Metadata = {
  title: "Save the Date | Marvin & Jovelyn",
  description: "Save the date for Marvin and Jovelyn's wedding celebration.",
};

export default function SaveTheDatePage() {
  return (
    <main className="min-h-screen w-full flex items-center justify-center bg-slate-950">
      <ParticleTextEffect
        words={[
          "SAVE THE DATE",
          "MARVIN & JOVELYN",
          "SEPT 11 2026",
          "SANTA ROSA",
        ]}
        showInstructions={false}
        backgroundVideo="/save-the-date-video.mp4"
        overlayOpacity={0.55}
        className="w-full h-80 lg:h-screen rounded-none p-0"
        canvasClassName="rounded-none"
      />
    </main>
  );
}