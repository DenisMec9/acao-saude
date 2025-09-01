import { useState, useEffect } from "react";
import Parse from "parse/dist/parse.min.js";

export default function Admin() {
  // Hero Content
  const [hero, setHero] = useState({ titulo: "", subtitulo: "", descricao: "", imagem: "" });
  const [loadingHero, setLoadingHero] = useState(false);

  // Fotos
  const [fotos, setFotos] = useState([]);
  const [novaFoto, setNovaFoto] = useState({ titulo: "", descricao: "", arquivo: null });
  const [loadingFoto, setLoadingFoto] = useState(false);

  // Carregar dados ao abrir painel
  useEffect(() => {
    fetchHero();
    fetchFotos();
  }, []);

  // Buscar Hero
  async function fetchHero() {
    const HeroContent = Parse.Object.extend("HeroContent");
    const query = new Parse.Query(HeroContent);
    const result = await query.first();
    if (result) {
      setHero({
        titulo: result.get("titulo"),
        subtitulo: result.get("subtitulo"),
        descricao: result.get("descricao"),
        imagem: result.get("imagem")?.url() || "",
      });
    }
  }

  // Buscar Fotos
  async function fetchFotos() {
    const Foto = Parse.Object.extend("Fotos");
    const query = new Parse.Query(Foto);
    query.descending("createdAt");
    const results = await query.find();
    setFotos(results);
  }

  // Salvar Hero
  async function salvarHero() {
    setLoadingHero(true);
    try {
      const HeroContent = Parse.Object.extend("HeroContent");
      const query = new Parse.Query(HeroContent);
      let heroObj = await query.first();

      if (!heroObj) heroObj = new HeroContent();

      heroObj.set("titulo", hero.titulo);
      heroObj.set("subtitulo", hero.subtitulo);
      heroObj.set("descricao", hero.descricao);

      if (hero.imagem instanceof File) {
        const parseFile = new Parse.File(hero.imagem.name, hero.imagem);
        await parseFile.save();
        heroObj.set("imagem", parseFile);
      }

      await heroObj.save();
      alert("Hero atualizado!");
    } catch (err) {
      console.error("Erro ao salvar Hero:", err);
      alert("Erro ao salvar Hero.");
    }
    setLoadingHero(false);
  }

  // Adicionar nova foto
  async function adicionarFoto() {
    if (!novaFoto.arquivo) {
      alert("Selecione uma imagem!");
      return;
    }

    setLoadingFoto(true);
    try {
      const Foto = Parse.Object.extend("Fotos");
      const fotoObj = new Foto();

      fotoObj.set("titulo", novaFoto.titulo);
      fotoObj.set("descricao", novaFoto.descricao);

      const parseFile = new Parse.File(novaFoto.arquivo.name, novaFoto.arquivo);
      await parseFile.save();
      fotoObj.set("imagem", parseFile);

      await fotoObj.save();

      setFotos([fotoObj, ...fotos]); // atualização otimista
      setNovaFoto({ titulo: "", descricao: "", arquivo: null });
      alert("Foto adicionada!");
    } catch (err) {
      console.error("Erro ao adicionar foto:", err);
      alert("Erro ao adicionar foto.");
    }
    setLoadingFoto(false);
  }

  // Excluir foto
  async function excluirFoto(id) {
    if (!confirm("Tem certeza que deseja excluir esta foto?")) return;

    try {
      const Foto = Parse.Object.extend("Fotos");
      const query = new Parse.Query(Foto);
      const foto = await query.get(id);
      await foto.destroy();

      setFotos(fotos.filter((f) => f.id !== id)); // remove sem refazer fetch
    } catch (err) {
      console.error("Erro ao excluir foto:", err);
      alert("Erro ao excluir foto.");
    }
  }

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-10">
      {/* Hero */}
      <section className="p-4 border rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4">Editar Hero</h2>
        <input
          className="border p-2 w-full mb-2"
          placeholder="Título"
          value={hero.titulo}
          onChange={(e) => setHero({ ...hero, titulo: e.target.value })}
        />
        <input
          className="border p-2 w-full mb-2"
          placeholder="Subtítulo"
          value={hero.subtitulo}
          onChange={(e) => setHero({ ...hero, subtitulo: e.target.value })}
        />
        <textarea
          className="border p-2 w-full mb-2"
          placeholder="Descrição"
          value={hero.descricao}
          onChange={(e) => setHero({ ...hero, descricao: e.target.value })}
        />
        <input
          type="file"
          className="mb-2"
          onChange={(e) => setHero({ ...hero, imagem: e.target.files[0] })}
        />
        {hero.imagem && !(hero.imagem instanceof File) && (
          <img src={hero.imagem} alt="preview hero" className="w-full h-40 object-cover mb-2 rounded" />
        )}
        <button
          onClick={salvarHero}
          disabled={loadingHero}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          {loadingHero ? "Salvando..." : "Salvar Hero"}
        </button>
      </section>

      {/* Galeria */}
      <section className="p-4 border rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4">Gerenciar Galeria</h2>

        {/* Form adicionar */}
        <div className="space-y-2 mb-4">
          <input
            className="border p-2 w-full"
            placeholder="Título"
            value={novaFoto.titulo}
            onChange={(e) => setNovaFoto({ ...novaFoto, titulo: e.target.value })}
          />
          <textarea
            className="border p-2 w-full"
            placeholder="Descrição"
            value={novaFoto.descricao}
            onChange={(e) => setNovaFoto({ ...novaFoto, descricao: e.target.value })}
          />
          <input
            type="file"
            onChange={(e) => setNovaFoto({ ...novaFoto, arquivo: e.target.files[0] })}
          />
          <button
            onClick={adicionarFoto}
            disabled={loadingFoto}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            {loadingFoto ? "Enviando..." : "Adicionar Foto"}
          </button>
        </div>

        {/* Lista de fotos */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {fotos.map((foto) => (
            <div key={foto.id} className="border rounded p-2 text-center">
              <img
                src={foto.get("imagem")?.url()}
                alt={foto.get("titulo")}
                className="w-full h-32 object-cover rounded"
              />
              <h3 className="font-semibold">{foto.get("titulo")}</h3>
              <p className="text-sm">{foto.get("descricao")}</p>
              <button
                onClick={() => excluirFoto(foto.id)}
                className="bg-red-600 text-white px-2 py-1 rounded mt-2"
              >
                Excluir
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
