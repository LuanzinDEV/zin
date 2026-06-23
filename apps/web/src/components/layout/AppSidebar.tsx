import {
  Bot,
  Building2,
  ChevronDown,
  Contact,
  Gauge,
  GitBranch,
  Layers3,
  PanelLeftClose,
  PanelLeftOpen,
  PlayCircle,
  Settings,
  UsersRound,
  Workflow,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { cn } from "../../lib/utils";
import { useUiStore } from "../../stores/ui-store";
import { IconButton } from "../ui/button";
import { Tooltip } from "../ui/overlays";
import { BrandLogo } from "./BrandLogo";

const nav = [
  { label: "Dashboard", to: "/", icon: Gauge },
  {
    label: "CRM",
    icon: UsersRound,
    children: [
      { label: "Contatos", to: "/crm/contacts", icon: Contact },
      { label: "Empresas", to: "/crm/companies", icon: Building2 },
      { label: "Oportunidades", to: "/crm/opportunities", icon: Layers3 },
      { label: "Pipeline", to: "/crm/pipeline", icon: GitBranch },
    ],
  },
  { label: "Agentes", to: "/agents", icon: Bot },
  { label: "Workflows", to: "/workflows", icon: Workflow },
  { label: "Execucoes", to: "/executions", icon: PlayCircle },
  { label: "Integracoes", to: "/settings?tab=integrations", icon: Layers3 },
  { label: "Configuracoes", to: "/settings", icon: Settings },
] as const;

export function AppSidebar({ mobile = false, onNavigate }: { mobile?: boolean; onNavigate?: () => void }) {
  const collapsed = useUiStore((state) => state.sidebarCollapsed);
  const toggleSidebar = useUiStore((state) => state.toggleSidebar);
  const compact = collapsed && !mobile;

  return (
    <aside
      className={cn(
        "flex h-full flex-col border-r border-border bg-surface transition-[width]",
        compact ? "w-20" : "w-72",
        mobile && "w-full border-r-0",
      )}
    >
      <div className="flex h-20 items-center justify-between px-5">
        <BrandLogo compact={compact} />
        {!mobile ? (
          <Tooltip label={compact ? "Expandir" : "Recolher"}>
            <IconButton label={compact ? "Expandir sidebar" : "Recolher sidebar"} onClick={toggleSidebar}>
              {compact ? <PanelLeftOpen className="h-4 w-4" /> : <PanelLeftClose className="h-4 w-4" />}
            </IconButton>
          </Tooltip>
        ) : null}
      </div>
      <nav className="flex-1 space-y-1 overflow-y-auto px-3 pb-5">
        {nav.map((item) => {
          const Icon = item.icon;
          if ("children" in item) {
            return (
              <div key={item.label} className="pt-2">
                <div
                  className={cn(
                    "mb-1 flex items-center gap-3 px-3 py-2 text-xs font-bold uppercase tracking-[0.08em] text-text-muted",
                    compact && "justify-center px-0",
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {!compact ? <span>{item.label}</span> : null}
                  {!compact ? <ChevronDown className="ml-auto h-3.5 w-3.5" /> : null}
                </div>
                <div className="space-y-1">
                  {item.children.map((child) => {
                    const ChildIcon = child.icon;
                    return (
                      <NavLink
                        key={child.to}
                        to={child.to}
                        onClick={onNavigate}
                        className={({ isActive }) =>
                          cn(
                            "flex h-10 items-center gap-3 rounded-xl px-3 text-sm font-semibold text-text-secondary transition hover:bg-zin-navy-50 hover:text-text-primary dark:hover:bg-zin-navy-800",
                            isActive && "bg-primary-soft text-primary",
                            compact && "justify-center px-0",
                          )
                        }
                      >
                        <ChildIcon className="h-4 w-4" />
                        {!compact ? <span>{child.label}</span> : null}
                      </NavLink>
                    );
                  })}
                </div>
              </div>
            );
          }
          return (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={onNavigate}
              className={({ isActive }) =>
                cn(
                  "flex h-10 items-center gap-3 rounded-xl px-3 text-sm font-semibold text-text-secondary transition hover:bg-zin-navy-50 hover:text-text-primary dark:hover:bg-zin-navy-800",
                  isActive && "bg-primary-soft text-primary",
                  compact && "justify-center px-0",
                )
              }
            >
              <Icon className="h-4 w-4" />
              {!compact ? <span>{item.label}</span> : null}
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
}
