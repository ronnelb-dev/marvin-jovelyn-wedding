"use client";

import { usePathname } from "next/navigation";
import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

interface WeddingMusicContextValue {
  isPlaying: boolean;
  isMuted: boolean;
  pauseForVideo: () => void;
  playFromGesture: () => void;
  resumeAfterVideo: () => void;
  togglePlayback: () => void;
}

const WeddingMusicContext = createContext<WeddingMusicContextValue | null>(null);
const MUSIC_MUTED_STORAGE_KEY = "wedding-music-muted";

export function WeddingMusicProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const showControl = pathname === "/home" || pathname === "/gallery" || pathname === "/rsvp";
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const mutedRef = useRef(true);
  const pausedForVideoRef = useRef(false);
  const videoActiveRef = useRef(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  const setMutedPreference = useCallback((muted: boolean) => {
    mutedRef.current = muted;
    setIsMuted(muted);
    window.sessionStorage.setItem(MUSIC_MUTED_STORAGE_KEY, String(muted));
  }, []);

  const getAudio = useCallback(() => {
    if (!audioRef.current) {
      const audio = new Audio("/di-ka-na-magiisa.mp3");
      audio.preload = "auto";
      audio.addEventListener("ended", () => {
        pausedForVideoRef.current = false;
        setIsPlaying(false);
        setMutedPreference(true);
      });
      audioRef.current = audio;
    }

    return audioRef.current;
  }, [setMutedPreference]);

  useEffect(() => {
    const storedMuted = window.sessionStorage.getItem(MUSIC_MUTED_STORAGE_KEY);

    if (storedMuted !== null) {
      mutedRef.current = storedMuted === "true";
      setIsMuted(mutedRef.current);
    }

    getAudio();

    return () => {
      audioRef.current?.pause();
    };
  }, [getAudio]);

  const playFromGesture = useCallback(() => {
    const audio = getAudio();

    pausedForVideoRef.current = false;
    setMutedPreference(false);
    audio
      .play()
      .then(() => {
        setIsPlaying(true);
      })
      .catch(() => {
        setIsPlaying(false);
        setMutedPreference(true);
      });
  }, [getAudio, setMutedPreference]);

  const togglePlayback = useCallback(() => {
    const audio = getAudio();

    if (videoActiveRef.current) {
      setMutedPreference(true);
      return;
    }

    if (!audio.paused) {
      pausedForVideoRef.current = false;
      audio.pause();
      setIsPlaying(false);
      setMutedPreference(true);
      return;
    }

    playFromGesture();
  }, [getAudio, playFromGesture, setMutedPreference]);

  const pauseForVideo = useCallback(() => {
    const audio = getAudio();

    videoActiveRef.current = true;
    pausedForVideoRef.current = !audio.paused && !mutedRef.current;
    if (!audio.paused) {
      audio.pause();
      setIsPlaying(false);
    }
  }, [getAudio]);

  const resumeAfterVideo = useCallback(() => {
    videoActiveRef.current = false;

    if (!pausedForVideoRef.current || mutedRef.current) {
      return;
    }

    pausedForVideoRef.current = false;
    getAudio()
      .play()
      .then(() => {
        setIsPlaying(true);
      })
      .catch(() => {
        setIsPlaying(false);
      });
  }, [getAudio]);

  return (
    <WeddingMusicContext.Provider
      value={{
        isPlaying,
        isMuted,
        pauseForVideo,
        playFromGesture,
        resumeAfterVideo,
        togglePlayback,
      }}
    >
      {children}
      {showControl ? (
        <button
          type="button"
          className={`wedding-music-control ${isPlaying ? "is-playing" : ""}`}
          aria-label={isPlaying ? "Mute wedding music" : "Play wedding music"}
          aria-pressed={isPlaying}
          onClick={togglePlayback}
        >
          <span aria-hidden="true">{isPlaying && !isMuted ? "♡♫" : "♡✕"}</span>
        </button>
      ) : null}
    </WeddingMusicContext.Provider>
  );
}

export function useWeddingMusic() {
  const context = useContext(WeddingMusicContext);

  if (!context) {
    throw new Error("useWeddingMusic must be used inside WeddingMusicProvider");
  }

  return context;
}
