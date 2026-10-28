export const profile = {
  name: 'Nishaanth K N',
  shortName: 'Nishaanth',
  role: 'AI Engineer',
  location: 'Chennai, IN',
  timezone: 'Asia/Kolkata',
  email: 'knnishaanth@gmail.com',
  github: 'https://github.com/Nishaanth419',
  githubUser: 'Nishaanth419',
  linkedin: 'https://www.linkedin.com/in/nishaanth-k-n-a59a38232/',
  linkedinUser: 'nishaanth-k-n',
};

export type Category = 'agents' | 'rag';

export const categories: Record<Category, string> = {
  agents: 'Agents',
  rag: 'RAG',
};

export const langColors: Record<string, string> = {
  Python: '#3EF0A8',
  TypeScript: '#4C7BFF',
  JavaScript: '#E8D44D',
};

export interface Project {
  /** Repository name on GitHub, also used to build the link. */
  repo: string;
  /** Display title, when it should differ from the repo name. */
  title?: string;
  category: Category;
  lang: string;
  description: string;
  stack: string[];
}

// Agent and RAG projects from github.com/Nishaanth419, shown in this order. The first gets the large tile.
export const projects: Project[] = [
  { repo: 'CAMode', category: 'agents', lang: 'TypeScript',
    description: 'A TypeScript agent that exposes MCP tools as a typed API, then runs the code it writes inside a sandboxed Cloudflare Worker.',
    stack: ['MCP', 'Cloudflare Workers', 'TypeScript'] },
  { repo: 'A2UI-GenUI', category: 'agents', lang: 'Python',
    description: 'Ask for a financial view in plain English and the dashboard composes itself live, streamed over the A2UI protocol with Groq structured outputs.',
    stack: ['FastAPI', 'React', 'Groq', 'SSE'] },
  { repo: 'Ai_Agent-Support', title: 'AI Agent Support', category: 'agents', lang: 'Python',
    description: 'A support triage agent written from scratch in Python, with its own agent loop, tool dispatch, context handling and guardrails.',
    stack: ['Groq', 'Tool use', 'Guardrails'] },
  { repo: 'fieldnotes-research-assistant', title: 'Fieldnotes', category: 'agents', lang: 'Python',
    description: 'A local team of research agents that studies urban heat resilience and answers only from a curated set of sources.',
    stack: ['LangGraph', 'Ollama', 'Tavily'] },
  { repo: 'SRE_Bot_Bosch', title: 'SRE Bot', category: 'agents', lang: 'Python',
    description: 'Turns incident alerts into runbooks. It reads the logs with GPT-4.1-mini, finds similar past incidents and posts the fix to Teams.',
    stack: ['Azure OpenAI', 'AI Search', 'Teams'] },
  { repo: 'TarkaFoods_RAG_Support', title: 'TarkaFoods RAG Support', category: 'rag', lang: 'Python',
    description: 'Customer support answers grounded in company documents, with citations, served through ingest, query and streaming endpoints.',
    stack: ['Qdrant', 'Ollama', 'FastAPI'] },
  { repo: 'Qdrant_RAG', title: 'Qdrant RAG', category: 'rag', lang: 'Python',
    description: 'A testbed that compares retrieval strategies for RAG, alone and combined, on top of Qdrant.',
    stack: ['Qdrant', 'Hybrid retrieval'] },
  { repo: 'ChunkMate', category: 'rag', lang: 'JavaScript',
    description: 'Splits Markdown into meaningful sections and stores them in PostgreSQL, ready for retrieval pipelines.',
    stack: ['Chunking', 'PostgreSQL'] },
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
  { period: 'May 2026 to Present', title: 'Software Engineer', company: 'Tarka Labs', place: 'Chennai',
    description: 'I build AI features and backend services for client products, covering LLM integrations, API design and cloud infrastructure.',
    tags: ['Python', 'LLMs', 'Azure', 'REST APIs'] },
  { period: 'Aug 2025 to Apr 2026', title: 'AI / ML Engineer', company: 'Bosch Global Software Technologies', place: 'Hyderabad',
    description: 'Shipped RAG systems and NLP tools used by engineering teams across the company. Designed LLM pipelines on Azure and built Streamlit apps for model driven analytics.',
    tags: ['RAG', 'LLMs', 'NLP', 'Azure', 'Streamlit'] },
  { period: 'Feb 2024 to Jul 2024', title: 'Machine Learning Intern', company: 'Bosch', place: 'Bengaluru',
    description: 'Prototyped NLP and predictive models, and helped build evaluation and data preprocessing pipelines with PyTorch and scikit-learn.',
    tags: ['PyTorch', 'NLP', 'Python', 'scikit-learn'] },
];

export const skills: { group: string; items: string[] }[] = [
  { group: 'AI / LLM', items: ['LLM agents & tool use', 'RAG · Qdrant · FAISS', 'LangGraph · Ollama · Groq', 'MCP servers'] },
  { group: 'Machine learning', items: ['Python · PyTorch', 'HuggingFace · BERT', 'scikit-learn', 'NLP pipelines'] },
  { group: 'Data', items: ['SQL · PostgreSQL', 'Delta Lake', 'Pandas · Jupyter'] },
  { group: 'Platform', items: ['Azure · AKS · Event Hubs', 'FastAPI · REST · SSE', 'Docker · Cloudflare Workers', 'React · TypeScript'] },
];

export const marquee = [
  'Python', 'LLM Agents', 'RAG', 'LangGraph', 'MCP', 'Qdrant', 'FastAPI', 'PyTorch',
  'Azure', 'Ollama', 'Groq', 'TypeScript', 'React', 'Docker',
];
