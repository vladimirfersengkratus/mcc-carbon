import Layout from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  BookOpen, 
  Clock, 
  Beaker, 
  ShieldCheck, 
  Truck, 
  FileText, 
  HelpCircle, 
  CheckCircle2, 
  AlertTriangle,
  Sparkles,
  Layers
} from "lucide-react";

const ManualAjudaPage = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-5xl space-y-10">
        {/* Cabeçalho */}
        <div className="border-b border-slate-800 pb-6">
          <div className="inline-flex items-center gap-2 bg-slate-900 border border-slate-800 px-3.5 py-1 rounded-full mb-2">
            <Sparkles className="w-3.5 h-3.5 text-orange-400" />
            <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
              Documentação Oficial • Guia de Canteiro
            </span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Manual do Usuário & Central de Ajuda
          </h1>
          <p className="text-sm text-slate-400 mt-1 max-w-2xl font-normal leading-relaxed">
            Instruções operacionais passo a passo, tolerâncias normativas das NBRs e perguntas frequentes para a equipe de canteiro e controle tecnológico.
          </p>
        </div>

        {/* 1. Guia Rápido de Canteiro (Passo a Passo em 4 Etapas) */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-blue-400" />
            1. Fluxo Operacional no Canteiro de Obras
          </h2>
          <p className="text-xs text-slate-400 font-normal">
            Siga esta rotina sequencial para cada caminhão betoneira que descarregar na obra:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="bg-slate-900/95 border border-slate-800 p-5 shadow-lg space-y-2">
              <div className="flex items-center gap-2 text-sm font-bold text-blue-400">
                <span className="w-6 h-6 rounded-full bg-blue-600/30 border border-blue-400/40 flex items-center justify-center text-xs text-blue-300">1</span>
                Monitorar Logística e Confirmar Chegada
              </div>
              <p className="text-xs text-slate-300 leading-relaxed font-normal">
                Na aba <strong>Logística</strong>, acompanhe o cronômetro regressivo da betoneira em trânsito. Faltando 15 minutos, posicione a equipe e o operador da bomba. Quando a betoneira estacionar na rampa, clique em <strong>"Confirmar Chegada na Obra"</strong>.
              </p>
            </Card>

            <Card className="bg-slate-900/95 border border-slate-800 p-5 shadow-lg space-y-2">
              <div className="flex items-center gap-2 text-sm font-bold text-orange-400">
                <span className="w-6 h-6 rounded-full bg-orange-600/30 border border-orange-400/40 flex items-center justify-center text-xs text-orange-300">2</span>
                Conferência de NF, Lacre e Horários (NBR 7212)
              </div>
              <p className="text-xs text-slate-300 leading-relaxed font-normal">
                Na aba <strong>Recebimento</strong>, digite o número da Nota Fiscal, confira o lacre do tambor e fotografe o canhoto assinado. Verifique se o tempo de transporte não ultrapassou o limite normativo de <strong>2h30</strong>.
              </p>
            </Card>

            <Card className="bg-slate-900/95 border border-slate-800 p-5 shadow-lg space-y-2">
              <div className="flex items-center gap-2 text-sm font-bold text-emerald-400">
                <span className="w-6 h-6 rounded-full bg-emerald-600/30 border border-emerald-400/40 flex items-center justify-center text-xs text-emerald-300">3</span>
                Ensaio de Slump Test e Moldagem de CPs
              </div>
              <p className="text-xs text-slate-300 leading-relaxed font-normal">
                Colete a amostra do terço médio da carga, meça o abatimento no cone de Abrams (NBR NM 67) e digite o valor medido. Se houver moldagem de Corpos de Prova (CPs), digite os códigos das etiquetas (ex.: <code className="text-emerald-400 font-mono">CP-01, CP-02</code>) e as idades (3, 7 e 28 dias).
              </p>
            </Card>

            <Card className="bg-slate-900/95 border border-slate-800 p-5 shadow-lg space-y-2">
              <div className="flex items-center gap-2 text-sm font-bold text-cyan-400">
                <span className="w-6 h-6 rounded-full bg-cyan-600/30 border border-cyan-400/40 flex items-center justify-center text-xs text-cyan-300">4</span>
                Vincular Peças e Atualizar o Mapa 2D
              </div>
              <p className="text-xs text-slate-300 leading-relaxed font-normal">
                Informe as peças onde o concreto foi lançado (ex.: <em>Pilares P1 a P4</em>). Ao salvar, as peças correspondentes na planta de fôrmas do <strong>Mapa 2D</strong> mudam para <strong>Verde (Concluído)</strong> com a rastreabilidade da NF registrada.
              </p>
            </Card>
          </div>
        </div>

        {/* 2. Tabela de Tolerâncias e Referências Normativas */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            2. Guia de Bolso das Normas Técnicas Brasileiras
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-slate-900/90 border border-slate-800 p-4 space-y-2">
              <Badge className="bg-blue-500/20 text-blue-400 border border-blue-500/40 text-xs">NBR NM 67</Badge>
              <h3 className="font-bold text-white text-sm">Tolerâncias do Slump Test</h3>
              <div className="text-xs text-slate-300 space-y-1.5 pt-1">
                <div>• Slump de 10 a 40 mm: <strong>± 10 mm</strong></div>
                <div>• Slump de 50 a 90 mm: <strong>± 20 mm</strong></div>
                <div>• Slump ≥ 100 mm: <strong>± 30 mm (± 3 cm)</strong></div>
                <div className="text-slate-400 pt-1 italic">Concretos bombeáveis com abatimento nominal 12 cm aceitam faixa de 9 a 15 cm.</div>
              </div>
            </Card>

            <Card className="bg-slate-900/90 border border-slate-800 p-4 space-y-2">
              <Badge className="bg-orange-500/20 text-orange-400 border border-orange-500/40 text-xs">NBR 7212</Badge>
              <h3 className="font-bold text-white text-sm">Tempo Limite de Transporte</h3>
              <div className="text-xs text-slate-300 space-y-1.5 pt-1">
                <div>• <strong>2h30:</strong> Tempo máximo entre a adição de água na usina e o fim da descarga.</div>
                <div>• <strong>3h00:</strong> Permitido se utilizado aditivo retardador de pega autorizado pelo engenheiro.</div>
                <div className="text-slate-400 pt-1 italic">A descarga não deve ser iniciada se ultrapassar o início de pega do cimento.</div>
              </div>
            </Card>

            <Card className="bg-slate-900/90 border border-slate-800 p-4 space-y-2">
              <Badge className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-xs">NBR 12655 & 5738</Badge>
              <h3 className="font-bold text-white text-sm">Amostragem de CPs</h3>
              <div className="text-xs text-slate-300 space-y-1.5 pt-1">
                <div>• Cada exemplar é composto por <strong>dois corpos de prova</strong> da mesma amassada.</div>
                <div>• Idades padrão de ensaio: <strong>7 e 28 dias</strong> (comum 3 dias para desforma rápida de lajes).</div>
                <div className="text-slate-400 pt-1 italic">Resistência do exemplar: o maior valor entre os 2 CPs rompidos.</div>
              </div>
            </Card>
          </div>
        </div>

        {/* 3. Perguntas Frequentes do Canteiro (FAQ) */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-orange-400" />
            3. Perguntas Frequentes (FAQ de Canteiro)
          </h2>

          <div className="space-y-3">
            <Card className="bg-slate-900/90 border border-slate-800 p-4">
              <h4 className="text-sm font-bold text-white mb-1">
                O que fazer se o Slump Test der fora da faixa de tolerância?
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed font-normal">
                Repita o ensaio imediatamente em uma nova amostra do mesmo caminhão para confirmação. Se persistir a divergência: para abatimento abaixo do especificado, só adicione água ou aditivo plastificante com a autorização e presença do responsável técnico (registrando o volume em litros no app). Se o abatimento estiver excessivamente alto (risco de segregação), o caminhão deve ser recusado no sistema com justificativa.
              </p>
            </Card>

            <Card className="bg-slate-900/90 border border-slate-800 p-4">
              <h4 className="text-sm font-bold text-white mb-1">
                Como registrar uma laje grande que recebe vários caminhões betoneira?
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed font-normal">
                Cada caminhão betoneira tem seu próprio registro individual de recebimento (NF, Slump e CPs próprios). No campo de destinação, você indica o trecho concretado (ex.: <em>Laje L1 - Trecho dos eixos 1 a 3</em>). O sistema soma automaticamente os volumes de todas as NFs vinculadas para compor a cubagem final da laje.
              </p>
            </Card>

            <Card className="bg-slate-900/90 border border-slate-800 p-4">
              <h4 className="text-sm font-bold text-white mb-1">
                O aplicativo funciona se a internet oscilar ou cair no canteiro?
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed font-normal">
                Sim. O sistema armazena os registros no armazenamento local do navegador (*IndexedDB/Cache local*). Assim que o celular restabelecer conexão com a rede Wi-Fi da obra ou dados móveis, os dados são sincronizados automaticamente com o Firebase na nuvem.
              </p>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ManualAjudaPage;
