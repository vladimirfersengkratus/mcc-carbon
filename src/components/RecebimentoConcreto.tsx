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
  CheckCircle2, 
  AlertCircle, 
  Plus, 
  Save,
  Clock,
  Sparkles,
  Image as ImageIcon,
  ShieldCheck,
  AlertTriangle
} from "lucide-react";

const RecebimentoConcreto = () => {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Inicia 100% limpo, sem dados mockados
  const [registros, setRegistros] = useState<RecebimentoConcretoItem[]>([]);
  const [salvando, setSalvando] = useState(false);
  const [conectadoNuvem, setConectadoNuvem] = useState(true);
  const [fotoSelecionada, setFotoSelecionada] = useState<string | null>(null);

  // Formulário com todos os campos normativos
  const [novoRegistro, setNovoRegistro] = useState({
    caminhao: "",
    motorista: "",
    concreteira: "Polimix",
    notaFiscal: "",
    volume: "",
    fck: "30 MPa",
    horaSaidaUsina: "",
    horaChegadaObra: "",
    lacreNumero: "",
    lacreIntegro: true,
    slumpEspecificado: "12±2 cm",
    slumpMedido: "",
    aguaAdicionadaLitros: "0",
    moldouCP: true,
    identificacaoCPs: "CP-01, CP-02",
    idadesRuptura: "3d, 7d, 28d",
    laboratorioCP: "Laboratório da Obra",
    elementosDestino: "Pilares P1 a P4",
    observacoes: ""
  });

  // Preencher horário de chegada automático ao carregar a tela
  useEffect(() => {
    const horaAtual = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    setNovoRegistro(prev => ({ ...prev, horaChegadaObra: horaAtual }));
  }, []);

  // Conectar ao Firestore em tempo real
  useEffect(() => {
    const cancelarInscricao = escutarRecebimentos(
      (itensDaNuvem) => {
        setConectadoNuvem(true);
        if (itensDaNuvem) {
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

  // Validação dos dados obrigatórios (Gatekeeper)
  const handleSalvarRegistro = async () => {
    if (!novoRegistro.caminhao.trim()) {
      toast({
        title: "Placa obrigatória",
        description: "Informe a placa ou prefixo da betoneira.",
        variant: "destructive"
      });
      return;
    }

    if (!novoRegistro.notaFiscal.trim()) {
      toast({
        title: "Nota Fiscal obrigatória",
        description: "O número da Nota Fiscal / Cupom da usina é obrigatório (NBR 7212).",
        variant: "destructive"
      });
      return;
    }

    if (!novoRegistro.volume.trim()) {
      toast({
        title: "Volume obrigatório",
        description: "Informe o volume de concreto faturado na NF (m³).",
        variant: "destructive"
      });
      return;
    }

    if (!novoRegistro.slumpMedido.trim()) {
      toast({
        title: "Slump Test obrigatório",
        description: "Registre o abatimento medido no cone de Abrams (NBR NM 67).",
        variant: "destructive"
      });
      return;
    }

    if (novoRegistro.moldouCP && !novoRegistro.identificacaoCPs.trim()) {
      toast({
        title: "Identificação dos CPs obrigatória",
        description: "Informe os códigos dos corpos de prova moldados (NBR 5738).",
        variant: "destructive"
      });
      return;
    }

    setSalvando(true);
    const dataAtual = new Date().toISOString().split('T')[0];
    const horarioAtual = novoRegistro.horaChegadaObra || new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

    const itemParaSalvar: Omit<RecebimentoConcretoItem, "id"> = {
      data: dataAtual,
      horario: horarioAtual,
      caminhao: novoRegistro.caminhao.toUpperCase(),
      motorista: novoRegistro.motorista || "Não informado",
      concreteira: novoRegistro.concreteira || "Usina local",
      notaFiscal: novoRegistro.notaFiscal,
      fck: novoRegistro.fck || "30 MPa",
      slump: `${novoRegistro.slumpMedido} cm (Esp: ${novoRegistro.slumpEspecificado})`,
      volume: novoRegistro.volume.includes("m³") ? novoRegistro.volume : `${novoRegistro.volume} m³`,
      observacoes: `Destino: ${novoRegistro.elementosDestino} | Lacre: ${novoRegistro.lacreNumero || 'Conferido'} | CPs: ${novoRegistro.moldouCP ? novoRegistro.identificacaoCPs : 'Não moldado'}${novoRegistro.observacoes ? ' | Obs: ' + novoRegistro.observacoes : ''}`,
      status: "aprovado"
    };

    try {
      const docId = await salvarRecebimentoNoFirebase(itemParaSalvar);
      setConectadoNuvem(true);
      toast({
        title: "Recebimento gravado no Firestore!",
        description: `Betoneira ${novoRegistro.caminhao} vinculada à NF ${novoRegistro.notaFiscal}.`,
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
        concreteira: "Polimix",
        notaFiscal: "",
        volume: "",
        fck: "30 MPa",
        horaSaidaUsina: "",
        horaChegadaObra: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
        lacreNumero: "",
        lacreIntegro: true,
        slumpEspecificado: "12±2 cm",
        slumpMedido: "",
        aguaAdicionadaLitros: "0",
        moldouCP: true,
        identificacaoCPs: "",
        idadesRuptura: "3d, 7d, 28d",
        laboratorioCP: "Laboratório da Obra",
        elementosDestino: "",
        observacoes: ""
      });
    }
  };

  const handleFotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFotoSelecionada(file.name);
      toast({
        title: "Canhoto da NF anexado!",
        description: `Arquivo ${file.name} pronto para vinculação digital.`
      });
    }
  };

  return (
    <div className="space-y-8">
      {/* Cabeçalho */}
      <div className="border-b border-slate-800 pb-6">
        <div className="inline-flex items-center gap-2 bg-slate-900 border border-slate-800 px-3.5 py-1 rounded-full mb-2">
          <Sparkles className="w-3.5 h-3.5 text-orange-400" />
          <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
            Controle Tecnológico em Tempo Real • NBR 12655
          </span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
          Recebimento de Concreto e Corpos de Prova
        </h1>
        <p className="text-sm text-slate-400 mt-1 max-w-2xl font-normal">
          Conferência obrigatória na portaria/rampa da obra: Nota Fiscal, Lacre, Slump Test e identificação dos CPs para rastreabilidade normativa.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Formulário com Gatekeeper */}
        <Card className="lg:col-span-7 bg-slate-900/95 border border-slate-700/80 shadow-2xl">
          <CardHeader className="border-b border-slate-800 pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <Plus className="w-5 h-5 text-blue-400" />
                Nova Entrada de Betoneira (Rampa)
              </CardTitle>
              <div className="flex items-center gap-1.5 bg-emerald-500/15 border border-emerald-500/30 px-2.5 py-1 rounded-full text-[11px] font-semibold text-emerald-400">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Firestore Ativo
              </div>
            </div>
            <CardDescription className="text-slate-400 text-xs">
              Preencha os campos normativos para liberar a concretagem e pintar o mapa
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-5 pt-6">
            {/* Bloco 1: Veículo e Nota Fiscal */}
            <div className="space-y-3">
              <div className="text-xs font-bold text-blue-400 uppercase tracking-wider flex items-center gap-1.5">
                <Truck className="w-4 h-4" />
                1. Dados da Betoneira e Nota Fiscal (NBR 7212)
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <Label htmlFor="caminhao" className="text-xs font-bold text-slate-200 uppercase">
                    Placa / Prefixo *
                  </Label>
                  <Input
                    id="caminhao"
                    placeholder="Ex: OXP-4521"
                    value={novoRegistro.caminhao}
                    onChange={(e) => setNovoRegistro({...novoRegistro, caminhao: e.target.value})}
                    className="mt-1 font-mono uppercase"
                  />
                </div>
                <div>
                  <Label htmlFor="notaFiscal" className="text-xs font-bold text-slate-200 uppercase">
                    Nº Nota Fiscal / Cupom *
                  </Label>
                  <Input
                    id="notaFiscal"
                    placeholder="Ex: NF-04521"
                    value={novoRegistro.notaFiscal}
                    onChange={(e) => setNovoRegistro({...novoRegistro, notaFiscal: e.target.value})}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="volume" className="text-xs font-bold text-slate-200 uppercase">
                    Volume da NF (m³) *
                  </Label>
                  <Input
                    id="volume"
                    type="number"
                    step="0.5"
                    placeholder="Ex: 8.0"
                    value={novoRegistro.volume}
                    onChange={(e) => setNovoRegistro({...novoRegistro, volume: e.target.value})}
                    className="mt-1"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <Label htmlFor="concreteira" className="text-xs font-bold text-slate-200 uppercase">
                    Usina Fornecedora
                  </Label>
                  <Input
                    id="concreteira"
                    placeholder="Ex: Polimix"
                    value={novoRegistro.concreteira}
                    onChange={(e) => setNovoRegistro({...novoRegistro, concreteira: e.target.value})}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="horaSaidaUsina" className="text-xs font-bold text-slate-200 uppercase">
                    Hora Saída da Usina
                  </Label>
                  <Input
                    id="horaSaidaUsina"
                    type="time"
                    value={novoRegistro.horaSaidaUsina}
                    onChange={(e) => setNovoRegistro({...novoRegistro, horaSaidaUsina: e.target.value})}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="horaChegadaObra" className="text-xs font-bold text-slate-200 uppercase">
                    Hora Chegada na Obra
                  </Label>
                  <Input
                    id="horaChegadaObra"
                    type="time"
                    value={novoRegistro.horaChegadaObra}
                    onChange={(e) => setNovoRegistro({...novoRegistro, horaChegadaObra: e.target.value})}
                    className="mt-1"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="lacreNumero" className="text-xs font-bold text-slate-200 uppercase">
                    Número do Lacre
                  </Label>
                  <Input
                    id="lacreNumero"
                    placeholder="Ex: LAC-99812"
                    value={novoRegistro.lacreNumero}
                    onChange={(e) => setNovoRegistro({...novoRegistro, lacreNumero: e.target.value})}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="motorista" className="text-xs font-bold text-slate-200 uppercase">
                    Motorista
                  </Label>
                  <Input
                    id="motorista"
                    placeholder="Ex: José Carlos"
                    value={novoRegistro.motorista}
                    onChange={(e) => setNovoRegistro({...novoRegistro, motorista: e.target.value})}
                    className="mt-1"
                  />
                </div>
              </div>
            </div>

            {/* Bloco 2: Slump Test e Controle Tecnológico */}
            <div className="space-y-3 pt-3 border-t border-slate-800">
              <div className="text-xs font-bold text-orange-400 uppercase tracking-wider flex items-center gap-1.5">
                <Beaker className="w-4 h-4" />
                2. Ensaio de Abatimento — Slump Test (NBR NM 67)
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <Label htmlFor="fck" className="text-xs font-bold text-slate-200 uppercase">
                    FCK de Projeto
                  </Label>
                  <Input
                    id="fck"
                    value={novoRegistro.fck}
                    onChange={(e) => setNovoRegistro({...novoRegistro, fck: e.target.value})}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="slumpEspecificado" className="text-xs font-bold text-slate-200 uppercase">
                    Slump Especificado
                  </Label>
                  <Input
                    id="slumpEspecificado"
                    value={novoRegistro.slumpEspecificado}
                    onChange={(e) => setNovoRegistro({...novoRegistro, slumpEspecificado: e.target.value})}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="slumpMedido" className="text-xs font-bold text-slate-200 uppercase text-orange-400">
                    Slump Medido (cm) *
                  </Label>
                  <Input
                    id="slumpMedido"
                    type="number"
                    step="0.5"
                    placeholder="Ex: 12.0"
                    value={novoRegistro.slumpMedido}
                    onChange={(e) => setNovoRegistro({...novoRegistro, slumpMedido: e.target.value})}
                    className="mt-1 font-bold border-orange-500/50"
                  />
                </div>
              </div>
            </div>

            {/* Bloco 3: Corpos de Prova (CPs) */}
            <div className="space-y-3 pt-3 border-t border-slate-800">
              <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4" />
                3. Moldagem de Corpos de Prova — CPs (NBR 5738)
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <Label htmlFor="identificacaoCPs" className="text-xs font-bold text-slate-200 uppercase">
                    Identificação dos CPs *
                  </Label>
                  <Input
                    id="identificacaoCPs"
                    placeholder="Ex: CP-101, CP-102"
                    value={novoRegistro.identificacaoCPs}
                    onChange={(e) => setNovoRegistro({...novoRegistro, identificacaoCPs: e.target.value})}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="idadesRuptura" className="text-xs font-bold text-slate-200 uppercase">
                    Idades de Ruptura
                  </Label>
                  <Input
                    id="idadesRuptura"
                    value={novoRegistro.idadesRuptura}
                    onChange={(e) => setNovoRegistro({...novoRegistro, idadesRuptura: e.target.value})}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="laboratorioCP" className="text-xs font-bold text-slate-200 uppercase">
                    Laboratório Responsável
                  </Label>
                  <Input
                    id="laboratorioCP"
                    value={novoRegistro.laboratorioCP}
                    onChange={(e) => setNovoRegistro({...novoRegistro, laboratorioCP: e.target.value})}
                    className="mt-1"
                  />
                </div>
              </div>
            </div>

            {/* Bloco 4: Destinação nas Peças */}
            <div className="space-y-3 pt-3 border-t border-slate-800">
              <div>
                <Label htmlFor="elementosDestino" className="text-xs font-bold text-slate-200 uppercase">
                  Peças Estruturais Concretadas (Destino)
                </Label>
                <Input
                  id="elementosDestino"
                  placeholder="Ex: Pilares P1 a P6 do 1º Pavimento"
                  value={novoRegistro.elementosDestino}
                  onChange={(e) => setNovoRegistro({...novoRegistro, elementosDestino: e.target.value})}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="observacoes" className="text-xs font-bold text-slate-200 uppercase">
                  Observações Adicionais de Canteiro
                </Label>
                <Textarea
                  id="observacoes"
                  placeholder="Ex: Adensamento feito com vibrador de agulha 45mm. Concreto sem segregação..."
                  value={novoRegistro.observacoes}
                  onChange={(e) => setNovoRegistro({...novoRegistro, observacoes: e.target.value})}
                  className="mt-1 h-20"
                />
              </div>
            </div>

            {fotoSelecionada && (
              <div className="flex items-center gap-2 p-2.5 rounded bg-slate-800/80 border border-slate-700 text-xs text-blue-400">
                <ImageIcon className="w-4 h-4" />
                <span>Canhoto/NF anexado: <strong>{fotoSelecionada}</strong></span>
              </div>
            )}

            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleFotoUpload} 
              accept="image/*" 
              className="hidden" 
            />

            <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-slate-800">
              <Button 
                className="flex-1 bg-blue-600 hover:bg-blue-500 text-white font-bold py-6 shadow-md shadow-blue-600/30 transition-all text-sm"
                onClick={handleSalvarRegistro}
                disabled={salvando}
              >
                <Save className="w-4 h-4 mr-2" />
                {salvando ? "Salvando no Firestore..." : "Aprovar Recebimento e Gravar"}
              </Button>
              <Button 
                variant="outline" 
                type="button"
                className="border-slate-700 bg-slate-800 text-slate-200 hover:text-white py-6 text-xs"
                onClick={() => fileInputRef.current?.click()}
              >
                <Camera className="w-4 h-4 mr-2 text-orange-400" />
                Fotografar NF
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Lista de Registros Reais */}
        <Card className="lg:col-span-5 bg-slate-900/95 border border-slate-700/80 shadow-2xl">
          <CardHeader className="border-b border-slate-800 pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <Truck className="w-5 h-5 text-orange-400" />
                Cargas Recebidas na Obra
              </CardTitle>
              <Badge variant="outline" className="border-slate-700 text-slate-300 text-xs">
                {registros.length} {registros.length === 1 ? "carga" : "cargas"}
              </Badge>
            </div>
            <CardDescription className="text-slate-400 text-xs">
              Histórico sincronizado em tempo real com o Firestore
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            {registros.length === 0 ? (
              <div className="text-center py-16 px-4">
                <div className="w-12 h-12 rounded-full bg-slate-800/80 border border-slate-700 flex items-center justify-center mx-auto mb-3">
                  <FileText className="w-6 h-6 text-slate-500" />
                </div>
                <h4 className="text-sm font-bold text-slate-300 mb-1">Nenhum recebimento registrado</h4>
                <p className="text-xs text-slate-400 max-w-xs mx-auto leading-relaxed">
                  Os dados do canteiro estão limpos para a operação real. Quando a primeira betoneira descarregar, preencha o formulário ao lado para iniciar a rastreabilidade.
                </p>
              </div>
            ) : (
              <div className="space-y-4 max-h-[600px] overflow-y-auto pr-1">
                {registros.map((registro, idx) => (
                  <div 
                    key={registro.id || idx} 
                    className="border border-slate-800 bg-slate-800/40 rounded-xl p-4 space-y-3 hover:border-slate-700 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Truck className="w-4 h-4 text-blue-400" />
                        <span className="font-bold text-white text-base font-mono">{registro.caminhao}</span>
                      </div>
                      <Badge className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-xs">
                        Aprovado
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <span className="text-slate-400 block">Horário</span>
                        <span className="text-slate-200 font-medium">{registro.data} às {registro.horario}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block">Volume</span>
                        <span className="text-white font-bold">{registro.volume}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block">Nota Fiscal</span>
                        <span className="text-slate-200 font-medium">{registro.notaFiscal}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block">Slump Test</span>
                        <span className="text-orange-400 font-medium">{registro.slump}</span>
                      </div>
                    </div>

                    {registro.observacoes && (
                      <div className="text-xs bg-slate-900/90 border border-slate-800 p-2.5 rounded-lg text-slate-300 leading-relaxed font-mono">
                        {registro.observacoes}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RecebimentoConcreto;
