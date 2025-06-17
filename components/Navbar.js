export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-6 md:px-16 py-4 bg-white shadow-md fixed top-0 w-full z-50">
      <div className="flex items-center gap-2">
        <img src="/imagens/logo-laranja.png" alt="Logo" className="h-10 w-auto" />
        <div className="text-orange-500 font-bold text-xl leading-tight -ml-1">
          Ação <span className="text-[#ff6600]">Saúde</span>
          <div className="text-xs text-orange-500 font-medium">eu faço o bem</div>
        </div>
      </div>
      <div className="hidden md:flex items-center gap-6 text-sm font-medium">
        <a href="#quem-somos" className="text-gray-800 hover:text-orange-500 transition">QUEM SOMOS</a>
        <a href="#atuacao" className="text-gray-800 hover:text-orange-500 transition">ÁREAS DE ATUAÇÃO</a>
        <a href="#doacao" className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition">
          DOAÇÃO
        </a>
      </div>
    </nav>
  );
}
