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
  const [form, setForm] = useState({ titulo: "", descricao: "", arquivo: null });
  const [loading, setLoading] = useState(false);
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

  async function adicionarFoto() {
    try {
      setLoading(true);
      const user = Parse.User.current();
      if (!user) throw new Error("Faça login para enviar.");

      if (!(form.arquivo instanceof File)) {
        throw new Error("Selecione uma imagem.");
      }

      // upload via Cloud Function
      const base64 = await toBase64(form.arquivo);
      const safeName = toSafeName(form.arquivo);
      const uploaded = await Parse.Cloud.run("uploadPhoto", {
        file: { name: safeName, base64, type: form.arquivo.type || "image/jpeg" }
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

      setForm({ titulo: "", descricao: "", arquivo: null });
      await carregarFotos();
      alert("Foto adicionada!");
    } catch (e) {
      console.error(e);
      alert(e.message || "Erro ao adicionar foto.");
    } finally {
      setLoading(false);
    }
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
    <div className="space-y-3">
      <h2 className="text-xl font-bold mb-2">Galeria</h2>

      <input
        className="border p-2 w-full"
        placeholder="Título"
        value={form.titulo}
        onChange={(e) => setForm({ ...form, titulo: e.target.value })}
      />
      <textarea
        className="border p-2 w-full"
        placeholder="Descrição"
        value={form.descricao}
        onChange={(e) => setForm({ ...form, descricao: e.target.value })}
      />
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setForm({ ...form, arquivo: e.target.files?.[0] || null })}
      />

      <button
        onClick={adicionarFoto}
        disabled={loading}
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        {loading ? "Enviando..." : "Adicionar Foto"}
      </button>

      <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-4">
        {fotos.map((f) => (
          <div key={f.id} className="relative">
            <img src={f.url} alt={f.titulo} className="w-full h-40 object-cover rounded" />
            <button
              onClick={() => excluir(f.id)}
              className="absolute bottom-2 left-2 bg-red-600 text-white text-sm px-3 py-1 rounded"
            >
              Excluir
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
