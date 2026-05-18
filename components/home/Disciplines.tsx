"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Dumbbell, Users, ClipboardList, Shield, Target, Zap } from "lucide-react";

const cards = [
  {
    num: "01",
    icon: Dumbbell,
    title: "FITNESS DISCIPLINES",
    body: "Taebo, Kickboxing, Boxing, Insanity, Floor Training, HIIT",
  },
  {
    num: "02",
    icon: Users,
    title: "GROUP INSTRUCTION",
    body: "High-energy group classes designed to push every participant to their limit",
  },
  {
    num: "03",
    icon: ClipboardList,
    title: "PROGRAMME DESIGN",
    body: "Custom training plans built around your goals, schedule, and current fitness level",
  },
  {
    num: "04",
    icon: Shield,
    title: "SAFETY & FIRST AID",
    body: "First Aid certified, CPR trained, Emergency Response qualified — every session is covered",
  },
  {
    num: "05",
    icon: Target,
    title: "CLIENT ASSESSMENT",
    body: "Full fitness assessment and ongoing tracking to measure real progress",
  },
  {
    num: "06",
    icon: Zap,
    title: "MOTIVATION & LEADERSHIP",
    body: "Communication, adaptability, and the drive to push you past what you think is possible",
  },
];

export default function Disciplines() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" className="py-24 bg-[#080808]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-12">
          <p className="eyebrow mb-2">WHAT I BRING</p>
          <div className="w-12 h-0.5 bg-green mb-6" />
          <h2 className="font-bebas text-[72px] leading-none text-white max-md:text-[48px]">
            EVERY SESSION.<br />EVERY DISCIPLINE.
          </h2>
        </div>

        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          variants={{ show: { transition: { staggerChildren: 0.1 } } }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-[#2A2A2A]"
        >
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.num}
                variants={{ hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}
                className="group bg-[#111111] p-8 relative overflow-hidden border-t-2 border-transparent hover:border-green transition-all duration-200"
              >
                <span className="font-bebas text-[80px] text-green opacity-10 leading-none absolute top-2 right-4 select-none">
                  {card.num}
                </span>
                <Icon size={28} className="text-green mt-4 relative z-10" />
                <h3 className="font-barlow text-[20px] uppercase text-white mt-3 mb-2 relative z-10">
                  {card.title}
                </h3>
                <p className="font-dm-sans text-[14px] text-[#888888] leading-[1.6] relative z-10">
                  {card.body}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
