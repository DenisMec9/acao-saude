import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { FaFacebook, FaInstagram, FaWhatsapp } from "react-icons/fa";

export default function PremiumFooter() {
  return (
    <>
      <a
        href="https://wa.me/5581987455207"
        className="whatsapp-float"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contato via WhatsApp"
      >
        <FaWhatsapp size={24} />
      </a>

      <footer className="premium-footer">
        <div className="site-container">
          <div className="grid gap-10 md:grid-cols-[1.15fr_1.45fr]">
            <div className="max-w-sm">
              <div className="mb-4 flex items-center gap-3">
                <Image
                  src="/imagens/coracao-laranja.png"
                  alt="Acao Saude"
                  width={48}
                  height={48}
                />
                <div>
                  <p className="text-xl font-bold text-white">Acao Saude</p>
                  <p className="text-sm font-medium text-orange-300">Eu faco o bem</p>
                </div>
              </div>
              <p className="text-sm leading-relaxed text-slate-300">
                Acolhimento, saude integral e transformacao social para quem mais
                precisa. Cuidar de gente e o nosso compromisso diario.
              </p>
            </div>

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <div>
                <h3 className="premium-footer-title">Navegacao</h3>
                <ul className="space-y-2 text-sm text-slate-300">
                  <li>
                    <Link href="/#quem-somos" className="premium-footer-link">
                      Quem Somos
                    </Link>
                  </li>
                  <li>
                    <Link href="/#atuacao" className="premium-footer-link">
                      Areas de Atuacao
                    </Link>
                  </li>
                  <li>
                    <Link href="/cursos" className="premium-footer-link">
                      Cursos
                    </Link>
                  </li>
                  <li>
                    <Link href="/fotos" className="premium-footer-link">
                      Galeria
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="premium-footer-title">Contato</h3>
                <ul className="space-y-3 text-sm text-slate-300">
                  <li className="flex items-start gap-2">
                    <MapPin size={15} className="mt-0.5 text-orange-300" />
                    Recife, PE - Brasil
                  </li>
                  <li className="flex items-start gap-2">
                    <Mail size={15} className="mt-0.5 text-orange-300" />
                    contato@acaosaude.org
                  </li>
                  <li className="flex items-start gap-2">
                    <Phone size={15} className="mt-0.5 text-orange-300" />
                    (81) 98745-5207
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="premium-footer-title">Conecte-se</h3>
                <div className="flex items-center gap-3 text-xl">
                  <a
                    href="https://www.facebook.com/acaosaudeeufacoobem?locale=pt_BR"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook"
                    className="premium-social"
                  >
                    <FaFacebook />
                  </a>
                  <a
                    href="https://www.instagram.com/acaosaude_/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    className="premium-social"
                  >
                    <FaInstagram />
                  </a>
                  <a
                    href="https://wa.me/5581987455207"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="WhatsApp"
                    className="premium-social"
                  >
                    <FaWhatsapp />
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-xs text-slate-400 sm:flex-row">
            <p>© 2026 Acao Saude. Todos os direitos reservados.</p>
            <p>Instituto Acao Saude Internacional</p>
          </div>
        </div>
      </footer>
    </>
  );
}
