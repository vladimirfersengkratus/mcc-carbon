import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  ArrowRight, 
  Sparkles, 
  Map, 
  ShieldCheck, 
  Clock, 
  Layers,
  Truck,
  BarChart3,
  Building
} from "lucide-react";

const Hero = () => {
  const navigate = useNavigate();

  const modulosPrincipais = [
    {
      titulo: "Dashboard da Obra",
      descricao: "Indicadores em tempo real, volume aplicado, conformidade e resumo por pavimento.",
      rota: "/dashboard",
      icone: BarChart3,
      cor: "text-blue-400",
      borda: "hover:border-blue-500/50"
    },
    {
      titulo: "Recebimento de Concreto",
      descricao: "Chegada da betoneira, ensaios de abatimento (Slump Test), NF e envio ao Firestore.",
      rota: "/recebimento",
      icone: Truck,
      cor: "text-orange-400",
      borda: "hover:border-orange-500/50"
    },
    {
      titulo: "Planejamento de Volume",
      descricao: "Balanço volumétrico por peça, cubagem prevista vs. executada e controle de perdas.",
      rota: "/planejamento",
      icone: Layers,
      cor: "text-cyan-400",
      borda: "hover:border-cyan-500/50"
    },
    {
      titulo: "Mapa de Concretagem 2D",
      descricao: "Planta baixa interativa com status de pilares, vigas e lajes por pavimento estrutural.",
      rota: "/mapa",
      icone: Map,
      cor: "text-emerald-400",
      borda: "hover:border-emerald-500/50"
    }
  ];

  return (
    <section className="relative min-h-[90vh] flex flex-col justify-center overflow-hidden py-12 px-4 sm:px-6">
      {/* Glows decorativos */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-600/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto text-center max-w-5xl">
        <div className="mb-6 inline-flex items-center gap-2 bg-slate-900/90 border border-slate-700/80 px-4 py-2 rounded-full shadow-md">
          <Sparkles className="w-4 h-4 text-orange-400" />
          <span className="text-xs md:text-sm font-semibold text-slate-200 uppercase tracking-wider">
            MCC-Carbon • Sistema de Gestão de Concretagem
          </span>
        </div>

        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold mb-6 tracking-tight text-white leading-tight">
          Controle total da{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500">
            concretagem
          </span>
          <br className="hidden sm:inline" /> na sua obra
        </h1>

        <p className="text-base sm:text-lg md:text-xl text-slate-300 mb-10 max-w-3xl mx-auto leading-relaxed font-normal">
          Controle tecnológico digital de caminhões betoneira, ensaio de abatimento (<span className="text-white font-medium">Slump Test</span>), 
          rastreabilidade normativa NBR 12655 e mapeamento visual interativo por pavimento.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
          <Button 
            size="lg" 
            className="w-full sm:w-auto bg-blue-600 hover:bg-blue-500 text-white font-semibold px-8 py-6 text-base shadow-lg shadow-blue-600/25 transition-all duration-300"
            onClick={() => navigate("/recebimento")}
          >
            Iniciar Recebimento de Concreto
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
          
          <Button 
            variant="outline" 
            size="lg"
            className="w-full sm:w-auto border-slate-700 bg-slate-900/80 hover:bg-slate-800 text-slate-200 px-8 py-6 text-base font-semibold"
            onClick={() => navigate("/mapa")}
          >
            <Map className="w-5 h-5 mr-2 text-orange-400" />
            Ver Mapa de Concretagem
          </Button>
        </div>

        {/* Grade de Módulos Rápidos */}
        <div className="mb-16 text-left">
          <div className="flex items-center justify-between mb-4 px-1">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Building className="w-4 h-4 text-blue-400" />
              Acesso Direto aos Módulos Operacionais
            </h2>
            <span className="text-xs text-slate-400 hidden sm:inline">Navegação por páginas dedicadas</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {modulosPrincipais.map((mod, idx) => (
              <div 
                key={idx}
                onClick={() => navigate(mod.rota)}
                className={`
                  bg-slate-900/90 border border-slate-800 ${mod.borda}
                  rounded-xl p-5 cursor-pointer transition-all duration-200
                  hover:-translate-y-1 shadow-lg group flex flex-col justify-between
                `}
              >
                <div>
                  <div className="w-10 h-10 rounded-lg bg-slate-800/80 border border-slate-700/60 flex items-center justify-center mb-3">
                    <mod.icone className={`w-5 h-5 ${mod.cor}`} />
                  </div>
                  <h3 className="font-bold text-white text-base mb-1 group-hover:text-blue-400 transition-colors">
                    {mod.titulo}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed font-normal">
                    {mod.descricao}
                  </p>
                </div>
                <div className="mt-4 flex items-center text-xs font-semibold text-blue-400 group-hover:translate-x-1 transition-transform">
                  Acessar módulo <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Grid com Alto Contraste */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-6 text-left shadow-lg">
            <div className="flex items-center gap-3 mb-2">
              <ShieldCheck className="w-6 h-6 text-blue-400" />
              <div className="text-2xl font-bold text-white">100%</div>
            </div>
            <div className="text-sm font-medium text-slate-300">Rastreabilidade Normativa</div>
            <div className="text-xs text-slate-400 mt-1">Conforme NBR 12655 e NBR 6118</div>
          </div>

          <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-6 text-left shadow-lg">
            <div className="flex items-center gap-3 mb-2">
              <Clock className="w-6 h-6 text-orange-400" />
              <div className="text-2xl font-bold text-white">Tempo Real</div>
            </div>
            <div className="text-sm font-medium text-slate-300">Sincronização em Nuvem</div>
            <div className="text-xs text-slate-400 mt-1">Dados salvos instantaneamente no Firebase</div>
          </div>

          <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-6 text-left shadow-lg">
            <div className="flex items-center gap-3 mb-2">
              <Layers className="w-6 h-6 text-emerald-400" />
              <div className="text-2xl font-bold text-white">Balanço Volumétrico</div>
            </div>
            <div className="text-sm font-medium text-slate-300">Prevenção de Perdas</div>
            <div className="text-xs text-slate-400 mt-1">Controle rigoroso de cubagem no canteiro</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
