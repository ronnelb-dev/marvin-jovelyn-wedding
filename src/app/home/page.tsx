import Image from "next/image";
import Link from "next/link";
import {
  CalendarHeart,
  Camera,
  Clock,
  Gift,
  MapPin,
  PartyPopper,
  Sparkles,
  Utensils,
  Wine,
  Disc3,
} from "lucide-react";

import CountdownStrip from "@/components/home/CountdownStrip";
import FAQSection from "@/components/home/FAQSection";
import WeddingImageSlider from "@/components/home/WeddingImageSlider";
import WeddingSongRow from "@/components/home/WeddingSongRow";

const ceremonyDetails = [
  {
    title: "The Ceremony",
    place: "Santa Rosa de Lima Parish Church",
    note: "Santa Rosa Plaza, Laguna",
    time: "1:30 PM",
    image: "/the-ceremony.png",
    direction: "https://www.google.com/maps/place/santa+rosa+de+lima+parish+santa+rosa+laguna/data=!4m2!3m1!1s0x3397d9ba8cd1e037:0x47a6cb58d5e84769?sa=X&ved=1t:242&ictx=111",
  },
  {
    title: "The Reception",
    place: "Pablo's Events Place",
    note: "Terry Town Subdivision",
    time: "4:00 PM",
    image: "/the-reception.png",
    direction: "https://www.google.com/maps?rlz=1C5XQIR_enPH1211PH1211&um=1&ie=UTF-8&fb=1&gl=ph&sa=X&geocode=KbuAnPoa2ZczMREXoiPmslyc&daddr=Terry+Town+Subdivision,+Barangay+Market+Area,+City+of+Santa+Rosa,+Laguna",
  },
] as const;

const reminders = [
  {
    icon: Clock,
    title: "Please arrive early",
    body: "The ceremony begins at 4:00 PM. Arriving a little early gives everyone time to settle in and be present for the moment.",
  },
  {
    icon: PartyPopper,
    title: "Celebrate with us",
    body: "Bring your warmest smiles, your best energy, and your hearts ready for an evening of love, laughter, dinner, and dancing.",
  },
  {
    icon: Camera,
    title: "Capture the day",
    body: "After the ceremony, feel free to take photos and share your favorite memories with our wedding hashtag.",
  },
] as const;

const entourageIntro = [
  {
    heading: "Parents of the Groom",
    names: ["Mr. Nestor O. Dy", "Mrs. Nestora T. Dy"],
    note: "",
    noteNames: [],
  },
  {
    heading: "In Loving Memory of the Parents of the Bride",
    names: ["Mr. Apolinario M. De Roxas, Jr.", "Mrs. Rita Myrna S. De Roxas"],
    note: "To be represented and escorted by",
    noteNames: ["Mr. Rendon Jason D. Endozo", "Mrs. Maria Allysa May D. Endozo"],
  },
] as const;

const principalSponsors = [
  ["Engr. Randy M. De Roxas", "Mrs. Hilaria De Roxas"],
  ["Mr. Lester V. Dela Merced", "Ms. Ma. Alisa A. Jumangit"],
  ["Mr. Norlan Delas Alas", "Mrs. Rhodora Delas Alas"],
  ["Mr. Augustus F. Rapirap", "Mrs. Grace B. Manalac"],
  ["Mr. Jerome Neil E. Riego", "Dra. Mercedes David"],
  ["Mr. Den Ryan Chiang", "Mrs. Irene Sarmiento"],
  ["Mr. Ace Celestial", "Mrs. Amelia Manuntag"],
  ["Mr. Josef Jovellino G. Villaran", "Mrs. Diana O. De Leon"],
  ["Mr. Francis Layag", "Mrs. Angel Hizon"],
  ["Mr. Jonas Evangelista", "Ms. Ma. Margarita Laviano"],
  ["Engr. Ronaldo M. De Roxas", "Mrs. Lynn Tan"],
  ["Mr. Florante T. Mortel", "Mrs. Evangeline De Villa"],
  ["Hon. Eugene Dela Cruz", "Mrs. Marie Mercader Dela Cruz"],
] as const;

const secondarySponsors = [
  {
    heading: "Candle Sponsors",
    names: ["To be announced"],
  },
  {
    heading: "Veil Sponsors",
    names: ["To be announced"],
  },
  {
    heading: "Cord Sponsors",
    names: ["To be announced"],
  },
] as const;

const timelineEvents = [
  {
    time: "2:30 PM",
    title: "Gathering",
    icon: Sparkles,
  },
  {
    time: "3:00 PM",
    title: "Ceremony",
    icon: CalendarHeart,
  },
  {
    time: "5:00 PM",
    title: "Cocktails",
    icon: Wine,
  },
  {
    time: "6:00 PM",
    title: "Reception",
    icon: PartyPopper,
  },
  {
    time: "7:00 PM",
    title: "Dinner",
    icon: Utensils,
  },
  {
    time: "9:00 PM",
    title: "After Party",
    icon: Disc3,
  },
] as const;

export default function WeddingHomePage() {
  return (
    <main className="wedding-home">
      {/* <nav className="wedding-home-nav" aria-label="Wedding navigation">
        <Link href="/" className="wedding-home-mark" aria-label="Invitation cover">
          M&amp;J
        </Link>
        <div className="wedding-home-nav-links">
          <a href="#welcome">Welcome</a>
          <a href="#venues">Venues</a>
          <a href="#timeline">Timeline</a>
          <a href="#faq">FAQ</a>
        </div>
        <Link href="/rsvp" className="wedding-home-nav-rsvp">
          RSVP
        </Link>
      </nav> */}

      <section className="wedding-hero" aria-label="Marvin and Jovelyn wedding">
        <Image
          src="/images/DSC03678.jpg"
          alt="Marvin and Jovelyn sitting together by white seaside cliffs"
          fill
          priority
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
          
          <p className="wedding-hero-copy">
            Marvin &amp; Jovelyn
          </p>
          <div className="wedding-hero-divider" />
          <p className="wedding-hero-copy">
            9.11.26
          </p>
          
        </div>
      </section>

      <section id="welcome" className="wedding-welcome-panel">
        <div className="wedding-welcome-panel-inner">
          <h2>Welcome our families &amp; friends</h2>
          <WeddingSongRow />
          <p>
            This invitation has found its way to you because you are part of our
            story. We hope you will be with us as we celebrate, laugh, make
            memories, and begin our married life surrounded by the people we
            love most.
          </p>
        </div>
      </section>

      <WeddingImageSlider />

      <section id="venues" className="wedding-venues">
        <div className="wedding-section-heading wedding-section-heading-light">
          <p className="wedding-kicker">the venues</p>
          <h2>Where the day unfolds</h2>
        </div>
        <div className="wedding-venue-grid">
          {ceremonyDetails.map((item) => (
            <article className="wedding-venue-card" key={item.title}>
              <div className="wedding-venue-illustration">
                <Image
                  src={item.image}
                  alt=""
                  width={520}
                  height={380}
                  aria-hidden="true"
                />
              </div>
              <p>{item.time}</p>
              <h3>{item.title}</h3>
              <strong>{item.place}</strong>
              <span>{item.note}</span>
              <a
                href={item.direction}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MapPin size={16} />
                Locate via maps
              </a>
            </article>
          ))}
        </div>
      </section>

      <section className="wedding-attire-guide">
        <div className="wedding-section-heading">
          <p className="wedding-kicker">attire guide</p>
          <h2>Sage, ivory, champagne, and earth tones</h2>
          <p>
            We would love our guests in semi-formal attire that feels refined,
            soft, and harmonious with the wedding palette.
          </p>
        </div>
        <div className="wedding-attire-grid">
          <article>
            <h3>Principal Sponsors</h3>
            <p>Elegant long gowns, dress shirts, coats, and slacks in sage or neutral tones.</p>
            <Image
              src="/principal-attire.png"
              alt="Principal sponsor attire guide"
              width={520}
              height={568}
            />
          </article>
          <article>
            <h3>Wedding Guests</h3>
            <p>Cocktail dresses, gowns, suits, long sleeves, and dress pants in soft natural colors.</p>
            <Image
              src="/guest-attire.png"
              alt="Wedding guest attire guide"
              width={520}
              height={520}
            />
          </article>
        </div>
      </section>

      <section className="wedding-entourage" aria-labelledby="entourage-heading">
        <div className="wedding-entourage-inner">
          <h2 id="entourage-heading">The Entourage</h2>
          <p className="wedding-entourage-script">
            With the blessing of our beloved parents
          </p>

          <div className="wedding-entourage-intro">
            {entourageIntro.map((group) => (
              <article key={group.heading}>
                <h3>{group.heading}</h3>
                {group.names.map((name) => (
                  <p key={name}>{name}</p>
                ))}
                {group.note ? (
                  <>
                    <p className="wedding-entourage-script">{group.note}</p>
                    {group.noteNames.map((name) => (
                      <p key={name}>{name}</p>
                    ))}
                  </>
                ) : null}
              </article>
            ))}
          </div>

          <p className="wedding-entourage-script">
            To guide and support us with wisdom and love
          </p>
          <section className="wedding-entourage-group" aria-labelledby="principal-sponsors-heading">
            <h3 id="principal-sponsors-heading">Principal Sponsors</h3>
            <div className="wedding-entourage-principal-list">
              {principalSponsors.map(([left, right]) => (
                <div className="wedding-entourage-pair" key={`${left}-${right}`}>
                  <p>{left}</p>
                  <p>{right}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="wedding-entourage-group" aria-labelledby="secondary-sponsors-heading">
            <h3 id="secondary-sponsors-heading">Secondary Sponsors</h3>
            <div className="wedding-entourage-secondary-list">
              {secondarySponsors.map((group) => (
                <article key={group.heading}>
                  <h4>{group.heading}</h4>
                  {group.names.map((name) => (
                    <p key={name}>{name}</p>
                  ))}
                </article>
              ))}
            </div>
          </section>
        </div>
      </section>

      <section id="timeline" className="wedding-timeline-hero">
        <Image
          src="/images/slider2.webp"
          alt="Marvin and Jovelyn riding a horse carriage in front of a heritage building"
          fill
          sizes="100vw"
          className="wedding-cover"
        />
        <div className="wedding-timeline-overlay" />
        <div className="wedding-timeline-content">
          <h2>The Timeline</h2>
          <div className="wedding-timeline-list">
            {timelineEvents.map(({ icon: Icon, time, title }) => (
              <article key={title}>
                <Icon className="wedding-timeline-icon" size={34} strokeWidth={1.35} />
                <span className="wedding-timeline-node" aria-hidden="true" />
                <div className="wedding-timeline-copy">
                  <span>{time}</span>
                  <h3>{title}</h3>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="wedding-gift-note">
        <div className="wedding-gift-card" aria-hidden="true">
          <Gift size={48} />
          <span>Gift Guide</span>
        </div>
        <div>
          <p className="wedding-kicker">gift note</p>
          <h2>A blessing for our next chapter</h2>
          <p>
            As we prepare for married life and our move to Japan, monetary gifts
            would mean so much and will help us begin this new season with care.
            Your presence, prayers, and love are already the greatest gifts.
          </p>
        </div>
      </section>

      <section className="wedding-image-break wedding-image-break-soft" aria-label="Marvin and Jovelyn travel memory">
        <Image
          src="/images/slider7.webp"
          alt="Marvin and Jovelyn smiling during a desert trip"
          fill
          sizes="100vw"
          className="wedding-cover"
        />
      </section>

      <section className="wedding-reminders">
        <div className="wedding-section-heading wedding-section-heading-light">
          <p className="wedding-kicker">reminders</p>
          <h2>To our dear guests</h2>
        </div>
        <div className="wedding-reminder-grid">
          {reminders.map(({ icon: Icon, title, body }) => (
            <article key={title}>
              <Icon size={34} />
              <h3>{title}</h3>
              <p>{body}</p>
            </article>
          ))}
        </div>
      </section>

      <FAQSection />

      <section className="wedding-rsvp-final">
        <div className="wedding-rsvp-final-bg" aria-hidden="true" />
        <div className="wedding-rsvp-final-content">
          <p className="wedding-kicker">kindly RSVP</p>
          <h2>Join us as we count the days</h2>
          <CountdownStrip />
          <p>
            Please confirm your attendance on or before September 1, 2026 so we
            can prepare every seat, meal, and small detail with love.
          </p>
          <Link href="/rsvp">Open RSVP form</Link>
        </div>
      </section>
    </main>
  );
}
