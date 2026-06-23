import type { Contact, PipelineColumn } from "../types/domain";

export const contacts: Contact[] = [
  {
    id: "ct-1",
    name: "Ana Ribeiro",
    email: "ana.ribeiro@northstar.io",
    company: "Northstar",
    role: "Head de Receita",
    source: "Outbound",
    status: "Ativo",
    owner: "Marina",
  },
  {
    id: "ct-2",
    name: "Carlos Nunes",
    email: "carlos@orbital.dev",
    company: "Orbital",
    role: "CTO",
    source: "Evento",
    status: "Lead",
    owner: "Rafael",
  },
  {
    id: "ct-3",
    name: "Livia Martins",
    email: "livia@atlaspay.com",
    company: "AtlasPay",
    role: "COO",
    source: "Indicacao",
    status: "Cliente",
    owner: "Bianca",
  },
  {
    id: "ct-4",
    name: "Pedro Alves",
    email: "pedro@zenit.ai",
    company: "Zenit AI",
    role: "Founder",
    source: "Inbound",
    status: "Ativo",
    owner: "Marina",
  },
];

export const pipeline: PipelineColumn[] = [
  {
    id: "lead",
    name: "Qualificacao",
    probability: 20,
    color: "#3B82F6",
    deals: [
      {
        id: "dl-1",
        title: "CRM programavel",
        company: "Orbital",
        owner: "Rafael",
        amount: 64000,
        priority: "Alta",
        stage: "lead",
      },
      {
        id: "dl-2",
        title: "Automacao comercial",
        company: "Zenit AI",
        owner: "Marina",
        amount: 42000,
        priority: "Media",
        stage: "lead",
      },
    ],
  },
  {
    id: "proposal",
    name: "Proposta",
    probability: 55,
    color: "#F59E0B",
    deals: [
      {
        id: "dl-3",
        title: "Agentes de suporte",
        company: "AtlasPay",
        owner: "Bianca",
        amount: 118000,
        priority: "Alta",
        stage: "proposal",
      },
    ],
  },
  {
    id: "negotiation",
    name: "Negociacao",
    probability: 76,
    color: "#FD5512",
    deals: [
      {
        id: "dl-4",
        title: "Workflows B2B",
        company: "Northstar",
        owner: "Marina",
        amount: 184000,
        priority: "Urgente",
        stage: "negotiation",
      },
    ],
  },
  {
    id: "won",
    name: "Ganho",
    probability: 100,
    color: "#22C55E",
    deals: [],
  },
];

export const companies = [
  { name: "Northstar", industry: "SaaS", owner: "Marina", status: "Cliente", value: "R$ 184 mil" },
  { name: "Orbital", industry: "Developer tools", owner: "Rafael", status: "Prospect", value: "R$ 64 mil" },
  { name: "AtlasPay", industry: "Fintech", owner: "Bianca", status: "Cliente", value: "R$ 118 mil" },
];

