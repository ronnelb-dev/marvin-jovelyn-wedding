"use client";

import { useEffect, useState } from "react";

import { WEDDING_TARGET } from "@/data/homepage";

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

function getTimeLeft(): TimeLeft {
  const difference = Math.max(0, +new Date(WEDDING_TARGET) - +new Date());

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / 1000 / 60) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  };
}

export default function CountdownStrip() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);

  useEffect(() => {
    const update = () => setTimeLeft(getTimeLeft());
    update();

    const timer = window.setInterval(update, 1000);
    return () => window.clearInterval(timer);
  }, []);

  const units = [
    { label: "Days", value: timeLeft?.days ?? 0 },
    { label: "Hours", value: timeLeft?.hours ?? 0 },
    { label: "Minutes", value: timeLeft?.minutes ?? 0 },
    { label: "Seconds", value: timeLeft?.seconds ?? 0 },
  ];

  return (
    <div className="cordially-countdown" aria-label="Countdown to the wedding">
      {units.map((unit, index) => (
        <div className="cordially-countdown-unit" key={unit.label}>
          <span className="cordially-countdown-number">
            {String(unit.value).padStart(index === 0 ? 1 : 2, "0")}
          </span>
          <span className="cordially-countdown-label">{unit.label}</span>
        </div>
      ))}
    </div>
  );
}
