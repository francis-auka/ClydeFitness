import Link from "next/link";
import { BlogPost } from "@/lib/blog/types";
import { Calendar, Clock, ArrowRight } from "lucide-react";

interface BlogCardProps {
  post: BlogPost;
}

export default function BlogCard({ post }: BlogCardProps) {
  const formattedDate = new Date(post.publishDate).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <article className="bg-[#111111] p-8 flex flex-col justify-between hover:-translate-y-1 transition-transform duration-200 group border border-[#2A2A2A] hover:border-green">
      <div>
        <div className="flex items-center justify-between gap-4 mb-4">
          <span className="font-barlow text-[11px] uppercase tracking-widest px-3 py-1 bg-green/10 text-green border border-green/20">
            {post.category}
          </span>
          {post.readTime && (
            <span className="font-dm-sans text-[12px] text-[#888888] flex items-center gap-1">
              <Clock size={12} />
              {post.readTime}
            </span>
          )}
        </div>

        {post.featuredImage && (
          <div className="relative aspect-[16/9] mb-6 overflow-hidden bg-[#1A1A1A] border border-[#2A2A2A]">
            <img
              src={post.featuredImage}
              alt={post.title}
              className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
              loading="lazy"
            />
          </div>
        )}

        <div className="flex items-center gap-2 font-dm-sans text-[13px] text-[#888888] mb-3">
          <Calendar size={13} className="text-green shrink-0" />
          <time dateTime={post.publishDate}>{formattedDate}</time>
          <span>•</span>
          <span>{post.author}</span>
        </div>

        <h3 className="font-bebas text-[28px] text-white group-hover:text-green transition-colors duration-200 leading-tight mb-3">
          <Link href={`/blog/${post.slug}`}>
            {post.title}
          </Link>
        </h3>

        <p className="font-dm-sans text-[14px] text-[#888888] line-clamp-3 mb-6 leading-relaxed">
          {post.summary}
        </p>
      </div>

      <div>
        <div className="border-t border-[#2A2A2A] mb-6" />
        <Link
          href={`/blog/${post.slug}`}
          className="inline-flex items-center gap-2 font-barlow font-bold text-xs uppercase tracking-widest text-green group-hover:text-white transition-colors duration-200"
        >
          Read Article
          <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-200" />
        </Link>
      </div>
    </article>
  );
}
