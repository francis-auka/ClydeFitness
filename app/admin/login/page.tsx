"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

export default function AdminLogin() {
  const router = useRouter();
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await signIn("credentials", {
      username: form.username,
      password: form.password,
      redirect: false,
    });
    setLoading(false);
    if (res?.ok) {
      router.push("/admin/events");
    } else {
      setError("Invalid credentials");
    }
  };

  return (
    <main className="min-h-screen bg-[#080808] flex items-center justify-center px-4">
      <div className="w-full max-w-sm bg-[#111111] border border-[#2A2A2A] p-10">
        <div className="text-center mb-8">
          <div className="flex items-baseline justify-center gap-1 mb-2">
            <span className="font-bebas text-[32px] text-white">COACH CLYDE</span>
          </div>
          <span className="font-barlow text-[12px] uppercase tracking-widest text-green">ADMIN PANEL</span>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="font-barlow text-[12px] uppercase tracking-widest text-[#888888] block mb-1">Username</label>
            <input
              type="text"
              required
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
              className="w-full bg-[#1A1A1A] border border-[#2A2A2A] text-white font-dm-sans text-[14px] px-4 py-3 focus:outline-none focus:border-green transition-colors"
            />
          </div>
          <div>
            <label className="font-barlow text-[12px] uppercase tracking-widest text-[#888888] block mb-1">Password</label>
            <input
              type="password"
              required
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="w-full bg-[#1A1A1A] border border-[#2A2A2A] text-white font-dm-sans text-[14px] px-4 py-3 focus:outline-none focus:border-green transition-colors"
            />
          </div>
          {error && <p className="font-dm-sans text-[13px] text-red">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green text-black font-barlow font-bold text-sm uppercase tracking-widest py-4 hover:bg-[#166534] transition-colors duration-200 disabled:opacity-60 flex items-center justify-center gap-2 mt-2"
          >
            {loading ? <><Loader2 size={16} className="animate-spin" /> SIGNING IN...</> : "SIGN IN"}
          </button>
        </form>
      </div>
    </main>
  );
}
