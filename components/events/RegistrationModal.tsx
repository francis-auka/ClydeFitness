"use client";
import { useState } from "react";
import { X, Loader2 } from "lucide-react";

interface Event {
  _id: string;
  title: string;
}

interface Props {
  event: Event;
  onClose: () => void;
}

export default function RegistrationModal({ event, onClose }: Props) {
  const [form, setForm] = useState({ name: "", phone: "", email: "", spots: 1, agreed: false });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState("");
  const [confirmCode, setConfirmCode] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.agreed) { setError("Please agree to the cancellation policy."); return; }
    setStatus("loading"); setError("");

    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ eventId: event._id, name: form.name, phone: form.phone, email: form.email, spots: form.spots }),
    });
    const data = await res.json();
    if (res.ok) {
      setConfirmCode(data.confirmationCode);
      setStatus("success");
    } else {
      setError(data.error || "Something went wrong.");
      setStatus("error");
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#111111] border border-[#2A2A2A] w-full max-w-md p-8 relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-[#888888] hover:text-white transition-colors">
          <X size={20} />
        </button>

        {status === "success" ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-green/10 border border-green flex items-center justify-center mx-auto mb-4">
              <span className="text-green text-3xl">✓</span>
            </div>
            <p className="font-bebas text-[48px] text-green leading-none mb-2">YOU&apos;RE IN!</p>
            <p className="font-dm-sans text-[14px] text-[#888888] mb-4">Check your phone for the WhatsApp group link.</p>
            <p className="font-barlow text-[13px] uppercase tracking-widest text-[#888888]">
              Confirmation #{confirmCode}
            </p>
            <button onClick={onClose} className="mt-6 border border-[#2A2A2A] text-white font-barlow font-bold text-sm uppercase tracking-widest px-8 py-3 hover:border-green transition-colors duration-200">
              Close
            </button>
          </div>
        ) : (
          <>
            <h2 className="font-bebas text-[32px] text-white leading-none mb-6">{event.title}</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {[
                { label: "Full Name *", key: "name", type: "text", placeholder: "Your full name" },
                { label: "Phone Number *", key: "phone", type: "tel", placeholder: "0712 345 678" },
                { label: "Email (optional)", key: "email", type: "email", placeholder: "your@email.com" },
              ].map(({ label, key, type, placeholder }) => (
                <div key={key}>
                  <label className="font-barlow text-[12px] uppercase tracking-widest text-[#888888] block mb-1">{label}</label>
                  <input
                    required={key !== "email"}
                    type={type}
                    placeholder={placeholder}
                    value={form[key as keyof typeof form] as string}
                    onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                    className="w-full bg-[#1A1A1A] border border-[#2A2A2A] text-white font-dm-sans text-[14px] px-4 py-3 focus:outline-none focus:border-green transition-colors"
                  />
                </div>
              ))}

              <div>
                <label className="font-barlow text-[12px] uppercase tracking-widest text-[#888888] block mb-1">Number of Spots</label>
                <input
                  type="number" min={1} max={5}
                  value={form.spots}
                  onChange={(e) => setForm({ ...form, spots: Number(e.target.value) })}
                  className="w-full bg-[#1A1A1A] border border-[#2A2A2A] text-white font-dm-sans text-[14px] px-4 py-3 focus:outline-none focus:border-green transition-colors"
                />
              </div>

              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.agreed}
                  onChange={(e) => setForm({ ...form, agreed: e.target.checked })}
                  className="mt-1 shrink-0"
                />
                <span className="font-dm-sans text-[13px] text-[#888888]">
                  I agree to attend or notify Coach Clyde 24 hours before cancellation
                </span>
              </label>

              <div className="bg-[#1A1A1A] border-l-2 border-green p-4">
                <p className="font-dm-sans text-[13px] text-[#888888]">
                  After confirming your registration, you&apos;ll receive an SMS with the WhatsApp group link for this session.
                </p>
              </div>

              {status === "error" && (
                <div className="border border-red text-red font-dm-sans text-[13px] p-3">{error}</div>
              )}

              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full bg-green text-black font-barlow font-bold text-sm uppercase tracking-widest py-4 hover:bg-[#166534] transition-colors duration-200 disabled:opacity-60 flex items-center justify-center gap-2"
              >
                {status === "loading" ? (
                  <><Loader2 size={16} className="animate-spin" /> REGISTERING...</>
                ) : "CONFIRM REGISTRATION →"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
