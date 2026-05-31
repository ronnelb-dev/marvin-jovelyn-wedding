"use client";

import Image from "next/image";

export default function Footer() {
  return (
    <footer className="cordially-footer">
      <div className="cordially-footer-frame">
        <Image
          src="/images/DSC03570.jpg"
          alt="Marvin and Jovelyn together"
          fill
          sizes="100vw"
          className="cordially-cover"
        />
        <div className="cordially-footer-overlay" />
        <div className="cordially-footer-content">
          <h2>
            Join us as we celebrate the beginning of our forever. Your presence
            is the greatest gift of all.
          </h2>
          <p className="cordially-footer-hashtag">#JovAlwaysVinTheOne</p>
        </div>
      </div>
    </footer>
  );
}
