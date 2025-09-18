import { useState, useEffect } from "react";
import Parse from "../../lib/parseConfig";

export default function DoacaoAdmin() {
  const [doacao, setDoacao] = useState({
    titulo: "",
    descricao: "",
    banco: "",
    tipoDoacao: "",
    imagem: ""
  });
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
          tipoDoacao: result.get("tipoDoacao"),
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
    <div className="space-y-3">
      <h2 className="text-xl font-bold mb-2">Editar Seção Doação</h2>
      <input className="border p-2 w-full" placeholder="Título" value={doacao.titulo} onChange={e => setDoacao({ ...doacao, titulo: e.target.value })}/>
      <textarea className="border p-2 w-full" placeholder="Descrição" value={doacao.descricao} onChange={e => setDoacao({ ...doacao, descricao: e.target.value })}/>
      <input className="border p-2 w-full" placeholder="Banco" value={doacao.banco} onChange={e => setDoacao({ ...doacao, banco: e.target.value })}/>
      <input className="border p-2 w-full" placeholder="Tipo de Doação" value={doacao.tipoDoacao} onChange={e => setDoacao({ ...doacao, tipoDoacao: e.target.value })}/>
      <input type="file" onChange={e => setDoacao({ ...doacao, imagem: e.target.files[0] })}/>
      {doacao.imagem && !(doacao.imagem instanceof File) && (
        <img src={doacao.imagem} alt="preview doação" className="w-full h-32 object-cover rounded mt-2"/>
      )}
      <button onClick={salvarDoacao} disabled={loadingDoacao} className="bg-yellow-600 text-white px-4 py-2 rounded">
        {loadingDoacao ? "Salvando..." : "Salvar Doação"}
      </button>
    </div>
  );
}
