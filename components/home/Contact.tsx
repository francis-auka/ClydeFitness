"use client";
import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Phone, Mail, MapPin } from "lucide-react";
import { Instagram, Facebook, TikTok } from "@/components/ui/BrandIcons";

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [form, setForm] = useState({ name: "", email: "", phone: "", pkg: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    const whatsappNumber = "254759593696";
    const text = `*New Inquiry from ClydeFitness Website*
    
*Name:* ${form.name}
*Email:* ${form.email}
*Phone:* ${form.phone}
*Package:* ${form.pkg || 'N/A'}
*Message:* ${form.message}`;

    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;

    setTimeout(() => {
      setStatus("success");
      window.open(whatsappUrl, "_blank");
    }, 800);
  };

  return (
    <section id="contact" className="py-24 bg-[#080808]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-12">
          <p className="eyebrow mb-2">GET IN TOUCH</p>
          <div className="w-12 h-0.5 bg-green mb-6" />
          <h2 className="font-bebas text-[64px] leading-none text-white max-md:text-[40px]">
            READY TO START?
          </h2>
        </div>

        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-[#2A2A2A]"
        >
          {/* Left */}
          <div className="bg-[#080808] pr-0 lg:pr-12 py-8">
            <p className="font-dm-sans text-[16px] text-[#888888] leading-[1.7] mb-8">
              Book a session, ask a question, or enquire about corporate training. Coach Clyde responds within 24 hours.
            </p>
            <div className="flex flex-col gap-4 mb-8">
              {[
                { icon: Phone, text: "+254 759 593 696" },
                { icon: Mail, text: "clydeokothotieno@gmail.com" },
                { icon: MapPin, text: "Nairobi, Kenya" },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-3">
                  <Icon size={16} className="text-green shrink-0" />
                  <span className="font-barlow text-[15px] text-white">{text}</span>
                </div>
              ))}
            </div>
            <div className="flex gap-3">
              {[
                { Icon: Instagram, href: "https://instagram.com/coachclyde_fitness" },
                { Icon: Facebook, href: "#" },
                { Icon: TikTok, href: "https://www.tiktok.com/@theprettymfmehn" }
              ].map(({ Icon, href }, i) => (
                <a 
                  key={i} 
                  href={href} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 border border-[#2A2A2A] flex items-center justify-center text-[#888888] hover:border-green hover:text-green transition-colors duration-200"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Right - Form */}
          <div className="bg-[#111111] border border-[#2A2A2A] p-8">
            {status === "success" ? (
              <div className="flex flex-col items-center justify-center h-full py-12 text-center">
                <div className="w-16 h-16 bg-green/10 border border-green flex items-center justify-center mb-4">
                  <span className="text-green text-2xl">✓</span>
                </div>
                <p className="font-bebas text-[32px] text-green">MESSAGE SENT!</p>
                <p className="font-dm-sans text-[14px] text-[#888888] mt-2">Coach Clyde will get back to you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                {[
                  { label: "Full Name", key: "name", type: "text", placeholder: "Your name" },
                  { label: "Email", key: "email", type: "email", placeholder: "your@email.com" },
                  { label: "Phone Number", key: "phone", type: "tel", placeholder: "+254 759 593 696" },
                ].map(({ label, key, type, placeholder }) => (
                  <div key={key}>
                    <label className="font-barlow text-[12px] uppercase tracking-widest text-[#888888] block mb-1">{label}</label>
                    <input
                      type={type}
                      placeholder={placeholder}
                      value={form[key as keyof typeof form]}
                      onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                      className="w-full bg-[#1A1A1A] border border-[#2A2A2A] text-white font-dm-sans text-[14px] px-4 py-3 focus:outline-none focus:border-green transition-colors"
                    />
                  </div>
                ))}
                <div>
                  <label className="font-barlow text-[12px] uppercase tracking-widest text-[#888888] block mb-1">Preferred Package</label>
                  <select
                    value={form.pkg}
                    onChange={(e) => setForm({ ...form, pkg: e.target.value })}
                    className="w-full bg-[#1A1A1A] border border-[#2A2A2A] text-white font-dm-sans text-[14px] px-4 py-3 focus:outline-none focus:border-green transition-colors"
                  >
                    <option value="">Select a package</option>
                    <option>Drop-In Class</option>
                    <option>Group Monthly</option>
                    <option>1-on-1 Training</option>
                    <option>Elite Coaching</option>
                  </select>
                </div>
                <div>
                  <label className="font-barlow text-[12px] uppercase tracking-widest text-[#888888] block mb-1">Message</label>
                  <textarea
                    rows={4}
                    placeholder="Tell Coach Clyde about your goals..."
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full bg-[#1A1A1A] border border-[#2A2A2A] text-white font-dm-sans text-[14px] px-4 py-3 focus:outline-none focus:border-green transition-colors resize-none"
                  />
                </div>
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full bg-green text-black font-barlow font-bold text-sm uppercase tracking-widest py-4 hover:bg-[#166534] transition-colors duration-200 disabled:opacity-60"
                >
                  {status === "loading" ? "SENDING..." : "SEND MESSAGE"}
                </button>
                <p className="font-dm-sans text-[13px] text-[#888888] text-center">
                  Or{" "}
                  <a href="https://wa.me/254759593696" className="text-green hover:underline">
                    WhatsApp directly →
                  </a>
                </p>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
