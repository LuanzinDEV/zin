import { Chrome, Eye, EyeOff, Lock, Mail, UserRound } from "lucide-react";
import { type FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { BrandLogo } from "../components/layout/BrandLogo";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/forms";
import { useToast } from "../components/ui/overlays";
import { cn } from "../lib/utils";
import { useAuthStore } from "../stores/auth-store";

type AuthMode = "login" | "register";

type GoogleCredentialResponse = {
  credential?: string;
};

type GoogleJwtPayload = {
  name?: string;
  email?: string;
  picture?: string;
};

declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (config: {
            client_id: string;
            callback: (response: GoogleCredentialResponse) => void;
          }) => void;
          renderButton: (
            element: HTMLElement,
            options: {
              theme: "outline" | "filled_blue" | "filled_black";
              size: "large" | "medium" | "small";
              type: "standard" | "icon";
              shape: "rectangular" | "pill" | "circle" | "square";
              text: "signin_with" | "signup_with" | "continue_with" | "signin";
              width?: number;
            },
          ) => void;
        };
      };
    };
  }
}

function decodeGoogleCredential(token: string): GoogleJwtPayload {
  const payload = token.split(".")[1];
  if (!payload) {
    throw new Error("Credencial Google invalida.");
  }

  const normalized = payload.replace(/-/g, "+").replace(/_/g, "/");
  const json = decodeURIComponent(
    atob(normalized)
      .split("")
      .map((char) => `%${`00${char.charCodeAt(0).toString(16)}`.slice(-2)}`)
      .join(""),
  );
  return JSON.parse(json) as GoogleJwtPayload;
}

function getRedirectPath(locationState: unknown) {
  if (
    locationState &&
    typeof locationState === "object" &&
    "from" in locationState &&
    typeof locationState.from === "string"
  ) {
    return locationState.from;
  }
  return "/";
}

export function AuthPage() {
  const [mode, setMode] = useState<AuthMode>("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleReady, setGoogleReady] = useState(false);
  const [googleError, setGoogleError] = useState<string | null>(null);
  const googleButtonRef = useRef<HTMLDivElement | null>(null);

  const currentUser = useAuthStore((state) => state.currentUser);
  const login = useAuthStore((state) => state.login);
  const register = useAuthStore((state) => state.register);
  const loginWithGoogle = useAuthStore((state) => state.loginWithGoogle);
  const location = useLocation();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const redirectTo = useMemo(() => getRedirectPath(location.state), [location.state]);
  const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID as string | undefined;

  useEffect(() => {
    if (!googleClientId) {
      setGoogleError("Configure VITE_GOOGLE_CLIENT_ID para ativar login Google.");
      return;
    }

    const existingScript = document.querySelector<HTMLScriptElement>('script[src="https://accounts.google.com/gsi/client"]');

    const initializeGoogle = () => {
      if (!window.google || !googleButtonRef.current) return;
      window.google.accounts.id.initialize({
        client_id: googleClientId,
        callback: (response) => {
          try {
            if (!response.credential) {
              throw new Error("Credencial Google nao recebida.");
            }
            const profile = decodeGoogleCredential(response.credential);
            if (!profile.email) {
              throw new Error("O Google nao retornou e-mail para esta conta.");
            }
            loginWithGoogle({
              name: profile.name ?? profile.email,
              email: profile.email,
              avatarUrl: profile.picture,
            });
            showToast({ title: "Login realizado", description: "Sessao iniciada com Google." });
            navigate(redirectTo, { replace: true });
          } catch (error) {
            setGoogleError(error instanceof Error ? error.message : "Falha ao autenticar com Google.");
          }
        },
      });
      googleButtonRef.current.innerHTML = "";
      const googleButtonWidth = Math.min(360, googleButtonRef.current.clientWidth || 360);
      window.google.accounts.id.renderButton(googleButtonRef.current, {
        theme: "outline",
        size: "large",
        type: "standard",
        shape: "rectangular",
        text: mode === "register" ? "signup_with" : "signin_with",
        width: googleButtonWidth,
      });
      setGoogleReady(true);
      setGoogleError(null);
    };

    if (existingScript) {
      if (window.google) initializeGoogle();
      else existingScript.addEventListener("load", initializeGoogle, { once: true });
      return;
    }

    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    script.onload = initializeGoogle;
    script.onerror = () => setGoogleError("Nao foi possivel carregar o login Google.");
    document.head.appendChild(script);
  }, [googleClientId, loginWithGoogle, mode, navigate, redirectTo, showToast]);

  if (currentUser) {
    return <Navigate to={redirectTo} replace />;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    try {
      if (mode === "register") {
        if (password.length < 8) {
          throw new Error("Use uma senha com pelo menos 8 caracteres.");
        }
        if (password !== confirmPassword) {
          throw new Error("As senhas nao conferem.");
        }
        await register({ name, email, password });
        showToast({ title: "Conta criada", description: "Voce ja esta conectado." });
      } else {
        await login(email, password);
        showToast({ title: "Login realizado", description: "Sessao iniciada com sucesso." });
      }
      navigate(redirectTo, { replace: true });
    } catch (error) {
      showToast({
        title: mode === "register" ? "Nao foi possivel registrar" : "Nao foi possivel entrar",
        description: error instanceof Error ? error.message : "Revise os dados e tente novamente.",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="grid min-h-screen bg-background text-text-primary lg:grid-cols-[minmax(420px,0.9fr)_1.1fr]">
      <section className="flex min-h-screen flex-col justify-between px-5 py-6 sm:px-8 lg:px-12">
        <BrandLogo />
        <div className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center py-10">
          <div className="mb-8">
            <h1 className="font-display text-3xl font-semibold text-text-primary">
              {mode === "login" ? "Entrar no ZIN" : "Criar conta no ZIN"}
            </h1>
            <p className="mt-2 text-sm text-text-secondary">
              {mode === "login"
                ? "Use seu e-mail e senha ou uma conta Google."
                : "Registre-se com e-mail e senha ou continue com Google."}
            </p>
          </div>

          <div className="mb-5 grid h-11 grid-cols-2 rounded-xl border border-border bg-surface p-1">
            <button
              type="button"
              onClick={() => setMode("login")}
              className={cn(
                "rounded-lg text-sm font-semibold text-text-secondary transition",
                mode === "login" && "bg-primary text-white",
              )}
            >
              Login
            </button>
            <button
              type="button"
              onClick={() => setMode("register")}
              className={cn(
                "rounded-lg text-sm font-semibold text-text-secondary transition",
                mode === "register" && "bg-primary text-white",
              )}
            >
              Registre-se
            </button>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            {mode === "register" ? (
              <label className="block text-sm font-semibold text-text-primary">
                Nome
                <div className="mt-1.5 flex items-center rounded-xl border border-border bg-surface px-3 focus-within:border-primary focus-within:ring-4 focus-within:ring-[var(--focus-ring)]">
                  <UserRound className="h-4 w-4 text-text-muted" />
                  <Input
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    className="border-0 bg-transparent focus:border-transparent focus:ring-0"
                    placeholder="Seu nome"
                    required
                  />
                </div>
              </label>
            ) : null}

            <label className="block text-sm font-semibold text-text-primary">
              E-mail
              <div className="mt-1.5 flex items-center rounded-xl border border-border bg-surface px-3 focus-within:border-primary focus-within:ring-4 focus-within:ring-[var(--focus-ring)]">
                <Mail className="h-4 w-4 text-text-muted" />
                <Input
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="border-0 bg-transparent focus:border-transparent focus:ring-0"
                  placeholder="voce@empresa.com"
                  type="email"
                  autoComplete="email"
                  required
                />
              </div>
            </label>

            <label className="block text-sm font-semibold text-text-primary">
              Senha
              <div className="mt-1.5 flex items-center rounded-xl border border-border bg-surface px-3 focus-within:border-primary focus-within:ring-4 focus-within:ring-[var(--focus-ring)]">
                <Lock className="h-4 w-4 text-text-muted" />
                <Input
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className="border-0 bg-transparent focus:border-transparent focus:ring-0"
                  placeholder="********"
                  type={showPassword ? "text" : "password"}
                  autoComplete={mode === "register" ? "new-password" : "current-password"}
                  required
                />
                <button
                  type="button"
                  aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                  className="text-text-muted transition hover:text-text-primary"
                  onClick={() => setShowPassword((value) => !value)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </label>

            {mode === "register" ? (
              <label className="block text-sm font-semibold text-text-primary">
                Confirmar senha
                <div className="mt-1.5 flex items-center rounded-xl border border-border bg-surface px-3 focus-within:border-primary focus-within:ring-4 focus-within:ring-[var(--focus-ring)]">
                  <Lock className="h-4 w-4 text-text-muted" />
                  <Input
                    value={confirmPassword}
                    onChange={(event) => setConfirmPassword(event.target.value)}
                    className="border-0 bg-transparent focus:border-transparent focus:ring-0"
                    placeholder="********"
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    required
                  />
                </div>
              </label>
            ) : null}

            <Button type="submit" className="w-full" size="lg" disabled={loading}>
              {loading ? "Processando..." : mode === "login" ? "Entrar" : "Criar conta"}
            </Button>
          </form>

          <div className="my-6 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.12em] text-text-muted">
            <span className="h-px flex-1 bg-border" />
            ou
            <span className="h-px flex-1 bg-border" />
          </div>

          <div className="min-h-11">
            {googleClientId ? (
              <div
                ref={googleButtonRef}
                className={cn(
                  "flex min-h-11 w-full justify-center overflow-hidden rounded-xl",
                  !googleReady && "border border-border bg-surface",
                )}
              />
            ) : (
              <Button
                type="button"
                variant="secondary"
                size="lg"
                className="w-full"
                leftIcon={<Chrome className="h-4 w-4" />}
                disabled
              >
                Entrar com Google
              </Button>
            )}
          </div>

          {googleError ? <p className="mt-3 text-sm text-text-muted">{googleError}</p> : null}
        </div>
      </section>

      <section className="hidden min-h-screen border-l border-border bg-surface lg:block">
        <div className="flex h-full flex-col justify-between p-12">
          <div className="grid max-w-xl gap-6">
            <div className="inline-flex w-fit items-center rounded-full border border-border bg-background px-3 py-1 text-xs font-bold uppercase tracking-[0.12em] text-text-muted">
              Acesso seguro
            </div>
            <h2 className="font-display text-5xl font-semibold leading-tight text-text-primary">
              CRM, agentes e workflows no mesmo cockpit.
            </h2>
            <p className="max-w-lg text-base leading-7 text-text-secondary">
              Entre para acompanhar oportunidades, automacoes e execucoes em um unico ambiente operacional.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-4">
            {[
              ["CRM", "pipeline ativo"],
              ["IA", "agentes conectados"],
              ["Ops", "execucoes rastreadas"],
            ].map(([value, label]) => (
              <div key={label} className="rounded-xl border border-border bg-background p-4">
                <div className="font-display text-3xl font-semibold text-primary">{value}</div>
                <div className="mt-1 text-sm text-text-secondary">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
