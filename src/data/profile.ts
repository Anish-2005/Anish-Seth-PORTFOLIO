/**
 * Who I am and how to reach me. Kept in its own small module so browser-side components
 * (nav, command palette) can use it without pulling every project write-up into the bundle.
 */
export const profile = {
  name: "Anish Seth",
  firstName: "Anish",
  role: "AI/ML Engineer",
  focus: "AI agents, LLM systems and automation",
  location: "Kolkata, India",
  timezone: "Asia/Kolkata",
  email: "anishseth0510@gmail.com",
  current: {
    title: "AI/ML Engineer Intern",
    company: "Digital Alpha",
    since: "Sep 2026",
  },
  summary:
    "I'm an AI/ML engineer who builds AI agents on AWS Bedrock that work with live financial data, using LangGraph, MCP and Nango. I care a lot about keeping them reliable, easy to debug and cheap to run. I've also been a Smart India Hackathon national finalist twice.",
  intro: [
    "I'm an AI/ML engineer from Kolkata. I build AI agents that read live financial data and act on it, so I spend a lot of my time thinking about what happens when something goes wrong.",
    "Before that, I spent three years building in public: more than 50 projects, a lot of late nights and two trips to the Smart India Hackathon national finals. My favourite part is still the moment a vague idea turns into something people actually use.",
  ],
  links: {
    github: "https://github.com/Anish-2005",
    linkedin: "https://www.linkedin.com/in/anishseth",
    x: "https://x.com/AnishSeth170734",
    instagram: "https://www.instagram.com/anishseth.in/",
    leetcode: "https://leetcode.com/u/Anish_Seth/",
    resume: "/anish-seth-resume.pdf",
  },
} as const;
