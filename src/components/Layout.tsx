import { ReactNode } from "react";
import Navbar from "@/components/Navbar";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-[#0b0f17] text-slate-100 flex flex-col">
      <Navbar />
      <main className="flex-1 pt-16">
        {children}
      </main>

      <footer className="border-t border-slate-800 bg-[#070b11] py-8 px-6 text-center text-sm text-slate-400 mt-12">
        <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-white tracking-wide">MCC-Carbon</span>
            <span className="text-xs text-slate-400">• Mapa Concreta Control</span>
          </div>
          <p className="text-xs text-slate-400">
            Equipe: Vladimir Ferreira Silva, Lucas Silva, Mário Jorge, George Alefe
          </p>
          <div className="text-xs text-slate-400">
            Deploy em Produção • Vercel & Firebase
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
