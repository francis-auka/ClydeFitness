import { connectDB } from "@/lib/mongodb";
import { Booking } from "@/models/Booking";
import { Event } from "@/models/Event";
import Link from "next/link";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function BookingsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await connectDB();
  const event = await Event.findById(id).lean();
  if (!event) notFound();

  const bookings = await Booking.find({ eventId: id }).sort({ createdAt: -1 }).lean();

  const csvRows = [
    ["Name", "Phone", "Email", "Spots", "Code", "Registered At"],
    ...bookings.map((b: any) => [b.name, b.phone, b.email || "", b.spots, b.confirmationCode, new Date(b.createdAt).toLocaleString()]),
  ];
  const csvContent = csvRows.map((r) => r.join(",")).join("\n");
  const csvHref = `data:text/csv;charset=utf-8,${encodeURIComponent(csvContent)}`;

  return (
    <div>
      <div className="flex items-center gap-4 mb-2">
        <Link href="/admin/events" className="font-barlow text-[13px] uppercase tracking-widest text-[#888888] hover:text-white transition-colors">
          ← Events
        </Link>
      </div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-bebas text-[40px] text-white leading-none">{(event as any).title}</h1>
          <p className="font-barlow text-[13px] uppercase tracking-widest text-[#888888]">
            {bookings.length} / {(event as any).maxSlots} registrations
          </p>
        </div>
        <a
          href={csvHref}
          download={`bookings-${id}.csv`}
          className="border border-[#2A2A2A] text-[#888888] font-barlow font-bold text-[13px] uppercase tracking-widest px-6 py-3 hover:border-green hover:text-green transition-colors duration-200"
        >
          Export CSV
        </a>
      </div>

      <div className="border border-[#2A2A2A] overflow-x-auto">
        <table className="w-full min-w-[700px]">
          <thead className="bg-[#111111] border-b border-[#2A2A2A]">
            <tr>
              {["Name", "Phone", "Email", "Spots", "Confirmation", "Registered At"].map((h) => (
                <th key={h} className="font-barlow text-[12px] uppercase tracking-widest text-[#888888] text-left px-4 py-3">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {bookings.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center font-dm-sans text-[#888888] py-12">No registrations yet.</td>
              </tr>
            ) : (
              bookings.map((b: any) => (
                <tr key={String(b._id)} className="border-b border-[#2A2A2A] hover:bg-[#111111] transition-colors">
                  <td className="px-4 py-3 font-dm-sans text-[14px] text-white">{b.name}</td>
                  <td className="px-4 py-3 font-dm-sans text-[14px] text-[#888888]">{b.phone}</td>
                  <td className="px-4 py-3 font-dm-sans text-[14px] text-[#888888]">{b.email || "—"}</td>
                  <td className="px-4 py-3 font-dm-sans text-[14px] text-[#888888]">{b.spots}</td>
                  <td className="px-4 py-3 font-barlow text-[13px] text-green uppercase">{b.confirmationCode}</td>
                  <td className="px-4 py-3 font-dm-sans text-[13px] text-[#888888]">{new Date(b.createdAt).toLocaleString()}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
