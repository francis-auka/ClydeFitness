"use client";
import { useState } from "react";
import { Loader2 } from "lucide-react";

export default function SettingsPage() {
  const [pw, setPw] = useState({ old: "", next: "", confirm: "" });
  const [pwStatus, setPwStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [pwMsg, setPwMsg] = useState("");

  const handlePw = async (e: React.FormEvent) => {
    e.preventDefault();
    if (pw.next !== pw.confirm) { setPwMsg("Passwords do not match."); setPwStatus("error"); return; }
    setPwStatus("loading");
    const res = await fetch("/api/admin/settings/password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ oldPassword: pw.old, newPassword: pw.next }),
    });
    const data = await res.json();
    setPwStatus(res.ok ? "success" : "error");
    setPwMsg(res.ok ? "Password updated." : data.error || "Failed.");
  };

  const inputClass = "w-full bg-[#1A1A1A] border border-[#2A2A2A] text-white font-dm-sans text-[14px] px-4 py-3 focus:outline-none focus:border-green transition-colors";
  const labelClass = "font-barlow text-[12px] uppercase tracking-widest text-[#888888] block mb-1";

  return (
    <div className="max-w-lg">
      <h1 className="font-bebas text-[40px] text-white leading-none mb-8">SETTINGS</h1>

      <div className="bg-[#111111] border border-[#2A2A2A] p-8 mb-6">
        <h2 className="font-barlow text-[16px] uppercase tracking-widest text-white mb-6">Change Password</h2>
        <form onSubmit={handlePw} className="flex flex-col gap-4">
          {[
            { label: "Current Password", key: "old" },
            { label: "New Password", key: "next" },
            { label: "Confirm New Password", key: "confirm" },
          ].map(({ label, key }) => (
            <div key={key}>
              <label className={labelClass}>{label}</label>
              <input
                type="password" required
                value={pw[key as keyof typeof pw]}
                onChange={(e) => setPw({ ...pw, [key]: e.target.value })}
                className={inputClass}
              />
            </div>
          ))}
          {pwMsg && (
            <p className={`font-dm-sans text-[13px] ${pwStatus === "success" ? "text-green" : "text-red"}`}>
              {pwMsg}
            </p>
          )}
          <button
            type="submit" disabled={pwStatus === "loading"}
            className="bg-green text-black font-barlow font-bold text-[13px] uppercase tracking-widest px-8 py-4 hover:bg-[#166534] transition-colors duration-200 disabled:opacity-60 flex items-center gap-2 w-fit"
          >
            {pwStatus === "loading" ? <><Loader2 size={14} className="animate-spin" />Updating...</> : "Update Password"}
          </button>
        </form>
      </div>

      <div className="bg-[#111111] border border-[#2A2A2A] p-8">
        <h2 className="font-barlow text-[16px] uppercase tracking-widest text-white mb-4">Contact Info</h2>
        <p className="font-dm-sans text-[13px] text-[#888888]">
          Update contact details in <code className="text-green">.env</code> and redeploy.
        </p>
        <div className="mt-4 flex flex-col gap-2 font-barlow text-[14px] text-[#888888] uppercase tracking-widest">
          <div>AT Username: <span className="text-white">{process.env.AT_USERNAME || "—"}</span></div>
          <div>Sender ID: <span className="text-white">{process.env.AT_SENDER_ID || "—"}</span></div>
        </div>
      </div>
    </div>
  );
}
