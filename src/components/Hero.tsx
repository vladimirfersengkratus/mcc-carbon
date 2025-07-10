import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Zap } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-20 w-32 h-32 bg-primary/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-48 h-48 bg-accent/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary-glow/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 text-center fade-in-up">
        <div className="mb-6 inline-flex items-center gap-2 glass-card px-4 py-2 rounded-full">
          <Sparkles className="w-4 h-4 text-accent" />
          <span className="text-sm font-medium">ConcreteControl Pro</span>
        </div>

        <h1 className="text-6xl md:text-8xl font-bold mb-6 leading-tight">
          Controle total da{" "}
          <span className="gradient-text">concretagem</span>
          <br />
          na sua obra
        </h1>

        <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
          Sistema completo para registro de recebimento, planejamento de volumes 
          e mapeamento visual do status de concretagem em obras de concreto armado.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <Button variant="hero" className="group">
            Iniciar controle
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
          
          <Button variant="glass" size="lg">
            <Zap className="w-5 h-5" />
            Ver mapa de obra
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="glass-card p-6 hover-lift">
            <div className="text-3xl font-bold gradient-text mb-2">100%</div>
            <div className="text-muted-foreground">Controle de qualidade</div>
          </div>
          <div className="glass-card p-6 hover-lift">
            <div className="text-3xl font-bold gradient-text mb-2">24/7</div>
            <div className="text-muted-foreground">Monitoramento</div>
          </div>
          <div className="glass-card p-6 hover-lift">
            <div className="text-3xl font-bold gradient-text mb-2">500+</div>
            <div className="text-muted-foreground">Obras ativas</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;