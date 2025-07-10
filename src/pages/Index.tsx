import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Dashboard from "@/components/Dashboard";
import RecebimentoConcreto from "@/components/RecebimentoConcreto";
import PlanejamentoVolume from "@/components/PlanejamentoVolume";
import MapaConcretagem from "@/components/MapaConcretagem";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <section id="home">
          <Hero />
        </section>
        <section id="features">
          <Features />
        </section>
        <section id="dashboard">
          <Dashboard />
        </section>
        <section id="recebimento">
          <RecebimentoConcreto />
        </section>
        <section id="planejamento">
          <PlanejamentoVolume />
        </section>
        <section id="mapa">
          <MapaConcretagem />
        </section>
      </main>
    </div>
  );
};

export default Index;
