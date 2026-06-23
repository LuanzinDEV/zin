import { Plus } from "lucide-react";
import { useState } from "react";
import { PageHeader } from "../components/layout/PageHeader";
import { Button } from "../components/ui/button";
import { Badge, Card, EmptyState } from "../components/ui/data";
import { pipeline as initialPipeline } from "../mocks/crm";
import type { Deal, PipelineColumn } from "../types/domain";
import { formatCurrency } from "../lib/utils";

export function Pipeline() {
  const [columns, setColumns] = useState<PipelineColumn[]>(initialPipeline);
  const [dragged, setDragged] = useState<Deal | null>(null);

  function moveDeal(targetColumnId: string) {
    if (!dragged) return;
    setColumns((current) =>
      current.map((column) => {
        const withoutDragged = column.deals.filter((deal) => deal.id !== dragged.id);
        if (column.id === targetColumnId) {
          return { ...column, deals: [...withoutDragged, { ...dragged, stage: targetColumnId }] };
        }
        return { ...column, deals: withoutDragged };
      }),
    );
    setDragged(null);
  }

  return (
    <>
      <PageHeader
        eyebrow="CRM"
        title="Pipeline"
        description="Kanban local para visualizar oportunidades por etapa."
        actions={<Button leftIcon={<Plus className="h-4 w-4" />}>Nova oportunidade</Button>}
      />
      <div className="grid gap-4 overflow-x-auto pb-2 xl:grid-cols-4">
        {columns.map((column) => {
          const total = column.deals.reduce((sum, deal) => sum + deal.amount, 0);
          return (
            <section
              key={column.id}
              onDragOver={(event) => event.preventDefault()}
              onDrop={() => moveDeal(column.id)}
              className="min-w-72 rounded-[16px] border border-border bg-zin-navy-50 p-3 dark:bg-zin-navy-950"
            >
              <div className="mb-3 flex items-start justify-between">
                <div>
                  <h2 className="font-display font-semibold text-text-primary">{column.name}</h2>
                  <p className="text-sm text-text-secondary">
                    {column.probability}% - {formatCurrency(total)}
                  </p>
                </div>
                <span className="mt-1 h-3 w-3 rounded-full" style={{ backgroundColor: column.color }} />
              </div>
              <div className="space-y-3">
                {column.deals.length ? (
                  column.deals.map((deal) => (
                    <Card
                      key={deal.id}
                      className="cursor-grab p-4 active:cursor-grabbing"
                    >
                      <article draggable onDragStart={() => setDragged(deal)}>
                        <div className="flex items-start justify-between gap-3">
                          <h3 className="font-semibold text-text-primary">{deal.title}</h3>
                          <Badge tone={deal.priority === "Urgente" ? "danger" : "warning"}>
                            {deal.priority}
                          </Badge>
                        </div>
                        <p className="mt-2 text-sm text-text-secondary">{deal.company}</p>
                        <div className="mt-4 flex items-center justify-between text-sm">
                          <span className="font-semibold text-text-primary">{formatCurrency(deal.amount)}</span>
                          <span className="text-text-muted">{deal.owner}</span>
                        </div>
                      </article>
                    </Card>
                  ))
                ) : (
                  <EmptyState title="Sem oportunidades" description="Arraste um card para esta etapa." />
                )}
              </div>
            </section>
          );
        })}
      </div>
    </>
  );
}

