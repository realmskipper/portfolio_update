import { getPostBySlug, getAllSlugs } from "@/lib/blog";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};
  return { title: `${post.title} | William Plant`, description: post.description };
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  return (
    <main className="mx-auto max-w-3xl px-6 py-16 md:py-24">
      <Link
        href="/blog"
        className="text-sm text-muted hover:text-accent transition-colors"
      >
        &larr; Back to Blog
      </Link>
      <h1 className="mt-6 text-3xl font-bold text-heading">{post.title}</h1>
      <p className="mt-2 text-xs text-muted">
        {new Date(post.date).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
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
      <article
        className="prose mt-10"
        dangerouslySetInnerHTML={{ __html: post.content! }}
      />
    </main>
  );
}
