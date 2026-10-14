import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AppProvider, useApp } from "@/contexts/AppContext";
import AppShell from "@/components/layout/AppShell";
import Login from "@/pages/Login";
import Dashboard from "@/pages/Dashboard";
import Tasks from "@/pages/Tasks";
import Parcelles from "@/pages/Parcelles";
import Finance from "@/pages/Finance";
import NotFound from "@/pages/NotFound";
import { Toaster } from "sonner";

function ProtectedRoutes() {
  const { user } = useApp();
  if (!user) return <Navigate to="/login" replace />;
  return (
    <AppShell>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/parcelles" element={<Parcelles />} />
        <Route path="/finance" element={<Finance />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AppShell>
  );
}

function RouterSwitch() {
  const { user, lang } = useApp();
  return (
    <Routes>
      <Route path="/login" element={user ? <Navigate to="/" replace /> : <Login />} />
      <Route path="/*" element={<ProtectedRoutes />} />
    </Routes>
  );
}

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <RouterSwitch />
        <Toaster position="top-center" richColors closeButton />
      </BrowserRouter>
    </AppProvider>
  );
}
