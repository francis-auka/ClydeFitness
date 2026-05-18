import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Gallery from "@/models/Gallery";

export async function GET() {
  try {
    await connectDB();
    const items = await Gallery.find().sort({ order: 1, createdAt: -1 }).lean();
    return NextResponse.json(items);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to fetch gallery" }, { status: 500 });
  }
}
