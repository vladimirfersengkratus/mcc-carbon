import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { 
  salvarRecebimentoNoFirebase, 
  escutarRecebimentos, 
  RecebimentoConcretoItem 
} from "@/services/mccService";
import { 
  Truck, 
  FileText, 
  Beaker, 
  Camera, 
  CheckCircle, 
  AlertCircle, 
  Plus, 
  Save,
  CheckCircle2,
  Calendar,
  Sparkles,
  Image as ImageIcon
} from "lucide-react";

const REGISTROS_INICIAIS: RecebimentoConcretoItem[] = [
  {
    id: "ex-1",
    data: "2026-09-18",
    horario: "12:56",
    caminhao: "ABC-1234",
    motorista: "José",
    concreteira: "Polimix",
    notaFiscal: "NF-04521",
    fck: "30 MPa",
    slump: "12±2 cm",
    volume: "8.0 m³",
    observacoes: "Lacre conferido - teste",
    status: "aprovado"
  }
];

const RecebimentoConcreto = () => {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [registros, setRegistros] = useState<RecebimentoConcretoItem[]>(REGISTROS_INICIAIS);
  const [salvando, setSalvando] = useState(false);
  const [conectadoNuvem, setConectadoNuvem] = useState(true);
  const [fotoSelecionada, setFotoSelecionada] = useState<string | null>(null);

  const [novoRegistro, setNovoRegistro] = useState({
    caminhao: "",
    motorista: "",
    concreteira: "",
    notaFiscal: "",
    fck: "30 MPa",
    slump: "12±2 cm",
    volume: "",
    observacoes: ""
  });

  // Conectar ao Firestore em tempo real
  useEffect(() => {
    const cancelarInscricao = escutarRecebimentos(
      (itensDaNuvem) => {
        setConectadoNuvem(true);
        if (itensDaNuvem && itensDaNuvem.length > 0) {
          setRegistros(itensDaNuvem);
        }
      },
      (error) => {
        console.warn("Status Firestore:", error);
      }
    );

    return () => {
      if (typeof cancelarInscricao === "function") cancelarInscricao();
    };
  }, []);

  const handleSalvarRegistro = async () => {
    if (!novoRegistro.caminhao || !novoRegistro.volume) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha a placa do caminhão e o volume de concreto.",
        variant: "destructive"
      });
      return;
    }

    setSalvando(true);
    const dataAtual = new Date().toISOString().split('T')[0];
    const horarioAtual = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

    const itemParaSalvar: Omit<RecebimentoConcretoItem, "id"> = {
      data: dataAtual,
      horario: horarioAtual,
      caminhao: novoRegistro.caminhao,
      motorista: novoRegistro.motorista || "Não informado",
      concreteira: novoRegistro.concreteira || "Usina local",
      notaFiscal: novoRegistro.notaFiscal || "Pendente NF",
      fck: novoRegistro.fck || "30 MPa",
      slump: novoRegistro.slump || "12±2 cm",
      volume: novoRegistro.volume.includes("m³") ? novoRegistro.volume : `${novoRegistro.volume} m³`,
      observacoes: novoRegistro.observacoes,
      status: "aprovado"
    };

    try {
      const docId = await salvarRecebimentoNoFirebase(itemParaSalvar);
      setConectadoNuvem(true);
      toast({
        title: "Recebimento salvo no Firebase!",
        description: `Caminhão ${novoRegistro.caminhao} gravado com sucesso no MCC-Carbon.`,
      });

      setRegistros((prev) => [{ id: docId, ...itemParaSalvar }, ...prev]);
    } catch (err) {
      const idLocal = String(Date.now());
      setRegistros((prev) => [{ id: idLocal, ...itemParaSalvar }, ...prev]);
      toast({
        title: "Gravado localmente",
        description: "Registro adicionado à visualização do aplicativo.",
      });
    } finally {
      setSalvando(false);
      setFotoSelecionada(null);
      setNovoRegistro({
        caminhao: "",
        motorista: "",
        concreteira: "",
        notaFiscal: "",
        fck: "30 MPa",
        slump: "12±2 cm",
        volume: "",
        observacoes: ""
      });
    }
  };

  const handleFotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFotoSelecionada(file.name);
      toast({
        title: "Foto anexada!",
        description: `Arquivo ${file.name} pronto para vinculação com a NF.`
      });
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "aprovado":
        return <Badge className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-xs px-2 py-0.5">Aprovado</Badge>;
      case "reprovado":
        return <Badge className="bg-red-500/20 text-red-400 border border-red-500/40 text-xs px-2 py-0.5">Reprovado</Badge>;
      default:
        return <Badge className="bg-amber-500/20 text-amber-400 border border-amber-500/40 text-xs px-2 py-0.5">Pendente</Badge>;
    }
  };

  return (
    <section className="py-20 px-6 bg-[#090e18]" id="recebimento">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-slate-900 border border-slate-800 px-4 py-1.5 rounded-full mb-4">
            <Sparkles className="w-4 h-4 text-orange-400" />
            <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
              Controle Tecnológico
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4">
            Registro de Recebimento de Concreto
          </h2>
          <p className="text-base md:text-lg text-slate-300 max-w-2xl mx-auto">
            Controle imediato da chegada da betoneira, conferência de slump test e rastreabilidade por peça.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Formulário de Novo Registro */}
          <Card className="lg:col-span-6 bg-slate-900/95 border border-slate-700/80 shadow-2xl">
            <CardHeader className="border-b border-slate-800 pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-bold text-white flex items-center gap-2">
                  <Plus className="w-5 h-5 text-blue-400" />
                  Nova Entrada de Betoneira
                </CardTitle>
                <div className="flex items-center gap-1.5 bg-emerald-500/15 border border-emerald-500/30 px-2.5 py-1 rounded-full text-[11px] font-semibold text-emerald-400">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Firestore Ativo
                </div>
              </div>
              <CardDescription className="text-slate-400 text-xs mt-1 font-normal">
                Parâmetros normativos NBR 12655 (Slump, volume e $f_{ck}$)
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 pt-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="caminhao" className="text-xs font-bold text-slate-200 uppercase tracking-wide">
                    Placa / Prefixo *
                  </Label>
                  <Input
                    id="caminhao"
                    placeholder="Ex: ABC-1234"
                    value={novoRegistro.caminhao}
                    onChange={(e) => setNovoRegistro({...novoRegistro, caminhao: e.target.value})}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="motorista" className="text-xs font-bold text-slate-200 uppercase tracking-wide">
                    Motorista
                  </Label>
                  <Input
                    id="motorista"
                    placeholder="Ex: João da Silva"
                    value={novoRegistro.motorista}
                    onChange={(e) => setNovoRegistro({...novoRegistro, motorista: e.target.value})}
                    className="mt-1"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="concreteira" className="text-xs font-bold text-slate-200 uppercase tracking-wide">
                    Concreteira / Usina
                  </Label>
                  <Input
                    id="concreteira"
                    placeholder="Ex: Polimix, Supermix..."
                    value={novoRegistro.concreteira}
                    onChange={(e) => setNovoRegistro({...novoRegistro, concreteira: e.target.value})}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="notaFiscal" className="text-xs font-bold text-slate-200 uppercase tracking-wide">
                    Nota Fiscal / Cupom
                  </Label>
                  <Input
                    id="notaFiscal"
                    placeholder="Ex: NF-04521"
                    value={novoRegistro.notaFiscal}
                    onChange={(e) => setNovoRegistro({...novoRegistro, notaFiscal: e.target.value})}
                    className="mt-1"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="fck" className="text-xs font-bold text-slate-200 uppercase tracking-wide">
                    FCK de Projeto
                  </Label>
                  <Input
                    id="fck"
                    placeholder="Ex: 30 MPa"
                    value={novoRegistro.fck}
                    onChange={(e) => setNovoRegistro({...novoRegistro, fck: e.target.value})}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="slump" className="text-xs font-bold text-slate-200 uppercase tracking-wide">
                    Slump Test (cm)
                  </Label>
                  <Input
                    id="slump"
                    placeholder="Ex: 12±2 cm"
                    value={novoRegistro.slump}
                    onChange={(e) => setNovoRegistro({...novoRegistro, slump: e.target.value})}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="volume" className="text-xs font-bold text-slate-200 uppercase tracking-wide">
                    Volume (m³) *
                  </Label>
                  <Input
                    id="volume"
                    placeholder="Ex: 8.0"
                    value={novoRegistro.volume}
                    onChange={(e) => setNovoRegistro({...novoRegistro, volume: e.target.value})}
                    className="mt-1"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="observacoes" className="text-xs font-bold text-slate-200 uppercase tracking-wide">
                  Observações de Canteiro (Lacre, Peça, Bomba)
                </Label>
                <Textarea
                  id="observacoes"
                  placeholder="Ex: Lacre conferido. Concreto aplicado nos pilares P1 a P4..."
                  value={novoRegistro.observacoes}
                  onChange={(e) => setNovoRegistro({...novoRegistro, observacoes: e.target.value})}
                  className="mt-1"
                />
              </div>

              {fotoSelecionada && (
                <div className="flex items-center gap-2 p-2 rounded bg-slate-800/80 border border-slate-700 text-xs text-blue-400">
                  <ImageIcon className="w-4 h-4" />
                  <span>Foto anexada: {fotoSelecionada}</span>
                </div>
              )}

              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFotoUpload} 
                accept="image/*" 
                className="hidden" 
              />

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <Button 
                  className="flex-1 bg-blue-600 hover:bg-blue-500 text-white font-bold py-6 shadow-md shadow-blue-600/30 transition-all"
                  onClick={handleSalvarRegistro}
                  disabled={salvando}
                >
                  <Save className="w-4 h-4 mr-2" />
                  {salvando ? "Gravando no Firestore..." : "Salvar no MCC-Carbon"}
                </Button>
                <Button 
                  variant="outline" 
                  type="button"
                  className="border-slate-700 bg-slate-800 text-slate-200 hover:text-white py-6"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Camera className="w-4 h-4 mr-2 text-orange-400" />
                  Anexar Cupom/Slump
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Lista de Registros */}
          <Card className="lg:col-span-6 bg-slate-900/95 border border-slate-700/80 shadow-2xl">
            <CardHeader className="border-b border-slate-800 pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-bold text-white flex items-center gap-2">
                  <Truck className="w-5 h-5 text-orange-400" />
                  Recebimentos em Tempo Real
                </CardTitle>
                <Badge variant="outline" className="border-slate-700 text-slate-300 text-xs">
                  {registros.length} {registros.length === 1 ? "entrega" : "entregas"}
                </Badge>
              </div>
              <CardDescription className="text-slate-400 text-xs mt-1 font-normal">
                Histórico sincronizado na nuvem (Google Cloud Firestore)
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4 max-h-[500px] overflow-y-auto pr-1">
                {registros.map((registro, idx) => (
                  <div 
                    key={registro.id || idx} 
                    className="border border-slate-800 bg-slate-800/40 rounded-xl p-4 space-y-3 hover:border-slate-700 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Truck className="w-4 h-4 text-blue-400" />
                        <span className="font-bold text-white text-base">{registro.caminhao}</span>
                      </div>
                      {getStatusBadge(registro.status)}
                    </div>
                    
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                      <div>
                        <span className="text-slate-400 block">Data/Hora</span>
                        <span className="text-slate-200 font-medium">{registro.data} às {registro.horario}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block">Volume</span>
                        <span className="text-white font-bold">{registro.volume}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block">FCK</span>
                        <span className="text-slate-200 font-medium">{registro.fck}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block">Slump</span>
                        <span className="text-slate-200 font-medium">{registro.slump}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-slate-800/80 text-xs text-slate-400">
                      <span>NF: <strong className="text-slate-300">{registro.notaFiscal}</strong></span>
                      <span>Usina: <strong className="text-slate-300">{registro.concreteira}</strong></span>
                    </div>

                    {registro.observacoes && (
                      <div className="text-xs bg-slate-900/90 border border-slate-800 p-2.5 rounded-lg text-slate-300 leading-relaxed">
                        {registro.observacoes}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default RecebimentoConcreto;
