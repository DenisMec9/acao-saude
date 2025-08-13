import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center gap-3">
              <Image src="/imagens/coracao-laranja.png" alt="Ação Saúde Logo" width={64} height={64} />
              <Image src="/imagens/logo-laranja.png" alt="Logo" width={110} height={32} />
            </div>
          </div>

          {/* Desktop */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            <a href="#quem-somos" className="text-gray-700 hover:text-[#ff7415] px-3 py-2 font-medium">QUEM SOMOS</a>
            <a href="#atuacao" className="text-gray-700 hover:text-[#ff7415] px-3 py-2 font-medium">ÁREAS DE ATUAÇÃO</a>
            <Link href="/fotos" className="text-gray-700 hover:text-[#ff7415] px-3 py-2 font-medium">GALERIA</Link>
            <a href="#doacao" className="bg-[#ff7415] text-white px-4 py-2 rounded-md font-medium hover:bg-[#e5670d] transition">
              DOAÇÃO
            </a>
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
            <a href="#quem-somos" className="block px-3 py-2 text-gray-700 hover:text-[#ff7415]" onClick={() => setOpen(false)}>QUEM SOMOS</a>
            <a href="#atuacao" className="block px-3 py-2 text-gray-700 hover:text-[#ff7415]" onClick={() => setOpen(false)}>ÁREAS DE ATUAÇÃO</a>
            <Link href="/fotos" className="block px-3 py-2 text-gray-700 hover:text-[#ff7415]" onClick={() => setOpen(false)}>GALERIA</Link>
            <a href="#doacao" className="block px-3 py-2 bg-[#ff7415] text-white rounded-md hover:bg-[#e5670d]" onClick={() => setOpen(false)}>
              DOAÇÃO
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
