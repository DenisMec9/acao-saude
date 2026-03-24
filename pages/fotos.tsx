import Head from 'next/head';
import Image from 'next/image';
import { useEffect, useState, useCallback } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import Parse from '../lib/parseConfig';
import Navbar from '../components/Navbar';

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

export default function FotosPage({ fotos }: { fotos: Foto[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const [current, setCurrent] = useState(0);

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.acaosaude.org.br';
  const pageUrl = `${siteUrl}/fotos`;
  const seoTitle = 'Galeria de Fotos | Acao Saude';
  const seoDescription =
    'Veja registros das acoes, projetos e iniciativas da Acao Saude em diferentes comunidades.';

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

  // Teclado: ESC fecha, esquerda/direita navega
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
        <title>{seoTitle}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content={seoDescription} key="description" />
        <meta name="robots" content="index,follow" key="robots" />
        <link rel="canonical" href={pageUrl} key="canonical" />
        <meta property="og:title" content={seoTitle} key="og:title" />
        <meta property="og:description" content={seoDescription} key="og:description" />
        <meta property="og:url" content={pageUrl} key="og:url" />
        <meta property="og:type" content="website" key="og:type" />
        <meta name="twitter:title" content={seoTitle} key="twitter:title" />
        <meta name="twitter:description" content={seoDescription} key="twitter:description" />
      </Head>

      <Navbar />

      <main className="min-h-screen pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
          <div className="text-center mb-10 animate-fade-in">
            <h1 className="section-title mb-4">Nossa Galeria</h1>
            <div className="section-divider mb-5" />
            <p className="section-subtitle">
              Confira os momentos especiais das nossas acoes e projetos sociais.
            </p>
          </div>

          {fotos.length === 0 ? (
            <div className="surface-card rounded-2xl text-center py-20">
              <p className="text-slate-500 text-lg">Nenhuma foto na galeria ainda.</p>
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

      {isOpen && fotos[current] && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          onClick={close}
        >
          <div className="relative w-full max-w-6xl max-h-[90vh]" onClick={(e) => e.stopPropagation()}>
            {/* Botao fechar */}
            <button
              onClick={close}
              className="absolute -top-12 right-0 rounded-full p-2 text-white/90 hover:text-white hover:bg-white/10 transition"
              aria-label="Fechar"
            >
              <X size={26} />
            </button>

            {/* Setas */}
            <button
              onClick={prev}
              className="absolute left-0 top-1/2 -translate-y-1/2 p-3 text-white/90 hover:text-white hover:bg-white/10 rounded-full transition"
              aria-label="Anterior"
            >
              <ChevronLeft size={28} />
            </button>
            <button
              onClick={next}
              className="absolute right-0 top-1/2 -translate-y-1/2 p-3 text-white/90 hover:text-white hover:bg-white/10 rounded-full transition"
              aria-label="Proxima"
            >
              <ChevronRight size={28} />
            </button>

            {/* Imagem grande */}
            <img
              src={fotos[current].url}
              alt={fotos[current].titulo || `Foto ${current + 1}`}
              width={1600}
              height={1200}
              className="mx-auto max-h-[90vh] w-auto object-contain rounded"
            />

            {/* Informacoes da foto (opcional) */}
            {(fotos[current].titulo || fotos[current].descricao) && (
              <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white p-4">
                {fotos[current].titulo && <h3 className="font-semibold text-lg">{fotos[current].titulo}</h3>}
                {fotos[current].descricao && <p className="text-sm mt-1">{fotos[current].descricao}</p>}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export async function getStaticProps() {
  try {
    const GaleriaClass = Parse.Object.extend('Galeria');
    const query = new Parse.Query(GaleriaClass);
    query.descending('createdAt');

    const results = (await query.find()) as unknown as PObj[];
    const fotos: Foto[] = results
      .map((obj: PObj) => ({
        id: obj.id,
        url: obj.get('imagem')?.url() || '',
        titulo: obj.get('titulo') || '',
        descricao: obj.get('descricao') || '',
      }))
      .filter((f: Foto) => Boolean(f.url));

    return {
      props: { fotos },
      revalidate: 60,
    };
  } catch (error) {
    console.error('Erro ao carregar galeria no getStaticProps:', error);
    return {
      props: { fotos: [] },
      revalidate: 60,
    };
  }
}
