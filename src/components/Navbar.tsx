import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Menu, X, Zap, Building2, UserCheck, HardHat } from "lucide-react";

const Navbar = () => {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [modalLoginAberto, setModalLoginAberto] = useState(false);
  const [modalNovaObraAberto, setModalNovaObraAberto] = useState(false);

  const [obraAtiva, setObraAtiva] = useState("Residencial Horizon (Obra Piloto)");
  const [novaObraNome, setNovaObraNome] = useState("");
  const [novaObraResp, setNovaObraResp] = useState("");

  const navItems = [
    { name: "Início", href: "#home" },
    { name: "Recursos", href: "#features" },
    { name: "Dashboard", href: "#dashboard" },
    { name: "Recebimento", href: "#recebimento" },
    { name: "Planejamento", href: "#planejamento" },
    { name: "Mapa", href: "#mapa" }
  ];

  const handleNavegar = (href: string) => {
    setIsOpen(false);
    const targetId = href.replace("#", "");
    const elem = document.getElementById(targetId);
    if (elem) {
      elem.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSalvarNovaObra = () => {
    if (!novaObraNome) {
      toast({
        title: "Nome da obra obrigatório",
        description: "Digite o nome ou identificador da nova obra.",
        variant: "destructive"
      });
      return;
    }
    setObraAtiva(novaObraNome);
    setModalNovaObraAberto(false);
    setNovaObraNome("");
    setNovaObraResp("");
    toast({
      title: "Obra ativada!",
      description: `Trabalhando agora em: ${novaObraNome}`
    });
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0c121e]/95 backdrop-blur-md border-b border-slate-800 shadow-lg">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div 
              className="flex items-center space-x-3 cursor-pointer"
              onClick={() => handleNavegar("#home")}
            >
              <div className="w-9 h-9 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-lg flex items-center justify-center shadow-md shadow-blue-500/20">
                <HardHat className="w-5 h-5 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold text-white tracking-wide">
                  MCC<span className="text-orange-500">-Carbon</span>
                </span>
                <span className="text-[10px] text-slate-400 -mt-1 font-medium">
                  Mapa Concreta Control
                </span>
              </div>
            </div>

            {/* Obra Ativa Badge */}
            <div className="hidden xl:flex items-center gap-2 bg-slate-900/90 border border-slate-700/80 px-3 py-1 rounded-full text-xs text-slate-300">
              <Building2 className="w-3.5 h-3.5 text-orange-400" />
              <span>{obraAtiva}</span>
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center space-x-6">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => handleNavegar(item.href)}
                  className="text-sm font-medium text-slate-300 hover:text-white transition-colors relative py-1 group"
                >
                  {item.name}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
                </button>
              ))}
            </div>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center space-x-3">
              <Button 
                variant="ghost" 
                size="sm"
                className="text-slate-300 hover:text-white hover:bg-slate-800"
                onClick={() => setModalLoginAberto(true)}
              >
                <UserCheck className="w-4 h-4 mr-1 text-blue-400" />
                Entrar
              </Button>
              <Button 
                size="sm"
                className="bg-blue-600 hover:bg-blue-500 text-white shadow-md shadow-blue-600/30"
                onClick={() => setModalNovaObraAberto(true)}
              >
                <Building2 className="w-4 h-4 mr-1" />
                Nova obra
              </Button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="sm"
                className="text-slate-300 hover:text-white"
                onClick={() => setIsOpen(!isOpen)}
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isOpen && (
            <div className="md:hidden border-t border-slate-800 py-4 bg-[#0c121e]">
              <div className="flex flex-col space-y-3">
                <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 p-2 rounded-lg text-xs text-slate-300 mb-2">
                  <Building2 className="w-4 h-4 text-orange-400" />
                  <span className="truncate">{obraAtiva}</span>
                </div>
                {navItems.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => handleNavegar(item.href)}
                    className="text-left text-slate-200 hover:text-blue-400 transition-colors py-2 px-1 text-sm font-medium"
                  >
                    {item.name}
                  </button>
                ))}
                <div className="flex flex-col space-y-2 pt-3 border-t border-slate-800">
                  <Button 
                    variant="outline" 
                    className="w-full justify-start border-slate-700 text-slate-200"
                    onClick={() => { setIsOpen(false); setModalLoginAberto(true); }}
                  >
                    <UserCheck className="w-4 h-4 mr-2 text-blue-400" />
                    Entrar no Sistema
                  </Button>
                  <Button 
                    className="w-full justify-start bg-blue-600 hover:bg-blue-500 text-white"
                    onClick={() => { setIsOpen(false); setModalNovaObraAberto(true); }}
                  >
                    <Building2 className="w-4 h-4 mr-2" />
                    Cadastrar Nova Obra
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Modal de Login / Acesso */}
      <Dialog open={modalLoginAberto} onOpenChange={setModalLoginAberto}>
        <DialogContent className="bg-[#121926] border border-slate-700 text-slate-100 max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-white flex items-center gap-2">
              <UserCheck className="w-5 h-5 text-blue-400" />
              Acesso ao Sistema MCC-Carbon
            </DialogTitle>
            <DialogDescription className="text-slate-400">
              Entre com suas credenciais ou utilize o acesso rápido de engenheiro de canteiro.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-3">
            <div>
              <Label htmlFor="login-email">E-mail Profissional</Label>
              <Input id="login-email" placeholder="eng.vladimirferreira@gmail.com" defaultValue="eng.vladimirferreira@gmail.com" />
            </div>
            <div>
              <Label htmlFor="login-senha">Senha</Label>
              <Input id="login-senha" type="password" placeholder="••••••••" defaultValue="123456" />
            </div>
            <Button 
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-medium"
              onClick={() => {
                setModalLoginAberto(false);
                toast({
                  title: "Sessão iniciada!",
                  description: "Bem-vindo de volta, Vladimir Ferreira Silva."
                });
              }}
            >
              Entrar como Engenheiro Responsável
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Modal de Nova Obra */}
      <Dialog open={modalNovaObraAberto} onOpenChange={setModalNovaObraAberto}>
        <DialogContent className="bg-[#121926] border border-slate-700 text-slate-100 max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-white flex items-center gap-2">
              <Building2 className="w-5 h-5 text-orange-400" />
              Cadastrar Nova Obra
            </DialogTitle>
            <DialogDescription className="text-slate-400">
              Defina o empreendimento ativo para vincular recebimentos e mapa de concretagem.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-3">
            <div>
              <Label htmlFor="nova-obra-nome">Nome da Obra / Empreendimento *</Label>
              <Input 
                id="nova-obra-nome" 
                placeholder="Ex: Edifício Bella Vista" 
                value={novaObraNome}
                onChange={(e) => setNovaObraNome(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="nova-obra-resp">Engenheiro / Responsável Técnico</Label>
              <Input 
                id="nova-obra-resp" 
                placeholder="Ex: Vladimir Ferreira Silva" 
                value={novaObraResp}
                onChange={(e) => setNovaObraResp(e.target.value)}
              />
            </div>
            <Button 
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-medium"
              onClick={handleSalvarNovaObra}
            >
              Criar e Ativar Obra
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Navbar;
