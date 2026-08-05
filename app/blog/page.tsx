import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import BlogCard from "@/components/blog/BlogCard";
import Breadcrumb from "@/components/blog/Breadcrumb";
import { getAllPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Fitness Blog & Insights | Coach Clyde Fitness Nairobi",
  description:
    "Expert fitness advice, personal training tips, workout guides, HIIT, boxing, and nutrition guidance from Coach Clyde Fitness in Nairobi, Kenya.",
  keywords: [
    "fitness blog Nairobi",
    "personal training tips Kenya",
    "boxing training guide",
    "HIIT workout blog",
    "Coach Clyde articles",
  ],
  alternates: {
    canonical: "https://www.clydefitness.co.ke/blog",
  },
  openGraph: {
    title: "Fitness Blog & Insights | Coach Clyde Fitness Nairobi",
    description:
      "Expert fitness advice, personal training tips, workout guides, and nutrition guidance from Coach Clyde Fitness.",
    url: "https://www.clydefitness.co.ke/blog",
    type: "website",
  },
};

export default function BlogListingPage() {
  const posts = getAllPosts();

  return (
    <main className="bg-[#080808] min-h-screen">
      <div className="noise-overlay" />
      <Navbar />

      {/* Page header */}
      <section className="bg-[#111111] border-b border-[#2A2A2A] pt-[72px]">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <Breadcrumb items={[{ label: "Blog" }]} />
          <p className="eyebrow mb-2">FITNESS INSIGHTS & ARTICLES</p>
          <div className="w-12 h-0.5 bg-green mb-6" />
          <h1 className="font-bebas text-[72px] sm:text-[88px] leading-none text-white max-md:text-[48px]">
            TRAIN HARD. STAY INFORMED.
          </h1>
          <p className="font-dm-sans text-[16px] text-[#888888] leading-[1.7] mt-4 max-w-2xl">
            Explore expert workout guides, personal training advice, weight loss tips, and nutrition insights from Coach Clyde Fitness in Nairobi.
          </p>
        </div>
      </section>

      {/* Articles grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          {posts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <p className="font-dm-sans text-[#888888] text-lg">
                No blog articles published yet. Check back soon!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
