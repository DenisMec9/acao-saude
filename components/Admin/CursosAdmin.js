// components/Admin/CursosAdmin.js
import { useEffect, useState } from "react";
import Parse from "../../lib/parseConfig";

// --- Funções de Utilidade (mesmas do Hero) ---
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

export default function CursosAdmin() {
  const [form, setForm] = useState({
    titulo: "",
    descricao: "",
    imagem: null,
    vagas: 10,
    dataInicio: "",
    dataFim: "",
    local: "",
    duracao: "",
    requisitos: "",
    investimento: 0,
    ativo: true,
    ordem: 0
  });
  const [loading, setLoading] = useState(false);
  const [cursos, setCursos] = useState([]);
  const [editingId, setEditingId] = useState(null);

  // Carregar cursos
  async function carregarCursos() {
    try {
      const Cursos = Parse.Object.extend("Cursos");
      const query = new Parse.Query(Cursos);
      query.ascending("ordem");
      const results = await query.find();
      
      const cursosData = results.map(item => ({
        id: item.id,
        titulo: item.get("titulo") || "",
        descricao: item.get("descricao") || "",
        imagem: item.get("imagem")?.url() || "",
        vagas: item.get("vagas") || 0,
        vagasDisponiveis: item.get("vagasDisponiveis") || 0,
        dataInicio: item.get("dataInicio")?.toISOString() || "",
        dataFim: item.get("dataFim")?.toISOString() || "",
        local: item.get("local") || "",
        duracao: item.get("duracao") || "",
        requisitos: item.get("requisitos") || [],
        investimento: item.get("investimento") || 0,
        ativo: item.get("ativo") !== false,
        ordem: item.get("ordem") || 0,
        createdAt: item.get("createdAt")?.toISOString() || "",
        updatedAt: item.get("updatedAt")?.toISOString() || ""
      }));
      
      setCursos(cursosData);
    } catch (err) {
      console.error("Erro ao buscar cursos:", err);
      alert("Erro ao carregar cursos: " + err.message);
    }
  }

  useEffect(() => {
    carregarCursos();
  }, []);

  // Limpar formulário
  function limparForm() {
    setForm({
      titulo: "",
      descricao: "",
      imagem: null,
      vagas: 10,
      dataInicio: "",
      dataFim: "",
      local: "",
      duracao: "",
      requisitos: "",
      investimento: 0,
      ativo: true,
      ordem: 0
    });
    setEditingId(null);
  }

  // Salvar curso (criar ou editar)
  async function salvarCurso() {
    if (!form.titulo) {
      alert("Pelo menos o título é necessário!");
      return;
    }

    try {
      setLoading(true);
      const user = Parse.User.current();
      if (!user) throw new Error("Faça login para criar cursos.");

      const Cursos = Parse.Object.extend("Cursos");
      
      if (editingId) {
        // Editar curso existente
        const query = new Parse.Query(Cursos);
        const curso = await query.get(editingId);

        curso.set("titulo", form.titulo);
        curso.set("descricao", form.descricao || "");
        curso.set("vagas", form.vagas || 0);
        
        if (form.dataInicio) {
          curso.set("dataInicio", new Date(form.dataInicio));
        }
        if (form.dataFim) {
          curso.set("dataFim", new Date(form.dataFim));
        }
        
        curso.set("local", form.local || "");
        curso.set("duracao", form.duracao || "");
        curso.set("requisitos", form.requisitos ? form.requisitos.split('\n').filter(r => r.trim()) : []);
        curso.set("investimento", form.investimento || 0);
        curso.set("ativo", form.ativo !== false);
        curso.set("ordem", form.ordem || 0);

        // Upload de nova imagem se houver
        if (form.imagem instanceof File) {
          const base64 = await toBase64(form.imagem);
          const safeName = toSafeName(form.imagem);
          
          const uploaded = await Parse.Cloud.run("uploadPhoto", {
            file: {
              name: safeName,
              base64: base64,
              type: form.imagem.type || "image/jpeg",
            },
          });

          curso.set("imagem", {
            __type: "File",
            name: uploaded.name,
            url: uploaded.url,
          });
        }

        await curso.save();
        alert("✅ Curso atualizado com sucesso!");
      } else {
        // Criar novo curso
        const curso = new Cursos();

        curso.set("titulo", form.titulo);
        curso.set("descricao", form.descricao || "");
        curso.set("vagas", form.vagas || 0);
        curso.set("vagasDisponiveis", form.vagas || 0);
        
        if (form.dataInicio) {
          curso.set("dataInicio", new Date(form.dataInicio));
        }
        if (form.dataFim) {
          curso.set("dataFim", new Date(form.dataFim));
        }
        
        curso.set("local", form.local || "");
        curso.set("duracao", form.duracao || "");
        curso.set("requisitos", form.requisitos ? form.requisitos.split('\n').filter(r => r.trim()) : []);
        curso.set("investimento", form.investimento || 0);
        curso.set("ativo", form.ativo !== false);
        curso.set("ordem", form.ordem || 0);

        // Upload de imagem se houver
        if (form.imagem instanceof File) {
          const base64 = await toBase64(form.imagem);
          const safeName = toSafeName(form.imagem);
          
          const uploaded = await Parse.Cloud.run("uploadPhoto", {
            file: {
              name: safeName,
              base64: base64,
              type: form.imagem.type || "image/jpeg",
            },
          });

          curso.set("imagem", {
            __type: "File",
            name: uploaded.name,
            url: uploaded.url,
          });
        }

        // ACL (mesmo padrão do Hero)
        const acl = new Parse.ACL();
        acl.setPublicReadAccess(true);
        acl.setWriteAccess(user, true);
        curso.setACL(acl);

        await curso.save();
        alert("🎉 Curso criado com sucesso!");
      }
      
      await carregarCursos();
      limparForm();
    } catch (err) {
      console.error("Erro ao salvar curso:", err);
      alert("Erro ao salvar: " + err.message);
    } finally {
      setLoading(false);
    }
  }

  // Editar curso
  function editarCurso(curso) {
    setForm({
      titulo: curso.titulo,
      descricao: curso.descricao,
      imagem: null,
      vagas: curso.vagas,
      dataInicio: curso.dataInicio.split('T')[0],
      dataFim: curso.dataFim.split('T')[0],
      local: curso.local,
      duracao: curso.duracao,
      requisitos: curso.requisitos.join('\n'),
      investimento: curso.investimento,
      ativo: curso.ativo,
      ordem: curso.ordem
    });
    setEditingId(curso.id);
  }

  // Excluir curso
  async function excluirCurso(id) {
    if (!confirm("Tem certeza que deseja excluir este curso permanentemente?")) return;
    
    try {
      const Cursos = Parse.Object.extend("Cursos");
      const query = new Parse.Query(Cursos);
      const curso = await query.get(id);
      await curso.destroy();
      
      await carregarCursos();
      alert("Curso excluído com sucesso!");
    } catch (err) {
      console.error("Erro ao excluir curso:", err);
      alert("Erro ao excluir: " + err.message);
    }
  }

  // Atualizar vagas
  async function atualizarVagas(id, novasVagas) {
    try {
      const Cursos = Parse.Object.extend("Cursos");
      const query = new Parse.Query(Cursos);
      const curso = await query.get(id);
      const vagasTotais = curso.get("vagas");
      const vagasDisponiveis = Math.max(0, Math.min(novasVagas, vagasTotais));
      
      curso.set("vagasDisponiveis", vagasDisponiveis);
      await curso.save();
      
      await carregarCursos();
    } catch (err) {
      console.error("Erro ao atualizar vagas:", err);
      alert("Erro ao atualizar vagas: " + err.message);
    }
  }

  // Ativar/Desativar curso
  async function toggleAtivo(id, ativoAtual) {
    try {
      const Cursos = Parse.Object.extend("Cursos");
      const query = new Parse.Query(Cursos);
      const curso = await query.get(id);
      curso.set("ativo", !ativoAtual);
      await curso.save();
      
      await carregarCursos();
      alert(`Curso ${!ativoAtual ? 'ativado' : 'desativado'} com sucesso!`);
    } catch (err) {
      console.error("Erro ao alterar status do curso:", err);
      alert("Erro ao alterar status: " + err.message);
    }
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="admin-card">
        <h3 className="admin-title mb-4">
          {editingId ? "Editar Curso" : "Adicionar Novo Curso"}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="curso-titulo" className="admin-label">Título *</label>
            <input
              id="curso-titulo"
              className="admin-input"
              placeholder="Nome do curso"
              value={form.titulo}
              onChange={(e) => setForm({ ...form, titulo: e.target.value })}
            />
          </div>

          <div>
            <label htmlFor="curso-vagas" className="admin-label">Vagas Totais</label>
            <input
              id="curso-vagas"
              type="number"
              min="1"
              className="admin-input"
              value={form.vagas}
              onChange={(e) => setForm({ ...form, vagas: parseInt(e.target.value) || 0 })}
            />
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="curso-descricao" className="admin-label">Descrição</label>
          <textarea
            id="curso-descricao"
            className="admin-textarea"
            rows="3"
            placeholder="Descrição completa do curso"
            value={form.descricao}
            onChange={(e) => setForm({ ...form, descricao: e.target.value })}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="curso-data-inicio" className="admin-label">Data Início</label>
            <input
              id="curso-data-inicio"
              type="date"
              className="admin-input"
              value={form.dataInicio}
              onChange={(e) => setForm({ ...form, dataInicio: e.target.value })}
            />
          </div>

          <div>
            <label htmlFor="curso-data-fim" className="admin-label">Data Fim</label>
            <input
              id="curso-data-fim"
              type="date"
              className="admin-input"
              value={form.dataFim}
              onChange={(e) => setForm({ ...form, dataFim: e.target.value })}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="curso-local" className="admin-label">Local</label>
            <input
              id="curso-local"
              className="admin-input"
              placeholder="Local do curso"
              value={form.local}
              onChange={(e) => setForm({ ...form, local: e.target.value })}
            />
          </div>

          <div>
            <label htmlFor="curso-duracao" className="admin-label">Duração</label>
            <input
              id="curso-duracao"
              className="admin-input"
              placeholder="Ex: 40 horas, 2 meses"
              value={form.duracao}
              onChange={(e) => setForm({ ...form, duracao: e.target.value })}
            />
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="curso-requisitos" className="admin-label">Requisitos (um por linha)</label>
          <textarea
            id="curso-requisitos"
            className="admin-textarea"
            rows="3"
            placeholder="Cada linha será um item da lista"
            value={form.requisitos}
            onChange={(e) => setForm({ ...form, requisitos: e.target.value })}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="curso-investimento" className="admin-label">Investimento (R$)</label>
            <input
              id="curso-investimento"
              type="number"
              step="0.01"
              min="0"
              className="admin-input"
              value={form.investimento}
              onChange={(e) => setForm({ ...form, investimento: parseFloat(e.target.value) || 0 })}
            />
          </div>

          <div>
            <label htmlFor="curso-ordem" className="admin-label">Ordem de Exibição</label>
            <input
              id="curso-ordem"
              type="number"
              className="admin-input"
              value={form.ordem}
              onChange={(e) => setForm({ ...form, ordem: parseInt(e.target.value) || 0 })}
            />
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="curso-imagem" className="admin-label">Imagem</label>
          <input
            id="curso-imagem"
            type="file"
            accept="image/*"
            onChange={(e) => setForm({ ...form, imagem: e.target.files?.[0] || null })}
            className="admin-input"
          />
        </div>

        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            id="ativo"
            checked={form.ativo}
            onChange={(e) => setForm({ ...form, ativo: e.target.checked })}
            className="mr-2"
          />
          <label htmlFor="ativo" className="text-sm text-slate-700">
            Curso ativo (aparece no site)
          </label>
        </div>

        <div className="flex space-x-3">
          <button
            onClick={salvarCurso}
            disabled={loading || !form.titulo}
            className="admin-btn-primary disabled:opacity-60 disabled:cursor-not-allowed"
            type="button"
            aria-busy={loading}
          >
            {loading ? "Salvando..." : editingId ? "Atualizar Curso" : "Criar Curso"}
          </button>
          
          {editingId && (
            <button
              onClick={limparForm}
              className="admin-btn-neutral"
              type="button"
            >
              Cancelar
            </button>
          )}
        </div>
      </div>

      {/* Lista de Cursos */}
      <div className="admin-card">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-slate-800">
            Cursos Cadastrados ({cursos.length})
          </h3>
          <div className="text-sm text-slate-500">
            {cursos.filter(c => c.ativo).length} ativos • {cursos.filter(c => !c.ativo).length} inativos
          </div>
        </div>
        
        {cursos.length === 0 ? (
          <p className="text-gray-500 text-center py-8">Nenhum curso cadastrado ainda.</p>
        ) : (
          <div className="space-y-4">
            {cursos.map((curso) => (
              <div key={curso.id} className={`rounded-xl border border-slate-200 p-4 shadow-sm ${!curso.ativo ? 'bg-slate-50 opacity-80' : 'bg-white'}`}>
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4 flex-1">
                    {curso.imagem && (
                      <img
                        src={curso.imagem}
                        alt={curso.titulo}
                        className="w-20 h-20 object-cover rounded-xl"
                      />
                    )}
                    
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h4 className="font-semibold text-lg">{curso.titulo}</h4>
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          curso.ativo 
                            ? curso.vagasDisponiveis > 0 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-red-100 text-red-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {curso.ativo 
                            ? (curso.vagasDisponiveis > 0 ? `${curso.vagasDisponiveis} vagas` : 'Esgotado')
                            : 'Inativo'
                          }
                        </span>
                        <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                          Ordem: {curso.ordem}
                        </span>
                      </div>
                      
                      <p className="text-slate-600 text-sm mb-2 line-clamp-2">{curso.descricao}</p>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-slate-500">
                        <div>
                          <strong>Vagas:</strong> 
                          <input
                            type="number"
                            min="0"
                            max={curso.vagas}
                            value={curso.vagasDisponiveis}
                            onChange={(e) => atualizarVagas(curso.id, parseInt(e.target.value) || 0)}
                            className="ml-2 w-16 rounded-md border border-slate-300 px-1 text-center"
                          /> / {curso.vagas}
                        </div>
                        <div><strong>Local:</strong> {curso.local || '-'}</div>
                        <div><strong>Duração:</strong> {curso.duracao || '-'}</div>
                        <div><strong>Investimento:</strong> R$ {curso.investimento.toFixed(2)}</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col space-y-2 ml-4">
                    <button
                      onClick={() => editarCurso(curso)}
                      className="admin-btn-accent text-sm"
                      type="button"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => toggleAtivo(curso.id, curso.ativo)}
                      className={`px-3 py-1 rounded-lg text-sm text-white transition-colors ${
                        curso.ativo 
                          ? 'bg-amber-600 hover:bg-amber-700' 
                          : 'bg-emerald-600 hover:bg-emerald-700'
                      }`}
                      type="button"
                    >
                      {curso.ativo ? 'Desativar' : 'Ativar'}
                    </button>
                    <button
                      onClick={() => excluirCurso(curso.id)}
                      className="admin-btn-danger text-sm"
                      type="button"
                    >
                      Excluir
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}