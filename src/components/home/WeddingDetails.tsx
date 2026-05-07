"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { Check, Plus, X } from "lucide-react";

import {
  detailCards,
  menuItems,
  paletteColors,
  schedule,
  WEDDING_LOCATION_DIRECTIONS,
  type DetailCard,
  type DetailId,
} from "@/data/homepage";

const detailCardsById = Object.fromEntries(
  detailCards.map((card) => [card.id, card]),
) as Record<DetailId, DetailCard>;

function DetailModal({
  activeDetail,
  onClose,
}: {
  activeDetail: DetailId | null;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!activeDetail) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [activeDetail, onClose]);

  if (!activeDetail) return null;

  const current = detailCardsById[activeDetail];

  return (
    <div className="cordially-modal" role="dialog" aria-modal="true">
      <button
        type="button"
        className="cordially-modal-backdrop"
        aria-label="Close details"
        onClick={onClose}
      />
      <div className="cordially-modal-panel">
        <button
          type="button"
          className="cordially-modal-close"
          aria-label="Close details"
          onClick={onClose}
        >
          <X size={20} />
        </button>
        <p className="cordially-kicker">details</p>
        <h3 className="cordially-modal-title">{current.title}</h3>
        <div className="cordially-modal-divider" />
        {activeDetail === "timeline" && (
          <div className="cordially-modal-list">
            {schedule.map((item) => (
              <article className="cordially-modal-row" key={item.title}>
                <span>{item.time}</span>
                <div>
                  <h4>{item.title}</h4>
                  <p>{item.body}</p>
                </div>
              </article>
            ))}
          </div>
        )}
        {activeDetail === "dress" && (
          <div className="cordially-modal-copy">
            <p>
              We appreciate semi-formal attire in neutral tones that harmonize
              with our elegant palette. Avoid very bright neon colors or bold
              patterns that might compete with the refined aesthetic we have
              envisioned.
            </p>
            <div className="cordially-two-col">
              <div>
                <h4>For Ladies</h4>
                <p>
                  Cocktail dresses, dressy blouses with dress pants, or elegant
                  midi/maxi dresses in taupe, cream, or earth tones.
                </p>
              </div>
              <div>
                <h4>For Gentlemen</h4>
                <p>
                  Dress shirts with slacks, blazers optional, or polo shirts
                  with dress pants in neutral or earth tones.
                </p>
              </div>
            </div>
          </div>
        )}
        {activeDetail === "menu" && (
          <ul className="cordially-menu-list">
            {menuItems.map((item) => (
              <li key={item}>
                <Check size={18} />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        )}
        {activeDetail === "palette" && (
          <div className="cordially-palette-grid">
            {paletteColors.map(([label, value]) => (
              <div key={label} className="cordially-swatch">
                <span style={{ backgroundColor: value }} />
                <div>
                  <h4>{label}</h4>
                  <p>{value}</p>
                </div>
              </div>
            ))}
          </div>
        )}
        {activeDetail === "gifts" && (
          <div className="cordially-modal-copy">
            <p>
              As we prepare for our exciting journey to Japan, we are in the
              process of downsizing and carefully selecting what to bring with
              us. International shipping is quite expensive, and we want to
              start fresh in our new home.
            </p>
            <p>
              If you would like to celebrate with us, we would be incredibly
              grateful for monetary gifts instead of physical items. This will
              help us with moving expenses and getting settled in Japan.
            </p>
          </div>
        )}
        {activeDetail === "venue" && (
          <div className="cordially-modal-copy">
            <p>
              Join us at Sky Garden Cafe, Lazuri Hotel Tagaytay in Santa Rosa
              for our ceremony, photoshoot, and reception.
            </p>
            <a
              href={WEDDING_LOCATION_DIRECTIONS}
              target="_blank"
              rel="noopener noreferrer"
              className="cordially-text-link"
            >
              Open directions
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

export default function WeddingDetails() {
  const [activeDetail, setActiveDetail] = useState<DetailId | null>(null);
  const closeDetail = useCallback(() => setActiveDetail(null), []);

  return (
    <>
      <section id="details" className="cordially-details">
        <div className="cordially-section-heading">
          <p className="cordially-kicker">wedding guide</p>
          <h2>and now some additional details...</h2>
          <p>
            The people, places, and practical details that will make the evening
            feel effortless.
          </p>
        </div>
        <div className="cordially-card-grid">
          {detailCards.map((card) => (
            <button
              type="button"
              className="cordially-detail-card"
              key={card.id}
              onClick={() => setActiveDetail(card.id)}
            >
              <Image
                src={card.image}
                alt={card.title}
                fill
                sizes="(max-width: 768px) 92vw, (max-width: 1280px) 45vw, 30vw"
                className="cordially-cover"
              />
              <span className="cordially-card-overlay" />
              <span className="cordially-card-copy">
                <strong>{card.title}</strong>
                <em>{card.subtitle}</em>
              </span>
              <span className="cordially-plus">
                <Plus size={24} />
              </span>
            </button>
          ))}
        </div>
      </section>

      <DetailModal activeDetail={activeDetail} onClose={closeDetail} />
    </>
  );
}
