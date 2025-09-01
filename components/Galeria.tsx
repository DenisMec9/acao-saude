import { useEffect, useState } from "react";
import Parse from "../lib/parseConfig"; // usa sua config, não o dist direto

export default function Galeria() {
  const [fotos, setFotos] = useState<Parse.Object[]>([]);

  useEffect(() => {
    async function fetchFotos() {
      const FotoClass = Parse.Object.extend("Fotos");
      const query = new Parse.Query(FotoClass);
      query.descending("createdAt");
      const results = await query.find();
      setFotos(results);
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
            src={foto.get("url") as string} // 👈 agora o TS entende
            alt=""
            className="w-full h-48 object-cover rounded-lg shadow"
          />
        ))}
      </div>
    </div>
  );
}
