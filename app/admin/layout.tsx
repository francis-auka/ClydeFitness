"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { CalendarDays, BookOpen, Settings, LogOut, Menu, X } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Events", href: "/admin/events", icon: CalendarDays },
  { label: "Bookings", href: "/admin/bookings", icon: BookOpen },
  { label: "Settings", href: "/admin/settings", icon: Settings },
];

function Sidebar({ onClose }: { onClose?: () => void }) {
  const path = usePathname();
  return (
    <div className="flex flex-col h-full bg-[#111111] border-r border-[#2A2A2A] w-60 shrink-0">
      <div className="p-6 border-b border-[#2A2A2A]">
        <div className="flex items-baseline gap-1">
          <span className="font-bebas text-[22px] text-white">COACH</span>
          <span className="font-bebas text-[22px] text-green">CLYDE</span>
        </div>
        <p className="font-barlow text-[11px] uppercase tracking-widest text-[#888888] mt-1">Admin</p>
      </div>
      <nav className="flex flex-col flex-1 p-4 gap-1">
        {navItems.map(({ label, href, icon: Icon }) => {
          const active = path.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              onClick={onClose}
              className={cn(
                "flex items-center gap-3 font-barlow text-[14px] uppercase tracking-widest px-4 py-3 transition-colors duration-200 border-l-[3px]",
                active
                  ? "border-green text-green bg-green/5"
                  : "border-transparent text-[#888888] hover:text-white"
              )}
            >
              <Icon size={16} /> {label}
            </Link>
          );
        })}
      </nav>
      <div className="p-4 border-t border-[#2A2A2A]">
        <button
          onClick={() => signOut({ callbackUrl: "/admin/login" })}
          className="flex items-center gap-3 font-barlow text-[14px] uppercase tracking-widest px-4 py-3 text-[#888888] hover:text-red transition-colors duration-200 w-full border-l-[3px] border-transparent"
        >
          <LogOut size={16} /> Sign Out
        </button>
      </div>
    </div>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  return (
    <div className="flex h-screen bg-[#080808] overflow-hidden">
      {/* Desktop sidebar */}
      <div className="hidden lg:flex">
        <Sidebar />
      </div>

      {/* Mobile sidebar overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div className="w-60"><Sidebar onClose={() => setMobileOpen(false)} /></div>
          <div className="flex-1 bg-black/60" onClick={() => setMobileOpen(false)} />
        </div>
      )}

      {/* Main content */}
      <div className="flex flex-col flex-1 overflow-auto">
        {/* Mobile header */}
        <div className="lg:hidden flex items-center gap-4 p-4 bg-[#111111] border-b border-[#2A2A2A]">
          <button onClick={() => setMobileOpen(true)} className="text-white">
            <Menu size={22} />
          </button>
          <span className="font-bebas text-[20px] text-white">COACH <span className="text-green">CLYDE</span></span>
        </div>
        <main className="flex-1 p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
