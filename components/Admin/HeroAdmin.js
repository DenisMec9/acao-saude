import { useState, useEffect } from "react";
import Parse from "../../lib/parseConfig";

// utils -----------------
function toBase64(file) {
  return new Promise((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => resolve(String(r.result).split(",")[1]); // remove "data:mime;base64,"
    r.onerror = reject;
    r.readAsDataURL(file);
  });
}

function toSafeName(file) {
  const allowed = ["jpg", "jpeg", "png", "webp"];
  let ext = (file.name.split(".").pop() || "").toLowerCase();
  if (!allowed.includes(ext)) ext = "jpg";
  const base = file.name.replace(/\.[^/.]+$/, "");
  const safeBase = base
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/gi, "-")
    .replace(/^-+|-+$/g, "")
    .toLowerCase();
  return `${safeBase || "imagem"}.${ext}`;
}
// -----------------------

export default function HeroAdmin() {
  const [hero, setHero] = useState({
    titulo: "",
    subtitulo: "",
    descricao: "",
    imagem: "" // string URL ou File
  });
  const [loadingHero, setLoadingHero] = useState(false);

  useEffect(() => {
    (async () => {
      const HeroContent = Parse.Object.extend("HeroContent");
      const query = new Parse.Query(HeroContent);
      const result = await query.first();
      if (result) {
        setHero({
          titulo: result.get("titulo") || "",
          subtitulo: result.get("subtitulo") || "",
          descricao: result.get("descricao") || "",
          imagem: result.get("imagem")?.url?.() || ""
        });
      }
    })();
  }, []);

  const salvarHero = async () => {
    setLoadingHero(true);
    try {
      const user = Parse.User.current();
      if (!user) throw new Error("Faça login para enviar e salvar.");

      const HeroContent = Parse.Object.extend("HeroContent");
      const query = new Parse.Query(HeroContent);
      let heroObj = await query.first();
      if (!heroObj) heroObj = new HeroContent();

      heroObj.set("titulo", hero.titulo);
      heroObj.set("subtitulo", hero.subtitulo);
      heroObj.set("descricao", hero.descricao);

      // Upload via Cloud Function (base64)
      if (hero.imagem instanceof File) {
        const base64 = await toBase64(hero.imagem);
        const safeName = toSafeName(hero.imagem);
        const uploaded = await Parse.Cloud.run("uploadPhoto", {
          file: { name: safeName, base64, type: hero.imagem.type || "image/jpeg" }
        });
        // seta o campo como File já salvo
        heroObj.set("imagem", {
          __type: "File",
          name: uploaded.name,
          url: uploaded.url
        });
      }

      // ACL: leitura pública, escrita só do admin logado
      const acl = new Parse.ACL();
      acl.setPublicReadAccess(true);
      acl.setWriteAccess(user, true);
      heroObj.setACL(acl);

      await heroObj.save();
      alert("Hero atualizado!");
    } catch (err) {
      console.error("Erro ao salvar Hero:", err);
      alert(err.message || "Erro ao salvar Hero.");
    } finally {
      setLoadingHero(false);
    }
  };

  return (
    <div className="space-y-3">
      <h2 className="text-xl font-bold mb-2">Editar Hero</h2>
      <input
        className="border p-2 w-full"
        placeholder="Título"
        value={hero.titulo}
        onChange={(e) => setHero({ ...hero, titulo: e.target.value })}
      />
      <input
        className="border p-2 w-full"
        placeholder="Subtítulo"
        value={hero.subtitulo}
        onChange={(e) => setHero({ ...hero, subtitulo: e.target.value })}
      />
      <textarea
        className="border p-2 w-full"
        placeholder="Descrição"
        value={hero.descricao}
        onChange={(e) => setHero({ ...hero, descricao: e.target.value })}
      />
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setHero({ ...hero, imagem: e.target.files?.[0] || "" })}
      />

      {hero.imagem && !(hero.imagem instanceof File) && (
        <img
          src={hero.imagem}
          alt="preview hero"
          className="w-full h-40 object-cover rounded mt-2"
        />
      )}

      <button
        onClick={salvarHero}
        disabled={loadingHero}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        {loadingHero ? "Salvando..." : "Salvar Hero"}
      </button>
    </div>
  );
}
