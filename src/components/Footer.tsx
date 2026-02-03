"use client";
import { Heart, Calendar, MapPin, Mail } from "lucide-react";

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
          max-width: 200px;
          height: 1px;
          background: linear-gradient(90deg, transparent, #9CAF88, transparent);
          margin: 0 auto;
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
      `}</style>

      <footer className="footer-container relative bg-gradient-to-b from-white via-green-50/30 to-white py-16 md:py-20 overflow-hidden">
        {/* Background Pattern */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M50 10C35 25 28 40 32 55C35 67 43 75 50 80C57 75 65 67 68 55C72 40 65 25 50 10Z' fill='none' stroke='%239CAF88' stroke-width='1'/%3E%3Cpath d='M50 10L50 80' stroke='%239CAF88' stroke-width='0.5'/%3E%3C/svg%3E")`,
            backgroundSize: '100px 100px'
          }}
        />

        {/* Floating Botanical Decorations */}
        <div className="absolute top-8 left-8 md:left-20 opacity-10 float-botanical">
          <svg width="80" height="80" viewBox="0 0 80 80">
            <path
              d="M40 10C30 20 25 30 27.5 40C30 47.5 35 52.5 40 55C45 52.5 50 47.5 52.5 40C55 30 50 20 40 10Z"
              fill="none"
              stroke="#7A9070"
              strokeWidth="2"
            />
            <path d="M40 10L40 55" stroke="#7A9070" strokeWidth="1.5" />
          </svg>
        </div>

        <div className="absolute bottom-8 right-8 md:right-20 opacity-10 float-botanical" style={{ animationDelay: '2s' }}>
          <svg width="80" height="80" viewBox="0 0 80 80">
            <path
              d="M40 10C30 20 25 30 27.5 40C30 47.5 35 52.5 40 55C45 52.5 50 47.5 52.5 40C55 30 50 20 40 10Z"
              fill="none"
              stroke="#7A9070"
              strokeWidth="2"
            />
            <path d="M40 10L40 55" stroke="#7A9070" strokeWidth="1.5" />
          </svg>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4">
          {/* Names Section */}
          <div className="text-center mb-10">
            <h2 className="footer-script text-5xl md:text-6xl lg:text-7xl mb-4">
              <span className="shimmer-names">Marvin</span>
              <span className="footer-body text-3xl md:text-4xl mx-3 md:mx-4 text-green-600/60 font-light italic">
                &
              </span>
              <span className="shimmer-names">Jovelyn</span>
            </h2>
            
            {/* Decorative Divider */}
            <div className="elegant-divider my-8"></div>
            
            <p className="footer-body text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed italic">
              Join us as we celebrate the beginning of our forever. 
              Your presence is the greatest gift of all.
            </p>
          </div>

          {/* Social Links / Contact (Optional) */}
          <div className="text-center mb-10">
            <p className="text-sm text-gray-600 mb-3">For any inquiries, please contact us:</p>
            <a 
              href="mailto:wedding@example.com" 
              className="footer-link inline-flex items-center gap-2 text-green-700 hover:text-green-800 transition-colors"
            >
              <Mail className="w-4 h-4" />
              <span className="text-sm font-medium">wedding@example.com</span>
            </a>
          </div>

          {/* Bottom Border */}
          <div className="border-t border-green-100 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-600">
              <p className="footer-body text-base">
                © 2026 Marvin & Jovelyn Wedding. Made with{" "}
                <Heart className="inline w-4 h-4 text-red-500 fill-current" />{" "}
                and joy.
              </p>
              
              <div className="flex items-center gap-6">
                <a href="#rsvp" className="footer-link text-gray-600 hover:text-green-700 transition-colors">
                  RSVP
                </a>
                <span className="text-gray-300">|</span>
                <a href="/our-story" className="footer-link text-gray-600 hover:text-green-700 transition-colors">
                  Our Story
                </a>
              </div>
            </div>
          </div>

          {/* Hashtag */}
          <div className="mt-8 text-center">
            <p className="footer-body text-green-700 text-xl italic tracking-wide">
              #MarvinAndJovelyn2026
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}

export default MyFooter;