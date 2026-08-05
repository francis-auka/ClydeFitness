import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Breadcrumb from "@/components/blog/Breadcrumb";
import ArticleBody from "@/components/blog/ArticleBody";
import PostNavigation from "@/components/blog/PostNavigation";
import RelatedPosts from "@/components/blog/RelatedPosts";
import {
  getAllPosts,
  getPostBySlug,
  getRelatedPosts,
  getAdjacentPosts,
} from "@/lib/blog";
import { Calendar, Clock, User, Tag } from "lucide-react";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: "Post Not Found | Coach Clyde Fitness",
    };
  }

  const canonicalUrl = `https://www.clydefitness.co.ke/blog/${post.slug}`;

  return {
    title: post.metaTitle,
    description: post.metaDescription,
    keywords: post.keywords,
    authors: [{ name: post.author }],
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      type: "article",
      title: post.metaTitle,
      description: post.metaDescription,
      url: canonicalUrl,
      siteName: "Coach Clyde Fitness",
      publishedTime: post.publishDate,
      authors: [post.author],
      tags: post.keywords,
      images: [
        {
          url: post.featuredImage,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.metaTitle,
      description: post.metaDescription,
      images: [post.featuredImage],
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = getRelatedPosts(slug);
  const { prevPost, nextPost } = getAdjacentPosts(slug);

  const formattedDate = new Date(post.publishDate).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  // Schema.org BlogPosting JSON-LD
  const blogPostingSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.metaDescription,
    image: [post.featuredImage],
    datePublished: post.publishDate,
    dateModified: post.publishDate,
    author: {
      "@type": "Person",
      name: post.author,
      url: "https://www.clydefitness.co.ke",
    },
    publisher: {
      "@type": "Organization",
      name: "Coach Clyde Fitness",
      logo: {
        "@type": "ImageObject",
        url: "https://www.clydefitness.co.ke/opengraph-image.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://www.clydefitness.co.ke/blog/${post.slug}`,
    },
    keywords: post.keywords.join(", "),
    articleSection: post.category,
  };

  return (
    <main className="bg-[#080808] min-h-screen">
      <div className="noise-overlay" />
      <Navbar />

      {/* JSON-LD for BlogPosting */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingSchema) }}
      />

      {/* Article Header */}
      <header className="bg-[#111111] border-b border-[#2A2A2A] pt-[72px]">
        <div className="max-w-4xl mx-auto px-6 py-12 sm:py-16">
          <Breadcrumb
            items={[
              { label: "Blog", href: "/blog" },
              { label: post.category },
            ]}
          />

          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="font-barlow text-[12px] uppercase tracking-widest px-3 py-1 bg-green/10 text-green border border-green/20">
              {post.category}
            </span>
            {post.readTime && (
              <span className="font-dm-sans text-[13px] text-[#888888] flex items-center gap-1">
                <Clock size={13} />
                {post.readTime}
              </span>
            )}
          </div>

          <h1 className="font-bebas text-[48px] sm:text-[64px] lg:text-[72px] leading-[0.95] text-white mb-6">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 pt-6 border-t border-[#2A2A2A] font-dm-sans text-[14px] text-[#888888]">
            <div className="flex items-center gap-2">
              <User size={15} className="text-green" />
              <span>{post.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar size={15} className="text-green" />
              <time dateTime={post.publishDate}>{formattedDate}</time>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <article className="py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-6">
          {/* Featured Image */}
          {post.featuredImage && (
            <div className="relative aspect-[16/9] mb-12 border border-[#2A2A2A] bg-[#1A1A1A] overflow-hidden">
              <img
                src={post.featuredImage}
                alt={post.title}
                className="w-full h-full object-cover"
                loading="eager"
                fetchPriority="high"
              />
            </div>
          )}

          {/* Article Body */}
          <ArticleBody post={post} />

          {/* Keywords / Tags */}
          {post.keywords && post.keywords.length > 0 && (
            <div className="pt-8 border-t border-[#2A2A2A] mt-12">
              <div className="flex items-center gap-2 mb-3 font-barlow text-[12px] uppercase tracking-widest text-[#888888]">
                <Tag size={14} className="text-green" />
                <span>Related Topics</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {post.keywords.map((kw) => (
                  <span
                    key={kw}
                    className="border border-[#2A2A2A] font-dm-sans text-[12px] text-[#AAAAAA] px-3 py-1 bg-[#111111]"
                  >
                    {kw}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Previous / Next Navigation */}
          <PostNavigation prevPost={prevPost} nextPost={nextPost} />

          {/* Related Posts */}
          <RelatedPosts posts={relatedPosts} />
        </div>
      </article>

      <Footer />
    </main>
  );
}
