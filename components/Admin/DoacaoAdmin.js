import { useState, useEffect } from "react";
import Parse from "../../lib/parseConfig";

export default function DoacaoAdmin() {
  const [doacao, setDoacao] = useState({
    titulo: "",
    descricao: "",
    banco: "",
    tipoDoacao: "",
    imagem: ""
  }); // Todos os campos já estão corretos, mas mantenha a acentuação correta nos textos exibidos ao usuário nas telas e mensagens.
  const [loadingDoacao, setLoadingDoacao] = useState(false);

  useEffect(() => {
    const fetchDoacao = async () => {
      const Doacao = Parse.Object.extend("Doacao");
      const query = new Parse.Query(Doacao);
      const result = await query.first();
      if (result) {
        setDoacao({
          titulo: result.get("titulo"),
          descricao: result.get("descricao"),
          banco: result.get("banco"),
          tipoDoacao: result.get("tipoDoação"),
          imagem: result.get("imagem")?.url() || ""
        });
      }
    };
    fetchDoacao();
  }, []);

  const salvarDoacao = async () => {
    setLoadingDoacao(true);
    try {
      const Doacao = Parse.Object.extend("Doacao");
      const query = new Parse.Query(Doacao);
      let doacaoObj = await query.first();
      if (!doacaoObj) doacaoObj = new Doacao();

      doacaoObj.set("titulo", doacao.titulo);
      doacaoObj.set("descricao", doacao.descricao);
      doacaoObj.set("banco", doacao.banco);
      doacaoObj.set("tipoDoacao", doacao.tipoDoacao);

      if (doacao.imagem instanceof File) {
        const parseFile = new Parse.File(doacao.imagem.name, doacao.imagem);
        await parseFile.save();
        doacaoObj.set("imagem", parseFile);
      }

      await doacaoObj.save();
      alert("Seção Doação atualizada!");
    } catch (err) {
      console.error(err);
      alert("Erro ao salvar Doação.");
    }
    setLoadingDoacao(false);
  };

  return (
    <div className="admin-card space-y-4 animate-fade-in">
      <div>
        <h2 className="admin-title">Editar Seção Doação</h2>
        <p className="admin-subtitle">Atualize informações bancárias e conteúdo de apoio da página.</p>
      </div>
      <div>
        <label htmlFor="doacao-titulo" className="admin-label">Título</label>
        <input id="doacao-titulo" className="admin-input" placeholder="Título" value={doacao.titulo} onChange={e => setDoacao({ ...doacao, titulo: e.target.value })}/>
      </div>
      <div>
        <label htmlFor="doacao-descricao" className="admin-label">Descrição</label>
        <textarea id="doacao-descricao" className="admin-textarea" placeholder="Descrição" value={doacao.descricao} onChange={e => setDoacao({ ...doacao, descricao: e.target.value })}/>
      </div>
      <div>
        <label htmlFor="doacao-banco" className="admin-label">Banco</label>
        <input id="doacao-banco" className="admin-input" placeholder="Banco" value={doacao.banco} onChange={e => setDoacao({ ...doacao, banco: e.target.value })}/>
      </div>
      <div>
        <label htmlFor="doacao-tipo" className="admin-label">Tipo de Doação</label>
        <input id="doacao-tipo" className="admin-input" placeholder="Tipo de Doação" value={doacao.tipoDoacao} onChange={e => setDoacao({ ...doacao, tipoDoacao: e.target.value })}/>
      </div>
      <div>
        <label htmlFor="doacao-imagem" className="admin-label">Imagem da seção</label>
        <input id="doacao-imagem" className="admin-input" type="file" onChange={e => setDoacao({ ...doacao, imagem: e.target.files[0] })}/>
      </div>
      {doacao.imagem && !(doacao.imagem instanceof File) && (
        <img src={doacao.imagem} alt="preview doação" className="w-full h-32 object-cover rounded-xl mt-2"/>
      )}
      <button type="button" onClick={salvarDoacao} disabled={loadingDoacao} className="admin-btn-accent" aria-busy={loadingDoacao}>
        {loadingDoacao ? "Salvando..." : "Salvar Doação"}
      </button>
    </div>
  );
}
