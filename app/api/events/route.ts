import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Event } from "@/models/Event";

export async function GET() {
  try {
    await connectDB();
    const events = await Event.find({ status: "published" })
      .select("-whatsappLink")
      .sort({ date: 1 })
      .lean();
    return NextResponse.json(events);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to fetch events" }, { status: 500 });
  }
}
