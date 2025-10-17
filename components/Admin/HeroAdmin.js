import { useState, useEffect } from "react";
import Parse from "@/lib/parseConfig"; // ✅ usa sua configuração inicializada

// --- Funções de Utilidade ---
// Converte um arquivo para base64
function toBase64(file) {
  return new Promise((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => resolve(String(r.result).split(",")[1]);
    r.onerror = reject;
    r.readAsDataURL(file);
  });
}

// Gera nome seguro de arquivo
function toSafeName(file) {
  const allowed = ["jpg", "jpeg", "png", "webp"];
  let ext = (file.name.split(".").pop() || "").toLowerCase();
  if (!allowed.includes(ext)) ext = "jpg";
  const base = file.name.replace(/\.[^/.]+$/, "");
  const safeBase = base
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "") // remove acentos
    .replace(/[^a-z0-9]+/gi, "-") // troca caracteres não alfanuméricos
    .replace(/^-+|-+$/g, "") // remove hífens extras
    .toLowerCase();
  return `${safeBase || "imagem"}.${ext}`;
}
// ------------------------------

export default function HeroAdmin() {
  const [hero, setHero] = useState({
    titulo: "",
    subtitulo: "",
    descricao: "",
    imagem: "" // string (URL) ou File
  });
  const [loadingHero, setLoadingHero] = useState(false);

  // --- Carregar dados iniciais ---
  useEffect(() => {
    async function carregarHero() {
      try {
        if (!Parse.applicationId) {
          console.error("⚠️ Parse não inicializado corretamente!");
          return;
        }

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
      } catch (err) {
        console.error("Erro ao carregar Hero:", err);
      }
    }

    carregarHero();
  }, []);

  // --- Salvar alterações ---
  const salvarHero = async () => {
    setLoadingHero(true);
    try {
      const user = Parse.User.current();
      if (!user) throw new Error("Faça login para salvar alterações.");

      const HeroContent = Parse.Object.extend("HeroContent");
      const query = new Parse.Query(HeroContent);
      let heroObj = await query.first();
      if (!heroObj) heroObj = new HeroContent();

      // Campos de texto
      heroObj.set("titulo", hero.titulo);
      heroObj.set("subtitulo", hero.subtitulo);
      heroObj.set("descricao", hero.descricao);

      // Upload de imagem se houver novo arquivo
      if (hero.imagem instanceof File) {
        console.log("📤 Iniciando upload de imagem...");
        const base64 = await toBase64(hero.imagem);
        const safeName = toSafeName(hero.imagem);

        const uploaded = await Parse.Cloud.run("uploadPhoto", {
          file: {
            name: safeName,
            base64: base64,
            type: hero.imagem.type || "image/jpeg",
          },
        });

        heroObj.set("imagem", {
          __type: "File",
          name: uploaded.name,
          url: uploaded.url,
        });

        console.log("✅ Upload concluído:", uploaded.url);
      }

      // ACL (controle de acesso)
      const acl = new Parse.ACL();
      acl.setPublicReadAccess(true);
      acl.setWriteAccess(user, true);
      heroObj.setACL(acl);

      await heroObj.save();
      alert("🎉 Hero atualizado com sucesso!");

    } catch (err) {
      console.error("Erro ao salvar Hero:", err);
      alert("Erro ao salvar: " + err.message);
    } finally {
      setLoadingHero(false);
    }
  };

  // --- Interface ---
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
        onChange={(e) =>
          setHero({ ...hero, imagem: e.target.files?.[0] || "" })
        }
      />

      {hero.imagem && !(hero.imagem instanceof File) && (
        <img
          src={hero.imagem}
          alt="Preview da imagem"
          className="w-full h-40 object-cover rounded mt-2 shadow"
        />
      )}

      <button
        onClick={salvarHero}
        disabled={loadingHero}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
      >
        {loadingHero ? "Salvando..." : "Salvar Hero"}
      </button>
    </div>
  );
}
