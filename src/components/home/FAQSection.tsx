"use client";

import { useState } from "react";
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
            <a href="mailto:rsvp@marvinnjovelyn.com">
              Reach out to Marvin or Jovelyn
            </a>
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
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
