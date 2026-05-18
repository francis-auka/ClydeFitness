import { connectDB } from "@/lib/mongodb";
import { Event } from "@/models/Event";
import Link from "next/link";
import { PlusCircle, Pencil, Trash2, BookOpen } from "lucide-react";

async function getEvents() {
  await connectDB();
  return Event.find().sort({ createdAt: -1 }).lean();
}

export default async function AdminEventsPage() {
  const events = await getEvents();

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-bebas text-[40px] text-white leading-none">EVENTS</h1>
        <Link
          href="/admin/events/new"
          className="flex items-center gap-2 bg-green text-black font-barlow font-bold text-[13px] uppercase tracking-widest px-5 py-3 hover:bg-[#166534] transition-colors duration-200"
        >
          <PlusCircle size={16} /> New Event
        </Link>
      </div>

      <div className="border border-[#2A2A2A] overflow-x-auto">
        <table className="w-full min-w-[700px]">
          <thead className="bg-[#111111] border-b border-[#2A2A2A]">
            <tr>
              {["Title", "Date", "Slots", "Deadline", "Status", "Actions"].map((h) => (
                <th key={h} className="font-barlow text-[12px] uppercase tracking-widest text-[#888888] text-left px-4 py-3">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {events.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center font-dm-sans text-[#888888] py-12">
                  No events yet. Create your first one.
                </td>
              </tr>
            ) : (
              events.map((ev: any) => (
                <tr key={String(ev._id)} className="border-b border-[#2A2A2A] hover:bg-[#111111] transition-colors">
                  <td className="px-4 py-3 font-dm-sans text-[14px] text-white">{ev.title}</td>
                  <td className="px-4 py-3 font-dm-sans text-[14px] text-[#888888]">
                    {new Date(ev.date).toLocaleDateString("en-GB")}
                  </td>
                  <td className="px-4 py-3 font-dm-sans text-[14px] text-[#888888]">
                    {ev.bookedSlots}/{ev.maxSlots}
                  </td>
                  <td className="px-4 py-3 font-dm-sans text-[14px] text-[#888888]">
                    {new Date(ev.deadline).toLocaleDateString("en-GB")}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`font-barlow text-[11px] uppercase tracking-widest border px-2 py-1 ${
                      ev.status === "published" ? "border-green text-green" : "border-[#2A2A2A] text-[#888888]"
                    }`}>
                      {ev.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-4">
                      <Link href={`/admin/events/${ev._id}/edit`} className="text-[#888888] hover:text-green transition-colors">
                        <Pencil size={15} />
                      </Link>
                      <Link href={`/admin/bookings/${ev._id}`} className="text-[#888888] hover:text-green transition-colors">
                        <BookOpen size={15} />
                      </Link>
                      <form action={`/api/admin/events/${ev._id}/delete`} method="POST">
                        <button type="submit" className="text-[#888888] hover:text-red transition-colors">
                          <Trash2 size={15} />
                        </button>
                      </form>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
