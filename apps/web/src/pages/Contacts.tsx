import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import { PageHeader } from "../components/layout/PageHeader";
import { Avatar, Badge, DataTable, EmptyState } from "../components/ui/data";
import { Input, Select } from "../components/ui/forms";
import { Drawer } from "../components/ui/overlays";
import { contacts } from "../mocks/crm";
import type { Contact } from "../types/domain";

function toneFor(status: Contact["status"]) {
  if (status === "Cliente") return "success" as const;
  if (status === "Lead") return "info" as const;
  if (status === "Inativo") return "neutral" as const;
  return "warning" as const;
}

export function Contacts() {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("all");
  const [selected, setSelected] = useState<Contact | null>(null);
  const filtered = useMemo(
    () =>
      contacts.filter((contact) => {
        const matchesQuery = `${contact.name} ${contact.company} ${contact.email}`
          .toLowerCase()
          .includes(query.toLowerCase());
        const matchesStatus = status === "all" || contact.status === status;
        return matchesQuery && matchesStatus;
      }),
    [query, status],
  );

  return (
    <>
      <PageHeader eyebrow="CRM" title="Contatos" description="Relacionamentos e responsaveis comerciais." />
      <div className="mb-4 grid gap-3 md:grid-cols-[1fr_220px]">
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
          <Input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Buscar contatos" className="pl-9" />
        </div>
        <Select
          value={status}
          onValueChange={setStatus}
          options={[
            { label: "Todos", value: "all" },
            { label: "Lead", value: "Lead" },
            { label: "Ativo", value: "Ativo" },
            { label: "Cliente", value: "Cliente" },
          ]}
        />
      </div>
      {filtered.length ? (
        <DataTable
          rows={filtered}
          getRowId={(row) => row.id}
          onRowClick={setSelected}
          columns={[
            {
              key: "name",
              header: "Contato",
              render: (row) => (
                <div className="flex items-center gap-3">
                  <Avatar name={row.name} />
                  <div>
                    <p className="font-semibold text-text-primary">{row.name}</p>
                    <p className="text-xs text-text-muted">{row.email}</p>
                  </div>
                </div>
              ),
            },
            { key: "company", header: "Empresa", render: (row) => row.company },
            { key: "role", header: "Cargo", render: (row) => row.role },
            { key: "source", header: "Origem", render: (row) => row.source },
            { key: "owner", header: "Responsavel", render: (row) => row.owner },
            { key: "status", header: "Status", render: (row) => <Badge tone={toneFor(row.status)}>{row.status}</Badge> },
          ]}
        />
      ) : (
        <EmptyState title="Nenhum contato" description="Ajuste os filtros para encontrar registros." />
      )}
      <Drawer open={Boolean(selected)} onOpenChange={(open) => !open && setSelected(null)} title="Detalhes do contato">
        {selected ? (
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Avatar name={selected.name} />
              <div>
                <h2 className="font-display text-xl font-semibold text-text-primary">{selected.name}</h2>
                <p className="text-sm text-text-secondary">{selected.role}</p>
              </div>
            </div>
            {Object.entries(selected).map(([key, value]) => (
              <div key={key} className="rounded-xl border border-border p-3">
                <p className="text-xs uppercase tracking-[0.08em] text-text-muted">{key}</p>
                <p className="mt-1 text-sm font-semibold text-text-primary">{value}</p>
              </div>
            ))}
          </div>
        ) : null}
      </Drawer>
    </>
  );
}

