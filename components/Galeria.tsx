import { useEffect, useState } from "react";
import Parse from "../lib/parseConfig";

type FotoItem = {
  id: string;
  url: string;
  titulo: string;
  descricao: string;
};

// tipo mínimo para objetos do Parse que a gente usa aqui
type PObj = {
  id: string;
  get: (key: string) => any;
};

export default function Galeria() {
  const [fotos, setFotos] = useState<FotoItem[]>([]);

  useEffect(() => {
    async function fetchFotos() {
      try {
        const GaleriaClass = Parse.Object.extend("Galeria");
        const query = new Parse.Query(GaleriaClass);
        query.descending("createdAt");

        // força tipagem do retorno
        const results = (await query.find()) as unknown as PObj[];

        const mapped: FotoItem[] = results
          .map((obj: PObj) => ({
            id: obj.id,
            url: obj.get("imagem")?.url?.() || "", // Parse.File -> url()
            titulo: obj.get("titulo") || "",
            descricao: obj.get("descricao") || "",
          }))
          .filter((f: FotoItem) => Boolean(f.url));

        setFotos(mapped);
      } catch (e) {
        console.error("Erro ao carregar galeria:", e);
      }
    }

    fetchFotos();
  }, []);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">Galeria</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {fotos.map((foto) => (
          <img
            key={foto.id}
            src={foto.url}
            alt={foto.titulo || "Foto da galeria"}
            className="w-full h-48 object-cover rounded-lg shadow"
          />
        ))}
      </div>
    </div>
  );
}
