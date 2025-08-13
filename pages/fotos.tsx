import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState, useCallback } from 'react';

type Foto = { id: string; url: string };

export default function FotosPage() {
  // Ajuste a quantidade conforme suas imagens em /public/imagens
  const fotos: Foto[] = Array.from({ length: 87 }, (_, i) => {
    const n = i + 1;
    return { id: String(n), url: `/imagens/${n}.jpg` };
  });

  const [isOpen, setIsOpen] = useState(false);
  const [current, setCurrent] = useState(0);

  const open = useCallback((idx: number) => {
    setCurrent(idx);
    setIsOpen(true);
    if (typeof document !== 'undefined') document.body.style.overflow = 'hidden';
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
    if (typeof document !== 'undefined') document.body.style.overflow = '';
  }, []);

  const next = useCallback(() => {
    setCurrent((i) => (i + 1) % fotos.length);
  }, [fotos.length]);

  const prev = useCallback(() => {
    setCurrent((i) => (i - 1 + fotos.length) % fotos.length);
  }, [fotos.length]);

  // Teclado: ESC fecha, ← → navega
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, close, next, prev]);

  return (
    <>
      <Head>
        <title>Galeria de Fotos — Ação Saúde</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      {/* Top bar */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b">
        <div className="max-w-7xl mx-auto h-14 px-4 flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-slate-700 hover:text-orange-500 transition"
            aria-label="Voltar para a Home"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                 stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
            <span className="font-medium">Voltar</span>
          </Link>
          <h1 className="text-lg font-semibold">Galeria</h1>
          <span className="w-[68px]" aria-hidden="true"></span>
        </div>
      </header>

      {/* Grid estilo Instagram */}
      <main className="min-h-screen bg-gray-100 py-6 sm:py-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
            {fotos.map((foto, idx) => (
              <button
                key={foto.id}
                onClick={() => open(idx)}
                className="relative aspect-square overflow-hidden rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow group"
                aria-label={`Abrir foto ${idx + 1}`}
              >
                <Image
                  src={foto.url}
                  alt=""
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 20vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  priority={idx < 6}
                />
              </button>
            ))}
          </div>
        </div>
      </main>

      {/* Lightbox */}
      {isOpen && fotos[current] && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          onClick={close} // clique no backdrop
        >
          {/* container para impedir fechar quando clicar na imagem/controles */}
          <div
            className="relative w-full max-w-6xl max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Botão fechar */}
            <button
              onClick={close}
              className="absolute -top-10 right-0 text-white/90 hover:text-white text-3xl"
              aria-label="Fechar"
            >
              ×
            </button>

            {/* Setas */}
            <button
              onClick={prev}
              className="absolute left-0 top-1/2 -translate-y-1/2 p-3 text-white/90 hover:text-white"
              aria-label="Anterior"
            >
              ‹
            </button>
            <button
              onClick={next}
              className="absolute right-0 top-1/2 -translate-y-1/2 p-3 text-white/90 hover:text-white"
              aria-label="Próxima"
            >
              ›
            </button>

            {/* Imagem grande */}
            <img
              src={fotos[current].url}
              alt=""
              className="mx-auto max-h-[90vh] w-auto object-contain rounded"
            />
          </div>
        </div>
      )}
    </>
  );
}
