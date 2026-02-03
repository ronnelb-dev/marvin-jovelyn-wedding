import { useState, useEffect } from "react";
import WaveIcon from "@/components/WaveIcon";
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
    <div
      className={`${textColor} relative z-10 flex flex-col h-full items-center justify-center text-center px-4`}
    >
      <WaveIcon
        width="w-50 md:w-80"
        height="40px"
        color={`${textColor}`}
        position="top"
      />
      <div className="flex flex-wrap items-end justify-center gap-x-4 gap-y-2 mt-5 mb-5">
        <span className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl mb-2 sm:mb-4">
          Marvin
        </span>
        <span className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl self-center mx-4 mb-0">
          &
        </span>
        <span className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl mb-2 sm:mb-4">
          Jovelyn
        </span>
      </div>
      <WaveIcon
        width="w-50 md:w-80"
        height="40px"
        color={`${textColor}`}
        position="bottom"
      />
      <p
        className={`${textColor} text-4xl sm:text-4xl md:text-4xl lg:text-6xl mt-6 sm:mt-6 mb-4 sm:mb-6`}
      >
        {getStatusText()}
      </p>
      <Countdown targetDate={targetDate} textColor={`${textColor}`} />
    </div>
  );
};

export default HeroContent;