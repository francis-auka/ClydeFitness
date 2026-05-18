"use client";
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Plus } from "lucide-react";

const items = [
  { aspect: "aspect-[3/4]", label: "Session photo" },
  { aspect: "aspect-[16/9]", label: "Session photo" },
  { aspect: "aspect-[16/9]", label: "Session photo" },
  { aspect: "aspect-[3/4]", label: "Session photo" },
  { aspect: "aspect-[3/4]", label: "Session photo" },
  { aspect: "aspect-[16/9]", label: "Session photo" },
  { aspect: "aspect-[16/9]", label: "Session photo" },
  { aspect: "aspect-[3/4]", label: "Session photo" },
  { aspect: "aspect-[16/9]", label: "Session photo" },
];

export default function Gallery() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="gallery" className="py-24 bg-[#080808]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-12">
          <p className="eyebrow mb-2">SESSIONS IN ACTION</p>
          <div className="w-12 h-0.5 bg-green mb-6" />
          <h2 className="font-bebas text-[72px] leading-none text-white max-md:text-[48px]">
            THE WORK.
          </h2>
        </div>

        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          variants={{ show: { transition: { staggerChildren: 0.08 } } }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-[#2A2A2A]"
        >
          {items.map((item, i) => (
            <motion.div
              key={i}
              variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: 0.4 } } }}
              className={`group relative bg-[#1A1A1A] ${item.aspect} overflow-hidden cursor-pointer`}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="font-barlow text-[#2A2A2A] text-xs uppercase tracking-widest">
                  [ {item.label} ]
                </p>
              </div>
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                <div className="w-16 h-16 border-2 border-green flex items-center justify-center scale-75 group-hover:scale-100 transition-transform duration-200">
                  <Plus size={24} className="text-green" />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className="flex justify-center mt-10">
          <button className="border border-[#2A2A2A] text-white font-barlow font-bold text-sm uppercase tracking-widest px-10 py-4 hover:border-green transition-colors duration-200">
            LOAD MORE
          </button>
        </div>
      </div>
    </section>
  );
}
