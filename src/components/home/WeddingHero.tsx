import Image from "next/image";
import Link from "next/link";

export default function WeddingHero({
  className = "",
  priority = false,
  showRsvp = false,
}: {
  className?: string;
  priority?: boolean;
  showRsvp?: boolean;
}) {
  return (
    <section className={`wedding-hero ${className}`} aria-label="Marvin and Jovelyn wedding">
      <Image
        src="/images/DSC03678.jpg"
        alt="Marvin and Jovelyn sitting together by white seaside cliffs"
        fill
        priority={priority}
        sizes="100vw"
        className="wedding-hero-image"
      />
      <div className="wedding-hero-overlay" />
      <div className="wedding-hero-content">
        <Image
          src="/mj-mono.png"
          alt=""
          width={180}
          height={180}
          className="wedding-hero-monogram"
          aria-hidden="true"
        />
        <p className="wedding-hero-copy">Marvin &amp; Jovelyn</p>
        <div className="wedding-hero-divider" />
        <p className="wedding-hero-copy">9.11.26</p>
      </div>
    </section>
  );
}
