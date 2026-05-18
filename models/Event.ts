import mongoose, { Schema, models } from "mongoose";

const EventSchema = new Schema({
  title: { type: String, required: true },
  description: String,
  date: { type: Date, required: true },
  time: { type: String, required: true },
  location: { type: String, required: true },
  disciplines: [String],
  price: { type: Number, required: true },
  maxSlots: { type: Number, required: true },
  bookedSlots: { type: Number, default: 0 },
  deadline: { type: Date, required: true },
  whatsappLink: { type: String, required: true },
  coverImage: String,
  status: { type: String, enum: ["draft", "published"], default: "draft" },
  createdAt: { type: Date, default: Date.now },
});

export const Event = models.Event || mongoose.model("Event", EventSchema);
