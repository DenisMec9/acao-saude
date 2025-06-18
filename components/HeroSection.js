export default function HeroSection() {
  return (
    <section className="hero-gradient text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        <div className="md:flex items-center">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
              Ação Saúde
              <br />
              <span className="text-[#ffd1a8]">Eu faço o bem</span>
            </h1>
            <p className="text-xl mb-8">
              Levar acesso à saúde integralmente à quem precisa é nossa missão.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <a
                href="#doacao"
                className="bg-white text-[#053980] px-6 py-3 rounded-md font-bold text-center hover:bg-gray-100 transition duration-300 pulse"
              >
                <i className="fas fa-hand-holding-heart mr-2" /> Faça uma doação
              </a>
              <a
                href="#atuacao"
                className="border-2 border-white text-white px-6 py-3 rounded-md font-bold text-center hover:bg-white hover:bg-opacity-20 transition duration-300"
              >
                <i className="fas fa-hands-helping mr-2" /> Conheça nossas ações
              </a>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <img
              src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
              alt="Equipe médica atendendo comunidade"
              className="rounded-lg shadow-2xl floating max-w-md w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

