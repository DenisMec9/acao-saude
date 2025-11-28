// components/CursoCard.js
import Image from "next/image";
import Link from "next/link";

export default function CursoCard({ curso }) {
  const formatDate = (dateString) => {
    if (!dateString) return "A definir";
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  const isEsgotado = curso.vagasDisponiveis === 0;

  const handleWhatsApp = () => {
    const message = `Olá! Gostaria de me inscrever no curso: ${curso.titulo}`;
    window.open(`https://wa.me/5581987455207?text=${encodeURIComponent(message)}`, '_blank');
  };

  const handleInfoWhatsApp = () => {
    const message = `Olá! Gostaria de mais informações sobre o curso: ${curso.titulo}`;
    window.open(`https://wa.me/5581987455207?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className={`bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 curso-card ${
      isEsgotado ? 'opacity-80' : ''
    }`}>
      {curso.imagem && (
        <div className="relative h-48">
          <Image
            src={curso.imagem}
            alt={curso.titulo}
            fill
            className="object-cover"
          />
          {isEsgotado && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <span className="bg-red-600 text-white px-4 py-2 rounded-lg font-bold text-lg">
                VAGAS ESGOTADAS
              </span>
            </div>
          )}
        </div>
      )}
      
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold text-gray-900 flex-1">
            {curso.titulo}
          </h3>
          <span className={`ml-2 px-3 py-1 rounded-full text-sm font-medium ${
            isEsgotado 
              ? 'bg-red-100 text-red-800' 
              : 'bg-green-100 text-green-800'
          }`}>
            {isEsgotado ? 'Esgotado' : `${curso.vagasDisponiveis} vagas`}
          </span>
        </div>

        {curso.descricao && (
          <p className="text-gray-600 mb-4 line-clamp-3">
            {curso.descricao}
          </p>
        )}

        <div className="space-y-2 mb-4 text-sm text-gray-500">
          <div className="flex justify-between">
            <span>📅 Período:</span>
            <span>{formatDate(curso.dataInicio)} - {formatDate(curso.dataFim)}</span>
          </div>
          {curso.local && (
            <div className="flex justify-between">
              <span>📍 Local:</span>
              <span>{curso.local}</span>
            </div>
          )}
          {curso.duracao && (
            <div className="flex justify-between">
              <span>⏱️ Duração:</span>
              <span>{curso.duracao}</span>
            </div>
          )}
          <div className="flex justify-between">
            <span>💰 Investimento:</span>
            <span className="font-semibold">
              {curso.investimento === 0 ? 'Gratuito' : `R$ ${curso.investimento.toFixed(2)}`}
            </span>
          </div>
        </div>

        {curso.requisitos.length > 0 && (
          <div className="mb-4">
            <h4 className="font-medium text-gray-900 mb-2 text-sm">Pré-requisitos:</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              {curso.requisitos.slice(0, 3).map((requisito, index) => (
                <li key={index} className="flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                  {requisito}
                </li>
              ))}
              {curso.requisitos.length > 3 && (
                <li className="text-blue-600 text-sm">
                  + {curso.requisitos.length - 3} mais...
                </li>
              )}
            </ul>
          </div>
        )}

        {isEsgotado ? (
          <button
            onClick={handleInfoWhatsApp}
            className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Informações
          </button>
        ) : (
          <button
            onClick={handleWhatsApp}
            className="w-full py-3 px-4 bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600 transition-colors"
          >
            Inscrever-se
          </button>
        )}
      </div>
    </div>
  );
}