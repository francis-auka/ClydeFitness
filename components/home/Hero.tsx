"use client";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Link from "next/link";

const disciplines = ["TAEBO", "KICKBOXING", "BOXING", "HIIT", "INSANITY", "FLOOR TRAINING"];

export default function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center bg-[#080808] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 w-full pt-[72px]">
        <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-12 min-h-[calc(100vh-72px)] items-center py-16">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col justify-center"
          >
            <div className="mb-4">
              <p className="eyebrow">COMBAT-BASED FITNESS COACHING</p>
              <div className="w-12 h-0.5 bg-green mt-2" />
            </div>

            <h1 className="font-bebas leading-none mb-2">
              <span className="block text-[96px] leading-none text-white max-md:text-[64px]">TRAIN HARD.</span>
              <span className="block text-[96px] leading-none text-green max-md:text-[64px]">FIGHT SMART.</span>
            </h1>

            <p className="font-dm-sans text-[18px] text-[#888888] leading-[1.7] mb-8 max-w-lg">
              Combat-based fitness coaching in Nairobi.<br />
              <span className="text-white/50">Taebo · Kickboxing · Boxing · HIIT · Insanity</span>
            </p>

            <div className="flex flex-wrap gap-4 mb-8">
              <Link
                href="#contact"
                className="bg-green text-black font-barlow font-bold text-sm uppercase tracking-widest px-8 py-4 hover:bg-[#166534] transition-colors duration-200"
              >
                Book a Session
              </Link>
              <Link
                href="#packages"
                className="border border-white/20 text-white font-barlow font-bold text-sm uppercase tracking-widest px-8 py-4 hover:border-green transition-colors duration-200"
              >
                View Packages
              </Link>
            </div>

            <div className="flex flex-wrap gap-2">
              {disciplines.map((d) => (
                <span
                  key={d}
                  className="border border-[#2A2A2A] font-barlow text-[11px] uppercase tracking-widest text-[#888888] px-3 py-1"
                >
                  {d}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Right - Image placeholder */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative h-[500px] lg:h-full lg:min-h-[600px]"
          >
            <div className="relative w-full h-full min-h-[500px] bg-[#1A1A1A] border border-dashed border-[#2A2A2A] flex items-center justify-center overflow-hidden">
              <div className="text-center">
                <div className="w-16 h-16 border border-dashed border-[#2A2A2A] flex items-center justify-center mx-auto mb-4">
                  <span className="text-[#2A2A2A] text-2xl">+</span>
                </div>
                <p className="font-barlow text-[#2A2A2A] text-xs uppercase tracking-widest">
                  [ Coach Clyde hero photo ]
                </p>
              </div>
              <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/60 to-transparent" />

              {/* Floating stat card */}
              <div className="absolute bottom-6 left-6 bg-[#111111] border border-[#2A2A2A] p-6">
                <p className="font-bebas text-[32px] text-white leading-none">500+</p>
                <p className="font-dm-sans text-[13px] text-[#888888] uppercase tracking-widest">
                  Clients Trained
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <p className="font-barlow text-[11px] uppercase tracking-widest text-[#888888]">SCROLL</p>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ChevronDown size={16} className="text-[#888888]" />
        </motion.div>
      </div>
    </section>
  );
}
