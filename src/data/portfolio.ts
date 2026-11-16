/**
 * Single source of truth for portfolio content.
 * Sourced from the latest résumé (Nov 2026) and public GitHub (github.com/Anish-2005).
 */

export type ProjectCategory = "ai" | "fullstack" | "systems";

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

export const profile = {
  name: "Anish Seth",
  firstName: "Anish",
  role: "AI/ML Engineer",
  focus: "Agentic AI, LLM Systems & Enterprise Automation",
  location: "Kolkata, India",
  timezone: "Asia/Kolkata",
  email: "anishseth0510@gmail.com",
  current: {
    title: "AI/ML Engineer Intern",
    company: "Digital Alpha",
    since: "Sep 2026",
  },
  summary:
    "AI/ML engineer building production agentic systems for financial automation — multi-agent orchestration, tool-calling, RAG, GraphRAG and knowledge-graph retrieval with LangChain, LangGraph, AWS Bedrock, AgentCore, MCP and Nango. Focused on reliability, observability, cost optimization and edge-case testing.",
  intro: [
    "I build AI systems that are trusted to act — agents that read live financial data, call real tools, and still behave predictably when the model, the network or the input misbehaves.",
    "Today that means designing agentic workflows on AWS Bedrock and AgentCore at Digital Alpha. Before that, it meant 50+ shipped projects, two national Smart India Hackathon finals, and a habit of turning ambiguous problems into production-grade software.",
  ],
  links: {
    github: "https://github.com/Anish-2005",
    linkedin: "https://www.linkedin.com/in/anishseth",
    x: "https://x.com/AnishSeth170734",
    instagram: "https://www.instagram.com/_anish.seth_/",
    leetcode: "https://leetcode.com/u/Anish_Seth/",
    resume: "/resume.pdf",
  },
} as const;

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
  { value: "2×", label: "SIH National Finalist" },
  { value: "50+", label: "Projects shipped" },
] as const;

export const principles = [
  {
    title: "Reliable by design",
    body: "Approval gates, schema validation and idempotency keys — so an agent can never post the same financial transaction twice.",
    icon: "shield",
  },
  {
    title: "Observable by default",
    body: "Structured CloudWatch logging and per-run cost tracking on every workflow. If it runs, it is measured.",
    icon: "activity",
  },
  {
    title: "Tested at the edges",
    body: "Retries, malformed model output and partial failures get explicit tests — not optimism.",
    icon: "flask",
  },
  {
    title: "Cost-aware",
    body: "Model choice, tool calls and token budgets are engineering constraints, tracked like latency.",
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
};

export const experience: ExperienceItem[] = [
  {
    role: "AI/ML Engineer Intern",
    company: "Digital Alpha",
    period: "Sep 2026 — Present",
    type: "Internship",
    current: true,
    summary: "Agentic workflows and financial data pipelines for research and automation.",
    bullets: [
      "Built Python agentic workflows and financial data pipelines on AWS Bedrock and AgentCore for research and automation.",
      "Developed LLM agents with MCP tool servers, connecting enterprise systems through Nango so agents act on live financial data.",
      "Implemented approval workflows, schema validation and idempotency keys — preventing duplicate financial transactions.",
      "Added CloudWatch logging, per-run cost tracking and edge-case tests for retries, malformed output and partial failures.",
    ],
    stack: ["Python", "AWS Bedrock", "AgentCore", "MCP", "Nango", "CloudWatch", "Boto3"],
  },
  {
    role: "Builder — Open Source, AI Automation & Hackathons",
    company: "Independent",
    period: "2023 — Present",
    type: "Open source",
    summary: "Shipping end-to-end products, AI pipelines and automation in public.",
    bullets: [
      "Built 25+ full-stack and AI-integrated apps and shipped 50+ projects across 78 public repositories.",
      "3,800+ GitHub contributions in the last year — from agentic pipelines and GraphRAG to a Git engine written in Java.",
      "Two-time Smart India Hackathon national finalist (2024, 2025); finalist at Hack4Bengal 2025 and IDE Bootcamp 2026.",
    ],
    stack: ["TypeScript", "Next.js", "FastAPI", "Django", "n8n", "Gemini", "Neo4j"],
  },
];

export const leadership = [
  { role: "Google Student Ambassador", org: "Techno Main Salt Lake", period: "Jul — Nov 2026" },
  { role: "GeeksforGeeks Campus Lead", org: "Techno Main Salt Lake", period: "Jan — Jun 2026" },
  { role: "Outreach Head", org: "Samarth — Educational Society, TMSL", period: "Ongoing" },
  { role: "Organizer, EDUC-A-THON", org: "Education-focused hackathon", period: "2025" },
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
    title: "Agentic AI & LLMs",
    blurb: "Multi-agent orchestration with tool-calling, guardrails and human-in-the-loop approvals.",
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
    title: "RAG & Knowledge Systems",
    blurb: "Retrieval that is grounded, schema-checked and queryable.",
    icon: "graph",
    items: ["RAG", "GraphRAG", "Knowledge Graphs", "Neo4j", "Cypher", "OCR"],
  },
  {
    id: "cloud",
    title: "AWS & Cloud",
    blurb: "Serverless agents with observability and cost tracking built in.",
    icon: "cloud",
    items: ["Bedrock", "AgentCore", "S3", "CloudWatch", "Boto3", "Docker", "CI/CD", "Vercel"],
  },
  {
    id: "automation",
    title: "Integrations & Automation",
    blurb: "Connecting agents to the systems where work actually happens.",
    icon: "plug",
    items: ["Nango", "MCP Servers", "REST APIs", "Webhooks", "n8n", "Zapier"],
  },
  {
    id: "product",
    title: "Full-Stack Engineering",
    blurb: "Production web and mobile products, from API to interface.",
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
    title: "Languages & Data",
    blurb: "Python for AI and data, Java for systems, TypeScript for product.",
    icon: "code",
    items: ["Python", "Pandas", "NumPy", "Java", "TypeScript", "JavaScript", "SQL", "C++", "EDA"],
  },
  {
    id: "data",
    title: "Databases",
    blurb: "Relational, document and graph stores.",
    icon: "database",
    items: ["PostgreSQL", "MongoDB", "Neo4j", "Supabase", "Firebase", "SQL Server"],
  },
  {
    id: "core",
    title: "CS Foundations",
    blurb: "The fundamentals underneath every abstraction.",
    icon: "cpu",
    items: ["Data Structures & Algorithms", "OOP", "DBMS", "Operating Systems", "Computer Networks", "System Design"],
  },
];

export const marquee = [
  "LangGraph",
  "AWS Bedrock",
  "AgentCore",
  "Model Context Protocol",
  "GraphRAG",
  "Neo4j",
  "Python",
  "FastAPI",
  "Next.js",
  "TypeScript",
  "PostgreSQL",
  "Nango",
  "CloudWatch",
  "Docker",
  "n8n",
  "Gemini",
  "Claude",
  "Java",
];

export const projects: Project[] = [
  {
    slug: "graphrag-knowledge-graph",
    title: "GraphRAG Knowledge Agent",
    kicker: "Agentic AI · Knowledge Graphs",
    summary:
      "An agent that turns unstructured text into a validated Neo4j knowledge graph — then answers questions over it in plain language.",
    year: "2026",
    categories: ["ai"],
    featured: true,
    stack: ["n8n", "Gemini", "Neo4j", "Cypher"],
    problem:
      "Vector-only retrieval loses the relationships that make answers trustworthy. Teams needed a way to ask multi-hop questions over their own documents without hallucinated joins.",
    approach: [
      "Gemini extracts entities and relationships from raw text, validated against a schema before anything is persisted to Neo4j.",
      "The agent generates Cypher dynamically to query the graph, then converts results back into natural-language answers.",
      "Read-only guards, validation and safety checks wrap every step of the extract → store → query → respond loop.",
    ],
    outcomes: [
      "Multi-hop answers grounded in explicit graph relationships",
      "No write access from generated queries — read-only by construction",
      "Error handling at every stage of the pipeline",
    ],
    links: {},
    art: "graph",
  },
  {
    slug: "scam-detection-agent",
    title: "Scam-Detection & Awareness Agent",
    kicker: "Agentic AI · Trust & Safety",
    summary:
      "A multilingual agentic pipeline that analyses suspicious messages for phishing and UPI/OTP fraud and explains the risk in plain language.",
    year: "2026",
    categories: ["ai"],
    featured: true,
    stack: ["n8n", "Gemini 1.5 Flash", "Telegram", "Airtable"],
    problem:
      "UPI and OTP fraud spreads fastest in regional languages, where generic spam filters fail and victims rarely get an explanation they understand.",
    approach: [
      "Multi-stage pipeline ingests Telegram messages, detects language and routes to Gemini for contextual scam analysis.",
      "Prompts produce a risk score, a fraud category and a plain-language explanation — in Hindi or English.",
      "Results are logged to Airtable with scheduled trend reports; the design is channel-agnostic (Telegram, WhatsApp, Slack).",
    ],
    outcomes: [
      "Risk scores with human-readable rationale, not just a label",
      "Dynamic language routing for Hindi/English input",
      "Scheduled trend reporting on emerging scam patterns",
    ],
    links: {},
    art: "shield",
  },
  {
    slug: "financer",
    title: "Financer",
    kicker: "AI Financial Intelligence",
    summary:
      "An AI-powered financial advisor with portfolio, market, liquidity and risk models behind interactive, exportable dashboards.",
    year: "2025",
    categories: ["ai", "fullstack"],
    featured: true,
    stack: ["FastAPI", "MongoDB", "React", "Gemini", "Python"],
    problem:
      "Personal-finance tools show transactions, not decisions. Users needed analysis — risk, liquidity, tax impact — explained in context.",
    approach: [
      "FastAPI and MongoDB backend with statistical models for portfolio, market, liquidity, volatility and risk insights.",
      "Tax-impact, inflation-adjusted return and sensitivity scenarios turn raw numbers into actionable insight.",
      "React dashboards with charts, filters and exportable reports; Gemini adds a conversational advisory layer.",
    ],
    outcomes: [
      "End-to-end analytics from ingestion to exportable report",
      "Scenario analysis for inflation and tax impact",
      "Conversational insights layered over deterministic models",
    ],
    links: {
      github: "https://github.com/Anish-2005/Financer",
      live: "https://financer-nexus.vercel.app",
    },
    art: "chart",
  },
  {
    slug: "vanmitra",
    title: "VanMitra — FRA Atlas",
    kicker: "OCR · WebGIS · Decision Support",
    summary:
      "A platform that digitises Forest Rights Act records with OCR, maps them with WebGIS and powers a decision-support system for policy.",
    year: "2025",
    categories: ["ai", "fullstack"],
    featured: true,
    stack: ["Next.js", "Django", "PostgreSQL", "OCR", "Machine Learning", "GeoJSON"],
    problem:
      "Forest-rights claims live in scanned, unstructured paper records — slow to verify and impossible to analyse across regions.",
    approach: [
      "OCR pipelines collect and clean unstructured forest-rights records, cutting manual data entry.",
      "Statistical and ML-based pattern analysis flags anomalies to support claim verification.",
      "PostgreSQL-backed WebGIS dashboards report claim status and land-use trends across regions.",
    ],
    outcomes: [
      "100+ unstructured records digitised through OCR",
      "Anomaly flags to speed up claim verification",
      "Real-time regional dashboards for decision support",
    ],
    links: {
      github: "https://github.com/Anish-2005/VanMitra",
      live: "https://vanmitra.vercel.app",
    },
    art: "map",
  },
  {
    slug: "lead-scoring-pipeline",
    title: "Lead Intelligence & Scoring",
    kicker: "LLM Reasoning · Revenue Automation",
    summary:
      "A reasoning layer over raw leads that scores ICP fit 0–100, writes the rationale and creates scored deals in HubSpot automatically.",
    year: "2026",
    categories: ["ai"],
    stack: ["Zapier", "Airtable", "HubSpot", "Webhooks"],
    problem:
      "Sales teams triage leads by gut feel. Scoring rules drift, and nobody can explain why a lead was marked high-priority.",
    approach: [
      "Webhook ingest → schema normalisation → rubric lookup in Airtable → 0–100 ICP score with A/B/C tier.",
      "Every score ships with a written rationale; scored deals are created in HubSpot with full context.",
      "Extending to tier-based branching and a weekly self-correcting loop that critiques its rubric against closed-won/lost outcomes.",
    ],
    outcomes: ["Explainable, consistent lead tiers", "Zero-touch deal creation in the CRM", "A rubric designed to improve itself"],
    links: {},
    art: "funnel",
  },
  {
    slug: "nyantra",
    title: "Nyantra",
    kicker: "GovTech · Direct Benefit Transfer",
    summary:
      "A DBT social-assistance platform for applicant onboarding, benefit disbursement and grievance handling — with officer analytics and an offline-first mobile app.",
    year: "2025",
    categories: ["fullstack"],
    badge: "SIH 2025 National Finalist",
    stack: ["Next.js", "TypeScript", "Flutter", "Firebase", "SQL"],
    problem:
      "Relief for victims under the SC/ST (PoA) Act moves through paper and phone calls. Beneficiaries lose track; officers lack a view of bottlenecks.",
    approach: [
      "Modelled end-to-end applicant, disbursement and grievance data to streamline officer-side reporting.",
      "Officer dashboards surface disbursement trends and bottlenecks for data-driven decisions.",
      "A citizen-facing Flutter app with an offline-first architecture for low-connectivity regions.",
    ],
    outcomes: [
      "National finalist at Smart India Hackathon 2025",
      "Web platform plus offline-first mobile companion",
      "Analytics for disbursement monitoring",
    ],
    links: {
      github: "https://github.com/Anish-2005/Nyantra",
      live: "https://nyantra.vercel.app",
    },
    art: "flow",
  },
  {
    slug: "traceveil",
    title: "Traceveil",
    kicker: "Behavioral AI · Fraud Detection",
    summary:
      "A real-time, multi-modal behavioural AI system for detecting transaction fraud, bot rings and exam cheating with sub-50ms inference.",
    year: "2026",
    categories: ["ai"],
    stack: ["TypeScript", "LSTM", "Autoencoders", "Anomaly Detection"],
    problem: "Fraud signals are spread across transactions, sessions and behaviour — and decisions must happen in milliseconds.",
    approach: [
      "Sequence models (LSTM) and autoencoders score behavioural anomalies across multiple signal types.",
      "Low-latency scoring path designed for sub-50ms inference.",
      "Production-minded monitoring flows for transaction risk, bot patterns and exam integrity.",
    ],
    outcomes: ["Sub-50ms inference target", "One system across three fraud surfaces", "Monitoring built into the design"],
    links: { github: "https://github.com/Anish-2005/Traceveil" },
    art: "pulse",
  },
  {
    slug: "archscope",
    title: "ArchScope",
    kicker: "Platform Engineering · AI",
    summary:
      "Scan any repository for AI-powered tech fingerprinting, risk scoring, policy enforcement and executive-grade architecture briefs.",
    year: "2026",
    categories: ["ai", "systems"],
    stack: ["TypeScript", "GitHub API", "CLI", "LLMs"],
    problem: "Engineering leaders rarely know what is actually running across their repos — or which choices carry risk.",
    approach: [
      "Repository scanning produces a technology fingerprint and architectural risk score.",
      "Policy rules enforce standards across services; violations are surfaced with evidence.",
      "AI-generated architecture briefs summarise the findings for non-specialists.",
    ],
    outcomes: ["Stack visibility in seconds", "Policy enforcement with evidence", "Briefs leaders can act on"],
    links: {
      github: "https://github.com/Anish-2005/ArchScope",
      live: "https://archscope.vercel.app",
    },
    art: "layers",
  },
  {
    slug: "whystack",
    title: "WhyStack",
    kicker: "Observability · Deterministic Reasoning",
    summary:
      "Ingests logs, metrics and traces and produces auditable, human-readable incident explanations — no ML, no black box.",
    year: "2026",
    categories: ["systems"],
    stack: ["TypeScript", "Rules Engine", "Logs", "Metrics", "Traces"],
    problem: "During incidents, engineers need explanations they can verify — not a confident guess from an opaque model.",
    approach: [
      "A deterministic rule engine ranks candidate root causes across logs, metrics and traces.",
      "Every conclusion returns supporting evidence snippets and a full audit trail.",
      "Designed as an explainable complement to AI-based incident tooling.",
    ],
    outcomes: ["Ranked root causes with evidence", "Fully traceable conclusions", "Zero black-box inference"],
    links: {
      github: "https://github.com/Anish-2005/WhyStack",
      live: "https://whystack.vercel.app",
    },
    art: "terminal",
  },
  {
    slug: "minigit",
    title: "MiniGit",
    kicker: "Systems · Version Control",
    summary:
      "A zero-dependency version-control engine in Java 17 with content-addressable storage, Myers diff and recursive three-way merge.",
    year: "2026",
    categories: ["systems"],
    stack: ["Java 17", "SHA-1", "Myers Diff", "SSE"],
    problem: "Understanding Git means rebuilding it: object storage, diffing and merging without leaning on libraries.",
    approach: [
      "Content-addressable storage for blobs, trees and commits with SHA-1 hashing.",
      "Myers O(ND) diff and recursive three-way merging with conflict markers.",
      "Embedded SSE HTTP server powering a web dashboard, with a static fallback mode for Vercel.",
    ],
    outcomes: ["Zero external dependencies", "Real diff and merge algorithms", "Live web dashboard"],
    links: {
      github: "https://github.com/Anish-2005/MiniGit",
      live: "https://minigit-studio.vercel.app",
    },
    art: "tree",
  },
  {
    slug: "nexora",
    title: "NEXORA",
    kicker: "Real-time Social Platform",
    summary:
      "A high-signal builder network with posts, devlogs and projects, GitHub reputation scoring and real-time collaboration.",
    year: "2025",
    categories: ["fullstack"],
    stack: ["React", "TypeScript", "Firebase", "Tailwind CSS"],
    problem: "Developer communities reward noise. Builders needed a place where shipped work and reputation are the signal.",
    approach: [
      "Real-time messaging and presence tracking on Firebase with low-latency chat synchronisation.",
      "GitHub reputation scoring and creator growth analytics.",
      "Reusable UI components and scalable client state for a responsive experience.",
    ],
    outcomes: ["Real-time collaboration and presence", "Reputation tied to real GitHub work", "Privacy controls built in"],
    links: {
      github: "https://github.com/Anish-2005/NEXORA",
      live: "https://connectnexora.vercel.app",
    },
    art: "network",
  },
  {
    slug: "lawai-mobile",
    title: "LawAI",
    kicker: "Legal Tech · Mobile AI",
    summary:
      "An AI legal assistant with an FIR builder, legal database, AI lawyer consultation and document management — built to democratise legal knowledge.",
    year: "2024",
    categories: ["ai", "fullstack"],
    badge: "SIH 2024 National Finalist",
    stack: ["React Native", "Expo", "Gemini", "AI/ML"],
    problem: "Legal help is expensive and intimidating; most citizens don't know which sections of law apply to them.",
    approach: [
      "AI lawyer consultation that analyses a case description and identifies applicable legal sections.",
      "Guided FIR builder and a searchable legal database.",
      "Cross-platform mobile app with secure document management.",
    ],
    outcomes: ["National finalist at Smart India Hackathon 2024", "Most-starred repository on the profile", "Multiple ML and LLM variants explored"],
    links: { github: "https://github.com/Anish-2005/LawAI-Mobile" },
    art: "doc",
  },
  {
    slug: "taskflow-api",
    title: "TaskFlowAPI",
    kicker: "Backend · .NET",
    summary: "An ASP.NET Core 8 Web API for task management with JWT auth, EF Core, SQL Server and Swagger documentation.",
    year: "2026",
    categories: ["systems"],
    stack: ["C#", "ASP.NET Core 8", "EF Core", "SQL Server", "JWT"],
    problem: "A clean reference for a secure, documented, relational backend in the .NET ecosystem.",
    approach: [
      "JWT authentication and authorisation on a layered Web API.",
      "EF Core data access against SQL Server with migrations.",
      "Swagger/OpenAPI documentation for every endpoint.",
    ],
    outcomes: ["Secure token-based auth", "Typed relational data layer", "Self-documenting API"],
    links: { github: "https://github.com/Anish-2005/TaskFlowAPI" },
    art: "terminal",
  },
  {
    slug: "batchserve",
    title: "BatchServe",
    kicker: "Operating Systems · Concurrency",
    summary:
      "A C simulation of strict batch-service synchronisation using POSIX threads, semaphores, a FIFO fairness queue and starvation handling.",
    year: "2026",
    categories: ["systems"],
    stack: ["C", "POSIX Threads", "Semaphores"],
    problem: "Classic synchronisation problems are easy to describe and notoriously easy to get subtly wrong.",
    approach: [
      "POSIX threads and semaphores coordinate strict batch service.",
      "A FIFO fairness queue with explicit starvation handling.",
      "Animated CLI logs make interleavings visible.",
    ],
    outcomes: ["Deadlock- and starvation-aware design", "Deterministic fairness", "Observable concurrency"],
    links: { github: "https://github.com/Anish-2005/BatchServe" },
    art: "threads",
  },
];

export const awards = [
  { title: "Smart India Hackathon", result: "National Finalist", detail: "Nyantra — DBT social-assistance platform", year: "2025" },
  { title: "Smart India Hackathon", result: "National Finalist", detail: "LawAI — AI legal assistant", year: "2024" },
  { title: "Hack4Bengal", result: "Finalist", detail: "Eastern India's flagship hackathon", year: "2025" },
  { title: "IDE Bootcamp", result: "Finalist", detail: "Innovation, Design & Entrepreneurship", year: "2026" },
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
    period: "2023 — Present",
  },
  { degree: "Higher Secondary (ISC)", school: "St. Aloysius School", period: "2023" },
  { degree: "Secondary (ICSE)", school: "St. Aloysius School", period: "2021" },
] as const;

export const faqs = [
  {
    question: "Who is Anish Seth?",
    answer:
      "Anish Seth is an AI/ML engineer from Kolkata, India, building production agentic AI systems — multi-agent orchestration, RAG and GraphRAG, and enterprise automation on AWS Bedrock. He is currently an AI/ML Engineer Intern at Digital Alpha and a two-time Smart India Hackathon national finalist.",
  },
  {
    question: "What does Anish Seth work on?",
    answer:
      "LLM agents with MCP tool servers, financial data pipelines on AWS Bedrock and AgentCore, knowledge-graph retrieval with Neo4j, and full-stack products with Next.js, FastAPI and Django.",
  },
  {
    question: "What is Anish Seth's portfolio website?",
    answer: "The official portfolio is anishseth.xyz. Code lives on GitHub at github.com/Anish-2005.",
  },
  {
    question: "Is Anish Seth open to new roles?",
    answer:
      "Yes — Anish is open to conversations about AI/ML engineering and full-stack roles. The fastest route is email at anishseth0510@gmail.com or a message on LinkedIn.",
  },
  {
    question: "Where can I find Anish Seth on social media?",
    answer: "LinkedIn at linkedin.com/in/anishseth, X at @AnishSeth170734 and Instagram at @_anish.seth_.",
  },
] as const;

export const categoryLabels: Record<ProjectCategory, string> = {
  ai: "AI & Agents",
  fullstack: "Full-Stack",
  systems: "Systems & Tools",
};

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
