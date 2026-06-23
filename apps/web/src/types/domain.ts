export type StatusTone = "success" | "warning" | "danger" | "info" | "neutral";

export type Contact = {
  id: string;
  name: string;
  email: string;
  company: string;
  role: string;
  source: string;
  status: "Lead" | "Ativo" | "Cliente" | "Inativo";
  owner: string;
};

export type Deal = {
  id: string;
  title: string;
  company: string;
  owner: string;
  amount: number;
  priority: "Baixa" | "Media" | "Alta" | "Urgente";
  stage: string;
};

export type PipelineColumn = {
  id: string;
  name: string;
  probability: number;
  color: string;
  deals: Deal[];
};

export type Agent = {
  id: string;
  name: string;
  slug: string;
  description: string;
  status: "Ativo" | "Rascunho" | "Pausado";
  model: string;
  tools: number;
  cost: string;
  lastRun: string;
};

export type Workflow = {
  id: string;
  name: string;
  status: "Ativo" | "Rascunho" | "Pausado";
  version: string;
  trigger: string;
  nodes: number;
  lastRun: string;
};

export type Execution = {
  id: string;
  target: string;
  source: "Agente" | "Workflow" | "Webhook";
  status: "Sucesso" | "Falha" | "Executando" | "Fila";
  duration: string;
  cost: string;
  startedAt: string;
  steps: Array<{ title: string; status: Execution["status"]; timestamp: string }>;
};

