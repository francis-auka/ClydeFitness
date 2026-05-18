"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Packages", href: "#packages" },
  { label: "Events", href: "/events" },
  { label: "Gallery", href: "#gallery" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 left-0 right-0 z-40 h-[72px] flex items-center transition-all duration-300",
          scrolled ? "bg-[#111111]/95 backdrop-blur-sm border-b border-[#2A2A2A]" : "bg-transparent"
        )}
      >
        <div className="max-w-7xl mx-auto px-6 w-full flex items-center justify-between">
          <Link href="/" className="flex items-baseline gap-1">
            <span className="font-bebas text-[28px] text-white tracking-tight">COACH</span>
            <span className="font-bebas text-[28px] text-green tracking-tight">CLYDE</span>
          </Link>

          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="font-dm-sans text-[14px] uppercase tracking-widest text-white/60 hover:text-white transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="#contact"
              className="hidden lg:inline-flex items-center bg-green text-black font-barlow font-bold text-[13px] uppercase tracking-widest px-6 py-3 hover:bg-[#166534] transition-colors duration-200"
            >
              Book a Session
            </Link>
            <button
              aria-label="Toggle menu"
              className="lg:hidden text-white p-2"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={cn(
          "fixed inset-0 z-30 bg-[#080808] flex flex-col items-center justify-center transition-transform duration-300",
          menuOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex flex-col items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="font-bebas text-5xl text-white hover:text-green transition-colors duration-200"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="#contact"
            onClick={() => setMenuOpen(false)}
            className="mt-4 bg-green text-black font-barlow font-bold text-[13px] uppercase tracking-widest px-8 py-4 hover:bg-[#166534] transition-colors duration-200"
          >
            Book a Session
          </Link>
        </div>
      </div>
    </>
  );
}
