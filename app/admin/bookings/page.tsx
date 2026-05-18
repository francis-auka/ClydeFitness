import { connectDB } from "@/lib/mongodb";
import { Event } from "@/models/Event";
import { Booking } from "@/models/Booking";
import Link from "next/link";
import { BookOpen } from "lucide-react";

export const dynamic = "force-dynamic";

async function getEventsWithBookingCounts() {
  await connectDB();
  const events = await Event.find().sort({ date: -1 }).lean();
  
  // Enhance events with actual booking records count if needed, 
  // but we already have bookedSlots on the event.
  // Let's just use the event data.
  return events;
}

export default async function BookingsLandingPage() {
  const events = await getEventsWithBookingCounts();

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-bebas text-[40px] text-white leading-none">BOOKINGS BY EVENT</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.length === 0 ? (
          <p className="font-dm-sans text-[#888888]">No events found.</p>
        ) : (
          events.map((ev: any) => (
            <Link 
              key={String(ev._id)} 
              href={`/admin/bookings/${ev._id}`}
              className="group bg-[#111111] border border-[#2A2A2A] p-6 hover:border-green transition-all duration-200"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="bg-green/10 p-2 text-green">
                  <BookOpen size={20} />
                </div>
                <span className={`font-barlow text-[11px] uppercase tracking-widest border px-2 py-1 ${
                  ev.status === "published" ? "border-green text-green" : "border-[#2A2A2A] text-[#888888]"
                }`}>
                  {ev.status}
                </span>
              </div>
              
              <h3 className="font-barlow text-[20px] uppercase text-white mb-1 group-hover:text-green transition-colors">
                {ev.title}
              </h3>
              <p className="font-dm-sans text-[13px] text-[#888888] mb-4">
                {new Date(ev.date).toLocaleDateString("en-GB")}
              </p>
              
              <div className="flex items-center justify-between mt-auto pt-4 border-t border-[#2A2A2A]">
                <span className="font-barlow text-[12px] uppercase tracking-widest text-[#888888]">Registrations</span>
                <span className="font-bebas text-[24px] text-white">
                  {ev.bookedSlots} <span className="text-[14px] text-[#888888]">/ {ev.maxSlots}</span>
                </span>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
