import { getAllPosts } from "@/lib/blog";
import BlogCard from "@/components/BlogCard";

export const metadata = {
  title: "Blog | William Plant",
  description: "Posts about software engineering, automation, and web development.",
};

export default function BlogIndex() {
  const posts = getAllPosts();

  return (
    <main className="mx-auto max-w-5xl px-6 py-16 md:py-24">
      <h1 className="text-3xl font-bold text-heading">Blog</h1>
      <p className="mt-2 text-sm text-muted">
        Thoughts on engineering, projects, and the web.
      </p>
      <div className="mt-10 flex flex-col gap-6">
        {posts.map((post) => (
          <BlogCard key={post.slug || post.externalUrl} post={post} />
        ))}
      </div>
    </main>
  );
}
