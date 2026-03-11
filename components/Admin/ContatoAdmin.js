import { useState, useEffect } from "react";
import Parse from "../../lib/parseConfig";

export default function ContatoAdmin() {
  const [contato, setContato] = useState({
    titulo: "",
    descricao: "",
    telefone: "",
    email: "",
    endereco: ""
  });
  const [loadingContato, setLoadingContato] = useState(false);

  useEffect(() => {
    const fetchContato = async () => {
      const Contato = Parse.Object.extend("Contato");
      const query = new Parse.Query(Contato);
      const result = await query.first();
      if (result) {
        setContato({
          titulo: result.get("titulo"),
          descricao: result.get("descricao"),
          telefone: result.get("telefone"),
          email: result.get("email"),
          endereco: result.get("endereco")
        });
      }
    };
    fetchContato();
  }, []);

  const salvarContato = async () => {
    setLoadingContato(true);
    try {
      const Contato = Parse.Object.extend("Contato");
      const query = new Parse.Query(Contato);
      let contatoObj = await query.first();
      if (!contatoObj) contatoObj = new Contato();

      contatoObj.set("titulo", contato.titulo);
      contatoObj.set("descricao", contato.descricao);
      contatoObj.set("telefone", contato.telefone);
      contatoObj.set("email", contato.email);
      contatoObj.set("endereco", contato.endereco);

      await contatoObj.save();
      alert("Seção Contato atualizada!");
    } catch (err) {
      console.error(err);
      alert("Erro ao salvar Contato.");
    }
    setLoadingContato(false);
  };

  return (
    <div className="admin-card space-y-4 animate-fade-in">
      <div>
        <h2 className="admin-title">Editar Seção Contato</h2>
        <p className="admin-subtitle">Centralize telefone, e-mail e endereço exibidos no site.</p>
      </div>
      <div>
        <label htmlFor="contato-titulo" className="admin-label">Título</label>
        <input id="contato-titulo" className="admin-input" placeholder="Título" value={contato.titulo} onChange={e => setContato({ ...contato, titulo: e.target.value })}/>
      </div>
      <div>
        <label htmlFor="contato-descricao" className="admin-label">Descrição</label>
        <textarea id="contato-descricao" className="admin-textarea" placeholder="Descrição" value={contato.descricao} onChange={e => setContato({ ...contato, descricao: e.target.value })}/>
      </div>
      <div>
        <label htmlFor="contato-telefone" className="admin-label">Telefone</label>
        <input id="contato-telefone" className="admin-input" placeholder="Telefone" value={contato.telefone} onChange={e => setContato({ ...contato, telefone: e.target.value })}/>
      </div>
      <div>
        <label htmlFor="contato-email" className="admin-label">Email</label>
        <input id="contato-email" className="admin-input" placeholder="Email" value={contato.email} onChange={e => setContato({ ...contato, email: e.target.value })}/>
      </div>
      <div>
        <label htmlFor="contato-endereco" className="admin-label">Endereço</label>
        <input id="contato-endereco" className="admin-input" placeholder="Endereço" value={contato.endereco} onChange={e => setContato({ ...contato, endereco: e.target.value })}/>
      </div>
      <button type="button" onClick={salvarContato} disabled={loadingContato} className="admin-btn-primary" aria-busy={loadingContato}>
        {loadingContato ? "Salvando..." : "Salvar Contato"}
      </button>
    </div>
  );
}
