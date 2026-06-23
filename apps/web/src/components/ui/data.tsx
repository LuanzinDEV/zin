import { Bot, Inbox } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "../../lib/utils";

export function Card({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <section className={cn("rounded-[16px] border border-border bg-surface p-5 shadow-sm", className)}>
      {children}
    </section>
  );
}

export function Badge({
  children,
  tone = "neutral",
}: {
  children: ReactNode;
  tone?: "success" | "warning" | "danger" | "info" | "neutral";
}) {
  const tones = {
    success: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-300",
    warning: "bg-amber-500/10 text-amber-600 dark:text-amber-300",
    danger: "bg-red-500/10 text-red-600 dark:text-red-300",
    info: "bg-blue-500/10 text-blue-600 dark:text-blue-300",
    neutral: "bg-zin-navy-100 text-zin-navy-600 dark:bg-zin-navy-800 dark:text-zin-navy-200",
  };
  return (
    <span className={cn("inline-flex rounded-full px-2.5 py-1 text-xs font-bold", tones[tone])}>
      {children}
    </span>
  );
}

export function Avatar({ name }: { name: string }) {
  const initials = name
    .split(" ")
    .slice(0, 2)
    .map((part) => part[0])
    .join("");
  return (
    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary-soft text-sm font-bold text-primary">
      {initials}
    </span>
  );
}

export function Skeleton({ className }: { className?: string }) {
  return <div className={cn("animate-pulse rounded-xl bg-zin-navy-100 dark:bg-zin-navy-800", className)} />;
}

export function EmptyState({
  title,
  description,
  icon = <Inbox className="h-6 w-6" />,
}: {
  title: string;
  description: string;
  icon?: ReactNode;
}) {
  return (
    <div className="flex min-h-52 flex-col items-center justify-center rounded-[16px] border border-dashed border-border bg-surface p-8 text-center">
      <div className="mb-3 rounded-2xl bg-primary-soft p-3 text-primary">{icon}</div>
      <h3 className="font-display text-lg font-semibold text-text-primary">{title}</h3>
      <p className="mt-1 max-w-sm text-sm text-text-secondary">{description}</p>
    </div>
  );
}

export function MetricCard({
  label,
  value,
  delta,
  icon = <Bot className="h-5 w-5" />,
}: {
  label: string;
  value: string;
  delta: string;
  icon?: ReactNode;
}) {
  return (
    <Card>
      <div className="flex items-center justify-between">
        <div className="rounded-xl bg-primary-soft p-2.5 text-primary">{icon}</div>
        <span className="font-mono text-xs font-semibold text-text-muted">{delta}</span>
      </div>
      <p className="mt-5 text-sm text-text-secondary">{label}</p>
      <p className="mt-1 font-display text-2xl font-semibold text-text-primary">{value}</p>
    </Card>
  );
}

export function DataTable<T>({
  columns,
  rows,
  getRowId,
  onRowClick,
}: {
  columns: Array<{ key: string; header: string; render: (row: T) => ReactNode }>;
  rows: T[];
  getRowId: (row: T) => string;
  onRowClick?: (row: T) => void;
}) {
  return (
    <div className="overflow-hidden rounded-[16px] border border-border bg-surface">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead className="bg-zin-navy-50 text-xs uppercase tracking-[0.08em] text-text-muted dark:bg-zin-navy-900">
            <tr>
              {columns.map((column) => (
                <th key={column.key} className="px-4 py-3 font-bold">
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {rows.map((row) => (
              <tr
                key={getRowId(row)}
                className={cn(
                  "transition hover:bg-zin-navy-50 dark:hover:bg-zin-navy-900",
                  onRowClick && "cursor-pointer",
                )}
                onClick={() => onRowClick?.(row)}
              >
                {columns.map((column) => (
                  <td key={column.key} className="px-4 py-3 text-text-secondary">
                    {column.render(row)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

