import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
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
import { 
  Menu, 
  X, 
  Building2, 
  UserCheck, 
  HardHat,
  Home,
  BarChart3,
  Truck,
  Layers,
  Map,
  BookOpen,
  HelpCircle,
  Navigation
} from "lucide-react";

const Navbar = () => {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [modalLoginAberto, setModalLoginAberto] = useState(false);
  const [modalNovaObraAberto, setModalNovaObraAberto] = useState(false);

  const [obraAtiva, setObraAtiva] = useState("Residencial Horizon (Obra Ativa)");
  const [novaObraNome, setNovaObraNome] = useState("");
  const [novaObraResp, setNovaObraResp] = useState("");

  const navItems = [
    { name: "Início", path: "/", icon: Home },
    { name: "Logística", path: "/logistica", icon: Navigation },
    { name: "Recebimento", path: "/recebimento", icon: Truck },
    { name: "Planejamento", path: "/planejamento", icon: Layers },
    { name: "Mapa 2D", path: "/mapa", icon: Map },
    { name: "Dashboard", path: "/dashboard", icon: BarChart3 },
    { name: "Modelo", path: "/modelo", icon: BookOpen, badge: "Exemplo" },
    { name: "Ajuda", path: "/ajuda", icon: HelpCircle }
  ];

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
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#0c121e]/95 backdrop-blur-md border-b border-slate-800 shadow-xl">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link 
              to="/"
              className="flex items-center space-x-2.5 cursor-pointer group flex-shrink-0"
            >
              <div className="w-9 h-9 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-lg flex items-center justify-center shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
                <HardHat className="w-5 h-5 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold text-white tracking-wide">
                  MCC<span className="text-orange-500">-Carbon</span>
                </span>
                <span className="text-[10px] text-slate-400 -mt-1 font-medium hidden sm:inline">
                  Mapa Concreta Control
                </span>
              </div>
            </Link>

            {/* Menu Horizontal Fixo (Desktop) */}
            <nav className="hidden xl:flex items-center space-x-1 bg-slate-900/80 border border-slate-800/80 p-1 rounded-xl">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.path === "/"}
                  className={({ isActive }) => `
                    flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200
                    ${isActive 
                      ? "bg-blue-600 text-white shadow-md shadow-blue-600/30" 
                      : "text-slate-300 hover:text-white hover:bg-slate-800/70"}
                  `}
                >
                  <item.icon className="w-3.5 h-3.5" />
                  <span>{item.name}</span>
                  {item.badge && (
                    <span className="text-[9px] bg-blue-500/30 text-blue-300 px-1 py-0.2 rounded font-normal">
                      {item.badge}
                    </span>
                  )}
                </NavLink>
              ))}
            </nav>

            {/* Obra Ativa & Ações Rápidas */}
            <div className="hidden md:flex items-center space-x-3">
              <button 
                onClick={() => setModalNovaObraAberto(true)}
                className="flex items-center gap-1.5 bg-slate-900/90 border border-slate-700/80 px-3 py-1.5 rounded-lg text-xs text-slate-300 hover:border-slate-600 hover:text-white transition-all max-w-[210px]"
                title="Clique para alternar ou cadastrar obra"
              >
                <Building2 className="w-3.5 h-3.5 text-orange-400 flex-shrink-0" />
                <span className="truncate">{obraAtiva}</span>
              </button>

              <Button 
                variant="ghost" 
                size="sm"
                className="text-slate-300 hover:text-white hover:bg-slate-800 text-xs"
                onClick={() => setModalLoginAberto(true)}
              >
                <UserCheck className="w-3.5 h-3.5 mr-1 text-blue-400" />
                Entrar
              </Button>
            </div>

            {/* Mobile menu button */}
            <div className="xl:hidden">
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

          {/* Menu Mobile */}
          {isOpen && (
            <div className="xl:hidden border-t border-slate-800 py-4 bg-[#0c121e]">
              <div className="flex flex-col space-y-1">
                <div 
                  onClick={() => { setIsOpen(false); setModalNovaObraAberto(true); }}
                  className="flex items-center gap-2 bg-slate-900 border border-slate-800 p-2.5 rounded-lg text-xs text-slate-200 mb-2 cursor-pointer"
                >
                  <Building2 className="w-4 h-4 text-orange-400" />
                  <div className="flex flex-col">
                    <span className="text-[10px] text-slate-400 uppercase font-semibold">Obra Selecionada:</span>
                    <span className="font-bold truncate">{obraAtiva}</span>
                  </div>
                </div>

                {navItems.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    end={item.path === "/"}
                    onClick={() => setIsOpen(false)}
                    className={({ isActive }) => `
                      flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors
                      ${isActive 
                        ? "bg-blue-600 text-white font-bold" 
                        : "text-slate-300 hover:text-white hover:bg-slate-800/80"}
                    `}
                  >
                    <div className="flex items-center gap-2.5">
                      <item.icon className="w-4 h-4" />
                      <span>{item.name}</span>
                    </div>
                    {item.badge && (
                      <span className="text-[10px] bg-slate-800 text-slate-300 px-1.5 py-0.5 rounded">
                        {item.badge}
                      </span>
                    )}
                  </NavLink>
                ))}

                <div className="pt-3 border-t border-slate-800 mt-2 flex flex-col gap-2">
                  <Button 
                    variant="outline" 
                    className="w-full justify-start border-slate-700 text-slate-200 text-xs py-2"
                    onClick={() => { setIsOpen(false); setModalLoginAberto(true); }}
                  >
                    <UserCheck className="w-4 h-4 mr-2 text-blue-400" />
                    Acesso do Responsável Técnico
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Modal de Login / Acesso */}
      <Dialog open={modalLoginAberto} onOpenChange={setModalLoginAberto}>
        <DialogContent className="bg-[#121926] border border-slate-700 text-slate-100 max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-white flex items-center gap-2">
              <UserCheck className="w-5 h-5 text-blue-400" />
              Acesso ao Sistema MCC-Carbon
            </DialogTitle>
            <DialogDescription className="text-slate-400 text-xs">
              Entre com suas credenciais ou utilize o acesso rápido de engenheiro de canteiro.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-3">
            <div>
              <Label htmlFor="login-email" className="text-xs text-slate-300">E-mail Profissional</Label>
              <Input id="login-email" placeholder="eng.vladimirferreira@gmail.com" defaultValue="eng.vladimirferreira@gmail.com" className="mt-1" />
            </div>
            <div>
              <Label htmlFor="login-senha" className="text-xs text-slate-300">Senha</Label>
              <Input id="login-senha" type="password" placeholder="••••••••" defaultValue="123456" className="mt-1" />
            </div>
            <Button 
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-medium py-5 text-xs"
              onClick={() => {
                setModalLoginAberto(false);
                toast({
                  title: "Sessão iniciada!",
                  description: "Bem-vindo de volta, Vladimir Ferreira Silva."
                });
              }}
            >
              Entrar como Responsável Técnico
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
              Cadastrar ou Alternar Obra
            </DialogTitle>
            <DialogDescription className="text-slate-400 text-xs">
              Defina o empreendimento ativo para vincular recebimentos e mapa de concretagem.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-3">
            <div>
              <Label htmlFor="nova-obra-nome" className="text-xs text-slate-300">Nome da Obra / Empreendimento *</Label>
              <Input 
                id="nova-obra-nome" 
                placeholder="Ex: Residencial Horizon" 
                value={novaObraNome}
                onChange={(e) => setNovaObraNome(e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="nova-obra-resp" className="text-xs text-slate-300">Engenheiro / Responsável Técnico</Label>
              <Input 
                id="nova-obra-resp" 
                placeholder="Ex: Vladimir Ferreira Silva" 
                value={novaObraResp}
                onChange={(e) => setNovaObraResp(e.target.value)}
                className="mt-1"
              />
            </div>
            <Button 
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-medium py-5 text-xs"
              onClick={handleSalvarNovaObra}
            >
              Ativar Empreendimento
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Navbar;
