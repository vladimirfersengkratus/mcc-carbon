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
  Sparkles
} from "lucide-react";

export interface EstruturaItem {
  id: number;
  nome: string;
  fck: string;
  volumePlanejado: number;
  volumeExecutado: number;
  dataExecucao: string;
  status: "concluido" | "em_andamento" | "planejado";
}

const PlanejamentoVolume = () => {
  const { toast } = useToast();
  // Inicia 100% limpo, pronto para cadastros reais
  const [estruturas, setEstruturas] = useState<EstruturaItem[]>([]);

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
      id: Date.now(),
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
      title: "Estrutura cadastrada!",
      description: `${estrutura.nome} incluída no planejamento da obra.`
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

  const totalPlanejado = estruturas.reduce((acc, est) => acc + est.volumePlanejado, 0);
  const totalExecutado = estruturas.reduce((acc, est) => acc + est.volumeExecutado, 0);
  const percentual = totalPlanejado > 0 ? Math.round((totalExecutado / totalPlanejado) * 100) : 0;

  return (
    <div className="space-y-8">
      {/* Cabeçalho */}
      <div className="border-b border-slate-800 pb-6">
        <div className="inline-flex items-center gap-2 bg-slate-900 border border-slate-800 px-3.5 py-1 rounded-full mb-2">
          <Sparkles className="w-3.5 h-3.5 text-orange-400" />
          <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
            Balanço Volumétrico e Gestão de Perdas
          </span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
          Planejamento de Volume de Concreto
        </h1>
        <p className="text-sm text-slate-400 mt-1 max-w-2xl font-normal">
          Controle de cubagem por etapa construtiva para prevenção de sobras excessivas ou pedidos a menor na usina.
        </p>
      </div>

      {/* Resumo Geral */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
            <CardTitle className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
              <Plus className="w-5 h-5 text-blue-400" />
              Adicionar Elemento ao Plano
            </CardTitle>
            <CardDescription className="text-slate-400 text-xs">
              Cadastre peças para o dimensionamento de concreto
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 pt-6">
            <div>
              <Label htmlFor="est-nome" className="text-xs font-bold text-slate-200 uppercase tracking-wide">
                Nome da Estrutura / Elemento *
              </Label>
              <Input
                id="est-nome"
                placeholder="Ex: Pilares do 2º Pavimento"
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

        {/* Lista de Estruturas Reais */}
        <Card className="lg:col-span-7 bg-slate-900/95 border border-slate-700/80 shadow-2xl">
          <CardHeader className="border-b border-slate-800 pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <Layers className="w-5 h-5 text-orange-400" />
                Estruturas da Obra
              </CardTitle>
              <span className="text-xs text-slate-400">
                {estruturas.length} cadastradas
              </span>
            </div>
            <CardDescription className="text-slate-400 text-xs">
              Acompanhamento do avanço físico das peças
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            {estruturas.length === 0 ? (
              <div className="text-center py-16 px-4">
                <div className="w-12 h-12 rounded-full bg-slate-800/80 border border-slate-700 flex items-center justify-center mx-auto mb-3">
                  <Layers className="w-6 h-6 text-slate-500" />
                </div>
                <h4 className="text-sm font-bold text-slate-300 mb-1">Nenhum elemento cadastrado no plano</h4>
                <p className="text-xs text-slate-400 max-w-xs mx-auto leading-relaxed">
                  Os dados de planejamento estão zerados para o início dos testes. Adicione a primeira estrutura pelo formulário ao lado para gerenciar a cubagem.
                </p>
              </div>
            ) : (
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
                        <Badge variant="outline" className="text-xs border-slate-700 text-slate-300">
                          {estrutura.status.toUpperCase()}
                        </Badge>
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

                      <div className="w-full bg-slate-800 rounded-full h-2.5 overflow-hidden">
                        <div 
                          className="bg-gradient-to-r from-blue-600 to-cyan-400 h-2.5 rounded-full"
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
                          <PlayCircle className="w-3.5 h-3.5 mr-1 text-blue-400" />
                          Alternar Status
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PlanejamentoVolume;
