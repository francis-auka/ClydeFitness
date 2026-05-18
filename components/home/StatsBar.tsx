"use client";
import { useRef, useEffect } from "react";
import { useInView, useMotionValue, useSpring } from "framer-motion";

const stats = [
  { value: 500, suffix: "+", label: "Clients Trained" },
  { value: 6, suffix: "", label: "Disciplines" },
  { value: 3, suffix: "", label: "Certifications" },
  { value: 100, suffix: "%", label: "Results Driven" },
];

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, { duration: 1500, bounce: 0 });

  useEffect(() => {
    if (inView) motionValue.set(value);
  }, [inView, motionValue, value]);

  useEffect(() => {
    return spring.on("change", (v) => {
      if (ref.current) ref.current.textContent = Math.round(v) + suffix;
    });
  }, [spring, suffix]);

  return (
    <span ref={ref} className="font-bebas text-[48px] leading-none text-white">
      0{suffix}
    </span>
  );
}

export default function StatsBar() {
  return (
    <section className="bg-[#111111] border-t border-b border-[#2A2A2A]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="flex flex-col items-center justify-center py-8 px-6 border-r border-[#2A2A2A] last:border-r-0 [&:nth-child(2)]:max-lg:border-r-0"
            >
              <Counter value={stat.value} suffix={stat.suffix} />
              <p className="font-barlow text-[12px] uppercase tracking-widest text-[#888888] mt-1">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
