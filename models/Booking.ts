import mongoose, { Schema, models } from "mongoose";

const BookingSchema = new Schema({
  eventId: { type: Schema.Types.ObjectId, ref: "Event", required: true },
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: String,
  spots: { type: Number, default: 1 },
  confirmationCode: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export const Booking = models.Booking || mongoose.model("Booking", BookingSchema);
