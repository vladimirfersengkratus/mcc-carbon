import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User, Database, FileText, Shield, Monitor, Settings, Plus, Edit, Trash2 } from "lucide-react";

interface ConfigDialogProps {
  trigger: React.ReactNode;
  activeTab?: string;
}

export const ConfigDialog = ({ trigger, activeTab = "users" }: ConfigDialogProps) => {
  const [users, setUsers] = useState([
    { id: 1, name: "Admin", email: "admin@concrete.com", role: "Administrador", active: true },
    { id: 2, name: "João Silva", email: "joao@concrete.com", role: "Engenheiro", active: true },
    { id: 3, name: "Maria Santos", email: "maria@concrete.com", role: "Técnico", active: false },
  ]);

  const [dbConfig, setDbConfig] = useState({
    host: "localhost",
    port: "5432",
    database: "concrete_control",
    autoBackup: true,
    backupInterval: "24",
  });

  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Configurações do Sistema</DialogTitle>
        </DialogHeader>
        
        <Tabs defaultValue={activeTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="users" className="gap-2">
              <User className="w-4 h-4" />
              Usuários
            </TabsTrigger>
            <TabsTrigger value="database" className="gap-2">
              <Database className="w-4 h-4" />
              Banco
            </TabsTrigger>
            <TabsTrigger value="reports" className="gap-2">
              <FileText className="w-4 h-4" />
              Relatórios
            </TabsTrigger>
            <TabsTrigger value="permissions" className="gap-2">
              <Shield className="w-4 h-4" />
              Permissões
            </TabsTrigger>
            <TabsTrigger value="system" className="gap-2">
              <Monitor className="w-4 h-4" />
              Sistema
            </TabsTrigger>
          </TabsList>

          {/* Gerenciar Usuários */}
          <TabsContent value="users" className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Gerenciamento de Usuários</h3>
              <Button size="sm" className="gap-2">
                <Plus className="w-4 h-4" />
                Novo Usuário
              </Button>
            </div>
            
            <div className="space-y-3">
              {users.map((user) => (
                <Card key={user.id}>
                  <CardContent className="flex items-center justify-between p-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <User className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="font-medium">{user.name}</span>
                          <Badge variant={user.active ? "default" : "secondary"}>
                            {user.active ? "Ativo" : "Inativo"}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{user.email}</p>
                        <p className="text-sm text-muted-foreground">{user.role}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Configurar Banco */}
          <TabsContent value="database" className="space-y-4">
            <h3 className="text-lg font-semibold">Configuração do Banco de Dados</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="db-host">Host</Label>
                <Input 
                  id="db-host" 
                  value={dbConfig.host}
                  onChange={(e) => setDbConfig({...dbConfig, host: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="db-port">Porta</Label>
                <Input 
                  id="db-port" 
                  value={dbConfig.port}
                  onChange={(e) => setDbConfig({...dbConfig, port: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="db-name">Nome do Banco</Label>
                <Input 
                  id="db-name" 
                  value={dbConfig.database}
                  onChange={(e) => setDbConfig({...dbConfig, database: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="backup-interval">Intervalo de Backup (horas)</Label>
                <Input 
                  id="backup-interval" 
                  value={dbConfig.backupInterval}
                  onChange={(e) => setDbConfig({...dbConfig, backupInterval: e.target.value})}
                />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Switch 
                checked={dbConfig.autoBackup}
                onCheckedChange={(checked) => setDbConfig({...dbConfig, autoBackup: checked})}
              />
              <Label>Backup Automático</Label>
            </div>

            <div className="flex space-x-2">
              <Button>Testar Conexão</Button>
              <Button variant="outline">Backup Manual</Button>
              <Button variant="outline">Restaurar</Button>
            </div>
          </TabsContent>

          {/* Relatórios */}
          <TabsContent value="reports" className="space-y-4">
            <h3 className="text-lg font-semibold">Configuração de Relatórios</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Relatórios de Concretagem</CardTitle>
                  <CardDescription>Configure os relatórios automáticos</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Switch defaultChecked />
                    <Label>Relatório Diário</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch defaultChecked />
                    <Label>Relatório Semanal</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch />
                    <Label>Relatório Mensal</Label>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Destinatários</CardTitle>
                  <CardDescription>Emails que receberão os relatórios</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Input placeholder="engenheiro@obra.com" />
                  <Button size="sm" variant="outline" className="w-full">
                    <Plus className="w-4 h-4 mr-2" />
                    Adicionar Email
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Permissões */}
          <TabsContent value="permissions" className="space-y-4">
            <h3 className="text-lg font-semibold">Configuração de Permissões</h3>
            
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Perfis de Usuário</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {["Administrador", "Engenheiro", "Técnico", "Operador"].map((role) => (
                      <div key={role} className="flex items-center justify-between p-3 border rounded-lg">
                        <span className="font-medium">{role}</span>
                        <Button variant="outline" size="sm">
                          Configurar
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Sistema */}
          <TabsContent value="system" className="space-y-4">
            <h3 className="text-lg font-semibold">Configurações do Sistema</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Informações do Sistema</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between">
                    <span>Versão:</span>
                    <span>v1.2.3</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Último Update:</span>
                    <span>15/01/2024</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Uptime:</span>
                    <span>7 dias</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Manutenção</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button variant="outline" className="w-full">
                    Limpar Cache
                  </Button>
                  <Button variant="outline" className="w-full">
                    Logs do Sistema
                  </Button>
                  <Button variant="destructive" className="w-full">
                    Reiniciar Sistema
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};