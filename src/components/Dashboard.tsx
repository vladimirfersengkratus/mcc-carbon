import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  TrendingUp, 
  Truck, 
  Building, 
  Beaker, 
  ArrowUpRight,
  Sparkles,
  ArrowRight
} from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();

  const metrics = [
    {
      title: "Volume Total Concretado",
      value: "156.8 m³",
      change: "+8.0 m³ hoje",
      icon: Truck,
      color: "text-blue-400"
    },
    {
      title: "Peças Concluídas",
      value: "14 peças",
      change: "Pilares e vigas P1-P6",
      icon: Building,
      color: "text-emerald-400"
    },
    {
      title: "Taxa de Conformidade",
      value: "100%",
      change: "Slump tests aprovados",
      icon: Beaker,
      color: "text-orange-400"
    },
    {
      title: "Progresso Estrutural",
      value: "42%",
      change: "1º Pavimento em fase final",
      icon: TrendingUp,
      color: "text-cyan-400"
    }
  ];

  const recentActivity = [
    { user: "Betoneira ABC-1234", action: "Recebimento confirmado • 8 m³ • FCK 30 MPa", time: "Hoje", status: "Aprovado" },
    { user: "Ensaio de Slump", action: "Abatimento medido em 12±2 cm no canteiro", time: "Hoje", status: "Conforme" },
    { user: "Pilares P1 a P6", action: "1º Pavimento concretado e liberado para cura", time: "Ontem", status: "Concluído" },
    { user: "Vigas V1 e V2", action: "Armações conferidas e prontas para concretagem", time: "Ontem", status: "Planejado" }
  ];

  return (
    <section className="py-16 px-4 sm:px-6 bg-[#080d14]">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-slate-900 border border-slate-800 px-4 py-1.5 rounded-full mb-4">
            <Sparkles className="w-4 h-4 text-orange-400" />
            <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
              Painel de Indicadores
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4">
            Dashboard da Obra
          </h2>
          <p className="text-base md:text-lg text-slate-300 max-w-2xl mx-auto font-normal">
            Visão consolidada de volumes recebidos, controle tecnológico e avanço físico das peças.
          </p>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {metrics.map((metric, index) => (
            <Card key={index} className="bg-slate-900/95 border border-slate-800 shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xs font-semibold text-slate-400 uppercase tracking-wide">
                  {metric.title}
                </CardTitle>
                <metric.icon className={`h-5 w-5 ${metric.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-extrabold text-white mb-1">
                  {metric.value}
                </div>
                <div className="flex items-center text-xs text-slate-400">
                  <ArrowUpRight className="w-3.5 h-3.5 mr-1 text-blue-400" />
                  {metric.change}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Resumo de Etapas */}
          <Card className="lg:col-span-2 bg-slate-900/95 border border-slate-800 shadow-lg">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg font-bold text-white">Status da Concretagem por Pavimento</CardTitle>
                  <CardDescription className="text-slate-400 text-sm font-normal">Resumo físico do cronograma estrutural</CardDescription>
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="border-slate-700 bg-slate-800 text-slate-200 text-xs"
                  onClick={() => navigate("/mapa")}
                >
                  Abrir Planta Interativa
                  <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Pavimento 1 */}
              <div>
                <div className="flex justify-between text-sm mb-2 font-medium">
                  <span className="text-white">1º Pavimento (Pilares, Vigas e Lajes)</span>
                  <span className="text-blue-400 font-bold">75% Concluído</span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-3 overflow-hidden">
                  <div className="bg-gradient-to-r from-blue-600 to-cyan-400 h-3 rounded-full" style={{ width: "75%" }}></div>
                </div>
                <div className="flex gap-4 text-xs text-slate-400 mt-2">
                  <span className="text-emerald-400 font-medium">✓ Pilares P1-P6 concluídos</span>
                  <span className="text-blue-400 font-medium">⟳ Vigas V1-V2 em andamento</span>
                  <span className="text-slate-400 font-medium">⏳ Laje L1 planejada</span>
                </div>
              </div>

              {/* Pavimento 2 */}
              <div>
                <div className="flex justify-between text-sm mb-2 font-medium">
                  <span className="text-white">2º Pavimento (Estrutura Superior)</span>
                  <span className="text-orange-400 font-bold">15% Planejado</span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-3 overflow-hidden">
                  <div className="bg-gradient-to-r from-orange-500 to-amber-400 h-3 rounded-full" style={{ width: "15%" }}></div>
                </div>
                <div className="flex gap-4 text-xs text-slate-400 mt-2">
                  <span className="text-slate-400 font-medium">Aguardando desforma do 1º pav.</span>
                </div>
              </div>

              {/* Acesso rápido */}
              <div className="pt-4 border-t border-slate-800 flex flex-wrap gap-3">
                <Button 
                  size="sm" 
                  className="bg-blue-600 hover:bg-blue-500 text-white text-xs"
                  onClick={() => navigate("/recebimento")}
                >
                  Registrar Nova Entrega
                </Button>
                <Button 
                  size="sm" 
                  variant="outline"
                  className="border-slate-700 bg-slate-800 text-slate-200 text-xs"
                  onClick={() => navigate("/planejamento")}
                >
                  Ver Planejamento de Volume
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Activity Feed */}
          <Card className="bg-slate-900/95 border border-slate-800 shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg font-bold text-white">Últimas Ocorrências</CardTitle>
              <CardDescription className="text-slate-400 text-sm font-normal">Histórico recente de campo</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="p-3 rounded-lg bg-slate-800/70 border border-slate-700/50">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-xs font-bold text-white truncate">
                        {activity.user}
                      </p>
                      <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30 text-[10px] px-1.5 py-0">
                        {activity.status}
                      </Badge>
                    </div>
                    <p className="text-xs text-slate-300 font-normal">
                      {activity.action}
                    </p>
                    <span className="text-[10px] text-slate-400 mt-1 block">
                      {activity.time}
                    </span>
                  </div>
                ))}
              </div>
              <Button 
                variant="outline" 
                className="w-full mt-4 border-slate-700 bg-slate-800 text-slate-200 hover:text-white text-xs"
                onClick={() => navigate("/recebimento")}
              >
                Ver Todos os Recebimentos
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
