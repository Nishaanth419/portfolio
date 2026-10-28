// Build-time only: imported from .astro frontmatter so simple-icons never reaches the client bundle.
import {
  siDocker, siFastapi, siLanggraph, siModelcontextprotocol, siOllama,
  siPython, siPytorch, siQdrant, siReact, siTypescript,
} from 'simple-icons';

export interface TechIcon {
  /** SVG path data in a 24×24 viewBox. */
  path: string;
  /** Brand colour, used on hover. */
  hex?: string;
  /** Generic icons are line drawings; brand logos are filled. */
  stroke?: boolean;
}

const brand = (icon: { path: string; hex: string }): TechIcon => ({ path: icon.path, hex: `#${icon.hex}` });

// Plain stand-ins for tech without a Simple Icons logo, and for concepts that aren't brands.
const generic: Record<string, TechIcon> = {
  agents: { stroke: true, path: 'M8.5 6h7M7.2 8.2l3.6 7.6M16.8 8.2l-3.6 7.6M6 3.5a2.5 2.5 0 1 1 0 5a2.5 2.5 0 1 1 0-5ZM18 3.5a2.5 2.5 0 1 1 0 5a2.5 2.5 0 1 1 0-5ZM12 15.5a2.5 2.5 0 1 1 0 5a2.5 2.5 0 1 1 0-5Z' },
  rag: { stroke: true, path: 'M4 6c0-1.7 3.6-3 8-3s8 1.3 8 3-3.6 3-8 3-8-1.3-8-3ZM4 6v6c0 1.7 3.6 3 8 3s8-1.3 8-3V6M4 12v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6' },
  cloud: { stroke: true, path: 'M7 18h10a4 4 0 0 0 .6-7.96A6 6 0 0 0 6.1 9.2 4.5 4.5 0 0 0 7 18Z' },
  bolt: { stroke: true, path: 'M13 2 4 14h7l-1 8 9-12h-7l1-8Z' },
};

export const techIcons: Record<string, TechIcon> = {
  'Python': brand(siPython),
  'LLM Agents': generic.agents,
  'RAG': generic.rag,
  'LangGraph': brand(siLanggraph),
  'MCP': brand(siModelcontextprotocol),
  'Qdrant': brand(siQdrant),
  'FastAPI': brand(siFastapi),
  'PyTorch': brand(siPytorch),
  'Azure': generic.cloud,
  'Ollama': brand(siOllama),
  'Groq': generic.bolt,
  'TypeScript': brand(siTypescript),
  'React': brand(siReact),
  'Docker': brand(siDocker),
};
