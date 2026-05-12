import { Copy, HandHeart } from "lucide-react";
import Reveal from "@/components/ui/Reveal";

export default function DonationSection() {
  return (
    <section id="doacao" className="section-shell donation-shell">
      <div className="site-container">
        <Reveal className="section-header">
          <p className="section-kicker text-orange-200">Apoio institucional</p>
          <h2 className="section-title text-white">Faca uma Doacao</h2>
          <p className="section-subtitle text-blue-100">
            Sua contribuicao fortalece projetos de saude e desenvolvimento
            comunitario com transparencia e impacto mensuravel.
          </p>
        </Reveal>

        <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <Reveal>
            <div className="donation-panel">
              <h3 className="donation-title">
                Sua ajuda vira cuidado para quem precisa.
              </h3>
              <p className="donation-text">
                Com sua doacao, ampliamos atendimentos, formacao e acoes
                comunitarias com foco em saude integral.
              </p>
              <ul className="donation-impact-list">
                <li>R$ 50 financia kit basico de higiene para familia.</li>
                <li>R$ 100 apoia consulta e orientacao em saude.</li>
                <li>R$ 500 viabiliza oficina para 20 pessoas.</li>
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="donation-bank-card">
              <h3 className="mb-4 inline-flex items-center gap-2 text-lg font-bold text-[#053980]">
                <HandHeart size={18} /> Dados para doacao
              </h3>

              <div className="space-y-2 text-sm text-slate-700">
                <p>
                  <strong>Banco:</strong> Sicredi (748)
                </p>
                <p>
                  <strong>Agencia:</strong> 2203
                </p>
                <p>
                  <strong>Conta:</strong> 42.524-9
                </p>
                <p>
                  <strong>CNPJ:</strong> 37.296.007/0001-02
                </p>
                <p>
                  <strong>PIX:</strong> 81987455207
                </p>
              </div>

              <button
                onClick={() => {
                  navigator.clipboard.writeText("81987455207");
                  const msg = document.getElementById("pix-feedback");
                  if (msg) {
                    msg.classList.remove("hidden");
                  }
                }}
                className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#ff7415] px-4 py-2.5 font-semibold text-white transition hover:bg-[#e5670d]"
              >
                <Copy size={16} />
                Copiar chave PIX
              </button>
              <p id="pix-feedback" className="mt-2 hidden text-sm text-emerald-600">
                Chave copiada com sucesso.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
