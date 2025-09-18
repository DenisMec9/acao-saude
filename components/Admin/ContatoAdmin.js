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
    <div className="space-y-3">
      <h2 className="text-xl font-bold mb-2">Editar Seção Contato</h2>
      <input className="border p-2 w-full" placeholder="Título" value={contato.titulo} onChange={e => setContato({ ...contato, titulo: e.target.value })}/>
      <textarea className="border p-2 w-full" placeholder="Descrição" value={contato.descricao} onChange={e => setContato({ ...contato, descricao: e.target.value })}/>
      <input className="border p-2 w-full" placeholder="Telefone" value={contato.telefone} onChange={e => setContato({ ...contato, telefone: e.target.value })}/>
      <input className="border p-2 w-full" placeholder="Email" value={contato.email} onChange={e => setContato({ ...contato, email: e.target.value })}/>
      <input className="border p-2 w-full" placeholder="Endereço" value={contato.endereco} onChange={e => setContato({ ...contato, endereco: e.target.value })}/>
      <button onClick={salvarContato} disabled={loadingContato} className="bg-purple-600 text-white px-4 py-2 rounded">
        {loadingContato ? "Salvando..." : "Salvar Contato"}
      </button>
    </div>
  );
}
