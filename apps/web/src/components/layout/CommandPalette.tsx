import { Search } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "../ui/forms";
import { Dialog } from "../ui/overlays";

const commands = [
  { label: "Dashboard", path: "/" },
  { label: "Contatos", path: "/crm/contacts" },
  { label: "Empresas", path: "/crm/companies" },
  { label: "Oportunidades", path: "/crm/opportunities" },
  { label: "Pipeline", path: "/crm/pipeline" },
  { label: "Agentes", path: "/agents" },
  { label: "Workflows", path: "/workflows" },
  { label: "Execucoes", path: "/executions" },
  { label: "Configuracoes", path: "/settings" },
];

export function CommandPalette({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const filtered = useMemo(
    () => commands.filter((command) => command.label.toLowerCase().includes(query.toLowerCase())),
    [query],
  );

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        onOpenChange(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onOpenChange]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange} title="Buscar">
      <div className="relative">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
        <Input value={query} onChange={(event) => setQuery(event.target.value)} className="pl-9" autoFocus />
      </div>
      <div className="mt-4 max-h-80 overflow-y-auto">
        {filtered.map((command) => (
          <button
            key={command.path}
            className="flex w-full items-center justify-between rounded-xl px-3 py-3 text-left text-sm font-semibold text-text-primary transition hover:bg-zin-navy-50 dark:hover:bg-zin-navy-800"
            onClick={() => {
              navigate(command.path);
              onOpenChange(false);
            }}
          >
            {command.label}
            <span className="font-mono text-xs text-text-muted">{command.path}</span>
          </button>
        ))}
      </div>
    </Dialog>
  );
}
