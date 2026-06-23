import { create } from "zustand";
import { persist } from "zustand/middleware";

type Theme = "light" | "dark" | "system";

type UiState = {
  theme: Theme;
  sidebarCollapsed: boolean;
  setTheme: (theme: Theme) => void;
  toggleSidebar: () => void;
};

function applyTheme(theme: Theme) {
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const dark = theme === "dark" || (theme === "system" && prefersDark);
  document.documentElement.classList.toggle("dark", dark);
}

export const useUiStore = create<UiState>()(
  persist(
    (set, get) => ({
      theme: "system",
      sidebarCollapsed: false,
      setTheme: (theme) => {
        applyTheme(theme);
        set({ theme });
      },
      toggleSidebar: () => set({ sidebarCollapsed: !get().sidebarCollapsed }),
    }),
    {
      name: "zin-ui",
      onRehydrateStorage: () => (state) => {
        applyTheme(state?.theme ?? "system");
      },
    },
  ),
);

if (typeof window !== "undefined") {
  applyTheme(useUiStore.getState().theme);
  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () => {
    applyTheme(useUiStore.getState().theme);
  });
}

