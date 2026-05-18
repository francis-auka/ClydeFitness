"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-24 bg-[#080808]">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          variants={{ show: { transition: { staggerChildren: 0.1 } } }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
        >
          {/* Left - Image */}
          <motion.div variants={fadeUp} className="relative">
            <div className="relative aspect-[3/4] bg-[#1A1A1A] overflow-hidden group">
              <iframe
                src="https://www.youtube.com/embed/B6d7A_C30P0?autoplay=1&mute=1&controls=0&loop=1&playlist=B6d7A_C30P0&modestbranding=1&rel=0&iv_load_policy=3&playsinline=1"
                className="absolute inset-0 w-[100%] h-[100%] pointer-events-none scale-[1.5]"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                style={{ border: 0 }}
              />
              <div className="absolute inset-0 bg-black/20" />
              {/* Badge */}
              <div className="absolute top-4 right-4 bg-green text-black font-barlow font-bold text-[11px] uppercase tracking-wider px-3 py-2 z-10">
                #1 COMBAT COACH · NAIROBI
              </div>
            </div>
          </motion.div>

          {/* Right - Content */}
          <motion.div variants={fadeUp}>
            <p className="eyebrow mb-2">ABOUT THE COACH</p>
            <div className="w-12 h-0.5 bg-green mb-6" />

            <h2 className="font-bebas text-[64px] leading-none text-white mb-6 max-md:text-[48px]">
              MORE THAN<br />A TRAINER.
            </h2>

            <p className="font-dm-sans text-[16px] text-[#888888] leading-[1.7] mb-4">
              Coach Clyde is a certified combat-based fitness coach with expertise spanning Taebo,
              Kickboxing, Boxing, Insanity, Floor Training, and HIIT. With a foundation in First Aid,
              CPR, and Emergency Response, every session is safe, structured, and results-driven.
            </p>
            <p className="font-dm-sans text-[16px] text-[#888888] leading-[1.7] mb-8">
              Whether you&apos;re training for your first session or pushing past plateaus — Coach Clyde
              builds programmes that work for your body and your goals.
            </p>

            <div className="border-t border-[#2A2A2A] pt-6 mb-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="font-barlow text-[12px] uppercase tracking-widest text-[#888888] mb-3">
                    CERTIFICATIONS
                  </p>
                  {["First Aid", "CPR", "Emergency Response"].map((c) => (
                    <p key={c} className="font-barlow text-[15px] text-white">
                      {c}
                    </p>
                  ))}
                </div>
                <div>
                  <p className="font-barlow text-[12px] uppercase tracking-widest text-[#888888] mb-3">
                    LOCATION
                  </p>
                  <p className="font-barlow text-[15px] text-white">Nairobi, Kenya</p>
                  <p className="font-barlow text-[13px] text-[#888888] mt-1">
                    Available for group &amp; 1-on-1
                  </p>
                </div>
              </div>
            </div>

            <Link
              href="#contact"
              className="font-barlow font-bold text-green text-[15px] uppercase tracking-widest hover:underline transition-all duration-200"
            >
              Start Your Journey →
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
