import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { 
  Calculator, 
  Building, 
  Layers, 
  Plus, 
  Save, 
  TrendingUp, 
  Target,
  PlayCircle,
  CheckCircle2,
  Calendar,
  Sparkles
} from "lucide-react";

interface EstruturaItem {
  id: number;
  nome: string;
  fck: string;
  volumePlanejado: number;
  volumeExecutado: number;
  dataExecucao: string;
  status: "concluido" | "em_andamento" | "planejado";
}

const ESTRUTURAS_INICIAIS: EstruturaItem[] = [
  {
    id: 1,
    nome: "Fundação - Sapatas e Blocos",
    fck: "25 MPa",
    volumePlanejado: 45.5,
    volumeExecutado: 45.5,
    dataExecucao: "2026-09-08",
    status: "concluido"
  },
  {
    id: 2,
    nome: "Pilares - 1º Pavimento (P1 a P6)",
    fck: "30 MPa",
    volumePlanejado: 28.3,
    volumeExecutado: 28.3,
    dataExecucao: "2026-09-12",
    status: "concluido"
  },
  {
    id: 3,
    nome: "Vigas - 1º Pavimento (V1 a V4)",
    fck: "30 MPa",
    volumePlanejado: 42.0,
    volumeExecutado: 18.0,
    dataExecucao: "2026-09-18",
    status: "em_andamento"
  },
  {
    id: 4,
    nome: "Laje Maciça L1 - 1º Pavimento",
    fck: "30 MPa",
    volumePlanejado: 85.0,
    volumeExecutado: 0,
    dataExecucao: "2026-09-22",
    status: "planejado"
  }
];

const PlanejamentoVolume = () => {
  const { toast } = useToast();
  const [estruturas, setEstruturas] = useState<EstruturaItem[]>(ESTRUTURAS_INICIAIS);

  const [novaEstrutura, setNovaEstrutura] = useState({
    nome: "",
    fck: "30 MPa",
    volumePlanejado: "",
    dataExecucao: ""
  });

  const handleSalvarEstrutura = () => {
    if (!novaEstrutura.nome || !novaEstrutura.volumePlanejado) {
      toast({
        title: "Campos obrigatórios",
        description: "Informe o nome da estrutura e o volume planejado.",
        variant: "destructive"
      });
      return;
    }

    const estrutura: EstruturaItem = {
      id: estruturas.length + 1,
      nome: novaEstrutura.nome,
      fck: novaEstrutura.fck || "30 MPa",
      volumePlanejado: parseFloat(novaEstrutura.volumePlanejado),
      volumeExecutado: 0,
      dataExecucao: novaEstrutura.dataExecucao || new Date().toISOString().split('T')[0],
      status: "planejado"
    };
    
    setEstruturas([...estruturas, estrutura]);
    setNovaEstrutura({
      nome: "",
      fck: "30 MPa",
      volumePlanejado: "",
      dataExecucao: ""
    });

    toast({
      title: "Estrutura adicionada!",
      description: `${estrutura.nome} incluída no planejamento de concretagem.`
    });
  };

  const handleAlternarStatus = (id: number) => {
    setEstruturas(prev => prev.map(est => {
      if (est.id !== id) return est;
      if (est.status === "planejado") {
        toast({
          title: "Concretagem iniciada!",
          description: `${est.nome} agora está em andamento.`
        });
        return { ...est, status: "em_andamento" as const };
      }
      if (est.status === "em_andamento") {
        toast({
          title: "Estrutura concluída!",
          description: `${est.nome} finalizada com sucesso.`
        });
        return { ...est, status: "concluido" as const, volumeExecutado: est.volumePlanejado };
      }
      return { ...est, status: "planejado" as const, volumeExecutado: 0 };
    }));
  };

  const getStatusBadge = (status: EstruturaItem["status"]) => {
    switch (status) {
      case "concluido":
        return <Badge className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-xs px-2">Concluído</Badge>;
      case "em_andamento":
        return <Badge className="bg-blue-500/20 text-blue-400 border border-blue-500/40 text-xs px-2">Em Andamento</Badge>;
      default:
        return <Badge className="bg-slate-700/50 text-slate-300 border border-slate-600 text-xs px-2">Planejado</Badge>;
    }
  };

  const totalPlanejado = estruturas.reduce((acc, est) => acc + est.volumePlanejado, 0);
  const totalExecutado = estruturas.reduce((acc, est) => acc + est.volumeExecutado, 0);
  const percentual = totalPlanejado > 0 ? Math.round((totalExecutado / totalPlanejado) * 100) : 0;

  return (
    <section className="py-20 px-6 bg-[#0c121e]" id="planejamento">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-slate-900 border border-slate-800 px-4 py-1.5 rounded-full mb-4">
            <Sparkles className="w-4 h-4 text-orange-400" />
            <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
              Balanço Volumétrico
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4">
            Planejamento de Volume de Concreto
          </h2>
          <p className="text-base md:text-lg text-slate-300 max-w-2xl mx-auto">
            Calcule e organize a cubagem de concreto para cada etapa construtiva, evitando sobras e faltas.
          </p>
        </div>

        {/* Resumo Geral */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Card className="bg-slate-900/95 border border-slate-800 shadow-lg">
            <CardContent className="p-6 text-center">
              <Calculator className="w-7 h-7 text-orange-400 mx-auto mb-2" />
              <div className="text-2xl font-extrabold text-white">{totalPlanejado.toFixed(1)} m³</div>
              <div className="text-xs text-slate-400 mt-1 font-medium">Volume Total Previsto</div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/95 border border-slate-800 shadow-lg">
            <CardContent className="p-6 text-center">
              <Building className="w-7 h-7 text-blue-400 mx-auto mb-2" />
              <div className="text-2xl font-extrabold text-white">{totalExecutado.toFixed(1)} m³</div>
              <div className="text-xs text-slate-400 mt-1 font-medium">Volume Já Aplicado</div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/95 border border-slate-800 shadow-lg">
            <CardContent className="p-6 text-center">
              <TrendingUp className="w-7 h-7 text-emerald-400 mx-auto mb-2" />
              <div className="text-2xl font-extrabold text-white">{percentual}%</div>
              <div className="text-xs text-slate-400 mt-1 font-medium">Progresso da Execução</div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/95 border border-slate-800 shadow-lg">
            <CardContent className="p-6 text-center">
              <Target className="w-7 h-7 text-cyan-400 mx-auto mb-2" />
              <div className="text-2xl font-extrabold text-white">{estruturas.length}</div>
              <div className="text-xs text-slate-400 mt-1 font-medium">Estruturas Cadastradas</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Formulário de Nova Estrutura */}
          <Card className="lg:col-span-5 bg-slate-900/95 border border-slate-700/80 shadow-2xl">
            <CardHeader className="border-b border-slate-800 pb-4">
              <CardTitle className="text-lg font-bold text-white flex items-center gap-2">
                <Plus className="w-5 h-5 text-blue-400" />
                Adicionar Estrutura ao Plano
              </CardTitle>
              <CardDescription className="text-slate-400 text-xs">
                Cadastre elementos para dimensionamento de concreto
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 pt-6">
              <div>
                <Label htmlFor="est-nome" className="text-xs font-bold text-slate-200 uppercase tracking-wide">
                  Nome da Estrutura / Peça *
                </Label>
                <Input
                  id="est-nome"
                  placeholder="Ex: Vigas do 2º Pavimento"
                  value={novaEstrutura.nome}
                  onChange={(e) => setNovaEstrutura({...novaEstrutura, nome: e.target.value})}
                  className="mt-1"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="est-fck" className="text-xs font-bold text-slate-200 uppercase tracking-wide">
                    FCK Especificado
                  </Label>
                  <Input
                    id="est-fck"
                    placeholder="Ex: 30 MPa"
                    value={novaEstrutura.fck}
                    onChange={(e) => setNovaEstrutura({...novaEstrutura, fck: e.target.value})}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="est-volume" className="text-xs font-bold text-slate-200 uppercase tracking-wide">
                    Volume Teórico (m³) *
                  </Label>
                  <Input
                    id="est-volume"
                    type="number"
                    step="0.1"
                    placeholder="Ex: 24.5"
                    value={novaEstrutura.volumePlanejado}
                    onChange={(e) => setNovaEstrutura({...novaEstrutura, volumePlanejado: e.target.value})}
                    className="mt-1"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="est-data" className="text-xs font-bold text-slate-200 uppercase tracking-wide">
                  Data Prevista de Concretagem
                </Label>
                <Input
                  id="est-data"
                  type="date"
                  value={novaEstrutura.dataExecucao}
                  onChange={(e) => setNovaEstrutura({...novaEstrutura, dataExecucao: e.target.value})}
                  className="mt-1"
                />
              </div>

              <Button 
                className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-6 shadow-md shadow-blue-600/30 transition-all mt-2" 
                onClick={handleSalvarEstrutura}
              >
                <Save className="w-4 h-4 mr-2" />
                Incluir no Planejamento
              </Button>
            </CardContent>
          </Card>

          {/* Lista de Estruturas com Interatividade Real */}
          <Card className="lg:col-span-7 bg-slate-900/95 border border-slate-700/80 shadow-2xl">
            <CardHeader className="border-b border-slate-800 pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-bold text-white flex items-center gap-2">
                  <Layers className="w-5 h-5 text-orange-400" />
                  Estruturas Planejadas e em Execução
                </CardTitle>
                <span className="text-xs text-slate-400">
                  {estruturas.length} cadastradas
                </span>
              </div>
              <CardDescription className="text-slate-400 text-xs">
                Toque nos botões para avançar o status da peça na obra
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4 max-h-[480px] overflow-y-auto pr-1">
                {estruturas.map((estrutura) => {
                  const perc = estrutura.volumePlanejado > 0 
                    ? Math.round((estrutura.volumeExecutado / estrutura.volumePlanejado) * 100) 
                    : 0;

                  return (
                    <div key={estrutura.id} className="border border-slate-800 bg-slate-800/40 rounded-xl p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Building className="w-4 h-4 text-blue-400" />
                          <span className="font-bold text-white text-sm">{estrutura.nome}</span>
                        </div>
                        {getStatusBadge(estrutura.status)}
                      </div>
                      
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                        <div>
                          <span className="text-slate-400 block">FCK</span>
                          <span className="text-slate-200 font-medium">{estrutura.fck}</span>
                        </div>
                        <div>
                          <span className="text-slate-400 block">Data Prevista</span>
                          <span className="text-slate-200 font-medium">{estrutura.dataExecucao}</span>
                        </div>
                        <div>
                          <span className="text-slate-400 block">Planejado</span>
                          <span className="text-white font-bold">{estrutura.volumePlanejado.toFixed(1)} m³</span>
                        </div>
                        <div>
                          <span className="text-slate-400 block">Executado</span>
                          <span className="text-emerald-400 font-bold">{estrutura.volumeExecutado.toFixed(1)} m³</span>
                        </div>
                      </div>

                      {/* Barra de Progresso com Alto Contraste */}
                      <div className="w-full bg-slate-800 rounded-full h-2.5 overflow-hidden">
                        <div 
                          className="bg-gradient-to-r from-blue-600 to-cyan-400 h-2.5 rounded-full transition-all duration-500"
                          style={{ width: `${Math.min(perc, 100)}%` }}
                        ></div>
                      </div>

                      <div className="flex justify-between items-center pt-2 border-t border-slate-800/80">
                        <span className="text-xs text-slate-300 font-medium">
                          Avanço: <strong className="text-white">{perc}%</strong>
                        </span>
                        
                        <Button 
                          size="sm"
                          variant="outline"
                          className="border-slate-700 bg-slate-800 text-xs text-slate-200 hover:text-white"
                          onClick={() => handleAlternarStatus(estrutura.id)}
                        >
                          {estrutura.status === "planejado" && (
                            <>
                              <PlayCircle className="w-3.5 h-3.5 mr-1 text-blue-400" />
                              Iniciar Concretagem
                            </>
                          )}
                          {estrutura.status === "em_andamento" && (
                            <>
                              <CheckCircle2 className="w-3.5 h-3.5 mr-1 text-emerald-400" />
                              Concluir Peça
                            </>
                          )}
                          {estrutura.status === "concluido" && (
                            <>
                              <CheckCircle2 className="w-3.5 h-3.5 mr-1 text-emerald-400" />
                              Concluído (clique para reabrir)
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default PlanejamentoVolume;
