"use client";
import Head from "next/head";
import Hero from "@/components/Hero";
import "@/styles/globals.css";
import Preloader from "@/components/preloader";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import ProposalSection from "@/components/ProposalSection";
import SaveTheDateSection from "@/components/SaveTheDateSection";
import EventScheduleSection from "@/components/EventScheduleSection";

export default function Home() {
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
                href="/rsvp"
                className="px-8 py-3 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors font-light tracking-wide"
              >
                RSVP
              </a>
              <a
                href="/wedding-details"
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
        <Footer />
      </main>
    </>
  );
}
