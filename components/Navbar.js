// components/Navbar.js
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

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
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center gap-3">
              <Image src="/imagens/coracao-laranja.png" alt="Ação Saúde Logo" width={44} height={34} />
              <Image src="/imagens/logo-laranja.png" alt="Logo" width={90} height={52} />
            </Link>
          </div>

          {/* Desktop */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            <button 
              onClick={() => handleNavigation('#quem-somos')}
              className="text-gray-700 hover:text-[#ff7415] px-3 py-2 font-medium"
            >
              QUEM SOMOS
            </button>
            <button 
              onClick={() => handleNavigation('#atuacao')}
              className="text-gray-700 hover:text-[#ff7415] px-3 py-2 font-medium"
            >
              ÁREAS DE ATUAÇÃO
            </button>
            <Link href="/cursos" className="text-gray-700 hover:text-[#ff7415] px-3 py-2 font-medium">
              CURSOS
            </Link>
            <Link href="/fotos" className="text-gray-700 hover:text-[#ff7415] px-3 py-2 font-medium">
              GALERIA
            </Link>
            <button 
              onClick={() => handleNavigation('#doacao')}
              className="bg-[#ff7415] text-white px-4 py-2 rounded-md font-medium hover:bg-[#e5670d] transition"
            >
              DOAÇÃO
            </button>
          </div>

          {/* Mobile button */}
          <div className="md:hidden flex items-center">
            <button aria-label="Abrir menu" onClick={() => setOpen(!open)} className="text-gray-700 hover:text-[#ff7415]">
              <i className="fas fa-bars text-2xl" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-white shadow-lg border-t">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <button 
              onClick={() => handleNavigation('#quem-somos')}
              className="block w-full text-left px-3 py-2 text-gray-700 hover:text-[#ff7415]"
            >
              QUEM SOMOS
            </button>
            <button 
              onClick={() => handleNavigation('#atuacao')}
              className="block w-full text-left px-3 py-2 text-gray-700 hover:text-[#ff7415]"
            >
              ÁREAS DE ATUAÇÃO
            </button>
            <Link href="/cursos" className="block px-3 py-2 text-gray-700 hover:text-[#ff7415]" onClick={() => setOpen(false)}>
              CURSOS
            </Link>
            <Link href="/fotos" className="block px-3 py-2 text-gray-700 hover:text-[#ff7415]" onClick={() => setOpen(false)}>
              GALERIA
            </Link>
            <button 
              onClick={() => handleNavigation('#doacao')}
              className="block w-full text-left px-3 py-2 bg-[#ff7415] text-white rounded-md hover:bg-[#e5670d]"
            >
              DOAÇÃO
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}