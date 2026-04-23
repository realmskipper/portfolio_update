import Link from "next/link";
import type { BlogPost } from "@/lib/blog";

export default function BlogCard({ post }: { post: BlogPost }) {
  const inner = (
    <div className="project-card p-6 group">
      <div className="flex items-start justify-between">
        <h3 className="text-xl font-semibold text-heading group-hover:text-accent transition-colors">
          {post.title}
        </h3>
        {post.externalUrl && (
          <svg
            className="mt-1 h-4 w-4 shrink-0 text-muted transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 17L17 7M17 7H7M17 7v10"
            />
          </svg>
        )}
      </div>
      <p className="mt-1 text-xs text-muted">
        {new Date(post.date).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </p>
      <p className="mt-3 text-sm leading-relaxed text-body">
        {post.description}
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        {post.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-accent/15 px-4 py-1.5 text-xs font-medium text-blue-300 border border-accent/30"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );

  if (post.externalUrl) {
    return (
      <a href={post.externalUrl} target="_blank" rel="noopener noreferrer">
        {inner}
      </a>
    );
  }

  return <Link href={`/blog/${post.slug}`}>{inner}</Link>;
}
