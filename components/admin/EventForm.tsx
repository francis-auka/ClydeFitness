"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

const DISCIPLINES = ["Taebo", "Kickboxing", "Boxing", "HIIT", "Insanity", "Floor Training"];

interface Props {
  initial?: Record<string, unknown>;
  eventId?: string;
}

export default function EventForm({ initial, eventId }: Props) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    title: (initial?.title as string) || "",
    description: (initial?.description as string) || "",
    date: initial?.date ? new Date(initial.date as string).toISOString().split("T")[0] : "",
    time: (initial?.time as string) || "",
    location: (initial?.location as string) || "",
    disciplines: (initial?.disciplines as string[]) || [],
    price: (initial?.price as number) || "",
    maxSlots: (initial?.maxSlots as number) || "",
    deadline: initial?.deadline ? new Date(initial.deadline as string).toISOString().slice(0, 16) : "",
    whatsappLink: (initial?.whatsappLink as string) || "",
    coverImage: (initial?.coverImage as string) || "",
    status: (initial?.status as string) || "draft",
  });

  const toggleDiscipline = (d: string) => {
    setForm((f) => ({
      ...f,
      disciplines: f.disciplines.includes(d) ? f.disciplines.filter((x) => x !== d) : [...f.disciplines, d],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const url = eventId ? `/api/admin/events/${eventId}` : "/api/admin/events";
    const method = eventId ? "PUT" : "POST";
    await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    setSaving(false);
    router.push("/admin/events");
    router.refresh();
  };

  const inputClass = "w-full bg-[#1A1A1A] border border-[#2A2A2A] text-white font-dm-sans text-[14px] px-4 py-3 focus:outline-none focus:border-green transition-colors";
  const labelClass = "font-barlow text-[12px] uppercase tracking-widest text-[#888888] block mb-1";

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl flex flex-col gap-5">
      <div>
        <label className={labelClass}>Event Title *</label>
        <input required className={inputClass} value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
      </div>
      <div>
        <label className={labelClass}>Description</label>
        <textarea rows={3} className={inputClass + " resize-none"} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Event Date *</label>
          <input type="date" required className={inputClass} value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
        </div>
        <div>
          <label className={labelClass}>Event Time *</label>
          <input type="text" placeholder="9:00 AM" required className={inputClass} value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })} />
        </div>
      </div>
      <div>
        <label className={labelClass}>Location *</label>
        <input required className={inputClass} value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} />
      </div>
      <div>
        <label className={labelClass}>Disciplines</label>
        <div className="flex flex-wrap gap-2 mt-1">
          {DISCIPLINES.map((d) => (
            <button
              type="button" key={d}
              onClick={() => toggleDiscipline(d)}
              className={`font-barlow text-[12px] uppercase tracking-widest px-3 py-2 border transition-colors duration-200 ${form.disciplines.includes(d) ? "border-green text-green bg-green/10" : "border-[#2A2A2A] text-[#888888] hover:border-white"}`}
            >
              {d}
            </button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Price (KES) *</label>
          <input type="number" required className={inputClass} value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} />
        </div>
        <div>
          <label className={labelClass}>Max Participants *</label>
          <input type="number" required className={inputClass} value={form.maxSlots} onChange={(e) => setForm({ ...form, maxSlots: e.target.value })} />
        </div>
      </div>
      <div>
        <label className={labelClass}>Registration Deadline *</label>
        <input type="datetime-local" required className={inputClass} value={form.deadline} onChange={(e) => setForm({ ...form, deadline: e.target.value })} />
      </div>
      <div>
        <label className={labelClass}>WhatsApp Group Invite Link *</label>
        <input required className={inputClass} placeholder="https://chat.whatsapp.com/..." value={form.whatsappLink} onChange={(e) => setForm({ ...form, whatsappLink: e.target.value })} />
        <p className="font-dm-sans text-[12px] text-[#888888] mt-1">Create group in WhatsApp → Invite via Link → paste here</p>
      </div>
      <div>
        <label className={labelClass}>Cover Image URL (optional)</label>
        <input className={inputClass} value={form.coverImage} onChange={(e) => setForm({ ...form, coverImage: e.target.value })} />
      </div>
      <div>
        <label className={labelClass}>Status</label>
        <div className="flex gap-3 mt-1">
          {["draft", "published"].map((s) => (
            <button
              type="button" key={s}
              onClick={() => setForm({ ...form, status: s })}
              className={`font-barlow text-[12px] uppercase tracking-widest px-4 py-2 border transition-colors duration-200 ${form.status === s ? "border-green text-green bg-green/10" : "border-[#2A2A2A] text-[#888888]"}`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>
      <div className="flex gap-4 pt-2">
        <button
          type="submit" disabled={saving}
          className="bg-green text-black font-barlow font-bold text-[13px] uppercase tracking-widest px-10 py-4 hover:bg-[#166534] transition-colors duration-200 disabled:opacity-60 flex items-center gap-2"
        >
          {saving ? <><Loader2 size={16} className="animate-spin" /> SAVING...</> : "SAVE EVENT"}
        </button>
        <button type="button" onClick={() => router.back()} className="border border-[#2A2A2A] text-[#888888] font-barlow text-[13px] uppercase tracking-widest px-6 py-4 hover:border-white hover:text-white transition-colors duration-200">
          Cancel
        </button>
      </div>
    </form>
  );
}
