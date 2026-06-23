import { LogOut, Menu, Search, UserCircle } from "lucide-react";
import { useMemo, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../stores/auth-store";
import { IconButton } from "../ui/button";
import {
  Drawer,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/overlays";
import { AppSidebar } from "./AppSidebar";
import { CommandPalette } from "./CommandPalette";
import { ThemeToggle } from "./ThemeToggle";

function Breadcrumb() {
  const location = useLocation();
  return useMemo(() => {
    const parts = location.pathname.split("/").filter(Boolean);
    const labels = parts.length ? parts : ["dashboard"];
    return (
      <div className="hidden items-center gap-2 text-sm text-text-muted md:flex">
        <span>ZIN</span>
        {labels.map((part) => (
          <span key={part} className="flex items-center gap-2">
            <span>/</span>
            <span className="capitalize text-text-secondary">{part.replace("-", " ")}</span>
          </span>
        ))}
      </div>
    );
  }, [location.pathname]);
}

export function AppLayout() {
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const currentUser = useAuthStore((state) => state.currentUser);
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login", { replace: true });
  }

  return (
    <div className="flex min-h-screen bg-background text-text-primary">
      <div className="hidden lg:block">
        <AppSidebar />
      </div>
      <main className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-border bg-background/90 px-4 backdrop-blur md:px-6">
          <div className="flex items-center gap-3">
            <IconButton label="Menu" className="lg:hidden" onClick={() => setMobileOpen(true)}>
              <Menu className="h-4 w-4" />
            </IconButton>
            <Breadcrumb />
          </div>
          <div className="flex items-center gap-2">
            <button
              className="hidden h-10 min-w-72 items-center gap-2 rounded-xl border border-border bg-surface px-3 text-left text-sm text-text-muted transition hover:bg-zin-navy-50 md:flex dark:hover:bg-zin-navy-800"
              onClick={() => setPaletteOpen(true)}
            >
              <Search className="h-4 w-4" />
              Buscar
              <span className="ml-auto rounded-md border border-border px-1.5 py-0.5 font-mono text-[11px]">
                Ctrl K
              </span>
            </button>
            <ThemeToggle />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <IconButton label="Perfil">
                  {currentUser?.avatarUrl ? (
                    <img
                      src={currentUser.avatarUrl}
                      alt={currentUser.name}
                      className="h-7 w-7 rounded-full object-cover"
                    />
                  ) : (
                    <UserCircle className="h-5 w-5" />
                  )}
                </IconButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>{currentUser?.name ?? "Usuario"}</DropdownMenuItem>
                <DropdownMenuItem>{currentUser?.email ?? "Sessao local"}</DropdownMenuItem>
                <DropdownMenuItem onSelect={handleLogout}>
                  <span className="flex items-center gap-2">
                    <LogOut className="h-4 w-4" />
                    Sair
                  </span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
        <div className="w-full max-w-[1600px] px-4 py-6 md:px-6 lg:px-8">
          <Outlet />
        </div>
      </main>
      <CommandPalette open={paletteOpen} onOpenChange={setPaletteOpen} />
      <Drawer open={mobileOpen} onOpenChange={setMobileOpen} title="Navegacao">
        <AppSidebar mobile onNavigate={() => setMobileOpen(false)} />
      </Drawer>
    </div>
  );
}
