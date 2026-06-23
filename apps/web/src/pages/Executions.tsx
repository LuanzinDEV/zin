import { useState } from "react";
import { PageHeader } from "../components/layout/PageHeader";
import { Badge, DataTable } from "../components/ui/data";
import { Drawer } from "../components/ui/overlays";
import { executions } from "../mocks/workflows";
import type { Execution } from "../types/domain";

function executionTone(status: Execution["status"]) {
  if (status === "Sucesso") return "success" as const;
  if (status === "Falha") return "danger" as const;
  if (status === "Executando") return "info" as const;
  return "neutral" as const;
}

export function Executions() {
  const [selected, setSelected] = useState<Execution | null>(null);
  return (
    <>
      <PageHeader eyebrow="Operacao" title="Execucoes" description="Historico mockado de execucoes de agentes e workflows." />
      <DataTable
        rows={executions}
        getRowId={(row) => row.id}
        onRowClick={setSelected}
        columns={[
          { key: "id", header: "ID", render: (row) => <span className="font-mono text-xs">{row.id}</span> },
          { key: "target", header: "Alvo", render: (row) => <span className="font-semibold text-text-primary">{row.target}</span> },
          { key: "source", header: "Origem", render: (row) => row.source },
          { key: "status", header: "Status", render: (row) => <Badge tone={executionTone(row.status)}>{row.status}</Badge> },
          { key: "duration", header: "Duracao", render: (row) => row.duration },
          { key: "cost", header: "Custo", render: (row) => row.cost },
          { key: "startedAt", header: "Inicio", render: (row) => row.startedAt },
        ]}
      />
      <Drawer open={Boolean(selected)} onOpenChange={(open) => !open && setSelected(null)} title="Timeline">
        {selected ? (
          <div className="space-y-4">
            <div>
              <h2 className="font-display text-xl font-semibold text-text-primary">{selected.target}</h2>
              <p className="text-sm text-text-secondary">{selected.id}</p>
            </div>
            <div className="space-y-3">
              {selected.steps.map((step) => (
                <div key={`${step.title}-${step.timestamp}`} className="rounded-xl border border-border p-4">
                  <div className="flex items-center justify-between">
                    <p className="font-semibold text-text-primary">{step.title}</p>
                    <Badge tone={executionTone(step.status)}>{step.status}</Badge>
                  </div>
                  <p className="mt-2 font-mono text-xs text-text-muted">{step.timestamp}</p>
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </Drawer>
    </>
  );
}

