import Image from "next/image";
import Link from "next/link";
import {
  CalendarHeart,
  Camera,
  Clock,
  MapPin,
  PartyPopper,
  Sparkles,
  Utensils,
  Wine,
  Disc3,
} from "lucide-react";

import CountdownStrip from "@/components/home/CountdownStrip";
import FAQSection from "@/components/home/FAQSection";
import PrenupVideoSection from "@/components/home/PrenupVideoSection";
import WeddingHero from "@/components/home/WeddingHero";
import WeddingImageSlider from "@/components/home/WeddingImageSlider";

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
    body: "Please arrive by 1:15 PM. The ceremony begins at 1:30 PM, giving everyone time to settle in and be present for the moment.",
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

const digitalBankAccounts = [
  {
    title: "Maribank",
    image: "/maribank.png",
  },
  {
    title: "BDO",
    image: "/bdo.png",
  },
  {
    title: "GCash",
    image: "/gcash.png",
  },
] as const;

const entourageIntro = [
  {
    heading: "Parents of the Groom",
    names: ["Mr. Apolinario Talibsao", "Mrs. Maria Talibsao"],
    note: "",
    noteNames: [],
  },
  {
    heading: "Parents of the Bride",
    names: ["Mr. Victor Regonay", "Mrs. Nenebeth Regonay"],
    note: "",
    noteNames: [],
  },
] as const;

const principalSponsors = [
  ["Hon. Arlene Arcillas", "Dr. Cesar Ramon Espiritu"],
  ["Dra. Ma. Margarita Evidente", "Mr. Almer Almazan"],
  ["Mrs. Sherlyn Caiga", "Mr. Angelito Talibsao"],
  ["Mrs. Nery Pontero", "Mr. Alvin Talibsao"],
  ["Mrs. Diane Bayani", "Mr. Patricio Regonay"],
  ["Mrs. Cecile Villapando", "Hon. Arnold Arcillas"],
  ["Mrs. Flory Mendez", "Dr. Peter Lloyd Mallari"],
  ["Mrs. Ryanita Llena", "Hon. Edwin Servo"],
] as const;


const honorAttendants = [
  {
    heading: "Maid of Honor",
    name: "Crisel Talibsao",
  },
  {
    heading: "Best Man",
    name: "Jonathan Amar Jr.",
  },
] as const;

const weddingParty = [
  ["Reychelle Damian", "EJ Servo"],
  ["Jonalyn Laurente", "Nickerson Regonay"],
  ["Trisha Cruz", "Brayan Regonay"],
  ["Michelle Panelo-Amar", "Kenneth Alcira"],
  ["Giselle Mina", "Kervin Polborido"],
  ["Justine Mojica", "Ammeler Tubosa"],
] as const;

const childAttendants = [
  {
    heading: "Flower Girls",
    names: ["Sunshine Pearl Artajo", "Levi Panis", "Alliah Mendez", "Allwena Mendez","Paris Paula Siño"],
  },
  {
    heading: "Ring Bearer",
    names: ["Mark Christian Talibsao"],
  },
  {
    heading: "Coin Bearer",
    names: ["Colyn Regonay"],
  },
  {
    heading: "Bible Bearer",
    names: ["Jenelyn Regonay"],
  },
  {
    heading: "Candle",
    names: ["Lucky Angelo Talibsao", "Aubrey Cordero"],
  },
  {
    heading: "Veil",
    names: ["Mervin Panis", "Leslie Pontero"],
  },
    {
    heading: "Cord",
    names: ["John Minguet","Camille Dayao"],
  },
      {
    heading: "Grandparents of the bride",
    names: ["Lilia Mendez","Ronnie Mendez"],
  },
] as const;

const timelineEvents = [
  {
    time: "1:15 PM",
    title: "Gathering",
    icon: Sparkles,
  },
  {
    time: "1:30 PM",
    title: "Ceremony",
    icon: CalendarHeart,
  },
  {
    time: "4:00 PM",
    title: "Reception",
    icon: PartyPopper,
  },
  {
    time: "5:00 PM",
    title: "Cocktails",
    icon: Wine,
  },
  {
    time: "6:00 PM",
    title: "Dinner",
    icon: Utensils,
  },
  {
    time: "8:00 PM",
    title: "After Party at Garden Villa's House",
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

      <WeddingHero priority />

      <section id="welcome" className="wedding-welcome-panel">
        <div className="wedding-welcome-panel-inner">
          <h2>To our family and friends</h2>
          <p>
            This invitation has found its way to you because you are part of our
            story. We hope you will be with us as we celebrate, laugh, make
            memories, and begin our married life surrounded by the people we
            love most.
          </p>
        </div>
      </section>

      <WeddingImageSlider />

      <h2 className="proposal-title">
        <span>The Proposal</span>
      </h2>
      <div className="proposal-content">
        <p>
          They call Mt. Pulag the Playground of the Gods, and on that morning,
          it felt exactly that way.
        </p>

        <p>
          Above the clouds, beneath the sunrise, and surrounded by the most perfect
          backdrop imaginable, our lives changed forever. In a place known for its
          breathtaking views, we found ourselves looking ahead to the greatest
          adventure yet.
        </p>

        <p>
          A beautiful journey, a life-changing question, and the beginning of our
          forever.
        </p>

        <p className="proposal-ending">
          And just like that, a mountain we climbed together became the place where
          our next chapter began.
        </p>
      </div>
      <section className="wedding-image-break wedding-image-break-soft" aria-label="Marvin and Jovelyn travel memory">
        <Image
          src="/images/proposal.webp"
          alt="Marvin and Jovelyn smiling during a desert trip"
          fill
          sizes="100vw"
          className="wedding-cover"
        />
      </section>

      <PrenupVideoSection />

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

      <section id="timeline" className="wedding-timeline-hero">
        <Image
          src="/images/DSC03880.jpg"
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
            <p>Elegant long gowns, dress shirts, coats, and slacks in beige or neutral tones.</p>
            <Image
              src="/principal-attire-2.png"
              alt="Principal sponsor attire guide"
              width={520}
              height={568}
            />
          </article>
          <article>
            <h3>Wedding Guests</h3>
            <p>Cocktail dresses, gowns, suits, long sleeves, and dress pants in soft natural colors.</p>
            <Image
              src="/attire.png"
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
            <br></br>
          <p className="wedding-entourage-script mt-5">
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

          <section className="wedding-entourage-group" aria-labelledby="honor-attendants-heading">
            <h3 id="honor-attendants-heading">Honor Attendants</h3>
            <div className="wedding-entourage-honor-list">
              {honorAttendants.map((attendant) => (
                <article key={attendant.heading}>
                  <h4>{attendant.heading}</h4>
                  <p>{attendant.name}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="wedding-entourage-group" aria-labelledby="wedding-party-heading">
            <h3 id="wedding-party-heading">Bridesmaids &amp; Groomsmen</h3>
            <div className="wedding-entourage-principal-list">
              {weddingParty.map(([left, right]) => (
                <div className="wedding-entourage-pair" key={`${left}-${right || "groomsman"}`}>
                  <p>{left}</p>
                  <p>{right}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="wedding-entourage-group" aria-labelledby="child-attendants-heading">
            <div className="wedding-entourage-child-list">
              {childAttendants.map((group) => (
                <article key={group.heading}>
                  <h4>{group.heading}</h4>
                  {group.names.map((name) => (
                    <p key={name}>{name}</p>
                  ))}
                </article>
              ))}
            </div>
          </section>

          

          {/* <section className="wedding-entourage-group" aria-labelledby="secondary-sponsors-heading">
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
          </section> */}
        </div>
      </section>

      <section className="wedding-gift-note">
        <div className="wedding-gift-card">
          <Image
            src="/gift-guide.png"
            alt="Wedding gift guide"
            width={1014}
            height={1080}
          />
        </div>
        <div>
          <p className="wedding-kicker">gift note</p>
          <p>
            Your presence on our special day is the greatest gift of all. If
            you would like to give something more, a monetary gift toward our
            future together would be deeply appreciated.
            <br></br>
            For your convenience, we&apos;ve included QR codes for our digital
            bank accounts below.
          </p>
          <div className="wedding-bank-qr-grid" aria-label="Digital bank account QR codes">
            {digitalBankAccounts.map((account) => (
              <article className="wedding-bank-qr-card" key={account.title}>
                <h3>{account.title}</h3>
                <Image
                  src={account.image}
                  alt={`${account.title} QR code`}
                  width={420}
                  height={420}
                  sizes="(max-width: 640px) 70vw, (max-width: 980px) 28vw, 180px"
                />
              </article>
            ))}
          </div>
        </div>
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
            Please confirm your attendance on or before August 21, 2026 so we
            can prepare every seat, meal, and small detail with love.
          </p>
          <Link href="/rsvp">Open RSVP form</Link>
        </div>
      </section>
    </main>
  );
}
