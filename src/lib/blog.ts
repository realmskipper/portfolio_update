import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";
import { externalPosts } from "@/../content/blog/external";

export interface BlogPost {
  title: string;
  date: string;
  description: string;
  tags: string[];
  slug: string;
  externalUrl?: string;
  content?: string;
}

const blogDir = path.join(process.cwd(), "content/blog");

export function getAllPosts(): BlogPost[] {
  const localPosts: BlogPost[] = fs
    .readdirSync(blogDir)
    .filter((f) => f.endsWith(".md"))
    .map((filename) => {
      const raw = fs.readFileSync(path.join(blogDir, filename), "utf-8");
      const { data } = matter(raw);
      return {
        title: data.title,
        date: data.date,
        description: data.description,
        tags: data.tags ?? [],
        slug: filename.replace(/\.md$/, ""),
      };
    });

  const external: BlogPost[] = externalPosts.map((p) => ({
    ...p,
    slug: "",
    externalUrl: p.url,
  }));

  return [...localPosts, ...external].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export async function getPostBySlug(
  slug: string
): Promise<BlogPost | null> {
  const filePath = path.join(blogDir, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content: md } = matter(raw);
  const html = await marked.parse(md);

  return {
    title: data.title,
    date: data.date,
    description: data.description,
    tags: data.tags ?? [],
    slug,
    content: html,
  };
}

export function getAllSlugs(): string[] {
  return fs
    .readdirSync(blogDir)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""));
}
