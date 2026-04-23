export interface ExternalPost {
  title: string;
  date: string;
  description: string;
  tags: string[];
  url: string;
}

export const externalPosts: ExternalPost[] = [
  {
    title: "Automating WordPress with Python and Ubuntu",
    date: "2023-06-15",
    description:
      "A Python bot that automatically posts curated content to a WordPress site on a daily schedule. Deployed on an Ubuntu server on AWS.",
    tags: ["Python", "AWS", "WordPress"],
    url: "https://wtplant.medium.com/automating-wordpress-with-python-and-ubuntu-4baca6c54bf9",
  },
];
