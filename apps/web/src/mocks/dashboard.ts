export const metrics = [
  { label: "Oportunidades abertas", value: "48", delta: "+12%", tone: "success" },
  { label: "Pipeline total", value: "R$ 842 mil", delta: "+8,4%", tone: "success" },
  { label: "Agentes ativos", value: "12", delta: "+2", tone: "info" },
  { label: "Execuções hoje", value: "1.284", delta: "97,8%", tone: "success" },
  { label: "Taxa de sucesso", value: "96,4%", delta: "-1,1%", tone: "warning" },
] as const;

export const executionSeries = [42, 64, 58, 88, 76, 104, 94, 126, 116, 142, 138, 156];

export const recentActivities = [
  "Agente Qualificador marcou 7 leads como alta prioridade",
  "Workflow de onboarding publicou a versao 4",
  "Webhook de proposta recebeu 18 eventos",
  "Pipeline Enterprise avancou R$ 96 mil para negociacao",
];

export const failedAutomations = [
  { name: "Enriquecer CNPJ", count: 3, owner: "Marina" },
  { name: "Notificar Slack", count: 2, owner: "Rafael" },
  { name: "Atualizar ERP", count: 1, owner: "Bianca" },
];

