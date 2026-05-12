import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";
import Reveal from "@/components/ui/Reveal";

type GalleryItem = {
  id: string;
  url: string;
  title?: string;
  description?: string;
};

type GalleryGridProps = {
  images: GalleryItem[];
  mode?: "preview" | "full";
  title?: string;
  subtitle?: string;
};

function getCardClass(mode: "preview" | "full", index: number) {
  if (mode === "preview") {
    return "premium-gallery-item premium-gallery-item--landscape";
  }

  const pattern = index % 8;
  if (pattern === 2 || pattern === 5) {
    return "premium-gallery-item premium-gallery-item--portrait";
  }
  return "premium-gallery-item premium-gallery-item--landscape";
}

export default function GalleryGrid({
  images,
  mode = "preview",
  title = "Galeria",
  subtitle = "Historias reais que mostram a forca das nossas acoes comunitarias.",
}: GalleryGridProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [current, setCurrent] = useState(0);
  const [loaded, setLoaded] = useState<Record<string, boolean>>({});

  const list = useMemo(
    () => (mode === "preview" ? images.slice(0, 6) : images),
    [images, mode]
  );

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
      if (event.key === "ArrowRight") {
        setCurrent((prev) => (prev + 1) % list.length);
      }
      if (event.key === "ArrowLeft") {
        setCurrent((prev) => (prev - 1 + list.length) % list.length);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, list.length]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const openLightbox = (index: number) => {
    setCurrent(index);
    setIsOpen(true);
  };

  const currentItem = list[current];

  return (
    <section id="galeria" className="section-shell section-shell--alt gallery-shell">
      <div className="site-container">
        <Reveal className="section-header gallery-header">
          <p className="section-kicker">Memoria institucional</p>
          <h2 className="section-title">{title}</h2>
          <p className="section-subtitle">{subtitle}</p>
          <p className="gallery-intro">
            Cada registro representa encontros, cuidado e transformacao social
            vividos de perto em nossas comunidades.
          </p>
        </Reveal>

        {list.length === 0 ? (
          <div className="premium-empty-state text-center">
            <h3 className="premium-empty-title">Galeria em atualizacao</h3>
            <p className="premium-empty-text">
              Estamos preparando novos registros das nossas acoes para publicar
              por aqui.
            </p>
          </div>
        ) : (
          <div
            className={`premium-gallery-grid ${
              mode === "full" ? "premium-gallery-grid--full" : ""
            }`}
          >
            {list.map((image, index) => (
              <motion.button
                type="button"
                key={image.id}
                onClick={() => openLightbox(index)}
                className={getCardClass(mode, index)}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10% 0px -5% 0px" }}
                transition={{ duration: 0.5, delay: Math.min(index * 0.06, 0.3) }}
                whileHover={{ y: -5 }}
              >
                {!loaded[image.id] ? (
                  <span className="premium-gallery-loading" aria-hidden="true" />
                ) : null}

                <Image
                  src={image.url}
                  alt={image.title || `Foto ${index + 1}`}
                  fill
                  sizes={
                    mode === "full"
                      ? "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      : "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  }
                  className={`premium-gallery-image ${
                    loaded[image.id] ? "is-loaded" : ""
                  }`}
                  onLoad={() =>
                    setLoaded((prev) => ({ ...prev, [image.id]: true }))
                  }
                />

                <span className="premium-gallery-overlay">
                  <span>
                    <strong>{image.title || "Acao Saude"}</strong>
                    {image.description ? <small>{image.description}</small> : null}
                  </span>
                  <Expand size={17} />
                </span>
              </motion.button>
            ))}
          </div>
        )}

        {mode === "preview" && images.length > list.length ? (
          <div className="mt-10 text-center">
            <Link href="/fotos" className="premium-link-btn">
              Ver galeria completa ({images.length} fotos)
              <ChevronRight size={16} />
            </Link>
          </div>
        ) : null}
      </div>

      <AnimatePresence>
        {isOpen && currentItem ? (
          <motion.div
            className="premium-lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          >
            <button
              className="premium-lightbox-close"
              onClick={() => setIsOpen(false)}
              aria-label="Fechar imagem"
            >
              <X size={20} />
            </button>

            <button
              className="premium-lightbox-nav premium-lightbox-nav--left"
              onClick={(event) => {
                event.stopPropagation();
                setCurrent((prev) => (prev - 1 + list.length) % list.length);
              }}
              aria-label="Imagem anterior"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              className="premium-lightbox-nav premium-lightbox-nav--right"
              onClick={(event) => {
                event.stopPropagation();
                setCurrent((prev) => (prev + 1) % list.length);
              }}
              aria-label="Proxima imagem"
            >
              <ChevronRight size={20} />
            </button>

            <motion.figure
              className="premium-lightbox-content"
              initial={{ scale: 0.98, opacity: 0.7 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.98, opacity: 0.7 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              onClick={(event) => event.stopPropagation()}
            >
              <img
                src={currentItem.url}
                alt={currentItem.title || "Foto ampliada"}
                className="premium-lightbox-image"
              />
              {currentItem.title || currentItem.description ? (
                <figcaption className="premium-lightbox-caption">
                  {currentItem.title ? <h3>{currentItem.title}</h3> : null}
                  {currentItem.description ? <p>{currentItem.description}</p> : null}
                </figcaption>
              ) : null}
            </motion.figure>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}
