import mongoose from "mongoose";

const GallerySchema = new mongoose.Schema({
  type: { type: String, enum: ["image", "video"], required: true },
  url: { type: String, required: true },
  title: String,
  aspect: { type: String, default: "aspect-[16/9]" },
  order: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

const Gallery = mongoose.models.Gallery || mongoose.model("Gallery", GallerySchema);
export default Gallery;
