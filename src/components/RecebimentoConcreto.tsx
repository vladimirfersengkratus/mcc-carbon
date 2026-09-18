import { useState, useEffect } from "react";
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
  CloudCheck
} from "lucide-react";

const REGISTROS_INICIAIS: RecebimentoConcretoItem[] = [
  {
    id: "1",
    data: "2024-01-10",
    horario: "08:30",
    caminhao: "ABC-1234",
    motorista: "João Silva",
    concreteira: "ConcrePro Ltda",
    notaFiscal: "NF-001234",
    fck: "25 MPa",
    slump: "12±2 cm",
    volume: "8 m³",
    status: "aprovado"
  },
  {
    id: "2",
    data: "2024-01-10", 
    horario: "14:15",
    caminhao: "XYZ-5678",
    motorista: "Maria Santos",
    concreteira: "MegaConcreto S.A.",
    notaFiscal: "NF-005678",
    fck: "30 MPa", 
    slump: "10±2 cm",
    volume: "6 m³",
    status: "pendente"
  }
];

const RecebimentoConcreto = () => {
  const { toast } = useToast();
  const [registros, setRegistros] = useState<RecebimentoConcretoItem[]>(REGISTROS_INICIAIS);
  const [salvando, setSalvando] = useState(false);
  const [conectadoNuvem, setConectadoNuvem] = useState(false);

  const [novoRegistro, setNovoRegistro] = useState({
    caminhao: "",
    motorista: "",
    concreteira: "",
    notaFiscal: "",
    fck: "",
    slump: "",
    volume: "",
    observacoes: ""
  });

  // Conectar ao Firestore em tempo real
  useEffect(() => {
    const cancelarInscricao = escutarRecebimentos(
      (itensDaNuvem) => {
        if (itensDaNuvem && itensDaNuvem.length > 0) {
          setRegistros(itensDaNuvem);
          setConectadoNuvem(true);
        }
      },
      () => {
        // Fallback para estado local em caso de desconexão ou regras
        setConectadoNuvem(false);
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
      motorista: novoRegistro.motorista,
      concreteira: novoRegistro.concreteira,
      notaFiscal: novoRegistro.notaFiscal,
      fck: novoRegistro.fck || "25 MPa",
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

      // Atualização imediata do estado local caso a escuta demore
      setRegistros((prev) => [{ id: docId, ...itemParaSalvar }, ...prev]);
    } catch (err) {
      // Fallback local
      const idLocal = String(Date.now());
      setRegistros((prev) => [{ id: idLocal, ...itemParaSalvar }, ...prev]);
      toast({
        title: "Salvo localmente",
        description: "Registro guardado na memória. Verifique a ativação das regras do Firestore.",
      });
    } finally {
      setSalvando(false);
      setNovoRegistro({
        caminhao: "",
        motorista: "",
        concreteira: "",
        notaFiscal: "",
        fck: "",
        slump: "",
        volume: "",
        observacoes: ""
      });
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "aprovado":
        return <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Aprovado</Badge>;
      case "reprovado":
        return <Badge className="bg-red-500/20 text-red-400 border-red-500/30">Reprovado</Badge>;
      default:
        return <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">Pendente</Badge>;
    }
  };

  return (
    <section className="py-20 px-6" id="recebimento">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="text-xs uppercase tracking-widest text-accent font-semibold">MCC-Carbon</span>
            {conectadoNuvem && (
              <span className="inline-flex items-center gap-1 text-xs bg-green-500/10 text-green-400 px-2 py-0.5 rounded-full border border-green-500/20">
                <CheckCircle className="w-3 h-3" /> Firestore Ativo
              </span>
            )}
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Registro de{" "}
            <span className="gradient-text">Recebimento</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Controle do concreto recebido na obra com persistência na nuvem e ensaio de abatimento (slump test).
          </p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          {/* Formulário de Novo Registro */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="w-5 h-5 text-accent" />
                Novo Recebimento de Concreto
              </CardTitle>
              <CardDescription>
                Registre a chegada da betoneira e parâmetros da NBR 12655
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="caminhao">Placa do Caminhão / Prefixo *</Label>
                  <Input
                    id="caminhao"
                    placeholder="Ex: ABC-1234"
                    value={novoRegistro.caminhao}
                    onChange={(e) => setNovoRegistro({...novoRegistro, caminhao: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="motorista">Motorista</Label>
                  <Input
                    id="motorista"
                    placeholder="Nome do motorista"
                    value={novoRegistro.motorista}
                    onChange={(e) => setNovoRegistro({...novoRegistro, motorista: e.target.value})}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="concreteira">Concreteira / Usina</Label>
                  <Input
                    id="concreteira"
                    placeholder="Ex: Polimix, Supermix..."
                    value={novoRegistro.concreteira}
                    onChange={(e) => setNovoRegistro({...novoRegistro, concreteira: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="notaFiscal">Número da NF / Cupom</Label>
                  <Input
                    id="notaFiscal"
                    placeholder="Ex: NF-04521"
                    value={novoRegistro.notaFiscal}
                    onChange={(e) => setNovoRegistro({...novoRegistro, notaFiscal: e.target.value})}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="fck">FCK Especificado</Label>
                  <Input
                    id="fck"
                    placeholder="Ex: 30 MPa"
                    value={novoRegistro.fck}
                    onChange={(e) => setNovoRegistro({...novoRegistro, fck: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="slump">Slump Medido</Label>
                  <Input
                    id="slump"
                    placeholder="Ex: 12±2 cm"
                    value={novoRegistro.slump}
                    onChange={(e) => setNovoRegistro({...novoRegistro, slump: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="volume">Volume (m³) *</Label>
                  <Input
                    id="volume"
                    placeholder="Ex: 8.0"
                    value={novoRegistro.volume}
                    onChange={(e) => setNovoRegistro({...novoRegistro, volume: e.target.value})}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="observacoes">Observações (Lacre, Aditivos, Peça)</Label>
                <Textarea
                  id="observacoes"
                  placeholder="Ex: Lacre conferido. Destinado aos pilares P1 a P6 do 1º pavimento..."
                  value={novoRegistro.observacoes}
                  onChange={(e) => setNovoRegistro({...novoRegistro, observacoes: e.target.value})}
                />
              </div>

              <div className="flex gap-4">
                <Button 
                  variant="gradient" 
                  className="flex-1" 
                  onClick={handleSalvarRegistro}
                  disabled={salvando}
                >
                  <Save className="w-4 h-4 mr-2" />
                  {salvando ? "Gravando no Firebase..." : "Salvar no MCC-Carbon"}
                </Button>
                <Button variant="glass" type="button">
                  <Camera className="w-4 h-4 mr-2" />
                  Foto Cupom
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Lista de Registros */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Truck className="w-5 h-5 text-accent" />
                  Recebimentos em Tempo Real
                </span>
                <span className="text-xs text-muted-foreground font-normal">
                  Total: {registros.length}
                </span>
              </CardTitle>
              <CardDescription>
                Histórico sincronizado na nuvem com rastreabilidade
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 max-h-[460px] overflow-y-auto pr-1">
                {registros.map((registro, idx) => (
                  <div key={registro.id || idx} className="border border-border/50 rounded-lg p-4 space-y-3 hover:border-accent/40 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Truck className="w-4 h-4 text-accent" />
                        <span className="font-semibold text-foreground">{registro.caminhao}</span>
                      </div>
                      {getStatusBadge(registro.status)}
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <span className="text-muted-foreground">Data/Hora:</span> {registro.data} às {registro.horario}
                      </div>
                      <div>
                        <span className="text-muted-foreground">Volume:</span> <strong className="text-foreground">{registro.volume}</strong>
                      </div>
                      <div>
                        <span className="text-muted-foreground">FCK:</span> {registro.fck}
                      </div>
                      <div>
                        <span className="text-muted-foreground">Slump:</span> {registro.slump}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-border/50 text-xs text-muted-foreground">
                      <span>NF: {registro.notaFiscal || "Não informada"}</span>
                      <span>Usina: {registro.concreteira || "Não informada"}</span>
                    </div>

                    {registro.observacoes && (
                      <div className="text-xs bg-secondary/30 p-2 rounded text-muted-foreground">
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
