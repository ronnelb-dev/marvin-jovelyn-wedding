"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronDown } from "lucide-react";

import { faqs } from "@/data/homepage";

export default function FAQSection() {
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <section id="faq" className="cordially-faq">
      <div className="cordially-faq-inner">
        <div className="cordially-faq-aside">
          <div>
            <h2>Questions and answers</h2>
            <p>Can&apos;t find the answer here?</p>
            <p>
              Feel free to contact Marvin or Jovelyn via Messenger.
            </p>
          </div>
        </div>
        <div className="cordially-faq-list">
          {faqs.map((item, index) => {
            const isOpen = openFaq === index;

            return (
              <div className="cordially-faq-item" key={item.question}>
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpenFaq(isOpen ? -1 : index)}
                >
                  <span>{item.question}</span>
                  <ChevronDown
                    size={18}
                    className={isOpen ? "is-open" : undefined}
                  />
                </button>
                <div className={isOpen ? "is-open" : undefined}>
                  <p>{item.answer}</p>
                  {"image" in item && item.image ? (
                    <Image
                      className="cordially-faq-answer-image"
                      src={item.image.src}
                      alt={item.image.alt}
                      width={item.image.width}
                      height={item.image.height}
                      sizes="(max-width: 768px) 88vw, 640px"
                    />
                  ) : null}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
