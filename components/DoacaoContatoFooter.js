import { FaWhatsapp, FaInstagram, FaFacebook } from "react-icons/fa";

export default function DoacaoContatoFooter() {
  return (
    <>
      {/* DOAÇÃO */}
      <section id="doacao" className="bg-[#003b87] text-white py-20 px-6 md:px-16">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Faça uma Doação</h2>
          <div className="w-20 h-1 bg-white mx-auto mb-10" />

          <div className="md:flex gap-8">
            {/* Texto Principal */}
            <div className="flex-1">
              <h3 className="text-xl font-bold text-white mb-4">DOAÇÃO</h3>
              <p className="mb-6 leading-relaxed">
                Você também pode <span className="text-[#ff7415] font-semibold">ajudar</span> o Instituto Ação Saúde Internacional a fazer o bem! <span className="text-[#ff7415] font-semibold italic">Doe qualquer valor</span>.
              </p>

              <div className="bg-white text-[#003b87] rounded-lg p-6 mb-8">
                <h4 className="text-lg font-bold mb-2">Dados Bancários</h4>
                <p><strong>Banco:</strong> Sicredi (748)</p>
                <p><strong>Agência:</strong> 2203</p>
                <p><strong>Conta:</strong> 42.524-9</p>
                <p><strong>CNPJ:</strong> 37.296.007/0001-02</p>
                <p><strong>PIX:</strong> 81987455207</p>
                <p className="mt-2 text-sm">Instituto Ação Saúde Internacional</p>
              </div>

              <p className="text-sm text-gray-300">
                Todas as doações são fiscalizadas e aplicadas integralmente em nossos projetos. Emitimos recibo para dedução no Imposto de Renda.
              </p>
            </div>

            {/* Card lateral */}
            <div className="bg-white text-[#003b87] rounded-lg p-6 mt-10 md:mt-0 md:w-80">
              <h4 className="text-xl font-bold mb-4">Formas de Apoio</h4>

              <div className="mb-6">
                <h5 className="font-semibold text-md mb-2">Doação Financeira</h5>
                <p className="mb-2 text-sm">Transferência bancária, PIX ou depósito direto em nossa conta.</p>
                <button
  onClick={() => {
    navigator.clipboard.writeText("81987455207");
    alert("Chave PIX copiada com sucesso!");
  }}
  className="bg-[#ff7415] text-white font-semibold px-4 py-2 rounded hover:bg-[#e5670d] transition"
>
  📋 Copiar Chave PIX
</button>
</div>
              <div className="mb-6">
                <h5 className="font-semibold text-md mb-2">Doação de Materiais</h5>
                <ul className="list-disc list-inside text-sm space-y-1">
                  <li>Materiais de higiene</li>
                  <li>Medicamentos (com validade)</li>
                  <li>Material escolar</li>
                  <li>Equipamentos médicos</li>
                </ul>
              </div>

              <div>
                <h5 className="font-semibold text-md mb-2">Trabalho Voluntário</h5>
                <p className="text-sm">
                  Profissionais de saúde, educadores e outros especialistas podem se voluntariar.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTATO */}
      <section id="contato" className="py-20 bg-white px-6 md:px-16">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4 text-gray-900">Entre em Contato</h2>
          <div className="w-20 h-1 bg-[#ff7415] mx-auto mb-8" />

          <h3 className="text-xl font-semibold mb-2">Fale Conosco</h3>
          <p className="text-gray-700 mb-8">
            Tem dúvidas, quer ser um voluntário ou discutir uma possível parceria? Entre em contato diretamente pelos nossos canais.
          </p>

          <div className="grid md:grid-cols-3 gap-8 text-left">
            <div>
              <p className="font-semibold text-gray-800 mb-2">Endereço</p>
              <p className="text-gray-600">Empresarial Ubaias</p>
              <p className="text-gray-600">Estrada das Ubaias, 20</p>
              <p className="text-gray-600">6° Andar Sl: 602 - Casa Forte</p>
              <p className="text-gray-600">Recife, PE - Brasil</p>
            </div>
            <div>
              <p className="font-semibold text-gray-800 mb-2">Email</p>
              <p className="text-gray-600">contato@acaosaude.org</p>

              <p className="font-semibold text-gray-800 mt-4 mb-2">Telefone</p>
              <p className="text-gray-600">(81) 98745-5207</p>
            </div>
            <div>
              <p className="font-semibold text-gray-800 mb-2">Siga-nos</p>
              <div className="flex gap-4 text-[#ff7415] text-2xl">
                <a href="https://facebook.com/acaosaudeeufacoobem" target="_blank"><FaFacebook /></a>
                <a href="https://instagram.com/acaosaude_" target="_blank"><FaInstagram /></a>
              </div>
            </div>
          </div>

          <a
            href="https://wa.me/5581987455207"
            target="_blank"
            rel="noreferrer"
            className="mt-10 inline-block bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-3 rounded shadow"
          >
            Fale conosco no WhatsApp
          </a>
        </div>
      </section>
      
      <a
        href="https://wa.me/5581987455207"
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 right-6 z-50"
      >
        <div className="bg-green-500 hover:bg-green-600 p-4 rounded-full shadow-lg text-white text-2xl">
          <FaWhatsapp />
        </div>
      </a>

      {/* FOOTER */}
      <footer className="bg-[#0e1528] text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="md:flex md:justify-between md:items-start gap-12">
            {/* Logo + Missão */}
            <div className="mb-10 md:mb-0 max-w-sm">
              <div className="flex items-center gap-2 mb-2">
                <img src="/imagens/coracao-laranja.png" alt="Logo" className="h-8" />
                <span className="font-bold text-lg">Ação Saúde</span>
                <span className="text-sm text-[#ff7415] ml-1">Eu faço o bem</span>
              </div>
              <p className="text-gray-400">
                Levar acesso à saúde integralmente à quem precisa é nossa missão.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-10 text-sm">
              <div>
                <h3 className="text-[#ff7415] font-bold mb-3">Links</h3>
                <ul className="space-y-2">
                  <li><a href="#quem-somos" className="hover:text-white">Quem Somos</a></li>
                  <li><a href="#atuacao" className="hover:text-white">Áreas de Atuação</a></li>
                  <li><a href="#doacao" className="hover:text-white">Doação</a></li>
                </ul>
              </div>
              <div>
                <h3 className="text-[#ff7415] font-bold mb-3">Contato</h3>
                <ul className="space-y-2 text-gray-400">
                  <li className="flex items-start">📍 Empresarial Ubaias - Estrada das Ubaias, 20 - Sl 602 - Casa Forte</li>
                  <li className="flex items-start">✉️ contato@acaosaude.org</li>
                  <li className="flex items-start">📞 (81) 98745-5207</li>
                </ul>
              </div>
              <div>
                <h3 className="text-[#ff7415] font-bold mb-3">Legal</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="hover:text-white">Termos de Uso</a></li>
                  <li><a href="#" className="hover:text-white">Política de Privacidade</a></li>
                  <li><a href="#" className="hover:text-white">Transparência</a></li>
                </ul>
              </div>
            </div>
          </div>

          <hr className="my-8 border-gray-700" />

          <div className="md:flex justify-between items-center text-sm text-gray-400">
            <p>© 2025 Ação Saúde. Todos os direitos reservados.</p>
            <div className="flex items-center gap-4 mt-4 md:mt-0">
              <span className="text-gray-500 font-semibold">Siga-nos</span>
              <a href="https://facebook.com/acaosaudeeufacoobem" className="text-[#ff7415] text-xl" target="_blank"><FaFacebook /></a>
              <a href="https://instagram.com/acaosaude_" className="text-[#ff7415] text-xl" target="_blank"><FaInstagram /></a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
