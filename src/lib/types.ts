export type Project = {
  id: string;
  title: string;
  tagline: string;
  period: string;
  stack: string[];
  links: { label: string; href: string }[];
  highlights: string[];
  body: string;
};

export type Note = {
  slug: string;
  title: string;
  date: string;
  summary: string;
  body: string;
};
