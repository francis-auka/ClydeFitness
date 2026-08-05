import { BlogPost } from "@/lib/blog/types";
import BlogCard from "./BlogCard";

interface RelatedPostsProps {
  posts: BlogPost[];
}

export default function RelatedPosts({ posts }: RelatedPostsProps) {
  if (posts.length === 0) return null;

  return (
    <section className="py-12 border-t border-[#2A2A2A] mt-16">
      <div className="mb-8">
        <p className="eyebrow mb-2">CONTINUE READING</p>
        <div className="w-12 h-0.5 bg-green mb-4" />
        <h2 className="font-bebas text-[36px] sm:text-[48px] text-white leading-none">
          RELATED ARTICLES
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </div>
    </section>
  );
}
