import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleNavigation = (path) => {
    setOpen(false);

    if (path.startsWith("/")) {
      router.push(path);
      return;
    }

    if (router.pathname === "/") {
      const element = document.querySelector(path);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
      return;
    }

    router.push(`/${path}`);
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/80 backdrop-blur-xl">
      <div className="site-container">
        <div className="flex h-20 items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-3 transition-transform duration-300 hover:scale-[1.01]"
            aria-label="Pagina inicial Acao Saude"
          >
            <Image
              src="/imagens/coracao-laranja.png"
              alt="Acao Saude simbolo"
              width={44}
              height={34}
              sizes="44px"
              quality={60}
              priority
            />
            <Image
              src="/imagens/logo-laranja.png"
              alt="Acao Saude"
              width={90}
              height={52}
              sizes="90px"
              quality={60}
              priority
            />
          </Link>

          <div className="hidden items-center gap-2 rounded-full border border-slate-200/80 bg-white/90 px-3 py-2 shadow-sm md:flex">
            <button
              onClick={() => handleNavigation("#quem-somos")}
              className="rounded-full px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-orange-50 hover:text-[#ff7415]"
            >
              QUEM SOMOS
            </button>
            <button
              onClick={() => handleNavigation("#atuacao")}
              className="rounded-full px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-orange-50 hover:text-[#ff7415]"
            >
              AREAS DE ATUACAO
            </button>
            <Link
              href="/cursos"
              className="rounded-full px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-orange-50 hover:text-[#ff7415]"
            >
              CURSOS
            </Link>
            <Link
              href="/fotos"
              className="rounded-full px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-orange-50 hover:text-[#ff7415]"
            >
              GALERIA
            </Link>
            <button
              onClick={() => handleNavigation("#doacao")}
              className="rounded-full bg-[#ff7415] px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-orange-200/70 transition hover:-translate-y-0.5 hover:bg-[#e5670d]"
            >
              DOACAO
            </button>
          </div>

          <div className="flex items-center md:hidden">
            <button
              aria-label="Abrir menu"
              onClick={() => setOpen(!open)}
              className="rounded-xl border border-slate-200 bg-white p-2 text-slate-700 transition hover:text-[#ff7415]"
            >
              {open ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {open ? (
        <div className="border-t border-slate-100 bg-white/95 shadow-lg backdrop-blur-xl md:hidden">
          <div className="site-container space-y-2 px-1 py-4">
            <button
              onClick={() => handleNavigation("#quem-somos")}
              className="block w-full rounded-xl px-4 py-3 text-left text-sm font-semibold text-slate-700 transition hover:bg-orange-50 hover:text-[#ff7415]"
            >
              QUEM SOMOS
            </button>
            <button
              onClick={() => handleNavigation("#atuacao")}
              className="block w-full rounded-xl px-4 py-3 text-left text-sm font-semibold text-slate-700 transition hover:bg-orange-50 hover:text-[#ff7415]"
            >
              AREAS DE ATUACAO
            </button>
            <Link
              href="/cursos"
              className="block rounded-xl px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-orange-50 hover:text-[#ff7415]"
              onClick={() => setOpen(false)}
            >
              CURSOS
            </Link>
            <Link
              href="/fotos"
              className="block rounded-xl px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-orange-50 hover:text-[#ff7415]"
              onClick={() => setOpen(false)}
            >
              GALERIA
            </Link>
            <button
              onClick={() => handleNavigation("#doacao")}
              className="block w-full rounded-xl bg-[#ff7415] px-4 py-3 text-left text-sm font-semibold text-white transition hover:bg-[#e5670d]"
            >
              DOACAO
            </button>
          </div>
        </div>
      ) : null}
    </nav>
  );
}
