import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Rocket, 
  Shield, 
  Zap, 
  Globe, 
  Users, 
  BarChart3,
  ArrowRight,
  Sparkles
} from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: Rocket,
      title: "Performance Extrema",
      description: "Otimização avançada que garante velocidade excepcional em todas as operações.",
      color: "text-accent"
    },
    {
      icon: Shield,
      title: "Segurança Total",
      description: "Proteção de nível enterprise com criptografia end-to-end e monitoramento 24/7.",
      color: "text-primary"
    },
    {
      icon: Zap,
      title: "Automação Inteligente",
      description: "IA integrada que automatiza tarefas repetitivas e otimiza seus processos.",
      color: "text-primary-glow"
    },
    {
      icon: Globe,
      title: "Alcance Global",
      description: "CDN mundial com presença em todos os continentes para máxima disponibilidade.",
      color: "text-accent"
    },
    {
      icon: Users,
      title: "Colaboração Fluida",
      description: "Ferramentas avançadas de trabalho em equipe com sincronização em tempo real.",
      color: "text-primary"
    },
    {
      icon: BarChart3,
      title: "Analytics Avançado",
      description: "Insights profundos com visualizações interativas e relatórios personalizáveis.",
      color: "text-primary-glow"
    }
  ];

  return (
    <section className="py-20 px-6">
      <div className="container mx-auto">
        <div className="text-center mb-16 fade-in-up">
          <div className="inline-flex items-center gap-2 glass-card px-4 py-2 rounded-full mb-6">
            <Sparkles className="w-4 h-4 text-accent" />
            <span className="text-sm font-medium">Recursos Poderosos</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Tudo que você precisa para{" "}
            <span className="gradient-text">acelerar</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Nossa plataforma oferece um conjunto completo de ferramentas para potencializar 
            seu negócio e superar a concorrência.
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
            Pronto para começar sua{" "}
            <span className="gradient-text">jornada</span>?
          </h3>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Junte-se a milhares de empresas que já transformaram seus negócios 
            com nossa plataforma inovadora.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="gradient" size="lg" className="group">
              Teste gratuito por 14 dias
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="glass" size="lg">
              Falar com especialista
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;