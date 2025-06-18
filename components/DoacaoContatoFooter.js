export default function DoacaoContatoFooter() {
  return (
    <>
      {/* SEÇÃO DOAÇÃO */}
      <section id="doacao" className="py-20 bg-[#053980] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Faça uma Doação</h2>
            <div className="w-20 h-1 bg-white mx-auto" />
          </div>
          <div className="md:flex items-center">
            <div className="md:w-1/2 mb-10 md:mb-0 md:pr-10">
              <h3 className="text-2xl font-bold mb-6">
                Sua contribuição transforma vidas!
              </h3>
              <p className="mb-6 text-blue-100">
                Cada doação nos ajuda a levar saúde integral para mais pessoas. Com
                R$50,00 podemos fornecer um kit de higiene básica para uma família.
                Com R$100,00, custeamos uma consulta médica. Com R$500,00,
                realizamos uma oficina de capacitação para 20 pessoas.
              </p>
              <div className="bg-[#0a4da8] p-4 rounded-lg mb-6">
                <h4 className="font-bold mb-2">Dados Bancários</h4>
                <p className="mb-1">
                  <span className="font-semibold">Banco:</span> Sicredi (748)
                </p>
                <p className="mb-1">
                  <span className="font-semibold">Agência:</span> 2203
                </p>
                <p className="mb-1">
                  <span className="font-semibold">Conta:</span> 42.524-9
                </p>
                <p className="mb-1">
                  <span className="font-semibold">CNPJ:</span> 37.296.007/0001-02
                </p>
                <p className="mb-1">
                  <span className="font-semibold">PIX:</span> 81987455207
                </p>
                <p className="mt-3 text-sm text-blue-200">
                  Instituto Ação Saúde Internacional
                </p>
              </div>
              <p className="text-blue-100">
                Todas as doações são fiscalizadas e aplicadas integralmente em
                nossos projetos. Emitimos recibo para dedução no Imposto de Renda.
              </p>
            </div>

            <div className="md:w-1/2">
              <div className="bg-white rounded-lg shadow-xl p-8 text-gray-800">
                <h3 className="text-2xl font-bold mb-6 text-[#053980]">
                  Formas de Apoio
                </h3>

                <div className="mb-6">
                  <h4 className="font-bold text-lg mb-3 text-[#053980]">
                    Doação Financeira
                  </h4>
                  <p className="mb-4">
                    Transferência bancária, PIX ou depósito direto em nossa conta.
                  </p>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText('81987455207');
                      const msg = document.getElementById('pix-copied');
                      if (msg) msg.classList.remove('hidden');
                    }}
                    className="bg-[#ff7415] text-white px-4 py-2 rounded-md font-medium hover:bg-[#e5670d] transition duration-300"
                  >
                    <i className="fas fa-copy mr-2" /> Copiar Chave PIX
                  </button>
                  <p
                    id="pix-copied"
                    className="text-green-600 text-sm mt-2 hidden"
                  >
                    Chave PIX copiada!
                  </p>
                </div>

                <div className="mb-6">
                  <h4 className="font-bold text-lg mb-3 text-[#053980]">
                    Doação de Materiais
                  </h4>
                  <p className="mb-2">Aceitamos doações de:</p>
                  <ul className="list-disc pl-5">
                    <li>Materiais de higiene</li>
                    <li>Medicamentos (com validade)</li>
                    <li>Material escolar</li>
                    <li>Equipamentos médicos</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-bold text-lg mb-3 text-[#053980]">
                    Trabalho Voluntário
                  </h4>
                  <p>
                    Profissionais de saúde, educadores e outros especialistas podem
                    se voluntariar.
                  </p>
                  <a
                    href="https://wa.me/5581987455207"
                    className="inline-block mt-4 bg-[#25d366] text-white px-4 py-2 rounded-md font-medium hover:bg-[#1da851] transition duration-300"
                  >
                    <i className="fab fa-whatsapp mr-2" /> Fale conosco no WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BOTÃO FLOTANTE WHATSAPP */}
      <a
        href="https://wa.me/5581987455207"
        className="whatsapp-float"
        target="_blank"
      >
        <i className="fab fa-whatsapp" />
      </a>

      {/* FOOTER + CONTATO */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="md:flex md:justify-between">
            <div className="mb-8 md:mb-0">
              <div className="flex-shrink-0 flex items-center">
                <img
                  src="imagens/Coração Laranja.png"
                  alt="Ação Saúde Logo"
                  className="h-12"
                />
                <span className="text-xl font-bold">Ação Saúde</span>
                <span className="ml-2 text-sm text-[#ff7415]">Eu faço o bem</span>
              </div>
              <p className="text-gray-400 max-w-xs">
                Levar acesso à saúde integralmente à quem precisa é nossa missão.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-[#ff7415] font-bold mb-4">Links</h3>
                <ul className="space-y-2">
                  <li>
                    <a
                      href="#quem-somos"
                      className="text-gray-400 hover:text-white transition duration-300"
                    >
                      Quem Somos
                    </a>
                  </li>
                  <li>
                    <a
                      href="#atuacao"
                      className="text-gray-400 hover:text-white transition duration-300"
                    >
                      Áreas de Atuação
                    </a>
                  </li>
                  <li>
                    <a
                      href="#doacao"
                      className="text-gray-400 hover:text-white transition duration-300"
                    >
                      Doação
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-[#ff7415] font-bold mb-4">Contato</h3>
                <ul className="space-y-2 text-gray-400">
                  <li className="flex items-start">
                    <i className="fas fa-map-marker-alt text-[#ff7415] mr-2 mt-1" />
                    <span>Recife, PE - Brasil</span>
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-envelope text-[#ff7415] mr-2 mt-1" />
                    <span>contato@acaosaude.org</span>
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-phone text-[#ff7415] mr-2 mt-1" />
                    <span>(81) 98745-5207</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-[#ff7415] font-bold mb-4">Legal</h3>
                <ul className="space-y-2">
                  <li>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-white transition duration-300"
                    >
                      Termos de Uso
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-white transition duration-300"
                    >
                      Política de Privacidade
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-white transition duration-300"
                    >
                      Transparência
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 mb-4 md:mb-0">
              © 2025 Ação Saúde. Todos os direitos reservados.
            </p>
            <div className="mt-8">
              <h4 className="font-bold text-gray-800 mb-4">Siga-nos</h4>
              <div className="flex space-x-4">
                <a
                  href="https://www.facebook.com/acaosaudeeufacoobem?locale=pt_BR"
                  className="text-[#ff7415] hover:text-[#e5670d] text-2xl"
                  target="_blank"
                >
                  <i className="fab fa-facebook" />
                </a>
                <a
                  href="https://www.instagram.com/acaosaude_/"
                  className="text-[#ff7415] hover:text-[#e5670d] text-2xl"
                  target="_blank"
                >
                  <i className="fab fa-instagram" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
