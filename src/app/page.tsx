import { type CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";

import Footer from "@/components/Footer";
import CordiallyScrollHero from "@/components/home/CordiallyScrollHero";
import CountdownStrip from "@/components/home/CountdownStrip";
import FAQSection from "@/components/home/FAQSection";
import WeddingDetails from "@/components/home/WeddingDetails";
import { AnimatedStory } from "@/components/ui/animated-story";
import {
  STORY_INTRO_WORDS,
  storyChapters,
  WEDDING_LOCATION_DIRECTIONS,
} from "@/data/homepage";

export default function Home() {
  return (
    <main className="cordially-template">
      <CordiallyScrollHero />

      <section id="story-intro" className="cordially-story-intro">
        <p aria-label="Two souls, one love. You are cordially invited to celebrate our story.">
          {STORY_INTRO_WORDS.map((word, index) => (
            <span
              key={`${word}-${index}`}
              style={{ "--word-index": index } as CSSProperties}
            >
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
            href={WEDDING_LOCATION_DIRECTIONS}
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

      <WeddingDetails />

      <section className="cordially-vision">
        <p>
          We are thrilled to celebrate this beautiful moment with you. Your
          presence is the greatest gift of all.
        </p>
      </section>

      <FAQSection />

      <Footer />
    </main>
  );
}
