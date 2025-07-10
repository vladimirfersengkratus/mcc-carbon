import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  TrendingUp, 
  Users, 
  DollarSign, 
  Activity,
  ArrowUpRight,
  MoreHorizontal,
  Sparkles
} from "lucide-react";

const Dashboard = () => {
  const metrics = [
    {
      title: "Receita Total",
      value: "R$ 45.231",
      change: "+20.1% vs mês anterior",
      icon: DollarSign,
      positive: true
    },
    {
      title: "Usuários Ativos",
      value: "2.350",
      change: "+180 novos hoje",
      icon: Users,
      positive: true
    },
    {
      title: "Taxa de Conversão",
      value: "12.5%",
      change: "+2.5% vs semana anterior",
      icon: TrendingUp,
      positive: true
    },
    {
      title: "Performance",
      value: "98.2%",
      change: "Sistema estável",
      icon: Activity,
      positive: true
    }
  ];

  const recentActivity = [
    { user: "João Silva", action: "Completou projeto", time: "2 min atrás", status: "success" },
    { user: "Maria Santos", action: "Enviou relatório", time: "5 min atrás", status: "info" },
    { user: "Pedro Costa", action: "Atualizou perfil", time: "12 min atrás", status: "warning" },
    { user: "Ana Oliveira", action: "Fez upload de arquivo", time: "18 min atrás", status: "success" }
  ];

  return (
    <section className="py-20 px-6">
      <div className="container mx-auto">
        <div className="text-center mb-12 fade-in-up">
          <div className="inline-flex items-center gap-2 glass-card px-4 py-2 rounded-full mb-6">
            <Sparkles className="w-4 h-4 text-accent" />
            <span className="text-sm font-medium">Dashboard Inteligente</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Controle total do seu{" "}
            <span className="gradient-text">negócio</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Monitore métricas em tempo real, analise tendências e tome decisões baseadas em dados.
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
                  <CardTitle>Análise de Performance</CardTitle>
                  <CardDescription>Crescimento nos últimos 30 dias</CardDescription>
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
                  <p className="text-muted-foreground">Gráfico interativo em breve</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Activity Feed */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Atividade Recente</CardTitle>
              <CardDescription>Últimas ações do sistema</CardDescription>
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