import { useState } from "react";
import Layout from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Building, 
  Layers, 
  ShieldCheck, 
  Truck, 
  FileText, 
  Beaker, 
  Sparkles,
  Info,
  CheckCircle2,
  Clock,
  ArrowRight
} from "lucide-react";

interface PecaModelo {
  id: string;
  nome: string;
  tipo: "sapata" | "baldrame" | "pilar" | "viga" | "laje" | "escada";
  nivel: "fundacao" | "pilares" | "superestrutura";
  eixo: string;
  dimensoes: string;
  fck: string;
  volume: number;
  status: "concluido" | "em_andamento" | "planejado";
  caminhaoExemplo?: string;
  nfExemplo?: string;
  slumpExemplo?: string;
  cpsExemplo?: string;
  obsExemplo?: string;
}

const PECAS_MODELO: PecaModelo[] = [
  // Fundação & Baldrame
  { id: "s1", nome: "S1", tipo: "sapata", nivel: "fundacao", eixo: "Eixo 1-A", dimensoes: "1.20 x 1.20 x 0.50 m", fck: "25 MPa", volume: 0.72, status: "concluido", caminhaoExemplo: "ABC-1234 (Betoneira 01)", nfExemplo: "NF-004521", slumpExemplo: "10±2 cm", cpsExemplo: "CP-01 e CP-02", obsExemplo: "Concretada com vibrador 45mm. Conforme." },
  { id: "s2", nome: "S2", tipo: "sapata", nivel: "fundacao", eixo: "Eixo 2-A", dimensoes: "1.20 x 1.20 x 0.50 m", fck: "25 MPa", volume: 0.72, status: "concluido", caminhaoExemplo: "ABC-1234 (Betoneira 01)", nfExemplo: "NF-004521", slumpExemplo: "10±2 cm", cpsExemplo: "CP-01 e CP-02" },
  { id: "s3", nome: "S3", tipo: "sapata", nivel: "fundacao", eixo: "Eixo 1-B", dimensoes: "1.20 x 1.20 x 0.50 m", fck: "25 MPa", volume: 0.72, status: "concluido", caminhaoExemplo: "ABC-1234 (Betoneira 01)", nfExemplo: "NF-004521", slumpExemplo: "10±2 cm", cpsExemplo: "CP-01 e CP-02" },
  { id: "s4", nome: "S4", tipo: "sapata", nivel: "fundacao", eixo: "Eixo 2-B", dimensoes: "1.20 x 1.20 x 0.50 m", fck: "25 MPa", volume: 0.72, status: "concluido", caminhaoExemplo: "ABC-1234 (Betoneira 01)", nfExemplo: "NF-004521", slumpExemplo: "10±2 cm", cpsExemplo: "CP-01 e CP-02" },
  
  { id: "vb1", nome: "VB1", tipo: "baldrame", nivel: "fundacao", eixo: "Eixo A (S1-S2)", dimensoes: "0.15 x 0.30 x 4.00 m", fck: "25 MPa", volume: 0.45, status: "concluido", caminhaoExemplo: "ABC-1234", nfExemplo: "NF-004521" },
  { id: "vb2", nome: "VB2", tipo: "baldrame", nivel: "fundacao", eixo: "Eixo B (S3-S4)", dimensoes: "0.15 x 0.30 x 4.00 m", fck: "25 MPa", volume: 0.45, status: "concluido", caminhaoExemplo: "ABC-1234", nfExemplo: "NF-004521" },
  { id: "vb3", nome: "VB3", tipo: "baldrame", nivel: "fundacao", eixo: "Eixo 1 (S1-S3)", dimensoes: "0.15 x 0.30 x 4.00 m", fck: "25 MPa", volume: 0.45, status: "concluido", caminhaoExemplo: "ABC-1234", nfExemplo: "NF-004521" },
  { id: "vb4", nome: "VB4", tipo: "baldrame", nivel: "fundacao", eixo: "Eixo 2 (S2-S4)", dimensoes: "0.15 x 0.30 x 4.00 m", fck: "25 MPa", volume: 0.45, status: "concluido", caminhaoExemplo: "ABC-1234", nfExemplo: "NF-004521" },

  // Pilares
  { id: "p1", nome: "P1", tipo: "pilar", nivel: "pilares", eixo: "Eixo 1-A", dimensoes: "0.20 x 0.40 x 3.00 m", fck: "30 MPa", volume: 0.24, status: "em_andamento", caminhaoExemplo: "OXP-4521 (Betoneira 02)", nfExemplo: "NF-004528", slumpExemplo: "12±2 cm", cpsExemplo: "CP-10, CP-11", obsExemplo: "Concretagem em execução nesta carga." },
  { id: "p2", nome: "P2", tipo: "pilar", nivel: "pilares", eixo: "Eixo 2-A", dimensoes: "0.20 x 0.40 x 3.00 m", fck: "30 MPa", volume: 0.24, status: "em_andamento", caminhaoExemplo: "OXP-4521 (Betoneira 02)", nfExemplo: "NF-004528", slumpExemplo: "12±2 cm", cpsExemplo: "CP-10, CP-11" },
  { id: "p3", nome: "P3", tipo: "pilar", nivel: "pilares", eixo: "Eixo 1-B", dimensoes: "0.20 x 0.40 x 3.00 m", fck: "30 MPa", volume: 0.24, status: "planejado", fck: "30 MPa" },
  { id: "p4", nome: "P4", tipo: "pilar", nivel: "pilares", eixo: "Eixo 2-B", dimensoes: "0.20 x 0.40 x 3.00 m", fck: "30 MPa", volume: 0.24, status: "planejado", fck: "30 MPa" },

  // Superestrutura
  { id: "v1", nome: "V1", tipo: "viga", nivel: "superestrutura", eixo: "Eixo A (P1-P2)", dimensoes: "0.15 x 0.40 x 4.00 m", fck: "30 MPa", volume: 0.60, status: "planejado" },
  { id: "v2", nome: "V2", tipo: "viga", nivel: "superestrutura", eixo: "Eixo B (P3-P4)", dimensoes: "0.15 x 0.40 x 4.00 m", fck: "30 MPa", volume: 0.60, status: "planejado" },
  { id: "v3", nome: "V3", tipo: "viga", nivel: "superestrutura", eixo: "Eixo 1 (P1-P3)", dimensoes: "0.15 x 0.40 x 4.00 m", fck: "30 MPa", volume: 0.60, status: "planejado" },
  { id: "v4", nome: "V4", tipo: "viga", nivel: "superestrutura", eixo: "Eixo 2 (P2-P4)", dimensoes: "0.15 x 0.40 x 4.00 m", fck: "30 MPa", volume: 0.60, status: "planejado" },
  { id: "l1", nome: "Laje L1", tipo: "laje", nivel: "superestrutura", eixo: "Vão Central (4x4m)", dimensoes: "4.00 x 4.00 m (h = 10 cm)", fck: "30 MPa", volume: 1.60, status: "planejado" },
  { id: "e1", nome: "Escada E1", tipo: "escada", nivel: "superestrutura", eixo: "Acesso Lateral", dimensoes: "2 Lances + Patamar (L=1.00m)", fck: "30 MPa", volume: 0.90, status: "planejado" },
];

const ModeloReferenciaPage = () => {
  const [nivelAtivo, setNivelAtivo] = useState<"fundacao" | "pilares" | "superestrutura">("pilares");
  const [pecaSelecionada, setPecaSelecionada] = useState<PecaModelo>(PECAS_MODELO[8]); // P1

  const pecasNivel = PECAS_MODELO.filter(p => p.nivel === nivelAtivo);

  const getCorStatus = (status: PecaModelo["status"]) => {
    switch (status) {
      case "concluido":
        return "bg-emerald-600 border-emerald-400 text-white";
      case "em_andamento":
        return "bg-blue-600 border-blue-400 text-white animate-pulse";
      default:
        return "bg-slate-700 border-slate-500 text-slate-300";
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-6xl space-y-8">
        {/* Banner Didático */}
        <div className="bg-gradient-to-r from-blue-950/70 via-slate-900 to-blue-950/70 border border-blue-500/40 rounded-2xl p-6 shadow-xl">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-600/30 border border-blue-400/40 flex items-center justify-center flex-shrink-0 mt-1">
                <Info className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">
                  Área de Consulta • Modelo Didático de Referência
                </span>
                <h1 className="text-xl sm:text-2xl font-extrabold text-white mt-0.5">
                  Pórtico Estrutural Completo (Caso Padrão)
                </h1>
                <p className="text-xs text-slate-300 mt-1 max-w-2xl leading-relaxed font-normal">
                  Este modelo serve exclusivamente como guia de treinamento. Ele contém um módulo estrutural com <strong>4 sapatas, 4 vigas baldrames, 4 pilares, 4 vigas aéreas, 1 laje e 1 escada</strong> para você consultar o comportamento das cores e o preenchimento normativo.
                </p>
              </div>
            </div>
            <Badge className="bg-blue-500/20 text-blue-300 border border-blue-500/40 text-xs px-3 py-1 flex-shrink-0">
              Modo Somente Leitura
            </Badge>
          </div>
        </div>

        {/* Seletor de Níveis / Pavimentos do Modelo */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 bg-slate-950 p-1 rounded-xl border border-slate-800">
            <Button 
              variant={nivelAtivo === "fundacao" ? "default" : "ghost"}
              size="sm"
              className={nivelAtivo === "fundacao" ? "bg-blue-600 text-white font-bold text-xs" : "text-slate-400 text-xs"}
              onClick={() => { setNivelAtivo("fundacao"); setPecaSelecionada(PECAS_MODELO[0]); }}
            >
              1. Fundação & Baldrames (4 Sapatas + 4 Vigas)
            </Button>
            <Button 
              variant={nivelAtivo === "pilares" ? "default" : "ghost"}
              size="sm"
              className={nivelAtivo === "pilares" ? "bg-blue-600 text-white font-bold text-xs" : "text-slate-400 text-xs"}
              onClick={() => { setNivelAtivo("pilares"); setPecaSelecionada(PECAS_MODELO[8]); }}
            >
              2. Mesoestrutura (4 Pilares P1-P4)
            </Button>
            <Button 
              variant={nivelAtivo === "superestrutura" ? "default" : "ghost"}
              size="sm"
              className={nivelAtivo === "superestrutura" ? "bg-blue-600 text-white font-bold text-xs" : "text-slate-400 text-xs"}
              onClick={() => { setNivelAtivo("superestrutura"); setPecaSelecionada(PECAS_MODELO[12]); }}
            >
              3. Superestrutura (4 Vigas + Laje + Escada)
            </Button>
          </div>

          <div className="text-xs text-slate-400">
            {pecasNivel.length} peças neste nível
          </div>
        </div>

        {/* Área Gráfica e Inspeção Técnica */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Planta Baixa Didática com Eixos 1-2 e A-B */}
          <Card className="lg:col-span-7 bg-slate-900/95 border border-slate-700/80 shadow-2xl">
            <CardHeader className="border-b border-slate-800 pb-4">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-base font-bold text-white flex items-center gap-2">
                    <Building className="w-4 h-4 text-blue-400" />
                    Planta de Fôrmas — {nivelAtivo === "fundacao" ? "Fundação (Nível 0.00)" : nivelAtivo === "pilares" ? "Pilares (Nível +3.00)" : "Laje e Vigas (Nível +3.00)"}
                  </CardTitle>
                  <CardDescription className="text-slate-400 text-xs">
                    Toque nas peças estruturais para inspecionar os dados normativos de exemplo
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              {/* Representação Gráfica com Eixos */}
              <div className="bg-[#070b12] border border-slate-800 rounded-xl p-8 min-h-[380px] relative flex flex-col justify-center items-center shadow-inner">
                {/* Linhas de Eixo Alfanuméricas */}
                <div className="absolute top-2 left-16 text-xs text-slate-400 font-mono">EIXO 1</div>
                <div className="absolute top-2 right-16 text-xs text-slate-400 font-mono">EIXO 2</div>
                <div className="absolute top-24 left-2 text-xs text-slate-400 font-mono">EIXO A</div>
                <div className="absolute bottom-24 left-2 text-xs text-slate-400 font-mono">EIXO B</div>

                {/* Visualização por Nível */}
                {nivelAtivo === "fundacao" && (
                  <div className="w-full max-w-sm grid grid-cols-3 grid-rows-3 gap-3 p-4">
                    <button onClick={() => setPecaSelecionada(PECAS_MODELO[0])} className={`${getCorStatus(PECAS_MODELO[0].status)} p-3 rounded font-bold text-xs border shadow`}>S1</button>
                    <button onClick={() => setPecaSelecionada(PECAS_MODELO[4])} className={`${getCorStatus(PECAS_MODELO[4].status)} p-2 rounded text-[11px] border font-semibold`}>VB1</button>
                    <button onClick={() => setPecaSelecionada(PECAS_MODELO[1])} className={`${getCorStatus(PECAS_MODELO[1].status)} p-3 rounded font-bold text-xs border shadow`}>S2</button>
                    
                    <button onClick={() => setPecaSelecionada(PECAS_MODELO[6])} className={`${getCorStatus(PECAS_MODELO[6].status)} p-2 rounded text-[11px] border font-semibold`}>VB3</button>
                    <div className="flex items-center justify-center text-[10px] text-slate-400 font-mono border border-dashed border-slate-800 rounded">TRAVAMENTO</div>
                    <button onClick={() => setPecaSelecionada(PECAS_MODELO[7])} className={`${getCorStatus(PECAS_MODELO[7].status)} p-2 rounded text-[11px] border font-semibold`}>VB4</button>
                    
                    <button onClick={() => setPecaSelecionada(PECAS_MODELO[2])} className={`${getCorStatus(PECAS_MODELO[2].status)} p-3 rounded font-bold text-xs border shadow`}>S3</button>
                    <button onClick={() => setPecaSelecionada(PECAS_MODELO[5])} className={`${getCorStatus(PECAS_MODELO[5].status)} p-2 rounded text-[11px] border font-semibold`}>VB2</button>
                    <button onClick={() => setPecaSelecionada(PECAS_MODELO[3])} className={`${getCorStatus(PECAS_MODELO[3].status)} p-3 rounded font-bold text-xs border shadow`}>S4</button>
                  </div>
                )}

                {nivelAtivo === "pilares" && (
                  <div className="w-full max-w-sm grid grid-cols-2 grid-rows-2 gap-24 p-6">
                    <button onClick={() => setPecaSelecionada(PECAS_MODELO[8])} className={`${getCorStatus(PECAS_MODELO[8].status)} p-4 rounded font-extrabold text-sm border shadow-lg ring-2 ring-blue-400`}>P1</button>
                    <button onClick={() => setPecaSelecionada(PECAS_MODELO[9])} className={`${getCorStatus(PECAS_MODELO[9].status)} p-4 rounded font-extrabold text-sm border shadow-lg ring-2 ring-blue-400`}>P2</button>
                    <button onClick={() => setPecaSelecionada(PECAS_MODELO[10])} className={`${getCorStatus(PECAS_MODELO[10].status)} p-4 rounded font-extrabold text-sm border shadow-lg`}>P3</button>
                    <button onClick={() => setPecaSelecionada(PECAS_MODELO[11])} className={`${getCorStatus(PECAS_MODELO[11].status)} p-4 rounded font-extrabold text-sm border shadow-lg`}>P4</button>
                  </div>
                )}

                {nivelAtivo === "superestrutura" && (
                  <div className="w-full max-w-md space-y-2 p-2">
                    <div className="flex gap-2">
                      <div className="flex-1">
                        <button onClick={() => setPecaSelecionada(PECAS_MODELO[12])} className={`w-full ${getCorStatus(PECAS_MODELO[12].status)} py-2 rounded text-xs font-bold border mb-2`}>VIGA V1</button>
                        <div className="flex gap-2 items-center">
                          <button onClick={() => setPecaSelecionada(PECAS_MODELO[14])} className={`h-36 ${getCorStatus(PECAS_MODELO[14].status)} px-2 rounded text-xs font-bold border`}>V3</button>
                          <button onClick={() => setPecaSelecionada(PECAS_MODELO[16])} className={`flex-1 h-36 ${getCorStatus(PECAS_MODELO[16].status)} rounded text-sm font-extrabold border shadow-inner flex items-center justify-center`}>
                            LAJE L1 (4x4m)
                          </button>
                          <button onClick={() => setPecaSelecionada(PECAS_MODELO[15])} className={`h-36 ${getCorStatus(PECAS_MODELO[15].status)} px-2 rounded text-xs font-bold border`}>V4</button>
                        </div>
                        <button onClick={() => setPecaSelecionada(PECAS_MODELO[13])} className={`w-full ${getCorStatus(PECAS_MODELO[13].status)} py-2 rounded text-xs font-bold border mt-2`}>VIGA V2</button>
                      </div>

                      {/* Escada Lateral */}
                      <button onClick={() => setPecaSelecionada(PECAS_MODELO[17])} className={`w-24 ${getCorStatus(PECAS_MODELO[17].status)} rounded border p-2 flex flex-col justify-center items-center text-xs font-bold`}>
                        <span>ESCADA E1</span>
                        <span className="text-[10px] opacity-80 mt-1">2 Lances + Patamar</span>
                      </button>
                    </div>
                  </div>
                )}

                {/* Legenda das Cores */}
                <div className="flex flex-wrap items-center justify-center gap-6 mt-6 pt-4 border-t border-slate-800/80 text-xs">
                  <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 bg-emerald-600 rounded"></div>
                    <span className="text-slate-300">Concluído (Concretado)</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 bg-blue-600 rounded"></div>
                    <span className="text-slate-300">Em Concretagem (Atual)</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 bg-slate-700 rounded"></div>
                    <span className="text-slate-300">Planejado (Aguardando)</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Painel de Rastreabilidade da Peça Selecionada */}
          <Card className="lg:col-span-5 bg-slate-900/95 border border-slate-700/80 shadow-2xl">
            <CardHeader className="border-b border-slate-800 pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-bold text-white flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  Rastreabilidade Normativa (Exemplo)
                </CardTitle>
                <Badge variant="outline" className="border-blue-500/40 text-blue-400 text-xs">
                  {pecaSelecionada.nome}
                </Badge>
              </div>
              <CardDescription className="text-slate-400 text-xs">
                Como os dados reais do canteiro são vinculados a cada peça
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <div className="p-4 bg-slate-800/60 border border-slate-700 rounded-xl space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-lg font-extrabold text-white">{pecaSelecionada.nome} ({pecaSelecionada.eixo})</span>
                  <Badge className="text-xs">{pecaSelecionada.status.toUpperCase()}</Badge>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-slate-400 block">Dimensões:</span>
                    <strong className="text-slate-200">{pecaSelecionada.dimensoes}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Volume Teórico:</span>
                    <strong className="text-white font-bold">{pecaSelecionada.volume.toFixed(2)} m³</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block">FCK de Projeto:</span>
                    <strong className="text-slate-200">{pecaSelecionada.fck}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Tipo Estrutural:</span>
                    <strong className="text-slate-200 capitalize">{pecaSelecionada.tipo}</strong>
                  </div>
                </div>
              </div>

              {/* Dados Vinculados de Exemplo */}
              <div className="space-y-3 border-t border-slate-800 pt-3">
                <div className="text-xs font-bold text-slate-300 uppercase tracking-wide flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-orange-400" />
                  Dados Vinculados do Canteiro (Auditoria NBR 12655):
                </div>

                {pecaSelecionada.caminhaoExemplo ? (
                  <div className="space-y-2 text-xs bg-slate-950/80 p-3.5 rounded-lg border border-slate-800">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Betoneira Fornecedora:</span>
                      <strong className="text-white">{pecaSelecionada.caminhaoExemplo}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Nota Fiscal / Cupom:</span>
                      <strong className="text-blue-400">{pecaSelecionada.nfExemplo}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Slump Test Registrado:</span>
                      <strong className="text-orange-400">{pecaSelecionada.slumpExemplo}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Corpos de Prova (CPs):</span>
                      <strong className="text-emerald-400">{pecaSelecionada.cpsExemplo}</strong>
                    </div>
                    {pecaSelecionada.obsExemplo && (
                      <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-400">
                        {pecaSelecionada.obsExemplo}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="p-4 rounded-lg bg-slate-950/50 border border-slate-800 text-xs text-slate-400 text-center">
                    Peça com status "Planejado". Os dados de NF e CPs serão vinculados assim que a carga for recebida e aplicada na obra.
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default ModeloReferenciaPage;
