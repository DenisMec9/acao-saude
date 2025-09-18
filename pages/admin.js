import HeroAdmin from "@/components/Admin/HeroAdmin";
import GaleriaAdmin from "@/components/Admin/GaleriaAdmin";
import DoacaoAdmin from "@/components/Admin/DoacaoAdmin";
import ContatoAdmin from "@/components/Admin/ContatoAdmin";

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Painel Administrativo</h1>
        <p className="text-gray-600 mt-1">Edite todas as seções do site de forma rápida e segura.</p>
      </header>

      <main className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white shadow-md rounded p-6"><HeroAdmin /></div>
        <div className="bg-white shadow-md rounded p-6"><GaleriaAdmin /></div>
        <div className="bg-white shadow-md rounded p-6"><DoacaoAdmin /></div>
        <div className="bg-white shadow-md rounded p-6"><ContatoAdmin /></div>
      </main>
    </div>
  );
}
