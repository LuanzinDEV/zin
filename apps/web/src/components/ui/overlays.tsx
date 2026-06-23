import * as DialogPrimitive from "@radix-ui/react-dialog";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import * as ToastPrimitive from "@radix-ui/react-toast";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { X } from "lucide-react";
import type { ReactNode } from "react";
import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { cn } from "../../lib/utils";
import { IconButton } from "./button";

/* eslint-disable react-refresh/only-export-components */

export function Tooltip({ label, children }: { label: string; children: ReactNode }) {
  return (
    <TooltipPrimitive.Provider delayDuration={180}>
      <TooltipPrimitive.Root>
        <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
        <TooltipPrimitive.Portal>
          <TooltipPrimitive.Content
            sideOffset={8}
            className="z-50 rounded-lg bg-zin-navy-950 px-2.5 py-1.5 text-xs font-medium text-white shadow-soft"
          >
            {label}
            <TooltipPrimitive.Arrow className="fill-zin-navy-950" />
          </TooltipPrimitive.Content>
        </TooltipPrimitive.Portal>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  );
}

export const DropdownMenu = DropdownMenuPrimitive.Root;
export const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;

export function DropdownMenuContent({ children }: { children: ReactNode }) {
  return (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.Content
        align="end"
        sideOffset={10}
        className="z-50 min-w-48 rounded-xl border border-border bg-surface p-1 shadow-soft"
      >
        {children}
      </DropdownMenuPrimitive.Content>
    </DropdownMenuPrimitive.Portal>
  );
}

export function DropdownMenuItem({
  children,
  onSelect,
}: {
  children: ReactNode;
  onSelect?: () => void;
}) {
  return (
    <DropdownMenuPrimitive.Item
      onSelect={onSelect}
      className="cursor-pointer rounded-lg px-3 py-2 text-sm text-text-secondary outline-none transition hover:bg-zin-navy-50 hover:text-text-primary focus:bg-zin-navy-50 dark:hover:bg-zin-navy-800 dark:focus:bg-zin-navy-800"
    >
      {children}
    </DropdownMenuPrimitive.Item>
  );
}

export function Dialog({
  open,
  onOpenChange,
  title,
  children,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  children: ReactNode;
}) {
  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-40 bg-zin-navy-950/45" />
        <DialogPrimitive.Content className="fixed left-1/2 top-1/2 z-50 w-[min(560px,calc(100vw-32px))] -translate-x-1/2 -translate-y-1/2 rounded-[18px] border border-border bg-surface p-5 shadow-soft">
          <div className="mb-4 flex items-center justify-between">
            <DialogPrimitive.Title className="font-display text-lg font-semibold text-text-primary">
              {title}
            </DialogPrimitive.Title>
            <DialogPrimitive.Close asChild>
              <IconButton label="Fechar">
                <X className="h-4 w-4" />
              </IconButton>
            </DialogPrimitive.Close>
          </div>
          {children}
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}

export function Drawer({
  open,
  onOpenChange,
  title,
  children,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  children: ReactNode;
}) {
  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-40 bg-zin-navy-950/35" />
        <DialogPrimitive.Content className="fixed bottom-0 right-0 top-0 z-50 w-[min(460px,100vw)] border-l border-border bg-surface p-5 shadow-soft">
          <div className="mb-5 flex items-center justify-between">
            <DialogPrimitive.Title className="font-display text-lg font-semibold text-text-primary">
              {title}
            </DialogPrimitive.Title>
            <DialogPrimitive.Close asChild>
              <IconButton label="Fechar">
                <X className="h-4 w-4" />
              </IconButton>
            </DialogPrimitive.Close>
          </div>
          {children}
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}

export const Tabs = TabsPrimitive.Root;
export const TabsList = TabsPrimitive.List;
export const TabsTrigger = TabsPrimitive.Trigger;
export const TabsContent = TabsPrimitive.Content;

type ToastMessage = { id: number; title: string; description?: string };
type ToastContextValue = { showToast: (message: Omit<ToastMessage, "id">) => void };

const ToastContext = createContext<ToastContextValue | null>(null);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [messages, setMessages] = useState<ToastMessage[]>([]);
  const showToast = useCallback((message: Omit<ToastMessage, "id">) => {
    setMessages((current) => [...current, { ...message, id: Date.now() }]);
  }, []);
  const value = useMemo(() => ({ showToast }), [showToast]);

  return (
    <ToastContext.Provider value={value}>
      <ToastPrimitive.Provider swipeDirection="right">
        {children}
        {messages.map((message) => (
          <ToastPrimitive.Root
            key={message.id}
            className="rounded-xl border border-border bg-surface p-4 shadow-soft"
            onOpenChange={(open) => {
              if (!open) setMessages((current) => current.filter((item) => item.id !== message.id));
            }}
          >
            <ToastPrimitive.Title className="text-sm font-semibold text-text-primary">
              {message.title}
            </ToastPrimitive.Title>
            {message.description ? (
              <ToastPrimitive.Description className="mt-1 text-sm text-text-secondary">
                {message.description}
              </ToastPrimitive.Description>
            ) : null}
          </ToastPrimitive.Root>
        ))}
        <ToastPrimitive.Viewport className="fixed bottom-4 right-4 z-50 flex w-80 max-w-[calc(100vw-32px)] flex-col gap-2" />
      </ToastPrimitive.Provider>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within ToastProvider");
  }
  return context;
}

export const tabTriggerClass = cn(
  "rounded-xl px-3 py-2 text-sm font-semibold text-text-secondary outline-none transition",
  "data-[state=active]:bg-primary-soft data-[state=active]:text-primary",
  "focus-visible:ring-4 focus-visible:ring-[var(--focus-ring)]",
);
