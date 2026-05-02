"use client"

import * as React from "react"
import Image from "next/image"
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react"

/* ─────────────────── types ─────────────────── */

interface StoryPhoto {
  src: string
  alt: string
  caption: string
}

interface StoryChapter {
  title: string
  body: string
  /** 3 photos revealed during this chapter */
  photos: StoryPhoto[]
}

interface AnimatedStoryProps {
  kicker?: string
  heading?: string
  chapters: StoryChapter[]
}

/* ─────────── polaroid collage positions ─────────── */

/**
 * Desktop fan-out: 3×3 arrangement using percentage-based offsets.
 */
const COLLAGE_DESKTOP = [
  { x: "-115%", y: "-110%", rotate: -4 },
  { x: "0%", y: "-115%", rotate: 2 },
  { x: "115%", y: "-108%", rotate: -1 },
  { x: "-118%", y: "0%", rotate: 3 },
  { x: "0%", y: "0%", rotate: -2 },
  { x: "115%", y: "3%", rotate: 1.5 },
  { x: "-112%", y: "110%", rotate: -3 },
  { x: "2%", y: "115%", rotate: 2.5 },
  { x: "118%", y: "108%", rotate: -1.5 },
]

/**
 * Mobile fan-out: tighter 3×3 arrangement that fits within 375px viewports.
 * Uses smaller offsets so cards don't overflow.
 */
const COLLAGE_MOBILE = [
  { x: "-75%", y: "-110%", rotate: -3 },
  { x: "10%", y: "-118%", rotate: 2 },
  { x: "80%", y: "-105%", rotate: -1 },
  { x: "-78%", y: "0%", rotate: 2 },
  { x: "5%", y: "5%", rotate: -1.5 },
  { x: "80%", y: "-2%", rotate: 1 },
  { x: "-72%", y: "110%", rotate: -2.5 },
  { x: "8%", y: "115%", rotate: 2 },
  { x: "82%", y: "112%", rotate: -1 },
]

/* ─────────── hook: detect mobile ─────────── */

function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = React.useState(false)
  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${breakpoint}px)`)
    setIsMobile(mql.matches)
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches)
    mql.addEventListener("change", handler)
    return () => mql.removeEventListener("change", handler)
  }, [breakpoint])
  return isMobile
}

/* ─────────── single polaroid card ─────────── */

function Polaroid({
  photo,
  index,
  scrollYProgress,
  totalChapters,
  isMobile,
}: {
  photo: StoryPhoto
  index: number
  scrollYProgress: MotionValue<number>
  totalChapters: number
  isMobile: boolean
}) {
  const chapterIndex = Math.floor(index / 3)

  // chapters use 80% of scroll, fan-out uses last 20%
  const chapterFraction = 0.8 / totalChapters
  const enterStart = chapterIndex * chapterFraction
  const enterEnd = enterStart + chapterFraction * 0.4

  const fanStart = 0.78
  const fanEnd = 0.95

  const positions = isMobile ? COLLAGE_MOBILE : COLLAGE_DESKTOP
  const pos = positions[index] || { x: "0%", y: "0%", rotate: 0 }

  const opacity = useTransform(scrollYProgress, [enterStart, enterEnd], [0, 1])

  const fanScale = isMobile ? 0.58 : 0.68
  const scale = useTransform(
    scrollYProgress,
    [enterStart, enterEnd, fanStart, fanEnd],
    [0.3, 1, 1, fanScale]
  )

  const stackRotation = ((index % 3) - 1) * 3 + (index > 5 ? 2 : -1)
  const rotate = useTransform(
    scrollYProgress,
    [enterStart, enterEnd, fanStart, fanEnd],
    [stackRotation * 2, stackRotation, stackRotation, pos.rotate]
  )

  const x = useTransform(scrollYProgress, [fanStart, fanEnd], ["0%", pos.x])
  const y = useTransform(
    scrollYProgress,
    [enterStart, enterEnd, fanStart, fanEnd],
    ["60%", "0%", "0%", pos.y]
  )

  return (
    <motion.div
      className="absolute left-1/2 top-1/2"
      style={{
        width: isMobile ? "clamp(140px, 42vw, 200px)" : "clamp(200px, 28vw, 340px)",
        marginLeft: isMobile
          ? "calc(-1 * clamp(70px, 21vw, 100px))"
          : "calc(-1 * clamp(100px, 14vw, 170px))",
        marginTop: isMobile
          ? "calc(-1 * clamp(52px, 15.75vw, 75px))"
          : "calc(-1 * clamp(75px, 10.5vw, 127.5px))",
        opacity,
        scale,
        rotate,
        x,
        y,
        zIndex: index + 1,
      }}
    >
      <div
        className="relative overflow-hidden rounded-md border border-black/10 bg-[#f8f3e8] shadow-xl"
        style={{ padding: "4.5% 4.5% 18%" }}
      >
        <div
          className="relative overflow-hidden rounded-sm bg-black/5"
          style={{ aspectRatio: "4/3" }}
        >
          <Image
            src={photo.src}
            alt={photo.alt}
            fill
            sizes={isMobile ? "42vw" : "(max-width: 768px) 60vw, 28vw"}
            className="object-cover object-center"
          />
        </div>
        <p
          className="absolute bottom-[7%] left-1/2 w-[90%] -translate-x-1/2 truncate text-center text-black/60"
          style={{
            fontFamily: "var(--font-body-instrument-stack)",
            fontSize: isMobile ? "10px" : "14px",
          }}
        >
          {photo.caption}
        </p>
      </div>
    </motion.div>
  )
}

/* ─────────── chapter text overlay ─────────── */

function ChapterText({
  chapter,
  index,
  scrollYProgress,
  totalChapters,
  isMobile,
}: {
  chapter: StoryChapter
  index: number
  scrollYProgress: MotionValue<number>
  totalChapters: number
  isMobile: boolean
}) {
  const chapterFraction = 0.8 / totalChapters
  const start = index * chapterFraction
  const fadeInEnd = start + chapterFraction * 0.25
  const holdEnd = start + chapterFraction * 0.65
  const fadeOutEnd = start + chapterFraction * 0.95

  const opacity = useTransform(
    scrollYProgress,
    [start, fadeInEnd, holdEnd, fadeOutEnd],
    [0, 1, 1, 0]
  )

  const yOffset = useTransform(
    scrollYProgress,
    [start, fadeInEnd, holdEnd, fadeOutEnd],
    [40, 0, 0, -30]
  )

  const isLeft = index % 2 === 0

  // On mobile: text goes below the photo stack, centered
  if (isMobile) {
    return (
      <motion.div
        className="pointer-events-none absolute bottom-[8%] left-0 w-full px-6 text-center"
        style={{ opacity, y: yOffset }}
      >
        <span
          className="mb-2 block text-[10px] font-bold uppercase tracking-[0.24em]"
          style={{ color: "var(--template-accent)" }}
        >
          {String(index + 1).padStart(2, "0")}
        </span>
        <h3
          className="mb-2 text-base font-bold leading-tight"
          style={{ fontFamily: "var(--font-body-instrument-stack)" }}
        >
          {chapter.title}
        </h3>
        <p
          className="mx-auto max-w-xs text-sm leading-relaxed"
          style={{ color: "var(--template-muted)" }}
        >
          {chapter.body}
        </p>
      </motion.div>
    )
  }

  // Desktop: text on alternating sides
  return (
    <motion.div
      className={`pointer-events-none absolute top-1/2 w-full max-w-sm px-6 ${isLeft ? "left-0 text-right md:left-[5%]" : "right-0 text-left md:right-[5%]"
        }`}
      style={{ opacity, y: yOffset, translateY: "-50%" }}
    >
      <span
        className="mb-4 block text-xs font-bold uppercase tracking-[0.24em]"
        style={{ color: "var(--template-accent)" }}
      >
        {String(index + 1).padStart(2, "0")}
      </span>
      <h3
        className="mb-3 text-xl font-bold leading-tight md:text-2xl"
        style={{ fontFamily: "var(--font-body-instrument-stack)" }}
      >
        {chapter.title}
      </h3>
      <p
        className="text-base leading-relaxed md:text-lg"
        style={{ color: "var(--template-muted)" }}
      >
        {chapter.body}
      </p>
    </motion.div>
  )
}

/* ─────────── main exported component ─────────── */

export function AnimatedStory({ kicker, heading, chapters }: AnimatedStoryProps) {
  const scrollRef = React.useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: scrollRef })
  const isMobile = useIsMobile()

  const allPhotos = chapters.flatMap((ch) => ch.photos)

  return (
    <section
      ref={scrollRef}
      className="relative"
      style={{
        height: `${(chapters.length + 1) * 150}vh`,
        background: "var(--template-background)",
      }}
    >
      {/* Section heading */}
      <div className="relative z-10 mx-auto max-w-[1100px] px-4 pt-20 pb-8 text-center">
        {kicker && (
          <p
            className="mb-3 text-xs font-bold uppercase tracking-[0.22em]"
            style={{ color: "var(--template-muted)" }}
          >
            {kicker}
          </p>
        )}
        {heading && (
          <h2
            className="m-0 font-bold leading-[0.92]"
            style={{
              fontFamily: "var(--font-display-instrument-stack)",
              fontSize: "clamp(3.5rem, 14vw, 12rem)",
              letterSpacing: "-0.025em",
              color: "var(--template-text)",
            }}
          >
            {heading}
          </h2>
        )}
      </div>

      {/* Sticky viewport container */}
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
        {/* Photo stack — shifted up on mobile to leave room for text below */}
        <div
          className="relative"
          style={{
            width: isMobile ? "clamp(140px, 42vw, 200px)" : "clamp(200px, 28vw, 340px)",
            height: isMobile ? "clamp(105px, 31.5vw, 150px)" : "clamp(150px, 21vw, 255px)",
            marginTop: isMobile ? "-20vh" : "0",
          }}
        >
          {allPhotos.map((photo, i) => (
            <Polaroid
              key={i}
              photo={photo}
              index={i}
              scrollYProgress={scrollYProgress}
              totalChapters={chapters.length}
              isMobile={isMobile}
            />
          ))}
        </div>

        {/* Chapter text overlays */}
        {chapters.map((chapter, i) => (
          <ChapterText
            key={chapter.title}
            chapter={chapter}
            index={i}
            scrollYProgress={scrollYProgress}
            totalChapters={chapters.length}
            isMobile={isMobile}
          />
        ))}
      </div>
    </section>
  )
}
