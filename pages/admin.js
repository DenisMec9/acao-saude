// pages/admin.js

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Parse from '../lib/parseConfig'; // Importamos o Parse

// Seus componentes de admin
import HeroAdmin from "@/components/Admin/HeroAdmin";
import GaleriaAdmin from "@/components/Admin/GaleriaAdmin";
import DoacaoAdmin from "@/components/Admin/DoacaoAdmin";
import ContatoAdmin from "@/components/Admin/ContatoAdmin";

export default function AdminPage() {
  const router = useRouter();
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);

  useEffect(() => {
    const currentUser = Parse.User.current();
    if (currentUser) {
      setIsUserAuthenticated(true);
    } else {
      router.push('/login');
    }
  }, [router]);

  // --- INÍCIO: FUNÇÃO DE LOGOUT ---
  const handleLogout = async () => {
    try {
      await Parse.User.logOut();
      // Limpa a sessão do navegador e redireciona para a página de login
      router.push('/login');
    } catch (error) {
      console.error('Falha ao fazer logout:', error);
      alert('Erro ao sair: ' + error.message);
    }
  };
  // --- FIM: FUNÇÃO DE LOGOUT ---

  if (!isUserAuthenticated) {
    return <div className="min-h-screen flex items-center justify-center">Verificando autenticação...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* O header agora usa flexbox para alinhar o título e o botão */}
      <header className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Painel Administrativo</h1>
          <p className="text-gray-600 mt-1">Edite todas as seções do site de forma rápida e segura.</p>
        </div>
        
        {/* --- INÍCIO: BOTÃO DE LOGOUT --- */}
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition"
        >
          Sair
        </button>
        {/* --- FIM: BOTÃO DE LOGOUT --- */}
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