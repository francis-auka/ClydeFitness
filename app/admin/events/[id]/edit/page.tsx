import { connectDB } from "@/lib/mongodb";
import { Event } from "@/models/Event";
import EventForm from "@/components/admin/EventForm";
import { notFound } from "next/navigation";

export default async function EditEventPage({ params }: { params: { id: string } }) {
  await connectDB();
  const event = await Event.findById(params.id).lean();
  if (!event) notFound();

  return (
    <div>
      <h1 className="font-bebas text-[40px] text-white leading-none mb-8">EDIT EVENT</h1>
      <EventForm initial={event as Record<string, unknown>} eventId={params.id} />
    </div>
  );
}
