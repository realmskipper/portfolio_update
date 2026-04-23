"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useEffect, useState } from "react";

interface ProjectCardProps {
  title: string;
  description: string;
  migration?: string;
  tags: string[];
  href?: string;
  external?: boolean;
  image?: string;
  index?: number;
  brighten?: boolean;
}

export default function ProjectCard({
  title,
  description,
  migration,
  tags,
  href,
  external,
  image,
  index = 0,
  brighten,
}: ProjectCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  const isLeft = index % 2 === 0;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const content = (
    <div className="project-card p-6 md:p-8">
      <div className={`group flex flex-col ${isLeft ? "md:flex-row" : "md:flex-row-reverse"} gap-6 items-start`}>
        {image ? (
          <div className="relative shrink-0 overflow-hidden rounded-xl w-full md:w-56 lg:w-64 aspect-video md:aspect-[4/3] bg-surface flex items-center justify-center">
            <Image
              src={image}
              alt={title}
              fill
              className={`object-contain transition-transform duration-300 group-hover:scale-[1.02] ${brighten ? "brightness-125 contrast-105" : ""}`}
              sizes="(max-width: 768px) 100vw, 256px"
            />
          </div>
        ) : (
          <div className="relative shrink-0 overflow-hidden rounded-xl w-full md:w-56 lg:w-64 aspect-video md:aspect-[4/3] bg-surface flex items-center justify-center">
            <svg className="h-16 w-16 text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <h3 className="text-2xl font-semibold text-heading group-hover:text-accent transition-colors">
              {title}
            </h3>
            {href && (
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
          <p className="mt-4 text-base leading-relaxed text-body">{description}</p>
          {migration && (
            <p className="mt-2 text-xs text-muted italic">{migration}</p>
          )}
          <div className="mt-6 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-accent/15 px-4 py-1.5 text-xs font-medium text-blue-300 border border-accent/30"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const slideFrom = isLeft ? "-translate-x-24" : "translate-x-24";

  const wrapper = (children: React.ReactNode) => (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out ${
        visible
          ? "opacity-100 translate-x-0 translate-y-0 scale-100"
          : `opacity-0 ${slideFrom} translate-y-8 scale-95`
      }`}
    >
      {children}
    </div>
  );

  if (!href) return wrapper(content);

  if (external) {
    return wrapper(
      <a href={href} target="_blank" rel="noopener noreferrer">
        {content}
      </a>
    );
  }

  return wrapper(<Link href={href}>{content}</Link>);
}
