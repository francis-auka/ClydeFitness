import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Plus, Play } from "lucide-react";

export default function Gallery() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/gallery")
      .then(res => res.json())
      .then(data => {
        setItems(data);
        setLoading(false);
      });
  }, []);

  const getYoutubeEmbedUrl = (url: string) => {
    if (url.includes("youtube.com/watch?v=")) {
      return url.replace("watch?v=", "embed/");
    }
    if (url.includes("youtu.be/")) {
      return url.replace("youtu.be/", "youtube.com/embed/");
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
          <div className="py-20 text-center font-barlow text-[#888888] uppercase tracking-widest">
            Gallery coming soon.
          </div>
        ) : (
          <motion.div
            ref={ref}
            initial="hidden"
            animate={inView ? "show" : "hidden"}
            variants={{ show: { transition: { staggerChildren: 0.08 } } }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-[#2A2A2A]"
          >
            {items.map((item: any, i) => (
              <motion.div
                key={item._id}
                variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: 0.4 } } }}
                className={`group relative bg-[#1A1A1A] ${item.aspect || "aspect-[16/9]"} overflow-hidden`}
              >
                {item.type === "image" ? (
                  <img src={item.url} alt={item.title || "Gallery image"} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                ) : (
                  <div className="w-full h-full relative">
                    {item.url.includes("youtube") || item.url.includes("youtu.be") ? (
                      <iframe 
                        src={getYoutubeEmbedUrl(item.url)}
                        className="w-full h-full pointer-events-none"
                        title={item.title || "Video"}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      />
                    ) : (
                      <video src={item.url} className="w-full h-full object-cover" />
                    )}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/0 transition-colors">
                      <div className="w-16 h-16 bg-green text-black rounded-full flex items-center justify-center shadow-2xl scale-90 group-hover:scale-110 transition-transform">
                        <Play size={24} fill="currentColor" />
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Hover overlay for Images */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center pointer-events-none">
                  <div className="w-16 h-16 border-2 border-green flex items-center justify-center scale-75 group-hover:scale-100 transition-transform duration-200">
                    <Plus size={24} className="text-green" />
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}
