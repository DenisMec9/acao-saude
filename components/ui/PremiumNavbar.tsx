import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";

type MenuItem = {
  label: string;
  href: string;
  isAnchor?: boolean;
};

const items: MenuItem[] = [
  { label: "Quem Somos", href: "#quem-somos", isAnchor: true },
  { label: "Areas", href: "#atuacao", isAnchor: true },
  { label: "Cursos", href: "/cursos" },
  { label: "Galeria", href: "/fotos" },
];

function resolvePath(routerPath: string, href: string, isAnchor?: boolean) {
  if (!isAnchor) {
    return href;
  }

  if (routerPath === "/") {
    return href;
  }

  return `/${href}`;
}

export default function PremiumNavbar() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 14);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) {
      document.body.style.overflow = "";
      return;
    }
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const navClass = useMemo(
    () =>
      scrolled
        ? "premium-navbar premium-navbar--scrolled"
        : "premium-navbar premium-navbar--top",
    [scrolled]
  );

  return (
    <header className={navClass}>
      <div className="site-container">
        <div className="flex h-[78px] items-center justify-between gap-4">
          <Link
            href="/"
            aria-label="Pagina inicial Acao Saude"
            className="group inline-flex items-center gap-3"
          >
            <span className="premium-logo-mark">
              <Image
                src="/imagens/coracao-laranja.png"
                alt="Simbolo Acao Saude"
                width={44}
                height={34}
                sizes="44px"
                priority
              />
            </span>
            <Image
              src="/imagens/logo-laranja.png"
              alt="Acao Saude"
              width={94}
              height={54}
              sizes="94px"
              priority
              className="transition duration-300 group-hover:translate-x-0.5"
            />
          </Link>

          <nav className="hidden items-center gap-1 rounded-full border border-slate-200/70 bg-white/80 p-1.5 shadow-[0_16px_30px_rgba(2,15,38,0.08)] backdrop-blur-lg lg:flex">
            {items.map((item) => {
              const path = resolvePath(router.pathname, item.href, item.isAnchor);
              const isCurrent =
                (item.isAnchor && router.pathname === "/" && router.asPath.includes(item.href)) ||
                (!item.isAnchor && router.pathname === item.href);

              if (item.isAnchor && router.pathname === "/") {
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    className={`premium-nav-link ${isCurrent ? "premium-nav-link--active" : ""}`}
                  >
                    {item.label}
                  </a>
                );
              }

              return (
                <Link
                  key={item.label}
                  href={path}
                  className={`premium-nav-link ${isCurrent ? "premium-nav-link--active" : ""}`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="hidden lg:block">
            <a
              href={router.pathname === "/" ? "#doacao" : "/#doacao"}
              className="premium-donation-btn"
            >
              Doacao
              <ArrowUpRight size={16} />
            </a>
          </div>

          <button
            onClick={() => setOpen((prev) => !prev)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white/90 text-slate-700 shadow-sm transition hover:text-[#ff7415] lg:hidden"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            aria-expanded={open}
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            className="fixed inset-0 z-[70] bg-slate-950/40 backdrop-blur-sm lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          >
            <motion.aside
              className="absolute right-0 top-0 h-full w-[84%] max-w-sm border-l border-white/30 bg-white/95 p-6 shadow-2xl"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mb-8 flex items-center justify-between">
                <Image
                  src="/imagens/logo-laranja.png"
                  alt="Acao Saude"
                  width={90}
                  height={50}
                />
                <button
                  onClick={() => setOpen(false)}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700"
                  aria-label="Fechar menu"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-2">
                {items.map((item) => {
                  const path = resolvePath(router.pathname, item.href, item.isAnchor);
                  if (item.isAnchor && router.pathname === "/") {
                    return (
                      <a
                        key={item.label}
                        href={item.href}
                        onClick={() => setOpen(false)}
                        className="block rounded-2xl border border-transparent bg-white px-4 py-3.5 text-sm font-semibold text-slate-700 transition hover:border-orange-100 hover:bg-orange-50 hover:text-[#ff7415]"
                      >
                        {item.label}
                      </a>
                    );
                  }

                  return (
                    <Link
                      key={item.label}
                      href={path}
                      onClick={() => setOpen(false)}
                      className="block rounded-2xl border border-transparent bg-white px-4 py-3.5 text-sm font-semibold text-slate-700 transition hover:border-orange-100 hover:bg-orange-50 hover:text-[#ff7415]"
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </div>

              <a
                href={router.pathname === "/" ? "#doacao" : "/#doacao"}
                onClick={() => setOpen(false)}
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#ff7415] to-[#ff9145] px-5 py-3.5 text-sm font-semibold text-white shadow-[0_18px_30px_rgba(255,116,21,0.3)]"
              >
                Apoiar com doacao
                <ArrowUpRight size={16} />
              </a>
            </motion.aside>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
