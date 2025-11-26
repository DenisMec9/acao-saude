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
    <section id="galeria" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-4 text-gray-800">
          Nossa Galeria
        </h2>
        <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
          Confira os momentos especiais das nossas ações e projetos sociais.
        </p>
        
        {displayedImages.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500 mb-4">Ainda não há fotos na galeria.</p>
            <Link 
              href="/fotos" 
              className="inline-block bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition font-semibold"
            >
              Ver Galeria Completa
            </Link>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
              {displayedImages.map((image, index) => (
                <div 
                  key={image.id} 
                  className="aspect-square overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow"
                >
                  {/* Use Image do Next.js agora */}
                  <Image
                    src={image.url}
                    alt={image.title || `Foto ${index + 1}`}
                    width={200}
                    height={200}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>
            
            <div className="text-center">
              <Link 
                href="/fotos" 
                className="inline-block bg-orange-500 text-white px-8 py-3 rounded-lg hover:bg-orange-600 transition font-semibold"
              >
                Ver Todas as Fotos ({images.length})
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
}