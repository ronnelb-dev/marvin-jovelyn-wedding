"use client";
import { useState } from "react";
import Head from "next/head";
import Image from "next/image";
import Hero from "@/components/Hero";
import "@/styles/globals.css";
import Preloader from "@/components/preloader";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import ProposalSection from "@/components/ProposalSection";
import SaveTheDateSection from "@/components/SaveTheDateSection";
import EventScheduleSection from "@/components/EventScheduleSection";

type ImageModalProps = {
  isOpen: boolean;
  onClose: () => void;
  imageSrc: string;
  imageAlt: string;
  title: string;
};

// Image Modal Component
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

          <div
            className="relative flex-1 bg-white rounded-2xl overflow-hidden shadow-2xl border border-slate-200"
            onClick={(e) => e.stopPropagation()}
          >
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

export default function Home() {
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
      <Head>
        <title>Marvin & Jovelyn - Our Wedding</title>
        <meta
          name="description"
          content="Marvin and Jovelyn Wedding at Santa Rosa - September 11, 2026"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="bg-white text-slate-900">
        <Preloader />
        <NavBar />
        <Hero />
        
        <div className="py-20 md:py-32 bg-white">
          <div className="max-w-5xl mx-auto px-4 md:px-8 text-center">
            <h2 className="text-5xl md:text-6xl font-light mb-8 text-slate-900">
              Two souls, one love
            </h2>
            <p className="text-xl md:text-2xl font-light text-slate-600 mb-12 max-w-2xl mx-auto leading-relaxed">
              We&rsquo;re thrilled to celebrate this beautiful moment with you
            </p>
            <div className="flex justify-center gap-6">
              <a
                href="#rsvp"
                className="px-8 py-3 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors font-light tracking-wide"
              >
                RSVP
              </a>
              <a
                href="#details"
                className="px-8 py-3 border border-slate-300 text-slate-900 rounded-lg hover:border-slate-900 transition-colors font-light tracking-wide"
              >
                Details
              </a>
            </div>
          </div>
        </div>

        <ProposalSection />
        <SaveTheDateSection />
        <EventScheduleSection />

        {/* Dress Code Section */}
        <section id="details" className="py-20 md:py-28 px-4 md:px-8 max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-slate-900 mb-4">
              Dress Code
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto font-light">
              Semi-formal attire in neutral and earth tones
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
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

            <div>
              <h3 className="text-2xl font-light text-slate-900 mb-4">Guidelines</h3>
              <p className="text-slate-600 leading-relaxed">
                We appreciate semi-formal attire in neutral tones that harmonize with our elegant palette. Avoid very bright neon colors or bold patterns that might compete with the refined aesthetic we&rsquo;ve envisioned.
              </p>
            </div>
          </div>
        </section>

        {/* Menu Section */}
        <section className="py-20 md:py-28 px-4 md:px-8 max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-slate-900 mb-4">
              Wedding Menu
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto font-light">
              Savor carefully selected dishes
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
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

        <ImageModal
          isOpen={modalState.isOpen}
          onClose={closeModal}
          imageSrc={modalState.imageSrc}
          imageAlt={modalState.imageAlt}
          title={modalState.title}
        />

        <Footer />
      </main>
    </>
  );
}
