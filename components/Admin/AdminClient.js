// components/Admin/AdminClient.js
import { useEffect, useState } from 'react';
import { useParse } from '../../hooks/useParse';
import GaleriaAdmin from './GaleriaAdmin';
import HeroAdmin from './HeroAdmin';

export default function AdminClient() {
  const parse = useParse();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient || !parse) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Carregando admin...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Painel Administrativo</h1>
        <div className="space-y-8">
          <HeroAdmin />
          <GaleriaAdmin />
        </div>
      </div>
    </div>
  );
}