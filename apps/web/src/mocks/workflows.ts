import type { Execution, Workflow } from "../types/domain";

export const workflows: Workflow[] = [
  {
    id: "wf-1",
    name: "Entrada de lead enterprise",
    status: "Ativo",
    version: "v6",
    trigger: "Webhook",
    nodes: 9,
    lastRun: "ha 4 min",
  },
  {
    id: "wf-2",
    name: "Renovacao anual",
    status: "Ativo",
    version: "v3",
    trigger: "Schedule",
    nodes: 12,
    lastRun: "ha 1 h",
  },
  {
    id: "wf-3",
    name: "Reativacao de oportunidades",
    status: "Rascunho",
    version: "v1",
    trigger: "Manual",
    nodes: 6,
    lastRun: "nunca",
  },
];

export const executions: Execution[] = [
  {
    id: "ex-1029",
    target: "Entrada de lead enterprise",
    source: "Workflow",
    status: "Sucesso",
    duration: "4,8s",
    cost: "R$ 0,42",
    startedAt: "10:42",
    steps: [
      { title: "Webhook recebido", status: "Sucesso", timestamp: "10:42:01" },
      { title: "Lead enriquecido", status: "Sucesso", timestamp: "10:42:03" },
      { title: "Agente executado", status: "Sucesso", timestamp: "10:42:05" },
    ],
  },
  {
    id: "ex-1028",
    target: "Qualificador SDR",
    source: "Agente",
    status: "Falha",
    duration: "2,1s",
    cost: "R$ 0,18",
    startedAt: "10:38",
    steps: [
      { title: "Contato carregado", status: "Sucesso", timestamp: "10:38:10" },
      { title: "Ferramenta HTTP", status: "Falha", timestamp: "10:38:12" },
    ],
  },
  {
    id: "ex-1027",
    target: "Renovacao anual",
    source: "Workflow",
    status: "Executando",
    duration: "12,4s",
    cost: "R$ 0,91",
    startedAt: "10:35",
    steps: [
      { title: "Busca de contratos", status: "Sucesso", timestamp: "10:35:00" },
      { title: "Geracao de resumo", status: "Executando", timestamp: "10:35:08" },
    ],
  },
];

export const builderNodes = [
  { id: "trigger", label: "Webhook", x: 32, y: 80, tone: "info" },
  { id: "filter", label: "Validar payload", x: 260, y: 80, tone: "warning" },
  { id: "agent", label: "Agente SDR", x: 488, y: 80, tone: "success" },
  { id: "crm", label: "Atualizar CRM", x: 716, y: 80, tone: "neutral" },
];

