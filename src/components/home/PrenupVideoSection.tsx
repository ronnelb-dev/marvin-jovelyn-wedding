"use client";

import { Play } from "lucide-react";
import { useRef, useState } from "react";

import { useWeddingMusic } from "@/components/home/WeddingMusicProvider";

export default function PrenupVideoSection() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const { pauseForVideo, resumeAfterVideo } = useWeddingMusic();
  const [hasStarted, setHasStarted] = useState(false);

  const handlePlay = () => {
    setHasStarted(true);
    pauseForVideo();
  };

  const handleStartVideo = () => {
    const video = videoRef.current;

    if (!video) {
      return;
    }

    video.controls = true;
    video.play().catch(() => {
      video.controls = true;
    });
  };

  return (
    <section className="wedding-prenup-video" aria-label="Marvin and Jovelyn prenup video">
      <div className="wedding-prenup-memory" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      <h2 className="proposal-title wedding-prenup-title">
        <span>Our prenup video</span>
      </h2>
      <div className="wedding-prenup-frame">
        <video
          ref={videoRef}
          className="wedding-prenup-player"
          src="/video/prenup.mp4"
          preload="metadata"
          playsInline
          onPlay={handlePlay}
          onPause={resumeAfterVideo}
          onEnded={resumeAfterVideo}
        />
        {!hasStarted ? (
          <button
            type="button"
            className="wedding-prenup-play"
            aria-label="Play Marvin and Jovelyn prenup video"
            onClick={handleStartVideo}
          >
            <Play size={22} fill="currentColor" aria-hidden="true" />
          </button>
        ) : null}
        <div className="wedding-prenup-overlay">
          
          
        </div>
      </div>
      <div className="wedding-prenup-transition" aria-hidden="true">
      </div>
    </section>
  );
}
