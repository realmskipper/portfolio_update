import ProjectCard from "@/components/ProjectCard";

const projects = [
  {
    title: "Reikin",
    description:
      "A real estate intelligence platform for New York City. Search any NYC address to get an instant building health score (A-F grade) based on DOB violations, HPD violations, 311 complaints, and active permits across 1M+ properties. Includes free tools like a Rent Stabilization Checker, Broker Fee Calculator, and Rent Increase Checker.",
    tags: ["Next.js", "Tailwind CSS", "Vercel", "Cloudflare"],
    href: "https://www.reikin.app/",
    external: true,
    image: "/images/reikin.png",
  },
  {
    title: "This Website",
    description:
      "Consolidated five separate deployments — a Django app on AWS Lightsail, a Streamlit dashboard on EC2, and a chatbot on Azure — into this single Next.js application on Vercel. Reduced hosting costs from ~$30/month to $0.",
    migration: "Previously: Django/Lightsail + Streamlit/EC2 + Azure → Now: Next.js on Vercel",
    tags: ["Claude Code"],
    image: "/images/thiswebsite.png",
    brighten: true,
  },
  {
    title: "Chat Assistant",
    description:
      "An AI-powered chat assistant built with the OpenAI API. Supports streaming responses and conversation history. Now runs as a serverless API route within this site instead of a standalone Azure deployment.",
    migration: "Previously: Azure deployment → Now: Next.js API route on Vercel",
    tags: ["OpenAI API", "Next.js API Routes", "React"],
    href: "/chat",
    image: "/images/x1939.png",
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
    href: "https://wtplant.github.io/truisms/",
    external: true,
    image: "/images/img_2.jpg",
  },
  {
    title: "Automation with Python",
    description:
      "A Python bot that automatically posts curated content to a WordPress site on a daily schedule. Deployed on an Ubuntu server on AWS.",
    tags: ["Python", "AWS", "WordPress"],
    href: "https://wtplant.medium.com/automating-wordpress-with-python-and-ubuntu-4baca6c54bf9",
    external: true,
    image: "/images/AE.JPG",
  },
  {
    title: "Edible Dialect",
    description:
      "An aggregate food review site that compiled and curated restaurant reviews across New York City. Built with WordPress and custom HTML/CSS. Now archived.",
    tags: ["HTML", "CSS", "WordPress"],
    href: "https://web.archive.org/web/20231202225034/http://www.edibledialect.com/",
    external: true,
    image: "/images/edible.JPG",
  },
];

export default function Home() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-16 md:py-24">
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
