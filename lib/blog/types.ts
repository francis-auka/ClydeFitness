export interface BlogPost {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  featuredImage: string;
  category: string;
  keywords: string[];
  status: "published" | "draft";
  author: string;
  publishDate: string; // ISO date string YYYY-MM-DD
  readTime?: string;
  summary: string;
  content: {
    type: "paragraph" | "heading2" | "heading3" | "list";
    text?: string;
    items?: string[];
  }[];
  faq?: {
    question: string;
    answer: string;
  }[];
}
