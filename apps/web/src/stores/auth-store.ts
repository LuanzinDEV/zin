import { create } from "zustand";
import { persist } from "zustand/middleware";

export type AuthProvider = "password" | "google";

export type AuthUser = {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  provider: AuthProvider;
  createdAt: string;
};

type StoredUser = AuthUser & {
  passwordHash?: string;
};

type RegisterInput = {
  name: string;
  email: string;
  password: string;
};

type GoogleInput = {
  name: string;
  email: string;
  avatarUrl?: string;
};

type AuthState = {
  users: StoredUser[];
  currentUser: AuthUser | null;
  login: (email: string, password: string) => Promise<AuthUser>;
  register: (input: RegisterInput) => Promise<AuthUser>;
  loginWithGoogle: (input: GoogleInput) => AuthUser;
  logout: () => void;
};

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

function createUserId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `usr_${Date.now()}_${Math.random().toString(36).slice(2)}`;
}

function publicUser(user: StoredUser): AuthUser {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    avatarUrl: user.avatarUrl,
    provider: user.provider,
    createdAt: user.createdAt,
  };
}

async function passwordHash(email: string, password: string) {
  const value = `${normalizeEmail(email)}:${password}`;
  const bytes = new TextEncoder().encode(value);
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(digest))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      users: [],
      currentUser: null,
      login: async (email, password) => {
        const normalizedEmail = normalizeEmail(email);
        const user = get().users.find((item) => item.email === normalizedEmail);

        if (!user || !user.passwordHash) {
          throw new Error("E-mail ou senha invalidos.");
        }

        const hash = await passwordHash(normalizedEmail, password);
        if (hash !== user.passwordHash) {
          throw new Error("E-mail ou senha invalidos.");
        }

        const safeUser = publicUser(user);
        set({ currentUser: safeUser });
        return safeUser;
      },
      register: async ({ name, email, password }) => {
        const normalizedEmail = normalizeEmail(email);
        if (get().users.some((user) => user.email === normalizedEmail)) {
          throw new Error("Este e-mail ja esta cadastrado.");
        }

        const user: StoredUser = {
          id: createUserId(),
          name: name.trim(),
          email: normalizedEmail,
          provider: "password",
          passwordHash: await passwordHash(normalizedEmail, password),
          createdAt: new Date().toISOString(),
        };

        const safeUser = publicUser(user);
        set((state) => ({ users: [...state.users, user], currentUser: safeUser }));
        return safeUser;
      },
      loginWithGoogle: ({ name, email, avatarUrl }) => {
        const normalizedEmail = normalizeEmail(email);
        const existing = get().users.find((user) => user.email === normalizedEmail);

        if (existing) {
          const updatedUser: StoredUser = {
            ...existing,
            name: name.trim() || existing.name,
            avatarUrl: avatarUrl ?? existing.avatarUrl,
            provider: "google",
          };
          const users = get().users.map((user) => (user.email === normalizedEmail ? updatedUser : user));
          const safeUser = publicUser(updatedUser);
          set({ users, currentUser: safeUser });
          return safeUser;
        }

        const user: StoredUser = {
          id: createUserId(),
          name: name.trim() || normalizedEmail.split("@")[0],
          email: normalizedEmail,
          avatarUrl,
          provider: "google",
          createdAt: new Date().toISOString(),
        };
        const safeUser = publicUser(user);
        set((state) => ({ users: [...state.users, user], currentUser: safeUser }));
        return safeUser;
      },
      logout: () => set({ currentUser: null }),
    }),
    {
      name: "zin-auth",
      partialize: (state) => ({
        users: state.users,
        currentUser: state.currentUser,
      }),
    },
  ),
);
