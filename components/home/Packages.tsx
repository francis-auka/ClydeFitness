"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Check } from "lucide-react";
import Link from "next/link";

const packages = [
  {
    tag: "STARTER",
    tagStyle: "border border-[#2A2A2A] text-[#888888]",
    price: "KES 2,000",
    freq: "/ session",
    name: "Drop-In Class",
    featured: false,
    features: ["1 group session (60 min)", "Any discipline — HIIT, Taebo, Boxing", "No commitment required"],
  },
  {
    tag: "MOST POPULAR",
    tagStyle: "bg-green text-black font-bold",
    price: "KES 7,500",
    freq: "/ month",
    name: "Group Monthly",
    featured: true,
    features: ["4 group sessions per month", "Mixed disciplines", "Programme design included", "WhatsApp check-ins"],
  },
  {
    tag: "PERSONAL",
    tagStyle: "border border-[#2A2A2A] text-[#888888]",
    price: "KES 5,000",
    freq: "/ session",
    name: "1-on-1 Training",
    featured: false,
    features: ["60–90 min personal session", "Full client assessment", "Custom programme design", "Injury prevention focus"],
  },
  {
    tag: "ELITE",
    tagStyle: "border border-white/20 text-[#888888]",
    price: "KES 18,000",
    freq: "/ month",
    name: "Elite Coaching",
    featured: false,
    features: ["8 personal sessions per month", "Full programme design", "Nutrition guidance", "Progress tracking & reports", "Priority booking"],
  },
];

export default function Packages() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="packages" className="py-24 bg-[#080808]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-12">
          <p className="eyebrow mb-2">PRICING</p>
          <div className="w-12 h-0.5 bg-green mb-6" />
          <h2 className="font-bebas text-[72px] leading-none text-white max-md:text-[48px]">
            CHOOSE YOUR PACKAGE.
          </h2>
        </div>

        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          variants={{ show: { transition: { staggerChildren: 0.1 } } }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-[#2A2A2A]"
        >
          {packages.map((pkg) => (
            <motion.div
              key={pkg.name}
              variants={{ hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}
              className={`bg-[#111111] p-8 flex flex-col hover:-translate-y-1 transition-transform duration-200 ${pkg.featured ? "border-t-[3px] border-green" : ""}`}
            >
              <span className={`font-barlow text-[11px] uppercase tracking-widest px-3 py-1 self-start mb-6 ${pkg.tagStyle}`}>
                {pkg.tag}
              </span>

              <div className="mb-2">
                <span className={`font-bebas text-[56px] leading-none ${pkg.featured ? "text-green" : "text-white"}`}>
                  {pkg.price}
                </span>
              </div>
              <p className="font-dm-sans text-[14px] text-[#888888] mb-1">{pkg.freq}</p>
              <p className="font-barlow text-[18px] text-white uppercase mb-6">{pkg.name}</p>

              <div className="border-t border-[#2A2A2A] my-4" />

              <ul className="flex flex-col gap-3 mb-8 flex-1">
                {pkg.features.map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <Check size={16} className="text-green mt-0.5 shrink-0" />
                    <span className="font-dm-sans text-[14px] text-[#888888]">{f}</span>
                  </li>
                ))}
              </ul>

              <Link
                href="#contact"
                className={`w-full py-3 text-center font-barlow font-bold text-sm uppercase tracking-widest transition-colors duration-200 ${
                  pkg.featured
                    ? "bg-green text-black hover:bg-[#166534]"
                    : "border border-[#2A2A2A] text-white hover:border-green"
                }`}
              >
                Get Started
              </Link>
            </motion.div>
          ))}
        </motion.div>

        <p className="font-dm-sans text-[14px] text-[#888888] text-center mt-8">
          All sessions include first aid cover. Corporate &amp; team rates available on request.
        </p>
      </div>
    </section>
  );
}
