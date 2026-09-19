import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import LogisticaPage from "./pages/LogisticaPage";
import RecebimentoPage from "./pages/RecebimentoPage";
import PlanejamentoPage from "./pages/PlanejamentoPage";
import MapaPage from "./pages/MapaPage";
import DashboardPage from "./pages/DashboardPage";
import ModeloReferenciaPage from "./pages/ModeloReferenciaPage";
import ManualAjudaPage from "./pages/ManualAjudaPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/logistica" element={<LogisticaPage />} />
          <Route path="/recebimento" element={<RecebimentoPage />} />
          <Route path="/planejamento" element={<PlanejamentoPage />} />
          <Route path="/mapa" element={<MapaPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/modelo" element={<ModeloReferenciaPage />} />
          <Route path="/ajuda" element={<ManualAjudaPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
