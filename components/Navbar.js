// components/Navbar.js
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  // Função para navegação suave entre páginas
  const handleNavigation = (path) => {
    setOpen(false);
    if (path.startsWith('/')) {
      router.push(path);
    } else {
      // Se estiver na página inicial, usa âncora
      if (router.pathname === '/') {
        const element = document.querySelector(path);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        // Se não estiver na página inicial, vai para a página inicial com âncora
        router.push(`/${path}`);
      }
    }
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-white/20 bg-white/85 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center gap-3 transition-transform duration-300 hover:scale-[1.01]">
              <Image src="/imagens/coracao-laranja.png" alt="Ação Saúde Logo" width={44} height={34} />
              <Image src="/imagens/logo-laranja.png" alt="Logo" width={90} height={52} />
            </Link>
          </div>

          {/* Desktop */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            <button 
              onClick={() => handleNavigation('#quem-somos')}
              className="text-slate-700 hover:text-[#ff7415] px-3 py-2 font-semibold transition-colors"
            >
              QUEM SOMOS
            </button>
            <button 
              onClick={() => handleNavigation('#atuacao')}
              className="text-slate-700 hover:text-[#ff7415] px-3 py-2 font-semibold transition-colors"
            >
              ÁREAS DE ATUAÇÃO
            </button>
            <Link href="/cursos" className="text-slate-700 hover:text-[#ff7415] px-3 py-2 font-semibold transition-colors">
              CURSOS
            </Link>
            <Link href="/fotos" className="text-slate-700 hover:text-[#ff7415] px-3 py-2 font-semibold transition-colors">
              GALERIA
            </Link>
            <button 
              onClick={() => handleNavigation('#doacao')}
              className="bg-[#ff7415] text-white px-5 py-2.5 rounded-full font-semibold hover:bg-[#e5670d] hover:-translate-y-0.5 shadow-lg shadow-orange-200/70 transition"
            >
              DOAÇÃO
            </button>
          </div>

          {/* Mobile button */}
          <div className="md:hidden flex items-center">
            <button
              aria-label="Abrir menu"
              onClick={() => setOpen(!open)}
              className="text-slate-700 hover:text-[#ff7415] transition-colors"
            >
              {open ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-white/95 backdrop-blur-xl shadow-lg border-t border-slate-100">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <button 
              onClick={() => handleNavigation('#quem-somos')}
              className="block w-full text-left px-3 py-2 text-slate-700 hover:text-[#ff7415] font-semibold"
            >
              QUEM SOMOS
            </button>
            <button 
              onClick={() => handleNavigation('#atuacao')}
              className="block w-full text-left px-3 py-2 text-slate-700 hover:text-[#ff7415] font-semibold"
            >
              ÁREAS DE ATUAÇÃO
            </button>
            <Link href="/cursos" className="block px-3 py-2 text-slate-700 hover:text-[#ff7415] font-semibold" onClick={() => setOpen(false)}>
              CURSOS
            </Link>
            <Link href="/fotos" className="block px-3 py-2 text-slate-700 hover:text-[#ff7415] font-semibold" onClick={() => setOpen(false)}>
              GALERIA
            </Link>
            <button 
              onClick={() => handleNavigation('#doacao')}
              className="block w-full text-left px-3 py-2 bg-[#ff7415] text-white rounded-xl font-semibold hover:bg-[#e5670d]"
            >
              DOAÇÃO
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}