"use client";
import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Plus, Play } from "lucide-react";

export default function Gallery() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("Fetching gallery items...");
    fetch("/api/gallery", { cache: "no-store" })
      .then(res => res.json())
      .then(data => {
        console.log("Gallery items received:", data);
        setItems(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(err => {
        console.error("Gallery fetch failed:", err);
        setLoading(false);
      });
  }, []);

  const getYoutubeEmbedUrl = (url: string) => {
    if (!url) return "";
    if (url.includes("youtube.com/watch?v=")) {
      return url.replace("watch?v=", "embed/");
    }
    if (url.includes("youtu.be/")) {
      const id = url.split("/").pop();
      return `https://www.youtube.com/embed/${id}`;
    }
    return url;
  };

  return (
    <section id="gallery" className="py-24 bg-[#080808]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-12">
          <p className="eyebrow mb-2">SESSIONS IN ACTION</p>
          <div className="w-12 h-0.5 bg-green mb-6" />
          <h2 className="font-bebas text-[72px] leading-none text-white max-md:text-[48px]">
            THE WORK.
          </h2>
        </div>

        {loading ? (
          <div className="py-20 text-center font-barlow text-[#888888] uppercase tracking-widest animate-pulse">
            Loading Gallery...
          </div>
        ) : items.length === 0 ? (
          <div className="py-20 text-center font-barlow text-[#888888] uppercase tracking-widest border border-[#2A2A2A]">
            Gallery coming soon.
          </div>
        ) : (
          <div
            ref={ref}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1"
          >
            {items.map((item: any) => (
              <motion.div
                key={item._id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className={`group relative bg-[#1A1A1A] ${item.aspect || "aspect-[16/9]"} overflow-hidden border border-[#2A2A2A]`}
              >
                {item.type === "image" ? (
                  <img 
                    src={item.url} 
                    alt={item.title || "Gallery image"} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    onError={(e) => {
                      console.error("Image load failed for:", item.url);
                      (e.target as any).src = "https://via.placeholder.com/400x300?text=Error+Loading+Image";
                    }}
                  />
                ) : (
                  <div className="w-full h-full relative">
                    {(item.url || "").includes("youtube") || (item.url || "").includes("youtu.be") ? (
                      <iframe 
                        src={getYoutubeEmbedUrl(item.url)}
                        className="w-full h-full"
                        title={item.title || "Video"}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      />
                    ) : (
                      <video src={item.url} controls className="w-full h-full object-cover" />
                    )}
                  </div>
                )}
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col items-center justify-center pointer-events-none p-4">
                  <div className="w-12 h-12 border border-green flex items-center justify-center mb-2">
                    <Plus size={20} className="text-green" />
                  </div>
                  {item.title && <p className="font-barlow text-[14px] uppercase tracking-widest text-white">{item.title}</p>}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
