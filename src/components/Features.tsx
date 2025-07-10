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
  const features = [
    {
      icon: Truck,
      title: "Registro de Recebimento",
      description: "Controle completo do concreto recebido: dados do caminhão, nota fiscal e características técnicas.",
      color: "text-accent"
    },
    {
      icon: Beaker,
      title: "Slump Test Digital",
      description: "Registro digital dos testes de slump com fotos, medições e aprovação automática de qualidade.",
      color: "text-primary"
    },
    {
      icon: Calendar,
      title: "Planejamento de Volume",
      description: "Calcule e organize o volume total de concreto necessário para cada etapa da obra.",
      color: "text-primary-glow"
    },
    {
      icon: Map,
      title: "Mapa de Concretagem",
      description: "Visualização em tempo real do status das peças: concretadas, em andamento e planejadas.",
      color: "text-accent"
    },
    {
      icon: ClipboardCheck,
      title: "Controle de Qualidade",
      description: "Monitoramento completo da qualidade com alertas automáticos para não conformidades.",
      color: "text-primary"
    },
    {
      icon: BarChart3,
      title: "Relatórios Técnicos",
      description: "Relatórios detalhados de consumo, qualidade e progresso para tomada de decisões.",
      color: "text-primary-glow"
    }
  ];

  return (
    <section className="py-20 px-6">
      <div className="container mx-auto">
        <div className="text-center mb-16 fade-in-up">
          <div className="inline-flex items-center gap-2 glass-card px-4 py-2 rounded-full mb-6">
            <Sparkles className="w-4 h-4 text-accent" />
            <span className="text-sm font-medium">Funcionalidades Essenciais</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Controle completo da{" "}
            <span className="gradient-text">concretagem</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Todas as ferramentas necessárias para gerenciar recebimento, qualidade 
            e planejamento de concreto em obras de pequeno e médio porte.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <Card key={index} className="glass-card hover-lift group">
              <CardHeader>
                <div className={`w-12 h-12 rounded-lg bg-gradient-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <feature.icon className={`w-6 h-6 ${feature.color}`} />
                </div>
                <CardTitle className="text-xl mb-2">{feature.title}</CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center glass-card p-12 rounded-2xl">
          <h3 className="text-3xl font-bold mb-4">
            Pronto para otimizar sua{" "}
            <span className="gradient-text">obra</span>?
          </h3>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Comece a usar o ConcreteControl Pro e tenha controle total 
            sobre a concretagem da sua obra.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="gradient" size="lg" className="group">
              Iniciar primeiro registro
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="glass" size="lg">
              Ver demonstração
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;