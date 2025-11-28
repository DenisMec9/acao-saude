import Parse from "./parseConfig";

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

export const cursosService = {
  // Buscar todos os cursos
  async getCursos() {
    try {
      const Cursos = Parse.Object.extend("Cursos");
      const query = new Parse.Query(Cursos);
      query.ascending("ordem");
      const results = await query.find();
      
      return results.map(item => ({
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
        ativo: item.get("ativo") !== false, // default true
        ordem: item.get("ordem") || 0,
        createdAt: item.get("createdAt")?.toISOString() || "",
        updatedAt: item.get("updatedAt")?.toISOString() || ""
      }));
    } catch (err) {
      console.error("Erro ao buscar cursos:", err);
      return [];
    }
  },

  // Criar novo curso
  async createCurso(cursoData) {
    try {
      const user = Parse.User.current();
      if (!user) throw new Error("Faça login para criar cursos.");

      const Cursos = Parse.Object.extend("Cursos");
      const curso = new Cursos();

      // Campos básicos
      curso.set("titulo", cursoData.titulo);
      curso.set("descricao", cursoData.descricao);
      curso.set("vagas", cursoData.vagas);
      curso.set("vagasDisponiveis", cursoData.vagas); // Inicia com todas vagas disponíveis
      curso.set("dataInicio", new Date(cursoData.dataInicio));
      curso.set("dataFim", new Date(cursoData.dataFim));
      curso.set("local", cursoData.local);
      curso.set("duracao", cursoData.duracao);
      curso.set("requisitos", cursoData.requisitos.split('\n').filter(r => r.trim()));
      curso.set("investimento", cursoData.investimento || 0);
      curso.set("ativo", cursoData.ativo !== false);
      curso.set("ordem", cursoData.ordem || 0);

      // Upload de imagem se houver
      if (cursoData.imagem instanceof File) {
        const base64 = await toBase64(cursoData.imagem);
        const safeName = toSafeName(cursoData.imagem);
        
        const uploaded = await Parse.Cloud.run("uploadPhoto", {
          file: {
            name: safeName,
            base64: base64,
            type: cursoData.imagem.type || "image/jpeg",
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
      return true;
    } catch (err) {
      console.error("Erro ao criar curso:", err);
      throw err;
    }
  },

  // Atualizar curso
  async updateCurso(id, cursoData) {
    try {
      const user = Parse.User.current();
      if (!user) throw new Error("Faça login para atualizar cursos.");

      const Cursos = Parse.Object.extend("Cursos");
      const query = new Parse.Query(Cursos);
      const curso = await query.get(id);

      // Campos atualizáveis
      if (cursoData.titulo !== undefined) curso.set("titulo", cursoData.titulo);
      if (cursoData.descricao !== undefined) curso.set("descricao", cursoData.descricao);
      if (cursoData.vagas !== undefined) curso.set("vagas", cursoData.vagas);
      if (cursoData.dataInicio !== undefined) curso.set("dataInicio", new Date(cursoData.dataInicio));
      if (cursoData.dataFim !== undefined) curso.set("dataFim", new Date(cursoData.dataFim));
      if (cursoData.local !== undefined) curso.set("local", cursoData.local);
      if (cursoData.duracao !== undefined) curso.set("duracao", cursoData.duracao);
      if (cursoData.requisitos !== undefined) curso.set("requisitos", cursoData.requisitos.split('\n').filter(r => r.trim()));
      if (cursoData.investimento !== undefined) curso.set("investimento", cursoData.investimento);
      if (cursoData.ativo !== undefined) curso.set("ativo", cursoData.ativo);
      if (cursoData.ordem !== undefined) curso.set("ordem", cursoData.ordem);

      // Upload de nova imagem se houver
      if (cursoData.imagem instanceof File) {
        const base64 = await toBase64(cursoData.imagem);
        const safeName = toSafeName(cursoData.imagem);
        
        const uploaded = await Parse.Cloud.run("uploadPhoto", {
          file: {
            name: safeName,
            base64: base64,
            type: cursoData.imagem.type || "image/jpeg",
          },
        });

        curso.set("imagem", {
          __type: "File",
          name: uploaded.name,
          url: uploaded.url,
        });
      }

      await curso.save();
      return true;
    } catch (err) {
      console.error("Erro ao atualizar curso:", err);
      throw err;
    }
  },

  // Excluir curso
  async deleteCurso(id) {
    try {
      const Cursos = Parse.Object.extend("Cursos");
      const query = new Parse.Query(Cursos);
      const curso = await query.get(id);
      await curso.destroy();
      return true;
    } catch (err) {
      console.error("Erro ao excluir curso:", err);
      throw err;
    }
  },

  // Atualizar vagas disponíveis
  async updateVagas(id, vagasDisponiveis) {
    try {
      const Cursos = Parse.Object.extend("Cursos");
      const query = new Parse.Query(Cursos);
      const curso = await query.get(id);
      curso.set("vagasDisponiveis", vagasDisponiveis);
      await curso.save();
      return true;
    } catch (err) {
      console.error("Erro ao atualizar vagas:", err);
      throw err;
    }
  }
};