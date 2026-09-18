import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Truck, 
  ClipboardCheck, 
  BarChart3, 
  Map, 
  Beaker, 
  Calendar,
  ArrowRight,
  Sparkles
} from "lucide-react";

const Features = () => {
  const scrollTo = (id: string) => {
    const elem = document.getElementById(id);
    if (elem) {
      elem.scrollIntoView({ behavior: "smooth" });
    }
  };

  const features = [
    {
      icon: Truck,
      title: "Registro de Recebimento",
      description: "Controle digital imediato da chegada da betoneira: placa, motorista, concreteira, nota fiscal e volume entregue.",
      color: "text-orange-400"
    },
    {
      icon: Beaker,
      title: "Slump Test Digital",
      description: "Registro dos ensaios de abatimento com fotos dos comprovantes e conferência da trabalhabilidade conforme especificado.",
      color: "text-blue-400"
    },
    {
      icon: Calendar,
      title: "Planejamento de Volume",
      description: "Cálculo e totalização do volume necessário por elemento estrutural para evitar pedidos a menor ou sobras excessivas.",
      color: "text-cyan-400"
    },
    {
      icon: Map,
      title: "Mapa de Concretagem 2D",
      description: "Visualização espacial em tempo real do status das peças estruturais por pavimento (pendente, em andamento, concluído).",
      color: "text-emerald-400"
    },
    {
      icon: ClipboardCheck,
      title: "Rastreabilidade Normativa",
      description: "Vinculação direta entre o caminhão fornecedor e as peças estruturais concretadas (NBR 12655 e NBR 6118).",
      color: "text-blue-400"
    },
    {
      icon: BarChart3,
      title: "Relatórios e ESG",
      description: "Histórico centralizado para auditorias de qualidade e cálculo preliminar de indicadores de sustentabilidade e carbono.",
      color: "text-orange-400"
    }
  ];

  return (
    <section className="py-20 px-6 bg-[#0c121e]" id="features">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-slate-900 border border-slate-800 px-4 py-1.5 rounded-full mb-4">
            <Sparkles className="w-4 h-4 text-orange-400" />
            <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
              Módulos Operacionais
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4">
            Funcionalidades do <span className="text-blue-400">MCC-Carbon</span>
          </h2>
          <p className="text-base md:text-lg text-slate-300 max-w-2xl mx-auto">
            Projetado para a rotina prática de canteiro, unindo velocidade de preenchimento e rigor técnico.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {features.map((feature, index) => (
            <Card key={index} className="bg-slate-900/90 border border-slate-800 hover:border-blue-500/50 transition-all duration-300 shadow-lg">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-slate-800/80 border border-slate-700/50 flex items-center justify-center mb-4">
                  <feature.icon className={`w-6 h-6 ${feature.color}`} />
                </div>
                <CardTitle className="text-lg font-bold text-white mb-2">{feature.title}</CardTitle>
                <CardDescription className="text-sm text-slate-300 leading-relaxed font-normal">
                  {feature.description}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>

        {/* CTA Card */}
        <div className="bg-gradient-to-r from-slate-900 via-[#131d2e] to-slate-900 border border-slate-700/80 p-8 md:p-12 rounded-2xl text-center shadow-xl">
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Pronto para colocar o controle em prática na sua obra?
          </h3>
          <p className="text-base text-slate-300 mb-8 max-w-2xl mx-auto">
            Faça os primeiros registros de recebimento e acompanhe o mapa da estrutura em tempo real.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              className="bg-blue-600 hover:bg-blue-500 text-white font-semibold shadow-md shadow-blue-600/30"
              onClick={() => scrollTo("recebimento")}
            >
              Ir para Recebimento de Concreto
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <Button 
              variant="outline"
              size="lg"
              className="border-slate-700 bg-slate-800/80 text-slate-200 hover:bg-slate-700 hover:text-white"
              onClick={() => scrollTo("mapa")}
            >
              Explorar Mapa de Peças
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
