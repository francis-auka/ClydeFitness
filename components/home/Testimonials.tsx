"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Star } from "lucide-react";

const testimonials = [
  {
    quote: "Coach Clyde completely transformed how I approach fitness. The HIIT sessions are brutal in the best way possible.",
    name: "AISHA M.",
    discipline: "HIIT & Floor Training",
    initials: "AM",
  },
  {
    quote: "Never thought I'd enjoy boxing. Now I'm hooked. The group sessions push you harder than you push yourself.",
    name: "BRIAN O.",
    discipline: "Boxing & Kickboxing",
    initials: "BO",
  },
  {
    quote: "He doesn't just train you — he builds a programme that actually fits your life. 3 months in and I've never felt better.",
    name: "GRACE W.",
    discipline: "Taebo & Insanity",
    initials: "GW",
  },
];

export default function Testimonials() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 bg-[#080808]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-12">
          <p className="eyebrow mb-2">CLIENT RESULTS</p>
          <div className="w-12 h-0.5 bg-green mb-6" />
          <h2 className="font-bebas text-[64px] leading-none text-white max-md:text-[40px]">
            REAL PEOPLE. REAL RESULTS.
          </h2>
        </div>

        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          variants={{ show: { transition: { staggerChildren: 0.12 } } }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-px bg-[#2A2A2A]"
        >
          {testimonials.map((t) => (
            <motion.div
              key={t.name}
              variants={{ hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}
              className="bg-[#111111] p-8"
            >
              <div className="flex gap-1 mb-4">
                {Array(5).fill(0).map((_, i) => (
                  <Star key={i} size={16} className="text-green fill-green" />
                ))}
              </div>
              <p className="font-dm-sans text-[16px] text-white/80 italic leading-[1.8] mb-6">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="border-t border-[#2A2A2A] pt-4 flex items-center gap-3">
                <div className="w-10 h-10 bg-green flex items-center justify-center">
                  <span className="font-barlow font-bold text-black text-sm">{t.initials}</span>
                </div>
                <div>
                  <p className="font-dm-sans text-[15px] text-white font-medium">{t.name}</p>
                  <p className="font-barlow text-[12px] uppercase tracking-widest text-[#888888]">
                    {t.discipline}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
