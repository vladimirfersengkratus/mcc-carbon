import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { 
  Truck, 
  Clock, 
  Building2, 
  Phone, 
  MapPin, 
  Plus, 
  CheckCircle2, 
  AlertTriangle,
  ArrowRight,
  Sparkles,
  PlayCircle
} from "lucide-react";

export interface ViagemBetoneira {
  id: string;
  prefixo: string;
  placa: string;
  motorista: string;
  telefone: string;
  usina: string;
  volume: number;
  fck: string;
  elementoDestino: string;
  horaSaidaUsina: string;
  tempoEstimadoMin: number;
  status: "na_usina" | "em_transito" | "no_canteiro" | "concluido";
}

const LogisticaBetoneiras = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const [viagens, setViagens] = useState<ViagemBetoneira[]>([]);
  const [modalNovaViagem, setModalNovaViagem] = useState(false);

  const [novaViagem, setNovaViagem] = useState({
    prefixo: "",
    placa: "",
    motorista: "",
    telefone: "",
    usina: "Polimix - Central Fortaleza",
    volume: "8.0",
    fck: "30 MPa",
    elementoDestino: "Pilares do 1º Pavimento",
    horaSaidaUsina: "",
    tempoEstimadoMin: 35
  });

  const handleSalvarViagem = () => {
    if (!novaViagem.placa || !novaViagem.volume) {
      toast({
        title: "Campos obrigatórios",
        description: "Informe a placa e o volume da betoneira.",
        variant: "destructive"
      });
      return;
    }

    const horaAtual = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    const nova: ViagemBetoneira = {
      id: String(Date.now()),
      prefixo: novaViagem.prefixo || "Betoneira",
      placa: novaViagem.placa.toUpperCase(),
      motorista: novaViagem.motorista || "Motorista não informado",
      telefone: novaViagem.telefone || "(85) 99999-0000",
      usina: novaViagem.usina,
      volume: parseFloat(novaViagem.volume),
      fck: novaViagem.fck,
      elementoDestino: novaViagem.elementoDestino,
      horaSaidaUsina: novaViagem.horaSaidaUsina || horaAtual,
      tempoEstimadoMin: Number(novaViagem.tempoEstimadoMin) || 30,
      status: "em_transito"
    };

    setViagens([nova, ...viagens]);
    setModalNovaViagem(false);
    setNovaViagem({
      prefixo: "",
      placa: "",
      motorista: "",
      telefone: "",
      usina: "Polimix - Central Fortaleza",
      volume: "8.0",
      fck: "30 MPa",
      elementoDestino: "Pilares do 1º Pavimento",
      horaSaidaUsina: "",
      tempoEstimadoMin: 35
    });

    toast({
      title: "Viagem agendada!",
      description: `Betoneira ${nova.placa} registrada em deslocamento para a obra.`
    });
  };

  const handleMudarStatus = (id: string, novoStatus: ViagemBetoneira["status"]) => {
    setViagens(prev => prev.map(v => v.id === id ? { ...v, status: novoStatus } : v));
    
    if (novoStatus === "no_canteiro") {
      toast({
        title: "Caminhão no canteiro!",
        description: "Dados da carga prontos para conferência de NF, Slump e Corpos de Prova."
      });
    }
  };

  const getStatusBadge = (status: ViagemBetoneira["status"]) => {
    switch (status) {
      case "na_usina":
        return <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/40 text-xs">Na Usina (Carregando)</Badge>;
      case "em_transito":
        return <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/40 text-xs animate-pulse">Em Trânsito para a Obra</Badge>;
      case "no_canteiro":
        return <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/40 text-xs">No Canteiro (Rampa)</Badge>;
      case "concluido":
        return <Badge className="bg-slate-700/60 text-slate-300 border-slate-600 text-xs">Concluído</Badge>;
    }
  };

  return (
    <div className="space-y-8">
      {/* Cabeçalho */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 bg-slate-900 border border-slate-800 px-3.5 py-1 rounded-full mb-2">
            <Sparkles className="w-3.5 h-3.5 text-orange-400" />
            <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
              Logística de Transporte • NBR 7212
            </span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Logística e Rastreamento de Betoneiras
          </h1>
          <p className="text-sm text-slate-400 mt-1 max-w-2xl">
            Acompanhe o deslocamento das cargas para preparar a equipe e a bomba no momento exato, sem gerar ociosidade nas frentes de serviço.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button 
            className="bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs shadow-md shadow-blue-600/30 py-5"
            onClick={() => setModalNovaViagem(true)}
          >
            <Plus className="w-4 h-4 mr-2" />
            Programar Nova Viagem
          </Button>
        </div>
      </div>

      {/* Alerta de Canteiro */}
      <div className="bg-blue-950/40 border border-blue-500/30 rounded-xl p-4 flex items-start gap-3">
        <Clock className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
        <div className="text-xs text-slate-300 leading-relaxed">
          <strong className="text-white block text-sm mb-0.5">Tempo Limite Normativo de Transporte (NBR 7212):</strong>
          O tempo decorrido entre a primeira adição de água na usina dosadora e o início da descarga na obra não deve ultrapassar <strong>2 horas e 30 minutos</strong> (ou 3h com aditivo retardador). Acompanhe os horários em tempo real.
        </div>
      </div>

      {/* Formulário Embutido / Modal de Programação */}
      {modalNovaViagem && (
        <Card className="bg-slate-900/95 border border-slate-700 shadow-2xl">
          <CardHeader className="border-b border-slate-800 pb-4">
            <CardTitle className="text-base font-bold text-white flex items-center gap-2">
              <Truck className="w-4 h-4 text-orange-400" />
              Programação de Viagem de Betoneira
            </CardTitle>
            <CardDescription className="text-slate-400 text-xs">
              Informe os dados fornecidos pela usina para monitorar a chegada
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <Label className="text-xs font-bold text-slate-300 uppercase">Prefixo / Nº Caminhão</Label>
                <Input 
                  placeholder="Ex: Betoneira 08" 
                  value={novaViagem.prefixo} 
                  onChange={(e) => setNovaViagem({...novaViagem, prefixo: e.target.value})}
                  className="mt-1"
                />
              </div>
              <div>
                <Label className="text-xs font-bold text-slate-300 uppercase">Placa do Veículo *</Label>
                <Input 
                  placeholder="Ex: OXP-4521" 
                  value={novaViagem.placa} 
                  onChange={(e) => setNovaViagem({...novaViagem, placa: e.target.value})}
                  className="mt-1 font-mono uppercase"
                />
              </div>
              <div>
                <Label className="text-xs font-bold text-slate-300 uppercase">Motorista</Label>
                <Input 
                  placeholder="Ex: Francisco José" 
                  value={novaViagem.motorista} 
                  onChange={(e) => setNovaViagem({...novaViagem, motorista: e.target.value})}
                  className="mt-1"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <Label className="text-xs font-bold text-slate-300 uppercase">Usina de Origem</Label>
                <Input 
                  placeholder="Ex: Polimix - Central Fortaleza" 
                  value={novaViagem.usina} 
                  onChange={(e) => setNovaViagem({...novaViagem, usina: e.target.value})}
                  className="mt-1"
                />
              </div>
              <div>
                <Label className="text-xs font-bold text-slate-300 uppercase">Volume Programado (m³) *</Label>
                <Input 
                  type="number" 
                  step="0.5"
                  placeholder="Ex: 8.0" 
                  value={novaViagem.volume} 
                  onChange={(e) => setNovaViagem({...novaViagem, volume: e.target.value})}
                  className="mt-1"
                />
              </div>
              <div>
                <Label className="text-xs font-bold text-slate-300 uppercase">FCK de Projeto</Label>
                <Input 
                  placeholder="Ex: 30 MPa" 
                  value={novaViagem.fck} 
                  onChange={(e) => setNovaViagem({...novaViagem, fck: e.target.value})}
                  className="mt-1"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label className="text-xs font-bold text-slate-300 uppercase">Elemento de Destino na Obra</Label>
                <Input 
                  placeholder="Ex: Pilares P1 a P4 - 1º Pavimento" 
                  value={novaViagem.elementoDestino} 
                  onChange={(e) => setNovaViagem({...novaViagem, elementoDestino: e.target.value})}
                  className="mt-1"
                />
              </div>
              <div>
                <Label className="text-xs font-bold text-slate-300 uppercase">Tempo Previsto de Trânsito (minutos)</Label>
                <Input 
                  type="number" 
                  placeholder="Ex: 35" 
                  value={novaViagem.tempoEstimadoMin} 
                  onChange={(e) => setNovaViagem({...novaViagem, tempoEstimadoMin: Number(e.target.value)})}
                  className="mt-1"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
              <Button 
                variant="outline" 
                className="border-slate-700 text-slate-300"
                onClick={() => setModalNovaViagem(false)}
              >
                Cancelar
              </Button>
              <Button 
                className="bg-blue-600 hover:bg-blue-500 text-white font-bold"
                onClick={handleSalvarViagem}
              >
                Confirmar Saída da Usina
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Lista de Betoneiras Programadas */}
      {viagens.length === 0 ? (
        <Card className="bg-slate-900/50 border border-dashed border-slate-800 p-12 text-center">
          <Truck className="w-12 h-12 text-slate-600 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-300 mb-1">
            Nenhuma betoneira programada para hoje nesta obra
          </h3>
          <p className="text-xs text-slate-400 max-w-md mx-auto mb-6">
            Quando a usina liberar a primeira carga, clique em "Programar Nova Viagem" para acompanhar o tempo de viagem e o horário exato de chegada no canteiro.
          </p>
          <Button 
            className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold"
            onClick={() => setModalNovaViagem(true)}
          >
            <Plus className="w-3.5 h-3.5 mr-1" />
            Programar Primeira Carga
          </Button>
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {viagens.map((viagem) => (
            <Card key={viagem.id} className="bg-slate-900/90 border border-slate-800 p-5 shadow-lg">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <span className="font-extrabold text-white text-lg tracking-wide">
                      {viagem.prefixo} • {viagem.placa}
                    </span>
                    {getStatusBadge(viagem.status)}
                  </div>

                  <div className="flex flex-wrap gap-x-6 gap-y-1 text-xs text-slate-400">
                    <span>Usina: <strong className="text-slate-200">{viagem.usina}</strong></span>
                    <span>Volume: <strong className="text-white font-bold">{viagem.volume} m³</strong></span>
                    <span>FCK: <strong className="text-slate-200">{viagem.fck}</strong></span>
                    <span>Destino: <strong className="text-blue-400">{viagem.elementoDestino}</strong></span>
                  </div>

                  <div className="flex items-center gap-4 text-xs text-slate-400 pt-1">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-orange-400" />
                      Saída: {viagem.horaSaidaUsina} (Previsto: ~{viagem.tempoEstimadoMin} min)
                    </span>
                    {viagem.motorista && (
                      <span>Motorista: {viagem.motorista}</span>
                    )}
                  </div>
                </div>

                {/* Ações Rápidas de Campo */}
                <div className="flex flex-wrap items-center gap-2 pt-2 lg:pt-0 border-t lg:border-t-0 border-slate-800">
                  {viagem.status === "em_transito" && (
                    <Button 
                      size="sm" 
                      className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold"
                      onClick={() => handleMudarStatus(viagem.id, "no_canteiro")}
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
                      Confirmar Chegada na Obra
                    </Button>
                  )}

                  {viagem.status === "no_canteiro" && (
                    <Button 
                      size="sm" 
                      className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-md shadow-blue-600/30"
                      onClick={() => navigate("/recebimento")}
                    >
                      Iniciar Inspeção (NF, Slump, CPs)
                      <ArrowRight className="w-3.5 h-3.5 ml-1" />
                    </Button>
                  )}

                  {viagem.status === "concluido" && (
                    <span className="text-xs text-slate-400 italic">
                      Carga descarregada e concluída
                    </span>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default LogisticaBetoneiras;
