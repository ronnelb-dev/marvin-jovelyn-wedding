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

      <main className="bg-white text-gray-900">
        <Preloader />
        <NavBar />
        <Hero />
        <ProposalSection />
        <SaveTheDateSection />
        <EventScheduleSection />
        <Footer />
      </main>
    </>
  );
}
