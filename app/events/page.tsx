import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import EventCard from "@/components/events/EventCard";

async function getEvents() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
    const res = await fetch(`${baseUrl}/api/events`, { cache: "no-store" });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

export default async function EventsPage() {
  const events = await getEvents();

  return (
    <main className="bg-[#080808] min-h-screen">
      <div className="noise-overlay" />
      <Navbar />

      {/* Page header */}
      <section className="bg-[#111111] border-b border-[#2A2A2A] pt-[72px]">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <p className="eyebrow mb-2">UPCOMING SESSIONS</p>
          <div className="w-12 h-0.5 bg-green mb-6" />
          <h1 className="font-bebas text-[80px] leading-none text-white max-md:text-[48px]">
            BOOK YOUR SPOT.
          </h1>
          <p className="font-dm-sans text-[16px] text-[#888888] leading-[1.7] mt-4 max-w-xl">
            Register below. A WhatsApp group link is sent to you instantly after confirming your spot.
          </p>
        </div>
      </section>

      {/* Events grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          {events.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <p className="font-dm-sans text-[#888888] text-lg mb-4">
                No upcoming events. Check back soon.
              </p>
              <div className="flex gap-3 mt-4">
                <a href="#" className="w-10 h-10 border border-[#2A2A2A] flex items-center justify-center text-[#888888] hover:border-green hover:text-green transition-colors">
                  <span className="text-xs font-barlow">IG</span>
                </a>
                <a href="#" className="w-10 h-10 border border-[#2A2A2A] flex items-center justify-center text-[#888888] hover:border-green hover:text-green transition-colors">
                  <span className="text-xs font-barlow">FB</span>
                </a>
                <a href="#" className="w-10 h-10 border border-[#2A2A2A] flex items-center justify-center text-[#888888] hover:border-green hover:text-green transition-colors">
                  <span className="text-xs font-barlow">TT</span>
                </a>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-[#2A2A2A]">
              {events.map((event: Parameters<typeof EventCard>[0]["event"]) => (
                <EventCard key={event._id} event={event} />
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
