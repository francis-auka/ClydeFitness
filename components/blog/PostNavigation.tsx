import Link from "next/link";
import { BlogPost } from "@/lib/blog/types";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface PostNavigationProps {
  prevPost?: BlogPost;
  nextPost?: BlogPost;
}

export default function PostNavigation({
  prevPost,
  nextPost,
}: PostNavigationProps) {
  if (!prevPost && !nextPost) return null;

  return (
    <nav
      aria-label="Post navigation"
      className="grid grid-cols-1 md:grid-cols-2 gap-4 my-12 pt-8 border-t border-[#2A2A2A]"
    >
      {prevPost ? (
        <Link
          href={`/blog/${prevPost.slug}`}
          className="bg-[#111111] p-6 border border-[#2A2A2A] hover:border-green transition-colors duration-200 group flex flex-col justify-between"
        >
          <span className="font-barlow text-[11px] uppercase tracking-widest text-[#888888] flex items-center gap-1.5 mb-2">
            <ArrowLeft size={13} className="text-green group-hover:-translate-x-1 transition-transform" />
            Previous Article
          </span>
          <span className="font-bebas text-[20px] text-white group-hover:text-green transition-colors line-clamp-2">
            {prevPost.title}
          </span>
        </Link>
      ) : (
        <div />
      )}

      {nextPost ? (
        <Link
          href={`/blog/${nextPost.slug}`}
          className="bg-[#111111] p-6 border border-[#2A2A2A] hover:border-green transition-colors duration-200 group flex flex-col justify-between md:text-right"
        >
          <span className="font-barlow text-[11px] uppercase tracking-widest text-[#888888] flex items-center justify-end gap-1.5 mb-2">
            Next Article
            <ArrowRight size={13} className="text-green group-hover:translate-x-1 transition-transform" />
          </span>
          <span className="font-bebas text-[20px] text-white group-hover:text-green transition-colors line-clamp-2">
            {nextPost.title}
          </span>
        </Link>
      ) : (
        <div />
      )}
    </nav>
  );
}
