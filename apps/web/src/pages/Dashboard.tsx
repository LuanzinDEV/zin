import { AlertTriangle, Bot, GitBranch, PlayCircle, TrendingUp } from "lucide-react";
import { ExecutionChart } from "../components/charts/ExecutionChart";
import { PageHeader } from "../components/layout/PageHeader";
import { Badge, Card, MetricCard } from "../components/ui/data";
import { executionSeries, failedAutomations, metrics, recentActivities } from "../mocks/dashboard";

const icons = [GitBranch, TrendingUp, Bot, PlayCircle, TrendingUp];

export function Dashboard() {
  return (
    <>
      <PageHeader
        eyebrow="Operacao"
        title="Dashboard"
        description="Visao executiva do CRM, automacoes e execucoes operacionais."
      />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {metrics.map((metric, index) => {
          const Icon = icons[index];
          return (
            <MetricCard
              key={metric.label}
              label={metric.label}
              value={metric.value}
              delta={metric.delta}
              icon={<Icon className="h-5 w-5" />}
            />
          );
        })}
      </div>
      <div className="mt-6 grid gap-6 xl:grid-cols-[1.5fr_1fr]">
        <Card>
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="font-display text-xl font-semibold text-text-primary">Execucoes</h2>
              <p className="text-sm text-text-secondary">Volume por janela de 2 horas</p>
            </div>
            <Badge tone="success">Estavel</Badge>
          </div>
          <ExecutionChart values={executionSeries} />
        </Card>
        <Card>
          <h2 className="font-display text-xl font-semibold text-text-primary">Atividades recentes</h2>
          <div className="mt-4 space-y-3">
            {recentActivities.map((activity) => (
              <div key={activity} className="rounded-xl border border-border p-3 text-sm text-text-secondary">
                {activity}
              </div>
            ))}
          </div>
        </Card>
      </div>
      <Card className="mt-6">
        <div className="mb-4 flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-amber-500" />
          <h2 className="font-display text-xl font-semibold text-text-primary">Automacoes com falha</h2>
        </div>
        <div className="grid gap-3 md:grid-cols-3">
          {failedAutomations.map((item) => (
            <div key={item.name} className="rounded-xl border border-border p-4">
              <div className="flex items-center justify-between">
                <p className="font-semibold text-text-primary">{item.name}</p>
                <Badge tone="danger">{item.count}</Badge>
              </div>
              <p className="mt-2 text-sm text-text-secondary">Responsavel: {item.owner}</p>
            </div>
          ))}
        </div>
      </Card>
    </>
  );
}

