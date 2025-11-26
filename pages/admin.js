// pages/admin.js
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';

// Carrega os componentes admin apenas no cliente
const HeroAdmin = dynamic(() => import('@/components/Admin/HeroAdmin'), { ssr: false });
const GaleriaAdmin = dynamic(() => import('@/components/Admin/GaleriaAdmin'), { ssr: false });
const DoacaoAdmin = dynamic(() => import('@/components/Admin/DoacaoAdmin'), { ssr: false });
const ContatoAdmin = dynamic(() => import('@/components/Admin/ContatoAdmin'), { ssr: false });

// Ícones SVG customizados
const MenuIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);

const LogoutIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
  </svg>
);

const DashboardIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4" />
  </svg>
);

export default function AdminPage() {
  const router = useRouter();
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [activeTab, setActiveTab] = useState('hero');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    setIsClient(true);
    
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

  const tabs = [
    { id: 'hero', name: 'Hero Section', icon: '🏠', component: <HeroAdmin /> },
    { id: 'galeria', name: 'Galeria', icon: '🖼️', component: <GaleriaAdmin /> },
    { id: 'doacao', name: 'Doações', icon: '❤️', component: <DoacaoAdmin /> },
    { id: 'contato', name: 'Contato', icon: '📞', component: <ContatoAdmin /> },
  ];

  if (!isClient || !isUserAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-orange-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Carregando painel administrativo...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-orange-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors lg:hidden"
              >
                <MenuIcon className="h-6 w-6 text-gray-600" />
              </button>
              
              <div className="flex items-center space-x-3">
                <div className="bg-gradient-to-r from-blue-600 to-orange-500 p-2 rounded-lg">
                  <DashboardIcon className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">Painel Admin</h1>
                  <p className="text-sm text-gray-500">Ação Saúde</p>
                </div>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md"
            >
              <LogoutIcon className="h-4 w-4" />
              <span>Sair</span>
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs Navigation */}
        <div className="mb-8">
          <div className="flex space-x-1 bg-white/80 backdrop-blur-sm rounded-2xl p-2 shadow-sm border border-gray-200">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-white shadow-md text-orange-600 border border-orange-200'
                    : 'text-gray-600 hover:text-orange-700 hover:bg-orange-50'
                }`}
              >
                <span className="text-lg">{tab.icon}</span>
                <span>{tab.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-1">
            <div className="bg-gradient-to-r from-blue-600 to-orange-500 rounded-t-2xl p-6 text-white">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">
                  {tabs.find(tab => tab.id === activeTab)?.icon}
                </span>
                <div>
                  <h2 className="text-2xl font-bold">
                    {tabs.find(tab => tab.id === activeTab)?.name}
                  </h2>
                  <p className="text-blue-100 opacity-90">
                    Gerencie esta seção do site
                  </p>
                </div>
              </div>
            </div>
            
            <div className="p-6">
              {tabs.find(tab => tab.id === activeTab)?.component}
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-100 p-3 rounded-xl">
                <span className="text-2xl text-blue-600">🖼️</span>
              </div>
              <div>
                <p className="text-sm text-gray-500">Fotos na Galeria</p>
                <p className="text-2xl font-bold text-gray-900">--</p>
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <div className="flex items-center space-x-3">
              <div className="bg-orange-100 p-3 rounded-xl">
                <span className="text-2xl text-orange-600">❤️</span>
              </div>
              <div>
                <p className="text-sm text-gray-500">Doações Recebidas</p>
                <p className="text-2xl font-bold text-gray-900">--</p>
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-blue-100 to-orange-100 p-3 rounded-xl">
                <span className="text-2xl text-blue-600">👥</span>
              </div>
              <div>
                <p className="text-sm text-gray-500">Visitas Hoje</p>
                <p className="text-2xl font-bold text-gray-900">--</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Ações Rápidas</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button 
              onClick={() => setActiveTab('galeria')}
              className="p-4 bg-blue-50 hover:bg-blue-100 rounded-xl border border-blue-200 transition-colors text-center"
            >
              <span className="text-2xl mb-2 block">📸</span>
              <span className="text-blue-700 font-medium">Nova Foto</span>
            </button>
            
            <button 
              onClick={() => setActiveTab('doacao')}
              className="p-4 bg-orange-50 hover:bg-orange-100 rounded-xl border border-orange-200 transition-colors text-center"
            >
              <span className="text-2xl mb-2 block">💝</span>
              <span className="text-orange-700 font-medium">Atualizar Doação</span>
            </button>
            
            <button 
              onClick={() => setActiveTab('hero')}
              className="p-4 bg-blue-50 hover:bg-blue-100 rounded-xl border border-blue-200 transition-colors text-center"
            >
              <span className="text-2xl mb-2 block">🎯</span>
              <span className="text-blue-700 font-medium">Editar Hero</span>
            </button>
            
            <button 
              onClick={() => setActiveTab('contato')}
              className="p-4 bg-orange-50 hover:bg-orange-100 rounded-xl border border-orange-200 transition-colors text-center"
            >
              <span className="text-2xl mb-2 block">📞</span>
              <span className="text-orange-700 font-medium">Contatos</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setSidebarOpen(false)} />
          <div className="fixed inset-y-0 left-0 w-64 bg-white shadow-xl">
            <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-blue-600 to-orange-500 text-white">
              <h2 className="text-lg font-semibold">Menu Admin</h2>
            </div>
            <nav className="p-4 space-y-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                    activeTab === tab.id
                      ? 'bg-orange-50 text-orange-600 border border-orange-200'
                      : 'text-gray-600 hover:bg-orange-50 hover:text-orange-700'
                  }`}
                >
                  <span className="text-lg">{tab.icon}</span>
                  <span className="font-medium">{tab.name}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>
      )}
    </div>
  );
}