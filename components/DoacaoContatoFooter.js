import Image from "next/image";
import { Copy, Mail, MapPin, Phone, HandHeart } from "lucide-react";
import { FaWhatsapp, FaFacebook, FaInstagram } from "react-icons/fa";

export default function DoacaoContatoFooter() {
  return (
    <>
      <section
        id="doacao"
        className="bg-gradient-to-br from-[#032a5f] via-[#053980] to-[#0a4ca4] py-16 text-white md:py-20"
      >
        <div className="site-container">
          <div className="mb-12 text-center">
            <h2 className="section-title mb-4 text-white">Faca uma Doacao</h2>
            <div className="section-divider" />
          </div>

          <div className="grid items-start gap-7 md:grid-cols-2 md:gap-8">
            <div>
              <h3 className="mb-5 text-2xl font-bold md:text-3xl">
                Sua contribuicao transforma vidas.
              </h3>
              <p className="mb-6 leading-relaxed text-blue-100">
                Cada doacao ajuda a ampliar acesso a saude. Com R$50,00 podemos
                fornecer kit de higiene para uma familia. Com R$100,00,
                custeamos uma consulta. Com R$500,00, realizamos uma oficina de
                capacitacao para 20 pessoas.
              </p>

              <div className="mb-6 rounded-2xl border border-white/20 bg-white/10 p-5 backdrop-blur-md">
                <h4 className="mb-3 flex items-center gap-2 font-bold">
                  <HandHeart size={18} /> Dados Bancarios
                </h4>
                <p className="mb-1">
                  <span className="font-semibold">Banco:</span> Sicredi (748)
                </p>
                <p className="mb-1">
                  <span className="font-semibold">Agencia:</span> 2203
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
                <p className="mt-3 text-sm text-blue-100">
                  Instituto Acao Saude Internacional
                </p>
              </div>

              <p className="text-blue-100">
                As doacoes sao fiscalizadas e aplicadas nos projetos da
                instituicao.
              </p>
            </div>

            <div className="surface-card-strong rounded-2xl p-7 text-slate-800">
              <h3 className="mb-6 text-2xl font-bold text-[#053980]">
                Formas de Apoio
              </h3>

              <div className="mb-6 border-b border-slate-200 pb-6">
                <h4 className="mb-3 text-lg font-bold text-[#053980]">
                  Doacao Financeira
                </h4>
                <p className="mb-4">
                  Transferencia bancaria, PIX ou deposito direto.
                </p>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText("81987455207");
                    const msg = document.getElementById("pix-copied");
                    if (msg) {
                      msg.classList.remove("hidden");
                    }
                  }}
                  className="inline-flex items-center gap-2 rounded-xl bg-[#ff7415] px-4 py-2.5 font-semibold text-white transition duration-300 hover:bg-[#e5670d]"
                >
                  <Copy size={18} /> Copiar chave PIX
                </button>
                <p id="pix-copied" className="mt-2 hidden text-sm text-green-600">
                  Chave PIX copiada!
                </p>
              </div>

              <div className="mb-6 border-b border-slate-200 pb-6">
                <h4 className="mb-3 text-lg font-bold text-[#053980]">
                  Doacao de Materiais
                </h4>
                <p className="mb-3">Aceitamos:</p>
                <ul className="list-disc space-y-1 pl-5 text-slate-700">
                  <li>Materiais de higiene</li>
                  <li>Medicamentos com validade</li>
                  <li>Material escolar</li>
                  <li>Equipamentos medicos</li>
                </ul>
              </div>

              <div>
                <h4 className="mb-3 text-lg font-bold text-[#053980]">
                  Trabalho Voluntario
                </h4>
                <p>
                  Profissionais de saude, educadores e especialistas podem se
                  voluntariar.
                </p>
                <a
                  href="https://wa.me/5581987455207"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-2 rounded-xl bg-[#25d366] px-4 py-2.5 font-semibold text-white transition duration-300 hover:bg-[#1da851]"
                >
                  <FaWhatsapp /> Fale conosco no WhatsApp
                </a>
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
        <FaWhatsapp size={26} />
      </a>

      <footer className="bg-slate-950 py-14 text-white">
        <div className="site-container">
          <div className="grid gap-10 md:grid-cols-[1.1fr_1.4fr]">
            <div className="max-w-sm">
              <div className="mb-3 flex items-center gap-3">
                <Image
                  src="/imagens/coracao-laranja.png"
                  alt="Logo Acao Saude"
                  width={48}
                  height={48}
                />
                <div>
                  <p className="text-xl font-bold">Acao Saude</p>
                  <p className="text-sm text-[#ff7415]">Eu faco o bem</p>
                </div>
              </div>
              <p className="text-slate-400">
                Levamos acesso a saude com cuidado integral e acao social.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
              <div>
                <h3 className="mb-4 font-bold text-[#ff7415]">Links</h3>
                <ul className="space-y-2 text-slate-300">
                  <li>
                    <a href="#quem-somos" className="transition hover:text-white">
                      Quem Somos
                    </a>
                  </li>
                  <li>
                    <a href="#atuacao" className="transition hover:text-white">
                      Areas de Atuacao
                    </a>
                  </li>
                  <li>
                    <a href="#doacao" className="transition hover:text-white">
                      Doacao
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="mb-4 font-bold text-[#ff7415]">Contato</h3>
                <ul className="space-y-3 text-slate-300">
                  <li className="flex items-start gap-2">
                    <MapPin size={16} className="mt-1 text-[#ff7415]" />
                    <span>Recife, PE - Brasil</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Mail size={16} className="mt-1 text-[#ff7415]" />
                    <span>contato@acaosaude.org</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Phone size={16} className="mt-1 text-[#ff7415]" />
                    <span>(81) 98745-5207</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="mb-4 font-bold text-[#ff7415]">Legal</h3>
                <ul className="space-y-2 text-slate-300">
                  <li>
                    <a href="#" className="transition hover:text-white">
                      Termos de Uso
                    </a>
                  </li>
                  <li>
                    <a href="#" className="transition hover:text-white">
                      Politica de Privacidade
                    </a>
                  </li>
                  <li>
                    <a href="#" className="transition hover:text-white">
                      Transparencia
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-slate-800 pt-8 md:flex-row">
            <p className="text-center text-slate-400 md:text-left">
              © 2026 Acao Saude. Todos os direitos reservados.
            </p>
            <div className="flex items-center gap-4 text-2xl text-[#ff7415]">
              <a
                href="https://www.facebook.com/acaosaudeeufacoobem?locale=pt_BR"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook Acao Saude"
                className="transition hover:text-[#ffa266]"
              >
                <FaFacebook />
              </a>
              <a
                href="https://www.instagram.com/acaosaude_/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram Acao Saude"
                className="transition hover:text-[#ffa266]"
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
