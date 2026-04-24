import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About | William Plant",
  description: "William Plant's background, experience, and resume.",
};

const resumeHref = "/resume.pdf";
const resumeEmbedHref = `${resumeHref}#pagemode=none`;

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-16 md:py-24">
      <h1 className="text-3xl font-bold text-heading">About</h1>

      <div className="mt-10 project-card overflow-hidden">
        <object
          data={resumeEmbedHref}
          type="application/pdf"
          className="h-[85vh] w-full"
          aria-label="William Plant resume"
        >
          <div className="p-6 text-sm text-muted">
            Your browser can&apos;t display PDFs inline.{" "}
            <a href={resumeHref} className="text-accent hover:underline">
              Download the resume
            </a>{" "}
            instead.
          </div>
        </object>
      </div>
    </main>
  );
}
