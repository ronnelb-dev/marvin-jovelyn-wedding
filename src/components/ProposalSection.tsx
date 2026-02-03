"use client";

import Image from "next/image";
import { Button } from "flowbite-react";
import { Leaf, Calendar, MapPin, Sparkles } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

// Elegant decorative elements
const BOTANICAL_ACCENTS = [
  { position: "top-12 left-8", rotation: "rotate-12", opacity: "opacity-20", delay: "delay-0" },
  { position: "top-32 right-12", rotation: "-rotate-45", opacity: "opacity-15", delay: "delay-500" },
  { position: "bottom-24 left-16", rotation: "rotate-45", opacity: "opacity-25", delay: "delay-1000" },
];

const ProposalSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,400&family=Playfair+Display:ital,wght@0,400;0,600;1,400&family=Lora:ital,wght@0,400;0,500;1,400&display=swap');
        
        .proposal-section {
          font-family: 'Lora', serif;
        }
        
        .heading-serif {
          font-family: 'Playfair Display', serif;
        }
        
        .body-serif {
          font-family: 'Cormorant Garamond', serif;
        }
        
        /* Elegant fade-in animations */
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeInLeft {
          from {
            opacity: 0;
            transform: translateX(-40px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes fadeInRight {
          from {
            opacity: 0;
            transform: translateX(40px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        @keyframes floatLeaf {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-10px) rotate(5deg);
          }
        }
        
        .animate-fade-in-up {
          animation: fadeInUp 1s ease-out forwards;
          opacity: 0;
        }
        
        .animate-fade-in-left {
          animation: fadeInLeft 1s ease-out forwards;
          opacity: 0;
        }
        
        .animate-fade-in-right {
          animation: fadeInRight 1s ease-out forwards;
          opacity: 0;
        }
        
        .animate-scale-in {
          animation: scaleIn 1.2s ease-out forwards;
          opacity: 0;
        }
        
        .delay-200 { animation-delay: 0.2s; }
        .delay-400 { animation-delay: 0.4s; }
        .delay-600 { animation-delay: 0.6s; }
        .delay-800 { animation-delay: 0.8s; }
        .delay-1000 { animation-delay: 1s; }
        
        /* Floating botanical animation */
        .floating-leaf {
          animation: floatLeaf 4s ease-in-out infinite;
        }
        
        /* Image frame border animation */
        .image-frame {
          position: relative;
        }
        
        .image-frame::before {
          content: '';
          position: absolute;
          inset: -2px;
          background: linear-gradient(45deg, #9CAF88, #C5D5B8, #9CAF88);
          border-radius: inherit;
          z-index: -1;
          opacity: 0;
          transition: opacity 0.5s ease;
        }
        
        .image-frame:hover::before {
          opacity: 0.5;
        }
        
        /* Decorative line */
        .decorative-line {
          position: relative;
          width: 80px;
          height: 2px;
          background: linear-gradient(90deg, transparent, #9CAF88, transparent);
        }
        
        .decorative-line::before,
        .decorative-line::after {
          content: '';
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #9CAF88;
        }
        
        .decorative-line::before {
          left: -10px;
        }
        
        .decorative-line::after {
          right: -10px;
        }
        
        /* Quote styling */
        .quote-text {
          position: relative;
          padding-left: 40px;
        }
        
        .quote-text::before {
          content: '"';
          position: absolute;
          left: 0;
          top: -10px;
          font-family: 'Playfair Display', serif;
          font-size: 80px;
          color: #9CAF88;
          opacity: 0.3;
          line-height: 1;
        }
      `}</style>

      <section 
        ref={sectionRef}
        className="proposal-section relative w-full min-h-screen overflow-hidden bg-gradient-to-b from-white via-green-50/30 to-white py-24 md:py-32"
      >
        {/* Floating Botanical Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {BOTANICAL_ACCENTS.map((accent, index) => (
            <div
              key={index}
              className={`absolute ${accent.position} ${accent.opacity} ${accent.delay} floating-leaf`}
            >
              <svg
                width="120"
                height="120"
                viewBox="0 0 120 120"
                className={`text-green-600 ${accent.rotation}`}
              >
                <path
                  d="M60 20C40 40 30 60 35 80C40 95 50 105 60 110C70 105 80 95 85 80C90 60 80 40 60 20Z"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  opacity="0.4"
                />
                <path d="M60 20L60 110" stroke="currentColor" strokeWidth="1" opacity="0.3" />
              </svg>
            </div>
          ))}
        </div>

        {/* Main Content Container */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Column - Text Content */}
            <div className="lg:col-span-7 space-y-8">
              
              {/* Section Label */}
              <div className={isVisible ? "animate-fade-in-up" : "opacity-0"}>
                <div className="inline-flex items-center gap-3 text-green-700">
                  <div className="decorative-line"></div>
                  <span className="text-sm tracking-[0.3em] uppercase font-light">
                    A Moment to Cherish
                  </span>
                </div>
              </div>

              {/* Main Heading */}
              <div className={`space-y-4 ${isVisible ? "animate-fade-in-up delay-200" : "opacity-0"}`}>
                <h2 className="heading-serif text-5xl md:text-6xl lg:text-7xl font-semibold leading-tight text-green-900">
                  The Question
                  <span className="block text-green-700 italic font-normal">
                    That Changed Everything
                  </span>
                </h2>
              </div>

              {/* Story Content */}
              <div className={`space-y-6 ${isVisible ? "animate-fade-in-up delay-400" : "opacity-0"}`}>
                <div className="quote-text">
                  <p className="body-serif text-xl md:text-2xl text-gray-700 leading-relaxed italic">
                    Four years of distance, countless conversations, and endless anticipation 
                    led to the most perfect moment when we finally met face to face.
                  </p>
                </div>

                <p className="text-gray-600 text-lg leading-relaxed">
                  In that magical first meeting, surrounded by the people who had supported 
                  our journey from the very beginning, the moment felt absolutely right. 
                  With trembling hands and a heart full of certainty, the question was 
                  finally asked—and answered with the sweetest "yes" ever spoken.
                </p>
              </div>

              {/* Detail Cards */}
              <div className={`grid sm:grid-cols-2 gap-4 pt-4 ${isVisible ? "animate-fade-in-up delay-600" : "opacity-0"}`}>
                <div className="group relative p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-green-100 hover:border-green-200 transition-all duration-300 hover:shadow-lg">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-green-100 rounded-xl group-hover:bg-green-200 transition-colors">
                      <Calendar className="w-6 h-6 text-green-700" />
                    </div>
                    <div>
                      <p className="font-semibold text-green-900 mb-1">March 14, 2023</p>
                      <p className="text-sm text-gray-600 body-serif">The day our forever began</p>
                    </div>
                  </div>
                </div>

                <div className="group relative p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-green-100 hover:border-green-200 transition-all duration-300 hover:shadow-lg">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-green-100 rounded-xl group-hover:bg-green-200 transition-colors">
                      <MapPin className="w-6 h-6 text-green-700" />
                    </div>
                    <div>
                      <p className="font-semibold text-green-900 mb-1">First Meeting</p>
                      <p className="text-sm text-gray-600 body-serif">After 4 years apart</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Testimonial Quote */}
              <div className={`relative p-8 bg-gradient-to-br from-green-50 to-white rounded-2xl border-l-4 border-green-600 ${isVisible ? "animate-fade-in-up delay-800" : "opacity-0"}`}>
                <Sparkles className="absolute top-4 right-4 w-6 h-6 text-green-400 opacity-50" />
                <p className="body-serif text-lg text-gray-700 italic mb-3">
                  "Surrounded by the love and blessings of family and friends, 
                  witnessing this beautiful moment made our hearts overflow with joy."
                </p>
                <p className="text-sm text-green-700 font-medium tracking-wide">
                  — OUR FAMILIES
                </p>
              </div>

              {/* CTA Button */}
              <div className={`pt-4 ${isVisible ? "animate-fade-in-up delay-1000" : "opacity-0"}`}>
                <Link href="/our-story">
                  <Button className="group relative overflow-hidden bg-gradient-to-r from-green-700 to-green-600 hover:from-green-800 hover:to-green-700 border-0 px-8 py-4 rounded-full transition-all duration-500 hover:shadow-xl hover:scale-105">
                    <span className="relative z-10 flex items-center gap-3 text-white font-medium tracking-wide uppercase text-sm">
                      <Leaf className="w-5 h-5" />
                      Discover Our Journey
                      <svg 
                        className="w-5 h-5 transition-transform group-hover:translate-x-1" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </span>
                  </Button>
                </Link>
              </div>
            </div>

            {/* Right Column - Image */}
            <div className="lg:col-span-5">
              <div className={isVisible ? "animate-scale-in delay-400" : "opacity-0"}>
                {/* Decorative Corner Accents */}
                <div className="relative max-w-md mx-auto lg:mx-0">
                  {/* Top Left Corner */}
                  <div className="absolute -top-4 -left-4 w-20 h-20 border-t-2 border-l-2 border-green-600/40 rounded-tl-3xl"></div>
                  
                  {/* Bottom Right Corner */}
                  <div className="absolute -bottom-4 -right-4 w-20 h-20 border-b-2 border-r-2 border-green-600/40 rounded-br-3xl"></div>

                  {/* Main Image Container */}
                  <div className="image-frame relative p-4 bg-gradient-to-br from-white via-green-50/50 to-white rounded-3xl shadow-2xl">
                    <div className="relative overflow-hidden rounded-2xl">
                      <Image
                        src="/images/RonnelJuna-98.webp"
                        alt="The proposal moment - A memory to treasure forever"
                        width={500}
                        height={750}
                        className="w-full h-auto object-cover"
                        priority
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 500px"
                        quality={90}
                        placeholder="blur"
                        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                      />

                      {/* Subtle Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-green-900/10 via-transparent to-transparent"></div>
                    </div>

                    {/* Image Caption Badge */}
                    <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-white px-8 py-3 rounded-full shadow-lg border border-green-100">
                      <p className="body-serif text-sm font-medium text-green-800 whitespace-nowrap flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-green-600" />
                        March 14, 2023
                      </p>
                    </div>
                  </div>

                  {/* Floating Botanical Accent */}
                  <div className="absolute -top-8 -right-8 opacity-20 pointer-events-none">
                    <svg width="100" height="100" viewBox="0 0 100 100">
                      <path
                        d="M50 10C35 25 28 40 32 55C35 67 43 75 50 80C57 75 65 67 68 55C72 40 65 25 50 10Z"
                        fill="none"
                        stroke="#7A9070"
                        strokeWidth="2"
                      />
                      <path d="M50 10L50 80" stroke="#7A9070" strokeWidth="1.5" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Decorative Element */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-green-200 to-transparent"></div>
      </section>
    </>
  );
};

export default ProposalSection;