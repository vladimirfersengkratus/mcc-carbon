import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { 
  Calculator, 
  Calendar, 
  Building, 
  Layers,
  Plus,
  Save,
  TrendingUp,
  Target
} from "lucide-react";

const PlanejamentoVolume = () => {
  const [estruturas, setEstruturas] = useState([
    {
      id: 1,
      nome: "Fundação - Sapatas",
      fck: "25 MPa",
      volumePlanejado: 45.5,
      volumeExecutado: 45.5,
      dataExecucao: "2024-01-08",
      status: "concluido"
    },
    {
      id: 2,
      nome: "Pilares - 1º Pavimento",
      fck: "30 MPa",
      volumePlanejado: 28.3,
      volumeExecutado: 28.3,
      dataExecucao: "2024-01-10",
      status: "concluido"
    },
    {
      id: 3,
      nome: "Vigas - 1º Pavimento",
      fck: "25 MPa",
      volumePlanejado: 42.7,
      volumeExecutado: 0,
      dataExecucao: "2024-01-15",
      status: "planejado"
    },
    {
      id: 4,
      nome: "Laje - 1º Pavimento",
      fck: "25 MPa",
      volumePlanejado: 85.2,
      volumeExecutado: 0,
      dataExecucao: "2024-01-18",
      status: "planejado"
    }
  ]);

  const [novaEstrutura, setNovaEstrutura] = useState({
    nome: "",
    fck: "",
    volumePlanejado: "",
    dataExecucao: ""
  });

  const handleSalvarEstrutura = () => {
    const estrutura = {
      id: estruturas.length + 1,
      ...novaEstrutura,
      volumePlanejado: parseFloat(novaEstrutura.volumePlanejado),
      volumeExecutado: 0,
      status: "planejado"
    };
    
    setEstruturas([...estruturas, estrutura]);
    setNovaEstrutura({
      nome: "",
      fck: "",
      volumePlanejado: "",
      dataExecucao: ""
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "concluido":
        return <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Concluído</Badge>;
      case "em_andamento":
        return <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">Em Andamento</Badge>;
      default:
        return <Badge className="bg-gray-500/20 text-gray-400 border-gray-500/30">Planejado</Badge>;
    }
  };

  const getTotalPlanejado = () => estruturas.reduce((total, est) => total + est.volumePlanejado, 0);
  const getTotalExecutado = () => estruturas.reduce((total, est) => total + est.volumeExecutado, 0);
  const getPercentualExecutado = () => {
    const total = getTotalPlanejado();
    const executado = getTotalExecutado();
    return total > 0 ? Math.round((executado / total) * 100) : 0;
  };

  return (
    <section className="py-20 px-6" id="planejamento">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Planejamento de{" "}
            <span className="gradient-text">Volume</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Organize e calcule o volume total de concreto para todas as estruturas da obra.
          </p>
        </div>

        {/* Resumo Geral */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="glass-card">
            <CardContent className="p-6 text-center">
              <Calculator className="w-8 h-8 text-accent mx-auto mb-2" />
              <div className="text-2xl font-bold gradient-text">{getTotalPlanejado().toFixed(1)} m³</div>
              <div className="text-sm text-muted-foreground">Volume total planejado</div>
            </CardContent>
          </Card>
          <Card className="glass-card">
            <CardContent className="p-6 text-center">
              <Building className="w-8 h-8 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold gradient-text">{getTotalExecutado().toFixed(1)} m³</div>
              <div className="text-sm text-muted-foreground">Volume executado</div>
            </CardContent>
          </Card>
          <Card className="glass-card">
            <CardContent className="p-6 text-center">
              <TrendingUp className="w-8 h-8 text-primary-glow mx-auto mb-2" />
              <div className="text-2xl font-bold gradient-text">{getPercentualExecutado()}%</div>
              <div className="text-sm text-muted-foreground">Progresso execução</div>
            </CardContent>
          </Card>
          <Card className="glass-card">
            <CardContent className="p-6 text-center">
              <Target className="w-8 h-8 text-accent mx-auto mb-2" />
              <div className="text-2xl font-bold gradient-text">{estruturas.length}</div>
              <div className="text-sm text-muted-foreground">Estruturas planejadas</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          {/* Formulário de Nova Estrutura */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="w-5 h-5 text-accent" />
                Nova Estrutura
              </CardTitle>
              <CardDescription>
                Adicione uma nova estrutura ao planejamento
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="nome">Nome da Estrutura</Label>
                <Input
                  id="nome"
                  placeholder="Ex: Laje - 2º Pavimento"
                  value={novaEstrutura.nome}
                  onChange={(e) => setNovaEstrutura({...novaEstrutura, nome: e.target.value})}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="fck">FCK (MPa)</Label>
                  <Input
                    id="fck"
                    placeholder="25"
                    value={novaEstrutura.fck}
                    onChange={(e) => setNovaEstrutura({...novaEstrutura, fck: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="volume">Volume (m³)</Label>
                  <Input
                    id="volume"
                    placeholder="45.5"
                    type="number"
                    step="0.1"
                    value={novaEstrutura.volumePlanejado}
                    onChange={(e) => setNovaEstrutura({...novaEstrutura, volumePlanejado: e.target.value})}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="dataExecucao">Data Prevista de Execução</Label>
                <Input
                  id="dataExecucao"
                  type="date"
                  value={novaEstrutura.dataExecucao}
                  onChange={(e) => setNovaEstrutura({...novaEstrutura, dataExecucao: e.target.value})}
                />
              </div>

              <Button variant="gradient" className="w-full" onClick={handleSalvarEstrutura}>
                <Save className="w-4 h-4 mr-2" />
                Adicionar Estrutura
              </Button>
            </CardContent>
          </Card>

          {/* Lista de Estruturas */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Layers className="w-5 h-5 text-accent" />
                Estruturas Planejadas
              </CardTitle>
              <CardDescription>
                Cronograma de execução das estruturas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {estruturas.map((estrutura) => (
                  <div key={estrutura.id} className="border border-border/50 rounded-lg p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Building className="w-4 h-4 text-accent" />
                        <span className="font-medium">{estrutura.nome}</span>
                      </div>
                      {getStatusBadge(estrutura.status)}
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <span className="text-muted-foreground">FCK:</span> {estrutura.fck}
                      </div>
                      <div>
                        <span className="text-muted-foreground">Data:</span> {estrutura.dataExecucao}
                      </div>
                      <div>
                        <span className="text-muted-foreground">Planejado:</span> {estrutura.volumePlanejado.toFixed(1)} m³
                      </div>
                      <div>
                        <span className="text-muted-foreground">Executado:</span> {estrutura.volumeExecutado.toFixed(1)} m³
                      </div>
                    </div>

                    {/* Barra de Progresso */}
                    <div className="w-full bg-secondary/50 rounded-full h-2">
                      <div 
                        className="bg-gradient-primary h-2 rounded-full transition-all duration-300"
                        style={{ 
                          width: `${estrutura.volumePlanejado > 0 ? (estrutura.volumeExecutado / estrutura.volumePlanejado) * 100 : 0}%` 
                        }}
                      ></div>
                    </div>

                    <div className="flex justify-between items-center pt-2 border-t border-border/50">
                      <span className="text-sm text-muted-foreground">
                        Progresso: {estrutura.volumePlanejado > 0 ? Math.round((estrutura.volumeExecutado / estrutura.volumePlanejado) * 100) : 0}%
                      </span>
                      {estrutura.status === "planejado" && (
                        <Button variant="ghost" size="sm">
                          Iniciar Execução
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Cronograma Visual */}
        <Card className="glass-card mt-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-accent" />
              Cronograma de Execução
            </CardTitle>
            <CardDescription>
              Visualização temporal do planejamento de concretagem
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {estruturas
                .sort((a, b) => new Date(a.dataExecucao).getTime() - new Date(b.dataExecucao).getTime())
                .map((estrutura, index) => (
                <div key={estrutura.id} className="flex items-center gap-4 p-3 rounded-lg bg-secondary/30">
                  <div className="w-12 h-12 rounded-lg bg-gradient-primary/20 flex items-center justify-center">
                    <span className="text-sm font-bold">{index + 1}</span>
                  </div>
                  <div className="flex-1">
                    <div className="font-medium">{estrutura.nome}</div>
                    <div className="text-sm text-muted-foreground">
                      {estrutura.dataExecucao} • {estrutura.volumePlanejado.toFixed(1)} m³ • {estrutura.fck}
                    </div>
                  </div>
                  {getStatusBadge(estrutura.status)}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default PlanejamentoVolume;