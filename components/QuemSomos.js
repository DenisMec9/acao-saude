import Image from 'next/image';

export default function QuemSomos() {
  return (
    <section id="quem-somos" className="py-20 bg-white mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">O que é o Ação Saúde?</h2>
          <div className="w-20 h-1 bg-[#ff7415] mx-auto"></div>
        </div>

        <div className="md:flex items-center">
          <div className="md:w-1/2 mb-10 md:mb-0 md:pr-10">
            <Image
              src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1170&q=80"
              alt="Médico atendendo paciente"
              width={600}
              height={400}
              className="rounded-lg shadow-lg w-full"
            />
          </div>
          <div className="md:w-1/2">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">
              O que é o Instituto Ação Saúde Internacional?
            </h3>
            <p className="text-gray-700 mb-6 text-lg">
              O <span className="font-bold text-[#053980]">Instituto Ação Saúde</span> é um órgão não governamental, com o propósito de levar acesso à saúde integralmente à quem precisa.
            </p>
            <div className="bg-[#ff7415] bg-opacity-10 border-l-4 border-[#ff7415] p-4 rounded mb-6">
              <p className="text-[#053980] font-medium italic">
                "Eu faço o bem" - Nosso lema que inspira cada ação e cada voluntário em nossa organização.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
