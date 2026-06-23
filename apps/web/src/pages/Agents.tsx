import { Bot, Plus } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { PageHeader } from "../components/layout/PageHeader";
import { Button } from "../components/ui/button";
import { Badge, Card } from "../components/ui/data";
import { Tabs, TabsContent, TabsList, TabsTrigger, tabTriggerClass } from "../components/ui/overlays";
import { agents } from "../mocks/agents";

function statusTone(status: string) {
  if (status === "Ativo") return "success" as const;
  if (status === "Pausado") return "warning" as const;
  return "neutral" as const;
}

export function Agents() {
  return (
    <>
      <PageHeader
        eyebrow="Agentes"
        title="Agentes"
        description="Configuracoes mockadas de agentes, modelos e ferramentas."
        actions={<Button leftIcon={<Plus className="h-4 w-4" />}>Novo agente</Button>}
      />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {agents.map((agent) => (
          <Link key={agent.id} to={`/agents/${agent.id}`}>
            <Card className="h-full transition hover:-translate-y-0.5 hover:shadow-soft">
              <div className="mb-5 flex items-start justify-between">
                <div className="rounded-xl bg-primary-soft p-3 text-primary">
                  <Bot className="h-5 w-5" />
                </div>
                <Badge tone={statusTone(agent.status)}>{agent.status}</Badge>
              </div>
              <h2 className="font-display text-xl font-semibold text-text-primary">{agent.name}</h2>
              <p className="mt-2 min-h-12 text-sm text-text-secondary">{agent.description}</p>
              <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="text-text-muted">Modelo</p>
                  <p className="font-semibold text-text-primary">{agent.model}</p>
                </div>
                <div>
                  <p className="text-text-muted">Ferramentas</p>
                  <p className="font-semibold text-text-primary">{agent.tools}</p>
                </div>
                <div>
                  <p className="text-text-muted">Custo</p>
                  <p className="font-semibold text-text-primary">{agent.cost}</p>
                </div>
                <div>
                  <p className="text-text-muted">Ultima execucao</p>
                  <p className="font-semibold text-text-primary">{agent.lastRun}</p>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </>
  );
}

export function AgentDetails() {
  const { agentId } = useParams();
  const agent = agents.find((item) => item.id === agentId) ?? agents[0];

  return (
    <>
      <PageHeader
        eyebrow="Agente"
        title={agent.name}
        description={agent.description}
        actions={<Badge tone={statusTone(agent.status)}>{agent.status}</Badge>}
      />
      <Tabs defaultValue="overview">
        <TabsList className="mb-5 flex flex-wrap gap-2">
          {["overview", "prompt", "tools", "versions", "runs"].map((tab) => (
            <TabsTrigger key={tab} value={tab} className={tabTriggerClass}>
              {tab}
            </TabsTrigger>
          ))}
        </TabsList>
        <TabsContent value="overview">
          <Card>
            <div className="grid gap-4 md:grid-cols-4">
              <Metric label="Modelo" value={agent.model} />
              <Metric label="Ferramentas" value={`${agent.tools}`} />
              <Metric label="Custo mensal" value={agent.cost} />
              <Metric label="Ultima execucao" value={agent.lastRun} />
            </div>
          </Card>
        </TabsContent>
        <TabsContent value="prompt">
          <Card>
            <pre className="whitespace-pre-wrap rounded-xl bg-zin-navy-950 p-4 font-mono text-sm text-zin-navy-50">
              Voce qualifica leads B2B, identifica urgencia, resume contexto e sugere a proxima acao comercial.
            </pre>
          </Card>
        </TabsContent>
        <TabsContent value="tools">
          <Card>
            <div className="grid gap-3 md:grid-cols-3">
              {["CRM read", "HTTP enrichment", "Webhook notify", "Deal update"].map((tool) => (
                <div key={tool} className="rounded-xl border border-border p-4">
                  <p className="font-semibold text-text-primary">{tool}</p>
                  <p className="mt-1 text-sm text-text-secondary">Aprovacao condicional</p>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>
        <TabsContent value="versions">
          <Card>
            {["v3 publicada", "v2 arquivada", "v1 arquivada"].map((version) => (
              <div key={version} className="border-b border-border py-3 last:border-0">
                {version}
              </div>
            ))}
          </Card>
        </TabsContent>
        <TabsContent value="runs">
          <Card>
            {["ex-1028", "ex-1019", "ex-1004"].map((run) => (
              <div key={run} className="border-b border-border py-3 last:border-0">
                {run}
              </div>
            ))}
          </Card>
        </TabsContent>
      </Tabs>
    </>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-border p-4">
      <p className="text-sm text-text-muted">{label}</p>
      <p className="mt-1 font-display text-lg font-semibold text-text-primary">{value}</p>
    </div>
  );
}
