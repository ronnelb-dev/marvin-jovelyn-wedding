import Head from "next/head";
import { Playfair_Display } from "next/font/google";
import "@/styles/globals.css";

import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import Preloader from "@/components/preloader";
import Link from "next/link";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

function WeddingGalleryContent() {
  const links = [
    {
      href: "/proposal-gallery",
      title: "Proposal",
      description: "The moment it all began",
      icon: "💍",
    },
    {
      href: "/prenup-gallery",
      title: "Prenup",
      description: "Our love story captured",
      icon: "💕",
    },
    {
      href: "/guest-gallery",
      title: "Guest Upload",
      description: "Wedding guest uploaded photo/video.",
      icon: "👥",
    },
    {
      href: "/photobooth-originals",
      title: "Photobooth Originals",
      description: "Photobooth moments unfiltered",
      icon: "📸",
    },
    {
      href: "/photobooth-prints",
      title: "Photobooth Prints",
      description: "Fun keepsakes from the booth",
      icon: "🖼️",
    },
    {
      href: "/wedding-day",
      title: "Photographer Capture",
      description: "Photos from our photographer",
      icon: "📸",
    },
  ];

  return (
    <>
      <Head>
        <title>Marvin & Jovelyn - Guest Gallery</title>
        <meta name="description" content="Marvin and Jovelyn Guest Gallery" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div
        className={`${playfair.className} bg-gradient-to-br from-rose-50 via-white to-pink-50 min-h-screen`}
      >
        <NavBar />
        <Preloader />

        <div className="max-w-md mx-auto pt-18">
          {/* Header */}
          <div className="text-center mb-4">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent mb-2">
              Our Wedding Journey
            </h1>
            <p className="text-gray-600 text-md">
              Explore our love story through photos & videos
            </p>
          </div>

          {/* Links */}
          <div className="space-y-3 m-3">
            {links.map((link, index) => (
              <Link key={link.href} href={link.href} className="group block">
                <div
                  className="relative bg-white/80 backdrop-blur-sm border border-rose-100 rounded-2xl p-2 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-1 overflow-hidden"
                  style={{
                    animationDelay: `${index * 100}ms`,
                    animation: "fadeInUp 0.6s ease-out forwards",
                  }}
                >
                  {/* Gradient overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-r from-rose-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  {/* Decorative elements */}
                  <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-rose-200/30 to-pink-200/30 rounded-full blur-2xl"></div>
                  <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-purple-200/20 to-pink-200/20 rounded-full blur-xl"></div>

                  <div className="relative z-10 flex items-center gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-gradient-to-r from-rose-100 to-pink-100 rounded-full flex items-center justify-center group-hover:from-rose-200 group-hover:to-pink-200 transition-all duration-300">
                        <span className="text-xl">{link.icon}</span>
                      </div>
                    </div>

                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-rose-800 group-hover:text-rose-900 transition-colors duration-300">
                        {link.title}
                      </h3>
                      <p className="text-gray-600 text-sm group-hover:text-gray-700 transition-colors duration-300">
                        {link.description}
                      </p>
                    </div>

                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-gradient-to-r from-rose-400 to-pink-400 rounded-full flex items-center justify-center opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300">
                        <svg
                          className="w-4 h-4 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Bottom decoration */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-rose-400 to-pink-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                </div>
              </Link>
            ))}
          </div>

          {/* Floating hearts animation */}
          <div className="fixed inset-0 pointer-events-none overflow-hidden">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="absolute text-rose-300/30 text-lg animate-bounce"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`,
                  animationDuration: `${3 + Math.random() * 2}s`,
                }}
              >
                ♥
              </div>
            ))}
          </div>
        </div>

        <style jsx>{`
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}</style>

        <Footer />
      </div>
    </>
  );
}

export default function WeddingGalleryPage() {
  return <WeddingGalleryContent />;
}
