"use client";

import { FC, useState, useEffect, useRef } from "react";
import { Church, Camera, Wine, MapPin, Clock, ArrowRight } from "lucide-react";
import Link from "next/link";

interface EventItem {
  icon: typeof Church;
  title: string;
  time: string;
  location: string;
  address: string;
  description: string;
}

const events: EventItem[] = [
  {
    icon: Church,
    title: "Ceremony",
    time: "4:00 PM – 6:00 PM",
    location: "Sky Garden Cafe",
    address: "Lazuri Hotel Tagaytay",
    description: "Join us as we exchange our vows in an intimate ceremony",
  },
  {
    icon: Camera,
    title: "Photoshoot",
    time: "6:00 PM – 7:00 PM",
    location: "Sky Garden Cafe",
    address: "Lazuri Hotel Tagaytay",
    description: "Capture precious moments with us in the garden",
  },
  {
    icon: Wine,
    title: "Reception",
    time: "7:00 PM – 9:00 PM",
    location: "Sky Garden Cafe",
    address: "Lazuri Hotel Tagaytay",
    description: "Celebrate and dance the night away with dinner and drinks",
  },
];

const EventSchedule: FC = () => {
  const [activeEvent, setActiveEvent] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,400&family=Playfair+Display:wght@400;500;600;700&family=Montserrat:wght@300;400;500;600&display=swap');
        
        .event-schedule {
          font-family: 'Montserrat', sans-serif;
        }
        
        .event-title {
          font-family: 'Playfair Display', serif;
        }
        
        .event-body {
          font-family: 'Cormorant Garamond', serif;
        }
        
        /* Timeline connector animation */
        @keyframes drawLine {
          from {
            transform: scaleX(0);
          }
          to {
            transform: scaleX(1);
          }
        }
        
        .timeline-line {
          transform-origin: left;
          animation: drawLine 1.5s ease-out forwards;
        }
        
        /* Card entrance animations */
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
          opacity: 0;
        }
        
        .animate-scale-in {
          animation: scaleIn 0.6s ease-out forwards;
          opacity: 0;
        }
        
        .delay-0 { animation-delay: 0s; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-400 { animation-delay: 0.4s; }
        .delay-600 { animation-delay: 0.6s; }
        .delay-800 { animation-delay: 0.8s; }
        
        /* Icon pulse animation */
        @keyframes iconPulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.1);
          }
        }
        
        .icon-pulse:hover {
          animation: iconPulse 0.6s ease-in-out;
        }
        
        /* Decorative elements */
        .decorative-dot {
          position: relative;
        }
        
        .decorative-dot::after {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 100%;
          height: 100%;
          border-radius: 50%;
          background: inherit;
          opacity: 0.3;
          animation: ping 2s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
        
        @keyframes ping {
          75%, 100% {
            transform: translate(-50%, -50%) scale(1.5);
            opacity: 0;
          }
        }
        
        /* Button hover effect */
        .btn-elegant {
          position: relative;
          overflow: hidden;
        }
        
        .btn-elegant::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: rgba(255, 255, 255, 0.1);
          transition: left 0.5s ease;
        }
        
        .btn-elegant:hover::before {
          left: 100%;
        }
      `}</style>

      <section 
        ref={sectionRef}
        className="event-schedule relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-50 py-20 md:py-28"
      >
        {/* Background Pattern */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M40 10C30 20 25 30 27.5 40C30 47.5 35 52.5 40 55C45 52.5 50 47.5 52.5 40C55 30 50 20 40 10Z' fill='none' stroke='%239CAF88' stroke-width='1'/%3E%3C/svg%3E")`,
            backgroundSize: '80px 80px'
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className={isVisible ? "animate-fade-in-up" : "opacity-0"}>
              <div className="inline-flex items-center gap-3 mb-6">
                <div className="w-12 h-px bg-slate-600"></div>
                <Clock className="w-5 h-5 text-slate-600" />
                <div className="w-12 h-px bg-slate-600"></div>
              </div>
              
              <h2 className="event-title text-4xl md:text-5xl lg:text-6xl font-semibold text-slate-900 mb-4">
                Wedding Timeline
              </h2>
              
              <p className="event-body text-xl text-slate-600 italic max-w-2xl mx-auto">
                Join us through each beautiful moment of our special day
              </p>
            </div>
          </div>

          {/* Desktop Timeline View */}
          <div className="hidden md:block">
            {/* Timeline Line */}
            <div className="relative mb-16">
              <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-slate-200 via-slate-400 to-slate-200 -translate-y-1/2">
                {isVisible && <div className="timeline-line absolute inset-0 bg-gradient-to-r from-slate-400 via-slate-600 to-slate-400"></div>}
              </div>
              
              {/* Timeline Dots */}
              <div className="relative flex justify-between px-8">
                {events.map((event, index) => (
                  <div
                    key={index}
                    className={`decorative-dot w-5 h-5 bg-slate-600 rounded-full border-4 border-white shadow-lg ${
                      isVisible ? `animate-scale-in delay-${index * 200}` : "opacity-0"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Event Cards */}
            <div className="grid grid-cols-3 gap-8">
              {events.map((event, index) => {
                const IconComponent = event.icon;
                return (
                  <div
                    key={index}
                    className={`${isVisible ? `animate-fade-in-up delay-${(index + 1) * 200}` : "opacity-0"}`}
                  >
                    <EventCard
                      event={event}
                      index={index}
                      isActive={activeEvent === index}
                      onHover={() => setActiveEvent(index)}
                      onLeave={() => setActiveEvent(null)}
                      IconComponent={IconComponent}
                    />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Mobile Stack View */}
          <div className="md:hidden space-y-8">
            {events.map((event, index) => {
              const IconComponent = event.icon;
              return (
                <div
                  key={index}
                  className={`${isVisible ? `animate-fade-in-up delay-${index * 200}` : "opacity-0"}`}
                >
                  <EventCard
                    event={event}
                    index={index}
                    isActive={activeEvent === index}
                    onHover={() => setActiveEvent(index)}
                    onLeave={() => setActiveEvent(null)}
                    IconComponent={IconComponent}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};

// Event Card Component
interface EventCardProps {
  event: EventItem;
  index: number;
  isActive: boolean;
  onHover: () => void;
  onLeave: () => void;
  IconComponent: typeof Church;
}

const EventCard: FC<EventCardProps> = ({ 
  event, 
  index, 
  isActive, 
  onHover, 
  onLeave,
  IconComponent 
}) => {
  return (
    <div
      className={`group relative bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-500 ${
        isActive ? "shadow-2xl scale-105" : "hover:shadow-xl hover:scale-102"
      }`}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      {/* Gradient Header */}
      <div className="relative h-32 bg-gradient-to-br from-slate-600 to-slate-700 flex items-center justify-center overflow-hidden">
        {/* Background Pattern */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 5C15 10 12.5 15 13.75 20C15 23.75 17.5 26.25 20 27.5C22.5 26.25 25 23.75 26.25 20C27.5 15 25 10 20 5Z' fill='none' stroke='white' stroke-width='0.5'/%3E%3C/svg%3E")`,
            backgroundSize: '40px 40px'
          }}
        />
        
        {/* Icon */}
        <div className={`icon-pulse relative z-10 w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border-2 border-white/30 transition-transform duration-300 ${
          isActive ? "scale-110" : ""
        }`}>
          <IconComponent className="w-8 h-8 text-white" />
        </div>

        {/* Event Number */}
        <div className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30">
          <span className="text-white font-semibold text-sm">{index + 1}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        {/* Title */}
        <h3 className="event-title text-2xl font-semibold text-slate-900">
          {event.title}
        </h3>

        {/* Description */}
        <p className="event-body text-slate-600 text-base leading-relaxed">
          {event.description}
        </p>

        {/* Time */}
        <div className="flex items-center gap-3 text-slate-700">
          <Clock className="w-4 h-4 text-slate-600 flex-shrink-0" />
          <span className="text-sm font-medium">{event.time}</span>
        </div>

        {/* Location */}
        <a
          href="https://www.google.com/maps/dir//Brgy,+Tagaytay+-+Nasugbu+Hwy,+Tagaytay+City,+4120+Cavite/@14.0873567,120.8964515,16z/data=!4m9!4m8!1m0!1m5!1m1!1s0x33bd772fa2bb7ca1:0xd9fe20a6632bdd4b!2m2!1d120.8981882!2d14.0882557!3e0!5m2!1e1!1e4?entry=ttu&g_ep=EgoyMDI1MDUyNy4wIKXMDSoASAFQAw%3D%3D"
          target="_blank"
          rel="noopener noreferrer"
          className="block group/link"
        >
          <div className="flex items-start gap-3 text-slate-700 hover:text-slate-700 transition-colors">
            <MapPin className="w-4 h-4 text-slate-600 flex-shrink-0 mt-0.5 group-hover/link:scale-110 transition-transform" />
            <div className="text-sm">
              <p className="font-semibold">{event.location}</p>
              <p className="text-slate-600">{event.address}</p>
            </div>
          </div>
        </a>

        {/* Divider */}
        <div className="pt-2 border-t border-slate-100"></div>

        {/* Learn More Button */}
        <Link href="/wedding-details">
          <button className="btn-elegant w-full bg-gradient-to-r from-slate-700 to-slate-600 hover:from-slate-800 hover:to-slate-700 text-white py-3 px-6 rounded-lg font-medium text-sm tracking-wide uppercase transition-all duration-300 flex items-center justify-center gap-2 group/btn">
            <span>Learn More</span>
            <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
          </button>
        </Link>
      </div>

      {/* Hover Accent Line */}
      <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-slate-500 via-slate-600 to-slate-500 transform origin-left transition-transform duration-500 ${
        isActive ? "scale-x-100" : "scale-x-0"
      }`}></div>
    </div>
  );
};

export default EventSchedule;
