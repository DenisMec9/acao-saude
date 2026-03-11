import Image from 'next/image';
import { Copy, Mail, MapPin, Phone, HandHeart } from 'lucide-react';
import { FaWhatsapp, FaFacebook, FaInstagram } from 'react-icons/fa';

export default function DoacaoContatoFooter() {
  return (
    <>
      <section id="doacao" className="py-20 bg-gradient-to-br from-[#032a5f] via-[#053980] to-[#0a4ca4] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="section-title text-white mb-4">Faça uma Doação</h2>
            <div className="section-divider" />
          </div>

          <div className="md:flex items-start gap-8">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h3 className="text-2xl md:text-3xl font-bold mb-6">
                Sua contribuição transforma vidas.
              </h3>
              <p className="mb-6 text-blue-100 leading-relaxed">
                Cada doação nos ajuda a levar saúde integral para mais pessoas. Com
                R$50,00 podemos fornecer um kit de higiene básica para uma família.
                Com R$100,00, custeamos uma consulta médica. Com R$500,00,
                realizamos uma oficina de capacitação para 20 pessoas.
              </p>

              <div className="rounded-2xl border border-white/20 bg-white/10 backdrop-blur-md p-5 mb-6">
                <h4 className="font-bold mb-3 flex items-center gap-2">
                  <HandHeart size={18} /> Dados Bancários
                </h4>
                <p className="mb-1"><span className="font-semibold">Banco:</span> Sicredi (748)</p>
                <p className="mb-1"><span className="font-semibold">Agência:</span> 2203</p>
                <p className="mb-1"><span className="font-semibold">Conta:</span> 42.524-9</p>
                <p className="mb-1"><span className="font-semibold">CNPJ:</span> 37.296.007/0001-02</p>
                <p className="mb-1"><span className="font-semibold">PIX:</span> 81987455207</p>
                <p className="mt-3 text-sm text-blue-100">
                  Instituto Ação Saúde Internacional
                </p>
              </div>

              <p className="text-blue-100">
                Todas as doações são fiscalizadas e aplicadas integralmente em nossos
                projetos. Emitimos recibo para dedução no Imposto de Renda.
              </p>
            </div>

            <div className="md:w-1/2">
              <div className="bg-white rounded-2xl shadow-2xl p-8 text-slate-800">
                <h3 className="text-2xl font-bold mb-6 text-[#053980]">Formas de Apoio</h3>

                <div className="mb-6 pb-6 border-b border-slate-200">
                  <h4 className="font-bold text-lg mb-3 text-[#053980]">Doação Financeira</h4>
                  <p className="mb-4">
                    Transferência bancária, PIX ou depósito direto em nossa conta.
                  </p>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText('81987455207');
                      const msg = document.getElementById('pix-copied');
                      if (msg) msg.classList.remove('hidden');
                    }}
                    className="inline-flex items-center gap-2 bg-[#ff7415] text-white px-4 py-2.5 rounded-xl font-semibold hover:bg-[#e5670d] transition duration-300"
                  >
                    <Copy size={18} /> Copiar Chave PIX
                  </button>
                  <p id="pix-copied" className="text-green-600 text-sm mt-2 hidden">
                    Chave PIX copiada!
                  </p>
                </div>

                <div className="mb-6 pb-6 border-b border-slate-200">
                  <h4 className="font-bold text-lg mb-3 text-[#053980]">Doação de Materiais</h4>
                  <p className="mb-3">Aceitamos doações de:</p>
                  <ul className="list-disc pl-5 space-y-1 text-slate-700">
                    <li>Materiais de higiene</li>
                    <li>Medicamentos (com validade)</li>
                    <li>Material escolar</li>
                    <li>Equipamentos médicos</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-bold text-lg mb-3 text-[#053980]">Trabalho Voluntário</h4>
                  <p>
                    Profissionais de saúde, educadores e outros especialistas podem
                    se voluntariar.
                  </p>
                  <a
                    href="https://wa.me/5581987455207"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 mt-4 bg-[#25d366] text-white px-4 py-2.5 rounded-xl font-semibold hover:bg-[#1da851] transition duration-300"
                  >
                    <FaWhatsapp /> Fale conosco no WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <a
        href="https://wa.me/5581987455207"
        className="whatsapp-float"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contato via WhatsApp"
      >
        <FaWhatsapp size={30} />
      </a>

      <footer className="bg-slate-950 text-white py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="md:flex md:justify-between gap-10">
            <div className="mb-8 md:mb-0 max-w-sm">
              <div className="flex items-center gap-3 mb-3">
                <Image src="/imagens/coracao-laranja.png" alt="Logo Ação Saúde" width={48} height={48} />
                <div>
                  <p className="text-xl font-bold">Ação Saúde</p>
                  <p className="text-sm text-[#ff7415]">Eu faço o bem</p>
                </div>
              </div>
              <p className="text-slate-400">
                Levar acesso à saúde integralmente a quem precisa é nossa missão.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-[#ff7415] font-bold mb-4">Links</h3>
                <ul className="space-y-2 text-slate-300">
                  <li><a href="#quem-somos" className="hover:text-white transition">Quem Somos</a></li>
                  <li><a href="#atuacao" className="hover:text-white transition">Áreas de Atuação</a></li>
                  <li><a href="#doacao" className="hover:text-white transition">Doação</a></li>
                </ul>
              </div>

              <div>
                <h3 className="text-[#ff7415] font-bold mb-4">Contato</h3>
                <ul className="space-y-3 text-slate-300">
                  <li className="flex items-start gap-2">
                    <MapPin size={16} className="text-[#ff7415] mt-1" />
                    <span>Recife, PE - Brasil</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Mail size={16} className="text-[#ff7415] mt-1" />
                    <span>contato@acaosaude.org</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Phone size={16} className="text-[#ff7415] mt-1" />
                    <span>(81) 98745-5207</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-[#ff7415] font-bold mb-4">Legal</h3>
                <ul className="space-y-2 text-slate-300">
                  <li><a href="#" className="hover:text-white transition">Termos de Uso</a></li>
                  <li><a href="#" className="hover:text-white transition">Política de Privacidade</a></li>
                  <li><a href="#" className="hover:text-white transition">Transparência</a></li>
                </ul>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-400">© 2026 Ação Saúde. Todos os direitos reservados.</p>
            <div className="flex items-center gap-4 text-2xl text-[#ff7415]">
              <a
                href="https://www.facebook.com/acaosaudeeufacoobem?locale=pt_BR"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook Ação Saúde"
                className="hover:text-[#ffa266] transition"
              >
                <FaFacebook />
              </a>
              <a
                href="https://www.instagram.com/acaosaude_/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram Ação Saúde"
                className="hover:text-[#ffa266] transition"
              >
                <FaInstagram />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
