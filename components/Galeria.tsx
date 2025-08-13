import React, { useCallback, useEffect, useState } from 'react';

type ImageItem = {
  id: string;
  url: string;
  title?: string;
  description?: string;
};

type GaleriaProps = {
  initialImages?: ImageItem[]; // pode vir do Back4App ou mock
  pageSize?: number;           // quantas por “page”
};

export default function Galeria({ initialImages = [], pageSize = 24 }: GaleriaProps) {
  const [allImages, setAllImages] = useState<ImageItem[]>(initialImages);
  const [visibleCount, setVisibleCount] = useState<number>(
    Math.min(pageSize, initialImages.length)
  );

  // Lightbox
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Atualiza quando props mudarem
  useEffect(() => {
    setAllImages(initialImages);
    setVisibleCount(Math.min(pageSize, initialImages.length));
  }, [initialImages, pageSize]);

  const openLightbox = useCallback((index: number) => {
    if (!allImages.length) return;
    setCurrentIndex(index);
    setIsOpen(true);
    if (typeof document !== 'undefined') document.body.style.overflow = 'hidden';
  }, [allImages.length]);

  const closeLightbox = useCallback(() => {
    setIsOpen(false);
    if (typeof document !== 'undefined') document.body.style.overflow = '';
  }, []);

  const showNext = useCallback(() => {
    setCurrentIndex(i => (allImages.length ? (i + 1) % allImages.length : i));
  }, [allImages.length]);

  const showPrev = useCallback(() => {
    setCurrentIndex(i => (allImages.length ? (i - 1 + allImages.length) % allImages.length : i));
  }, [allImages.length]);

  // Navegação por teclado
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') showNext();
      if (e.key === 'ArrowLeft') showPrev();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isOpen, closeLightbox, showNext, showPrev]);

  const loadMore = () => {
    setVisibleCount(c => Math.min(c + pageSize, allImages.length));
  };

  const visibleImages = allImages.slice(0, visibleCount);

  return (
    <section id="galeria" className="p-4"> {/* <- id para o Navbar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {visibleImages.map((img, idx) => (
          <button
            key={img.id}
            onClick={() => openLightbox(idx)}
            className="group relative overflow-hidden rounded-lg focus:outline-none"
            aria-label={img.title ?? `Abrir foto ${idx + 1}`}
          >
            <img
              src={img.url}
              alt={img.title ?? `Foto ${idx + 1}`}
              loading="lazy"
              className="w-full h-48 object-cover transform group-hover:scale-105 transition duration-300"
            />
            {img.title && (
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-2 text-white text-sm">
                {img.title}
              </div>
            )}
          </button>
        ))}
      </div>

      {visibleCount < allImages.length && (
        <div className="text-center mt-6">
          <button
            onClick={loadMore}
            className="px-4 py-2 rounded-lg bg-slate-900 text-white shadow hover:opacity-95 transition"
          >
            Carregar mais
          </button>
        </div>
      )}

      {/* Lightbox */}
      {isOpen && allImages[currentIndex] && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
          role="dialog"
          aria-modal="true"
        >
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-white text-2xl p-2 rounded hover:bg-white/10"
            aria-label="Fechar"
          >
            ×
          </button>

          <div className="max-w-5xl max-h-[90vh] w-full flex flex-col items-center">
            <div className="w-full flex items-center justify-between mb-2">
              <button
                onClick={showPrev}
                className="p-2 rounded-full text-white hover:bg-white/10"
                aria-label="Foto anterior"
              >
                ‹
              </button>

              <button
                onClick={showNext}
                className="p-2 rounded-full text-white hover:bg-white/10"
                aria-label="Próxima foto"
              >
                ›
              </button>
            </div>

            <div className="w-full flex-1 flex items-center justify-center">
              <img
                src={allImages[currentIndex].url}
                alt={allImages[currentIndex].title ?? ''}
                className="max-h-[80vh] w-auto object-contain rounded"
              />
            </div>

            {allImages[currentIndex].title && (
              <div className="mt-3 text-center text-white">{allImages[currentIndex].title}</div>
            )}

            {allImages[currentIndex].description && (
              <div className="mt-1 text-center text-white/80 text-sm">
                {allImages[currentIndex].description}
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
