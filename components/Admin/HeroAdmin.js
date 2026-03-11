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
    <div className="admin-card space-y-4 animate-fade-in">
      <div>
        <h2 className="admin-title">Editar Hero</h2>
        <p className="admin-subtitle">Atualize título, descrição e imagem principal da home.</p>
      </div>

      <div>
        <label htmlFor="hero-titulo" className="admin-label">Título</label>
        <input
          id="hero-titulo"
          className="admin-input"
          placeholder="Título"
          value={hero.titulo}
          onChange={(e) => setHero({ ...hero, titulo: e.target.value })}
        />
      </div>

      <div>
        <label htmlFor="hero-subtitulo" className="admin-label">Subtítulo</label>
        <input
          id="hero-subtitulo"
          className="admin-input"
          placeholder="Subtítulo"
          value={hero.subtitulo}
          onChange={(e) => setHero({ ...hero, subtitulo: e.target.value })}
        />
      </div>

      <div>
        <label htmlFor="hero-descricao" className="admin-label">Descrição</label>
        <textarea
          id="hero-descricao"
          className="admin-textarea"
          placeholder="Descrição"
          value={hero.descricao}
          onChange={(e) => setHero({ ...hero, descricao: e.target.value })}
        />
      </div>

      <div>
        <label htmlFor="hero-imagem" className="admin-label">Imagem principal</label>
        <input
          id="hero-imagem"
          type="file"
          accept="image/*"
          className="admin-input"
          onChange={(e) =>
            setHero({ ...hero, imagem: e.target.files?.[0] || "" })
          }
        />
      </div>

      {hero.imagem && !(hero.imagem instanceof File) && (
        <img
          src={hero.imagem}
          alt="Preview da imagem"
          className="w-full h-40 object-cover rounded-xl mt-2 shadow"
        />
      )}

      <button
        type="button"
        onClick={salvarHero}
        disabled={loadingHero}
        className="admin-btn-primary"
        aria-busy={loadingHero}
      >
        {loadingHero ? "Salvando..." : "Salvar Hero"}
      </button>
    </div>
  );
}
