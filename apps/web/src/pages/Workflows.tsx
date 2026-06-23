import { GitBranch, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { PageHeader } from "../components/layout/PageHeader";
import { Button } from "../components/ui/button";
import { Badge, Card, DataTable } from "../components/ui/data";
import { builderNodes, workflows } from "../mocks/workflows";
import type { Workflow } from "../types/domain";

function tone(status: Workflow["status"]) {
  if (status === "Ativo") return "success" as const;
  if (status === "Pausado") return "warning" as const;
  return "neutral" as const;
}

export function Workflows() {
  return (
    <>
      <PageHeader
        eyebrow="Workflows"
        title="Workflows"
        description="Listagem mockada de automacoes e versoes publicadas."
        actions={
          <>
            <Link
              to="/workflows/builder"
              className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-border bg-surface px-4 text-sm font-semibold text-text-primary transition hover:bg-zin-navy-50 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[var(--focus-ring)] dark:hover:bg-zin-navy-800"
            >
              <GitBranch className="h-4 w-4" />
              Builder
            </Link>
            <Button leftIcon={<Plus className="h-4 w-4" />}>Novo workflow</Button>
          </>
        }
      />
      <DataTable
        rows={workflows}
        getRowId={(row) => row.id}
        columns={[
          { key: "name", header: "Workflow", render: (row) => <span className="font-semibold text-text-primary">{row.name}</span> },
          { key: "status", header: "Status", render: (row) => <Badge tone={tone(row.status)}>{row.status}</Badge> },
          { key: "version", header: "Versao", render: (row) => row.version },
          { key: "trigger", header: "Gatilho", render: (row) => row.trigger },
          { key: "nodes", header: "Nos", render: (row) => row.nodes },
          { key: "lastRun", header: "Ultima execucao", render: (row) => row.lastRun },
        ]}
      />
    </>
  );
}

export function WorkflowBuilder() {
  return (
    <>
      <PageHeader
        eyebrow="Workflows"
        title="Builder"
        description="Representacao estatica de um fluxo; sem motor real nesta etapa."
      />
      <Card className="overflow-x-auto">
        <div className="relative h-72 min-w-[920px]">
          <svg className="absolute inset-0 h-full w-full" aria-hidden="true">
            <line x1="148" y1="104" x2="260" y2="104" stroke="var(--border-strong)" strokeWidth="2" />
            <line x1="376" y1="104" x2="488" y2="104" stroke="var(--border-strong)" strokeWidth="2" />
            <line x1="604" y1="104" x2="716" y2="104" stroke="var(--border-strong)" strokeWidth="2" />
          </svg>
          {builderNodes.map((node) => (
            <div
              key={node.id}
              className="absolute w-40 rounded-[16px] border border-border bg-surface p-4 shadow-sm"
              style={{ left: node.x, top: node.y }}
            >
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-primary-soft text-primary">
                <GitBranch className="h-5 w-5" />
              </div>
              <p className="font-semibold text-text-primary">{node.label}</p>
              <p className="mt-1 text-xs text-text-muted">node.{node.id}</p>
            </div>
          ))}
        </div>
      </Card>
    </>
  );
}
