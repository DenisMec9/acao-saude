import { useEffect, useState } from "react";
import Parse from "../../lib/parseConfig";

// utils (mesmos do Hero) -----------------
function toBase64(file) {
  return new Promise((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => resolve(String(r.result).split(",")[1]);
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
// ---------------------------------------

export default function GaleriaAdmin() {
  const [form, setForm] = useState({ 
    titulo: "", 
    descricao: "", 
    arquivos: [] // Agora é um array para múltiplos arquivos
  });
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [fotos, setFotos] = useState([]);

  async function carregarFotos() {
    const Galeria = Parse.Object.extend("Galeria");
    const q = new Parse.Query(Galeria);
    q.descending("createdAt");
    const res = await q.find();
    setFotos(
      res.map((o) => ({
        id: o.id,
        url: o.get("imagem")?.url?.() || "",
        titulo: o.get("titulo") || "",
        descricao: o.get("descricao") || "",
      }))
    );
  }

  useEffect(() => {
    carregarFotos();
  }, []);

  async function adicionarFotos() {
    if (form.arquivos.length === 0) {
      alert("Selecione pelo menos uma foto.");
      return;
    }

    try {
      setLoading(true);
      setUploadProgress(0);
      const user = Parse.User.current();
      if (!user) throw new Error("Faça login para enviar.");

      let uploadedCount = 0;
      const totalFiles = form.arquivos.length;

      // Upload de cada arquivo
      for (const arquivo of form.arquivos) {
        try {
          // upload via Cloud Function
          const base64 = await toBase64(arquivo);
          const safeName = toSafeName(arquivo);
          const uploaded = await Parse.Cloud.run("uploadPhoto", {
            file: { name: safeName, base64, type: arquivo.type || "image/jpeg" }
          });

          // cria objeto Galeria e referencia o File salvo
          const Galeria = Parse.Object.extend("Galeria");
          const foto = new Galeria();
          foto.set("titulo", form.titulo || "");
          foto.set("descricao", form.descricao || "");
          foto.set("imagem", { __type: "File", name: uploaded.name, url: uploaded.url });

          const acl = new Parse.ACL();
          acl.setPublicReadAccess(true);
          acl.setWriteAccess(user, true);
          foto.setACL(acl);

          await foto.save();
          uploadedCount++;

          // Atualiza progresso
          setUploadProgress(Math.round((uploadedCount / totalFiles) * 100));

        } catch (error) {
          console.error(`Erro ao enviar ${arquivo.name}:`, error);
        }
      }

      // Limpa formulário e recarrega galeria
      setForm({ titulo: "", descricao: "", arquivos: [] });
      await carregarFotos();
      
      alert(`${uploadedCount} de ${totalFiles} fotos adicionadas com sucesso!`);
      
    } catch (e) {
      console.error(e);
      alert(e.message || "Erro ao adicionar fotos.");
    } finally {
      setLoading(false);
      setUploadProgress(0);
    }
  }

  function handleFileSelect(e) {
    const files = Array.from(e.target.files || []);
    const imageFiles = files.filter((file) => file.type.startsWith("image/"));

    if (imageFiles.length === 0) {
      alert("Por favor, selecione apenas arquivos de imagem.");
      return;
    }

    setForm((prev) => ({
      ...prev,
      arquivos: [...prev.arquivos, ...imageFiles],
    }));
  }

  function removerArquivo(index) {
    setForm((prev) => ({
      ...prev,
      arquivos: prev.arquivos.filter((_, i) => i !== index),
    }));
  }

  async function excluir(id) {
    if (!confirm("Excluir esta foto?")) return;
    try {
      const Galeria = Parse.Object.extend("Galeria");
      const obj = await new Parse.Query(Galeria).get(id);
      await obj.destroy();
      await carregarFotos();
    } catch (e) {
      console.error(e);
      alert("Erro ao excluir.");
    }
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="admin-card">
        <h2 className="admin-title">Gerenciar Galeria</h2>
        <p className="admin-subtitle">Adicione novas imagens e organize a vitrine de fotos do site.</p>
      </div>

      {/* Formulário para adicionar fotos */}
      <div className="admin-card">
        <h3 className="text-lg font-semibold mb-4 text-slate-800">Adicionar Novas Fotos</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="galeria-titulo" className="admin-label">Título (opcional)</label>
            <input
              id="galeria-titulo"
              className="admin-input"
              placeholder="Título para todas as fotos"
              value={form.titulo}
              onChange={(e) => setForm({ ...form, titulo: e.target.value })}
            />
          </div>
          
          <div>
            <label htmlFor="galeria-descricao" className="admin-label">Descrição (opcional)</label>
            <textarea
              id="galeria-descricao"
              className="admin-textarea"
              placeholder="Descrição para todas as fotos"
              value={form.descricao}
              onChange={(e) => setForm({ ...form, descricao: e.target.value })}
            />
          </div>
        </div>

        {/* Upload de múltiplos arquivos */}
        <div className="mb-4">
          <label htmlFor="galeria-arquivos" className="admin-label">
            Selecionar Fotos ({form.arquivos.length} selecionadas)
          </label>
          <input
            id="galeria-arquivos"
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileSelect}
            className="admin-input"
          />
          <p className="text-sm text-slate-500 mt-1">
            Selecione múltiplas fotos (Ctrl+Click ou Shift+Click)
          </p>
        </div>

        {/* Preview das fotos selecionadas */}
        {form.arquivos.length > 0 && (
          <div className="mb-4">
            <label className="admin-label">Pré-visualização:</label>
            <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
              {form.arquivos.map((arquivo, index) => (
                <div key={index} className="relative group">
                  <img
                    src={URL.createObjectURL(arquivo)}
                    alt={`Preview ${index + 1}`}
                    className="w-full h-20 object-cover rounded-xl border border-slate-200"
                  />
                  <button
                    type="button"
                    onClick={() => removerArquivo(index)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                    aria-label={`Remover arquivo ${arquivo.name}`}
                  >
                    ×
                  </button>
                  <p className="text-xs truncate mt-1">{arquivo.name}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Barra de progresso */}
        {loading && (
          <div className="mb-4">
            <div className="flex justify-between text-sm mb-1">
              <span>Enviando fotos...</span>
              <span>{uploadProgress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-green-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
          </div>
        )}

        <button
          type="button"
          onClick={adicionarFotos}
          disabled={loading || form.arquivos.length === 0}
          className="admin-btn-primary disabled:opacity-60 disabled:cursor-not-allowed"
          aria-busy={loading}
        >
          {loading ? `Enviando... (${uploadProgress}%)` : `Adicionar ${form.arquivos.length} Foto(s)`}
        </button>
      </div>

      {/* Grid de fotos existentes */}
      <div className="admin-card">
        <h3 className="text-lg font-semibold mb-4 text-slate-800">
          Fotos na Galeria ({fotos.length})
        </h3>
        
        {fotos.length === 0 ? (
          <p className="text-slate-500 text-center py-8">Nenhuma foto na galeria ainda.</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
            {fotos.map((f) => (
              <div key={f.id} className="relative group border border-slate-200 rounded-xl overflow-hidden bg-white shadow-sm">
                <img 
                  src={f.url} 
                  alt={f.titulo} 
                  className="w-full h-48 object-cover" 
                />
                <div className="p-2">
                  <p className="font-semibold text-sm truncate">{f.titulo || "Sem título"}</p>
                  <p className="text-xs text-slate-600 truncate">{f.descricao || "Sem descrição"}</p>
                </div>
                <button
                  type="button"
                  onClick={() => excluir(f.id)}
                  className="absolute top-2 right-2 bg-rose-600 text-white text-xs px-2 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                  aria-label={`Excluir foto ${f.titulo || f.id}`}
                >
                  Excluir
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}