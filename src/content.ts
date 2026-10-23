// All site content and data — edit here, not in components.

export const site = {
  name: "Babalola Mayor Timileyin",
  shortName: "MAYOR/TIMILEYIN",
  title: "Babalola Mayor Timileyin | Full-Stack Developer & Founder of MayorTech",
  description:
    "Full-stack developer and founder of MayorTech. I build web apps, trading systems, and AI-driven tools, from first sketch to deployed product.",
  email: "babalolamayor2@gmail.com",
  linkedin: "https://linkedin.com/in/babalola-mayor-a819742a0",
  github: "https://github.com/mayortimileyin",
  location: "Port Harcourt, Nigeria",
  resumeUrl: "/resume.pdf",
  revision: "REV 3.0 · UPDATED OCT 2026",
  totalSheets: 5,
};

export const heroCopy = {
  sheetLabel: "SHEET 00 / 05 — INTRODUCTION",
  h1Line1: "I design, build, and ship",
  h1Line2: "software that works.",
  h1Accent: "ship",
  sub: "Full-stack developer and founder of MayorTech. I build web apps, trading systems, and AI-driven tools, from first sketch to deployed product.",
  ctaPrimary: "VIEW SELECTED WORK ↓",
  ctaSecondary: "DOWNLOAD RESUME",
  ctaTertiary: "GET IN TOUCH →",
  specStrip: [
    { label: "BASED IN", value: "NIGERIA" },
    { label: "ROLE", value: "FULL-STACK DEVELOPER" },
    { label: "FOCUS", value: "WEB / AI / AUTOMATION" },
    { label: "STATUS", value: "OPEN TO FREELANCE & REMOTE" },
  ],
};

export type ProjectStatus = "LIVE" | "BETA" | "PRIVATE" | "ARCHIVED";

export interface Project {
  id: string;
  num: string;
  title: string;
  summary: string;
  description: string;
  stack: string[];
  status: ProjectStatus;
  year: string;
  rev: string;
  liveUrl?: string;
  codeUrl?: string;
  image?: string;
}

export const projects: Project[] = [
  {
    id: "mayortech",
    num: "01",
    title: "MayorTech",
    summary: "E-commerce platform for phones, gadgets, and electronics.",
    description:
      "Built a full-featured e-commerce platform serving Nigerian customers with product browsing, cart management, and order processing. Includes an admin panel with role-based access control via Supabase, EmailJS order notifications, product badges, and a services page.",
    stack: ["React", "TypeScript", "Supabase", "EmailJS", "Framer Motion", "Vercel"],
    status: "LIVE",
    year: "2025",
    rev: "2.1",
    liveUrl: "https://mayortech.vercel.app",
    codeUrl: "https://github.com/mayortimileyin/mayortech",
  },
  {
    id: "scandesk",
    num: "02",
    title: "ScanDesk",
    summary: "Phishing link detection system using machine learning.",
    description:
      "A real-time phishing URL detection system that extracts features from submitted links and classifies them using trained ML models. Displays a probability score and clean results UI for immediate user feedback.",
    stack: ["Python", "Flask", "scikit-learn", "URL Feature Extraction"],
    status: "LIVE",
    year: "2025",
    rev: "1.0",
    liveUrl: "https://scandesk.onrender.com",
    codeUrl: "https://github.com/mayortimileyin/scandesk",
  },
  {
    id: "spam-detection",
    num: "03",
    title: "Multi-Channel Spam Detection",
    summary: "Final-year dissertation comparing ML classifiers for spam.",
    description:
      "Compared Naive Bayes, SVM, Random Forest, and DistilBERT across SMS and email spam datasets. Evaluated using precision, recall, F1, and accuracy metrics with comparison charts to identify the best-performing model for each channel.",
    stack: ["Python", "scikit-learn", "DistilBERT", "Pandas", "Matplotlib"],
    status: "ARCHIVED",
    year: "2025",
    rev: "1.0",
    codeUrl: "https://github.com/mayortimileyin/spam-detection",
  },
  {
    id: "tbb-trading",
    num: "04",
    title: "TBB Trading Bot",
    summary: "Algorithmic trading backend for crypto and forex.",
    description:
      "Built a signal-generation and backtesting engine for crypto trading with risk controls. Extended to forex with a signal-only variant. Fixed look-ahead bias, added indicator warm-up handling, and implemented proper position sizing.",
    stack: ["Python", "pandas", "ccxt", "Technical Analysis"],
    status: "PRIVATE",
    year: "2026",
    rev: "1.2",
    codeUrl: "https://github.com/mayortimileyin/tbb-trading",
  },
];

export interface MoreProject {
  name: string;
  stack: string;
  year: string;
  url?: string;
}

export const moreProjects: MoreProject[] = [
  { name: "Game Hub 2.0", stack: "React, Canvas API", year: "2024", url: "https://github.com/mayortimileyin" },
  { name: "Local File Transfer PWA", stack: "React, WebRTC", year: "2024" },
  { name: "Movie Catalogue Site", stack: "React, TMDB API", year: "2024", url: "https://github.com/mayortimileyin" },
  { name: "OrchestrateIQ Dashboard", stack: "React, TypeScript", year: "2025" },
  { name: "Fitness Dashboard", stack: "React, Chart.js", year: "2024" },
  { name: "Portfolio v2", stack: "React, Tailwind, Framer Motion", year: "2026" },
];

export const aboutCopy = {
  sheetLabel: "SHEET 02 / 05 — ABOUT",
  heading: "About",
  paragraphs: [
    "I'm a Computer Science graduate from Rivers State University of Science and Technology, a full-stack developer, and the founder of MayorTech. I build products end-to-end — from database schema to deployed interface.",
    "I prototype quickly with AI coding agents, then verify everything with tests and real data. I care about design systems, type safety, and consistency across every screen.",
    "I'm looking for freelance and contract work — remote worldwide or on-site in Nigeria — in full-stack development and AI/automation. If you have a problem that needs solving, let's talk.",
  ],
  stats: [
    { value: "5+", label: "PROJECTS SHIPPED" },
    { value: "FULL", label: "FULL-STACK" },
    { value: "R·P", label: "REACT · PYTHON" },
    { value: "✓", label: "REMOTE-READY" },
  ],
  timeline: [
    { year: "2022", text: "Started building web projects" },
    { year: "2024", text: "First deployed applications" },
    { year: "2025", text: "AI-assisted development workflow" },
    { year: "2026", text: "MayorTech launch & trading systems", latest: true },
  ],
};

export interface StackGroup {
  title: string;
  skills: { name: string; note: string }[];
}

export const stackGroups: StackGroup[] = [
  {
    title: "FRONTEND",
    skills: [
      { name: "React", note: "Primary UI framework" },
      { name: "TypeScript", note: "Type safety everywhere" },
      { name: "Vite", note: "Build tool of choice" },
      { name: "Tailwind CSS", note: "Utility-first styling" },
      { name: "Framer Motion", note: "Animation library" },
      { name: "Redux Toolkit", note: "State management" },
      { name: "Chart.js", note: "Data visualization" },
    ],
  },
  {
    title: "BACKEND & DATA",
    skills: [
      { name: "Python", note: "Backend & ML work" },
      { name: "Flask", note: "Lightweight API framework" },
      { name: "Supabase", note: "Auth, DB, storage" },
      { name: "PostgreSQL", note: "Relational databases" },
      { name: "REST APIs", note: "API design & consumption" },
      { name: "Firebase", note: "Legacy projects" },
    ],
  },
  {
    title: "AI & ML",
    skills: [
      { name: "scikit-learn", note: "RandomForest, NB, SVM" },
      { name: "DistilBERT", note: "Text classification" },
      { name: "Prompt Engineering", note: "AI agent workflows" },
      { name: "AI Automation", note: "Claude Code, Qwen Coder" },
    ],
  },
  {
    title: "TOOLS & DELIVERY",
    skills: [
      { name: "Git/GitHub", note: "Version control" },
      { name: "Vercel", note: "Deployment platform" },
      { name: "Electron", note: "Desktop applications" },
      { name: "Lovable", note: "Rapid prototyping" },
      { name: "Claude Code", note: "AI coding agent" },
      { name: "Qwen Coder", note: "AI coding assistant" },
    ],
  },
];

export const processSteps = [
  {
    num: "01",
    title: "SPEC",
    text: "Define the problem, constraints, and acceptance criteria before writing any code.",
  },
  {
    num: "02",
    title: "DESIGN",
    text: "Tokens first, then components. One system, applied consistently across every screen.",
  },
  {
    num: "03",
    title: "BUILD",
    text: "Ship in small verified increments. Typecheck and build at every step.",
  },
  {
    num: "04",
    title: "VERIFY",
    text: "Test with real data. Hunt bias and edge cases. Measure outcomes.",
  },
  {
    num: "05",
    title: "DEPLOY",
    text: "Ship to production. Monitor, iterate, and improve continuously.",
  },
];

export const contactCopy = {
  sheetLabel: "SHEET 05 / 05 — CONTACT",
  heading: "Let's build something.",
  subtext:
    "Open to freelance, contract, and remote roles in full-stack development and AI/automation. Typically replies within 24 hours.",
  formLabels: {
    name: "NAME",
    email: "EMAIL",
    message: "MESSAGE",
    submit: "SEND MESSAGE →",
    success: "Message sent. I'll reply within 24 hours.",
    error: "Something went wrong. Try again or email directly.",
  },
  channels: [
    { label: "EMAIL", value: "babalolamayor2@gmail.com", href: "mailto:babalolamayor2@gmail.com" },
    { label: "LINKEDIN", value: "linkedin.com/in/babalola-mayor-a819742a0", href: "https://linkedin.com/in/babalola-mayor-a819742a0" },
    { label: "GITHUB", value: "github.com/mayortimileyin", href: "https://github.com/mayortimileyin" },
    { label: "LOCATION", value: "Port Harcourt, Nigeria", href: undefined },
  ],
};

export const navItems = [
  { num: "01", label: "WORK", href: "#work" },
  { num: "02", label: "ABOUT", href: "#about" },
  { num: "03", label: "STACK", href: "#stack" },
  { num: "04", label: "PROCESS", href: "#process" },
  { num: "05", label: "CONTACT", href: "#contact" },
];

export const marqueeItems = [
  "REACT",
  "TYPESCRIPT",
  "PYTHON",
  "FLASK",
  "SUPABASE",
  "ELECTRON",
  "MACHINE LEARNING",
  "AI AUTOMATION",
];
