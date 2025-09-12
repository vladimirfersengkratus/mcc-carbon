import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu, X, Zap, Settings, User, Database, FileText, Shield, Monitor } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: "Início", href: "#home" },
    { name: "Recursos", href: "#features" },
    { name: "Recebimento", href: "#recebimento" },
    { name: "Planejamento", href: "#planejamento" },
    { name: "Mapa", href: "#mapa" }
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-white/10">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center glow-effect">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold gradient-text">ConcreteControl</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-foreground hover:text-accent transition-colors relative group"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-primary transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2">
                  <Settings className="w-4 h-4" />
                  Configurações
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>Menu de Comandos</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="gap-2">
                  <User className="w-4 h-4" />
                  <span>Gerenciar Usuários</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="gap-2">
                  <Database className="w-4 h-4" />
                  <span>Configurar Banco</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="gap-2">
                  <FileText className="w-4 h-4" />
                  <span>Relatórios</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="gap-2">
                  <Shield className="w-4 h-4" />
                  <span>Permissões</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="gap-2">
                  <Monitor className="w-4 h-4" />
                  <span>Sistema</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="gap-2">
                  <Settings className="w-4 h-4" />
                  <span>Preferências</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button variant="ghost">Entrar</Button>
            <Button variant="gradient">
              Nova obra
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden border-t border-white/10 py-4 fade-in-up">
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-foreground hover:text-accent transition-colors py-2"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </a>
              ))}
               <div className="flex flex-col space-y-2 pt-4 border-t border-white/10">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="justify-start gap-2">
                      <Settings className="w-4 h-4" />
                      Configurações
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="w-56">
                    <DropdownMenuLabel>Menu de Comandos</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="gap-2">
                      <User className="w-4 h-4" />
                      <span>Gerenciar Usuários</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="gap-2">
                      <Database className="w-4 h-4" />
                      <span>Configurar Banco</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="gap-2">
                      <FileText className="w-4 h-4" />
                      <span>Relatórios</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="gap-2">
                      <Shield className="w-4 h-4" />
                      <span>Permissões</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="gap-2">
                      <Monitor className="w-4 h-4" />
                      <span>Sistema</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="gap-2">
                      <Settings className="w-4 h-4" />
                      <span>Preferências</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <Button variant="ghost" className="justify-start">
                  Entrar
                </Button>
                <Button variant="gradient" className="justify-start">
                  Nova obra
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;