// pages/admin.js
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import {
  BookOpen,
  Camera,
  HeartHandshake,
  Home,
  ImageIcon,
  LayoutDashboard,
  LogOut,
  Menu,
  Phone,
  Target,
  Users,
} from 'lucide-react';

// Carrega os componentes admin apenas no cliente
const HeroAdmin = dynamic(() => import('@/components/Admin/HeroAdmin'), { ssr: false });
const GaleriaAdmin = dynamic(() => import('@/components/Admin/GaleriaAdmin'), { ssr: false });
const CursosAdmin = dynamic(() => import('@/components/Admin/CursosAdmin'), { ssr: false });
const DoacaoAdmin = dynamic(() => import('@/components/Admin/DoacaoAdmin'), { ssr: false });
const ContatoAdmin = dynamic(() => import('@/components/Admin/ContatoAdmin'), { ssr: false });

export default function AdminPage() {
  const router = useRouter();
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [activeTab, setActiveTab] = useState('hero');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [stats, setStats] = useState({
    totalFotos: 0,
    totalCursos: 0,
    cursosAtivos: 0
  });

  useEffect(() => {
    setIsClient(true);
    
    const checkAuth = async () => {
      const Parse = (await import('../lib/parseConfig')).default;
      const currentUser = Parse.User.current();
      
      if (currentUser) {
        setIsUserAuthenticated(true);
        carregarEstatisticas();
      } else {
        router.push('/login');
      }
    };

    checkAuth();
  }, [router]);

  const carregarEstatisticas = async () => {
    try {
      const Parse = (await import('../lib/parseConfig')).default;
      
      // Carregar estatísticas da galeria
      const Galeria = Parse.Object.extend("Galeria");
      const queryGaleria = new Parse.Query(Galeria);
      const totalFotos = await queryGaleria.count();
      
      // Carregar estatísticas dos cursos
      const Cursos = Parse.Object.extend("Cursos");
      const queryCursos = new Parse.Query(Cursos);
      const totalCursos = await queryCursos.count();
      
      const queryCursosAtivos = new Parse.Query(Cursos);
      queryCursosAtivos.equalTo("ativo", true);
      const cursosAtivos = await queryCursosAtivos.count();
      
      setStats({
        totalFotos,
        totalCursos,
        cursosAtivos
      });
    } catch (error) {
      console.error('Erro ao carregar estatísticas:', error);
    }
  };

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
    { id: 'hero', name: 'Hero Section', icon: Home, component: <HeroAdmin /> },
    { id: 'galeria', name: 'Galeria', icon: ImageIcon, component: <GaleriaAdmin /> },
    { id: 'cursos', name: 'Cursos', icon: BookOpen, component: <CursosAdmin /> },
    { id: 'doacao', name: 'Doações', icon: HeartHandshake, component: <DoacaoAdmin /> },
    { id: 'contato', name: 'Contato', icon: Phone, component: <ContatoAdmin /> },
  ];
  const activeTabConfig = tabs.find((tab) => tab.id === activeTab) || tabs[0];
  const ActiveTabIcon = activeTabConfig.icon;

  if (!isClient || !isUserAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-orange-50 flex items-center justify-center">
        <div className="text-center">
          <div className="h-12 w-12 rounded-full skeleton mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Carregando painel administrativo...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-orange-50 animate-fade-in">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors lg:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
                aria-label={sidebarOpen ? 'Fechar menu lateral' : 'Abrir menu lateral'}
                aria-expanded={sidebarOpen}
              >
                <Menu className="h-6 w-6 text-gray-600" />
              </button>
              
              <div className="flex items-center space-x-3">
                <div className="bg-gradient-to-r from-blue-600 to-orange-500 p-2 rounded-lg">
                  <LayoutDashboard className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">Painel Admin</h1>
                  <p className="text-sm text-gray-500">Ação Saúde</p>
                </div>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-orange-500"
              aria-label="Sair do painel administrativo"
            >
              <LogOut className="h-4 w-4" />
              <span>Sair</span>
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-8">
        {/* Tabs Navigation */}
        <div className="mb-8">
          <div className="flex space-x-1 bg-white/80 backdrop-blur-sm rounded-2xl p-2 shadow-sm border border-gray-200 overflow-x-auto">
            {tabs.map((tab) => {
              const TabIcon = tab.icon;

              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all duration-200 whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 ${
                    activeTab === tab.id
                      ? 'bg-white shadow-md text-orange-600 border border-orange-200'
                      : 'text-gray-600 hover:text-orange-700 hover:bg-orange-50'
                  }`}
                  aria-current={activeTab === tab.id ? 'page' : undefined}
                >
                  <TabIcon size={18} />
                  <span>{tab.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Content */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-1">
            <div className="bg-gradient-to-r from-blue-600 to-orange-500 rounded-t-2xl p-6 text-white">
              <div className="flex items-center space-x-3">
                <ActiveTabIcon size={28} />
                <div>
                  <h2 className="text-2xl font-bold">
                    {activeTabConfig.name}
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
                <ImageIcon className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Fotos na Galeria</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalFotos}</p>
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <div className="flex items-center space-x-3">
              <div className="bg-green-100 p-3 rounded-xl">
                <BookOpen className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Total de Cursos</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalCursos}</p>
                <p className="text-xs text-green-600">{stats.cursosAtivos} ativos</p>
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-blue-100 to-orange-100 p-3 rounded-xl">
                <Users className="h-6 w-6 text-blue-600" />
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
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            <button 
              onClick={() => setActiveTab('galeria')}
              className="p-4 bg-blue-50 hover:bg-blue-100 rounded-xl border border-blue-200 transition-colors text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            >
              <Camera className="h-6 w-6 mx-auto mb-2 text-blue-700" />
              <span className="text-blue-700 font-medium text-sm">Nova Foto</span>
            </button>
            
            <button 
              onClick={() => setActiveTab('cursos')}
              className="p-4 bg-green-50 hover:bg-green-100 rounded-xl border border-green-200 transition-colors text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500"
            >
              <BookOpen className="h-6 w-6 mx-auto mb-2 text-green-700" />
              <span className="text-green-700 font-medium text-sm">Novo Curso</span>
            </button>
            
            <button 
              onClick={() => setActiveTab('doacao')}
              className="p-4 bg-orange-50 hover:bg-orange-100 rounded-xl border border-orange-200 transition-colors text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
            >
              <HeartHandshake className="h-6 w-6 mx-auto mb-2 text-orange-700" />
              <span className="text-orange-700 font-medium text-sm">Atualizar Doação</span>
            </button>
            
            <button 
              onClick={() => setActiveTab('hero')}
              className="p-4 bg-blue-50 hover:bg-blue-100 rounded-xl border border-blue-200 transition-colors text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            >
              <Target className="h-6 w-6 mx-auto mb-2 text-blue-700" />
              <span className="text-blue-700 font-medium text-sm">Editar Hero</span>
            </button>
            
            <button 
              onClick={() => setActiveTab('contato')}
              className="p-4 bg-orange-50 hover:bg-orange-100 rounded-xl border border-orange-200 transition-colors text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
            >
              <Phone className="h-6 w-6 mx-auto mb-2 text-orange-700" />
              <span className="text-orange-700 font-medium text-sm">Contatos</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-label="Menu administrativo">
          <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setSidebarOpen(false)} />
          <div className="fixed inset-y-0 left-0 w-64 bg-white shadow-xl">
            <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-blue-600 to-orange-500 text-white">
              <h2 className="text-lg font-semibold">Menu Admin</h2>
            </div>
            <nav className="p-4 space-y-2">
              {tabs.map((tab) => {
                const TabIcon = tab.icon;

                return (
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
                    <TabIcon size={18} />
                    <span className="font-medium">{tab.name}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>
      )}
    </div>
  );
}