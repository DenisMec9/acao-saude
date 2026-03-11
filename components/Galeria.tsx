import Link from "next/link";
import Image from "next/image"; // ← Importe o Image novamente

type GaleriaProps = {
  images: Array<{
    id: string;
    url: string;
    title: string;
    description: string;
  }>;
};

export default function Galeria({ images }: GaleriaProps) {
  const displayedImages = images.slice(0, 6);

  return (
    <section id="galeria" className="py-16">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="section-title text-center mb-4">Nossa Galeria</h2>
        <div className="section-divider mb-5" />
        <p className="section-subtitle text-center mb-12 max-w-2xl mx-auto">
          Confira os momentos especiais das nossas ações e projetos sociais.
        </p>
        
        {displayedImages.length === 0 ? (
          <div className="surface-card rounded-2xl text-center py-10 px-6">
            <p className="text-slate-500 mb-4">Ainda não há fotos na galeria.</p>
            <Link 
              href="/fotos" 
              className="admin-btn-accent"
            >
              Ver Galeria Completa
            </Link>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {displayedImages.map((image, index) => (
                <div 
                  key={image.id} 
                  className="group relative aspect-[4/3] sm:aspect-square md:aspect-[4/3] overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition-all duration-300"
                >
                  <Image
                    src={image.url}
                    alt={image.title || `Foto ${index + 1}`}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  
                  {/* Overlay gradiente com texto (aparece no hover) */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                    <h3 className="text-white font-bold text-xl translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      {image.title || 'Ação Saúde'}
                    </h3>
                    {image.description && (
                      <p className="text-gray-200 text-sm mt-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75 line-clamp-2">
                        {image.description}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="text-center">
              <Link 
                href="/fotos" 
                className="inline-flex items-center justify-center gap-2 bg-[#ff7415] text-white px-8 py-4 rounded-xl hover:bg-[#e5670d] hover:-translate-y-1 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#ff7415]"
              >
                Ver Galeria Completa ({images.length} fotos)
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
}