import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { 
  Truck, 
  FileText, 
  Beaker, 
  Camera, 
  CheckCircle,
  AlertCircle,
  Plus,
  Save
} from "lucide-react";

const RecebimentoConcreto = () => {
  const [registros, setRegistros] = useState([
    {
      id: 1,
      data: "2024-01-10",
      horario: "08:30",
      caminhao: "ABC-1234",
      motorista: "João Silva",
      concreteira: "ConcrePro Ltda",
      notaFiscal: "NF-001234",
      fck: "25 MPa",
      slump: "12±2 cm",
      volume: "8 m³",
      status: "aprovado"
    },
    {
      id: 2,
      data: "2024-01-10", 
      horario: "14:15",
      caminhao: "XYZ-5678",
      motorista: "Maria Santos",
      concreteira: "MegaConcreto S.A.",
      notaFiscal: "NF-005678",
      fck: "30 MPa", 
      slump: "10±2 cm",
      volume: "6 m³",
      status: "pendente"
    }
  ]);

  const [novoRegistro, setNovoRegistro] = useState({
    caminhao: "",
    motorista: "",
    concreteira: "",
    notaFiscal: "",
    fck: "",
    slump: "",
    volume: "",
    observacoes: ""
  });

  const handleSalvarRegistro = () => {
    const registro = {
      id: registros.length + 1,
      data: new Date().toISOString().split('T')[0],
      horario: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
      ...novoRegistro,
      status: "pendente"
    };
    
    setRegistros([registro, ...registros]);
    setNovoRegistro({
      caminhao: "",
      motorista: "",
      concreteira: "",
      notaFiscal: "",
      fck: "",
      slump: "",
      volume: "",
      observacoes: ""
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "aprovado":
        return <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Aprovado</Badge>;
      case "reprovado":
        return <Badge className="bg-red-500/20 text-red-400 border-red-500/30">Reprovado</Badge>;
      default:
        return <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">Pendente</Badge>;
    }
  };

  return (
    <section className="py-20 px-6" id="recebimento">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Registro de{" "}
            <span className="gradient-text">Recebimento</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Controle completo do concreto recebido na obra com registro detalhado e slump test.
          </p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          {/* Formulário de Novo Registro */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="w-5 h-5 text-accent" />
                Novo Recebimento
              </CardTitle>
              <CardDescription>
                Registre o recebimento de concreto na obra
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="caminhao">Placa do Caminhão</Label>
                  <Input
                    id="caminhao"
                    placeholder="ABC-1234"
                    value={novoRegistro.caminhao}
                    onChange={(e) => setNovoRegistro({...novoRegistro, caminhao: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="motorista">Motorista</Label>
                  <Input
                    id="motorista"
                    placeholder="Nome do motorista"
                    value={novoRegistro.motorista}
                    onChange={(e) => setNovoRegistro({...novoRegistro, motorista: e.target.value})}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="concreteira">Concreteira</Label>
                  <Input
                    id="concreteira"
                    placeholder="Nome da concreteira"
                    value={novoRegistro.concreteira}
                    onChange={(e) => setNovoRegistro({...novoRegistro, concreteira: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="notaFiscal">Nota Fiscal</Label>
                  <Input
                    id="notaFiscal"
                    placeholder="NF-123456"
                    value={novoRegistro.notaFiscal}
                    onChange={(e) => setNovoRegistro({...novoRegistro, notaFiscal: e.target.value})}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="fck">FCK</Label>
                  <Input
                    id="fck"
                    placeholder="25 MPa"
                    value={novoRegistro.fck}
                    onChange={(e) => setNovoRegistro({...novoRegistro, fck: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="slump">Slump Test</Label>
                  <Input
                    id="slump"
                    placeholder="12±2 cm"
                    value={novoRegistro.slump}
                    onChange={(e) => setNovoRegistro({...novoRegistro, slump: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="volume">Volume (m³)</Label>
                  <Input
                    id="volume"
                    placeholder="8.5"
                    value={novoRegistro.volume}
                    onChange={(e) => setNovoRegistro({...novoRegistro, volume: e.target.value})}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="observacoes">Observações</Label>
                <Textarea
                  id="observacoes"
                  placeholder="Observações sobre o recebimento..."
                  value={novoRegistro.observacoes}
                  onChange={(e) => setNovoRegistro({...novoRegistro, observacoes: e.target.value})}
                />
              </div>

              <div className="flex gap-4">
                <Button variant="gradient" className="flex-1" onClick={handleSalvarRegistro}>
                  <Save className="w-4 h-4 mr-2" />
                  Salvar Registro
                </Button>
                <Button variant="glass">
                  <Camera className="w-4 h-4 mr-2" />
                  Foto Slump
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Lista de Registros */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Truck className="w-5 h-5 text-accent" />
                Recebimentos Recentes
              </CardTitle>
              <CardDescription>
                Histórico de recebimentos de concreto
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {registros.map((registro) => (
                  <div key={registro.id} className="border border-border/50 rounded-lg p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Truck className="w-4 h-4 text-accent" />
                        <span className="font-medium">{registro.caminhao}</span>
                      </div>
                      {getStatusBadge(registro.status)}
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <span className="text-muted-foreground">Data:</span> {registro.data}
                      </div>
                      <div>
                        <span className="text-muted-foreground">Horário:</span> {registro.horario}
                      </div>
                      <div>
                        <span className="text-muted-foreground">Motorista:</span> {registro.motorista}
                      </div>
                      <div>
                        <span className="text-muted-foreground">Volume:</span> {registro.volume}
                      </div>
                      <div>
                        <span className="text-muted-foreground">FCK:</span> {registro.fck}
                      </div>
                      <div>
                        <span className="text-muted-foreground">Slump:</span> {registro.slump}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 pt-2 border-t border-border/50">
                      <FileText className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">{registro.notaFiscal}</span>
                      <span className="text-sm text-muted-foreground">•</span>
                      <span className="text-sm text-muted-foreground">{registro.concreteira}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Stats Rápidas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-12">
          <Card className="glass-card">
            <CardContent className="p-6 text-center">
              <Truck className="w-8 h-8 text-accent mx-auto mb-2" />
              <div className="text-2xl font-bold gradient-text">12</div>
              <div className="text-sm text-muted-foreground">Recebimentos hoje</div>
            </CardContent>
          </Card>
          <Card className="glass-card">
            <CardContent className="p-6 text-center">
              <Beaker className="w-8 h-8 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold gradient-text">96 m³</div>
              <div className="text-sm text-muted-foreground">Volume total</div>
            </CardContent>
          </Card>
          <Card className="glass-card">
            <CardContent className="p-6 text-center">
              <CheckCircle className="w-8 h-8 text-green-400 mx-auto mb-2" />
              <div className="text-2xl font-bold gradient-text">98%</div>
              <div className="text-sm text-muted-foreground">Taxa aprovação</div>
            </CardContent>
          </Card>
          <Card className="glass-card">
            <CardContent className="p-6 text-center">
              <AlertCircle className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
              <div className="text-2xl font-bold gradient-text">2</div>
              <div className="text-sm text-muted-foreground">Pendentes análise</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default RecebimentoConcreto;