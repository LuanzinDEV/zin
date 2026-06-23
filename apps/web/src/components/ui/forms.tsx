import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import * as SelectPrimitive from "@radix-ui/react-select";
import * as SwitchPrimitive from "@radix-ui/react-switch";
import { Check, ChevronDown } from "lucide-react";
import type { InputHTMLAttributes, TextareaHTMLAttributes } from "react";
import { cn } from "../../lib/utils";

const fieldClass =
  "min-h-10 w-full rounded-xl border border-border bg-surface px-3 text-sm text-text-primary outline-none transition placeholder:text-text-muted focus:border-primary focus:ring-4 focus:ring-[var(--focus-ring)] disabled:cursor-not-allowed disabled:opacity-60";

export function Input({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return <input className={cn(fieldClass, className)} {...props} />;
}

export function Textarea({ className, ...props }: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea className={cn(fieldClass, "min-h-28 py-3", className)} {...props} />;
}

export function Checkbox({
  checked,
  onCheckedChange,
  label,
}: {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  label: string;
}) {
  return (
    <label className="flex items-center gap-2 text-sm text-text-secondary">
      <CheckboxPrimitive.Root
        checked={checked}
        onCheckedChange={(value) => onCheckedChange?.(value === true)}
        className="flex h-5 w-5 items-center justify-center rounded-md border border-border bg-surface data-[state=checked]:border-primary data-[state=checked]:bg-primary"
      >
        <CheckboxPrimitive.Indicator>
          <Check className="h-3.5 w-3.5 text-white" />
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>
      {label}
    </label>
  );
}

export function Switch({
  checked,
  onCheckedChange,
  label,
}: {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  label: string;
}) {
  return (
    <label className="flex items-center justify-between gap-4 text-sm text-text-primary">
      <span>{label}</span>
      <SwitchPrimitive.Root
        checked={checked}
        onCheckedChange={onCheckedChange}
        className="relative h-6 w-11 rounded-full bg-zin-navy-200 transition data-[state=checked]:bg-primary dark:bg-zin-navy-700"
      >
        <SwitchPrimitive.Thumb className="block h-5 w-5 translate-x-0.5 rounded-full bg-white shadow transition data-[state=checked]:translate-x-5" />
      </SwitchPrimitive.Root>
    </label>
  );
}

export function Select({
  value,
  onValueChange,
  options,
  placeholder,
}: {
  value?: string;
  onValueChange?: (value: string) => void;
  options: Array<{ label: string; value: string }>;
  placeholder?: string;
}) {
  return (
    <SelectPrimitive.Root value={value} onValueChange={onValueChange}>
      <SelectPrimitive.Trigger className={cn(fieldClass, "flex items-center justify-between")}>
        <SelectPrimitive.Value placeholder={placeholder} />
        <SelectPrimitive.Icon>
          <ChevronDown className="h-4 w-4" />
        </SelectPrimitive.Icon>
      </SelectPrimitive.Trigger>
      <SelectPrimitive.Portal>
        <SelectPrimitive.Content className="z-50 overflow-hidden rounded-xl border border-border bg-surface shadow-soft">
          <SelectPrimitive.Viewport className="p-1">
            {options.map((option) => (
              <SelectPrimitive.Item
                key={option.value}
                value={option.value}
                className="flex cursor-pointer items-center rounded-lg px-3 py-2 text-sm outline-none hover:bg-zin-navy-50 focus:bg-zin-navy-50 dark:hover:bg-zin-navy-800 dark:focus:bg-zin-navy-800"
              >
                <SelectPrimitive.ItemText>{option.label}</SelectPrimitive.ItemText>
              </SelectPrimitive.Item>
            ))}
          </SelectPrimitive.Viewport>
        </SelectPrimitive.Content>
      </SelectPrimitive.Portal>
    </SelectPrimitive.Root>
  );
}

