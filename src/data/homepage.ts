export const scrollHeroNavLinks = [
  { label: "Our Story", href: "#story-intro" },
  { label: "Logistics", href: "#logistics" },
  { label: "Details", href: "#details" },
  { label: "FAQ", href: "#faq" },
] as const;

export const scrollHeroSatellites = [
  {
    className: "scroll-hero-satellite-a",
    src: "/images/slider1.webp",
    alt: "Marvin and Jovelyn sitting together on rocky white cliffs",
  },
  {
    className: "scroll-hero-satellite-b",
    src: "/images/slider6.webp",
    alt: "Marvin and Jovelyn standing together on a forest trail",
  },
  {
    className: "scroll-hero-satellite-c",
    src: "/images/slider4.webp",
    alt: "Marvin and Jovelyn swimming inside a rocky ocean cave",
  },
  {
    className: "scroll-hero-satellite-d",
    src: "/images/slider7.webp",
    alt: "Marvin and Jovelyn at golden hour above the clouds",
  },
] as const;

export const WEDDING_TARGET = "2026-09-11T16:00:00+08:00";
export const WEDDING_LOCATION_DIRECTIONS =
  "https://www.google.com/maps/place/santa+rosa+de+lima+parish+santa+rosa+laguna/data=!4m2!3m1!1s0x3397d9ba8cd1e037:0x47a6cb58d5e84769?sa=X&ved=1t:242&ictx=111";
export const STORY_INTRO_WORDS =
  "two souls, one love, you are cordially invited to celebrate our story.".split(
    " ",
  );

export const storyChapters = [
  {
    title: "chapter one: across the distance",
    body: "Four years of distance, countless conversations, and endless anticipation led us to the moment we finally met face to face.",
    photos: [
      {
        src: "/images/slider1.webp",
        alt: "Marvin and Jovelyn by the sea",
        caption: "A love worth the wait",
      },
      {
        src: "/images/slider3.webp",
        alt: "Together across the distance",
        caption: "Counting the days",
      },
      {
        src: "/images/slider5.webp",
        alt: "Video calls and messages",
        caption: "Always connected",
      },
    ],
  },
  {
    title: "chapter two: the first yes",
    body: "In that magical first meeting, surrounded by the people who supported our journey, the question was finally asked and answered with the sweetest yes.",
    photos: [
      {
        src: "/images/proposal.webp",
        alt: "Marvin proposing to Jovelyn",
        caption: "March 14, 2023",
      },
      {
        src: "/images/slider2.webp",
        alt: "The celebration",
        caption: "She said yes",
      },
      {
        src: "/images/slider4.webp",
        alt: "With loved ones",
        caption: "Surrounded by love",
      },
    ],
  },
  {
    title: "chapter three: what comes next",
    body: "Now we are gathering the people we cherish most to celebrate our wedding day and the new adventure that begins after it.",
    photos: [
      {
        src: "/images/slider6.webp",
        alt: "Marvin and Jovelyn outdoor portrait",
        caption: "Toward forever",
      },
      {
        src: "/images/slider7.webp",
        alt: "Planning the journey",
        caption: "A new chapter",
      },
      {
        src: "/images/table-img.webp",
        alt: "The venue awaits",
        caption: "September 2026",
      },
    ],
  },
] as const;

export const schedule = [
  {
    title: "Ceremony",
    time: "4:00 PM - 6:00 PM",
    body: "Join us as we exchange our vows in an intimate ceremony.",
  },
  {
    title: "Photoshoot",
    time: "6:00 PM - 7:00 PM",
    body: "Capture precious moments with us in the garden.",
  },
  {
    title: "Reception",
    time: "7:00 PM - 9:00 PM",
    body: "Celebrate and dance the night away with dinner and drinks.",
  },
] as const;

export const menuItems = [
  "Spicy Thai Chicken with Cashew Nuts",
  "Beef with Mushroom & Gravy",
  "Fish Fillet with Mango Tomato Salsa",
  "Alfredo Fettucine",
  "Buttered Corn & Carrots",
  "Vegetable Chowder Soup",
  "Bottomless Iced Tea and Water",
] as const;

export const paletteColors = [
  ["Deep Sage", "#4f6042"],
  ["Soft Sage", "#aeb99e"],
  ["Warm Ivory", "#f7f2e8"],
  ["Champagne", "#c5a46d"],
] as const;

export const detailCards = [
  {
    id: "timeline",
    title: "Wedding Timeline",
    subtitle: "Every moment of the evening.",
    image: "/images/slider4.webp",
  },
  {
    id: "dress",
    title: "Dress Code",
    subtitle: "Semi-formal neutral and earth tones.",
    image: "/images/ladies-attire-sample.webp",
  },
  {
    id: "menu",
    title: "Dinner Menu",
    subtitle: "A look at what we are serving.",
    image: "/images/table-img.webp",
  },
  {
    id: "palette",
    title: "Color Palette",
    subtitle: "Deep sage, soft sage, ivory, and champagne.",
    image: "/images/gentlemen-attire-sample.webp",
  },
  {
    id: "gifts",
    title: "Gifts",
    subtitle: "A note for our Japan move.",
    image: "/images/slider7.webp",
  },
  {
    id: "venue",
    title: "Venue Details",
    subtitle: "Sky Garden Cafe, Santa Rosa.",
    image: "/images/slider2.webp",
  },
] as const;

export const faqs = [
  {
    question: "When should I RSVP by?",
    answer:
      "Please respond by September 1st, 2026 so we can finalize the celebration details.",
  },
  {
    question: "Where is the wedding?",
    answer:
      "The ceremony and reception will be held at Sky Garden Cafe, Lazuri Hotel Tagaytay, Santa Rosa.",
  },
  {
    question: "What time should I arrive?",
    answer:
      "The ceremony begins at 4:00 PM. Please arrive around 15 minutes early so everyone has time to settle in.",
  },
  {
    question: "Is there a dress code?",
    answer:
      "Yes. We would love semi-formal attire in neutral and earth tones such as sage green, warm ivory, champagne, and soft natural shades.",
  },
  {
    question: "Can I bring a guest?",
    answer:
      "We are delighted to welcome your plus one. Please include their name when you submit your RSVP.",
  },
  {
    question: "What gifts would be most helpful?",
    answer:
      "As we prepare to move to Japan, monetary gifts would mean a lot and will help us with moving expenses and settling into our new home.",
  },
  {
    question: "Can dietary restrictions be accommodated?",
    answer:
      "Please include allergies or dietary needs in your RSVP message and we will do our best to accommodate them.",
  },
] as const;

export type DetailId = (typeof detailCards)[number]["id"];
export type DetailCard = (typeof detailCards)[number];
