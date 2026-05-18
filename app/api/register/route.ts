import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Event } from "@/models/Event";
import { Booking } from "@/models/Booking";
import { sendSMS } from "@/lib/sms";

export async function POST(req: Request) {
  try {
    const { eventId, name, phone, email, spots = 1 } = await req.json();

    if (!eventId || !name || !phone) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    await connectDB();

    // Atomic slot gate
    const event = await Event.findOneAndUpdate(
      {
        _id: eventId,
        status: "published",
        deadline: { $gt: new Date() },
        $expr: { $lt: ["$bookedSlots", "$maxSlots"] },
      },
      { $inc: { bookedSlots: spots } },
      { new: true }
    );

    if (!event) {
      return NextResponse.json({ error: "Registration is closed for this event" }, { status: 400 });
    }

    const confirmationCode = `CC${Date.now().toString(36).toUpperCase()}`;

    await Booking.create({ eventId, name, phone, email, spots, confirmationCode });

    // Send SMS
    const smsBody = `Hi ${name}! You're confirmed for ${event.title}. Join the WhatsApp group: ${event.whatsappLink} | Confirmation: ${confirmationCode}`;
    try {
      await sendSMS(phone, smsBody);
    } catch {
      console.error("[SMS failed but registration succeeded]");
    }

    return NextResponse.json({ success: true, confirmationCode });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Registration failed. Please try again." }, { status: 500 });
  }
}
