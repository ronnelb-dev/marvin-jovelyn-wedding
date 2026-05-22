"use client";

import { useEffect, useRef, useState } from "react";
import { Heart, Play, Square } from "lucide-react";

export default function WeddingSongRow() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;

    return () => {
      audio?.pause();
    };
  }, []);

  const getAudio = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio("/di-ka-na-magiisa.mp3");
      audioRef.current.addEventListener("ended", () => {
        setIsPlaying(false);
      });
    }

    return audioRef.current;
  };

  const handleTogglePlayback = () => {
    const audio = getAudio();

    if (isPlaying) {
      audio.pause();
      audio.currentTime = 0;
      setIsPlaying(false);
      return;
    }

    audio
      .play()
      .then(() => {
        setIsPlaying(true);
      })
      .catch(() => {
        setIsPlaying(false);
      });
  };

  return (
    <div className="wedding-song-row" aria-label="Wedding song prompt">
      <span>{isPlaying ? "Tap to stop our song" : "Tap to play our song"}</span>
      <span>
        <Heart size={16} aria-hidden="true" />
        <button
          type="button"
          className="wedding-song-play-button"
          aria-label={isPlaying ? "Stop our wedding song" : "Play our wedding song"}
          aria-pressed={isPlaying}
          onClick={handleTogglePlayback}
        >
          {isPlaying ? (
            <Square size={18} aria-hidden="true" />
          ) : (
            <Play size={18} aria-hidden="true" />
          )}
        </button>
        <Heart size={16} aria-hidden="true" />
      </span>
    </div>
  );
}
