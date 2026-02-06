"use client";
import { Heart, Mail } from "lucide-react";

export function MyFooter() {
  return (
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Cinzel:wght@400;500;600&family=Playfair+Display:wght@400;500;600&family=Montserrat:wght@300;400;500&display=swap');
        
        .footer-container {
          font-family: 'Montserrat', sans-serif;
        }
        
        .footer-script {
          font-family: 'Cinzel', serif;
        }
        
        .footer-serif {
          font-family: 'Playfair Display', serif;
        }
        
        .footer-body {
          font-family: 'Cormorant Garamond', serif;
        }
        
        /* Elegant divider line */
        .elegant-divider {
          position: relative;
          width: 100%;
          max-width: 150px;
          height: 1px;
          background: linear-gradient(90deg, transparent, #9CAF88, transparent);
          margin: 0 auto;
        }
        
        @media (min-width: 640px) {
          .elegant-divider {
            max-width: 200px;
          }
        }
        
        .elegant-divider::before,
        .elegant-divider::after {
          content: '';
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #9CAF88;
        }
        
        .elegant-divider::before {
          left: -10px;
        }
        
        .elegant-divider::after {
          right: -10px;
        }
        
        /* Floating animation for botanical elements */
        @keyframes floatGentle {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-8px) rotate(3deg);
          }
        }
        
        .float-botanical {
          animation: floatGentle 4s ease-in-out infinite;
        }
        
        /* Shimmer effect for names */
        @keyframes shimmer {
          0% {
            background-position: -200% center;
          }
          100% {
            background-position: 200% center;
          }
        }
        
        .shimmer-names {
          background: linear-gradient(
            90deg,
            #7A9070 0%,
            #9CAF88 25%,
            #C5D5B8 50%,
            #9CAF88 75%,
            #7A9070 100%
          );
          background-size: 200% auto;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shimmer 4s linear infinite;
        }
        
        /* Link hover effect */
        .footer-link {
          position: relative;
        }
        
        .footer-link::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 0;
          height: 1px;
          background: #9CAF88;
          transition: width 0.3s ease;
        }
        
        .footer-link:hover::after {
          width: 100%;
        }
        
        /* Mobile optimization for long names */
        @media (max-width: 639px) {
          .footer-names-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 0.5rem;
          }
        }
      `}</style>

      <footer className="footer-container relative bg-gradient-to-b from-white via-green-50/30 to-white py-12 sm:py-16 md:py-20 overflow-hidden">
        {/* Background Pattern */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M50 10C35 25 28 40 32 55C35 67 43 75 50 80C57 75 65 67 68 55C72 40 65 25 50 10Z' fill='none' stroke='%239CAF88' stroke-width='1'/%3E%3Cpath d='M50 10L50 80' stroke='%239CAF88' stroke-width='0.5'/%3E%3C/svg%3E")`,
            backgroundSize: '100px 100px'
          }}
        />

        {/* Floating Botanical Decorations - Hidden on mobile for cleaner look */}
        <div className="hidden sm:block absolute top-8 left-8 md:left-20 opacity-10 float-botanical">
          <svg width="60" height="60" viewBox="0 0 80 80" className="sm:w-[70px] sm:h-[70px] md:w-[80px] md:h-[80px]">
            <path
              d="M40 10C30 20 25 30 27.5 40C30 47.5 35 52.5 40 55C45 52.5 50 47.5 52.5 40C55 30 50 20 40 10Z"
              fill="none"
              stroke="#7A9070"
              strokeWidth="2"
            />
            <path d="M40 10L40 55" stroke="#7A9070" strokeWidth="1.5" />
          </svg>
        </div>

        <div className="hidden sm:block absolute bottom-8 right-8 md:right-20 opacity-10 float-botanical" style={{ animationDelay: '2s' }}>
          <svg width="60" height="60" viewBox="0 0 80 80" className="sm:w-[70px] sm:h-[70px] md:w-[80px] md:h-[80px]">
            <path
              d="M40 10C30 20 25 30 27.5 40C30 47.5 35 52.5 40 55C45 52.5 50 47.5 52.5 40C55 30 50 20 40 10Z"
              fill="none"
              stroke="#7A9070"
              strokeWidth="2"
            />
            <path d="M40 10L40 55" stroke="#7A9070" strokeWidth="1.5" />
          </svg>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
          {/* Names Section */}
          <div className="text-center mb-8 sm:mb-10">
            <h2 className="footer-script text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-3 sm:mb-4">
              {/* Desktop: side-by-side | Mobile: stacked */}
              <span className="hidden sm:inline">
                <span className="shimmer-names">Marvin</span>
                <span className="footer-body text-2xl sm:text-3xl md:text-4xl mx-2 sm:mx-3 md:mx-4 text-green-600/60 font-light italic">
                  &
                </span>
                <span className="shimmer-names">Jovelyn</span>
              </span>
              
              {/* Mobile: stacked names */}
              <span className="footer-names-container sm:hidden">
                <span className="shimmer-names block">Marvin</span>
                <span className="footer-body text-xl text-green-600/60 font-light italic block">
                  &
                </span>
                <span className="shimmer-names block">Jovelyn</span>
              </span>
            </h2>
            
            {/* Decorative Divider */}
            <div className="elegant-divider my-6 sm:my-8"></div>
            
            <p className="footer-body text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed italic px-4 sm:px-6">
              Join us as we celebrate the beginning of our forever. 
              Your presence is the greatest gift of all.
            </p>
          </div>

          {/* Social Links / Contact */}
          <div className="text-center mb-8 sm:mb-10">
            <p className="text-xs sm:text-sm text-gray-600 mb-2 sm:mb-3 px-4">
              For any inquiries, please contact us:
            </p>
            <a 
              href="mailto:wedding@example.com" 
              className="footer-link inline-flex items-center gap-2 text-green-700 hover:text-green-800 transition-colors px-4"
            >
              <Mail className="w-4 h-4 flex-shrink-0" />
              <span className="text-xs sm:text-sm font-medium break-all sm:break-normal">
                wedding@example.com
              </span>
            </a>
          </div>

          {/* Bottom Border */}
          <div className="border-t border-green-100 pt-6 sm:pt-8">
            <div className="text-center text-xs sm:text-sm text-gray-600 px-4">
              <p className="footer-body text-sm sm:text-base">
                © 2026 Marvin & Jovelyn Wedding.{" "}
                <span className="inline-block">
                  Made with{" "}
                  <Heart className="inline w-3 h-3 sm:w-4 sm:h-4 text-red-500 fill-current" />{" "}
                  and joy.
                </span>
              </p>
            </div>
          </div>

          {/* Hashtag */}
          <div className="mt-6 sm:mt-8 text-center px-4">
            <p className="footer-body text-green-700 text-lg sm:text-xl italic tracking-wide break-all sm:break-normal">
              #MarvinAndJovelyn2026
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}

export default MyFooter;