import Image from "next/image";
import ProjectCard from "@/components/ProjectCard";

const projects = [
  {
    title: "This Website",
    description:
      "Consolidated five separate deployments — a Django app on AWS Lightsail, a Streamlit dashboard on EC2, and a chatbot on Azure — into this single Next.js application on Vercel. Reduced hosting costs from ~$30/month to $0.",
    migration: "Previously: Django/Lightsail + Streamlit/EC2 + Azure → Now: Next.js on Vercel",
    tags: ["Next.js", "React", "Tailwind CSS", "Vercel"],
    image: "/images/dp.jpg",
  },
  {
    title: "Chat Assistant",
    description:
      "An AI-powered chat assistant built with the OpenAI API. Supports streaming responses and conversation history. Now runs as a serverless API route within this site instead of a standalone Azure deployment.",
    migration: "Previously: Azure deployment → Now: Next.js API route on Vercel",
    tags: ["OpenAI API", "Next.js API Routes", "React"],
    href: "/chat",
  },
  {
    title: "Live From the Blockchain",
    description:
      "Real-time Ethereum blockchain data dashboard displaying block height, gas prices, and cryptocurrency market data. Pulls data from Ethereum JSON RPC and CoinMarketCap APIs. Migrated from a Streamlit app running in Docker on EC2.",
    migration: "Previously: Streamlit + Docker on EC2 → Now: React route on Vercel",
    tags: ["React", "Ethereum JSON RPC", "CoinMarketCap API"],
    href: "/blockchain",
    image: "/images/xblocklogos.svg",
  },
  {
    title: "Truisms App",
    description:
      "A React application that serves axioms from Jenny Holzer's Truisms — an iconic series of provocative one-liners exploring themes of power, belief, and human nature. Deployed on GitHub Pages.",
    tags: ["React", "GitHub Pages"],
    href: "https://wplant.github.io/truisms-app/",
    external: true,
    image: "/images/img_2.jpg",
  },
  {
    title: "Automation with Python",
    description:
      "A Python bot that automatically posts curated content to a WordPress site on a daily schedule. Deployed on an Ubuntu server on AWS.",
    tags: ["Python", "AWS", "WordPress"],
    href: "https://medium.com/@wtplant",
    external: true,
    image: "/images/AE.JPG",
  },
  {
    title: "Edible Dialect",
    description:
      "An aggregate food review site that compiled and curated restaurant reviews across New York City. Built with WordPress and custom HTML/CSS. Now archived.",
    tags: ["HTML", "CSS", "WordPress"],
    href: "https://web.archive.org/web/2023/https://edibledialectic.com/",
    external: true,
    image: "/images/edible.JPG",
  },
];

export default function Home() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-16 md:py-24">
      {/* Intro */}
      <section className="mb-16 flex flex-col md:flex-row items-center gap-8 md:gap-12">
        <div className="relative shrink-0 overflow-hidden rounded-lg w-full md:w-72 lg:w-80">
          <Image
            src="/images/x1939.png"
            alt="William Plant"
            width={640}
            height={800}
            className="w-full h-auto rounded-lg"
            sizes="(max-width: 768px) 100vw, 320px"
            priority
          />
        </div>
        <div className="flex-1 text-center md:text-left">
          <h1 className="neon-sign text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            William
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-body">
            I build things for the web. This site itself is a project — I migrated a
            Django app on AWS Lightsail, a Streamlit dashboard on EC2, and a chatbot
            on Azure into this single Next.js application on Vercel.
          </p>
        </div>
      </section>

      {/* Projects */}
      <section>
        <h2 className="mb-8 text-sm font-semibold uppercase tracking-widest text-muted">
          Projects
        </h2>
        <div className="flex flex-col gap-16 md:gap-24">
          {projects.map((project, i) => (
            <ProjectCard key={project.title} {...project} index={i} />
          ))}
        </div>
      </section>
    </main>
  );
}
