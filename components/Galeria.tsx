import Link from "next/link";
import Image from "next/image";

type GaleriaProps = {
  images: Array<{
    id: string;
    url: string;
    title: string;
    description: string;
  }>;
};

export default function Galeria({ images }: GaleriaProps) {
  const displayedImages = images.slice(0, 3);
  const backgroundImage = "/imagens/foto.oq.jpg";

  return (
    <section id="galeria" className="py-16 md:py-20">
      <div className="site-container">
        <div
          className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white/70 p-6 shadow-sm md:p-10"
          style={{
            backgroundImage: `linear-gradient(135deg, rgba(255,255,255,0.94), rgba(255,255,255,0.84)), url(${backgroundImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <h2 className="section-title mb-4 text-center">Nossa Galeria</h2>
          <div className="section-divider mb-5" />
          <p className="section-subtitle mb-10 max-w-2xl text-center">
            Confira os momentos especiais das nossas acoes e projetos sociais.
          </p>

          {displayedImages.length === 0 ? (
            <div className="surface-card rounded-2xl px-6 py-10 text-center">
              <p className="mb-4 text-slate-500">Ainda nao ha fotos na galeria.</p>
              <Link href="/fotos" className="admin-btn-accent">
                Ver galeria completa
              </Link>
            </div>
          ) : (
            <>
              <div className="mb-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {displayedImages.map((image, index) => (
                  <article
                    key={image.id}
                    className="group relative overflow-hidden rounded-2xl border border-orange-200/80 bg-white/90 p-2 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
                      <Image
                        src={image.url}
                        alt={image.title || `Foto ${index + 1}`}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />

                      <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/70 via-black/20 to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                        <h3 className="translate-y-3 text-lg font-bold text-white transition-transform duration-300 group-hover:translate-y-0">
                          {image.title || "Acao Saude"}
                        </h3>
                        {image.description ? (
                          <p className="mt-1 translate-y-3 text-sm text-gray-200 transition-transform delay-75 duration-300 group-hover:translate-y-0 line-clamp-2">
                            {image.description}
                          </p>
                        ) : null}
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              <div className="text-center">
                <Link
                  href="/fotos"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#ff7415] px-8 py-3.5 font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#e5670d]"
                >
                  Ver galeria completa ({images.length} fotos)
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
