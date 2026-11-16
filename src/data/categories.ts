/** Project categories, small enough to ship to the browser for the project filters. */
export type ProjectCategory = "ai" | "fullstack" | "systems";

export const categoryLabels: Record<ProjectCategory, string> = {
  ai: "AI & agents",
  fullstack: "Full-stack",
  systems: "Systems & tools",
};
