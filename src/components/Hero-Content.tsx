import { useState, useEffect } from "react";
import Countdown from "@/components/Countdown";

const HeroContent = ({ textColor = "text-white" }) => {
  const [timeStatus, setTimeStatus] = useState("future");
  const targetDate = "2026-09-11T16:00:00";

  useEffect(() => {
    const checkTime = () => {
      const now = new Date().getTime();
      const target = new Date(targetDate).getTime();
      
      if (now >= target) {
        setTimeStatus("past");
      } else {
        setTimeStatus("future");
      }
    };

    checkTime();

    const interval = setInterval(checkTime, 60000);

    return () => clearInterval(interval);
  }, [targetDate]);

  const getStatusText = () => {
    switch (timeStatus) {
      case "past":
        return "Just Got Married";
      case "future":
      default:
        return "Are getting married in";
    }
  };

  return (
    <div className={`${textColor} relative z-10 flex flex-col h-full items-center justify-center text-center px-4 md:px-8`}>
      {/* Decorative line above names */}
      <div className="mb-8 md:mb-12 flex items-center justify-center gap-4 w-full max-w-2xl">
        <div className="h-px flex-grow bg-white/30"></div>
        <div className="text-xs tracking-[0.3em] uppercase font-light opacity-70">
          Together as One
        </div>
        <div className="h-px flex-grow bg-white/30"></div>
      </div>

      {/* Main Names */}
      <div className="mb-8 md:mb-12">
        <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-6">
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light tracking-tight">
            Marvin
          </h1>
          <span className="text-4xl md:text-5xl font-light opacity-60">&</span>
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light tracking-tight">
            Jovelyn
          </h1>
        </div>
      </div>

      {/* Decorative ornament */}
      <div className="mb-8 md:mb-12 text-2xl opacity-50">✦</div>

      {/* Wedding Date Text */}
      <p className="text-lg md:text-xl font-light tracking-[0.2em] uppercase mb-2 md:mb-4">
        {getStatusText()}
      </p>

      {/* Countdown Timer */}
      <div className="mt-6 md:mt-10">
        <Countdown targetDate={targetDate} textColor={`${textColor}`} />
      </div>

      {/* Decorative line below */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex items-center justify-center">
        <div className="h-px w-12 bg-white/30"></div>
      </div>
    </div>
  );
};

export default HeroContent;
