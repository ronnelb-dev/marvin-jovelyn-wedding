"use client";

import {
  Navbar,
  NavbarBrand,
} from "flowbite-react";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

export function Component() {
  const pathname = usePathname() ?? "/";
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Add custom styles */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600&family=Cinzel:wght@400;500;600&family=Montserrat:wght@300;400;500&display=swap');
        
        .wedding-nav {
          font-family: 'Montserrat', sans-serif;
        }
        
        .brand-script {
          font-family: 'Cinzel', serif;
        }
        
        .brand-subtitle {
          font-family: 'Cormorant Garamond', serif;
        }
        
        /* Elegant underline animation */
        .nav-link-wrapper {
          position: relative;
          overflow: hidden;
        }
        
        .nav-link-underline {
          position: absolute;
          bottom: -2px;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(
            90deg,
            transparent,
            #8B7355,
            transparent
          );
          transform: scaleX(0);
          transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .nav-link-wrapper:hover .nav-link-underline {
          transform: scaleX(1);
        }
        
        .nav-link-active .nav-link-underline {
          transform: scaleX(1);
          background: linear-gradient(
            90deg,
            transparent,
            #8B7355,
            transparent
          );
        }
        
        /* Decorative botanical accent */
        .botanical-accent {
          position: absolute;
          top: -8px;
          right: -8px;
          width: 24px;
          height: 24px;
          opacity: 0;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .nav-link-wrapper:hover .botanical-accent {
          opacity: 0.3;
          transform: rotate(15deg);
        }
        
        /* Mobile menu animation */
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .mobile-menu-item {
          animation: slideDown 0.3s ease-out forwards;
        }
        
        .mobile-menu-item:nth-child(1) { animation-delay: 0.05s; }
        .mobile-menu-item:nth-child(2) { animation-delay: 0.1s; }
        .mobile-menu-item:nth-child(3) { animation-delay: 0.15s; }
        .mobile-menu-item:nth-child(4) { animation-delay: 0.2s; }
        
        /* Scroll effect */
        .nav-scrolled {
          box-shadow: 0 4px 20px rgba(122, 144, 112, 0.08);
        }
        
        /* Divider dots */
        .nav-divider {
          width: 3px;
          height: 3px;
          background: #8B7355;
          border-radius: 50%;
          opacity: 0.4;
        }
        
        /* Custom toggle button */
        .custom-toggle {
          position: relative;
          width: 28px;
          height: 20px;
          cursor: pointer;
        }
        
        .toggle-line {
          position: absolute;
          left: 0;
          width: 100%;
          height: 2px;
          background: #8B7355;
          border-radius: 2px;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .toggle-line:nth-child(1) {
          top: 0;
        }
        
        .toggle-line:nth-child(2) {
          top: 50%;
          transform: translateY(-50%);
        }
        
        .toggle-line:nth-child(3) {
          bottom: 0;
        }
        
        .toggle-open .toggle-line:nth-child(1) {
          top: 50%;
          transform: translateY(-50%) rotate(45deg);
        }
        
        .toggle-open .toggle-line:nth-child(2) {
          opacity: 0;
        }
        
        .toggle-open .toggle-line:nth-child(3) {
          bottom: 50%;
          transform: translateY(50%) rotate(-45deg);
        }
      `}</style>

      <Navbar
        fluid
        className={`wedding-nav fixed top-0 left-0 w-full z-50 transition-all duration-500 ${scrolled
            ? "bg-white/98 backdrop-blur-xl nav-scrolled"
            : "bg-white/95 backdrop-blur-lg "
          } border-b border-slate-200/30`}
      >
        <div className="w-full max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between">
          {/* Brand Section - Enhanced */}
          <NavbarBrand href="/" className="flex items-center gap-2 sm:gap-3 group cursor-pointer">
            {/* Decorative ornament */}
            <div className="relative">
              <svg
                width="28"
                height="28"
                viewBox="0 0 32 32"
                className="text-slate-700 transition-all duration-500 group-hover:text-slate-600 group-hover:scale-110 sm:w-8 sm:h-8"
              >
                <circle cx="16" cy="16" r="6" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.5" />
                <path
                  d="M16 2v28M2 16h28"
                  stroke="currentColor"
                  strokeWidth="0.5"
                  opacity="0.3"
                />
                <circle cx="16" cy="16" r="2" fill="currentColor" opacity="0.7" />
              </svg>
            </div>

            {/* Brand text */}
            <div className="flex flex-col">
              <span className="brand-script text-base sm:text-md md:text-xl font-light tracking-wide text-slate-800 transition-all duration-300 group-hover:text-slate-700">
                M & J
              </span>
              <span className="brand-subtitle text-[12px] sm:text-[13px] md:text-[14px] text-slate-600/70 font-light tracking-[0.2em] uppercase">
                2026
              </span>
            </div>
          </NavbarBrand>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2">
            <NavLink href="/" active={pathname === "/"} label="Home" />
            <div className="nav-divider mx-1"></div>
            <NavLink
              href="/rsvp"
              active={pathname === "/rsvp"}
              label="RSVP"
            />
          </div>

          {/* Custom Mobile Toggle - Now properly centered */}
          <button
            className="md:hidden rounded-lg hover:bg-slate-100/50 transition-colors flex items-center justify-center"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle navigation"
          >
            <div className={`custom-toggle ${isOpen ? "toggle-open" : ""}`}>
              <div className="toggle-line"></div>
              <div className="toggle-line"></div>
              <div className="toggle-line"></div>
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden border-t border-slate-200/30 bg-white/98 backdrop-blur-xl">
            <div className="px-4 sm:px-6 py-4 sm:py-6 space-y-3 sm:space-y-4">
              <MobileNavLink
                href="/"
                active={pathname === "/"}
                label="Home"
                index={0}
                onClick={() => setIsOpen(false)}
              />
              <MobileNavLink
                href="/rsvp"
                active={pathname === "/rsvp"}
                label="RSVP"
                index={1}
                onClick={() => setIsOpen(false)}
              />
            </div>
          </div>
        )}
      </Navbar>
    </>
  );
}

// Desktop Nav Link Component
interface NavLinkProps {
  href: string;
  active: boolean;
  label: string;
}

function NavLink({ href, active, label }: NavLinkProps) {
  return (
    <a
      href={href}
      className={`nav-link-wrapper relative px-3 sm:px-4 py-2 text-[12px] sm:text-[13x] font-light tracking-[0.15em] uppercase transition-all duration-300 ${active
          ? "nav-link-active text-slate-800"
          : "text-slate-600/80 hover:text-slate-800"
        }`}
    >
      {/* Botanical accent decoration */}
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        className="botanical-accent"
      >
        <path
          d="M12 4C10 6 9 8 9.5 10C10 11.5 11 12.5 12 13C13 12.5 14 11.5 14.5 10C15 8 14 6 12 4Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
        />
      </svg>

      <span className="relative z-10">{label}</span>
      <div className="nav-link-underline"></div>
    </a>
  );
}

// Mobile Nav Link Component
interface MobileNavLinkProps {
  href: string;
  active: boolean;
  label: string;
  index: number;
  onClick: () => void;
}

function MobileNavLink({ href, active, label, index, onClick }: MobileNavLinkProps) {
  return (
    <a
      href={href}
      onClick={onClick}
      className={`mobile-menu-item block px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm font-light tracking-widest uppercase transition-all duration-300 rounded-lg ${active
          ? "bg-slate-100 text-slate-800"
          : "text-slate-600/80 hover:bg-slate-50/70 hover:text-slate-800"
        }`}
      style={{ opacity: 0 }}
    >
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Index number */}
        <span className="text-[9px] sm:text-[10px] opacity-40 font-light">
          {String(index + 1).padStart(2, "0")}
        </span>
        {/* Label */}
        <span className="flex-1">{label}</span>
        {/* Active indicator */}
        {active && (
          <div className="w-1.5 h-1.5 rounded-full bg-slate-600"></div>
        )}
      </div>
    </a>
  );
}

export default Component;