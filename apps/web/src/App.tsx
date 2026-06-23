import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Navigate, Outlet, Route, BrowserRouter as Router, Routes, useLocation } from "react-router-dom";
import { AppLayout } from "./components/layout/AppLayout";
import { ToastProvider } from "./components/ui/overlays";
import { AgentDetails, Agents } from "./pages/Agents";
import { AuthPage } from "./pages/Auth";
import { Companies, Opportunities } from "./pages/CrmAuxiliary";
import { Contacts } from "./pages/Contacts";
import { Dashboard } from "./pages/Dashboard";
import { Executions } from "./pages/Executions";
import { Pipeline } from "./pages/Pipeline";
import { Settings } from "./pages/Settings";
import { WorkflowBuilder, Workflows } from "./pages/Workflows";
import { useAuthStore } from "./stores/auth-store";

const queryClient = new QueryClient();

function ProtectedRoutes() {
  const currentUser = useAuthStore((state) => state.currentUser);
  const location = useLocation();

  if (!currentUser) {
    return <Navigate to="/login" replace state={{ from: location.pathname + location.search }} />;
  }

  return <Outlet />;
}

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ToastProvider>
        <Router>
          <Routes>
            <Route path="login" element={<AuthPage />} />
            <Route element={<ProtectedRoutes />}>
              <Route element={<AppLayout />}>
                <Route index element={<Dashboard />} />
                <Route path="crm" element={<Navigate to="/crm/contacts" replace />} />
                <Route path="crm/contacts" element={<Contacts />} />
                <Route path="crm/companies" element={<Companies />} />
                <Route path="crm/opportunities" element={<Opportunities />} />
                <Route path="crm/pipeline" element={<Pipeline />} />
                <Route path="agents" element={<Agents />} />
                <Route path="agents/:agentId" element={<AgentDetails />} />
                <Route path="workflows" element={<Workflows />} />
                <Route path="workflows/builder" element={<WorkflowBuilder />} />
                <Route path="executions" element={<Executions />} />
                <Route path="settings" element={<Settings />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Route>
            </Route>
          </Routes>
        </Router>
      </ToastProvider>
    </QueryClientProvider>
  );
}
