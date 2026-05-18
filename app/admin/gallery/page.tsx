"use client";
import { useState, useEffect } from "react";
import { Plus, Trash2, Image as ImageIcon, Video, Loader2 } from "lucide-react";

export default function AdminGalleryPage() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [formData, setFormData] = useState({ type: "image", url: "", title: "", aspect: "aspect-[16/9]" });

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    const res = await fetch("/api/gallery");
    const data = await res.json();
    setItems(data);
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAdding(true);
    const res = await fetch("/api/admin/gallery", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    if (res.ok) {
      setFormData({ type: "image", url: "", title: "", aspect: "aspect-[16/9]" });
      fetchItems();
    }
    setAdding(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this item?")) return;
    const res = await fetch(`/api/admin/gallery/${id}`, { method: "DELETE" });
    if (res.ok) fetchItems();
  };

  return (
    <div>
      <h1 className="font-bebas text-[40px] text-white leading-none mb-8">GALLERY MANAGEMENT</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form */}
        <div className="bg-[#111111] border border-[#2A2A2A] p-6 h-fit">
          <h2 className="font-barlow text-sm uppercase tracking-widest text-green mb-6 flex items-center gap-2">
            <Plus size={16} /> Add New Item
          </h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="font-barlow text-[12px] uppercase tracking-widest text-[#888888] block mb-1">Type</label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="w-full bg-[#1A1A1A] border border-[#2A2A2A] text-white font-dm-sans text-[14px] px-4 py-3 focus:outline-none focus:border-green"
              >
                <option value="image">Image (Cloudinary)</option>
                <option value="video">Video (Cloudinary/YouTube/Drive)</option>
              </select>
            </div>
            <div>
              <label className="font-barlow text-[12px] uppercase tracking-widest text-[#888888] block mb-1">URL</label>
              <input
                type="text"
                required
                placeholder="Paste link here..."
                value={formData.url}
                onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                className="w-full bg-[#1A1A1A] border border-[#2A2A2A] text-white font-dm-sans text-[14px] px-4 py-3 focus:outline-none focus:border-green"
              />
              <p className="text-[10px] text-[#555] mt-1 italic">For YouTube: Use embed URL or watch URL.</p>
            </div>
            <div>
              <label className="font-barlow text-[12px] uppercase tracking-widest text-[#888888] block mb-1">Title (Optional)</label>
              <input
                type="text"
                placeholder="e.g. Morning Session"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full bg-[#1A1A1A] border border-[#2A2A2A] text-white font-dm-sans text-[14px] px-4 py-3 focus:outline-none focus:border-green"
              />
            </div>
            <div>
              <label className="font-barlow text-[12px] uppercase tracking-widest text-[#888888] block mb-1">Grid Aspect</label>
              <select
                value={formData.aspect}
                onChange={(e) => setFormData({ ...formData, aspect: e.target.value })}
                className="w-full bg-[#1A1A1A] border border-[#2A2A2A] text-white font-dm-sans text-[14px] px-4 py-3 focus:outline-none focus:border-green"
              >
                <option value="aspect-[16/9]">Landscape (16:9)</option>
                <option value="aspect-[3/4]">Portrait (3:4)</option>
                <option value="aspect-square">Square (1:1)</option>
              </select>
            </div>
            <button
              disabled={adding}
              className="w-full bg-green text-black font-barlow font-bold text-sm uppercase tracking-widest py-3 hover:bg-[#166534] transition-colors disabled:opacity-50 mt-2"
            >
              {adding ? "ADDING..." : "ADD TO GALLERY"}
            </button>
          </form>
        </div>

        {/* List */}
        <div className="lg:col-span-2">
          {loading ? (
            <div className="flex items-center gap-2 text-[#888888] font-dm-sans"><Loader2 className="animate-spin" /> Loading gallery...</div>
          ) : items.length === 0 ? (
            <div className="text-[#888888] font-dm-sans italic">Gallery is empty. Add your first item.</div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {items.map((item: any) => (
                <div key={item._id} className="group relative bg-[#111111] border border-[#2A2A2A] aspect-square overflow-hidden">
                  {item.type === "image" ? (
                    <img src={item.url} alt={item.title} className="w-full h-full object-cover opacity-60" />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center gap-2 bg-[#0A0A0A]">
                      <Video size={32} className="text-green/40" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-4 text-center">
                    <p className="font-barlow text-[11px] uppercase tracking-widest text-[#888888] mb-2">
                      {item.type === "image" ? <ImageIcon size={14} className="inline mr-1"/> : <Video size={14} className="inline mr-1"/>}
                      {item.type}
                    </p>
                    <button onClick={() => handleDelete(item._id)} className="text-red hover:scale-110 transition-transform p-2">
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
