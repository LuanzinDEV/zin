import { Moon, Monitor, Sun } from "lucide-react";
import { useUiStore } from "../../stores/ui-store";
import { IconButton } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Tooltip,
} from "../ui/overlays";

export function ThemeToggle() {
  const setTheme = useUiStore((state) => state.setTheme);
  return (
    <DropdownMenu>
      <Tooltip label="Tema">
        <DropdownMenuTrigger asChild>
          <IconButton label="Tema">
            <Sun className="h-4 w-4 dark:hidden" />
            <Moon className="hidden h-4 w-4 dark:block" />
          </IconButton>
        </DropdownMenuTrigger>
      </Tooltip>
      <DropdownMenuContent>
        <DropdownMenuItem onSelect={() => setTheme("light")}>
          <Sun className="mr-2 inline h-4 w-4" /> Claro
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={() => setTheme("dark")}>
          <Moon className="mr-2 inline h-4 w-4" /> Escuro
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={() => setTheme("system")}>
          <Monitor className="mr-2 inline h-4 w-4" /> Sistema
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

