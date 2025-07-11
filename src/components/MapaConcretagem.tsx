import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Map, 
  Square,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Filter,
  Layers,
  Maximize2,
  Search
} from "lucide-react";

const MapaConcretagem = () => {
  const [filtroStatus, setFiltroStatus] = useState("todos");
  const [pavimentoAtivo, setPavimentoAtivo] = useState("1");

  // Dados simulados das peças estruturais com alinhamento correto em todos os pavimentos
  const pecas = [
    // Pavimento 1 - Pilares nos eixos estruturais
    { id: 1, tipo: "pilar", nome: "P1", status: "concluido", x: 3, y: 3, pavimento: "1", data: "2024-01-10" },
    { id: 2, tipo: "pilar", nome: "P2", status: "concluido", x: 6, y: 3, pavimento: "1", data: "2024-01-10" },
    { id: 3, tipo: "pilar", nome: "P3", status: "concluido", x: 9, y: 3, pavimento: "1", data: "2024-01-10" },
    { id: 4, tipo: "pilar", nome: "P4", status: "concluido", x: 3, y: 6, pavimento: "1", data: "2024-01-10" },
    { id: 5, tipo: "pilar", nome: "P5", status: "concluido", x: 6, y: 6, pavimento: "1", data: "2024-01-10" },
    { id: 6, tipo: "pilar", nome: "P6", status: "concluido", x: 9, y: 6, pavimento: "1", data: "2024-01-10" },
    
    // Vigas Pav 1 - eixos alinhados com pilares, faces alinhadas com bordas das lajes
    { id: 7, tipo: "viga", nome: "V1", status: "concluido", x: 3, y: 2, pavimento: "1", width: 3, height: 1, direcao: "horizontal" },
    { id: 8, tipo: "viga", nome: "V2", status: "concluido", x: 6, y: 2, pavimento: "1", width: 3, height: 1, direcao: "horizontal" },
    { id: 9, tipo: "viga", nome: "V3", status: "em_andamento", x: 2, y: 3, pavimento: "1", width: 1, height: 3, direcao: "vertical" },
    { id: 10, tipo: "viga", nome: "V4", status: "em_andamento", x: 10, y: 3, pavimento: "1", width: 1, height: 3, direcao: "vertical" },
    { id: 15, tipo: "viga", nome: "V5", status: "concluido", x: 3, y: 7, pavimento: "1", width: 6, height: 1, direcao: "horizontal" },
    { id: 16, tipo: "viga", nome: "V6", status: "em_andamento", x: 6, y: 3, pavimento: "1", width: 1, height: 4, direcao: "vertical" },
    
    // Lajes Pav 1 - faces alinhadas com faces das vigas
    { id: 11, tipo: "laje", nome: "L1", status: "planejado", x: 3, y: 3, pavimento: "1", width: 3, height: 3 },
    { id: 12, tipo: "laje", nome: "L2", status: "planejado", x: 7, y: 3, pavimento: "1", width: 2, height: 3 },

    // Pavimento 2 - Mesmo alinhamento estrutural do Pav 1
    { id: 21, tipo: "pilar", nome: "P1", status: "em_andamento", x: 3, y: 3, pavimento: "2" },
    { id: 22, tipo: "pilar", nome: "P2", status: "em_andamento", x: 6, y: 3, pavimento: "2" },
    { id: 23, tipo: "pilar", nome: "P3", status: "em_andamento", x: 9, y: 3, pavimento: "2" },
    { id: 24, tipo: "pilar", nome: "P4", status: "planejado", x: 3, y: 6, pavimento: "2" },
    { id: 25, tipo: "pilar", nome: "P5", status: "planejado", x: 6, y: 6, pavimento: "2" },
    { id: 26, tipo: "pilar", nome: "P6", status: "planejado", x: 9, y: 6, pavimento: "2" },
    
    // Vigas Pav 2 - mesmo alinhamento do Pav 1
    { id: 27, tipo: "viga", nome: "V1", status: "em_andamento", x: 3, y: 2, pavimento: "2", width: 3, height: 1, direcao: "horizontal" },
    { id: 28, tipo: "viga", nome: "V2", status: "em_andamento", x: 6, y: 2, pavimento: "2", width: 3, height: 1, direcao: "horizontal" },
    { id: 29, tipo: "viga", nome: "V3", status: "planejado", x: 2, y: 3, pavimento: "2", width: 1, height: 3, direcao: "vertical" },
    { id: 30, tipo: "viga", nome: "V4", status: "planejado", x: 10, y: 3, pavimento: "2", width: 1, height: 3, direcao: "vertical" },
    { id: 31, tipo: "viga", nome: "V5", status: "planejado", x: 3, y: 7, pavimento: "2", width: 6, height: 1, direcao: "horizontal" },
    { id: 32, tipo: "viga", nome: "V6", status: "planejado", x: 6, y: 3, pavimento: "2", width: 1, height: 4, direcao: "vertical" },
    
    // Lajes Pav 2 - mesmo alinhamento do Pav 1
    { id: 33, tipo: "laje", nome: "L1", status: "planejado", x: 3, y: 3, pavimento: "2", width: 3, height: 3 },
    { id: 34, tipo: "laje", nome: "L2", status: "planejado", x: 7, y: 3, pavimento: "2", width: 2, height: 3 },

    // Pavimento 3 - Cobertura com mesmo alinhamento
    { id: 41, tipo: "pilar", nome: "P1", status: "planejado", x: 3, y: 3, pavimento: "3" },
    { id: 42, tipo: "pilar", nome: "P2", status: "planejado", x: 6, y: 3, pavimento: "3" },
    { id: 43, tipo: "pilar", nome: "P3", status: "planejado", x: 9, y: 3, pavimento: "3" },
    { id: 44, tipo: "pilar", nome: "P4", status: "planejado", x: 3, y: 6, pavimento: "3" },
    { id: 45, tipo: "pilar", nome: "P5", status: "planejado", x: 6, y: 6, pavimento: "3" },
    { id: 46, tipo: "pilar", nome: "P6", status: "planejado", x: 9, y: 6, pavimento: "3" },
    
    // Vigas Pav 3 - mesmo alinhamento estrutural
    { id: 47, tipo: "viga", nome: "V1", status: "planejado", x: 3, y: 2, pavimento: "3", width: 3, height: 1, direcao: "horizontal" },
    { id: 48, tipo: "viga", nome: "V2", status: "planejado", x: 6, y: 2, pavimento: "3", width: 3, height: 1, direcao: "horizontal" },
    { id: 49, tipo: "viga", nome: "V3", status: "planejado", x: 2, y: 3, pavimento: "3", width: 1, height: 3, direcao: "vertical" },
    { id: 50, tipo: "viga", nome: "V4", status: "planejado", x: 10, y: 3, pavimento: "3", width: 1, height: 3, direcao: "vertical" },
    { id: 51, tipo: "viga", nome: "V5", status: "planejado", x: 3, y: 7, pavimento: "3", width: 6, height: 1, direcao: "horizontal" },
    { id: 52, tipo: "viga", nome: "V6", status: "planejado", x: 6, y: 3, pavimento: "3", width: 1, height: 4, direcao: "vertical" },
    
    // Laje de cobertura
    { id: 53, tipo: "laje", nome: "LC1", status: "planejado", x: 3, y: 3, pavimento: "3", width: 6, height: 4 },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "concluido":
        return "bg-green-500";
      case "em_andamento":
        return "bg-blue-500";
      case "atrasado":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "concluido":
        return <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Concluído</Badge>;
      case "em_andamento":
        return <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">Em Andamento</Badge>;
      case "atrasado":
        return <Badge className="bg-red-500/20 text-red-400 border-red-500/30">Atrasado</Badge>;
      default:
        return <Badge className="bg-gray-500/20 text-gray-400 border-gray-500/30">Planejado</Badge>;
    }
  };

  const pecasFiltradas = pecas.filter(peca => 
    peca.pavimento === pavimentoAtivo && 
    (filtroStatus === "todos" || peca.status === filtroStatus)
  );

  const getEstatisticas = () => {
    const pecasPavimento = pecas.filter(p => p.pavimento === pavimentoAtivo);
    return {
      total: pecasPavimento.length,
      concluidas: pecasPavimento.filter(p => p.status === "concluido").length,
      emAndamento: pecasPavimento.filter(p => p.status === "em_andamento").length,
      planejadas: pecasPavimento.filter(p => p.status === "planejado").length,
    };
  };

  const stats = getEstatisticas();

  return (
    <section className="py-20 px-6" id="mapa">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Mapa de{" "}
            <span className="gradient-text">Concretagem</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Visualização em tempo real do status de todas as peças estruturais da obra.
          </p>
        </div>

        {/* Estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="glass-card">
            <CardContent className="p-6 text-center">
              <Square className="w-8 h-8 text-accent mx-auto mb-2" />
              <div className="text-2xl font-bold gradient-text">{stats.total}</div>
              <div className="text-sm text-muted-foreground">Total de peças</div>
            </CardContent>
          </Card>
          <Card className="glass-card">
            <CardContent className="p-6 text-center">
              <CheckCircle2 className="w-8 h-8 text-green-400 mx-auto mb-2" />
              <div className="text-2xl font-bold gradient-text">{stats.concluidas}</div>
              <div className="text-sm text-muted-foreground">Concluídas</div>
            </CardContent>
          </Card>
          <Card className="glass-card">
            <CardContent className="p-6 text-center">
              <Clock className="w-8 h-8 text-blue-400 mx-auto mb-2" />
              <div className="text-2xl font-bold gradient-text">{stats.emAndamento}</div>
              <div className="text-sm text-muted-foreground">Em andamento</div>
            </CardContent>
          </Card>
          <Card className="glass-card">
            <CardContent className="p-6 text-center">
              <AlertTriangle className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <div className="text-2xl font-bold gradient-text">{stats.planejadas}</div>
              <div className="text-sm text-muted-foreground">Planejadas</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Mapa Visual */}
          <Card className="xl:col-span-2 glass-card">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Map className="w-5 h-5 text-accent" />
                    Planta - {pavimentoAtivo}º Pavimento
                  </CardTitle>
                  <CardDescription>
                    Status visual das peças estruturais
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm">
                    <Maximize2 className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Search className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {/* Controles */}
              <div className="flex flex-wrap gap-4 mb-6">
                <div className="flex gap-2">
                  <Button 
                    variant={pavimentoAtivo === "1" ? "default" : "ghost"} 
                    size="sm"
                    onClick={() => setPavimentoAtivo("1")}
                  >
                    1º Pav
                  </Button>
                  <Button 
                    variant={pavimentoAtivo === "2" ? "default" : "ghost"} 
                    size="sm"
                    onClick={() => setPavimentoAtivo("2")}
                  >
                    2º Pav
                  </Button>
                  <Button 
                    variant={pavimentoAtivo === "3" ? "default" : "ghost"} 
                    size="sm"
                    onClick={() => setPavimentoAtivo("3")}
                  >
                    Cobertura
                  </Button>
                </div>
                <div className="flex gap-2">
                  <Button 
                    variant={filtroStatus === "todos" ? "default" : "ghost"} 
                    size="sm"
                    onClick={() => setFiltroStatus("todos")}
                  >
                    <Filter className="w-4 h-4 mr-1" />
                    Todos
                  </Button>
                  <Button 
                    variant={filtroStatus === "concluido" ? "default" : "ghost"} 
                    size="sm"
                    onClick={() => setFiltroStatus("concluido")}
                  >
                    Concluídos
                  </Button>
                  <Button 
                    variant={filtroStatus === "em_andamento" ? "default" : "ghost"} 
                    size="sm"
                    onClick={() => setFiltroStatus("em_andamento")}
                  >
                    Em andamento
                  </Button>
                </div>
              </div>

              {/* Grid do Mapa */}
              <div className="relative bg-secondary/20 rounded-lg p-6" style={{ minHeight: "400px" }}>
                <div className="grid grid-cols-12 grid-rows-8 gap-1 h-96 relative">
                  {pecasFiltradas.map((peca) => {
                    const width = peca.width || 1;
                    const height = peca.height || 1;
                    
                    // Estilos específicos por tipo de elemento estrutural
                    let tipoClasses = "";
                    let borderStyle = "";
                    
                    switch (peca.tipo) {
                      case "pilar":
                        tipoClasses = "border-2 border-white/30 font-bold text-xs";
                        borderStyle = "solid";
                        break;
                      case "viga":
                        tipoClasses = "border border-white/20 font-medium text-xs";
                        // Vigas têm representação linear mais estreita
                        if (peca.direcao === "horizontal") {
                          borderStyle = "border-t-2 border-b-2 border-t-white/50 border-b-white/50";
                        } else {
                          borderStyle = "border-l-2 border-r-2 border-l-white/50 border-r-white/50";
                        }
                        break;
                      case "laje":
                        tipoClasses = "border border-white/10 font-normal text-xs opacity-60";
                        borderStyle = "border-dashed";
                        break;
                    }
                    
                    return (
                      <div
                        key={peca.id}
                        className={`
                          ${getStatusColor(peca.status)} 
                          rounded opacity-80 hover:opacity-100 
                          flex items-center justify-center
                          text-white cursor-pointer transition-all duration-200
                          hover:scale-105 hover:shadow-lg
                          ${tipoClasses}
                        `}
                        style={{
                          gridColumn: `${peca.x} / span ${width}`,
                          gridRow: `${peca.y} / span ${height}`,
                          position: "relative",
                          ...(peca.tipo === "laje" && { 
                            background: `linear-gradient(45deg, ${getStatusColor(peca.status).replace('bg-', 'rgba(')}, transparent 50%)`,
                            opacity: 0.3 
                          })
                        }}
                        title={`${peca.nome} - ${peca.tipo} - ${peca.status}`}
                      >
                        <span className={peca.tipo === "laje" ? "text-foreground font-medium" : ""}>
                          {peca.nome}
                        </span>
                        
                        {/* Indicador de eixo para pilares */}
                        {peca.tipo === "pilar" && (
                          <>
                            <div className="absolute w-full h-px bg-white/50 top-1/2 left-0 transform -translate-y-1/2"></div>
                            <div className="absolute h-full w-px bg-white/50 left-1/2 top-0 transform -translate-x-1/2"></div>
                          </>
                        )}
                        
                        {/* Linha de eixo para vigas */}
                        {peca.tipo === "viga" && (
                          <div className={`absolute ${
                            peca.direcao === "horizontal" 
                              ? "w-full h-px bg-white/70 top-1/2 left-0 transform -translate-y-1/2"
                              : "h-full w-px bg-white/70 left-1/2 top-0 transform -translate-x-1/2"
                          }`}></div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Legenda */}
                <div className="absolute bottom-2 right-2 bg-background/90 rounded-lg p-3 space-y-2">
                  <div className="text-xs font-medium mb-2">Legenda:</div>
                  <div className="flex items-center gap-2 text-xs">
                    <div className="w-3 h-3 bg-green-500 rounded"></div>
                    <span>Concluído</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <div className="w-3 h-3 bg-blue-500 rounded"></div>
                    <span>Em andamento</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <div className="w-3 h-3 bg-gray-500 rounded"></div>
                    <span>Planejado</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Lista de Peças */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Layers className="w-5 h-5 text-accent" />
                Detalhes das Peças
              </CardTitle>
              <CardDescription>
                Lista detalhada do {pavimentoAtivo}º pavimento
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {pecasFiltradas.map((peca) => (
                  <div key={peca.id} className="border border-border/50 rounded-lg p-3 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Square className="w-4 h-4 text-accent" />
                        <span className="font-medium">{peca.nome}</span>
                      </div>
                      {getStatusBadge(peca.status)}
                    </div>
                    
                    <div className="text-sm text-muted-foreground">
                      <div>Tipo: {peca.tipo}</div>
                      {peca.data && <div>Executado: {peca.data}</div>}
                      <div>Posição: ({peca.x}, {peca.y})</div>
                    </div>

                    {peca.status === "em_andamento" && (
                      <div className="w-full bg-secondary/50 rounded-full h-2">
                        <div className="bg-blue-500 h-2 rounded-full w-3/4 animate-pulse"></div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Cronograma de Execução */}
        <Card className="glass-card mt-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-accent" />
              Próximas Execuções
            </CardTitle>
            <CardDescription>
              Cronograma das próximas concretagens planejadas
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
                <div className="font-medium text-blue-400 mb-2">Amanhã - 15/01</div>
                <div className="text-sm text-muted-foreground">
                  Vigas V3 e V4 - 2º Pavimento
                  <br />
                  Volume estimado: 8.5 m³
                </div>
              </div>
              <div className="p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                <div className="font-medium text-yellow-400 mb-2">18/01 - Sexta</div>
                <div className="text-sm text-muted-foreground">
                  Lajes L1 e L2 - 2º Pavimento
                  <br />
                  Volume estimado: 62.3 m³
                </div>
              </div>
              <div className="p-4 rounded-lg bg-gray-500/10 border border-gray-500/20">
                <div className="font-medium text-gray-400 mb-2">25/01 - Quinta</div>
                <div className="text-sm text-muted-foreground">
                  Laje de Cobertura - 3º Pav
                  <br />
                  Volume estimado: 95.8 m³
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default MapaConcretagem;