"use client";

import { useState } from "react";
import Head from "next/head";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import "@/styles/globals.css";
import EventScheduleSection from "@/components/EventScheduleSection";
import Image from "next/image";
import Preloader from "@/components/preloader";
import { Plane, Gift, Heart, MapPin, Leaf, Calendar, Utensils } from "lucide-react";
import Hero from "@/components/Hero";

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
            className="absolute -top-14 right-0 text-white hover:text-slate-300 transition-colors z-10 group"
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
            className="relative flex-1 bg-white rounded-2xl overflow-hidden shadow-2xl border border-slate-200"
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
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-900/90 via-slate-900/70 to-transparent p-8">
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
          background: linear-gradient(90deg, transparent, #8B7355, transparent);
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
          background: #8B7355;
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

      <main className="wedding-details-page antialiased bg-white text-slate-900">
        <NavBar />
        <Preloader />
        <Hero />

        <div>
          <EventScheduleSection />
        </div>

        {/* Dress Code Section */}
        <section className="py-20 md:py-28 px-4 md:px-8 max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-slate-900 mb-4">
              Dress Code
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto font-light">
              Semi-formal attire in neutral and earth tones
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* For Ladies */}
            <div>
              <h3 className="text-2xl font-light text-slate-900 mb-4">For Ladies</h3>
              <p className="text-slate-600 mb-4 leading-relaxed">
                Cocktail dresses, dressy blouses with dress pants, or elegant midi/maxi dresses in taupe, cream, or earth tones.
              </p>
              <div
                className="relative h-64 rounded-lg overflow-hidden cursor-pointer mb-4"
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
                  className="object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>

            {/* For Gentlemen */}
            <div>
              <h3 className="text-2xl font-light text-slate-900 mb-4">For Gentlemen</h3>
              <p className="text-slate-600 mb-4 leading-relaxed">
                Dress shirts with slacks, blazers optional, or polo shirts with dress pants in neutral or earth tones.
              </p>
              <div
                className="relative h-64 rounded-lg overflow-hidden cursor-pointer"
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
                  className="object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Color Palette Section */}
        <section className="py-20 md:py-28 px-4 md:px-8 max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-slate-900 mb-4">
              Color Palette
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto font-light">
              Our elegant neutral tones
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Color Palette */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col items-center">
                <div className="w-20 h-20 rounded-full bg-[#8B7355] mb-3 shadow-md"></div>
                <p className="font-medium text-slate-900">Taupe</p>
                <p className="text-sm text-slate-600">#8B7355</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-20 h-20 rounded-full bg-[#2C2420] mb-3 shadow-md"></div>
                <p className="font-medium text-slate-900">Charcoal</p>
                <p className="text-sm text-slate-600">#2C2420</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-20 h-20 rounded-full bg-[#E8E4DF] mb-3 shadow-md border border-slate-300"></div>
                <p className="font-medium text-slate-900">Cream</p>
                <p className="text-sm text-slate-600">#E8E4DF</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-20 h-20 rounded-full bg-[#F5F3F0] mb-3 shadow-md border border-slate-300"></div>
                <p className="font-medium text-slate-900">Ivory</p>
                <p className="text-sm text-slate-600">#F5F3F0</p>
              </div>
            </div>

            {/* Please Avoid */}
            <div>
              <h3 className="text-2xl font-light text-slate-900 mb-4">Guidelines</h3>
              <p className="text-slate-600 leading-relaxed">
                We appreciate semi-formal attire in neutral tones that harmonize with our elegant palette. Avoid very bright neon colors or bold patterns that might compete with the refined aesthetic we&rsquo;ve envisioned.
              </p>
            </div>
          </div>
        </section>

        {/* Menu Section */}
        <section className="py-20 md:py-28 px-4 md:px-8 max-w-6xl mx-auto bg-white">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-slate-900 mb-4">
              Wedding Menu
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto font-light">
              Savor carefully selected dishes
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Main Courses */}
            <div>
              <h3 className="text-2xl font-light text-slate-900 mb-6">Main Courses</h3>
              <ul className="space-y-3">
                {[
                  "Spicy Thai Chicken with Cashew Nuts",
                  "Beef with Mushroom & Gravy",
                  "Fish Fillet with Mango Tomato Salsa"
                ].map((dish, idx) => (
                  <li key={idx} className="text-slate-600 flex items-start gap-2">
                    <span className="text-slate-400 mt-1">•</span>
                    <span>{dish}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Side Dishes */}
            <div>
              <h3 className="text-2xl font-light text-slate-900 mb-6">Side Dishes</h3>
              <ul className="space-y-3">
                {[
                  "Alfredo Fettucine",
                  "Buttered Corn & Carrots",
                  "Vegetable Chowder Soup"
                ].map((dish, idx) => (
                  <li key={idx} className="text-slate-600 flex items-start gap-2">
                    <span className="text-slate-400 mt-1">•</span>
                    <span>{dish}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Beverages */}
            <div>
              <h3 className="text-2xl font-light text-slate-900 mb-6">Beverages</h3>
              <ul className="space-y-3">
                {["Bottomless Iced Tea", "Water"].map((drink, idx) => (
                  <li key={idx} className="text-slate-600 flex items-start gap-2">
                    <span className="text-slate-400 mt-1">•</span>
                    <span>{drink}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Japan Move Section */}
        <section className="py-20 md:py-28 px-4 md:px-8 max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-light text-slate-900 mb-4">
              Our Next Adventure
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto font-light">
              We&rsquo;re Moving to Japan! 🇯🇵
            </p>
          </div>

          <div className="max-w-3xl mx-auto bg-slate-50 rounded-lg p-8 md:p-12">
            <div className="space-y-6 text-slate-700 leading-relaxed">
              <p>
                As we prepare for our exciting journey to Japan, we&rsquo;re in the process of downsizing and carefully selecting what to bring with us. International shipping is quite expensive, and we want to start fresh in our new home.
              </p>
              <p>
                If you&rsquo;d like to celebrate with us, we would be incredibly grateful for monetary gifts instead of physical items. This will help us with our moving expenses and getting settled in Japan.
              </p>
              <p className="text-center font-light italic text-slate-600 pt-4">
                We can&rsquo;t wait to share our Japanese adventure with you!
              </p>
            </div>
          </div>
        </section>

        {/* Location Section */}
        <section className="py-20 md:py-28 px-4 md:px-8 max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-light text-slate-900 mb-4">
              Venue Location
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto font-light">
              Join us at this beautiful location
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
