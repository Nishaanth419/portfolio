export const profile = {
  name: 'Nishaanth K N',
  shortName: 'Nishaanth',
  role: 'AI Engineer',
  location: 'Bengaluru, IN',
  timezone: 'Asia/Kolkata',
  email: 'knnishaanth@gmail.com',
  github: 'https://github.com/Nishaanth419',
  githubUser: 'Nishaanth419',
  linkedin: 'https://www.linkedin.com/in/nishaanth-k-n-a59a38232/',
  linkedinUser: 'nishaanth-k-n',
};

export type Category = 'agents' | 'rag' | 'llm' | 'data' | 'web';

export const categories: Record<Category, string> = {
  agents: 'Agents',
  rag: 'RAG',
  llm: 'LLM',
  data: 'Data & ML',
  web: 'Web',
};

export const langColors: Record<string, string> = {
  Python: '#3EF0A8',
  TypeScript: '#4C7BFF',
  JavaScript: '#E8D44D',
  Shell: '#89E051',
  'Jupyter Notebook': '#F37626',
  Research: '#B45CFF',
  Web: '#A3A8B3',
};

export interface Project {
  /** Repository name on GitHub — also used to build the link. */
  repo: string;
  /** Display title, when it should differ from the repo name. */
  title?: string;
  category: Category;
  lang: string;
  description: string;
  stack: string[];
  featured?: boolean;
}

// Sourced from github.com/Nishaanth419. Featured projects appear in the bento grid, in order.
export const projects: Project[] = [
  { repo: 'CAMode', category: 'agents', lang: 'TypeScript', featured: true,
    description: 'A TypeScript AI agent that turns MCP tools into a typed API and runs generated code inside a sandboxed Cloudflare Worker.',
    stack: ['MCP', 'Cloudflare Workers', 'TypeScript'] },
  { repo: 'A2UI-GenUI', category: 'agents', lang: 'Python', featured: true,
    description: 'Generative-UI financial dashboard: plain-English requests stream a live, re-composable layout over the A2UI protocol with Groq structured outputs.',
    stack: ['FastAPI', 'React', 'Groq', 'SSE'] },
  { repo: 'Ai_Agent-Support', title: 'AI Agent Support', category: 'agents', lang: 'Python', featured: true,
    description: 'Autonomous support-triage agent built from scratch — manual agent loop, tool dispatch, context management and guardrails.',
    stack: ['Groq', 'Tool use', 'Guardrails'] },
  { repo: 'fieldnotes-research-assistant', title: 'Fieldnotes', category: 'agents', lang: 'Python', featured: true,
    description: 'Local multi-agent research assistant for urban heat resilience, grounded in curated sources.',
    stack: ['LangGraph', 'Ollama', 'Tavily'] },
  { repo: 'SRE_Bot_Bosch', title: 'SRE Bot', category: 'agents', lang: 'Python',
    description: 'Takes incident alerts from Power Automate, analyses logs with GPT-4.1-mini, retrieves similar incidents and posts runbooks to Teams.',
    stack: ['Azure OpenAI', 'AI Search', 'Teams'] },
  { repo: 'TarkaFoods_RAG_Support', title: 'TarkaFoods RAG Support', category: 'rag', lang: 'Python',
    description: 'Customer-support RAG pipeline serving grounded, cited answers through /ingest, /query and /stream endpoints.',
    stack: ['Qdrant', 'Ollama', 'FastAPI'] },
  { repo: 'Qdrant_RAG', title: 'Qdrant RAG', category: 'rag', lang: 'Python',
    description: 'Experiments with retrieval methods for RAG and their combinations, using Qdrant as the vector store.',
    stack: ['Qdrant', 'Hybrid retrieval'] },
  { repo: 'ChunkMate', category: 'rag', lang: 'JavaScript',
    description: 'Uploads Markdown, chunks it into logical sections and stores it in PostgreSQL for downstream RAG pipelines.',
    stack: ['Chunking', 'PostgreSQL'] },
  { repo: 'LLMs_Check', title: 'LLMs Check', category: 'llm', lang: 'Python',
    description: 'Benchmarks local LLMs — TinyLlama, Mistral, LLaMA, Qwen — on knowledge, reasoning, hallucination and long context.',
    stack: ['Ollama', 'Benchmarking'] },
  { repo: 'AI_Skills', title: 'AI Skills', category: 'llm', lang: 'Shell',
    description: 'Curated AI-engineering skills for coding assistants: Python, React, SQL, Docker, LLM apps, API design, Git and n8n.',
    stack: ['Coding agents', 'Skills'] },
  { repo: 'travel_AI', title: 'Travel AI', category: 'llm', lang: 'TypeScript',
    description: 'AI travel assistant that helps plan trips and discover destinations.',
    stack: ['LLM', 'Trip planner'] },
  { repo: 'Delta_Writing_Risingwave', title: 'Delta × RisingWave', category: 'data', lang: 'Python',
    description: 'Writes Delta Lake data from RisingWave streaming SQL, sourcing from Kafka, Azure Event Hubs and Kinesis.',
    stack: ['RisingWave', 'Delta Lake', 'Kafka'] },
  { repo: 'AKS_diagnosis_Dashboard', title: 'AKS Diagnosis Dashboard', category: 'data', lang: 'Python',
    description: 'Diagnostic dashboard for Azure Kubernetes Service clusters with health insights and operational visibility.',
    stack: ['AKS', 'Azure', 'Monitoring'] },
  { repo: 'Youtube-analysis', title: 'YouTube Analysis', category: 'data', lang: 'Jupyter Notebook',
    description: 'YouTube channel and video analysis — trends, engagement metrics and content performance.',
    stack: ['Pandas', 'NLP'] },
  { repo: 'Business-Analytics-Movielens', title: 'MovieLens Analytics', category: 'data', lang: 'Jupyter Notebook',
    description: 'Business analytics on MovieLens: rating behaviour, movie trends and recommendation patterns.',
    stack: ['Pandas', 'RecSys'] },
  { repo: 'Framework-for-Test-Prioritization-using-AI-ML', title: 'Test Prioritization with ML', category: 'data', lang: 'Research',
    description: 'Research framework for intelligent test-case prioritization to optimise software testing pipelines.',
    stack: ['ML', 'Research'] },
  { repo: 'ExpenseTrackerAPI', title: 'Expense Tracker API', category: 'web', lang: 'Python',
    description: 'REST API for tracking personal expenses.',
    stack: ['FastAPI', 'REST'] },
  { repo: 'FacultyCanlender', title: 'Faculty Calendar', category: 'web', lang: 'Web',
    description: 'Faculty calendar app for scheduling and organising academic events.',
    stack: ['Web app', 'Scheduling'] },
  { repo: 'OnlineArtsStore', title: 'Online Arts Store', category: 'web', lang: 'Web',
    description: 'Online arts and crafts store with product listings, cart and checkout.',
    stack: ['E-commerce'] },
];

export const repoUrl = (p: Project) => `${profile.github}/${p.repo}`;

export interface Role {
  period: string;
  title: string;
  company: string;
  place: string;
  description: string;
  tags: string[];
}

export const experience: Role[] = [
  { period: 'May 2026 — Present', title: 'Software Engineer', company: 'Tarka Labs', place: 'Bengaluru',
    description: 'Building production-grade AI features and backend systems across LLM integrations, API design and cloud infrastructure — AI products that work reliably at scale.',
    tags: ['Python', 'LLMs', 'Azure', 'REST APIs'] },
  { period: 'Aug 2025 — Apr 2026', title: 'AI / ML Engineer', company: 'Bosch Global Software Technologies', place: 'Hyderabad',
    description: 'Built and deployed NLP-powered internal tools and RAG systems for cross-functional engineering teams. Designed LLM-backed pipelines on Azure and Streamlit interfaces for model-driven analytics.',
    tags: ['RAG', 'LLMs', 'NLP', 'Azure', 'Streamlit'] },
  { period: 'Feb 2024 — Jul 2024', title: 'Machine Learning Intern', company: 'Bosch', place: 'Bengaluru',
    description: 'Worked on NLP and predictive modelling prototypes. Contributed to model evaluation pipelines and data preprocessing workflows with PyTorch and scikit-learn.',
    tags: ['PyTorch', 'NLP', 'Python', 'scikit-learn'] },
];

export const skills: { group: string; items: string[] }[] = [
  { group: 'AI / LLM', items: ['LLM agents & tool use', 'RAG · Qdrant · FAISS', 'LangGraph · Ollama · Groq', 'MCP servers'] },
  { group: 'Machine learning', items: ['Python · PyTorch', 'HuggingFace · BERT', 'scikit-learn', 'NLP pipelines'] },
  { group: 'Data', items: ['SQL · PostgreSQL', 'Kafka · RisingWave', 'Delta Lake', 'Pandas · Jupyter'] },
  { group: 'Platform', items: ['Azure · AKS · Event Hubs', 'FastAPI · REST · SSE', 'Docker · Cloudflare Workers', 'React · TypeScript'] },
];

export const marquee = [
  'Python', 'LLM Agents', 'RAG', 'LangGraph', 'MCP', 'Qdrant', 'FastAPI', 'PyTorch',
  'Azure', 'Kafka', 'RisingWave', 'Ollama', 'Groq', 'TypeScript', 'React', 'Docker',
];
