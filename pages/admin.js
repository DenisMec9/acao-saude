// pages/admin.js
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';

// Carrega os componentes admin apenas no cliente
const HeroAdmin = dynamic(() => import('@/components/Admin/HeroAdmin'), { ssr: false });
const GaleriaAdmin = dynamic(() => import('@/components/Admin/GaleriaAdmin'), { ssr: false });
const DoacaoAdmin = dynamic(() => import('@/components/Admin/DoacaoAdmin'), { ssr: false });
const ContatoAdmin = dynamic(() => import('@/components/Admin/ContatoAdmin'), { ssr: false });

export default function AdminPage() {
  const router = useRouter();
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    
    // Só verifica autenticação no cliente
    const checkAuth = async () => {
      const Parse = (await import('../lib/parseConfig')).default;
      const currentUser = Parse.User.current();
      
      if (currentUser) {
        setIsUserAuthenticated(true);
      } else {
        router.push('/login');
      }
    };

    checkAuth();
  }, [router]);

  // Função de logout
  const handleLogout = async () => {
    try {
      const Parse = (await import('../lib/parseConfig')).default;
      await Parse.User.logOut();
      router.push('/login');
    } catch (error) {
      console.error('Falha ao fazer logout:', error);
      alert('Erro ao sair: ' + error.message);
    }
  };

  // Mostra loading enquanto verifica autenticação
  if (!isClient || !isUserAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-lg">Verificando autenticação...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <header className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Painel Administrativo</h1>
          <p className="text-gray-600 mt-1">Edite todas as seções do site de forma rápida e segura.</p>
        </div>
        
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition"
        >
          Sair
        </button>
      </header>

      <main className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white shadow-md rounded p-6">
          <HeroAdmin />
        </div>
        <div className="bg-white shadow-md rounded p-6">
          <GaleriaAdmin />
        </div>
        <div className="bg-white shadow-md rounded p-6">
          <DoacaoAdmin />
        </div>
        <div className="bg-white shadow-md rounded p-6">
          <ContatoAdmin />
        </div>
      </main>
    </div>
  );
}