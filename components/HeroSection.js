export default function HeroSection() {
  return (
    <section className="bg-[#003b87] text-white py-20 px-6 md:px-16 flex flex-col md:flex-row items-center justify-between gap-12">
      {/* Texto */}
      <div className="flex-1">
        <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
          Ação Saúde <br />
          <span className="text-orange-300">Eu faço o bem</span>
        </h1>
        <p className="text-lg mb-6 max-w-md">
          Levar acesso à saúde integralmente à quem precisa é nossa missão.
        </p>
        <div className="flex gap-4 flex-wrap">
          <a
            href="#doacao"
            className="bg-white text-blue-900 font-semibold flex items-center gap-2 px-5 py-3 rounded shadow hover:bg-gray-100 transition"
          >
            <span className="text-lg">💖</span>
            Faça uma doação
          </a>
          <a
            href="#atuacao"
            className="border border-white text-white font-semibold flex items-center gap-2 px-5 py-3 rounded hover:bg-white hover:text-blue-900 transition"
          >
            <span className="text-lg">🤝</span>
            Conheça nossas ações
          </a>
        </div>
      </div>

      {/* Imagem */}
      <div className="flex-1">
        <img
          src="/imagens/hero.jpg"
          alt="Imagem ilustrativa"
          className="rounded-lg shadow-lg w-full max-w-md mx-auto"
        />
      </div>
    </section>
  );
}
