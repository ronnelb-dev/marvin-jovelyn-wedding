"use client";

import Image from "next/image";
import { Play, X } from "lucide-react";
import { useEffect, useState } from "react";

import { useWeddingMusic } from "@/components/home/WeddingMusicProvider";

interface GalleryVideoFeatureProps {
  videoId: string;
  title: string;
  kicker: string;
  heading: string;
  description: string;
}

export default function GalleryVideoFeature({
  videoId,
  title,
  kicker,
  heading,
  description,
}: GalleryVideoFeatureProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const { pauseForVideo, resumeAfterVideo } = useWeddingMusic();

  function startVideo() {
    pauseForVideo();
    setIsPlaying(true);
  }

  function closeVideo() {
    setIsPlaying(false);
    resumeAfterVideo();
  }

  useEffect(() => {
    return () => resumeAfterVideo();
  }, [resumeAfterVideo]);

  return (
    <section className="wedding-gallery-video" aria-labelledby={`gallery-video-${videoId}`}>
      <div className="wedding-gallery-video-copy">
        <p className="wedding-kicker">{kicker}</p>
        <h2 id={`gallery-video-${videoId}`}>{heading}</h2>
        <p>{description}</p>
      </div>

      <div className="wedding-gallery-video-frame">
        {isPlaying ? (
          <>
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`}
              title={title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
            <button type="button" className="wedding-gallery-video-close" onClick={closeVideo} aria-label={`Close ${title}`}>
              <X size={20} aria-hidden="true" />
            </button>
          </>
        ) : (
          <button type="button" className="wedding-gallery-video-poster" onClick={startVideo} aria-label={`Play ${title}`}>
            <Image
              src={`https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`}
              alt=""
              fill
              sizes="(max-width: 980px) 100vw, 980px"
            />
            <span className="wedding-gallery-video-shade" aria-hidden="true" />
            <span className="wedding-gallery-video-play" aria-hidden="true"><Play size={26} fill="currentColor" /></span>
            <span className="wedding-gallery-video-label">Play video</span>
          </button>
        )}
      </div>
    </section>
  );
}
