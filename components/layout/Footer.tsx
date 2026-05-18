import Link from "next/link";
import { Instagram, Facebook } from "@/components/ui/BrandIcons";

const quickLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Packages", href: "#packages" },
  { label: "Events", href: "/events" },
  { label: "Gallery", href: "#gallery" },
  { label: "Contact", href: "#contact" },
];

export default function Footer() {
  return (
    <footer className="bg-[#080808] border-t border-[#2A2A2A]">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Left */}
          <div>
            <div className="flex items-baseline gap-1 mb-3">
              <span className="font-bebas text-[28px] text-white">COACH</span>
              <span className="font-bebas text-[28px] text-green">CLYDE</span>
            </div>
            <p className="font-barlow text-sm uppercase tracking-widest text-[#888888] mb-6">
              Train Hard. Fight Smart.
            </p>
            <div className="flex gap-3">
              {[Instagram, Facebook].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 border border-[#2A2A2A] flex items-center justify-center text-[#888888] hover:border-green hover:text-green transition-colors duration-200"
                >
                  <Icon size={16} />
                </a>
              ))}
              <a
                href="#"
                className="w-10 h-10 border border-[#2A2A2A] flex items-center justify-center text-[#888888] hover:border-green hover:text-green transition-colors duration-200 font-barlow text-xs font-bold"
              >
                TT
              </a>
            </div>
          </div>

          {/* Center */}
          <div>
            <p className="font-barlow text-xs uppercase tracking-widest text-[#888888] mb-4">
              Quick Links
            </p>
            <div className="grid grid-cols-2 gap-2">
              {quickLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="font-dm-sans text-sm text-[#888888] hover:text-white transition-colors duration-200"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Right */}
          <div>
            <p className="font-barlow text-xs uppercase tracking-widest text-[#888888] mb-3">
              Ready to Start?
            </p>
            <p className="font-bebas text-3xl text-white mb-6 leading-tight">
              YOUR FIRST<br />SESSION AWAITS.
            </p>
            <Link
              href="#contact"
              className="inline-flex items-center bg-green text-black font-barlow font-bold text-[13px] uppercase tracking-widest px-6 py-3 hover:bg-[#166534] transition-colors duration-200"
            >
              Book a Session
            </Link>
          </div>
        </div>
      </div>

      <div className="border-t border-[#2A2A2A]">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="font-dm-sans text-[13px] text-[#888888]">
            © 2025 Coach Clyde Fitness · Nairobi, Kenya
          </p>
          <p className="font-dm-sans text-[13px] text-[#888888]">
            All rights reserved
          </p>
        </div>
      </div>
    </footer>
  );
}
