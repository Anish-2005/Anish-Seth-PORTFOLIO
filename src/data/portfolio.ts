/**
 * All the words on the site live here.
 * Facts come from the Nov 2026 résumé and public GitHub (github.com/Anish-2005).
 * Voice: first person, plain words, specific, a little playful. No buzzwords.
 */

import { categoryLabels, type ProjectCategory } from "./categories";
import { profile } from "./profile";

export { categoryLabels, type ProjectCategory };

export type ArtKind =
  | "graph"
  | "shield"
  | "chart"
  | "map"
  | "funnel"
  | "flow"
  | "pulse"
  | "layers"
  | "terminal"
  | "network"
  | "doc"
  | "tree"
  | "eye"
  | "threads";

export type Project = {
  slug: string;
  title: string;
  kicker: string;
  summary: string;
  year: string;
  categories: ProjectCategory[];
  featured?: boolean;
  badge?: string;
  stack: string[];
  problem: string;
  approach: string[];
  outcomes: string[];
  links: { github?: string; live?: string };
  art: ArtKind;
};

export { profile };

/** Snapshot used when the GitHub APIs are unreachable at build time. */
export const githubSnapshot = {
  username: "Anish-2005",
  publicRepos: 78,
  followers: 25,
  totalStars: 30,
  contributionsLastYear: 3842,
  contributionsByYear: { "2023": 20, "2024": 179, "2025": 2474, "2026": 2984 } as Record<string, number>,
  languages: [
    { name: "TypeScript", count: 28 },
    { name: "JavaScript", count: 23 },
    { name: "HTML", count: 7 },
    { name: "CSS", count: 6 },
    { name: "Dart", count: 3 },
    { name: "Python", count: 2 },
    { name: "Java", count: 2 },
    { name: "C", count: 2 },
  ],
};

export const heroStats = [
  { value: "4×", label: "National finalist · SIH & IDE" },
  { value: "50+", label: "Projects shipped" },
] as const;

export const principles = [
  {
    title: "Plan for the bad day",
    body: "Retries happen and models return junk. Approval steps, schema checks and idempotency keys mean a retry never pays the same invoice twice.",
    icon: "shield",
  },
  {
    title: "Log everything",
    body: "Every run writes structured logs and records what it cost. When something breaks, I want to know why in minutes, not hours.",
    icon: "activity",
  },
  {
    title: "Test the weird cases",
    body: "Happy paths are easy. I write tests for retries, broken model output and runs that stop halfway, because that's where the bugs live.",
    icon: "flask",
  },
  {
    title: "Watch the bill",
    body: "Tokens cost real money. I choose models and tool calls with the budget in mind and track cost per run like any other number.",
    icon: "gauge",
  },
] as const;

export type ExperienceItem = {
  role: string;
  company: string;
  period: string;
  type: string;
  summary: string;
  bullets: string[];
  stack: string[];
  current?: boolean;
  /** Longer write-ups about this work. */
  writeups?: { title: string; href: string }[];
};

export const experience: ExperienceItem[] = [
  {
    role: "AI/ML Engineer Intern",
    company: "Digital Alpha",
    period: "Sep 2026 to now",
    type: "Internship",
    current: true,
    summary: "Building AI agents that work with live financial data.",
    bullets: [
      "Built agent workflows and financial data pipelines in Python on AWS Bedrock and AgentCore.",
      "Built LLM agents that call MCP tool servers and reach company systems through Nango, so they can work with live financial data.",
      "Added approval steps, schema checks and idempotency keys so an agent can't create the same transaction twice.",
      "Set up CloudWatch logging, cost tracking per run, and tests for the messy cases: retries, broken model output and runs that fail halfway.",
    ],
    stack: ["Python", "AWS Bedrock", "AgentCore", "MCP", "Nango", "CloudWatch", "Boto3"],
    writeups: [
      { title: "Making AI agents safe to retry", href: "/notes/safe-to-retry-ai-agents" },
      { title: "What did my agent just do, and what did it cost?", href: "/notes/agent-observability-and-cost" },
    ],
  },
  {
    role: "Open source, side projects and hackathons",
    company: "On my own",
    period: "2023 to now",
    type: "Self-directed",
    summary: "Building things in public since 2023.",
    bullets: [
      "Built more than 25 full-stack and AI apps, and shipped 50+ projects across 78 public repositories.",
      "Made 3,800+ GitHub contributions in the last year, on everything from AI pipelines to a Git clone written in Java.",
      "Reached the Smart India Hackathon national finals twice (2024 and 2025) and the IDE Bootcamp national finals twice in 2026 (Phase 1 in April, Phase 3 in May), plus the Hack4Bengal 2025 finals.",
    ],
    stack: ["TypeScript", "Next.js", "FastAPI", "Django", "n8n", "Gemini", "Neo4j"],
  },
];

export const leadership = [
  { role: "Google Student Ambassador", org: "Techno Main Salt Lake", period: "Jul to Nov 2026" },
  { role: "GeeksforGeeks Campus Lead", org: "Techno Main Salt Lake", period: "Jan to Jun 2026" },
  { role: "Outreach Head", org: "Samarth, the educational society at TMSL", period: "Ongoing" },
  { role: "Organiser, EDUC-A-THON", org: "A hackathon about education", period: "2025" },
] as const;

export type SkillGroup = {
  id: string;
  title: string;
  blurb: string;
  icon: string;
  items: string[];
  span?: "wide";
};

export const skillGroups: SkillGroup[] = [
  {
    id: "agentic",
    title: "AI agents & LLMs",
    blurb: "Agents that use tools, check their own work and ask a person before doing anything risky.",
    icon: "spark",
    span: "wide",
    items: [
      "LangGraph",
      "LangChain",
      "AWS Bedrock",
      "AgentCore",
      "MCP",
      "Tool Calling",
      "Multi-Agent Orchestration",
      "Claude",
      "Gemini API",
      "Prompt Engineering",
      "LLM Integration",
      "NLP",
    ],
  },
  {
    id: "rag",
    title: "RAG & knowledge graphs",
    blurb: "Getting answers out of documents and graphs without making things up.",
    icon: "graph",
    items: ["RAG", "GraphRAG", "Knowledge Graphs", "Neo4j", "Cypher", "OCR"],
  },
  {
    id: "cloud",
    title: "AWS & cloud",
    blurb: "Where most of my agents live, with logging and cost tracking switched on.",
    icon: "cloud",
    items: ["Bedrock", "AgentCore", "S3", "CloudWatch", "Boto3", "Docker", "CI/CD", "Vercel"],
  },
  {
    id: "automation",
    title: "Integrations & automation",
    blurb: "Plugging agents into the tools teams already use every day.",
    icon: "plug",
    items: ["Nango", "MCP Servers", "REST APIs", "Webhooks", "n8n", "Zapier"],
  },
  {
    id: "product",
    title: "Full-stack",
    blurb: "Everything around the AI: APIs, web apps and the odd mobile app.",
    icon: "layers",
    span: "wide",
    items: [
      "Next.js",
      "React",
      "TypeScript",
      "Node.js",
      "FastAPI",
      "Django",
      "ASP.NET Core",
      "React Native",
      "Flutter",
      "Tailwind CSS",
      "GraphQL",
      "WebSockets",
    ],
  },
  {
    id: "languages",
    title: "Languages & data",
    blurb: "Python for AI and data, Java for systems, TypeScript for the web.",
    icon: "code",
    items: ["Python", "Pandas", "NumPy", "Java", "TypeScript", "JavaScript", "SQL", "C++", "EDA"],
  },
  {
    id: "data",
    title: "Databases",
    blurb: "Tables, documents or graphs, depending on the problem.",
    icon: "database",
    items: ["PostgreSQL", "MongoDB", "Neo4j", "Supabase", "Firebase", "SQL Server"],
  },
  {
    id: "core",
    title: "CS basics",
    blurb: "The stuff from college that turns out to matter every single day.",
    icon: "cpu",
    items: ["Data Structures & Algorithms", "OOP", "DBMS", "Operating Systems", "Computer Networks", "System Design"],
  },
];

export const projects: Project[] = [
  {
    slug: "graphrag-knowledge-graph",
    title: "GraphRAG Knowledge Agent",
    kicker: "AI agents · Knowledge graphs",
    summary: "An agent that reads plain text, turns it into a Neo4j knowledge graph, then answers questions about it in normal language.",
    year: "2026",
    categories: ["ai"],
    featured: true,
    stack: ["n8n", "Gemini", "Neo4j", "Cypher"],
    problem:
      "Vector search is great at finding similar text and bad at questions that hop across relationships, like “who supplies the companies this group owns?”. I wanted answers that follow real connections instead of guessing.",
    approach: [
      "Gemini pulls people, companies and the links between them out of the text. Everything is checked against a schema before it's saved to Neo4j.",
      "To answer a question, the agent writes a Cypher query, runs it on the graph and explains the result in plain English.",
      "Generated queries are read-only, and every step has validation and error handling, so a bad query can't damage the graph.",
    ],
    outcomes: ["Answers that follow real relationships", "Read-only queries by design", "Errors caught at every step"],
    links: {},
    art: "graph",
  },
  {
    slug: "scam-detection-agent",
    title: "Scam-Detection Agent",
    kicker: "AI agents · Online safety",
    summary: "A bot that checks suspicious messages for phishing and UPI or OTP scams, then explains the risk in simple Hindi or English.",
    year: "2026",
    categories: ["ai"],
    featured: true,
    stack: ["n8n", "Gemini 1.5 Flash", "Telegram", "Airtable"],
    problem:
      "A lot of UPI and OTP scams arrive in Hindi or other regional languages, where normal spam filters struggle. People also rarely get told why a message is dangerous.",
    approach: [
      "Messages come in through Telegram. The agent works out the language and sends the message to Gemini for a closer look.",
      "Each message gets a risk score, a scam type and a short explanation anyone can follow.",
      "Results go into Airtable with a regular trend report, and the same flow can plug into WhatsApp or Slack.",
    ],
    outcomes: ["A risk score with a reason", "Works in Hindi and English", "A regular look at new scam patterns"],
    links: {},
    art: "shield",
  },
  {
    slug: "financer",
    title: "Financer",
    kicker: "Personal finance · AI advisor",
    summary: "A personal finance app with an AI advisor, live stock analysis and dashboards that explain risk, cash flow and returns.",
    year: "2025",
    categories: ["ai", "fullstack"],
    featured: true,
    stack: ["FastAPI", "MongoDB", "React", "Gemini", "Python"],
    problem:
      "Most money apps tell you what you spent. Very few help you decide what to do next, or explain risk and tax in a way that makes sense.",
    approach: [
      "A FastAPI and MongoDB backend with models for your portfolio, the market, cash flow, volatility and risk.",
      "Scenario tools for tax, inflation-adjusted returns and “what if I change this?” questions.",
      "React dashboards with charts, filters and reports you can export, plus a Gemini advisor you can chat with about the numbers.",
    ],
    outcomes: ["From raw numbers to a report you can download", "Tax and inflation scenarios", "An advisor that explains itself"],
    links: {
      github: "https://github.com/Anish-2005/Financer",
      live: "https://financer-nexus.vercel.app",
    },
    art: "chart",
  },
  {
    slug: "vanmitra",
    title: "VanMitra",
    kicker: "OCR · Maps · Public policy",
    summary: "Turns scanned Forest Rights Act records into data, puts them on a map and helps officials see where help is needed.",
    year: "2025",
    categories: ["ai", "fullstack"],
    featured: true,
    stack: ["Next.js", "Django", "PostgreSQL", "OCR", "Machine Learning", "GeoJSON"],
    problem:
      "Forest-rights claims mostly exist as scanned paper. They're slow to check and almost impossible to compare between regions.",
    approach: [
      "OCR pipelines read and clean the scanned records, so nobody has to type them in by hand.",
      "Simple statistics and ML checks flag records that look unusual, which speeds up checking claims.",
      "Map dashboards backed by PostgreSQL show claim status and land use for each region.",
    ],
    outcomes: ["100+ paper records turned into data", "Odd-looking claims flagged early", "Live dashboards by region"],
    links: {
      github: "https://github.com/Anish-2005/VanMitra",
      live: "https://vanmitra.vercel.app",
    },
    art: "map",
  },
  {
    slug: "lead-scoring-pipeline",
    title: "Lead Scoring Pipeline",
    kicker: "LLMs · Sales automation",
    summary: "Takes raw sales leads, scores how good a fit each one is from 0 to 100, writes down why, and creates the deal in HubSpot.",
    year: "2026",
    categories: ["ai"],
    stack: ["Zapier", "Airtable", "HubSpot", "Webhooks"],
    problem:
      "Sales teams often sort leads on gut feeling. The rules drift over time, and nobody can say why a lead was marked as hot.",
    approach: [
      "A webhook brings leads in. They're cleaned up and compared with a scoring guide stored in Airtable.",
      "Each lead gets a score, an A, B or C grade and a short written reason. The deal is created in HubSpot automatically.",
      "Next on the list: different paths for each grade, and a weekly check against won and lost deals that adjusts the scoring guide.",
    ],
    outcomes: ["Grades you can explain", "No typing deals into the CRM", "Scoring that gets better over time"],
    links: {},
    art: "funnel",
  },
  {
    slug: "nyantra",
    title: "Nyantra",
    kicker: "Government services",
    summary: "Applications, payments and complaints for Direct Benefit Transfer support in one place, with dashboards for officers and an app for citizens.",
    year: "2025",
    categories: ["fullstack"],
    badge: "SIH 2025 national finalist",
    stack: ["Next.js", "TypeScript", "Flutter", "Firebase", "SQL"],
    problem:
      "Relief for victims under the SC/ST (Prevention of Atrocities) Act still moves through paper and phone calls. Applicants lose track, and officers can't see where cases get stuck.",
    approach: [
      "Mapped out every step an application goes through, from payment to complaint, so officers can report on it easily.",
      "Built officer dashboards that show payment trends and where cases are getting stuck.",
      "Built a Flutter app for citizens that works offline, for areas with patchy internet.",
    ],
    outcomes: ["National finalist at Smart India Hackathon 2025", "Web platform plus an offline app", "A clear view of payments for officers"],
    links: {
      github: "https://github.com/Anish-2005/Nyantra",
      live: "https://nyantra.vercel.app",
    },
    art: "flow",
  },
  {
    slug: "traceveil",
    title: "Traceveil",
    kicker: "Fraud detection",
    summary: "Spots fraud from how people behave: dodgy transactions, bot rings and exam cheating, with answers in under 50 milliseconds.",
    year: "2026",
    categories: ["ai"],
    stack: ["TypeScript", "LSTM", "Autoencoders", "Anomaly Detection"],
    problem:
      "Fraud signals are scattered across payments, sessions and behaviour, and you only get a few milliseconds to decide.",
    approach: [
      "LSTM and autoencoder models score how unusual the behaviour looks across different kinds of signals.",
      "The scoring is built to be fast, with a target of under 50ms per decision.",
      "Monitoring was part of the plan from the start, for payment risk, bots and exam integrity.",
    ],
    outcomes: ["Decisions in under 50ms", "One system for three kinds of fraud", "Monitoring built in"],
    links: { github: "https://github.com/Anish-2005/Traceveil" },
    art: "pulse",
  },
  {
    slug: "archscope",
    title: "ArchScope",
    kicker: "Developer tools · AI",
    summary: "Point it at a repository and it tells you what your stack is made of, what looks risky and which team rules are being broken.",
    year: "2026",
    categories: ["ai", "systems"],
    stack: ["TypeScript", "GitHub API", "CLI", "LLMs"],
    problem: "Engineering leads often don't know what's actually running across their repos, or which choices will hurt later.",
    approach: [
      "Scans a repository and builds a picture of its tech stack and the risks in it.",
      "Checks the code against the team's rules and shows exactly where they're broken.",
      "Writes a short summary of the architecture that non-engineers can read.",
    ],
    outcomes: ["Your stack at a glance", "Rule checks with proof", "Summaries anyone can read"],
    links: {
      github: "https://github.com/Anish-2005/ArchScope",
      live: "https://archscope.vercel.app",
    },
    art: "layers",
  },
  {
    slug: "whystack",
    title: "WhyStack",
    kicker: "Debugging · Incident review",
    summary: "Reads logs, metrics and traces and tells you what probably caused an incident, using rules you can check instead of a black box.",
    year: "2026",
    categories: ["systems"],
    stack: ["TypeScript", "Rules Engine", "Logs", "Metrics", "Traces"],
    problem: "When something's on fire, engineers need an explanation they can verify, not a confident guess.",
    approach: [
      "A rules engine ranks the likely causes using logs, metrics and traces.",
      "Every answer comes with the evidence behind it and a full trail of how it got there.",
      "It's meant to sit next to AI incident tools as the part you can double-check.",
    ],
    outcomes: ["Likely causes, ranked", "Evidence for every answer", "Nothing hidden"],
    links: {
      github: "https://github.com/Anish-2005/WhyStack",
      live: "https://whystack.vercel.app",
    },
    art: "terminal",
  },
  {
    slug: "minigit",
    title: "MiniGit",
    kicker: "Systems · Version control",
    summary: "A small Git written from scratch in Java 17, with real object storage, diffs and three-way merges.",
    year: "2026",
    categories: ["systems"],
    stack: ["Java 17", "SHA-1", "Myers Diff", "SSE"],
    problem: "The best way I know to really understand Git is to build it: storing files, comparing versions and merging changes, without any libraries.",
    approach: [
      "Stores files, folders and commits by their SHA-1 hash, the same way Git does.",
      "Uses the Myers diff algorithm and three-way merges, and adds conflict markers when two changes clash.",
      "Comes with a small built-in web server and dashboard, plus a static version that runs on Vercel.",
    ],
    outcomes: ["No outside libraries", "Real diff and merge algorithms", "A live dashboard"],
    links: {
      github: "https://github.com/Anish-2005/MiniGit",
      live: "https://minigit-studio.vercel.app",
    },
    art: "tree",
  },
  {
    slug: "nexora",
    title: "NEXORA",
    kicker: "Social platform",
    summary: "A social network for builders. Share posts, devlogs and projects, with a reputation that comes from real GitHub work and live chat.",
    year: "2025",
    categories: ["fullstack"],
    stack: ["React", "TypeScript", "Firebase", "Tailwind CSS"],
    problem: "Developer communities often reward noise. I wanted a place where shipped work counts for more than hot takes.",
    approach: [
      "Live chat and online status on Firebase, kept in sync quickly.",
      "Reputation based on GitHub activity, plus growth stats for people who post.",
      "Reusable UI pieces and careful state handling so the app stays quick.",
    ],
    outcomes: ["Live chat and presence", "Reputation tied to real GitHub work", "Privacy settings built in"],
    links: {
      github: "https://github.com/Anish-2005/NEXORA",
      live: "https://connectnexora.vercel.app",
    },
    art: "network",
  },
  {
    slug: "lawai-mobile",
    title: "LawAI",
    kicker: "Legal help · Mobile",
    summary: "A legal help app with an AI lawyer, a step-by-step FIR builder, a law library and document storage, so people can understand the law that applies to them.",
    year: "2024",
    categories: ["ai", "fullstack"],
    badge: "SIH 2024 national finalist",
    stack: ["React Native", "Expo", "Gemini", "AI/ML"],
    problem: "Legal help is expensive and scary, and most people have no idea which sections of the law apply to their situation.",
    approach: [
      "An AI lawyer reads a description of the case and points to the sections of law that matter.",
      "A step-by-step FIR builder and a searchable law library.",
      "A mobile app for Android and iOS with secure storage for documents.",
    ],
    outcomes: ["National finalist at Smart India Hackathon 2024", "My most-starred repository", "Built both an ML and an LLM version"],
    links: { github: "https://github.com/Anish-2005/LawAI-Mobile" },
    art: "doc",
  },
  {
    slug: "taskflow-api",
    title: "TaskFlowAPI",
    kicker: "Backend · .NET",
    summary: "A task management API in ASP.NET Core 8 with JWT login, EF Core, SQL Server and Swagger docs.",
    year: "2026",
    categories: ["systems"],
    stack: ["C#", "ASP.NET Core 8", "EF Core", "SQL Server", "JWT"],
    problem: "I wanted a clean example of a secure, well-documented backend in .NET.",
    approach: [
      "JWT login and permissions on a layered Web API.",
      "EF Core with SQL Server and migrations.",
      "Swagger docs for every endpoint.",
    ],
    outcomes: ["Secure token login", "A typed database layer", "Docs that stay in sync"],
    links: { github: "https://github.com/Anish-2005/TaskFlowAPI" },
    art: "terminal",
  },
  {
    slug: "batchserve",
    title: "BatchServe",
    kicker: "Operating systems",
    summary: "A C program that simulates a restaurant serving customers in strict batches, using threads, semaphores and a fair queue.",
    year: "2026",
    categories: ["systems"],
    stack: ["C", "POSIX Threads", "Semaphores"],
    problem: "Classic concurrency problems are easy to explain and very easy to get slightly wrong.",
    approach: [
      "POSIX threads and semaphores keep each batch in step.",
      "A first-come, first-served queue with checks so nobody waits forever.",
      "Animated terminal logs, so you can actually watch the threads take turns.",
    ],
    outcomes: ["No deadlocks or starvation", "Fair ordering", "Concurrency you can watch"],
    links: { github: "https://github.com/Anish-2005/BatchServe" },
    art: "threads",
  },
];

/** Newest first. "National" results get the accent colour in the Recognition section. */
export const awards = [
  { title: "IDE Bootcamp", result: "National finalist", detail: "Phase 3, May · Innovation, Design & Entrepreneurship", year: "2026" },
  { title: "IDE Bootcamp", result: "National finalist", detail: "Phase 1, April · Innovation, Design & Entrepreneurship", year: "2026" },
  { title: "Smart India Hackathon", result: "National finalist", detail: "With Nyantra, our benefits platform", year: "2025" },
  { title: "Hack4Bengal", result: "Finalist", detail: "Made it to the finals with my team", year: "2025" },
  { title: "Smart India Hackathon", result: "National finalist", detail: "With LawAI, our legal help app", year: "2024" },
] as const;

export const certifications = [
  { title: "OCI AI Foundations Associate", issuer: "Oracle", year: "2025" },
  { title: "AWS Academy Cloud Architecting", issuer: "Amazon Web Services", year: "2025" },
  { title: "AI/ML Virtual Internship", issuer: "Google for Developers · AICTE", year: "2025" },
  { title: "Full-Stack Web Developer Virtual Internship", issuer: "EduSkills Foundation", year: "2025" },
  { title: "AWS Cloud Virtual Internship", issuer: "AICTE · EduSkills", year: "2024" },
] as const;

export const education = [
  {
    degree: "B.Tech, Computer Science & Business Systems",
    school: "Techno Main Salt Lake (MAKAUT), Kolkata",
    period: "2023 to now",
  },
  { degree: "Higher Secondary (ISC)", school: "St. Aloysius School", period: "2023" },
  { degree: "Secondary (ICSE)", school: "St. Aloysius School", period: "2021" },
] as const;

/** Written in first person: it's my site, so I answer my own questions. */
export const faqs = [
  {
    question: "Who is Anish Seth?",
    answer:
      "That's me. I'm an AI/ML engineer from Kolkata, India. I build AI agents on AWS Bedrock, and I've made it to the Smart India Hackathon national finals twice.",
  },
  {
    question: "What does Anish Seth work on?",
    answer:
      "Mostly AI agents: LLMs that use tools through MCP, financial data pipelines on AWS Bedrock and AgentCore, and knowledge graphs in Neo4j. I also build full-stack apps with Next.js, FastAPI and Django.",
  },
  {
    question: "Where can I find Anish Seth's work?",
    answer: "You're looking at it. This site is anishseth.xyz, and my code lives on GitHub at github.com/Anish-2005.",
  },
  {
    question: "Is Anish Seth open to new roles?",
    answer:
      "I'm always happy to talk about AI/ML engineering and full-stack roles. The quickest way to reach me is email (anishseth0510@gmail.com) or a message on LinkedIn.",
  },
  {
    question: "Where is Anish Seth on social media?",
    answer: "LinkedIn at linkedin.com/in/anishseth, X at @AnishSeth170734 and Instagram at @_anish.seth_.",
  },
] as const;



/** Just what the project list shows, so the browser never receives the full write-ups. */
export type ProjectRow = Pick<Project, "slug" | "title" | "kicker" | "year" | "badge" | "categories" | "art">;
export const toProjectRow = ({ slug, title, kicker, year, badge, categories, art }: Project): ProjectRow => ({
  slug,
  title,
  kicker,
  year,
  ...(badge ? { badge } : {}),
  categories,
  art,
});

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
