"use client";

import { FC, useEffect, useState } from "react";
import Image from "next/image";
import { Calendar, MapPin, Clock } from "lucide-react";

// Constants
const WEDDING_DETAILS = {
  date: "September 11, 2026",
  time: "4:00 PM",
  venue: "Sky Garden Cafe",
  location: "Santa Rosa",
  names: {
    bride: "Jovelyn",
    groom: "Marvin",
  },
} as const;

const SaveTheDateSection: FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger animation on mount
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=Cinzel:wght@400;500;600&family=Montserrat:wght@300;400;500&display=swap");

        .save-date-section {
          font-family: "Montserrat", sans-serif;
        }

        .save-date-script {
          font-family: "Cinzel", serif;
        }

        .save-date-serif {
          font-family: "Playfair Display", serif;
        }

        .save-date-body {
          font-family: "Cormorant Garamond", serif;
        }

        /* Elegant entrance animations */
        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

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

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes shimmer {
          0% {
            background-position: -100% 0;
          }
          100% {
            background-position: 100% 0;
          }
        }

        .animate-fade-in-scale {
          animation: fadeInScale 1s ease-out forwards;
          opacity: 0;
        }

        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
          opacity: 0;
        }

        .animate-slide-in-left {
          animation: slideInLeft 0.8s ease-out forwards;
          opacity: 0;
        }

        .animate-slide-in-right {
          animation: slideInRight 0.8s ease-out forwards;
          opacity: 0;
        }

        .delay-100 {
          animation-delay: 0.1s;
        }
        .delay-200 {
          animation-delay: 0.2s;
        }
        .delay-300 {
          animation-delay: 0.3s;
        }
        .delay-400 {
          animation-delay: 0.4s;
        }
        .delay-500 {
          animation-delay: 0.5s;
        }
        .delay-600 {
          animation-delay: 0.6s;
        }
        .delay-700 {
          animation-delay: 0.7s;
        }
        .delay-800 {
          animation-delay: 0.8s;
        }

        /* Decorative ornament */
        .ornament-divider {
          position: relative;
          width: 100%;
          height: 2px;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.5),
            transparent
          );
        }

        .ornament-divider::before,
        .ornament-divider::after {
          content: "";
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.6);
        }

        .ornament-divider::before {
          left: 0;
        }

        .ornament-divider::after {
          right: 0;
        }

        /* Shimmer effect for names */
        .shimmer-text {
          background: linear-gradient(
            90deg,
            rgba(255, 255, 255, 0.8) 0%,
            rgba(255, 255, 255, 1) 50%,
            rgba(255, 255, 255, 0.8) 100%
          );
          background-size: 200% 100%;
          -webkit-background-clip: text;
          background-clip: text;
          animation: shimmer 3s ease-in-out infinite;
        }

        /* Glass morphism effect */
        .glass-card {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        /* Botanical decoration */
        .botanical-corner {
          position: absolute;
          width: 120px;
          height: 120px;
          opacity: 0.15;
        }

        .botanical-corner-tl {
          top: -20px;
          left: -20px;
        }

        .botanical-corner-br {
          bottom: -20px;
          right: -20px;
          transform: rotate(180deg);
        }
      `}</style>

      <section className="save-date-section relative min-h-screen overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/images/DSC04481.webp"
            alt="Wedding celebration - Save the date for Jovelyn and Marvin"
            fill
            className="object-cover"
            priority
            sizes="100vw"
            quality={90}
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
          />

          {/* Gradient Overlay - Sage Green Theme */}
          <div className="absolute inset-0 bg-gradient-to-br from-green-900/70 via-green-800/60 to-green-900/70" />

          {/* Additional texture overlay */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 30m-20 0a20 20 0 1 0 40 0a20 20 0 1 0 -40 0' stroke='white' stroke-width='0.5' fill='none' opacity='0.3'/%3E%3C/svg%3E")`,
              backgroundSize: "60px 60px",
            }}
          />
        </div>

        {/* Content Container */}
        <div className="relative z-10 flex flex-col justify-center items-center min-h-screen px-4 py-20">
          {/* Top Heading */}
          <div
            className={`text-center mb-12 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}
          >
            <h3 className="save-date-body text-2xl md:text-3xl text-white/90 font-light tracking-[0.3em] uppercase mb-4">
              We&rsquo;re Getting Married
            </h3>
            <div className="w-32 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent mx-auto"></div>
          </div>

          {/* Main Card Container */}
          <div
            className={`max-w-5xl w-full ${isVisible ? "animate-fade-in-scale delay-200" : "opacity-0"}`}
          >
            <div className="grid md:grid-cols-5 gap-0 overflow-hidden rounded-2xl shadow-2xl">
              {/* Left Panel - Save the Date (2 columns on desktop) */}
              <div className="md:col-span-2 relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border-r border-white/20 p-10 md:p-12 flex flex-col justify-center items-center text-center">
                {/* Botanical decoration - top left */}
                <svg
                  className="botanical-corner botanical-corner-tl"
                  viewBox="0 0 120 120"
                >
                  <path
                    d="M60 20C40 40 30 60 35 80C40 95 50 105 60 110C70 105 80 95 85 80C90 60 80 40 60 20Z"
                    fill="none"
                    stroke="white"
                    strokeWidth="1.5"
                  />
                  <path d="M60 20L60 110" stroke="white" strokeWidth="1" />
                </svg>

                {/* Content */}
                <div
                  className={
                    isVisible ? "animate-slide-in-left delay-400" : "opacity-0"
                  }
                >
                  <h3 className="save-date-serif text-7xl md:text-8xl font-bold text-white leading-none mb-2">
                    Save
                  </h3>
                  <div className="flex items-center justify-center gap-3 my-4">
                    <div className="w-8 h-px bg-white/50"></div>
                    <span className="save-date-section text-sm tracking-[0.4em] text-white/90 uppercase">
                      The
                    </span>
                    <div className="w-8 h-px bg-white/50"></div>
                  </div>
                  <h3 className="save-date-serif text-7xl md:text-8xl font-bold text-white leading-none">
                    Date
                  </h3>
                </div>

                {/* Botanical decoration - bottom right */}
                <svg
                  className="botanical-corner botanical-corner-br"
                  viewBox="0 0 120 120"
                >
                  <path
                    d="M60 20C40 40 30 60 35 80C40 95 50 105 60 110C70 105 80 95 85 80C90 60 80 40 60 20Z"
                    fill="none"
                    stroke="white"
                    strokeWidth="1.5"
                  />
                  <path d="M60 20L60 110" stroke="white" strokeWidth="1" />
                </svg>
              </div>

              {/* Right Panel - Details (3 columns on desktop) */}
              <div className="md:col-span-3 relative bg-gradient-to-br from-green-700/90 to-green-800/90 backdrop-blur-xl p-8 sm:p-10 md:p-14 flex flex-col justify-center">
                {/* Couple Names */}
                <div
                  className={`text-center mb-6 sm:mb-8 ${isVisible ? "animate-slide-in-right delay-500" : "opacity-0"}`}
                >
                  <h2 className="save-date-script text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-white shimmer-text mb-3 sm:mb-4 leading-tight px-2">
                    {WEDDING_DETAILS.names.bride}
                    <span className="save-date-body text-2xl sm:text-3xl md:text-4xl mx-2 sm:mx-3 font-light italic">
                      &
                    </span>
                    {WEDDING_DETAILS.names.groom}
                  </h2>

                  <p className="save-date-body text-sm sm:text-base md:text-lg text-white/90 tracking-wide italic mt-3 sm:mt-4 px-4 sm:px-6 leading-relaxed">
                    Request the honor of your presence on their wedding day
                  </p>
                </div>

                {/* Ornamental Divider */}
                <div
                  className={`my-6 sm:my-8 ${isVisible ? "animate-fade-in-up delay-600" : "opacity-0"}`}
                >
                  <div className="ornament-divider max-w-xs mx-auto"></div>
                </div>

                {/* Wedding Details Cards */}
                <div
                  className={`space-y-3 sm:space-y-4 ${isVisible ? "animate-fade-in-up delay-700" : "opacity-0"}`}
                >
                  {/* Date */}
                  <div className="glass-card rounded-lg sm:rounded-xl p-4 sm:p-5 flex items-center gap-3 sm:gap-4 hover:bg-white/20 transition-all duration-300">
                    <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-white/20 rounded-full flex items-center justify-center">
                      <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </div>
                    <div className="text-left">
                      <p className="text-xs text-white/70 uppercase tracking-wider mb-1">
                        Date
                      </p>
                      <p className="save-date-serif text-lg sm:text-xl md:text-2xl font-semibold text-white">
                        {WEDDING_DETAILS.date}
                      </p>
                    </div>
                  </div>

                  {/* Time */}
                  <div className="glass-card rounded-lg sm:rounded-xl p-4 sm:p-5 flex items-center gap-3 sm:gap-4 hover:bg-white/20 transition-all duration-300">
                    <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-white/20 rounded-full flex items-center justify-center">
                      <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </div>
                    <div className="text-left">
                      <p className="text-xs text-white/70 uppercase tracking-wider mb-1">
                        Time
                      </p>
                      <p className="save-date-serif text-lg sm:text-xl md:text-2xl font-semibold text-white">
                        {WEDDING_DETAILS.time}
                      </p>
                    </div>
                  </div>

                  {/* Venue */}
                  <div className="glass-card rounded-lg sm:rounded-xl p-4 sm:p-5 flex items-center gap-3 sm:gap-4 hover:bg-white/20 transition-all duration-300">
                    <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-white/20 rounded-full flex items-center justify-center">
                      <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </div>
                    <div className="text-left">
                      <p className="text-xs text-white/70 uppercase tracking-wider mb-1">
                        Venue
                      </p>
                      <p className="save-date-serif text-lg sm:text-xl md:text-2xl font-semibold text-white">
                        {WEDDING_DETAILS.venue}
                      </p>
                      <p className="text-sm text-white/80 mt-1">
                        {WEDDING_DETAILS.location}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Bottom decorative element */}
                <div
                  className={`mt-6 sm:mt-8 flex justify-center ${isVisible ? "animate-fade-in-up delay-800" : "opacity-0"}`}
                >
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-white/40"></div>
                    <div className="w-2 h-2 rounded-full bg-white/60"></div>
                    <div className="w-2 h-2 rounded-full bg-white/40"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Text */}
          <div
            className={`text-center mt-12 ${isVisible ? "animate-fade-in-up delay-900" : "opacity-0"}`}
          >
            <p className="save-date-body text-white/70 text-sm md:text-base italic tracking-wide">
              We can&rsquo;t wait to celebrate with you
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default SaveTheDateSection;
