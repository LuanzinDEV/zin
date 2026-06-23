import { useSearchParams } from "react-router-dom";
import { PageHeader } from "../components/layout/PageHeader";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/data";
import { Checkbox, Input, Select, Switch, Textarea } from "../components/ui/forms";
import { Tabs, TabsContent, TabsList, TabsTrigger, tabTriggerClass } from "../components/ui/overlays";

export function Settings() {
  const [params] = useSearchParams();
  const defaultTab = params.get("tab") === "integrations" ? "integrations" : "profile";
  return (
    <>
      <PageHeader eyebrow="Admin" title="Configuracoes" description="Preferencias locais e cards demonstrativos de integracao." />
      <Tabs defaultValue={defaultTab}>
        <TabsList className="mb-5 flex flex-wrap gap-2">
          {[
            ["profile", "Perfil"],
            ["org", "Organizacao"],
            ["appearance", "Aparencia"],
            ["preferences", "Preferencias"],
            ["integrations", "Integracoes"],
          ].map(([value, label]) => (
            <TabsTrigger key={value} value={value} className={tabTriggerClass}>
              {label}
            </TabsTrigger>
          ))}
        </TabsList>
        <TabsContent value="profile">
          <Card className="max-w-2xl space-y-4">
            <Input defaultValue="Marina Costa" />
            <Input defaultValue="marina@zin.local" />
            <Textarea defaultValue="Revenue operations" />
            <Button>Salvar</Button>
          </Card>
        </TabsContent>
        <TabsContent value="org">
          <Card className="max-w-2xl space-y-4">
            <Input defaultValue="ZIN Labs" />
            <Input defaultValue="zin-labs" />
            <Select
              value="active"
              options={[
                { label: "Ativa", value: "active" },
                { label: "Suspensa", value: "suspended" },
              ]}
            />
          </Card>
        </TabsContent>
        <TabsContent value="appearance">
          <Card className="max-w-2xl space-y-4">
            <Switch label="Compactar tabelas" />
            <Switch label="Reduzir animacoes" />
          </Card>
        </TabsContent>
        <TabsContent value="preferences">
          <Card className="max-w-2xl space-y-4">
            <Checkbox label="Enviar resumo diario" />
            <Checkbox label="Notificar falhas criticas" />
          </Card>
        </TabsContent>
        <TabsContent value="integrations">
          <div className="grid gap-4 md:grid-cols-3">
            {["Salesforce", "HubSpot", "Slack", "ERP interno", "Webhook", "Data warehouse"].map((name) => (
              <Card key={name}>
                <h2 className="font-display text-lg font-semibold text-text-primary">{name}</h2>
                <p className="mt-2 text-sm text-text-secondary">Conector demonstrativo</p>
                <Button className="mt-4" variant="secondary">
                  Configurar
                </Button>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </>
  );
}
