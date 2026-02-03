"use client";
import { useEffect, useState } from "react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const calculateTimeLeft = (targetDate: string): TimeLeft => {
  const difference = +new Date(targetDate) - +new Date();
  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / 1000 / 60) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  };
};

const Countdown = ({
  targetDate,
  textColor,
}: {
  targetDate: string;
  textColor: string;
}) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const update = () => setTimeLeft(calculateTimeLeft(targetDate));
    update();
    const timer = setInterval(update, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  if (!mounted || !timeLeft) return null;

  const isFinished = timeLeft.days <= 0 && timeLeft.hours <= 0 && timeLeft.minutes <= 0 && timeLeft.seconds <= 0;
  
  if (isFinished) return null;

  const timeStyle = "flex flex-col items-center mx-2";
  const timeStyleWithBorder = "flex flex-col items-center px-3 border-r-3";
  const numberStyle = "text-6xl sm:text-7xl";
  const labelStyle = "text-base sm:text-lg tracking-wide uppercase";

  // Filter out units that are 0 and determine if we need borders
  const units = [
    { value: timeLeft.days, label: timeLeft.days === 1 ? 'Day' : 'Days', key: 'days' },
    { value: timeLeft.hours, label: timeLeft.hours === 1 ? 'Hour' : 'Hours', key: 'hours' },
    { value: timeLeft.minutes, label: timeLeft.minutes === 1 ? 'Min.' : 'Mins.', key: 'minutes' },
    { value: timeLeft.seconds, label: timeLeft.seconds === 1 ? 'Sec.' : 'Secs.', key: 'seconds' }
  ].filter(unit => unit.value > 0);

  return (
    <div className={`${textColor} flex justify-center`}>
      {units.map((unit, index) => (
        <div 
          key={unit.key} 
          className={index < units.length - 1 ? timeStyleWithBorder : timeStyle}
        >
          <span className={numberStyle}>{unit.value}</span>
          <span className={labelStyle}>{unit.label}</span>
        </div>
      ))}
    </div>
  );
};

export default Countdown;