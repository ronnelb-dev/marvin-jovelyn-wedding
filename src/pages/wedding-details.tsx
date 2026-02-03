"use client";

import { useState } from "react";
import Head from "next/head";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import "@/styles/globals.css";
import { Playfair_Display } from "next/font/google";
import EventScheduleSection from "@/components/EventScheduleSection";
import Image from "next/image";
import Preloader from "@/components/preloader";
import { Plane, Gift, Heart, MapPin, Leaf, Calendar, Utensils } from "lucide-react";
import Hero from "@/components/Hero";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700"],
});

type ImageModalProps = {
  isOpen: boolean;
  onClose: () => void;
  imageSrc: string;
  imageAlt: string;
  title: string;
};

// Enhanced Image Modal Component
const ImageModal: React.FC<ImageModalProps> = ({
  isOpen,
  onClose,
  imageSrc,
  imageAlt,
  title,
}) => {
  if (!isOpen) return null;

  return (
    <>
      <style jsx>{`
        @keyframes modalFadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        @keyframes modalSlideUp {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        
        .modal-backdrop {
          animation: modalFadeIn 0.3s ease-out;
        }
        
        .modal-content {
          animation: modalSlideUp 0.4s ease-out;
        }
      `}</style>
      
      <div
        className="modal-backdrop fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <div className="modal-content relative max-w-5xl max-h-[90vh] w-full h-full flex flex-col">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute -top-14 right-0 text-white hover:text-green-300 transition-colors z-10 group"
            aria-label="Close modal"
          >
            <div className="flex items-center gap-2">
              <span className="text-sm uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity">
                Close
              </span>
              <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center group-hover:bg-white/20 transition-colors">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </div>
            </div>
          </button>

          {/* Modal content */}
          <div
            className="relative flex-1 bg-white rounded-2xl overflow-hidden shadow-2xl border border-green-100"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Image container */}
            <div className="relative h-full">
              <Image
                src={imageSrc}
                alt={imageAlt}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 80vw"
                priority
              />
            </div>

            {/* Title overlay */}
            {title && (
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-green-900/90 via-green-900/70 to-transparent p-8">
                <h3 className="text-white text-2xl font-semibold">{title}</h3>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default function WeddingDetailsPage() {
  const [modalState, setModalState] = useState({
    isOpen: false,
    imageSrc: "",
    imageAlt: "",
    title: "",
  });

  const openModal = (imageSrc: string, imageAlt: string, title: string) => {
    setModalState({
      isOpen: true,
      imageSrc,
      imageAlt,
      title,
    });
  };

  const closeModal = () => {
    setModalState({
      isOpen: false,
      imageSrc: "",
      imageAlt: "",
      title: "",
    });
  };

  return (
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,400&family=Playfair+Display:wght@400;500;600;700&family=Cinzel:wght@400;500;600&family=Montserrat:wght@300;400;500;600&display=swap');
        
        .wedding-details-page {
          font-family: 'Montserrat', sans-serif;
        }
        
        .details-serif {
          font-family: 'Playfair Display', serif;
        }
        
        .details-script {
          font-family: 'Cinzel', serif;
        }
        
        .details-body {
          font-family: 'Cormorant Garamond', serif;
        }
        
        /* Section divider */
        .section-ornament {
          position: relative;
          width: 80px;
          height: 2px;
          background: linear-gradient(90deg, transparent, #9CAF88, transparent);
          margin: 0 auto;
        }
        
        .section-ornament::before,
        .section-ornament::after {
          content: '';
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #9CAF88;
        }
        
        .section-ornament::before {
          left: -12px;
        }
        
        .section-ornament::after {
          right: -12px;
        }
      `}</style>

      <Head>
        <title>Wedding Details – Marvin & Jovelyn</title>
        <meta name="description" content="Wedding details for Marvin & Jovelyn - September 11, 2026" />
      </Head>

      <main className="wedding-details-page antialiased bg-gradient-to-b from-white via-green-50/20 to-white text-gray-800">
        <NavBar />
        <Preloader />
        <Hero />

        <div>
          <EventScheduleSection />
        </div>

        {/* Enhanced Dress Code Section */}
        <section className="py-24 px-4 md:px-8 max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-3 mb-6">
              <Leaf className="w-6 h-6 text-green-600" />
              <span className="text-sm uppercase tracking-[0.3em] text-green-700 font-medium">
                What to Wear
              </span>
              <Leaf className="w-6 h-6 text-green-600" />
            </div>
            <h2 className="details-serif text-5xl md:text-6xl lg:text-7xl font-semibold text-green-900 mb-6">
              Dress Code
            </h2>
            <div className="section-ornament mb-8"></div>
            <p className="details-body text-xl text-gray-600 max-w-2xl mx-auto italic leading-relaxed">
              We invite you to dress in semi-formal attire that complements our 
              elegant sage green and natural botanical theme
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Dress Code Guidelines */}
            <div className="space-y-8">
              {/* For Ladies */}
              <div className="group bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-green-100 hover:shadow-xl hover:border-green-200 transition-all duration-300">
                <div className="flex items-center mb-6">
                  <div className="w-14 h-14 bg-gradient-to-br from-green-600 to-green-700 rounded-full flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                    <span className="text-white text-2xl">👗</span>
                  </div>
                  <h3 className="details-serif text-3xl font-semibold text-green-900">
                    For Ladies
                  </h3>
                </div>

                <div className="relative">
                  <div
                    className="relative h-80 mb-6 rounded-xl overflow-hidden shadow-md cursor-pointer group/img"
                    onClick={() =>
                      openModal(
                        "/images/ladies-attire-sample.webp",
                        "Ladies semi-formal attire example",
                        "For Ladies - Semi-Formal Attire"
                      )
                    }
                  >
                    <Image
                      src="/images/ladies-attire-sample.webp"
                      alt="Ladies semi-formal attire example"
                      fill
                      className="object-cover group-hover/img:scale-105 transition-transform duration-500"
                    />
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-green-900/60 via-transparent to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 flex items-end p-6">
                      <p className="text-white text-sm font-medium">Click to enlarge</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <p className="details-body text-lg text-gray-700 leading-relaxed">
                      Cocktail dresses, dressy blouses with dress pants, or 
                      elegant midi/maxi dresses in sage green, cream, or earth tones
                    </p>
                    
                    <div className="flex flex-wrap gap-2">
                      <span className="px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                        Cocktail Dress
                      </span>
                      <span className="px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                        Midi Dress
                      </span>
                      <span className="px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                        Dressy Blouse
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* For Gentlemen */}
              <div className="group bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-green-100 hover:shadow-xl hover:border-green-200 transition-all duration-300">
                <div className="flex items-center mb-6">
                  <div className="w-14 h-14 bg-gradient-to-br from-green-700 to-green-800 rounded-full flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                    <span className="text-white text-2xl">👔</span>
                  </div>
                  <h3 className="details-serif text-3xl font-semibold text-green-900">
                    For Gentlemen
                  </h3>
                </div>

                <div className="relative">
                  <div
                    className="relative h-80 mb-6 rounded-xl overflow-hidden shadow-md cursor-pointer group/img"
                    onClick={() =>
                      openModal(
                        "/images/gentlemen-attire-sample.webp",
                        "Gentlemen semi-formal attire example",
                        "For Gentlemen - Semi-Formal Attire"
                      )
                    }
                  >
                    <Image
                      src="/images/gentlemen-attire-sample.webp"
                      alt="Gentlemen semi-formal attire example"
                      fill
                      className="object-cover group-hover/img:scale-105 transition-transform duration-500"
                    />
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-green-900/60 via-transparent to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 flex items-end p-6">
                      <p className="text-white text-sm font-medium">Click to enlarge</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <p className="details-body text-lg text-gray-700 leading-relaxed">
                      Dress shirts with slacks, blazers optional, or polo shirts 
                      with dress pants in neutral or earth tones
                    </p>
                    
                    <div className="flex flex-wrap gap-2">
                      <span className="px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                        Dress Shirt
                      </span>
                      <span className="px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                        Blazer
                      </span>
                      <span className="px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                        Polo Shirt
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Color Palette & Guidelines */}
            <div className="space-y-8">
              {/* Color Palette */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-green-100">
                <h3 className="details-serif text-3xl font-semibold text-green-900 mb-8 text-center">
                  Our Color Palette
                </h3>

                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-green-50 to-green-100/50 border border-green-200">
                    <div className="w-16 h-16 rounded-full bg-[#9CAF88] shadow-lg flex-shrink-0 border-4 border-white"></div>
                    <div>
                      <h4 className="font-semibold text-lg text-gray-800">Sage Green</h4>
                      <p className="text-sm text-gray-600 font-mono">#9CAF88</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-green-50 to-green-100/50 border border-green-200">
                    <div className="w-16 h-16 rounded-full bg-[#7A9070] shadow-lg flex-shrink-0 border-4 border-white"></div>
                    <div>
                      <h4 className="font-semibold text-lg text-gray-800">Forest Green</h4>
                      <p className="text-sm text-gray-600 font-mono">#7A9070</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-amber-50 to-amber-100/50 border border-amber-200">
                    <div className="w-16 h-16 rounded-full bg-[#C5D5B8] shadow-lg flex-shrink-0 border-4 border-white"></div>
                    <div>
                      <h4 className="font-semibold text-lg text-gray-800">Sage Light</h4>
                      <p className="text-sm text-gray-600 font-mono">#C5D5B8</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-amber-50 to-amber-100/50 border border-amber-200">
                    <div className="w-16 h-16 rounded-full bg-[#FAF8F3] shadow-lg flex-shrink-0 border-4 border-white"></div>
                    <div>
                      <h4 className="font-semibold text-lg text-gray-800">Cream</h4>
                      <p className="text-sm text-gray-600 font-mono">#FAF8F3</p>
                    </div>
                  </div>
                </div>

                {/* Inspiration Quote */}
                <div className="relative p-6 bg-gradient-to-br from-green-50 to-white rounded-xl border-l-4 border-green-600">
                  <Leaf className="absolute top-4 right-4 w-8 h-8 text-green-400 opacity-20" />
                  <p className="details-body text-lg text-gray-700 italic leading-relaxed">
                    "These natural, organic tones reflect the timeless elegance and 
                    botanical beauty we envision for our celebration."
                  </p>
                  <div className="mt-4 flex justify-start gap-2">
                    <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  </div>
                </div>
              </div>

              {/* Please Avoid */}
              <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl p-8 border border-red-200 shadow-lg">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-xl">⚠️</span>
                  </div>
                  <div>
                    <h4 className="details-serif text-2xl font-semibold text-gray-800 mb-3">
                      Please Avoid
                    </h4>
                    <p className="details-body text-gray-700 leading-relaxed text-lg">
                      White, ivory, or very bright colors that might compete with our 
                      sage green botanical theme. We want everyone to feel comfortable 
                      while harmonizing with our wedding palette.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Enhanced Menu Section */}
        <section className="py-24 px-4 md:px-8 max-w-7xl mx-auto bg-gradient-to-b from-white to-green-50/30">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-3 mb-6">
              <Utensils className="w-6 h-6 text-green-600" />
              <span className="text-sm uppercase tracking-[0.3em] text-green-700 font-medium">
                Culinary Delights
              </span>
              <Utensils className="w-6 h-6 text-green-600" />
            </div>
            <h2 className="details-serif text-5xl md:text-6xl lg:text-7xl font-semibold text-green-900 mb-6">
              Wedding Menu
            </h2>
            <div className="section-ornament mb-8"></div>
            <p className="details-body text-xl text-gray-600 max-w-2xl mx-auto italic leading-relaxed">
              Savor carefully selected dishes that celebrate our love story 
              and bring joy to every palate
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Menu Content */}
            <div className="space-y-8">
              {/* Main Courses */}
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-green-100">
                <div className="flex items-center mb-8 pb-6 border-b border-green-100">
                  <div className="w-14 h-14 bg-gradient-to-br from-green-600 to-green-700 rounded-full flex items-center justify-center mr-4">
                    <span className="details-serif text-white font-semibold text-xl">1</span>
                  </div>
                  <h3 className="details-serif text-3xl font-semibold text-green-900">
                    Main Courses
                  </h3>
                </div>
                <div className="space-y-6">
                  {[
                    { name: "Spicy Thai Chicken", detail: "with Cashew Nuts" },
                    { name: "Beef with Mushroom", detail: "& Gravy" },
                    { name: "Fish Fillet", detail: "with Mango Tomato Salsa" }
                  ].map((dish, idx) => (
                    <div key={idx} className="flex items-start gap-4 group">
                      <div className="w-3 h-3 bg-green-600 rounded-full mt-2 flex-shrink-0 group-hover:scale-125 transition-transform"></div>
                      <div>
                        <h4 className="details-serif text-xl font-semibold text-gray-800 mb-1">
                          {dish.name}
                        </h4>
                        <p className="details-body text-gray-600 text-lg italic">{dish.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Side Dishes */}
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-green-100">
                <div className="flex items-center mb-8 pb-6 border-b border-green-100">
                  <div className="w-14 h-14 bg-gradient-to-br from-green-700 to-green-800 rounded-full flex items-center justify-center mr-4">
                    <span className="details-serif text-white font-semibold text-xl">2</span>
                  </div>
                  <h3 className="details-serif text-3xl font-semibold text-green-900">
                    Side Dishes
                  </h3>
                </div>
                <div className="space-y-6">
                  {[
                    "Alfredo Fettucine",
                    "Buttered Corn & Carrots",
                    "Vegetable Chowder Soup"
                  ].map((dish, idx) => (
                    <div key={idx} className="flex items-start gap-4 group">
                      <div className="w-3 h-3 bg-green-700 rounded-full mt-2 flex-shrink-0 group-hover:scale-125 transition-transform"></div>
                      <h4 className="details-serif text-xl font-semibold text-gray-800">
                        {dish}
                      </h4>
                    </div>
                  ))}
                </div>
              </div>

              {/* Beverages */}
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-green-100">
                <div className="flex items-center mb-8 pb-6 border-b border-green-100">
                  <div className="w-14 h-14 bg-gradient-to-br from-green-800 to-green-900 rounded-full flex items-center justify-center mr-4">
                    <span className="details-serif text-white font-semibold text-xl">3</span>
                  </div>
                  <h3 className="details-serif text-3xl font-semibold text-green-900">
                    Beverages
                  </h3>
                </div>
                <div className="space-y-6">
                  {["Bottomless Iced Tea", "Water"].map((drink, idx) => (
                    <div key={idx} className="flex items-start gap-4 group">
                      <div className="w-3 h-3 bg-green-800 rounded-full mt-2 flex-shrink-0 group-hover:scale-125 transition-transform"></div>
                      <h4 className="details-serif text-xl font-semibold text-gray-800">
                        {drink}
                      </h4>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Enhanced Image Section */}
            <div className="relative">
              <div className="relative h-[700px] rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
                <Image
                  src="/images/table-img.webp"
                  alt="Elegant dining setup"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-green-900/60 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <div className="bg-white/95 backdrop-blur-md rounded-xl p-6 shadow-xl">
                    <h4 className="details-serif text-2xl font-semibold text-gray-800 mb-2">
                      An Elegant Dining Experience
                    </h4>
                    <p className="details-body text-gray-600 text-lg leading-relaxed">
                      Every detail has been lovingly chosen to make your 
                      dining experience truly memorable
                    </p>
                  </div>
                </div>
              </div>

              {/* Floating botanical accents */}
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-gradient-to-br from-green-400 to-green-600 rounded-full opacity-20 blur-2xl"></div>
              <div className="absolute -bottom-6 -left-6 w-40 h-40 bg-gradient-to-br from-green-500 to-green-700 rounded-full opacity-20 blur-2xl"></div>
            </div>
          </div>
        </section>

        {/* Gift Registry - Japan Move Section */}
        <section className="py-24 px-4 md:px-8 max-w-4xl mx-auto">
          <div className="relative">
            {/* Background decoration */}
            <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-blue-50 rounded-3xl"></div>
            <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-green-400/20 to-transparent rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-blue-400/20 to-transparent rounded-full blur-3xl"></div>

            <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl p-10 md:p-14 shadow-xl border border-green-100">
              {/* Header */}
              <div className="text-center mb-10">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full mb-6 shadow-lg">
                  <Plane className="w-10 h-10 text-white" />
                </div>
                <h2 className="details-serif text-4xl md:text-5xl font-semibold text-gray-800 mb-4">
                  Our Next Adventure
                </h2>
                <div className="section-ornament mb-6"></div>
                <div className="inline-flex items-center gap-3 bg-blue-100 rounded-full px-6 py-3 border border-blue-200">
                  <MapPin className="w-5 h-5 text-blue-600" />
                  <span className="details-body text-lg font-semibold text-blue-800">
                    We're Moving to Japan! 🇯🇵
                  </span>
                </div>
              </div>

              {/* Main message */}
              <div className="bg-gradient-to-br from-white to-green-50 rounded-2xl p-8 shadow-sm border border-green-100 mb-8">
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center">
                      <Gift className="w-7 h-7 text-green-700" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="details-serif text-2xl font-semibold text-gray-800 mb-4">
                      A Special Request About Gifts
                    </h3>
                    <div className="space-y-4 details-body text-lg text-gray-700 leading-relaxed">
                      <p>
                        As we prepare for our exciting journey to Japan, we're in the 
                        process of downsizing and carefully selecting what to bring with us. 
                        International shipping is quite expensive, and we want to start 
                        fresh in our new home.
                      </p>
                      <p>
                        If you'd like to celebrate with us, we would be incredibly grateful 
                        for monetary gifts instead of physical items. This will help us with 
                        our moving expenses and getting settled in Japan.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom section */}
              <div className="text-center pt-6 border-t border-green-100">
                <div className="inline-flex items-center gap-3 text-gray-600 mb-4">
                  <Heart className="w-6 h-6 text-green-600 fill-green-600" />
                  <span className="details-body text-lg">
                    Your support means the world to us
                  </span>
                  <Heart className="w-6 h-6 text-green-600 fill-green-600" />
                </div>
                <p className="details-body text-base text-gray-500 italic">
                  We can't wait to share our Japanese adventure with you!
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Enhanced Location Section */}
        <section className="py-24 px-4 md:px-8 max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 mb-6">
              <MapPin className="w-6 h-6 text-green-600" />
              <span className="text-sm uppercase tracking-[0.3em] text-green-700 font-medium">
                Find Us
              </span>
              <MapPin className="w-6 h-6 text-green-600" />
            </div>
            <h2 className="details-serif text-5xl md:text-6xl lg:text-7xl font-semibold text-green-900 mb-6">
              Venue Location
            </h2>
            <div className="section-ornament mb-8"></div>
            <p className="details-body text-xl text-gray-600 max-w-2xl mx-auto italic">
              Join us at this beautiful location as we celebrate our special day
            </p>
          </div>

          <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m28!1m12!1m3!1d15452.17442516286!2d120.8964515!3d14.0873567!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m13!3e0!4m5!1s0x0%3A0xd9fe20a6632bdd4b!2sBrgy%2C%20Tagaytay%20-%20Nasugbu%20Hwy%2C%20Tagaytay%20City%2C%204120%20Cavite!3m2!1d14.0882557!2d120.8981882!4m5!1s0x0%3A0xd9fe20a6632bdd4b!2sBrgy%2C%20Tagaytay%20-%20Nasugbu%20Hwy%2C%20Tagaytay%20City%2C%204120%20Cavite!3m2!1d14.0882557!2d120.8981882!5e0!3m2!1sen!2sph!4v1717058356453!5m2!1sen!2sph"
              width="100%"
              height="600"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="border-0 w-full"
            ></iframe>
          </div>
        </section>

        {/* RSVP Call to Action */}
        <section className="py-24 px-4 md:px-8 max-w-4xl mx-auto">
          <div className="relative">
            {/* Background decoration */}
            <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-green-100/30 rounded-3xl"></div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-green-400/20 to-transparent rounded-full blur-2xl"></div>
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-tr from-green-500/20 to-transparent rounded-full blur-2xl"></div>

            <div className="relative bg-white/90 backdrop-blur-sm rounded-3xl p-12 md:p-16 shadow-xl border border-green-200 text-center">
              <div className="mb-10">
                <h2 className="details-serif text-5xl md:text-6xl font-semibold text-green-900 mb-6">
                  Will You Join Us?
                </h2>
                <div className="section-ornament mb-8"></div>
              </div>

              <div className="mb-10">
                <p className="details-body text-2xl text-gray-700 mb-6 leading-relaxed italic">
                  Your presence would make our special day even more meaningful
                </p>
                <div className="inline-flex items-center bg-green-100 rounded-full px-8 py-4 border border-green-300 shadow-sm">
                  <Calendar className="w-6 h-6 text-green-700 mr-3" />
                  <p className="text-lg font-semibold text-gray-800">
                    Please RSVP by{" "}
                    <span className="text-green-700">July 13, 2026</span>
                  </p>
                </div>
              </div>

              {/* Decorative hearts */}
              <div className="flex justify-center gap-3 mt-8">
                <Heart className="w-4 h-4 text-green-500 fill-green-500" />
                <Heart className="w-4 h-4 text-green-600 fill-green-600" />
                <Heart className="w-4 h-4 text-green-500 fill-green-500" />
              </div>
            </div>
          </div>
        </section>

        <Footer />

        {/* Image Modal */}
        <ImageModal
          isOpen={modalState.isOpen}
          onClose={closeModal}
          imageSrc={modalState.imageSrc}
          imageAlt={modalState.imageAlt}
          title={modalState.title}
        />
      </main>
    </>
  );
}