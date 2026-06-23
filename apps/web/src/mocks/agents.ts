import type { Agent } from "../types/domain";

export const agents: Agent[] = [
  {
    id: "ag-1",
    name: "Qualificador SDR",
    slug: "qualificador-sdr",
    description: "Avalia leads, resume contexto e sugere proximo passo comercial.",
    status: "Ativo",
    model: "gpt-4.1-mini",
    tools: 5,
    cost: "R$ 128,40",
    lastRun: "ha 8 min",
  },
  {
    id: "ag-2",
    name: "Assistente de contas",
    slug: "assistente-contas",
    description: "Prepara briefings executivos antes de reunioes com contas-chave.",
    status: "Ativo",
    model: "gpt-4.1",
    tools: 7,
    cost: "R$ 412,10",
    lastRun: "ha 21 min",
  },
  {
    id: "ag-3",
    name: "Auditor de dados",
    slug: "auditor-dados",
    description: "Detecta campos inconsistentes e sinaliza automacoes arriscadas.",
    status: "Pausado",
    model: "claude-sonnet",
    tools: 3,
    cost: "R$ 58,20",
    lastRun: "ontem",
  },
];

