import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState, useCallback } from 'react';
import Parse from '../lib/parseConfig';

type Foto = {
  id: string;
  url: string;
  titulo: string;
  descricao: string;
};

type PObj = {
  id: string;
  get: (key: string) => any;
};

export default function FotosPage() {
  const [fotos, setFotos] = useState<Foto[]>([]);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [current, setCurrent] = useState(0);

  // BUSCAR FOTOS DO PARSE (não mais imagens estáticas)
  useEffect(() => {
    async function fetchFotos() {
      try {
        const GaleriaClass = Parse.Object.extend("Galeria");
        const query = new Parse.Query(GaleriaClass);
        query.descending("createdAt");

        const results = (await query.find()) as unknown as PObj[];

        const mapped: Foto[] = results
          .map((obj: PObj) => ({
            id: obj.id,
            url: obj.get("imagem")?.url() || "",
            titulo: obj.get("titulo") || "",
            descricao: obj.get("descricao") || "",
          }))
          .filter((f: Foto) => Boolean(f.url));

        setFotos(mapped);
      } catch (e) {
        console.error("Erro ao carregar galeria:", e);
      } finally {
        setLoading(false);
      }
    }

    fetchFotos();
  }, []);

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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-lg text-gray-600">Carregando galeria...</div>
      </div>
    );
  }

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
          {fotos.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-500 text-lg">Nenhuma foto na galeria ainda.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {fotos.map((foto, idx) => (
                <button
                  key={foto.id}
                  onClick={() => open(idx)}
                  className="group relative aspect-square sm:aspect-[4/5] md:aspect-square overflow-hidden rounded-2xl bg-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-orange-500/30"
                  aria-label={`Abrir foto ${foto.titulo || idx + 1}`}
                >
                  <Image
                    src={foto.url}
                    alt={foto.titulo || `Foto ${idx + 1}`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    priority={idx < 6}
                  />

                  {/* Overlay Hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5 text-left">
                    <h3 className="text-white font-bold text-lg translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      {foto.titulo || 'Momento Especial'}
                    </h3>
                    {foto.descricao && (
                      <p className="text-gray-200 text-sm mt-1 translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75 line-clamp-2">
                        {foto.descricao}
                      </p>
                    )}
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Lightbox */}
      {isOpen && fotos[current] && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          onClick={close}
        >
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
              alt={fotos[current].titulo || `Foto ${current + 1}`}
              className="mx-auto max-h-[90vh] w-auto object-contain rounded"
            />

            {/* Informações da foto (opcional) */}
            {(fotos[current].titulo || fotos[current].descricao) && (
              <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white p-4">
                {fotos[current].titulo && (
                  <h3 className="font-semibold text-lg">{fotos[current].titulo}</h3>
                )}
                {fotos[current].descricao && (
                  <p className="text-sm mt-1">{fotos[current].descricao}</p>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
} 