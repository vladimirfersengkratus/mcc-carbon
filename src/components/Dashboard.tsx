import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  TrendingUp, 
  Truck, 
  Building, 
  Beaker,
  ArrowUpRight,
  MoreHorizontal,
  Sparkles
} from "lucide-react";

const Dashboard = () => {
  const metrics = [
    {
      title: "Volume Recebido",
      value: "156.8 m³",
      change: "+12.5 m³ hoje",
      icon: Truck,
      positive: true
    },
    {
      title: "Estruturas Concluídas",
      value: "8",
      change: "+2 esta semana",
      icon: Building,
      positive: true
    },
    {
      title: "Taxa de Aprovação",
      value: "98.2%",
      change: "Slump tests aprovados",
      icon: Beaker,
      positive: true
    },
    {
      title: "Progresso da Obra",
      value: "42%",
      change: "+8% este mês",
      icon: TrendingUp,
      positive: true
    }
  ];

  const recentActivity = [
    { user: "Caminhão ABC-1234", action: "Concreto recebido e aprovado", time: "2 min atrás", status: "success" },
    { user: "Engenheiro Carlos", action: "Slump test realizado", time: "15 min atrás", status: "info" },
    { user: "Equipe Concretagem", action: "Laje L1 iniciada", time: "1 hora atrás", status: "warning" },
    { user: "ConcrePro Ltda", action: "NF-001234 registrada", time: "2 horas atrás", status: "success" }
  ];

  return (
    <section className="py-20 px-6">
      <div className="container mx-auto">
        <div className="text-center mb-12 fade-in-up">
          <div className="inline-flex items-center gap-2 glass-card px-4 py-2 rounded-full mb-6">
            <Sparkles className="w-4 h-4 text-accent" />
            <span className="text-sm font-medium">Dashboard da Obra</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Controle total da{" "}
            <span className="gradient-text">concretagem</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Monitore recebimentos, qualidade e progresso da obra em tempo real.
          </p>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {metrics.map((metric, index) => (
            <Card key={index} className="glass-card hover-lift">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {metric.title}
                </CardTitle>
                <metric.icon className="h-4 w-4 text-accent" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold gradient-text mb-1">
                  {metric.value}
                </div>
                <div className="flex items-center text-xs text-muted-foreground">
                  <ArrowUpRight className="w-3 h-3 mr-1 text-accent" />
                  {metric.change}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Chart Placeholder */}
          <Card className="lg:col-span-2 glass-card">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Volume de Concreto por Dia</CardTitle>
                  <CardDescription>Recebimentos dos últimos 30 dias</CardDescription>
                </div>
                <Button variant="ghost" size="sm">
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-64 bg-gradient-accent/10 rounded-lg flex items-center justify-center border border-accent/20">
                <div className="text-center">
                  <TrendingUp className="w-12 h-12 text-accent mx-auto mb-4" />
                  <p className="text-muted-foreground">Gráfico de volumes em breve</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Activity Feed */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Atividade da Obra</CardTitle>
              <CardDescription>Últimas atividades de concretagem</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 rounded-lg bg-secondary/50 hover:bg-secondary/80 transition-colors">
                    <div className="w-2 h-2 rounded-full bg-accent mt-2"></div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium truncate">
                          {activity.user}
                        </p>
                        <Badge variant="secondary" className="text-xs">
                          {activity.status}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {activity.action}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {activity.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="ghost" className="w-full mt-4">
                Ver todas as atividades
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;