import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { 
  Map, 
  Square,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Filter,
  Layers,
  Search,
  Sparkles,
  Building,
  Check,
  PlayCircle
} from "lucide-react";

interface PecaMapItem {
  id: number;
  tipo: "pilar" | "viga" | "laje";
  nome: string;
  status: "concluido" | "em_andamento" | "planejado";
  x: number;
  y: number;
  pavimento: "1" | "2";
  width?: number;
  height?: number;
  data?: string;
  fck: string;
  volume: number;
}

const PECAS_INICIAIS: PecaMapItem[] = [
  // Pavimento 1
  { id: 1, tipo: "pilar", nome: "P1", status: "concluido", x: 2, y: 2, pavimento: "1", data: "2026-09-12", fck: "30 MPa", volume: 1.2 },
  { id: 2, tipo: "pilar", nome: "P2", status: "concluido", x: 6, y: 2, pavimento: "1", data: "2026-09-12", fck: "30 MPa", volume: 1.2 },
  { id: 3, tipo: "pilar", nome: "P3", status: "concluido", x: 10, y: 2, pavimento: "1", data: "2026-09-12", fck: "30 MPa", volume: 1.2 },
  { id: 4, tipo: "pilar", nome: "P4", status: "concluido", x: 2, y: 6, pavimento: "1", data: "2026-09-12", fck: "30 MPa", volume: 1.2 },
  { id: 5, tipo: "pilar", nome: "P5", status: "concluido", x: 6, y: 6, pavimento: "1", data: "2026-09-12", fck: "30 MPa", volume: 1.2 },
  { id: 6, tipo: "pilar", nome: "P6", status: "concluido", x: 10, y: 6, pavimento: "1", data: "2026-09-12", fck: "30 MPa", volume: 1.2 },
  
  { id: 7, tipo: "viga", nome: "V1", status: "em_andamento", x: 2, y: 1, pavimento: "1", width: 4, height: 1, fck: "30 MPa", volume: 2.8 },
  { id: 8, tipo: "viga", nome: "V2", status: "em_andamento", x: 6, y: 1, pavimento: "1", width: 4, height: 1, fck: "30 MPa", volume: 2.8 },
  { id: 9, tipo: "viga", nome: "V3", status: "planejado", x: 1, y: 2, pavimento: "1", width: 1, height: 4, fck: "30 MPa", volume: 2.4 },
  { id: 10, tipo: "viga", nome: "V4", status: "planejado", x: 11, y: 2, pavimento: "1", width: 1, height: 4, fck: "30 MPa", volume: 2.4 },
  
  { id: 11, tipo: "laje", nome: "L1", status: "planejado", x: 3, y: 3, pavimento: "1", width: 6, height: 3, fck: "30 MPa", volume: 14.5 },

  // Pavimento 2
  { id: 21, tipo: "pilar", nome: "P1", status: "planejado", x: 2, y: 2, pavimento: "2", fck: "30 MPa", volume: 1.2 },
  { id: 22, tipo: "pilar", nome: "P2", status: "planejado", x: 6, y: 2, pavimento: "2", fck: "30 MPa", volume: 1.2 },
  { id: 23, tipo: "pilar", nome: "P3", status: "planejado", x: 10, y: 2, pavimento: "2", fck: "30 MPa", volume: 1.2 },
  { id: 24, tipo: "pilar", nome: "P4", status: "planejado", x: 2, y: 6, pavimento: "2", fck: "30 MPa", volume: 1.2 },
  { id: 25, tipo: "pilar", nome: "P5", status: "planejado", x: 6, y: 6, pavimento: "2", fck: "30 MPa", volume: 1.2 },
  { id: 26, tipo: "pilar", nome: "P6", status: "planejado", x: 10, y: 6, pavimento: "2", fck: "30 MPa", volume: 1.2 },
];

const MapaConcretagem = () => {
  const { toast } = useToast();
  const [pecas, setPecas] = useState<PecaMapItem[]>(PECAS_INICIAIS);
  const [filtroStatus, setFiltroStatus] = useState("todos");
  const [pavimentoAtivo, setPavimentoAtivo] = useState<"1" | "2">("1");
  const [pecaSelecionada, setPecaSelecionada] = useState<PecaMapItem | null>(PECAS_INICIAIS[0]);
  const [buscaTexto, setBuscaTexto] = useState("");
  const [mostrarBusca, setMostrarBusca] = useState(false);

  const getStatusColor = (status: PecaMapItem["status"]) => {
    switch (status) {
      case "concluido":
        return "bg-emerald-600 hover:bg-emerald-500 border-emerald-400 text-white";
      case "em_andamento":
        return "bg-blue-600 hover:bg-blue-500 border-blue-400 text-white animate-pulse";
      default:
        return "bg-slate-700 hover:bg-slate-600 border-slate-500 text-slate-200";
    }
  };

  const getStatusBadge = (status: PecaMapItem["status"]) => {
    switch (status) {
      case "concluido":
        return <Badge className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-xs px-2">Concluído</Badge>;
      case "em_andamento":
        return <Badge className="bg-blue-500/20 text-blue-400 border border-blue-500/40 text-xs px-2">Em Andamento</Badge>;
      default:
        return <Badge className="bg-slate-700/60 text-slate-300 border border-slate-600 text-xs px-2">Planejado</Badge>;
    }
  };

  const handleAlterarStatusPeca = (novoStatus: PecaMapItem["status"]) => {
    if (!pecaSelecionada) return;

    setPecas(prev => prev.map(p => {
      if (p.id === pecaSelecionada.id) {
        return { 
          ...p, 
          status: novoStatus, 
          data: novoStatus === "concluido" ? new Date().toISOString().split('T')[0] : p.data 
        };
      }
      return p;
    }));

    setPecaSelecionada(prev => prev ? { ...prev, status: novoStatus } : null);

    toast({
      title: `Status da peça ${pecaSelecionada.nome} atualizado!`,
      description: `Agora definida como: ${novoStatus.toUpperCase()}`
    });
  };

  const pecasFiltradas = pecas.filter(peca => {
    const matchPavimento = peca.pavimento === pavimentoAtivo;
    const matchStatus = filtroStatus === "todos" || peca.status === filtroStatus;
    const matchBusca = !buscaTexto || peca.nome.toLowerCase().includes(buscaTexto.toLowerCase()) || peca.tipo.toLowerCase().includes(buscaTexto.toLowerCase());
    return matchPavimento && matchStatus && matchBusca;
  });

  const pecasPavimento = pecas.filter(p => p.pavimento === pavimentoAtivo);
  const total = pecasPavimento.length;
  const concluidas = pecasPavimento.filter(p => p.status === "concluido").length;
  const emAndamento = pecasPavimento.filter(p => p.status === "em_andamento").length;
  const planejadas = pecasPavimento.filter(p => p.status === "planejado").length;

  return (
    <section className="py-20 px-6 bg-[#080d14]" id="mapa">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-slate-900 border border-slate-800 px-4 py-1.5 rounded-full mb-4">
            <Sparkles className="w-4 h-4 text-orange-400" />
            <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
              Planta Baixa Interativa
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4">
            Mapa de Concretagem 2D
          </h2>
          <p className="text-base md:text-lg text-slate-300 max-w-2xl mx-auto">
            Acompanhamento visual em tempo real. Clique em qualquer peça para inspecionar ou alterar o status.
          </p>
        </div>

        {/* Estatísticas com Alto Contraste */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          <Card className="bg-slate-900/95 border border-slate-800 p-4 text-center">
            <Square className="w-5 h-5 text-slate-400 mx-auto mb-1" />
            <div className="text-2xl font-bold text-white">{total}</div>
            <div className="text-xs text-slate-400 font-medium">Total de Peças</div>
          </Card>

          <Card className="bg-slate-900/95 border border-slate-800 p-4 text-center">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 mx-auto mb-1" />
            <div className="text-2xl font-bold text-emerald-400">{concluidas}</div>
            <div className="text-xs text-slate-400 font-medium">Concluídas</div>
          </Card>

          <Card className="bg-slate-900/95 border border-slate-800 p-4 text-center">
            <Clock className="w-5 h-5 text-blue-400 mx-auto mb-1" />
            <div className="text-2xl font-bold text-blue-400">{emAndamento}</div>
            <div className="text-xs text-slate-400 font-medium">Em Andamento</div>
          </Card>

          <Card className="bg-slate-900/95 border border-slate-800 p-4 text-center">
            <AlertTriangle className="w-5 h-5 text-amber-400 mx-auto mb-1" />
            <div className="text-2xl font-bold text-slate-200">{planejadas}</div>
            <div className="text-xs text-slate-400 font-medium">Planejadas</div>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Mapa Visual */}
          <Card className="lg:col-span-8 bg-slate-900/95 border border-slate-700/80 shadow-2xl">
            <CardHeader className="border-b border-slate-800 pb-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <CardTitle className="text-lg font-bold text-white flex items-center gap-2">
                    <Map className="w-5 h-5 text-blue-400" />
                    Planta Estrutural — {pavimentoAtivo}º Pavimento
                  </CardTitle>
                  <CardDescription className="text-slate-400 text-xs">
                    Representação gráfica dos eixos estruturais
                  </CardDescription>
                </div>

                <div className="flex items-center gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="border-slate-700 bg-slate-800 text-xs text-slate-300"
                    onClick={() => setMostrarBusca(!mostrarBusca)}
                  >
                    <Search className="w-3.5 h-3.5 mr-1 text-orange-400" />
                    Buscar Peça
                  </Button>
                </div>
              </div>

              {mostrarBusca && (
                <div className="mt-3">
                  <Input 
                    placeholder="Filtrar por nome (ex: P1, V1, laje)..." 
                    value={buscaTexto}
                    onChange={(e) => setBuscaTexto(e.target.value)}
                    className="bg-slate-950 border-slate-700 text-xs"
                  />
                </div>
              )}
            </CardHeader>

            <CardContent className="pt-6">
              {/* Controles de Pavimento e Filtro */}
              <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                <div className="flex items-center gap-2 bg-slate-950 p-1 rounded-lg border border-slate-800">
                  <Button 
                    variant={pavimentoAtivo === "1" ? "default" : "ghost"} 
                    size="sm"
                    className={pavimentoAtivo === "1" ? "bg-blue-600 text-white font-bold text-xs" : "text-slate-400 text-xs"}
                    onClick={() => setPavimentoAtivo("1")}
                  >
                    1º Pavimento
                  </Button>
                  <Button 
                    variant={pavimentoAtivo === "2" ? "default" : "ghost"} 
                    size="sm"
                    className={pavimentoAtivo === "2" ? "bg-blue-600 text-white font-bold text-xs" : "text-slate-400 text-xs"}
                    onClick={() => setPavimentoAtivo("2")}
                  >
                    2º Pavimento
                  </Button>
                </div>

                <div className="flex flex-wrap items-center gap-1.5">
                  <Button 
                    variant={filtroStatus === "todos" ? "secondary" : "ghost"} 
                    size="sm"
                    className="text-xs h-8 border border-slate-800"
                    onClick={() => setFiltroStatus("todos")}
                  >
                    Todos
                  </Button>
                  <Button 
                    variant={filtroStatus === "concluido" ? "secondary" : "ghost"} 
                    size="sm"
                    className="text-xs h-8 border border-slate-800 text-emerald-400"
                    onClick={() => setFiltroStatus("concluido")}
                  >
                    Concluídos
                  </Button>
                  <Button 
                    variant={filtroStatus === "em_andamento" ? "secondary" : "ghost"} 
                    size="sm"
                    className="text-xs h-8 border border-slate-800 text-blue-400"
                    onClick={() => setFiltroStatus("em_andamento")}
                  >
                    Em Andamento
                  </Button>
                  <Button 
                    variant={filtroStatus === "planejado" ? "secondary" : "ghost"} 
                    size="sm"
                    className="text-xs h-8 border border-slate-800 text-slate-400"
                    onClick={() => setFiltroStatus("planejado")}
                  >
                    Planejados
                  </Button>
                </div>
              </div>

              {/* Grid Gráfico da Planta Baixa */}
              <div className="relative bg-[#070b12] border border-slate-800 rounded-xl p-6 min-h-[380px] shadow-inner flex flex-col justify-center">
                <div className="grid grid-cols-12 grid-rows-8 gap-2 h-80 relative">
                  {pecasFiltradas.map((peca) => {
                    const width = peca.width || 1;
                    const height = peca.height || 1;
                    const selecionada = pecaSelecionada?.id === peca.id;
                    
                    return (
                      <button
                        key={peca.id}
                        type="button"
                        onClick={() => setPecaSelecionada(peca)}
                        className={`
                          ${getStatusColor(peca.status)} 
                          rounded-md border flex items-center justify-center
                          text-xs font-bold transition-all duration-200
                          shadow-md cursor-pointer
                          ${selecionada ? "ring-2 ring-white ring-offset-2 ring-offset-slate-950 scale-105 z-10" : "opacity-90 hover:opacity-100"}
                        `}
                        style={{
                          gridColumn: `${peca.x} / span ${width}`,
                          gridRow: `${peca.y} / span ${height}`,
                        }}
                        title={`${peca.nome} (${peca.tipo.toUpperCase()}) - ${peca.status}`}
                      >
                        {peca.nome}
                      </button>
                    );
                  })}
                </div>

                {/* Legenda Fixa */}
                <div className="flex flex-wrap items-center justify-center gap-6 mt-6 pt-4 border-t border-slate-800/80 text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-3.5 h-3.5 bg-emerald-600 rounded"></div>
                    <span className="text-slate-300 font-medium">Concluído (Concretado)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3.5 h-3.5 bg-blue-600 rounded"></div>
                    <span className="text-slate-300 font-medium">Em Andamento</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3.5 h-3.5 bg-slate-700 rounded"></div>
                    <span className="text-slate-300 font-medium">Planejado</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Painel Lateral: Inspecionar e Alterar Peça */}
          <Card className="lg:col-span-4 bg-slate-900/95 border border-slate-700/80 shadow-2xl flex flex-col justify-between">
            <div>
              <CardHeader className="border-b border-slate-800 pb-4">
                <CardTitle className="text-base font-bold text-white flex items-center gap-2">
                  <Building className="w-4 h-4 text-orange-400" />
                  Inspeção da Peça
                </CardTitle>
                <CardDescription className="text-slate-400 text-xs">
                  {pecaSelecionada ? `Detalhes técnicos de ${pecaSelecionada.nome}` : "Selecione uma peça na planta"}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                {pecaSelecionada ? (
                  <div className="space-y-4">
                    <div className="p-4 bg-slate-800/60 border border-slate-700 rounded-xl">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xl font-extrabold text-white">
                          {pecaSelecionada.nome}
                        </span>
                        {getStatusBadge(pecaSelecionada.status)}
                      </div>

                      <div className="grid grid-cols-2 gap-3 text-xs">
                        <div>
                          <span className="text-slate-400 block">Tipo</span>
                          <strong className="text-slate-200 capitalize">{pecaSelecionada.tipo}</strong>
                        </div>
                        <div>
                          <span className="text-slate-400 block">Pavimento</span>
                          <strong className="text-slate-200">{pecaSelecionada.pavimento}º Pavimento</strong>
                        </div>
                        <div>
                          <span className="text-slate-400 block">FCK de Projeto</span>
                          <strong className="text-slate-200">{pecaSelecionada.fck}</strong>
                        </div>
                        <div>
                          <span className="text-slate-400 block">Volume Est.</span>
                          <strong className="text-white font-bold">{pecaSelecionada.volume.toFixed(1)} m³</strong>
                        </div>
                      </div>

                      {pecaSelecionada.data && (
                        <div className="mt-3 pt-2 border-t border-slate-700/60 text-xs text-slate-400">
                          Data da concretagem: <strong className="text-slate-200">{pecaSelecionada.data}</strong>
                        </div>
                      )}
                    </div>

                    {/* Botões de Alteração Rápida de Status */}
                    <div className="space-y-2 pt-2">
                      <Label className="text-xs font-bold text-slate-300 uppercase tracking-wide">
                        Alterar Status da Peça:
                      </Label>
                      <div className="grid grid-cols-1 gap-2">
                        <Button 
                          size="sm"
                          className="bg-emerald-600 hover:bg-emerald-500 text-white justify-start text-xs font-semibold"
                          onClick={() => handleAlterarStatusPeca("concluido")}
                        >
                          <Check className="w-3.5 h-3.5 mr-2" />
                          Marcar como Concluído
                        </Button>
                        <Button 
                          size="sm"
                          className="bg-blue-600 hover:bg-blue-500 text-white justify-start text-xs font-semibold"
                          onClick={() => handleAlterarStatusPeca("em_andamento")}
                        >
                          <PlayCircle className="w-3.5 h-3.5 mr-2" />
                          Iniciar Concretagem (Em Andamento)
                        </Button>
                        <Button 
                          size="sm"
                          variant="outline"
                          className="border-slate-700 bg-slate-800 text-slate-300 hover:text-white justify-start text-xs"
                          onClick={() => handleAlterarStatusPeca("planejado")}
                        >
                          Definir como Planejado
                        </Button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12 text-slate-400 text-xs">
                    Toque em qualquer pilar, viga ou laje no mapa para visualizar e editar suas características.
                  </div>
                )}
              </CardContent>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default MapaConcretagem;
