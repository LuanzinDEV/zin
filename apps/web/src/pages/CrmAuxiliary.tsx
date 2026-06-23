import { PageHeader } from "../components/layout/PageHeader";
import { Badge, DataTable } from "../components/ui/data";
import { companies, pipeline } from "../mocks/crm";
import { formatCurrency } from "../lib/utils";

export function Companies() {
  return (
    <>
      <PageHeader eyebrow="CRM" title="Empresas" description="Contas mockadas do CRM." />
      <DataTable
        rows={companies}
        getRowId={(row) => row.name}
        columns={[
          { key: "name", header: "Empresa", render: (row) => <span className="font-semibold text-text-primary">{row.name}</span> },
          { key: "industry", header: "Segmento", render: (row) => row.industry },
          { key: "owner", header: "Responsavel", render: (row) => row.owner },
          { key: "status", header: "Status", render: (row) => <Badge tone="info">{row.status}</Badge> },
          { key: "value", header: "Pipeline", render: (row) => row.value },
        ]}
      />
    </>
  );
}

export function Opportunities() {
  const deals = pipeline.flatMap((column) => column.deals.map((deal) => ({ ...deal, stageName: column.name })));
  return (
    <>
      <PageHeader eyebrow="CRM" title="Oportunidades" description="Oportunidades mockadas em todas as etapas." />
      <DataTable
        rows={deals}
        getRowId={(row) => row.id}
        columns={[
          { key: "title", header: "Oportunidade", render: (row) => <span className="font-semibold text-text-primary">{row.title}</span> },
          { key: "company", header: "Empresa", render: (row) => row.company },
          { key: "stage", header: "Etapa", render: (row) => row.stageName },
          { key: "amount", header: "Valor", render: (row) => formatCurrency(row.amount) },
          { key: "owner", header: "Responsavel", render: (row) => row.owner },
        ]}
      />
    </>
  );
}

