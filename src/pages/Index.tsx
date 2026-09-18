import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Dashboard from "@/components/Dashboard";
import RecebimentoConcreto from "@/components/RecebimentoConcreto";
import PlanejamentoVolume from "@/components/PlanejamentoVolume";
import MapaConcretagem from "@/components/MapaConcretagem";

const Index = () => {
  return (
    <div className="min-h-screen bg-[#0b0f17] text-slate-100 flex flex-col">
      <Navbar />
      <main className="flex-1">
        <section id="home" className="scroll-mt-20">
          <Hero />
        </section>
        <section id="features" className="scroll-mt-20">
          <Features />
        </section>
        <section id="dashboard" className="scroll-mt-20">
          <Dashboard />
        </section>
        <section id="recebimento" className="scroll-mt-20">
          <RecebimentoConcreto />
        </section>
        <section id="planejamento" className="scroll-mt-20">
          <PlanejamentoVolume />
        </section>
        <section id="mapa" className="scroll-mt-20">
          <MapaConcretagem />
        </section>
      </main>

      <footer className="border-t border-slate-800 bg-[#070b11] py-8 px-6 text-center text-sm text-slate-400">
        <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-white tracking-wide">MCC-Carbon</span>
            <span className="text-xs text-slate-400">• Mapa Concreta Control</span>
          </div>
          <p className="text-xs text-slate-400">
            Equipe: Vladimir Ferreira Silva, Lucas Silva, Mário Jorge, George Alefe
          </p>
          <div className="text-xs text-slate-400">
            Deploy em Produção • Vercel & Firebase
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
