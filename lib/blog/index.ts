import { BlogPost } from "./types";
import { post as bestPersonalTrainerKilimani } from "./posts/best-personal-trainer-kilimani";

const posts: BlogPost[] = [
  bestPersonalTrainerKilimani,
];

export function getAllPosts(): BlogPost[] {
  return posts
    .filter((post) => post.status === "published")
    .sort(
      (a, b) =>
        new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
    );
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return posts.find((post) => post.slug === slug && post.status === "published");
}

export function getRelatedPosts(currentSlug: string, limit = 3): BlogPost[] {
  const currentPost = getPostBySlug(currentSlug);
  if (!currentPost) return [];

  const allPosts = getAllPosts().filter((p) => p.slug !== currentSlug);
  
  // Prefer same category, then fallback to recent
  const sameCategory = allPosts.filter(
    (p) => p.category === currentPost.category
  );
  const otherPosts = allPosts.filter(
    (p) => p.category !== currentPost.category
  );

  return [...sameCategory, ...otherPosts].slice(0, limit);
}

export function getAdjacentPosts(currentSlug: string): {
  prevPost?: BlogPost;
  nextPost?: BlogPost;
} {
  const allPosts = getAllPosts();
  const index = allPosts.findIndex((p) => p.slug === currentSlug);

  if (index === -1) return {};

  return {
    // Newer post is at index - 1 because sorted descending by date
    nextPost: index > 0 ? allPosts[index - 1] : undefined,
    // Older post is at index + 1
    prevPost: index < allPosts.length - 1 ? allPosts[index + 1] : undefined,
  };
}
